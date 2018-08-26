// page/verification/alreadyMenuverification/index.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    deskNo: '',
    memberFlag: '',
    verifyList: '',
    checkboxNum: 0,
    checked: [], //选中列表的索引值
    total: null,//总金额
    lists: [],//分部金额
    dataIndex: null,
    totalOrderId:'',
    ordershopid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数 
    
    this.setData({
      deskNo: options.deskNo,
      memberflag: options.memberflag,
      ordershopid: options.orderShopId
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
    app.commonAjax('/shop/manage/verifyBusiness/verifyDetail', ['shopId'], { deskNo: this.data.deskNo, flag: this.data.memberflag, orderShopId: this.data.ordershopid}, (res) => {
      var verifyList = res.data.data
      
      this.setData({
        verifyList: verifyList,
        verifyListNum: verifyList.length,
        totalOrderId: verifyList[0].orderShopId,
      })
      //this.TotalMoney();
    }, app, 'post')

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

  //计算总条数
  sum() {
    var newsum = 0;
    this.data.checked.forEach((item) => {
      newsum += this.data.verifyList[item].orderMenuList.length

    })
    this.setData({
      sum: newsum
    })
  },
  //已验单详情
  orderIng(){
      wx.navigateTo({
        url: '/page/verification/alreadyMenuDetail/index?totalOrderId=' + this.data.totalOrderId
      })
  },
  //计算总金额
  // TotalMoney() {
  //   var total = null //总金额
  //   var listtotal = null  //单个金额变量 
  //   var lists = []  //分部金额list数组
  //   for (var i = 0; i < this.data.verifyList.length; i++) {
  //     for (var j = 0; j < this.data.verifyList[i].orderMenuList.length; j++) {
  //       listtotal += this.data.verifyList[i].orderMenuList[j].catNum * this.data.verifyList[i].orderMenuList[j].price
  //     }
  //     var newlisttotal = listtotal.toFixed(2)
  //     lists.push(newlisttotal)
  //     total += newlisttotal
  //     newlisttotal = null
  //   }
  //   this.setData({
  //     total: total,
  //     lists: lists
  //   })
  // }
})