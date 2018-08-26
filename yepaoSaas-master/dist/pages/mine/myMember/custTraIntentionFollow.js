// pages/mine/myMember/custTraIntentionFollow.js

import * as minedata from '../../../utils/minedata-format';
import * as mineService from '../../../services/mine-service';
import { Base64 } from '../../../utils/urlsafe-base64';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    headimg: '../../../images/icon/default_headimg.png',
    custName: '张迪',

    task: null,

    txtPlaContentHidden: false,
    txtPlaAttentionHidden: false,

    txtPlaContent: '',
    txtPlaAttention: '',

    memIdentity: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (options.qsTask) {
      let qsTaskObj = Base64.decode(options.qsTask);
      this.setData({
        task: JSON.parse(qsTaskObj)
      })
      console.log('被跟单的会员 ... ' + JSON.stringify(this.data.task));
    }

    if (options.memIdentity) {
      this.setData({
        memIdentity: options.memIdentity
      })
    }

  },

  bindTextareaFocus(e) {
    if (e.currentTarget.dataset.type == 'content') {
      this.setData({
        txtPlaContentHidden: true
      })
    } else {
      this.setData({
        txtPlaAttentionHidden: true
      })
    }
  },

  bindPlaContentInput(e) {
    this.setData({
      txtPlaContent: e.detail.value
    })
  },
  bindPlaAttentionInput(e) {
    this.setData({
      txtPlaAttention: e.detail.value
    })
  },

  // 提交 跟单
  bindConfirmTap(e) {

    if (this.data.txtPlaContent == '') {
      wx.showToast({
        icon: 'none',
        title: '不可以留空哦~',
      })
    } else if (this.data.txtPlaAttention == '') {
      wx.showToast({
        icon: 'none',
        title: '不可以留空哦~',
      })
    } else {
      if (this.data.memIdentity == 'pt') {
        // 教练 跟单 提交
        this.PtUploadFollow();
      } else {
        // 会籍 跟单 提交
        this.McUploadFollow();
      }
    }

  },
  McUploadFollow() {
    mineService.uploadCustTrackIntentionFollow(this.data.task.memId, this.data.txtPlaContent, this.data.txtPlaAttention).then((result) => {

      wx.navigateBack({
        delta: 2
      })

    }).catch((error) => {
      console.log(error);
    })
  },
  PtUploadFollow() {
    mineService.uploadCoachTrackIntentionFollow(this.data.task.memId, this.data.txtPlaContent, this.data.txtPlaAttention).then((result) => {

      wx.navigateBack({
        delta: 2
      })

    }).catch((error) => {
      console.log(error);
    })
  }
})