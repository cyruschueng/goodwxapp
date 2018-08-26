define("js/pages/relay/room.js", (dataAndEvents, deepDataAndEvents, obj) => {
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
      this.name = "relayRoom";
    }
    return HOP(save, [{
      key : "show",
      /**
       * @param {?} node
       * @return {undefined}
       */
      value(node) {
        const initialState = {
          players : node.playerlist,
          imgdata : node.room_wxa_code || "",
          game_status : node.game_status || 0,
          my_seat_no : node.my_seat_no,
          room_owner_seat : node.room_owner_seat,
          game_level : node.game_level || 0
        };
        console.log("\u663e\u793a\u623f\u95f4\u6570\u636e");
        this.full2D.showRelayRoom(initialState);
      }
    }, {
      key : "hide",
      /**
       * @return {undefined}
       */
      value() {
        if ((arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).hide2D || false) {
          this.full2D.hide2D();
        }
      }
    }]), save;
  })();
  obj.default = value;
});
