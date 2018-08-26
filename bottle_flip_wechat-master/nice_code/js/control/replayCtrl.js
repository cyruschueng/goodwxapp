define("js/control/relayCtrl.js", (require, dataAndEvents, object) => {
    /**
     * @param {Object} options
     * @return {?}
     */
    function parse(options) {
        return options && options.__esModule ? options : {
            default: options
        };
    }
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
    Object.defineProperty(object, "__esModule", {
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
    const data = require("../config");
    const obj = parse(require("../lib/mue/eventcenter"));
    const c = parse(require("../pages/relay/room"));
    const Block = require("../shareApp");
    const val = parse(require("../pages/relay/gamePage"));
    const opts = parse(require("../pages/relay/fakeRoomPage"));
    const prototype = (() => {
        /**
         * @param {?} _game
         * @param {?} tileId
         * @return {undefined}
         */
        function Tile(_game, tileId) {
            promise(this, Tile);
            /** @type {string} */
            this.name = "relay";
            this.game = _game;
            this.modeCtrl = tileId;
            this.gameCtrl = this.game.gameCtrl;
            this.model = this.game.gameModel;
            this.view = this.game.gameView;
            this.netWorkCtrl = this.gameCtrl.netWorkCtrl;
            /**
             * @return {undefined}
             */
            this.onSocketOpenCb = () => {};
            /** @type {null} */
            this.socketTimeout = null;
            this.gameSocket = this.game.gameSocket;
            /** @type {null} */
            this.reconnectTimeout = null;
            /** @type {null} */
            this.currentPage = null;
            this.roomPage = new c.default(_game);
            this.gamePage = new val.default(_game);
            this.fakeRoomPage = new opts.default(_game);
            /** @type {number} */
            this.scene = 1;
            /** @type {null} */
            this.setStartRelayReportTimeOut = null;
            this.socketMonitor = this.game.socketMonitor;
        }
        return __extends(Tile, [{
            key: "init",
            /**
             * @param {Blob} prototype
             * @return {undefined}
             */
            value(prototype) {
                if (prototype && prototype.scene) {
                    switch (prototype.scene) {
                        case 1044:
                            /** @type {number} */
                            this.scene = 0;
                            break;
                        default:
                            /** @type {number} */
                            this.scene = 1;
                    }
                }
                this.addEvent();
                this.createRoomNoAddEvent(prototype);
            }
        }, {
            key: "createRoomNoAddEvent",
            /**
             * @param {?} handler
             * @return {undefined}
             */
            value(handler) {
                if (handler) {
                    this.changePage("fakeRoomPage", 0);
                } else {
                    this.changePage("fakeRoomPage", 1);
                }
                if (this.model.getSessionId()) {
                    this.afterLogin(handler, true);
                } else {
                    this.netWorkCtrl.netWorkLogin(this.afterLogin.bind(this, handler));
                }
                /** @type {boolean} */
                this.isShareCard = false;
            }
        }, {
            key: "afterLogin",
            /**
             * @param {Object} event
             * @param {?} thisValue
             * @return {?}
             */
            value(event, thisValue) {
                if (!thisValue) {
                    return this.view.showJoinRelayFail("n0"), event || obj.default.emit(data.EVENT.CREATE_RELAY_ROOM_FAIL, {
                        result: 1
                    }), void this.modeCtrl.changeMode("singleCtrl");
                }
                if (event) {
                    console.log("options12312312312", event);
                    const room_id = event.query.room_id;
                    /** @type {string} */
                    const json = decodeURIComponent(event.query.router_id);
                    const version = event.query.version;
                    console.log("optionsoptionsoptionsoptions", json);
                    if (data.VERSION != version) {
                        this.rpJoinRoom(1);
                        this.view.showVersionMismatching();
                        this.modeCtrl.changeMode("singleCtrl");
                    } else {
                        this.model.relayInfo = {
                            room_id,
                            router_id: json
                        };
                        this.joinRelayRoom();
                    }
                } else {
                    this.netWorkCtrl.createRouterId(this.afterCreateRouterId.bind(this));
                }
            }
        }, {
            key: "afterCreateRouterId",
            /**
             * @param {?} thisValue
             * @param {?} obj1
             * @return {undefined}
             */
            value(thisValue, obj1) {
                if (thisValue) {
                    this.model.relayInfo = {
                        router_id: obj1
                    };
                    this.masterCreateRoom();
                } else {
                    this.view.showJoinRelayFail(obj1);
                    obj.default.emit(data.EVENT.CREATE_RELAY_ROOM_FAIL, {
                        result: 1
                    });
                    this.modeCtrl.changeMode("singleCtrl");
                }
            }
        }, {
            key: "masterCreateRoom",
            /**
             * @return {undefined}
             */
            value() {
                this.onSocketOpenCb = this.socketCreateRoom.bind(this);
                this.connectSocket(this.masterCreateRoomFail.bind(this));
            }
        }, {
            key: "joinRelayRoom",
            /**
             * @param {(Object|boolean|number|string)} title
             * @return {undefined}
             */
            value(title) {
                const _title = title || this.joinRelayRoomFail.bind(this);
                this.onSocketOpenCb = this.socketJoinRoom.bind(this);
                this.connectSocket(_title);
            }
        }, {
            key: "joinNextRelayRoom",
            /**
             * @return {undefined}
             */
            value() {
                obj.default.emitSync(data.EVENT.RELAYMODEDESTROY, {});
                this.clearSocketTimeout();
                /** @type {number} */
                this.scene = 2;
                this.onSocketOpenCb = this.socketJoinNextRoom.bind(this);
                this.connectSocket(this.joinRelayRoomFail.bind(this));
            }
        }, {
            key: "connectSocket",
            /**
             * @param {?} application
             * @return {undefined}
             */
            value(application) {
                /** @type {number} */
                this.socketTimeout = setTimeout(application, 5E3);
                if (this.gameSocket.alive) {
                    this.onSocketOpenCb();
                } else {
                    this.gameSocket.connectSocket();
                }
            }
        }, {
            key: "onSocketOpen",
            /**
             * @return {undefined}
             */
            value() {
                this.onSocketOpenCb();
            }
        }, {
            key: "socketCreateRoom",
            /**
             * @return {undefined}
             */
            value() {
                const r20 = {
                    cmdid: 10001,
                    buff: {
                        router_id: this.model.relayInfo.router_id,
                        version: data.VERSION
                    }
                };
                this.sendRelayCmd(r20);
            }
        }, {
            key: "socketJoinRoom",
            /**
             * @return {undefined}
             */
            value() {
                const r20 = {
                    cmdid: 10002,
                    buff: {
                        room_id: this.model.relayInfo.room_id
                    }
                };
                this.sendRelayCmd(r20);
            }
        }, {
            key: "socketJoinNextRoom",
            /**
             * @return {undefined}
             */
            value() {
                const r20 = {
                    cmdid: 10011,
                    buff: {
                        room_id: this.model.relayInfo.room_id
                    }
                };
                this.sendRelayCmd(r20);
            }
        }, {
            key: "joinRoomSucc",
            /**
             * @param {?} thisValue
             * @param {?} newValue
             * @return {undefined}
             */
            value(thisValue, newValue) {
                console.log("\u52a0\u5165\u623f\u95f4\u6210\u529f joinRoomSucc");
                this.clearSocketTimeout();
                this.rpJoinRoom(0);
                this.model.relayInfo.room_seed = newValue.room_seed;
                this.model.relayInfo.my_seat_no = newValue.my_seat_no;
                this.model.relayInfo.next_room_id = newValue.next_room_id;
                /** @type {string} */
                this.model.relayInfo.room_wxa_code = "";
                this.setCheckGameInterval();
                if (0 != newValue.my_seat_no && 1 == newValue.game_status) {
                    this.rejoinRelay();
                } else {
                    this.changePage("roomPage", newValue);
                }
            }
        }, {
            key: "joinRelayRoomFail",
            /**
             * @return {undefined}
             */
            value() {
                console.log("joinRelayRoomFail");
                this.rpJoinRoom(1);
                this.view.showJoinRelayFail2();
                this.modeCtrl.changeMode("singleCtrl");
            }
        }, {
            key: "masterCreateRoomFail",
            /**
             * @return {undefined}
             */
            value() {
                console.log("masterCreateRoomFail");
                obj.default.emit(data.EVENT.CREATE_RELAY_ROOM_FAIL, {
                    result: 1
                });
                this.view.showJoinRelayFail2();
                this.modeCtrl.changeMode("singleCtrl");
            }
        }, {
            key: "createRoomSucc",
            /**
             * @param {?} thisValue
             * @param {?} data
             * @return {undefined}
             */
            value(thisValue, data) {
                console.log("createRoomSucc");
                this.clearSocketTimeout();
                this.model.relayInfo.room_id = data.room_id;
                this.model.relayInfo.room_seed = data.room_seed;
                this.model.relayInfo.my_seat_no = data.my_seat_no;
                /** @type {string} */
                this.model.relayInfo.room_wxa_code = "";
                this.model.relayInfo.next_room_id = data.next_room_id;
                this.setCheckGameInterval();
                this.changePage("roomPage", data);
            }
        }, {
            key: "sendRelayCmd",
            /**
             * @param {?} result
             * @return {undefined}
             */
            value(result) {
                const matches = result.cmdid;
                let stdout = result.buff;
                if (matches) {
                    if ("10006" != matches) {
                        console.log("\u5411\u670d\u52a1\u5668\u53d1\u9001\u6307\u4ee4\uff1a", matches, "\u6570\u636e\uff1a", stdout);
                    }
                    /** @type {string} */
                    stdout = JSON.stringify(stdout);
                    this.gameSocket.sendRelayCmd({
                        cmdid: matches,
                        buff: stdout
                    });
                }
            }
        }, {
            key: "clearSocketTimeout",
            /**
             * @return {undefined}
             */
            value() {
                clearTimeout(this.reconnectTimeout);
                clearTimeout(this.socketTimeout);
                this.clearCheckGameInterval();
                /** @type {null} */
                this.socketTimeout = null;
                /** @type {null} */
                this.reconnectTimeout = null;
            }
        }, {
            key: "changePage",
            /**
             * @param {?} methodName
             * @param {?} event
             * @return {undefined}
             */
            value(methodName, event) {
                if (this.currentPage) {
                    this.currentPage.hide();
                }
                const func = this[methodName];
                if (func) {
                    this.currentPage = func;
                    this.model.setStage(func.name);
                    this.currentPage.show(event);
                }
            }
        }, {
            key: "shareRelay",
            /**
             * @return {undefined}
             */
            value() {
                const items = this.model.relayInfo;
                const length = items.room_id;
                const count = items.router_id;
                const version = data.VERSION;
                const cb = this.afterShareRelay.bind(this);
                /** @type {boolean} */
                this.isShareCard = true;
                (0, Block.ShareRelayCard)({
                    room_id: length,
                    router_id: count,
                    version,
                    cb
                });
            }
        }, {
            key: "afterShareRelay",
            /**
             * @param {Object} type
             * @param {Object} event
             * @return {undefined}
             */
            value(type, event) {
                if (console.log("shareTicket:", event, "session_id:", this.model.getSessionId()), type && (event && this.gameSocket.alive)) {
                    const r20 = {
                        cmdid: 10014,
                        buff: {
                            room_id: this.model.relayInfo.room_id,
                            session_id: this.model.getSessionId(),
                            share_ticket: event,
                            share_query: `?${type}`
                        }
                    };
                    this.sendRelayCmd(r20);
                }
            }
        }, {
            key: "addEvent",
            /**
             * @return {undefined}
             */
            value() {
                obj.default.on(data.EVENT.RELAYCREATEROOM, this.createRoomSucc.bind(this));
                obj.default.on(data.EVENT.JOINRELAYROOM, this.joinRoomSucc.bind(this));
                obj.default.on(data.EVENT.PEOPLECOME, this.upDateRoom.bind(this));
                obj.default.on(data.EVENT.PEOPLEOUT, this.upDateRoom.bind(this));
                obj.default.on(data.EVENT.RELAYSTART, this.relayGameStart.bind(this));
                obj.default.on(data.EVENT.NOWPLAYERJUMP, this.sendPlayerJumpMsg.bind(this));
                obj.default.on(data.EVENT.CHECKUSER, this.checkUser.bind(this));
                obj.default.on(data.EVENT.REPLAYAGAIN, this.joinNextRoom.bind(this));
                obj.default.on(data.EVENT.SYNCMSGSEQ, this.syncMsgSeq.bind(this));
                obj.default.on(data.EVENT.SEND_CHECK_GAME, this.sendCheckGame.bind(this));
                obj.default.on(data.EVENT.ENDGAME, this.endGame.bind(this));
                obj.default.on(data.EVENT.CHANGEGAMELEVEL, this.sendChangeGameLevel.bind(this));
                obj.default.on(data.EVENT.RECEIVEGAMELEVELCHANGE, this.receiveGameLevelChange.bind(this));
                obj.default.on(data.EVENT.GETRELAYQR, this.getRelayQR.bind(this));
                obj.default.on(data.EVENT.GETRELAYCHECKUSERERROR, this.syncRelay.bind(this));
            }
        }, {
            key: "offEvent",
            /**
             * @return {undefined}
             */
            value() {
                obj.default.off(data.EVENT.RELAYCREATEROOM, this.createRoomSucc.bind(this));
                obj.default.off(data.EVENT.JOINRELAYROOM, this.joinRoomSucc.bind(this));
                obj.default.off(data.EVENT.PEOPLECOME, this.upDateRoom.bind(this));
                obj.default.off(data.EVENT.PEOPLEOUT, this.upDateRoom.bind(this));
                obj.default.off(data.EVENT.RELAYSTART, this.relayGameStart.bind(this));
                obj.default.off(data.EVENT.NOWPLAYERJUMP, this.sendPlayerJumpMsg.bind(this));
                obj.default.off(data.EVENT.CHECKUSER, this.checkUser.bind(this));
                obj.default.off(data.EVENT.REPLAYAGAIN, this.joinNextRoom.bind(this));
                obj.default.off(data.EVENT.SYNCMSGSEQ, this.syncMsgSeq.bind(this));
                obj.default.off(data.EVENT.SEND_CHECK_GAME, this.sendCheckGame.bind(this));
                obj.default.off(data.EVENT.ENDGAME, this.endGame.bind(this));
                obj.default.off(data.EVENT.CHANGEGAMELEVEL, this.sendChangeGameLevel.bind(this));
                obj.default.off(data.EVENT.RECEIVEGAMELEVELCHANGE, this.receiveGameLevelChange.bind(this));
                obj.default.off(data.EVENT.GETRELAYQR, this.getRelayQR.bind(this));
                obj.default.off(data.EVENT.GETRELAYCHECKUSERERROR, this.syncRelay.bind(this));
            }
        }, {
            key: "upDateRoom",
            /**
             * @param {?} thisValue
             * @param {?} event
             * @return {undefined}
             */
            value(thisValue, event) {
                console.log("\u66f4\u65b0\u623f\u95f4\u4fe1\u606f");
                if (this.currentPage == this.roomPage) {
                    this.currentPage.show(event);
                }
            }
        }, {
            key: "outRelay1",
            /**
             * @return {undefined}
             */
            value() {
                const r20 = {
                    cmdid: 10003,
                    buff: {
                        room_id: this.model.relayInfo.room_id
                    }
                };
                this.sendRelayCmd(r20);
                this.modeCtrl.changeMode("singleCtrl");
            }
        }, {
            key: "outRelay2",
            /**
             * @return {undefined}
             */
            value() {
                this.modeCtrl.changeMode("singleCtrl");
            }
        }, {
            key: "startRelay",
            /**
             * @param {?} thisValue
             * @return {undefined}
             */
            value(thisValue) {
                const r20 = {
                    cmdid: 10004,
                    buff: {
                        room_id: this.model.relayInfo.room_id,
                        game_level: thisValue
                    }
                };
                this.sendRelayCmd(r20);
                /** @type {number} */
                this.setStartRelayReportTimeOut = setTimeout(() => {
                    obj.default.emit(data.EVENT.RP_RELAY_START, {
                        result: 1
                    });
                }, 5E3);
            }
        }, {
            key: "relayGameStart",
            /**
             * @param {?} thisValue
             * @return {undefined}
             */
            value(thisValue) {
                this.changePage("gamePage");
                clearTimeout(this.setStartRelayReportTimeOut);
                obj.default.emit(data.EVENT.RP_RELAY_START, {
                    result: 0
                });
            }
        }, {
            key: "sendPlayerJumpMsg",
            /**
             * @param {?} thisValue
             * @param {?} event
             * @return {undefined}
             */
            value(thisValue, event) {
                const related = event.msginfo;
                const cur = event.jump_succ;
                const type = event.msg_seq;
                if (this.model.relayInfo.my_seat_no) {
                    const r20 = {
                        cmdid: 10009,
                        buff: {
                            room_id: this.model.relayInfo.room_id,
                            msg_info: {
                                msgid: this.model.relayInfo.room_id + Date.now(),
                                jump_succ: cur,
                                msginfo: related
                            },
                            msg_seq: type
                        }
                    };
                    this.sendRelayCmd(r20);
                }
            }
        }, {
            key: "checkUser",
            /**
             * @param {?} thisValue
             * @param {Object} a
             * @return {undefined}
             */
            value(thisValue, a) {
                const il = a.msgid;
                const al = a.msg_seq;
                const aLength = a.jump_succ;
                if (this.model.relayInfo.my_seat_no) {
                    const r20 = {
                        cmdid: 10008,
                        buff: {
                            room_id: this.model.relayInfo.room_id,
                            msg_info: {
                                msgid: il,
                                jump_succ: aLength,
                                msg_seq: al
                            }
                        }
                    };
                    this.sendRelayCmd(r20);
                }
            }
        }, {
            key: "endGame",
            /**
             * @param {?} thisValue
             * @param {Object} event
             * @return {undefined}
             */
            value(thisValue, event) {
                this.clearCheckGameInterval();
                this.gamePage.hideScore();
                obj.default.emit(data.EVENT.RP_RELAY_GAME_END, {
                    jielong_score: event.score,
                    player_num: event.playerlist.length,
                    max_audience: event.onlookerlist.length,
                    difficulty: event.game_level
                });
            }
        }, {
            key: "syncMsgSeq",
            /**
             * @param {?} newValue
             * @param {?} thisValue
             * @return {undefined}
             */
            value(newValue, thisValue) {
                const r20 = {
                    cmdid: 10007,
                    buff: {
                        room_id: this.model.relayInfo.room_id,
                        msg_seq: thisValue.msg_seq
                    }
                };
                this.sendRelayCmd(r20);
            }
        }, {
            key: "setCheckGameInterval",
            /**
             * @return {undefined}
             */
            value() {
                /** @type {number} */
                this.checkRelayInterval = setInterval(() => {
                    obj.default.emit(data.EVENT.CHECK_GAME, {});
                }, 2E3);
            }
        }, {
            key: "clearCheckGameInterval",
            /**
             * @return {undefined}
             */
            value() {
                console.log("\u6e05\u9664\u4e1a\u52a1\u5fc3\u8df3");
                clearInterval(this.checkRelayInterval);
                /** @type {null} */
                this.checkRelayInterval = null;
            }
        }, {
            key: "sendCheckGame",
            /**
             * @param {?} thisValue
             * @param {Object} data
             * @return {undefined}
             */
            value(thisValue, data) {
                if (this.model.relayInfo.my_seat_no) {
                    const r20 = {
                        cmdid: 10006,
                        buff: {
                            room_id: data.room_id,
                            seq: data.seq
                        }
                    };
                    this.sendRelayCmd(r20);
                }
            }
        }, {
            key: "joinNextRoom",
            /**
             * @param {?} thisValue
             * @return {?}
             */
            value(thisValue) {
                if (!this.model.relayInfo.next_room_id) {
                    return this.view.showJoinNextRoomFail(), void this.modeCtrl.changeMode("singleCtrl");
                }
                obj.default.emitSync(data.EVENT.RELAYMODEDESTROY, {});
                this.game.full2D.hide2D();
                this.model.relayInfo.room_id = this.model.relayInfo.next_room_id;
                /** @type {string} */
                this.model.relayInfo.room_wxa_code = "";
                this.joinNextRelayRoom();
            }
        }, {
            key: "afterGetMiniCode",
            /**
             * @param {?} newValue
             * @param {?} thisValue
             * @return {undefined}
             */
            value(newValue, thisValue) {
                console.log("getMiniCode", "RECEIVEMINICODE");
                this.upDateRoom(newValue, thisValue);
            }
        }, {
            key: "getMiniCode",
            /**
             * @return {undefined}
             */
            value() {
                const r20 = {
                    cmdid: 10010,
                    buff: {
                        room_id: this.model.relayInfo.room_id,
                        router_id: decodeURIComponent(this.model.relayInfo.router_id),
                        client_version: data.VERSION,
                        mode: "relay"
                    }
                };
                this.sendRelayCmd(r20);
            }
        }, {
            key: "watchRelay",
            /**
             * @return {undefined}
             */
            value() {
                this.rejoinRelay();
            }
        }, {
            key: "rejoinRelay",
            /**
             * @return {undefined}
             */
            value() {
                obj.default.emitSync(data.EVENT.WATCHRELAY, {});
                this.changePage("gamePage");
            }
        }, {
            key: "syncRelay",
            /**
             * @return {undefined}
             */
            value() {
                obj.default.emitSync(data.EVENT.WATCHRELAY, {});
            }
        }, {
            key: "onSocketCloseErr",
            /**
             * @return {undefined}
             */
            value() {
                if (!this.socketTimeout) {
                    this.clearSocketTimeout();
                    if (this.model.relayInfo.room_id && this.model.relayInfo.router_id) {
                        this.reconnectSocket();
                    } else {
                        this.modeCtrl.changeMode("singleCtrl");
                    }
                }
            }
        }, {
            key: "reconnectSocket",
            /**
             * @return {undefined}
             */
            value() {
                const r20 = this.reconnectSocketFail.bind(this);
                this.joinRelayRoom(r20);
            }
        }, {
            key: "reconnectSocketFail",
            /**
             * @return {undefined}
             */
            value() {
                this.gameSocket.close();
                this.clearSocketTimeout();
                clearTimeout(this.reconnectTimeout);
                /** @type {number} */
                this.reconnectTimeout = setTimeout(this.reconnectSocket.bind(this), 3E3);
            }
        }, {
            key: "progressOver",
            /**
             * @param {?} thisValue
             * @return {undefined}
             */
            value(thisValue) {
                const r20 = {
                    cmdid: 10013,
                    buff: {
                        room_id: this.model.relayInfo.room_id,
                        msg_seq: this.game.relayInstructionCtrl.msg_seq
                    }
                };
                console.log("\u544a\u8bc9\u670d\u52a1\u5668\u8fd9\u4e2a\u4eba\u8fc7\u65f6");
                this.sendRelayCmd(r20);
            }
        }, {
            key: "receiveGameLevelChange",
            /**
             * @param {?} newValue
             * @param {?} thisValue
             * @return {undefined}
             */
            value(newValue, thisValue) {
                this.upDateRoom(newValue, thisValue);
            }
        }, {
            key: "sendChangeGameLevel",
            /**
             * @param {?} newValue
             * @param {?} thisValue
             * @return {undefined}
             */
            value(newValue, thisValue) {
                const r20 = {
                    cmdid: 10012,
                    buff: {
                        room_id: this.model.relayInfo.room_id,
                        game_level: thisValue
                    }
                };
                console.log("\u544a\u8bc9\u670d\u52a1\u5668\u623f\u95f4\u7684\u96be\u5ea6\u6539\u53d8");
                this.sendRelayCmd(r20);
            }
        }, {
            key: "rpJoinRoom",
            /**
             * @param {Object} resp
             * @return {undefined}
             */
            value(resp) {
                if (2 == this.scene) {
                    obj.default.emit(data.EVENT.RP_JOIN_RELAY_ROOM_AGAIN, {
                        res: resp
                    });
                } else {
                    obj.default.emit(data.EVENT.RP_JOIN_RELAY_ROOM, {
                        scene: this.scene,
                        result: resp
                    });
                }
            }
        }, {
            key: "getRelayQR",
            /**
             * @return {undefined}
             */
            value() {
                if (this.model.relayInfo.room_wxa_code) {
                    obj.default.emitSync(data.EVENT.RECEIVEMINICODE, {
                        room_wxa_code: this.model.relayInfo.room_wxa_code
                    });
                } else {
                    this.getMiniCode();
                }
            }
        }, {
            key: "checkCmd",
            /**
             * @return {?}
             */
            value() {
                const codeSegments = this.game.relayInstructionCtrl.cmdList;
                /** @type {boolean} */
                let t = false;
                return codeSegments.length && (codeSegments[codeSegments.length - 1].buff.game_status > 0 && (t = true)), t;
            }
        }, {
            key: "wxOnShow",
            /**
             * @return {undefined}
             */
            value() {
                if (this.isShareCard) {
                    if (this.checkCmd()) {
                        this.onSocketCloseErr();
                    } else {
                        this.game.relayInstructionCtrl.run();
                    }
                } else {
                    this.game.relayInstructionCtrl.handleOnShow();
                    this.onSocketCloseErr();
                }
                this.socketMonitor.log("|os|");
                /** @type {boolean} */
                this.isShareCard = false;
            }
        }, {
            key: "wxOnhide",
            /**
             * @return {undefined}
             */
            value() {
                if (this.isShareCard) {
                    this.game.relayInstructionCtrl.stop();
                } else {
                    this.clearSocketTimeout();
                    this.gameSocket.close();
                    this.game.relayInstructionCtrl.handleOnhide();
                }
                this.socketMonitor.log("|oh|");
            }
        }, {
            key: "gotoRelayMode",
            /**
             * @return {undefined}
             */
            value() {
                obj.default.emitSync(data.EVENT.RELAYMODEDESTROY, {});
                this.game.full2D.hide2D();
                this.clearSocketTimeout();
                /** @type {number} */
                this.scene = 1;
                this.model.relayInfo = {};
                /**
                 * @return {undefined}
                 */
                this.onSocketOpenCb = () => {};
                this.game.relayInstructionCtrl.destroy();
                this.createRoomNoAddEvent();
            }
        }, {
            key: "destroy",
            /**
             * @return {undefined}
             */
            value() {
                this.clearSocketTimeout();
                this.gameSocket.close();
                this.model.relayInfo = {};
                /**
                 * @return {undefined}
                 */
                this.onSocketOpenCb = () => {};
                this.offEvent();
                this.game.full2D.hide2D();
                wx.hideLoading();
                this.game.relayInstructionCtrl.destroy();
                this.game.resetScene();
                obj.default.emitSync(data.EVENT.RELAYMODEDESTROY, {});
            }
        }]), Tile;
    })();
    object.default = prototype;
});