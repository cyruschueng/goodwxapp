// pages/home/onlinePaymentForClass.js

import * as homedata from '../../utils/homedata-format';
import * as homeService from '../../services/home-service';
import * as wxPayService from '../../services/wxpay-service';
import { Base64 } from '../../utils/urlsafe-base64';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    classInfo: {},

    remindText: '',

    buyCourseSelectCoach: {},

    // 是否支付成功
    isSuccessPayment: false,

    // 是否选择教练
    isSelectCoach: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      cardId: options.cardid ? options.cardid : null,
      price: options.price ? options.price : null,
      actCard: options.cards ? JSON.parse(Base64.decode(options.cards)) : null
    })


    this.uploadBuyClass();

  
  },

  uploadBuyClass() {
    // 两种情况，从正常购课进来--从活动界面进来
    var newDic = {};
    newDic.cardId = this.data.cardId;
    newDic.fee = this.data.price;
    if (this.data.actCard) {
      newDic.actId = this.data.actCard.actId;
      newDic.cardId = this.data.actCard.cardId;
      newDic.fee = this.data.actCard.actPrice;
    }
    wxPayService.uploadBuyClassPay(newDic).then((result) => {

      console.log('uploadBuyClassPay *** ' + JSON.stringify(result));
      if (result.errCode == 0) {
        this.setData({
          classInfo: homedata.formatOnlinePaymentForClass(result.returnResult),
          activeRecId: result.returnResult.activeRecId
        })
      }

    }).catch((error) => {
      console.log(error);
    })
  },

  onShow: function (options) {
    if (wx.getStorageSync('buyCourseSelectCoach')) {
      console.log('buyCourseSelectCoach .. ' + JSON.stringify(wx.getStorageSync('buyCourseSelectCoach')));
      var coach = wx.getStorageSync('buyCourseSelectCoach');
      this.setData({
        isSelectCoach: true,
        buyCourseSelectCoach: coach,
        'classInfo.coachName': coach.name,
        selectCoachInfo: coach
      })
      wx.removeStorage({
        key: 'buyCourseSelectCoach',
      })
    }
  },

  // 页面卸载
  onUnload: function () {
    // 如果支付失败/返回前一页面 则要调用 支付失败接口
    if (!this.data.isSuccessPayment) {

      var payInfo = {
        userCardId: this.data.classInfo.cardId,
        xcxOrderId: this.data.classInfo.orderId,
        actCard: options.cards ? JSON.parse(Base64.decode(options.cards)) : null,
        activeRecId: this.data.activeRecId
      }

      wxPayService.uploadFailPayment(payInfo).then((result) => {

        console.log('uploadFailPayment *** ' + JSON.stringify(result));

      }).catch((error) => {
        console.log(error);
      })
    }

  },

  getUploadOnlineClass() {
    var newDic = {};
    newDic.cardId = this.data.cardId;
    newDic.fee = this.data.cardPrice;
    if (this.data.actCard != null) {
      newDic.actId = this.data.actCard.actId;
      newDic.cardId = this.data.actCard.cardId;
    }
    wxPayService.uploadBuyClassPay(newDic).then((result) => {

      this.setData({
        cardInfo: homedata.formatOnlinePaymentForCard(result.returnResult),
        activeRecId: result.returnResult.activeRecId
      })

    }).catch((error) => {
      console.log(error);
    })
  },

  // 教练选择
  bindSelectCoach () {
    wx.navigateTo({
      url: 'selectedCoach',
    })
  },
   
  // 勾选购买协议
  bindCheckedTap () {
    this.setData({
      'classInfo.checked': !this.data.classInfo.checked
    })
  },

  // 微信支付
  bindPaymentTap () {

    if (!this.data.classInfo.checked) {
      this.setData({
        remindText: '您未同意课程购买协议！'
      })
      setTimeout((function callback() {
        this.setData({
          remindText: ''
        })
      }).bind(this), 2000);
    } else if (!this.data.isSelectCoach) {
      this.setData({
        remindText: '请选择教练！'
      })
      setTimeout((function callback() {
        this.setData({
          remindText: ''
        })
      }).bind(this), 2000);
    } else {
      // 调起支付
      this.bindFinalWXPayTap();
    }

  },

  bindFinalWXPayTap() {

    var payInfo = {
      userCardId: this.data.classInfo.cardId,
      xcxOrderId: this.data.classInfo.orderId,
      ptId: this.data.buyCourseSelectCoach.coachId,
      orderPrice: this.data.classInfo.price
    }

    wxPayService.makeClassPayment(payInfo).then((result) => {

      console.log('makeClassPayment *** ' + JSON.stringify(result));

      if (result) {
        this.setData({
          isSuccessPayment: true
        })
        
        setTimeout((function callback() {
          wx.navigateBack({
            delta: 1
          })
        }).bind(this), 1000);
      }

    }).catch((error) => {
      console.log(error);
    })

  }

})