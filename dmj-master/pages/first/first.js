var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var app = getApp();

Page({

  onLoad: function (e) {
    // app.globalData.flg="aaaa"
    // console.log(app.globalData.flg);
    
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      console.log(userInfo)
      //更新数据
      that.setData({ 
        userInfo: userInfo
      })

      //console.log(userInfo.nickName)
      var nkname = userInfo.nickName

      var member = Bmob.Object.extend("member");
      var query = new Bmob.Query(member);
      query.equalTo("wx_name", nkname);

      //query.find({ success: function (result) { }, error: function (error) { }})
      query.find({ success: function (result) { 
        var cnt = result.length;
        if (cnt == 0) {

        }else{
          //在tab中的页面 迁移的时候 用这个方法
          wx.switchTab({
            url: '../server/server'
          })

        }

      }, error: function (error) { } })
    
     
    });

    // this.setData({
    //   "login_name": "王艳明",
    //   "card_id": "080621",
    //   "phone_no": "13009419939"
    // });

   

  },
  
  
  formSubmit: function (event) {

    wx.showLoading({
      title: '用户绑定中，请稍后！',
    });

    if (event.detail.value.login_name == "") {
      wx.showLoading({
        title: '请输入真实姓名',
      })
    } else if (event.detail.value.card_id == "") {
      wx.showLoading({
        title: '请输入卡号',
      })
    } else if (event.detail.value.phone_no == "") {
      wx.showLoading({
        title: '请输入电话号码',
      })
    }else{
      var member = Bmob.Object.extend("member");
      //微信名在数据库中不存在，需要验证一些信息,之后绑定
      //console.log(event.detail.value.login_name);
      var query = new Bmob.Query(member);
      console.log(event.detail.value.login_name);
      query.equalTo("name", event.detail.value.login_name);
      query.equalTo("wx_name", null);
      query.find({
        success: function (results) {
          console.log("共查询到 " + results.length + " 条记录");
          var cnt = results.length;
          if (cnt == 0) {
            wx.showLoading({
              title: '该姓名查询不到，不能绑定!!!',
            });

          } else {
            //该用户存在,可以继续
            query = new Bmob.Query(member);
            query.equalTo("name", event.detail.value.login_name);
            query.equalTo("card_id", event.detail.value.card_id);
            query.find({
              success: function (results) {
                var cnt = results.length;
                var id = results[0]["id"];
                // console.log(results[0]["id"]);
                if (cnt == 0) {
                  wx.showLoading({
                    title: '该卡号查询不到，不能绑定!!!',
                  });
                } else {
                  // 卡号也存在，可以继续
                  // 执行update语句，更新微信名
                  query = new Bmob.Query(member);
                  query.get(id, {
                    success: function (result) {
                      result.set("wx_name", event.detail.value.wxname);
                      result.set("phone_no", event.detail.value.phone_no);
                      result.save();

                      common.showTip("绑定成功,正在跳转", "success", function () {
                        wx.switchTab({
                          url: '../server/server'
                        })
                      });

                    }, error: function (object, error) { }
                  })
                }
              },
              error: function (error) { }
            })

          }

        },
        error: function (error) {
          console.log("查询失败: " + error.code + " " + error.message);
        }
      });
    }

    
    


    setTimeout(function () {
      wx.hideLoading()
    }, 2000);



    // Bmob.User.logIn(event.detail.value.username, event.detail.value.paswd, {
    //   success: function (user) {
    //     wx.getStorage({
    //       key: Bmob._getBmobPath(Bmob.User._CURRENT_USER_KEY),
    //       success: function (res) {
    //         var Data = JSON.parse(res.data);
    //         common.showTip("登录成功,正在跳转", "success", function () {
    //           wx.redirectTo({
    //             url: '../index/index'
    //           })
    //         });

    //       }
    //     })
    //   },
    //   error: function (user, error) {
    //     // The login failed. Check error to see why.
    //     console.log(error)
    //     common.showTip("对不起，您输入的用户名或密码错误", "loading");
    //   }
    // });
  }
})