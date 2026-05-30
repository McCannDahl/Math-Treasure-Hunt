// Treasure Hunt clues. Replace each `image` path with your own picture.
// `password` is what the children type after finding the sticky note.
// `math` holds two single-digit addition/subtraction problems.
const CLUES = [
  {
    image: "images/clue1.jpg",
    password: "CAT",
    math: [
      { question: "2 + 3 = ?", answer: 5 },
      { question: "4 - 1 = ?", answer: 3 },
    ],
  },
  {
    image: "images/clue2.jpg",
    password: "DOG",
    math: [
      { question: "1 + 6 = ?", answer: 7 },
      { question: "8 - 5 = ?", answer: 3 },
    ],
  },
  {
    image: "images/clue3.jpg",
    password: "SUN",
    math: [
      { question: "3 + 4 = ?", answer: 7 },
      { question: "9 - 2 = ?", answer: 7 },
    ],
  },
  {
    image: "images/clue4.jpg",
    password: "MOON",
    math: [
      { question: "5 + 2 = ?", answer: 7 },
      { question: "6 - 4 = ?", answer: 2 },
    ],
  },
  {
    image: "images/clue5.jpg",
    password: "STAR",
    math: [
      { question: "4 + 4 = ?", answer: 8 },
      { question: "7 - 3 = ?", answer: 4 },
    ],
  },
  {
    image: "images/clue6.jpg",
    password: "FISH",
    math: [
      { question: "2 + 5 = ?", answer: 7 },
      { question: "5 - 2 = ?", answer: 3 },
    ],
  },
  {
    image: "images/clue7.jpg",
    password: "BIRD",
    math: [
      { question: "6 + 3 = ?", answer: 9 },
      { question: "8 - 6 = ?", answer: 2 },
    ],
  },
  {
    image: "images/clue8.jpg",
    password: "TREE",
    math: [
      { question: "1 + 8 = ?", answer: 9 },
      { question: "9 - 5 = ?", answer: 4 },
    ],
  },
  {
    image: "images/clue9.jpg",
    password: "BOOK",
    math: [
      { question: "3 + 3 = ?", answer: 6 },
      { question: "7 - 4 = ?", answer: 3 },
    ],
  },
  {
    image: "images/clue10.jpg",
    password: "CAKE",
    math: [
      { question: "4 + 5 = ?", answer: 9 },
      { question: "6 - 2 = ?", answer: 4 },
    ],
  },
];

const els = {
  progress: document.getElementById("progress"),
  clueCard: document.getElementById("clue-card"),
  image: document.getElementById("clue-image"),
  password: document.getElementById("password-input"),
  math1Text: document.getElementById("math1-text"),
  math1Input: document.getElementById("math1-input"),
  math2Text: document.getElementById("math2-text"),
  math2Input: document.getElementById("math2-input"),
  check: document.getElementById("check-button"),
  feedback: document.getElementById("feedback"),
  winCard: document.getElementById("win-card"),
  restart: document.getElementById("restart-button"),
};

const STORAGE_KEY = "treasureHuntProgress";

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { clue: 0, won: false };
    const data = JSON.parse(raw);
    const clue = Number.isInteger(data.clue) ? data.clue : 0;
    return {
      clue: Math.min(Math.max(clue, 0), CLUES.length - 1),
      won: data.won === true,
    };
  } catch (_) {
    return { clue: 0, won: false };
  }
}

function saveProgress() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ clue: currentClue, won: hasWon })
    );
  } catch (_) {
    // localStorage may be unavailable (private mode, etc.) — fail silently.
  }
}

function clearProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (_) {}
}

const initial = loadProgress();
let currentClue = initial.clue;
let hasWon = initial.won;

function renderClue(index) {
  const clue = CLUES[index];
  els.progress.textContent = `Clue ${index + 1} of ${CLUES.length}`;
  els.image.src = clue.image;
  els.image.alt = `Clue ${index + 1} picture`;
  els.password.value = "";
  els.math1Text.textContent = clue.math[0].question;
  els.math2Text.textContent = clue.math[1].question;
  els.math1Input.value = "";
  els.math2Input.value = "";
  els.feedback.textContent = "";
  els.feedback.className = "feedback";
  els.password.focus();
}

function checkAnswers() {
  const clue = CLUES[currentClue];
  const password = els.password.value.trim().toUpperCase();
  const m1 = Number(els.math1Input.value);
  const m2 = Number(els.math2Input.value);

  const passwordOk = password === clue.password.toUpperCase();
  const math1Ok = m1 === clue.math[0].answer;
  const math2Ok = m2 === clue.math[1].answer;

  if (passwordOk && math1Ok && math2Ok) {
    els.feedback.textContent = "🌟 Yes! On to the next clue! 🌟";
    els.feedback.className = "feedback success";
    setTimeout(() => {
      currentClue += 1;
      if (currentClue >= CLUES.length) {
        hasWon = true;
        saveProgress();
        showWin();
      } else {
        saveProgress();
        renderClue(currentClue);
      }
    }, 900);
    return;
  }

  const problems = [];
  if (!passwordOk) problems.push("the password");
  if (!math1Ok) problems.push("the first math problem");
  if (!math2Ok) problems.push("the second math problem");
  els.feedback.textContent = `Try again — check ${problems.join(" and ")}.`;
  els.feedback.className = "feedback error";
}

function showWin() {
  els.clueCard.classList.add("hidden");
  els.winCard.classList.remove("hidden");
  els.progress.textContent = "All clues found!";
}

function restart() {
  currentClue = 0;
  hasWon = false;
  clearProgress();
  els.winCard.classList.add("hidden");
  els.clueCard.classList.remove("hidden");
  renderClue(currentClue);
}

els.check.addEventListener("click", checkAnswers);

[els.password, els.math1Input, els.math2Input].forEach((input) => {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") checkAnswers();
  });
});

els.restart.addEventListener("click", restart);

if (hasWon) {
  showWin();
} else {
  renderClue(currentClue);
}
