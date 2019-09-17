function addClass(className, elem) {
  elem.forEach(function(elem) {
    elem.classList.add(className);
  });
}

function removeClass(className, elem) {
  elem.forEach(function(elem) {
    elem.classList.remove(className);
  });
}

function ClassHelper() {}
ClassHelper.addClass = addClass;
ClassHelper.removeClass = removeClass;

export { ClassHelper };
