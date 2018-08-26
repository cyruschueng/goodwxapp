// pages/MyOrder/MyOrder.js
var app = getApp();
Page({
  data:{
    navList:['全部','待付款','待发货','待收货','待评价',],
    NavFlag:0,
    flag0:true,
    flag1:true,
    flag2:true,
    flag3:true,
    flag4:true,
    ListHidden:true,
    //是否有订单
    HaveOrder:true,
    OrderList:[]
  },
  //导航条切换
  NavClick:function(e){
    var that = this;
    var Index = e.currentTarget.id;
    that.setData({
      NavFlag:Index
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    that.data.NavFlag=options.NavFlag;
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
        var that = this;
    this.setData({
      NavFlag:that.data.NavFlag
    })
    wx.request({
      url:app.globalData.IP+"wx/myorder.do",
      data: {id:app.globalData.UID},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        that.data.OrderList=[];
        if(res.data.length>0)
        {
                that.setData({
                  flag0:false
                })
        }
        for(var i=0;i<res.data.length;i++)
        {
          var item={id:res.data[i].id,ordernumber:res.data[i].ordernumber,time:res.data[i].time,total:res.data[i].totalprice,PaymentStatus:0,image:app.globalData.IP+"controller/"+res.data[i].ops[0].product.image,ops:res.data[i].ops,wlnumber:res.data[i].wlnumber,actualpay:res.data[i].actualpay};
          var s=parseInt(res.data[i].paystatus);
          item.PaymentStatus=s;
           that.data.OrderList=that.data.OrderList.concat(item);
        }
     
        that.setData({
         OrderList:that.data.OrderList
        });
        that.init();
      },
    });
  },
  init:function(){
    // 页面显示
    //检测是否有改支付状态的商品
        var that = this;
        var Order = that.data.OrderList;
        if(Order.length >0){
         that.setData({
          flag0:false,
        })
        }
    for(let i = 0; i < Order.length;i++){
      if(Order[i].PaymentStatus == 1){
        console.log("====================")
        that.setData({
          flag1:false,
        })
      }
      if(Order[i].PaymentStatus == 2){
        that.setData({
          flag2:false,
        })
      }
      if(Order[i].PaymentStatus == 3){
        that.setData({
          flag3:false,
        })
      }
       if(Order[i].PaymentStatus == 4){
        that.setData({
          flag4:false,
        })
       }
    }
  },
  //确认收货
  confirm:function(){
   
  },
  //取消订单
 cancel:function(e){
     wx.showModal({
  title: '确定取消订单',
  success: function(res) {
    if (res.confirm) {
        wx.request({
      url: app.globalData.IP+"wx/ordercancel.do",
      data: {id:e.currentTarget.id},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        // success
        wx.navigateTo({
          url: '/pages/MyOrder/MyOrder',
        })
      },
    })
    }
  }
})  
 },
 //评价订单
 OrderEvaluate:function(){
   wx.navigateTo({
     url: '/pages/OrderEvaluate/OrderEvaluate',
   })
 },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  //
  OrderDetails:function(e){
    var that=this;
    var index=e.currentTarget.id;
    var id=that.data.OrderList[index].id;
    wx.navigateTo({
      url: '/pages/OrderDetails/OrderDetails?id='+id
    })
  },
  TiXingFaHuo:function(){
    wx.showToast({
  title: '提醒买家成功',
  icon: 'success',
  duration: 2000
})
  },
    pay:function(e){
    var that=this;
    wx.request({
      url: app.globalData.IP+"wx/pay.do",
      data: {
        id:e.currentTarget.id,
        userid:app.globalData.UID
        } ,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, 
      success: function(res){
        // success
        console.log(res)
        wx.requestPayment({
          timeStamp:res.data.time,
          nonceStr: res.data.nonceStr,
          package:'prepay_id='+res.data.prepay_id,
          signType: 'MD5',
          paySign: res.data.paySign,
          success: function(res){
            // success
            wx.request({
              url: app.globalData.IP+"wx/paysuccess.do",
              data: {id:e.currentTarget.id},
              method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              success: function(res){
                wx.navigateTo({
          url: '/pages/OrderDetails/OrderDetails?id='+e.currentTarget.id,
                             });
                    
              }
            })
          },
          fail: function(res) {
            // fail
            console.log(res)
          },
        })
      },
    })
  },
  sure:function(e){
      var id=e.currentTarget.id;
            wx.showModal({
          title: '是否确认收货',
          success: function(res) {
            if (res.confirm) {
                 wx.request({
        url: app.globalData.IP+"wx/sureorder.do",
        data: {id:id},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        success: function(res){
          // success
           wx.navigateTo({
          url: '/pages/OrderDetails/OrderDetails?id='+id,
                             });
        },
      })
            }
          }
        })
     
  },
  wl:function(e){
    var id=e.currentTarget.id;
    
      wx.navigateTo({
          url: '/pages/wl?id='+id,
                             });
  },

})