// pages/mine/myMember/customerTrackingIntention.js
import * as minedata from '../../../utils/minedata-format';
import * as mineService from '../../../services/mine-service';
import { Base64 } from '../../../utils/urlsafe-base64';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    task: {},
    memIdentity: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (options.memId) {
      this.setData({
        memId: options.memId
      })
    }
    if (options.memIdentity) {
      this.setData({
        memIdentity: options.memIdentity
      })
      if (options.memIdentity == 'pt') {
        this.getPtDetails();
      } else {
        this.getMcDetails();
      }
    }

  },

  // 教练 跟单详情
  getPtDetails() {
    mineService.queryCoachTrackIntentionDetails(this.data.memId).then((result) => {

      this.setData({
        task: minedata.formatCustTrackingIntentionDetail(result.potentialMemMap)
      })

    }).catch((error) => {
      console.log(error);
    })
  },
  // 会籍 跟单详情
  getMcDetails() {
    mineService.queryCustTrackIntentionDetails(this.data.memId).then((result) => {

      this.setData({
        task: minedata.formatCustTrackingIntentionDetail(result.potentialMemMap)
      })

    }).catch((error) => {
      console.log(error);
    })
  },

  // 拨打电话
  bindCustPhonecallTap (e) {
    wx.makePhoneCall({
      phoneNumber: this.data.task.custPhone,
    })
  },
  // 预付定金
  bindPrepayTap (e) {
    let qsTask = Base64.encodeURI(JSON.stringify(this.data.task)); 
    wx.navigateTo({
      url: 'custTraIntentionPrepay?qsTask=' + qsTask,
    })
  },
  // 跟单
  bindFollowTap (e) {

    let qsTask = Base64.encodeURI(JSON.stringify(this.data.task)); 

    wx.navigateTo({
      url: 'custTraIntentionFollow?qsTask=' + qsTask + '&memIdentity=' + this.data.memIdentity,
    })
  }

})