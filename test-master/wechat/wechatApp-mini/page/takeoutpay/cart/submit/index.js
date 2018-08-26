var createQrCode = require('./wxqrcode.js')
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

  onShow:function(){
    var that = this;
    that.setData({
      storeName: app.globalData.busname
    })
  },

  onLoad: function (option){
    console.log(option)

    this.setData({
      orderList: option.orderList ? option.orderList : '',
      deskId: option.deskId,
      orderNo: option.orderNo ? option.orderNo : '',
      usenum: option.usenum ? option.usenum : '',
      deskNo: option.deskNo ? option.deskNo : '',
      orderId: option.orderMemberId ? option.orderMemberId :'',
      checkOrder: option.checkOrder ? option.checkOrder : false
    })


    // var data = createQrCode.createQrCodeImg((option.orderMemberId).toString(), { 'size': 300 });

    // this.setData({
    //   src: data
    // })

    this.getOrderMenus()



    // this.setData({
    //   shopId: option.shopId,
    //   memberId: option.memberId,
    //   bizId: option.bizId,
    //   deskId: option.deskId
    // })

    // console.log(this.data)

    // var pages = getCurrentPages();
    // var prevPage = pages[pages.length - 2];


    var that = this;
    wx.setNavigationBarTitle({
      title: '订单详情'
    });
    
    // that.setData({
    //   buymenu: prevPage.data.buymenu,
    //   price: prevPage.data.price,
    //   storeNane: prevPage.data.storeNane,
    //   num: prevPage.data.num,
    //   all: prevPage.data.price
    // });
  },

  tohome() {
    wx.switchTab({
      url: '/page/index/index',
    })
  },

  // 自助验单
  subcheckOrder() {
    app.commonAjax('/miniapp/cat/orderFood/checkOrder', ['shopId'], { 'deskId': this.data.deskId, 'conFlag': 3, orderId: this.data.orderId}, (res) => {
      console.log(res)
      wx.redirectTo({
        url: '/page/neworderlist/index?orderList=' + 'true' + '&deskId=' + this.data.deskId
      })
    }, app.globalData, 'post')
  },

// 获取订单详细

  getOrderMenus(){

    var subdata = {}
    if (!this.data.checkOrder) {
      subdata.deskId = this.data.deskId
    }
    
    app.commonAjax('/miniapp/cat/order/detail', ['bizId', 'memberId', 'shopId'], subdata, (res) => {

      if (res.data.code == 0) {

        this.setData({
          catDesk: res.data.data.catDesk ? res.data.data.catDesk : '',
          orderbuymenu: res.data.data.orderMenus,
          orderMembers: res.data.data.orderMembers[0],
          orderId: res.data.data.orderMembers[0].id
        })


        var data = createQrCode.createQrCodeImg((this.data.orderId).toString(), { 'size': 300 });

        this.setData({
          src: data
        })
        
        this.sum()
      }

    }, app.globalData,  'get')
  },


  //额外消费内容
  //添加
  add: function (e) {

    var e_data = e.currentTarget.dataset

    if (e_data.isneedweigh){
      wx.showToast({
        title: '该菜只能点一份',
        image: '/image/i/x.png',
        duration: 2000
      })
    }else{
      

      var subdata={};


      subdata.menuId = e_data.menuid //菜id
      subdata.orderId = this.data.orderId
      subdata.flavour = e_data.flavour
      subdata.menuSpecId = e_data.menuspecid

      subdata.deskId =this.data.deskId

      subdata.weight = parseInt(e_data.weight) + 1


      app.commonAjax('/miniapp/cat/order/update', ['shopId', 'memberId'], subdata, (res) => {

        if (res.data.code == 0) {


          var that = this;

          var newmoreData = this.data.orderbuymenu;

          newmoreData.forEach(function (item, index) {

            if (newmoreData[index].id == e_data.id) {

              newmoreData[index].weight++

            }

          })

          that.setData({
            orderbuymenu: newmoreData
          })
          that.sum()

        }else{
          wx.showToast({
            title: '操作失败！',
            image: '/image/i/x.png',
            duration: 2000
          })
        }

      },app.globalData,   'post')

    }

    
  },

  //减少
  del: function (e) {

    var subdata = {};

    var e_data = e.currentTarget.dataset

    console.log(e_data)

    subdata.menuId = e_data.menuid //菜id
    subdata.orderId = this.data.orderId
    subdata.flavour = e_data.flavour
    subdata.menuSpecId = e_data.menuspecid

    subdata.weight = parseInt(e_data.weight) - 1
    subdata.deskId = this.data.deskId
    console.log(subdata)

    app.commonAjax('/miniapp/cat/order/update', ['shopId', 'memberId'], subdata, (res) => {

      if (res.data.code == 0) {

        var that = this;

        var newmoreData = this.data.orderbuymenu;

        newmoreData.forEach(function (item, index) {

          if (newmoreData[index].id == e_data.id) {

            newmoreData[index].weight = newmoreData[index].weight <= 1 ? '0' : --newmoreData[index].weight

          }

        })

        that.setData({
          orderbuymenu: newmoreData
        })

        that.sum()

      }else{
        wx.showToast({
          title: '操作失败！',
          image: '/image/i/x.png',
          duration: 2000
        })
      }

    }, app.globalData, 'post')

    

    

  },

//继续点菜
  back(){
    // getCurrentPages()[getCurrentPages().length-2].getList()

    console.log(this.data.orderList)

    if (this.data.orderList){

      wx.redirectTo({
        url: '/page/takeoutpay/index?deskId=' + this.data.deskId,
      })

    }else{
      wx.navigateBack({
        delta: 1
      })
    }

    
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

  cancel_b(){
    var subdata ={};
    subdata.orderId = this.data.orderId
    subdata.deskId = this.data.deskId
    app.commonAjax('/miniapp/cat/order/cancel', ['shopId', 'memberId'], subdata, (res) => {

      if (res.data.code == 0) {
        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 2000,
          success:()=>{
            setTimeout(()=>{
              wx.switchTab({
                url: '/page/index/index',
              })
              // wx.navigateBack({
              //   delta: 1
              // })
            },500)
          }
        })

        

      }else{
        this.showAlert(res.data.message)
        // wx.showToast({
        //   title: res.data.message,
        //   image: '/image/i/x.png',
        //   duration: 2000
        // })
      }

    },app.globalData,  'post')
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

      newnum += parseInt(newmoreData[index].weight)

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




})