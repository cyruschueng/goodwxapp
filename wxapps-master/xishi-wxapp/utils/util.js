import { get_sessionKey } from '../url.js';
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function request(url, method, params, success, fail){
  requestLoading(url, method, params,'',success, fail)
}
//url：网络请求的url
//params:请求参数
//message:进度条的提示信息
//success:成功的回调函数
//fail:失败的回调
function requestLoading(url, method, params,message,success,fail){
  wx.showNavigationBarLoading()
  if(message != ""){
    wx.showLoading({
      title: message,
    })
  }
  wx.request({
    url:url,
    data:params,
    header:{
      'content-type':'application/json'
    },
    method: method,
    success:function(res){
      wx.hideNavigationBarLoading()
      if(message != ""){
        wx.hideLoading()
      }

      if(res.statusCode == 200){
        success(res.data)
      }else{
        fail()
      }

    },
    fail:function(res){
      wx.hideNavigationBarLoading()
      if(message != ""){
        wx.hideLoading()
      }
      fail()
    },
    complete:function(res){
      // console.log(res);
    }
  })
}

function getSetting() {
  wx.getSetting({
    success: res => {
      if (res.authSetting['scope.userInfo']) {
        getSessionKey();
      } else {
        wx.showModal({
          title: '提示',
          content: '授权登录失败，部分功能将不能使用，是否重新登录？',
          showCancel: true,
          cancelText: "否",
          confirmText: "是",
          success: function (res) {
            if (res.confirm) {
              wx.openSetting({
                success: function (data) {
                  if (data) {
                    if (data.authSetting["scope.userInfo"] == true) {
                      getSessionKey();
                    }
                  }
                },
                fail: function () {
                  console.info("设置失败返回数据");
                }
              });
            } else if (res.cancel) {
              console.info("用户拒绝授权");
            }
          }
        })
      }
    }
  })
}

function getSessionKey(cb) {
  wx.getUserInfo({
    success: res => {
      getApp().globalData.userInfo = res.userInfo;
      wx.setStorageSync("userInfo", res.userInfo);
      wx.login({
        success: res => {
          var sessionKey = wx.getStorageSync("sessionKey");
          let Code = res.code;
          if (!sessionKey){
            //请求sessionKey
            let requestParams = JSON.stringify({
              code: Code,
              nickname: getApp().globalData.userInfo.nickName,
              sex: getApp().globalData.userInfo.gender,
              headurl: getApp().globalData.userInfo.avatarUrl
            });
            request(get_sessionKey, "post", requestParams, function (res) {
              if (res.Status == 1) {
                wx.setStorageSync("sessionKey", res.SessionKey);
                let curpage = getCurrentPages()[0];
                wx.reLaunch({
                  url: "/" + curpage.route
                });
              } else if (res.Message){
                wx.showToast({
                  title: res.Message,
                  icon:'none'
                })
              }else{
                console.log(res)
              }
            }, function (res) {
              console.log(res);
            });
          }
        }
      })
    },
    fail: res => {
      console.log(res);
      cb()
    }
  })
}

/****绘制自动换行的字符串****/
function drawText(t, x, y, w, ctx) {
  var row = [];
  var maxRow = Math.ceil(t.length / w);
  ctx.setTextBaseline = "middle";

  for (var a = 0; a < maxRow; a++) {   
    row.push(t.substr(w * a, w));
  }

  for (var b = 0; b < row.length; b++) {
    ctx.fillText(row[b], x, y + (b + 1) * 20);
  }
}

module.exports = {
  formatTime: formatTime,
  request:request,
  requestLoading:requestLoading,
  drawText: drawText,
  getSessionKey: getSessionKey,
  getSetting: getSetting
}
