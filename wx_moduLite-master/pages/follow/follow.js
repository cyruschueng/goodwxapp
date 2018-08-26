// pages/follow/follow.js
var util = require('../../utils/util.js');

var app = getApp(); 

Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    followList: [ // {id: '6', type: '1', resid: '48'} type: 1=文章；2=话题；3=活动
      // { 'id': '6', 'type': '1', 
      //   'resource': { 
      //     'id': 39, 'title': '桑切斯遭英超主帅炮轰：假摔！骗了所有人','author':'admin1' 
      //   }, 
      //   followtime: '2017-09-27 14:32' 
      // },
      // { 'id': '5', 'type': '2', 
      //   'resource': { 
      //     'id': 9, 'title': 'new test','join': 0,
      //     'image': 'http://www.shtongnian.com/storage/topic/2017-09-25/R9qEWql4mBGqltB4WtzT.jpg'
      //   }, 
      //   followtime: '2017-09-25 13:00' 
      // },
      // { 'id': '4', 'type': '3', 
      //   'resource': { 
      //     'id': 7, 'title': 'test', 'description':'掌上魔都 线下咖啡店极致体验 最深刻的上海咖啡',
      //     'image': 'http://www.shtongnian.com/storage/activity/2017-09-25/4ZFb2pxVIczCs5dytiYI.jpg',
      //     'join': 0
      //   }, 
      //   followtime: '2017-09-22 09:56' 
      // },
    ],
    dictionary: [
      { 'code': 1, 'name': '文章' },
      { 'code': 2, 'name': '话题' },
      { 'code': 3, 'name': '活动' }
    ],  // 数据词典用于判定数据类别，写死但与后台同步

    is_bottom: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    that.init = function(){
      var openid = app.globalData.openid;
      
      if (openid) {
        that.setData({
          'openid': openid
        })
        that.loadFollowList();
      } else {
        console.log("init2")
        app.userCheckLogin(function () {
          that.init();
        });
      }
    }

    that.init();
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.loadFollowList("up",function(){
      wx.stopPullDownRefresh();
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var bl = that.data.is_bottom;
    console.log(bl)
    that.setData({
      is_bottom: true
    });
    console.log(bl)
    if(!bl){
      that.loadFollowList("down",function(){
        that.setData({
          is_bottom: false
        })
      })
    }
  },


  /**
   * =========================自定义方法=========================
   */

  /**
   * 加载收藏列表
   * @cursor 表示手势，仅仅识别“up”,不支持空字符串
   */
  loadFollowList: function(cursor,callback){
    var that = this;
    
    wx.showLoading({
      title: '请稍后',
    })
    cursor = cursor || "up";  // 默认手势为刷新，获取最新收藏
    var id = "";

    var list = that.data.followList;
    
    if(cursor == 'up'){
      id = ""
    }else{
      if (list.length > 0) {
        id = list[list.length - 1].id
      }
    }
 
    wx.request({
      url: app.globalData.url + '/admin/wx/showcollect',
      data: { "openid": that.data.openid, "current": id },
      success: function(res){
        wx.hideLoading();
        var data = res.data;

        if(cursor == "up"){
          list = data
        }else{
          list = list.concat(data)
        }

        that.setData({
          followList: list
        })

        if(typeof callback == "function"){
          callback();
        }
      },
      fail: function(){
        // that.loadFollowList(cursor)
      }
    })
    
  },

  /**
   * showSheet 长按显示操作列表
   */
  showSheet: function(e){
    var that = this;

    wx.showActionSheet({
      itemList: ['取消收藏'],
      success: function(res){
        if(res.tapIndex == 0){
          var id = e.currentTarget.dataset.id;
     
          util.unFollow(id,function(res){
            wx.showToast({
              title: id,
            })

            // 从followLis移除该条数据
            that.deleteFromList(id)
          })
        }
      }
    })
  },


/**
 * mytouch点击事件处理，区别长按与点击
 */
  mytouch: function(e){
    let that = this;
 
    //触摸时间
    var touchTime = that.data.touch_end - that.data.touch_start; 

    if (touchTime > 350) {
    }else{
      that.navigateTo(e);
    }
  },


  /**
   * 移除followList中的某条数据
   * @id
   */
  deleteFromList: function(id){
    var that = this;
    id = id || null;

    if(id){
      var list = that.data.followList;
      for(var i in list){
        if(list[i].id == id){
          list.splice(i,1);

          that.setData({
            followList: list
          })

          return;
        }
      }
    }
  },


  /**
   * ========================非功能方法==============================
   */

  /**
   * 点击收藏项，跳转
   * item: {'id': '6', 'type': '1', 'resource_id': '48', }
   * @type , @resource_id
   */
  navigateTo: function(e){
    var item = {
      "type": e.currentTarget.dataset.type,
      "resource_id": e.currentTarget.dataset.resid
    }
    console.log(item)
    switch (item.type)
    {
      case 1:
          wx.navigateTo({
            url: '../articledetail/articledetail?id='+ item.resource_id
          })
        break;
      case 2:
        wx.navigateTo({
          url: '../topicdetail/topicdetail?id=' + item.resource_id
        })
        break;
      case 3:
        wx.navigateTo({
          url: '../activitydetail/activitydetail?id=' + item.resource_id
        })
        break;
      default:
        return;
    }

  },

  //按下事件开始  
  mytouchstart: function (e) {
    let that = this;
    that.setData({
      touch_start: e.timeStamp
    })
  },
  //按下事件结束  
  mytouchend: function (e) {
    let that = this;
    that.setData({
      touch_end: e.timeStamp
    })
  },

})