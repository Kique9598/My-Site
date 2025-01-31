// VARIABLES
// all games
const resetBtn = document.querySelector("#resetBtn");

// single player
const userWinScore = document.querySelector("#user-win-score");
const userLossScore = document.querySelector("#user-loss-score");

// multi player
const modeToggleBtn = document.querySelector("#modeToggleBtn");
const player1Score = document.querySelector("#player1Score");
const player2Score = document.querySelector("#player2Score");
const player1Tag = document.querySelector("#player1Tag");
const player2Tag = document.querySelector("#player2Tag");

let isComputerMode = false;
let userPlayer = 1;

function togglePlayerMode() {
  isComputerMode = !isComputerMode;
  modeToggleBtn.classList.toggle("active");
  userPlayer = 1; // Reset to player 1 when toggling modes
  updatePlayerTags();
}

function switchPlayer(newPlayer) {
  if (!isComputerMode) return;
  if (newPlayer !== userPlayer) {
    userPlayer = newPlayer;
    updatePlayerTags();
  }
}

function updatePlayerTags() {
  if (isComputerMode) {
    player1Tag.classList.toggle("teal", userPlayer === 1);
    player2Tag.classList.toggle("purple", userPlayer === 2);
    player1Tag.classList.toggle("selected", userPlayer === 1);
    player2Tag.classList.toggle("selected", userPlayer === 2);
    player1Tag.disabled = false;
    player2Tag.disabled = false;
  } else {
    player1Tag.classList.add("teal");
    player2Tag.classList.add("purple");
    player1Tag.classList.add("selected");
    player2Tag.classList.remove("selected");
    player1Tag.disabled = true;
    player2Tag.disabled = true;
  }
}

modeToggleBtn.addEventListener("click", togglePlayerMode);
player1Tag.addEventListener("click", () => switchPlayer(1));
player2Tag.addEventListener("click", () => switchPlayer(2));

// Initialize the player tags
updatePlayerTags();
