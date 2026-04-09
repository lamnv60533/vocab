// conjugation-examples.js
// Manually tagged example sentences for context drill.
// Each entry: { reading, form, sentence, answer, hint }
// "sentence" uses ＿＿＿ as the blank for the conjugated form.

const CONJUGATION_EXAMPLES = [
  // ---- て-form ----
  { reading: 'かきます',    form: 'te', sentence: '手紙を＿＿＿ください。',         answer: 'かいて',       hint: 'Xin hãy viết thư.' },
  { reading: 'たべます',    form: 'te', sentence: 'ゆっくり＿＿＿ください。',       answer: 'たべて',       hint: 'Xin hãy ăn chậm thôi.' },
  { reading: 'のみます',    form: 'te', sentence: '水を＿＿＿ください。',             answer: 'のんで',       hint: 'Xin hãy uống nước.' },
  { reading: 'みます',      form: 'te', sentence: 'これを＿＿＿ください。',           answer: 'みて',         hint: 'Xin hãy xem cái này.' },
  { reading: 'します',      form: 'te', sentence: 'しずかに＿＿＿ください。',         answer: 'して',         hint: 'Xin hãy làm yên lặng.' },
  { reading: 'まちます',    form: 'te', sentence: 'ちょっと＿＿＿ください。',         answer: 'まって',       hint: 'Xin hãy đợi một chút.' },
  { reading: 'あけます',    form: 'te', sentence: '窓を＿＿＿ください。',             answer: 'あけて',       hint: 'Xin hãy mở cửa sổ.' },
  { reading: 'きます',      form: 'te', sentence: '明日また＿＿＿ください。',         answer: 'きて',         hint: 'Xin hãy đến lại vào ngày mai.' },

  // ---- ない-form ----
  { reading: 'かきます',    form: 'nai', sentence: '今日は手紙を＿＿＿。',           answer: 'かかない',     hint: 'Hôm nay không viết thư.' },
  { reading: 'たべます',    form: 'nai', sentence: '朝ご飯を＿＿＿。',               answer: 'たべない',     hint: 'Không ăn bữa sáng.' },
  { reading: 'のみます',    form: 'nai', sentence: 'お酒を＿＿＿。',                 answer: 'のまない',     hint: 'Không uống rượu.' },
  { reading: 'いきます',    form: 'nai', sentence: '今日は学校に＿＿＿。',           answer: 'いかない',     hint: 'Hôm nay không đi học.' },
  { reading: 'します',      form: 'nai', sentence: '宿題を＿＿＿。',                 answer: 'しない',       hint: 'Không làm bài tập.' },
  { reading: 'みます',      form: 'nai', sentence: 'テレビを＿＿＿。',               answer: 'みない',       hint: 'Không xem TV.' },
  { reading: 'はなします',  form: 'nai', sentence: '秘密を＿＿＿。',                 answer: 'はなさない',   hint: 'Không nói bí mật.' },
  { reading: 'きます',      form: 'nai', sentence: '彼は今日＿＿＿。',               answer: 'こない',       hint: 'Hôm nay anh ấy không đến.' },

  // ---- た-form ----
  { reading: 'かきます',    form: 'ta', sentence: '手紙を＿＿＿。',                  answer: 'かいた',       hint: 'Đã viết thư.' },
  { reading: 'たべます',    form: 'ta', sentence: '朝ご飯を＿＿＿。',                answer: 'たべた',       hint: 'Đã ăn bữa sáng.' },
  { reading: 'のみます',    form: 'ta', sentence: 'コーヒーを＿＿＿。',              answer: 'のんだ',       hint: 'Đã uống cà phê.' },
  { reading: 'いきます',    form: 'ta', sentence: '昨日学校に＿＿＿。',              answer: 'いった',       hint: 'Hôm qua đã đi học.' },
  { reading: 'します',      form: 'ta', sentence: '宿題を＿＿＿。',                  answer: 'した',         hint: 'Đã làm bài tập.' },
  { reading: 'みます',      form: 'ta', sentence: '映画を＿＿＿。',                  answer: 'みた',         hint: 'Đã xem phim.' },
  { reading: 'きます',      form: 'ta', sentence: '友だちが＿＿＿。',                answer: 'きた',         hint: 'Bạn đã đến.' },
  { reading: 'よみます',    form: 'ta', sentence: '本を＿＿＿。',                    answer: 'よんだ',       hint: 'Đã đọc sách.' },

  // ---- potential ----
  { reading: 'かきます',    form: 'potential', sentence: '漢字が＿＿＿。',           answer: 'かける',       hint: 'Có thể viết chữ kanji.' },
  { reading: 'たべます',    form: 'potential', sentence: '辛い食べ物が＿＿＿。',     answer: 'たべられる',   hint: 'Có thể ăn đồ cay.' },
  { reading: 'のみます',    form: 'potential', sentence: 'お酒が＿＿＿。',           answer: 'のめる',       hint: 'Có thể uống rượu.' },
  { reading: 'します',      form: 'potential', sentence: '日本語が＿＿＿。',         answer: 'できる',       hint: 'Có thể nói tiếng Nhật.' },
  { reading: 'はなします',  form: 'potential', sentence: '英語が＿＿＿。',           answer: 'はなせる',     hint: 'Có thể nói tiếng Anh.' },
  { reading: 'およぎます',  form: 'potential', sentence: '100メートル＿＿＿。',      answer: 'およげる',     hint: 'Có thể bơi 100m.' },
  { reading: 'みます',      form: 'potential', sentence: '星が＿＿＿。',             answer: 'みられる',     hint: 'Có thể nhìn thấy các vì sao.' },
  { reading: 'きます',      form: 'potential', sentence: '明日＿＿＿か？',           answer: 'こられる',     hint: 'Ngày mai có thể đến không?' },
];

function getConjugationExamples(form) {
  return CONJUGATION_EXAMPLES.filter(e => e.form === form);
}
