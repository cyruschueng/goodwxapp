// pages/profile/historyOrder.js

import * as hoteldata from '../../utils/hoteldata-format';
import * as HotelDataService from '../../services/hotel-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //获取 历史订单
    var openid = wx.getStorageSync('openid').val;
    console.log('openid .. ' + openid);

    HotelDataService.queryHistoryOrderList(openid).then((result) => {
      console.log("queryHistoryOrderList success = " + JSON.stringify(result));

      var list = hoteldata.formatHistoryorder(result)
      this.setData({
        orderList: list
      })
      console.log('historyList *** ' + JSON.stringify(list));

    }).catch((error) => {
      console.log(error);
    })
  
  },

  // 点击 展开
  bingKindToggleTap: function (e) {
    var id = e.currentTarget.id,
      list = this.data.orderList;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].orderId == id) {
        list[i].open = !list[i].open
      }
    }
    this.setData({
      orderList: list
    });
  }
  
})