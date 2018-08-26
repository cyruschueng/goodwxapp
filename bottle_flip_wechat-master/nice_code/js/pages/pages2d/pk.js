define("js/pages/pages2d/pk.js", (Event, dataAndEvents, global) => {
  /**
   * @param {Function} options
   * @return {?}
   */
  function getOptions(options) {
    return options && options.__esModule ? options : {
      /** @type {Function} */
      default : options
    };
  }
  /**
   * @param {Object} object
   * @return {undefined}
   */
  function iterate(object) {
    const data = object.self;
    object.list;
    data.sotedRankList = object.list;
    /** @type {number} */
    const innerOffsetHeight = data.sotedRankList.length * (0, self.cwh)(self.ListLineHeight) / self.Dpr;
    /** @type {number} */
    const outterOffsetHeight = (0, self.cwh)(194) / self.Dpr;
    data.scrollHandler = new obj.default({
      innerOffsetHeight,
      outterOffsetHeight,
      updatePosition : data.updatePosition.bind(data)
    });
    render(data, 0, "list1");
  }
  /**
   * @param {Object} data
   * @param {number} from
   * @param {string} type
   * @return {undefined}
   */
  function render(data, from, type) {
    if ("list1" == type) {
      data.imgid.list1++;
    } else {
      if ("list2" == type) {
        data.imgid.list2++;
      }
    }
    const values = data.sotedRankList.slice(from, from + 10);
    const ctx = data.context[type];
    if (ctx.clearRect(0, 0, self.WIDTH, 10 * (0, self.cwh)(self.ListLineHeight)), ctx.fillStyle = "white", ctx.textBaseline = "middle", ctx.fillRect(0, 0, self.WIDTH, 10 * (0, self.cwh)(self.ListLineHeight)), 0 == from || 0 != values.length) {
      if (!(from < 0)) {
        const valuesLen = values.length;
        /** @type {number} */
        let i = 0;
        for (;i < valuesLen;i++) {
          !(() => {
            /** @type {number} */
            const wy = (i + 0.5) * self.ListLineHeight;
            const pY = i + 1 + from;
            /** @type {string} */
            let lc = "";
            /** @type {string} */
            lc = 1 == pY ? "rgb(250,126,0)" : 2 == pY ? "rgb(254,193,30)" : 3 == pY ? "rgb(251,212,19)" : "#aaa";
            (0, self.drawText)({
              self : data,
              bold : true,
              italic : true,
              size : 17,
              t : pY,
              pos : [58.5, wy],
              type,
              color : lc
            });
            values[i].grade;
            (0, self.drawImageCenter)({
              self : data,
              src : values[i].headimg,
              pos : [107, wy, 34, 34],
              type,
              /**
               * @return {undefined}
               */
              cb() {
                (0, self.drawImageCenter)({
                  self : data,
                  src : "res/2d/ava_square.png",
                  pos : [107, wy, 37, 37],
                  type,
                  imgid : data.imgid[type]
                });
              },
              round : true,
              imgid : data.imgid[type],
              noupdate : true
            });
            (0, self.drawText)({
              self : data,
              align : "left",
              color : "#000",
              size : 17,
              bold : true,
              t : (0, self.cname)(values[i].nickname, 14),
              pos : [144, wy - 10],
              type
            });
            if (values[i].score_info[0].score > data.opt.organizerInfo.score_info[0].score) {
              (0, self.drawText)({
                self : data,
                color : "#FC4814",
                size : 12,
                t : "\u6311\u6218\u6210\u529f",
                pos : [144, wy + 12],
                type,
                align : "left"
              });
            } else {
              (0, self.drawText)({
                self : data,
                color : "#888",
                size : 12,
                t : "\u6311\u6218\u5931\u8d25",
                pos : [144, wy + 12],
                type,
                align : "left"
              });
            }
            (0, self.drawText)({
              self : data,
              color : "#888",
              size : 22,
              special : true,
              t : values[i].score_info[0].score || 0,
              pos : [364, wy],
              type,
              align : "right"
            });
          })();
        }
        if (0 == valuesLen) {
          (0, self.drawText)({
            self : data,
            color : "#ccc",
            size : 14,
            t : "\u6682\u65e0\u4eba\u5e94\u6218",
            pos : [207, 100],
            type
          });
        }
        (0, self.updatePlane)({
          self : data,
          type
        });
      }
    } else {
      (0, self.updatePlane)({
        self : data,
        type
      });
    }
  }
  /**
   * @param {?} finished
   * @param {?} patch
   * @param {?} phases
   * @return {?}
   */
  function phase(finished, patch, phases) {
    return 1 === finished.is_self;
  }
  Object.defineProperty(global, "__esModule", {
    value : true
  });
  /**
   * @param {Object} me
   * @return {undefined}
   */
  global.drawPkPage = me => {
    const data = me.self;
    (0, self.routeCanvas)(data, "pk");
    (0, self.createPlane)(data);
    (0, self.updateClip)({
      self : data
    });
    data.myidx = data.opt.pkListInfo.findIndex(phase) + 1;
    data.myUserInfo = data.opt.pkListInfo[data.myidx - 1] || (opts.default.getMyUserInfo() || {
      headimg : "",
      nickname : "",
      week_best_score : 0,
      score_info : [{
        score : 0
      }]
    });
    iterate({
      self : data,
      list : data.opt.pkListInfo
    });
    const ctx = data.context.bg;
    if (ctx.clearRect(0, 0, self.WIDTH, self.HEIGHT), ctx.fillStyle = "rgba(0,0,0, 0.8)", ctx.fillRect(0, 0, (self.WIDTH - (0, self.cwh)(354)) / 2, self.HEIGHT), ctx.fillRect((0, self.cx)(384), 0, (self.WIDTH - (0, self.cwh)(354)) / 2, self.HEIGHT), ctx.fillRect((0, self.cx)(30), 0, (0, self.cwh)(354), (0, self.cy)(110)), ctx.fillRect((0, self.cx)(30), (0, self.cy)(632), (0, self.cwh)(354), (0, self.cy)(144)), ctx.fillStyle = "rgb(250,250,250)", ctx.fillRect((0, self.cx)(31), (0, self.cy)(103), (0, 
    self.cwh)(354), (0, self.cwh)(335)), ctx.lineWidth = 2 * self.Dpr, ctx.strokeStyle = "#fff", (0, self.roundedRect)((0, self.cx)(30), (0, self.cy)(102), (0, self.cwh)(354), (0, self.cwh)(530), 1 * self.Dpr, ctx), void 0 == data.opt.gg_score) {
      (0, self.drawImageCenter)({
        self : data,
        src : data.opt.organizerInfo.headimg,
        pos : [207, 158, 50, 50],
        type : "bg",
        imgid : data.imgid.bg
      });
      (0, self.drawText)({
        self : data,
        t : data.opt.organizerInfo.nickname,
        color : "rgba(0,0,0,0.8)",
        size : 14,
        pos : [207, 195]
      });
      (0, self.drawText)({
        self : data,
        t : "\u64c2\u4e3b\u5f97\u5206",
        color : "rgba(0,0,0,0.8)",
        size : 14,
        pos : [207, 242]
      });
      /** @type {number} */
      ctx.lineWidth = 0.5 * self.Dpr;
      /** @type {string} */
      ctx.strokeStyle = "rgba(0,0,0,0.06)";
      ctx.beginPath();
      ctx.moveTo((0, self.cx)(160), (0, self.cy)(217));
      ctx.lineTo((0, self.cx)(254), (0, self.cy)(217));
      ctx.closePath();
      ctx.stroke();
      /** @type {string} */
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect((0, self.cx)(162), (0, self.cy)(239), (0, self.cwh)(9), (0, self.cwh)(3));
      ctx.fillRect((0, self.cx)(162), (0, self.cy)(244), (0, self.cwh)(9), (0, self.cwh)(3));
      ctx.fillRect((0, self.cx)(241), (0, self.cy)(239), (0, self.cwh)(9), (0, self.cwh)(3));
      ctx.fillRect((0, self.cx)(241), (0, self.cy)(244), (0, self.cwh)(9), (0, self.cwh)(3));
      (0, self.drawText)({
        self : data,
        t : data.opt.organizerInfo.score_info[0].score,
        color : "#000",
        size : 66,
        pos : [207, 298],
        special : true
      });
    } else {
      let srcTerminal = void 0;
      let pY = void 0;
      let lc = void 0;
      let axisColor = void 0;
      if (data.opt.gg_score > data.opt.organizerInfo.score_info[0].score) {
        /** @type {string} */
        srcTerminal = "res/suc.png";
        /** @type {string} */
        pY = "\u6311\u6218\u6210\u529f";
        /** @type {string} */
        lc = "rgba(0,0,0,1)";
        /** @type {string} */
        axisColor = "rgba(0,0,0,0.3)";
        (0, self.drawImageCenter)({
          self : data,
          src : "res/flower_small.png",
          pos : [207, 175, 140, 53],
          type : "bg",
          imgis : data.imgid.bg
        });
      } else {
        /** @type {string} */
        srcTerminal = "res/fail.png";
        /** @type {string} */
        pY = "\u6311\u6218\u5931\u8d25";
        /** @type {string} */
        lc = "rgba(0,0,0,0.3)";
        /** @type {string} */
        axisColor = "rgba(0,0,0,1)";
      }
      (0, self.drawImageCenter)({
        self : data,
        src : srcTerminal,
        pos : [207, 135, 20, 15],
        type : "bg",
        imgid : data.imgid.bg
      });
      (0, self.drawText)({
        self : data,
        color : "#000",
        bold : true,
        size : 30,
        t : pY,
        pos : [207, 178]
      });
      (0, self.drawImageCenter)({
        self : data,
        src : data.myUserInfo.headimg,
        pos : [158, 289, 26, 26],
        type : "bg",
        imgid : data.imgid.bg
      });
      (0, self.drawImageCenter)({
        self : data,
        src : data.opt.organizerInfo.headimg,
        pos : [260, 289, 26, 26],
        type : "bg",
        imgid : data.imgid.bg
      });
      (0, self.drawText)({
        self : data,
        color : "rgba(0,0,0,0.8)",
        size : 11,
        t : (0, self.cname)(data.myUserInfo.nickname),
        pos : [158, 318]
      });
      (0, self.drawText)({
        self : data,
        color : "rgba(0,0,0,0.8)",
        size : 11,
        t : (0, self.cname)(data.opt.organizerInfo.nickname),
        pos : [260, 318]
      });
      if (data.opt.gg_score > 999) {
        (0, self.drawText)({
          self : data,
          color : lc,
          size : 44,
          special : true,
          t : data.opt.gg_score,
          align : "right",
          pos : [190, 253]
        });
      } else {
        (0, self.drawText)({
          self : data,
          color : lc,
          size : 44,
          special : true,
          t : data.opt.gg_score,
          align : "center",
          pos : [158, 253]
        });
      }
      /** @type {string} */
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.fillRect((0, self.cx)(202), (0, self.cy)(242), (0, self.cwh)(10), (0, self.cwh)(4));
      if (data.opt.organizerInfo.score_info[0].score > 999) {
        (0, self.drawText)({
          self : data,
          color : axisColor,
          size : 44,
          special : true,
          t : data.opt.organizerInfo.score_info[0].score,
          align : "left",
          pos : [231, 253]
        });
      } else {
        (0, self.drawText)({
          self : data,
          color : axisColor,
          size : 44,
          special : true,
          t : data.opt.organizerInfo.score_info[0].score,
          pos : [260, 253]
        });
      }
    }
    /** @type {string} */
    ctx.strokeStyle = "rgba(0,0,0,0.06)";
    /** @type {number} */
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo((0, self.cx)(30), (0, self.cy)(437));
    ctx.lineTo((0, self.cx)(384), (0, self.cy)(437));
    ctx.stroke();
    ctx.closePath();
    /** @type {string} */
    let time = "\u6311\u6218";
    if (data.opt.organizerInfo.left_time > 0 && 0 == data.opt.organizerInfo.is_self) {
      if (data.myidx > 0) {
        /** @type {string} */
        time = "\u518d\u6b21\u6311\u6218";
      }
      (0, self.drawImageCenter)({
        self : data,
        src : "res/btn_bg_g.png",
        pos : [207, 368, 130, 63],
        type : "bg",
        /**
         * @return {undefined}
         */
        cb() {
          (0, self.drawText)({
            self : data,
            size : 14,
            t : time,
            pos : [207, 368]
          });
          (0, self.updatePlane)({
            self : data,
            type : "bg"
          });
        },
        imgid : data.imgid.bg
      });
      (0, self.drawText)({
        self : data,
        size : 12,
        align : "right",
        color : "#000",
        t : "\u6709\u6548\u65f6\u95f4\u81f3",
        pos : [223, 403.5]
      });
      /** @type {number} */
      year = (newDate = +new Date) + 1E3 * data.opt.organizerInfo.left_time;
      /** @type {(number|string)} */
      hour = (hour = (newDate = new Date(year)).getHours()) < 10 ? `0${hour}` : hour;
      /** @type {(number|string)} */
      min = (min = newDate.getMinutes()) < 10 ? `0${min}` : min;
      (0, self.drawText)({
        self : data,
        size : 12,
        align : "left",
        color : "#fc4814",
        t : `${hour}:${min}`,
        pos : [225, 403.5]
      });
    } else {
      if (0 == data.opt.organizerInfo.left_time && 0 == data.opt.organizerInfo.is_self) {
        (0, self.drawImageCenter)({
          self : data,
          src : "res/btn_bg_h.png",
          pos : [207, 368, 130, 63],
          type : "bg",
          /**
           * @return {undefined}
           */
          cb() {
            (0, self.drawText)({
              self : data,
              size : 14,
              color : "rgba(0,0,0,0.3)",
              t : "\u6311\u6218\u7ed3\u675f",
              pos : [207, 368]
            });
            (0, self.updatePlane)({
              self : data,
              type : "bg"
            });
          },
          imgid : data.imgid.bg
        });
        (0, self.drawText)({
          self : data,
          size : 14,
          color : "#888",
          t : "\u5df2\u5931\u6548",
          pos : [207, 403.5]
        });
      } else {
        if (data.opt.organizerInfo.left_time > 0 && 1 == data.opt.organizerInfo.is_self) {
          (0, self.drawText)({
            self : data,
            size : 14,
            align : "right",
            color : "#888",
            t : "\u6709\u6548\u65f6\u95f4\u81f3",
            pos : [223, 369]
          });
          /** @type {string} */
          ctx.textAlign = "left";
          /** @type {string} */
          ctx.fillStyle = "#2c9f67";
          /** @type {number} */
          var newDate = +new Date;
          /** @type {number} */
          var year = newDate + 1E3 * data.opt.organizerInfo.left_time;
          /** @type {number} */
          var hour = (newDate = new Date(year)).getHours();
          /** @type {(number|string)} */
          hour = hour < 10 ? `0${hour}` : hour;
          /** @type {number} */
          var min = newDate.getMinutes();
          /** @type {(number|string)} */
          min = min < 10 ? `0${min}` : min;
          (0, self.drawText)({
            self : data,
            size : 14,
            align : "left",
            color : "#2c9f67",
            t : `${hour}:${min}`,
            pos : [225, 369]
          });
        }
      }
    }
    (0, self.drawText)({
      self : data,
      size : 17,
      t : "\u4e0d\u6311\u6218\uff0c\u76f4\u63a5\u5f00\u59cb",
      pos : [199, 688]
    });
    (0, self.drawImageCenter)({
      self : data,
      src : "res/r_arr.png",
      pos : [280, 688, 6.5, 12.5],
      type : "bg",
      imgid : data.imgid.bg
    });
    (0, self.updatePlane)({
      self : data,
      type : "bg"
    });
  };
  /** @type {function (Object, number, string): undefined} */
  global.drawPkList = render;
  var self = Event("./base");
  var opts = getOptions(Event("../../store/storage"));
  var obj = getOptions(Event("../../scroll/scrollHandler"));
});
