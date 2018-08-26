define("js/pages/single/relayGuide.js", (require, dataAndEvents, object) => {
  /**
   * @param {?} dataAndEvents
   * @param {Function} obj
   * @return {undefined}
   */
  function keys(dataAndEvents, obj) {
    if (!(dataAndEvents instanceof obj)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  Object.defineProperty(object, "__esModule", {
    value : true
  });
  const HOP = (() => {
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
  })(require("../../lib/mue/eventcenter"));
  const ecConfig = require("../../config");
  const prototype = (() => {
    /**
     * @param {?} attrs
     * @return {undefined}
     */
    function save(attrs) {
      keys(this, save);
      this.game = attrs;
      this.model = this.game.gameModel;
      this.full2D = this.game.full2D;
      /** @type {string} */
      this.name = "startPage";
    }
    return HOP(save, [{
      key : "show",
      /**
       * @param {?} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        this.full2D.showRelayBeginner();
      }
    }, {
      key : "hide",
      /**
       * @return {undefined}
       */
      value() {
        obj.default.emitSync(ecConfig.EVENT.SKIP_RELAY_GUIDE);
        this.full2D.hide2D();
      }
    }]), save;
  })();
  object.default = prototype;
});
