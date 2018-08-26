define("js/control/playerCtrl.js", (require, dataAndEvents, object) => {
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
     * @param {?} bind
     * @param {Function} thisp
     * @return {undefined}
     */
    function forEach(bind, thisp) {
        if (!(bind instanceof thisp)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    /**
     * @param {string} dataAndEvents
     * @param {?} deepDataAndEvents
     * @return {?}
     */
    function clone(dataAndEvents, deepDataAndEvents) {
        if (!dataAndEvents) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return !deepDataAndEvents || "object" != typeof deepDataAndEvents && "function" != typeof deepDataAndEvents ? dataAndEvents : deepDataAndEvents;
    }
    /**
     * @param {Object} file
     * @param {Object} extend
     * @return {undefined}
     */
    function create(file, extend) {
        if ("function" != typeof extend && null !== extend) {
            throw new TypeError(`Super expression must either be null or a function, not ${typeof extend}`);
        }
        /** @type {Object} */
        file.prototype = Object.create(extend && extend.prototype, {
            constructor: {
                value: file,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (extend) {
            if (Object.setPrototypeOf) {
                Object.setPrototypeOf(file, extend);
            } else {
                /** @type {Object} */
                file.__proto__ = extend;
            }
        }
    }
    Object.defineProperty(object, "__esModule", {
        value: true
    });
    const forceFunction = (() => {
        /**
         * @param {Function} object
         * @param {Array} d
         * @return {undefined}
         */
        function defineProperty(object, d) {
            /** @type {number} */
            let i = 0;
            for (; i < d.length; i++) {
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
    /**
     * @param {Object} obj
     * @param {string} prop
     * @param {?} elems
     * @return {?}
     */
    const modifier = function get(obj, prop, elems) {
        if (null === obj) {
            obj = Function.prototype;
        }
        /** @type {(ObjectPropertyDescriptor|undefined)} */
        const desc = Object.getOwnPropertyDescriptor(obj, prop);
        if (void 0 === desc) {
            /** @type {(Object|null)} */
            const keys = Object.getPrototypeOf(obj);
            return null === keys ? void 0 : get(keys, prop, elems);
        }
        if ("value" in desc) {
            return desc.value;
        }
        /** @type {(function (): ?|undefined)} */
        const fn = desc.get;
        if (void 0 !== fn) {
            return fn.call(elems);
        }
    };
    const obj = getOptions(require("./singleCtrl"));
    const Block = require("../shareApp");
    const opts = getOptions(require("../pages/player/playerGamePage"));
    const opt = getOptions(require("../network/network"));
    const prototype = (dataAndEvents => {
        /**
         * @param {?} n
         * @param {?} wrapper
         * @return {?}
         */
        function f(n, wrapper) {
            forEach(this, f);
            const self = clone(this, (f.__proto__ || Object.getPrototypeOf(f)).call(this, n, wrapper));
            return self.name = "player", self.currentPage = null, self.gamePage = new opts.default(n), self;
        }
        return create(f, obj.default), forceFunction(f, [{
            key: "init",
            /**
             * @return {undefined}
             */
            value() {
                switch (this.model.stage) {
                    case "game":
                        this.currentPage = this.gamePage;
                        this.currentPage.show();
                        break;
                    case "singleSettlementPgae":
                        this.currentPage = this.gameOverPage;
                        break;
                    default:
                        this.model.setStage(this.gamePage.name);
                        this.currentPage = this.gamePage;
                        this.currentPage.show();
                }
            }
        }, {
            key: "showGameOverPage",
            /**
             * @param {?} newVal
             * @return {undefined}
             */
            value(newVal) {
                this.game.seq++;
                this.gameSocket.sendCommand(this.game.seq, {
                    type: -1,
                    s: this.game.currentScore
                });
                modifier(f.prototype.__proto__ || Object.getPrototypeOf(f.prototype), "showGameOverPage", this).call(this, newVal);
            }
        }, {
            key: "shareObservCard",
            /**
             * @return {undefined}
             */
            value() {
                this.shareObservCardA();
            }
        }, {
            key: "shareObservCardA",
            /**
             * @return {undefined}
             */
            value() {
                this.shareObservCardB();
            }
        }, {
            key: "shareObservCardB",
            /**
             * @return {undefined}
             */
            value() {
                const self = this;
                this.model.setStage("loading");
                (0, Block.shareObserve)((dataAndEvents, deepDataAndEvents) => {
                    if (dataAndEvents) {
                        self.gameCtrl.afterShareObserveCard(deepDataAndEvents);
                    }
                    setTimeout(() => {
                        if ("loading" == self.model.stage) {
                            self.model.setStage("game");
                        }
                    }, 50);
                });
            }
        }, {
            key: "gameOverClickReplay",
            /**
             * @return {undefined}
             */
            value() {
                modifier(f.prototype.__proto__ || Object.getPrototypeOf(f.prototype), "gameOverClickReplay", this).call(this);
                this.game.seq++;
                this.gameSocket.sendCommand(this.game.seq, {
                    type: 0,
                    seed: this.game.randomSeed
                });
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
                if (this.gameSocket.alive) {
                    this.gameSocket.close();
                }
                this.model.clearGameId();
                this.model.clearGameTicket();
                this.game.viewer.reset();
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
            key: "wxOnhide",
            /**
             * @return {undefined}
             */
            value() {
                const modeCtrl = this;
                if ("loading" != this.model.stage) {
                    if ("singleSettlementPgae" != this.model.stage) {
                        if ("friendRankList" != this.model.stage) {
                            opt.default.quitGame();
                            this.gameSocket.cleanHeartBeat();
                            this.gameSocket.close();
                            setTimeout(() => {
                                modeCtrl.modeCtrl.changeMode("singleCtrl");
                            }, 100);
                        }
                    }
                }
            }
        }, {
            key: "wxOnshow",
            /**
             * @return {undefined}
             */
            value() {}
        }]), f;
    })();
    object.default = prototype;
});