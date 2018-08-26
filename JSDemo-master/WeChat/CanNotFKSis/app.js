//app.js
App({
    /**
     * 查询的类型，默认全部返回。
     * type=10 图片
     * type=29 段子
     * type=31 声音
     * type=41 视频
     */
    data: {
        API_URL: 'https://route.showapi.com/255-1', // 接口baseURL
        API_ID: '51741', // 接口唯一ID
        API_SIGN: '5f15f298085543b3aa91cd45c277b096', //接口签名
        API_TYPE_IMAGE: '10',
        API_TYPE_WORD: '29',
        API_TYPE_VEDIO: '41',
        API_TYPE_VOICE: '31'
    },

    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: null
    }
})