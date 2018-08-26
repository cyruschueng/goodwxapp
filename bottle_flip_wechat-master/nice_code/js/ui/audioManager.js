define("js/ui/audioManager.js", (require, dataAndEvents, obj) => {
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
  const game = require("../config");
  const value = (() => {
    /**
     * @param {?} theGame
     * @return {undefined}
     */
    function init(theGame) {
      const self = this;
      animate(this, init);
      this.game = theGame;
      /** @type {Array} */
      this.musicPool = ["success", "combo1", "combo2", "combo3", "combo4", "combo5", "combo6", "combo7", "combo8", "scale_intro", "scale_loop", "restart", "fall", "fall_2", "pop", "icon", "sing", "store", "pay", "luban", "relax"];
      this.musicPool.forEach((callback, i) => {
        setTimeout(function(src) {
          this[src] = wx.createInnerAudioContext();
          this[src].src = game.AUDIO[src];
        }.bind(self, callback), 2 * i);
      });
      setTimeout(() => {
        /** @type {boolean} */
        self.scale_loop.loop = true;
        self.icon.onEnded(() => {
          self.icon.destroy();
        });
        self.store.onPlay(() => {
          if (self.store.before) {
            self.store.before();
          }
        });
        self.store.onEnded(() => {
          if (self.store.after) {
            self.store.after();
          }
          /** @type {number} */
          self.timer = setTimeout(() => {
            if (self.canTimer) {
              self.store.seek(0);
              self.store.play();
            }
          }, 3E3);
        });
        self.pay.onPlay(() => {
          if (self.pay.before) {
            self.pay.before();
          }
        });
        self.pay.onEnded(() => {
          if (self.pay.after) {
            self.pay.after();
          }
          /** @type {number} */
          self.timer = setTimeout(() => {
            if (self.canTimer) {
              self.pay.seek(0);
              self.pay.play();
            }
          }, 3E3);
        });
        self.sing.onEnded(() => {
          /** @type {number} */
          self.timer = setTimeout(() => {
            if (self.canTimer) {
              self.sing.seek(0);
              self.sing.play();
            }
          }, 3E3);
        });
        self.luban.onEnded(() => {
          /** @type {number} */
          self.timer = setTimeout(() => {
            if (self.canTimer) {
              self.luban.seek(0);
              self.luban.play();
            }
          }, 3E3);
        });
        self.scale_intro.onEnded(() => {
          if ("prepare" == self.game.bottle.status) {
            self.scale_loop.play();
          }
        });
      }, 200);
    }
    return make(init, [{
      key : "resetAudio",
      /**
       * @return {undefined}
       */
      value() {
        const $timers = this;
        this.musicPool.forEach(num => {
          $timers[num].stop();
        });
      }
    }, {
      key : "register",
      /**
       * @param {?} r
       * @param {Function} f
       * @param {Function} callback
       * @return {undefined}
       */
      value(r, f, callback) {
        console.log("ley", r);
        /** @type {Function} */
        this[r].before = f;
        /** @type {Function} */
        this[r].after = callback;
      }
    }, {
      key : "setTimerFlag",
      /**
       * @param {?} thisValue
       * @return {undefined}
       */
      value(thisValue) {
        this.canTimer = thisValue;
      }
    }, {
      key : "clearTimer",
      /**
       * @return {undefined}
       */
      value() {
        if (this.timer) {
          clearTimeout(this.timer);
          /** @type {null} */
          this.timer = null;
        }
      }
    }, {
      key : "replay",
      /**
       * @param {?} event
       * @return {undefined}
       */
      value(event) {
        const target = this[event];
        if (target) {
          target.stop();
          target.play();
        } else {
          console.warn("there is no music", event);
        }
      }
    }]), init;
  })();
  obj.default = value;
});
