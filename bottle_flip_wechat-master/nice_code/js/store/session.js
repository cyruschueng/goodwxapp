define("js/store/session.js", (dataAndEvents, deepDataAndEvents, obj) => {
  /**
   * @param {?} dataAndEvents
   * @param {Function} object
   * @return {undefined}
   */
  function stub(dataAndEvents, object) {
    if (!(dataAndEvents instanceof object)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  Object.defineProperty(obj, "__esModule", {
    value : true
  });
  const onErrorFnPrev = (() => {
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
     * @return {undefined}
     */
    function error() {
      stub(this, error);
    }
    return onErrorFnPrev(error, null, [{
      key : "init",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {string} */
        this.sessionId = "";
        /** @type {string} */
        this.gameId = "";
        /** @type {string} */
        this.gameTicket = "";
        /** @type {string} */
        this.serverConfig = "";
        /** @type {string} */
        this.shareTicket = "";
        /** @type {string} */
        this.pkId = "";
        /** @type {string} */
        this.serverConfig = "";
      }
    }, {
      key : "setLoginState",
      /**
       * @param {(Image|string)} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        /** @type {(Image|string)} */
        this.sessionId = thisValue;
      }
    }, {
      key : "setGameId",
      /**
       * @param {?} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        this.gameId = thisValue;
      }
    }, {
      key : "setGameTicket",
      /**
       * @param {(Image|string)} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        /** @type {(Image|string)} */
        this.gameTicket = thisValue;
      }
    }, {
      key : "setServerConfig",
      /**
       * @param {(Image|string)} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        /** @type {(Image|string)} */
        this.serverConfig = thisValue;
      }
    }, {
      key : "setShareTicket",
      /**
       * @param {?} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        this.shareTicket = thisValue;
      }
    }, {
      key : "setPkId",
      /**
       * @param {(Image|string)} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        /** @type {(Image|string)} */
        this.pkId = thisValue;
      }
    }, {
      key : "clearPkId",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {string} */
        this.pkId = "";
      }
    }, {
      key : "clearGameId",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {string} */
        this.gameId = "";
      }
    }, {
      key : "clearShareTicket",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {string} */
        this.ShareTicket = "";
      }
    }, {
      key : "clearGameTicket",
      /**
       * @return {undefined}
       */
      value() {
        /** @type {string} */
        this.gameTicket = "";
      }
    }, {
      key : "setServerConfig",
      /**
       * @param {?} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        this.serverConfig = thisValue;
      }
    }]), error;
  })();
  obj.default = value;
});
