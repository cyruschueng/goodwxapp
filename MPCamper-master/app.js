//app.js
App({
        onShow: function (options) {
                console.log("[onShow] path:", options.path)
                console.log("[onShow] query:", options.query)
                console.log("[onShow] scene:", options.scene)
                // console.log("[onShow] 场景值:", options.shareTicket)
                // console.log("[onShow] 场景值:", options.referrerInfo.appId)
                // console.log("[onShow] 场景值:", options.referrerInfo.extraData)

                //1044--带 shareTicket 的小程序消息卡片
                if (options.scene == 1044) {
                        console.log("[onShow] shareTicket:", options.shareTicket)
                        wx.getShareInfo({
                                shareTicket: options.shareTicket,
                                success: function (res) {
                                        var encryptedData = res.encryptedData;
                                        var iv = res.iv;
                                        console.log("encryptedData:" + encryptedData)
                                        console.log("iv:" + encryptedData)
                                }
                        })
                }

                //小程序更新
                const updateManager = wx.getUpdateManager()
                updateManager.onCheckForUpdate(function (res) {
                        // 请求完新版本信息的回调
                        console.log("onCheckForUpdate:"+res.hasUpdate)
                })
                updateManager.onUpdateReady(function () {
                        wx.showModal({
                                title: '更新提示',
                                content: '新版本已经准备好，是否重启应用？',
                                showCancel:false,
                                success: function (res) {
                                        if (res.confirm) {
                                                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                                updateManager.applyUpdate()
                                        }
                                }
                        })
                })
                updateManager.onUpdateFailed(function () {
                        // 新的版本下载失败
                        console.log("onUpdateFailed")
                })

        },
        onLaunch: function (options) {
                // 展示本地存储能力
                var that = this
                var logs = wx.getStorageSync('logs') || []
                logs.unshift(Date.now())
                wx.setStorageSync('logs', logs)
                this.GetInfo(that);
                // 登录
                wx.login({
                        success: function (res) {
                                if (res.code) {
                                        console.error("code:" + res.code)
                                        wx.setStorageSync('wx_code', res.code)
                                        //小程序已绑定了开放平台 就可以直接获取unionid 发起网络请求
                                        // https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
                                        // wx.request({
                                        //         url: 'https://api.weixin.qq.com/sns/jscode2session',
                                        //         data: {
                                        //                 appid: 'wx64e0ed63ac933aaa',
                                        //                 secret: '38afc76beaea8ee4e2b090c474c8cb96',
                                        //                 js_code: res.code,
                                        //                 grant_type: 'authorization_code'
                                        //         },
                                        //         success: function (res) {
                                        //                 //res.data.openid  用户唯一标识  res.data.session_key 会话密钥   unionid	用户在开放平台的唯一标识符
                                        //                 console.log(res.data)        
                                        //         }
                                        // })

                                } else {
                                        console.log('获取用户登录态失败！' + res.errMsg)
                                }

                        },
                        fail: function (res) {
                                console.log('login-fail')
                        }
                });

                // 获取用户信息
                wx.getSetting({
                        success: res => {
                                if (res.authSetting['scope.userInfo']) {
                                        wx.setStorageSync('wx_authorize', true)
                                        console.log("已经授权")
                                        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                                        wx.getUserInfo({
                                                success: res => {
                                                        // 可以将 res 发送给后台解码出 unionId
                                                        console.log("getUserInfo:" + JSON.stringify(res))
                                                        this.globalData.userInfo = res.userInfo
                                                        res.code = wx.getStorageSync('wx_code')
                                                        // console.log("encryptedData:" + res.encryptedData)
                                                        // console.log("iv:" + res.iv)
                                                        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                                                        // 所以此处加入 callback 以防止这种情况
                                                        if (this.userInfoReadyCallback) {
                                                                this.userInfoReadyCallback(res)
                                                        }
                                                        console.error(res)
                                                        wx.request({
                                                                url: 'http://cs.ezagoo.net:8002/wechat/postWeChatLoginInfo.ashx',
                                                                data: {
                                                                        jsonData: res
                                                                },
                                                                success: function (res) {
                                                                        console.log(res.data)

                                                                        that.globalData.eUserInfo = res.data.data;
                                                                        console.log(that.globalData.eUserInfo)

                                                                        wx.setStorageSync('wx_unionid', res.data.data.unionid)
                                                                        wx.setStorageSync('wx_openid', res.data.data.Openid)
                                                                        wx.setStorageSync('token', res.data.data.token)
                                                                        wx.setStorageSync('memberguid', res.data.data.GUID)
                                                                }
                                                        })
                                                }
                                        })
                                } else {
                                        console.log("wei授权")
                                        wx.getUserInfo({
                                                success: res => {
                                                        // 可以将 res 发送给后台解码出 unionId
                                                        this.globalData.userInfo = res.userInfo
                                                        res.code = wx.getStorageSync('wx_code')
                                                        // console.log(this.globalData.userInfo)
                                                        // console.log(res.encryptedData)
                                                        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                                                        // 所以此处加入 callback 以防止这种情况
                                                        if (this.userInfoReadyCallback) {
                                                                this.userInfoReadyCallback(res)
                                                        }
                                                        wx.request({
                                                                url: 'http://cs.ezagoo.net:8002/wechat/postWeChatLoginInfo.ashx',
                                                                data: {
                                                                        jsonData: res
                                                                },
                                                                success: function (res) {
                                                                        console.log(res.data)
                                                                        that.globalData.eUserInfo = res.data;
                                                                        wx.setStorageSync('wx_unionid', res.data.data.unionid)
                                                                        wx.setStorageSync('wx_openid', res.data.data.Openid)
                                                                        wx.setStorageSync('token', res.data.data.token)
                                                                        wx.setStorageSync('memberguid', res.data.data.GUID)
                                                                }
                                                        })
                                                }, fail: function (res) {
                                                        wx.setStorageSync('wx_authorize', false)
                                                        console.log("fail")
                                                }, complete: function () {
                                                        console.log("complete")
                                                }
                                        })
                                }
                        }
                })

        },
        GetInfo: function (that) {
                wx.getSystemInfo({
                        success: function (res) {
                                that.globalData.width = res.windowWidth
                                that.globalData.height = res.windowHeight
                                console.log('手机型号：' + res.model + '操作系统版本：' + res.system + '手机品牌：' + res.brand)
                                console.log('设备像素比：' + res.pixelRatio)
                                console.log('窗口宽度：' + res.windowWidth)
                                console.log('窗口高度：' + res.windowHeight)
                                console.log('微信设置的语言：' + res.language)
                                console.log('微信版本号：' + res.version)
                                console.log('客户端平台：' + res.platform + '客户端基础库版本：' + res.SDKVersion)
                        }
                });

                // //获取网络类型
                // wx.getNetworkType({
                //         success: function (res) {
                //                 // 返回网络类型, 有效值：
                //                 // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
                //                 var networkType = res.networkType
                //                 console.log('网络类型：' + res.networkType)
                //         }
                // });
                // //监听网络状态变化
                // wx.onNetworkStatusChange(function (res) {
                //         console.log(res.isConnected)
                //         console.log(res.networkType)
                // });
                // //获取定位
                // wx.getLocation({
                //         type: 'gcj02', //返回可以用于wx.openLocation的经纬度
                //         success: function (res) {
                //                 var latitude = res.latitude
                //                 var longitude = res.longitude
                //                 console.log(latitude + "--" + longitude)
                //         }
                // })
        },
        //拨打电话 phoneNumber 为空时默认电话
        tel: function (phoneNumber) {
                var that = this;
                console.error(phoneNumber)
                var telNum;
                if (phoneNumber != null && phoneNumber != undefined && phoneNumber != '') {
                        telNum = phoneNumber;
                } else {
                        telNum = that.globalData.phoneNumber;
                }
                wx.makePhoneCall({
                        phoneNumber: telNum
                })
        },
        //地图导航
        // latitude：纬度，范围为-90~90，负数表示南纬
        // longitude：经度，范围为 - 180~180，负数表示西经
        // scale: 缩放比例，范围5~18，默认为18
        // name：位置名
        // address：地址
        map: function (latitude, longitude, scale, name, address) {
                wx.openLocation({
                        latitude: latitude,
                        longitude: longitude,
                        scale: scale,
                        name: name,
                        address: address
                })
        },
        wxAuthorize: function () {
                var that = this;
                wx.login({
                        success: function (res) {
                                if (res.code) {
                                        console.error("wxAuthorize_code:" + res.code)
                                        wx.setStorageSync('wx_code', res.code)
                                } else {
                                        console.log('wxAuthorize获取用户登录态失败！' + res.errMsg)
                                }
                        },
                        fail: function (res) {
                                console.log('wxAuthorize-fail')
                        }
                });
                wx.openSetting({
                        success: (res) => {
                                if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
                                        wx.getUserInfo({
                                                success: res => {
                                                        wx.setStorageSync('wx_authorize', true)
                                                        // 可以将 res 发送给后台解码出 unionId
                                                        this.globalData.userInfo = res.userInfo
                                                        console.log(this.globalData.userInfo)
                                                        res.code = wx.getStorageSync('wx_code')
                                                        console.log(res)
                                                        if (this.userInfoReadyCallback) {
                                                                this.userInfoReadyCallback(res)
                                                        }
                                                        wx.request({
                                                                url: 'http://cs.ezagoo.net:8002/wechat/postWeChatLoginInfo.ashx',
                                                                data: {
                                                                        jsonData: res
                                                                },
                                                                success: function (res) {
                                                                        that.globalData.eUserInfo = res.data.data;
                                                                        console.log("unionid:" + res.data.data.unionid)
                                                                        wx.setStorageSync('wx_unionid', res.data.data.unionid)
                                                                        wx.setStorageSync('wx_openid', res.data.data.Openid)
                                                                        wx.setStorageSync('token', res.data.data.token)
                                                                        wx.setStorageSync('memberguid', res.data.data.GUID)

                                                                }
                                                        })
                                                }
                                        })
                                }
                        }, fail: function (res) {

                        }
                })
        },
        globalData: {
                userInfo: null,
                eUserInfo: null,
                phoneNumber: '4000-155-105',
                width: null,//屏幕宽
                height: null//屏幕高
        }
})

