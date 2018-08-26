var util = require("../../utils/util.js")
var app = getApp();
var that;
const config = require('../../config')
Page({
  data: {
    dateNotifies: {},
    user:"",
    notifies:[],
    familyRole:"亲属",
    all_msgs_count: 0,
    no_data:false,
    childName:'',
    date:'',
    isExpOpenid:''
  
  },





  onShow: function (options) {
    if (app.globalData.notifyReload == 1) {
      that.loadNotify('');
    }
    app.globalData.notifyReload = 0;
    app.getImprint(function (imprint) {
      var formdata = {}
      util.AJAX1(config.msgInfoUrl, formdata, "get", { imprint: imprint }, function (res) {
        var result = res.data;
        console.log("====收到的消息情况")
        console.log(res)
        if (result.status == 'ok') {
          that.setData({ all_msgs_count: res.data.all_msgs_count })
        }
      });
    });
  },
  onLoad: function (options) {
    that = this;
    that.loadNotify('');
    that.loadNotice();
  },

  loadNotice: function () {
    app.initData(function (configData) {
      var parent_notice = configData.parent_notice;
      var parent_notice_obj = JSON.parse(parent_notice);
      that.setData({ parent_notice: parent_notice_obj })
    });
  },

  loadNotify:function(date){
  
    wx.showLoading({
      title: '',
    });
    wx.showNavigationBarLoading();
    app.getImprint(function (imprint) {
      util.AJAX1(config.UserInfoUrl, {}, "post", { imprint: imprint }, function (res) {
    
        if (res.data.status == "ok") {
          that.setData({ childName: app.globalData.childName, user: res.data.currentUser, familyRole: app.globalData.familyRole });
          util.AJAX1(config.mainNotifiesUrl, { role: "parent",date:date, cid: app.globalData.cid }, "post", { imprint: imprint }, function (res) {
            console.log(res)
            if (res.data.status == "ok") {
              res.data.recents.forEach(function (item) {
                item.role = util.GetFamilyRole(item.role);
              })
              if (res.data.dateNotifies.length == 0) {
                that.setData({
                  no_data: true, loaded: true, dateNotifies: [], 
                  isExpOpenid: app.globalData.isExpOpenid,
                   recents: res.data.recents,
                   cid: app.globalData.cid,
                   gid: app.globalData.gid,
                  aliyunVideoOssPreUrl: config.aliyunVideoOssPreUrl,
                  aliyunImageOssPreUrl: config.aliyunImageOssPreUrl,
                  aliyunVideoCoverExt: config.aliyunVideoCoverExt
                });
              } else {
                res.data.dateNotifies.forEach(function (item) {
                  item.notifies.forEach(function (notify) {
                    notify.feedback_type = util.getFeedBackType(notify.feedback_type)
                    notify.end_day = util.getTimeEx(notify.end_day)
                    if (notify.type == 1 && notify.text_content) {
                      notify.text_content = notify.text_content.substring(0, 15) + "..."
                    }
                  });
                })
                that.setData({
                  dateNotifies: res.data.dateNotifies, 
                  recents: res.data.recents, 
                  loaded: true, 
                  no_data: false,
                  cid: app.globalData.cid,
                  gid: app.globalData.gid,
                   isExpOpenid: app.globalData.isExpOpenid,
                  aliyunVideoOssPreUrl: config.aliyunVideoOssPreUrl,
                  aliyunImageOssPreUrl: config.aliyunImageOssPreUrl,
                  aliyunVideoCoverExt: config.aliyunVideoCoverExt
                });
              }
            }
          });
        }
        wx.hideNavigationBarLoading();
        wx.hideLoading();

      });
    });
  },

  navigate: function (e) {

    var action = e.currentTarget.id;
    switch (action) {
      case "msgs":
        wx.navigateTo({
          url: '../msgs/msgs'
        })
        break;
      case "add":
        wx.navigateTo({
          url: '../add/add'
        })
        break;
      case "my":
        wx.navigateTo({
          url: '../edit/edit'
        })
        break;
      case "classPhoto":
        wx.navigateTo({
          url: '../albums/albums?gid=' + app.globalData.gid + '&cid=' + app.globalData.cid
        })
        break;
      case "class":
        wx.navigateTo({
          url: '../member/member?cid=' + app.globalData.cid
        })
        break;
      case "timetable":
        wx.navigateTo({
          url: '../timetable/timetable?cid=' + app.globalData.cid
        })
        break;
      case "more":
        wx.navigateTo({
          url: '../morelist/morelist'
        })
        break;
      default:

    }
  },


  // goNotice: function () {
  //   wx.navigateTo({
  //     url: '../about/about'
  //   })
  // },

  ListpreviewImage: function (e) {
    var images = e.currentTarget.dataset.imgurls;
    var image = e.currentTarget.dataset.imgurl;
    var newImages = new Array();
    var isStart = false;
    images.forEach(function (item) {
      if (item == image) {
        isStart = true;
      }
      if (isStart) {
        newImages.push(item);
      }
    })
    wx.previewImage({
      urls: newImages,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  showImage: function (e) {
    var id = e.currentTarget.id;
    var notifies= that.data.notifies
    
    notifies.forEach(function(item){
        if(item._id==id){
          if(item.show_image){
            item.show_image = false;
          }else{
            item.show_image = true;
          }
        }else{
          item.show_image=false;
        }
    });
    that.setData({ notifies: notifies})
  },

  detail: function (e) {
    var id = e.currentTarget.id;
    var cid = app.globalData.cid;
    if (e.currentTarget.dataset.cid){
      cid = e.currentTarget.dataset.cid;
    }
    wx.navigateTo({
      url: '../notify/notify?from=main&_id=' + id + '&cid=' + cid
    })
  },

  bindDateChange: function (e) {
    var fullDate = e.detail.value;
    that.setData({ date: fullDate.split('-')[1] + '月' + fullDate.split('-')[2] + '日' })
    that.loadNotify(e.detail.value);
  },


  goNotice: function (e) {
    var href = e.currentTarget.dataset.href;
    href= href.replace(/(\s*$)/g, "");
    var b = new util.Base64();
    console.log(href)
    var href = b.encode(href)
    wx.navigateTo({
      url: '../webview/webview?href='+href,
    })
  },

});
