// pages/mine/myOrderListView.js
import * as minedata from '../../utils/minedata-format';
import * as mineService from '../../services/mine-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    emptyText: '没有您的订单',
    emptyIcon: '../../images/bg_img/no_data.png',

    orderList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    

    mineService.queryMyOrderList().then((result) => {
      this.setData({
        orderList: minedata.formatMyOrderList(result.orderList)
      })
    }).catch((error) => {
      console.log(error);
    })

  },

  
  
})