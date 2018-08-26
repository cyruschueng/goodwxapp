// pages/zhiweishoucang/zhiweishoucang.js
var page;
var last;
var sliderWidth = 96;
var app = getApp()
Page({
  data:{
    info:[],
    shop:[],
    inputShowed: false,
    inputVal: "",
    scrollTop : 0,
    scrollHeight:0,
    jiazai:'none',
    editIndex: 0,
    delBtnWidth:60,
    tabs: ["职位收藏", "供应收藏"],
    sliderOffset: 0,
    sliderLeft: 0,
     activeIndex: 0,
  },
  //滑动删除----START
  
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  //滑动删除----END
  getdata:function(that){
    if(last == true){
      page = 1;
    }

    if(last == false){
      var session_id = wx.getStorageSync('session_id')
      var openid=wx.getStorageSync('wxopenid')
      // 加载数据
      wx.showToast({
          title: '数据加载中…',
          icon: 'loading',
          duration: 500
      });
      // 获取数据
      wx.request({
        url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=zhiweishoucang', //真实的接口地址
          data: {
            page:page,
            openid:openid
          },
          method:'get',
          header: {
              'content-type': 'application/json',
              'Cookie':'PHPSESSID='+session_id+'; path=/'
          },
          success: function(res) {
            // console.log(res.data)
            // 设置数据
          var info = that.data.info;
          var shop = that.data.shop;
          if (res.data.info){
            var il = res.data.info.length;
            for (var i = 0; i < il; i++) {
              info.push(res.data.info[i]);
            }
          }
          
          if (res.data.shop){
            var sl = res.data.shop.length;
              for (var i = 0; i < sl; i++) {
                shop.push(res.data.shop[i]);
              }
            }
          
            that.setData({
              info: info,
              shop:shop
          })
          page ++;
          // 隐藏提示
          wx.hideToast()
          // console.log(res.data.info.length)
          if(res.data.info.length == 0){
              last = true;
            }

          },
          // 接口调用失败
          fail:function(){

          },
          complete:function(){
          }
      })
    }
  },
  bindDownLoad:function(){
    // console.log("底部了");
    //   该方法绑定了页面滑动到底部的事件
      var that = this;
      that.setData({
        jiazai:'block',
      })
      that.getdata(that);
      
  },
  scroll:function(event){
    var that = this;
    //   该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
     that.setData({
         scrollTop : event.detail.scrollTop
     });
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    page = 1;
    last = false;
    app.getUserInfo(function (userInfo) {
      that.getdata(that);
      wx.getSystemInfo({
        success: function (res) {
          // console.info(res.windowHeight);
          that.setData({
            scrollHeight: res.windowHeight,
            sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
            sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
            userInfo: userInfo
          });
        }
      });
    })
  },
  call:function(e){
       var id=e.currentTarget.dataset.id;
       wx.makePhoneCall({
         phoneNumber: id,
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