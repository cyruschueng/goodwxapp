var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxnumber:'',
    orderId:null,
    order:null,
    ip:null,
    version:null
  },
  pay(){
    var that = this;
    app.post('order/info/wx/pay ',{
      orderId: that.data.orderId
    },function(res){
      that.wxpay(res.body)
    })
  },
  //收货
  receive(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '请确认货已到',
      success(res) {
        if(res.confirm){
          app.post('logistics/info/wx/receive', {
            orderId: that.data.order.orderId,
            logisticsId: that.data.order.logisticsId
          }, function (res) {
            if (res.code == 1000) {
              wx.redirectTo({
                url: '/pages/orderdetail/orderdetail?id=' + that.data.order.orderId,
              })
            }else{
              wx.showToast({
                title: '操作失败',
                image:'/img/60.png',
                duration:800
              })
            }
          })
        }
      }
    })
    
  },
  //微信支付
  wxpay: function (data) {
    var that = this;
    wx.requestPayment({
      timeStamp: data.time,
      nonceStr: data.nonceStr,
      package: 'prepay_id=' + data.prepay_id,
      signType: 'MD5',
      paySign: data.paySign,
      success: function () {
        wx.redirectTo({
          url: '/pages/orderdetail/orderdetail?id=' + data.orderId,
        })
      },
      fail: function () {
        wx.redirectTo({
          url: '/pages/orderdetail/orderdetail?id=' + data.orderId,
        })
      },

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId:options.id
    })
    this.getOrder();
  },
  getLogistic(){
    var that = this;
    if (that.data.order.logisticsTag != null){
      app.post('logistics/info/wx/findInfo', {
        logisticsTag: that.data.order.logisticsTag,
        companyCode: that.data.order.companyCode
      },function(res){
        var time = JSON.parse(res.body);
        time.Traces = JSON.parse(res.body).Traces.reverse()
        that.setData({
          logistics: time
        })
      })
    }
  },
  getOrder(){
    var that = this;
    app.post('order/info/wx/findOR',{
      orderId:that.data.orderId
    },function(res){
      res.body.address = JSON.parse(res.body.wxAddressInfo)
      that.setData({
        wxnumber:app.wxnumber,
        ip:app.ip,
        version:app.version,
        order:res.body
      })
      that.getLogistic();
    })
  },
  navToShop(e){
    wx.navigateTo({
      url: '/pages/goods/goods?id='+e.currentTarget.dataset.id,
    })
  },
  //生成订单信息
  exist(){
    var that = this;
    wx.navigateTo({
      url: '/pages/existorder/existorder?order='+JSON.stringify(that.data.order),
    })
  },
  takeTojq(e){
    wx.setClipboardData({
      data: app.wxnumber,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '已添加到剪切板',
            })
          }
        })
      }
    })
  },
})