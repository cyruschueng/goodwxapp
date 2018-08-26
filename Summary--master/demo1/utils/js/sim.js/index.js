var constants = require('./lib/constants');
var login = require('./lib/login');
var Session = require('./lib/session');
var request = require('./lib/request');
var Tunnel = require('./lib/tunnel');
var util = require('./lib/util');

var exports = module.exports = {
    version: constants.version,
    server: constants.server,

    get: request.httpGet,
    post: request.httpPost,
    formatDate: util.formatDate,

    login: login.login,
    setLoginUrl: login.setLoginUrl,
    LoginError: login.LoginError,
    clearSession: Session.clear,
    request: request.request,
    RequestError: request.RequestError,
    Tunnel: Tunnel,
};

// 导出错误类型码
Object.keys(constants).forEach(function (key) {
    if (key.indexOf('ERR_') === 0) {
        exports[key] = constants[key];
    }
});