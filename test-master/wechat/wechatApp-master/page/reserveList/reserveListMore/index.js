var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {
      shopName: '凝聚餐厅龙华总店',
      currentStatusStr: 0,
      bookQueueNumberStr: 'D001',
      deskTypeName: '4',
      bookQueueDate: '2017-07-03',
      bookQueueTime: '11:00',
      createdDate: '2017-08-30 16:11:14'
    },
    items: [],
    id: '',
    more: {},
    alertShow: 0,
    cateringBookQueue:'',
    value:''
  },

  //选择取消预约原因
  radioChange: function (e) {
    this.setData({
      value: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '预约订单详情'
    })
    console.log(options)
    this.setData({
      id: options.id
    })
    this.getReserveList(options.id)
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

  },

  //显示弹窗

  showAlert: function () {
    this.setData({
      alertShow: !this.data.alertShow
    })
  },

  //取消预约
  reserveCancel: function () {
    var that = this;
    var subdata = {};
    subdata.id = this.data.id;
    if(this.data.value >0){
      subdata.reasons = this.data.value;
    }
    app.commonAjax('cat/reserve/cancel', ['memberId'], subdata, function (res) {

      if(res.data.code == 0){
        wx.navigateBack({
          delta: 1
        })
      }

    }, app)
  },

  //获取预约订单详细
  getReserveList: function (listid) {
    var that = this;
    var subdata = {};
    subdata.id = listid;

    app.commonAjax('cat/reserve/queueDetal', ['memberId'], subdata, function (res) {


      that.setData({
        cateringBookQueue: res.data.data.cateringBookQueue,
        items: res.data.data.catToastList
      })



    }, app)
    
  }
})