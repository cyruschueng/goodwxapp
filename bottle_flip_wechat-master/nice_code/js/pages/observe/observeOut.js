define("js/pages/observe/observeOut.js", (dataAndEvents, deepDataAndEvents, obj) => {
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
  Object.defineProperty(obj, "__esModule", {
    value : true
  });
  const addEnemy = (() => {
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
     * @param {?} game
     * @return {undefined}
     */
    function Game(game) {
      proxy(this, Game);
      this.game = game;
      this.model = this.game.gameModel;
      this.full2D = this.game.full2D;
      this.UI = this.game.UI;
      /** @type {string} */
      this.name = "viewerOut";
    }
    return addEnemy(Game, [{
      key : "show",
      /**
       * @return {undefined}
       */
      value() {
        const model = this.model.observeInfo;
        this.full2D.showLookersPage({
          type : "out",
          headimg : model.headimg,
          nickname : model.nickName
        });
        this.UI.hideScore();
      }
    }, {
      key : "hide",
      /**
       * @return {undefined}
       */
      value() {
        this.full2D.hide2D();
      }
    }]), Game;
  })();
  obj.default = value;
});
