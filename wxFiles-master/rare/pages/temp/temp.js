// pages/temp/temp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:5,
    value:'支付完成'
  },

 
  onLoad: function (options) {
    var that = this
    var num = 5
    this.setData({
      ssg: options.num,
      flag: options.flag
    })

    if(options.ty == 1){
      this.setData({
        value: '订单未支付'
      })
    }
    var ins = setInterval(function(){
      num = num - 1
      that.setData({
        num:num
      })
      if(num == 0){
        clearInterval(ins)
        wx.navigateTo({
          url: '/pages/orderdetail/orderdetail?num='+options.num + '&flag=' + options.flag,
        })
      }
    },1000)
  },
  doitok: function(){
    var that = this
    wx.navigateTo({
      url: '/pages/orderdetail/orderdetail?num=' + that.data.ssg + '&flag=' + that.data.flag,
    })
  },
  onReady: function () {
  
  },

  onShow: function () {
  
  },

})