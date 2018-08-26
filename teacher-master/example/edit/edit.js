
var util = require("../../utils/util.js")
var app = getApp();
var that;
const config = require('../../config')
Page({
  data: {
    currentUser: "",
    referFromUser: "",
    loaded: false,
    unAssociate_btn_disable: false,
    save_btn_disable: false,
    role:'',
    childName:'',
    isMock:false,
  },
  onLoad(option) {
    that = this;
    wx.showLoading({
      title: '加载中....',
    });
    that.setData({ role: app.globalData.role, childName: app.globalData.childName, isMock: app.globalData.isMock, cid: app.globalData.cid})
    app.getImprint(function (imprint) {
      util.AJAX1(config.userInfoUrl, {}, "post", { imprint: imprint }, function (res) {
        console.log(res);
        wx.hideLoading();
        if (res.data.status == "ok") {
          if (res.data.currentUser && res.data.referFromUser) {
            that.setData({ currentUser: res.data.currentUser, referFromUser: res.data.referFromUser, loaded: true });
          } else if (res.data.currentUser) {
            that.setData({ currentUser: res.data.currentUser, loaded: true });
          }
        } else {
          wx.showToast({
            title: '获取异常，请稍后重试',
          })
        }
      });
    });
  },
  onShow() {
  },



  changeRole: function (event) {
    wx.reLaunch({
      url: '../rolelist/rolelist',
    })
  },

  goAdmin: function (event) {

    var b = new util.Base64();
    var href = b.encode("https://ab.welife001.com/minAdminMain")
    wx.navigateTo({
      url: '../webview/webview?href=' + href,
    })
  },

  goClearMock: function (event) {
    util.AJAX2(config.updateConfigUrl, '清除中', { value:"no", key:"mock_openid"}, "get", {  }, function (res) {
      if (res.data.status == "ok") {
        app.globalData.isMock=false;
        wx.showToast({
          title: '清除成功...',
          icon: 'success',
          duration: 1000
        });
      } else {
        wx.showToast({
          title: '处理异常',
        })
      }
    });
  },

  

  goClear: function (event) {
    wx.removeStorageSync('imprint');
    wx.removeStorageSync('configData');
    app.configData="";
    wx.reLaunch({
      url: '../start/start',
    })
  },

  // 提交 TODO
  unAssociate: function (event) {
    if (app.globalData.isExpOpenid) {
      wx.showToast({
        title: '体验者无权限',
      })
      return;
    }
    that.setData({ unAssociate_btn_disable: true });
    app.getImprint(function (imprint) {
      util.AJAX2(config.unAssociateUrl, '解除关联中', {}, "post", { imprint: imprint }, function (res) {
        if (res.data.status == "ok") {
          wx.showToast({
            title: '解除关联成功...',
            icon: 'success',
            duration: 3000
          });
          setTimeout(function () {
            wx.redirectTo({
              url: '../start/start'
            })
          }, 3000)
        } else {
          wx.showToast({
            title: '处理异常',
          })
        }
      });
    });
  },



  // 提交 TODO
  submit: function (event) {
    if (app.globalData.isExpOpenid) {
      wx.showToast({
        title: '体验者无权限',
      })
      return;
    }
    var phone = event.detail.value.phone;
    var nickname = event.detail.value.nickname;
    that.setData({ save_btn_disable: true });
    var fromData = { phone: phone, role: that.data.role, nickname: nickname,cid:that.data.cid};
    app.getImprint(function (imprint) {
      util.AJAX2(config.updateUserInfoUrl, '提交中', fromData, "post", { imprint: imprint }, function (res) {
        that.setData({ save_btn_disable: false });
        if (res.data.status == "ok") {
          app.globalData.notifyReload = 1;
          if(that.data.role=="parent"){
            app.globalData.childName = nickname
          }
          wx.showToast({
            title: '更新成功',
            icon: 'success',
            duration: 1000
          });
          setTimeout(function () {
            wx.navigateBack()
          }.bind(this), 1000);
        } else {
          wx.showToast({
            title: '处理异常',
          })
        }
      });
    });
  },
})
