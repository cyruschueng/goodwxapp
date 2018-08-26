
var app = getApp();
Page({

  data: {
    hz:true, //控制点击频率
    num: 1 ,//购买代金券的数量
    totalMoney:'', //代金券总价
    unitPrice:'' //代金券单价
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '购买代金券'
    })
    this.setData({
      couponId: options.Id,
    })
    this.voucherShow();
  },

  showAlert(content) {
    var timer;
    clearTimeout(timer)
    this.setData({
      alert: {
        show: true,
        type: 'error',
        title: content
      }
    })
    timer = setTimeout(() => {
      this.setData({
        alert: {
          show: false
        }
      }, )
    }, 2000)
  },

  onShow: function () {
    
  },
  
  voucherShow() {
    var subData = {};
    subData.couponId = this.data.couponId;
    app.commonAjax('/miniapp/cat/couponInfo/getCouponById', ['shopId'], subData, (res) => {
      var verifyList = res.data.data;
      this.setData({
        verifyList: verifyList,
        totalMoney:verifyList.price,//代金券总金额
        unitPrice:verifyList.price//一张代金券总金额
      });
    }, app.globalData, 'get')
  },


  pay_money(){

    if (this.data.hz){
      this.setData({
        hz:false
      })
      setTimeout(()=>{
        this.setData({
          hz: true
        })
      },1000)
      var subdata = {}
      subdata.couponId = this.data.couponId
      subdata.quantity = this.data.num

      app.commonAjax('/miniapp/cat/couponInfo/buyMoneyCoupon', ['memberId'], subdata, (res) => {

        if (res.data.code == 0) {
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
                  url: '/page/paySuccess/index?payId=' + res_out.data.id + '&MoneyCoupon=true' + '&type=1'
                })
              },
              'fail': (res) => {
                wx.redirectTo({
                  url: '/page/orderManagement/vouchersManagement/index',
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
          this.showAlert(res.data.message)
          // wx.showToast({
          //   title: res.data.message,
          //   image: '/image/i/error.png',
          //   duration: 2000
          // })
        }

      }, app.globalData, 'post')
    }

    
  },

  // 点击加号事件
  add() {
    var num = this.data.num;
    num++;
    this.setData({
      num: num
    });
    this.totalMoney();
  },
  // 点击减号事件
  minus() {
    var num = this.data.num;
    if(num>1){
      num--;
      this.setData({
        num:num
      });
      this.totalMoney();
    }else{
      wx.showToast({
        title: '至少选择一张',
        image: '/image/i/x.png',
        duration: 2000
      })
      return false;
    }
  },
  // 总金额
  totalMoney(){
    var totalMoney=null;//总金额
    var unitPrice = this.data.unitPrice;//单价金额
    var num=this.data.num//代金券数量
    totalMoney = num * unitPrice
    //console.log(totalMoney);
    this.setData({
      totalMoney: totalMoney
    });
  }

})