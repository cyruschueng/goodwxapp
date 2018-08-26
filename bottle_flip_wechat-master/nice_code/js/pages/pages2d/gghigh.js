define("js/pages/pages2d/gghigh.js", (Event, dataAndEvents, inst) => {
  /**
   * @param {Object} game
   * @param {number} opt_force
   * @return {undefined}
   */
  function update(game, opt_force) {
    if (game.imgid.btn++, !(game.changlleListStart + 5 * opt_force < 0 || game.changlleListStart + 5 * opt_force >= game.changlleList.length)) {
      game.changlleListStart = game.changlleListStart + 5 * opt_force;
      const codeSegments = game.changlleList.slice(game.changlleListStart, game.changlleListStart + 5);
      const valuesLen = codeSegments.length;
      /** @type {number} */
      const d = 32;
      /** @type {number} */
      const baseY = 207 - (32 * valuesLen + 10 * (valuesLen - 1)) / 2;
      game.context.btn.clearRect((0, self.cx)(30), (0, self.cy)(448), (0, self.cwh)(354), (0, self.cwh)(55));
      /** @type {number} */
      let i = 0;
      for (;i < valuesLen;i++) {
        !(() => {
          /** @type {number} */
          const x = baseY + 16 + 42 * i;
          (0, self.drawImageCenter)({
            self : game,
            round : true,
            src : codeSegments[i].headimg,
            pos : [x, 469, d, d],
            type : "btn",
            /**
             * @return {undefined}
             */
            cb() {
              (0, self.drawImageCenter)({
                self : game,
                src : "res/ava_rank.png",
                pos : [x, 469, 46, 46],
                type : "btn",
                imgid : game.imgid.btn
              });
            },
            imgid : game.imgid.btn,
            noupdate : true
          });
        })();
      }
      if (game.changlleList.length > 5) {
        if (game.changlleListStart + 5 < game.changlleList.length) {
          (0, self.drawImageCenter)({
            self : game,
            src : "res/r_arr1.png",
            pos : [339, 469, 6, 8],
            type : "btn",
            imgid : game.imgid.btn
          });
        }
      }
      if (game.changlleList.length > 5) {
        if (0 != game.changlleListStart) {
          (0, self.drawImageCenter)({
            self : game,
            src : "res/l_arr.png",
            pos : [69, 469, 6, 8],
            type : "btn",
            imgid : game.imgid.btn
          });
        }
      }
    }
  }
  Object.defineProperty(inst, "__esModule", {
    value : true
  });
  /**
   * @param {Object} game
   * @param {string} i
   * @return {undefined}
   */
  inst.drawGameOverHighest = (game, i) => {
    const data = game.opt;
    game.imgid.bg++;
    data.score = data.score || 0;
    const ctx = game.context.bg;
    ctx.clearRect(0, 0, self.WIDTH, self.HEIGHT);
    /** @type {string} */
    ctx.fillStyle = "rgba(0,0,0, 0.8)";
    ctx.fillRect(0, 0, self.WIDTH, self.HEIGHT);
    let canvas = game.context.btn;
    if (canvas.clearRect(0, 0, self.WIDTH, self.HEIGHT), (0, self.drawText)({
      self : game,
      size : 14,
      t : `\u5386\u53f2\u6700\u9ad8\u5206\uff1a${Math.max(data.highest_score, data.score)}`,
      pos : [207, 703]
    }), "history" == i || "week" == i) {
      if (0 == game.changlleList.length) {
        /** @type {number} */
        ctx.lineWidth = 2 * self.Dpr;
        /** @type {string} */
        ctx.strokeStyle = "rgba(255,255,255,0.06)";
        /** @type {string} */
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        (0, self.roundedRect)((0, self.cx)(30), (0, self.cy)(104), (0, self.cwh)(354), (0, self.cwh)(371), 4 * self.Dpr, ctx);
        ctx.fill();
        (0, self.drawImageCenter)({
          self : game,
          src : "res/pure_share.png",
          pos : [207, 440, 18, 24],
          type : "bg",
          imgid : game.imgid.bg
        });
      } else {
        /** @type {number} */
        ctx.lineWidth = 2 * self.Dpr;
        /** @type {string} */
        ctx.strokeStyle = "rgba(255,255,255,0.06)";
        /** @type {string} */
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        (0, self.roundedRect)((0, self.cx)(30), (0, self.cy)(104), (0, self.cwh)(354), (0, self.cwh)(401), 4 * self.Dpr, ctx);
        ctx.fill();
        /** @type {number} */
        ctx.lineWidth = 0.5 * self.Dpr;
        /** @type {string} */
        ctx.strokeStyle = "rgba(255,255,255,0.2)";
        ctx.beginPath();
        ctx.moveTo((0, self.cx)(127), (0, self.cy)(406));
        ctx.lineTo((0, self.cx)(287), (0, self.cy)(406));
        ctx.stroke();
        ctx.closePath();
        (0, self.drawText)({
          self : game,
          size : 14,
          t : `\u6392\u540d\u65b0\u8d85\u8d8a${game.changlleList.length}\u4f4d\u597d\u53cb`,
          pos : [207, 429]
        });
        /** @type {number} */
        game.changlleListStart = 0;
        update(game, 0);
        (0, self.drawImageCenter)({
          self : game,
          src : "res/pure_share.png",
          pos : [207, 368, 18, 24],
          type : "bg",
          imgid : game.imgid.bg
        });
      }
      /** @type {string} */
      let comment = "";
      /** @type {string} */
      let fs = "";
      if ("history" == i) {
        if (game.opt.highest_score < 100) {
          if (game.opt.score >= 100) {
            /** @type {string} */
            comment = "\u521d\u7aa5\u95e8\u5f84";
            /** @type {string} */
            fs = "#509FC9";
          }
        }
        if (game.opt.highest_score < 500) {
          if (game.opt.score >= 500) {
            /** @type {string} */
            comment = "\u8010\u5f97\u5bc2\u5bde";
            /** @type {string} */
            fs = "#E67600";
          }
        }
        if (game.opt.highest_score < 1E3) {
          if (game.opt.score >= 1E3) {
            /** @type {string} */
            comment = "\u767b\u5802\u5165\u5ba4";
            /** @type {string} */
            fs = "#009D5E";
          }
        }
        if (game.opt.highest_score < 2E3) {
          if (game.opt.score >= 2E3) {
            /** @type {string} */
            comment = "\u65e0\u804a\u5927\u5e08";
            /** @type {string} */
            fs = "#7A0096";
          }
        }
        if (game.opt.highest_score < 3E3) {
          if (game.opt.score >= 3E3) {
            /** @type {string} */
            comment = "\u4e00\u6307\u7985";
            /** @type {string} */
            fs = "#555555";
          }
        }
        if (game.opt.highest_score < 5E3) {
          if (game.opt.score >= 5E3) {
            /** @type {string} */
            comment = "\u7acb\u5730\u6210\u4f5b";
            /** @type {string} */
            fs = "#AC8742";
          }
        }
      }
      if (comment) {
        /** @type {string} */
        ctx.fillStyle = fs;
        /** @type {string} */
        ctx.strokeStyle = fs;
        /** @type {number} */
        ctx.lineWidth = 1 * self.Dpr;
        (0, self.roundedRect)((0, self.cx)(167), (0, self.cy)(154), (0, self.cwh)(80), (0, self.cwh)(26), 2 * self.Dpr, ctx);
        ctx.fill();
        (0, self.drawText)({
          self : game,
          bold : true,
          size : 14,
          t : comment,
          pos : [207, 167]
        });
      } else {
        (0, self.drawImageCenter)({
          self : game,
          src : "res/new.png",
          pos : [207, 167, 58, 26],
          type : "bg",
          imgid : game.imgid.bg
        });
      }
      (0, self.drawText)({
        self : game,
        size : 14,
        t : "history" == i ? "\u5386\u53f2\u6700\u9ad8\u5206" : "\u672c\u5468\u6700\u9ad8\u5206",
        pos : [207, 224]
      });
      (0, self.drawText)({
        self : game,
        size : 86,
        special : true,
        color : "#00c777",
        pos : [207, 292.5],
        t : data.score
      });
    }
    if ("rank" == i) {
      (0, self.drawImageCenter)({
        self : game,
        src : "res/new.png",
        pos : [207, 167, 58, 26],
        type : "bg",
        imgid : game.imgid.bg
      });
      /** @type {number} */
      ctx.lineWidth = 2 * self.Dpr;
      /** @type {string} */
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      /** @type {string} */
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      (0, self.roundedRect)((0, self.cx)(30), (0, self.cy)(104), (0, self.cwh)(354), (0, self.cwh)(371), 4 * self.Dpr, ctx);
      ctx.fill();
      (0, self.drawImageCenter)({
        self : game,
        src : game.myUserInfo.headimg,
        pos : [207, 291, 56, 56],
        type : "bg",
        /**
         * @return {undefined}
         */
        cb() {
          (0, self.drawImageCenter)({
            self : game,
            src : "res/gold.png",
            pos : [207, 253, 40, 40],
            type : "bg",
            imgid : game.imgid.bg
          });
        },
        imgid : game.imgid.bg
      });
      (0, self.drawText)({
        self : game,
        size : 14,
        t : "\u6392\u884c\u699c\u51a0\u519b",
        pos : [207, 224]
      });
      (0, self.drawText)({
        self : game,
        size : 40,
        special : true,
        t : data.score,
        pos : [207, 349],
        color : "#00c777"
      });
      (0, self.drawImageCenter)({
        self : game,
        src : "res/pure_share.png",
        pos : [207, 415, 18, 24],
        type : "bg",
        imgid : game.imgid.bg
      });
    }
    /** @type {string} */
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.fillRect((0, self.cx)(155), (0, self.cy)(218.5), (0, self.cwh)(9), (0, self.cwh)(3));
    ctx.fillRect((0, self.cx)(155), (0, self.cy)(224.5), (0, self.cwh)(9), (0, self.cwh)(3));
    ctx.fillRect((0, self.cx)(248), (0, self.cy)(218.5), (0, self.cwh)(9), (0, self.cwh)(3));
    ctx.fillRect((0, self.cx)(248), (0, self.cy)(224.5), (0, self.cwh)(9), (0, self.cwh)(3));
    (0, self.drawImageCenter)({
      self : game,
      src : "res/close.png",
      pos : [375, 112, 43, 43],
      type : "bg",
      imgid : game.imgid.bg
    });
    (canvas = game.context.btn).clearRect((0, self.cx)(91), (0, self.cy)(490), (0, self.cwh)(232), (0, self.cwh)(94));
    (0, self.drawImageCenter)({
      self : game,
      src : "res/replay.png",
      pos : [207, 607, 212, 84],
      type : "btn",
      imgid : game.imgid.btn
    });
    (0, self.drawImageCenter)({
      self : game,
      src : "res/flower.png",
      pos : [207, 290, 260, 141],
      type : "bg",
      imgid : game.imgid.bg
    });
    (0, self.updatePlane)({
      self : game,
      type : "bg"
    });
  };
  /** @type {function (Object, number): undefined} */
  inst.reDrawChangeAva = update;
  var self = Event("./base");
});
