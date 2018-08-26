// pages/personalCenter/personalSetting/shippingAddress/shippingAddress.js
var app = getApp();
var baseUrl = app.globalData.baseUrl;
var imgUrl = app.globalData.imgUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressListInfo:[],
    customer_id:0,
    defaultAddress:'',
    product_infos:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.product_infos){
      this.setData({
        product_infos: options.product_infos
      })
    }
  },
  // 获取地址列表数据
  getAddressList(url){
    var that = this
    wx.request({
      url: url,
      success(res){
        console.log(res)
        if(res.data.success){
          var result = res.data.result;
          for (var i = 0; i < result.length;i++){
            
            if (result[i].is_default==1){
              that.setData({
                defaultAddress: result[i].address_id
              })
              wx.setStorage({
                key: 'defaultAddress',
                data: that.data.defaultAddress,
              })
            }
            if (result[i].detailed_address.length>7){
              result[i].detailed_address=result[i].detailed_address.substr(0,7)+"..."
            }
          }
          that.setData({
            addressListInfo: result
          })
        }
      }
    })
  },
  // 编辑地址页面
  goEditShippingAddress(e){
    console.log(e)
    wx.navigateTo({
      url: './editShippingAddress/editShippingAddress?address_id=' + e.currentTarget.dataset.address_id + '&is_default=' + e.currentTarget.dataset.is_default,
    })
  },
  // 新增地址页面
  goAddShippingAddress(e){
    wx.navigateTo({
      url: './addShippingAddress/addShippingAddress'
    })
  },
  // 选中地址
  selectAddress(e){
    var address_id = e.currentTarget.dataset.address_id;
    this.setData({
      defaultAddress: address_id
    })
    wx.setStorage({
      key: 'defaultAddress',
      data: this.data.defaultAddress,
    })
    wx.navigateBack({
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onShow();
      }
    })
  //  wx.navigateTo({
  //    url: '../../../submitOrder/submitOrder'
  //  })
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
    var that=this;
    wx.getStorage({
      key: 'customer_id',
      success: function(res) {
        that.setData({
          customer_id:res.data
        })
        var url = baseUrl + '/api/address/load-list?customer_id=' + that.data.customer_id;
        that.getAddressList(url);
      },
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