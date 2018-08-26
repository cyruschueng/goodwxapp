define("js/pages/observe/observeWaiting.js", (dataAndEvents, deepDataAndEvents, obj) => {
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
      this.name = "viewerWaiting";
    }
    return addEnemy(Game, [{
      key : "show",
      /**
       * @return {undefined}
       */
      value() {
        const model = this.model.observeInfo;
        this.full2D.showLookersPage({
          type : "in",
          headimg : model.headimg,
          nickname : model.nickName
        });
        /** @type {number} */
        this.UI.scoreText.obj.position.x = 0;
        /** @type {number} */
        this.UI.scoreText.obj.position.y = 11;
        this.UI.scoreText.changeStyle({
          textAlign : "center"
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
        this.UI.scoreText.changeStyle({
          textAlign : "left"
        });
      }
    }]), Game;
  })();
  obj.default = value;
});
