define("js/wave.js", ($sanitize, dataAndEvents, obj) => {
  /**
   * @param {?} dataAndEvents
   * @param {Function} init
   * @return {undefined}
   */
  function animate(dataAndEvents, init) {
    if (!(dataAndEvents instanceof init)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  Object.defineProperty(obj, "__esModule", {
    value : true
  });
  const make = (() => {
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
  const definition = $sanitize("./config");
  const geometry = new THREE.RingBufferGeometry(definition.WAVE.innerRadius, definition.WAVE.outerRadius, definition.WAVE.thetaSeg);
  const value = (() => {
    /**
     * @return {undefined}
     */
    function init() {
      animate(this, init);
      const legMaterial = new THREE.MeshBasicMaterial({
        color : definition.COLORS.pureWhite,
        transparent : true
      });
      this.obj = new THREE.Mesh(geometry, legMaterial);
      /** @type {number} */
      this.obj.rotation.x = -Math.PI / 2;
      /** @type {string} */
      this.obj.name = "wave";
    }
    return make(init, [{
      key : "reset",
      /**
       * @return {undefined}
       */
      value() {
        this.obj.scale.set(1, 1, 1);
        /** @type {number} */
        this.obj.material.opacity = 1;
        /** @type {boolean} */
        this.obj.visible = false;
      }
    }]), init;
  })();
  obj.default = value;
});
