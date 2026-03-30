const bells = new Audio("./sounds/bell.wav");

const startBtn = document.querySelector(".btn-start");
const pauseBtn = document.querySelector(".btn-pause");
const resetBtn = document.querySelector(".btn-reset");

const minuteDiv = document.querySelector(".minutes");
const secondDiv = document.querySelector(".seconds");

let myInterval = null;
let totalSeconds = parseInt(minuteDiv.textContent) * 60;
let isPaused = false;

// Update UI
const updateDisplay = () => {
  let minutesLeft = Math.floor(totalSeconds / 60);
  let secondsLeft = totalSeconds % 60;

  minuteDiv.textContent = minutesLeft;
  secondDiv.textContent =
    secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;
};

// Start Timer
const startTimer = () => {
  if (myInterval !== null) return; // 🔥 prevents multiple intervals

  myInterval = setInterval(() => {
    if (!isPaused) {
      totalSeconds--;
      updateDisplay();

      if (totalSeconds <= 0) {
        clearInterval(myInterval);
        myInterval = null;
        bells.play();
      }
    }
  }, 1000);
};

// Pause / Resume
const pauseTimer = () => {
  if (!myInterval) return;

  isPaused = !isPaused;

  pauseBtn.textContent = isPaused ? "resume" : "pause";
};

// Reset
const resetTimer = () => {
  clearInterval(myInterval);
  myInterval = null;
  isPaused = false;

  totalSeconds = 25 * 60;  
  updateDisplay();

  pauseBtn.textContent = "pause";
};

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
