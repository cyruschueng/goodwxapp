define("js/pages/shareCard.js", ($sanitize, dataAndEvents, object) => {
  /**
   * @param {?} dataAndEvents
   * @param {Function} dest
   * @return {undefined}
   */
  function cloneCopyEvent(dataAndEvents, dest) {
    if (!(dataAndEvents instanceof dest)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  Object.defineProperty(object, "__esModule", {
    value : true
  });
  const getAll = (() => {
    /**
     * @param {Function} object
     * @param {Array} d
     * @return {undefined}
     */
    function defineProperty(object, d) {
      /** @type {number} */
      let i = 0;
      for (;i < d.length;i++) {
        const desc = d[i];
        desc.enumerable = desc.enumerable || false;
        /** @type {boolean} */
        desc.configurable = true;
        if ("value" in desc) {
          /** @type {boolean} */
          desc.writable = true;
        }
        Object.defineProperty(object, desc.key, desc);
      }
    }
    return (x, current, a) => (current && defineProperty(x.prototype, current), a && defineProperty(x, a), x);
  })();
  const obj = (d => d && d.__esModule ? d : {
    default : d
  })($sanitize("../store/storage"));
  /** @type {number} */
  const i = window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio;
  const font = (window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth, window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth, wx.loadFont("res/num.ttf"));
  const prototype = (() => {
    /**
     * @param {?} dataAndEvents
     * @return {undefined}
     */
    function clone(dataAndEvents) {
      cloneCopyEvent(this, clone);
      this.texture = {};
      this.material = {};
    }
    return getAll(clone, [{
      key : "getShareCard",
      /**
       * @param {Object} doc
       * @param {?} callback
       * @return {undefined}
       */
      value(doc={}, callback) {
        if (!this.canvas) {
          /** @type {Element} */
          this.canvas = document.createElement("canvas");
          this.context = this.canvas.getContext("2d");
          /** @type {number} */
          this.canvas.width = 693;
          /** @type {number} */
          this.canvas.height = 558;
        }
        const ctx = this.context;
        if ("shareBattle" == doc.type) {
          /** @type {string} */
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, 693, 558);
          params = this;
          this._drawImageCanvas1("res/changlle_share.png", 0, 0, 693, 558, "share", () => {
            /** @type {string} */
            ctx.fillStyle = "rgba(0,0,0,0.8)";
            /** @type {string} */
            ctx.font = `180px ${font}`;
            /** @type {string} */
            ctx.textBaseline = "middle";
            /** @type {string} */
            ctx.textAlign = "center";
            ctx.fillText(doc.score || 0, 356.5, 334.8);
            if (!!callback) {
              callback(params.canvas);
            }
          });
        }
        if ("history" == doc.type) {
          /** @type {string} */
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, 693, 558);
          params = this;
          this._drawImageCanvas1("res/high_score.png", 0, 0, 693, 558, "share", () => {
            /** @type {string} */
            ctx.fillStyle = "#00c777";
            /** @type {string} */
            ctx.font = `180px ${font}`;
            /** @type {string} */
            ctx.textBaseline = "middle";
            /** @type {string} */
            ctx.textAlign = "center";
            ctx.fillText(doc.score || 0, 356.5, 0.68 * 558);
            if (!!callback) {
              callback(params.canvas);
            }
          });
        }
        if ("week" == doc.type) {
          /** @type {string} */
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, 693, 558);
          params = this;
          this._drawImageCanvas1("res/high_score_week.png", 0, 0, 693, 558, "share", () => {
            /** @type {string} */
            ctx.fillStyle = "#00c777";
            /** @type {string} */
            ctx.font = `180px ${font}`;
            /** @type {string} */
            ctx.textBaseline = "middle";
            /** @type {string} */
            ctx.textAlign = "center";
            ctx.fillText(doc.score || 0, 356.5, 0.68 * 558);
            if (!!callback) {
              callback(params.canvas);
            }
          });
        }
        if ("rank" == doc.type) {
          /** @type {string} */
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, 693, 558);
          var params = this;
          const value = obj.default.getMyUserInfo();
          params._drawImageCanvas1(value.headimg, 305.5, 279, 102, 102, "share", () => {
            params._drawImageCanvas1("res/high_rank.png", 0, 0, 693, 558, "share", () => {
              /** @type {string} */
              ctx.fillStyle = "#00c777";
              /** @type {string} */
              ctx.font = `60px ${font}`;
              /** @type {string} */
              ctx.textBaseline = "middle";
              /** @type {string} */
              ctx.textAlign = "center";
              ctx.fillText(doc.score || 5678, 356.5, 0.8 * 558);
              if (!!callback) {
                callback(params.canvas);
              }
            });
          });
        }
      }
    }, {
      key : "_smallReat",
      /**
       * @return {undefined}
       */
      value() {
        const context = this.context;
        /** @type {Array} */
        const colors = ["red", "blue", "green", "yellow", "skyblue"];
        /** @type {number} */
        let index = 0;
        for (;index < colors.length;index++) {
          context.fillStyle = colors[index];
          /** @type {number} */
          let i = 0;
          for (;i < 5;i++) {
            context.fillRect(553 * Math.random(), 691 * Math.random(), 15, 15);
          }
        }
      }
    }, {
      key : "_drawImageCanvas",
      /**
       * @param {Object} path
       * @param {string} x
       * @param {string} y
       * @param {number} w
       * @param {number} height
       * @param {?} thisValue
       * @param {?} callback
       * @return {undefined}
       */
      value(path, x, y, w, height, thisValue, callback) {
        /** @type {Image} */
        const image = new Image;
        const that = this;
        /**
         * @return {undefined}
         */
        image.onload = () => {
          that.context.drawImage(image, x - w / 2, y - height / 2, w, height);
          if (!!callback) {
            callback(that.canvas);
          }
        };
        /**
         * @return {undefined}
         */
        image.onerror = () => {
          if (!!callback) {
            callback(that.canvas);
          }
        };
        /** @type {Object} */
        image.src = path;
      }
    }, {
      key : "_drawImageCanvas1",
      /**
       * @param {string} path
       * @param {?} x
       * @param {?} y
       * @param {?} width
       * @param {?} src
       * @param {?} thisValue
       * @param {?} callback
       * @return {undefined}
       */
      value(path, x, y, width, src, thisValue, callback) {
        if (!("/0" != path && ("/96" != path && ("/64" != path && path)))) {
          /** @type {string} */
          path = "res/ava.png";
        }
        /** @type {Image} */
        const image = new Image;
        const that = this;
        /**
         * @return {undefined}
         */
        image.onload = () => {
          that.context.drawImage(image, x, y, width, src);
          if (!!callback) {
            callback(that.canvas);
          }
        };
        /**
         * @return {undefined}
         */
        image.onerror = () => {
          if (!!callback) {
            callback(that.canvas);
          }
        };
        /** @type {string} */
        image.src = path;
      }
    }]), clone;
  })();
  object.default = prototype;
});
