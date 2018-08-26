var app = getApp()
Page({

  data: {
    buyNum:1,
    option:'',
    allPrice:'',
  },


  onLoad: function (options) {
    console.log(options)
    this.setData({
      option: options
    })
    this.sum()
  },


  onShow: function () {
  
  },

  onHide: function () {
  
  },
  add(){

    this.setData({
      buyNum: this.data.buyNum+1
    })
    this.sum()

  },
  minus(){
    var new_buynum = this.data.buyNum -1
    this.setData({
      buyNum: new_buynum <= 1 ? 1 : new_buynum
    })
    this.sum()
  },

  sum () {
    var newallPrice = this.data.buyNum * this.data.option.price;
    this.setData({
      allPrice: newallPrice.toFixed(2)
    })

  },
  submit(){
    app.commonAjax('/miniapp/cat/groupPurchase/purchasing', ['shopId', 'bizId', 'openid', 'memberId'], { packId: this.data.option.id, buyNum: this.data.buyNum, totalMoney: this.data.allPrice }, (res) => {

      if (res.data.code == 0) {

        var arr = res.data.data.toString()

        wx.redirectTo({
          url: '/page/groupbuying/subsuccess/index?data=' + arr + '&name=' + this.data.option.name,
        })

      } else {
        wx.showToast({
          title: res.data.message,
          image: '/image/i/x.png',
          duration: 2000
        })
      }

    }, app.globalData, 'post')
  }


})