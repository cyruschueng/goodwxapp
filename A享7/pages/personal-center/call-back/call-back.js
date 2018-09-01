// pages/index/search/search.js
import Api from '../../../utils/config/api.js';
import { GLOBAL_API_DOMAIN } from '../../../utils/config/config.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _build_url: GLOBAL_API_DOMAIN,
    code: '',
    amount: '',
    pay: '',
    ticketsinfo: [],
    hxData: {},
    price:'',
    okhx:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      code: options.code
    })
    this.gettickets()
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
  gettickets: function () {  //获取票券信息
    let that = this
    wx.request({
      url: this.data._build_url + 'cp/getByCode/' + this.data.code,
      success: function (res) {
        if (res.data.code == 0) {
          let _rele = res.data.data.promotionRules[0].ruleDesc
          let ind1 = _rele.indexOf("满")+1;
          let ind2 = _rele.indexOf("元");
          let _price = _rele.substring(ind1,ind2)
          that.setData({
            ticketsinfo: res.data.data,
            hxData: res.data.data,
            price:_price
          })
        }
      }
    })
  },
  bindinput: function (ev) {  //实时获取金额和计算
    let _value = ev.detail.value
    let _data = this.data.ticketsinfo
    if(_value == '' && _value == undefined && _value == null){
      wx.showToast({
        title: '请输入消费金额',
        icon: 'none',
        duration: 2000
      })
        return false
    }else{
      let _pay = _value * 1 - _data.couponAmount * 1 > 0 ? _value * 1 - _data.couponAmount * 1:''
      if(_pay>0){
        this.setData({
          okhx:true
        })
      }
      this.setData({
        amount: _value,
        pay: _pay
      })
    }
  },
  confirm: function () {  //确认核销
    let that = this;
    let _hxData = this.data.hxData
    if (!this.data.okhx){
      wx.showToast({
        title: '不符合核销条件，请重新输入',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    _hxData.shopAmount = this.data.amount
    let _parms = {
      soId: _hxData.soId,	        //订单id	Long
      shopId: "",	       //商家id	Long
      shopName: "",	   //店铺名称	Date
      shopAmount: _hxData.shopAmount,	   //消费总额	BigDecimal
      couponId: _hxData.id,   //电子券id	Long
      couponCode: _hxData.couponCode,	   //电子券code	String
      skuId: _hxData.skuId,	       //商品id	Long
      couponAmount: _hxData.couponAmount,	//电子券面额	BigDecimal
      userId: _hxData.userId,	//消费人id	Long
      userName: _hxData.userName,  //消费人账号	String
      cashierId: app.globalData.userInfo.userId,	    //收银id	Long
      cashierName: app.globalData.userInfo.userName	    //收银账号	String
    }
    Api.hxadd(_parms).then((res) => {
      if (res.data.code == 0) {
        wx.showToast({
          title: '核销成功',
          icon: 'none',
          duration: 2000
        })
        setTimeout(function () {
          wx.switchTab({
            url: '../personal-center'
          })
        }, 2000)
      }else{
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000
        })
        setTimeout(function () {
          wx.switchTab({
            url: '../personal-center'
          })
        }, 2000)
      }
    })
  }
})