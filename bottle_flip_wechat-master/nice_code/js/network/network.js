define("js/network/network.js", (require, dataAndEvents, object) => {
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
   * @param {Function} object
   * @return {undefined}
   */
  function stub(dataAndEvents, object) {
    if (!(dataAndEvents instanceof object)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  /**
   * @param {string} id
   * @param {?} name
   * @return {undefined}
   */
  function text(id, name) {
    const index = name ? `${id}(${name})` : id;
    wx.showModal({
      title : "\u63d0\u793a",
      content : index,
      showCancel : false
    });
  }
  Object.defineProperty(object, "__esModule", {
    value : true
  });
  const onErrorFnPrev = (() => {
    /**
     * @param {Function} proto
     * @param {?} name
     * @return {undefined}
     */
    function defineProperty(proto, name) {
      /** @type {number} */
      let i = 0;
      for (;i < name.length;i++) {
        const desc = name[i];
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
    return (context, name, tag) => (name && defineProperty(context.prototype, name), tag && defineProperty(context, tag), context);
  })();
  /**
   * @param {Object} res
   * @return {?}
   */
  object.upLoadVerifyPic = res => {
    const filePath = res.path || "";
    const on = res.succ || (() => {
      console.log("upLoadVerifyPic need succ func");
    });
    const isDocumentComplete = res.complete || (() => {
      console.log("upLoadVerifyPic need complete func");
    });
    const endpoint = self.default.sessionId || "";
    if (!filePath || !endpoint) {
      return console.log(`upLoadVerifyPic need session_id\uff1a${endpoint}upLoadVerifyPic need path\uff1a${filePath}`), isDocumentComplete(), void text("\u63d0\u4ea4\u5931\u8d25", "n0");
    }
    console.log(`${AJAX_URL.AJAX_URL}/wxagame/wxagame_filetransfer?action=preview`);
    wx.uploadFile({
      url : `${AJAX_URL.AJAX_URL}/wxagame/wxagame_filetransfer?action=preview`,
      filePath,
      name : "file",
      formData : {
        base_req : JSON.stringify({
          session_id : endpoint,
          fast : 1
        })
      },
      /**
       * @param {Object} res
       * @return {undefined}
       */
      success(res) {
        if (console.log("upLoadVerifyPic success", res), 200 == res.statusCode) {
          if (res.data) {
            /** @type {*} */
            const svgElem = JSON.parse(res.data);
            if (svgElem.base_resp && 0 == svgElem.base_resp.errcode) {
              const failuresLink = svgElem.content;
              on(failuresLink);
            } else {
              text("\u63d0\u4ea4\u5931\u8d25", `e${svgElem.base_resp.errcode}`);
            }
          } else {
            text("\u63d0\u4ea4\u5931\u8d25", "no res data");
          }
        } else {
          text("\u63d0\u4ea4\u5931\u8d25", `s${res.statusCode}`);
        }
      },
      /**
       * @param {?} msg
       * @return {undefined}
       */
      fail(msg) {
        console.log("upLoadVerifyPic fail", msg);
        text("\u63d0\u4ea4\u5931\u8d25", "n1");
      },
      /**
       * @return {undefined}
       */
      complete() {
        isDocumentComplete();
      }
    });
  };
  /**
   * @param {Object} options
   * @return {?}
   */
  object.upLoadVerifySubmit = options => {
    const channel = self.default.sessionId || "";
    const isDocumentComplete = options.complete || (() => {
      console.log("upLoadVerifySubmit need complete func");
    });
    const compiled = options.succ || (() => {
      console.log("upLoadVerifySubmit need succ func");
    });
    /** @type {string} */
    const t = String(options.name);
    /** @type {string} */
    const keyName = String(options.mobile);
    /** @type {string} */
    const id = String(options.fileid);
    const is_async = Number.parseInt(options.is_async) || 0;
    if (!channel) {
      return console.log(`upLoadVerifySubmit need session_id\uff1a${channel}`), text("\u63d0\u4ea4\u5931\u8d25", "n0"), void isDocumentComplete();
    }
    const data = {
      base_req : {
        session_id : self.default.sessionId,
        fast : 1
      },
      name : t,
      phone_number : keyName,
      photo_id : id,
      is_async
    };
    wx.request({
      url : `${AJAX_URL.AJAX_URL}/wxagame/wxagame_appeal?action=submit`,
      method : "POST",
      data,
      /**
       * @param {Object} response
       * @return {undefined}
       */
      success(response) {
        if (200 === response.statusCode) {
          if (response.data && (response.data.base_resp && 0 === response.data.base_resp.errcode)) {
            compiled();
          } else {
            text("\u63d0\u4ea4\u5931\u8d25", `e${response.data.base_resp.errcode}`);
          }
        } else {
          text("\u63d0\u4ea4\u5931\u8d25", `s${response.statusCode}`);
        }
      },
      /**
       * @return {undefined}
       */
      fail() {
        text("\u63d0\u4ea4\u5931\u8d25", "n1");
      },
      /**
       * @return {undefined}
       */
      complete() {
        isDocumentComplete();
      }
    });
  };
  var self = toObject(require("../store/session"));
  const obj = toObject(require("../store/storage"));
  const config = require("../util/encryption");
  const Block = require("./../config");
  var AJAX_URL = (toObject(require("../lib/mue/eventcenter")), {
    AJAX_URL : "https://mp.weixin.qq.com"
  });
  const prototype = (() => {
    /**
     * @return {undefined}
     */
    function error() {
      stub(this, error);
    }
    return onErrorFnPrev(error, null, [{
      key : "onServerConfigForbid",
      /**
       * @param {?} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        this.emmitServerConfigForbid = thisValue;
      }
    }, {
      key : "getUserInfo",
      /**
       * @return {?}
       */
      value() {
        const successCallback = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : () => {
        };
        const task = {
          base_req : {
            session_id : self.default.sessionId,
            fast : 1
          }
        };
        return new Promise((onSuccess, errcb) => {
          wx.request({
            url : `${AJAX_URL.AJAX_URL}/wxagame/wxagame_getuserinfo`,
            method : "POST",
            data : task,
            /**
             * @param {Object} response
             * @return {undefined}
             */
            success(response) {
              if (200 === response.statusCode) {
                if (0 === response.data.base_resp.errcode) {
                  successCallback(response.data);
                  const props1 = {
                    nickname : response.data.nickname,
                    headimg : response.data.headimg,
                    open_id : response.data.open_id
                  };
                  obj.default.saveMyUserInfo(props1);
                  onSuccess(response.data);
                } else {
                  errcb();
                }
              } else {
                errcb();
              }
            },
            /**
             * @param {?} positionError
             * @return {undefined}
             */
            fail(positionError) {
              errcb();
            }
          });
        });
      }
    }, {
      key : "requestLogin",
      /**
       * @param {Function} emit
       * @return {undefined}
       */
      value(emit) {
        if (!emit) {
          /**
           * @return {undefined}
           */
          emit = () => {
          };
        }
        wx.login({
          /**
           * @param {Error} status
           * @return {undefined}
           */
          success(status) {
            if (status.code) {
              self.default.setLoginState(status.code);
              emit(true);
            } else {
              emit(false);
            }
          },
          /**
           * @param {?} positionError
           * @return {undefined}
           */
          fail(positionError) {
            emit(false);
          }
        });
      }
    }, {
      key : "requestFriendsScore",
      /**
       * @return {?}
       */
      value() {
        const callback = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : () => {
        };
        if (!self.default.serverConfig || self.default.serverConfig.friends_score_switch) {
          if (self.default.sessionId) {
            const task = {
              base_req : {
                session_id : self.default.sessionId,
                fast : 1
              }
            };
            return new Promise((onSuccess, failure) => {
              wx.request({
                url : `${AJAX_URL.AJAX_URL}/wxagame/wxagame_getfriendsscore`,
                method : "POST",
                data : task,
                /**
                 * @param {Object} response
                 * @return {undefined}
                 */
                success(response) {
                  if (200 === response.statusCode && 0 === response.data.base_resp.errcode) {
                    callback(true, response.data);
                    onSuccess(response.data);
                  } else {
                    if (callback) {
                      callback(false);
                    }
                  }
                },
                /**
                 * @param {?} positionError
                 * @return {undefined}
                 */
                fail(positionError) {
                  callback(false, false);
                  failure();
                }
              });
            });
          }
          callback(false);
        }
      }
    }, {
      key : "requestSettlement",
      /**
       * @return {undefined}
       */
      value() {
        const score = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
        const times = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        const fn = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : () => {
        };
        const generatedColumn = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
        if (self.default.sessionId) {
          const r20 = {
            score,
            times,
            game_data : JSON.stringify(generatedColumn)
          };
          const task = {
            base_req : {
              session_id : self.default.sessionId,
              fast : 1
            },
            action_data : (0, config.encrypt)(r20, self.default.sessionId)
          };
          wx.request({
            url : `${AJAX_URL.AJAX_URL}/wxagame/wxagame_settlement`,
            method : "POST",
            data : task,
            /**
             * @param {Object} response
             * @return {undefined}
             */
            success(response) {
              if (200 === response.statusCode) {
                if (0 === response.data.base_resp.errcode) {
                  const a = response.data.cheater_status || 0;
                  if (1 == (response.data.appeal_status || 0)) {
                    fn(true, {
                      banType : 2
                    }, response.data);
                  } else {
                    switch(a) {
                      case 1:
                        fn(true, {
                          banType : 3
                        }, response.data);
                        break;
                      case 2:
                        fn(true, {
                          banType : 1
                        }, response.data);
                        break;
                      default:
                        fn(true, {
                          banType : 0
                        }, response.data);
                    }
                  }
                } else {
                  fn(false, `e${response.data.base_resp.errcode}`);
                }
              } else {
                fn(false, `s${response.statusCode}`);
              }
            },
            /**
             * @param {?} positionError
             * @return {undefined}
             */
            fail(positionError) {
              fn(false, "n1");
            }
          });
        } else {
          fn(false, "n0");
        }
      }
    }, {
      key : "requestCreateGame",
      /**
       * @return {undefined}
       */
      value() {
        const err = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : () => {
        };
        if (!self.default.serverConfig || self.default.serverConfig.audience_mode_switch) {
          if (!self.default.sessionId) {
            this.reGetSessionId("requestCreateGame", err);
          }
          const task = {
            base_req : {
              session_id : self.default.sessionId,
              fast : 1
            }
          };
          wx.request({
            url : `${AJAX_URL.AJAX_URL}/wxagame/wxagame_creategame`,
            method : "POST",
            data : task,
            /**
             * @param {Object} message
             * @return {undefined}
             */
            success(message) {
              if (200 === message.statusCode && 0 === message.data.base_resp.errcode) {
                err(true, message);
              } else {
                err(false);
              }
            },
            /**
             * @param {?} positionError
             * @return {undefined}
             */
            fail(positionError) {
              err(false);
            }
          });
        } else {
          err(false, "\u5f53\u524d\u56f4\u89c2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5");
        }
      }
    }, {
      key : "reGetSessionId",
      /**
       * @param {?} i
       * @param {?} listener
       * @return {undefined}
       */
      value(i, listener) {
        const prevSources = this;
        obj.default.clearSessionId();
        this.requestLogin(dataAndEvents => {
          if (dataAndEvents) {
            if (listener) {
              prevSources[i](listener);
            } else {
              prevSources[i]();
            }
          } else {
            if (listener) {
              listener(false);
            }
          }
        });
      }
    }, {
      key : "requestInit",
      /**
       * @param {?} newValue
       * @return {undefined}
       */
      value(newValue) {
        if (self.default.sessionId) {
          if (self.default.serverConfig) {
            const ver = self.default.serverConfig.version;
            this.requestServerInit(ver, newValue);
          } else {
            this.requestServerInit(0, newValue);
          }
        }
      }
    }, {
      key : "requestServerInit",
      /**
       * @param {string} g
       * @return {undefined}
       */
      value(g) {
        const request = {
          base_req : {
            session_id : self.default.sessionId,
            fast : 1
          },
          version : g
        };
        wx.request({
          url : `${AJAX_URL.AJAX_URL}/wxagame/wxagame_init`,
          method : "POST",
          data : request,
          /**
           * @param {Object} res
           * @return {undefined}
           */
          success(res) {
            if (200 === res.statusCode) {
              if (0 === res.data.base_resp.errcode) {
                if (res.data.version > self.default.serverConfig.version || !self.default.serverConfig.version) {
                  self.default.setServerConfig(res.data);
                  obj.default.saveServerConfig(res.data);
                }
              }
            }
          },
          /**
           * @param {?} positionError
           * @return {undefined}
           */
          fail(positionError) {
          }
        });
      }
    }, {
      key : "requestMmpayBonus",
      /**
       * @return {undefined}
       */
      value() {
        const fn = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : () => {
        };
        if (self.default.sessionId) {
          const task = {
            base_req : {
              session_id : self.default.sessionId,
              fast : 1
            }
          };
          console.log("---------------request MMPAY");
          wx.request({
            url : `${AJAX_URL.AJAX_URL}/wxagame/wxagame_getuserstatus`,
            method : "POST",
            data : task,
            /**
             * @param {Object} response
             * @return {undefined}
             */
            success(response) {
              if (200 === response.statusCode) {
                if (response.data && 0 !== response.data.base_resp.errcode) {
                  fn(false, response);
                } else {
                  if (response.data) {
                    fn(true, response);
                  } else {
                    fn(false, response);
                  }
                }
              } else {
                fn(false, response);
              }
            },
            /**
             * @param {?} i
             * @return {undefined}
             */
            fail(i) {
              fn(false, i);
            }
          });
        } else {
          fn(false);
        }
      }
    }, {
      key : "getGroupScore",
      /**
       * @return {undefined}
       */
      value() {
        const fn = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : () => {
        };
        if (self.default.sessionId) {
          const task = {
            base_req : {
              session_id : self.default.sessionId,
              fast : 1,
              group_info : {
                share_ticket : self.default.shareTicket
              }
            }
          };
          wx.request({
            url : `${AJAX_URL.AJAX_URL}/wxagame/wxagame_getgrouprank`,
            method : "POST",
            data : task,
            /**
             * @param {Object} response
             * @return {undefined}
             */
            success(response) {
              if (200 === response.statusCode && 0 === response.data.base_resp.errcode) {
                fn(true, response);
              } else {
                fn(false);
              }
            },
            /**
             * @param {?} positionError
             * @return {undefined}
             */
            fail(positionError) {
              fn(false);
            }
          });
        } else {
          fn(false);
        }
      }
    }, {
      key : "createPK",
      /**
       * @param {number} i
       * @return {?}
       */
      value(i) {
        return new Promise((done, callback) => {
          if (self.default.sessionId) {
            wx.showLoading();
            const user = {
              base_req : {
                session_id : self.default.sessionId,
                fast : 1
              },
              score : i
            };
            wx.request({
              url : `${AJAX_URL.AJAX_URL}/wxagame/wxagame_createpk`,
              method : "POST",
              data : user,
              /**
               * @param {Object} response
               * @return {undefined}
               */
              success(response) {
                if (200 === response.statusCode && 0 === response.data.base_resp.errcode) {
                  self.default.setPkId(response.data.pk_id);
                  done();
                } else {
                  callback();
                }
              },
              /**
               * @param {?} positionError
               * @return {undefined}
               */
              fail(positionError) {
                callback();
              },
              /**
               * @return {undefined}
               */
              complete() {
                wx.hideLoading();
              }
            });
          } else {
            callback();
          }
        });
      }
    }, {
      key : "getBattleData",
      /**
       * @return {undefined}
       */
      value() {
        const fn = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : () => {
        };
        const iterable = arguments[1];
        if (self.default.sessionId && iterable) {
          const task = {
            base_req : {
              session_id : self.default.sessionId,
              fast : 1
            },
            pk_id : iterable
          };
          if (self.default.shareTicket) {
            task.base_req.group_info = {
              share_ticket : self.default.shareTicket
            };
          }
          wx.request({
            url : `${AJAX_URL.AJAX_URL}/wxagame/wxagame_getpkinfo`,
            method : "POST",
            data : task,
            /**
             * @param {Object} response
             * @return {undefined}
             */
            success(response) {
              if (200 === response.statusCode && 0 === response.data.base_resp.errcode) {
                fn(true, response);
              } else {
                fn(false);
              }
            },
            /**
             * @param {?} positionError
             * @return {undefined}
             */
            fail(positionError) {
              fn(false);
            }
          });
        } else {
          fn(false);
        }
      }
    }, {
      key : "updatepkinfo",
      /**
       * @return {undefined}
       */
      value() {
        const fn = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : () => {
        };
        const iterable = arguments[1];
        const thisp = arguments[2];
        if (self.default.sessionId && iterable) {
          const out = {
            base_req : {
              session_id : self.default.sessionId,
              fast : 1
            },
            pk_id : iterable,
            score : thisp
          };
          wx.request({
            url : `${AJAX_URL.AJAX_URL}/wxagame/wxagame_updatepkinfo`,
            method : "POST",
            data : out,
            /**
             * @param {Object} response
             * @return {undefined}
             */
            success(response) {
              if (200 === response.statusCode && 0 === response.data.base_resp.errcode) {
                fn(true, response);
              } else {
                fn(false);
              }
            },
            /**
             * @param {?} positionError
             * @return {undefined}
             */
            fail(positionError) {
              fn(false);
            }
          });
        } else {
          fn(false);
        }
      }
    }, {
      key : "quitGame",
      /**
       * @return {undefined}
       */
      value() {
        const fn = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : () => {
        };
        if (self.default.gameId || self.default.sessionId) {
          const task = {
            base_req : {
              session_id : self.default.sessionId,
              fast : 1
            },
            game_id : self.default.gameId
          };
          wx.request({
            url : `${AJAX_URL.AJAX_URL}/wxagame/wxagame_quitgame`,
            method : "POST",
            data : task,
            /**
             * @param {Object} response
             * @return {undefined}
             */
            success(response) {
              if (200 === response.statusCode && 0 === response.data.base_resp.errcode) {
                fn(true, response);
              } else {
                fn(false);
              }
            },
            /**
             * @param {?} positionError
             * @return {undefined}
             */
            fail(positionError) {
              fn(false);
            }
          });
        } else {
          fn(false);
        }
      }
    }, {
      key : "syncop",
      /**
       * @return {undefined}
       */
      value() {
        const fn = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : () => {
        };
        if (self.default.gameId || self.default.sessionId) {
          const task = {
            base_req : {
              session_id : self.default.sessionId,
              fast : 1
            },
            game_id : self.default.gameId
          };
          wx.request({
            url : `${AJAX_URL.AJAX_URL}/wxagame/wxagame_syncop`,
            method : "POST",
            data : task,
            /**
             * @param {Object} response
             * @return {undefined}
             */
            success(response) {
              if (200 === response.statusCode && 0 === response.data.base_resp.errcode) {
                fn(true, response);
              } else {
                fn(false);
              }
            },
            /**
             * @param {?} positionError
             * @return {undefined}
             */
            fail(positionError) {
              fn(false);
            }
          });
        } else {
          callback(false);
        }
      }
    }, {
      key : "sendReport",
      /**
       * @return {undefined}
       */
      value() {
        const report_list = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        const client_info = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (self.default.sessionId) {
          const task = {
            base_req : {
              session_id : self.default.sessionId,
              fast : 1,
              client_info
            },
            report_list
          };
          wx.request({
            url : `${AJAX_URL.AJAX_URL}/wxagame/wxagame_bottlereport`,
            method : "POST",
            data : task,
            /**
             * @param {?} textStatus
             * @return {undefined}
             */
            success(textStatus) {
            },
            /**
             * @return {undefined}
             */
            fail() {
            }
          });
        }
      }
    }, {
      key : "sendEggReport",
      /**
       * @param {?} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        if (self.default.sessionId) {
          const task = {
            base_req : {
              session_id : self.default.sessionId,
              fast : 1
            },
            egg_info_list : thisValue
          };
          wx.request({
            url : `${AJAX_URL.AJAX_URL}/wxagame/wxagame_eggreport`,
            method : "POST",
            data : task,
            /**
             * @param {?} status
             * @return {undefined}
             */
            success(status) {
              console.log("Network sendEggReport success", status);
            },
            /**
             * @return {undefined}
             */
            fail() {
              console.log("Network sendEggReport fail");
            }
          });
        }
      }
    }, {
      key : "badReport",
      /**
       * @param {string} type
       * @param {string} queue
       * @return {undefined}
       */
      value(type, queue) {
        const info = wx.getSystemInfoSync();
        const endpoint = self.default.sessionId || "";
        /** @type {string} */
        type = `nickName:${obj.default.getMyUserInfo().nickname},model:${info.model},SDKVersion:${info.SDKVersion},version:${info.version},subVersion:${Block.SUBVERSION},sessionId:${endpoint},errmsg:${type},stack:${queue}`;
        this.requestBadjs(130, type);
      }
    }, {
      key : "logReport",
      /**
       * @param {string} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        const info = wx.getSystemInfoSync();
        /** @type {string} */
        const r20 = (self.default.sessionId, `nickName:${obj.default.getMyUserInfo().nickname},model:${info.model},SDKVersion:${info.SDKVersion},version:${info.version},subVersion:${Block.SUBVERSION},logMsg:${thisValue}`);
        this.requestBadjs(150, r20);
      }
    }, {
      key : "requestBadjs",
      /**
       * @param {string} callbackId
       * @param {string} propertyName
       * @return {undefined}
       */
      value(callbackId, propertyName) {
        wx.request({
          url : "https://badjs.weixinbridge.com/badjs",
          data : {
            id : callbackId,
            level : 4,
            msg : `${propertyName}$`
          },
          /**
           * @param {?} textStatus
           * @return {undefined}
           */
          success(textStatus) {
          },
          /**
           * @param {?} positionError
           * @return {undefined}
           */
          fail(positionError) {
          }
        });
      }
    }, {
      key : "sendServerError",
      /**
       * @param {string} event
       * @return {undefined}
       */
      value(event) {
        if (self.default.sessionId) {
          const entry = {
            base_req : {
              session_id : self.default.sessionId,
              fast : 1
            },
            id : 3,
            key : event
          };
          wx.request({
            url : `${AJAX_URL.AJAX_URL}/wxagame/wxagame_jsreport`,
            method : "POST",
            data : entry,
            /**
             * @param {?} textStatus
             * @return {undefined}
             */
            success(textStatus) {
            },
            /**
             * @return {undefined}
             */
            fail() {
            }
          });
        }
      }
    }, {
      key : "createRouterId",
      /**
       * @return {undefined}
       */
      value() {
        const err = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : () => {
        };
        if (self.default.sessionId) {
          const task = {
            base_req : {
              session_id : self.default.sessionId,
              fast : 1
            }
          };
          wx.request({
            url : `${AJAX_URL.AJAX_URL}/wxagame/wxagame_allocrouteid`,
            method : "POST",
            data : task,
            /**
             * @param {Object} response
             * @return {undefined}
             */
            success(response) {
              if (200 === response.statusCode) {
                if (response.data && (response.data.base_resp && 0 === response.data.base_resp.errcode)) {
                  err(true, response.data.route_id);
                  console.log("Network createRouterId: ", response.data.route_id);
                } else {
                  err(false, `e${response.data.base_resp.errcode}`);
                }
              } else {
                err(false, `s${response.statusCode}`);
              }
            },
            /**
             * @param {?} positionError
             * @return {undefined}
             */
            fail(positionError) {
              err(false, "n1");
            }
          });
        } else {
          err(false, "n0");
        }
      }
    }, {
      key : "getWeeklyPlayBack",
      /**
       * @return {undefined}
       */
      value() {
        const fn = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : () => {
        };
        const iterable = arguments[1];
        if (self.default.sessionId && iterable) {
          const params = {
            base_req : {
              session_id : self.default.sessionId,
              fast : 1
            },
            action : "weekly_rank",
            playback_id : iterable
          };
          wx.request({
            url : `${AJAX_URL.AJAX_URL}/wxagame/wxagame_playback`,
            method : "POST",
            data : params,
            /**
             * @param {Object} response
             * @return {undefined}
             */
            success(response) {
              if (200 === response.statusCode) {
                if (response.data && 0 !== response.data.base_resp.errcode) {
                  fn(false, response);
                } else {
                  if (response.data && response.data.game_data) {
                    fn(true, JSON.parse(response.data.game_data));
                  } else {
                    fn(false, response);
                  }
                }
              } else {
                fn(false, response);
              }
            },
            /**
             * @param {?} i
             * @return {undefined}
             */
            fail(i) {
              fn(false, i);
            }
          });
        } else {
          fn(false);
        }
      }
    }]), error;
  })();
  object.default = prototype;
});
