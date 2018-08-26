var createQrCode = require('../takeoutpay/cart/submit/wxqrcode.js')
var app = getApp()
Page({
  data: {
    storeName:'',
    buymenu:{},
    price:0,
    shopId: '',
    bizId: '',
    memberId: 0,
    src: '',
    thirdSession: '',
    num:0,
    sumprice: 0,
    all: 0,
    deskId:0,
    orderId:'',
    orderNo:'',
    currentOrderId: '',
    flag: '',
    orderbuymenu:[],
    moreData: [
      {
        id: 1,
        name: '就餐人数',
        price: 3,
        totalPrice: 0.00,
        num: 0
      }
    ],
  },

  onShow:function(){
    var that = this;
    that.setData({
      storeName: app.globalData.busname
    })
    this.getOrderMenus()
  },

  onLoad: function (option){
    console.log(option)

    if (option.deskId){
      app.globalData.deskId = option.deskId
    }

    

    this.setData({
      deskcal: option.deskcal,
      currentOrderId: option.currentOrderId,
      flag: option.flag,
      orderNo: option.orderNo,
      orderId: option.orderMemberId,
      deskId: option.deskId
    })


    

    


    var that = this;
    wx.setNavigationBarTitle({
      title: '已点菜品'
    });
    
  },

// 获取订单详细

  getOrderMenus(){
    
    app.commonAjax('/miniapp/cat/order/detail', ['shopId', 'bizId', 'memberId'], { deskId: this.data.deskId}, (res) => {

      if (res.data.code == 0) {


        if (!res.data.data) {

          this.setData({
            ssorderMembers:true
          })

          wx.showToast({
            title: res.data.message,
            image: '/image/i/x.png',
            duration: 2000,
            success:()=>{
              setTimeout(()=>{
                // wx.switchTab({
                //   url: '/page/index/index',
                // })

              },1000)
            }
          })

          
        }else{

          var data = createQrCode.createQrCodeImg((res.data.data.orderMembers[0].id).toString(), { 'size': 300 });

          this.setData({
            src: data,
            orderId: res.data.data.orderMembers[0].id
          })



          this.setData({
            orderbuymenu: res.data.data.orderMenus,
            catDesk: res.data.data.catDesk,
            orderMembers: res.data.data.orderMembers[0]
          })
          this.sum()

        }


        
      }

    }, app.globalData, 'get')
  },


  //取消订单

  cancel() {

    wx.showModal({
      title: '提示',
      content: '确定取消订单？',
      success: (res) => {
        if (res.confirm) {
          this.cancel_b()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  cancel_b() {
    var subdata = {};
    subdata.orderId = this.data.orderId
    subdata.deskId = this.data.deskId
    app.commonAjax('/miniapp/cat/order/cancel', ['shopId', 'memberId'], subdata, (res) => {

      if (res.data.code == 0) {

        // if (getCurrentPages().length>=2){
        //   getCurrentPages()[0].getList()
        // }

        
        

        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 2000,
          success: () => {
            setTimeout(() => {
              this.back()
            }, 500)
          }
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

  //额外消费内容


  back(){
    wx.navigateBack({
      delta: 1
    })
  },

  //求和
  sum: function () {

    var that = this;

    var newmoreData = this.data.orderbuymenu;

    var allsum = 0;

    var newnum = 0;

    newmoreData.forEach(function (item, index) {

      var n = newmoreData[index].price * newmoreData[index].weight

      newmoreData[index].totalPrice = newmoreData[index].price * newmoreData[index].weight
      
      newnum += newmoreData[index].weight

      allsum += newmoreData[index].totalPrice

    })


    var newall = parseInt(this.data.price) + allsum


    newall = newall.toFixed(2)
    allsum = allsum.toFixed(2)

    that.setData({
      orderbuymenu: newmoreData,
      sumprice: allsum,
      all: newall,
      num: newnum
    })



  },

  //支付
  pay() {

    var subdata = {}

    app.commonAjax('/miniapp/cat/orderFood/finishOrder', ['appid'], {deskId : this.data.deskId}, (res) => {

      if (res.data.code == 0) {

        

        var pay_data = JSON.parse(res.data.data.payInfo);

        console.log(pay_data)


        wx.requestPayment({
          'timeStamp': pay_data.timeStamp,
          'nonceStr': pay_data.nonceStr,
          'package': pay_data.package,
          'signType': pay_data.signType,
          'paySign': pay_data.paySign,
          'success': (res) => {
            console.log(res)
          },
          'fail': (res) => {
            console.log(res)
          }
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