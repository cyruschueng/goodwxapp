define("js/scroll/friction.js", (dataAndEvents, deepDataAndEvents, obj) => {
  /**
   * @param {?} dataAndEvents
   * @param {Function} clickHandler
   * @return {undefined}
   */
  function bindSanitizedClickHandler(dataAndEvents, clickHandler) {
    if (!(dataAndEvents instanceof clickHandler)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  Object.defineProperty(obj, "__esModule", {
    value : true
  });
  const bindEvt = (() => {
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
     * @param {?} e
     * @return {undefined}
     */
    function clickHandler(e) {
      bindSanitizedClickHandler(this, clickHandler);
      this._drag = e;
      /** @type {number} */
      this._dragLog = Math.log(e);
      /** @type {number} */
      this._x = 0;
      /** @type {number} */
      this._v = 0;
      /** @type {number} */
      this._startTime = 0;
    }
    return bindEvt(clickHandler, [{
      key : "set",
      /**
       * @param {number} x
       * @param {Array} val
       * @return {undefined}
       */
      value(x, val) {
        /** @type {number} */
        this._x = x;
        /** @type {Array} */
        this._v = val;
        /** @type {number} */
        this._startTime = (new Date).getTime();
      }
    }, {
      key : "x",
      /**
       * @param {number} precision
       * @return {?}
       */
      value(precision) {
        if (void 0 === precision) {
          /** @type {number} */
          precision = ((new Date).getTime() - this._startTime) / 1E3;
        }
        let _dragLog;
        return _dragLog = precision === this._dt && this._powDragDt ? this._powDragDt : this._powDragDt = this._drag ** precision, this._dt = precision, this._x + this._v * _dragLog / this._dragLog - this._v / this._dragLog;
      }
    }, {
      key : "dx",
      /**
       * @param {number} precision
       * @return {?}
       */
      value(precision) {
        if (void 0 === precision) {
          /** @type {number} */
          precision = ((new Date).getTime() - this._startTime) / 1E3;
        }
        let _powDragDt;
        return _powDragDt = precision === this._dt && this._powDragDt ? this._powDragDt : this._powDragDt = this._drag ** precision, this._dt = precision, this._v * _powDragDt;
      }
    }, {
      key : "done",
      /**
       * @return {?}
       */
      value() {
        return Math.abs(this.dx()) < 3;
      }
    }]), clickHandler;
  })();
  obj.default = value;
});
