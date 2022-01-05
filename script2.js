let questionIdCounter = 0;
const startBtn = document.querySelector('#start-btn');
const timer = document.querySelector('#timer');
const mainDisplayEl = document.querySelector('#mainDisplay');

const question = [
  "What is a HTML?",
  "What is CSS?"
]

const options = [
  {
    1: "A game",
    2:"A coding lenguage",
    3:"A car"
  }
]


const countDown = function() {
  var timeleft = 60;
  var downloadTimer = setInterval(function(){
    if(timeleft <= 0){
      clearInterval(downloadTimer);
    }
    timer.textContent = timeleft;
    timeleft -= 1;
}, 1000);
}

const initialGreating = function() {
  var initialDivEl = document.createElement("div");
  initialDivEl.className = "p-3 text-center";

  var initialH2El = document.createElement("h2");
  initialH2El.className = "display-4 p-2";
  initialH2El.textContent = "Welcome to Code Quiz!"
  initialDivEl.appendChild(initialH2El);

  var initialPEl = document.createElement("p")
  initialPEl.innerHTML = "Try to answer the following code-related questions within the time limit<br>Keep in mind that incorrect answer will penalize your score/time<br>by ten seconds!"
  initialDivEl.appendChild(initialPEl);

  mainDisplayEl.appendChild(initialDivEl)
};


const createQuestion = function() {
  var divEl = document.createElement("div")
  divEl.className ="p-3 text-center"
}


initialGreating()

startBtn.addEventListener('click', countDown)