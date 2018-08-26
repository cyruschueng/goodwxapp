var util = require("../../utils/util.js")
var app = getApp();
var that;
Page({
  data: {
    currentUser:"",
    member:'',
    winWidth: 0,
    winHeight: 0,

  },
  onLoad: function (options) {
    that = this;
    that.WidthHeightInit();
    var member_id=options.member_id;
    if(!member_id){
      return;
    }
    app.getImprint(function (imprint) {
      util.AJAX1(config.CurrentUserWithMemberInfoUrl, { member_id: member_id}, "post", { imprint: imprint }, function (res) {
        console.log(res)
        if(res.data.status=='ok'){
          that.setData({ currentUser: res.data.currentUser, member: res.data.member})
        }
      });
    });
  },



  WidthHeightInit: function () {
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },

  associate:function(e){
    var member=that.data.member;
    wx.showModal({
      title: '提示',
      content: "确定要关联么？",
      success: function (res) {
        if (res.confirm) {
          app.getImprint(function (imprint) {
            util.AJAX1("associate", { member_id: member._id }, "post", { imprint: imprint }, function (res) {
              console.log(res)
              if (res.data.status == 'ok') {
                wx.showToast({
                  title: '关联成功..',
                  icon: 'success',
                  duration: 3000
                });
                setTimeout(function () {
                  wx.redirectTo({
                    url: '../start/start'
                  })
                }, 3000)
              }
            });
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
   
  },

  navigate: function (e) {
    var action = e.currentTarget.id;
    switch (action) {
      case "add":
        wx.navigateTo({
          url: '../add/add'
        })
        break;
      case "my":
        wx.navigateTo({
          url: '../my/my'
        })
        break;
      case "class":
        wx.navigateTo({
          url: '../classlist/classlist'
        })
        break;
      default:

    }
  },

  detail: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../notify/notify?_id=' + id
    })
  }
});
