define("js/random.js", (dataAndEvents, deepDataAndEvents, o) => {
  Object.defineProperty(o, "__esModule", {
    value : true
  });
  let text = void 0;
  /**
   * @return {?}
   */
  const floor = () => (text = (9301 * text + 49297) % 233280, Math.floor(text / 233280 * 100) / 100);
  /**
   * @param {number} textAlt
   * @return {undefined}
   */
  o.setRandomSeed = textAlt => {
    /** @type {number} */
    text = textAlt;
  };
  /**
   * @return {?}
   */
  o.random = function() {
    if (0 === arguments.length) {
      return floor();
    }
    if (1 === arguments.length) {
      const arr = arguments[0];
      return Math.floor(floor() * arr);
    }
    const iterable = arguments[0];
    const thisp = arguments[1];
    return Math.floor(floor() * (thisp - iterable)) + iterable;
  };
});
