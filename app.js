const bells = new Audio("./sounds/mixkit-achievement-bell-600.wav");
const startBtn = document.querySelector(".btn-start");
const pauseBtn = document.querySelector(".btn-pause");
const resetBtn = document.querySelector(".btn-reset");
const minuteDiv = document.querySelector(".minutes");
const secondDiv = document.querySelector(".seconds");
let myInterval;
let totalSeconds;
let isRunning = false;
let isPaused = false;


const appTimer = () => {
    
    if (isRunning) {
        alert("Session has already started.");
        return;
    }

    const sessionAmount = Number.parseInt(minuteDiv.textContent);
    totalSeconds = sessionAmount * 60;
    isRunning = true;
    isPaused = false;
    pauseBtn.textContent = "pause";

    myInterval = setInterval(updateSeconds, 1000);

};

const updateSeconds = () => {
    totalSeconds--;

    let minutesLeft = Math.floor(totalSeconds / 60);
    let secondsLeft = totalSeconds % 60;

    minuteDiv.textContent = minutesLeft;
    secondDiv.textContent = secondsLeft < 10 ? "0"+secondsLeft : secondsLeft;

    if (totalSeconds <= 0) {
        bells.play();
        clearInterval(myInterval);
        isRunning = false;
    }

};

const pauseTimer = () => {

    if (!isRunning) {
        alert("Session not started yet.");
        return;
    }

    if(!isPaused) {
        isPaused = true;
        clearInterval(myInterval);
        pauseBtn.textContent = "resume";
    } else {
        isPaused = false;
        myInterval = setInterval(updateSeconds, 1000);
        pauseBtn.textContent = "pause";
    }

};

const resetTimer = () => {
    clearInterval(myInterval);
    isRunning = false;
    isPaused = false;
    // totalSeconds = 25*60;

    minuteDiv.textContent = `25`;
    secondDiv.textContent = `00`;
};

startBtn.addEventListener("click", appTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);