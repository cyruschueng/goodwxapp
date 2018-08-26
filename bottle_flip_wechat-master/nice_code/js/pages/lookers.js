define("js/pages/lookers.js", (require, dataAndEvents, obj) => {
  /**
   * @param {Object} value
   * @return {?}
   */
  function isUndefinedOrNull(value) {
    return value && value.__esModule ? value : {
      default : value
    };
  }
  /**
   * @param {?} dataAndEvents
   * @param {Function} deepDataAndEvents
   * @return {undefined}
   */
  function clone(dataAndEvents, deepDataAndEvents) {
    if (!(dataAndEvents instanceof deepDataAndEvents)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  Object.defineProperty(obj, "__esModule", {
    value : true
  });
  const progress = (() => {
    /**
     * @param {Function} object
     * @param {?} property
     * @return {undefined}
     */
    function defineProperty(object, property) {
      /** @type {number} */
      let i = 0;
      for (;i < property.length;i++) {
        const desc = property[i];
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
    return (func, name, element) => (name && defineProperty(func.prototype, name), element && defineProperty(func, element), func);
  })();
  const THREE = (b => {
    if (b && b.__esModule) {
      return b;
    }
    const c = {};
    if (null != b) {
      let e;
      for (e in b) {
        if (Object.prototype.hasOwnProperty.call(b, e)) {
          c[e] = b[e];
        }
      }
    }
    return c.default = b, c;
  })(require("../lib/three"));
  const stage = require("../config");
  /** @type {number} */
  const factor = (isUndefinedOrNull(require("../store/storage")), isUndefinedOrNull(require("../scroll/scrollHandler")), window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio);
  /** @type {number} */
  const size = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
  /** @type {number} */
  const m = window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth;
  /** @type {number} */
  const h = m * factor;
  /** @type {number} */
  const height = size * factor;
  const scale = stage.FRUSTUMSIZE;
  /** @type {number} */
  const width = height / h * scale;
  /** @type {Array} */
  const codeSegments = ["bg"];
  const value = (() => {
    /**
     * @param {?} options
     * @return {undefined}
     */
    function update(options) {
      clone(this, update);
      this.texture = {};
      this.material = {};
      this.geometry = {};
      this.obj = {};
      this.canvas = {};
      this.context = {};
      this._touchInfo = {
        trackingID : -1,
        maxDy : 0,
        maxDx : 0
      };
      /** @type {number} */
      this.cwidth = height;
      /** @type {number} */
      this.cheight = 50;
      this.options = Object.assign({}, {}, options);
      this._createPlane();
    }
    return progress(update, [{
      key : "showLookers",
      /**
       * @param {Object} thisp
       * @return {undefined}
       */
      value(thisp) {
        /** @type {boolean} */
        this.showState = true;
        thisp = thisp || {};
        this._drawLookers(thisp);
      }
    }, {
      key : "showLookersShare",
      /**
       * @param {Object} thisp
       * @return {undefined}
       */
      value(thisp) {
        /** @type {boolean} */
        this.showState = true;
        thisp = thisp || {};
      }
    }, {
      key : "hideLookers",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {boolean} */
        this.showState = false;
        /** @type {number} */
        let i = 0;
        for (;i < codeSegments.length;i++) {
          /** @type {boolean} */
          this.obj[codeSegments[i]].visible = false;
          this.options.camera.remove(this.obj[codeSegments[i]]);
        }
      }
    }, {
      key : "_drawLookers",
      /**
       * @param {Object} data
       * @return {undefined}
       */
      value(data) {
        const data_priv = this;
        const ctx = this.context.bg;
        /** @type {string} */
        ctx.fillStyle = "pink";
        /** @type {string} */
        ctx.strokeStyle = "red";
        /** @type {number} */
        ctx.lineWidth = 2 * factor;
        ctx.clearRect(0, 0, this._cx(414), this._cx(this.cheight));
        const _income = this.cheight;
        if (data.avaImg) {
          /** @type {number} */
          const y = height - data.avatar.length * this._cx(32);
          const console = this;
          /** @type {number} */
          let i = 0;
          for (;i < data.avatar.length;i++) {
            !(() => {
              /** @type {number} */
              const name = i * data_priv._cx(36) + y;
              data_priv._drawImageCenter(data.avatar[i], name, _income / 2, console._cx(25), console._cx(25), "bg", () => {
                console._drawImageCenter("res/2d/ava_square.png", name, _income / 2, console._cx(26), console._cx(26), "bg");
              });
            })();
          }
          /** @type {string} */
          ctx.fillStyle = "rgba(0,0,0,0.56)";
          ctx.font = this._cf(14);
          /** @type {string} */
          ctx.textAlign = "right";
          /** @type {string} */
          ctx.textBaseline = "middle";
          ctx.fillText(`\u6709${data.num}\u4f4d\u597d\u53cb\u6b63\u5728\u56f4\u89c2`, y - this._cx(20), this._cx(16));
        }
        if (data.icon) {
          this._drawImageCenter("res/observShare.png", this._cx(35), _income / 2, this._cx(14), this._cx(16), "bg");
        }
        if (data.wording) {
          /** @type {string} */
          ctx.fillStyle = "rgba(0,0,0,0.56)";
          ctx.font = this._cf(14);
          /** @type {string} */
          ctx.textAlign = "left";
          /** @type {string} */
          ctx.textBaseline = "middle";
          ctx.fillText("\u9080\u8bf7\u56f4\u89c2", this._cx(55), this._cx(16));
        }
        this._updatePlane("bg");
      }
    }, {
      key : "_createPlane",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {number} */
        let i = 0;
        for (;i < codeSegments.length;i++) {
          /** @type {Element} */
          this.canvas[codeSegments[i]] = document.createElement("canvas");
          this.context[codeSegments[i]] = this.canvas[codeSegments[i]].getContext("2d");
          /** @type {number} */
          this.canvas[codeSegments[i]].width = height;
          /** @type {number} */
          this.canvas[codeSegments[i]].height = this.cheight * factor;
          this.texture[codeSegments[i]] = new THREE.Texture(this.canvas[codeSegments[i]]);
          this.material[codeSegments[i]] = new THREE.MeshBasicMaterial({
            map : this.texture[codeSegments[i]],
            transparent : true
          });
          this.geometry[codeSegments[i]] = new THREE.PlaneGeometry(width, this.cheight / m * scale);
          this.obj[codeSegments[i]] = new THREE.Mesh(this.geometry[codeSegments[i]], this.material[codeSegments[i]]);
          this.material[codeSegments[i]].map.minFilter = THREE.LinearFilter;
          /** @type {number} */
          this.obj[codeSegments[i]].position.y = -(0.5 - this.cheight / 2 / m) * scale;
          /** @type {number} */
          this.obj[codeSegments[i]].position.x = 0;
          /** @type {number} */
          this.obj[codeSegments[i]].position.z = 9 - 0.001 * i;
        }
      }
    }, {
      key : "_updatePlane",
      /**
       * @param {?} name
       * @return {undefined}
       */
      value(name) {
        if (this.showState) {
          /** @type {boolean} */
          this.texture[name].needsUpdate = true;
          /** @type {boolean} */
          this.obj[name].visible = true;
          this.options.camera.add(this.obj[name]);
        }
      }
    }, {
      key : "_drawImageCenter",
      /**
       * @param {string} path
       * @param {string} x
       * @param {string} y
       * @param {number} w
       * @param {number} height
       * @param {?} name
       * @param {?} callback
       * @return {undefined}
       */
      value(path, x, y, w, height, name, callback) {
        if (!("/0" != path && ("/96" != path && ("/64" != path && path)))) {
          /** @type {string} */
          path = "res/ava.png";
        }
        /** @type {Image} */
        const image = new Image;
        const rparentsprev = this;
        const context = this.context[name];
        /**
         * @return {undefined}
         */
        image.onload = () => {
          context.drawImage(image, x - w / 2, y - height / 2, w, height);
          if (!!callback) {
            callback();
          }
          rparentsprev._updatePlane(name);
        };
        /**
         * @return {undefined}
         */
        image.onerror = () => {
          if (!!callback) {
            callback();
          }
        };
        /** @type {string} */
        image.src = path;
      }
    }, {
      key : "_cx",
      /**
       * @param {number} number
       * @return {?}
       */
      value(number) {
        return number * size / 414 * factor;
      }
    }, {
      key : "_cf",
      /**
       * @param {number} number
       * @return {?}
       */
      value(number) {
        return `${number * factor * size / 414}px Helvetica`;
      }
    }]), update;
  })();
  obj.default = value;
});
