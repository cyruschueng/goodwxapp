define("js/control/singleCtrl.js", (require, dataAndEvents, object) => {
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
   * @param {?} dataAndEvents
   * @param {Function} target
   * @return {undefined}
   */
  function clone(dataAndEvents, target) {
    if (!(dataAndEvents instanceof target)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  Object.defineProperty(object, "__esModule", {
    value : true
  });
  const mixIn = (() => {
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
  const $window = $(require("../pages/single/singleStartPage"));
  const opts = $(require("../pages/single/singleGamePage"));
  const property = $(require("../pages/single/singleGameOverPage"));
  const opt = $(require("../pages/single/singleFriendRankPage"));
  const desc = $(require("../pages/single/relayGuide"));
  const Block = require("../shareApp");
  const obj = $(require("../network/network"));
  const self = $(require("../lib/mue/eventcenter"));
  const ecConfig = require("../config");
  const prototype = (() => {
    /**
     * @param {?} options
     * @param {?} config
     * @return {undefined}
     */
    function constructor(options, config) {
      clone(this, constructor);
      /** @type {string} */
      this.name = "single";
      this.game = options;
      this.gameCtrl = this.game.gameCtrl;
      this.model = this.game.gameModel;
      this.view = this.game.gameView;
      this.modeCtrl = config;
      this.netWorkCtrl = this.gameCtrl.netWorkCtrl;
      this.gameSocket = this.game.gameSocket;
      this.startPage = new $window.default(options);
      this.gamePage = new opts.default(options);
      this.gameOverPage = new property.default(options);
      this.friendRankPage = new opt.default(options);
      this.relayGuidePage = new desc.default(options);
      /** @type {null} */
      this.currentPage = null;
      /** @type {null} */
      this.lastPage = null;
      /** @type {null} */
      this.socketTimeout = null;
    }
    return mixIn(constructor, [{
      key : "init",
      /**
       * @param {?} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        this.startPage.show();
        this.model.setStage(this.startPage.name);
        this.currentPage = this.startPage;
      }
    }, {
      key : "clickStart",
      /**
       * @return {undefined}
       */
      value() {
        this.hideCurrentPage();
        this.gamePage.show();
        this.game.replayGame();
        this.model.setStage(this.gamePage.name);
        this.currentPage = this.gamePage;
      }
    }, {
      key : "showGameOverPage",
      /**
       * @param {?} event
       * @return {undefined}
       */
      value(event) {
        this.hideCurrentPage();
        this.gameOverPage.show(event);
        this.model.clearPkId();
        this.model.setStage(this.gameOverPage.name);
        this.currentPage = this.gameOverPage;
      }
    }, {
      key : "gameOverClickReplay",
      /**
       * @return {undefined}
       */
      value() {
        this.clickStart();
      }
    }, {
      key : "showFriendRank",
      /**
       * @param {?} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        if (!thisValue) {
          this.lastPage = this.currentPage;
        }
        this.hideCurrentPage();
        this.friendRankPage.show();
        this.model.setStage(this.friendRankPage.name);
        this.currentPage = this.friendRankPage;
      }
    }, {
      key : "friendRankReturn",
      /**
       * @return {undefined}
       */
      value() {
        this.hideCurrentPage();
        this.lastPage.show();
        this.model.setStage(this.lastPage.name);
        this.currentPage = this.lastPage;
      }
    }, {
      key : "shareGroupRank",
      /**
       * @return {undefined}
       */
      value() {
        const gameCtrl = this;
        (0, Block.shareGroupRank)((deepDataAndEvents, opt_obj2) => {
          gameCtrl.gameCtrl.afterShareGroupRank(deepDataAndEvents, opt_obj2);
        });
      }
    }, {
      key : "clickRank",
      /**
       * @return {undefined}
       */
      value() {
        this.showFriendRank();
      }
    }, {
      key : "shareBattleCard",
      /**
       * @return {undefined}
       */
      value() {
        const afterHavePkId = this;
        const t = this.model.getSessionId();
        const items = this.model.currentScore;
        const i = this.model.getPkId();
        if (t) {
          if (i) {
            this.afterHavePkId();
          } else {
            obj.default.createPK(items).then(() => {
              afterHavePkId.afterHavePkId();
            }, () => {
              afterHavePkId.getPKErr();
            }).catch(fmt => console.log(fmt));
          }
        } else {
          this.view.showNoSession();
        }
      }
    }, {
      key : "afterHavePkId",
      /**
       * @return {undefined}
       */
      value() {
        const gameCtrl = this;
        const r20 = this.model.getPkId();
        const rooms = this.model.currentScore;
        (0, Block.shareBattle)(r20, rooms, (deepDataAndEvents, opt_obj2) => {
          gameCtrl.gameCtrl.afterShareBattle(deepDataAndEvents, opt_obj2);
        });
      }
    }, {
      key : "getPKErr",
      /**
       * @return {undefined}
       */
      value() {
        this.view.showGetPkIdFail();
      }
    }, {
      key : "shareObservCard",
      /**
       * @return {undefined}
       */
      value() {
        this.gamePage.hideLookersShare();
        this.model.setStage("loading");
        wx.showLoading();
        if (this.model.getSessionId()) {
          this.afterLogin(true);
        } else {
          this.netWorkCtrl.netWorkLogin(this.afterLogin.bind(this));
        }
      }
    }, {
      key : "afterLogin",
      /**
       * @param {?} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        const observable = this;
        if (thisValue) {
          obj.default.requestCreateGame((dataAndEvents, change) => {
            if (dataAndEvents) {
              observable.model.setGameId(change.data.game_id);
              observable.model.setGameTicket(change.data.up_op_ticket);
              observable.shareObservCardA();
            } else {
              observable.shareObservCardFail(change);
            }
          });
        } else {
          this.shareObservCardFail();
        }
      }
    }, {
      key : "shareObservCardFail",
      /**
       * @param {?} obj1
       * @return {undefined}
       */
      value(obj1) {
        this.view.showShareObserveCardFail(obj1);
        this.model.clearGameId();
        this.model.clearGameTicket();
        if ("loading" == this.model.stage) {
          this.model.setStage("game");
        }
        this.clearSocketTimeout();
        this.gameSocket.close();
        wx.hideLoading();
      }
    }, {
      key : "shareObservCardA",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {number} */
        this.socketTimeout = setTimeout(this.shareObservCardFail.bind(this), 5E3);
        this.gameSocket.connectSocket();
      }
    }, {
      key : "socketJoinSuccess",
      /**
       * @param {?} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        wx.hideLoading();
        if (thisValue) {
          this.clearSocketTimeout();
          this.shareObservCardB();
        } else {
          this.shareObservCardFail();
        }
      }
    }, {
      key : "shareObservCardB",
      /**
       * @return {undefined}
       */
      value() {
        const self = this;
        (0, Block.shareObserve)((dataAndEvents, deepDataAndEvents) => {
          if (dataAndEvents) {
            self.gameCtrl.afterShareObserveCard(deepDataAndEvents);
          }
          setTimeout(() => {
            if ("loading" == self.model.stage) {
              self.model.setStage("game");
            }
            self.modeCtrl.singleChangeToPlayer();
            /** @type {null} */
            self.currentPage = null;
          }, 50);
        });
      }
    }, {
      key : "clearSocketTimeout",
      /**
       * @return {undefined}
       */
      value() {
        if (null != this.socketTimeout) {
          clearTimeout(this.socketTimeout);
          /** @type {null} */
          this.socketTimeout = null;
        }
      }
    }, {
      key : "appealNotify",
      /**
       * @return {undefined}
       */
      value() {
        if (this.currentPage === this.startPage) {
          this.startPage.show({
            banType : 1
          });
        }
      }
    }, {
      key : "gotoRelayMode",
      /**
       * @return {undefined}
       */
      value() {
        if (this.model.getIsRelayNewBie()) {
          console.log("\u53bb\u63a5\u9f99\u65b0\u624b\u6307\u5bfc");
          self.default.emit(ecConfig.EVENT.SHOW_RELAY_GUIDE);
          this.hideCurrentPage();
          this.relayGuidePage.show();
          this.model.setStage(this.relayGuidePage.name);
          this.currentPage = this.relayGuidePage;
        } else {
          console.log("\u4e0d\u53bb\u63a5\u9f99\u65b0\u624b\u6307\u5bfc");
          this.modeCtrl.changeMode("relayCtrl");
        }
      }
    }, {
      key : "skipRelayBeginner",
      /**
       * @return {undefined}
       */
      value() {
        this.modeCtrl.changeMode("relayCtrl");
      }
    }, {
      key : "wxOnhide",
      /**
       * @return {undefined}
       */
      value() {
      }
    }, {
      key : "wxOnshow",
      /**
       * @return {undefined}
       */
      value() {
      }
    }, {
      key : "destroy",
      /**
       * @return {undefined}
       */
      value() {
        this.hideCurrentPage();
        /** @type {null} */
        this.currentPage = null;
        this.model.setStage("");
        this.model.clearGameId();
        this.model.clearGameTicket();
        this.clearSocketTimeout();
        this.game.resetScene();
      }
    }, {
      key : "hideCurrentPage",
      /**
       * @return {undefined}
       */
      value() {
        if (this.currentPage) {
          this.currentPage.hide();
        }
      }
    }]), constructor;
  })();
  object.default = prototype;
});
