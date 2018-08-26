// pages/wl.js
var app=getApp();
var that;
Page({
  data:{
    order:{},
    msg:[]
  },
  onLoad:function(options){
    that=this;
    // 页面初始化 options为页面跳转所带来的参数
    var id=options.id;
    wx.request({
      url: app.globalData.IP+"wx/wlmsg.do",
      data: {id:id},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        var temp={ordernumber:res.data.ordernumber,wlnumber:res.data.wlnumber,company:res.data.wlc.name,image:res.data.ops[0].product.image};
        temp.image=app.globalData.IP+"controller/"+temp.image;
        
        that.setData({
          order:temp,
          msg:res.data.wl
        })
      },
    })
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
  }
})