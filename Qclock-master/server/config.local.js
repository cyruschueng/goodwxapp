const secret = require('./secret.js')

module.exports = {
    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        pass: 'wenweiyv',
        db: 'cAuth',
        char: 'utf8mb4'
    },
    serverHost: 'localhost',
    tunnelServerUrl: 'localhost',
    tunnelSignatureKey: 'localhost',
    // 腾讯云相关配置可以查看云 API 秘钥控制台：https://console.qcloud.com/capi
    qcloudAppId: secret.qcloud.qcloudAppId,
    qcloudSecretId: secret.qcloud.qcloudSecretId,
    qcloudSecretKey: secret.qcloud.qcloudSecretKey,
    wxMessageToken: 'localhost'
}
