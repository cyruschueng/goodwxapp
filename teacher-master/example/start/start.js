var util = require("../../utils/util.js")
const config = require('../../config')
var app = getApp();
var that;
Page({
  data: {
    winWidth: '',
    winHeight: '',

  },
  onLoad: function (options) {
    that = this;
    that.setData({winWidth: app.globalData.winWidth,winHeight: app.globalData.winHeight})
    app.getImprint(function (imprint) {
      if(imprint=="error"){
            wx.showModal({
                title: '提示',
                content: '本程序需要获取您的头像等信息才能使用,请允许',
                success: function (res) {
                  if (wx.openSetting){
                    wx.openSetting({
                      success: (res) => {
                        wx.redirectTo({
                          url: '../start/start',
                        })
                      }
                    })
                  }else{
                    wx.redirectTo({
                      url: '../authfail/authfail',
                    })
                  }
                }
              });
           return;
      }
      var formdata = {};
      if(options.channel){
        formdata = { channel: options.channel};
      }
      util.AJAX1(config.roleListUrl, formdata, "post", { imprint: imprint }, function (res) {
        var result = res.data;
        var uninit='';
        wx.hideLoading();
        console.log(res)
        res.data.tclist.forEach(function(item){
              if(!item.initial){
                uninit=item;
              }
        });
        if(uninit){
          wx.redirectTo({
            url: '../configclass/configclass?gid=' + uninit.gid + '&member_id=' + uninit.member_id,
          });
          return;
        }
        if (result.status == 'ok') {
          if(res.data.tclist.length>0&&res.data.cclist.length>0){
              wx.redirectTo({
                url: '../rolelist/rolelist',
              })
          } else if (res.data.tclist.length > 0 && res.data.cclist.length == 0){
            app.globalData.role = "teacher";
            wx.redirectTo({
              url: '../main/main',
            })
          }else if(res.data.cclist.length>1){
             app.globalData.role = "parent";
            // app.globalData.cid = id;
            wx.redirectTo({
              url: '../rolelist/rolelist',
            })
          } else if (res.data.cclist.length == 1) {
            app.globalData.role = "parent";
            app.globalData.cid = res.data.cclist[0].cid;
            app.globalData.gid = res.data.cclist[0].gid;
            app.globalData.familyRole = util.GetFamilyRole(res.data.cclist[0].role);
            app.globalData.childName = res.data.cclist[0].name;
            wx.redirectTo({
              url: '../parent/parent',
            })
          }else{
            wx.redirectTo({
              url: '../tip/tip',
            })
          }
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

  relauch:function(){
    wx.reLaunch({
      url: '../start/start',
    })
  },

  detail: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../notify/notify?_id=' + id
    })
  }
});
