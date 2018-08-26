var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{ price: 20, active: false }, { price: 50, active: false }, { price: 100, active: false }, { price: 150, active: false }, { price: 200, active: false },
      { price: 200, active: false }, { price: 300, active: false }, { price: 500, active: false }, { price: 1000, active: false }
    ],
    msg:''
  },
  //立即充值
  submits: function (){
    var temp = 0;
    for(var i=0;i<this.data.list.length;i++){
      if (this.data.list[i].active){
        temp = this.data.list[i].full
      }
    }
    app.wxRequest('uservip/wx/recharge.do',{userid:wx.getStorageSync("openid"),total_fee:temp},function(res){
      var data = JSON.parse(res);
      wx.requestPayment({
        timeStamp: data.time,
        nonceStr: data.nonceStr,
        package: 'prepay_id=' + data.prepay_id,
        signType: 'MD5',
        paySign: data.paySign,
        success: function (res) {
          wx.redirectTo({
            url: '/pages/vip/vip',
          })
        }
      })
    })
  },
  initActive: function (){
    for(var i=0;i<this.data.list.length;i++){
      this.data.list[i].active = false;
    }
  },
  chooseIt: function (e) {
    this.initActive();
    var that = this;
    that.data.list[e.currentTarget.dataset.index].active = true;
    this.setData({
      list: that.data.list
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.wxRequest('recharge/wx/list.do',{type:2},function(res){
      for(var i=0;i<res.length;i++){
        res[i].active = false
      }
      that.setData({
        list: res
      })
    })
    app.wxRequest('systemconfig/wx/get.do',{},function(res){
      that.setData({
        msg: res[0].rechargeremark
      })
    })
    if(wx.getStorageSync("phone") == ''){
      wx.showModal({
        title: '提示',
        content: '您还没注册为 BigJA会员 呢！ 是否前往注册？',
        cancelText:'返回',
        confirmText:'立即前往',
        success: function (res) {
          if(res.confirm){
            wx.redirectTo({
              url: '/pages/vip/register/register',
            })
          }else{
            wx.navigateBack({
              delta:1
            })
          }
        }
      })
    }else{
      var uid = '';
      if (options.userid) {
        uid = options.userid;
      }
      if (wx.getStorageSync("userInfo") == null || !wx.getStorageSync("userInfo")) {
        app.getUserInfo(uid);
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '达咖vip充值',
      path: '/pages/recharge/recharge?userid=' + wx.getStorageSync("openid"),
      success: function (res) {
        console.log(res)
        wx.getShareInfo({
          shareTicket: res.shareTickets,
          success: function (res) {
            console.log(res)
          },
          fail: function () {
            console.log(res)
          }
        })
      }
    } 
  }
})