//Prevention of default behaviour of page--------
function submitForm(e) {
  e.preventDefault();
  let name = document.forms["welcome_form"]["name"].value;
  
  
  //NameInfo Input by User Store
  sessionStorage.setItem("name", name);
}

//Welcome + User name will appeare after input 
function showUserName() {
  var inputText = document.getElementById("name_text").value;
  document.getElementById("displayName").innerHTML = "Welcome " + inputText;
}


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const questionNumber = document.getElementById("question_number");
const resultPage = document.getElementsByClassName("result_page");

let currentQuestionIndex = 0;
let score = 0;
let correctAns = 0;
let wrongAns = 0;
let attemptQn = 0;
let totalQn = 0;


// Start Quiz Functionalities --------------
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next Question";
  showQuestion();
}

// Question Appearance functionalities -------------------
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];

  let questionNumber = currentQuestionIndex + 1;
  sessionStorage.setItem("questionNumber", questionNumber);

  questionElement.innerHTML = currentQuestion.question;
  document.getElementById("question_number").innerHTML = questionNumber + "/" + questions.length;  

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}



//300 seconds timer------------------------
timeLeft = 300;

function countdown() {
	timeLeft--;
	document.getElementById("timer").innerHTML = String( timeLeft );
  sessionStorage.setItem("timer", `${timeLeft} seconds`);
	if (timeLeft > 0) {
		setTimeout(countdown, 1000);
	}else{
    location.href = "result.html";
  }

};
setTimeout(countdown, 1000);


// 300 seconds countdown timer --------------
let time = 0;
function timeTaken() {
  time++;
  sessionStorage.setItem("timetaken", `${time} seconds`);
  if (time === 300) {
    location.href = "result.html";
  }
}
setInterval(timeTaken, 1000);


// Reset state of Quiz--------------
function resetState(){
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}


//Answer selection functionalities -------------
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score += 1;
    correctAns += 1;
    attemptQn += 1;

    sessionStorage.setItem("score", `${(score / 10) * 100}.00%`);
    sessionStorage.setItem("correctAns", correctAns);
    sessionStorage.setItem("attemptQn", attemptQn);
    document.getElementById("score").innerHTML = `SCORE :${score}`;
    
  }else{
    selectedBtn.classList.add("incorrect");
    wrongAns += 1;
    attemptQn += 1;
    sessionStorage.setItem("wrongAns", wrongAns);
    sessionStorage.setItem("attemptQn", attemptQn);
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  })
}


//Next button text on last Question------
function NextBtnText(){
  if(currentQuestionIndex === questions.length - 1) {
    document.getElementById("next-btn").innerHTML = "Submit Quiz";
  }
}


//Next Button functionalities------------
function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
    NextBtnText();
  }else{
    location.href = "result.html";
  }
}  

nextButton.addEventListener("click",()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{    
    startQuiz();
  }
})

startQuiz();



































