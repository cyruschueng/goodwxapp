define("js/viewer.js", ($sanitize, dataAndEvents, object) => {
  /**
   * @param {?} dataAndEvents
   * @param {Function} data
   * @return {undefined}
   */
  function proxy(dataAndEvents, data) {
    if (!(dataAndEvents instanceof data)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  Object.defineProperty(object, "__esModule", {
    value : true
  });
  const addEnemy = (() => {
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
  const obj = ((source => {
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
  })($sanitize("./lib/three")), (d => d && d.__esModule ? d : {
    default : d
  })($sanitize("./pages/lookers")));
  const prototype = (() => {
    /**
     * @param {?} camera
     * @return {undefined}
     */
    function Game(camera) {
      proxy(this, Game);
      /** @type {number} */
      this.num = 0;
      /** @type {Array} */
      this.list = [];
      /** @type {Array} */
      this.imgPlanes = [];
      this.camera = camera;
      this.lookers = new obj.default({
        camera
      });
      /** @type {boolean} */
      this.isOpen = false;
    }
    return addEnemy(Game, [{
      key : "peopleCome",
      /**
       * @param {?} callback
       * @return {undefined}
       */
      value(callback) {
        if (!(this.list.findIndex(dataAndEvents => !!dataAndEvents && dataAndEvents.audience_openid == callback.audience_openid) > -1)) {
          this.list.push(callback);
          this.num++;
          if (this.isOpen) {
            this.showAvatar();
          }
        }
      }
    }, {
      key : "peopleOut",
      /**
       * @param {?} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        const index = this.list.findIndex(dataAndEvents => !!dataAndEvents && dataAndEvents.audience_openid == thisValue.audience_openid);
        if (!(index < 0)) {
          /** @type {number} */
          this.num = this.num - 1 < 0 ? 0 : this.num - 1;
          this.list.splice(index, 1);
          if (this.isOpen) {
            this.showAvatar();
          }
        }
      }
    }, {
      key : "showAvatar",
      /**
       * @return {undefined}
       */
      value() {
        if (this.num > 0) {
          /** @type {Array} */
          const listeners = [];
          /** @type {number} */
          let decimal = 1;
          for (;decimal < 4;decimal++) {
            if (this.list.length - decimal >= 0) {
              listeners.unshift(this.list[this.list.length - decimal].audience_headimg);
            }
          }
          this.lookers.showLookers({
            avaImg : true,
            icon : true,
            wording : false,
            num : this.num,
            avatar : listeners
          });
        } else {
          this.lookers.showLookers({
            avaImg : false,
            icon : true,
            wording : false
          });
        }
      }
    }, {
      key : "open",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {boolean} */
        this.isOpen = true;
        this.showAvatar();
      }
    }, {
      key : "close",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {boolean} */
        this.isOpen = false;
        this.hideAll();
      }
    }, {
      key : "reset",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {number} */
        this.num = 0;
        /** @type {Array} */
        this.list = [];
        this.lookers.hideLookers();
      }
    }, {
      key : "hideAll",
      /**
       * @return {undefined}
       */
      value() {
        this.lookers.hideLookers();
      }
    }]), Game;
  })();
  object.default = prototype;
});
