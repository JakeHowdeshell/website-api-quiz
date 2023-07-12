// Created an array of objects to hold each quiz question, an array of answer choices and the location in that array where the coorect answer is located
var quizQuestions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choices: ["javascript", "scripting", "script", "js"],
    correctAnswer: 2,
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    choices: ["body", "head", "Neither", "Both"],
    correctAnswer: 3,
  },
  {
    question:
      'What is the correct syntax for referring to an external script called "xxx.j"?',
    choices: [
      'script name="xxx.js"',
      'script src="xxx.js"',
      'script href="xxx.js"',
      'script link="xxx.js"',
    ],
    correctAnswer: 1,
  },
  {
    question: 'How do you write "JavaScript" in an alert box?',
    choices: [
      'msgBox("JavaScript")',
      'alertBox("JavaScript")',
      'alert("JavaScript")',
      'msg("Javascript")',
    ],
    correctAnswer: 2,
  },
  {
    question: "How do you create a function in JavaScript?",
    choices: [
      "function myFunction()",
      "function = myFunction()",
      "function:myFunction()",
      "function {myFunction()}",
    ],
    correctAnswer: 0,
  },
  {
    question: "How can you add a comment in a JavaScript?",
    choices: ['"Comment"', "{{Comment}}", "/*Comment*/", "//Comment"],
    correctAnswer: 3,
  },
];
// These variables allow acess to the HTML file at those Id's
var startButton = document.getElementById("start-button");
var questionContainer = document.getElementById("question");
var submissionContainer = document.getElementById("submission");
// global variables that start the question index at the first object. Starts the timer off at 75 seconds.
//Allows the time interval to be set while also stopping it when all the questions have been completed.
//sets up an array for the highscores
var currentQuestionIndex = 0;
var timeLeft = 75;
var timeInterval;
var highScores = [];
//created a event listener to call the first function through a click
startButton.addEventListener("click", startQuiz);
// starts the quiz by removing the items stored in the start element and runs
// a function that shows the first question and starts the timer.
function startQuiz() {
  document.getElementById("start").style.display = "none";
  showQuestion();
  startTimer();
}
// function that begins the timer incrementing it down every second, and displays the timer on the page.
// calls the function endQuiz if the time reaches zero.
function startTimer() {
  timeInterval = setInterval(function () {
    timeLeft--;
    document.getElementById("timer").textContent = "Time: " + timeLeft;

    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}
// displays the question as an h1 element at the current index of the question quiz object array starting at 0.
// uses an empty string to display button elements containing the choices from each choice array inside the object array.
// after all button elements have been created for each choice it then adds that to the var questionContainer
// which links to the Id provided in HTML
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
// checks the array location of the answer picked and compairs it to the array location of the correct answer provided in the question object
// If those array locations match it will display on the page "Correct!" for 1 second before the next function runs,
//if they do not match it will display "Wrong!" for one second before the next function runs and remove 10 seconds from the timeLeft.
// if the time drops below 0 due to the penalty it will set the time back to zero.

function checkAnswer(choiceIndex) {
  var currentQuestion = quizQuestions[currentQuestionIndex];
  var answerContainer = document.createElement("p");
  if (choiceIndex === currentQuestion.correctAnswer) {
    answerContainer.textContent = "Correct!";
  } else {
    answerContainer.textContent = "Wrong!";
    timeLeft -= 10;
    if (timeLeft < 0) {
      timeLeft = 0;
    }
  }
  questionContainer.appendChild(answerContainer);
  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    setTimeout(showQuestion, 1000);
  } else {
    setTimeout(endQuiz, 1000);
  }
}
// stops the time from running removes the content provided in the question container
// displays a message linked to the submission class, allowing you to provide your initials and submit using a button.
function endQuiz() {
  clearInterval(timeInterval);
  questionContainer.style.display = "none";

  submissionContainer.innerHTML =
    "<h1>All Done!</h1><p>Your Score: " +
    timeLeft +
    "<div class='initials'></p><input type='text' id='initials' placeholder='Enter your initials'><button onclick='saveScore()'>Save</button></div>";
}
// takes the initials and time left puts them in an object and stores them to local storage as a string. Then runs a function to push them into a global array.
// then runs the function show highscores
function saveScore() {
  var initials = document.getElementById("initials").value;
  var score = timeLeft;

  var scoreObj = {
    initials,
    score,
  };
  highScores.push(scoreObj);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  showHighScores();
}
// grabs the scores stored in local storage and places them in the variable storedScores which is puts them on the page where the id highscores is located
// also provides an event listener as a click to a hyperlink that brings you ot all the stored scores.
function getScores() {
  var storedScores = localStorage.getItem("highScores");

  if (storedScores !== null) {
    highScores = JSON.parse(storedScores);

    var highScoresLink = document.getElementById("highscores-link");
    highScoresLink.addEventListener("click", function (event) {
      event.preventDefault();
      clearInterval(timeInterval);
      showHighScores();
    });
  }
}
// allows you to clear all the stored scores and refreshes the window taking you back to the start of the quiz
function clearScores() {
  localStorage.removeItem("highScores");
  window.location.reload();
}
// removes all other elements and displays the highscores in an unorderd list that takes the initals and scores from a global array at each index until the length of the array has been met.
// then generates buttons that allow the user to clear the highscores by removing the local storage or return to the start of the quiz by refreshing the web browser.
function showHighScores() {
  var highScoresList = document.getElementById("highscores");
  var quizContainer = document.getElementById("quiz-container");
  quizContainer.style.display = "none";
  var highScoresLink = document.getElementById("highscores-link");
  highScoresLink.style.display = "none";
  highScoresList.innerHTML = "<h2>High Scores</h2>";

  for (var i = 0; i < highScores.length; i++) {
    var scoreItem = document.createElement("ul");
    scoreItem.textContent = highScores[i].initials + ": " + highScores[i].score;
    highScoresList.appendChild(scoreItem);
  }
  var highScoresButtons = document.getElementById("highscores-buttons");
  highScoresButtons.innerHTML =
    "<button onclick='window.location.reload()'>Go Back</button> <button onclick='clearScores()'>Clear Scores</button>";
}

getScores();
