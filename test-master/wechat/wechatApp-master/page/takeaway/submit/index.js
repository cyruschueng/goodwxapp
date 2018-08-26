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
    this.getadd()
  },

  onLoad: function () {

    this.getadd()

    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    console.log('页面66666')
    console.log(prevPage)

    wx.getStorage({
      key: 'busname',
      success: function (res) {
        console.log(res.data)
        that.setData({
          storeNane: res.data
        })

      }
    })

    var that = this;
    wx.setNavigationBarTitle({
      title: '购买详情'
    });

    that.setData({
      buymenu: prevPage.data.buymenu,
      price: prevPage.data.price,
      storeNane: prevPage.data.storeNane,
      num: prevPage.data.num,
      all: prevPage.data.price,
    });
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
    // wx.getStorage({
    //   key: 'activeId',
    //   success: function(res) {

    //     if(res.data){

    //       that.setData({
    //         addressId:''
    //       })          

    //     }else{
          
    //     }

    //   },
    // })

    app.commonAjax('cat/address/defaultAddressInfo', ['bizId', 'memberId'], {}, function (res) {

      if (res.data.data == null) {

        wx.showModal({
          title: '您还没有收获地址！',
          content: '是否去添加？',
          success: function (res) {
            if (res.confirm) {

              wx.navigateTo({
                url: '/page/takeaway/submit/addAdd/index'
              })

            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })

      } else {
        that.setData({
          addList: res.data.data,
          addressId: res.data.data.id
        })
      }


    }, app)
    
    

  },

  //提交订单
  sub: function () {

    var subdata = {};
    subdata.addressId = this.data.addressId;
    subdata.remark = this.data.remark;

    app.commonAjax('cat/takeout/submit', ['bizId', 'shopId', 'memberId'], subdata, function (res) {
      if (res.data.code === 0) {

        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000,
          success: function () {
            // wx.navigateTo({
            //   url: '/page/takeaway/submit/paySuccess/index'
            // })
          }
        })

      } else if (res.data.code === -1) {
        wx.showToast({
          title: '提交失败',
          icon: 'success',
          duration: 2000
        })
      }
    }, app)
  }

})