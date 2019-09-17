import { ClassHelper } from "./classHelper.js";

function StopwatchTimer(initMode, initSeconds) {
  let mode = initMode;
  let time, start, currentTime, difference;
  let startTime = initSeconds;
  const self = this;

  this.htmlElements = {
    output: document.querySelector(
      `.container [data-mode = "${mode}"] .output`
    ),
    buttons: document.querySelectorAll(
      `.container .tabs [data-mode="${mode}"] .buttons button`
    ),
    startButton: document.querySelector(
      `.container .tabs [data-mode="${mode}"] .buttons .start`
    ),
    stopButton: document.querySelector(
      `.container .tabs [data-mode="${mode}"] .buttons .stop`
    ),
    resetButton: document.querySelector(
      `.container .tabs [data-mode="${mode}"] .buttons .reset`
    )
  };

  const htmlElements = this.htmlElements;

  const onStartButtonClick = () => {
    start = new Date().getTime();
    time = setTimeout(myInterval, 1000);
    ClassHelper.removeClass("disabled", htmlElements.buttons);
    ClassHelper.addClass("disabled", [htmlElements.startButton]);
  };

  const onStopButtonClick = () => {
    ClassHelper.removeClass("disabled", htmlElements.buttons);
    ClassHelper.addClass("disabled", [htmlElements.stopButton]);
    clearTimeout(time);
    startTime = currentTime;
  };

  const onResetButtonClick = () => {
    clearTimeout(time);
    ClassHelper.removeClass("disabled", htmlElements.buttons);
    ClassHelper.addClass("disabled", [htmlElements.resetButton]);
    start = new Date().getTime();
    startTime = initSeconds;
    myInterval();
    clearTimeout(time);
  };

  const myInterval = () => {
    difference = self.calculateDifference(startTime, start);

    let hours = parseInt(difference / 3600);
    let minutes = parseInt((difference / 60) % 60);
    let seconds = parseInt(difference % 60);

    currentTime = hours * 3600 + minutes * 60 + seconds;

    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    htmlElements.output.innerText = `${hours}:${minutes}:${seconds}`;

    time = setTimeout(myInterval, 1000);

    if (difference <= 0) {
      clearTimeout(time);
    }
  };

  htmlElements.startButton.addEventListener("click", onStartButtonClick);
  htmlElements.stopButton.addEventListener("click", onStopButtonClick);
  htmlElements.resetButton.addEventListener("click", onResetButtonClick);
}

export { StopwatchTimer };
