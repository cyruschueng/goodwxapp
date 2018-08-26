var app = getApp();
function loginCheck(pageObj) {
  if (pageObj.onLoad) {
    let _onLoad = pageObj.onLoad;
    // 使用onLoad的话需要传递options
    pageObj.onLoad = function (options) {
      var time=setInterval(function(){
        if (app.globalData.userInfo&&app.globalData.userInfo.openid) {
          checkIsBind(_onLoad, options, app.globalData.userInfo.openid)
          clearInterval(time);
        }
      },500);
      /*if (app.globalData.userInfo){
        console.log(app.globalData.userInfo)
        checkIsBind(_onLoad, options, app.globalData.userInfo.openid)
      }
      else{
        app.userInfoReadyCallback = res => {
          checkIsBind(_onLoad, options, res.data.openid)
        }
      }*/
    }
  }
  return pageObj;
}
function checkIsBind(_onLoad, options,openid){
  var isbind = false;
  var g = app.globalData;
  wx.request({
    url: g.domain + '/getuser',
    data: { openid: openid },
    success: function (res) {
      if (res.data != '') {
        isbind = true;
        g.userInfo.groupid = res.data.groupid;
        var score = res.data.score;
        var rule = g.scoreRule.find(e => e.start <= score && e.end > score);
        g.userInfo.ph = rule.name;
        g.userInfo.score = score;
        g.userInfo.mobile = res.data.mobile;
      }
      g.userInfo.isbind = isbind;
      if (isbind) {
        // 获取当前页面
        let currentInstance = getPageInstance();
        _onLoad.call(currentInstance, options);
      } else {
        //跳转到登录页
        wx.redirectTo({
          url: "/pages/bind/bind"
        });
      }
    }
  })
}
// 获取当前页面
function getPageInstance() {
  var pages = getCurrentPages();
  return pages[pages.length - 1];
}

exports.loginCheck = loginCheck;