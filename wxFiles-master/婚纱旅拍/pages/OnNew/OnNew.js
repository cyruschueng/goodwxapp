// pages/OnNew/OnNew.js
var app=getApp();
var imageUtil = require('./util.js');  
Page({
  data:{
    productlist:[],
    pid:[],
    heads:[]
  },
  onLoad:function(options){
    var that=this;
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
      url: app.globalData.IP+"wx/productnew.do",
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
         for(var i=0;i<res.data.length;i++)
           {
             var item={image:'',name:'',price:'',sales:'',id:res.data[i].id};
             item.image=app.globalData.IP+'controller/'+res.data[i].image;
             item.name=res.data[i].name;
             item.price=res.data[i].price;
             item.sales=res.data[i].sales;
             that.data.pid.push(res.data[i].id);
            that.data.productlist= that.data.productlist.concat(item);
           }
           that.setData({
             productlist:that.data.productlist
           });
                wx.request({
                url: app.globalData.IP+"wx/getheads.do",
                data: {id:app.globalData.UID},
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                success: function(res){
                  // success
                  if(res.data.length>4)
                  {
                     for(var i=0;i<4;i++)
                  {
                    that.data.heads.push(res.data[i].head);
                  }
                  }else{
                  for(var i=0;i<res.data.length;i++)
                  {
                    that.data.heads.push(res.data[i].head);
                  }

                  }

                  that.setData({
                    heads:that.data.heads
                  })
                  console.log(that.data.heads);
                },
              })
      },
    })
  },
  detail:function(e){
    var that=this;
    var p=that.data.productlist[e.currentTarget.id];
    wx.navigateTo({
      url: '/pages/CommodityDetails/CommodityDetails?id='+p.id+"&name="+p.name+"&price="+p.price+"&image="+p.image+"&sales="+p.sales,
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
  },
  imageload:function(e){
     var imageSize = imageUtil.imageUtil(e)  
    this.setData({  
      imagewidth: imageSize.imageWidth,  
      imageheight: imageSize.imageHeight  
    })  
  }
})