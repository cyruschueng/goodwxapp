define("js/control/groupShareCtrl.js", ($sanitize, dataAndEvents, object) => {
    /**
     * @param {Object} id
     * @return {?}
     */
    function flag(id) {
        return id && id.__esModule ? id : {
            default: id
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
    const obj = flag($sanitize("../pages/group/groupPage"));
    const flagMsg = flag($sanitize("../network/network"));
    const prototype = (() => {
        /**
         * @param {?} game
         * @param {?} config
         * @return {undefined}
         */
        function constructor(game, config) {
            clone(this, constructor);
            /** @type {string} */
            this.name = "groupShare";
            this.game = game;
            this.gameCtrl = this.game.gameCtrl;
            this.model = this.game.gameModel;
            this.view = this.game.gameView;
            this.netWorkCtrl = this.gameCtrl.netWorkCtrl;
            this.modeCtrl = config;
            this.groupPage = new obj.default(game);
            /** @type {string} */
            this.shareTicket = "";
            /** @type {null} */
            this.shareInfoTimeout = null;
        }
        return mixIn(constructor, [{
            key: "init",
            /**
             * @param {?} thisValue
             * @return {?}
             */
            value(thisValue) {
                const group_score_switch = this.model.getServerConfig();
                if (group_score_switch && !group_score_switch.group_score_switch) {
                    return this.view.showServeConfigForbiddenGroupShare(), void this.modeCtrl.changeMode("singleCtrl");
                }
                this.model.setStage("");
                const i = this.model.getSessionId();
                this.shareTicket = thisValue.shareTicket;
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
                                flagMsg.default.getGroupScore((dataAndEvents, req) => {
                                    if (dataAndEvents) {
                                        const TRNEND_EV = req.data.user_info || [];
                                        const errorCallback = req.data.my_user_info || {};
                                        that.model.setStage(TRNEND_EV, errorCallback);
                                        that.showGroupRankPage(TRNEND_EV, errorCallback);
                                    } else {
                                        that.goToGroupShareFail();
                                    }
                                    wx.hideLoading();
                                });
                            }
                        },
                        /**
                         * @param {?} positionError
                         * @return {undefined}
                         */
                        fail(positionError) {
                            if (null != that.shareInfoTimeout) {
                                that.clearShareInfoTimeout();
                                wx.hideLoading();
                                that.goToGroupShareFail("\u7fa4\u91cc\u7684\u7fa4\u5206\u4eab\u624d\u6709\u6548\u54e6~");
                            }
                        }
                    });
                } else {
                    wx.hideLoading();
                    this.goToGroupShareFail();
                }
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
                this.goToGroupShareFail();
            }
        }, {
            key: "goToGroupShareFail",
            /**
             * @param {?} obj1
             * @return {undefined}
             */
            value(obj1) {
                this.view.showGroupShareFail(obj1);
                this.modeCtrl.changeMode("singleCtrl");
            }
        }, {
            key: "showGroupRankPage",
            /**
             * @param {number} key
             * @param {Node} callback
             * @return {undefined}
             */
            value(key, callback) {
                const object = this.model.getGroupRankData();
                let _ref = void 0;
                let length = void 0;
                if (object && (_ref = object.list, length = object.userInfo), void 0 !== key && void 0 !== callback) {
                    this.model.setGroupRankData(key, callback);
                } else {
                    if (void 0 === _ref || void 0 === length) {
                        throw new Error("showGroupRankPage\u3002\u8c03\u7528\u6ca1\u6709list\uff0cmyUserInfo\u6570\u636e");
                    }
                    key = _ref;
                    callback = length;
                }
                this.groupPage.show(key.concat([]), callback);
                this.model.setStage(this.groupPage.name);
                this.currentPage = this.groupPage;
            }
        }, {
            key: "destroy",
            /**
             * @return {undefined}
             */
            value() {
                wx.hideLoading();
                if (this.currentPage) {
                    this.currentPage.hide();
                }
                this.model.setStage("");
                /** @type {string} */
                this.shareTicket = "";
                this.model.clearShareTicket();
                this.clearShareInfoTimeout();
                this.game.resetScene();
            }
        }, {
            key: "groupPlayGame",
            /**
             * @return {undefined}
             */
            value() {
                this.modeCtrl.directPlaySingleGame();
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