define("js/util/util.js", (dataAndEvents, deepDataAndEvents, global) => {
  Object.defineProperty(global, "__esModule", {
    value : true
  });
  const $ = global.Util = {};
  const self = wx.getFileSystemManager();
  window.fileManager = self;
  /**
   * @param {Object} data
   * @return {undefined}
   */
  const callback = data => {
    self.saveFile({
      tempFilePath : data.tempFilePath,
      filePath : `${wx.env.USER_DATA_PATH}/${data.filePath}`,
      /**
       * @return {undefined}
       */
      success() {
        if (data.success) {
          data.success();
        }
      },
      /**
       * @return {undefined}
       */
      fail() {
        if (data.fail) {
          data.fail();
        }
      }
    });
  };
  /**
   * @param {Object} data
   * @return {undefined}
   */
  $.saveFile = data => {
    const parts = data.filePath.split("/");
    if (parts.length >= 2) {
      self.access({
        path : `${wx.env.USER_DATA_PATH}/${parts[0]}`,
        /**
         * @return {undefined}
         */
        success() {
          console.log("success, access dir");
          callback(data);
        },
        /**
         * @return {undefined}
         */
        fail() {
          self.mkdir({
            dirPath : `${wx.env.USER_DATA_PATH}/${parts[0]}`,
            /**
             * @return {undefined}
             */
            success() {
              console.log("mrk dir ok");
              callback(data);
            },
            /**
             * @return {undefined}
             */
            fail() {
              console.log("fail mrk dir");
              if (data.fail) {
                data.fail();
              }
            }
          });
        }
      });
    }
  };
  /**
   * @param {Array} a
   * @return {undefined}
   */
  $.deleteFiles = a => {
    /** @type {number} */
    let i = 0;
    const aLength = a.length;
    for (;i < aLength;++i) {
      self.unlinkSync(`${wx.env.USER_DATA_PATH}/${a[i]}`);
    }
  };
  /**
   * @param {string} doc
   * @return {undefined}
   */
  $.removeDirsNotInList = doc => {
    console.log("remove list", doc);
    if (doc) {
      self.readdir({
        dirPath : wx.env.USER_DATA_PATH,
        /**
         * @param {(Event|HTMLInputElement)} status
         * @return {undefined}
         */
        success(status) {
          const files = status.files;
          /** @type {number} */
          let idx = 0;
          const len = files.length;
          for (;idx < len;++idx) {
            if (!doc.includes(files[idx])) {
              console.log("remove dirs", files[idx]);
              wx.removeStorage({
                key : `skin_${files[idx]}`,
                /**
                 * @return {undefined}
                 */
                success() {
                }
              });
              self.rmdir({
                filePath : `${wx.env.USER_DATA_PATH}/${files[idx]}`,
                /**
                 * @return {undefined}
                 */
                success() {
                  console.log("remove dir ok");
                }
              });
            }
          }
        },
        /**
         * @param {?} msg
         * @return {undefined}
         */
        fail(msg) {
          console.log("faile", msg);
        }
      });
    }
  };
  /**
   * @param {Object} opts
   * @return {undefined}
   */
  $.downloadSaveFile = opts => {
    wx.downloadFile({
      url : opts.url,
      header : opts.header || "",
      /**
       * @param {?} textStatus
       * @return {undefined}
       */
      success(textStatus) {
        console.log("download okkkkkk");
        $.saveFile({
          filePath : opts.filePath,
          tempFilePath : textStatus.tempFilePath,
          success : opts.success,
          fail : opts.fail
        });
      },
      /**
       * @param {?} msg
       * @return {undefined}
       */
      fail(msg) {
        console.log("fail download", msg);
        if (opts.fail) {
          opts.fail();
        }
      }
    });
  };
});
