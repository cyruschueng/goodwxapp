// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    show1:false,
    arr:[
      {
        title:"客服热线",
        dec:"0731-89870101",
        tap:"call",
      },
      {
        title: "招商热线",
        dec: "0731-89872437",
        tap: "call"
      },
      {
        title: "客服QQ",
        dec: "0731-89870101",
        tap: ""
      }
    ],
    arr2:[
      {
        tap:"scane",
        Type:"qrcode1",
        title:"公众号",
        src:"../../images/qrcode.jpg"
      },
      {
        tap: "scane",
        Type: "qrcode2",
        title: "APP下载",
        src: "../../images/wm.png"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  call:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '您是否拨打'+that.data.arr[index].dec,
      content: "",
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.makePhoneCall({
            phoneNumber: that.data.arr[index].dec,
            success: function (res) {
              console.log(res)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //点击出现二维码
  scane:function(e){
    console.log(e)
    var that = this;
    var type = e.currentTarget.dataset.type;
    if(type=="qrcode1"){
      that.setData({
        show: true
      })
    }else{
      that.setData({
        show1: true
      })
    }
  },
  //消失二维码
  disappear:function(){
    var that = this;
    that.setData({
      show: false,
      show1:false
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