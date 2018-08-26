define("js/pages/pages2d/start.js", (Event, dataAndEvents, ctx) => {
  Object.defineProperty(ctx, "__esModule", {
    value : true
  });
  /**
   * @param {Object} option
   * @return {undefined}
   */
  ctx.drawStartPage = option => {
    option.imgid.btn++;
    option.imgid.bg++;
    (0, self.routeCanvas)(option, "start");
    (0, self.createPlane)(option);
    const ctx = option.context.bg;
    ctx.clearRect(0, 0, self.WIDTH, self.HEIGHT);
    /** @type {string} */
    ctx.fillStyle = "rgba(0,0,0, 0.3)";
    ctx.fillRect(0, 0, self.WIDTH, self.HEIGHT);
    (0, self.drawImageCenter)({
      self : option,
      src : "res/title.png",
      pos : [204, 168, 207, 52],
      type : "bg",
      imgid : option.imgid.bg
    });
    option.context.btn.clearRect(0, 0, self.WIDTH, self.HEIGHT);
    (0, self.drawImageCenter)({
      self : option,
      src : "res/play.png",
      pos : [207, 587, 212, 84],
      type : "btn",
      imgid : option.imgid.btn
    });
    if (!option.opt.hideRank) {
      (0, self.drawText)({
        t : "\u591a\u4eba\u6e38\u620f",
        self : option,
        size : 17,
        pos : [89, 670],
        align : "left"
      });
      (0, self.drawImageCenter)({
        self : option,
        src : "res/r_arr.png",
        pos : [173, 670, 6.6, 10],
        type : "bg",
        imgid : option.imgid.bg
      });
      (0, self.drawText)({
        t : "|",
        self : option,
        size : 17,
        pos : [207, 670]
      });
      (0, self.drawText)({
        t : "\u6392\u884c\u699c",
        self : option,
        size : 17,
        pos : [238, 670],
        align : "left"
      });
      (0, self.drawImageCenter)({
        self : option,
        src : "res/r_arr.png",
        pos : [303, 670, 6.6, 10],
        type : "bg",
        imgid : option.imgid.bg
      });
    }
    if (1 == option.opt.banType) {
      /** @type {number} */
      ctx.lineWidth = 1;
      /** @type {string} */
      ctx.strokeStyle = "rgba(0,0,0,0.7)";
      /** @type {string} */
      ctx.fillStyle = "rgba(0,0,0,0.7)";
      (0, self.roundedRect)((0, self.cx)(30), (0, self.cy)(258), (0, self.cwh)(354), (0, self.cwh)(196), 4, ctx);
      ctx.fill();
      (0, self.drawText)({
        t : "\u6e38\u620f\u4e2d\u5b58\u5728\u53ef\u7591\u64cd\u4f5c\uff0c\u5b58\u7591\u5206\u6570",
        self : option,
        size : 17,
        pos : [207, 310]
      });
      (0, self.drawText)({
        t : "\u5c06\u4e0d\u5728\u6392\u884c\u699c\u4e2d\u663e\u793a\u3002",
        self : option,
        size : 17,
        pos : [207, 336]
      });
      (0, self.drawImageCenter)({
        self : option,
        src : "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJNNcIVa8Pr2VajbZ52iaZX9Vlib0QAKEJGDIV8F9iaFeqXoawUbQkDP8zc6fbm95nKLgw/0?wx_fmt=png",
        pos : [207, 401, 138, 44],
        type : "bg",
        imgid : option.imgid.bg
      });
      (0, self.drawText)({
        t : "\u6211\u8981\u7533\u8bc9",
        self : option,
        size : 15,
        pos : [207, 401]
      });
    }
    (0, self.updatePlane)({
      self : option,
      type : "bg"
    });
  };
  var self = Event("./base");
});
