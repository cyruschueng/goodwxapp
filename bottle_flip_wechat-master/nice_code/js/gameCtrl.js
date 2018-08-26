define("js/gameCtrl.js", (template, dataAndEvents, object) => {
  /**
   * @param {Object} d
   * @return {?}
   */
  function $(d) {
    return d && d.__esModule ? d : {
      default : d
    };
  }
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
  Object.defineProperty(object, "__esModule", {
    value : true
  });
  const A = (() => {
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
  const obj = $(template("./control/queryCtrl"));
  const opt = $(template("./control/modeCtrl"));
  const opts = $(template("./control/networkCtrl"));
  const property = $(template("./control/reviewCtrl"));
  const app = (template("./lib/animation"), template("./config"));
  const self = $(template("./store/session"));
  const prototype = (() => {
    /**
     * @param {?} g
     * @return {undefined}
     */
    function n(g) {
      round(this, n);
      this.game = g;
    }
    return A(n, [{
      key : "init",
      /**
       * @return {undefined}
       */
      value() {
        this.gameView = this.game.gameView;
        this.queryCtrl = new obj.default(this.game);
        this.netWorkCtrl = new opts.default(this.game);
        this.reviewCtrl = new property.default(this.game);
        this.modeCtrl = new opt.default(this.game);
        this.model = this.game.gameModel;
        this.reporter = this.game.reporter;
        this.historyTimes = this.game.historyTimes;
        this.viewer = this.game.viewer;
        /** @type {boolean} */
        this.reUpLoadShowOverPage = true;
      }
    }, {
      key : "firstInitGame",
      /**
       * @param {?} newValue
       * @return {undefined}
       */
      value(newValue) {
        this.queryCtrl.identifyMode(newValue);
        this.modeCtrl.initFirstPage(newValue);
      }
    }, {
      key : "identifyModeErr",
      /**
       * @param {?} newValue
       * @return {undefined}
       */
      value(newValue) {
        this.gameView.showIdentifyModeErr(newValue);
      }
    }, {
      key : "onLoginSuccess",
      /**
       * @return {undefined}
       */
      value() {
        this.reporter.setTimer(app.REPORTERTIMEOUT);
        this.checkLaterUpLoad();
      }
    }, {
      key : "clickStart",
      /**
       * @return {undefined}
       */
      value() {
        this.modeCtrl.clickStart();
      }
    }, {
      key : "showFriendRank",
      /**
       * @return {undefined}
       */
      value() {
        this.modeCtrl.showFriendRank();
      }
    }, {
      key : "initReview",
      /**
       * @param {?} listener
       * @param {?} error
       * @return {undefined}
       */
      value(listener, error) {
        this.reviewCtrl.init(listener, error);
      }
    }, {
      key : "quitReview",
      /**
       * @return {undefined}
       */
      value() {
        this.reviewCtrl.destroy();
      }
    }, {
      key : "reviewReturn",
      /**
       * @param {string} state
       * @return {undefined}
       */
      value(state) {
        if ("group" == state) {
          this.modeCtrl.showGroupRankPage();
        } else {
          if (state = "friends") {
            this.modeCtrl.showFriendRank(true);
          }
        }
      }
    }, {
      key : "clickRank",
      /**
       * @return {undefined}
       */
      value() {
        this.modeCtrl.clickRank();
      }
    }, {
      key : "gameOver",
      /**
       * @param {?} reporter
       * @return {undefined}
       */
      value(reporter) {
        if ("relay" != this.model.mode) {
          if (this.reviewCtrl.isInThisPage || this.model.setScore(reporter), "observe" != this.model.mode) {
            const r20 = this.model.getHighestScore();
            this.netWorkCtrl.requestMmpayTimeout();
            this.historyTimes.addOne();
            const restoreScript = this.historyTimes.getTimes();
            this.reporter.playGameReport(reporter, r20, restoreScript);
            this.netWorkCtrl.upDateFriendsScoreList();
            this.netWorkCtrl.updateUserInfo();
          }
          if ("player" == this.model.mode) {
            this.reporter.playAudienceReport();
          }
          if ("battle" == this.model.mode) {
            this.reporter.playPKReport(reporter);
          }
          this.reporter.sendReport();
        }
      }
    }, {
      key : "gameOverShowPage",
      /**
       * @return {undefined}
       */
      value() {
        const that = this;
        if ("relay" != this.model.mode) {
          if (this.reUpLoadShowOverPage = true, "observe" == this.model.mode) {
            this.modeCtrl.showGameOverPage();
          } else {
            this.model.getHighestScore();
            const items = this.model.weekBestScore;
            const rooms = this.model.currentScore;
            if (rooms < items) {
              this.modeCtrl.showGameOverPage();
              this.historyTimes.checkUp();
            } else {
              ((() => {
                const message = {
                  seed : that.game.randomSeed,
                  time_seed : that.game.time_seed,
                  action : that.game.actionList,
                  musicList : that.game.musicList,
                  touchList : that.game.touchList,
                  steps : that.game.touchMoveList,
                  timestamp : that.game.touchStartTime,
                  version : app.VERSION,
                  use_wangzhe : that.game.use_wangzhe,
                  use_mmpaybase : that.game.use_mmpaybase,
                  mmpay_status : that.game.mmpay_status,
                  mmpay_checksum : that.game.mmpay_checksum
                };
                console.log(that.game.use_wangzhe);
                console.log(that.game.use_mmpaybase);
                console.log(that.game.mmpay_status);
                console.log(that.game.mmpay_checksum);
                const r20 = that.historyTimes.getTimes();
                that.model.upLoadScoreData = {
                  currentScore : rooms,
                  gameTimes : r20,
                  verifyData : message
                };
                that.netWorkCtrl.requestSettlement(rooms, r20, that.afterRequestSettlement.bind(that), message);
              }))();
            }
          }
        }
      }
    }, {
      key : "afterRequestSettlement",
      /**
       * @param {?} firstTime
       * @param {Element} newValue
       * @param {?} thisValue
       * @return {undefined}
       */
      value(firstTime, newValue, thisValue) {
        if (firstTime) {
          if (this.reUpLoadShowOverPage && this.modeCtrl.showGameOverPage(newValue), this.historyTimes.afterUpload(true), "observe" == this.model.mode) {
            return;
          }
          const value = this.model.upLoadScoreData.currentScore;
          if (void 0 == value || newValue && newValue.banType) {
            return;
          }
          if (value >= this.model.weekBestScore) {
            this.model.weekBestScore = value;
            this.model.saveWeekBestScore(value);
            if (value > this.model.getHighestScore()) {
              this.model.saveHeighestScore(this.model.currentScore);
            }
            if (thisValue) {
              if (thisValue.playback_id) {
                this.netWorkCtrl.setPlayBackIdTolocalStorage({
                  playback_id : thisValue.playback_id
                });
              }
            }
          }
        } else {
          this.netWorkCtrl.sendServerError();
          this.showReUpLoadScoreModel(newValue);
        }
      }
    }, {
      key : "showReUpLoadScoreModel",
      /**
       * @param {string} event
       * @return {undefined}
       */
      value(event) {
        const fixHook = this;
        wx.showModal({
          title : "\u63d0\u793a",
          content : `\u5206\u6570\u4e0a\u4f20\u5931\u8d25,\u8bf7\u68c0\u67e5\u7f51\u7edc\u72b6\u6001\u540e\u91cd\u8bd5(${event})`,
          confirmText : "\u91cd\u8bd5",
          cancelText : "\u5ef6\u540e\u4e0a\u4f20",
          /**
           * @param {Object} data
           * @return {undefined}
           */
          success(data) {
            if (data.confirm) {
              fixHook.reUploadScore();
            } else {
              if (data.cancel) {
                if (fixHook.reUpLoadShowOverPage) {
                  fixHook.showOverPage(true);
                }
              } else {
                fixHook.showReUpLoadScoreModel(event);
              }
            }
          },
          /**
           * @return {undefined}
           */
          fail() {
            if (fixHook.reUpLoadShowOverPage) {
              fixHook.showOverPage(false);
            }
          }
        });
      }
    }, {
      key : "showOverPage",
      /**
       * @param {boolean} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        if (this.modeCtrl.showGameOverPage(), thisValue && "observe" != this.model.mode) {
          if (!this.model.upLoadScoreData.verifyData || !this.model.upLoadScoreData.currentScore) {
            return;
          }
          const p = this.model.getActionData();
          const setOptions = this.model.upLoadScoreData.verifyData;
          const i = this.model.upLoadScoreData.currentScore;
          if (!(p && (p.ts > Date.now() && p.score >= i))) {
            this.model.saveLaterUpLoadScore(i, setOptions);
          }
        }
      }
    }, {
      key : "reUploadScore",
      /**
       * @return {undefined}
       */
      value() {
        const newNormals = this;
        if (self.default.sessionId) {
          this.reUploadScore2();
        } else {
          this.netWorkCtrl.requestLogin(dataAndEvents => {
            if (dataAndEvents) {
              newNormals.reUploadScore2();
            } else {
              newNormals.showReUpLoadScoreModel("n0");
            }
          });
        }
      }
    }, {
      key : "reUploadScore2",
      /**
       * @return {undefined}
       */
      value() {
        const items = this.model.upLoadScoreData;
        const count = items.currentScore;
        const afterNewCount = items.gameTimes;
        const r20 = items.verifyData;
        this.netWorkCtrl.requestSettlement(count, afterNewCount, this.afterRequestSettlement.bind(this), r20);
      }
    }, {
      key : "clickReplay",
      /**
       * @return {undefined}
       */
      value() {
        this.reporter.playAudienceReportStart();
        this.modeCtrl.gameOverClickReplay();
      }
    }, {
      key : "friendRankReturn",
      /**
       * @return {undefined}
       */
      value() {
        this.modeCtrl.friendRankReturn();
      }
    }, {
      key : "netWorkLogin",
      /**
       * @return {undefined}
       */
      value() {
        this.netWorkCtrl.netWorkLogin();
      }
    }, {
      key : "shareGroupRank",
      /**
       * @return {undefined}
       */
      value() {
        this.modeCtrl.shareGroupRank();
      }
    }, {
      key : "afterShareGroupRank",
      /**
       * @param {?} thisValue
       * @param {?} reporter
       * @return {undefined}
       */
      value(thisValue, reporter) {
        this.reporter.shareGroupReport(reporter);
      }
    }, {
      key : "shareBattleCard",
      /**
       * @return {undefined}
       */
      value() {
        this.modeCtrl.shareBattleCard();
      }
    }, {
      key : "afterShareBattle",
      /**
       * @param {?} thisValue
       * @param {?} reporter
       * @return {undefined}
       */
      value(thisValue, reporter) {
        if (thisValue) {
          this.reporter.sharePKReport(reporter);
        }
      }
    }, {
      key : "groupPlayGame",
      /**
       * @return {undefined}
       */
      value() {
        this.modeCtrl.groupPlayGame();
      }
    }, {
      key : "loginBattle",
      /**
       * @param {?} reporter
       * @return {undefined}
       */
      value(reporter) {
        this.reporter.joinPKReport(reporter);
        this.reporter.playPKReportStart(reporter);
      }
    }, {
      key : "showPkPage",
      /**
       * @param {?} reporter
       * @return {undefined}
       */
      value(reporter) {
        this.reporter.playPKScore(reporter);
      }
    }, {
      key : "onBattlePlay",
      /**
       * @param {?} newValue
       * @return {undefined}
       */
      value(newValue) {
        this.modeCtrl.battlePlay(newValue);
      }
    }, {
      key : "battleToSingle",
      /**
       * @return {undefined}
       */
      value() {
        this.reporter.resetPKReport();
      }
    }, {
      key : "shareObservCard",
      /**
       * @return {undefined}
       */
      value() {
        this.modeCtrl.shareObservCard();
      }
    }, {
      key : "socketJoinSuccess",
      /**
       * @param {?} newValue
       * @return {undefined}
       */
      value(newValue) {
        this.modeCtrl.socketJoinSuccess(newValue);
        if ("observe" == this.model.mode) {
          if (newValue) {
            /** @type {boolean} */
            this.game.socketFirstSync = true;
            this.reporter.joinAudienceReportStart();
          } else {
            this.reporter.joinAudienceReport();
          }
        } else {
          if (newValue) {
            this.reporter.playAudienceReportStart();
          }
        }
      }
    }, {
      key : "afterShareObserveCard",
      /**
       * @param {?} reporter
       * @return {undefined}
       */
      value(reporter) {
        this.reporter.shareAudienceReport(reporter);
      }
    }, {
      key : "showPlayerGG",
      /**
       * @param {?} newValue
       * @return {undefined}
       */
      value(newValue) {
        this.modeCtrl.showPlayerGG(newValue);
      }
    }, {
      key : "showPlayerWaiting",
      /**
       * @return {undefined}
       */
      value() {
        this.modeCtrl.showPlayerWaiting();
      }
    }, {
      key : "onPlayerOut",
      /**
       * @return {undefined}
       */
      value() {
        this.modeCtrl.onPlayerOut();
      }
    }, {
      key : "onViewerStart",
      /**
       * @return {undefined}
       */
      value() {
        this.game.audioManager.scale_intro.stop();
        if (this.game.deadTimeout) {
          clearTimeout(this.game.deadTimeout);
          /** @type {null} */
          this.game.deadTimeout = null;
        }
        /** @type {boolean} */
        this.game.pendingReset = false;
        this.modeCtrl.onViewerStart();
        this.reporter.joinAudienceReport();
      }
    }, {
      key : "wxOnShow",
      /**
       * @param {Object} obj2
       * @return {undefined}
       */
      value(obj2) {
        const self = this;
        this.netWorkCtrl.requestServerInit();
        this.netWorkCtrl.requestMmpayTimeout();
        this.reporter.setTimer(app.REPORTERTIMEOUT);
        setTimeout(() => {
          if (obj2.query && obj2.query.hasOwnProperty("mode")) {
            /** @type {boolean} */
            self.reUpLoadShowOverPage = false;
            self.modeCtrl.reInitFirstPage(obj2);
            /** @type {boolean} */
            self.game.guider = false;
          } else {
            if ("single" != self.model.mode && ("player" != self.model.mode && ("battle" != self.model.mode && "relay" != self.model.mode))) {
              /** @type {boolean} */
              self.reUpLoadShowOverPage = false;
              self.modeCtrl.changeMode("singleCtrl");
              /** @type {boolean} */
              self.game.guider = false;
            } else {
              if (self.reviewCtrl.isInThisPage) {
                self.reviewCtrl.continue();
              } else {
                self.modeCtrl.wxOnShow();
              }
            }
          }
        }, 300);
      }
    }, {
      key : "wxOnhide",
      /**
       * @return {undefined}
       */
      value() {
        this.reporter.quitReport();
        if ("observe" == this.model.mode) {
          this.reporter.joinAudienceReport();
        } else {
          if (this.reviewCtrl.isInThisPage) {
            this.reviewCtrl.pausePlay();
          }
        }
        this.netWorkCtrl.clearServerInit();
        this.netWorkCtrl.clearMmpayTimeout();
        this.reporter.clearTimer();
        this.modeCtrl.wxOnhide();
      }
    }, {
      key : "onReplayGame",
      /**
       * @return {undefined}
       */
      value() {
        if ("observe" != this.model.mode) {
          this.reporter.playGameReportStart();
          this.reporter.gameBeginReport();
        }
      }
    }, {
      key : "onPeopleCome",
      /**
       * @param {?} dir
       * @return {undefined}
       */
      value(dir) {
        if (0 == dir.audience_cmd) {
          this.viewer.peopleCome(dir);
          this.reporter.playAudienceReportMaxPeople(this.viewer.num);
        } else {
          if (1 == dir.audience_cmd) {
            this.viewer.peopleOut(dir);
          }
        }
      }
    }, {
      key : "onServerConfigForbid",
      /**
       * @return {undefined}
       */
      value() {
      }
    }, {
      key : "onSocketCloseErr",
      /**
       * @return {undefined}
       */
      value() {
        if ("relay" === this.game.mode) {
          this.modeCtrl.onSocketCloseErr();
        } else {
          this.gameView.showSocketCloseErr();
          this.modeCtrl.changeMode("singleCtrl");
        }
      }
    }, {
      key : "appealNotify",
      /**
       * @return {undefined}
       */
      value() {
        this.modeCtrl.appealNotify();
      }
    }, {
      key : "checkLaterUpLoad",
      /**
       * @param {?} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        const that = this;
        const p = this.model.getActionData();
        if (p && (p.ts > Date.now() && p.score)) {
          const size = p.score;
          const join = p.data;
          const r20 = this.historyTimes.getTimes();
          if (thisValue) {
            this.netWorkCtrl.requestSettlement(size, r20, this.afterCheckLaterUpLoad.bind(this, size), join);
          } else {
            wx.showModal({
              title : "\u63d0\u793a",
              content : "\u5f53\u524d\u6709\u5206\u6570\u672a\u4e0a\u4f20\u6210\u529f\uff0c\u662f\u5426\u91cd\u8bd5",
              confirmText : "\u91cd\u8bd5",
              cancelText : "\u53d6\u6d88",
              /**
               * @param {Object} data
               * @return {undefined}
               */
              success(data) {
                if (data.confirm) {
                  that.netWorkCtrl.requestSettlement(size, r20, that.afterCheckLaterUpLoad.bind(that, size), join);
                } else {
                  if (data.cancel) {
                    that.model.clearLaterUpLoadScore();
                  } else {
                    that.checkLaterUpLoad();
                  }
                }
              },
              /**
               * @return {undefined}
               */
              fail() {
                that.checkLaterUpLoad();
              }
            });
          }
        }
      }
    }, {
      key : "afterCheckLaterUpLoad",
      /**
       * @param {?} index
       * @param {?} thisValue
       * @param {string} event
       * @return {?}
       */
      value(index, thisValue, event) {
        const eventTrigger = this;
        if (thisValue) {
          return wx.showToast({
            title : "\u5206\u6570\u4e0a\u4f20\u6210\u529f",
            icon : "success",
            duration : 1E3
          }), this.model.clearLaterUpLoadScore(), index > this.model.weekBestScore && (this.model.weekBestScore = index, this.model.saveWeekBestScore(index)), void(index > this.model.highestScore && this.model.saveHeighestScore(index));
        }
        wx.showModal({
          title : "\u63d0\u793a",
          content : `\u5206\u6570\u5ef6\u540e\u4e0a\u4f20\u5931\u8d25,\u8bf7\u68c0\u67e5\u7f51\u7edc\u72b6\u6001\u540e\u91cd\u8bd5(${event})`,
          confirmText : "\u91cd\u8bd5",
          cancelText : "\u5ef6\u540e\u4e0a\u4f20",
          /**
           * @param {Object} data
           * @return {undefined}
           */
          success(data) {
            if (data.confirm) {
              eventTrigger.checkLaterUpLoad(true);
            } else {
              if (!data.cancel) {
                eventTrigger.afterCheckLaterUpLoad(false, event);
              }
            }
          },
          /**
           * @return {undefined}
           */
          fail() {
            eventTrigger.afterCheckLaterUpLoad(false, event);
          }
        });
      }
    }, {
      key : "onSocketOpen",
      /**
       * @return {undefined}
       */
      value() {
        this.modeCtrl.onSocketOpen();
      }
    }, {
      key : "gotoRelayMode",
      /**
       * @return {undefined}
       */
      value() {
        this.reporter.reportGotoRelayMode();
        this.modeCtrl.gotoRelayMode();
      }
    }, {
      key : "skipRelayBeginner",
      /**
       * @return {undefined}
       */
      value() {
        this.modeCtrl.skipRelayBeginner();
      }
    }, {
      key : "outRelay1",
      /**
       * @return {undefined}
       */
      value() {
        this.modeCtrl.outRelay1();
      }
    }, {
      key : "outRelay2",
      /**
       * @return {undefined}
       */
      value() {
        this.modeCtrl.outRelay2();
      }
    }, {
      key : "startRelay",
      /**
       * @param {?} newValue
       * @return {undefined}
       */
      value(newValue) {
        this.modeCtrl.startRelay(newValue);
      }
    }, {
      key : "watchRelay",
      /**
       * @return {undefined}
       */
      value() {
        this.modeCtrl.watchRelay();
      }
    }, {
      key : "replayRelay",
      /**
       * @return {undefined}
       */
      value() {
        this.modeCtrl.replayRelay();
      }
    }, {
      key : "shareRelay",
      /**
       * @return {undefined}
       */
      value() {
        this.modeCtrl.shareRelay();
      }
    }]), n;
  })();
  object.default = prototype;
});
