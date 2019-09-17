const htmlElements = {
  onOff: document.querySelector(".checkbox"),
  audioFileSelect: document.querySelector(".audiofile"),
  platter: document.querySelector(".platter"),
  output: document.querySelector(".output"),
  toneArm: document.querySelector(".toneArmTwo"),
  toneBase: document.querySelector(".toneBase"),
  volume: document.querySelector(".range")
};
let audioValue = htmlElements.audioFileSelect.value;
let audio, time;
let onoffswitch = "running";
let angle;
let displacement = 0;
let duration = 0;
let pause = false;

//new CircleType(document.querySelector(".text")).radius();

htmlElements.onOff.addEventListener("click", onoff);
htmlElements.audioFileSelect.addEventListener("change", () => {
  if (onoffswitch !== "running") {
    off();
  }
  audioValue = htmlElements.audioFileSelect.value;
  audio = new Audio(audioValue);
  console.log(htmlElements.audioFileSelect.name);
  htmlElements.volume.addEventListener("change", function() {
    audio.volume = this.value;
  });
  audio.addEventListener("loadedmetadata", function() {
    duration = audio.duration;
    angle = 25;
    displacement = 25 / duration / 100;
  });
  toggleButton();
  htmlElements.toneBase.setAttribute("style", "transform: rotate(0deg)");
  htmlElements.output.innerText = "00:00:00:000";
});

function onoff() {
  if (onoffswitch === "running") {
    rotate().then(() => {
      htmlElements.toneBase.classList.remove("rotate");
      htmlElements.platter.classList.add("platter-spin");
      audio.play();
      onoffswitch = "off";
      time = setInterval(updateTrackTime, 10);
    });
  } else {
    off();
  }
  audio.onended = function() {
    off();
    htmlElements.output.innerText = "00:00:00:000";
    htmlElements.toneBase.setAttribute("style", "transform: rotate(0deg)");
  };
}

function off() {
  htmlElements.platter.classList.remove("platter-spin");
  audio.pause();
  onoffswitch = "running";
  pause = true;
  htmlElements.onOff.checked = false;
  clearInterval(time);
}

//disabled buttons when audio file is not selected
function toggleButton() {
  if (audioValue !== "not selected") {
    htmlElements.onOff.removeAttribute("disabled");
  } else {
    htmlElements.onOff.setAttribute("disabled", "true");
  }
}
toggleButton();

function updateTrackTime() {
  const currTime = audio.currentTime;

  let millisec = parseInt(currTime * 1000) % 1000;
  let seconds = parseInt(currTime % 60);
  let minutes = parseInt((currTime / 60) % 60);
  let hours = parseInt(currTime / 3600);

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  if (millisec < 10) {
    millisec = `00${millisec}`;
  }
  if (millisec < 100) {
    millisec = `0${millisec}`;
  }
  if (millisec === 1000) {
    millisec = `000`;
  }

  htmlElements.output.innerText = `${hours}:${minutes}:${seconds}:${millisec}`;
  const finalAngle = 50;
  angle = angle + displacement;

  if (angle < finalAngle) {
    htmlElements.toneBase.setAttribute(
      "style",
      "transform: rotate(" + angle + "deg)"
    );
  }
}

function rotate() {
  if (pause === false) {
    return new Promise(resolve => {
      htmlElements.toneBase.classList.add("rotate");
      setTimeout(() => resolve(), 1000);
    });
  } else {
    return new Promise(resolve => {
      resolve();
    });
  }
}
