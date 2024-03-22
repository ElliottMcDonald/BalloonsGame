const jsBackgroundWaves = document.getElementById("js-background-waves");

const jsStartButton = document.getElementById("js-start-button");

const jsWelcomeMessage = document.getElementById("js-welcome-message");

let gameStart = () => {
  jsWelcomeMessage.style.visibility = "hidden";
  userReady = true;
};

jsStartButton.addEventListener("click", () => gameStart());

window.addEventListener("keydown", function (event) {
  if (event.key === "Enter" || event.key === " ") {
    gameStart();
  }
});
