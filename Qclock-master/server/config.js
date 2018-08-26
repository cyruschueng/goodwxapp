var secret = require('./secret.js')

const CONF = {
    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: secret.appID,

    // 微信小程序 App Secret
    appSecret: secret.appSecret,

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: true,
    serverHost: '761549265.yangxiaochen.xyz',
    tunnelServerUrl: 'localhost',
    tunnelSignatureKey: 'localhost',
    // 腾讯云相关配置可以查看云 API 秘钥控制台：https://console.qcloud.com/capi
    qcloudAppId: secret.qcloud.qcloudAppId,
    qcloudSecretId: secret.qcloud.qcloudSecretId,
    qcloudSecretKey: secret.qcloud.qcloudSecretKey,
    wxMessageToken: 'localhost',
    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: secret.mysql,

    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'qcloudtest',
        // 文件夹
        uploadFolder: ''
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,
    wxMessageToken: 'abcdefgh'
}

// module.exports = process.env.NODE_ENV === 'local' ? Object.assign({}, CONF, require('./config.local')) : CONF;
module.exports =  CONF;
