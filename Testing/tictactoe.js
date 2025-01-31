function togglePlayerMode() {
  isComputerMode = !isComputerMode;
  modeToggleBtn.classList.toggle("active");
  userPlayer = 1; // Reset to player 1 when toggling modes
  updatePlayerTags();
}

modeToggleBtn.addEventListener("click", togglePlayerMode);
player1Tag.addEventListener("click", () => switchPlayer(1));
player2Tag.addEventListener("click", () => switchPlayer(2));

// Initialize the player tags
updatePlayerTags();

// TIC TAC TOE

class TicTacToe {
  constructor() {
    // objects
    this.resetBtn = document.querySelector("#resetBtn");
    this.modeToggleBtn = document.querySelector("#modeToggleBtn");
    this.player1Score = document.querySelector("#player1Score");
    this.player2Score = document.querySelector("#player2Score");
    this.player1Tag = document.querySelector("#player1Tag");
    this.player2Tag = document.querySelector("#player2Tag");

    // variables
    this.isComputerMode = false;
    this.userPlayer = 1;
    this.isComputerThinking = false;
    this.playerTurn = 1;
    this.movesCount = 0;
    this.movesLog = [];
    this.computerIsThinking = false;

    // setup
    this.updatePlayerTags();
    this.initializeEventListeners();
  }

  updatePlayerTags() {
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

  initializeEventListeners() {
    this.resetBtn.addEventListener("click", this.reset);
    this.modeToggleBtn.addEventListener("click", this.togglePlayerMode);
    this.player1Tag.addEventListener("click", this.swapPlayers);
    this.player2Tag.addEventListener("click", this.swapPlayers);

    this.cells.array.forEach((cell, index) => {
      cell.addEventListener("click", this.makeMove(index));
    });
  }

  swapPlayers() {
    if (!this.isComputerMode) return;
    if ()
    
    userPlayer = userPlayer === 1 ? 2 : 1;
    this.updatePlayerTags();
  }

  togglePlayerMode() {
    // other code...
    if (isComputerMode && userPlayer === 2) {
      player1Tag.disabled = true;
      player2Tag.disabled = true;
      this.computerMove();
    }
  }

  makeMove(index) {
    if (this.computerIsThinking) return;

    this.movesCount++;

    if (moveCount != 0) {
      player1Tag.disabled = true;
      player2Tag.disabled = true;
    }

    this.markCell(this.cells[index]);

    playerTurn = PlayerTurn === 1 ? 2 : 1;
  }

  computerMove() {
    this.movesCount++;

    if (moveCount != 0) {
      player1Tag.disabled = true;
      player2Tag.disabled = true;
    }
  }

  reset() {}
}
