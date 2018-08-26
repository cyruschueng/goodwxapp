var app = getApp();
var imgUrl = app.globalData.imgUrl;
var baseUrl = app.globalData.baseUrl;
var shop_id = app.globalData.shop_id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rechargeNumInfo:[],
    rechargeID:0,
    customer_id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var rechargeMoneyListUrl = baseUrl + '/api/honey/bean/load-amount?shop_id=' + shop_id;
    this.rechargeMoneyList(rechargeMoneyListUrl);
  },
  // 获取输入的id号（给谁充值id就是谁的）
  customerIdInput(e){
    var customerIdInput=e.detail.value;
    this.setData({
      rechargeID: customerIdInput
    })
    // console.log(customerIdInput)
  },
  // 获取充值金额列表
  rechargeMoneyList(url){
    var that=this;
    wx.request({
      url: url,
      success(res){
        console.log(res)
        if(res.data.success){
          var recharge_amount = res.data.result.recharge_amount.split(",");
          var recharge_amountArr=[];
          for (var i = 0; i < recharge_amount.length;i++){
            var recharge_amountObj={}
            recharge_amountObj={
              content1: recharge_amount[i]+'元',
              content2: recharge_amount[i] + '蜜豆币',
            }
            recharge_amountArr.push(recharge_amountObj)
          }
          that.setData({
              rechargeNumInfo: recharge_amountArr
          })
        }
      }
    })
  },
  // 点击充值
  rechargeClick(e){
    var that=this;
    var rechargeNum=e.currentTarget.dataset.rechargenum;
    var rechargeMoney = rechargeNum.slice(0,rechargeNum.length-1);
    var rechargePlanUrl = baseUrl + '/api/pay/prepay?shop_id=' + shop_id + '&customer_id=' + that.data.customer_id + '&app_id=wxb27dd17f341dc468&amount=' + rechargeMoney +'&type=recharge';
    var rechargeUrl = baseUrl + '/api/honey/bean/recharge?customer_id=' + that.data.rechargeID + '&amount=' + rechargeMoney + '&type=1' + '&shop_id=' + shop_id;
    wx.request({
      url: rechargePlanUrl,
      success(res){
        console.log(res)
        if (res.data.success) {
          var txn_seq_id = res.data.result.txn_seq_id;
          var timeStamp = res.data.result.timeStamp;
          var nonceStr = res.data.result.nonceStr;
          var packAge = res.data.result.package;
          var signType = res.data.result.signType;
          var paySign = res.data.result.sign;
          wx.requestPayment({
            'timeStamp': timeStamp,
            'nonceStr': nonceStr,
            'package': packAge,
            'signType': signType,
            'paySign': paySign,
            success: function (res) {
              console.log(res);
            },
            fail: function (res) {
              console.log(res);
            },
            complete: function (res) {
              console.log(res)
              wx.request({
                url: rechargeUrl + '&txn_seq_id=' + txn_seq_id,
                success(res) {
                  console.log(res)
                  if (res.data.success) {

                  }
                }
              })
              // wx.switchTab({
              //   url: '../homePage/homePage',
              // })
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this;
    wx.getStorage({
      key: 'customer_id',
      success: function(res) {
        that.setData({
          customer_id:res.data
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})