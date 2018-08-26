define("js/util/common.js", (require, dataAndEvents, ctx) => {
  Object.defineProperty(ctx, "__esModule", {
    value : true
  });
  ctx.checkUpdate = void 0;
  const Node = require("./../config");
  let self = void 0;
  if ("function" == typeof wx.getUpdateManager) {
    self = wx.getUpdateManager();
  }
  /**
   * @return {?}
   */
  ctx.checkUpdate = function() {
    const childNodeType = arguments.length > 0 && (void 0 !== arguments[0] && arguments[0]);
    arguments[1];
    return new Promise((jQuery, success) => {
      /**
       * @return {undefined}
       */
      function fn() {
        if (childNodeType == Node.VERSION) {
          jQuery();
        } else {
          success();
        }
      }
      if (0 == childNodeType && success(), self) {
        try {
          console.log("can use updateManager");
          self.onCheckForUpdate(dataAndEvents => {
            console.log("onCheckForUpdate");
            if (dataAndEvents.hasUpdate) {
              console.log("hasUpdate");
              wx.showLoading({
                mask : true,
                title : "\u6b63\u5728\u52aa\u529b\u66f4\u65b0\u4e2d\uff5e"
              });
            } else {
              console.log("dontHasUpdate");
              success();
            }
          });
          self.onUpdateReady(() => {
            console.log("updateReady");
            wx.hideLoading();
            self.applyUpdate();
          });
          self.onUpdateFailed(() => {
            console.log("updateFail");
            wx.hideLoading();
            success();
          });
        } catch (e) {
          fn();
        }
      } else {
        fn();
      }
    });
  };
});
