//app.js
//App() 函数用来注册一个小程序。接受一个 object 参数，其指定小程序的生命周期函数等。
var config = require("utils/config.js");
App({
    /**
     * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
     */
    onLaunch: function (opt) {
        //小程序场景值
        console.log('小程序场景值:'+opt.scene);
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || [],that = this;
        // arr.unshift(element1, ..., elementN)
        // unshift() 方法将一个或多个元素添加到数组的开头，并返回新数组的长度。
        logs.unshift(Date.now())
        // setStorageSync
        // 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
          success: res => {
            console.log(res);
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
            url:`https://api.weixin.qq.com/sns/jscode2session?appid=${config.appid}&secret=${config.secret}&js_code=${res.code}&grant_type=authorization_code`,
            success:function (res) {
                console.log(res);
                console.log(res.data.openid);
                var openid = res.data.openid;
                var session_key = res.data.session_key;
                that.globalData.openid = openid;
                that.globalData.session_key = session_key;
            }
        });
          }
        })

        // wx.getSetting(OBJECT)
        // 获取用户的当前设置,返回值中只会出现小程序已经向用户请求过的权限。
        wx.getSetting({
          success: res => {
            console.log(res);
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: res => {
                  console.log(res);
                  // 可以将 res 发送给后台解码出 unionId
                  this.globalData.userInfo = res.userInfo

                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  // 判断 userInfoReadyCallback 是否定义了
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            }
          }
        })
    },

    /**
     * 当小程序启动，或从后台进入前台显示，会触发 onShow
     */
    onShow:function (opt) {
        //小程序场景值
        console.log('小程序场景值:'+opt.scene);
    },

    /**
     * 当小程序从前台进入后台，会触发 onHide
     */
    onHide:function (){

    },

    /**
     * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
     */
    onError: function () {

    },

    //其他
    //开发者可以添加任意的函数或数据到 Object 参数中，用 this 可以访问

    globalData: {
        userInfo: null
    }
})