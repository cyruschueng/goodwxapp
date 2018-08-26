define("js/control/relayInstructionCtrl.js", ($sanitize, dataAndEvents, object) => {
  /**
   * @param {Object} id
   * @return {?}
   */
  function getElementById(id) {
    return id && id.__esModule ? id : {
      default : id
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
    value : true
  });
  const waitForAsyncTasks = (() => {
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
  const obj = getElementById($sanitize("../lib/mue/eventcenter"));
  const EXPRESS_INSTALL_ID = $sanitize("../config");
  const opts = (getElementById(EXPRESS_INSTALL_ID), getElementById($sanitize("../network/network")));
  const prototype = (() => {
    /**
     * @param {?} options
     * @return {undefined}
     */
    function setup(options) {
      const change = this;
      clone(this, setup);
      this.game = options;
      /** @type {number} */
      this.runningSeq = 0;
      /** @type {Array} */
      this.cmdList = [];
      /** @type {number} */
      this.seq = 0;
      this.model = options.gameModel;
      this.monitor = this.game.socketMonitor;
      obj.default.on(EXPRESS_INSTALL_ID.EVENT.WATCHRELAY, () => {
        change.sync();
      });
      obj.default.on(EXPRESS_INSTALL_ID.EVENT.CHECK_GAME, () => {
        obj.default.emit(EXPRESS_INSTALL_ID.EVENT.SEND_CHECK_GAME, {
          room_id : change.model.relayInfo.room_id || "",
          seq : change.seq
        });
      });
    }
    return waitForAsyncTasks(setup, [{
      key : "cmdCome",
      /**
       * @param {Object} obj
       * @return {?}
       */
      value(obj) {
        if (0 == obj.ret) {
          /** @type {*} */
          const e = JSON.parse(obj.data);
          if (0 == e.error_code) {
            if (!e.buff) {
              return;
            }
            if (e.buff = JSON.parse(e.buff), 10006 != e.cmdid && console.log("\u6536\u5230\u5e27\uff0ccmdid\uff1a", e.cmdid, `\u5e27\u623f\u53f7:${e.buff.room_id}\u672c\u673a\u623f\u53f7${this.model.relayInfo.room_id}${e.buff.room_id == this.model.relayInfo.room_id ? "\u5339\u914d" : "\u4e0d\u5339\u914d"}`, "\u6570\u636e\uff1a", e), 10009 == e.cmdid || (10008 == e.cmdid || (10006 == e.cmdid || (10004 == e.cmdid || (10012 == e.cmdid || (10013 == e.cmdid || 10014 == e.cmdid)))))) {
              return;
            }
            if (10001 != e.cmdid) {
              if (e.buff.room_id != this.model.relayInfo.room_id) {
                return void console.log("\u623f\u95f4\u53f7\u4e0d\u5339\u914d\u4e22\u5f03\u5e27\uff0ccmdid\uff1a", e.cmdid, "\u6570\u636e:");
              }
              if (10007 == e.cmdid) {
                return void this.parseCmd(e);
              }
              if (!(10002 != e.cmdid && 10011 != e.cmdid)) {
                /** @type {Array} */
                this.cmdList = [];
                /** @type {boolean} */
                this.canRunningCmd = true;
              }
            } else {
              /** @type {Array} */
              this.cmdList = [];
              /** @type {boolean} */
              this.canRunningCmd = true;
            }
            this.cmdList.push(e);
            this.runCmd();
          } else {
            /** @type {string} */
            const message = String(e.error_code);
            if ("-1019" == message) {
              this.handleSyncWrong();
              opts.default.sendServerError(3);
            } else {
              if ("-1015" != message) {
                if (message < 0) {
                  this.debug(message, `${e.error_msg}cmd${obj.cmd}`, e);
                }
              }
            }
          }
        } else {
          this.debug(`ret:${obj.ret}`, `cmd:${obj.cmd}`);
          if ("-1" == String(obj.ret)) {
            opts.default.sendServerError(4);
          }
        }
      }
    }, {
      key : "runCmd",
      /**
       * @return {?}
       */
      value() {
        if (this.cmdList.length && this.canRunningCmd) {
          this.cmdList.sort((rec, tail) => rec.ts - tail.ts);
          const result = this.cmdList.shift();
          const id = result.cmdid;
          if (10001 == id || (10002 == id || (10010 == id || 10011 == id))) {
            return 10010 != id && (this.seq = result.buff.seq, this.msg_seq = -1), this.parseCmd(result), void this.runCmd();
          }
          if (result.buff.seq > this.seq) {
            /** @type {number} */
            const msg_seq = result.buff.msg_seq - this.msg_seq;
            if (0 == msg_seq || 1 == msg_seq && "20006" == result.cmdid) {
              return this.parseCmd(result), this.seq = result.buff.seq, this.msg_seq = result.buff.msg_seq, void this.runCmd();
            }
            console.log("\u4e22\u5e27\u4e86");
            this.sync();
          } else {
            console.log("\u56e0\u4e3aseq\u4e0d\u5927\u4e8e\u76ee\u524dseq\u629b\u5f03\u5e27\uff1a", result);
            this.runCmd();
          }
        }
      }
    }, {
      key : "sync",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {boolean} */
        this.canRunningCmd = false;
        /** @type {Array} */
        this.cmdList = [];
        obj.default.emitSync(EXPRESS_INSTALL_ID.EVENT.SYNCMSGSEQ, {
          msg_seq : this.msg_seq
        });
        this.clearSyncTimeOut();
        this.setSyncTimeOut();
      }
    }, {
      key : "setSyncTimeOut",
      /**
       * @return {undefined}
       */
      value() {
        if (!this.syncTimeOutArr) {
          /** @type {Array} */
          this.syncTimeOutArr = [];
        }
        this.syncTimeOutArr.push(setTimeout(this.sync.bind(this), 5E3));
      }
    }, {
      key : "clearSyncTimeOut",
      /**
       * @return {undefined}
       */
      value() {
        if (Array.isArray(this.syncTimeOutArr)) {
          for (;this.syncTimeOutArr.length;) {
            const to = this.syncTimeOutArr.pop();
            clearTimeout(to);
          }
        }
      }
    }, {
      key : "receiveSyncCmd",
      /**
       * @param {?} result
       * @return {?}
       */
      value(result) {
        if (this.clearSyncTimeOut(), 2 == result.buff.game_status) {
          return obj.default.emitSync(EXPRESS_INSTALL_ID.EVENT.ENDGAME, result.buff), void(this.cmdList = []);
        }
        obj.default.emitSync(EXPRESS_INSTALL_ID.EVENT.SYNCSCENE, {
          now_msg_seq : this.msg_seq,
          serverData : result.buff
        });
        this.msg_seq = result.buff.msg_seq;
        this.seq = result.buff.seq;
        /** @type {boolean} */
        this.canRunningCmd = true;
        this.runCmd();
      }
    }, {
      key : "parseCmd",
      /**
       * @param {?} result
       * @return {undefined}
       */
      value(result) {
        switch(result.cmdid) {
          case 10001:
            console.log(10001, "\u521b\u5efa\u623f\u95f4", result.buff);
            this.monitor.log(`|10001;${result.buff.room_id};${result.buff.seq};${result.buff.msg_seq}`);
            obj.default.emitSync(EXPRESS_INSTALL_ID.EVENT.RELAYCREATEROOM, result.buff);
            break;
          case 10002:
            console.log(10002, "\u52a0\u5165\u623f\u95f4", result.buff);
            this.monitor.log(`|10002;${result.buff.room_id};${result.buff.seq};${result.buff.msg_seq}`);
            if (0 == result.buff.my_seat_no) {
              if (0 != result.buff.game_status) {
                /** @type {boolean} */
                this.canRunningCmd = false;
              }
            }
            obj.default.emitSync(EXPRESS_INSTALL_ID.EVENT.JOINRELAYROOM, result.buff);
            break;
          case 10011:
            console.log(10011, "\u52a0\u5165\u4e0b\u5c40\u623f\u95f4", result.buff);
            this.monitor.log(`|10011;${result.buff.room_id};${result.buff.seq};${result.buff.msg_seq}`);
            if (0 == result.buff.my_seat_no) {
              if (0 != result.buff.game_status) {
                /** @type {boolean} */
                this.canRunningCmd = false;
              }
            }
            obj.default.emitSync(EXPRESS_INSTALL_ID.EVENT.JOINRELAYROOM, result.buff);
            break;
          case 20004:
            this.adJustBuff(result.buff, 1);
            this.monitor.log(`|20004;${result.buff.seq};${result.buff.msg_seq}`);
            console.log(20004, "\u6709\u73a9\u5bb6\u52a0\u5165", result.buff);
            obj.default.emitSync(EXPRESS_INSTALL_ID.EVENT.PEOPLECOME, result.buff);
            break;
          case 20005:
            this.adJustBuff(result.buff, 1);
            this.monitor.log(`|20005;${result.buff.seq};${result.buff.msg_seq}`);
            console.log(20005, "\u6709\u73a9\u5bb6\u9000\u51fa", result.buff);
            obj.default.emitSync(EXPRESS_INSTALL_ID.EVENT.PEOPLEOUT, result.buff);
            break;
          case 20001:
            this.adJustBuff(result.buff);
            console.log(20001, "\u6e38\u620f\u5f00\u59cb \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014", result.buff);
            this.monitor.log(`|20001;${result.buff.seq};${result.buff.msg_seq};${result.buff.game_level}`);
            console.log("20001 my_seat_no", this.model.relayInfo.my_seat_no);
            obj.default.emitSync(EXPRESS_INSTALL_ID.EVENT.RELAYSTART, result.buff);
            break;
          case 20006:
            this.adJustBuff(result.buff);
            console.log(20006, "\u522b\u4eba\u8df3\u4e86\u4e00\u4e0b \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014", result.buff.msg_seq, result.buff);
            this.monitor.log(`|20006;${result.buff.seq};${result.buff.msg_seq}`);
            console.log("20006 my_seat_no", this.model.relayInfo.my_seat_no);
            obj.default.emitSync(EXPRESS_INSTALL_ID.EVENT.RELAYCHECKUSER, result.buff);
            break;
          case 20002:
            this.adJustBuff(result.buff);
            console.log(20002, "\u56de\u5408\u5f80\u524d\u8fdb\u4e00\u4e0b \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014", result.buff.msg_seq, result.buff);
            this.monitor.log(`|20002;${result.buff.seq};${result.buff.msg_seq}`);
            console.log("20002 my_seat_no", this.model.relayInfo.my_seat_no);
            obj.default.emitSync(EXPRESS_INSTALL_ID.EVENT.RUNGAME, result.buff);
            break;
          case 20003:
            this.adJustBuff(result.buff);
            this.monitor.log(`|20003;${result.buff.room_id};${result.buff.seq};${result.buff.msg_seq}`);
            console.log(20003, "\u6574\u4e2a\u6e38\u620f\u7ed3\u675f", result.buff);
            console.log("20003 my_seat_no", this.model.relayInfo.my_seat_no);
            if (result.buff) {
              if ("-1019" == result.buff.error_ret) {
                this.monitor.report();
              }
            }
            obj.default.emitSync(EXPRESS_INSTALL_ID.EVENT.ENDGAME, result.buff);
            break;
          case 10010:
            if (this.model.relayInfo.room_id) {
              this.model.relayInfo.room_wxa_code = result.buff.room_wxa_code;
            }
            this.adJustBuff(result.buff);
            console.log(10010, "\u6536\u5230\u4e8c\u7ef4\u7801", result.buff);
            console.log("10010 my_seat_no", this.model.relayInfo.my_seat_no);
            obj.default.emitSync(EXPRESS_INSTALL_ID.EVENT.RECEIVEMINICODE, result.buff);
            break;
          case 10007:
            this.adJustBuff(result.buff);
            console.log(10007, "\u6536\u5230\u540c\u6b65\u5e27\u6d41", result.buff);
            this.monitor.log(`|10007;${result.buff.seq};${result.buff.msg_seq}`);
            this.receiveSyncCmd(result);
            break;
          case 20007:
            this.adJustBuff(result.buff, 1);
            console.log(20007, "\u623f\u95f4\u96be\u5ea6\u7b49\u7ea7\u6539\u53d8", result.buff);
            obj.default.emitSync(EXPRESS_INSTALL_ID.EVENT.RECEIVEGAMELEVELCHANGE, result.buff);
            break;
          default:
            console.log("\u6ca1\u6709\u6267\u884c\u7684\u5e27", result);
        }
      }
    }, {
      key : "adJustBuff",
      /**
       * @param {Object} scope
       * @param {?} thisValue
       * @return {undefined}
       */
      value(scope, thisValue) {
        scope.my_seat_no = this.model.relayInfo.my_seat_no;
        if (thisValue) {
          scope.room_wxa_code = this.model.relayInfo.room_wxa_code;
        }
        scope.score = this.game.UI.score;
        console.log("\u4fee\u6b63\u6570\u636e,\u73a9\u5bb6\u623f\u53f7:", scope.my_seat_no);
      }
    }, {
      key : "debug",
      /**
       * @return {undefined}
       */
      value() {
        if (arguments.length > 0) {
          if (void 0 !== arguments[0]) {
            arguments[0];
          }
        }
        if (arguments.length > 1) {
          if (void 0 !== arguments[1]) {
            arguments[1];
          }
        }
        arguments[2];
        return;
      }
    }, {
      key : "run",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {boolean} */
        this.canRunningCmd = true;
        this.runCmd();
      }
    }, {
      key : "stop",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {boolean} */
        this.canRunningCmd = false;
      }
    }, {
      key : "handleOnShow",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {Array} */
        this.cmdList = [];
        /** @type {boolean} */
        this.canRunningCmd = true;
      }
    }, {
      key : "handleOnhide",
      /**
       * @return {undefined}
       */
      value() {
        this.clearSyncTimeOut();
        /** @type {Array} */
        this.cmdList = [];
        this.stop();
      }
    }, {
      key : "handleSyncWrong",
      /**
       * @return {undefined}
       */
      value() {
        wx.showModal({
          title : "\u63d0\u793a",
          content : "\u6e38\u620f\u5f02\u5e38\uff0c\u8bf7\u91cd\u65b0\u5f00\u59cb\u6e38\u620f",
          showCancel : false
        });
      }
    }, {
      key : "destroy",
      /**
       * @return {undefined}
       */
      value() {
        this.clearSyncTimeOut();
        /** @type {Array} */
        this.cmdList = [];
        this.stop();
        /** @type {number} */
        this.seq = 0;
        /** @type {number} */
        this.msg_seq = -1;
      }
    }]), setup;
  })();
  object.default = prototype;
});
