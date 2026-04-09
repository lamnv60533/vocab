// conjugation-engine.js
// Pure conjugation logic. Input: polite ます-form reading (hiragana), category, form key.
// Forms: 'te' | 'nai' | 'ta' | 'potential'

const CONJ_G1_TABLE = {
  //  masu-stem final kana → { te suffix, ta suffix, nai a-row kana, potential e-row kana }
  'き': { te: 'いて',  ta: 'いた',  nai: 'か', pot: 'け' }, // かきます → かく
  'ぎ': { te: 'いで',  ta: 'いだ',  nai: 'が', pot: 'げ' }, // およぎます → およぐ
  'し': { te: 'して',  ta: 'した',  nai: 'さ', pot: 'せ' }, // はなします → はなす
  'ち': { te: 'って',  ta: 'った',  nai: 'た', pot: 'て' }, // まちます → まつ
  'り': { te: 'って',  ta: 'った',  nai: 'ら', pot: 'れ' }, // つくります → つくる
  'に': { te: 'んで',  ta: 'んだ',  nai: 'な', pot: 'ね' }, // しにます → しぬ (rare)
  'び': { te: 'んで',  ta: 'んだ',  nai: 'ば', pot: 'べ' }, // あそびます → あそぶ
  'み': { te: 'んで',  ta: 'んだ',  nai: 'ま', pot: 'め' }, // よみます → よむ
  'い': { te: 'って',  ta: 'った',  nai: 'わ', pot: 'え' }, // かいます → かう (w-row: ない uses わ)
};

// Group 3 special cases (hardcoded)
const CONJ_G3 = {
  'きます': { te: 'きて', nai: 'こない', ta: 'きた', potential: 'こられる' },
};

function conjugate(reading, category, form) {
  if (!reading || !category || !form) return null;

  // --- Group 3 ---
  if (category === 'verb-group3') {
    if (CONJ_G3[reading]) return CONJ_G3[reading][form] || null;
    // Compound する verbs (e.g. べんきょうします, れんしゅうします)
    if (reading.endsWith('します')) {
      const base = reading.replace(/します$/, '');
      const map = { te: base + 'して', nai: base + 'しない', ta: base + 'した', potential: base + 'できる' };
      return map[form] || null;
    }
    return null;
  }

  // --- Group 2 (ichidan) ---
  if (category === 'verb-group2') {
    const stem = reading.replace(/ます$/, '');
    const map = { te: stem + 'て', nai: stem + 'ない', ta: stem + 'た', potential: stem + 'られる' };
    return map[form] || null;
  }

  // --- Group 1 (godan) ---
  if (category === 'verb-group1') {
    // Exception: いきます → て-form is いって (not いいて)
    if (reading === 'いきます') {
      return { te: 'いって', nai: 'いかない', ta: 'いった', potential: 'いける' }[form] || null;
    }

    const masust = reading.replace(/ます$/, '');
    const lastKana = masust[masust.length - 1];
    const stemBase = masust.slice(0, -1);
    const rule = CONJ_G1_TABLE[lastKana];
    if (!rule) {
      // Fallback: treat as group 2 (safer than crashing)
      const stem = masust;
      const fb = { te: stem + 'て', nai: stem + 'ない', ta: stem + 'た', potential: stem + 'られる' };
      return fb[form] || null;
    }

    if (form === 'te')        return stemBase + rule.te;
    if (form === 'ta')        return stemBase + rule.ta;
    if (form === 'nai')       return stemBase + rule.nai + 'ない';
    if (form === 'potential') return stemBase + rule.pot + 'る';
    return null;
  }

  // Fallback: treat as group 2
  const stem = reading.replace(/ます$/, '');
  const fb = { te: stem + 'て', nai: stem + 'ない', ta: stem + 'た', potential: stem + 'られる' };
  return fb[form] || null;
}

// Returns a human-readable mini summary of how the conjugation was derived
function conjugateSummary(reading, category, form) {
  const result = conjugate(reading, category, form);
  if (!result) return '';

  if (category === 'verb-group3') {
    return `${reading} (Nhóm 3, bất quy tắc) → ${result}`;
  }
  if (category === 'verb-group2') {
    const stem = reading.replace(/ます$/, '');
    const endings = { te: 'て', nai: 'ない', ta: 'た', potential: 'られる' };
    return `${reading} (Nhóm 2) → bỏ ます → ${stem} + ${endings[form]} → ${result}`;
  }
  if (category === 'verb-group1') {
    if (reading === 'いきます') return `いきます (Nhóm 1, ngoại lệ) → ${result}`;
    const masust = reading.replace(/ます$/, '');
    const lastKana = masust[masust.length - 1];
    const rule = CONJ_G1_TABLE[lastKana];
    if (!rule) return `${reading} (Nhóm 1) → ${result}`;
    if (form === 'nai') return `${reading} (Nhóm 1) → bỏ ${lastKana}, thêm ${rule.nai}ない → ${result}`;
    if (form === 'potential') return `${reading} (Nhóm 1) → bỏ ${lastKana}, thêm ${rule.pot}る → ${result}`;
    return `${reading} (Nhóm 1) → bỏ ${lastKana}, thêm ${rule.te} → ${result}`;
  }
  return `${reading} → ${result}`;
}
