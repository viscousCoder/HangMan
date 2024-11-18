let wordList = [
  { word: "javascript", hint: "Programming language" },
  { word: "html", hint: "Markup language for web pages" },
  { word: "css", hint: "Style sheet language" },
  { word: "responsive", hint: "Website design that adapts" },
  { word: "coding", hint: "Writing computer programs" },
  { word: "hangman", hint: "A classic word game" },
];
let chosenWord = "";
let displayWord = [];
let incorrectGuesses = [];
let attemptsLeft = 6;
let guessedLetters = [];

const wordDisplay = document.getElementById("wordDisplay");
const hangmanImg = document.getElementById("hangmanImg");
const incorrectGuessesElement = document.getElementById("incorrectGuesses");
const attemptsLeftElement = document.getElementById("attemptsLeft");
const messageElement = document.getElementById("message");
const hintElement = document.getElementById("hint");
const letterInput = document.getElementById("letterInput");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modalMessage");

function startNewGame() {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  chosenWord = wordList[randomIndex].word;
  const hint = wordList[randomIndex].hint;
  displayWord = Array(chosenWord.length).fill("_");
  incorrectGuesses = [];
  guessedLetters = [];
  attemptsLeft = 6;
  hintElement.textContent = `Hint: ${hint}`;
  updateUI();
}

function updateUI() {
  wordDisplay.textContent = displayWord.join(" ");
  incorrectGuessesElement.textContent = incorrectGuesses.join(", ");
  attemptsLeftElement.textContent = attemptsLeft;
  hangmanImg.src = `hangman${6 - attemptsLeft}.jpg`;
  messageElement.textContent = "";
  letterInput.value = "";
}

function guessLetter() {
  if (attemptsLeft > 0) {
    const guess = letterInput.value.toLowerCase();

    // Validate input
    if (!guess || guessedLetters.includes(guess)) {
      return;
    }

    guessedLetters.push(guess);

    if (chosenWord.includes(guess)) {
      for (let i = 0; i < chosenWord.length; i++) {
        if (chosenWord[i] === guess) {
          displayWord[i] = guess;
        }
      }
    } else {
      incorrectGuesses.push(guess);
      attemptsLeft--;
    }

    if (displayWord.join("") === chosenWord) {
      updateUI();
      setTimeout(() => {
        showWinMessage();
      }, 2000);
    } else if (attemptsLeft === 0) {
      updateUI();

      setTimeout(() => {
        showLoseMessage();
      }, 2000);
    } else {
      updateUI();
    }
  }
}

function showWinMessage() {
  modalMessage.textContent = `Congratulations! You won! The word was "${chosenWord}".`;
  modal.style.display = "flex";
}

function showLoseMessage() {
  modalMessage.textContent = `Game Over! You lost. The word was "${chosenWord}".`;
  modal.style.display = "flex";
}

document.querySelector(".modal button").addEventListener("click", () => {
  modal.style.display = "none";
  startNewGame();
});

startNewGame();
