var app = getApp();
var imgUrl = app.globalData.imgUrl;
var baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navid:0,
    topNavInfoArr: [
      {
        topNavInfoName: '签到收益'
      },
      {
        topNavInfoName: '购物分红'
      },
      {
        topNavInfoName: '爱心传递'
      }
    ],
    dividendDetailList:[],
    fort_id:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    // 获取navid
    wx.getStorage({
      key: 'navid',
      success: function(res) {
        that.setData({
          navid: res.data
        })
      },
    })
    wx.getStorage({
      key: 'fort_id',
      success: function (res) {
        // console.log(res)
        that.setData({
          fort_id: res.data
        })
        var dividendDetailUrl = baseUrl + '/api/fort/hostess/factory/count?fort_id=' + that.data.fort_id;
        that.getDividendDetail(dividendDetailUrl)
      },
    })
    
  },
  // 工厂分红明细方法
  getDividendDetail(url){
    var that=this;
    wx.request({
      url: url,
      success(res){
        console.log(res)
        if(res.data.success){
          that.setData({
            dividendDetailList :res.data.result
          })
        }else{
          wx.showModal({
            title: '提示',
            content: '数据获取失败',
          })
        }
      }
    })
  },
  // 点击导航
  selectNav(e){
    var navid = e.currentTarget.dataset.navid;
    this.setData({
      navid: navid
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