module.exports = {
    ERRORS: {
        // 初始化错误
        ERR_WHEN_INIT_SDK: 'ERR_WHEN_INIT_SDK',
        ERR_INIT_SDK_LOST_CONFIG: 'ERR_INIT_SDK_LOST_CONFIG',
        ERR_WHEN_INIT_MYSQL: 'ERR_WHEN_INIT_MYSQL',

        // 腾讯云代小程序登录
        ERR_REQUEST_PARAM: 'ERR_REQUEST_PARAM',

        // 授权模板错误
        ERR_HEADER_MISSED: 'ERR_HEADER_MISSED',
        ERR_GET_SESSION_KEY: 'ERR_GET_SESSION_KEY',
        ERR_IN_DECRYPT_DATA: 'ERR_IN_DECRYPT_DATA',
        ERR_SKEY_INVALID: 'ERR_SKEY_INVALID',

        // 数据库错误
        DBERR: {
            ERR_WHEN_INSERT_TO_DB: 'ERR_WHEN_INSERT_TO_DB',
            ERR_NO_SKEY_ON_CALL_GETUSERINFOFUNCTION: 'ERR_NO_SKEY_ON_CALL_GETUSERINFOFUNCTION'
        }
    },

    LOGIN_STATE: {
        SUCCESS: 1,  // 登陆成功
        FAILED: 0    // 登录失败
    }
}
