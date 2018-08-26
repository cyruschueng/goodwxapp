var app = getApp();
Page({
  data:{
    banners:['http://api.h6vr.com/cdn.h6vr.com/lyty/images/img1.jpg','http://api.h6vr.com/cdn.h6vr.com/lyty/images/img3.jpg','http://api.h6vr.com/cdn.h6vr.com/lyty/images/img2.jpg'],
    indicatorDots:false,
    bannerautoplay:true,
    interval:5000,
    vertical: true,
    duration: 1000,
    circular: true,
    headLineList:['http://api.h6vr.com/cdn.h6vr.com/lyty/images/hot.jpg','http://api.h6vr.com/cdn.h6vr.com/lyty/images/hot.jpg','http://api.h6vr.com/cdn.h6vr.com/lyty/images/hot.jpg'],
    hoticon:['http://api.h6vr.com/cdn.h6vr.com/chwl/images/hot/hot.png'],
    hotautoplay:false,
    navList:[
        {
            name:"签证",
            icon:"http://api.h6vr.com/cdn.h6vr.com/lyty/images/qianzheng.png",
            page:"/pages/hot/hot"
        },
        {
            name:"线路",
            icon:"http://api.h6vr.com/cdn.h6vr.com/lyty/images/xianlu.png",
            page:"/pages/hot/hot"
        },
        {
            name:"地接",
            icon:"http://api.h6vr.com/cdn.h6vr.com/lyty/images/dijie.png",
            page:"/pages/hot/hot"
        }
    ],
    openType:"navigate"
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
     //this.bannerLoad();
  },
  //热点上下轮播
  
   /* bannerLoad: function () {
        var that = this;
        wx.request({
            url: 'https://bobtrip.com/newtj/menu/port/getPicture.action', //仅为示例，并非真实的接口地址
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log("请求成功");
                var li = res.data.picturelist;
                that.setData({
                    bannerList: li
                })

            },
            fail: function () {
                console.log("请求失败");
            },
            complete: function () {
                that.headLineLoad();
            }
        })
    },
  headLineLoad: function () {
        var that = this;
        wx.request({
            url: 'https://bobtrip.com/newtj/menu/port/getRecommend.action', //仅为示例，并非真实的接口地址
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log("请求成功");
                console.log(res)
                var li = res.data.reclist;
                // console.log(li);
                that.setData({
                    headLineList: li
                })
            },
            fail: function () {
                console.log("请求失败");
            }
        })
    },*/
    jumpHeadLineList:function(){
        wx.navigateTo(
            {
            url:'../hot/hot'
        }
        )
    },
    openSpring:function(){
        wx.navigateTo({
            url:'../season/spring/post'
        })
    },
    openSummer:function(){
        wx.navigateTo({
            url:'../season/summer/post'
        })
    },
    openAutumn:function(){
        wx.navigateTo({
            url:'../season/autumn/post'
        })
    },
    openWinter:function(){
        wx.navigateTo({
            url:'../season/winter/post'
        })
    },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
   
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: '【旅游圈同业资讯】', // 分享标题
      desc: '', // 分享描述
      path: '/pages/travel/travel' // 分享路径
    }
  }
})