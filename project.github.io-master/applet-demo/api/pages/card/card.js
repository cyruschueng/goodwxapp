// pages/card/card.js
var app =  getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  //批量添加卡券
  addCard: function (e) {
      // var timestamp = Date.parse(new Date());
      // var openid = app.globalData.openid;
      wx.addCard({
          cardList: [
              {
                  cardId: '',
                  cardExt: '{"code": "", "openid": "", "timestamp": "", "signature":""}'
              }, {
                  cardId: '',
                  cardExt: '{"code": "", "openid": "", "timestamp": "", "signature":""}'
              }
          ],
          success: function(res) {
              console.log(res.cardList) // 卡券添加结果
          }
      })
  }
})