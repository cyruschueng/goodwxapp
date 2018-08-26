define("js/stageManager.js", (dataAndEvents, deepDataAndEvents, obj) => {
  /**
   * @param {?} value
   * @param {Function} type
   * @return {undefined}
   */
  function round(value, type) {
    if (!(value instanceof type)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  Object.defineProperty(obj, "__esModule", {
    value : true
  });
  const A = (() => {
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
     * @return {undefined}
     */
    function n() {
      round(this, n);
      this._stages = {};
      /** @type {null} */
      this._current = null;
    }
    return A(n, [{
      key : "navigatorTo",
      /**
       * @param {?} idx
       * @param {?} start
       * @return {undefined}
       */
      value(idx, start) {
        if (this._current && this._pages[idx]) {
          this._current.destroyStage();
          this._current = this._pages[idx];
          this._current.initStage(start);
        } else {
          console.warn("StageManager navigator fail");
        }
      }
    }, {
      key : "register",
      /**
       * @param {?} path
       * @param {?} root
       * @return {undefined}
       */
      value(path, root) {
        if ("function" == typeof root.destroyStage && "function" == typeof root.initStage) {
          this._stages[path] = root;
        } else {
          consoel.warn("StageManager ");
        }
      }
    }]), n;
  })();
  obj.default = value;
});
