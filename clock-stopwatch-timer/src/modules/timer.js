import { StopwatchTimer } from "./stopwatchTimer.js";

function Timer() {
  const callFunction = StopwatchTimer.bind(this, "timer", 300);
  callFunction();
}

Timer.prototype = Object.create(StopwatchTimer.prototype);

Timer.prototype.showInfo = function() {
  console.log(this);
};

Timer.prototype.calculateDifference = function(duration, start) {
  let difference = duration - Math.round((new Date().getTime() - start) / 1000);
  return difference;
};

export { Timer };
