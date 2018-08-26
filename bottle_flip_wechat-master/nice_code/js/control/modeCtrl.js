define("js/control/modeCtrl.js", (format, dataAndEvents, object) => {
    /**
     * @param {Object} d
     * @return {?}
     */
    function $(d) {
        return d && d.__esModule ? d : {
            default: d
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
        value: true
    });
    const waitForAsyncTasks = (() => {
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
    const opt = $(format("./singleCtrl"));
    const self = $(format("./groupShareCtrl"));
    const $window = $(format("./battleCtrl"));
    const opts = $(format("./observeCtrl"));
    const property = $(format("./playerCtrl"));
    const desc = $(format("./relayCtrl"));
    const obj = $(format("../lib/mue/eventcenter"));
    const f = format("../config");
    const prototype = (() => {
        /**
         * @param {?} options
         * @return {undefined}
         */
        function setup(options) {
            clone(this, setup);
            this.game = options;
            this.singleCtrl = new opt.default(options, this);
            this.groupShareCtrl = new self.default(options, this);
            this.battleCtrl = new $window.default(options, this);
            this.observeCtrl = new opts.default(options, this);
            this.playerCtrl = new property.default(options, this);
            this.relayCtrl = new desc.default(options, this);
            this.model = options.gameModel;
            this.gameCtrl = options.gameCtrl;
            /** @type {null} */
            this.currentCtrl = null;
            obj.default.on(f.EVENT.GOSTARTPAGE, this.goToSingleStartPage.bind(this));
        }
        return waitForAsyncTasks(setup, [{
            key: "initFirstPage",
            /**
             * @param {?} listener
             * @return {undefined}
             */
            value(listener) {
                switch (this.model.getMode()) {
                    case "single":
                        this.currentCtrl = this.singleCtrl;
                        this.singleCtrl.init(listener);
                        this.gameCtrl.netWorkLogin();
                        break;
                    case "groupShare":
                        this.currentCtrl = this.groupShareCtrl;
                        this.groupShareCtrl.init(listener);
                        break;
                    case "battle":
                        this.currentCtrl = this.battleCtrl;
                        this.battleCtrl.init(listener);
                        break;
                    case "observe":
                        this.currentCtrl = this.observeCtrl;
                        this.observeCtrl.init(listener);
                        break;
                    case "relay":
                        this.currentCtrl = this.relayCtrl;
                        this.currentCtrl.init(listener);
                        break;
                    default:
                        this.currentCtrl = this.singleCtrl;
                        this.model.setMode("single");
                        this.singleCtrl.init(listener);
                        this.gameCtrl.netWorkLogin();
                }
            }
        }, {
            key: "reInitFirstPage",
            /**
             * @param {?} event
             * @return {undefined}
             */
            value(event) {
                const fixHook = this;
                if (this.currentCtrl) {
                    this.currentCtrl.destroy();
                    this.gameCtrl.reviewCtrl.destroy();
                    /** @type {null} */
                    this.currentCtrl = null;
                }
                this.gameCtrl.queryCtrl.identifyMode(event);
                setTimeout(() => {
                    fixHook.initFirstPage(event);
                }, 500);
            }
        }, {
            key: "clickStart",
            /**
             * @return {undefined}
             */
            value() {
                if (this.currentCtrl) {
                    if (this.currentCtrl.clickStart) {
                        this.currentCtrl.clickStart();
                    }
                }
            }
        }, {
            key: "showGameOverPage",
            /**
             * @param {?} newValue
             * @return {undefined}
             */
            value(newValue) {
                if (this.currentCtrl) {
                    if (this.currentCtrl.showGameOverPage) {
                        this.currentCtrl.showGameOverPage(newValue);
                    }
                }
            }
        }, {
            key: "gameOverClickReplay",
            /**
             * @return {undefined}
             */
            value() {
                if (this.currentCtrl) {
                    if (this.currentCtrl.gameOverClickReplay) {
                        this.currentCtrl.gameOverClickReplay();
                    } else {
                        this.game.handleWxOnError({
                            message: "cannot Find this.currentCtrl.gameOverClickReplay",
                            stack: `${this.game.mode}${this.game.stage}`
                        });
                    }
                }
            }
        }, {
            key: "showFriendRank",
            /**
             * @param {?} newValue
             * @return {undefined}
             */
            value(newValue) {
                if (this.currentCtrl) {
                    if (this.currentCtrl.showFriendRank) {
                        this.currentCtrl.showFriendRank(newValue);
                    }
                }
            }
        }, {
            key: "friendRankReturn",
            /**
             * @return {undefined}
             */
            value() {
                if (this.currentCtrl) {
                    if (this.currentCtrl.friendRankReturn) {
                        this.currentCtrl.friendRankReturn();
                    }
                }
            }
        }, {
            key: "shareGroupRank",
            /**
             * @return {undefined}
             */
            value() {
                if (this.currentCtrl) {
                    if (this.currentCtrl.shareGroupRank) {
                        this.currentCtrl.shareGroupRank();
                    }
                }
            }
        }, {
            key: "showGroupRankPage",
            /**
             * @return {undefined}
             */
            value() {
                if (this.currentCtrl) {
                    if (this.currentCtrl.showGroupRankPage) {
                        this.currentCtrl.showGroupRankPage();
                    }
                }
            }
        }, {
            key: "clickRank",
            /**
             * @return {undefined}
             */
            value() {
                if (this.currentCtrl) {
                    if (this.currentCtrl.clickRank) {
                        this.currentCtrl.clickRank();
                    }
                }
            }
        }, {
            key: "shareBattleCard",
            /**
             * @return {undefined}
             */
            value() {
                if (this.currentCtrl) {
                    if (this.currentCtrl.shareBattleCard) {
                        this.currentCtrl.shareBattleCard();
                    }
                }
            }
        }, {
            key: "changeMode",
            /**
             * @param {string} id
             * @return {undefined}
             */
            value(id) {
                if (this.currentCtrl) {
                    if (this.currentCtrl.destroy) {
                        this.currentCtrl.destroy();
                        this.gameCtrl.reviewCtrl.destroy();
                    }
                }
                this.model.setMode(this[id].name);
                this.currentCtrl = this[id];
                if ("singleCtrl" === id) {
                    obj.default.emit(f.EVENT.GOTOSINGLESTARTPAGE, {});
                }
                this[id].init();
            }
        }, {
            key: "singleChangeToPlayer",
            /**
             * @return {undefined}
             */
            value() {
                this.model.setMode(this.playerCtrl.name);
                this.currentCtrl = this.playerCtrl;
                this.playerCtrl.init();
            }
        }, {
            key: "groupPlayGame",
            /**
             * @return {undefined}
             */
            value() {
                if (this.currentCtrl) {
                    if (this.currentCtrl.groupPlayGame) {
                        this.currentCtrl.groupPlayGame();
                    }
                }
            }
        }, {
            key: "directPlaySingleGame",
            /**
             * @return {undefined}
             */
            value() {
                if (this.currentCtrl) {
                    this.currentCtrl.destroy();
                }
                this.model.setMode(this.singleCtrl.name);
                this.currentCtrl = this.singleCtrl;
                this.singleCtrl.clickStart();
            }
        }, {
            key: "battlePlay",
            /**
             * @param {?} newValue
             * @return {undefined}
             */
            value(newValue) {
                if (this.currentCtrl) {
                    if (this.currentCtrl.battlePlay) {
                        this.currentCtrl.battlePlay(newValue);
                    }
                }
            }
        }, {
            key: "shareObservCard",
            /**
             * @return {undefined}
             */
            value() {
                if (this.currentCtrl) {
                    if (this.currentCtrl.shareObservCard) {
                        this.currentCtrl.shareObservCard();
                    }
                }
            }
        }, {
            key: "socketJoinSuccess",
            /**
             * @param {?} newValue
             * @return {undefined}
             */
            value(newValue) {
                if (this.currentCtrl) {
                    if (this.currentCtrl.socketJoinSuccess) {
                        this.currentCtrl.socketJoinSuccess(newValue);
                    }
                }
            }
        }, {
            key: "showPlayerGG",
            /**
             * @param {?} newValue
             * @return {undefined}
             */
            value(newValue) {
                if (this.currentCtrl) {
                    if (this.currentCtrl.showPlayerGG) {
                        this.currentCtrl.showPlayerGG(newValue);
                    }
                }
            }
        }, {
            key: "showPlayerWaiting",
            /**
             * @return {undefined}
             */
            value() {
                if (this.currentCtrl) {
                    if (this.currentCtrl.showPlayerWaiting) {
                        this.currentCtrl.showPlayerWaiting();
                    }
                }
            }
        }, {
            key: "onPlayerOut",
            /**
             * @return {undefined}
             */
            value() {
                if (this.currentCtrl) {
                    if (this.currentCtrl.onPlayerOut) {
                        this.currentCtrl.onPlayerOut();
                    } else {
                        this.game.handleWxOnError({
                            message: "cannot Find this.currentCtrl.onPlayerOut",
                            stack: `${this.game.mode}${this.game.stage}`
                        });
                    }
                }
            }
        }, {
            key: "onViewerStart",
            /**
             * @return {undefined}
             */
            value() {
                if (this.currentCtrl) {
                    if (this.currentCtrl.onViewerStart) {
                        this.currentCtrl.onViewerStart();
                    }
                }
            }
        }, {
            key: "appealNotify",
            /**
             * @return {undefined}
             */
            value() {
                if (this.currentCtrl) {
                    if (this.currentCtrl.appealNotify) {
                        this.currentCtrl.appealNotify();
                    }
                }
            }
        }, {
            key: "onSocketOpen",
            /**
             * @return {undefined}
             */
            value() {
                if (this.currentCtrl) {
                    if (this.currentCtrl.onSocketOpen) {
                        this.currentCtrl.onSocketOpen();
                    }
                }
            }
        }, {
            key: "gotoRelayMode",
            /**
             * @return {undefined}
             */
            value() {
                if (this.currentCtrl) {
                    if (this.currentCtrl.gotoRelayMode) {
                        this.currentCtrl.gotoRelayMode();
                    }
                }
            }
        }, {
            key: "outRelay1",
            /**
             * @return {undefined}
             */
            value() {
                if (this.currentCtrl) {
                    if (this.currentCtrl.outRelay1) {
                        this.currentCtrl.outRelay1();
                    }
                }
            }
        }, {
            key: "outRelay2",
            /**
             * @return {undefined}
             */
            value() {
                if (this.currentCtrl) {
                    if (this.currentCtrl.outRelay2) {
                        this.currentCtrl.outRelay2();
                    }
                }
            }
        }, {
            key: "startRelay",
            /**
             * @param {?} newValue
             * @return {undefined}
             */
            value(newValue) {
                if (this.currentCtrl) {
                    if (this.currentCtrl.startRelay) {
                        this.currentCtrl.startRelay(newValue);
                    }
                }
            }
        }, {
            key: "watchRelay",
            /**
             * @return {undefined}
             */
            value() {
                if (this.currentCtrl) {
                    if (this.currentCtrl.watchRelay) {
                        this.currentCtrl.watchRelay();
                    }
                }
            }
        }, {
            key: "replayRelay",
            /**
             * @return {undefined}
             */
            value() {
                if (this.currentCtrl) {
                    if (this.currentCtrl.replayRelay) {
                        this.currentCtrl.replayRelay();
                    }
                }
            }
        }, {
            key: "shareRelay",
            /**
             * @return {undefined}
             */
            value() {
                if (this.currentCtrl) {
                    if (this.currentCtrl.shareRelay) {
                        this.currentCtrl.shareRelay();
                    }
                }
            }
        }, {
            key: "onSocketCloseErr",
            /**
             * @return {undefined}
             */
            value() {
                if (this.currentCtrl) {
                    if (this.currentCtrl.onSocketCloseErr) {
                        this.currentCtrl.onSocketCloseErr();
                    }
                }
            }
        }, {
            key: "goToSingleStartPage",
            /**
             * @param {?} thisValue
             * @return {undefined}
             */
            value(thisValue) {
                this.changeMode("singleCtrl");
            }
        }, {
            key: "skipRelayBeginner",
            /**
             * @return {undefined}
             */
            value() {
                if (this.currentCtrl) {
                    if (this.currentCtrl.skipRelayBeginner) {
                        this.currentCtrl.skipRelayBeginner();
                    }
                }
            }
        }, {
            key: "wxOnShow",
            /**
             * @return {undefined}
             */
            value() {
                if (this.currentCtrl) {
                    if (this.currentCtrl.wxOnShow) {
                        this.currentCtrl.wxOnShow();
                    }
                }
            }
        }, {
            key: "wxOnhide",
            /**
             * @return {undefined}
             */
            value() {
                if (this.currentCtrl) {
                    if (this.currentCtrl.wxOnhide) {
                        this.currentCtrl.wxOnhide();
                    }
                }
            }
        }]), setup;
    })();
    object.default = prototype;
});