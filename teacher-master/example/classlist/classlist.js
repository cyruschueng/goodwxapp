var util = require("../../utils/util.js")
var app = getApp();
var that;
const config = require('../../config')
Page({
    data: {
        classes: [],
        loaded:false
    },
    onLoad: function (options) {
      // 页面初始化 options 为页面跳转所带来的参数
      wx.showLoading({
        title: '加载中....',
      })
      that = this
          app.getImprint(function (imprint) {
            var formdata = {}
            util.AJAX1(config.ClassByImprintUrl, formdata, "post", { imprint: imprint }, function (res) {
              var result = res.data;
              console.log(result);
              wx.hideLoading();
              if (result.status == 'ok') {
                that.setData({ classes: res.data.classes, loaded:true})
              }
        });
      });
    },
    navigate: function (e) {
      var action = e.currentTarget.id;
      switch (action) {
        case "create":
          if (app.globalData.isExpOpenid) {
            wx.showModal({
              title: '提示',
              content: '退出体验账户才能进行此操作',
              success: function (res) {
              if (res.confirm) {
                wx.reLaunch({
                  url: '../exptip/exptip?exit=exit',
                })
              }
              }
            })
            return;
          }else{
            wx.navigateTo({
              url: '../tip/tip'
            })
          }

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

    goClass: function (e) {
      var cid = e.currentTarget.dataset.cid;
      var gid = e.currentTarget.dataset.gid;
      var type = e.currentTarget.dataset.type;
      var class_name="";
      that.data.classes.forEach(function(item){
          if(item._id==cid){
              class_name=item.class_name;
          }
      });
      if(type=="timeable"){
            wx.navigateTo({
                url: '../timetable/timetable?cid=' + cid + '&class_name=' + class_name
            })
      }else if(type=="parents"){
            wx.navigateTo({
                url: '../member/member?gid='+gid+'&cid=' + cid + '&class_name=' + class_name
              })
      } else if (type == "album") {
        wx.navigateTo({
          url: '../albums/albums?gid=' + gid + '&cid=' + cid + '&class_name=' + class_name
        })
      } else {
        wx.navigateTo({
          url: '../editclass/editclass?gid=' + gid + '&cid=' + cid + '&class_name=' + class_name
        })
      }
    },
});
