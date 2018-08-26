define("js/control/reviewCtrl.js", (keys, dataAndEvents, object) => {
  /**
   * @param {Object} options
   * @return {?}
   */
  function getOptions(options) {
    return options && options.__esModule ? options : {
      default : options
    };
  }
  /**
   * @param {?} obj
   * @param {Function} type
   * @return {undefined}
   */
  function promise(obj, type) {
    if (!(obj instanceof type)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  Object.defineProperty(object, "__esModule", {
    value : true
  });
  const extendClass = (() => {
    /**
     * @param {Function} object
     * @param {?} property
     * @return {undefined}
     */
    function defineProperty(object, property) {
      /** @type {number} */
      let i = 0;
      for (;i < property.length;i++) {
        const desc = property[i];
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
    return (func, name, element) => (name && defineProperty(func.prototype, name), element && defineProperty(func, element), func);
  })();
  const obj = getOptions(keys("../network/network"));
  const props = keys("../pages/pages2d/base");
  const opts = getOptions(keys("../store/storage"));
  const prototype = (() => {
    /**
     * @param {?} parent
     * @return {undefined}
     */
    function Class(parent) {
      promise(this, Class);
      this.game = parent;
      this.gameCtrl = parent.gameCtrl;
      this.initData();
    }
    return extendClass(Class, [{
      key : "initData",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {boolean} */
        this.isInThisPage = false;
        this.scene = void 0;
        /** @type {boolean} */
        this.pause = false;
        /** @type {Array} */
        this.actionList = [];
        /** @type {Array} */
        this.musicList = [];
        /** @type {Array} */
        this.touchStartList = [];
        /** @type {number} */
        this.index = 0;
        /**
         * @return {undefined}
         */
        this._playCache = () => {
        };
        this.gameData = {};
      }
    }, {
      key : "setScorePostion",
      /**
       * @return {undefined}
       */
      value() {
        const WIDTH = (0, props.cx)(211);
        const HEIGHT = (0, props.cy)(178);
        /** @type {number} */
        const lon = (WIDTH - props.WIDTH / 2) / props.WIDTH * props.frustumSizeWidth;
        /** @type {number} */
        const ry = (props.HEIGHT / 2 - HEIGHT) / props.HEIGHT * props.frustumSizeHeight;
        /** @type {number} */
        this.game.UI.scoreText.obj.position.x = lon;
        /** @type {number} */
        this.game.UI.scoreText.obj.position.y = ry;
        this.game.UI.scoreText.changeStyle({
          textAlign : "center"
        });
        this.game.UI.showScore();
      }
    }, {
      key : "init",
      /**
       * @param {?} editor
       * @return {undefined}
       */
      value(editor) {
        /**
         * @param {Function} cb
         * @param {?} callback
         * @return {undefined}
         */
        function save(cb, callback) {
          wx.showLoading({
            mask : true
          });
          obj.default.getWeeklyPlayBack((dataAndEvents, evt) => {
            /** @type {string} */
            let optsData = "";
            wx.hideLoading();
            if (dataAndEvents && void 0 !== evt.timestamp) {
              cb(evt);
            } else {
              if (evt) {
                if (evt.data) {
                  if (evt.data.base_resp) {
                    if (evt.data.base_resp.errcode) {
                      /** @type {string} */
                      optsData = `\uff0c(e${evt.data.base_resp.errcode})`;
                    }
                  }
                }
              }
              wx.showModal({
                title : "\u63d0\u793a",
                content : `\u83b7\u53d6\u56de\u653e\u6570\u636e\u5931\u8d25${optsData}`,
                confirmText : "\u91cd\u8bd5",
                cancelText : "\u53d6\u6d88",
                /**
                 * @param {Object} data
                 * @return {undefined}
                 */
                success(data) {
                  if (data.confirm) {
                    save(cb, callback);
                  }
                },
                /**
                 * @return {undefined}
                 */
                fail() {
                }
              });
            }
          }, callback);
        }
        /**
         * @param {Object} data
         * @return {undefined}
         */
        function update(data) {
          /** @type {boolean} */
          self.isInThisPage = true;
          self.scene = scene;
          self.setScorePostion();
          self.game.full2D.showRecordPage({
            headimg : config.headimg
          });
          /** @type {Object} */
          self.gameData = data;
          self.play(data.seed, data.action, data.musicList, data.timestamp, data.version, data.use_wangzhe, data.mmpay_status, data.use_mmpaybase, () => {
            if (self.game.currentScore && (config.week_best_score && self.game.currentScore != config.week_best_score)) {
              obj.default.sendServerError(9);
              if (Math.random() < 0.01) {
                const b = opts.default.getMyUserInfo();
                const bup = b && b.open_id;
                if (bup) {
                  obj.default.badReport(`searchflag:reviewNotRight;open_id:${bup};playback_id:${restoreScript};currentScore:${self.game.currentScore};week_best_score:${config.week_best_score};`);
                }
              }
            }
            self.destroy();
          });
        }
        var config = editor.user_data;
        var scene = editor.scene;
        var self = this;
        var restoreScript = config && config.playback_id;
        save(chunk => {
          update(chunk);
        }, restoreScript);
      }
    }, {
      key : "destroy",
      /**
       * @return {undefined}
       */
      value() {
        if (this.isInThisPage) {
          this.game.stopLoopMusic();
          this.game.resetScene();
          this._destroy();
          this.game.UI.hideScore();
          /** @type {number} */
          this.game.UI.scoreText.obj.position.y = 21;
          /** @type {number} */
          this.game.UI.scoreText.obj.position.x = -13;
          this.game.full2D.hide2D();
          this.gameCtrl.reviewReturn(this.scene);
          this.initData();
        }
      }
    }, {
      key : "_play",
      /**
       * @param {?} url
       * @return {undefined}
       */
      value(url) {
        const _this = this;
        if (this.index < this.actionList.length && !this.pause) {
          const restoreScript = this.actionList[this.index][1];
          const r20 = this.musicList[this.index + 1];
          const rreturn = this.actionList[this.index][2];
          const requestId = this.actionList[this.index][0];
          /** @type {number} */
          const i = 0 == this.index ? 0 : this.touchStartList[this.index] - this.touchStartList[this.index - 1];
          /** @type {number} */
          this.timer = setTimeout(() => {
            ++_this.index;
            if ("stop" != _this.game.bottle.status) {
              console.log(_this.index, "go wrong !!!");
              _this.speedUpto(_this.index, _this.gameData, () => {
                _this._play(url);
              });
            } else {
              _this.game.touchStartAnim({
                fromReview : true
              });
              /** @type {number} */
              _this.jumpTimer = setTimeout(() => {
                _this.game.touchEndAnim(requestId, restoreScript, rreturn, r20);
                if (_this.index == _this.actionList.length) {
                  /** @type {number} */
                  _this.overTimeout = setTimeout(() => {
                    url();
                  }, 3E3);
                }
              }, 1E3 * requestId);
              _this._play(url);
              /**
               * @return {undefined}
               */
              _this._playCache = () => {
                _this._play(url);
              };
            }
          }, i);
        } else {
          this.pause;
        }
      }
    }, {
      key : "pausePlay",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {boolean} */
        this.pause = true;
        if (this.timer) {
          clearTimeout(this.timer);
          /** @type {null} */
          this.timer = null;
        }
      }
    }, {
      key : "speedUpto",
      /**
       * @param {number} length
       * @param {Object} options
       * @param {?} func
       * @return {undefined}
       */
      value(length, options, func) {
        const data = this;
        this._destroy();
        const commands = options.seed;
        const destination = options.action;
        const async = options.musicList;
        const date = options.timestamp;
        const version = options.version;
        const successCb = options.use_wangzhe;
        const thisArg = options.mmpay_status;
        const stackStartFunction = options.use_mmpaybase;
        const result = destination;
        const DATE = date;
        let idx = void 0;
        this.actionList = result;
        this.musicList = async;
        this.touchStartList = DATE;
        /** @type {number} */
        this.index = 0;
        this.game.resetScene(commands, {
          version,
          use_wangzhe : successCb,
          use_mmpaybase : stackStartFunction,
          mmpay_status : thisArg
        });
        /** @type {number} */
        idx = 0;
        for (;idx < this.actionList.length - 1 && idx < length - 2;idx++) {
          !(i => {
            const restoreScript = data.actionList[i][1];
            const chunks = data.actionList[i][0];
            const closed = data.musicList[i + 1];
            const r20 = data.actionList[i][2];
            const n = data.game.touchEndAnim(chunks, restoreScript, r20, closed, {
              noAnimation : true
            });
            if (1 == n || 7 == n) {
              data.game.succeed({
                noAnimation : true,
                musicScore : closed
              });
              if (1 === n) {
                ++data.game.doubleHit;
                data.game.UI.addScore(1, true, r20);
              } else {
                /** @type {number} */
                data.game.doubleHit = 0;
                data.game.UI.addScore(1, false, r20);
              }
            } else {
              if (2 == n) {
                data.game.bottle.obj.position.x = data.game.bottle.destination[0];
                data.game.bottle.obj.position.z = data.game.bottle.destination[1];
              }
            }
          })(idx);
        }
        /** @type {number} */
        this.index = idx;
        func();
      }
    }, {
      key : "continue",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {boolean} */
        this.pause = false;
        this._playCache();
      }
    }, {
      key : "play",
      /**
       * @param {?} cell
       * @param {Array} thisValue
       * @param {Array} newValue
       * @param {(Array|string)} firstTime
       * @param {Object} g
       * @param {?} pathToValue
       * @param {?} event
       * @param {?} rootObj
       * @param {?} factor
       * @return {undefined}
       */
      value(
        cell,
        thisValue,
        newValue,
        firstTime,
        g,
        pathToValue,
        event,
        rootObj,
        factor) {
        /** @type {Array} */
        this.actionList = thisValue;
        /** @type {Array} */
        this.musicList = newValue;
        /** @type {(Array|string)} */
        this.touchStartList = firstTime;
        /** @type {number} */
        this.index = 0;
        this.game.resetScene(cell, {
          version : g,
          use_wangzhe : pathToValue,
          use_mmpaybase : rootObj,
          mmpay_status : event
        });
        this._play(factor);
      }
    }, {
      key : "_destroy",
      /**
       * @return {undefined}
       */
      value() {
        if (this.timer) {
          clearTimeout(this.timer);
          /** @type {null} */
          this.timer = null;
        }
        if (this.jumpTimer) {
          clearTimeout(this.jumpTimer);
          /** @type {null} */
          this.jumpTimer = null;
        }
        if (this.game.deadTimeout) {
          clearTimeout(this.game.deadTimeout);
          /** @type {null} */
          this.game.deadTimeout = null;
        }
        if (this.overTimeout) {
          clearTimeout(this.overTimeout);
          /** @type {null} */
          this.overTimeout = null;
        }
      }
    }]), Class;
  })();
  object.default = prototype;
});
