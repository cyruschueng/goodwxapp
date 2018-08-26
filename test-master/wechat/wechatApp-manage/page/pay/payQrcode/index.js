var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeImgUrl:'',
    payId:'',
    actualMoney:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.getStorageSync('codeImgUrl')

    this.setData({
      actualMoney: options.actualMoney,
      payId: options.payId,
      codeImgUrl: wx.getStorageSync('codeImgUrl')
    })
    wx.removeStorageSync('codeImgUrl')
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

  queryPayResult(){
    app.commonAjax('/shop/manage/order/queryPayResult', [], { payId: this.data.payId}, (res) => {


      console.log(res.data.data.payStatus)

      if (res.data.code == 0) {
        
        if (res.data.data.payStatus == 0){
          wx.showToast({
            title: '未支付',
            image: '/image/i/x.png',
            duration: 2000
          })
        }

        if (res.data.data.payStatus == 1) {
          wx.showToast({
            title: '支付成功',
            icon:'success',
            duration: 2000,
            success:()=>{
              setTimeout(()=>{
                wx.redirectTo({
                  url: '/page/paySuccess/index?payTypeStr=' + res.data.data.payTypeStr + '&orderNo=' + res.data.data.orderNo + '&actualMoney=' + res.data.data.actualMoney + '&createdDate=' + res.data.data.createdDate   ,
                })
              },2000)
            }
          })
        }

        if (res.data.data.payStatus == 2) {
          wx.showToast({
            title: '支付失败',
            image: '/image/i/x.png',
            duration: 2000
          })
        }
        
      }

    }, app, 'post')
  },

  back(){
    wx.navigateBack({
      delta:2
    })
  }

})