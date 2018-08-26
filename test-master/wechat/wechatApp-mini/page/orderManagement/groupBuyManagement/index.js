var app = getApp()
Page({

  data: {
    active_tab: "0",//选中的tab状态
    tab: [
      {
        text: '全部',
        num: '0'
      },
      {
        text: '待支付',
        num: '1'
      },
      {
        text: '已购买',
        num: '2'
      },
      {
        text: '已取消',
        num: '3'
      }
    ]
  },


  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '团购券订单',
    })
  },

  onShow: function () {
    this.setData({
      active_tab: "0"
    })
    this.listOrderPack()
  },

  onHide: function () {
  
  },

  change_active_tab(e) {
    this.setData({
      active_tab: e.currentTarget.dataset.index
    })
    this.sx()
  },

  //发起新的支付
  buyGroupPurchase(e) {
    this.pay(2, { packId: e.currentTarget.dataset.packid, quantity: e.currentTarget.dataset.quantity })
  },

  //再支付接口
  buyGroupPurchase_2(e) {
    this.pay(1, { orderId: e.currentTarget.dataset.id })
  },

  //继续支付订单
  payMoneyCouponOrder(e) {
    this.pay(2, { orderId: e.currentTarget.dataset.id })
  },

  //支付
  pay(type, subdata) {

    var url = ''
    if (type == 1) {
      url = '/miniapp/cat/groupPurchase/payGroupPurchaseOrder'
    } else if (type == 2) {
      url = '/miniapp/cat/groupPurchase/buyGroupPurchase'
    }

    app.commonAjax(url, ['memberId'], subdata, (res) => {

      if (res.data.code == 0) {

        // var arr = res.data.data.packnoList.toString()



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


  //取消代金券
  cancelGroupPurchaseOrder(e) {
    var index = e.currentTarget.dataset.index
    app.commonAjax('/miniapp/cat/groupPurchase/cancelGroupPurchaseOrder', [], { orderId: e.currentTarget.dataset.id }, (res) => {

      if (res.data.code == 0) {

        this.data.showlistOrderPack[index].str = '已取消'
        this.data.showlistOrderPack[index].code = '1'

        this.setData({
          showlistOrderPack: this.data.showlistOrderPack
        })

        wx.showToast({
          title: '取消成功',
          icon: 'success',
          duration: 2000,
          success: () => {
            // this.onShow()
          }
        })

      }

    }, app.globalData, 'post')
  },
  //筛选
  sx(){

    var newdata = [];

    if (this.data.active_tab == '0') {

      newdata = this.data.listOrderPack

    } else if (this.data.active_tab == 2) {
      this.data.listOrderPack.forEach((item, index) => {

        if (item.code == 2) {
          newdata.push(item)
        }

      })
    } else if (this.data.active_tab == 3) {

      this.data.listOrderPack.forEach((item, index) => {

        if (item.code == 1) {
          newdata.push(item)
        }

      })
    } else if (this.data.active_tab == 1) {

      this.data.listOrderPack.forEach((item, index) => {

        if ((item.code == 3) || (item.code == 4)) {
          newdata.push(item)
        }

      })

    } 

    this.setData({
      showlistOrderPack: newdata
    })
  },

  //新的订单支付
  topay(e){
    
  },

  //新的订单支付
  topay_2(e) {
    
  },

  //会员订单已验单订单详情
  listOrderPack(){
    app.commonAjax('/miniapp/cat/order/listOrderPack', ['memberId'], {}, (res) => {

      if (res.data.data.length <= 0) {
        this.setData({
          xshowlistOrderPack: true
        })
      }

      res.data.data.forEach((item, index) => {

        if ((item.orderStatus == -1) && (item.payStatus != 1)) {
          item.str = "已取消"
          item.code = 1
        } else if ((item.payStatus == 1)) {
          item.str = "支付成功"
          item.code = 2
        } else if ((item.orderStatus != -1) && (item.payStatus == 2)) {
          item.str = "支付失败"
          item.code = 3
        } else if ((item.payStatus == 0) && (item.orderStatus != -1)) {
          item.str = "待支付"
          item.code = 4
        } else if ((item.payStatus == 3)) {
          item.str = "未确认"
          item.code = 5
        }

      })

      this.setData({
        listOrderPack: res.data.data
      })

      this.sx()

    }, app.globalData, 'get')
  }
})