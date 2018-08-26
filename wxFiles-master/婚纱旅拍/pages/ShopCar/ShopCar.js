// pages/ShopCar/ShopCar.js
var app=getApp();
Page({
  data:{
  shopcarlist:[],
  total:0,
  chooseid:'',
  counts:'',
  opid:'',
  addressid:0,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
     var that=this;
    if(that.data.addressid==0)
    {
    that.data.shopcarlist=[];
    wx.request({
      url: app.globalData.IP+"wx/shopcar.do",
      data: {userid:app.globalData.UID},
      method: 'GET',
      success: function(res){
        // success
        for(var i=0;i<res.data.length;i++)
        {
          var temp=res.data[i];
          var item={id:temp.id,image:app.globalData.IP+"controller/"+temp.product.image,name:temp.product.name,price:temp.product.price
          ,count:temp.count,choose:false,productid:res.data[i].productid,ydrq:res.data[i].ydrq,payfs:res.data[i].payfs};
          that.data.shopcarlist=that.data.shopcarlist.concat(item);
        }
        that.setData({
          shopcarlist:that.data.shopcarlist,
          total:0
        })
      },
    })
    }
  },
  pay:function(){
    var that=this;
    that.data.chooseid='';
    that.data.counts='';
    that.data.opid='';
       for(var i=0;i<that.data.shopcarlist.length;i++)
       {
         var temp=that.data.shopcarlist[i];
         if(temp.choose)
         {
           that.data.chooseid+=temp.productid+",";
           that.data.counts+=temp.count+",";
           that.data.opid+=temp.id+",";
         }
       }
      if(that.data.chooseid=='')
      {
        console.log(that.data)
wx.showModal({
  title: '提示',
  content: '请选择商品',
  showCancel:false,
  success: function(res) {
    if (res.confirm) {
      console.log('用户点击确定')
    }
  }
})
      }else if(that.data.addressid==0){
               wx.navigateTo({
                  url: '/pages/Address/Address?type=2',
                 })
      }
      else{
        //请求生成订单
        wx.request({
          url: app.globalData.IP+"wx/shopcartoorder.do",
          data: {
            chooseid:that.data.chooseid,
            counts:that.data.counts,
            userid:app.globalData.UID,
            total:that.data.total,
            addressid:that.data.addressid,
            opid:that.data.opid
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          success: function(res){
            console.log(that.data.chooseid)
              if(res.data==0)
              {
                     
              }else
              {
                   var id=res.data;
                   that.data.addressid=0;
                   wx.navigateTo({
                          url: '/pages/OrderDetails/OrderDetails?id='+id
                        })
              }
          },
        })
      }
  },
//选择商品或者取消
  choose:function(e){
        var index=e.currentTarget.id;
        var that=this;
        that.data.shopcarlist[index].choose=!that.data.shopcarlist[index].choose;
        that.jisuan();
  },
  //计算总价格
  jisuan:function(){
      var that=this;
       var all=0;
        for(var i=0;i<that.data.shopcarlist.length;i++)
        {
             if(that.data.shopcarlist[i].choose)
               {
               var dj=(that.data.shopcarlist[i].price-((that.data.shopcarlist[i].count-1)*app.globalData.pt)*that.data.shopcarlist[i].price)*that.data.shopcarlist[i].count;
               if(that.data.shopcarlist[i].payfs=='全款')
                all+=dj;
                else
                all+=1000;
               }

                 all=parseInt(all);
        }
        that.setData({
          total:all,
          shopcarlist:that.data.shopcarlist
        });
  },
  //增加
  add:function(e)
  {
      var that=this;
      var id=e.currentTarget.id;
       if(that.data.shopcarlist[id].choose)
     {
       that.data.shopcarlist[id].count+=1;
       that.jisuan();
     }
  },
  //减少
  reduce:function(e){
     var that=this;
     var id=e.currentTarget.id;
     if(that.data.shopcarlist[id].count>1&&that.data.shopcarlist[id].choose)
     {
       that.data.shopcarlist[id].count-=1;
       that.jisuan();
     }
  }
})