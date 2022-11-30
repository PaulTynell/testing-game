const finalScore = document.querySelector("#finalScore");

const mostRecentScore = localStorage.getItem("mostRecentScore");
const loser = document.querySelector(".loser");
const winner = document.querySelector(".winner");
const okay = document.querySelector(".okay");

finalScore.innerText = mostRecentScore;

displayMessage = () => {
  if (mostRecentScore < 300) {
    loser.classList.remove("hidden");
  } else if (mostRecentScore >= 300 && mostRecentScore < 700) {
    okay.classList.remove("hidden");
  } else {
    winner.classList.remove("hidden");
  }
};

displayMessage();
