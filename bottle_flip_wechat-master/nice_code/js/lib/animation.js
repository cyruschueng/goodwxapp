define("js/lib/animation.js", ($sanitize, dataAndEvents, ctx) => {
  Object.defineProperty(ctx, "__esModule", {
    value : true
  });
  ctx.TweenAnimation = ctx.customAnimation = void 0;
  const obj = (d => d && d.__esModule ? d : {
    default : d
  })($sanitize("./tween"));
  /** @type {number} */
  let now = -1;
  /** @type {number} */
  let elapsedTime = now - 1;
  const map = {};
  /**
   * @param {Object} obj
   * @param {number} attr
   * @param {Object} options
   * @return {undefined}
   */
  (ctx.customAnimation = {}).to = (obj, attr, options) => {
    attr *= 1E3;
    options.delay;
    let key;
    for (key in options) {
      if ("delay" === key) {
      } else {
        if ("onComplete" === key || "onEnded" === key) {
        } else {
          if ("ease" === key) {
          } else {
            if ("name" === key) {
            } else {
              if (options.delay || 0 !== attr) {
                /** @type {number} */
                const restoreScript = ++now;
                setTimeout((key => () => {
                  action(obj[key], options[key], attr, options.ease || "Linear", (res, dataAndEvents, deepDataAndEvents) => {
                    if (deepDataAndEvents) {
                      if (options.onEnded) {
                        options.onEnded();
                      }
                    }
                    if (void 0 !== res) {
                      /** @type {string} */
                      obj[key] = res;
                    }
                    if (dataAndEvents) {
                      if (options.onComplete) {
                        options.onComplete();
                      }
                    }
                  }, options.name, restoreScript);
                })(key), 1E3 * (options.delay || 0));
              } else {
                obj[key] = options[key];
                if (options.onComplete) {
                  options.onComplete();
                }
                if (options.onEnded) {
                  options.onEnded();
                }
              }
            }
          }
        }
      }
    }
  };
  /** @type {function (number, string, (number|string), string, Function, boolean, number): ?} */
  var action = ctx.TweenAnimation = (end, er, id, data, message, event, callback) => {
    callback = callback || ++now;
    if (event) {
      if (!map[event]) {
        /** @type {Array} */
        map[event] = [];
      }
      map[event].push(callback);
    }
    /**
     * @param {string} b
     * @return {?}
     */
    const successCallback = b => "function" == typeof b;
    /**
     * @param {?} value
     * @return {?}
     */
    const cb = value => "number" == typeof value;
    /**
     * @param {string} val
     * @return {?}
     */
    const add = val => "string" == typeof val;
    /**
     * @param {string} arg
     * @return {?}
     */
    const parse = arg => {
      if (cb(arg)) {
        return arg;
      }
      if (add(arg)) {
        if (/\d+m?s$/.test(arg)) {
          return/ms/.test(arg) ? 1 * arg.replace("ms", "") : 1E3 * arg.replace("s", "");
        }
        if (/^\d+$/.test(arg)) {
          return+arg;
        }
      }
      return-1;
    };
    if (!cb(end) || !cb(er)) {
      return window.console && console.error("from\u548cto\u4e24\u4e2a\u53c2\u6570\u5fc5\u987b\u4e14\u4e3a\u6570\u503c", message, event, data), 0;
    }
    const fn = obj.default;
    if (!fn) {
      return window.console && console.error("\u7f13\u52a8\u7b97\u6cd5\u51fd\u6570\u7f3a\u5931"), 0;
    }
    const options = {
      duration : 300,
      easing : "Linear",
      /**
       * @return {undefined}
       */
      callback() {
      }
    };
    /**
     * @param {string} val
     * @return {undefined}
     */
    const update = val => {
      if (successCallback(val)) {
        /** @type {string} */
        options.callback = val;
      } else {
        if (-1 != parse(val)) {
          options.duration = parse(val);
        } else {
          if (add(val)) {
            /** @type {string} */
            options.easing = val;
          }
        }
      }
    };
    update(id);
    update(data);
    update(message);
    if (!window.requestAnimationFrame) {
      /**
       * @param {Function} callback
       * @return {undefined}
       */
      requestAnimationFrame = callback => {
        setTimeout(callback, 17);
      };
    }
    /** @type {number} */
    let y = -1;
    /** @type {number} */
    const height = Math.ceil(options.duration / 17);
    /** @type {string} */
    options.easing = options.easing.slice(0, 1).toUpperCase() + options.easing.slice(1);
    let position;
    /** @type {Array.<string>} */
    const arr = options.easing.split(".");
    if (1 == arr.length ? position = fn[arr[0]] : 2 == arr.length && (position = fn[arr[0]] && fn[arr[0]][arr[1]]), 0 != successCallback(position)) {
      /** @type {number} */
      const min = Date.now();
      /** @type {number} */
      let aux = Date.now();
      !function animate() {
        /** @type {number} */
        const max = Date.now();
        /** @type {number} */
        const distance = max - aux;
        /** @type {number} */
        const l = Math.ceil(1E3 / distance);
        if (aux = max, distance > 100) {
          requestAnimationFrame(animate);
        } else {
          if (l >= 30) {
            y++;
          } else {
            /** @type {number} */
            const x = Math.floor((max - min) / 17);
            y = x > y ? x : y + 1;
          }
          const context = position(y, end, er - end, height);
          if (y <= height && callback > elapsedTime) {
            if (event && (map[event] && !map[event].includes(callback))) {
              return;
            }
            options.callback(context);
            requestAnimationFrame(animate);
          } else {
            if (y > height && callback > elapsedTime) {
              if (event && (map[event] && !map[event].includes(callback))) {
                return;
              }
              options.callback(er, true, true);
            } else {
              options.callback(void 0, false, true);
            }
          }
        }
      }();
    } else {
      console.error(`\u6ca1\u6709\u627e\u5230\u540d\u4e3a"${options.easing}"\u7684\u52a8\u753b\u7b97\u6cd5`);
    }
  };
  /**
   * @param {?} c
   * @return {undefined}
   */
  action.kill = c => {
    /** @type {Array} */
    map[c] = [];
  };
  /**
   * @return {undefined}
   */
  action.killAll = () => {
    elapsedTime = now;
    let letter;
    for (letter in map) {
      /** @type {Array} */
      map[letter] = [];
    }
  };
});
