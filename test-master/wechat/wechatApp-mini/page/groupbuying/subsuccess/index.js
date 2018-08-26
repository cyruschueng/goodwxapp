var createQrCode = require('../../takeoutpay/cart/submit/wxqrcode.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeJson:'',
    active_index:'',
    code:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: options.name,
      code: options.data.split(',')
    })
  },

  back(){
    wx.navigateBack({
      delta:getCurrentPages().length -1
    })
  },

  change_active_index(e){
    
    if (e.currentTarget.dataset.index == this.data.active_index){
      this.setData({
        active_index: ''
      })
    }else{
      this.setData({
        active_index: e.currentTarget.dataset.index
      })
    }

    
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
    var codeJson={}

    this.data.code.forEach((item,index)=>{
      codeJson[index] = {'str' :item}
      codeJson[index].qrcode = createQrCode.createQrCodeImg((item).toString(), { 'size': 100 });

      this.setData({
        codeJson: codeJson
      })

    })

    
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