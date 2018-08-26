define("js/network/reporter.js", (require, dataAndEvents, object) => {
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
  const obj = getOptions(require("./network"));
  const ecConfig = require("../config");
  const opts = getOptions(require("../lib/mue/eventcenter"));
  const prototype = (() => {
    /**
     * @return {undefined}
     */
    function init() {
      animate(this, init);
      /** @type {null} */
      this.timeOut = null;
      /** @type {Array} */
      this.reportList = [];
      this.pkState = {
        isGroup : 0,
        score : 0
      };
      /** @type {number} */
      this.singleState = 0;
      this.observeState = {
        startTime : 0,
        success : 0
      };
      this.playerState = {
        startTime : 0,
        maxAudience : 0
      };
      /** @type {number} */
      this.gameStartTime = 0;
      try {
        const $scope = wx.getSystemInfoSync();
        this.clientInfo = {
          platform : $scope.platform,
          brand : $scope.brand,
          model : $scope.model,
          system : $scope.system
        };
      } catch (fmt) {
        console.log(fmt);
      }
      /** @type {number} */
      this.relayGameStartTime = 0;
      this.bindEvent();
    }
    return make(init, [{
      key : "bindEvent",
      /**
       * @return {undefined}
       */
      value() {
        const self = this;
        opts.default.on(ecConfig.EVENT.CREATE_RELAY_ROOM_FAIL, (dataAndEvents, onComplete) => {
          self.reportCreateRelayRoom(onComplete);
        });
        opts.default.on(ecConfig.EVENT.RP_JOIN_RELAY_ROOM_AGAIN, (dataAndEvents, response) => {
          self.reportPlayGameAgain({
            result : response.res
          });
        });
        opts.default.on(ecConfig.EVENT.RP_JOIN_RELAY_ROOM, (dataAndEvents, onComplete) => {
          self.reportJoinRelayRoom(onComplete);
        });
        opts.default.on(ecConfig.EVENT.RP_RELAY_START, (dataAndEvents, onComplete) => {
          self.relayGameStartTime = self.getTime();
          self.reportRelayStart(onComplete);
          self.sendReport();
        });
        opts.default.on(ecConfig.EVENT.RP_RELAY_GAME_END, (dataAndEvents, tween) => {
          /** @type {number} */
          let duration = 0;
          if (self.relayGameStartTime) {
            /** @type {number} */
            duration = self.getTime() - self.relayGameStartTime;
          }
          /** @type {number} */
          tween.duration = duration;
          self.reportRelayEnd(tween);
        });
      }
    }, {
      key : "getTime",
      /**
       * @return {?}
       */
      value() {
        /** @type {number} */
        let sectionLength = Date.now();
        return sectionLength = Math.floor(sectionLength / 1E3);
      }
    }, {
      key : "enterReport",
      /**
       * @param {number} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        if (this.gameStartTime = this.getTime(), thisValue) {
          const data = {
            ts : this.getTime(),
            type : 0,
            scene : thisValue
          };
          this.reportList.push(data);
        }
      }
    }, {
      key : "quitReport",
      /**
       * @return {undefined}
       */
      value() {
        if (this.gameStartTime) {
          const obj = {
            ts : this.getTime(),
            type : 1,
            duration : this.getTime() - this.gameStartTime
          };
          this.reportList.push(obj);
        }
      }
    }, {
      key : "playGameReport",
      /**
       * @param {number} x
       * @param {(number|string)} y
       * @param {number} thisValue
       * @return {undefined}
       */
      value(x, y, thisValue) {
        if (this.singleState) {
          const out = {
            ts : this.getTime(),
            type : 2,
            score : x,
            best_score : y,
            break_record : x > y ? 1 : 0,
            duration : this.getTime() - this.singleState,
            times : thisValue
          };
          this.reportList.push(out);
          /** @type {number} */
          this.singleState = 0;
        }
      }
    }, {
      key : "addEggBlockReport",
      /**
       * @return {undefined}
       */
      value() {
        const count = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        const dimensions = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        const dirty = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
        const t = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [];
        /** @type {Array} */
        const result = [];
        /** @type {number} */
        let d = 13;
        for (;d < 33;++d) {
          if (count[d]) {
            result.push({
              id : d,
              count : count[d],
              type : 0
            });
          }
          if (dimensions[d]) {
            result.push({
              id : d,
              count : count[d],
              type : 1
            });
          }
          if (dirty[d]) {
            result.push({
              id : d,
              count : count[d],
              type : 2
            });
          }
          if (t[d]) {
            result.push({
              id : d,
              count : count[d],
              type : 3
            });
          }
        }
        obj.default.sendEggReport(result);
      }
    }, {
      key : "playGameReportStart",
      /**
       * @return {undefined}
       */
      value() {
        this.singleState = this.getTime();
      }
    }, {
      key : "shareAudienceReport",
      /**
       * @param {Array} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        const data = {
          ts : this.getTime(),
          type : 3,
          is_group : thisValue
        };
        this.reportList.push(data);
      }
    }, {
      key : "playAudienceReport",
      /**
       * @return {undefined}
       */
      value() {
        if (this.playerState.startTime) {
          const obj = {
            ts : this.getTime(),
            type : 4,
            duration : this.getTime() - this.playerState.startTime,
            max_audience : this.playerState.maxAudience
          };
          this.reportList.push(obj);
          /** @type {number} */
          this.playerState.startTime = 0;
          /** @type {number} */
          this.playerState.maxAudience = 0;
        }
      }
    }, {
      key : "playAudienceReportStart",
      /**
       * @return {undefined}
       */
      value() {
        this.playerState.startTime = this.getTime();
      }
    }, {
      key : "playAudienceReportMaxPeople",
      /**
       * @param {Array} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        if (this.playerState.maxAudience < thisValue) {
          /** @type {Array} */
          this.playerState.maxAudience = thisValue;
        }
      }
    }, {
      key : "joinAudienceReport",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {number} */
        const dur = 0 == this.observeState.startTime ? 0 : this.getTime() - this.observeState.startTime;
        const obj = {
          ts : this.getTime(),
          type : 5,
          duration : dur,
          join_audience_success : this.observeState.success
        };
        this.reportList.push(obj);
        /** @type {number} */
        this.observeState.startTime = 0;
        /** @type {number} */
        this.observeState.success = 0;
      }
    }, {
      key : "joinAudienceReportStart",
      /**
       * @return {undefined}
       */
      value() {
        this.observeState.startTime = this.getTime();
        /** @type {number} */
        this.observeState.success = 1;
      }
    }, {
      key : "shareGroupReport",
      /**
       * @param {?} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        const data = {
          ts : this.getTime(),
          type : 6,
          is_group : thisValue
        };
        this.reportList.push(data);
      }
    }, {
      key : "sharePKReport",
      /**
       * @param {Array} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        const data = {
          ts : this.getTime(),
          type : 7,
          is_group : thisValue
        };
        this.reportList.push(data);
      }
    }, {
      key : "joinPKReport",
      /**
       * @param {Array} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        const data = {
          ts : this.getTime(),
          type : 8,
          is_group : thisValue
        };
        this.reportList.push(data);
      }
    }, {
      key : "playPKReport",
      /**
       * @param {number} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        /** @type {number} */
        let a = 0;
        if (thisValue == this.pkState.score) {
          /** @type {number} */
          a = 1;
        }
        if (thisValue > this.pkState.score) {
          /** @type {number} */
          a = 3;
        }
        const data = {
          ts : this.getTime(),
          type : 9,
          is_group : this.pkState.isGroup,
          result : a
        };
        this.reportList.push(data);
      }
    }, {
      key : "playPKReportStart",
      /**
       * @param {Array} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        /** @type {Array} */
        this.pkState.isGroup = thisValue;
      }
    }, {
      key : "playPKScore",
      /**
       * @param {number} s
       * @return {undefined}
       */
      value(s) {
        /** @type {number} */
        this.pkState.score = s;
      }
    }, {
      key : "resetPKReport",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {number} */
        this.pkState.isGroup = 0;
        /** @type {number} */
        this.pkState.score = 0;
      }
    }, {
      key : "gameBeginReport",
      /**
       * @return {undefined}
       */
      value() {
        const data = {
          ts : this.getTime(),
          type : 10
        };
        this.reportList.push(data);
      }
    }, {
      key : "reportGotoRelayMode",
      /**
       * @return {undefined}
       */
      value() {
        const data = {
          ts : this.getTime(),
          type : 11
        };
        this.reportList.push(data);
      }
    }, {
      key : "reportCreateRelayRoom",
      /**
       * @return {undefined}
       */
      value() {
        const value = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).result;
        const computed = void 0 === value ? 0 : value;
        const details = {
          ts : this.getTime(),
          type : 12,
          result : computed
        };
        this.reportList.push(details);
      }
    }, {
      key : "reportJoinRelayRoom",
      /**
       * @return {undefined}
       */
      value() {
        const self = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        const a = self.scene;
        const adown = void 0 === a ? 1 : a;
        const value = self.result;
        const computed = void 0 === value ? 0 : value;
        const data = {
          ts : this.getTime(),
          type : 13,
          scene : adown,
          result : computed
        };
        this.reportList.push(data);
      }
    }, {
      key : "reportRelayStart",
      /**
       * @return {undefined}
       */
      value() {
        const value = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).result;
        const computed = void 0 === value ? 0 : value;
        const details = {
          ts : this.getTime(),
          type : 14,
          result : computed
        };
        this.reportList.push(details);
      }
    }, {
      key : "reportRelayEnd",
      /**
       * @param {Object} entry
       * @return {undefined}
       */
      value(entry) {
        const label = entry.jielong_score;
        const i = entry.player_num;
        const q = entry.max_audience;
        const difficulty = entry.difficulty;
        const dur = entry.duration;
        const data = {
          ts : this.getTime(),
          type : 15,
          player_num : i,
          max_audience : q,
          difficulty,
          jielong_score : label,
          duration : dur
        };
        this.reportList.push(data);
      }
    }, {
      key : "reportPlayGameAgain",
      /**
       * @param {Object} r
       * @return {undefined}
       */
      value(r) {
        const a = r.result;
        const details = {
          ts : this.getTime(),
          type : 16,
          result : a
        };
        this.reportList.push(details);
      }
    }, {
      key : "sendReport",
      /**
       * @return {undefined}
       */
      value() {
        if (this.reportList.length) {
          obj.default.sendReport(this.reportList, this.clientInfo);
          /** @type {Array} */
          this.reportList = [];
        }
      }
    }, {
      key : "clearTimer",
      /**
       * @return {undefined}
       */
      value() {
        if (this.timeOut) {
          clearInterval(this.timeOut);
        }
      }
    }, {
      key : "setTimer",
      /**
       * @param {?} frequency
       * @return {undefined}
       */
      value(frequency) {
        /** @type {number} */
        this.timeOut = setInterval(this.sendReport.bind(this), frequency);
      }
    }]), init;
  })();
  object.default = prototype;
});
