// pages/ballroom/ballCommentList.js

import * as hoteldata from '../../utils/hoteldata-format';
import * as HotelDataService from '../../services/hotel-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: ['']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var me = this;
    HotelDataService.queryBallroomComment(options.hallid).then((result) => {
      // console.log("success = " + JSON.stringify(result.hotel));

      this.setData({
        comments: hoteldata.formaHotelCommentList(result)
      })

    }).catch((error) => {
      console.log(error);
    })
  
  },

  goEditCommentPage () {
    wx.navigateTo({
      url: 'ballComment',
    })
  }


})