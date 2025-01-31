// Player toggle
const playerToggleBtn = document.querySelector("#player-toggle");
let playerIsComputer = false;

function togglePlayer() {
  playerIsComputer = !playerIsComputer;
  playerToggleBtn.classList.toggle("active");
}

// Game Play
class TicTacToeGame {
  constructor() {
    this.cells = document.querySelectorAll(".cell");
    this.resetButton = document.querySelector("#reset");
    this.playerToggleButton = document.querySelector("#player-toggle");
    this.playerDisplay = document.querySelector("#player_info");

    this.currentPlayer = 1;
    this.movesCount = 0;
    this.isComputerPlayer = false;
    this.movesLog = [];
    this.isComputerThinking = false;
    this.playerDisplay.classList.add("blue");

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    this.resetButton.addEventListener("click", () => this.resetGame());
    this.playerToggleButton.addEventListener("click", () =>
      this.togglePlayerMode()
    );

    this.cells.forEach((cell, index) => {
      cell.addEventListener("click", () => this.makeMove(index));
    });
  }

  makeMove(cellIndex) {
    // Prevent move if computer is thinking
    if (this.isComputerThinking) return;

    const cell = this.cells[cellIndex];

    if (cell.disabled) return;

    this.markCell(cell, cellIndex);
    this.updateGameState();
    this.switchPlayer();

    // Computer move if enabled and it's computer's turn
    if (this.isComputerPlayer && this.currentPlayer === 2) {
      this.computerMove();
    }
  }

  computerMove() {
    // Set thinking state to prevent user moves
    this.isComputerThinking = true;

    // Find available cells
    const availableCells = Array.from(this.cells).filter(
      (cell) => !cell.disabled
    );

    // Random cell selection
    if (availableCells.length > 0) {
      const randomCell =
        availableCells[Math.floor(Math.random() * availableCells.length)];
      const cellIndex = Array.from(this.cells).indexOf(randomCell);

      // Simulate a delay for more natural play
      setTimeout(() => {
        this.markCell(randomCell, cellIndex);
        this.updateGameState();
        this.switchPlayer();

        // Reset thinking state
        this.isComputerThinking = false;
      }, 500);
    }
  }

  markCell(cell, cellIndex) {
    cell.classList.add(this.currentPlayer === 1 ? "blue" : "red");
    cell.disabled = true;
    this.movesCount++;

    // Log the move
    this.movesLog.push({
      player: this.currentPlayer,
      cell: cellIndex,
    });

    console.log(`Player ${this.currentPlayer} moved in cell ${cellIndex}`);

    // Log when all cells are filled
    if (this.movesCount === 9) {
      console.log("Moves Log:", this.movesLog);
    }
  }

  updateGameState() {
    if (this.movesCount === 1) {
      this.resetButton.disabled = false;
    }

    switch (this.checkForWin()) {
      case 0:
        break; // game has not ended
      case 3:
        this.playerDisplay.classList.remove("red");
        this.playerDisplay.classList.remove("blue");
        this.endGame();
        break; // cat's game
      case 1:
        this.playerDisplay.classList.remove("red");
        this.playerDisplay.classList.add("blue");
        this.playerDisplay.classList.add("winner");
        this.endGame();
        break; // player 1 wins
      case 2:
        this.playerDisplay.classList.remove("blue");
        this.playerDisplay.classList.add("red");
        this.playerDisplay.classList.add("winner");
        this.endGame();
        break; // player 2 wins
    }

    this.playerToggleButton.disabled = this.movesCount >= 1;
  }

  switchPlayer() {
    // Check if the game is still ongoing before switching
    if (this.checkForWin() === 0) {
      this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
      this.playerDisplay.classList.toggle("blue");
      this.playerDisplay.classList.toggle("red");
    }
  }

  togglePlayerMode() {
    this.isComputerPlayer = !this.isComputerPlayer;

    this.playerToggleButton.classList.toggle("active");
  }

  resetGame() {
    this.cells.forEach((cell) => {
      cell.disabled = false;
      cell.classList.remove("blue", "red");
    });

    this.currentPlayer = 1;
    this.movesCount = 0;
    this.movesLog = [];

    this.resetButton.disabled = true;
    this.playerToggleButton.disabled = false;
    this.isComputerThinking = false;
    this.playerDisplay.classList.remove("winner");
    this.playerDisplay.classList.remove("red");
    this.playerDisplay.classList.add("blue");
  }

  checkForWin() {
    const winPatterns = [
      // Horizontal wins
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Vertical wins
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonal wins
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        this.cells[a].classList.contains("blue") &&
        this.cells[b].classList.contains("blue") &&
        this.cells[c].classList.contains("blue")
      ) {
        return 1; // Player 1 wins
      }
      if (
        this.cells[a].classList.contains("red") &&
        this.cells[b].classList.contains("red") &&
        this.cells[c].classList.contains("red")
      ) {
        return 2; // Player 2 wins
      }
    }

    // Check for cat's game (draw)
    if (this.movesCount === 9) {
      return 3;
    }

    return 0; // Game continues
  }

  endGame() {
    console.log("Game Over");
    console.log("Moves Log:", this.movesLog);
    // Disable all remaining cells
    this.cells.forEach((cell) => {
      cell.disabled = true;
    });
  }
}

// Initialize the game
const game = new TicTacToeGame();
