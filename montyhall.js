const score1 = document.querySelector("#player1Score");
const score2 = document.querySelector("#player2Score");
const infoDisplay = document.querySelector("#turnDisplay");
const resetButton = document.querySelector("#resetButton");

class MontyHall {
  constructor() {
    this.doors = document.querySelectorAll(".door");

    this.movesCount = 0;
    this.isComputerThinking = false;

    // event listeners
  }

  makeMove() {}

  reset() {}
}
