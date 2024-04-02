const jsBackgroundWaves = document.getElementById("js-background-waves");

const jsStartButton = document.getElementById("js-start-button");

const jsWelcomeMessage = document.getElementById("js-welcome-message");

const jsContainer = document.getElementById("js-container");

const jsShark = document.getElementById("js-shark");

const jsFish = document.getElementById("js-fish");

let userReady = false;

/* ============================= */
/* Collision Logic ============= */
/* ============================= */

function fishSharkCollision(jsFish, jsShark) {
  if (
    jsFish.x + jsFish.width >= jsShark.x &&
    jsFish.x <= jsShark.x + jsShark.width &&
    jsFish.y + jsFish.height >= jsShark.y &&
    jsFish.y <= jsShark.y + jsShark.height
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
};

jsStartButton.addEventListener("click", gameStart);

/* ============================= */
/* Move Shark Up and Down ====== */
/* ============================= */

let moveShark = function (event) {
  event.preventDefault();

  let step = 15;

  let currentPosition = parseInt(jsShark.style.top) || 0;

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
