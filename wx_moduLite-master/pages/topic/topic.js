// topic.js
var util = require('../../utils/util.js');
var app = getApp()
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    block: "none",
    loadinfo: "加载更多……",
    newTopic: {
      // id: "2",
      // title: "《战狼2》为什么这么火？",
      // image: "http:\/\/img.weiye.me\/zcimgdir\/album\/file_591275fdca9af.jpg",
      // content: "吴京的电影战狼2最近是火到不行了，看票房就知道了，战狼2为什么这么火？战狼2这么火，吴京到底可以赚多少钱呢？",
      // join: "120",  //  参与人数，统计数据
      // view: "2000"  //  浏览量，统计数据？
    }, // 最新话题
    topicList: [
      // { "id": "5", "title": "您看过《爸爸去哪儿》有何感想", "image": "http:\/\/img.weiye.me\/zcimgdir\/album\/file_591275fdca9af.jpg", "content": "吴京的电影战狼2最近是火到不行了，看票房就知道了，战狼2为什么这么火？战狼2这么", "join": "120", "view": "2000" },
      // { "id": "4", "title": "《战狼II》为什么这么火？", "image": "http:\/\/img.weiye.me\/zcimgdir\/album\/file_591275fdca9af.jpg", "content": "吴京的电影战狼2最近是火到不行了，看票房就知道了，战狼2为什么这么火？战狼2这么火，吴京到底可以赚多少钱呢？", "join": "120", "view": "2000" },
      // { "id": "3", "title": "《战狼II》为什么这么火？", "image": "http:\/\/img.weiye.me\/zcimgdir\/album\/file_591275fdca9af.jpg", "content": "吴京的电影战狼2最近是火到不行了，看票房就知道了，战狼2为什么这么火？战狼2这么火，吴京到底可以赚多少钱呢？", "join": "120", "view": "2000" }
    ],  // 往期话题列表 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
    // 加载最新话题数据
    this.loadCurrent();
    
    // 加载往期
    this.loadmore();

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadmore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "掌上魔都，热门话题精彩不断，等你来high"
    }
  },

  /**
   * =====================自定义方法====================
   */

/**
 * 加载最新话题
 */
loadCurrent: function(){
  var that = this;

  util.requestGet({
    url: app.globalData.url + "/admin/topic/topic_format"
  }, function (res) {
    console.log(res)
    that.setData({
      block: "none",
      newTopic: res.data[0]
    })
  })
},

  /**
   * 加载往期话题列表，返回加载后的数据列表
   */
  loadmore: function(){
    var that = this;
    var list = this.data.topicList || [];
    var last_id;

    if(list.length == 0){
      last_id = ""
    }else{
      last_id = list[list.length - 1].id;  // 上一组数据的最小Id，（时间排序）
    }

    util.requestGet({
      url: app.globalData.url + "/admin/topic/oldtopic_format",
      data: {"id": last_id}
    },function(res){

      if(res.data.length == 0){
        that.setData({
          loadinfo: "暂无更多话题"
        })
        return;
      }
      
      list = list.concat(res.data);
      that.setData({
        topicList: list
      })

    })
  },



/**
 * 非功能代码=============
 */
/**
 * 查看详情
 */
  topicDetail: function(e){
    var id = e.currentTarget.dataset.id;
    if(id != undefined){
      wx.navigateTo({
        url: '../topicdetail/topicdetail?id=' + id,
      })
    }else{
      wx.showToast({
        title: '网络错误',
        icon: 'loading',
        duration: 500
      })
    }
    
  }

})