define("js/control/battleCtrl.js", ($sanitize, dataAndEvents, object) => {
    /**
     * @param {Object} options
     * @return {?}
     */
    function toObject(options) {
        return options && options.__esModule ? options : {
            default: options
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
        value: true
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
            for (; i < p.length; i++) {
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
    const self = toObject($sanitize("../pages/battle/battlePkPage"));
    const opt = toObject($sanitize("../pages/battle/battleGamePage"));
    const obj = toObject($sanitize("../network/network"));
    const prototype = (() => {
        /**
         * @param {?} options
         * @param {?} config
         * @return {undefined}
         */
        function constructor(options, config) {
            clone(this, constructor);
            /** @type {string} */
            this.name = "battlePage";
            this.game = options;
            this.gameCtrl = this.game.gameCtrl;
            this.model = this.game.gameModel;
            this.view = this.game.gameView;
            this.modeCtrl = config;
            this.netWorkCtrl = this.gameCtrl.netWorkCtrl;
            /** @type {null} */
            this.currentPage = null;
            this.pkPage = new self.default(options);
            this.gamePage = new opt.default(options);
            /** @type {string} */
            this.shareTicket = "";
            /** @type {string} */
            this.pkId = "";
            /** @type {null} */
            this.shareInfoTimeout = null;
            this.battleScore = void 0;
        }
        return mixIn(constructor, [{
            key: "init",
            /**
             * @param {Object} component
             * @return {undefined}
             */
            value(component) {
                const t = this.model.getSessionId();
                this.shareTicket = component.shareTicket;
                this.pkId = component.query.pkId;
                this.model.setStage("");
                wx.showLoading();
                if (t) {
                    this.afterLogin(true);
                } else {
                    this.netWorkCtrl.netWorkLogin(this.afterLogin.bind(this));
                }
            }
        }, {
            key: "afterLogin",
            /**
             * @param {?} thisValue
             * @return {undefined}
             */
            value(thisValue) {
                const that = this;
                if (thisValue) {
                    this.setShareInfoTimeout();
                    wx.getShareInfo({
                        shareTicket: this.shareTicket,
                        /**
                         * @param {Object} opts
                         * @return {undefined}
                         */
                        success(opts) {
                            if (null != that.shareInfoTimeout) {
                                that.clearShareInfoTimeout();
                                that.model.setShareTicket(opts.rawData);
                                that.gotoBattlePage();
                                that.gameCtrl.loginBattle(1);
                            }
                        },
                        /**
                         * @param {?} positionError
                         * @return {undefined}
                         */
                        fail(positionError) {
                            if (null != that.shareInfoTimeout) {
                                that.clearShareInfoTimeout();
                                that.gotoBattlePage();
                                that.gameCtrl.loginBattle(0);
                            }
                        }
                    });
                } else {
                    this.goToBattleFail();
                }
            }
        }, {
            key: "gotoBattlePage",
            /**
             * @return {undefined}
             */
            value() {
                obj.default.getBattleData(this.gotoBattlePageAfterHaveData.bind(this), this.pkId);
            }
        }, {
            key: "gotoBattlePageAfterHaveData",
            /**
             * @param {?} thisValue
             * @param {MessageEvent} event
             * @return {undefined}
             */
            value(thisValue, event) {
                if (wx.hideLoading(), thisValue) {
                    /** @type {Array} */
                    const bProperties = [];
                    if (event.data.challenger.length) {
                        event.data.challenger.forEach(user => {
                            bProperties.push({
                                headimg: user.headimg,
                                is_self: user.is_self ? 1 : 0,
                                nickname: user.nickname,
                                score_info: [{
                                    score: user.score
                                }]
                            });
                        }, this);
                    }
                    bProperties.sort((dataAndEvents, deepDataAndEvents) => deepDataAndEvents.score_info[0].score - dataAndEvents.score_info[0].score);
                    const speed = {
                        organizerInfo: {
                            headimg: event.data.owner.headimg,
                            nickname: event.data.owner.nickname,
                            score_info: [{
                                score: event.data.owner.score
                            }],
                            left_time: event.data.left_time,
                            is_self: event.data.is_owner ? 1 : 0
                        },
                        pkListInfo: bProperties,
                        gg_score: this.battleScore
                    };
                    if (this.currentPage) {
                        this.currentPage.hide();
                    }
                    this.pkPage.show(speed);
                    this.model.setStage(this.pkPage.name);
                    this.currentPage = this.pkPage;
                    this.gameCtrl.showPkPage(event.data.owner.score);
                } else {
                    this.goToBattleFail();
                }
            }
        }, {
            key: "goToBattleFail",
            /**
             * @return {undefined}
             */
            value() {
                this.view.showGoToBattleFail();
                this.modeCtrl.changeMode("singleCtrl");
            }
        }, {
            key: "setShareInfoTimeout",
            /**
             * @return {undefined}
             */
            value() {
                /** @type {number} */
                this.shareInfoTimeout = setTimeout(this.handleShareInfoTimeout.bind(this), 5E3);
            }
        }, {
            key: "clearShareInfoTimeout",
            /**
             * @return {undefined}
             */
            value() {
                if (null != this.shareInfoTimeout) {
                    clearTimeout(this.shareInfoTimeout);
                    /** @type {null} */
                    this.shareInfoTimeout = null;
                }
            }
        }, {
            key: "handleShareInfoTimeout",
            /**
             * @return {undefined}
             */
            value() {
                this.clearShareInfoTimeout();
                this.goToBattleFail();
            }
        }, {
            key: "destroy",
            /**
             * @return {undefined}
             */
            value() {
                if (this.currentPage) {
                    this.currentPage.hide();
                }
                this.model.setStage("");
                wx.hideLoading();
                /** @type {string} */
                this.shareTicket = "";
                /** @type {string} */
                this.pkId = "";
                this.clearShareInfoTimeout();
                this.model.clearShareTicket();
                this.game.resetScene();
                this.battleScore = void 0;
            }
        }, {
            key: "battlePlay",
            /**
             * @param {?} thisValue
             * @return {undefined}
             */
            value(thisValue) {
                if (thisValue) {
                    if (this.currentPage) {
                        this.currentPage.hide();
                    }
                    this.gamePage.show();
                    this.game.replayGame();
                    this.model.setStage(this.gamePage.name);
                    this.currentPage = this.gamePage;
                } else {
                    this.modeCtrl.directPlaySingleGame();
                    this.gameCtrl.battleToSingle();
                }
            }
        }, {
            key: "showGameOverPage",
            /**
             * @return {undefined}
             */
            value() {
                if (this.currentPage) {
                    this.currentPage.hide();
                }
                this.model.setStage("");
                /** @type {null} */
                this.currentPage = null;
                const rooms = this.model.currentScore;
                this.battleScore = rooms;
                wx.showLoading();
                obj.default.updatepkinfo(this.gotoBattlePageAgain.bind(this), this.pkId, rooms);
            }
        }, {
            key: "gotoBattlePageAgain",
            /**
             * @param {?} thisValue
             * @return {undefined}
             */
            value(thisValue) {
                if (!thisValue) {
                    this.view.showUploadPkScoreFail();
                }
                this.gotoBattlePage();
            }
        }, {
            key: "wxOnhide",
            /**
             * @return {undefined}
             */
            value() {}
        }]), constructor;
    })();
    object.default = prototype;
});