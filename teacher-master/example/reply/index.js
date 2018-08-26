
var app = getApp();
var util = require("../../utils/util.js")
const config = require('../../config')
var curPage = 0;
var canRequest = true;
var pageSize = 20;
var that;
Page({
  data: {
    msgs: [],
    setshow: 0,
    current_reply: 0,
    reply: null,
    feedback_id:'',
    to_openid:'',
    to_name:'',
    to_role: '',
    dialog_id:'',
    content: "",
    winWidth: 0,
    winHeight: 0,
    no_data:false,
    no_more:false,
    curPage: 1
  },

  onLoad: function (options) {
     that = this;
     var from= options.from;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
       if(from){
         wx.setNavigationBarTitle({
           title: '作业互动'
         });
        }
        that.fetchPosts();
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // curPage = 0;
    // canRequest = true;
    // this.setData({ msgs: {} })
    // this.fetchPosts();
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

  onReachBottom: function () {
    that.fetchPosts();
  },

  lower: function () {
    this.fetchPosts();
  },


  fetchPosts: function () {
    if (that.data.no_more) {
      return;
    }
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    wx.showNavigationBarLoading();
     var curPage = that.data.curPage;

    app.getImprint(function (imprint) {
      wx.request({
        url: config.DialogUrl,
        header: { imprint: imprint },
        data: { page: curPage },
        method: "post",
        success: function (res) {
          wx.hideNavigationBarLoading();
          wx.hideToast();
          console.log(res)
          var msgs = res.data.dialogs;
          msgs.forEach(function(item){
            item.create_at = util.formatTime(item.create_at, 1);
            if(item.last1){
              item.last1.from_roleStr = util.GetFamilyRole(item.last1.from_role); item.last1.to_roleStr = util.GetFamilyRole(item.last1.to_role); 
            }
            if (item.last2) {
              item.last2.from_roleStr = util.GetFamilyRole(item.last2.from_role); item.last2.to_roleStr = util.GetFamilyRole(item.last2.to_role);
            }
            item.list.forEach(function (i) { i.from_roleStr = util.GetFamilyRole(i.from_role); i.to_roleStr = util.GetFamilyRole(i.to_role); })
          });
            if (msgs.length > 0) {
              if (curPage == 1) {
                that.setData({ msgs: msgs });
              }
              else {
                that.setData({ msgs: that.data.msgs.concat(msgs) });
              }
            }
            if (msgs.length >= pageSize) {
              that.setData({
                curPage: curPage + 1
              });
            } else {
              that.setData({
                no_more: true
              });
            }

            if (that.data.msgs.length == 0) {
              that.setData({
                no_data: true
              });
            }

        }
      })
    });

  },

  // 提交 TODO
  send: function (event) {
    if (app.globalData.isExpOpenid) {
      wx.showToast({
        title: '体验者无权限',
      })
      return;
    }
    var form_id = event.detail.formId;
    wx.hideKeyboard();
    var that = this;
    app.getImprint(function (imprint) {
      setTimeout(function () {
        if (event.detail.value.comment.length > 0) {
          var formData = {
            comment: event.detail.value.comment,
            dialog_id: that.data.dialog_id,
            to_openid: that.data.to_openid,
            to_name: that.data.to_name,
            to_role:that.data.to_role,
            id: that.data.feedback_id,
            form_id: form_id,
            from:"msg"
          }

          // that.setData({ setshow: 1, dialog_id: dialog_id, to_openid: to_openid, to_name: to_name, feedback_id: feedback_id });
          wx.showToast({
            title: '提交中....',
            icon: 'loading',
            duration: 10000
          });

          app.getImprint(function (imprint) {
            console.log(imprint)
            util.AJAX1(config.feedbackCommentUrl, formData, "post", { imprint: imprint }, function (res) {
              console.log(res)
              wx.hideLoading();
              if (res.data.status == "ok") {
                var dialog=res.data.dialog;
                 var new_msgs=that.data.msgs.map(function(item){
                   if (item._id == dialog._id){
                     if (dialog.last1) {
                       dialog.last1.from_roleStr= util.GetFamilyRole(dialog.last1.from_role); dialog.last1.to_role = util.GetFamilyRole(dialog.last1.to_role);
                     }
                     if (dialog.last2) {
                       dialog.last2.from_roleStr= util.GetFamilyRole(dialog.last2.from_role); dialog.last2.to_roleStr = util.GetFamilyRole(dialog.last2.to_role);
                     }
                     dialog.list.forEach(function (i) { i.from_roleStr = util.GetFamilyRole(i.from_role); i.to_roleStr = util.GetFamilyRole(i.to_role); })
                     return dialog;
                   }
                   return item;
                 });
                 that.setData({ msgs: new_msgs, setshow: 0,content: ""});
                wx.showToast({
                title: '评论成功',
                icon: 'success',
                duration: 150
              });
              }
            });
          });
        } else {
          that.setData({
            content: ""//清空文本域值
          })
        }
      }, 200)
    });
  },

  goOther: function (e) {
    var id = e.currentTarget.dataset.poster_id;
    var nick = e.currentTarget.dataset.nick;
    if (nick) {
      return;
    }
    wx.navigateTo({
      url: '/page/component/other/index?type=post&id=' + id
    })
  },

  hidde_comment: function (e) {
    var that = this;
    that.setData({ setshow: 0, current_reply: 0});
  },



  show_comment_input: function (e) {
    var that = this;
    var dialog_id = e.currentTarget.dataset.dialog_id;
    var to_openid = e.currentTarget.dataset.to_openid;
    var to_name = e.currentTarget.dataset.to_name;
    var to_role = e.currentTarget.dataset.to_role;
    var feedback_id = e.currentTarget.dataset.feedback_id;

    
    that.setData({ setshow: 1, dialog_id: dialog_id, to_openid: to_openid, to_name: to_name, to_role: to_role,feedback_id:feedback_id });
  },
  navToMsg: function (e) {
    var typemsg = e.currentTarget.dataset.id;
    console.log('../"+typemsg+"/index');
    var url = '../reply/index';
    if (typemsg == "like") {
      url = '../like/index';
    }
    else if (typemsg == "system") {
      url = '../system/index';
    }
    wx.navigateTo({
      url: url
    });
  },

})