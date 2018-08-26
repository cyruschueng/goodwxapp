//app.js
App({
  globalData:{
    iv:'',
    encryptedData:'',
    code:''
    
  },
  onLaunch: function (ops) {
    /* 在获取群聊 ID 之前，切记要先调用 wx.login
     * 取得 code 之后，再向微信获取 session_key
     * 才能正常解密相应数据
     * 否则要么接口会调用失败，要么无法正常解密数据
     * 参见：https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html
     */
    var thiz =this;
   
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log(res.code) // 使用这个 code 向微信换取 session_key
          thiz.globalData.code = res.code
        }
      }
    })
    if (ops.scene == 1044) { // 当用户通过带 shareTicket 的分享卡片进入小程序时，小程序才开始读取群聊信息
      // console.log(ops.shareTicket)  你可以取消这段代码的注释，将 shareTicket 输出至控制台
      wx.getShareInfo({
          shareTicket: ops.shareTicket,
          complete(res) {
            console.log(res) // 输出加密后的当前群聊的 openGId
            thiz.globalData.iv = res.iv ;
            thiz.globalData.encryptedData = res.encryptedData
            wx.redirectTo({
              url: '/pages/index/index',
            })
        
          
         }
        })


        /* 特别注意：
         * 如果希望在开发者工具中，调试用户通过 1044 场景值进入小程序的情况
         * 请在开发者工具中选择「自定义编译」，场景选择 1044
         */
    }
  }
})