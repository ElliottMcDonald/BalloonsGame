const jsBackgroundWaves = document.getElementById("js-background-waves");

const jsStartButton = document.getElementById("js-start-button");

const jsWelcomeMessage = document.getElementById("js-welcome-message");

const jsContainer = document.getElementById("js-container");

const jsShark = document.getElementById("js-shark");

const jsFish = document.getElementById("js-fish");

let userReady = false;

let fishArray = [];

/* ============================= */
/* Spawn the Fish ============== */
/* ============================= */

let spawnFish = () => {
  let fish = document.createElement("div");
  fish.classList.add("fish", "js-Fish");
  fish.style.backgroundColor = "yellow";
  fish.style.position = "absolute";
  fish.style.left = "0";
  fishHeight = jsContainer.clientHeight * 0.15;
  fish.style.top = `${
    Math.random() * (jsContainer.clientHeight - fishHeight)
  }px`;
  jsContainer.appendChild(fish);
  fishArray.push(fish);
};

/* ============================= */
/* Move Fish =================== */
/* ============================= */

let moveFish = () => {
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

    if (fishSharkCollision(fish, jsShark) === true) {
      console.log("Collision at index ", i);
      jsContainer.removeChild(fish);
      fishArray.splice(i, 1);
    } else if (fishLeftPosition >= jsContainer.clientWidth) {
      console.log("Fish off screen at index ", i);
      jsContainer.removeChild(fish);
      fishArray.splice(i, 1);
    }
  }
};

/* ============================= */
/* Collision Logic ============= */
/* ============================= */

function fishSharkCollision(fish, jsShark) {
  let fishXAxisPosition = parseInt(fish.style.left, 10);
  let fishYAxisPosition = parseInt(fish.style.top, 10);
  let fishWidth = fish.offsetWidth;
  let fishHeight = fish.offsetHeight;

  let jsSharkXAxisPosition = parseInt(jsShark.style.left, 10);
  let jsSharkYAxisPosition = parseInt(jsShark.style.top, 10);
  let jsSharkWidth = jsShark.offsetWidth;
  let jsSharkHeight = jsShark.offsetHeight;

  if (
    fishXAxisPosition + fishWidth > jsSharkXAxisPosition &&
    fishXAxisPosition < jsSharkXAxisPosition + jsSharkWidth &&
    fishYAxisPosition + fishHeight > jsSharkYAxisPosition &&
    fishYAxisPosition < jsSharkYAxisPosition + jsSharkHeight
  )
    return true;
  else {
    return false;
  }
}

/* ============================= */
/* Start Game ================== */
/* ============================= */

let gameStart = () => {
  jsWelcomeMessage.style.visibility = "hidden";
  userReady = true;
  spawnTimer = setInterval(spawnFish, 500);
  movementTimer = setInterval(moveFish, 250);
};

jsStartButton.addEventListener("click", gameStart);

/* ============================= */
/* Move Shark Up and Down ====== */
/* ============================= */

let moveShark = function (event) {
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
};

window.addEventListener("keydown", (event) => {
  if (userReady === true) {
    moveShark(event);
  }
});
