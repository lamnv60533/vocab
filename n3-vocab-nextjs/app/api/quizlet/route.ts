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

  try {
    const { data: html } = await axios.get(`https://quizlet.com/${setId}`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9,ja;q=0.8',
      },
      timeout: 15000,
    });

    let cards = parseJsonLd(html);
    if (cards.length === 0) cards = parseNextData(html);
    if (cards.length === 0) cards = parseRegex(html);

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
