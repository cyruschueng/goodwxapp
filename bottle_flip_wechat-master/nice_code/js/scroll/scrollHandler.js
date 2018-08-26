define("js/scroll/scrollHandler.js", ($sanitize, dataAndEvents, object) => {
  /**
   * @param {?} dataAndEvents
   * @param {Function} init
   * @return {undefined}
   */
  function animate(dataAndEvents, init) {
    if (!(dataAndEvents instanceof init)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  Object.defineProperty(object, "__esModule", {
    value : true
  });
  const make = (() => {
    /**
     * @param {Function} object
     * @param {Array} obj
     * @return {undefined}
     */
    function defineProperty(object, obj) {
      /** @type {number} */
      let i = 0;
      for (;i < obj.length;i++) {
        const desc = obj[i];
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
    return (x, walkers, a) => (walkers && defineProperty(x.prototype, walkers), a && defineProperty(x, a), x);
  })();
  const obj = (d => d && d.__esModule ? d : {
    default : d
  })($sanitize("./scroll"));
  const prototype = (() => {
    /**
     * @param {Object} options
     * @return {undefined}
     */
    function init(options) {
      animate(this, init);
      options = options || {};
      /** @type {Object} */
      this._options = options;
      this._itemSize = options.itemSize || 0;
      this._innerOffsetHeight = options.innerOffsetHeight || 0;
      this._outterOffsetHeight = options.outterOffsetHeight || 0;
      /** @type {number} */
      this._extent = this._innerOffsetHeight - this._outterOffsetHeight;
      /** @type {number} */
      this._position = 0;
      this._scroll = new obj.default(this._extent);
      this.updatePosition();
    }
    return make(init, [{
      key : "onTouchStart",
      /**
       * @return {undefined}
       */
      value() {
        this._startPosition = this._position;
        this._lastChangePos = this._startPosition;
        if (this._startPosition > 0) {
          this._startPosition /= 0.5;
        } else {
          if (this._startPosition < -this._extent) {
            /** @type {number} */
            this._startPosition = (this._startPosition + this._extent) / 0.5 - this._extent;
          }
        }
        if (this._animation) {
          this._animation.cancel();
          /** @type {boolean} */
          this._scrolling = false;
        }
        this.updatePosition();
      }
    }, {
      key : "onTouchMove",
      /**
       * @param {?} thisValue
       * @param {?} length
       * @return {undefined}
       */
      value(thisValue, length) {
        let pos = this._startPosition;
        if ((pos += length) > 0) {
          pos *= 0.5;
        } else {
          if (pos < -this._extent) {
            /** @type {number} */
            pos = 0.5 * (pos + this._extent) - this._extent;
          }
        }
        this._position = pos;
        this.updatePosition();
      }
    }, {
      key : "onTouchEnd",
      /**
       * @param {?} thisValue
       * @param {?} newValue
       * @param {?} evt
       * @return {undefined}
       */
      value(thisValue, newValue, evt) {
        const self = this;
        this._scroll.set(this._position, evt.y);
        /** @type {boolean} */
        this._scrolling = true;
        this._lastChangePos = this._position;
        this._animation = this.animation(this._scroll, () => {
          /** @type {number} */
          const newPos = (Date.now() - self._scroll._startTime) / 1E3;
          const p = self._scroll.x(newPos);
          self._position = p;
          self.updatePosition();
        }, () => {
          /** @type {boolean} */
          self._scrolling = false;
        });
      }
    }, {
      key : "scrollTo",
      /**
       * @param {?} url
       * @return {undefined}
       */
      value(url) {
        if (this._animation) {
          this._animation.cancel();
          /** @type {boolean} */
          this._scrolling = false;
        }
        if ("number" == typeof url) {
          /** @type {number} */
          this._position = -url;
        }
        if (this._position < -this._extent) {
          /** @type {number} */
          this._position = -this._extent;
        } else {
          if (this._position > 0) {
            /** @type {number} */
            this._position = 0;
          }
        }
        this.updatePosition();
      }
    }, {
      key : "updatePosition",
      /**
       * @return {undefined}
       */
      value() {
        this._options.updatePosition(this._position);
      }
    }, {
      key : "animation",
      /**
       * @param {Object} doc
       * @param {?} error
       * @param {?} action
       * @return {?}
       */
      value(doc, error, action) {
        /**
         * @param {Element} result
         * @param {Object} value
         * @param {?} next
         * @param {?} fail
         * @return {undefined}
         */
        function callback(result, value, next, fail) {
          if (!result || !result.cancelled) {
            next(value);
            const a = doc.done();
            if (!a) {
              if (!result.cancelled) {
                /** @type {number} */
                result.id = requestAnimationFrame(callback.bind(null, result, value, next, fail));
              }
            }
            if (a) {
              if (fail) {
                fail(value);
              }
            }
          }
        }
        const instance = {
          id : 0,
          cancelled : false
        };
        return callback(instance, doc, error, action), {
          cancel : result => {
            if (result) {
              if (result.id) {
                cancelAnimationFrame(result.id);
              }
            }
            if (result) {
              /** @type {boolean} */
              result.cancelled = true;
            }
          }.bind(null, instance),
          model : doc
        };
      }
    }]), init;
  })();
  object.default = prototype;
});
