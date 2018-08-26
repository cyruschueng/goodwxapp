define("js/lib/point-in-polygon.js", (dataAndEvents, module, deepDataAndEvents) => {
  /**
   * @param {Array} args
   * @param {Array} codeSegments
   * @return {?}
   */
  module.exports = (args, codeSegments) => {
    const pageY = args[0];
    const n = args[1];
    /** @type {boolean} */
    let value = false;
    /** @type {number} */
    let i = 0;
    /** @type {number} */
    let nextIndex = codeSegments.length - 1;
    for (;i < codeSegments.length;nextIndex = i++) {
      const min = codeSegments[i][0];
      const k = codeSegments[i][1];
      const max = codeSegments[nextIndex][0];
      const len = codeSegments[nextIndex][1];
      if (k > n != len > n) {
        if (pageY < (max - min) * (n - k) / (len - k) + min) {
          /** @type {boolean} */
          value = !value;
        }
      }
    }
    return value;
  };
});
