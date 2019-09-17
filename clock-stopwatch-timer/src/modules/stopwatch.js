import { StopwatchTimer } from "./stopwatchTimer.js";

function Stopwatch() {
  StopwatchTimer.apply(this, ["stopwatch", 0]);
}

Stopwatch.prototype = Object.create(StopwatchTimer.prototype);

Stopwatch.prototype.showInfo = function() {
  console.log(this);
};

Stopwatch.prototype.calculateDifference = function(duration, start) {
  const difference = duration + (new Date().getTime() - start) / 1000;
  return difference;
};

export { Stopwatch };
