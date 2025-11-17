const bells = new Audio("./sounds/mixkit-achievement-bell-600.wav");
const backgroundMusic = new Audio("./sounds/lofi_background_music.mp3");
backgroundMusic.loop = true;

const appMessage = document.querySelector(".app-message");
const startBtn = document.querySelector(".btn-start");
const pauseBtn = document.querySelector(".btn-pause");
const resetBtn = document.querySelector(".btn-reset");
const musicBtn = document.querySelector(".btn-music");

const minuteDiv = document.querySelector(".minutes");
const secondDiv = document.querySelector(".seconds");

let myInterval;
let totalSeconds;
let isRunning = false;
let isPaused = false;
let isMusicOn = false;


const appTimer = () => {
    
    if (isRunning) {
        alert("Session has already started.");
        return;
    }

    const sessionAmount = Number.parseInt(minuteDiv.textContent);
    totalSeconds = sessionAmount * 60;
    isRunning = true;
    isPaused = false;
    isMusicOn = true;
    toggleMusic();
    appMessage.textContent = "timer running . . .";
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
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        isMusicOn = false;
        musicBtn.textContent = "MUSIC ON";
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
        appMessage.textContent = "timer paused . ."
        backgroundMusic.pause();
        musicBtn.textContent = "MUSIC ON";
    } else {
        isPaused = false;
        myInterval = setInterval(updateSeconds, 1000);
        pauseBtn.textContent = "pause";
        appMessage.textContent = "timer running . . .";
        if (isMusicOn) {
            backgroundMusic.play();
            musicBtn.textContent = "MUSIC OFF";
        }
    }

};

const resetTimer = () => {
    clearInterval(myInterval);
    isRunning = false;
    isPaused = false;
    isMusicOn = false;
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    musicBtn.textContent = "MUSIC ON"

    appMessage.textContent = "press start to begin"
    minuteDiv.textContent = `25`;
    secondDiv.textContent = `00`;
};

const toggleMusic = () => {
    if (isMusicOn) {
        backgroundMusic.play();
        musicBtn.textContent = "MUSIC OFF";
    } else {
        backgroundMusic.pause();
        musicBtn.textContent = "MUSIC ON";
    }
}

startBtn.addEventListener("click", appTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
musicBtn.addEventListener("click", () => {
    isMusicOn = !isMusicOn;
    toggleMusic();
})