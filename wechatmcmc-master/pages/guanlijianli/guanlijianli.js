// pages/guanlijianli/guanlijianli.js

var last = false;

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var app = getApp();
Page({
  data:{
    info:[],
    xiazai:[],
    taocan:0,
    inputShowed: false,
    inputVal: "",
    scrollTop : 0,
    scrollHeight:0,
    jiazai:'none',
    tabs: ["我收到的简历", "我下载的简历"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },

  pay:function(e){
    wx.navigateTo({
      url: '../pay/pay'
    })
  },
      getdata:function(that){

       
    if(last == false){
      var session_id = wx.getStorageSync('session_id')
      // 加载数据
      var openid = wx.getStorageSync('wxopenid')
      // wx.showToast({
      //     title: '数据加载中…',
      //     icon: 'loading',
      //     duration: 10000
      // });
      // 获取数据
      wx.request({
        url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=guanlijianli', //真实的接口地址
          data: {
           
            openid:openid
          },
          method:'get',
          header: {
              'content-type': 'application/json',
              'Cookie':'PHPSESSID='+session_id+'; path=/'
          },
          success: function(res) {
           
          if (res.data.taocan==null){
            res.data.taocan=0
          }

            that.setData({
              info: res.data.info,
              xiazai: res.data.xiazai,
                taocan:res.data.taocan
            })
          
          // 隐藏提示
          wx.hideToast()
          // console.log(res.data.info.length)
          if(res.data.info.length == 0){
              last = true;
              that.setData({
                jiazai:'none',
              })
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
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    last = false;
   
    app.getUserInfo(function(userInfo){
    that.getdata(that);
    wx.getSystemInfo({
          success:function(res){
              // console.info(res.windowHeight);
              that.setData({
                  scrollHeight:res.windowHeight,
                  sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                  sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
                   userInfo:userInfo
              });
          }
      });
    })
  },
  look:function(e){
    var session_id = wx.getStorageSync('session_id')
    
    var openid = wx.getStorageSync('wxopenid')
    var id=e.currentTarget.dataset.id;
    var status = e.currentTarget.dataset.status;
    console.log();
    wx.navigateTo({
      url: '../getjianli/getjianli?token=' +id,
    })
    if (status==0){
      wx.request({
        url: 'https://www.mcmchw.com/index.php?m=Home&c=Modenews&a=getinfo',
        data: {
          'token': id,
          'openid': openid
        },
        method: 'post',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': 'PHPSESSID=' + session_id + '; path=/'
        },
        success: function (e) {
          console.log(e);
          wx.request({
            url: 'https://www.mcmchw.com/index.php?m=Home&c=Modenews&a=sendMessage',
            method: 'post',
            data: {
              openid: e.data.openid,
              template_id: 'KKqXeBf047vOwGnQkeVKzkXp2COvvXmgWbHGYVosB2U',
              code: 3,
              name: e.data.name,
              haoma: e.data.haoma,
              time: e.data.time,
            },
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Cookie': 'PHPSESSID=' + session_id + '; path=/'
            },
            success: function (e) {

              console.log(e);
              wx.request({
                url: 'https://www.mcmchw.com/index.php?m=Home&c=Modenews&a=setjlfb',
                data: {
                  'token': id,
                  
                },
                method: 'post',
                header: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Cookie': 'PHPSESSID=' + session_id + '; path=/'
                },
                success:function(e){
                  console.log(e);
                }
                })
            }
          })
        }
      })
    }
   
  },
  tabClick: function (e) {
  
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    },
  
  onShow:function(){
    var that=this;
    that.getdata(that);
  }
  
  
  
})