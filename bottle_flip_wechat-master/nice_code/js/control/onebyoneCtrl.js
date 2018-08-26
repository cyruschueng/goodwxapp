define("js/control/onebyoneCtrl.js", (require, dataAndEvents, object) => {
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
         * @param {Function} object
         * @param {?} property
         * @return {undefined}
         */
        function defineProperty(object, property) {
            /** @type {number} */
            let i = 0;
            for (; i < property.length; i++) {
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
    const obj = getOptions(require("../lib/mue/eventcenter"));
    const opts = getOptions(require("../pages/headimgAnimation"));
    const ecConfig = require("../config");
    const Block = require("../lib/animation");
    const prototype = (() => {
        /**
         * @param {Object} theGame
         * @param {Object} camera
         * @return {undefined}
         */
        function init(theGame, camera) {
            animate(this, init);
            /** @type {Object} */
            this.game = theGame;
            /** @type {Object} */
            this.camera = camera;
            /** @type {Array} */
            this.waitingList = [];
            /** @type {boolean} */
            this.playerOver = true;
            this.bindEvent();
            /** @type {Array} */
            this.touchendList = [];
            /** @type {Array} */
            this.speedTouchEndList = [];
        }
        return make(init, [{
            key: "isDied",
            /**
             * @return {?}
             */
            value() {
                if (this.data) {
                    /** @type {number} */
                    let i = 0;
                    const valuesLen = this.data.playerlist.length;
                    for (; i < valuesLen; ++i) {
                        if (this.data.playerlist[i].seat_no == this.data.my_seat_no) {
                            return this.data.playerlist[i].rank > 0;
                        }
                    }
                }
            }
        }, {
            key: "bindEvent",
            /**
             * @return {undefined}
             */
            value() {
                const self = this;
                obj.default.on(ecConfig.EVENT.RELAYSTART, (dataAndEvents, event) => {
                    self.game.resetScene(event.room_seed, {
                        bottleShowupAnimation: true,
                        gameLevel: event.game_level
                    });
                    console.log("resetScene", event.room_seed, {
                        gameLevel: event.game_level
                    });
                    /** @type {boolean} */
                    self.data = event;
                    /** @type {boolean} */
                    self.game.myTurn = event.my_seat_no == event.now_player_seat_no;
                    if (self.game.myTurn) {
                        /** @type {boolean} */
                        self.playerOver = false;
                    }
                    console.log(" EVENT.RELAYSTART this.game.myTurn", self.game.myTurn, event.my_seat_no, event.now_player_seat_no);
                });
                obj.default.on(ecConfig.EVENT.ENDGAME, (dataAndEvents, deepDataAndEvents) => {
                    console.log("ENDGAME touchList", self.touchendList.length, self.speedTouchEndList.length);
                    /** @type {boolean} */
                    self.over = true;
                });
                obj.default.on(ecConfig.EVENT.RELAYCHECKUSER, (dataAndEvents, msg) => {
                    if (msg.my_seat_no != msg.now_player_seat_no) {
                        console.log("in relayCheckUser");
                        /** @type {*} */
                        msg.msg_info.msginfo = JSON.parse(msg.msg_info.msginfo);
                        console.log("xxxx RELAYCHECKUSER", msg.my_seat_no, msg.now_player_seat_no, msg.msg_info.msg_seq, msg.msg_info.msg_id);
                        if (!self.playerOver || self.waitingList.length > 0) {
                            /** @type {string} */
                            msg.myType = "checkuser";
                            console.log("push checkuser to waitingList");
                            self.waitingList.push(msg);
                        } else {
                            self._play(msg);
                        }
                    } else {
                        /** @type {boolean} */
                        self.nowPlayerJump = false;
                    }
                });
                obj.default.on(ecConfig.EVENT.RUNGAME, (dataAndEvents, data) => {
                    if (console.log("ddddddddddd RUNGAME", data.my_seat_no, data.now_player_seat_no, self.playerOver), self.nowPlayerJump) {
                        return console.log("RUNGAME check user EORROR", data.my_seat_no, data.now_player_seat_no, self.playerOver), void obj.default.emitSync(ecConfig.EVENT.GETRELAYCHECKUSERERROR);
                    }
                    if (self.playerOver && self.waitingList.length <= 0) {
                        /** @type {boolean} */
                        self.game.myTurn = data.my_seat_no == data.now_player_seat_no;
                        /** @type {boolean} */
                        self.game.clicked = false;
                        /** @type {boolean} */
                        self.data = data;
                        if (self.game.myTurn) {
                            /** @type {boolean} */
                            self.playerOver = false;
                        }
                        obj.default.emit(ecConfig.EVENT.ORDERRUNGAME, data);
                    } else {
                        /** @type {string} */
                        data.myType = "rungame";
                        console.log("push rungame to waitingList");
                        self.waitingList.push(data);
                    }
                    console.log("\u56de\u5408\u63a8\u8fdbEVENT.RUNGAME\uff0c\u662f\u5426\u8f6e\u5230\u6211:", self.game.myTurn, "\u6211\u7684\u5ea7\u4f4d\u53f7\uff1a", data.my_seat_no, "\u5f53\u524d\u73a9\u7684\u4eba\u5ea7\u4f4d\u53f7", data.now_player_seat_no);
                });
                obj.default.on(ecConfig.EVENT.NOWPLAYEROVER, (dataAndEvents, event) => {
                    if (self.playerOver = true, console.log("in NOWPLAYEROVER data", event), 1 != event.hit && (7 != event.hit && (2 != event.hit && (!self.over && (self.data && (0 != self.data.my_seat_no && (event.fromProgressOver && !self.game.myTurn || obj.default.emitSync(ecConfig.EVENT.PLAYERDIED, {
                            player_rank: self.data.playerlist.length - self.data.failer_count,
                            player_count: self.data.playerlist.length,
                            my_seat_no: self.data.my_seat_no,
                            playerlist: self.data.playerlist,
                            now_player_seat_no: self.data.now_player_seat_no
                        }))))))), 0 !== event.hit && (3 !== event.hit && (4 !== event.hit && (5 !== event.hit && 6 !== event.hit))) || (self.waitingList.length > 0 ? self.game.relayBottleReset({
                            noAnimation: true
                        }) : self.game.relayBottleReset()), self.game.myTurn || (self.over || (0 == event.my_seat_no || (event.fromProgressOver || (self.isDied() || (!self.data || obj.default.emitSync(ecConfig.EVENT.CHECKUSER, {
                            jump_succ: 1 == event.hit || (7 == event.hit || 2 == event.hit) ? 1 : 0,
                            msgid: self.data.msg_info.msgid,
                            msg_seq: self.data.msg_info.msg_seq
                        })))))), self.waitingList.length > 1) {
                        Block.TweenAnimation.killAll();
                        self.game.camera.position.x = self.game.camera.destination[0] || self.game.camera.position.x;
                        self.game.camera.position.z = self.game.camera.destination[1] || self.game.camera.position.z;
                        /** @type {Array} */
                        self.game.camera.destination = [null, null];
                        self.game.bottle.obj.position.x = self.game.bottle.destination[0] || self.game.bottle.obj.position.x;
                        self.game.bottle.obj.position.z = self.game.bottle.destination[1] || self.game.bottle.obj.position.z;
                        for (; self.waitingList.length > 0;) {
                            if ("checkuser" == (filtered = self.waitingList.shift()).myType) {
                                self.speedUpPlay(filtered, {
                                    fromWaitingList: true
                                });
                            } else {
                                if ("rungame" == filtered.myType) {
                                    if (!(data = filtered)) {
                                        continue;
                                    }
                                    /** @type {boolean} */
                                    self.game.myTurn = data.my_seat_no == data.now_player_seat_no;
                                    /** @type {boolean} */
                                    self.game.clicked = false;
                                    self.data = data;
                                    if (self.game.myTurn) {
                                        /** @type {boolean} */
                                        self.playerOver = false;
                                    }
                                    obj.default.emitSync(ecConfig.EVENT.ORDERRUNGAME, data);
                                }
                            }
                        }
                    } else {
                        if (1 == self.waitingList.length) {
                            var filtered = self.waitingList.shift();
                            if ("checkuser" == filtered.myType) {
                                self._play(filtered);
                            } else {
                                if ("rungame" == filtered.myType) {
                                    var data = filtered;
                                    if (!data) {
                                        return;
                                    }
                                    /** @type {boolean} */
                                    self.game.myTurn = data.my_seat_no == data.now_player_seat_no;
                                    /** @type {boolean} */
                                    self.game.clicked = false;
                                    self.data = data;
                                    if (self.game.myTurn) {
                                        /** @type {boolean} */
                                        self.playerOver = false;
                                    }
                                    obj.default.emitSync(ecConfig.EVENT.ORDERRUNGAME, data);
                                }
                            }
                        }
                    }
                });
                obj.default.on(ecConfig.EVENT.NOWPLAYERJUMP, () => {
                    /** @type {boolean} */
                    self.nowPlayerJump = true;
                });
                obj.default.on(ecConfig.EVENT.SYNCSCENE, (dataAndEvents, context) => {
                    if (console.log("SYNCSCENE"), context && context.serverData) {
                        self.destroy();
                        /** @type {boolean} */
                        const isObserver = 0 == context.serverData.my_seat_no;
                        if (self.game.isObserver = isObserver, console.log("syncsene", context.now_msg_seq), console.log("zset", context.serverData.room_seed, context.serverData.game_level), self.game.resetScene(context.serverData.room_seed, {
                                gameLevel: context.serverData.game_level
                            }), context.serverData.msg_list && context.serverData.msg_list.msg_list) {
                            /** @type {number} */
                            let i = 0;
                            const valuesLen = context.serverData.msg_list.msg_list.length;
                            for (; i < valuesLen; ++i) {
                                /** @type {*} */
                                context.serverData.msg_list.msg_list[i].msginfo = JSON.parse(context.serverData.msg_list.msg_list[i].msginfo);
                                self.speedUpPlay(context.serverData.msg_list.msg_list[i]);
                            }
                        }
                    }
                });
                obj.default.on(ecConfig.EVENT.SHOW_RELAY_GUIDE, (dataAndEvents, deepDataAndEvents) => {
                    console.log("SHOW_RELAY_GUIDE");
                    /** @type {Array} */
                    const cacheKey = [{
                        headimg: "res/2d/dog1.jpg",
                        seat_no: 1
                    }, {
                        headimg: "res/2d/dog2.jpg",
                        seat_no: 2
                    }, {
                        headimg: "res/2d/dog3.jpg",
                        seat_no: 3
                    }, {
                        headimg: "res/2d/dog4.jpg",
                        seat_no: 4
                    }, {
                        headimg: "res/2d/dog5.jpg",
                        seat_no: 5
                    }];
                    self.headimgAnimation = new opts.default;
                    self.headimgAnimation.set(cacheKey, {
                        noEmit: true
                    });
                    /** @type {number} */
                    self.headimgAnimation.obj.position.x = -8.8;
                    /** @type {number} */
                    self.headimgAnimation.obj.position.y = 20;
                    self.camera.add(self.headimgAnimation.obj);
                    /** @type {number} */
                    self.headimgTimer = setInterval(() => {
                        self.headimgAnimation.next();
                    }, 4E3);
                    self.game.resetScene();
                    setTimeout(() => {
                        self.game.loopAnimate();
                    }, 3500);
                });
                obj.default.on(ecConfig.EVENT.RELAYMODEDESTROY, () => {
                    self.destroy();
                });
                obj.default.on(ecConfig.EVENT.SKIP_RELAY_GUIDE, () => {
                    self.game.resetScene();
                    if (self.headimgTimer) {
                        clearInterval(self.headimgTimer);
                        /** @type {null} */
                        self.headimgTimer = null;
                    }
                    self.camera.remove(self.headimgAnimation.obj);
                });
                obj.default.on(ecConfig.EVENT.PROGRESSOVER, () => {
                    if ("jump" != self.game.bottle.status) {
                        if (self.game.myTurn) {
                            /** @type {boolean} */
                            self.game.clicked = true;
                            self.game.handleInterrupt();
                        }
                        obj.default.emitSync(ecConfig.EVENT.NOWPLAYEROVER, {
                            fromProgressOver: true
                        });
                    }
                });
            }
        }, {
            key: "speedUpPlay",
            /**
             * @param {boolean} data
             * @param {?} newValue
             * @return {undefined}
             */
            value(data, newValue) {
                if (!this.over) {
                    /** @type {boolean} */
                    this.data = data;
                    let msg;
                    let time;
                    if (newValue && newValue.fromWaitingList) {
                        console.log("from waitingList", data, data.msg_info.msginfo.initY, data.msg_info.msginfo.duration);
                        msg = data.msg_info.msginfo.initY;
                        time = data.msg_info.msginfo.duration;
                    } else {
                        msg = data.msginfo.initY;
                        time = data.msginfo.duration;
                    }
                    this.speedTouchEndList.push([time, msg]);
                    const x = this.game.touchEndAnim(time, msg, null, null, {
                        noAnimation: true
                    });
                    if (1 == x || 7 == x) {
                        this.game.succeed({
                            noAnimation: true
                        });
                        if (1 === x) {
                            ++this.game.doubleHit;
                            this.game.UI.addScore(1, true, false);
                        } else {
                            /** @type {number} */
                            this.game.doubleHit = 0;
                            this.game.UI.addScore(1, false, false);
                        }
                    } else {
                        if (2 == x) {
                            this.game.bottle.obj.position.x = this.game.bottle.destination[0];
                            this.game.bottle.obj.position.z = this.game.bottle.destination[1];
                        } else {
                            this.game.relayBottleReset({
                                noAnimation: true
                            });
                        }
                    }
                }
            }
        }, {
            key: "_play",
            /**
             * @param {boolean} err
             * @param {?} cell
             * @return {undefined}
             */
            value(err, cell) {
                const options = this;
                if (this.over) {
                    console.log("\u7591\u95ee\u64ad\u653e\u5e27\uff1a", err, err.msg_seq);
                } else {
                    console.log("\u786e\u8ba4\u64ad\u653e\u5e27\uff1a", err, err.msg_seq);
                    /** @type {boolean} */
                    this.data = err;
                    /** @type {boolean} */
                    this.playerOver = false;
                    const model = err.msg_info.msginfo.initY;
                    const speed = err.msg_info.msginfo.duration;
                    this.game.touchStartAnim(cell);
                    /** @type {number} */
                    this.jumpTimer = setTimeout(() => {
                        options.touchendList.push([speed, model]);
                        options.hit = options.game.touchEndAnim(speed, model, null, null);
                    }, 1E3 * speed);
                }
            }
        }, {
            key: "destroy",
            /**
             * @return {undefined}
             */
            value() {
                /** @type {Array} */
                this.touchendList = [];
                /** @type {Array} */
                this.speedTouchEndList = [];
                console.log("destroy relay");
                /** @type {boolean} */
                this.over = false;
                /** @type {null} */
                this.data = null;
                /** @type {Array} */
                this.waitingList = [];
                /** @type {boolean} */
                this.nowPlayerJump = false;
                /** @type {boolean} */
                this.playerOver = true;
                /** @type {boolean} */
                this.game.clicked = false;
                /** @type {boolean} */
                this.game.isObserver = false;
                if (this.jumpTimer) {
                    clearTimeout(this.jumpTimer);
                    /** @type {null} */
                    this.jumpTimer = null;
                }
                if (this.deadTimer) {
                    clearTimeout(this.deadTimer);
                    /** @type {null} */
                    this.deadTimer = null;
                }
                if (this.headimgTimer) {
                    clearInterval(this.headimgTimer);
                    /** @type {null} */
                    this.headimgTimer = null;
                }
                if (this.headimgAnimation) {
                    this.camera.remove(this.headimgAnimation.obj);
                }
            }
        }]), init;
    })();
    object.default = prototype;
});