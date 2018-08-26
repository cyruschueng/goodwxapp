// pages/home/buyMembershipCard.js
import * as homedata from '../../utils/homedata-format';
import * as homeService from '../../services/home-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    carList: [],
    totalPrice: 0,

    protocolChecked: true,


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    homeService.queryOnlineCards().then((result) => {

      console.log('queryOnlineCards *** ' + JSON.stringify(result));
      if (result.rs == 'Y') {
        this.setData({
          carList: homedata.formatBuyMemCard(result.cards)
        })
      }

    }).catch((error) => {
      console.log(error);
    })
  
  },

  bindCarCellTap (e) {

    var index = e.currentTarget.id;
    var carList = this.data.carList;
    var price = 0;

    carList.forEach(car => {
      car.checked = false;
      carList[index].checked = true;
      if (car.checked) {
        price = car.carPrice
      }
    })

    this.setData({
      carList: carList,
      totalPrice: price
    })

  },

  bindProtocolCheckedTap (e) {

    this.setData({
      protocolChecked: !this.data.protocolChecked
    })

  },

  bindBuyBtnTap (e) {

    var carList = this.data.carList;
    var cardid = '';
    var cardPrice = 0;
    carList.forEach(car => {
      if (car.checked) {
        cardid = car.cardId;
        cardPrice = car.carPrice;
      }
    })

    wx.navigateTo({
      url: 'onlinePaymentForCard?cardid=' + cardid + '&cardPrice=' + cardPrice,
    })

  }

})