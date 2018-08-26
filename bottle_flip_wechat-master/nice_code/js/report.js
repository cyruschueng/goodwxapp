define("js/report.js", (dataAndEvents, deepDataAndEvents, obj) => {
  /**
   * @param {?} dataAndEvents
   * @param {Function} object
   * @return {undefined}
   */
  function stub(dataAndEvents, object) {
    if (!(dataAndEvents instanceof object)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  Object.defineProperty(obj, "__esModule", {
    value : true
  });
  const onErrorFnPrev = (() => {
    /**
     * @param {Function} object
     * @param {Array} d
     * @return {undefined}
     */
    function defineProperty(object, d) {
      /** @type {number} */
      let i = 0;
      for (;i < d.length;i++) {
        const desc = d[i];
        desc.enumerable = desc.enumerable || false;
        /** @type {boolean} */
        desc.configurable = true;
        if ("value" in desc) {
          /** @type {boolean} */
          desc.writable = true;
        }
        Object.defineProperty(object, desc.key, desc);
      }
    }
    return (x, current, a) => (current && defineProperty(x.prototype, current), a && defineProperty(x, a), x);
  })();
  const value = (() => {
    /**
     * @param {?} textStatus
     * @return {undefined}
     */
    function error(textStatus) {
      stub(this, error);
    }
    return onErrorFnPrev(error, null, [{
      key : "frameReport",
      /**
       * @param {?} thisValue
       * @param {string} event
       * @return {undefined}
       */
      value(thisValue, event) {
        /** @type {number} */
        let a = 0;
        switch(thisValue) {
          case "iPhone5":
            /** @type {number} */
            a = 1;
            break;
          case "iPhone5s":
            /** @type {number} */
            a = 2;
            break;
          case "iPhone6":
            /** @type {number} */
            a = 3;
            break;
          case "iPhone6s":
            /** @type {number} */
            a = 4;
            break;
          case "iPhone6Plus":
            /** @type {number} */
            a = 5;
            break;
          case "iPhone6sPlus":
            /** @type {number} */
            a = 6;
            break;
          case "iPhone7":
            /** @type {number} */
            a = 7;
            break;
          case "iPhone7s":
            /** @type {number} */
            a = 8;
            break;
          case "iPhone7Plus":
            /** @type {number} */
            a = 9;
            break;
          case "iPhone7sPlus":
            /** @type {number} */
            a = 10;
            break;
          case "iPhone8":
            /** @type {number} */
            a = 11;
            break;
          case "iPhone8Plus":
            /** @type {number} */
            a = 12;
            break;
          case "iPhoneX":
            /** @type {number} */
            a = 13;
        }
        /** @type {string} */
        (new Image).src = `https://mp.weixin.qq.com/mp/jsmonitor?idkey=58121_${3 * a}_${event};58121_${3 * a + 1}_1&t=${Math.random()}`;
      }
    }]), error;
  })();
  obj.default = value;
});
