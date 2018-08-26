
var app = getApp()
Page({

  data: {
    billsLogId:0,
    MiniDetail:[],
    allmoney:0,
    orderStatus:0,
    src:'',
    shopId: '',
    bizId: '',
    memberId: 0,
    deskId:'',
    deskNo:'',
    thirdSession:''
  },

onShow:function(){
  
},

  onLoad: function (options){
    wx.setNavigationBarTitle({
      title: '订单详情'
    });

    console.log(options)

    this.setData({
      billsLogId: options.id,
      deskNo: options.deskNo,
      deskId: options.deskId
    })

    this.getMiniDetail()

    
    
  },

//确认下单
sub(){
 
  app.commonAjax('/shop/manage/order/submit', ['shopId'], { orderId: this.data.billsLogId, deskId: this.data.deskId }, (res) => {

    if (res.data.code == 0) {

      // wx.navigateBack({
      //   delta: 1
      // })
      wx.redirectTo({ url: "/page/verifymenu/index?deskTypeId=" + this.data.deskId + "&deskNo=" + this.data.deskNo })

      // wx.redirectTo({
      //   url: '/page/menuList/index?id=' + this.data.billsLogId + '&deskid=' + this.data.deskId
      // })

      
    } else {
      wx.showToast({
        title: res.data.message,
        image: '/image/i/x.png',
        duration: 2000,
        success: function () {
          
        }
      })

    }

  }, app, 'post')
},


  //获取订单详情
  getMiniDetail:function(){
    var that = this;
    var subdata = {  };



    app.commonAjax('/shop/manage/order/preview', ['shopId'], { orderId: this.data.billsLogId}, (res) => {

      if (res.data.code == 0) {
        that.setData({
          MiniDetail: res.data.data
        })

        that.money()
      } else {

        that.setData({
          MiniDetail: null
        })

        wx.showToast({
          title: res.data.message,
          image: '/image/i/x.png',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              // wx.navigateBack({
              //   delta: 1
              // })
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
      m += (this.data.MiniDetail[i].price * this.data.MiniDetail[i].weight);
    }
    m = m.toFixed(2)
    this.setData({
      allmoney: m
    });
  }



})