define("js/scroll/spring.js", (dataAndEvents, deepDataAndEvents, obj) => {
  /**
   * @param {?} dataAndEvents
   * @param {Function} dest
   * @return {undefined}
   */
  function cloneCopyEvent(dataAndEvents, dest) {
    if (!(dataAndEvents instanceof dest)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  Object.defineProperty(obj, "__esModule", {
    value : true
  });
  const getAll = (() => {
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
     * @param {number} deepDataAndEvents
     * @param {number} dataAndEvents
     * @param {?} c
     * @return {undefined}
     */
    function clone(deepDataAndEvents, dataAndEvents, c) {
      cloneCopyEvent(this, clone);
      /** @type {number} */
      this._m = deepDataAndEvents;
      /** @type {number} */
      this._k = dataAndEvents;
      this._c = c;
      /** @type {null} */
      this._solution = null;
      /** @type {number} */
      this._endPosition = 0;
      /** @type {number} */
      this._startTime = 0;
    }
    return getAll(clone, [{
      key : "_solve",
      /**
       * @param {number} t
       * @param {number} x
       * @return {?}
       */
      value(t, x) {
        const a01 = this._c;
        const _m = this._m;
        const a11 = this._k;
        /** @type {number} */
        const variance = a01 * a01 - 4 * _m * a11;
        if (0 == variance) {
          /** @type {number} */
          var p = t;
          /** @type {number} */
          var y = x / ((a5 = -a01 / (2 * _m)) * t);
          return{
            /**
             * @param {number} t
             * @return {?}
             */
            x(t) {
              return(p + y * t) * (Math.E ** (a5 * t));
            },
            /**
             * @param {number} t
             * @return {?}
             */
            dx(t) {
              /** @type {number} */
              const width = Math.E ** (a5 * t);
              return a5 * (p + y * t) * width + y * width;
            }
          };
        }
        if (variance > 0) {
          /** @type {number} */
          const a = (-a01 - Math.sqrt(variance)) / (2 * _m);
          /** @type {number} */
          const d = (-a01 + Math.sqrt(variance)) / (2 * _m);
          /** @type {number} */
          p = t - (y = (x - a * t) / (d - a));
          return{
            /**
             * @param {number} t
             * @return {?}
             */
            x(t) {
              let x;
              let s;
              return t === this._t && (x = this._powER1T, s = this._powER2T), this._t = t, x || (x = this._powER1T = Math.E ** (a * t)), s || (s = this._powER2T = Math.E ** (d * t)), p * x + y * s;
            },
            /**
             * @param {number} t
             * @return {?}
             */
            dx(t) {
              let c;
              let s;
              return t === this._t && (c = this._powER1T, s = this._powER2T), this._t = t, c || (c = this._powER1T = Math.E ** (a * t)), s || (s = this._powER2T = Math.E ** (d * t)), p * a * c + y * d * s;
            }
          };
        }
        /** @type {number} */
        const c = Math.sqrt(4 * _m * a11 - a01 * a01) / (2 * _m);
        /** @type {number} */
        var a5 = -a01 / 2 * _m;
        /** @type {number} */
        p = t;
        /** @type {number} */
        y = (x - a5 * t) / c;
        return{
          /**
           * @param {number} t
           * @return {?}
           */
          x(t) {
            return Math.E ** (a5 * t) * (p * Math.cos(c * t) + y * Math.sin(c * t));
          },
          /**
           * @param {number} t
           * @return {?}
           */
          dx(t) {
            /** @type {number} */
            const b0 = Math.E ** (a5 * t);
            /** @type {number} */
            const cos = Math.cos(c * t);
            /** @type {number} */
            const sin = Math.sin(c * t);
            return b0 * (y * c * cos - p * c * sin) + a5 * b0 * (y * sin + p * cos);
          }
        };
      }
    }, {
      key : "x",
      /**
       * @param {number} n
       * @return {?}
       */
      value(n) {
        return void 0 == n && (n = ((new Date).getTime() - this._startTime) / 1E3), this._solution ? this._endPosition + this._solution.x(n) : 0;
      }
    }, {
      key : "dx",
      /**
       * @param {number} delay
       * @return {?}
       */
      value(delay) {
        return void 0 == delay && (delay = ((new Date).getTime() - this._startTime) / 1E3), this._solution ? this._solution.dx(delay) : 0;
      }
    }, {
      key : "setEnd",
      /**
       * @param {number} start
       * @param {number} thisp
       * @param {number} t
       * @return {undefined}
       */
      value(start, thisp, t) {
        if (t || (t = (new Date).getTime()), start != this._endPosition || !this.almostZero(thisp, 0.4)) {
          thisp = thisp || 0;
          let end = this._endPosition;
          if (this._solution) {
            if (this.almostZero(thisp, 0.4)) {
              thisp = this._solution.dx((t - this._startTime) / 1E3);
            }
            end = this._solution.x((t - this._startTime) / 1E3);
            if (this.almostZero(thisp, 0.4)) {
              /** @type {number} */
              thisp = 0;
            }
            if (this.almostZero(end, 0.4)) {
              /** @type {number} */
              end = 0;
            }
            end += this._endPosition;
          }
          if (!(this._solution && (this.almostZero(end - start, 0.4) && this.almostZero(thisp, 0.4)))) {
            /** @type {number} */
            this._endPosition = start;
            this._solution = this._solve(end - this._endPosition, thisp);
            /** @type {number} */
            this._startTime = t;
          }
        }
      }
    }, {
      key : "snap",
      /**
       * @param {number} position
       * @return {undefined}
       */
      value(position) {
        /** @type {number} */
        this._startTime = (new Date).getTime();
        /** @type {number} */
        this._endPosition = position;
        this._solution = {
          /**
           * @return {?}
           */
          x() {
            return 0;
          },
          /**
           * @return {?}
           */
          dx() {
            return 0;
          }
        };
      }
    }, {
      key : "done",
      /**
       * @param {number} event
       * @return {?}
       */
      value(event) {
        return event || (event = (new Date).getTime()), this.almostEqual(this.x(), this._endPosition, 0.4) && this.almostZero(this.dx(), 0.4);
      }
    }, {
      key : "almostEqual",
      /**
       * @param {number} newValue
       * @param {number} right
       * @param {number} left
       * @return {?}
       */
      value(newValue, right, left) {
        return newValue > right - left && newValue < right + left;
      }
    }, {
      key : "almostZero",
      /**
       * @param {?} newValue
       * @param {?} thisValue
       * @return {?}
       */
      value(newValue, thisValue) {
        return this.almostEqual(newValue, 0, thisValue);
      }
    }]), clone;
  })();
  obj.default = value;
});
