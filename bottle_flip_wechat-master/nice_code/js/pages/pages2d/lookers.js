define("js/pages/pages2d/lookers.js", (Event, dataAndEvents, ctx) => {
  Object.defineProperty(ctx, "__esModule", {
    value : true
  });
  /**
   * @param {Object} context
   * @return {undefined}
   */
  ctx.drawLookersPage = context => {
    const option = context.self;
    (0, self.routeCanvas)(option, "lookers");
    (0, self.createPlane)(option);
    const ctx = option.context.bg;
    ctx.clearRect(0, 0, self.WIDTH, self.HEIGHT);
    const data = option.opt;
    const pY = data.score || 0;
    const base = data.nickname || "";
    if ("in" == data.type) {
      (0, self.drawImageCenter)({
        self : option,
        src : data.headimg,
        pos : [207, 91, 50, 50],
        type : "bg",
        /**
         * @return {undefined}
         */
        cb() {
          (0, self.drawImageCenter)({
            self : option,
            src : "res/2d/ava_square.png",
            pos : [207, 91, 53, 53],
            type : "bg",
            imgid : option.imgid.bg
          });
        },
        imgid : option.imgid.bg,
        noupdate : true,
        round : true
      });
      (0, self.drawText)({
        self : option,
        t : `${base} \u6b63\u5728\u6e38\u620f\u4e2d`,
        size : 17,
        pos : [207, 144],
        type : "bg",
        color : "black"
      });
    } else {
      if ("gg" == data.type) {
        /** @type {string} */
        ctx.fillStyle = "rgba(0,0,0, 0.4)";
        ctx.fillRect(0, 0, self.WIDTH, self.HEIGHT);
        (0, self.drawImageCenter)({
          self : option,
          src : data.headimg,
          pos : [207, 91, 50, 50],
          type : "bg",
          /**
           * @return {undefined}
           */
          cb() {
            (0, self.drawImageCenter)({
              self : option,
              src : "res/2d/ava_square.png",
              pos : [207, 91, 53, 53],
              type : "bg",
              imgid : option.imgid.bg
            });
          },
          imgid : option.imgid.bg,
          noupdate : true,
          round : true
        });
        (0, self.drawText)({
          self : option,
          t : `${base} \u6e38\u620f\u5df2\u7ed3\u675f`,
          size : 17,
          pos : [207, 144],
          type : "bg"
        });
        (0, self.drawText)({
          self : option,
          t : "\u6e38\u620f\u5f97\u5206",
          size : 14,
          pos : [207, 207],
          type : "bg"
        });
        (0, self.drawText)({
          self : option,
          t : pY,
          size : 80,
          pos : [212, 267],
          type : "bg",
          special : true
        });
        /** @type {string} */
        ctx.strokeStyle = "white";
        /** @type {number} */
        ctx.lineWidth = 0.5 * self.Dpr;
        /** @type {string} */
        ctx.strokeStyle = "rgba(255,255,255,0.5)";
        ctx.beginPath();
        ctx.moveTo((0, self.cx)(157), (0, self.cy)(176));
        ctx.lineTo((0, self.cx)(257), (0, self.cy)(176));
        ctx.closePath();
        ctx.stroke();
        /** @type {string} */
        ctx.fillStyle = "rgba(255,255,255,0.2)";
        ctx.fillRect((0, self.cx)(156), (0, self.cy)(203), (0, self.cwh)(9), (0, self.cwh)(3));
        ctx.fillRect((0, self.cx)(156), (0, self.cy)(209), (0, self.cwh)(9), (0, self.cwh)(3));
        ctx.fillRect((0, self.cx)(243), (0, self.cy)(203), (0, self.cwh)(9), (0, self.cwh)(3));
        ctx.fillRect((0, self.cx)(243), (0, self.cy)(209), (0, self.cwh)(9), (0, self.cwh)(3));
      } else {
        if ("out" == data.type) {
          /** @type {string} */
          ctx.fillStyle = "rgba(0,0,0, 0.4)";
          ctx.fillRect(0, 0, self.WIDTH, self.HEIGHT);
          (0, self.drawImageCenter)({
            self : option,
            src : data.headimg,
            pos : [207, 221, 50, 50],
            type : "bg",
            /**
             * @return {undefined}
             */
            cb() {
              (0, self.drawImageCenter)({
                self : option,
                src : "res/2d/ava_square.png",
                pos : [207, 221, 53, 53],
                type : "bg",
                imgid : option.imgid.bg
              });
            },
            imgid : option.imgid.bg,
            noupdate : true,
            round : true
          });
          (0, self.drawText)({
            self : option,
            t : `${base} \u6e38\u620f\u5df2\u7ed3\u675f`,
            size : 17,
            pos : [207, 278],
            type : "bg"
          });
        } else {
          if ("record" == data.type) {
            (0, self.drawImageCenter)({
              self : option,
              src : data.headimg,
              pos : [71, 91, 42, 42],
              type : "bg",
              /**
               * @return {undefined}
               */
              cb() {
                (0, self.drawImageCenter)({
                  self : option,
                  src : "res/2d/ava_square.png",
                  pos : [71, 91, 43, 43],
                  type : "bg",
                  imgid : option.imgid.bg
                });
              },
              imgid : option.imgid.bg,
              noupdate : true,
              round : true
            });
          }
        }
      }
    }
    if ("record" != data.type) {
      (0, self.drawImageCenter)({
        self : option,
        src : "res/btn_iplay.png",
        pos : [207, 663, 131, 54],
        type : "bg",
        imgid : option.imgid.bg
      });
    } else {
      (0, self.drawImageCenter)({
        self : option,
        src : "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJBEN0IEbib1Cef1vsVKvSKGJkU5R4HlfLFrnficcs7hc7VlYRRu523WotJ9QselXVaHQ/0?wx_fmt=png",
        pos : [207, 665, 131, 64],
        type : "bg",
        imgid : option.imgid.bg
      });
    }
    (0, self.updatePlane)({
      self : option,
      type : "bg"
    });
  };
  var self = Event("./base");
});
