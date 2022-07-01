// Variables
// Time
let timeEl = document.querySelector("p.time");
let secondsLeft = 60;
let scoreEl = document.querySelector("#score");

// Intro
const introEl = document.querySelector("#intro");

// Questions
const questionsEl = document.querySelector("#questions");
let questionEl = document.querySelector("#question");
let questionCount = 0;

// yaynay
const yaynayEl = document.querySelector("#yaynay");

// Final
const finalEl = document.querySelector("#final");

// Initials
let initialsInput = document.querySelector("#initials");

// Highscores
const highscoresEl = document.querySelector("#highscores");

// Ordered List
let scoreListEl = document.querySelector("#score-list");

// Array of Scores
let scoreList = [];

// Buttons
const startBtn = document.querySelector("#start");
const ansBtn = document.querySelectorAll("button.ansBtn")
const ans1Btn = document.querySelector("#answer1");
const ans2Btn = document.querySelector("#answer2");
const ans3Btn = document.querySelector("#answer3");
const ans4Btn = document.querySelector("#answer4");
const submitScrBtn = document.querySelector("#submit-score");
const goBackBtn = document.querySelector("#goback");
const clearScrBtn = document.querySelector("#clearscores");
const viewScrBtn = document.querySelector("#view-scores");

// Questions
const questions = [
    {
        
        question: "Which of the following means True or False:",
        answers: ["1. strings", "2. prompts", "3. booleans", "4. numbers"],
        correctAnswer: "2"
    },
    {
        
        question: "What is the correct JavaScript syntax to print HELLO in the console?",
        answers: ["1. log.console(HELLO)", "2. console.log(HELLO)", "3. print(HELLO)", "4. console.print(HELLO)"],
        correctAnswer: "1"
    },
    {
        
        question: "Arrays in Javascript can be used to store?",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: "3"
    },
    {
        
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["1. commmas", "2. curly brackets", "3. quotes", "4. parentheses"],
        correctAnswer: "2"
    },
    {
        
        question: "Which of the following prints content on the browser window?",
        answers: ["1. write()", "2. terminal/bash", "3. print()", "4. document.write()"],
        correctAnswer: "3"
    }
];

// Timer
function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = `Time:${secondsLeft}s`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            scoreEl.textContent = secondsLeft;
        }
    }, 1000);
}

// Quiz Start
function startQuiz() {
    introEl.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}

// Sets Question and displays the next question/answers
function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
    }
}

function checkAnswer(event) {
    event.preventDefault();

// Append Message
    yaynayEl.style.display = "block";
    let p = document.createElement("p");
    yaynayEl.appendChild(p);

// Time Count
    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

// Checks Answers
    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Wrong!";
    }
    if (questionCount < questions.length) {
        questionCount++;
    }

// Next question when any ansBtn is clicked
    setQuestion(questionCount);
}

function addScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });

// Sorting Scores
    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });
    
    scoreListEl.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

// Local Storage
    storeScores();
    displayScores();
}

function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

// Clear Scores
function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}

clearScrBtn.addEventListener("click", clearScores);

// Start timer and display first question when click start quiz
startBtn.addEventListener("click", startQuiz);

// Check Answers
ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

// Submit
submitScrBtn.addEventListener("click", addScore);

// Go Back
goBackBtn.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    introEl.style.display = "block";
    secondsLeft = 60;
    timeEl.textContent = `Time:${secondsLeft}s`;
});

// View/Hide High Scores
viewScrBtn.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } else {
        return alert("No scores to show.");
    }
});