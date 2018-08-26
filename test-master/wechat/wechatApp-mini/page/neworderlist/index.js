var app = getApp()
Page({


  data: {
    num:'',
    check:[],
    showcheck:false,  //选择代金券
    showcheck_2:false, //选择优惠券
    activeitems:'',
    check_cashCouponList: [],//选择的代金券列表
    check_couponList:[],//选择的优惠券列表
    cashCouponList_text: '点击选择代金券',//代金券显示的文字
    CouponList_text:'点击选择优惠券',//优惠券显示的文字
    items: []
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


  onLoad: function (options) {
    this.setData({
      deskId: options.deskId,
      orderMemberId: options.orderMemberId ? options.orderMemberId : '',
      paytoo: options.paytoo ? options.paytoo : ''
    })

    if (this.data.paytoo) {
      this.queryOrderDetail()
    } else {
      this.getOrderMenus()
    }

    

    wx.setNavigationBarTitle({
      title: '订单详情',
    })
    
  },


  onShow: function () {

    

  },

  gohome() {
    wx.switchTab({
      url: '/page/index/index',
    })
  },

  //显示代金券
  showcheck_btn() {
    // this.setData({
    //   showcheck: !this.data.showcheck
    // })
    this.check_cashCouponList()
  },
  showcheck(){
    // this.check_cashCouponList()
    this.setData({
      showcheck: !this.data.showcheck
    })
    
  },

  //显示优惠券
  showcheck_2_btn () {
    // this.setData({
    //   showcheck_2: !this.data.showcheck_2
    // })
    this.check_CouponList()
  },
  showcheck_2() {
    
    this.setData({
      showcheck_2: !this.data.showcheck_2
    })
    // this.check_CouponList()
    
  },

  //获取已经选好的订单详细
  

  //再次支付
  pay_too(){
    var subdata = {};

    subdata.id = this.data.orderMemberId;

    app.commonAjax('/miniapp/cat/orderFood/payOrder', [], subdata, (res) => {
      var that = this

      if (res.data.code == 0) {

        var res_out = res.data

        if (res_out.data.actualMoney == 0) {
          wx.redirectTo({
            url: '/page/paySuccess/index?payId=' + res_out.data.payId,
          })
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
              app.commonAjax('/miniapp/cat/orderFood/printOrder', ['shopId'], { 'deskId': that.data.deskId, 'billsLogId': that.data.totalOrder.id }, (res) => {

              }, app.globalData, 'post')
              wx.redirectTo({
                url: '/page/paySuccess/index?payId=' + res_out.data.payId,
              })
            },
            'fail': (res) => {
              
              wx.showToast({
                title: '未支付！',
                image: '/image/i/x.png',
                duration: 2000
              })
              
            }
          })
        }


      } else {
        this.showAlert(res.data.message)
      }

    }, app.globalData, 'post')
  },

  //切换显示优惠券代金券
  radioChange(e){
    // if (e.detail.value == this.data.activeitems){
    //   this.data.items.forEach((item,index)=>{
    //     console.log(item)
    //     item.check = false
    //   })
    // }
    console.log(e)
    this.setData({
      activeitems: e.detail.value
    })
    this.allMoney()
  },

  //再次获取数据
  queryOrderDetail(){
    app.commonAjax('/miniapp/cat/orderFood/queryOrderDetail', [], { id: this.data.orderMemberId }, (res) => {

      var resData = res.data.data

      this.setData({
        items: []
      })

      if (res.data.code == 0) {

        this.setData({
          items: this.data.items,
          orderMenuList: resData.orderMenuList,
          totalOrder: resData.totalOrder,
          orderShopList: resData.orderShopList,
          couponList: resData.couponList,
          cashCouponList: resData.cashCouponList,
          allMoney: resData.totalOrder.actualMoney
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

  // 获取订单详细
  getOrderMenus() {

    app.commonAjax('/miniapp/cat/orderFood/settleOrder', [], { deskId: this.data.deskId }, (res) => {

      var resData = res.data.data

      this.setData({
        items:[]
      })

      if (res.data.code == 0) {

        if (resData.couponList.length > 0) {
          this.data.items.push({ name: 'couponList', value: '优惠券' })
        }
        if (resData.cashCouponList.length > 0) {
          this.data.items.push({ name: 'cashCouponList', value: '代金券' })
        }


        resData.couponList.forEach((item,index)=>{
          item.check = false
        })

        resData.cashCouponList.forEach((item, index) => {
          item.check = false
        })


        this.setData({
          items: this.data.items,
          orderMenuList: resData.orderMenuList,
          totalOrder: resData.totalOrder,
          orderShopList: resData.orderShopList,
          couponList: resData.couponList,
          cashCouponList: resData.cashCouponList,
          allMoney: resData.totalOrder.actualMoney,
          activeitems: '',
          check_cashCouponList: [],
          check_couponList: [],
          cashCouponList_text: '点击选择代金券',
          CouponList_text: '点击选择优惠券',
        })

        

      }else{
        wx.showToast({
          title: res.data.message,
          image: '/image/i/x.png',
          duration: 2000
        })
      }

    }, app.globalData, 'post')
  },

  //支付
  pay(){

    var subdata = {}
    subdata.deskId = this.data.deskId 
    var couponIdList = [] //提交的券的列表

    //选择的是优惠券
    if (this.data.activeitems == 'couponList') {

      this.data.check_couponList.forEach((item,index)=>{
        couponIdList.push(item.id)
        console.log(item.id)
      })

      if (couponIdList.length>0){
        subdata.couponIdList = couponIdList.toString()
      }
      this.okpay(subdata)
      
    //选择的是代金券
    } else if (this.data.activeitems == 'cashCouponList') {  
      
      this.data.check_cashCouponList.forEach((item, index) => {
        couponIdList.push(item.id)
        console.log(item.id)
      })
      if (couponIdList.length > 0) {
        subdata.couponIdList = couponIdList.toString()
      }
      this.okpay(subdata)

    //不选优惠券和代金券
    }else{ 

      this.okpay(subdata)

    }

  },

  //确定支付
  okpay(subdata){
    app.commonAjax('/miniapp/cat/orderFood/finishOrder', ['appid','openid'], subdata, (res) => {
      let that = this

      if (res.data.code == 0) {

        var res_out = res.data

        if (res_out.data.actualMoney == 0) {
          wx.redirectTo({
            url: '/page/paySuccess/index?payId=' + res_out.data.payId,
          })
        }else if (res.data.data.payInfo){
          var pay_data = JSON.parse(res.data.data.payInfo);

          console.log(pay_data)
          wx.requestPayment({
            'timeStamp': pay_data.timeStamp,
            'nonceStr': pay_data.nonceStr,
            'package': pay_data.package,
            'signType': pay_data.signType,
            'paySign': pay_data.paySign,
            'success': (res) => {
              app.commonAjax('/miniapp/cat/orderFood/printOrder', ['shopId'], { 'deskId': that.data.deskId, 'billsLogId': that.data.totalOrder.id}, (res) => {

              }, app.globalData, 'post')
              wx.redirectTo({
                url: '/page/paySuccess/index?payId=' + res_out.data.payId,
              })
            },
            'fail': (res) => {
              wx.redirectTo({
                url: '/page/orderManagement/dineManagement/index'
              })
              wx.showToast({
                title: '未支付！',
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
        //   image: '/image/i/x.png',
        //   duration: 2000
        // })
      }

    }, app.globalData, 'post')
  },

  //选择代金券
  check(e){
    var index = e.currentTarget.dataset.index

    this.data.cashCouponList[index].check = !this.data.cashCouponList[index].check

    this.setData({
      cashCouponList: this.data.cashCouponList
    })

    // if (this.data.check.length<=1){
    //   this.data.check.push(e.target.dataset.id)

    //   this.setData({
    //     check:this.data.check
    //   })
    // }else{
    //   wx.showToast({
    //     title: '只能同时用两张',
    //     image: '/image/i/x.png',
    //     duration: 2000,
    //   })
    // }
  },

  //确定代金券
  check_cashCouponList() {
    var couponMoney = 0;
    var check_cashCouponList = []
    this.data.cashCouponList.forEach((item, index) => {
      if (item.check == true) {
        check_cashCouponList.push(item)
        couponMoney += item.couponMoney
      }
    })

    if (couponMoney > 0) {
      this.setData({
        check_cashCouponList: check_cashCouponList,
        cashCouponList_text: '已选择' + check_cashCouponList.length + '张代金券，共减去' + couponMoney + '元！',
        cashCouponListCouponMoney: couponMoney
      })
    } else {
      this.setData({
        check_cashCouponList: check_cashCouponList,
        cashCouponList_text: '点击选择代金券',
        cashCouponListCouponMoney: 0
      })
    }

    // this.showcheck()
    this.setData({
      showcheck: false
    })
    this.allMoney()
  },


  //选择优惠券
  check_2(e){
    var index = e.currentTarget.dataset.index

    if (this.data.couponList[index].check == true){
      this.data.couponList[index].check = false
    }else{
      this.data.couponList.forEach((item, index) => {
        item.check = false
      })

      this.data.couponList[index].check = !this.data.couponList[index].check
    }

    

    this.setData({
      couponList: this.data.couponList
    })
    
  },

  //确定优惠券
  check_CouponList(){

    var couponMoney = 0;
    var check_couponList = []
    this.data.couponList.forEach((item, index) => {
      if (item.check == true) {
        check_couponList.push(item)
        couponMoney += item.couponMoney
      }
    })

    if (couponMoney > 0) {
      this.setData({
        check_couponList: check_couponList,
        CouponList_text: '已选择' + check_couponList.length + '张优惠券，共减去' + couponMoney + '元！',
        CouponListCouponMoney: couponMoney
      })
    } else {
      this.setData({
        check_couponList: check_couponList,
        CouponList_text: '点击选择优惠券',
        CouponListCouponMoney: 0
      })
    }

    this.setData({
      showcheck_2: false
    })

    // this.showcheck_2()
    this.allMoney()

  },

  //计算总价
  allMoney(){

    console.log(this.data.activeitems)
    
    var allMoney = this.data.totalOrder.actualMoney; //现有总价
    
    //选择的是优惠券
    if (this.data.activeitems == 'couponList'){
      // this.check_CouponList()
      if (this.data.CouponListCouponMoney >=0){
        this.setData({
          allMoney: (allMoney - this.data.CouponListCouponMoney) <= 0 ? 0 : (allMoney - this.data.CouponListCouponMoney)
        })
      } else {
        this.setData({
          allMoney: allMoney
        })
      }
      
    }else if (this.data.activeitems == 'cashCouponList') {  //选择的是代金券
      // this.check_cashCouponList()
      if (this.data.cashCouponListCouponMoney >= 0){


        this.setData({
          allMoney: (allMoney - this.data.cashCouponListCouponMoney) <= 0 ? 0 : (allMoney - this.data.cashCouponListCouponMoney)
        })
      } else {
        this.setData({
          allMoney: allMoney
        })
      }
      
    }else{
      this.setData({
        allMoney: allMoney
      })
    }
  }


  
})