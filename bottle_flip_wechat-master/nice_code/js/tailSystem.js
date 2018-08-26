define("js/tailSystem.js", ($sanitize, dataAndEvents, obj) => {
  /**
   * @param {?} value
   * @param {Function} type
   * @return {undefined}
   */
  function prop(value, type) {
    if (!(value instanceof type)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  Object.defineProperty(obj, "__esModule", {
    value : true
  });
  const requestAnimFrame = (() => {
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
  })($sanitize("./lib/three.js"));
  const options = {
    duration : 100,
    height : 2,
    width : 0.5,
    distance : 0.5
  };
  const value = (() => {
    /**
     * @param {?} scene
     * @param {Object} rows
     * @return {undefined}
     */
    function render(scene, rows) {
      prop(this, render);
      this.scene = scene;
      /** @type {Object} */
      this.bottle = rows;
      /** @type {Array} */
      this.tailsRemainPool = [];
      /** @type {Array} */
      this.tailsUsingPool = [];
      this.lastDotPosition = this.bottle.obj.position.clone();
      this.nowPosition = this.bottle.obj.position.clone();
      /** @type {number} */
      this.distance = options.distance;
      this.init();
    }
    return requestAnimFrame(render, [{
      key : "init",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {number} */
        const width = options.width;
        /** @type {number} */
        const height = options.height;
        this.geometry = new THREE.PlaneBufferGeometry(width, height);
        this.material = new THREE.MeshBasicMaterial({
          color : 16777215,
          side : THREE.DoubleSide,
          transparent : true,
          opacity : 0.3
        });
        /** @type {number} */
        let s = 0;
        for (;s < 20;s++) {
          const mesh = new Type(this.geometry, this.material);
          this.scene.add(mesh.mesh);
          this.tailsRemainPool.push(mesh);
        }
      }
    }, {
      key : "update",
      /**
       * @param {number} g
       * @return {undefined}
       */
      value(g) {
        if (this.updateActiveCell(g), "prepare" == this.bottle.status && (this.nowPosition = this.bottle.obj.position.clone(), this.lastDotPosition = this.bottle.obj.position.clone()), "jump" == this.bottle.status) {
          let distance = void 0;
          if (this.nowPosition = this.bottle.obj.position.clone(), (distance = this.nowPosition.clone().distanceTo(this.lastDotPosition.clone())) < 5) {
            if (distance >= this.distance) {
              /** @type {number} */
              const num = distance / this.distance;
              /** @type {number} */
              const n = Math.floor(num);
              let record = this.lastDotPosition.clone();
              let template = this.nowPosition.clone();
              /** @type {number} */
              const normG = g / options.duration;
              /** @type {number} */
              let len = 1;
              for (;len <= n;len++) {
                template = this.lastDotPosition.clone().lerp(this.nowPosition.clone(), len / num);
                /** @type {number} */
                let seconds = 1 + normG * (len / num - 1);
                /** @type {number} */
                seconds = seconds <= 0 ? 0 : seconds;
                this.layEgg(record.clone(), template.clone(), seconds);
                record = template.clone();
                if (len == n) {
                  this.lastDotPosition = template.clone();
                }
              }
            }
          } else {
            this.lastDotPosition = this.nowPosition.clone();
          }
        }
      }
    }, {
      key : "updateActiveCell",
      /**
       * @param {number} g
       * @return {undefined}
       */
      value(g) {
        const codeSegments = this.tailsUsingPool;
        /** @type {number} */
        const ix = 1 / options.duration;
        /** @type {number} */
        let i = (options.duration, 0);
        for (;i < codeSegments.length;i++) {
          codeSegments[i].tickTime += g;
          /** @type {number} */
          const y = codeSegments[i].mesh.scale.y - ix * g;
          if (y > 0) {
            if (codeSegments[i].mesh.scale.y = y > 0 ? y : 0, codeSegments[i].tickTime >= options.duration) {
              codeSegments[i].reset();
              const copies = codeSegments.shift();
              this.tailsRemainPool.push(copies);
              i--;
            }
          } else {
            codeSegments[i].reset();
            const templatePromise = codeSegments.shift();
            this.tailsRemainPool.push(templatePromise);
            i--;
          }
        }
      }
    }, {
      key : "correctPosition",
      /**
       * @return {undefined}
       */
      value() {
        this.lastDotPosition = this.bottle.obj.position.clone();
      }
    }, {
      key : "layEgg",
      /**
       * @param {?} from
       * @param {?} pos
       * @return {undefined}
       */
      value(from, pos) {
        const ry = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
        const _this = this.getMesh();
        this.tailsUsingPool.push(_this);
        _this.mesh.position.set(pos.x, pos.y, pos.z);
        _this.mesh.scale.y = ry;
        _this.mesh.lookAt(from);
        _this.mesh.rotateY(Math.PI / 2);
        /** @type {boolean} */
        _this.mesh.visible = true;
      }
    }, {
      key : "getMesh",
      /**
       * @return {?}
       */
      value() {
        let object = this.tailsRemainPool.shift();
        return object || (object = new Type(this.geometry, this.material), this.scene.add(object.mesh)), object;
      }
    }, {
      key : "allReset",
      /**
       * @return {undefined}
       */
      value() {
        this.tailsRemainPool.forEach(record => {
          record.reset();
        });
      }
    }]), render;
  })();
  obj.default = value;
  var Type = (() => {
    /**
     * @param {Array} geometry
     * @param {Array} material
     * @return {undefined}
     */
    function init(geometry, material) {
      prop(this, init);
      /** @type {number} */
      this.tickTime = 0;
      this.mesh = new THREE.Mesh(geometry, material);
      /** @type {boolean} */
      this.mesh.visible = false;
      /** @type {string} */
      this.mesh.name = "tail";
    }
    return requestAnimFrame(init, [{
      key : "reset",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {number} */
        this.tickTime = 0;
        this.mesh.scale.set(1, 1, 1);
        /** @type {boolean} */
        this.mesh.visible = false;
      }
    }]), init;
  })();
});
