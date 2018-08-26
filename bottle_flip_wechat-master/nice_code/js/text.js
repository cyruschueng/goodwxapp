define("js/text.js", ($sanitize, dataAndEvents, obj) => {
  /**
   * @param {?} dataAndEvents
   * @param {Function} events
   * @return {undefined}
   */
  function clone(dataAndEvents, events) {
    if (!(dataAndEvents instanceof events)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  Object.defineProperty(obj, "__esModule", {
    value : true
  });
  const one = (() => {
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
  const THREE = (source => {
    if (source && source.__esModule) {
      return source;
    }
    const obj = {};
    if (null != source) {
      let prop;
      for (prop in source) {
        if (Object.prototype.hasOwnProperty.call(source, prop)) {
          obj[prop] = source[prop];
        }
      }
    }
    return obj.default = source, obj;
  })($sanitize("./lib/three"));
  const attr = ($sanitize("./config"), (d => d && d.__esModule ? d : {
    default : d
  })($sanitize("./font")));
  const value = (() => {
    /**
     * @param {string} x
     * @param {Object} options
     * @return {undefined}
     */
    function fn(x, options) {
      if (clone(this, fn), this.material = new THREE.MeshBasicMaterial({
        color : options.fillStyle || 16777215,
        transparent : true
      }), options.opacity && (this.material.opacity = options.opacity), this.options = options || {}, this.obj = new THREE.Object3D, this.obj.name = "text", options.chinese) {
        const obj = new THREE.Mesh(new THREE.TextBufferGeometry(x, {
          font : attr.default,
          size : 1,
          height : 0.1
        }), this.material);
        this.obj.add(obj);
        if ("center" == options.textAlign) {
          /** @type {number} */
          obj.position.x = 1.1 * x.length / -2;
        }
      } else {
        /** @type {Array} */
        this.scores = [];
        this.plus = new THREE.Mesh(new THREE.TextBufferGeometry("+", {
          font : attr.default,
          size : 3,
          height : 0.1
        }), this.material);
        this.sub = new THREE.Mesh(new THREE.TextBufferGeometry("-", {
          font : attr.default,
          size : 3,
          height : 0.1
        }), this.material);
        /** @type {number} */
        const padLength = this.options.sumScore ? 5 : 2;
        /** @type {number} */
        let width = 0;
        for (;width < 10;++width) {
          /** @type {Array} */
          const copies = [];
          const geometry = new THREE.TextBufferGeometry(width, {
            font : attr.default,
            size : 3,
            height : 0.1
          });
          /** @type {number} */
          let i = 0;
          for (;i < padLength;++i) {
            const mesh = new THREE.Mesh(geometry, this.material);
            /** @type {boolean} */
            mesh.using = false;
            copies.push(mesh);
          }
          this.scores.push(copies);
        }
        this.setScore(x);
      }
    }
    return one(fn, [{
      key : "setScore",
      /**
       * @param {?} code
       * @return {undefined}
       */
      value(code) {
        /** @type {boolean} */
        this.sub.visible = false;
        /** @type {boolean} */
        this.plus.visible = false;
        /** @type {boolean} */
        let t = false;
        if (code < 0) {
          /** @type {boolean} */
          t = true;
          /** @type {number} */
          code = Math.abs(code);
        }
        /** @type {number} */
        const i = 2.5 * (code = code.toString()).length;
        /** @type {number} */
        const subLn = this.options.sumScore ? 5 : 2;
        /** @type {number} */
        let lon = "center" == this.options.textAlign ? -i / 2 : 0;
        if (this.options.plusScore) {
          /** @type {number} */
          lon = -(i + 2.5) / 2;
          if (t) {
            /** @type {number} */
            this.sub.position.x = lon;
            this.obj.add(this.sub);
            /** @type {boolean} */
            this.sub.visible = true;
          } else {
            /** @type {number} */
            this.plus.position.x = lon;
            this.obj.add(this.plus);
            /** @type {boolean} */
            this.plus.visible = true;
          }
          lon += 2.5;
        }
        /** @type {number} */
        let filter = 0;
        let ilen = this.scores.length;
        for (;filter < ilen;++filter) {
          /** @type {number} */
          j = 0;
          for (;j < subLn;++j) {
            if (this.scores[filter][j].using) {
              this.obj.remove(this.scores[filter][j]);
              /** @type {boolean} */
              this.scores[filter][j].using = false;
            }
          }
        }
        /** @type {number} */
        filter = 0;
        ilen = code.length;
        for (;filter < ilen;++filter) {
          const cs = this.scores[code[filter]];
          /** @type {number} */
          var j = 0;
          for (;j < subLn;++j) {
            if (!cs[j].using) {
              /** @type {number} */
              cs[j].position.x = lon;
              /** @type {boolean} */
              cs[j].using = true;
              this.obj.add(cs[j]);
              break;
            }
          }
          lon += 2.5;
        }
      }
    }, {
      key : "changeStyle",
      /**
       * @param {?} collection
       * @return {undefined}
       */
      value(collection) {
        Object.assign(this.options, collection);
        this.obj.updateMatrix();
      }
    }]), fn;
  })();
  obj.default = value;
});
