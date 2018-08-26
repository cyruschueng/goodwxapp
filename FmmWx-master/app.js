//app.js
var Bmob = require('utils/bmob.js')
var BmobSocketIo = require('utils/bmobSocketIo.js').BmobSocketIo;
Bmob.initialize("aa21c97a6b8b733406dff3da1a7c86b5", "c50b9fbe71666d3c6b6615ea696cb41b");

BmobSocketIo.initialize("aa21c97a6b8b733406dff3da1a7c86b5");
App({
  onLaunch: function () {
    var user = new Bmob.User();//开始注册用户
    var newOpenid = wx.getStorageSync('openid')
    //未登陆过
    if (!newOpenid) {
      wx.login({
        success: function (res) {
          //微信登录成功后 请求登录接口
          user.loginWithWeapp(res.code).then(function (user) {
            wx.setStorageSync('userId', user.id)
            var openid = user.get("authData").weapp.openid;
            console.log("-----"+user.id+"-----");
            if (user.get("nickName")) {
              // 已经注册过自己的接口
              console.log(user.get("nickName"), 'res.get("nickName")');
              wx.setStorageSync('openid', openid)
            } else {
               //未注册自己的接口，保存用户其他信息
              wx.getUserInfo({
                success: function (result) {

                  var userInfo = result.userInfo;
                  var nickName = userInfo.nickName;
                  var avatarUrl = userInfo.avatarUrl;

                  var u = Bmob.Object.extend("_User");
                  var query = new Bmob.Query(u);
                  // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
                  query.get(user.id, {
                    success: function (result) {
                      // 自动绑定之前的账号
                      result.set('nickName', nickName);
                      result.set("userPic", avatarUrl);
                      result.set("openid", openid);
                      result.save();

                    }
                  });

                }
              });
            }

          }, function (err) {
            console.log(err, 'errr');
          });

        }
      });
    }
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          
          })
        }
      })
    }

  },
  
  //全局的信息
  globalData: {
    userInfo: null,
    version:"1.0.0",
  }
})