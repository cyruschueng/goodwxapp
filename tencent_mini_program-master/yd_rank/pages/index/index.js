// var util = require('../../utils/util')

wx.showShareMenu({
  withShareTicket: true
});

var app = getApp();
//     app.getUserInfo(function ( res ){
//     console.log("================res of getUserInfo================\n", res)
// })


Page({
  data: {
    wxInfo: {},
    ydInfo: {},
    userId: ''
  },


  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
    this.onLoad()
  },

  onLoad: function(options) {
    var that = this;
    app.getUserInfo(function ( res ){
    console.log("================res of getUserInfo================\n", res)
      that.setData({
        wxInfo: res.wxInfo,
        ydInfo: res.ydInfo,
        userId: res.userId
      })
    });
    // // Do some initialize when page load.
    // var that = this;
    // wx.login({
    //   withCredentials: true,
    //   success: function(res) {
    //     if (res.code) {
    //       console.log("================拿到code================\n",res );
    //       util.requestApi("/wx_app/wxapp_login", { "withCredentials": 'true',"code": res.code ,"login_source": "group_rank" }, function (res) {
    //         console.log("================拿到openId================\n",res);            
    //         var openId = res.openid;
    //         // ===============use code to reques================
    //         wx.getUserInfo({
    //           "withCredentials" : true,
    //           success: function (res) {
    //             console.log("================拿到微信数据================\n",res);
    //             var userInfo = res.userInfo
    //             var nickName = userInfo.nickName
    //             var avatarUrl = userInfo.avatarUrl
    //             var gender = userInfo.gender //性别 0：未知、1：男、2：女
    //             var province = userInfo.province
    //             var city = userInfo.city
    //             var country = userInfo.country
    //             that.setData({
    //               wxInfo : userInfo                 
    //             })
    //             // ================微信于悦动关联================
    //             var encryptedData = res.encryptedData;
    //             var iv = res.iv;
    //             util.requestApi("/wx_app/wxapp_register", 
    //               { "openid": openId, "encrypted": encryptedData, "iv": iv }, 
    //               function (res) {
    //                 console.log("================拿到悦动数据================\n",res);
    //                 var userId = res.user_id;
    //                 that.setData({
    //                   userId: userId
    //                 })
    //                 util.requestApi("/ydwxapp_rank/get_user_group_rank",
    //                   {"user_id":userId},
    //                   function (res){
    //                     console.log("================拿到地区排名================\n",res);
    //                     that.setData({
    //                       ydInfo : res
    //                     });
    //                   }
    //                 );
    //               }
    //             );
    //             // ================微信于悦动关联结束================
    //           }
    //         });
    //       });
    //     } 
    //     // no res.code
    //     else {
    //       console.log('获取用户登录态失败！' + res.errMsg)
    //     }
    //   }
    // });    
  },
  onShareAppMessage:  function () {
    var that = this;
    var userId = that.data.userId;
    //test id
    userId = 177640590;
    return {
      title: '看看我今天跑了多少！',
      path: '/pages/duel/duel?share_id=' + userId,
      success: function (res) {
        console.log("================this.path================\n",this.path);        
        this.path = "test path";
        console.log("================this.path================\n",this.path);        
        console.log("================user_id================\n",userId);
        console.log("================shareTickets================\n" , res.shareTickets)  ;     
        wx.getShareInfo();  
        wx.getShareInfo(res.shareTickets[0],function (res) {
            console.log("================拿到shareInfo================\n" ,res);
        },function ( res ){
          console.log("================shareInfo获取失败================\n",res);
        },function ( res ){
          console.log("================shareInfo complete callback================\n",res);
        });
      },
      fail: function (res) {
        console.log("share fail")
      }
    }
  },

  // onReady: function() {
  //   // Do something when page ready.
  // },
  // onShow: function() {
  //   // Do something when page show.
  // },
  // onHide: function() {
  //   // Do something when page hide.
  // },
  // onUnload: function() {
  //   // Do something when page close.
  // },
  // onPullDownRefresh: function() {
  //   // Do something when pull down.
  // },
  // onReachBottom: function() {
  //   // Do something when page reach bottom.
  // },
  // onShareAppMessage: function () {
  //  // return custom share data when user share.
  // },
  // Event handler.

})