define("js/pages/pages2d/record.js", (require, dataAndEvents, ctx) => {
  Object.defineProperty(ctx, "__esModule", {
    value : true
  });
  /**
   * @param {Object} object
   * @return {undefined}
   */
  ctx.drawRecordPage = object => {
    const self = object.self;
    self.imgid.bg++;
    (0, core.routeCanvas)(self, "record");
    (0, core.createPlane)(self);
    const ctx = self.context.bg;
    ctx.clearRect(0, 0, core.WIDTH, core.HEIGHT);
    const data = self.opt;
    (0, core.drawImageCenter)({
      self,
      src : data.headimg,
      pos : [207, 100, 52, 52],
      type : "bg",
      /**
       * @return {undefined}
       */
      cb() {
        (0, core.drawImageCenter)({
          self,
          src : "res/2d/ava_square.png",
          pos : [207, 100, 53, 53],
          type : "bg",
          imgid : self.imgid.bg
        });
      },
      imgid : self.imgid.bg,
      noupdate : true,
      round : true
    });
    (0, core.drawReturnImg)(ctx, self);
    (0, core.updatePlane)({
      self,
      type : "bg"
    });
  };
  var core = require("./base");
});
