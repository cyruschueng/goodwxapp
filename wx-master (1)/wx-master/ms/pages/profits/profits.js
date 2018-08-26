// pages/profits/profits.js
var app = getApp()
var profitsList = function(that,Type){
  //分润列表
  var str = {
    'OperationType': '10032',
    "uid": wx.getStorageSync('uid'),
    "page": that.data.page,
    "HL_Type":Type
  }
  console.log(Type)
  wx.request({
    url: app.globalData.url,
    data: str,
    method: 'POST',
    header: { "content-type": "application/json" },
    success: function (res) {
      console.log(10032)
      console.log(res)
      if(res.data.CODE=="00"){
        if (that.data.page == 1) {
          if(res.data.data.length){
            that.setData({
              profitList: res.data.data,
              show: false
            })
          }else{
            that.setData({
              show: true
            })
          }
            console.log(100321)
        } else {
          if (res.data.data.length && res.data.data != that.data.profitList) {
            var arr = that.data.profitList;
            for (var i = 0; i < res.data.data.length; i++) {
              arr.push(res.data.data[i])
            }
            that.setData({
              profitList: arr,
            })
            console.log(res.data.data)
            console.log(that.data.page)
          } else {
            that.data.page--;
            console.log(10032)
            wx.showToast({
              title: '没有数据了',
              image: "../../images/icon/f.png",
              duration: 1000,
              mask: true,
            })
          }
        }
      }
      if(Type=="BC"){
        that.setData({
          filter: true
        })
      }else{
        that.setData({
          filter: false
        })
      }
    }
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    profitList:[],   //分润列表
    page:1,
    profit:true,  
    createTime:"",   //创建时间
    avatarUrl:"",  //默认分润头像
    avatar:"",//被分红人的头像
    profitMoney:"",  //分润收入
    borrowMoney:"",//借款金额
    userPhone:"",//被收入人账号
    Type:'',  //分润种类
    show:false,
    filter:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //分润收益列表
  profitsList(that, "BT")
    
  },
  onTab:function(){
    var that = this;
    that.setData({
      profit:!that.data.profit,
      page:1
    })
    console.log(that.data.profit)
    that.data.profitList = [];
    var Type = that.data.profit ? "BT" : "JC";
    that.setData({
      Type: Type
    })
    profitsList(that,that.data.Type)
    console.log("2017/11/28 21:11:10".split(" "))
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this;
    var Type = that.data.profit ? "BT" : "JC";
    that.data.page++;
    profitsList(that, Type)

    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})