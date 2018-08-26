define("js/pages/full2D.js", (keys, dataAndEvents, object) => {
  /**
   * @param {Object} options
   * @return {?}
   */
  function getOptions(options) {
    return options && options.__esModule ? options : {
      default : options
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
    value : true
  });
  const make = (() => {
    /**
     * @param {Function} object
     * @param {Array} obj
     * @return {undefined}
     */
    function defineProperty(object, obj) {
      /** @type {number} */
      let i = 0;
      for (;i < obj.length;i++) {
        const desc = obj[i];
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
    return (x, walkers, a) => (walkers && defineProperty(x.prototype, walkers), a && defineProperty(x, a), x);
  })();
  const T = (source => {
    if (source && source.__esModule) {
      return source;
    }
    const obj = {};
    if (null != source) {
      let prop;
      for (prop in source) {
        if (Object.prototype.hasOwnProperty.call(source, prop)) {
          obj[prop] = source[prop];
        }
      }
    }
    return obj.default = source, obj;
  })(keys("../lib/three"));
  const ActivityObject = keys("../config");
  const obj = getOptions(keys("../text"));
  const properties = keys("../lib/animation");
  const self = (getOptions(keys("../store/storage")), getOptions(keys("../scroll/scrollHandler")), getOptions(keys("../report")), keys("./pages2d/base"));
  const props = keys("./pages2d/start");
  const visible_keys = keys("./pages2d/beginner");
  const string_positions = keys("./pages2d/lookers");
  const objKeys = keys("./pages2d/pk");
  const lineNeighborKeys = keys("./pages2d/rank");
  const switches = keys("./pages2d/gg");
  const group_keys = keys("./pages2d/gghigh");
  const globals = keys("./pages2d/verify");
  const safeKeys = keys("./pages2d/relay");
  const ruleIsKeys = keys("./pages2d/record");
  const opts = getOptions(keys("../lib/mue/eventcenter"));
  const opt = getOptions(keys("./headimgAnimation"));
  /** @type {number} */
  const scaleX = window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio;
  /** @type {number} */
  const k = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
  /** @type {number} */
  const scale = window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth;
  /** @type {number} */
  const w = scale * scaleX;
  /** @type {Array} */
  const codeSegments = ["btn", "list1", "list2", "bg"];
  const base = ActivityObject.FRUSTUMSIZE;
  const prototype = (wx.loadFont("res/num.ttf"), (() => {
    /**
     * @param {?} options
     * @return {undefined}
     */
    function init(options) {
      const that = this;
      animate(this, init);
      this.texture = {};
      this.material = {};
      this.geometry = {};
      this.obj = {};
      this.canvas = {};
      this.context = {};
      this._touchInfo = {
        trackingID : -1,
        maxDy : 0,
        maxDx : 0
      };
      this.options = Object.assign({}, {}, options);
      this.imgid = {
        btn : 0,
        bg : 0,
        list1 : 0,
        list2 : 0
      };
      this.options.onGroupShare = options.onGroupShare;
      this.options.friendRankReturn = options.friendRankReturn;
      this.options.groupPlayGame = options.groupPlayGame;
      this.options.onClickRank = options.onClickRank;
      this.options.onClickReplay = options.onClickReplay;
      this.options.onClickShare = options.onClickShare;
      this.options.onClickPureShare = options.onClickPureShare;
      this.options.onClickStart = options.onClickStart;
      this.options.onShowFriendRank = options.onShowFriendRank;
      this.options.onBattlePlay = options.onBattlePlay;
      this.options.onLookersStart = options.onLookersStart;
      this.options.newRelay = options.newRelay;
      this.options.outRelay1 = options.outRelay1;
      this.options.outRelay2 = options.outRelay2;
      this.options.startRelay = options.startRelay;
      this.options.shareRelay = options.shareRelay;
      this.options.replayRelay = options.replayRelay;
      this.options.skipRelayBeginner = options.skipRelayBeginner;
      this.options.getRelayQr = options.getRelayQr;
      this.options.quitRecord = options.quitRecord;
      this.options.goRecord = options.goRecord;
      opts.default.on(ActivityObject.EVENT.RELAYSTART, (dataAndEvents, evt) => {
        that.hide2D();
        if (!that.relayHeadImg) {
          that.relayHeadImg = new opt.default;
        }
        if (!that.relayText) {
          that.relayText = new T.Object3D;
          that.turnText = new obj.default("\u8f6e\u5230\u4f60\u4e86\uff01", {
            fillStyle : 4209243,
            chinese : true,
            textAlign : "left"
          });
          that.relayText.add(that.turnText.obj);
          that.outText = new obj.default("\u88ab\u6dd8\u6c70\u4e86\uff01", {
            fillStyle : 4209243,
            chinese : true,
            textAlign : "left"
          });
          that.relayText.add(that.outText.obj);
          that.relayText.scale.set(1.5, 1.5, 1.5);
          /** @type {number} */
          that.relayText.position.x = -13.8;
          /** @type {number} */
          that.relayText.position.y = 11.5;
        }
        that.options.camera.add(that.relayText);
        /** @type {boolean} */
        that.outText.obj.visible = false;
        /** @type {boolean} */
        that.turnText.obj.visible = false;
        that.relayHeadImg.set(evt.playerlist);
        that.options.camera.add(that.relayHeadImg.obj);
        /** @type {number} */
        that.relayHeadImg.obj.position.x = -8.8;
        /** @type {number} */
        that.relayHeadImg.obj.position.y = 20;
        if (evt.my_seat_no == evt.now_player_seat_no) {
          /** @type {boolean} */
          that.turnText.obj.visible = true;
          /** @type {boolean} */
          that.outText.obj.visible = false;
        }
      });
      opts.default.on(ActivityObject.EVENT.SYNCSCENE, (deepDataAndEvents, dataAndEvents) => {
        that.hide2D();
        if (!that.relayHeadImg) {
          that.relayHeadImg = new opt.default;
        }
        if (!that.relayText) {
          that.relayText = new T.Object3D;
          that.turnText = new obj.default("\u8f6e\u5230\u4f60\u4e86\uff01", {
            fillStyle : 4209243,
            chinese : true,
            textAlign : "left"
          });
          that.relayText.add(that.turnText.obj);
          that.outText = new obj.default("\u88ab\u6dd8\u6c70\u4e86\uff01", {
            fillStyle : 4209243,
            chinese : true,
            textAlign : "left"
          });
          that.relayText.add(that.outText.obj);
          that.relayText.scale.set(1.5, 1.5, 1.5);
          /** @type {number} */
          that.relayText.position.x = -13.8;
          /** @type {number} */
          that.relayText.position.y = 11.5;
        }
        that.options.camera.add(that.relayText);
        let items = dataAndEvents.serverData.playerlist;
        items = items.slice(dataAndEvents.serverData.now_player_index, items.length).concat(items.slice(0, dataAndEvents.serverData.now_player_index));
        console.log("\u56f4\u89c2\u770b\u5230\u7684\u5934\u50cf1\uff1a", items, dataAndEvents.serverData.now_player_index);
        items = items.filter(b => 0 === b.rank);
        console.log("\u56f4\u89c2\u770b\u5230\u7684\u5934\u50cf2\uff1a", items);
        that.options.camera.add(that.relayHeadImg.obj);
        /** @type {number} */
        that.relayHeadImg.obj.position.x = -8.8;
        /** @type {number} */
        that.relayHeadImg.obj.position.y = 20;
        if (dataAndEvents.serverData.my_seat_no == dataAndEvents.serverData.now_player_seat_no) {
          /** @type {boolean} */
          that.turnText.obj.visible = true;
          /** @type {boolean} */
          that.outText.obj.visible = false;
          that.relayHeadImg.set(items, {
            timeout : true
          });
        } else {
          /** @type {boolean} */
          that.turnText.obj.visible = false;
          /** @type {boolean} */
          that.outText.obj.visible = false;
          that.relayHeadImg.set(items);
        }
      });
      opts.default.on(ActivityObject.EVENT.ORDERRUNGAME, (dataAndEvents, event) => {
        console.log("order run game next-------------------------------", event.now_player_seat_no, event.my_seat_no);
        if (!that.relayHeadImg) {
          that.relayHeadImg = new opt.default;
        }
        that.relayHeadImg.next(event);
        console.log("\u8f6e\u5230\u4f60\u4e86\u4e48\uff1f", event.my_seat_no, event.now_player_seat_no);
        if (event.my_seat_no == event.now_player_seat_no) {
          /** @type {boolean} */
          that.turnText.obj.visible = true;
          /** @type {boolean} */
          that.outText.obj.visible = false;
        } else {
          /** @type {boolean} */
          that.turnText.obj.visible = false;
          /** @type {boolean} */
          that.outText.obj.visible = false;
        }
      });
      opts.default.on(ActivityObject.EVENT.PLAYERDIED, (dataAndEvents, event) => {
        if (that.canvasType == self.CANVASTYPE.relay) {
          /** @type {boolean} */
          that.outText.obj.visible = true;
          /** @type {boolean} */
          that.turnText.obj.visible = false;
          const items = event.playerlist.filter(b => 0 === b.rank);
          console.log("playerlist.length ? ", items.length);
          if (event.my_seat_no == event.now_player_seat_no) {
            if (items.length > 2) {
              console.log("\u663e\u793a\u7ed3\u7b97\u9875\u9762\u4e86\u5417\uff1f\uff1f", event.my_seat_no, event.now_player_seat_no);
              that.showRelayGG({
                all_player : event.player_count,
                my_rank : event.player_rank
              });
            }
          }
        }
      });
      opts.default.on(ActivityObject.EVENT.RECEIVEMINICODE, (dataAndEvents, tx) => {
        that.showRelayQr(tx);
      });
      opts.default.on(ActivityObject.EVENT.ENDGAME, (dataAndEvents, file) => {
        if (that.relayHeadImg) {
          that.options.camera.remove(that.relayHeadImg.obj);
        }
        if (that.relayText) {
          that.options.camera.remove(that.relayText);
        }
        /** @type {number} */
        let my_rank = 0;
        const name = file.my_seat_no;
        const data = file.playerlist.find(v => v.seat_no === name);
        if (data) {
          if (data.rank >= 0) {
            my_rank = data.rank + 1;
          }
        }
        console.log("rank:", file);
        properties.TweenAnimation.killAll();
        that.showRelayRank({
          players : file.playerlist,
          my_seat_no : file.my_seat_no,
          my_rank,
          total_score : file.score
        });
      });
      opts.default.on(ActivityObject.EVENT.RELAYMODEDESTROY, (dataAndEvents, deepDataAndEvents) => {
        if (that.relayHeadImg) {
          if (that.relayHeadImg.obj) {
            /** @type {boolean} */
            that.outText.obj.visible = that.turnText.obj.visible = false;
            that.options.camera.remove(that.relayText);
            that.options.camera.remove(that.relayHeadImg.obj);
          }
        }
      });
    }
    return make(init, [{
      key : "showFriendRankList",
      /**
       * @param {?} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        this.opt = thisValue || {};
        (0, lineNeighborKeys.drawFriendRankList)({
          self : this
        });
      }
    }, {
      key : "showGroupRankList",
      /**
       * @param {?} newValue
       * @param {?} thisValue
       * @return {undefined}
       */
      value(newValue, thisValue) {
        (0, lineNeighborKeys.drawGroupRankList)(this, newValue, thisValue);
      }
    }, {
      key : "showGameOverPage",
      /**
       * @param {?} opt
       * @return {undefined}
       */
      value(opt={}) {
        this.opt = opt;
        (0, switches.routeGameOver)(this);
      }
    }, {
      key : "showStartPage",
      /**
       * @param {?} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        if (!self.DEBUG) {
          this.opt = thisValue || {};
          (0, props.drawStartPage)(this);
        }
      }
    }, {
      key : "showPkPage",
      /**
       * @param {?} opt
       * @return {undefined}
       */
      value(opt) {
        this.opt = opt;
        (0, objKeys.drawPkPage)({
          self : this
        });
      }
    }, {
      key : "showLookersPage",
      /**
       * @param {?} opt
       * @return {undefined}
       */
      value(opt) {
        this.opt = opt;
        (0, string_positions.drawLookersPage)({
          self : this
        });
      }
    }, {
      key : "showRecordPage",
      /**
       * @param {?} opt
       * @return {undefined}
       */
      value(opt) {
        this.opt = opt;
        (0, ruleIsKeys.drawRecordPage)({
          self : this
        });
      }
    }, {
      key : "showBeginnerPage",
      /**
       * @return {undefined}
       */
      value() {
        (0, visible_keys.drawBeginnerPage)({
          self : this
        });
      }
    }, {
      key : "showRelayRoom",
      /**
       * @param {?} opt
       * @param {boolean} thisValue
       * @return {undefined}
       */
      value(opt, thisValue) {
        this.relayOpt = opt;
        if (this.canvasType != self.CANVASTYPE.relayQr || thisValue) {
          this.opt = opt;
          (0, safeKeys.drawRelayRoomPage)(this);
        }
      }
    }, {
      key : "showRelayGG",
      /**
       * @param {?} opt
       * @return {undefined}
       */
      value(opt) {
        this.opt = opt;
        (0, safeKeys.drawRelayGG)(this);
      }
    }, {
      key : "showRelaying",
      /**
       * @param {?} opt
       * @return {undefined}
       */
      value(opt) {
        this.opt = opt;
        (0, safeKeys.drawRelaying)(this);
      }
    }, {
      key : "showRelayLookers",
      /**
       * @param {?} opt
       * @return {undefined}
       */
      value(opt) {
        this.opt = opt;
        (0, safeKeys.drawRelayLookers)(this);
      }
    }, {
      key : "showRelayRank",
      /**
       * @param {?} opt
       * @return {undefined}
       */
      value(opt) {
        this.opt = opt;
        (0, safeKeys.drawRelayRank)(this);
      }
    }, {
      key : "showRelayBeginner",
      /**
       * @param {?} opt
       * @return {undefined}
       */
      value(opt) {
        this.opt = opt;
        (0, safeKeys.drawRelayBeginner)(this);
      }
    }, {
      key : "showRelayQr",
      /**
       * @param {?} opt
       * @return {undefined}
       */
      value(opt) {
        this.opt = opt;
        (0, safeKeys.drawRelayQr)(this);
      }
    }, {
      key : "hide2D",
      /**
       * @return {undefined}
       */
      value() {
        (0, self.hide)(this);
      }
    }, {
      key : "hide2DGradually",
      /**
       * @return {undefined}
       */
      value() {
        if (!self.DEBUG) {
          const data = this;
          /** @type {number} */
          let i = 0;
          for (;i < codeSegments.length;i++) {
            if (this.obj[codeSegments[i]]) {
              properties.customAnimation.to(this.material[codeSegments[i]], 1, {
                opacity : 0,
                onComplete : (i => () => {
                  /** @type {number} */
                  data.material[codeSegments[i]].opacity = 1;
                  /** @type {boolean} */
                  data.obj[codeSegments[i]].visible = false;
                  /** @type {boolean} */
                  data.showState = false;
                  data.options.camera.remove(data.obj[codeSegments[i]]);
                })(i)
              });
            }
          }
        }
      }
    }, {
      key : "_findDelta",
      /**
       * @param {Event} event
       * @return {?}
       */
      value(event) {
        const cen = this._touchInfo;
        const evt = event.touches[0] || event.changedTouches[0];
        return evt ? {
          x : evt.pageX - cen.x,
          y : evt.pageY - cen.y
        } : null;
      }
    }, {
      key : "doTouchStartEvent",
      /**
       * @param {Event} event
       * @return {undefined}
       */
      value(event) {
        if (this.showState) {
          let x = event.changedTouches[0].pageX;
          let y = event.changedTouches[0].pageY;
          if (this.startX = x, this.startY = y, this.canvasType == self.CANVASTYPE.friendRank || (this.canvasType == self.CANVASTYPE.groupRank || (this.canvasType == self.CANVASTYPE.pk || this.canvasType == self.CANVASTYPE.relayRank))) {
            const me = this._touchInfo;
            const fn = this.scrollHandler;
            if (!fn) {
              return;
            }
            /** @type {string} */
            me.trackingID = "touch";
            me.x = event.touches[0].pageX;
            me.y = event.touches[0].pageY;
            /** @type {number} */
            me.maxDx = 0;
            /** @type {number} */
            me.maxDy = 0;
            /** @type {Array} */
            me.historyX = [0];
            /** @type {Array} */
            me.historyY = [0];
            /** @type {Array} */
            me.historyTime = [+new Date];
            me.listener = fn;
            if (fn.onTouchStart) {
              fn.onTouchStart();
            }
          } else {
            if (this.canvasType == self.CANVASTYPE.gameOver) {
              x = this._cxp(x);
              y = this._cyp(y);
              if (!this.noplay_time || this.noplay_time < 0) {
                if (x > 117) {
                  if (x < 297) {
                    if (y > 540) {
                      if (y < 660) {
                        this._drawGameOverBtnClick();
                      }
                    }
                  }
                }
              }
            } else {
              if (this.canvasType == self.CANVASTYPE.start) {
                x = this._cxp(x);
                y = this._cyp(y);
                if (x > 100) {
                  if (x < 320) {
                    if (y > 557) {
                      if (y < 617) {
                        this._drawStartClick();
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }, {
      key : "doTouchMoveEvent",
      /**
       * @param {?} p
       * @return {undefined}
       */
      value(p) {
        if (this.showState && (this.canvasType == self.CANVASTYPE.friendRank || (this.canvasType == self.CANVASTYPE.groupRank || (this.canvasType == self.CANVASTYPE.pk || this.canvasType == self.CANVASTYPE.relayRank)))) {
          const me = this._touchInfo;
          if (-1 == me.trackingID) {
            return;
          }
          p.preventDefault();
          const d = this._findDelta(p);
          if (!d) {
            return;
          }
          /** @type {number} */
          me.maxDy = Math.max(me.maxDy, Math.abs(d.y));
          /** @type {number} */
          me.maxDx = Math.max(me.maxDx, Math.abs(d.x));
          /** @type {number} */
          const copies = +new Date;
          me.historyX.push(d.x);
          me.historyY.push(d.y);
          me.historyTime.push(copies);
          for (;me.historyTime.length > 10;) {
            me.historyTime.shift();
            me.historyX.shift();
            me.historyY.shift();
          }
          if (me.listener) {
            if (me.listener.onTouchMove) {
              me.listener.onTouchMove(d.x, d.y, copies);
            }
          }
        }
      }
    }, {
      key : "doTouchEndEvent",
      /**
       * @param {Event} event
       * @return {?}
       */
      value(event) {
        if (this.showState) {
          let x = event.changedTouches[0].pageX;
          let y = event.changedTouches[0].pageY;
          const tileV = y;
          /** @type {boolean} */
          let s = true;
          if (this.canvasType != self.CANVASTYPE.friendRank && (this.canvasType != self.CANVASTYPE.groupRank && (this.canvasType != self.CANVASTYPE.pk && (this.canvasType != self.CANVASTYPE.gameOver && this.canvasType != self.CANVASTYPE.relayRank))) || (!(Math.abs(x - this.startX) > 5 || Math.abs(y - this.startY) > 5) || (s = false)), x = this._cxp(x), y = this._cyp(y), s) {
            if (this.canvasType == self.CANVASTYPE.groupRank) {
              if (x > 134 && (x < 283 && (y > 640 && y < 727))) {
                return(0, self.hide)(this), void(!!this.options.groupPlayGame && this.options.groupPlayGame());
              }
              if (x > 349 && (x < 379 && (y > 140 && y < 590))) {
                /** @type {number} */
                i = Math.round((this._cyp(tileV - this.lastScrollY) - 171) / 60);
                if (this.sotedRankList[i].playback_id) {
                  if (!!this.options.goRecord) {
                    this.options.goRecord({
                      user_data : this.sotedRankList[i],
                      scene : "group"
                    });
                  }
                }
              }
            }
            if (this.canvasType == self.CANVASTYPE.friendRank) {
              if (x > 120 && (x < 300 && (y > 640 && y < 720))) {
                return void(!!this.options.onGroupShare && this.options.onGroupShare());
              }
              if (x > 330 && (x < 408 && (y > 100 && y < 140))) {
                return void(this.lastCanvasType == self.CANVASTYPE.gameOver ? !!this.options.friendRankReturn && this.options.friendRankReturn("") : this.lastCanvasType == self.CANVASTYPE.start && (!!this.options.friendRankReturn && this.options.friendRankReturn("")));
              }
              if (x > 349 && (x < 379 && (y > 140 && y < 590))) {
                /** @type {number} */
                i = Math.round((this._cyp(tileV - this.lastScrollY) - 171) / 60);
                if (this.sotedRankList[i].playback_id) {
                  if (!!this.options.goRecord) {
                    this.options.goRecord({
                      user_data : this.sotedRankList[i],
                      scene : "friends"
                    });
                  }
                }
              }
            }
            if (this.canvasType == self.CANVASTYPE.gameOver) {
              return void("beginner" != this.opt.type && ("tired" != this.opt.type && (!this.opt.banType && (x > 25 && (x < 385 && (y > 290 && y < 500))))) ? !!this.options.onClickRank && this.options.onClickRank() : !this.opt.banType && (x > 150 && (x < 260 && (y > 199 && y < 260))) ? !!this.options.onClickShare && this.options.onClickShare() : (!this.noplay_time || this.noplay_time < 0) && (x > 117 && (x < 297 && (y > 540 && y < 660))) ? !!this.options.onClickReplay && this.options.onClickReplay() : 
              1 == this.opt.banType && (x > 150 && (x < 260 && (y > 430 && y < 500))) ? (0, globals.routeVerify)(this) : x < 100 && (y < 70 && opts.default.emit(ActivityObject.EVENT.GOSTARTPAGE, {})));
            }
            if (this.canvasType == self.CANVASTYPE.gameOverHighest && (x > 340 && (x < 407 && (y > 76 && y < 138)) ? (this.canvasType = self.CANVASTYPE.gameOver, (0, switches.routeGameOver)(this, true)) : x > 111 && (x < 380 && (y > 540 && y < 660)) ? !!this.options.onClickReplay && this.options.onClickReplay() : this.changlleList.length > 0 && (x > 170 && (x < 230 && (y > 330 && y < 390))) ? !!this.options.onClickPureShare && this.options.onClickPureShare(this.opt.type) : (0 == this.changlleList.length || 
            "rank" == this.opt.type) && (x > 170 && (x < 230 && (y > 390 && y < 440))) ? !!this.options.onClickPureShare && this.options.onClickPureShare(this.opt.type) : this.changlleList.length > 5 && (x > 55 && (x < 115 && (y > 437 && y < 497))) ? (0, group_keys.reDrawChangeAva)(this, -1) : this.changlleList.length > 5 && (x > 297 && (x < 357 && (y > 437 && (y < 497 && (0, group_keys.reDrawChangeAva)(this, 1)))))), this.canvasType == self.CANVASTYPE.start) {
              return void(x > 93 && (x < 321 && (y > 557 && y < 617)) ? !!this.options.onClickStart && this.options.onClickStart() : !this.opt.hideRank && (x > 217 && (x < 313 && (y > 660 && y < 680))) ? !!this.options.onShowFriendRank && this.options.onShowFriendRank() : !this.opt.hideRank && (x > 79 && (x < 197 && (y > 660 && y < 680))) ? !!this.options.newRelay && this.options.newRelay() : 1 == this.opt.banType && (x > 128 && (x < 286 && (y > 369 && y < 433))) ? (0, globals.routeVerify)(this) : 
              this._drawStartClickRevert());
            }
            if (this.canvasType == self.CANVASTYPE.pk) {
              if (x > 110 && (x < 310 && (y > 650 && y < 730))) {
                return void(!!this.options.onBattlePlay && this.options.onBattlePlay(""));
              }
              if (this.opt.organizerInfo.left_time > 0 && (0 == this.opt.organizerInfo.is_self && (x > 140 && (x < 280 && (y > 325 && y < 405))))) {
                return void(!!this.options.onBattlePlay && this.options.onBattlePlay("pk"));
              }
            }
            if (this.canvasType == self.CANVASTYPE.lookers) {
              return void(x > 130 && (x < 280 && (y > 650 && (y < 720 && (!!this.options.onLookersStart && this.options.onLookersStart())))));
            }
            if (this.canvasType == self.CANVASTYPE.verify && (x > 130 && (x < 280 && (y > 607 && y < 640)) ? this.opt.verify_step >= 4 ? (this.opt.banType = 2, this.lastCanvasType == self.CANVASTYPE.gameOver ? (0, switches.routeGameOver)(this, true) : (0, props.drawStartPage)(this)) : (0, globals.routeVerify)(this) : x > 130 && (x < 280 && (y > 670 && y < 720)) ? (this.opt.verify_step = 0, this.lastCanvasType == self.CANVASTYPE.gameOver ? (0, switches.routeGameOver)(this, true) : (0, props.drawStartPage)(this)) : 
            3 == this.opt.verify_step && (x > 130 && (x < 370 && (y > 240 && y < 300))) ? (0, globals.clickVerifyForm)(this, "name") : 3 == this.opt.verify_step && (x > 130 && (x < 370 && (y > 300 && (y < 360 && (0, globals.clickVerifyForm)(this, "mobile")))))), this.canvasType == self.CANVASTYPE.relay) {
              if (0 == this.opt.game_status && (this.opt.my_seat_no == this.opt.room_owner_seat && (this.opt.players.length > 1 && (x > 160 && (x < 260 && (y > 627 && y < 677)))))) {
                console.log("\u623f\u4e3b\u70b9\u5f00\u59cb\u6e38\u620f");
                this.opt.game_level = this.opt.game_level || 0;
                if (!!this.options.startRelay) {
                  this.options.startRelay(this.opt.game_level);
                }
              } else {
                if (0 == this.opt.game_status && (this.opt.my_seat_no == this.opt.room_owner_seat && (x > 160 && (x < 260 && (y > 555 && y < 595))))) {
                  console.log("\u623f\u4e3b\u4fee\u6539\u6e38\u620f\u96be\u5ea6");
                  const parser = this;
                  wx.showActionSheet({
                    itemList : ["\u4f4e", "\u4e2d", "\u9ad8"],
                    /**
                     * @param {?} response
                     * @return {undefined}
                     */
                    success(response) {
                      console.log(response.tapIndex);
                      parser.opt.game_level = response.tapIndex;
                      parser.showRelayRoom(parser.opt);
                      opts.default.emit(ActivityObject.EVENT.CHANGEGAMELEVEL, response.tapIndex);
                    },
                    /**
                     * @param {?} data
                     * @return {undefined}
                     */
                    fail(data) {
                      console.log(data.errMsg);
                    }
                  });
                } else {
                  if (0 == this.opt.game_status && (x < 100 && y < 70)) {
                    console.log("home");
                    if (this.relayHeadImg) {
                      if (this.relayHeadImg.obj) {
                        this.options.camera.remove(this.relayHeadImg.obj);
                      }
                    }
                    if (this.relayText) {
                      this.options.camera.remove(this.relayText);
                    }
                    if (!!this.options.outRelay1) {
                      this.options.outRelay1();
                    }
                  } else {
                    if (0 == this.opt.game_status && (this.opt.my_seat_no == this.opt.room_owner_seat && (x > 160 && (x < 260 && (y > 99 && y < 140))))) {
                      console.log("\u623f\u4e3b\u9080\u8bf7\u4ed6\u4eba");
                      if (!!this.options.shareRelay) {
                        this.options.shareRelay();
                      }
                    } else {
                      if (0 == this.opt.game_status && (this.opt.my_seat_no != this.opt.room_owner_seat && (x > 160 && (x < 260 && (y > 598 && y < 618))))) {
                        console.log("\u53c2\u4e0e\u8005\u9080\u8bf7\u4ed6\u4eba");
                        if (!!this.options.shareRelay) {
                          this.options.shareRelay();
                        }
                      } else {
                        if ((1 == this.opt.game_status || 2 == this.opt.game_status) && (x < 100 && y < 70)) {
                          console.log("home");
                          if (this.relayHeadImg) {
                            if (this.relayHeadImg.obj) {
                              this.options.camera.remove(this.relayHeadImg.obj);
                            }
                          }
                          if (this.relayText) {
                            this.options.camera.remove(this.relayText);
                          }
                          if (!!this.options.outRelay2) {
                            this.options.outRelay2();
                          }
                        } else {
                          if (1 == this.opt.game_status && (x > 160 && (x < 260 && (y > 568 && y < 608)))) {
                            console.log("\u6e38\u620f\u5df2\u5f00\u59cb\uff0c\u70b9\u89c2\u6218");
                            if (!!this.options.watchRelay) {
                              this.options.watchRelay();
                            }
                          } else {
                            if (0 == this.opt.game_status && (this.opt.my_seat_no == this.opt.room_owner_seat && (x > 160 && (x < 260 && (y > 161 && y < 201))))) {
                              console.log("\u62c9\u7801");
                              opts.default.emit(ActivityObject.EVENT.GETRELAYQR);
                              if (!!this.options.getRelayQr) {
                                this.options.getRelayQr();
                              }
                              this.showRelayQr({});
                            } else {
                              if (2 == this.opt.game_status) {
                                if (x > 160) {
                                  if (x < 260) {
                                    if (y > 568) {
                                      if (y < 608) {
                                        console.log("\u6e38\u620f\u5df2\u5931\u6548\uff0c\u70b9\u6211\u4e5f\u8981\u73a9");
                                        if (!!this.options.newRelay) {
                                          this.options.newRelay();
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            if (this.canvasType == self.CANVASTYPE.relayRank) {
              if (x < 100 && y < 70) {
                console.log("\u623f\u4e3b/\u73a9\u5bb6\u9000\u51fa\u623f\u95f4 relay rank");
                if (!!this.options.outRelay1) {
                  this.options.outRelay1();
                }
              } else {
                if (0 != this.opt.my_seat_no) {
                  if (x > 30) {
                    if (x < 380) {
                      if (y > 561) {
                        if (y < 651) {
                          console.log("\u518d\u6765\u4e00\u5c40");
                          opts.default.emit(ActivityObject.EVENT.REPLAYAGAIN, {});
                        }
                      }
                    }
                  }
                }
              }
            }
            if (this.canvasType == self.CANVASTYPE.relayGG) {
              if (x > 30 && (x < 384 && (y > 460 && y < 550))) {
                console.log("\u7ee7\u7eed\u89c2\u6218");
                this.hide2D();
              } else {
                if (x < 100) {
                  if (y < 70) {
                    if (this.relayHeadImg) {
                      if (this.relayHeadImg.obj) {
                        this.options.camera.remove(this.relayHeadImg.obj);
                      }
                    }
                    if (this.relayText) {
                      this.options.camera.remove(this.relayText);
                    }
                    console.log("\u56de\u5230\u9996\u9875");
                    if (!!this.options.outRelay1) {
                      this.options.outRelay1();
                    }
                  }
                }
              }
            }
            if (this.canvasType == self.CANVASTYPE.relayBeginner) {
              if (x > 310) {
                if (x < 397) {
                  if (y > 530) {
                    if (y < 560) {
                      console.log("\u8df3\u8fc7");
                      if (!!this.options.skipRelayBeginner) {
                        this.options.skipRelayBeginner();
                      }
                    }
                  }
                }
              }
            }
            if (this.canvasType == self.CANVASTYPE.relayQr) {
              if (x < 100) {
                if (y < 70) {
                  this.showRelayRoom(this.relayOpt, true);
                }
              }
            }
            if (this.canvasType == self.CANVASTYPE.record) {
              if (x < 100) {
                if (y < 70) {
                  if (!!this.options.quitRecord) {
                    this.options.quitRecord();
                  }
                }
              }
            }
          }
          if (this.canvasType == self.CANVASTYPE.gameOver) {
            if (!this.noplay_time || this.noplay_time < 0) {
              this._drawGameOverBtnClickRevert();
            }
          }
          const evt = this._touchInfo;
          if (-1 != evt.trackingID) {
            event.preventDefault();
            const coord = this._findDelta(event);
            if (coord) {
              const result = evt.listener;
              /** @type {number} */
              evt.trackingID = -1;
              /** @type {null} */
              evt.listener = null;
              const point3 = {
                x : 0,
                y : 0
              };
              if (evt.historyTime.length > 2) {
                /** @type {number} */
                var i = evt.historyTime.length - 1;
                const pos = evt.historyTime[i];
                const val = evt.historyX[i];
                const h = evt.historyY[i];
                for (;i > 0;) {
                  i--;
                  /** @type {number} */
                  const idx = pos - evt.historyTime[i];
                  if (idx > 30 && idx < 50) {
                    /** @type {number} */
                    point3.x = (val - evt.historyX[i]) / (idx / 1E3);
                    /** @type {number} */
                    point3.y = (h - evt.historyY[i]) / (idx / 1E3);
                    break;
                  }
                }
              }
              /** @type {Array} */
              evt.historyTime = [];
              /** @type {Array} */
              evt.historyX = [];
              /** @type {Array} */
              evt.historyY = [];
              if (result) {
                if (result.onTouchEnd) {
                  result.onTouchEnd(coord.x, coord.y, point3);
                }
              }
            }
          }
        }
      }
    }, {
      key : "updatePosition",
      /**
       * @param {number} i
       * @return {undefined}
       */
      value(i) {
        let c;
        if (i > 0) {
          /** @type {number} */
          i = 0;
        }
        /** @type {number} */
        const deg = 10 * (0, self.cwh)(60) / w * base;
        /** @type {number} */
        const o = 10 * (0, self.cwh)(60);
        if (!(this.canvasType != self.CANVASTYPE.friendRank && this.canvasType != self.CANVASTYPE.groupRank)) {
          /** @type {number} */
          c = -(this._cy(143) + o / 2 - w / 2) / w * base;
        }
        if (this.canvasType == self.CANVASTYPE.pk) {
          /** @type {number} */
          c = -(this._cy(437) + o / 2 - w / 2) / w * base;
        }
        if (this.canvasType == self.CANVASTYPE.relayRank) {
          /** @type {number} */
          c = -(this._cy(404) + o / 2 - w / 2) / w * base;
          if (1 != this.opt.my_rank) {
            /** @type {number} */
            c = -(this._cy(318) + o / 2 - w / 2) / w * base;
          }
        }
        /** @type {number} */
        const baseAngle = Math.floor((c - base * i / scale) / deg);
        if (this.lastN != baseAngle && this.lastN - baseAngle < 0) {
          if (baseAngle % 2 == 0) {
            this._drawList(10 * (baseAngle + 1), "list2");
          } else {
            this._drawList(10 * (baseAngle + 1), "list1");
          }
        } else {
          if (this.lastN != baseAngle && this.lastN - baseAngle > 0) {
            /** @type {number} */
            let f = baseAngle;
            if (-1 == f) {
              /** @type {number} */
              f = 1;
            }
            if (baseAngle % 2 == 0) {
              this._drawList(10 * baseAngle, "list1");
            } else {
              this._drawList(10 * f, "list2");
            }
          }
        }
        if (baseAngle % 2 == 0) {
          /** @type {number} */
          this.obj.list1.position.y = c - base * i / scale - baseAngle * deg;
          /** @type {number} */
          this.obj.list2.position.y = c - base * i / scale - (baseAngle + 1) * deg;
        } else {
          /** @type {number} */
          this.obj.list2.position.y = c - base * i / scale - baseAngle * deg;
          /** @type {number} */
          this.obj.list1.position.y = c - base * i / scale - (baseAngle + 1) * deg;
        }
        /** @type {number} */
        this.lastN = baseAngle;
        /** @type {number} */
        this.lastScrollY = i;
      }
    }, {
      key : "_drawList",
      /**
       * @param {?} newValue
       * @param {?} thisValue
       * @return {undefined}
       */
      value(newValue, thisValue) {
        if (this.canvasType != self.CANVASTYPE.pk) {
          if (this.canvasType == self.CANVASTYPE.friendRank || this.canvasType == self.CANVASTYPE.groupRank) {
            (0, lineNeighborKeys.drawRankList)(this, newValue, thisValue);
          } else {
            if (this.canvasType == self.CANVASTYPE.relay) {
              (0, safeKeys.drawRelayList)(this, newValue, thisValue);
            }
          }
        } else {
          (0, objKeys.drawPkList)(this, newValue, thisValue);
        }
      }
    }, {
      key : "_drawGameOverBtnClick",
      /**
       * @return {undefined}
       */
      value() {
        this.context.btn.clearRect(this._cx(91), this._cy(527), (0, self.cwh)(232), (0, self.cwh)(134));
        this._drawImageCenter("res/replay.png", this._cx(207), this._cy(607), (0, self.cwh)(190), (0, self.cwh)(75), "btn", null, this.imgid.btn);
      }
    }, {
      key : "_drawGameOverBtnClickRevert",
      /**
       * @return {undefined}
       */
      value() {
        this.context.btn.clearRect(this._cx(91), this._cy(527), (0, self.cwh)(232), (0, self.cwh)(134));
        this._drawImageCenter("res/replay.png", this._cx(207), this._cy(607), (0, self.cwh)(212), (0, self.cwh)(84), "btn", null, this.imgid.btn);
      }
    }, {
      key : "_drawStartClick",
      /**
       * @return {undefined}
       */
      value() {
        this.context.btn.clearRect(this._cx(91), this._cy(530), (0, self.cwh)(232), (0, self.cwh)(104));
        this._drawImageCenter("res/play.png", this._cx(207), this._cy(587), (0, self.cwh)(190), (0, self.cwh)(75), "btn", null, this.imgid.btn);
      }
    }, {
      key : "_drawStartClickRevert",
      /**
       * @return {undefined}
       */
      value() {
        this.context.btn.clearRect(this._cx(91), this._cy(530), (0, self.cwh)(232), (0, self.cwh)(104));
        this._drawImageCenter("res/play.png", this._cx(207), this._cy(587), (0, self.cwh)(212), (0, self.cwh)(84), "btn", null, this.imgid.btn);
      }
    }, {
      key : "_cx",
      /**
       * @param {number} radius
       * @return {?}
       */
      value(radius) {
        /** @type {number} */
        let x1 = radius * k / 414;
        return scale / k < 736 / 414 && (x1 = radius * scale / 736 + (k - 414 * scale / 736) / 2), x1 * scaleX;
      }
    }, {
      key : "_cy",
      /**
       * @param {number} x1
       * @return {?}
       */
      value(x1) {
        return(scale / k > 736 / 414 ? x1 * k / 414 + (scale - 736 * k / 414) / 2 : x1 * scale / 736) * scaleX;
      }
    }, {
      key : "_cxp",
      /**
       * @param {number} w
       * @return {?}
       */
      value(w) {
        return w / k * 414;
      }
    }, {
      key : "_cyp",
      /**
       * @param {number} v
       * @return {?}
       */
      value(v) {
        return scale / k > 736 / 414 ? (v - (scale - 736 * k / 414) / 2) / k * 414 : v / scale * 736;
      }
    }, {
      key : "_drawImageCenter",
      /**
       * @param {string} path
       * @param {string} x
       * @param {string} y
       * @param {number} w
       * @param {number} height
       * @param {(number|string)} key
       * @param {?} callback
       * @param {?} val
       * @param {?} thisValue
       * @return {undefined}
       */
      value(path, x, y, w, height, key, callback, val, thisValue) {
        if (!("/0" != path && ("/96" != path && ("/64" != path && path)))) {
          /** @type {string} */
          path = "res/ava.png";
        }
        /** @type {Image} */
        const image = new Image;
        const state = this;
        /**
         * @return {undefined}
         */
        image.onload = () => {
          if (state.imgid[key] == val) {
            state.context[key].drawImage(image, x - w / 2, y - height / 2, w, height);
            if (!!callback) {
              callback();
            }
            if (!thisValue) {
              (0, self.updatePlane)({
                self : state,
                type : key
              });
            }
          }
        };
        /**
         * @return {undefined}
         */
        image.onerror = () => {
          if (!!callback) {
            callback();
          }
        };
        /** @type {string} */
        image.src = path;
      }
    }]), init;
  })());
  object.default = prototype;
});
