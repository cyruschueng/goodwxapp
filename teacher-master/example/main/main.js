var util = require("../../utils/util.js")
var app = getApp();
const config = require('../../config')
var that;
Page({
  data: {
    notifies: [],
    dateNotifies: [],
    user: "",
    all_msgs_count: 0,
    no_data: false,
    loaded: false,
    winWidth: 0,
    winHeight: 0,
    date: '',
    show_pub: false
  },

  onShow: function () {
    if (app.globalData.notifyReload == 1) {
      console.log("加载notify on show")
      that.loadNotify('');
    }
    app.globalData.notifyReload = 0;
    app.getImprint(function (imprint) {
      var formdata = {}
      util.AJAX1(config.msgInfoUrl, formdata, "get", { imprint: imprint }, function (res) {
        var result = res.data;
        if (result.status == 'ok') {
          that.setData({ all_msgs_count: res.data.all_msgs_count })
        }
      });
    });
  },

  onLoad: function (options) {
    that = this;
    console.log("加载notify on onLoad")
    that.loadNotify('');
    that.loadNotice();
  },

  loadNotice: function () {
    app.initData(function (configData) {
      var teacher_notice = configData.teacher_notice;
      var teacher_notice_obj = JSON.parse(teacher_notice);
      that.setData({ teacher_notice: teacher_notice_obj })
    });
  },



  loadNotify: function (date) {
    wx.showLoading({
      title: '加载中....',
    });
    wx.showNavigationBarLoading();
    app.getImprint(function (imprint) {
      util.AJAX1(config.UserInfoUrl, {}, "post", { imprint: imprint }, function (res) {
        if (res.data.status == "ok") {
          that.setData({ user: res.data.currentUser });
          util.AJAX1(config.mainNotifiesUrl, { role: "teacher", date: date }, "post", { imprint: imprint }, function (res) {
            console.log(res)

            if (res.data.status == "ok") {
              res.data.recents.forEach(function (item) {
                item.role = util.GetFamilyRole(item.role);
                // item.create_at = util.formatTime(item.create_at, 3)
              })
              if (res.data.dateNotifies.length == 0) {
                that.setData({
                  no_data: true, loaded: true, 
                  recents: res.data.recents,
                  dateNotifies: [], 
                  winWidth: app.globalData.winWidth,
                  winHeight: app.globalData.winHeight,
                  isExpOpenid: app.globalData.isExpOpenid,
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
                });



                that.setData({
                  dateNotifies: res.data.dateNotifies, recents: res.data.recents, loaded: true, no_data: false, winWidth: app.globalData.winWidth, winHeight: app.globalData.winHeight, isExpOpenid: app.globalData.isExpOpenid,
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

  // goNotice: function () {
  //   wx.navigateTo({
  //     url: '../about/about'
  //   })
  // },


  closePub: function () {
    that.setData({ show_pub: false })
  },




  publish: function (e) {
    console.log(e)
    var action = e.currentTarget.id;
    var mode = e.currentTarget.dataset.mode;
    that.setData({ show_pub: false })
    switch (mode) {
      case "1":
        wx.navigateTo({
          url: '../add/add'
        })
        break;
      case "2":
        wx.navigateTo({
          url: '../add/add?inform=true'
        })
        break;
      case "3":
        wx.navigateTo({
          url: '../uploadphoto/uploadphoto'
        })
        break;
      case "4":
        wx.navigateTo({
          url: '../add/add?need_check=true'
        })
        break;
      case "5":
        wx.navigateTo({
          url: '../uploadphoto/uploadphoto?type=1'
        })
        break;
      case "6":
        wx.navigateTo({
          url: '../help/help?inform=true'
        })
        break;
      case "7":
        wx.showToast({
          title: '稍后上线',
        })
        break;
      default:
    }

    var form_id = e.detail.formId;
    console.log(form_id)
    // app.getImprint(function (imprint) {
    //   util.AJAX1(config.putFormidUrl, { form_id: form_id }, "post", { imprint: imprint }, function (res) {
    //   });
    // });
  },

  navigate: function (e) {
    var action = e.currentTarget.id;

    switch (action) {
      case "add":
        that.setData({ show_pub: true })
        break;
      case "msgs":
        wx.navigateTo({
          url: '../msgs/msgs?from=teacher'
        })
        break;
      case "my":
        wx.navigateTo({
          url: '../edit/edit'
        })
        break;
      case "class":
        wx.navigateTo({
          url: '../classlist/classlist'
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

  bindDateChange: function (e) {
    var fullDate = e.detail.value;
    that.setData({ date: fullDate.split('-')[1] + '月' + fullDate.split('-')[2] + '日' })
    that.loadNotify(e.detail.value);
  },

  goNotice: function (e) {
    var href = e.currentTarget.dataset.href;

    href = href.replace(/(\s*$)/g, "");
    var b = new util.Base64();
    var href = b.encode(href)
    wx.navigateTo({
      url: '../webview/webview?href='+href,
    })
  },


  detail: function (e) {
    var id = e.currentTarget.id;
    var cid = e.currentTarget.dataset.cid;
    wx.navigateTo({
      url: '../notify/notify?from=parent&_id=' + id + '&cid=' + cid
    })
  }
});
