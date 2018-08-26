define("js/pages/singleSettlementPage.js", ($sanitize, dataAndEvents, obj) => {
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
  })($sanitize("../lib/three"));
  const value = (() => {
    /**
     * @param {Object} camera
     * @return {undefined}
     */
    function init(camera) {
      animate(this, init);
      const material = new THREE.MeshBasicMaterial({
        color : 32960
      });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
      const light = mesh.clone();
      const light2 = mesh.clone();
      light.position.set(0, -20, -1);
      mesh.position.set(-10, -20, -1);
      light2.position.set(10, -20, -1);
      /** @type {Array} */
      this.ui = [light, mesh, light2];
      /** @type {Object} */
      this.camera = camera;
    }
    return make(init, [{
      key : "show",
      /**
       * @return {undefined}
       */
      value() {
        const item = this;
        this.ui.forEach(dest => {
          item.camera.add(dest);
        });
      }
    }, {
      key : "hide",
      /**
       * @return {undefined}
       */
      value() {
        const self = this;
        this.ui.forEach(classToRemove => {
          self.camera.remove(classToRemove);
        });
      }
    }]), init;
  })();
  obj.default = value;
});
