// pages/ballroom/allBallroomList.js

import * as hoteldata from '../../utils/hoteldata-format';
import * as HotelDataService from '../../services/hotel-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ballrooms: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    //取 宴会厅数据
    this.getBallroomData();

  },

  // 取数据
  getBallroomData() {
    HotelDataService.queryBallroomsList().then((result) => {
      // console.log("queryBallroomsList success = " + JSON.stringify(result));
      this.setData({
        ballrooms: hoteldata.formatBallrooms(result)
      })

    }).catch((error) => {
      console.log(error);
    })
  },
  goBallroomPage (e) {

    var id = e.currentTarget.dataset.ballroomid;
    wx.redirectTo({
      url: '../ballroom/ballroom?ballroomid=' + id
    })
    // wx.navigateTo({
    //   url: '../ballroom/ballroom?ballroomid=' + id
    // })
  }
  

})