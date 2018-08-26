define("js/ui.js", ($sanitize, dataAndEvents, object) => {
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
  Object.defineProperty(object, "__esModule", {
    value : true
  });
  const make = (() => {
    /**
     * @param {Function} object
     * @param {Array} obj
     * @return {undefined}
     */
    function defineProperty(object, obj) {
      /** @type {number} */
      let i = 0;
      for (;i < obj.length;i++) {
        const desc = obj[i];
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
    return (x, walkers, a) => (walkers && defineProperty(x.prototype, walkers), a && defineProperty(x, a), x);
  })();
  const self = ((source => {
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
    /** @type {Object} */
    obj.default = source;
  })($sanitize("./lib/three")), $sanitize("./config"));
  const obj = ($sanitize("./lib/animation"), (d => d && d.__esModule ? d : {
    default : d
  })($sanitize("./text")));
  /** @type {number} */
  const n = window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth;
  const prototype = (window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth, (() => {
    /**
     * @param {?} scene
     * @param {?} camera
     * @param {?} allBindingsAccessor
     * @param {?} theGame
     * @return {undefined}
     */
    function init(scene, camera, allBindingsAccessor, theGame) {
      animate(this, init);
      this.game = theGame;
      this.full2D = allBindingsAccessor;
      this.scene = scene;
      this.camera = camera;
      /** @type {number} */
      this.score = 0;
      /** @type {number} */
      this.double = 1;
      this.scoreText = new obj.default("0", {
        fillStyle : 2434341,
        sumScore : true,
        opacity : 0.8
      });
      this.scoreText.obj.position.set(-13, 21, -10);
      this.scoreText.obj.updateMatrix();
      /** @type {boolean} */
      this.scoreText.obj.matrixAutoUpdate = false;
      this.camera.add(this.scoreText.obj);
    }
    return make(init, [{
      key : "reset",
      /**
       * @return {undefined}
       */
      value() {
        this.scoreText.setScore(0);
        /** @type {number} */
        this.score = 0;
        /** @type {number} */
        this.double = 1;
      }
    }, {
      key : "update",
      /**
       * @return {undefined}
       */
      value() {
      }
    }, {
      key : "hideScore",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {boolean} */
        this.scoreText.obj.visible = false;
      }
    }, {
      key : "showScore",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {boolean} */
        this.scoreText.obj.visible = true;
      }
    }, {
      key : "addScore",
      /**
       * @param {number} thisValue
       * @param {?} newValue
       * @param {?} firstTime
       * @param {?} pathToValue
       * @return {?}
       */
      value(thisValue, newValue, firstTime, pathToValue) {
        if (pathToValue) {
          return this.score += thisValue, void this.setScore(this.score);
        }
        if (newValue) {
          if (1 === this.double) {
            /** @type {number} */
            this.double = 2;
          } else {
            this.double += 2;
          }
        } else {
          /** @type {number} */
          this.double = 1;
        }
        if (firstTime) {
          if (this.double <= 2) {
            this.double *= 2;
          }
        }
        /** @type {number} */
        this.double = Math.min(32, this.double);
        thisValue *= this.double;
        this.score += thisValue;
        this.setScore(this.score);
      }
    }, {
      key : "setScore",
      /**
       * @param {?} newValue
       * @return {undefined}
       */
      value(newValue) {
        this.scoreText.setScore(newValue);
        self.BLOCK.minRadiusScale -= 0.005;
        /** @type {number} */
        self.BLOCK.minRadiusScale = Math.max(0.25, self.BLOCK.minRadiusScale);
        self.BLOCK.maxRadiusScale -= 0.005;
        /** @type {number} */
        self.BLOCK.maxRadiusScale = Math.max(self.BLOCK.maxRadiusScale, 0.6);
        self.BLOCK.maxDistance += 0.03;
        /** @type {number} */
        self.BLOCK.maxDistance = Math.min(22, self.BLOCK.maxDistance);
      }
    }]), init;
  })());
  object.default = prototype;
});
