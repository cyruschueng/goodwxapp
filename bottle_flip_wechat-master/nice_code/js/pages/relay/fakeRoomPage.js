define("js/pages/relay/fakeRoomPage.js", (dataAndEvents, deepDataAndEvents, obj) => {
  /**
   * @param {?} object
   * @param {Function} value
   * @return {undefined}
   */
  function freeze(object, value) {
    if (!(object instanceof value)) {
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
      freeze(this, init);
      this.game = theGame;
      this.model = this.game.gameModel;
      this.full2D = this.game.full2D;
      /** @type {string} */
      this.name = "loading";
    }
    return make(init, [{
      key : "show",
      /**
       * @param {boolean} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        this.full2D.showRelayRoom({
          players : [],
          imgdata : "",
          game_status : 0,
          my_seat_no : thisValue ? 1 : 0,
          room_owner_seat : 1
        });
      }
    }, {
      key : "hide",
      /**
       * @return {undefined}
       */
      value() {
        this.full2D.hide2D();
      }
    }]), init;
  })();
  obj.default = value;
});
