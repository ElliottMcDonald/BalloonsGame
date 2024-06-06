const jsBackgroundWaves = document.getElementById("js-background-waves");

const jsStartButton = document.getElementById("js-start-button");

const jsWelcomeMessage = document.getElementById("js-welcome-message");

const jsScoreCounter = document.getElementById("js-score-counter");

const jsContainer = document.getElementById("js-container");

const jsShark = document.getElementById("js-shark");

const jsGameOverMessage = document.getElementById("js-game-over-message");

let userReady = false;

let fishArray = [];

/* ============================= */
/* Spawn the Fish ============== */
/* ============================= */

function spawnFish() {
  let fish = document.createElement("div");
  fish.classList.add("fish");
  fish.style.backgroundColor = "yellow";
  fish.style.position = "absolute";
  fish.style.left = "0";
  fishHeight = jsContainer.clientHeight * 0.15;
  fish.style.top = `${
    Math.random() * (jsContainer.clientHeight - fishHeight)
  }px`;
  jsContainer.appendChild(fish);
  fishArray.push(fish);
}

/* ============================= */
/* Move Fish =================== */
/* ============================= */

function moveFish() {
  for (let i = fishArray.length - 1; i >= 0; i--) {
    let fish = fishArray[i];
    let fishLeftPosition = parseInt(fish.style.left, 10);
    let leftMovementRange = jsContainer.clientWidth / 25;
    fish.style.left = `${
      fishLeftPosition + Math.random() * leftMovementRange
    }px`;

    let fishHeight = parseInt(fish.offsetHeight, 10);

    let fishTopPosition = parseInt(fish.style.top, 10);
    let topMovementRange =
      ((Math.random() - 0.5) * jsContainer.clientHeight) / 15;
    let newTopPosition = fishTopPosition + topMovementRange;

    if (newTopPosition > jsContainer.clientHeight - fishHeight) {
      newTopPosition = jsContainer.clientHeight - fishHeight;
    }
    if (newTopPosition < 0) {
      newTopPosition = 0;
    }

    fish.style.top = `${newTopPosition}px`;

    if (fishSharkCollision(fish, jsShark)) {
      console.log(`Collision with fish ${i}`);
      jsContainer.removeChild(fish);
      fishArray.splice(i, 1);
    } else if (fishLeftPosition >= jsContainer.clientWidth) {
      console.log(`Fish off screen at index ${i}`);
      jsContainer.removeChild(fish);
      fishArray.splice(i, 1);
    }
  }
}

/* ============================= */
/* Collision Logic ============= */
/* ============================= */

let score = 0;

function fishSharkCollision(fish, jsShark) {
  let fishBCRect = fish.getBoundingClientRect();
  let jsSharkBCRect = jsShark.getBoundingClientRect();

  if (
    fishBCRect.x + fishBCRect.width > jsSharkBCRect.x &&
    fishBCRect.x < jsSharkBCRect.x + jsSharkBCRect.width &&
    fishBCRect.y + fishBCRect.height > jsSharkBCRect.y &&
    fishBCRect.y < jsSharkBCRect.y + jsSharkBCRect.height
  ) {
    score++;
    console.log(`Score: ${score}`);
    jsScoreCounter.innerHTML = `Score: ${score}`;
    return true;
  } else {
    return false;
  }
}

/* ============================= */
/* Start Game ================== */
/* ============================= */

function gameStart() {
  if (counter >= 1 || score >= 1) {
    resetGame();
  }
  jsWelcomeMessage.style.display = "none";
  jsScoreCounter.style.display = "block";
  jsGameOverMessage.style.display = "none";
  userReady = true;
  spawnTimer = setInterval(spawnFish, 1000);
  movementTimer = setInterval(moveFish, 250);
  countdownTimer = setInterval(countdown, 100);
}

function resetGame() {
  counter = 0;
  score = 0;
  jsScoreCounter.innerHTML = "Score: 0";
  fishArray.forEach((fish) => {
    jsContainer.removeChild(fish);
  });
  fishArray = [];
}

const jsStartButtons = document.querySelectorAll(".start-button");

jsStartButtons.forEach(function (button) {
  button.addEventListener("click", gameStart);
});

/* ============================= */
/* Stop Game =================== */
/* ============================= */

let counter = 0;

function countdown() {
  counter++;
  console.log(`Timer: ${counter}`);
  if (counter >= 15) {
    stopGame();
  }
}

const jsResultNumber = document.getElementById("js-result-number");

const jsPlayerScore = document.getElementById("js-player-score");

function stopGame() {
  userReady = false;
  //moveShark function cannot be moved anymore. Shark
  //object cannot be moved by player. preventDefault() also disabled so
  //text input field in gameOverScreen takes keydown inputs.
  clearInterval(spawnTimer);
  clearInterval(movementTimer);
  clearInterval(countdownTimer);
  jsScoreCounter.style.display = "none";
  gameOverScreen();
}

function gameOverScreen() {
  jsGameOverMessage.style.display = "block";
  jsResultNumber.innerHTML = `${score}`;
  jsResultNumber.style.fontSize = "1.5rem";
  jsPlayerScore.value = `${score}`;
}

const scoreForm = document.getElementById("score-form");

scoreForm.addEventListener("submit", function (e) {
  e.preventDefault();
  scoreForm.innerHTML = `<div class="loading-box">
  <img src="img/loading.svg" class="loading" alt="loading">
  <p>Submitting your score</p>
  </div>`;

  setTimeout(function () {
    scoreForm.innerHTML = `<p>Score submitted</p>`;
  }, 2000);
});

/* ============================= */
/* Move Shark Up and Down ====== */
/* ============================= */

function moveShark(event) {
  event.preventDefault();

  let step = 15;

  let currentPosition = parseInt(jsShark.style.top, 10) || 0;

  switch (event.key) {
    case "ArrowUp":
      currentPosition = Math.max(currentPosition - step, 0);
      break;
    case "ArrowDown":
      currentPosition = Math.min(
        currentPosition + step,
        jsContainer.clientHeight - jsShark.clientHeight
      );
      break;
  }

  jsShark.style.top = currentPosition + "px";
}

window.addEventListener("keydown", (event) => {
  if (userReady === true) {
    moveShark(event);
  }
});
