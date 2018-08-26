var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    version:1,
    titleBar: [{ label: '全部', active: true }, { label: '待付款', active: false }, { label: '待发货', active: false }, { label: '待收货', active: false }, { label: '完成', active: false }],
    tempTitleBarIndex:0,
    pageModel:{
      pageIndex:1,
      pageSize:8,
      recordCount:1,
      loading:false,
    },
    orderType:0,
    list:[]
  },
  //收货
  receive(e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '请确认货已到',
      success(res) {
        if (res.confirm) {
          app.post('logistics/info/wx/receive', {
            orderId: e.currentTarget.dataset.id,
            logisticsId: e.currentTarget.dataset.lo
          }, function (res) {
            if (res.code == 1000) {
              wx.redirectTo({
                url: '/pages/orderdetail/orderdetail?id=' +e.currentTarget.dataset.id,
              })
            } else {
              wx.showToast({
                title: '操作失败',
                image: '/img/60.png',
                duration: 800
              })
            }
          })
        }
      }
    })

  },
  pay(e) {
    var that = this;
    app.post('order/info/wx/pay ', {
      orderId: e.currentTarget.dataset.id
    }, function (res) {
      that.wxpay(res.body)
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
  navToOrderDetail(e){
    wx.navigateTo({
      url: '/pages/orderdetail/orderdetail?id='+e.currentTarget.dataset.id,
    })
  },
  initTitleBar(){
    for(var item in this.data.titleBar){
      this.data.titleBar[item].active = false;
    }
  },
  changeBar(e){
    this.initTitleBar();
    this.data.titleBar[e.currentTarget.dataset.index].active = true;
    var that = this;
    

    that.setData({
      orderType: e.currentTarget.dataset.index,
      titleBar:that.data.titleBar,
      tempTitleBarIndex: e.currentTarget.dataset.index
    })
    this.getOrder(0);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrder(0);
  },

  /**
   * 获取订单列表
   */
  getOrder(num){
    var that = this;
    
    var data = {
      isDelete: 0,
      userId: app.userInfo.userId,
      storeId: app.storeId,
      pageIndex: this.data.pageModel.pageIndex,
      pageSize: this.data.pageModel.pageSize
    }
    if(this.data.orderType > 0){
      data.orderType = this.data.orderType
    }
    if (this.data.list.length < this.data.pageModel.recordCount || num == 0){
      that.setData({
        loading: true
      })
      app.post('order/info/wx/finds', data, function (res) {
        var list = res.body.modelData;
        var li = that.data.list;
        if(num == 0){
          li = list;
        }else{
          for(var i in list){
            li.push(list[i]);
          }
        }
        that.setData({
          ip: app.ip,
          version: app.version,
          loading: false,
          list: li,
          pageModel: res.body.pageModel
        })
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getOrder(1)
  },

})