// pages/home/home.js
var publicUrl = getApp();
var page = 1;
var url = publicUrl.globalData.baseAPI;
var picUrl = publicUrl.globalData.picurl;
var dataset = require('../../utils/date.js')

var loadPost = function(that){
  var posts = [];
  var assets = [];
  var userInfo = publicUrl.globalData.userInfo;
  let page = that.data.page;
  console.log("=====load posts==page=" + page)

  that.setData({
    searchLoading: true   //把"上拉加载"的变量设为true，显示  
  })

  wx.request({
    url: url + '/posts?xq_id=' + userInfo.xqid,
    data: {
      page:page
    },
    header: {
      'Accept': "*/*",
      'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
    },
    success: function (res) {
      console.log(res.data)
      if(res.data.code == 10001){
        that.setData({
          searchLoading: false,  //把"上拉加载"的变量设为false，隐藏 
          hidden: true//把“没有数据”设为true，显示  
        })
      } else if (res.data.code == 10002){
        let pos = [];
        for (var i = 0; i < res.data.post.length; i++) {
          var post = {
            id: res.data.post[i].pid,
            username: res.data.post[i].uname,
            userasset: res.data.post[i].uasset,
            title: res.data.post[i].ptitle,
            sumcomment: res.data.post[i].sumcomment,
            pleixing: res.data.post[i].pleixing,
            created_at: res.data.post[i].updatetime,
            assets:  res.data.post[i].passets,
            updatetime: dataset.getDateDiff(res.data.post[i].updatetime),
          }
          pos.push(post);
        };
        that.data.isPost ? posts = pos : posts = that.data.posts.concat(pos)
        that.setData({
          posts: posts,
          assets: assets
        });
      }
    },
    complete: function (res) {
      that.setData({
        searchLoading: false   //把"上拉加载"的变量设为false，显示  
      })
    },
    fail:function(){
      console.log("网络错误")
    }
  });
}

var loadWeixin = function (that) {
  var weixins = [];
  var userInfo = publicUrl.globalData.userInfo;
  let page = that.data.page;

  that.setData({
    searchLoading: true   //把"上拉加载"的变量设为true，显示  
  })

  wx.request({
    url: url + '/weixins?xq_id=' + userInfo.xqid,
    data: {
      page: page
    },
    header: {
      'Accept': "*/*",
      'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
    },
    success: function (res) {
      console.log(res.data)
      if (res.data.code == 10001) {
        that.setData({
          searchLoading: false,  //把"上拉加载"的变量设为false，隐藏 
          hidden: true //把“没有数据”设为true，显示  
        })
      } else if (res.data.code == 10002) {
        let weis = [];
        for (var i = 0; i < res.data.weixin.length; i++) {
          var weixin = {
            uid: res.data.weixin[i].uid,
            id: res.data.weixin[i].wid,
            username: res.data.weixin[i].uname,
            userasset: res.data.weixin[i].uasset,
            wname: res.data.weixin[i].wname,
            sumcomment: res.data.weixin[i].sumcomment,
            desc: res.data.weixin[i].desc
          }
          weis.push(weixin);
        }
        that.data.isWei ? weixins = weis : weixins = that.data.weixins.concat(weis)

        that.setData({
          weixins: weixins,
          searchLoading: false   //把"上拉加载"的变量设为false，显示  
        })
      }
     
    }
  })

}

var loadImages = function (that) {
  var images = [];
  var userInfo = publicUrl.globalData.userInfo;
  let page = that.data.page;
  
  that.setData({
    searchLoading: true   //把"上拉加载"的变量设为true，显示  
  })

  wx.request({
    url: url + '/passes?xiaoquid=' + userInfo.xqid,
    data: {
      page: page
    },
    header: {
      'Accept': "*/*",
      'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
    },
    success: function (res) {
      console.log(res)
      if (res.data.code == 10001) {
        that.setData({
          searchLoading: false, //把"上拉加载"的变量设为false，隐藏 
          hidden: true//把“没有数据”设为true，显示  
        })
      } else if (res.data.code == 10002) {
        let imgs = [];
        for (var i = 0; i < res.data.passes.length; i++) {
          var srcindex = res.data.passes[i].asset.indexOf('?');
          var image = {
            uid: res.data.passes[i].user_id,
            id: res.data.passes[i].id,
            asset: picUrl + res.data.passes[i].asset.substring(0, srcindex),
            name: res.data.passes[i].title,
            time: res.data.passes[i].time,
            height: 0
          }
          imgs.push(image);
        }
        that.data.isImg ? images = imgs : images = that.data.images.concat(imgs)

        that.setData({
          images: images,
          searchLoading: false   //把"上拉加载"的变量设为false，显示  
        })
      }
    }
  })
}

Page({
  data: {
    initload:false,
    isPost: true, // 用于判断数组是不是空数组，默认true，空的数组 
    isWei:true,
    isImg:true,
    page: 1, // 设置加载的第几次，默认是第一次
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    hidden: false,  //“没有数据”的变量，默认false，隐藏  
    xqid: 0,
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    userInfo: "",
    posts:[],
    weixins:[],
    passes: [],
    scrollH: 0,
    imgWidth: 0,
    images: [],
    col1: [],
    col2: [],
    loading:true
  },
  left: function () {
    wx.navigateTo({
      url: '/pages/home/introduce/left/left',
    })
  },
  help: function () {
    wx.navigateTo({
      url: '/pages/home/introduce/help/help',
    })
  },
  event: function () {
    wx.navigateTo({
      url: '/pages/home/introduce/event/event',
    })
  },
  group: function () {
    wx.navigateTo({
      url: '/pages/home/introduce/group/group',
    })
  },
  book: function () {
    wx.navigateTo({
      url: '/pages/home/introduce/book/book',
    })
  },

  clickHuati: function (event) {
    console.log(event)
    wx.navigateTo({
      url: '../home/topicDetail/topicDetail?id=' + event.currentTarget.id,
    })
    console.log(event)
  },
  clickWeixin:function(event){
    wx.navigateTo({
      url: '/pages/home/weixindetail/weixindetail?id=' + event.currentTarget.id,
    })
  },
  clickChuandi:function(event){
    wx.navigateTo({
      url: '/pages/home/chuandiDetail/chuandiDetail?id=' + event.currentTarget.id,
    })
  },
  clickLinju:function(){
    wx.navigateTo({
      url: '../MeetNeighbors/allNeighbors/details/details',
    })
  },
  bindChange: function (e) {
    var that = this;
    page = 1;
    that.setData({ 
      currentTab: e.detail.current,
      isWei: true,
      isImg: true,
      isPost: true,
      hidden: false
    });
    if (e.detail.current == 0) {
      loadPost(that);
    } else if (e.detail.current == 1) {
      loadWeixin(that);
    } else if (e.detail.current == 2) {
      loadImages(that);
    }
  },

  swichNav: function (e) {
    console.log("swichNav")

    var that = this;
    page = 1;
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else  {
      that.setData({
        currentTab: e.target.dataset.current,
        isWei: true,
        isImg: true,
        isPost: true,
        hidden: false
      })
    }
  },

  scroll: function (e) {
    console.log(e)
    console.log("===scrollHeight=" + e.detail.scrollHeight)
  },

  /**
   * 生命周期函数--onLoad
   */


  onLoad: function (options) {
    console.log(options)
    var userInfo = wx.getStorageSync('userInfo');
    var that = this

    wx.setNavigationBarTitle({
      title: userInfo.xqname
    })

    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.48;
        let scrollH = wh;

        publicUrl.globalData.userInfo = userInfo;

        if(userInfo.xqid !=null){
          that.setData({
            initload:true
          })
          loadPost(that);
        }

        that.setData({
          userInfo:userInfo,
          scrollH: scrollH,
          imgWidth: imgWidth
        });

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onShow: function (options) {
    var that = this
    that.setData({
      isWei: true,
      isImg: true,
      isPost: true
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  loadmore: function () {
    console.log("====load more==="+page)
    var that = this;
    var currentTab = that.data.currentTab;

    that.setData({
      //每次触发上拉事件，把searchPageNum+1  
      page: that.data.page + 1, 
      //触发到上拉事件,用于判断数组是不是空数组，默认true，空的数组 
      isPost: false, 
      isWei: false,
      isImg: false,
      hidden: false
    });
    if (currentTab == 0) {
      loadPost(that);
    } else if (currentTab == 1) {
      loadWeixin(that);
    } else if (currentTab == 2) {
      loadImages(that);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
