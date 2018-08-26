define("js/lib/mue/eventcenter.js", (dataAndEvents, deepDataAndEvents, obj) => {
  /**
   * @param {?} item
   * @param {Function} object
   * @return {undefined}
   */
  function bind(item, object) {
    if (!(item instanceof object)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  Object.defineProperty(obj, "__esModule", {
    value : true
  });
  const __extends = (() => {
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
  const Gamepad = obj.MueEvent = (() => {
    /**
     * @param {string} type
     * @return {undefined}
     */
    function Event(type) {
      bind(this, Event);
      /** @type {string} */
      this.type = type;
      /** @type {boolean} */
      this.defaultPrevented = false;
      /** @type {number} */
      this.timeStamp = Date.now();
    }
    return __extends(Event, [{
      key : "preventDefault",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {boolean} */
        this.defaultPrevented = true;
      }
    }]), Event;
  })();
  const value = new (obj.EventCenter = (() => {
    /**
     * @return {undefined}
     */
    function Event() {
      bind(this, Event);
      this.listener = {};
    }
    return __extends(Event, [{
      key : "emit",
      /**
       * @param {?} c
       * @return {undefined}
       */
      value(c) {
        /** @type {number} */
        const len = arguments.length;
        /** @type {Array} */
        const args = Array(len > 1 ? len - 1 : 0);
        /** @type {number} */
        let i = 1;
        for (;i < len;i++) {
          args[i - 1] = arguments[i];
        }
        this._emit(...[false, c].concat(args));
      }
    }, {
      key : "emitSync",
      /**
       * @param {?} c
       * @return {undefined}
       */
      value(c) {
        /** @type {number} */
        const len = arguments.length;
        /** @type {Array} */
        const args = Array(len > 1 ? len - 1 : 0);
        /** @type {number} */
        let i = 1;
        for (;i < len;i++) {
          args[i - 1] = arguments[i];
        }
        this._emit(...[true, c].concat(args));
      }
    }, {
      key : "_emit",
      /**
       * @param {?} thisValue
       * @param {string} index
       * @return {undefined}
       */
      value(thisValue, index) {
        /** @type {number} */
        const len = arguments.length;
        /** @type {Array} */
        const args = Array(len > 2 ? len - 2 : 0);
        /** @type {number} */
        let i = 2;
        for (;i < len;i++) {
          args[i - 2] = arguments[i];
        }
        const list = this;
        if ("CHECK_GAME" != index && ("SEND_CHECK_GAME" != index && console.log("\u89e6\u53d1\u4e8b\u4ef6", index)), this.listener[index]) {
          const gamepad = new Gamepad(index);
          /**
           * @return {undefined}
           */
          const add = () => {
            let recordKey;
            for (recordKey in list.listener[index]) {
              /** @type {boolean} */
              let callback2 = true;
              /** @type {boolean} */
              let i = false;
              let bulk = void 0;
              try {
                let _ref;
                var self = list.listener[index][recordKey][Symbol.iterator]();
                for (;!(callback2 = (_ref = self.next()).done);callback2 = true) {
                  const task = _ref.value;
                  task.call(...[task, gamepad].concat(args));
                }
              } catch (fn) {
                /** @type {boolean} */
                i = true;
                bulk = fn;
              } finally {
                try {
                  if (!callback2) {
                    if (self.return) {
                      self.return();
                    }
                  }
                } finally {
                  if (i) {
                    throw bulk;
                  }
                }
              }
            }
            /** @type {Array} */
            list.listener[index].one = [];
          };
          if (thisValue) {
            add.call(this);
          } else {
            this._async(add);
          }
        }
      }
    }, {
      key : "on",
      /**
       * @param {?} listener
       * @param {?} fn
       * @return {undefined}
       */
      value(listener, fn) {
        this._addListener(listener, "on", fn);
      }
    }, {
      key : "one",
      /**
       * @param {?} listener
       * @param {?} fn
       * @return {undefined}
       */
      value(listener, fn) {
        this._addListener(listener, "one", fn);
      }
    }, {
      key : "off",
      /**
       * @param {?} index
       * @param {?} newValue
       * @return {undefined}
       */
      value(index, newValue) {
        const list = this;
        if (this.listener[index]) {
          this._async(() => {
            if (newValue) {
              const i = newValue.toString();
              let prop;
              for (prop in list.listener[index]) {
                /** @type {number} */
                let j = 0;
                for (;;) {
                  if (j >= list.listener[index][prop].length) {
                    break;
                  }
                  if (i === list.listener[index][prop][j].toString()) {
                    list.listener[index][prop].splice(j, 1);
                    j--;
                  }
                  j++;
                }
              }
            } else {
              list.listener[index] = {
                on : [],
                one : []
              };
              delete list.listener[index];
            }
          });
        }
      }
    }, {
      key : "_addListener",
      /**
       * @param {?} x
       * @param {?} y
       * @param {?} thisValue
       * @return {undefined}
       */
      value(x, y, thisValue) {
        if (!this.listener[x]) {
          this.listener[x] = {
            on : [],
            one : []
          };
        }
        this.listener[x][y].push(thisValue);
      }
    }, {
      key : "_async",
      /**
       * @param {Function} newValue
       * @return {undefined}
       */
      value(newValue) {
        const uniqs = this;
        setTimeout(() => {
          newValue.call(uniqs);
        }, 0);
      }
    }]), Event;
  })());
  obj.default = value;
});
