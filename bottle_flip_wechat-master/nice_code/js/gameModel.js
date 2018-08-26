define("js/gameModel.js", ($sanitize, dataAndEvents, object) => {
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
   * @param {Function} deepDataAndEvents
   * @return {undefined}
   */
  function clone(dataAndEvents, deepDataAndEvents) {
    if (!(dataAndEvents instanceof deepDataAndEvents)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  Object.defineProperty(object, "__esModule", {
    value : true
  });
  const progress = (() => {
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
  const obj = toObject($sanitize("./store/storage"));
  const self = toObject($sanitize("./store/session"));
  const prototype = (() => {
    /**
     * @param {Object} game
     * @return {undefined}
     */
    function update(game) {
      clone(this, update);
      /** @type {Object} */
      this.game = game;
      /** @type {string} */
      this.mode = "";
      /** @type {string} */
      this.stage = "";
      /** @type {number} */
      this.is_from_wn = 0;
      /** @type {boolean} */
      this.firstBlood = false;
      /** @type {number} */
      this.currentScore = 0;
      /** @type {number} */
      this.highestScore = 0;
      this.observeInfo = {};
      /** @type {Array} */
      this.friendsScore = [];
      /** @type {number} */
      this.weekBestScore = 0;
      /** @type {number} */
      this.startTime = Math.floor(Date.now() / 1E3);
      this.upLoadScoreData = {};
      this.relayInfo = {};
      /** @type {boolean} */
      this.groupListData = false;
    }
    return progress(update, [{
      key : "setMode",
      /**
       * @param {number} dir
       * @return {undefined}
       */
      value(dir) {
        /** @type {number} */
        this.mode = dir;
        /** @type {number} */
        this.game.mode = dir;
      }
    }, {
      key : "setStage",
      /**
       * @param {number} stage
       * @return {undefined}
       */
      value(stage) {
        /** @type {number} */
        this.stage = stage;
        /** @type {number} */
        this.game.stage = stage;
      }
    }, {
      key : "init",
      /**
       * @return {undefined}
       */
      value() {
        self.default.init();
        if (!obj.default.getFirstBlood()) {
          this.setFirstBlood(true);
          obj.default.saveFirstBlood();
        }
        this.highestScore = obj.default.getHeighestScore() || 0;
        self.default.setServerConfig(obj.default.getServerConfig());
        this.weekBestScore = obj.default.getWeekBestScore() || 0;
        this.friendsScore = obj.default.getFriendsScore();
      }
    }, {
      key : "getServerConfig",
      /**
       * @return {?}
       */
      value() {
        return self.default.serverConfig;
      }
    }, {
      key : "setIsFromWn",
      /**
       * @param {Array} dir
       * @return {undefined}
       */
      value(dir) {
        /** @type {Array} */
        this.is_from_wn = dir;
        /** @type {Array} */
        this.game.is_from_wn = dir;
      }
    }, {
      key : "setFirstBlood",
      /**
       * @param {boolean} dir
       * @return {undefined}
       */
      value(dir) {
        /** @type {boolean} */
        this.firstBlood = dir;
        /** @type {boolean} */
        this.game.firstBlood = dir;
      }
    }, {
      key : "getMode",
      /**
       * @return {?}
       */
      value() {
        return this.mode;
      }
    }, {
      key : "setScore",
      /**
       * @param {Array} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        /** @type {Array} */
        this.currentScore = thisValue;
      }
    }, {
      key : "saveHeighestScore",
      /**
       * @param {Blob} newValue
       * @return {undefined}
       */
      value(newValue) {
        obj.default.saveHeighestScore(newValue);
        /** @type {Blob} */
        this.highestScore = newValue;
      }
    }, {
      key : "saveLaterUpLoadScore",
      /**
       * @param {Object} k
       * @param {Object} d
       * @return {undefined}
       */
      value(k, d) {
        if (k && d) {
          const data = {
            ts : this.getNextSunday(),
            score : k,
            data : d
          };
          obj.default.saveActionData(data);
        }
      }
    }, {
      key : "clearLaterUpLoadScore",
      /**
       * @return {undefined}
       */
      value() {
        obj.default.saveActionData("");
      }
    }, {
      key : "saveWeekBestScore",
      /**
       * @return {undefined}
       */
      value() {
        const task = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
        const data = {
          ts : this.getNextSunday(),
          data : task
        };
        obj.default.saveWeekBestScore(data);
      }
    }, {
      key : "getActionData",
      /**
       * @return {?}
       */
      value() {
        return obj.default.getActionData();
      }
    }, {
      key : "getHighestScore",
      /**
       * @return {?}
       */
      value() {
        return this.highestScore;
      }
    }, {
      key : "saveFriendsScore",
      /**
       * @param {Object} component
       * @return {undefined}
       */
      value(component) {
        /** @type {Object} */
        this.friendsScore = component;
        const data = {
          ts : this.getNextSunday(),
          data : component
        };
        obj.default.saveFriendsScore(data);
      }
    }, {
      key : "getSessionId",
      /**
       * @return {?}
       */
      value() {
        return self.default.sessionId;
      }
    }, {
      key : "getPkId",
      /**
       * @return {?}
       */
      value() {
        return self.default.pkId;
      }
    }, {
      key : "clearPkId",
      /**
       * @return {undefined}
       */
      value() {
        self.default.clearPkId();
      }
    }, {
      key : "setShareTicket",
      /**
       * @param {?} newValue
       * @return {undefined}
       */
      value(newValue) {
        self.default.setShareTicket(newValue);
      }
    }, {
      key : "getShareTicket",
      /**
       * @return {?}
       */
      value() {
        return self.default.shareTicket;
      }
    }, {
      key : "clearShareTicket",
      /**
       * @return {undefined}
       */
      value() {
        self.default.clearShareTicket();
      }
    }, {
      key : "setGameId",
      /**
       * @param {?} newValue
       * @return {undefined}
       */
      value(newValue) {
        self.default.setGameId(newValue);
      }
    }, {
      key : "setGameTicket",
      /**
       * @param {?} newValue
       * @return {undefined}
       */
      value(newValue) {
        self.default.setGameTicket(newValue);
      }
    }, {
      key : "clearGameId",
      /**
       * @return {undefined}
       */
      value() {
        self.default.clearGameId();
      }
    }, {
      key : "clearGameTicket",
      /**
       * @return {undefined}
       */
      value() {
        self.default.clearGameTicket();
      }
    }, {
      key : "setObserveInfo",
      /**
       * @param {?} data
       * @return {undefined}
       */
      value(data) {
        this.observeInfo.headimg = data.headimg;
        this.observeInfo.nickName = data.nickName;
      }
    }, {
      key : "clearObserveInfo",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {null} */
        this.observeInfo.headimg = null;
        /** @type {null} */
        this.observeInfo.nickName = null;
      }
    }, {
      key : "getIsRelayNewBie",
      /**
       * @return {?}
       */
      value() {
        /** @type {boolean} */
        const a = !obj.default.getRelayNewBie();
        return a && obj.default.setRelayNewBie(), a;
      }
    }, {
      key : "getNextSunday",
      /**
       * @return {?}
       */
      value() {
        /** @type {Date} */
        const d = new Date;
        /** @type {number} */
        const t = d.getDay();
        d.setHours(0, 0, 0, 0);
        /** @type {number} */
        let n = 7 - t + 1;
        return 8 == n && (n = 1), d.valueOf() + 24 * n * 60 * 60 * 1E3;
      }
    }, {
      key : "setGroupRankData",
      /**
       * @param {Array} result
       * @param {string} thisValue
       * @return {undefined}
       */
      value(result, thisValue) {
        this.groupListData = {
          list : result,
          userInfo : thisValue
        };
      }
    }, {
      key : "getGroupRankData",
      /**
       * @return {?}
       */
      value() {
        const $scope = this.groupListData;
        return!(!$scope || !$scope.userInfo) && {
          list : $scope.list,
          userInfo : $scope.userInfo
        };
      }
    }]), update;
  })();
  object.default = prototype;
});
