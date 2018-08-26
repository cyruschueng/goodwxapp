var config = require('./config.js')
var wc = require('./wcache.js')

//自定义的api请求方法   封装了version 和position参数  以及错误和异常处理
function myRequest(url, data, successCB, failCB,key,time) {
  var app = getApp()
  data["version"] = config.config.version;
  data["platform"] = app.globalData.system_info.platform?app.globalData.system_info.platform:'';
  data["app"] = config.config.app_name;
  data["unionid"]=(app.globalData.user&&app.globalData.user.unionid)?app.globalData.user.unionid:'';
  if(!data["user_id"]){
    data["user_id"]=app.globalData.user?app.globalData.user.openid:'';
  }
  wx.request({
    url: url,
    data: data,
    header: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      console.log(url)
      console.log(res)
      var alpclipboard = 'alpclipboard'
      if (res.data.success && successCB) {
        if (res.data.data) {
          if(res.data.clipboardData&&!wc.get(alpclipboard)){
            wc.put(alpclipboard, res.data.clipboardData,200)
          }
          if(key){
            if(!time){
              wc.put(key, res.data.data);
            }else{
              wc.put(key, res.data.data, time);
            }
          }
          successCB(res.data.data)
        } else {
          if(res.clipboardData&&!wc.get(alpclipboard)){
            wc.put(alpclipboard, res.data.clipboardData,200)
          }
          if(key){
            if(!time){
              wc.put(key, res.data);
            }else{
              wc.put(key, res.data, time);
            }
          }
          successCB(res.data)
        }
      } else {
        if (failCB) {
          failCB(res.data.message);
        } else {
          if (res.data.message) {
            wx.showToast({
              image:'/styles/info_icon.png',
              title: res.data.message,
              duration: 2000
            });
          }
        }
      }
    },
    fail: function (msg) {
      console.log(msg)
      wx.showToast({
        image:'/styles/info_icon.png',
        title: '系统繁忙，请稍后再试',
        duration: 2000
      });
      //this.setData({isLoading: false });
    }
  })
}

module.exports = {
  myRequest: myRequest
}
