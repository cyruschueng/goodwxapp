define("js/pages/pages2d/verify.js", (require, dataAndEvents, ctx) => {
  /**
   * @param {Object} option
   * @return {undefined}
   */
  function clear(option) {
    option.imgid.bg++;
    const ctx = option.context.bg;
    ctx.clearRect(0, 0, self.WIDTH, self.HEIGHT);
    /** @type {string} */
    ctx.fillStyle = "#555";
    ctx.fillRect(0, 0, self.WIDTH, self.HEIGHT);
    (0, self.drawText)({
      self : option,
      t : "\u6e38\u620f\u7533\u8bc9",
      size : 30,
      pos : [207, 153]
    });
    (0, self.drawText)({
      self : option,
      t : "\u6211\u4eec\u9700\u8981\u9a8c\u8bc1\u4f60\u7684\u73a9\u5bb6\u8eab\u4efd",
      size : 16,
      pos : [207, 496],
      color : "rgba(255,255,255,0.4)"
    });
    (0, self.drawText)({
      self : option,
      t : "\u5c06\u4f1a\u6709\u4e13\u4eba\u4e0e\u4f60\u8054\u7cfb",
      size : 16,
      pos : [207, 518],
      color : "rgba(255,255,255,0.4)"
    });
    (0, self.drawText)({
      self : option,
      t : "\u7b2c\u4e00\u6b65\uff1a\u8bf7\u63d0\u4ea4\u4e00\u4efd\u81ea\u62cd\u7167\u7247",
      size : 20,
      pos : [207, 450],
      color : "white"
    });
    (0, self.drawImageCenter)({
      self : option,
      src : "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJNNcIVa8Pr2VeiaWDZj6rCViaLsuSCWtnyo1mvNqBR05HxPZ5oXTzl0ODXjWiakTvq6yw/0?wx_fmt=png",
      pos : [207, 329, 139, 139],
      type : "bg",
      imgid : option.imgid.bg
    });
    (0, self.drawImageCenter)({
      self : option,
      src : "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJNNcIVa8Pr2VajbZ52iaZX9Vlib0QAKEJGDIV8F9iaFeqXoawUbQkDP8zc6fbm95nKLgw/0?wx_fmt=png",
      pos : [207, 621, 138, 44],
      type : "bg",
      imgid : option.imgid.bg
    });
    (0, self.drawText)({
      self : option,
      t : "\u63d0\u4ea4\u81ea\u62cd",
      size : 15,
      pos : [207, 621]
    });
    (0, self.drawText)({
      self : option,
      t : "\u9000\u51fa\u7533\u8bc9",
      size : 17,
      pos : [197, 690]
    });
    (0, self.drawImageCenter)({
      self : option,
      src : "res/r_arr.png",
      pos : [247, 690, 6.5, 12.5],
      type : "bg",
      imgid : option.imgid.bg
    });
    (0, self.updatePlane)({
      self : option,
      type : "bg"
    });
  }
  /**
   * @param {Object} data
   * @return {undefined}
   */
  function upload(data) {
    wx.chooseImage({
      count : 1,
      sizeType : ["original", "compressed"],
      sourceType : ["album", "camera"],
      /**
       * @param {?} textStatus
       * @return {undefined}
       */
      success(textStatus) {
        data.opt.path = textStatus.tempFilePaths[0];
        render(data);
      },
      /**
       * @param {?} positionError
       * @return {undefined}
       */
      fail(positionError) {
        /** @type {number} */
        data.opt.verify_step = 0;
      }
    });
  }
  /**
   * @param {Object} data
   * @return {undefined}
   */
  function render(data) {
    const ctx = data.context.bg;
    ctx.clearRect(0, 0, self.WIDTH, self.HEIGHT);
    /** @type {string} */
    ctx.fillStyle = "#555";
    ctx.fillRect(0, 0, self.WIDTH, self.HEIGHT);
    (0, self.drawText)({
      self : data,
      t : "\u62cd\u6444\u5b8c\u6210",
      size : 30,
      pos : [207, 117]
    });
    (0, self.drawText)({
      self : data,
      t : "\u7167\u7247\u5df2\u5b58\u6863\uff0c\u4ec5\u4f9b\u8eab\u4efd\u8bc6\u522b",
      size : 14,
      pos : [207, 158]
    });
    (0, self.drawImageCenter)({
      self : data,
      src : "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJNNcIVa8Pr2VajbZ52iaZX9Vlib0QAKEJGDIV8F9iaFeqXoawUbQkDP8zc6fbm95nKLgw/0?wx_fmt=png",
      pos : [207, 621, 138, 44],
      type : "bg",
      imgid : data.imgid.bg
    });
    (0, self.drawText)({
      self : data,
      t : "\u4e0b\u4e00\u6b65",
      size : 15,
      pos : [207, 621]
    });
    (0, self.drawText)({
      self : data,
      t : "\u9000\u51fa\u7533\u8bc9",
      size : 17,
      pos : [197, 690]
    });
    (0, self.drawImageCenter)({
      self : data,
      src : "res/r_arr.png",
      pos : [247, 690, 6.5, 12.5],
      type : "bg",
      imgid : data.imgid.bg
    });
    /** @type {Image} */
    const image = new Image;
    /**
     * @return {undefined}
     */
    image.onload = () => {
      console.log(image.width, image.height);
      /** @type {number} */
      let fmt = 240;
      /** @type {number} */
      let matches = 320;
      if (image.width / image.height > 0.75) {
        /** @type {number} */
        matches = image.height / image.width * fmt;
      } else {
        /** @type {number} */
        fmt = image.width / image.height * matches;
      }
      console.log(fmt, matches);
      (0, self.drawImageCenter)({
        self : data,
        src : data.opt.path,
        pos : [207, 388, fmt, matches],
        type : "bg",
        imgid : data.imgid.bg
      });
    };
    image.src = data.opt.path;
    (0, self.updatePlane)({
      self : data,
      type : "bg"
    });
  }
  /**
   * @param {Object} data
   * @return {undefined}
   */
  function setup(data) {
    if (!data.opt.loading) {
      /** @type {boolean} */
      data.opt.loading = true;
      wx.showLoading({
        title : "\u4e0a\u4f20\u4e2d..."
      });
      (0, Block.upLoadVerifyPic)({
        path : data.opt.path,
        /**
         * @param {?} str
         * @return {undefined}
         */
        succ(str) {
          data.opt.fileid = str;
          data.opt.verify_step++;
          update(data);
        },
        /**
         * @return {undefined}
         */
        complete() {
          /** @type {boolean} */
          data.opt.loading = false;
          wx.hideLoading();
        }
      });
    }
  }
  /**
   * @param {Object} option
   * @return {undefined}
   */
  function update(option) {
    const ctx = option.context.bg;
    ctx.clearRect(0, 0, self.WIDTH, self.HEIGHT);
    /** @type {string} */
    ctx.fillStyle = "#555";
    ctx.fillRect(0, 0, self.WIDTH, self.HEIGHT);
    /** @type {string} */
    ctx.fillStyle = "#888";
    ctx.fillRect(0, (0, self.cy)(206), (0, self.cwh)(414), (0, self.cwh)(215));
    (0, self.drawText)({
      self : option,
      t : "\u7b2c\u4e8c\u6b65\uff1a\u8bf7\u586b\u5199\u8054\u7cfb\u65b9\u5f0f",
      size : 20,
      pos : [207, 117]
    });
    ctx.beginPath();
    /** @type {number} */
    ctx.lineWidth = 0.5 * self.Dpr;
    /** @type {string} */
    ctx.strokeStyle = "rgba(255,255,255,0.4)";
    ctx.moveTo((0, self.cx)(30), (0, self.cy)(299));
    ctx.lineTo((0, self.cx)(384), (0, self.cy)(299));
    ctx.stroke();
    ctx.moveTo((0, self.cx)(30), (0, self.cy)(364));
    ctx.lineTo((0, self.cx)(384), (0, self.cy)(364));
    ctx.stroke();
    ctx.closePath();
    (0, self.drawText)({
      self : option,
      t : "\u59d3\u540d",
      align : "left",
      size : 17,
      pos : [30, 277],
      color : "rgba(255,255,255,1)"
    });
    (0, self.drawText)({
      self : option,
      t : "\u624b\u673a\u53f7\u7801",
      align : "left",
      size : 17,
      pos : [30, 342],
      color : "rgba(255,255,255,1)"
    });
    (0, self.drawText)({
      self : option,
      t : "\u8bf7\u586b\u5199",
      align : "left",
      size : 17,
      pos : [138, 277],
      color : "rgba(255,255,255,0.3)"
    });
    (0, self.drawText)({
      self : option,
      t : "\u8bf7\u586b\u5199",
      align : "left",
      size : 17,
      pos : [138, 342],
      color : "rgba(255,255,255,0.3)"
    });
    (0, self.drawImageCenter)({
      self : option,
      src : "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJNNcIVa8Pr2VajbZ52iaZX9Vlib0QAKEJGDIV8F9iaFeqXoawUbQkDP8zc6fbm95nKLgw/0?wx_fmt=png",
      pos : [207, 621, 138, 44],
      type : "bg",
      imgid : option.imgid.bg
    });
    (0, self.drawText)({
      self : option,
      t : "\u4e0b\u4e00\u6b65",
      size : 15,
      pos : [207, 621]
    });
    (0, self.drawText)({
      self : option,
      t : "\u9000\u51fa\u7533\u8bc9",
      size : 17,
      pos : [197, 690]
    });
    (0, self.drawImageCenter)({
      self : option,
      src : "res/r_arr.png",
      pos : [247, 690, 6.5, 12.5],
      type : "bg",
      imgid : option.imgid.bg
    });
    (0, self.updatePlane)({
      self : option,
      type : "bg"
    });
  }
  /**
   * @param {Object} data
   * @return {undefined}
   */
  function start(data) {
    if (data.opt.mobile && data.opt.name) {
      if (!data.opt.loading) {
        /** @type {boolean} */
        data.opt.loading = true;
        (0, Block.upLoadVerifySubmit)({
          name : data.opt.name,
          mobile : data.opt.mobile,
          fileid : data.opt.fileid,
          is_async : data.lastCanvasType == self.CANVASTYPE.start ? 1 : 0,
          /**
           * @return {undefined}
           */
          succ() {
            init(data);
            data.opt.verify_step++;
          },
          /**
           * @return {undefined}
           */
          complete() {
            /** @type {boolean} */
            data.opt.loading = false;
          }
        });
      }
    } else {
      wx.showToast({
        title : "\u8bf7\u586b\u5199\u5b8c\u6574\u4fe1\u606f",
        icon : "none"
      });
    }
  }
  /**
   * @param {Object} state
   * @return {undefined}
   */
  function init(state) {
    const ctx = state.context.bg;
    ctx.clearRect(0, 0, self.WIDTH, self.HEIGHT);
    /** @type {string} */
    ctx.fillStyle = "#555";
    ctx.fillRect(0, 0, self.WIDTH, self.HEIGHT);
    (0, self.drawText)({
      self : state,
      t : "\u63d0\u4ea4\u6210\u529f",
      size : 30,
      pos : [207, 237]
    });
    (0, self.drawText)({
      self : state,
      t : "\u8bf7\u8010\u5fc3\u7b49\u5f85\u5ba2\u670d\u4e0e\u4f60\u8054\u7cfb",
      size : 14,
      pos : [207, 278],
      color : "rgba(255,255,255,0.4)"
    });
    (0, self.drawText)({
      self : state,
      t : "\u5982\u6709\u7591\u95ee\uff0c\u53ef\u5173\u6ce8\u201c\u5fae\u4fe1\u5c0f\u6e38\u620f\u201d\u5b98\u65b9\u516c\u4f17\u53f7\u8fdb\u884c\u54a8\u8be2",
      size : 14,
      pos : [207, 298],
      color : "rgba(255,255,255,0.4)"
    });
    (0, self.drawImageCenter)({
      self : state,
      src : "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJNNcIVa8Pr2VajbZ52iaZX9Vlib0QAKEJGDIV8F9iaFeqXoawUbQkDP8zc6fbm95nKLgw/0?wx_fmt=png",
      pos : [207, 621, 138, 44],
      type : "bg",
      imgid : state.imgid.bg
    });
    (0, self.drawText)({
      self : state,
      t : "\u5b8c\u6210",
      size : 15,
      pos : [207, 621]
    });
    (0, self.updatePlane)({
      self : state,
      type : "bg"
    });
  }
  Object.defineProperty(ctx, "__esModule", {
    value : true
  });
  /**
   * @param {Object} options
   * @return {undefined}
   */
  ctx.routeVerify = options => {
    options.opt.verify_step = options.opt.verify_step || 0;
    const verify_step = options.opt.verify_step;
    if (0 == verify_step) {
      (0, self.createPlane)(options);
      (0, self.routeCanvas)(options, "verify");
      clear(options);
      options.opt.verify_step++;
    } else {
      if (1 == verify_step) {
        upload(options);
        options.opt.verify_step++;
      } else {
        if (2 == verify_step) {
          setup(options);
        } else {
          if (3 == verify_step) {
            start(options);
          }
        }
      }
    }
  };
  /**
   * @param {Object} game
   * @param {string} key
   * @return {undefined}
   */
  ctx.clickVerifyForm = (game, key) => {
    console.log(game.opt.showkey);
    if (!game.opt.showkey) {
      /** @type {boolean} */
      game.opt.showkey = true;
      wx.showKeyboard({
        defaultValue : game.opt[key] || "",
        maxLength : 20,
        multiple : false,
        confirmType : "done",
        /**
         * @return {undefined}
         */
        complete() {
        }
      });
      wx.onKeyboardComplete(desc => {
        /** @type {boolean} */
        game.opt.showkey = false;
        game.opt[key] = desc.value;
        const ctx = game.context.bg;
        /** @type {string} */
        ctx.fillStyle = "#888";
        if ("name" == key) {
          ctx.fillRect((0, self.cx)(135), (0, self.cy)(262), (0, self.cwh)(250), (0, self.cwh)(30));
          (0, self.drawText)({
            self : game,
            t : (0, self.cname)(game.opt.name || "\u8bf7\u586b\u5199", 20),
            align : "left",
            size : 17,
            pos : [138, 277],
            color : game.opt.name ? "#fff" : "rgba(255,255,255,0.3)"
          });
        } else {
          ctx.fillRect((0, self.cx)(135), (0, self.cy)(327), (0, self.cwh)(250), (0, self.cwh)(30));
          (0, self.drawText)({
            self : game,
            t : (0, self.cname)(game.opt.mobile || "\u8bf7\u586b\u5199", 20),
            align : "left",
            size : 17,
            pos : [138, 342],
            color : game.opt.mobile ? "#fff" : "rgba(255,255,255,0.3)"
          });
        }
        (0, self.updatePlane)({
          self : game,
          type : "bg"
        });
        wx.offKeyboardComplete();
      });
    }
  };
  var self = require("./base");
  var Block = require("../../network/network");
});
