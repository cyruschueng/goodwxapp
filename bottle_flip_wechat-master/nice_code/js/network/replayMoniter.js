define("js/network/relayMoniter.js", (dataAndEvents, deepDataAndEvents, obj) => {
  /**
   * @param {?} dataAndEvents
   * @param {Function} value
   * @return {undefined}
   */
  function toObject(dataAndEvents, value) {
    if (!(dataAndEvents instanceof value)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  Object.defineProperty(obj, "__esModule", {
    value : true
  });
  const throttledUpdate = (() => {
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
     * @param {Object} context
     * @return {undefined}
     */
    function show(context) {
      toObject(this, show);
      this.optionReport = context.report || (() => {
      });
      this.duration = context.duration || 7E3;
      /** @type {string} */
      this.logMessage = "";
      this.logMaxLength = context.logMaxLength || 5E3;
      /** @type {null} */
      this.timeout = null;
      /** @type {number} */
      this.haveReport = 0;
    }
    return throttledUpdate(show, [{
      key : "start",
      /**
       * @return {undefined}
       */
      value() {
        const context = this;
        if (!this.timeout) {
          if (!this.haveReport) {
            /** @type {number} */
            this.timeout = setTimeout(() => {
              context.report();
            }, this.duration);
          }
        }
      }
    }, {
      key : "pulse",
      /**
       * @return {undefined}
       */
      value() {
        const context = this;
        if (this.timeout) {
          this.rpClearTimeout();
          /** @type {number} */
          this.timeout = setTimeout(() => {
            context.report();
          }, this.duration);
        }
      }
    }, {
      key : "stop",
      /**
       * @return {undefined}
       */
      value() {
        this.rpClearTimeout();
      }
    }, {
      key : "rpClearTimeout",
      /**
       * @return {undefined}
       */
      value() {
        if (this.timeout) {
          clearTimeout(this.timeout);
          /** @type {null} */
          this.timeout = null;
        }
      }
    }, {
      key : "report",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {number} */
        this.haveReport = 1;
        this.optionReport(this.logMessage);
        /** @type {string} */
        this.logMessage = "";
      }
    }, {
      key : "log",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {number} */
        const len = arguments.length;
        /** @type {Array} */
        const args = Array(len);
        /** @type {number} */
        let loc = 0;
        for (;loc < len;loc++) {
          args[loc] = arguments[loc];
        }
        /** @type {string} */
        const logMessage = args.join(";;;");
        if (logMessage) {
          this.logMessage += logMessage;
          /** @type {number} */
          const num = this.logMessage.length;
          if (num > this.logMaxLength) {
            /** @type {number} */
            const i = num - this.logMaxLength;
            /** @type {string} */
            this.logMessage = this.logMessage.slice(i, num);
          }
        }
      }
    }]), show;
  })();
  obj.default = value;
});
