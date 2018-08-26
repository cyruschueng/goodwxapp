//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userSrc:'../images/user.png',
    passSrc:'../images/pass.png',
    moblie:'',
    password:'',
    kind: 2
  },
  onLoad: function(){
    if(wx.getStorageSync('teacherName')){
      wx.redirectTo({ url: '/pages/writeIndex/writeIndex'})
      return;
    }
  },
  onShareAppMessage: function(){
     return {
      title: '转发给好友',
      path: '/pages/index/index'
    }
  },
  // 获取教师类型
  getKind:function(e){
    this.setData({
      kind: e.detail.value
    })
  },
  // 获取输入账号  
  moblieChange: function (e) {
    this.setData({
      moblie: e.detail.value
    })
  },  
  // 获取输入密码  
  passwordChange: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  // 登陆
  login: function () {
    var that = this;
    // 校验表单
    if (this.data.password.length == 0 || this.data.moblie.length == 0) {
      wx.showModal({
        title: '提示',
        content: '账号密码不能为空',
        showCancel: false
      })
      return;
    }else {
      //已登录就不再次登陆
      if(wx.getStorageSync('teacherName')){
        console.log('已登录');
        wx.redirectTo({ url: '/pages/writeIndex/writeIndex'})
        return;
      }
      // 校验表单成功
      wx.login({
        success: function(response){
          // console.log(response)
          if(response.code){
            wx.request({
              url: 'https://teacherapi.gaosiedu.com/api/Login', 
              method:'post',
              data: {
                "loginName": that.data.moblie,
                "password": that.data.password,
                "kind": that.data.kind,
                "appId": "web"
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              // dataType: JSON,
              success: function(res) {
                console.log('aaa'+res)
                var resData = res.data;
                if(resData.ResultType == 0){
                  wx.setStorageSync('teacherToken',resData.Message)
                  wx.setStorageSync('teacherName',resData.AppendData.sName)
                  wx.setStorageSync('kind',resData.AppendData.nkind)
                  wx.redirectTo({ url: '/pages/writeIndex/writeIndex'})
                }else{
                  wx.showModal({
                    title: '提示',
                    content: '您的账号信息或选择的教师类型不正确',
                    showCancel: false
                  })
                }
              },
              fail: function(err){
                console.log(err)
              }
            })
          }
        }
      }) 
    }
  }
})
