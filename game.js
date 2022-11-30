const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "At which point is “dynamic analysis” done?",
    choice1: "Before running the code",
    choice2: "During the code running",
    choice3: "After the code has run",
    choice4: "Never",
    answer: 2,
  },
  {
    question: "Why do we perform white box testing?",
    choice1: "To detect software errors caused by external factors",
    choice2: `To check correct execution of all
       the independent paths within a module`,
    choice3: "To verify all logical decisions on their true and false values",
    choice4: `To determine that all loops are within their boundaries and
       the operational bounds of internal data structures are valid`,
    answer: 2 && 3 && 4,
  },
  {
    question: "What is software testing used for?",
    choice1: "To test the program for ease of usability",
    choice2: "To test whether the program is pleasing to the eye.",
    choice3: "To test the program for errors and bugs. ",
    choice4: "To test whether the program has typos",
    answer: 3,
  },
  {
    question: `White box testing has other names as well. Which of the
       following is another name for white box testing?`,
    choice1: "Clear box testing ",
    choice2: "Glass box testing",
    choice3: "Open box testing",
    choice4: "Transparent box testing",
    answer: 1 && 2 && 3 && 4,
  },
  {
    question: "What is the opposite of “scripted testing”?",
    choice1: "Auditory testing",
    choice2: "Visual testing",
    choice3: "Wandering testing",
    choice4: "Exploratory testing",
    answer: 4,
  },
  {
    question: 
    `When speaking of testing
     methods, 
    which other method is usually
    mentioned along with “waterfall testing”?`,
    choice1: "Manual testing",
    choice2: "Agile testing",
    choice3: "Black box testing",
    choice4: "Quic testing",
    answer: 2,
  },
  {
    question: "Which of the following is also known as 'soak testing'?",
    choice1: "Load testing",
    choice2: "Stress testing",
    choice3: "Endurance testing",
    choice4: "Spike testing",
    answer: 3,
  },
  {
    question: `Which of the following test will help you understand what will
       happen when the load is suddenly and drastically increased?`,
    choice1: "Load testing",
    choice2: "Stress testing",
    choice3: "Endurance testing",
    choice4: "Spike testing",
    answer: 4,
  },
  {
    question: `Since there is a testing method called 'black box testing' what
       other colour is used in testing method naming conventions?`,
    choice1: "Yellow",
    choice2: "White",
    choice3: "Blue",
    choice4: "Grey",
    answer: 2 && 4,
  },
  {
    question: "What is 'sanity testing' used to determine?",
    choice1: "Whether the testers are sane",
    choice2: "Whether it is reasonable to stop testing",
    choice3: " Whether it is reasonable to proceed with further testing",
    choice4: "Whether the coders were sane",
    answer: 3,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;
let maxScore = SCORE_POINTS * MAX_QUESTIONS;

localStorage.setItem("maxScore", maxScore);

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
