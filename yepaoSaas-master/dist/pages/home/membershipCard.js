// pages/home/myMembershipCard.js

import * as homedata from '../../utils/homedata-format';
import * as homeService from '../../services/home-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    carList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    homeService.queryMyCards().then((result) => {

      console.log('queryMyCards *** ' + JSON.stringify(result));
      if (result.rs == 'Y') {
        this.setData({
          carList: homedata.formatMyMemCard(result.cards)
        })
      }

    }).catch((error) => {
      console.log(error);
    })
  
  },

  bindCardTap (e) {
    
    wx.navigateTo({
      url: 'membershipCardDetails?cardid=' + e.currentTarget.id,
    })
  }
})