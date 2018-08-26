var app = getApp()
Page({
  data: {
    storeNane: '',
    buymenu: {},
    price: 0,
    thirdSession: '',
    num: '',
    sumprice: 0,
    all: 0,
    array: ['立即送出(大约10：30送达)'],
    array2: ['微信支付'],
    array3: ['无可用优惠券'],
    index: 0,
    address: 0,
    addressId: '',//地址id
    addList:{},
    remark:'',
    nowtime: '', // 现在时间
    time:'', //送达时间
    moreData: [
      {
        id: 1,
        name: '就餐人数',
        price: 3,
        totalPrice: 0,
        num: 0
      },
      {
        id: 2,
        name: '纸巾',
        price: 4,
        totalPrice: 0,
        num: 0
      },
      {
        id: 3,
        name: '盒饭',
        price: 5,
        totalPrice: 0,
        num: 0
      },
      {
        id: 4,
        name: '海带小吃',
        price: 6,
        totalPrice: 0,
        num: 0
      }
    ],
    list: {}
  },

  onShow:function(){

    // wx.getStorageSync('takeoutData')



    var newdate = new Date()

    console.log(newdate.getHours() + ':' + newdate.getMinutes())

    this.setData({
      takeoutData: wx.getStorageSync('takeoutData'),
      nowtime: newdate.getHours() + ':0' + newdate.getMinutes()
    })

    var activeAddressId = wx.getStorageSync('activeAddressId')

    console.log(activeAddressId)

    if (activeAddressId){
      this.setData({
        activeAddressId: activeAddressId
      })
      this.getAddress()
    }

    wx.removeStorageSync('activeAddressId')

    // this.getadd()
  },

  //  选择时间
  bindTimeChange(val) {
    this.setData({
      time: val.detail.value
    })
  },

  //根据id获取地址
  getAddress(){
    app.commonAjax('/miniapp/cat/takeout/getAddress', ['memberId'], { id: this.data.activeAddressId }, (res) => {
      if (res.data.code === 0) {

        this.setData({
          addList: res.data.data,
          addressId: res.data.data.id
        })

      }
    }, app.globalData, 'post')
  },

  onLoad: function (options) {

    this.setData({
      orderId: options.orderId
    })

    this.getOrderInfo()
    this.getadd()

    setTimeout(()=>{
      
    },1000)
    

    

    wx.setNavigationBarTitle({
      title: '购买详情'
    });

  },

  getOrderInfo(){
    app.commonAjax('/miniapp/cat/takeout/getOrderInfo', ['bizId', 'shopId', 'memberId'], { takeOutId: this.data.orderId},  (res)=> {
      if (res.data.code === 0) {

        this.setData({
          resdata:res.data.data,
          orderMenuList: res.data.data.orderMenuList
        })

        var num = 0
        this.data.orderMenuList.forEach(item => {
          console.log(item.weight)
          num += item.weight
        })

        // console.log(this.data.takeoutData.lunchBoxMoney)

        this.setData({
          lunchBoxNum : num,
          lunchBoxMoney: this.data.takeoutData.lunchBoxMoney
        })

        // lunchBoxMoney: Math.abs((num * this.data.takeoutData.lunchBoxMoney).toFixed(2))
        

      }
    }, app.globalData, 'post')
  },


  bindremark: function (e) {
    this.setData({
      remark: e.detail.value
    })
  },

  //额外消费内容
  //添加
  add: function (e) {

    var that = this;

    var newmoreData = this.data.moreData;

    newmoreData.forEach(function (item, index) {

      if (newmoreData[index].id == e.currentTarget.dataset.id) {

        newmoreData[index].num++

      }

    })

    that.setData({
      moreData: newmoreData
    })
    that.sum()
  },

  //减少
  del: function (e) {

    var that = this;

    var newmoreData = this.data.moreData;

    newmoreData.forEach(function (item, index) {

      if (newmoreData[index].id == e.currentTarget.dataset.id) {

        newmoreData[index].num = newmoreData[index].num <= 1 ? '0' : --newmoreData[index].num

      }

    })

    that.setData({
      moreData: newmoreData
    })

    that.sum()

  },

  //求和
  sum: function () {

    var that = this;

    var newmoreData = this.data.moreData;

    var allsum = 0;

    newmoreData.forEach(function (item, index) {


      newmoreData[index].totalPrice = newmoreData[index].price * newmoreData[index].num

      allsum += newmoreData[index].totalPrice

    })


    var newall = parseInt(this.data.price) + allsum


    newall = newall.toFixed(2)

    that.setData({
      moreData: newmoreData,
      sumprice: allsum,
      all: newall
    })



  },

  //获取默认地址

  getadd: function () {


    var that = this;
    app.commonAjax('/miniapp/cat/takeout/getDefaultAddress', [ 'memberId','shopId'], {},  (res) => {

      if (res.data.data == null) {

        wx.showModal({
          title: '您在本店附近还没有收获地址！',
          content: '是否去添加？',
          success: function (res) {
            if (res.confirm) {

              wx.navigateTo({
                url: '/page/takeaway/submit/addAdd/index'
              })

            } else if (res.cancel) {
            }
          }
        })

      } else {
        that.setData({
          addList: res.data.data,
          activeAddressId: res.data.data.id
        })
      }


    }, app.globalData, 'post')
    
    

  },

  //提交订单
  sub: function () {

    var subdata = {};
    subdata.addressId = this.data.activeAddressId;
    subdata.takeOutId = this.data.orderId;
    subdata.remark = this.data.remark;

    if (!this.data.activeAddressId){
      wx.showToast({
        title: '请选择配送地址！',
        image: '/image/i/x.png',
        duration: 2000
      })
      return
    }else{
      subdata.deliveryDate = this.data.time
    }
    
    console.log(subdata)

    app.commonAjax('/miniapp/cat/takeout/insertPaymentOrder', ['bizId', 'shopId', 'memberId', 'appid', 'openid','shopName'], subdata,  (res) => {
      if (res.data.code === 0) {

        var res_out = res.data

        if (res_out.data.actualMoney == 0) {
          // wx.redirectTo({
          //   url: '/page/paySuccess/index?payId=' + res_out.data.payId,
          // })
        } else if (res.data.data.payInfo) {
          var pay_data = JSON.parse(res.data.data.payInfo);

          console.log(pay_data)
          wx.requestPayment({
            'timeStamp': pay_data.timeStamp,
            'nonceStr': pay_data.nonceStr,
            'package': pay_data.package,
            'signType': pay_data.signType,
            'paySign': pay_data.paySign,
            'success': (res) => {

              app.commonAjax('/miniapp/cat/takeout/paySuccessCallback', [], { takeOutId: this.data.orderId}, (res) => {

              }, app.globalData, 'post')

              wx.redirectTo({
                url: '/page/takeaway/orderDetailed/index?id=' + this.data.orderId
              })
            },
            'fail': (res) => {
              // wx.redirectTo({
              //   url: '/page/orderManagement/dineManagement/index'
              // })
              wx.showToast({
                title: '未支付！',
                image: '/image/i/x.png',
                duration: 2000
              })

            }
          })
        }

        // wx.showToast({
        //   title: '提交成功',
        //   icon: 'success',
        //   duration: 2000,
        //   success: function () {
        //     // wx.navigateTo({
        //     //   url: '/page/takeaway/submit/paySuccess/index'
        //     // })
        //   }
        // })

      } else {
        wx.showToast({
          title: '提交失败',
          icon: 'success',
          duration: 2000
        })
      }
    }, app.globalData, 'post')
  }

})