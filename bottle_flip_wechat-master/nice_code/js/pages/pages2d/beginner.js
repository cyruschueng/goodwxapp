define("js/pages/pages2d/beginner.js", (Event, dataAndEvents, ctx) => {
  Object.defineProperty(ctx, "__esModule", {
    value : true
  });
  /**
   * @param {Text} options
   * @return {undefined}
   */
  ctx.drawBeginnerPage = options => {
    const _this = (options = Object.assign({}, {
      self : {}
    }, options)).self;
    (0, self.routeCanvas)(_this, "beginner");
    (0, self.createPlane)(_this);
    const ctx = _this.context.bg;
    ctx.clearRect(0, 0, self.WIDTH, self.HEIGHT);
    /** @type {string} */
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.fillRect((0, self.cx)(103), (0, self.cy)(134), (0, self.cwh)(206), (0, self.cwh)(115));
    (0, self.drawText)({
      t : "\u957f\u6309\u5c4f\u5e55\u5e76\u91ca\u653e",
      self : _this,
      size : 17,
      pos : [207, 172],
      color : "black"
    });
    (0, self.drawText)({
      t : "\u63a7\u5236",
      self : _this,
      size : 17,
      pos : [149, 213],
      color : "black",
      align : "left"
    });
    (0, self.drawText)({
      t : "\u5411\u524d\u8df3",
      self : _this,
      size : 17,
      pos : [265, 213],
      color : "black",
      align : "right"
    });
    (0, self.drawImageCenter)({
      self : _this,
      src : "res/i.png",
      pos : [198, 211, 13.2, 35.6],
      type : "bg",
      imgid : _this.imgid.bg
    });
    (0, self.updatePlane)({
      self : _this,
      type : "bg"
    });
  };
  var self = Event("./base");
});
