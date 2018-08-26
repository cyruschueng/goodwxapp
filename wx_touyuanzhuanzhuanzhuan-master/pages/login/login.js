Page({
  data:{
    host:'https://m.changtounet.com/'
  },
  onLoad:function(){
    wx.getNetworkType({
      success: function (res) {
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType
        if (networkType =='none'){
          wx.showModal({
            title: '提示',
            content: '无网络状态',
            showCancel: false,//去掉取消按钮
            success: function (res) {
              
            }
          })
        }
      }
    })

  },
  login: function (e) {
    var g=this;
    //显示loading
    wx.showLoading({ title: 'Loading' })

    var username = e.detail.value.username;
    var pwd = e.detail.value.pwd;
    wx.request({
      url: g.data.host+'smallApp/login.ashx',
      data: { action: 'loginuser', username: username, pwd: pwd},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var result = res.data;
        if (parseInt(result.status) == 1 && result.msg =='success'){
          setUsername(result.uid)
          setToken(result.token)
          wx.showToast({ title: '登录成功' });
                      wx.reLaunch({
                        url: '../accountRing/accountRing'
    })
        }else {
          var title = result.msg;
          vibrateLong({ success:function(){}});
          hideLoading()
          wx.showModal({
            title: '提示',
            content: title,
            showCancel: false,//去掉取消按钮
            success: function (res) {
             
            }
          })
        }
      },
      complete: function () {
        //隐藏loading
        // wx.hideLoading()
      }, fail:function(){
             wx.showModal({
          title: '提示',
          content: '网络异常',
          showCancel: false,//去掉取消按钮
          success: function (res) {
             hideLoading()
          }
        })
      }
    })
  }

})

var setUsername=function(uid){
  wx.getStorage({
    key: 'userid',
    success: function (res) {

    },
    fail: function () {
      wx.setStorage({
        key: "userid",
        data: uid
      })
    }
  })
}

var setToken=function(token){
  wx.getStorage({
    key: 'token',
    success: function (res) {

    },
    fail: function () {
      wx.setStorage({
        key: "token",
        data: token
      })
    }
  })
}
var vibrateLong=function(obj){
  wx.vibrateLong(obj)
}
var hideLoading=function(){
  wx.hideLoading()
}