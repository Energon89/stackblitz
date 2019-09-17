import { Clock } from "./clock.js";
import { Tabs } from "./tabs.js";
import { Timer } from "./timer.js";
import { Stopwatch } from "./stopwatch.js";

const clock = new Clock();
const tabs = new Tabs();
const stopwatch = new Stopwatch();
const timer = new Timer();

function init() {
  clock.init();
  tabs.init("clock");
}

init();
timer.showInfo();
stopwatch.showInfo();
