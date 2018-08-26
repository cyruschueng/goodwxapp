define("js/control/observeCtrl.js", ($sanitize, dataAndEvents, object) => {
    /**
     * @param {Object} options
     * @return {?}
     */
    function getOptions(options) {
        return options && options.__esModule ? options : {
            default: options
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
        value: true
    });
    const make = (() => {
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
    const obj = getOptions($sanitize("../pages/observe/observeWaiting"));
    const opts = getOptions($sanitize("../pages/observe/observeGg"));
    const opt = getOptions($sanitize("../pages/observe/observeOut"));
    const options = getOptions($sanitize("../network/network"));
    const prototype = (() => {
        /**
         * @param {?} theGame
         * @param {?} allBindingsAccessor
         * @return {undefined}
         */
        function init(theGame, allBindingsAccessor) {
            animate(this, init);
            this.game = theGame;
            /** @type {string} */
            this.name = "observe";
            this.gameCtrl = this.game.gameCtrl;
            this.model = this.game.gameModel;
            this.view = this.game.gameView;
            this.modeCtrl = allBindingsAccessor;
            this.netWorkCtrl = this.gameCtrl.netWorkCtrl;
            this.gameSocket = this.game.gameSocket;
            /** @type {null} */
            this.currentPage = null;
            this.waitingPage = new obj.default(theGame);
            this.ggPage = new opts.default(theGame);
            this.outPage = new opt.default(theGame);
            /** @type {string} */
            this.gameId = "";
            /** @type {null} */
            this.longTimeout = null;
        }
        return make(init, [{
            key: "init",
            /**
             * @param {Object} req
             * @return {?}
             */
            value(req) {
                const audience_mode_switch = this.model.getServerConfig();
                if (audience_mode_switch && !audience_mode_switch.audience_mode_switch) {
                    return this.view.showServeConfigForbiddenObserveMode(), void this.modeCtrl.changeMode("singleCtrl");
                }
                this.model.setStage("");
                const i = this.model.getSessionId();
                this.gameId = req.query.gameId;
                this.model.setObserveInfo({
                    headimg: req.query.headimg,
                    nickName: req.query.nickName
                });
                this.model.setGameId(this.gameId);
                wx.showLoading();
                if (i) {
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
                if (thisValue) {
                    this.setLongTimeHandle();
                    this.gameSocket.connectSocket();
                    this.model.setStage("");
                } else {
                    this.goToObserveStateFail();
                }
            }
        }, {
            key: "socketJoinSuccess",
            /**
             * @param {?} thisValue
             * @return {undefined}
             */
            value(thisValue) {
                this.clearLongTimeHandle();
                wx.hideLoading();
                if (thisValue) {
                    this.waitingPage.show();
                    this.model.setStage(this.waitingPage.name);
                    this.currentPage = this.waitingPage;
                    this.game.UI.setScore(0);
                    /** @type {number} */
                    this.checkPlayerTimeout = setInterval(this.checkPlayerState.bind(this), 1E4);
                } else {
                    this.showPlayerDead();
                }
            }
        }, {
            key: "goToObserveStateFail",
            /**
             * @return {undefined}
             */
            value() {
                this.view.showObserveStateFail();
                this.modeCtrl.changeMode("singleCtrl");
            }
        }, {
            key: "setLongTimeHandle",
            /**
             * @return {undefined}
             */
            value() {
                /** @type {number} */
                this.longTimeout = setTimeout(this.handleLongTime.bind(this), 9E3);
            }
        }, {
            key: "handleLongTime",
            /**
             * @return {undefined}
             */
            value() {
                this.goToObserveStateFail();
            }
        }, {
            key: "clearLongTimeHandle",
            /**
             * @return {undefined}
             */
            value() {
                if (null != this.longTimeout) {
                    clearTimeout(this.longTimeout);
                    /** @type {null} */
                    this.longTimeout = null;
                }
            }
        }, {
            key: "showPlayerDead",
            /**
             * @return {undefined}
             */
            value() {
                this.gameSocket.close();
                this.clearCheckPlayerTimeout();
                if (this.currentPage) {
                    this.currentPage.hide();
                }
                this.outPage.show();
                this.model.setStage(this.outPage.name);
                this.currentPage = this.outPage;
            }
        }, {
            key: "checkPlayerState",
            /**
             * @return {undefined}
             */
            value() {
                options.default.syncop(this.judgePlayerState.bind(this));
            }
        }, {
            key: "judgePlayerState",
            /**
             * @param {?} thisValue
             * @param {MessageEvent} evt
             * @return {undefined}
             */
            value(thisValue, evt) {
                if (thisValue) {
                    if (0 != evt.data.state) {
                        this.clearCheckPlayerTimeout();
                        this.showPlayerDead();
                    }
                } else {
                    this.handleSyncopErr();
                }
            }
        }, {
            key: "handleSyncopErr",
            /**
             * @return {undefined}
             */
            value() {
                this.view.showSyncopErr();
                this.goToObserveStateFail();
            }
        }, {
            key: "clearCheckPlayerTimeout",
            /**
             * @return {undefined}
             */
            value() {
                if (null != this.checkPlayerTimeout) {
                    clearInterval(this.checkPlayerTimeout);
                    /** @type {null} */
                    this.checkPlayerTimeout = null;
                }
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
                /** @type {null} */
                this.currentPage = null;
                this.model.setStage("");
                this.model.clearGameId();
                this.clearLongTimeHandle();
                this.clearCheckPlayerTimeout();
                wx.hideLoading();
                if (this.gameSocket.alive) {
                    this.gameSocket.close();
                }
                this.model.clearObserveInfo();
                this.game.instructionCtrl.destroy();
                if (this.game.deadTimeout) {
                    clearTimeout(this.game.deadTimeout);
                    /** @type {null} */
                    this.game.deadTimeout = null;
                }
                /** @type {boolean} */
                this.game.pendingReset = false;
                this.game.resetScene();
            }
        }, {
            key: "showPlayerWaiting",
            /**
             * @return {undefined}
             */
            value() {
                if (this.currentPage != this.waitingPage) {
                    if (null != this.currentPage) {
                        this.currentPage.hide();
                    }
                    this.waitingPage.show();
                    this.model.setStage(this.waitingPage.name);
                    this.currentPage = this.waitingPage;
                }
            }
        }, {
            key: "showPlayerGG",
            /**
             * @param {?} event
             * @return {undefined}
             */
            value(event) {
                if (null != this.currentPage) {
                    this.currentPage.hide();
                }
                this.ggPage.show(event);
                this.model.setStage(this.ggPage.name);
                this.currentPage = this.ggPage;
            }
        }, {
            key: "onPlayerOut",
            /**
             * @return {undefined}
             */
            value() {
                this.showPlayerDead();
            }
        }, {
            key: "onViewerStart",
            /**
             * @return {undefined}
             */
            value() {
                this.gameSocket.quitObserve();
                this.game.instructionCtrl.destroy();
                this.modeCtrl.directPlaySingleGame();
            }
        }, {
            key: "showGameOverPage",
            /**
             * @return {undefined}
             */
            value() {}
        }, {
            key: "wxOnhide",
            /**
             * @return {undefined}
             */
            value() {
                this.clearCheckPlayerTimeout();
                this.gameSocket.quitObserve();
                this.gameSocket.close();
                this.game.resetScene();
            }
        }, {
            key: "wxOnshow",
            /**
             * @return {undefined}
             */
            value() {}
        }]), init;
    })();
    object.default = prototype;
});