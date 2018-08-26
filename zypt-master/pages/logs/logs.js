//logs.js
var app = getApp()
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({ 
      baseUrl: app.globalData.apiBase, //设置全局的页面路径
      userInfo: app.globalData.userInfo
    })
  },
  formSubmit: function (e) {
    var a = e.detail.value;
    //合并输入数据，用户信息（如果用户点击允许获取的话）和第三方session
    var c = Object.assign(a, { trd_session: wx.getStorageSync('trd_session') });
    //console.log('form发生了submit事件，携带数据为：', c)
    let that=this;
    c.user = encodeURI(c.user);
    wx.request({
      url: app.globalData.apiBase+'index.php/weixin/login.html',
      dataType: 'json',
      data: c,
      success: function (res) {
        //console.log(res) //登录结果
        if (res.data == 2 || res.data == 1) {
          wx.showToast({
            title: '账号密码错误',
            icon: 'loading',
            duration: 1000,
          });
        } else if(res.data == 3){
          wx.showToast({
            title: '请求异常请稍后再试',
            icon: 'loading',
            duration: 1000,
          });
        }else{
          //登录成功，设置flag、
          wx.setStorageSync('flag', 3);
          wx.setStorageSync('ptuserinfo', res.data);

          app.globalData.uid = res.data.userid
          wx.reLaunch({
            url: '/pages/welcome/welcome',
          })
        }
      }
    })

  },
  formReset: function () {
    console.log('form发生了reset事件')
  }
})
