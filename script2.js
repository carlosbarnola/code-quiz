let qCounter = 0;
let score = 0;
const startBtn = document.querySelector('#start-btn');
let timerEl = document.querySelector('#timer');
const mainDisplayEl = document.querySelector('#mainDisplay');
const check = document.querySelector('#checkDiv')
const saveBtnEl = document.querySelector("#saveBtn")
const viewScoreEl = document.querySelector('#view-score')
let playersArray = []
let timeleft = 10;


var mainQuestion = [
  {
    ques: "Which of the following options is a computer lenguage?",
    choices: ["English", "HTML", "Spanish", "PIOter"],
    answer: "HTML"    
  },
  {
    ques: "Select the right function syntax",
    choices: ["function[]", "var = function[]", "var myFunction = function() {}", "my Function = function() []"],
    answer: "var myFunction = function() {}"
  },
  {
    ques: "What is the correct selector to select an element by it's ID",
    choices: [".", "*", "#", "="],
    answer: "#"    
  }
]


const createQuestion = function(content) {

  var divEl = document.createElement("div")
  divEl.className ="p-3 text-center"
  mainDisplayEl.appendChild(divEl)

  var question = document.createElement("h2")
  question.className = "p-2"
  question.textContent = content
  divEl.appendChild(question)
}

var createBtnEl = function(btnContent) {
  var btnDiv = document.createElement("div")
  btnDiv.className = "d-flex justify-content-center"
  var btn = document.createElement("button");
  btn.className = "btn btn-primary m-1";
  btn.textContent = btnContent;
  btnDiv.appendChild(btn)
  mainDisplayEl.appendChild(btnDiv)
  
  btn.addEventListener("click", function(){
      var selectedAnswer = btn.textContent;
      
      if (selectedAnswer === mainQuestion[qCounter].answer) {
        var correctEl = document.createElement("h1")
        correctEl.textContent = "Correct!"
        correctEl.className = "text-center"
        check.appendChild(correctEl)
          qCounter = qCounter + 1;
          score = score + 20;
          timeleft = timeleft + 5
          start();
      } else {
        var incorrectEl = document.createElement("h1")
        incorrectEl.textContent = "Wrong!"
        incorrectEl.className = "text-center"
        check.appendChild(incorrectEl)
          qCounter = qCounter + 1;
          start();
      }
      setTimeout(function(){
        
          check.removeChild(check.firstChild)
        
      }, 400)
  });
};


const finalDisplay = function(){
  document.querySelector('#mainDisplay').innerHTML = ""
  myStopFunction()
  timerEl.remove()

  var container = document.createElement("div")
  container.className = "p-3 text-center"
  var nameLabel = document.createElement("label")
  nameLabel.textContent = "Your Initials here"
  nameLabel.className = "p-2"
  var nameInput = document.createElement("input")
  nameInput.setAttribute("type", "text")
  nameInput.setAttribute("id", "nameInput")
  
  var scoreDisplay = document.createElement("h2")
  scoreDisplay.className = "text-center"
  scoreDisplay.textContent = "Your score is " + score + " points."

  var saveBtnDiv = document.createElement("div")
  saveBtnDiv.className = "d-flex justify-content-center"
  var saveBtn = document.createElement("button")
  saveBtn.className = "btn btn-primary"
  saveBtn.textContent = "Save"
  saveBtn.setAttribute("id", "saveBtn")

  container.appendChild(nameInput)
  container.appendChild(nameLabel)

  saveBtnDiv.appendChild(saveBtn)

  mainDisplayEl.appendChild(container)
  mainDisplayEl.appendChild(scoreDisplay)
  mainDisplayEl.appendChild(saveBtnDiv)

  saveBtn.addEventListener("click", function(){
    playerObject = {"initials": nameInput.value, "score": score}
    playersArray.push(playerObject)
    localStorage.setItem("Player", JSON.stringify(playersArray))

    window.location.href = "index2.html";
  })
}

const viewScore = function() {
  var playerInfo = localStorage.getItem("Player");

  var player = JSON.parse(playerInfo);

  document.querySelector('#mainDisplay').innerHTML = ""

  var displayScoreEl = document.createElement("h2")
  displayScoreEl.className = "text-center"
  displayScoreEl.textContent = player[0].initials + " scored " + player[0].score + " points."

  mainDisplayEl.appendChild(displayScoreEl)
}

const start = function() {
  document.querySelector("#mainDisplay").innerHTML = "";

  if (qCounter === mainQuestion.length) {
    finalDisplay()
  } else {
      createQuestion(mainQuestion[qCounter].ques);

      let qstnArray = mainQuestion[qCounter].choices
      
      for(var i = 0; i <qstnArray.length; i++){
        createBtnEl(qstnArray[i]) 
      }
  };
}

const outOfTimeF = function() {
  var outOfTime = timerEl.textContent 

  if (outOfTime === "0" ) {
    window.alert("You run out of time")
    finalDisplay()
  }
}

const countDown = function() {
  var downloadTimer = setInterval(function(){
    if(timeleft <= 0){
      clearInterval(downloadTimer);
    }
    timerEl.textContent = timeleft;
    timeleft -= 1;
  }, 1000);
}


const myInterval = setInterval(function () {

  outOfTimeF()

}, 1000);

function myStopFunction() {
  clearInterval(myInterval);
}


startBtn.addEventListener("click", function(){
  start();
  countDown();
});

viewScoreEl.addEventListener("click", function(){
  viewScore()
})
