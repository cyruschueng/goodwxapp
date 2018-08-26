//index.js
//获取应用实例
var app = getApp()
Page({
  onLoad:function(){
      var that=this;
    app.getUserInfo();
         //设置商品数据
    
      //加载广告位
      wx.request({
      url: app.globalData.IP+"wx/config.do",
      method: 'GET', 
      success: function(res){
        // success
      app.globalData.slider=app.globalData.slider.concat(app.globalData.IP+"controller/"+res.data.image1);
       app.globalData.slider=app.globalData.slider.concat(app.globalData.IP+"controller/"+res.data.image2);
       app.globalData.slider=app.globalData.slider.concat(app.globalData.IP+"controller/"+res.data.image3);
        app.globalData.kplb=app.globalData.kplb.concat(app.globalData.IP+"controller/"+res.data.image4);
         app.globalData.kplb=app.globalData.kplb.concat(app.globalData.IP+"controller/"+res.data.image5);
          app.globalData.kplb=app.globalData.kplb.concat(app.globalData.IP+"controller/"+res.data.image6);
           app.globalData.kplb=app.globalData.kplb.concat(app.globalData.IP+"controller/"+res.data.image7);
              that.setData({
                slider:app.globalData.slider,
                kplb:app.globalData.kplb
              });
              app.globalData.pt=res.data.pt;
      },
     
    });
   
  },
  //点击分类搜索出相应的商品
  classclick:function(e){
           var index=e.currentTarget.id;
           var that=this;
           wx.request({
             url: app.globalData.IP+"wx/findproductbycid.do",
             data: {id:that.data.classeslist[index].id},
             method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
             success: function(res){
               that.data.productlist=[];
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
           })
             },
           })
  },
  onShow:function(){
    this.update();
  },
  update:function(){
       var that = this;
    that.setData({
      productlist:[],
      topiclist:[],
      classeslist:[]
    })
     var NavFlag = wx.getStorageSync('NavFlag');
     if(NavFlag){
          that.setData({
            NavFlag:NavFlag
          })
     }
     wx.removeStorageSync('NavFlag');
      wx.request({
       url: app.globalData.IP+"wx/productlist.do",
       data: {},
       method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
       success: function(res){
              that.data.productlist=[];
           for(var i=0;i<res.data.length;i++)
           {
             console.log("productlist"+res.data.length)
             console.log(res.data);
             console.log(i)
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
           })
       },
     });
     //设置客片数据
      wx.request({
        url:app.globalData.IP+"wx/topiclist.do",
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
              that.data.tid=[];
              that.data.topiclist=[];
            for(var i=0;i<res.data.length;i++)
            {
               that.data.tid.push(res.data[i].id);
                var item={url:'',id:'',name:''};
                item.url=app.globalData.IP+"controller/"+res.data[i].image;
                item.id=res.data[i].id;
                item.name=res.data[i].name;
                that.data.topiclist=that.data.topiclist.concat(item);
            }

            that.setData({
              topiclist:that.data.topiclist
            })
        },
      });
      //加载分类
      wx.request({
        url: app.globalData.IP+"wx/classeslist.do",
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        success: function(res){
          // success
            that.data.classeslist=[];
          for(var i=0;i<res.data.length;i++)
          {
            var item={id:res.data[i].id,image:app.globalData.IP+"controller/"+res.data[i].image,name:res.data[i].name};
            that.data.classeslist=that.data.classeslist.concat(item);
          }
          var hi=parseInt(res.data.length/4)+1;
          if(res.data.length%4==0)
          hi=hi-1;
          var height=hi*150;
          that.setData({
            classeslist:that.data.classeslist,
            classeslength:res.data.length,
            classesheight:height+"rpx"
          })
        },
      });
  },
   onUnload:function(){
    // 页面关闭

  },
  onHide:function(){
    console.log("hide")
  },
  data: {
    tsurl:'',
    tstext:'',
    modal:false,
    ScrollTop:0,
    BackFlag:false,
    NavFlag:1,
      swiperCurrent:0,
      slider: [],
    classeslist:[],
    productlist:[], 
    topiclist:[],
    pid:[],
    tid:[],
    classeslength:0,
    classesheight:'',
    ArticleImgList:[],

    
    slider2:[],
    ImagesColor:['2fa0b2','8286dd','e00a0a','f39800','b3d465','ea68a2','2cabf2','22ac38'],
    AddressText:[
      { top:'三亚客片', foot:'BOYUE WORKS'},
      { top:'青岛客片', foot:'QINGDAO WORKS'},
      { top:'桂林客片', foot:'GUILIN  WORKS'},
      { top:'厦门客片', foot:'SHAMEN WORKS'},
      { top:'丽江客片', foot:'LIJIANG WORKS'},
      { top:'大理客片', foot:'DALI WORKS'},
      { top:'上海客片', foot:'SHANGHAI WORKS'},
      { top:'杭州客片', foot:'HANGZHOU WORKS'},
    ]
  },
   //滑块指示
    swiperChange:function(e){
        this.setData({
    swiperCurrent: e.detail.current
  })
    },
   //显示，隐藏回到顶部 
  EventHandle:function(e){
    var that =this;
    console.log(e.detail.scrollTop)
    if(e.detail.scrollTop >= 710){
      that.setData({
        BackFlag:true
      })
    }else{
       that.setData({
        BackFlag:false
      })
    }
  },
  //回到顶部
  BackTop:function(){
 
    var that = this;
    that.setData({
      ScrollTop:0
    })
       console.log(that.data.ScrollTop)
  },
  
  //选项卡切换
  NavActive:function(e){
    console.log(e.currentTarget.id)
    var that= this;
    if(e.currentTarget.id==2)
    {
     
    }
    that.setData({
      NavFlag:e.currentTarget.id
    })
  },
  //
  gotoAppreciatePage:function(e){
    var that=this;
    wx.navigateTo({
      url: '/pages/AppreciatePage/AppreciatePage?id='+that.data.topiclist[e.currentTarget.id].id+"&cname="+that.data.topiclist[e.currentTarget.id].name,
    })
  },
  //跳转到商品详情
  CommodityDetails:function(e){
    var that=this;
    var p=that.data.productlist[e.currentTarget.id];
    wx.navigateTo({
      url: '/pages/CommodityDetails/CommodityDetails?id='+p.id+"&name="+p.name+"&price="+p.price+"&image="+p.image+"&sales="+p.sales,
    })
  },
pintuan:function(e){
   var that=this;
    var p=that.data.productlist[e.currentTarget.id];
    wx.navigateTo({
      url: '/pages/CommodityDetails/CommodityDetails?id='+p.id+"&name="+p.name+"&price="+p.price+"&image="+p.image+"&sales="+p.sales,
    })
}
})
