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
      title: '代金券订单',
    })
  },

  onShow: function () {
    this.setData({
      active_tab:'0'
    })
    this.listOrderCoupon()
  },

  change_active_tab(e) {
    this.setData({
      active_tab: e.currentTarget.dataset.index
    })
    this.sx()
  },


  //筛选
  sx() {

    var newdata = [];

    if (this.data.active_tab == '0') {

      newdata = this.data.listOrderCoupon

    } else if (this.data.active_tab == 2) {
      this.data.listOrderCoupon.forEach((item, index) => {

        if (item.code == 2) {
          newdata.push(item)
        }

      })
    } else if (this.data.active_tab == 3){

      this.data.listOrderCoupon.forEach((item, index) => {

        if (item.code == 1) {
          newdata.push(item)
        }

      })
    } else if (this.data.active_tab == 1) {

      this.data.listOrderCoupon.forEach((item, index) => {

        if ((item.code == 3) || (item.code == 4)) {
          newdata.push(item)
        }

      })
      
    } 

    this.setData({
      showlistOrderCoupon: newdata
    })
  },

  //取消代金券
  cancelMoneyCouponOrder(e){
    var index = e.currentTarget.dataset.index
    var id = e.currentTarget.dataset.id
    app.commonAjax('/miniapp/cat/couponInfo/cancelMoneyCouponOrder', [], { orderCouponId: e.currentTarget.dataset.id}, (res) => {

      if(res.data.code == 0){

        this.data.showlistOrderCoupon[index].str = '已取消'
        this.data.showlistOrderCoupon[index].code = '1'

        this.data.listOrderCoupon.forEach((item, index) => {
          if (item.id == id) {
            item.str = '已取消'
            item.code = '1'
          }
        })
        

        this.setData({
          showlistOrderCoupon: this.data.showlistOrderCoupon
        })

        wx.showToast({
          title: '取消成功',
          icon:'success',
          duration: 2000,
          success: () => {
            // this.onShow()
          }
        })
        
      }

    }, app.globalData, 'post')
  },

  //发起新的支付
  buyGroupPurchase(e) {
    this.pay(2, { couponId: e.currentTarget.dataset.couponid, quantity: e.currentTarget.dataset.quantity })
  },

  //再支付接口
  buyGroupPurchase_2(e){
    this.pay(1, { orderCouponId: e.currentTarget.dataset.id }, e.currentTarget.dataset.index)
  },

  //继续支付代金券订单
  payMoneyCouponOrder(e){
    this.pay(2, { orderCouponId: e.currentTarget.dataset.id }, e.currentTarget.dataset.index)
  },

  //

  //支付
  pay(type,subdata,index){

    

    var  url = ''
    if(type == 1){
      url = '/miniapp/cat/couponInfo/payMoneyCouponOrder'
    }else if(type == 2){
      url = '/miniapp/cat/couponInfo/buyMoneyCoupon'
    }

    var that = this

    app.commonAjax(url, ['memberId'], subdata , (res) => {

      if (res.data.code == 0) {

        // if (res.data.data.payStatus == 0){
        //   this.data.showlistOrderCoupon[index].str = "666"
        //   this.data.showlistOrderCoupon[index].code = "6"

        //   this.setData({
        //     showlistOrderCoupon: this.data.showlistOrderCoupon
        //   })
        // }

        var res_out = res.data

        if (res.data.data.payInfo) {
          var pay_data = JSON.parse(res.data.data.payInfo);

          console.log(pay_data)
          wx.requestPayment({
            'timeStamp': pay_data.timeStamp,
            'nonceStr': pay_data.nonceStr,
            'package': pay_data.package,
            'signType': pay_data.signType,
            'paySign': pay_data.paySign,
            'success': (res) => {
              wx.redirectTo({
                url: '/page/paySuccess/index?payId=' + res_out.data.payId + '&MoneyCoupon=true' + '&type=1'
              })
            },
            'fail': (res) => {


              console.log(res)

              if (res.err_code == '-1'){
                that.pay(2, { orderCouponId: that.data.showlistOrderCoupon[index].id })
              }else{
                wx.redirectTo({
                  url: '/page/orderManagement/vouchersManagement/index',
                })
                wx.showToast({
                  title: '支付失败！',
                  image: '/image/i/x.png',
                  duration: 2000
                })
              }

              
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

  //新的订单支付
  topay_2(e) {
    
  },

  //会员订单已验单订单详情
  listOrderCoupon(){
    app.commonAjax('/miniapp/cat/order/listOrderCoupon', ['memberId'], {}, (res) => {

      if (res.data.data.length <= 0) {
        this.setData({
          xshowlistOrderCoupon: true
        })
      }

      this.setData({
        listOrderCoupon: res.data.data
      })

      this.data.listOrderCoupon.forEach((item, index) => {

        if ((item.orderStatus == -1)&&(item.payStatus != 1)) {
          item.str = "已取消"
          item.code= 1
        } else if ((item.payStatus == 1)){
          item.str = "支付成功"
          item.code = 2
        } else if ((item.orderStatus != -1) && (item.payStatus == 2)){
          item.str = "支付失败"
          item.code = 3
        } else if ((item.payStatus == 0) && (item.orderStatus != -1)){
          item.str = "待支付"
          item.code = 4
        } else if ((item.payStatus == 3)){
          item.str = "未确认"
          item.code = 5
        }

      })



      this.sx()

    }, app.globalData, 'get')
  }
})