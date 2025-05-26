
const words = ["ЖАВХЛАН", "СУРГУУЛЬ", "МОНГОЛ", "ТОГЛООМ", "САЙТ"];
let selectedWord = "";
let displayedWord = [];
let guessed = [];
let attempts = 0;
let score = 0;
let nickname = "";

document.addEventListener("keydown", (e) => {
  if (!selectedWord || guessed.includes(e.key.toUpperCase())) return;
  const letter = e.key.toUpperCase();
  if (/^[А-ЯҮӨЁ]$/.test(letter)) {
    guessed.push(letter);
    if (selectedWord.includes(letter)) {
      for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === letter) displayedWord[i] = letter;
      }
    } else {
      attempts++;
    }
    updateDisplay();
    checkGameOver();
  }
});

function startGame() {
  nickname = document.getElementById("nickname").value || "Тоглогч";
  document.getElementById("nicknameModal").style.display = "none";
  loadTopScores();
  resetGame();
}

function resetGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayedWord = Array(selectedWord.length).fill("_");
  guessed = [];
  attempts = 0;
  updateDisplay();
  document.getElementById("status").innerText = "";
}

function updateDisplay() {
  document.getElementById("wordDisplay").innerText = "Үг: " + displayedWord.join(" ");
  document.getElementById("guessedLetters").innerText = guessed.join(", ");
  document.getElementById("score").innerText = score;
}

function checkGameOver() {
  if (!displayedWord.includes("_")) {
    score += 10;
    document.getElementById("status").innerText = "🎉 Яллаа!";
    saveScore();
    setTimeout(resetGame, 1500);
  } else if (attempts >= 6) {
    document.getElementById("status").innerText = "❌ Хожигдлоо! Үг: " + selectedWord;
    setTimeout(resetGame, 2000);
  }
}

function saveScore() {
  let top = JSON.parse(localStorage.getItem("topScores") || "[]");
  top.push({ name: nickname, score });
  top.sort((a, b) => b.score - a.score);
  top = top.slice(0, 5);
  localStorage.setItem("topScores", JSON.stringify(top));
  loadTopScores();
}

function loadTopScores() {
  let top = JSON.parse(localStorage.getItem("topScores") || "[]");
  const list = document.getElementById("topScores");
  list.innerHTML = "";
  top.forEach(t => {
    const li = document.createElement("li");
    li.innerText = `${t.name}: ${t.score}`;
    list.appendChild(li);
  });
}
