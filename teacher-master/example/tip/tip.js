var util = require("../../utils/util.js")
const config = require('../../config')

var app = getApp();
var that;
Page({
  data: {
    user: '',
    winWidth: 0,
    winHeight: 0,

  },
  onLoad: function (options) {
    that = this;
    app.getImprint(function (imprint) {
      util.AJAX1(config.getUserInfoUrl, {}, "get", { imprint: imprint }, function (res) {
        that.setData({ user: res.data, winWidth: app.globalData.winWidth, winHeight: app.globalData.winHeight  })
      });
    });
  },


  onShareAppMessage: function (options) {
    var cid = that.data.cid;
    var from = options.from;
    var type = options.target.dataset.id;
    if (from == 'button' && type == 'teacher') {
      wx.showShareMenu({
        withShareTicket: true //要求小程序返回分享目标信息
      });
      return {
        title: '请各位家长和老师加入,以后我们通过班级群小管家发布通知、反馈作业',
        imageUrl: "http://campus002.oss-cn-beijing.aliyuncs.com/cc.jpg",
        path: '/example/bind/bind',
        success: function (res) {
          if (!res.shareTickets) {
            wx.showModal({
              title: '提示',
              content: '分享到班级微信群才能初始化小管家账号',
            })
            return;
          }
          wx.showLoading({
            title: '初始化中...',
            mask:true
          })
          app.getImprint(function (imprint) {
            app.getGid(imprint, res.shareTickets[0],function(resData,err){
              if(err){
                return 
              };
              if (resData.status == "ok" && !resData.bind && resData.gid) {
                util.AJAX1(config.createClassUrl, { gid: resData.gid }, "post", { imprint: imprint }, function (res) {
                  var result = res.data;
                  console.log(result)
                  wx.hideLoading();
                  if (result.status == 'ok') {
                    wx.redirectTo({
                      url: '../configclass/configclass?gid=' + resData.gid + '&member_id=' + result.member_id
                    })
                  }
                });
              } else if (resData.status == "ok" && resData.bind) {
                wx.redirectTo({
                  url: '../classbindedtip/classbindedtip?gid=' + resData.gid
                })
              } else {
                wx.hideLoading();
                wx.showModal({
                  title: '出现异常',
                  content: '',
                })
              }
            })
          });

        },
        fail: function (res) {
          // 分享失败
          console.log(res)
        }
      }
    } else {
      var title = that.data.user.wxname + '邀请您通过【班级群小管家】来管理班级事务';
      var path = '/example/start/start';
      return {
        title: title,
        path: path,
        imageUrl: "http://campus002.oss-cn-beijing.aliyuncs.com/cc.jpg",
        success: function (res) {
          wx.showToast({
            title: '分享成功',
          })
          // wx.showModal({
          //   title: '分享成功',
          //   content: '待此老师创建班级成功后会邀请您加入',
          // })
        },
        fail: function (res) {
          // 分享失败
          console.log(res)
        }
      }
    }

  },

  
  
  redirect: function (e) {
    var form_id = e.detail.formId;
    var id = e.detail.target.id;
    console.log(e)
    app.getImprint(function (imprint) {
      util.AJAX1(config.putFormidUrl, { form_id: form_id}, "post", { imprint: imprint }, function (res) {
       
       if(id=="exptip"){
         wx.reLaunch({
           url: '../exptip/exptip'
         })
       }else{
         wx.navigateTo({
           url: '../about/about'
         })
       }
      
      });
    });
  },


  about: function (e) {
    wx.navigateTo({
      url: '../about/about?video=all'
    })
  },

  exptip: function (e) {
    // wx.redirectTo({
    //   url: '../exptip/exptip'
    // })
   
  },


  detail: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../notify/notify?_id=' + id
    })
  }
});
