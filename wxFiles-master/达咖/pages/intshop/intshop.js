var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navBar: [{ label: '兑换列表', active: true }, { label: '我的', active: false }],
    list:[],
    loading:false,
    orders:[]
  },
  //获取订单
  getOrder: function () {
    var that = this
    this.setData({ loading: true })
    app.wxRequest('order/wx/myorder.do', {
      type: 2,
      userid: wx.getStorageSync("openid"),
      start: that.data.orders.length
      }, function (res) {
      that.setData({
        orders: res,
        loading:false
      })
    })
  },
  //兑换
  duihuan: function (e){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定兑换此商品？兑换后将无法退还。',
      success:function(res){
        if(res.confirm){
          wx.showLoading({
            title: '兑换中...',
          })
          wx.chooseAddress({
            success: function (res) {
              app.wxRequest('order/wx/sourceorder.do', {
                id: that.data.list[e.currentTarget.dataset.index].id,
                userid: wx.getStorageSync("openid"),
                addressname: res.userName,
                addressphone: res.telNumber,
                address: res.provinceName + res.cityName + res.countyName + res.detailInfo,
              }, function (res) {
                var rs = '';
                if(res.code == 0){
                  rs = '/img/60.png'
                }
                wx.hideLoading();
                wx.showToast({
                  title: res.result,
                  image:rs,
                  duration: 800
                })
              })
            }
          })
        }
      }
    })
    
  },
  changeBar: function (e) {
    for (var i = 0; i < this.data.navBar.length; i++) {
      this.data.navBar[i].active = false;
    }
    this.data.navBar[e.currentTarget.dataset.index].active = true;
    this.getOrder();
    var that = this;
    this.setData({
      navBar: that.data.navBar
    })
  },
  getList: function () {
    this.setData({loading:true})
    var that = this;
    app.wxRequest('product/wx/find.do',{ptype:2,start: that.data.list.length},function(res){
      that.setData({
        list: res,
        loading:false,
        url:app.ip
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
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