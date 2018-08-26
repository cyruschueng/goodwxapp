define("js/store/storage.js", (require, dataAndEvents, obj) => {
  /**
   * @param {?} value
   * @param {Function} type
   * @return {undefined}
   */
  function round(value, type) {
    if (!(value instanceof type)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  Object.defineProperty(obj, "__esModule", {
    value : true
  });
  const A = (() => {
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
  const Block = require("./../config");
  const value = (() => {
    /**
     * @return {undefined}
     */
    function n() {
      round(this, n);
      /** @type {null} */
      this.mmpayStatus = null;
    }
    return A(n, null, [{
      key : "getFriendsScore",
      /**
       * @return {?}
       */
      value() {
        try {
          let evt = wx.getStorageSync("friends_score") || [];
          return evt = evt && evt.ts ? evt.ts < Date.now() ? [] : evt.data : [];
        } catch (e) {
          return[];
        }
      }
    }, {
      key : "saveFriendsScore",
      /**
       * @param {Object} component
       * @return {undefined}
       */
      value(component) {
        wx.setStorage({
          key : "friends_score",
          data : component,
          /**
           * @param {?} textStatus
           * @return {undefined}
           */
          success(textStatus) {
          },
          /**
           * @param {?} positionError
           * @return {undefined}
           */
          fail(positionError) {
          }
        });
      }
    }, {
      key : "saveMyUserInfo",
      /**
       * @param {Object} component
       * @return {undefined}
       */
      value(component) {
        wx.setStorage({
          key : "my_user_info",
          data : component,
          /**
           * @param {?} textStatus
           * @return {undefined}
           */
          success(textStatus) {
          },
          /**
           * @param {?} positionError
           * @return {undefined}
           */
          fail(positionError) {
          }
        });
      }
    }, {
      key : "saveHeighestScore",
      /**
       * @param {Object} component
       * @return {undefined}
       */
      value(component) {
        wx.setStorage({
          key : "my_heighest_score",
          data : component,
          /**
           * @param {?} textStatus
           * @return {undefined}
           */
          success(textStatus) {
          },
          /**
           * @param {?} positionError
           * @return {undefined}
           */
          fail(positionError) {
          }
        });
      }
    }, {
      key : "getHeighestScore",
      /**
       * @return {?}
       */
      value() {
        try {
          return wx.getStorageSync("my_heighest_score") || false;
        } catch (e) {
          return false;
        }
      }
    }, {
      key : "getMyUserInfo",
      /**
       * @return {?}
       */
      value() {
        try {
          return wx.getStorageSync("my_user_info") || false;
        } catch (e) {
          return null;
        }
      }
    }, {
      key : "saveSessionId",
      /**
       * @param {Object} component
       * @return {undefined}
       */
      value(component) {
        wx.setStorage({
          key : "session_id",
          data : component,
          /**
           * @param {?} textStatus
           * @return {undefined}
           */
          success(textStatus) {
          },
          /**
           * @param {?} positionError
           * @return {undefined}
           */
          fail(positionError) {
          }
        });
      }
    }, {
      key : "getSessionId",
      /**
       * @param {?} thisValue
       * @return {?}
       */
      value(thisValue) {
        try {
          return wx.getStorageSync("session_id") || "";
        } catch (e) {
          return "";
        }
      }
    }, {
      key : "clearSessionId",
      /**
       * @return {undefined}
       */
      value() {
        wx.removeStorage({
          key : "session_id",
          /**
           * @param {?} textStatus
           * @return {undefined}
           */
          success(textStatus) {
          },
          /**
           * @param {?} positionError
           * @return {undefined}
           */
          fail(positionError) {
          }
        });
      }
    }, {
      key : "saveServerConfig",
      /**
       * @param {Object} component
       * @return {undefined}
       */
      value(component) {
        wx.setStorage({
          key : "server_config",
          data : component,
          /**
           * @param {?} textStatus
           * @return {undefined}
           */
          success(textStatus) {
          },
          /**
           * @param {?} positionError
           * @return {undefined}
           */
          fail(positionError) {
          }
        });
      }
    }, {
      key : "getServerConfig",
      /**
       * @return {?}
       */
      value() {
        try {
          return wx.getStorageSync("server_config") || 0;
        } catch (e) {
          return 0;
        }
      }
    }, {
      key : "getFirstBlood",
      /**
       * @return {?}
       */
      value() {
        try {
          return wx.getStorageSync("first_blood") || 0;
        } catch (e) {
          return 0;
        }
      }
    }, {
      key : "saveFirstBlood",
      /**
       * @return {undefined}
       */
      value() {
        wx.setStorage({
          key : "first_blood",
          data : 1,
          /**
           * @param {?} textStatus
           * @return {undefined}
           */
          success(textStatus) {
          },
          /**
           * @param {?} positionError
           * @return {undefined}
           */
          fail(positionError) {
          }
        });
      }
    }, {
      key : "getHistoryTimes",
      /**
       * @return {?}
       */
      value() {
        try {
          return wx.getStorageSync("history_Times2") || false;
        } catch (e) {
          return false;
        }
      }
    }, {
      key : "saveHistoryTimes",
      /**
       * @param {Object} component
       * @return {undefined}
       */
      value(component) {
        wx.setStorage({
          key : "history_Times2",
          data : component,
          /**
           * @param {?} textStatus
           * @return {undefined}
           */
          success(textStatus) {
          },
          /**
           * @param {?} positionError
           * @return {undefined}
           */
          fail(positionError) {
          }
        });
      }
    }, {
      key : "saveActionData",
      /**
       * @param {Object} component
       * @return {undefined}
       */
      value(component) {
        wx.setStorage({
          key : "action_data0",
          data : component,
          /**
           * @param {?} textStatus
           * @return {undefined}
           */
          success(textStatus) {
          },
          /**
           * @param {?} positionError
           * @return {undefined}
           */
          fail(positionError) {
          }
        });
      }
    }, {
      key : "getActionData",
      /**
       * @return {?}
       */
      value() {
        try {
          return wx.getStorageSync("action_data0") || false;
        } catch (e) {
          return false;
        }
      }
    }, {
      key : "saveWeekBestScore",
      /**
       * @param {Object} component
       * @return {undefined}
       */
      value(component) {
        wx.setStorage({
          key : "weeek_best_score0",
          data : component,
          /**
           * @param {?} textStatus
           * @return {undefined}
           */
          success(textStatus) {
          },
          /**
           * @param {?} positionError
           * @return {undefined}
           */
          fail(positionError) {
          }
        });
      }
    }, {
      key : "getWeekBestScore",
      /**
       * @return {?}
       */
      value() {
        try {
          let a = wx.getStorageSync("weeek_best_score0") || 0;
          return a && (a.ts && (a = a.ts < Date.now() ? 0 : a.data)), a;
        } catch (e) {
          return 0;
        }
      }
    }, {
      key : "setRelayNewBie",
      /**
       * @return {undefined}
       */
      value() {
        wx.setStorage({
          key : "relay_newbie",
          data : 1,
          /**
           * @param {?} textStatus
           * @return {undefined}
           */
          success(textStatus) {
          },
          /**
           * @param {?} positionError
           * @return {undefined}
           */
          fail(positionError) {
          }
        });
      }
    }, {
      key : "getRelayNewBie",
      /**
       * @return {?}
       */
      value() {
        try {
          return wx.getStorageSync("relay_newbie") || 0;
        } catch (e) {
          return 0;
        }
      }
    }, {
      key : "getWangZheBaseStatus",
      /**
       * @return {?}
       */
      value() {
        return Block.USEWANGZHEBASE;
      }
    }, {
      key : "getMmpayBaseStatus",
      /**
       * @return {?}
       */
      value() {
        return Block.USEMMPAYBASE;
      }
    }, {
      key : "getMmpayBonusStatus",
      /**
       * @return {?}
       */
      value() {
        const r = {
          status : 0,
          expire_time : false
        };
        let response = void 0;
        if (this.mmpayStatus) {
          response = this.mmpayStatus;
        } else {
          try {
            response = wx.getStorageSync("mmpayStatus");
          } catch (n) {
            response = r;
          }
        }
        if (1 == response.status) {
          /** @type {number} */
          const g = Math.round(new Date / 1E3);
          return response.expire_time + response.svr_time < g ? r : response;
        }
        return 0 == response.status ? response : r;
      }
    }, {
      key : "setMmpayBonusStatus",
      /**
       * @param {?} scope
       * @param {?} thisValue
       * @return {undefined}
       */
      value(scope, thisValue) {
        this.mmpayStatus = Object.assign(scope, {
          svr_time : thisValue
        });
        wx.setStorage({
          key : "mmpayStatus",
          data : this.mmpayStatus
        });
      }
    }]), n;
  })();
  obj.default = value;
});
