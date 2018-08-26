var app = getApp()
Page({

  data: {
    catPack:'',
    buyNum: 1,
    allPrice: '',
    catPackMenuList:'',
    imgText:[],
    showImg:false,
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
    this.selectShopByDistance()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  onShow() {
    this.detail()
    // this.toImgtext()
    
  },

  //跳到购买页面
  toSubmitorder(){
    wx.navigateTo({
      url: '/page/groupbuying/submitorder/index?id=' + this.data.id + '&price=' + this.data.catPack.price + '&name=' + this.data.catPack.name ,
    })
  },

  //显示隐藏图文详细
  changeShowImg(){
    this.setData({
      showImg: !this.data.showImg
    })
  },

  //打电话
  phone(){
    wx.makePhoneCall({
      phoneNumber: this.data.selectShopByDistance.linktel
    })
  },

  //获取商家信息
  selectShopByDistance() {

    app.commonAjax('/miniapp/cat/groupPurchase/selectShopByDistance', ['shopId'], { }, (res) => {

      if (res.data.code == 0) {

        this.setData({
          selectShopByDistance: res.data.data[0]
        })

      }

    }, app.globalData, 'post')

    // wx.getLocation({
    //   type: 'wgs84',
    //   success:  (res)=> {

        

    //   }
    // })
  },

  //获取活动详细
  detail(){
    app.commonAjax('/miniapp/cat/groupPurchase/detail', [], { packId: this.data.id}, (res) => {

      if (res.data.code == 0) {

        this.setData({
          catPack: res.data.data.catPack,
          catPackMenuList: res.data.data.catPackMenuList,
          imgText: res.data.data.catpackPictures
        })

        this.sum()

      } else {
        wx.showToast({
          title: res.data.message,
          image: '/image/i/x.png',
          duration: 2000
        })
      }

    }, app.globalData, 'post')
  },


  add() {

    this.setData({
      buyNum: this.data.buyNum + 1
    })
    this.sum()

  },
  minus() {
    var new_buynum = this.data.buyNum - 1
    this.setData({
      buyNum: new_buynum <= 1 ? 1 : new_buynum
    })
    this.sum()
  },

  sum() {
    var newallPrice = this.data.buyNum * this.data.catPack.price;
    this.setData({
      allPrice: newallPrice.toFixed(2)
    })

  },
  submit() {
    app.commonAjax('/miniapp/cat/groupPurchase/buyGroupPurchase', ['memberId'], { packId: this.data.catPack.id, quantity: this.data.buyNum}, (res) => {

      if (res.data.code == 0) {

        var arr = res.data.data.packnoList.toString()

        

        if (res.data.data.payLog.payInfo) {
          var pay_data = JSON.parse(res.data.data.payLog.payInfo);

          wx.requestPayment({
            'timeStamp': pay_data.timeStamp,
            'nonceStr': pay_data.nonceStr,
            'package': pay_data.package,
            'signType': pay_data.signType,
            'paySign': pay_data.paySign,
            'success': (res) => {

              wx.redirectTo({
                url: '/page/groupbuying/subsuccess/index?data=' + arr + '&name=' + this.data.catPack.name + '&type=2',
              })
              
            },
            'fail': (res) => {
              wx.navigateTo({
                url: '/page/orderManagement/groupBuyManagement/index',
              })
              wx.showToast({
                title: '支付失败！',
                image: '/image/i/x.png',
                duration: 2000
              })
            }
          })
        }


      } else {
        wx.showToast({
          title: res.data.message,
          image: '/image/i/x.png',
          duration: 2000
        })
      }

    }, app.globalData, 'post')
  },


  //获取图文详细页面
  toImgtext(){
    app.commonAjax('/miniapp/cat/groupPurchase/graphicDetails', [], { packId: this.data.id }, (res) => {

      if (res.data.code == 0) {

        this.setData({
          imgText:res.data.data
        })

      } else {
        wx.showToast({
          title: res.data.message,
          image: '/image/i/x.png',
          duration: 2000
        })
      }

    }, app.globalData, 'post')
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