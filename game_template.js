const playerOneScore = document.querySelector("#player1Score");
const playerTwoScore = document.querySelector("#player2Score");
const turnDisplay = document.querySelector("#turnDisplay");
const modeToggleBtn = document.querySelector("#modeToggle");
const resetButton = document.querySelector("#resetButton");
const player1Btn = document.querySelector("#player1");
const player2Btn = document.querySelector("#player2");

let userPlayer = "player1";

function togglePlayerMode() {
  modeToggleBtn.classList.toggle("active");
}
modeToggleBtn.addEventListener("click", () => this.togglePlayerMode());

player1Btn.addEventListener("click", () => {
  if (player1Btn.disabled === true) return;
  player1Btn.classList.add("selected");
  player2Btn.classList.remove("selected");
  player1Btn.disabled = true;
  player2Btn.disabled = false;
});
player2Btn.addEventListener("click", () => {
  if (player2Btn.disabled === true) return;
  player2Btn.classList.add("selected");
  player1Btn.classList.remove("selected");
  player2Btn.disabled = true;
  player1Btn.disabled = false;
});

// once the computer turn starts, disable both playerBtns