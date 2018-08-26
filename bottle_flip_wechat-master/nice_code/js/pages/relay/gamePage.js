define("js/pages/relay/gamePage.js", (dataAndEvents, deepDataAndEvents, obj) => {
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
  const value = (() => {
    /**
     * @param {?} theGame
     * @return {undefined}
     */
    function init(theGame) {
      animate(this, init);
      this.game = theGame;
      /** @type {string} */
      this.name = "game";
      this.full2D = this.game.full2D;
      this.UI = this.game.UI;
    }
    return make(init, [{
      key : "show",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {number} */
        this.UI.scoreText.obj.position.x = -13.8;
        /** @type {number} */
        this.UI.scoreText.obj.position.y = 26;
        this.UI.scoreText.obj.scale.set(0.8, 0.8, 0.8);
        this.UI.scoreText.changeStyle({
          textAlign : "left"
        });
        this.UI.showScore();
      }
    }, {
      key : "hide",
      /**
       * @return {undefined}
       */
      value() {
        this.full2D.hide2D();
        this.UI.hideScore();
        /** @type {number} */
        this.UI.scoreText.obj.position.y = 21;
        /** @type {number} */
        this.UI.scoreText.obj.position.x = -13;
        this.UI.scoreText.obj.scale.set(1, 1, 1);
        this.UI.scoreText.changeStyle({
          textAlign : "left"
        });
      }
    }, {
      key : "hideScore",
      /**
       * @return {undefined}
       */
      value() {
        this.UI.hideScore();
        /** @type {number} */
        this.UI.scoreText.obj.position.y = 21;
        /** @type {number} */
        this.UI.scoreText.obj.position.x = -13;
        this.UI.scoreText.changeStyle({
          textAlign : "left"
        });
      }
    }]), init;
  })();
  obj.default = value;
});
