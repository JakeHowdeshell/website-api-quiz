// Created an array of objects to hold each quiz question, an array of answer choices and the location in that array where the coorect answer is located 
var quizQuestions = [
  {
    question: "question 1",
    choices: ["choice 1", "choice 2", "choice 3", "choice 4"],
    correctAnswer: 1,
  },
  {
    question: "question 2",
    choices: ["choice 1", "choice 2", "choice 3", "choice 4"],
    correctAnswer: 1,
  },
  {
    question: "question 3",
    choices: ["choice 1", "choice 2", "choice 3", "choice 4"],
    correctAnswer: 1,
  },
  {
    question: "question 4",
    choices: ["choice 1", "choice 2", "choice 3", "choice 4"],
    correctAnswer: 1,
  },
  {
    question: "question 5",
    choices: ["choice 1", "choice 2", "choice 3", "choice 4"],
    correctAnswer: 1,
  },
  {
    question: "question 6",
    choices: ["choice 1", "choice 2", "choice 3", "choice 4"],
    correctAnswer: 1,
  },
];
// These variables allow acess to the HTML file at those Id's
var startButton = document.getElementById('start-button');
var questionContainer = document.getElementById('question');
var submissionContainer = document.getElementById('submission');
// 
var currentQuestionIndex = 0;
var timeLeft = 75;
var timeInterval;
var highScores = [];

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  document.getElementById("start").style.display = "none";
  showQuestion();
  startTimer();
}

function startTimer() {
  timeInterval = setInterval(function () {
    timeLeft--;
    document.getElementById("timer").textContent = "Time: " + timeLeft;

    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

function showQuestion() {
  var currentQuestion = quizQuestions[currentQuestionIndex];
  questionContainer.innerHTML = "<h1>" + currentQuestion.question + "<h1>";

  var choicesEl = "";
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    choicesEl +=
      '<button onclick="checkAnswer(' +
      i +
      ')">' +
      currentQuestion.choices[i] +
      "</button><br>";
  }
  questionContainer.innerHTML += choicesEl;
}

function checkAnswer(choiceIndex) {
  var currentQuestion = quizQuestions[currentQuestionIndex];
  if (choiceIndex === currentQuestion.correctAnswer) {
    // work to display this on page
    alert("Correct!");
    questionContainer.innerHTML = "<p>Correct</p>";
    console.log(questionContainer);
  } else {
    alert("Wrong!");
    questionContainer.innerHTML = "<p>Inorrect</p>";
    timeLeft -= 10;
    if (timeLeft < 0) {
      timeLeft = 0;
    }
  }
  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timeInterval);
  questionContainer.style.display = "none";

  submissionContainer.innerHTML =
    "<h1>All Done!</h1><p>Your Score: " +
    timeLeft +
    "</p><input type='text' id='initials' placeholder='Enter your initials'><button onclick='saveScore()'>Save</button>";
}

function saveScore() {
  var initials = document.getElementById("initials").value;
  var score = timeLeft;

  var scoreObj = {
    initials,
    score,
  };
  highScores.push(scoreObj);

  localStorage.setItem("highScores", JSON.stringify(highScores));
}

function getScores() {
  var storedScores = localStorage.getItem("highScores");

  if (storedScores !== null) {
    highScores = JSON.parse(storedScores);

    var highScoresContainer = document.getElementById("highscores-container");
    highScoresContainer.style.display = "block";

    var highScoresLink = document.getElementById("highscores-link");
    highScoresLink.addEventListener("click", function (event) {
      event.preventDefault();
      showHighScores();
    });
  }
}

function showHighScores() {
  var highScoresList = document.getElementById("highscores");
  var quizContainer = document.getElementById('quiz-container');
  quizContainer.style.display = 'none';
  var highScoresLink = document.getElementById('highscores-link');
  highScoresLink.style.display = 'none'
  highScoresList.innerHTML = "<h2>High Scores</h2>";

  for (var i = 0; i < highScores.length; i++) {
    var scoreItem = document.createElement("ol");
    scoreItem.textContent = highScores[i].initials + ": " + highScores[i].score;
    highScoresList.appendChild(scoreItem);
  }
highScoresList.innerHTML = "<button onclick='#quiz-container'>Go Back</button> <button onclick="
}

getScores();
