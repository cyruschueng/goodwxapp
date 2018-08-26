var api = require('../../../api.js')
var config = require('../../../utils/config.js')
var util = require('../../../utils/util.js')
var app = getApp()
var Zan = require('../../../zanui/index');
Page(Object.assign({}, Zan.Toast, {
  data: {
    disabled:false
  },
  onShow: function (options) {
    var avatar  =wx.getStorageSync('avatar_cat_url');
    if(avatar){
      console.log(avatar)
      wx.showNavigationBarLoading();
      wx.showToast({
        title: '加载……',
        duration:20000,
        icon: 'loading'
      })
      this.setData({
        avatar:avatar,
        disabled:true,
      })
      wx.removeStorageSync('avatar_cat_url')
    }
  },
  copy_user_id:function () {
    var that = this;
    wx.setClipboardData({
      data: that.data.user_id,
      success: function(res) {
        wx.showModal({
          title: '提示',
          content: '已经复制您的用户ID到剪贴板，快粘贴发给客服吧',
          showCancel:false,
          confirmText:'收到'
        })
      }
    })
  },
  loaded:function () {
    wx.hideNavigationBarLoading();
    wx.hideToast();
    this.setData({
      disabled:false
    })
  },
  onLoad: function (options) {
    this.setData({
      user_name:options.user_name,
      user_id:options.user_id,
      avatar:options.avatar
    })
  },
  afterChoose: function (localPic) {
    wx.navigateTo({
      url: '/pages/profile/cutInside/cutInside?src='+localPic
    })
  },
  select:function () {
    var that  = this;

    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      count:1,
      success: function (res) {
        that.afterChoose(res.tempFilePaths[0])
      }
    })
  },
  formSubmit: function (e) {
    console.log(e.detail.value)
    if(!e.detail.value.user_name){
      this.showZanToast('必须输入昵称哦');
      return
    }
    if(!this.data.avatar){
      this.showZanToast('必须选择头像呢');
      return
    }
    wx.showNavigationBarLoading();
    wx.showToast({
      title: '保存中……',
      duration:20000,
      icon: 'loading'
    })
    api.profile(e.detail.value.user_name, this.data.avatar, function(info) {
      wx.hideNavigationBarLoading();
      wx.hideToast();
      var _user={'openid':info.user_id,'user_name':info.user_name,'avatar':info.user_avatar,'unionid':info.unionid};
      wx.setStorageSync("user",_user)
      app.globalData.user = _user
      wx.navigateBack();
    },function(res){
      wx.hideNavigationBarLoading();
      wx.hideToast();
      this.showZanToast('更新失败，请稍候再试');
    });
  }
}));