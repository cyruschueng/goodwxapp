define("js/gameView.js", (dataAndEvents, deepDataAndEvents, obj) => {
  /**
   * @param {?} value
   * @param {Function} type
   * @return {undefined}
   */
  function round(value, type) {
    if (!(value instanceof type)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  Object.defineProperty(obj, "__esModule", {
    value : true
  });
  const A = (() => {
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
     * @param {?} g
     * @return {undefined}
     */
    function n(g) {
      round(this, n);
      this.game = g;
    }
    return A(n, [{
      key : "init",
      /**
       * @return {undefined}
       */
      value() {
      }
    }, {
      key : "showIdentifyModeErr",
      /**
       * @param {?} newValue
       * @return {undefined}
       */
      value(newValue) {
        this.showModal(newValue);
      }
    }, {
      key : "showNoSession",
      /**
       * @return {undefined}
       */
      value() {
        this.showModal();
      }
    }, {
      key : "showGetPkIdFail",
      /**
       * @return {undefined}
       */
      value() {
        this.showModal();
      }
    }, {
      key : "showGroupShareFail",
      /**
       * @return {undefined}
       */
      value() {
        const r20 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "\u7f51\u7edc\u5f02\u5e38,\u70b9\u51fb\u786e\u5b9a\u56de\u5230\u6e38\u620f";
        this.showModal(r20);
      }
    }, {
      key : "showGoToBattleFail",
      /**
       * @return {undefined}
       */
      value() {
        this.showModal();
      }
    }, {
      key : "showUploadPkScoreFail",
      /**
       * @return {undefined}
       */
      value() {
        this.showModal("\u6570\u636e\u4e0a\u4f20\u5931\u8d25");
      }
    }, {
      key : "showShareObserveCardFail",
      /**
       * @param {?} newValue
       * @return {undefined}
       */
      value(newValue) {
        this.showModal(newValue);
      }
    }, {
      key : "showObserveStateFail",
      /**
       * @return {undefined}
       */
      value() {
        this.showModal("\u670d\u52a1\u5668\u5f02\u5e38");
      }
    }, {
      key : "showModal",
      /**
       * @return {undefined}
       */
      value() {
        const h = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "\u7f51\u7edc\u5f02\u5e38,\u70b9\u51fb\u786e\u5b9a\u56de\u5230\u6e38\u620f";
        wx.showModal({
          title : "\u63d0\u793a",
          content : h,
          showCancel : false
        });
      }
    }, {
      key : "showServeConfigForbiddenObserveMode",
      /**
       * @return {undefined}
       */
      value() {
        this.showModal("\u5f53\u524d\u56f4\u89c2\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5");
      }
    }, {
      key : "showServeConfigForbiddenGroupShare",
      /**
       * @return {undefined}
       */
      value() {
        this.showModal("\u67e5\u770b\u7fa4\u6392\u884c\u4eba\u6570\u8fc7\u591a\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5");
      }
    }, {
      key : "showSocketCloseErr",
      /**
       * @return {undefined}
       */
      value() {
      }
    }, {
      key : "showJoinRelayFail",
      /**
       * @return {undefined}
       */
      value() {
        const failureMessage = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        this.showModal(`\u52a0\u5165\u6e38\u620f\u5931\u8d25(${failureMessage})\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u540e\u91cd\u8bd5`);
      }
    }, {
      key : "showVersionMismatching",
      /**
       * @return {undefined}
       */
      value() {
        this.showModal("\u52a0\u5165\u6e38\u620f\u5931\u8d25,\u6e38\u620f\u7248\u672c\u4e0d\u4e00\u81f4");
      }
    }, {
      key : "showJoinRelayFail2",
      /**
       * @return {undefined}
       */
      value() {
        this.showModal("\u7f51\u7edc\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5");
      }
    }, {
      key : "showJoinNextRoomFail",
      /**
       * @return {undefined}
       */
      value() {
        this.showModal("\u83b7\u53d6\u623f\u95f4\u4fe1\u606f\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5");
      }
    }, {
      key : "showSyncopErr",
      /**
       * @return {undefined}
       */
      value() {
      }
    }]), n;
  })();
  obj.default = value;
});
