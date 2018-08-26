//app.js
App({
  data : {
    cusListDB: [],
  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getWindow: function(that){
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          innerHeight: res.windowHeight,
          innerWidth: res.windowWidth
        })
      },
    })
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      

    }
  },
  run:function(name){
    var that = this
      wx.request({
        url: this.globalData.IP+'wx/userrun.do',
        method:'post',
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },
        data:{
          userid:that.globalData.ID,
          name:name,
          sid:that.globalData.sid
        }
      })
  },
  login:function(pid,cb){
    //调用登录接口
 
    
    var that = this
    wx.login({
      success: function (res) {
        var code = res.code;
        wx.request({
          url: that.globalData.IP + "wx/login.do",
          data: {pid:pid,code:code},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            // success
            if (res.data != 0) {
              that.globalData.ID = res.data.id;
              wx.setStorageSync('id', res.data.id);
              wx.getUserInfo({
                success: function (res) {
                  console.log(res)
                  that.globalData.userInfo = res.userInfo
                  cb(res.userInfo);
                  wx.request({
                    method:'post',
                    url: that.globalData.IP + 'wx/usermsg.do',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                      password: res.userInfo.avatarUrl,
                      userid: that.globalData.ID,
                      username: res.userInfo.nickName,
                      province: res.userInfo.province,
                      city: res.userInfo.city,
                      sex: res.userInfo.gender
                    }
                  })
                },
                fail: function (res) {
                  wx.showModal({
                    title: '提示',
                    content: '请用微信登录',
                    showCancel: false,
                    success: function (res) {
                      wx.openSetting({
                        success: function () {
                          that.getUserInfo();
                        }
                      })
                    }
                  })
                }
              });
            }
             else {
              that.globalData.ID = wx.getStorageSync('id');
            }
            that.globalData.load=true;
          }
        })

        //getlocation

      }
    })
  },
  globalData:{
    userInfo:null,
    ID:0,
    IP:'https://www.medusachina.com/wschool/',
    WS:'wss://www.medusachina.com/wschool/mysocket.do',
    sid:0,
    load:false
  }
})