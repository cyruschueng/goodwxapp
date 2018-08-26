// pages/home/membershipCardDetails.js
import * as homedata from '../../utils/homedata-format';
import * as homeService from '../../services/home-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    carDetail: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    homeService.queryMyCardsDetail(options.cardid).then((result) => {

      console.log('queryMyCardsDetail *** ' + JSON.stringify(result));
      if (result.rs == 'Y') {
        this.setData({
          carDetail: homedata.formatMyMemCardDetails(result.cards)
        })
      }

    }).catch((error) => {
      console.log(error);
    })
  
  },

  // 续费
  bindRenewFeeTap () {

    

  }
})