module.exports = {
    mysql: {
        host: '123.206.51.123',
        port: 3306,
        user: 'power',
        pass: 'power',
        db: 'powersafety',
        char: 'utf8mb4'
    },
    serverHost: 'safety.liuzhaoning.com',
    tunnelServerUrl: 'https://tunnel.ws.qcloud.la',
    tunnelSignatureKey: 'powersafetytunnelsignaturekey',
    // 腾讯云相关配置可以查看云 API 秘钥控制台：https://console.qcloud.com/capi
    qcloudAppId: '1251496751',
    qcloudSecretId: 'AKIDztdCZkqcGj0DMaQbJrDOND5qa4gBMiXR',
    qcloudSecretKey: 'r7HG5jBSYUNBtSq6B5GKDvSozzoSvFPO',
    wxMessageToken: 'powersafetytoken'
};
