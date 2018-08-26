define("js/pages/group/groupPage.js", (dataAndEvents, deepDataAndEvents, obj) => {
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
  Object.defineProperty(obj, "__esModule", {
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
  const value = (() => {
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
      this.name = "groupRankList";
    }
    return HOP(save, [{
      key : "show",
      /**
       * @param {?} newValue
       * @param {?} thisValue
       * @return {undefined}
       */
      value(newValue, thisValue) {
        this.full2D.showGroupRankList(newValue, thisValue);
      }
    }, {
      key : "hide",
      /**
       * @return {undefined}
       */
      value() {
        this.full2D.hide2D();
      }
    }]), save;
  })();
  obj.default = value;
});
