// pages/celebration/celebrationList.js

import * as hoteldata from '../../utils/hoteldata-format';
import * as HotelDataService from '../../services/hotel-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    prePageType: '',
    // 宴会庆典
    celebrationList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      prePageType: options.prepagetype ? options.prepagetype : ''
    })

    HotelDataService.queryCelebrationList().then((result) => {
      //庆典 数据
      this.setData({
        celebrationList: hoteldata.formatBanquet(result),
      })
    }).catch((error) => {
      console.log(error);
    })

  },

  goCelebrationDetailsPage (e) {
    wx.navigateTo({
      url: '../celebration/celebrationDetails?celebrationid=' + e.currentTarget.id + '&prepagetype=' + this.data.prePageType
    })
  }
})