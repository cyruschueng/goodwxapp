define("js/scroll/scroll.js", ($sanitize, dataAndEvents, object) => {
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
   * @param {?} item
   * @param {Function} object
   * @return {undefined}
   */
  function fn(item, object) {
    if (!(item instanceof object)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  Object.defineProperty(object, "__esModule", {
    value : true
  });
  const lookupIterator = (() => {
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
  const obj = toObject($sanitize("./friction"));
  const self = toObject($sanitize("./spring"));
  const prototype = (() => {
    /**
     * @param {?} thisValue
     * @return {undefined}
     */
    function value(thisValue) {
      fn(this, value);
      this._extent = thisValue;
      this._friction = new obj.default(0.01);
      this._spring = new self.default(1, 90, 20);
      /** @type {number} */
      this._startTime = 0;
      /** @type {boolean} */
      this._springing = false;
      /** @type {number} */
      this._springOffset = 0;
    }
    return lookupIterator(value, [{
      key : "set",
      /**
       * @param {number} step
       * @param {number} start
       * @return {undefined}
       */
      value(step, start) {
        this._friction.set(step, start);
        if (step > 0 && start >= 0) {
          /** @type {number} */
          this._springOffset = 0;
          /** @type {boolean} */
          this._springing = true;
          this._spring.snap(step);
          this._spring.setEnd(0);
        } else {
          if (step < -this._extent && start <= 0) {
            /** @type {number} */
            this._springOffset = 0;
            /** @type {boolean} */
            this._springing = true;
            this._spring.snap(step);
            this._spring.setEnd(-this._extent);
          } else {
            /** @type {boolean} */
            this._springing = false;
          }
        }
        /** @type {number} */
        this._startTime = (new Date).getTime();
      }
    }, {
      key : "x",
      /**
       * @param {number} x
       * @return {?}
       */
      value(x) {
        if (!this._startTime) {
          return 0;
        }
        if (x || (x = ((new Date).getTime() - this._startTime) / 1E3), this._springing) {
          return this._spring.x() + this._springOffset;
        }
        let pkgfile = this._friction.x(x);
        const sizeString = this.dx(x);
        return pkgfile < -this._extent && (sizeString <= 0 && (this._springing = true, this._spring.setEnd(0, sizeString), pkgfile < -this._extent ? this._springOffset = -this._extent : this._springOffset = 0, pkgfile = this._spring.x() + this._springOffset)), pkgfile;
      }
    }, {
      key : "dx",
      /**
       * @param {?} timestamp
       * @return {?}
       */
      value(timestamp) {
        /** @type {number} */
        let _lastDx = 0;
        return _lastDx = this._lastTime === timestamp ? this._lastDx : this._springing ? this._spring.dx(timestamp) : this._friction.dx(timestamp), this._lastTime = timestamp, this._lastDx = _lastDx, _lastDx;
      }
    }, {
      key : "done",
      /**
       * @return {?}
       */
      value() {
        return this._springing ? this._spring.done() : this._friction.done();
      }
    }]), value;
  })();
  object.default = prototype;
});
