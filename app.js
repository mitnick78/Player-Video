const video = document.querySelector(".video");
const playToggler = document.querySelector(".play-toggler");
const togglerImg = document.querySelector(".play-toggler img");

video.addEventListener('click', togglePlay);
togglerImg.addEventListener('click', togglePlay);

function togglePlay() {
    if(video.paused) {
      togglerImg.src = "ressources/pause.svg";
      video.play()
    } else {
      togglerImg.src = "ressources/play.svg";
      video.pause();
    }
}

const timersDisplay = document.querySelectorAll(".time-display");
video.addEventListener("loadeddata", fillDurationVariables);
window.addEventListener("load", fillDurationVariables);
let current;
let durationTotal;


function fillDurationVariables(){
  if(Number.isNaN(video.duration)) return;
  current = video.currentTime;
  durationTotal = video.duration;
  formaValue(current, timersDisplay[0]);
  formaValue(durationTotal, timersDisplay[1]);
}

// video.removeEventListener("loadeddata", fillDurationVariables);
// window.removeEventListener("load", fillDurationVariables);

function formaValue(val, elem){
  const currentMin = Math.trunc(val / 60);
  let currentSec = Math.trunc(val % 60);

  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }
  elem.textContent = `${currentMin}:${currentSec}`;
}

const progress = document.querySelector(".progress");
video.addEventListener("timeupdate", handleTimeUpdate);

function handleTimeUpdate(){
  const currentTime = video.currentTime;
  formaValue(currentTime, timersDisplay[0]);
  const progressPosition =  currentTime / durationTotal;
  
  progress.style.transform = `scaleX(${progressPosition})`;
  if(video.ended){
    togglerImg.src= "ressources/play.svg";
  }
}

const muteBtn = document.querySelector(".mute-btn");
const muteBtnIcon = document.querySelector(".mute-btn img");

muteBtn.addEventListener("click", handleMute);

function handleMute(){
  if(video.muted) {
    video.muted = false;
    muteBtnIcon.src = "ressources/unmute.svg";
  } else {
    video.muted = true;
    muteBtnIcon.src = "ressources/mute.svg";
  }
}

const volumeSlider = document.querySelector(".volume-slider");
volumeSlider.addEventListener("change", handleVolume);

function handleVolume(){
  const volume = volumeSlider.value / 100
  video.volume = volume;
  console.log({volume})
  if(volume > 0) {
    muteBtnIcon.src = "ressources/unmute.svg";
  } else {
    muteBtnIcon.src = "ressources/mute.svg";
  }
}

const progressBar = document.querySelector(".progress-bar");
let rect = progressBar.getBoundingClientRect();
let width = rect.width;

window.addEventListener("resize", handleResize);

function handleResize() {
  rect = progressBar.getBoundingClientRect();
  width = rect.width;
}

progressBar.addEventListener('click', handleProgessNavigation)

function handleProgessNavigation(e) {
  const x = e.clientX - rect.left;
  const widthPercent = x / width ;
  video.currentTime = video.duration * widthPercent;
}

const fullScreen = document.querySelector(".fullscreen-toggler");
const videoContainer = document.querySelector(".video-container");

video.addEventListener('dblclick', handleFulleScreen);
fullScreen.addEventListener('click', handleFulleScreen);

function handleFulleScreen(){
  console.log("sdds")
  if(document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    videoContainer.requestFullscreen();
    
  }
}

