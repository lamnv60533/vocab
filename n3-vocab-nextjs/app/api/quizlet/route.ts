import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { success: false, error: 'url parameter is required', cards: [] },
      { status: 400 },
    );
  }

  const match = url.match(/quizlet\.com\/(\d+)/);
  if (!match) {
    return NextResponse.json(
      { success: false, error: 'Invalid Quizlet URL', cards: [] },
      { status: 400 },
    );
  }

  const setId = match[1];
  const headers = {
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    Accept: 'application/json, text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9,ja;q=0.8',
  };

  try {
    // Method 1: Try Quizlet internal webapi (returns clean JSON)
    let cards = await fetchViaWebApi(setId, headers);

    // Method 2: Scrape HTML page and parse
    if (cards.length === 0) {
      const { data: html } = await axios.get(`https://quizlet.com/${setId}`, {
        headers,
        timeout: 15000,
      });
      cards = parseJsonLd(html);
      if (cards.length === 0) cards = parseNextData(html);
      if (cards.length === 0) cards = parseRegex(html);
    }

    if (cards.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Could not parse flashcards. The set may be private.',
        cards: [],
      });
    }

    return NextResponse.json({ success: true, count: cards.length, cards });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({
      success: false,
      error: `Failed to fetch: ${message}`,
      cards: [],
    });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchViaWebApi(setId: string, headers: Record<string, string>): Promise<Card[]> {
  const cards: Card[] = [];
  try {
    const apiUrl = `https://quizlet.com/webapi/3.4/studiable-item-documents?filters%5BstudiableContainerId%5D=${setId}&filters%5BstudiableContainerType%5D=1&perPage=1000&page=1`;
    const { data } = await axios.get(apiUrl, { headers, timeout: 10000 });

    const items = data?.responses?.[0]?.models?.studiableItem;
    if (Array.isArray(items)) {
      for (const item of items) {
        const cardSides = item.cardSides;
        if (Array.isArray(cardSides) && cardSides.length >= 2) {
          const term = cardSides[0]?.media?.[0]?.plainText || '';
          const definition = cardSides[1]?.media?.[0]?.plainText || '';
          if (term && definition) {
            cards.push({ term, definition });
          }
        }
      }
    }
  } catch {
    // webapi may return 403/401, fall through to HTML scraping
  }
  return cards;
}

interface Card {
  term: string;
  definition: string;
}

function parseJsonLd(html: string): Card[] {
  const cards: Card[] = [];
  const regex = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(html)) !== null) {
    try {
      const data = JSON.parse(match[1]);
      if (data?.hasPart) {
        for (const part of data.hasPart) {
          if (part.name && part.acceptedAnswer?.text) {
            cards.push({ term: part.name, definition: part.acceptedAnswer.text });
          }
        }
      }
    } catch { /* skip invalid JSON */ }
  }
  return cards;
}

function parseNextData(html: string): Card[] {
  const cards: Card[] = [];
  const match = html.match(/<script[^>]*id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
  if (!match) return cards;

  try {
    const data = JSON.parse(match[1]);
    const terms = findInObject(data, 'studiableItems') ||
      findInObject(data, 'terms') ||
      findInObject(data, 'setTerms');

    if (Array.isArray(terms)) {
      for (const item of terms) {
        const term = item.word || item.front || item.term || item._word || '';
        const def = item.definition || item.back || item._definition || '';
        if (term && def) cards.push({ term, definition: def });
      }
    }
  } catch { /* skip */ }
  return cards;
}

function parseRegex(html: string): Card[] {
  const cards: Card[] = [];
  const patterns = [
    /"word"\s*:\s*"([^"]+)"[^}]*"definition"\s*:\s*"([^"]+)"/g,
    /"front"\s*:\s*"([^"]+)"[^}]*"back"\s*:\s*"([^"]+)"/g,
    /"term"\s*:\s*"([^"]+)"[^}]*"definition"\s*:\s*"([^"]+)"/g,
  ];

  for (const pattern of patterns) {
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(html)) !== null) {
      cards.push({ term: unescapeJson(match[1]), definition: unescapeJson(match[2]) });
    }
    if (cards.length > 0) break;
  }
  return cards;
}

function unescapeJson(str: string): string {
  try { return JSON.parse(`"${str}"`); } catch { return str; }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function findInObject(obj: any, key: string): any {
  if (!obj || typeof obj !== 'object') return null;
  if (obj[key]) return obj[key];
  for (const k of Object.keys(obj)) {
    const result = findInObject(obj[k], key);
    if (result) return result;
  }
  return null;
}
