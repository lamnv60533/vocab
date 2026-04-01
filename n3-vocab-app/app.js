// State
let currentMode = 'flashcard';
let currentIndex = 0;
let filteredVocab = [...N3_VOCAB];
let progress = loadProgress();
let quizState = null;

// DOM Elements
const flashcard = document.getElementById('flashcard');
const cardCounter = document.getElementById('card-counter');
const categorySelect = document.getElementById('category-select');
const wordCount = document.getElementById('word-count');
const searchInput = document.getElementById('search-input');
const listFilter = document.getElementById('list-filter');

// Initialize
init();

function init() {
  setupCategories();
  setupNavigation();
  setupFlashcard();
  setupQuiz();
  setupWordList();
  setupStats();
  applyFilter();
  renderFlashcard();
}

// ---- Progress (localStorage) ----
function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem('n3-progress')) || {};
  } catch {
    return {};
  }
}

function saveProgress() {
  localStorage.setItem('n3-progress', JSON.stringify(progress));
}

function getWordKey(word) {
  return word.kanji + '|' + word.reading;
}

function isKnown(word) {
  return progress[getWordKey(word)] === true;
}

function setKnown(word, known) {
  const key = getWordKey(word);
  if (known) {
    progress[key] = true;
  } else {
    delete progress[key];
  }
  saveProgress();
}

// ---- Categories ----
function setupCategories() {
  const categories = [...new Set(N3_VOCAB.map(w => w.category))];
  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = formatCategory(cat);
    categorySelect.appendChild(opt);
  });
  categorySelect.addEventListener('change', () => {
    applyFilter();
    currentIndex = 0;
    renderFlashcard();
    renderWordList();
  });
}

function formatCategory(cat) {
  return cat.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function applyFilter() {
  const cat = categorySelect.value;
  filteredVocab = cat === 'all' ? [...N3_VOCAB] : N3_VOCAB.filter(w => w.category === cat);
  wordCount.textContent = `${filteredVocab.length} words`;
}

// ---- Navigation ----
function setupNavigation() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.dataset.mode;
      document.querySelectorAll('.mode').forEach(m => m.classList.remove('active'));
      document.getElementById(mode + '-mode').classList.add('active');
      currentMode = mode;
      if (mode === 'list') renderWordList();
      if (mode === 'stats') renderStats();
    });
  });
}

// ---- Flashcard ----
function setupFlashcard() {
  flashcard.addEventListener('click', () => {
    flashcard.classList.toggle('flipped');
  });

  document.getElementById('btn-prev').addEventListener('click', () => {
    if (filteredVocab.length === 0) return;
    currentIndex = (currentIndex - 1 + filteredVocab.length) % filteredVocab.length;
    flashcard.classList.remove('flipped');
    renderFlashcard();
  });

  document.getElementById('btn-next').addEventListener('click', () => {
    if (filteredVocab.length === 0) return;
    currentIndex = (currentIndex + 1) % filteredVocab.length;
    flashcard.classList.remove('flipped');
    renderFlashcard();
  });

  document.getElementById('btn-known').addEventListener('click', () => {
    if (filteredVocab.length === 0) return;
    setKnown(filteredVocab[currentIndex], true);
    nextCard();
  });

  document.getElementById('btn-unknown').addEventListener('click', () => {
    if (filteredVocab.length === 0) return;
    setKnown(filteredVocab[currentIndex], false);
    nextCard();
  });

  document.getElementById('btn-shuffle').addEventListener('click', () => {
    shuffleArray(filteredVocab);
    currentIndex = 0;
    flashcard.classList.remove('flipped');
    renderFlashcard();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (currentMode !== 'flashcard') return;
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
    if (e.key === 'ArrowLeft') document.getElementById('btn-prev').click();
    if (e.key === 'ArrowRight') document.getElementById('btn-next').click();
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flashcard.click(); }
  });
}

function nextCard() {
  if (filteredVocab.length === 0) return;
  currentIndex = (currentIndex + 1) % filteredVocab.length;
  flashcard.classList.remove('flipped');
  renderFlashcard();
}

function renderFlashcard() {
  if (filteredVocab.length === 0) {
    flashcard.querySelector('.flashcard-front .kanji').textContent = 'No words';
    flashcard.querySelector('.flashcard-front .reading').textContent = '';
    flashcard.querySelector('.flashcard-back .meaning').textContent = '';
    flashcard.querySelector('.flashcard-back .example').textContent = '';
    cardCounter.textContent = '0 / 0';
    return;
  }
  const word = filteredVocab[currentIndex];
  flashcard.querySelector('.flashcard-front .kanji').textContent = word.kanji;
  flashcard.querySelector('.flashcard-front .reading').textContent = word.reading;
  flashcard.querySelector('.flashcard-back .meaning').textContent = word.meaning;
  flashcard.querySelector('.flashcard-back .example').textContent = word.example;
  cardCounter.textContent = `${currentIndex + 1} / ${filteredVocab.length}`;
}

// ---- Quiz ----
function setupQuiz() {
  document.getElementById('btn-start-quiz').addEventListener('click', startQuiz);
  document.getElementById('btn-next-question').addEventListener('click', nextQuestion);
  document.getElementById('btn-retry-quiz').addEventListener('click', () => {
    document.getElementById('quiz-results').classList.add('hidden');
    document.getElementById('quiz-setup').classList.remove('hidden');
  });
}

function startQuiz() {
  const count = parseInt(document.getElementById('quiz-count').value);
  const type = document.getElementById('quiz-type').value;
  const pool = filteredVocab.length >= 4 ? filteredVocab : N3_VOCAB;

  if (pool.length < 4) return;

  const questions = [];
  const shuffled = [...pool];
  shuffleArray(shuffled);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  selected.forEach(word => {
    const wrongPool = pool.filter(w => getWordKey(w) !== getWordKey(word));
    shuffleArray(wrongPool);
    const wrongs = wrongPool.slice(0, 3);

    let question, correct, choices;
    if (type === 'ja-to-en') {
      question = word.kanji;
      correct = word.meaning;
      choices = [correct, ...wrongs.map(w => w.meaning)];
    } else if (type === 'en-to-ja') {
      question = word.meaning;
      correct = word.kanji;
      choices = [correct, ...wrongs.map(w => w.kanji)];
    } else {
      question = word.kanji;
      correct = word.reading;
      choices = [correct, ...wrongs.map(w => w.reading)];
    }

    shuffleArray(choices);
    questions.push({ word, question, correct, choices });
  });

  quizState = { questions, current: 0, score: 0, results: [] };
  document.getElementById('quiz-setup').classList.add('hidden');
  document.getElementById('quiz-area').classList.remove('hidden');
  document.getElementById('quiz-results').classList.add('hidden');
  renderQuestion();
}

function renderQuestion() {
  const q = quizState.questions[quizState.current];
  const total = quizState.questions.length;

  document.getElementById('quiz-progress-bar').style.width = `${(quizState.current / total) * 100}%`;
  document.getElementById('quiz-question').textContent = q.question;
  document.getElementById('quiz-feedback').classList.add('hidden');
  document.getElementById('btn-next-question').classList.add('hidden');

  const choicesEl = document.getElementById('quiz-choices');
  choicesEl.innerHTML = '';
  q.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'quiz-choice';
    btn.textContent = choice;
    btn.addEventListener('click', () => selectAnswer(choice, q));
    choicesEl.appendChild(btn);
  });
}

function selectAnswer(answer, q) {
  const isCorrect = answer === q.correct;
  quizState.results.push({ word: q.word, correct: isCorrect, userAnswer: answer });
  if (isCorrect) quizState.score++;

  // Highlight choices
  document.querySelectorAll('.quiz-choice').forEach(btn => {
    btn.style.pointerEvents = 'none';
    if (btn.textContent === q.correct) btn.classList.add('correct');
    if (btn.textContent === answer && !isCorrect) btn.classList.add('wrong');
  });

  // Show feedback
  const feedback = document.getElementById('quiz-feedback');
  feedback.classList.remove('hidden', 'correct', 'wrong');
  if (isCorrect) {
    feedback.classList.add('correct');
    feedback.textContent = 'Correct!';
  } else {
    feedback.classList.add('wrong');
    feedback.textContent = `Wrong! The answer is: ${q.correct}`;
  }

  document.getElementById('btn-next-question').classList.remove('hidden');
}

function nextQuestion() {
  quizState.current++;
  if (quizState.current >= quizState.questions.length) {
    showQuizResults();
  } else {
    renderQuestion();
  }
}

function showQuizResults() {
  document.getElementById('quiz-area').classList.add('hidden');
  document.getElementById('quiz-results').classList.remove('hidden');

  const total = quizState.questions.length;
  const score = quizState.score;
  const percent = Math.round((score / total) * 100);
  const scoreEl = document.getElementById('quiz-score');
  scoreEl.textContent = `${score} / ${total} (${percent}%)`;
  scoreEl.style.color = percent >= 80 ? '#4ade80' : percent >= 50 ? '#fbbf24' : '#ff6b6b';

  const reviewEl = document.getElementById('quiz-review');
  reviewEl.innerHTML = '';
  quizState.results.forEach(r => {
    const div = document.createElement('div');
    div.className = `review-item ${r.correct ? 'correct' : 'wrong'}`;
    div.innerHTML = `
      <span class="review-word">${r.word.kanji} (${r.word.reading})</span>
      <span class="review-answer">${r.word.meaning}</span>
    `;
    reviewEl.appendChild(div);
  });

  document.getElementById('quiz-progress-bar').style.width = '100%';
}

// ---- Word List ----
function setupWordList() {
  searchInput.addEventListener('input', renderWordList);
  listFilter.addEventListener('change', renderWordList);
}

function renderWordList() {
  const search = searchInput.value.toLowerCase().trim();
  const filter = listFilter.value;

  let words = filteredVocab;

  if (search) {
    words = words.filter(w =>
      w.kanji.includes(search) ||
      w.reading.includes(search) ||
      w.meaning.toLowerCase().includes(search)
    );
  }

  if (filter === 'known') words = words.filter(w => isKnown(w));
  if (filter === 'unknown') words = words.filter(w => !isKnown(w));

  const listEl = document.getElementById('word-list');
  listEl.innerHTML = '';

  words.forEach(word => {
    const div = document.createElement('div');
    div.className = 'word-item';
    const known = isKnown(word);
    div.innerHTML = `
      <div class="word-ja">${word.kanji}<small>${word.reading}</small></div>
      <div class="word-en">${word.meaning}</div>
      <span class="word-status ${known ? 'known' : 'learning'}" data-key="${getWordKey(word)}">
        ${known ? 'Known' : 'Learning'}
      </span>
    `;
    div.querySelector('.word-status').addEventListener('click', (e) => {
      const key = e.target.dataset.key;
      const w = N3_VOCAB.find(v => getWordKey(v) === key);
      if (w) {
        setKnown(w, !isKnown(w));
        renderWordList();
        renderStats();
      }
    });
    listEl.appendChild(div);
  });
}

// ---- Stats ----
function setupStats() {
  document.getElementById('btn-reset-progress').addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all progress?')) {
      progress = {};
      saveProgress();
      renderStats();
      renderWordList();
    }
  });
}

function renderStats() {
  const total = N3_VOCAB.length;
  const known = N3_VOCAB.filter(w => isKnown(w)).length;
  const learning = total - known;
  const percent = total > 0 ? Math.round((known / total) * 100) : 0;

  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-known').textContent = known;
  document.getElementById('stat-learning').textContent = learning;
  document.getElementById('stat-percent').textContent = percent + '%';
  document.getElementById('progress-fill').style.width = percent + '%';

  // Category breakdown
  const categories = [...new Set(N3_VOCAB.map(w => w.category))];
  const catStatsEl = document.getElementById('category-stats');
  catStatsEl.innerHTML = '';

  categories.forEach(cat => {
    const catWords = N3_VOCAB.filter(w => w.category === cat);
    const catKnown = catWords.filter(w => isKnown(w)).length;
    const catPercent = catWords.length > 0 ? Math.round((catKnown / catWords.length) * 100) : 0;

    const div = document.createElement('div');
    div.className = 'cat-stat';
    div.innerHTML = `
      <span class="cat-stat-name">${formatCategory(cat)}</span>
      <div class="cat-stat-bar"><div class="cat-stat-fill" style="width: ${catPercent}%"></div></div>
      <span class="cat-stat-text">${catKnown}/${catWords.length}</span>
    `;
    catStatsEl.appendChild(div);
  });
}

// ---- Utility ----
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
