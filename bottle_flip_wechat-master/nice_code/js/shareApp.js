define("js/shareApp.js", ($sanitize, dataAndEvents, ctx) => {
  /**
   * @param {Function} options
   * @return {?}
   */
  function toObject(options) {
    return options && options.__esModule ? options : {
      /** @type {Function} */
      default : options
    };
  }
  Object.defineProperty(ctx, "__esModule", {
    value : true
  });
  /**
   * @return {undefined}
   */
  ctx.shareGroupRank = function() {
    const errcb = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : () => {
    };
    wx.getNetworkType({
      /**
       * @param {?} textStatus
       * @return {undefined}
       */
      success(textStatus) {
        if ("none" !== textStatus.networkType) {
          wx.updateShareMenu({
            withShareTicket : true,
            /**
             * @return {undefined}
             */
            success() {
              wx.shareAppMessage({
                title : "\u7fa4\u96c4\u9010\u9e7f\uff0c\u770b\u770b\u4f60\u7b2c\u51e0",
                query : "mode=groupShare",
                imageUrl : "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNQ0ia79enzYJBrAavqMRykpovYxSA9RRTwIjde6a68ZCczLMBBd8eSoOyTRyp2Codc5IObdeqZVFyw/0?wx_fmt=png",
                /**
                 * @param {?} textStatus
                 * @return {undefined}
                 */
                success(textStatus) {
                  errcb(true, 1);
                },
                /**
                 * @param {?} positionError
                 * @return {undefined}
                 */
                fail(positionError) {
                  errcb(false);
                }
              });
            }
          });
        } else {
          errcb(false);
          wx.showModal({
            title : "\u63d0\u793a",
            content : "\u7f51\u7edc\u72b6\u6001\u5f02\u5e38",
            showCancel : false
          });
        }
      }
    });
  };
  /**
   * @param {string} value
   * @param {number} score
   * @return {undefined}
   */
  ctx.shareBattle = function(value, score) {
    const errcb = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : () => {
    };
    results.getShareCard({
      score,
      type : "shareBattle"
    }, dataAndEvents => {
      /** @type {string} */
      let imageUrl = "";
      try {
        imageUrl = dataAndEvents.toTempFilePathSync();
      } catch (matches) {
        console.log("shareBattle: ", matches);
      }
      if (value) {
        wx.updateShareMenu({
          withShareTicket : true,
          /**
           * @return {undefined}
           */
          success() {
            wx.shareAppMessage({
              title : "\u5c0f\u8bd5\u725b\u5200\uff0c\u4e0d\u670d\u6765\u6218",
              query : `mode=battle&pkId=${value}`,
              imageUrl,
              /**
               * @param {?} textStatus
               * @return {undefined}
               */
              success(textStatus) {
                errcb(true, 1);
                console.log(`mode=battle&pkId=${value}`);
              },
              /**
               * @return {undefined}
               */
              fail() {
                errcb(false);
              }
            });
          },
          /**
           * @param {?} positionError
           * @return {undefined}
           */
          fail(positionError) {
            errcb(false);
          }
        });
      }
    });
  };
  /**
   * @return {undefined}
   */
  ctx.shareObserve = function() {
    const errcb = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : () => {
    };
    let user = object.default.getMyUserInfo();
    if (!user) {
      user = {
        nickname : "",
        headimg : ""
      };
    }
    console.log("query: ", `gameId=${self.default.gameId}&mode=observe&nickName=${user.nickname}&headimg=${user.headimg}`);
    wx.updateShareMenu({
      withShareTicket : true,
      /**
       * @return {undefined}
       */
      success() {
        wx.shareAppMessage({
          title : "\u5373\u523b\u8d77\u8df3\uff0c\u901f\u6765\u56f4\u89c2",
          query : `gameId=${self.default.gameId}&mode=observe&nickName=${user.nickname}&headimg=${user.headimg}`,
          imageUrl : "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNQ0ia79enzYJBiaBtXsYrvBsYBdBdDtKE7y638J84JKPckcOtFMp4QunIWFGc7pibQLm13s9fKZ9ic9ew/0?wx_fmt=png",
          /**
           * @param {?} textStatus
           * @return {undefined}
           */
          success(textStatus) {
            errcb(true, 1);
          },
          /**
           * @param {?} positionError
           * @return {undefined}
           */
          fail(positionError) {
            errcb(false);
          }
        });
      },
      /**
       * @return {undefined}
       */
      fail() {
        errcb(false);
      }
    });
  };
  /**
   * @param {string} paramType
   * @param {number} score
   * @return {undefined}
   */
  ctx.pureShare = (paramType, score) => {
    results.getShareCard({
      type : paramType,
      score
    }, dataAndEvents => {
      /** @type {string} */
      let imageUrl = "";
      try {
        imageUrl = dataAndEvents.toTempFilePathSync();
      } catch (matches) {
        console.log("pureShare: ", matches);
      }
      /** @type {string} */
      let _title = "";
      /** @type {string} */
      _title = "rank" == paramType ? "\u8df3\u904d\u5929\u4e0b\uff0c\u5df2\u65e0\u654c\u624b" : "\u4e0d\u597d\u610f\u601d\uff0c\u53c8\u7834\u7eaa\u5f55\u4e86";
      wx.shareAppMessage({
        title : _title,
        imageUrl,
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
    });
  };
  /**
   * @param {Object} data
   * @return {undefined}
   */
  ctx.ShareRelayCard = data => {
    const b = data.room_id;
    const c = data.router_id;
    const d = data.version;
    const format = data.cb;
    if (b && (c && d)) {
      /** @type {string} */
      const fmt = `room_id=${b}&mode=relay&router_id=${encodeURIComponent(c)}&version=${d}`;
      console.log(fmt);
      wx.updateShareMenu({
        withShareTicket : true,
        /**
         * @return {undefined}
         */
        success() {
          wx.shareAppMessage({
            title : "\u623f\u5df2\u5f00\u597d\uff0c\u5c31\u5dee\u4f60\u4e86\uff01",
            query : fmt,
            imageUrl : "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJN1hYNSmzE0JHB0FicpvibX9tgX8mb3MxbrtpgVxR9ZJaez7Uys56ckP57EU9ib1365Ng/0?wx_fmt=png",
            /**
             * @param {?} textStatus
             * @return {undefined}
             */
            success(textStatus) {
              /** @type {string} */
              let optsData = "";
              if (textStatus.shareTickets) {
                optsData = textStatus.shareTickets[0];
              }
              wx.getShareInfo({
                shareTicket : optsData,
                /**
                 * @param {Object} options
                 * @return {undefined}
                 */
                success(options) {
                  format(fmt, options.rawData);
                }
              });
            },
            /**
             * @param {?} positionError
             * @return {undefined}
             */
            fail(positionError) {
            }
          });
        },
        /**
         * @return {undefined}
         */
        fail() {
          format(false);
        }
      });
    } else {
      console.log("shareRelay", b, c, d);
    }
  };
  var self = toObject($sanitize("./store/session"));
  var object = toObject($sanitize("./store/storage"));
  var results = new (toObject($sanitize("./pages/shareCard")).default)({});
});
