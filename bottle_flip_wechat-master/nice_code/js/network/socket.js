define("js/network/socket.js", ($sanitize, dataAndEvents, object) => {
  /**
   * @param {Object} options
   * @return {?}
   */
  function toObject(options) {
    return options && options.__esModule ? options : {
      default : options
    };
  }
  /**
   * @param {?} dataAndEvents
   * @param {Function} bind
   * @return {undefined}
   */
  function forEach(dataAndEvents, bind) {
    if (!(dataAndEvents instanceof bind)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  Object.defineProperty(object, "__esModule", {
    value : true
  });
  const deprecate = (() => {
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
  const self = toObject($sanitize("../store/session"));
  const obj = toObject($sanitize("./network"));
  const prototype = (() => {
    /**
     * @param {Object} selfObj
     * @return {undefined}
     */
    function bind(selfObj) {
      const self = this;
      forEach(this, bind);
      /** @type {boolean} */
      this.alive = false;
      /** @type {boolean} */
      this.noErr = false;
      /** @type {Object} */
      this.game = selfObj;
      this.handlers = {};
      /** @type {string} */
      this.handleSocketErr = "";
      /** @type {Array} */
      this.heartBeat = [];
      wx.onSocketOpen(dataAndEvents => {
        /** @type {boolean} */
        self.alive = true;
        if ("relay" == self.game.mode) {
          self.game.gameCtrl.onSocketOpen();
        } else {
          self.joinGame();
        }
      });
      wx.onSocketClose(err => {
        if (!("player" != self.game.mode)) {
          if (!self.noErr) {
            obj.default.quitGame();
            self.game.gameCtrl.onSocketCloseErr();
          }
        }
        if (!("observe" != self.game.mode)) {
          if (!self.noErr) {
            self.game.gameCtrl.onSocketCloseErr();
          }
        }
        if (!("relay" != self.game.mode)) {
          if (!self.noErr) {
            self.game.gameCtrl.onSocketCloseErr();
          }
        }
        /** @type {boolean} */
        self.alive = false;
        console.log("Socket close", err, "\u662f\u5426\u6b63\u5e38\u5173\u95ed\uff1a", self.noErr);
      });
      wx.onSocketError(dataAndEvents => {
      });
      wx.onSocketMessage(event => {
        self.cleanHeartBeat();
        self.heartBeat.push(setTimeout(self.sendHeartBeat.bind(self), 5E3));
        let m;
        try {
          /** @type {*} */
          m = JSON.parse(event.data);
        } catch (e) {
          return self.game.handleWxOnError({
            message : "socket receive wrong msg JSON.parse(res.data) error",
            stack : ""
          }), void wx.closeSocket();
        }
        m.cmd;
        if (106 === m.cmd) {
          self.handleACK(m);
        }
        if (101 === m.cmd) {
          self.handleJoinGame(m);
        }
        m.cmd;
        if (108 === m.cmd) {
          self.handlePeopleCome(m);
        }
        if (102 === m.cmd) {
          self.receiveCommand(m);
        }
        if (109 == m.cmd) {
          self.close();
        }
        if (107 == m.cmd) {
          self.handlePlayerOut();
        }
        if (!(401 != m.cmd && 402 != m.cmd)) {
          self.handleRelayCMD(m);
        }
      });
    }
    return deprecate(bind, [{
      key : "cleanHeartBeat",
      /**
       * @return {undefined}
       */
      value() {
        if (this.heartBeat.length) {
          for (;this.heartBeat.length;) {
            const to = this.heartBeat.pop();
            clearTimeout(to);
          }
        }
      }
    }, {
      key : "connectSocket",
      /**
       * @return {undefined}
       */
      value() {
        const cell = this;
        console.log("connectSocket");
        wx.connectSocket({
          url : "wss://wxagame.weixin.qq.com",
          /**
           * @return {undefined}
           */
          success() {
            console.log("wx.connectSocket success");
          },
          /**
           * @param {?} positionError
           * @return {undefined}
           */
          fail(positionError) {
            /** @type {boolean} */
            cell.alive = false;
          }
        });
      }
    }, {
      key : "sendCommand",
      /**
       * @param {string} count
       * @param {?} error
       * @return {undefined}
       */
      value(count, error) {
        const val = self.default.gameId;
        const node = self.default.gameTicket;
        if (val && (node && count)) {
          if ("string" == typeof val) {
            const obj = {
              cmd : 102,
              i : val,
              n : count,
              k : node,
              o : [JSON.stringify(error)]
            };
            wx.sendSocketMessage({
              data : JSON.stringify(obj)
            });
          } else {
            console.warn("Socket send cmd need gameId");
          }
        }
      }
    }, {
      key : "sendNullCommand",
      /**
       * @return {undefined}
       */
      value() {
        const val = self.default.gameId;
        const k = self.default.gameTicket;
        if (val && k) {
          if ("string" == typeof val) {
            const data = {
              cmd : 102,
              i : val,
              k,
              o : []
            };
            wx.sendSocketMessage({
              data : JSON.stringify(data)
            });
          } else {
            console.warn("Socket send cmd need gameId");
          }
        }
      }
    }, {
      key : "getCommand",
      /**
       * @param {?} thisValue
       * @return {undefined}
       */
      value(thisValue) {
      }
    }, {
      key : "sendRelayCmd",
      /**
       * @param {string} obj
       * @return {undefined}
       */
      value(obj) {
        const cell = this;
        if (this.game.gameModel.relayInfo.router_id && (self.default.sessionId && obj)) {
          /** @type {string} */
          const keys = JSON.stringify(obj);
          const data = {
            cmd : 401,
            router_id : this.game.gameModel.relayInfo.router_id,
            session_id : self.default.sessionId,
            fast : 1,
            data : keys
          };
          wx.sendSocketMessage({
            data : JSON.stringify(data),
            /**
             * @param {?} data
             * @return {undefined}
             */
            fail(data) {
              if (data) {
                if (data.errMsg) {
                  if (data.errMsg.match(/WebSocket is not connected$/)) {
                    /** @type {boolean} */
                    cell.alive = false;
                  }
                }
              }
            }
          });
        }
      }
    }, {
      key : "onRelayCmdCome",
      /**
       * @param {?} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        this.handleRelayCMD = thisValue;
      }
    }, {
      key : "onPeopleCome",
      /**
       * @param {?} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        this.peopleCome = thisValue;
      }
    }, {
      key : "onReciveCommand",
      /**
       * @param {?} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        this.observerMessage = thisValue;
      }
    }, {
      key : "onJoinSuccess",
      /**
       * @param {?} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        this.joinSuccess = thisValue;
      }
    }, {
      key : "onPlayerOut",
      /**
       * @param {?} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        this.playerOutHandler = thisValue;
      }
    }, {
      key : "receiveCommand",
      /**
       * @param {Object} listener
       * @return {undefined}
       */
      value(listener) {
        if ("function" == typeof this.observerMessage) {
          if (listener.o) {
            if (listener.o[0]) {
              if (listener.o[0].o) {
                this.observerMessage(listener.n, JSON.parse(listener.o[0].o));
              }
            }
          }
        }
      }
    }, {
      key : "handlePeopleCome",
      /**
       * @param {?} newValue
       * @return {undefined}
       */
      value(newValue) {
        if ("function" == typeof this.peopleCome) {
          this.peopleCome(newValue);
        }
      }
    }, {
      key : "receiveACK",
      /**
       * @return {undefined}
       */
      value() {
      }
    }, {
      key : "joinGame",
      /**
       * @return {undefined}
       */
      value() {
        const gameId = self.default.gameId;
        if (self.default.sessionId && gameId) {
          const data = {
            cmd : 101,
            game_id : gameId,
            fast : 1,
            session_id : self.default.sessionId
          };
          wx.sendSocketMessage({
            data : JSON.stringify(data)
          });
        }
      }
    }, {
      key : "handleACK",
      /**
       * @param {?} prefix
       * @return {undefined}
       */
      value(prefix) {
        if (this.handlers.ack) {
          this.handlers.ack.forEach(add => {
            add(prefix);
          });
        }
      }
    }, {
      key : "handleJoinGame",
      /**
       * @param {?} matches
       * @return {undefined}
       */
      value(matches) {
        if ("observe" == this.game.mode) {
          switch(matches.ret) {
            case 0:
            ;
            case 2:
              this.joinSuccess(true);
              break;
            default:
              this.joinSuccess(false);
          }
        } else {
          if (0 != matches.ret) {
            this.joinSuccess(false);
          } else {
            this.joinSuccess(true);
          }
        }
      }
    }, {
      key : "sendHeartBeat",
      /**
       * @return {undefined}
       */
      value() {
        if ("player" == this.game.mode) {
          this.sendNullCommand();
        } else {
          const data = {
            cmd : 104
          };
          wx.sendSocketMessage({
            data : JSON.stringify(data)
          });
        }
      }
    }, {
      key : "quitObserve",
      /**
       * @return {undefined}
       */
      value() {
        if (this.alive) {
          const data = {
            cmd : 109,
            fast : 1,
            game_id : self.default.gameId,
            session_id : self.default.sessionId
          };
          wx.sendSocketMessage({
            data : JSON.stringify(data)
          });
        }
      }
    }, {
      key : "close",
      /**
       * @return {undefined}
       */
      value() {
        const record = this;
        if (this.alive) {
          this.cleanHeartBeat();
          /** @type {boolean} */
          this.noErr = true;
          console.log("emmit close");
          wx.closeSocket();
          self.default.clearShareTicket();
          self.default.clearGameId();
          setTimeout(() => {
            record.reset();
          }, 1E3);
        }
      }
    }, {
      key : "onSocketErr",
      /**
       * @param {Function} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        /** @type {Function} */
        this.handleSocketErr = thisValue;
      }
    }, {
      key : "reset",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {boolean} */
        this.noErr = false;
      }
    }, {
      key : "handlePlayerOut",
      /**
       * @return {undefined}
       */
      value() {
        if ("function" == typeof this.playerOutHandler) {
          this.playerOutHandler();
        }
      }
    }]), bind;
  })();
  object.default = prototype;
});
