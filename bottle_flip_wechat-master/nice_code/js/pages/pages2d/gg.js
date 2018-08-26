define("js/pages/pages2d/gg.js", (require, dataAndEvents, inst) => {
  /**
   * @param {Object} data
   * @return {undefined}
   */
  function update(data) {
    data.imgid.bg++;
    const o = data.opt;
    o.score = o.score || 0;
    o.highest_score = o.highest_score || 0;
    o.banType = o.banType || 0;
    const ctx = data.context.bg;
    ctx.clearRect(0, 0, self.WIDTH, self.HEIGHT);
    /** @type {string} */
    ctx.fillStyle = "rgba(0,0,0, 0.8)";
    ctx.fillRect(0, 0, self.WIDTH, self.HEIGHT);
    (0, self.drawHomeImg)(ctx, data);
    /** @type {number} */
    let a = 0;
    if (o.banType) {
      /** @type {number} */
      a = 69;
    } else {
      (0, self.drawImageCenter)({
        self : data,
        src : "res/btn.png",
        pos : [207, 214, 86, 32],
        type : "bg",
        imgid : data.imgid.bg
      });
      (0, self.drawText)({
        self : data,
        size : 13,
        t : "\u53d1\u8d77\u6311\u6218",
        pos : [207, 214]
      });
    }
    (0, self.drawText)({
      self : data,
      size : 14,
      t : "\u672c\u6b21\u5f97\u5206",
      pos : [207, 84 + a]
    });
    (0, self.drawText)({
      self : data,
      size : 88,
      special : true,
      t : o.score,
      pos : [212, 150 + a]
    });
    /** @type {string} */
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.fillRect((0, self.cx)(162), (0, self.cy)(78 + a), (0, self.cwh)(9), (0, self.cwh)(3));
    ctx.fillRect((0, self.cx)(162), (0, self.cy)(84 + a), (0, self.cwh)(9), (0, self.cwh)(3));
    ctx.fillRect((0, self.cx)(241), (0, self.cy)(78 + a), (0, self.cwh)(9), (0, self.cwh)(3));
    ctx.fillRect((0, self.cx)(241), (0, self.cy)(84 + a), (0, self.cwh)(9), (0, self.cwh)(3));
    /** @type {boolean} */
    let i = false;
    if ((o.game_cnt > 5 || o.score > 5) && (o.score < o.highest_score && (1 != data.myidx && (!data._has_show_tired && (+new Date / 1E3 - o.start_time > 1800 && (i = true, data._has_show_tired = true))))), i) {
      /** @type {number} */
      ctx.lineWidth = 4 * self.Dpr;
      /** @type {string} */
      ctx.strokeStyle = "#fff";
      /** @type {string} */
      ctx.fillStyle = "#fff";
      (0, self.roundedRect)((0, self.cx)(31), (0, self.cy)(298), (0, self.cwh)(354), (0, self.cwh)(210), 1 * self.Dpr, ctx);
      ctx.fill();
      (0, self.drawText)({
        self : data,
        t : "\u73a9\u4e86\u8fd9\u4e48\u4e45",
        pos : [80, 370],
        size : 17,
        color : "black",
        align : "left"
      });
      (0, self.drawText)({
        self : data,
        t : "\u4f11\u606f\u4e00\u4e0b\u5427",
        pos : [80, 410],
        size : 17,
        color : "black",
        align : "left"
      });
      (0, self.drawImageCenter)({
        self : data,
        src : "res/tired.png",
        pos : [297, 397, 179, 185],
        type : "bg",
        imgid : data.imgid.bg
      });
      /** @type {string} */
      data.opt.type = "tired";
    } else {
      if (o.banType) {
        (0, self.drawText)({
          self : data,
          t : "\u6e38\u620f\u4e2d\u5b58\u5728\u53ef\u7591\u64cd\u4f5c\uff0c\u8be5\u5206\u6570",
          pos : [207, 373],
          size : 17
        });
        (0, self.drawText)({
          self : data,
          t : "\u5c06\u4e0d\u5728\u6392\u884c\u699c\u4e2d\u663e\u793a",
          pos : [207, 399],
          size : 17
        });
        ctx.beginPath();
        /** @type {number} */
        ctx.lineWidth = 0.5 * self.Dpr;
        /** @type {string} */
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.moveTo((0, self.cx)(0), (0, self.cy)(296));
        ctx.lineTo((0, self.cx)(414), (0, self.cy)(296));
        ctx.moveTo((0, self.cx)(0), (0, self.cy)(526));
        ctx.lineTo((0, self.cx)(414), (0, self.cy)(526));
        ctx.stroke();
        ctx.closePath();
        if (1 == o.banType) {
          (0, self.drawImageCenter)({
            self : data,
            src : "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJNNcIVa8Pr2VajbZ52iaZX9Vlib0QAKEJGDIV8F9iaFeqXoawUbQkDP8zc6fbm95nKLgw/0?wx_fmt=png",
            pos : [207, 459, 138, 44],
            type : "bg",
            imgid : data.imgid.bg
          });
          (0, self.drawText)({
            self : data,
            t : "\u6211\u8981\u7533\u8bc9",
            pos : [207, 459],
            size : 17
          });
        }
      } else {
        /** @type {number} */
        ctx.lineWidth = 0.5 * self.Dpr;
        /** @type {string} */
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        /** @type {string} */
        ctx.strokeStyle = "rgba(255,255,255,0.3)";
        (0, self.roundedRect)((0, self.cx)(30), (0, self.cy)(297), (0, self.cwh)(354), (0, self.cwh)(192), 4 * self.Dpr, ctx);
        ctx.fill();
        /** @type {string} */
        ctx.fillStyle = "rgba(255,255,255,0.06)";
        ctx.fillRect((0, self.cx)(150), (0, self.cy)(336), (0, self.cwh)(115), (0, self.cwh)(153));
        ctx.beginPath();
        /** @type {number} */
        ctx.lineWidth = 0.5 * self.Dpr;
        /** @type {string} */
        ctx.strokeStyle = "rgba(255,255,255,0.4)";
        ctx.moveTo((0, self.cx)(30), (0, self.cy)(336));
        ctx.lineTo((0, self.cx)(384), (0, self.cy)(336));
        ctx.stroke();
        ctx.closePath();
        (0, self.drawText)({
          self : data,
          t : "\u6392\u884c\u699c \u00b7 \u6bcf\u5468\u4e00\u51cc\u6668\u5237\u65b0",
          color : "rgba(255,255,255,0.6)",
          align : "left",
          size : 12,
          pos : [46, 316]
        });
        (0, self.drawText)({
          self : data,
          t : "\u67e5\u770b\u5168\u90e8\u6392\u884c",
          align : "left",
          size : 12,
          pos : [291, 316]
        });
        (0, self.drawImageCenter)({
          self : data,
          src : "res/r_arr.png",
          pos : [371, 315, 6.6, 10],
          type : "bg",
          imgid : data.imgid.bg
        });
        /** @type {number} */
        let translateOpen = data.myidx - 2;
        /** @type {number} */
        let removeCount = 0;
        if (1 == data.sotedRankList.length) {
          /** @type {number} */
          removeCount = 1;
        }
        /** @type {number} */
        let pos = 0;
        for (;pos < 3;pos++) {
          if (1 == data.myidx && (0 == pos && translateOpen++), data.myidx != data.sotedRankList.length || 2 != pos) {
            /** @type {string} */
            let lc = "";
            /** @type {string} */
            lc = data.myidx == translateOpen + 1 + pos ? "#41bf8c" : "#888";
            if (data.sotedRankList[translateOpen + pos]) {
              ((() => {
                (0, self.drawText)({
                  self : data,
                  color : lc,
                  italic : true,
                  bold : true,
                  size : 16,
                  t : translateOpen + 1 + pos,
                  pos : [90 + 118 * (pos + removeCount), 356]
                });
                (0, self.drawText)({
                  self : data,
                  color : "#888",
                  t : (0, self.cname)(data.sotedRankList[translateOpen + pos].nickname, 14),
                  pos : [90 + 118 * (pos + removeCount), 435],
                  size : 14
                });
                (0, self.drawText)({
                  self : data,
                  size : 22,
                  special : true,
                  t : data.sotedRankList[translateOpen + pos].week_best_score || 0,
                  pos : [90 + 118 * (pos + removeCount), 463]
                });
                /** @type {number} */
                const x = 90 + 118 * (pos + removeCount);
                (0, self.drawImageCenter)({
                  self : data,
                  round : true,
                  src : data.sotedRankList[translateOpen + pos].headimg,
                  pos : [x, 393, 42, 42],
                  type : "bg",
                  /**
                   * @return {undefined}
                   */
                  cb() {
                    (0, self.drawImageCenter)({
                      self : data,
                      src : "res/ava_rank.png",
                      pos : [x, 393, 58, 58],
                      type : "bg",
                      imgid : data.imgid.bg
                    });
                  },
                  imgid : data.imgid.bg,
                  noupdate : true
                });
              }))();
            }
          }
        }
      }
    }
    let canvas = data.context.btn;
    canvas.clearRect(0, 0, self.WIDTH, self.HEIGHT);
    if (i) {
      (0, self.drawImageCenter)({
        self : data,
        src : "res/noplay.png",
        pos : [207, 607, 212, 84],
        type : "btn",
        /**
         * @return {undefined}
         */
        cb() {
          /** @type {number} */
          data.noplay_time = 5;
          (0, self.drawText)({
            self : data,
            type : "btn",
            color : "#00C777",
            size : 22,
            t : data.noplay_time,
            pos : [140, 607]
          });
          (0, self.updatePlane)({
            self : data,
            type : "btn"
          });
          /** @type {number} */
          data.timer = setInterval(() => {
            data.noplay_time--;
            if (data.noplay_time <= 0) {
              clearInterval(data.timer);
              canvas.clearRect(0, 0, self.WIDTH, self.HEIGHT);
              (0, self.drawImageCenter)({
                self : data,
                src : "res/replay.png",
                pos : [207, 607, 212, 84],
                type : "btn",
                imgid : data.imgid.btn
              });
            } else {
              /** @type {string} */
              canvas.fillStyle = "white";
              canvas.fillRect((0, self.cx)(125), (0, self.cy)(590), (0, self.cwh)(30), (0, self.cwh)(30));
              (0, self.drawText)({
                self : data,
                color : "#00C777",
                size : 22,
                t : data.noplay_time,
                pos : [140, 607],
                type : "btn"
              });
              (0, self.updatePlane)({
                self : data,
                type : "btn"
              });
            }
          }, 1E3);
        },
        imgid : data.imgid.btn
      });
    } else {
      (canvas = data.context.btn).clearRect((0, self.cx)(91), (0, self.cy)(547), (0, self.cwh)(232), (0, self.cwh)(94));
      (0, self.drawImageCenter)({
        self : data,
        src : "res/replay.png",
        pos : [207, 607, 212, 84],
        type : "btn",
        imgid : data.imgid.btn
      });
    }
    (0, self.drawText)({
      self : data,
      t : `\u5386\u53f2\u6700\u9ad8\u5206\uff1a${Math.max(o.highest_score, o.score)}`,
      size : 14,
      pos : [207, 703]
    });
    (0, self.updatePlane)({
      self : data,
      type : "bg"
    });
  }
  Object.defineProperty(inst, "__esModule", {
    value : true
  });
  /**
   * @param {Object} data
   * @param {Function} dataAndEvents
   * @return {undefined}
   */
  inst.routeGameOver = (data, dataAndEvents) => {
    (0, self.createPlane)(data);
    const player = data.opt;
    data.myUserInfo = obj.default.getMyUserInfo() || {
      headimg : "",
      nickname : "",
      week_best_score : 0,
      score_info : [{
        score : 0
      }]
    };
    data.myUserInfo.last_week_best_score = player.week_best_score;
    /** @type {number} */
    data.myUserInfo.week_best_score = Math.max(player.week_best_score, player.score) || 0;
    const matched = obj.default.getFriendsScore() || [];
    matched.push(data.myUserInfo);
    const script = (0, self.rerank)(matched);
    if (data.sotedRankList = script, data.myidx = script.findIndex(self.findSelfIndex.bind(data)) + 1, player.score >= player.highest_score || player.score >= data.myUserInfo.last_week_best_score) {
      (obj.default.getMyUserInfo() || {
        headimg : "",
        nickname : "",
        week_best_score : 0,
        score_info : [{
          score : 0
        }]
      }).week_best_score = player.score;
      const codeSegments = obj.default.getFriendsScore() || [];
      /** @type {Array} */
      data.changlleList = [];
      /** @type {number} */
      let i = 0;
      for (;i < codeSegments.length;i++) {
        if (codeSegments[i].week_best_score < player.score) {
          if (codeSegments[i].week_best_score > data.myUserInfo.last_week_best_score) {
            data.changlleList.push(codeSegments[i]);
          }
        }
      }
    }
    if (data.opt.banType || dataAndEvents) {
      (0, self.routeCanvas)(data, "gameOver");
      update(data);
    } else {
      if (player.score > player.highest_score) {
        (0, self.routeCanvas)(data, "gameOverHighest");
        /** @type {string} */
        data.opt.type = "history";
        (0, Block.drawGameOverHighest)(data, "history");
      } else {
        if (script.length > 1 && player.score >= script[0].week_best_score) {
          (0, self.routeCanvas)(data, "gameOverHighest");
          /** @type {string} */
          data.opt.type = "rank";
          (0, Block.drawGameOverHighest)(data, "rank");
        } else {
          if (player.score > data.myUserInfo.last_week_best_score) {
            (0, self.routeCanvas)(data, "gameOverHighest");
            /** @type {string} */
            data.opt.type = "week";
            (0, Block.drawGameOverHighest)(data, "week");
          } else {
            (0, self.routeCanvas)(data, "gameOver");
            update(data);
          }
        }
      }
    }
  };
  /** @type {function (Object): undefined} */
  inst.drawGameOver = update;
  var self = require("./base");
  var obj = (d => d && d.__esModule ? d : {
    default : d
  })(require("../../store/storage"));
  var Block = require("./gghigh");
});
