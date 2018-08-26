//logs.js
import * as hoteldata from '../../utils/hoteldata-format';
import * as HotelDataService from '../../services/hotel-service';

Page({
  data: {
    messages: []
  },
  onLoad: function () {
    
    //获取 消息
    HotelDataService.queryMessageList().then((result) => {
      console.log("queryMessageList success = " + JSON.stringify(result));

      this.setData({
        messages: hoteldata.formatMessageList(result)
      })

    }).catch((error) => {
      console.log(error);
    })


  },

  goMessageDetailsPage (e) {
    wx.navigateTo({
      url: 'messageDetails?messageid=' + e.currentTarget.id,
    })
  }
})
