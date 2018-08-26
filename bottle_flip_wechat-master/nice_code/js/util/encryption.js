define("js/util/encryption.js", ($sanitize, dataAndEvents, ctx) => {
  Object.defineProperty(ctx, "__esModule", {
    value : true
  });
  /**
   * @param {(Function|string)} global
   * @param {Object} string
   * @return {?}
   */
  ctx.encrypt = (global, string) => {
    string = string.slice(0, 16);
    const m = self.default.enc.Utf8.parse(string);
    const ast = self.default.enc.Utf8.parse(string);
    /** @type {(Function|string)} */
    let root = global;
    /** @type {string} */
    root = JSON.stringify(root);
    let r = self.default.AES.encrypt(root, m, {
      iv : ast,
      mode : self.default.mode.CBC,
      padding : self.default.pad.Pkcs7
    });
    return r = r.toString();
  };
  /**
   * @param {string} suffix
   * @param {string} prefix
   * @return {?}
   */
  ctx.encryptSeed = (suffix, prefix) => {
    const configFile = self.default.enc.Utf8.parse(`${prefix}_${suffix}`);
    let hex = self.default.SHA256(configFile).toString();
    return hex = hex.substr(0, 12), hex = parseInt(hex, 16), hex += 46704096E5;
  };
  var self = (d => d && d.__esModule ? d : {
    default : d
  })($sanitize("../lib/aes"));
});
