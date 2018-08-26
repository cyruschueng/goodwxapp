efine("js/pages/single/singleGameOverPage.js", (dataAndEvents, deepDataAndEvents, obj) => {
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
      this.name = "singleSettlementPgae";
    }
    return HOP(save, [{
      key : "show",
      /**
       * @param {?} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        /** @type {number} */
        let banType = 0;
        if (thisValue) {
          banType = thisValue.banType || 0;
        }
        const score = this.model.currentScore;
        const highest_score = this.model.getHighestScore();
        const startTime = this.model.startTime;
        const items = this.model.weekBestScore;
        const game_cnt = this.game.historyTimes.getTimes();
        if (!this.full2D) {
          this.game.handleWxOnError({
            message : "can not find full 2D gameOverPage",
            stack : ""
          });
        }
        if (this.full2D) {
          this.full2D.showGameOverPage({
            score,
            highest_score,
            start_time : startTime,
            week_best_score : items,
            game_cnt,
            banType
          });
        }
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
