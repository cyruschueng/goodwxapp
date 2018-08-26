// pages/OrderDetails/OrderDetails.js
var app=getApp();
Page({
  data:{
    order:{},
    ops:[],
    opslength:0,
    PageTitle:['待付款','待发货','待收货','待评价',]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    var id=options.id;
    var Index;
    wx.request({
      url: app.globalData.IP+"wx/ordersdetail.do",
      data: {id:id},
      success: function(res){
        // success
        that.data.order={id:res.data.id,addressname:res.data.addressname,addressphone:res.data.phone,addressdetail:res.data.addressdetail,ordernumber:res.data.ordernumber,time:res.data.time,total:res.data.totalprice,status:res.data.paystatus,wlnumber:res.data.wlnumber,updatetime:res.data.updatetime,company:'',actualpay:res.data.actualpay};
        if(res.data.wlc)
        {
          that.data.order.company=res.data.wlc.name;
        }
        for(var i=0;i<res.data.ops.length;i++)
        {
          var item={name:res.data.ops[i].product.name,price:res.data.ops[i].product.price,count:res.data.ops[i].count,image:app.globalData.IP+"controller/"+res.data.ops[i].product.image,Index:i+1,ydrq:res.data.ops[i].ydrq,payfs:res.data.ops[i].payfs};
          that.data.ops=that.data.ops.concat(item);
        }
       that.setData({
         order:that.data.order,
         ops:that.data.ops,
         opslength:res.data.ops.length
       })
     console.log(that.data.order)

var PageTitle = that.data.PageTitle[that.data.order.status];
    console.log(PageTitle,that.data.order.status)
    wx.setNavigationBarTitle({
      title: PageTitle,
      success: function(res) {
        // success
      }
    })
      },
    })

  //修改标题

  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
 OrderEvaluate:function(){
   wx.navigateTo({
     url: '/pages/OrderEvaluate/OrderEvaluate',
   })
 },
  cancel:function(){
    var that=this;
    wx.request({
      url: app.globalData.IP+"wx/ordercancel.do",
      data: {id:that.data.order.id},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        // success
        wx.navigateTo({
          url: '/pages/OrderDetails/OrderDetails?id='+that.data.order.id,
        })
      },
    })
  },
  txfh:function(){
    wx.showToast({
      title:"提醒发货成功",
      duration:2000
    })
  },
  pay:function(e){
    var that=this;
    wx.request({
      url: app.globalData.IP+"wx/pay.do",
      data: {
        id:that.data.order.id,
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
              data: {id:that.data.order.id},
              method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              success: function(res){
                wx.navigateTo({
          url: '/pages/OrderDetails/OrderDetails?id='+that.data.order.id,
                             });
                    
              },
              fail:function(res){
                      console.log(res)
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
   sure:function(){
      var that=this;
            wx.showModal({
          title: '是否确认收货',
          success: function(res) {
            if (res.confirm) {
                 wx.request({
        url: app.globalData.IP+"wx/sureorder.do",
        data: {id:that.data.order.id},
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