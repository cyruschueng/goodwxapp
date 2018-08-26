var createQrCode = require('./wxqrcode.js')
var app = getApp()
Page({

  data: {
    billsLogId:0,
    MiniDetail:{},
    allmoney:0,
    orderStatus:0,
    src:'',
    shopId: '',
    bizId: '',
    memberId: 0,
    thirdSession:''
  },

onShow:function(){
  
},

  onLoad: function (options){
    wx.setNavigationBarTitle({
      title: '订单详情'
    });


    this.setData({
      billsLogId: options.id,
      billmoney: options.billmoney
    })

    this.getMiniDetail()

    
    
  },

  //获取订单详情
  getMiniDetail:function(){
    var that = this;
    var subdata = {  };



    app.commonAjax('/shop/manage/order/details', [], { billsLogId: this.data.billsLogId}, (res) => {

      if (res.data.code == 0) {
        that.setData({
          MiniDetail: res.data.data
        })

        that.money()
      } else {
        wx.showToast({
          title: '订单号有误！',
          icon: 'loading',
          image: '/image/i/x.png',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 3000)
          }
        })



      }

    }, app, 'get')


    
  },

  //计算总价
  money:function(){
    var m = 0;
    for (var i  in this.data.MiniDetail){
      m += (this.data.MiniDetail[i].menuPrice * this.data.MiniDetail[i].totalCount);
    }
    m = m.toFixed(2)
    this.setData({
      allmoney: m
    });
  }



})