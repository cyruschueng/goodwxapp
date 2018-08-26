var Singleton = (function () {
  var instantiated;
  var loginInfo;
  var wxUserInfo;
  var shareTicket;

  var isLogin;//判断是否登陆

  function init() {
    return {
      getLogin: function () {
        return isLogin;
      },
      setIsLogin: function (flag) {
        isLogin = flag;
      },
      getLoginUserInfo: function () {
        return loginInfo;
      },
      setLoginUserInfo:function(user){
        loginInfo = user;
      },
      getWxUserInfo: function () {
        return wxUserInfo;
      },
      setWxUserInfo: function (info) {
        wxUserInfo = info;
      },
      setShareTicket: function (ticket) {
        shareTicket = ticket;
      },
      getShareTicket: function () {
         return shareTicket;
      },
      getUid :function(){
        if(isLogin)
        return loginInfo.uid;
        return '';
      }
    };
  }
  return {
    getInstance: function () {
      if (!instantiated) {
        instantiated = init();
      }
      return instantiated;
    }
  }
})();


module.exports.Singleton = Singleton;
