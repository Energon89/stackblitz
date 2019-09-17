const htmlElements = { output: document.querySelector('.container [data-mode="clock"] .output')};

function onNextTick() {
    const currentTime = new Date();
    const timeStrLong  = currentTime.toTimeString();
    const timeStrShort = timeStrLong.split(' ')[0];
    htmlElements.output.innerText = timeStrShort;
  }
  
  function Clock() {};

  Clock.prototype.init = function() {
      setInterval(onNextTick, 1000)
      onNextTick();
  };

  export { Clock };