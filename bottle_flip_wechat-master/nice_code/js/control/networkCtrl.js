define("js/control/networkCtrl.js", ($sanitize, dataAndEvents, object) => {
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
   * @param {Function} obj
   * @return {undefined}
   */
  function keys(dataAndEvents, obj) {
    if (!(dataAndEvents instanceof obj)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  Object.defineProperty(object, "__esModule", {
    value : true
  });
  /** @type {function (?): ?} */
  const forIn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? b => typeof b : b => b && ("function" == typeof Symbol && (b.constructor === Symbol && b !== Symbol.prototype)) ? "symbol" : typeof b;
  const visitor = (() => {
    /**
     * @param {?} arg1
     * @param {number} deepDataAndEvents
     * @return {?}
     */
    function foo(arg1, deepDataAndEvents) {
      /** @type {Array} */
      const matched = [];
      /** @type {boolean} */
      let callback2 = true;
      /** @type {boolean} */
      let i = false;
      let bulk = void 0;
      try {
        let rule;
        var self = arg1[Symbol.iterator]();
        for (;!(callback2 = (rule = self.next()).done) && (matched.push(rule.value), !deepDataAndEvents || matched.length !== deepDataAndEvents);callback2 = true) {
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
      return matched;
    }
    return (o, deepDataAndEvents) => {
      if (Array.isArray(o)) {
        return o;
      }
      if (Symbol.iterator in Object(o)) {
        return foo(o, deepDataAndEvents);
      }
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
  })();
  const HOP = (() => {
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
  const self = toObject($sanitize("../network/network"));
  const obj = toObject($sanitize("../store/storage"));
  const prototype = (() => {
    /**
     * @param {?} model
     * @return {undefined}
     */
    function save(model) {
      keys(this, save);
      this.game = model;
      this.gameCtrl = model.gameCtrl;
      this.model = model.gameModel;
      /** @type {null} */
      this.loginCb = null;
      /** @type {null} */
      this.serverConfigInterval = null;
      this.historyTimes = this.game.historyTimes;
    }
    return HOP(save, [{
      key : "netWorkLogin",
      /**
       * @param {?} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        if (thisValue) {
          this.loginCb = thisValue;
        }
        self.default.requestLogin(this.afterRequestLogin.bind(this));
      }
    }, {
      key : "afterRequestLogin",
      /**
       * @param {?} newValue
       * @return {undefined}
       */
      value(newValue) {
        const key = this;
        if (this.loginCb) {
          this.loginCb(newValue);
        }
        const promise = self.default.getUserInfo(this.afterGetUserInfo.bind(this));
        promise.then(putativeSpy => {
          if (!(putativeSpy && putativeSpy.open_id)) {
            self.default.sendServerError(6);
          }
        }, () => {
          self.default.sendServerError(6);
        });
        if (newValue) {
          Promise.all([promise, self.default.requestFriendsScore(this.updateFriendsScore.bind(this))]).then(element => {
            const elementRect = visitor(element, 2);
            const jQuery = (elementRect[0], elementRect[1]);
            if (jQuery) {
              if (jQuery.my_user_info) {
                if (jQuery.my_user_info.playback_id) {
                  key.setPlayBackIdTolocalStorage(jQuery.my_user_info);
                }
              }
            }
          }, () => {
          });
          this.requestMmpayTimeout();
          this.requestServerInit();
          this.gameCtrl.onLoginSuccess();
        }
      }
    }, {
      key : "afterGetUserInfo",
      /**
       * @param {?} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        if (thisValue.appeal_notify) {
          this.gameCtrl.appealNotify();
        }
      }
    }, {
      key : "requestServerInit",
      /**
       * @return {undefined}
       */
      value() {
        self.default.requestInit();
        /** @type {number} */
        this.serverConfigInterval = setInterval(self.default.requestInit.bind(self.default), 6E4);
      }
    }, {
      key : "requestMmpayTimeout",
      /**
       * @return {undefined}
       */
      value() {
        /**
         * @return {undefined}
         */
        function poll() {
          self.default.requestMmpayBonus((dataAndEvents, messageEvent) => {
            if (dataAndEvents && messageEvent.data.svr_time) {
              if (0 == messageEvent.data.pay_status.status) {
                if (messageEvent.data.pay_status.expire_time < maxWait) {
                  /** @type {number} */
                  messageEvent.data.pay_status.expire_time = maxWait;
                }
                obj.default.setMmpayBonusStatus(messageEvent.data.pay_status, messageEvent.data.svr_time);
                /** @type {number} */
                that.mmpayTimeout = setTimeout(that.requestMmpayTimeout.bind(that), 1E3 * messageEvent.data.pay_status.expire_time);
              } else {
                if (1 == messageEvent.data.pay_status.status) {
                  obj.default.setMmpayBonusStatus(messageEvent.data.pay_status, messageEvent.data.svr_time);
                }
              }
            } else {
              /** @type {number} */
              that.mmpayTimeout = setTimeout(that.requestMmpayTimeout.bind(that), 1E3 * maxWait);
            }
          });
        }
        var that = this;
        /** @type {number} */
        var maxWait = 120;
        this.clearMmpayTimeout();
        const jqXHR = obj.default.getMmpayBonusStatus();
        if (jqXHR) {
          if (!(1 == jqXHR.status)) {
            if (0 == jqXHR.status) {
              poll();
            }
          }
        } else {
          poll();
        }
      }
    }, {
      key : "clearMmpayTimeout",
      /**
       * @return {undefined}
       */
      value() {
        if (this.mmpayTimeout) {
          clearTimeout(this.mmpayTimeout);
          /** @type {null} */
          this.mmpayTimeout = null;
        }
      }
    }, {
      key : "clearServerInit",
      /**
       * @return {undefined}
       */
      value() {
        if (this.serverConfigInterval) {
          clearInterval(this.serverConfigInterval);
        }
      }
    }, {
      key : "upDateFriendsScoreList",
      /**
       * @return {undefined}
       */
      value() {
        const template = this;
        if (this.model.getSessionId()) {
          self.default.requestFriendsScore(function() {
            template.updateFriendsScore2.bind(template).apply(void 0, arguments);
          });
        }
      }
    }, {
      key : "updateUserInfo",
      /**
       * @return {undefined}
       */
      value() {
        const func = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : () => {
        };
        const oldconfig = obj.default.getMyUserInfo();
        if (!("object" == (void 0 === oldconfig ? "undefined" : forIn(oldconfig)) && oldconfig.open_id)) {
          self.default.getUserInfo(func.bind(this)).then(() => {
          }, () => {
          });
        }
      }
    }, {
      key : "updateFriendsScore",
      /**
       * @param {(Node|string)} thisValue
       * @param {?} options
       * @return {undefined}
       */
      value(thisValue, options) {
        if (thisValue && (options.user_info.sort((dataAndEvents, deepDataAndEvents) => -(dataAndEvents.week_best_score || 0) + (deepDataAndEvents.week_best_score || 0)), this.model.saveFriendsScore(options.user_info), options.my_user_info)) {
          const loadEnd = options.my_user_info.history_best_score || 0;
          this.model.saveHeighestScore(loadEnd);
          const value = options.my_user_info.week_best_score || 0;
          this.model.weekBestScore = value;
          this.model.saveWeekBestScore(value);
          const times = options.my_user_info.times;
          this.historyTimes.verifyScore(times);
          if (options) {
            if (options.my_user_info) {
              this.setPlayBackIdTolocalStorage(options.my_user_info);
            }
          }
        }
      }
    }, {
      key : "setPlayBackIdTolocalStorage",
      /**
       * @param {?} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        try {
          const properties = obj.default.getMyUserInfo();
          if ("object" == (void 0 === properties ? "undefined" : forIn(properties))) {
            if (thisValue) {
              if (thisValue.playback_id) {
                obj.default.saveMyUserInfo(Object.assign(properties, {
                  playback_id : thisValue.playback_id
                }));
              }
            }
          }
        } catch (e) {
        }
      }
    }, {
      key : "updateFriendsScore2",
      /**
       * @param {?} thisValue
       * @param {?} data
       * @return {undefined}
       */
      value(thisValue, data) {
        if (thisValue) {
          data.user_info.sort((dataAndEvents, deepDataAndEvents) => -(dataAndEvents.week_best_score || 0) + (deepDataAndEvents.week_best_score || 0));
          this.model.saveFriendsScore(data.user_info);
        }
      }
    }, {
      key : "uploadScore",
      /**
       * @param {?} newValue
       * @return {undefined}
       */
      value(newValue) {
        self.default.requestSettlement(newValue);
      }
    }, {
      key : "requestSettlement",
      /**
       * @return {undefined}
       */
      value() {
        const r20 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
        const restoreScript = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        const rreturn = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : () => {
        };
        const udataCur = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
        self.default.requestSettlement(r20, restoreScript, rreturn, udataCur);
      }
    }, {
      key : "requestLogin",
      /**
       * @return {undefined}
       */
      value() {
        const r20 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : () => {
        };
        self.default.requestLogin(r20);
      }
    }, {
      key : "sendServerError",
      /**
       * @return {undefined}
       */
      value() {
        self.default.sendServerError(2);
      }
    }, {
      key : "createRouterId",
      /**
       * @param {?} newValue
       * @return {undefined}
       */
      value(newValue) {
        self.default.createRouterId(newValue);
      }
    }]), save;
  })();
  object.default = prototype;
});
