define("js/store/historyTimes.js", ($sanitize, dataAndEvents, object) => {
  /**
   * @param {Object} options
   * @return {?}
   */
  function toObject(options) {
    return options && options.__esModule ? options : {
      default : options
    };
  }
  /**
   * @param {?} dataAndEvents
   * @param {Function} deepDataAndEvents
   * @return {undefined}
   */
  function clone(dataAndEvents, deepDataAndEvents) {
    if (!(dataAndEvents instanceof deepDataAndEvents)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  Object.defineProperty(object, "__esModule", {
    value : true
  });
  const progress = (() => {
    /**
     * @param {Function} proto
     * @param {Array} p
     * @return {undefined}
     */
    function defineProperty(proto, p) {
      /** @type {number} */
      let i = 0;
      for (;i < p.length;i++) {
        const desc = p[i];
        desc.enumerable = desc.enumerable || false;
        /** @type {boolean} */
        desc.configurable = true;
        if ("value" in desc) {
          /** @type {boolean} */
          desc.writable = true;
        }
        Object.defineProperty(proto, desc.key, desc);
      }
    }
    return (context, current, tag) => (current && defineProperty(context.prototype, current), tag && defineProperty(context, tag), context);
  })();
  const obj = toObject($sanitize("./storage"));
  const self = toObject($sanitize("../network/network"));
  const prototype = (() => {
    /**
     * @param {?} game
     * @return {undefined}
     */
    function update(game) {
      clone(this, update);
      this.times = obj.default.getHistoryTimes();
      if (!this.times) {
        this.times = {
          accurate : 0,
          bonus : 0
        };
      }
      this.game = game;
      /** @type {number} */
      this.limitScore = 5;
    }
    return progress(update, [{
      key : "verifyScore",
      /**
       * @param {?} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        if (thisValue >= this.times.accurate) {
          this.times.accurate = thisValue;
          if (this.times.bonus >= this.limitScore) {
            this.upLoadHistoryTimes();
          } else {
            obj.default.saveHistoryTimes(this.times);
          }
        } else {
          this.upLoadHistoryTimes();
        }
      }
    }, {
      key : "addOne",
      /**
       * @return {undefined}
       */
      value() {
        this.times.bonus++;
      }
    }, {
      key : "checkUp",
      /**
       * @return {undefined}
       */
      value() {
        if (this.times.bonus >= this.limitScore) {
          this.upLoadHistoryTimes();
        } else {
          obj.default.saveHistoryTimes(this.times);
        }
      }
    }, {
      key : "upLoadHistoryTimes",
      /**
       * @return {undefined}
       */
      value() {
        const r20 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
        const restoreScript = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        const rreturn = this.times.accurate + this.times.bonus;
        self.default.requestSettlement(r20, rreturn, this.afterUpload.bind(this), restoreScript);
      }
    }, {
      key : "afterUpload",
      /**
       * @param {?} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        if (thisValue) {
          this.times.accurate += this.times.bonus;
          /** @type {number} */
          this.times.bonus = 0;
        }
        obj.default.saveHistoryTimes(this.times);
      }
    }, {
      key : "getTimes",
      /**
       * @return {?}
       */
      value() {
        return this.times.accurate + this.times.bonus;
      }
    }]), update;
  })();
  object.default = prototype;
});
