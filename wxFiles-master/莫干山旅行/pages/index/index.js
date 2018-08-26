var comm = require('../../utils/common.js'); 
var app = getApp()
Page({
  data:{
    
    user:{},
    remind: '加载中',
    scrollHeight:0,
    hot:[],
    _book:['label','tips','season','advention'],
    book:[],
    wonderful:[],
    swiperCurrent:0,
    page:1,
    isMoreData:'',

    //班夫生活
    live:[],
    food:{},
    shop:{},
    culture:{},
    fitness:{},
    accommodation:{}, 
    entertainment:{},
    scenery:{},
    all:{id:-2,name:'全部'},
  },


  onLoad: function () {
    //登录
    this.login()
  },

  login:function(){
    var that=this
    //如果有缓存，则提前加载缓存
    try{
      that.response()
    }catch(e){
      app.cache={}
      wx.clearStorage()
    }

    //然后在尝试登录用户，如果缓存更新将执行该回调函数
    app.getUser(function(status){
      that.response.call(that,status)
    })

     that.getBanff()

     wx.getSystemInfo({
       success: function (res) {
         that.setData({
           scrollHeight: res.windowHeight,
         });
       }
     });
  },

  response:function(status){
    var that=this
    if(status){
      console.log('目前的情况是: ' + status)
    }

    that.setData({
      user:app._user
    })

  },

  search:function(){
    wx.navigateTo({
      url: '../search/search',
    })
  },

  myTrait:function(){
    wx.navigateTo({
      url: '../mytrait/mytrait',
    })
  },

  //轮播
  swiperChange: function(e){
    this.setData({  
        swiperCurrent: e.detail.current  
    })  
},

  //精彩班夫动态加载
   lower: function (e) {
     //wx.showNavigationBarLoading()
     var that = this;
     setTimeout(function () { that.nextLoad()},2000)
     
     //wx.hideNavigationBarLoading()
     console.log("lower")
   },

  

  nextLoad: function(){
    
    var page = this.data.page
    page = page + 1
    this.setData({
      page: page
    })

    this.getWonderfulNext(parseInt(page))
  },

  //继续获取精彩班夫 
  getWonderfulNext:function(page){
    var that=this

    function wonderfulRender(info){
      var wonderful = that.data.wonderful.concat(info)
      for (var i in wonderful) {
        if (!parseInt(wonderful[i].is_theme)) {
          wonderful[i].url = '../details/content/content?appid='+app._appid+'&id=' + wonderful[i].id
        }else{
          wonderful[i].url = '../details/list/list?appid='+app._appid+'&id=' + wonderful[i].id
        }
      }
      that.setData({
        wonderful: wonderful,
      })
    }

    wx.request({
      url: app._server+'/article/articles?appid='+app._appid+'&size=4&page='+page,
      success: function (res) {
        if (res.data) {
          var info = res.data;
          if (info.length != 0) {
            wonderfulRender(info)
          } else {
            console.log('已经没有数据了！')
          }
        }
      },
    })
  },

 
  //获取首页数据
   getBanff:function(){
    var that=this
    //渲染热门文章
     function hotRender(info){
       console.log(info)
       var hot=info
       for (var i in info) {
         if (!parseInt(info[i].is_theme)) {
           hot[i].url = '../details/content/content?appid='+app._appid+'&id=' + info[i].id
         } else {
           hot[i].url = '../details/list/list?appid='+app._appid+'&id=' + info[i].id
         }
       }
       that.setData({
         hot:info,
       })
     }
     var loadsum = 0
     loadsum++
    //获取热门数据
     wx.request({
       url: app._server+'/article/hot?appid='+app._appid,
       success: function (res) {
         if (res.data) {
           var info = res.data;
           if (info.length != 0) {
             hotRender(info)
           }
         }
       },
       complete:function(){
        loadsum--
        if(!loadsum){
          that.setData({
            remind: ''
          })
        }
       }
     })

    
    //渲染班夫生活
    function liveRender(info){
      var food = info[6]
      var shop = info[5]
      var culture = info[4]
      var fitness = info[3]
      var accommodation = info[2]
      var entertainment = info[1]
      var scenery = info[0]
      info.push(that.data.all)
      that.setData({
        food: food,
        shop: shop,
        culture: culture,
        fitness: fitness,
        accommodation: accommodation,
        entertainment: entertainment,
        scenery: scenery,
      })
      app.saveCache('live', info)
    }
    //获取班夫生活数据
    loadsum++
    wx.request({
      url: app._server+'/live/categories?appid='+app._appid,
    
      success: function (res) {
        if (res.data) {
          var info = res.data;
          if (info.length != 0) {
            app.saveCache('live', info);
            liveRender(info)
          }
        }else{
          app.removeCache('live')
        }
      },
      complete:function(){
        loadsum--
        if(!loadsum){
          that.setData({
            remind:''
          })
        }
      }
    })



    //渲染班夫宝典
    function bookRender(info){
      console.log(info)
      var book=[]
      for(var i in info){
        var item={}
        item.id=info[i].id
        item.name=info[i].name
        item.img=info[i].img
        book.push(item)
      }
      for (var i in book){
        book[i].en=that.data._book[i]
      }
      that.setData({
        book:book
      })
    }
    loadsum++
    //获取班夫宝典数据
    wx.request({
      url: app._server+'/know/categories?appid='+app._appid,
      success: function (res) {
        if (res.data) {
          var info = res.data;
          if (info.length != 0) {
            bookRender(info)
          }
        }
      },
      complete:function(){
        loadsum--
        if(!loadsum){
          that.setData({
            remind:''
          })
        }
      }
    })

    //渲染精彩班夫
    function wonderfulRender(info){
      console.log('精彩班夫：')
      console.log(info)
      var wonderful = info
      for(var i in info){
        if (!parseInt(info[i].is_theme)){
          wonderful[i].url ='../details/content/content?appid='+app._appid+'&id='+info[i].id
        }else{
          //传递给专题页面的内容
          wonderful[i].url = '../details/list/list?appid='+app._appid+'&id=' + info[i].id
        }
      }
      that.setData({
        wonderful: wonderful,
      })
    }
    
    loadsum++
    //获取精彩班夫数据
    wx.request({
      url: app._server+'/article/articles?appid='+app._appid+'&page=1&size=4',
      success: function (res) {
        if (res.data) {
          var info = res.data;
          if (info.length != 0) {
            wonderfulRender(info)
          }
        }
      },
      complete:function(){
        loadsum--
        if(!loadsum){
          that.setData({
            remind:''
          })
        }
      }
    })
   },

   //图片加载错误处理
   errImg: function (ev) {
     var that = this;
     comm.errImgFun(ev, that);
   }, 
})