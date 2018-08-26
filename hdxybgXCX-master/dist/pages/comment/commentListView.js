// pages/comment/commentListView.js

import * as hoteldata from '../../utils/hoteldata-format';
import * as HotelDataService from '../../services/hotel-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [''],
    prePageType: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    var prePageType = options.prePageType ? options.prePageType : '';

    switch (prePageType) 
    {
      case 'ballroom':
        this.getBallroomData(options.hallid);
      break;
      case 'celebration':
        this.getCelebrationData(options.celebrationid);
      break;
      case 'dishes':
        this.getDishesData(options.dishesid);
      break;
    }



  },

  getBallroomData(id) {
    HotelDataService.queryBallroomComment(id).then((result) => {

      this.setData({
        comments: hoteldata.formatCommentList(result)
      })

    }).catch((error) => {
      console.log(error);
    })
  },
  getCelebrationData(id) {
    HotelDataService.queryCelebrationComment(id).then((result) => {

      this.setData({
        comments: hoteldata.formatCommentList(result)
      })

    }).catch((error) => {
      console.log(error);
    })
  },
  getDishesData(id) {
    HotelDataService.queryDishesComment(id).then((result) => {

      this.setData({
        comments: hoteldata.formatCommentList(result)
      })

    }).catch((error) => {
      console.log(error);
    })
  }




})