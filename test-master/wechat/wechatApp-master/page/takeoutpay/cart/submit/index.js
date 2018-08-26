var app = getApp()
Page({
  data: {
    storeNane:'',
    buymenu:{},
    price:0,
    shopId: '',
    bizId: '',
    memberId: 0,
    thirdSession: '',
    num:0,
    sumprice: 0,
    all: 0,
    deskId:0,
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
  },

  onShow:function(){
    var that = this;

    wx.getStorage({
      key: 'busname',
      success: function (res) {
        that.setData({
          storeNane: res.data
        })

      }
    })

  
  },

  onLoad: function (option){

    this.setData({
      shopId: option.shopId,
      memberId: option.memberId,
      bizId: option.bizId,
      deskId: option.deskId
    })

    console.log(this.data)

    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];


    var that = this;
    wx.setNavigationBarTitle({
      title: '购买详情'
    });
    
    that.setData({
      buymenu: prevPage.data.buymenu,
      price: prevPage.data.price,
      storeNane: prevPage.data.storeNane,
      num: prevPage.data.num,
      all: prevPage.data.price
    });
  },

//提交订单
  sub:function(){

    var subdata = {  }
    var that = this;

    subdata.shopId = this.data.shopId;
    subdata.memberId = this.data.memberId;
    subdata.bizId = this.data.bizId;
    subdata.deskId = this.data.deskId

    app.commonAjax('cat/orderFood/submitOrder', [], subdata, function (res) {


      if (res.data.code === 0) {

        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000,
          success: function () {
            console.log(that.data.all)
            wx.redirectTo({
              url: './paySuccess/index?id=' + res.data.data.orderNo + '&all=' + that.data.all + '&sumprice=' + that.data.sumprice + '&deskId=' + 250
            })
          }
        })

      } else if (res.data.code === -1) {
        wx.showToast({
          title: '提交失败',
          icon: 'success',
          duration: 2000
        })
      }

    },app)

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


})