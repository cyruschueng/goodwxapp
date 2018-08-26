// pages/mine/myMember/custTraIntentionPrepay.js

import * as minedata from '../../../utils/minedata-format';
import * as mineService from '../../../services/mine-service';
import { Base64 } from '../../../utils/urlsafe-base64';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    task: null,

    prepayList: [],

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
    this.getPrepayList();

  },
  getPrepayList() {
    mineService.queryCustTrackIntentionPrepay(this.data.task.memId).then((result) => {
      // console.log('queryCustTrackIntentionPrepay *** ' + JSON.stringify(result));

      this.setData({
        prepayList: minedata.formatCustTrackingIntentionDetailPrepayList(result.preFeeList)
      })

    }).catch((error) => {
      console.log(error);
    })
  },

  bindPrepayConfirmTap() {
    if (this.data.prepayNum== '') {
      wx.showToast({
        title: '请填写预付金额',
        icon: 'none'
      })
    } else if (this.data.deduNum == '') {
      wx.showToast({
        title: '请填写抵扣金额',
        icon: 'none'
      })
    } else {
      mineService.uploadCustTrackIntentionPrepay(this.data.task.memId, this.data.prepayNum, this.data.deduNum).then((result) => {
        // console.log('uploadCustTrackIntentionPrepay *** ' + JSON.stringify(result));
        // 刷新界面
        this.getPrepayList();

      }).catch((error) => {
        console.log(error);
      })
    }
  },
  bindTextDeduInput(e) {
    this.setData({
      deduNum: e.detail.value
    })
  },
  bindTextPrepayInput(e) {
    this.setData({
      prepayNum: e.detail.value
    })
  }

  
})