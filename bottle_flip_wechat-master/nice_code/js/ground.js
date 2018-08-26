define("js/ground.js", ($sanitize, dataAndEvents, obj) => {
  /**
   * @param {?} dataAndEvents
   * @param {Function} value
   * @return {undefined}
   */
  function from(dataAndEvents, value) {
    if (!(dataAndEvents instanceof value)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  Object.defineProperty(obj, "__esModule", {
    value : true
  });
  const cmdAdd = (() => {
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
  const size = $sanitize("./config");
  /** @type {number} */
  const width = ($sanitize("./lib/animation"), window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth);
  /** @type {number} */
  const containerWidth = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
  const value = (() => {
    /**
     * @return {undefined}
     */
    function build() {
      const that = this;
      from(this, build);
      this.obj = new THREE.Object3D;
      /** @type {string} */
      this.obj.name = "ground";
      const geometry = new THREE.PlaneGeometry(containerWidth / width * size.FRUSTUMSIZE, size.FRUSTUMSIZE);
      /** @type {Array} */
      this.materials = [];
      /** @type {Element} */
      this.canvas = document.createElement("canvas");
      this.context = this.canvas.getContext("2d");
      /** @type {number} */
      this.canvas.width = 64;
      /** @type {number} */
      this.canvas.height = 64;
      /** @type {Array} */
      const old = [["rgba(215, 219, 230, 1)", "rgba(188, 190, 199, 1)"], ["rgba(255, 231, 220, 1)", "rgba(255, 196, 204, 1)"], ["rgba(255, 224, 163, 1)", "rgba(255, 202, 126, 1)"], ["rgba(255, 248, 185, 1)", "rgba(255, 245, 139, 1)"], ["rgba(218, 244, 255, 1)", "rgba(207, 233, 210, 1)"], ["rgba(219, 235, 255, 1)", "rgba(185, 213, 235, 1)"], ["rgba(216, 218, 255, 1)", "rgba(165, 176, 232, 1)"], ["rgba(207, 207, 207, 1)", "rgba(199, 196, 201, 1)"]];
      const obj = this;
      /** @type {number} */
      let i = 0;
      for (;i < 1;++i) {
        setTimeout((name => () => {
          obj.generateLaserBodyCanvas(old[name][0], old[name][1]);
          const texture = new THREE.Texture(obj.canvas);
          /** @type {boolean} */
          texture.needsUpdate = true;
          const material = new THREE.MeshBasicMaterial({
            map : texture,
            opacity : 1,
            transparent : true
          });
          obj.materials.push(material);
          const mesh = new THREE.Mesh(geometry, material);
          /** @type {number} */
          mesh.position.z = 0.1 * -(name + 1);
          /** @type {number} */
          mesh.name = name;
          mesh.updateMatrix();
          /** @type {boolean} */
          mesh.matrixAutoUpdate = false;
          obj.obj.add(mesh);
        })(i), 1E3 * i);
      }
      setTimeout(() => {
        /** @type {number} */
        let x = 1;
        for (;x < 1;++x) {
          /** @type {boolean} */
          that.obj.children[x].visible = false;
        }
      }, 8E3);
      /** @type {number} */
      this.current = 0;
    }
    return cmdAdd(build, [{
      key : "generateLaserBodyCanvas",
      /**
       * @param {?} color
       * @param {?} c
       * @return {undefined}
       */
      value(color, c) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const gradient = this.context.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, c);
        this.context.fillStyle = gradient;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }, {
      key : "changeColor",
      /**
       * @return {undefined}
       */
      value() {
        return;
      }
    }]), build;
  })();
  obj.default = value;
});
