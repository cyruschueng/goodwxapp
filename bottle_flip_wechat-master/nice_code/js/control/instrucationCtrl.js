define("js/control/instructionCtrl.js", (dataAndEvents, deepDataAndEvents, obj) => {
    /**
     * @param {?} obj
     * @param {Function} type
     * @return {undefined}
     */
    function promise(obj, type) {
        if (!(obj instanceof type)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    Object.defineProperty(obj, "__esModule", {
        value: true
    });
    const __extends = (() => {
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
    const value = (() => {
        /**
         * @param {?} _game
         * @return {undefined}
         */
        function Input(_game) {
            promise(this, Input);
            this.game = _game;
            /** @type {Array} */
            this.commandList = [];
            /** @type {boolean} */
            this.isRunning = false;
            /** @type {null} */
            this.icTimeout = null;
            /**
             * @return {undefined}
             */
            this.cmdHandler = () => {};
            /** @type {number} */
            this.gameId = 0;
            /** @type {number} */
            this.seq = 0;
            /** @type {null} */
            this.currentSeq = null;
            /** @type {boolean} */
            this.waited = false;
        }
        return __extends(Input, [{
            key: "onReceiveCommand",
            /**
             * @param {?} doc
             * @param {number} id
             * @return {undefined}
             */
            value(doc, id) {
                /** @type {number} */
                doc._seq = id;
                if (this.gameId != this.game.gameCtrl.modeCtrl.observeCtrl.gameId) {
                    this.gameId = this.game.gameCtrl.modeCtrl.observeCtrl.gameId;
                    /** @type {number} */
                    this.seq = id - 1;
                }
                /** @type {number} */
                const idx = id - this.seq;
                if (1 != idx) {
                    let animation2;
                    if (idx > 1) {
                        /** @type {number} */
                        animation2 = 0;
                    }
                    if (idx < 1) {
                        /** @type {number} */
                        animation2 = 1;
                    }
                    this.game.sendServerError(animation2);
                    /** @type {boolean} */
                    this.game.socketFirstSync = true;
                }
                /** @type {number} */
                this.seq = id;
                if (!this.currentSeq || id > this.currentSeq) {
                    this.commandList.push(doc);
                    this.commandList.sort((a, b) => a._seq - b._seq);
                    this.checkRunningState();
                }
            }
        }, {
            key: "checkRunningState",
            /**
             * @return {undefined}
             */
            value() {
                if (!this.isRunning) {
                    this.runCommand();
                }
            }
        }, {
            key: "runCommand",
            /**
             * @return {?}
             */
            value() {
                const self = this;
                const audioObject = this.commandList[0];
                if (audioObject) {
                    if (this.isRunning = true, !this.currentSeq || this.currentSeq && audioObject._seq - this.currentSeq == 1) {
                        /** @type {boolean} */
                        this.waited = false;
                        this.currentSeq = audioObject._seq;
                        this.commandList.shift();
                        this.cmdHandler(audioObject);
                    } else {
                        if (audioObject._seq - this.currentSeq > 1) {
                            if (this.waited) {
                                return this.waited = false, this.currentSeq = audioObject._seq, this.commandList.shift(), void this.cmdHandler(audioObject);
                            }
                            /** @type {boolean} */
                            this.waited = true;
                            /** @type {number} */
                            this.timer = setTimeout(() => {
                                self.runCommand();
                            }, 100);
                        }
                    }
                }
            }
        }, {
            key: "bindCmdHandler",
            /**
             * @param {(RegExp|string)} thisValue
             * @return {undefined}
             */
            value(thisValue) {
                /** @type {(RegExp|string)} */
                this.cmdHandler = thisValue;
            }
        }, {
            key: "onCmdComplete",
            /**
             * @return {undefined}
             */
            value() {
                if (this.commandList.length) {
                    this.runCommand();
                } else {
                    /** @type {boolean} */
                    this.isRunning = false;
                }
            }
        }, {
            key: "destroy",
            /**
             * @return {undefined}
             */
            value() {
                if (this.timer) {
                    clearTimeout(this.timer);
                    /** @type {null} */
                    this.timer = null;
                }
                /** @type {Array} */
                this.commandList = [];
                /** @type {number} */
                this.gameId = 0;
                /** @type {number} */
                this.seq = 0;
                /** @type {null} */
                this.currentSeq = null;
                /** @type {boolean} */
                this.waited = false;
                if (this.icTimeout) {
                    clearTimeout(this.icTimeout);
                }
                /** @type {null} */
                this.icTimeout = null;
                /** @type {boolean} */
                this.isRunning = false;
            }
        }]), Input;
    })();
    obj.default = value;
});