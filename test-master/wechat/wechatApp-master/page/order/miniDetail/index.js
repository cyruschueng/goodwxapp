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
  var that = this;
  wx.getStorage({
    key: 'memberId',
    success: function (res) {
      console.log(res.data)
      that.setData({
        memberId: res.data
      })
    },
  })
},

  onLoad: function (options){
    wx.setNavigationBarTitle({
      title: '订单详情'
    });


    this.setData({
      billsLogId: options.id
    })

    var that = this;

    wx.getStorage({
      key: '3rd_session',
      success: function (res) {
        console.log(res.data)
        that.setData({
          thirdSession: res.data
        })
        that.getMiniDetail(options.id)

      },
    })

    
    
  },

  //获取订单详情
  getMiniDetail:function(id){
    var that = this;
    var subdata = {  };
    subdata.billsLogId = id;
    subdata.thirdSession = that.data.thirdSession;
    console.log(subdata)
    wx.request({
      url: 'https://lingju360.natappvip.cc/miniapp/cat/bookMenu/order/miniDetail',
      data: subdata,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      success: function (res) {
        console.log('--------------获取订单详情')
        console.log(res.data)

        if(res.data.code == 0){
          that.setData({
            MiniDetail: res.data.data.omList,
            orderStatus: res.data.data.orderStatus
          })
          var data = createQrCode.createQrCodeImg((res.data.data.orderId).toString(), { 'size': 300 });

          that.setData({
            src: data
          })

          that.money()
        }else{
          wx.showToast({
            title: '订单号有误！',
            icon: 'loading',
            image: '/image/i/x.png',
            duration: 2000,
            success:function(){
              setTimeout(function(){
                wx.navigateBack({
                  delta: 1
                })
              },3000)
            }
          })

          

        }
      }
    })
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
  },

  //取消订单
  orderCancel: function (){
    var that = this;
    var subdata = { billsLogId: 0, memberId: 1 };
    subdata.billsLogId = this.data.billsLogId;
    subdata.memberId = this.data.memberId;
    subdata.thirdSession = that.data.thirdSession;
    console.log(subdata)
    wx.request({
      url: 'https://lingju360.natappvip.cc/miniapp/cat/bookMenu/order/cancel',
      data: subdata,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      success: function (res) {
        console.log('--------------取消订单')
        console.log(res.data)

        if (res.data.code == 0){
          wx.showToast({
            title: '已取消',
            icon: 'success',
            duration: 2000
          })
          wx.navigateBack({
            delta: 1
          })
        }
        

      }
    })
  }

  

})