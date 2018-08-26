// pages/myactivity/myactivity.js
var app = getApp();

Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    myList: [
      // {
      //   id: 3, title: 'test', time: '2017-09-30 10：40', 
      //   statistics: '距活动开始剩余1天',
      //   image: 'http://www.shtongnian.com/storage/activity/2017-09-25/4ZFb2pxVIczCs5dytiYI.jpg'
      // },
      // {
      //   id: 3, title: '活动名称活动名称活动名称活动名称', time: '2017-09-28 09:30', 
      //   statistics: '活动进行中',
      //   image: 'http://www.shtongnian.com/storage/activity/2017-09-25/4ZFb2pxVIczCs5dytiYI.jpg'
      // },
      // {
      //   id: 3, title: '活动名称活动名称活动名称活动名称活动名称活动名称', time: '2017-05-17 10:00', 
      //   statistics: '活动已结束',
      //   image: 'http://www.shtongnian.com/storage/activity/2017-09-25/4ZFb2pxVIczCs5dytiYI.jpg'
      // },
    ],
    current: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    var openid = app.globalData.openid;
    if (openid) {
      that.loadJoined();
    } else {
      console.log(1)
      app.userCheckLogin(function () {
        that.loadJoined();
      });
    }
  },

  

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      current: ""
    })
    that.loadJoined(function(){
      that.setData({
        myList: []
      });
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },


  /**
   * ====================自定义方法=====================
   */
  /**
   * 加载全部已参加的活动
   * 根据用户查询数据
   */
  loadJoined: function(before){
    var that = this;

    wx.request({
      url: app.globalData.url + '/admin/wx/my_activities',
      data: { 'openid': app.globalData.openid, 'current': that.data.current},
      success: function(res){

        //如果有执行之前的函数before，(刷新重置)
        typeof before == 'function' && before();

        var list = that.data.myList;

        list = list.concat(res.data)
        if(list.length > 0){
          that.setData({
            myList: list,
            current: list[list.length - 1].id
          })
        }

      }
    })
  },


  /**
   * 加载更多
   */
  loadMore: function(){
    this.loadJoined();
  },


  // ================非功能代码=================

  /**
   * 跳转查看详情
   */
  navigateTo: function(e){
    var id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '../activitydetail/activitydetail?id='+ id,
    })
  }

})