class MontyHallGame {
  constructor() {
    this.doors = document.querySelectorAll(".door");
    this.resetButton = document.querySelector("#reset");
    this.doorStatus = []; // Array to store door status

    this.movesCount = 0;
    this.isComputerThinking = false;
    this.doorHandlers = [];

    this.wins = parseInt(localStorage.getItem("montyHallWins")) || 0;
    this.losses = parseInt(localStorage.getItem("montyHallLosses")) || 0;

    console.log("----------\nMonty Hall\n----------");

    this.initializeBoard();
    this.initializeEventListeners();
    this.updateScoreDisplay();
  }

  initializeBoard() {
    let winningDoor = Math.floor(Math.random() * 3);
    this.doorStatus = Array(3).fill("goat");
    this.doorStatus[winningDoor] = "car";
    console.log("New Game");
  }

  initializeEventListeners() {
    this.resetButton.addEventListener("click", () => this.resetGame());

    this.doors.forEach((door, index) => {
      const handler = () => this.makeMove(index);
      this.doorHandlers.push(handler);
      door.addEventListener("click", handler);
    });
  }

  makeMove(doorIndex) {
    if (
      this.isComputerThinking ||
      this.doors[doorIndex].classList.contains("open")
    )
      return;

    this.movesCount++;
    if (this.movesCount === 1) {
      this.initialSelection = doorIndex;
      this.resetButton.disabled = false;
    }
    console.log(`Selected door #${doorIndex + 1}`);
    this.computerMove(doorIndex);
  }

  openDoor(door, index) {
    door.classList.add("open");
    door.classList.add(this.doorStatus[index]);
    door.removeEventListener("click", this.doorHandlers[index]);
    if (this.movesCount === 1) {
      console.log(
        `Door #${index + 1} has a ${this.doorStatus[index]} behind it`
      );
    }
  }

  openDoor(door, index) {
    door.classList.add("open");
    door.classList.add(this.doorStatus[index]); // Add class based on door status
    door.removeEventListener("click", this.doorHandlers[index]);
  }

  computerMove(selectedDoorIndex) {
    this.isComputerThinking = true;

    if (this.movesCount == 1) {
      const availableDoors = this.doorStatus.reduce((acc, status, index) => {
        if (status === "goat" && index !== selectedDoorIndex) acc.push(index);
        return acc;
      }, []);

      setTimeout(() => {
        let doorToOpenIndex =
          availableDoors[Math.floor(Math.random() * availableDoors.length)];
        this.openDoor(this.doors[doorToOpenIndex], doorToOpenIndex);
        this.isComputerThinking = false;
      }, 500);
    }

    if (this.movesCount == 2) {
      const unopenedDoors = Array.from(this.doors).filter(
        (door) => !door.classList.contains("open")
      );

      unopenedDoors.forEach((door, index) => {
        setTimeout(() => {
          const doorIndex = Array.from(this.doors).indexOf(door);
          this.openDoor(door, doorIndex);

          if (index === unopenedDoors.length - 1) {
            this.isComputerThinking = false;
            const isWin = this.doorStatus[selectedDoorIndex] === "car";
            this.updateScore(isWin);

            if (selectedDoorIndex === this.initialSelection) {
              console.log(`Stayed with door #${selectedDoorIndex + 1}`);
            } else {
              console.log(`Changed to door #${selectedDoorIndex + 1}`);
            }
            console.log(isWin ? "You Win!" : "You Lose :(");
            console.log("\n"); // Add a blank line for readability
          }
        }, (index + 1) * 500);
      });
    }
  }

  updateScore(isWin) {
    if (isWin) {
      this.wins++;
      localStorage.setItem("montyHallWins", this.wins);
    } else {
      this.losses++;
      localStorage.setItem("montyHallLosses", this.losses);
    }
    this.updateScoreDisplay();
  }

  updateScoreDisplay() {
    const resultsDiv = document.querySelector(".results");
    resultsDiv.innerHTML = `
        <p>Wins: ${this.wins}</p>
        <p>Losses: ${this.losses}</p>
      `;
  }

  resetGame() {
    this.doors.forEach((door, index) => {
      door.removeEventListener("click", this.doorHandlers[index]);
      door.classList.remove("open", "car", "goat");
    });

    this.movesCount = 0;
    this.isComputerThinking = false;
    this.doorHandlers = [];
    this.resetButton.disabled = true;

    this.initializeBoard();
    this.initializeEventListeners();
    this.updateScoreDisplay();

    this.initialSelection = null;
  }
}

const game = new MontyHallGame();
