import {
  MUSIC_PALY_IMG,
  MUSIC_PAUSE_IMG
} from '../../utils/constants.js'
import { $wuxToptips } from '../../packages/@wux/components/wux';
import { $wuxDialog } from '../../packages/@wux/components/wux';
import WxValidate from '../../common/assets/plugins/WxValidate';
import { Token } from '../../utils/token.js';
import api from '../../api/api_v1.js'
import util from '../../utils/util.js'
const qiniuUploader = require("../../libs/qiniuUploader");

var title = '聚会呗';

Page({
  data: {
    musics: [],
    current: 0,
    playId: -1,
    contentType: 'picture',
    playImg : MUSIC_PALY_IMG,
    info: [],
    uid: 3,
    activity_id: 0,
    activity_info: {},
    is_coming: 0,
    is_uploading: false
  },
  onLoad: function (options) {
    var that = this;
    console.log('options', options)
    if (options.activity_id) this.setData({ activity_id: options.activity_id })
    var uid = wx.getStorageSync('uid')
    if (uid) {
      this.setData({ uid: uid })
      console.log('uid1=', uid);
      this.getUserActivityInfo(uid)
    } else {
      var token = new Token();
      token.getTokenFromServer((cb)=>{
        that.setData({ uid: cb.uid })
        token.saveUserInfo(cb.uid)
        console.log('uid2=', cb.uid);
        that.getUserActivityInfo(cb.uid)
      });
    }
    this.initValidate();
    // 显示当前页面的转发按钮
    wx.showShareMenu({ withShareTicket: true })
  },
  /**
   * 获取用户聚会信息
   */
  getUserActivityInfo: function(uid) {
    var that = this;
    // 获取当前用户聚会信息
    api.getUserActivityInfo({
      query: {
        user_id: uid,
        activity_id: that.data.activity_id
      },
      success: (res) => {
        console.log('getUserActivityInfo', res.data.data)
        if (res.data.res === 0) {
          that.setData({
            info: res.data.data,
            is_coming: res.data.data.is_coming,
            is_uploading: res.data.data._is_uploading,
            username: res.data.data.user_info.nickname,
            phone: res.data.data.user_info.phone
          })
          that.getActivityInfo()
        } else {
          that.saveActivityUser(uid)
        }
      },
      fail: (msg) => {
        that.saveActivityUser(uid)
      }
    })
  },
  /**
   * 关联聚会用户 并获取用户聚会信息
   */
  saveActivityUser: function(uid) {
    var that = this;
    api.saveActivityUser({
      method: 'post',
      data: {
        user_id: uid,
        activity_id: that.data.activity_id
      },
      success: (res) => {
        console.log('saveActivityUser', res.data.data);
        if (res.data.res === 0) {
          that.setData({
            info: res.data.data,
            is_coming: res.data.data.is_coming,
            is_uploading: res.data.data._is_uploading,
            username: res.data.data.user_info.nickname,
            phone: res.data.data.user_info.phone
          })
          that.getActivityInfo()
        }
      }
    })
  },
  /**
   * 获取聚会详细信息
   */
  getActivityInfo: function() {
    var that = this;
    api.getActivityInfo({
      query: {
        activity_id: that.data.activity_id
      },
      success: (res) => {
        console.log('activity_info', res.data.data);
        if (res.data.res === 0) {
          that.setData({
            activity_info: res.data.data
          })
          title = res.data.data.title
          wx.setNavigationBarTitle({
            title: res.data.data.title
          })
        }
      }
    })
  },
  onReady: function () {
    
  },
  openShareMenu: function(e) {
    console.log('openShareMenu', e)
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  /**
   * 切换图片
   */
  handleChange: function (e) {
    let current = e.detail.current
    let length = this.data.activity_info.activity_image.length
    if (current === length) {
      this.setData({
        current: 0
      })
    }
  },
  togglePlay: function (e) {
    let musics = this.data.musics
    let playId = this.data.playId
    let musicId = e.target.dataset.id
    let music = musics.find((music) => music.id === musicId)

    musics = musics.map((music) => {
      music.playImg = MUSIC_PALY_IMG
      return music
    })

    if (playId !== musicId) {
      playId = musicId
      music.playImg = MUSIC_PAUSE_IMG
      this.playMusic(music)
    } else {
      playId = -1
      music.playImg = MUSIC_PALY_IMG
      this.pauseMusic()
    }

    this.setData({ musics, playId })
  },
  playMusic: function (music) {  
    wx.playBackgroundAudio({
      dataUrl: music.music_id,
      title: music.title
    })
  },
  pauseMusic: function () {
    wx.pauseBackgroundAudio()
  },
  /**
   * 切换小菜单
   */
  switchContent: function (e) {
    let type = e.target.dataset.type
    // this.data.contentType = type
    this.setData({ contentType:type })
  },
  /**
   * 打开影集详情页
   */
  openDetail: function(e) {
    // console.log('openDetail',e);
    wx.navigateTo({
      url: '/pages/picture-detail/index?image_id=' + e.target.dataset.image_id
    })
  },
  /**
   * 上传图片到七牛
   */
  uploadImage: function () {
    if (this.data.is_uploading) {
      wx.navigateTo({
        url: '/pages/cut_image/index?user_id=' + this.data.uid + '&activity_id=' + this.data.activity_id
      })
    } else {
      this.buyPictureSpace();
    }
  },
  /**
   * 购买影集空间
   */
  buyPictureSpace: function() {
    wx.showModal({
      title: '温馨提示',
      content: '默认能上传10张照片，点击确认反馈问题',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.navigateTo({
            url: '/pages/about/index',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  showDialog() {
    let dialogComponent = this.selectComponent('.wxc-dialog');
    dialogComponent && dialogComponent.show();
  },
  hideDialog() {
    let dialogComponent = this.selectComponent('.wxc-dialog');
    dialogComponent && dialogComponent.hide();
  },
  onConfirm: function (e) {
    
    this.hideDialog();
  },
  onCancel() {
    console.log('点击了取消按钮');
    this.hideDialog();
  },
  /**
   * 表单验证初始化
   */
  initValidate() {
    this.WxValidate = new WxValidate({
      username: {
        required: true,
      },
      phone: {
        required: true,
        tel: true,
      }
    }, {
        username: {
          required: '还没有填写姓名',
        },
        phone: {
          required: '还没有填写手机',
          tel: '请输入正确的手机号',
        }
      })
  },
  /**
   * 提示
   */
  showToptips(error) {
    const hideToptips = $wuxToptips.show({
      timer: 3000,
      text: error.msg || '请填写正确的字段',
      success: () => console.log('toptips', error)
    })
  },
  /**
   * 提交表单
   */
  submitForm: function(e) {
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      this.showToptips(error)
      return false
    }
    var that = this;
    api.saveUserComing({
      method: 'post',
      data: {
        form_id: e.detail.formId,
        user_id: that.data.uid,
        activity_id: that.data.activity_id,
        username: e.detail.value.username,
        phone: e.detail.value.phone
      },
      success: (res) => {
        console.log('onConfirm', res)
        if (res.data.res === 0) {
          wx.showToast({
            title: '报名成功',
            icon: 'success',
            duration: 1000,
            success: function () {
              that.setData({ is_coming: 1 })
            }
          });
        }
      }
    })
    this.hideDialog();
  },
  /**
   * 保存更改的照片名
   */
  saveImageName: function(e) {
    // 只有更改了才会保存
    if (e.detail.value !== e.target.dataset.image_name) {
      // console.log('saveImageName', e);
      api.saveImageName({
        method: 'post',
        data: {
          image_id: e.target.dataset.image_id,
          name: e.detail.value
        },
        success: (res) => {
          if (res.data.res === 0) {
            console.log('saveImageName', res.data.data);
          }
        }
      })
    }
  },
  /**
   * 拨打电话
   */
  callPhone: function(options) {
    wx.makePhoneCall({
      phoneNumber:  options.target.dataset.phone
    })
  },
  /**
   * 页面分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: title,
      path: '/pages/activity-detail/index?user_id=' + this.data.uid + '&activity_id=' + this.data.activity_id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    this.getUserActivityInfo(this.data.uid);
    wx.stopPullDownRefresh();
  }
})