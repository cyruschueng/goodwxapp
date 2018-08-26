// activity.js
var util = require("../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    now: "active",
    before: "",
    loadinfo: "加载更多……",
    currentList: [  //  正在进行 或 尚未开始的活动列表
      // { id: "10", key: "展览", title: "【PSA 展览】巴克利希腊多西建筑回顾展", description:"上海当代艺术博物馆于2017年7月29日至10月29日期间举办印度著名建筑师、规划师、学者兼机构创建者巴克里希纳•多西（Balkrishna Doshi,1927- ）在中国地区的首次大型个展“栖居的庆典 真实 · 虚拟 · 想像——巴克里希纳•多西建筑回顾展”。", image: "http:\/\/img.weiye.me\/zcimgdir\/album\/file_591168c15d03c.jpg", time: "2017-09-26,11:00-16:00,周二",address:"上海当代艺术博物馆", join: "120", view: "1504" },
    ],  
    beforeList: [ //  往期活动（已结束）
      // { id: "1", title: "【PSA 展览】巴克利希腊多西建筑回顾展希腊多西建筑回顾展", image:   "http:\/\/img.weiye.me\/zcimgdir\/album\/file_591168c15d03c.jpg", time: "2017-08-26", join: "12", view: "154" },
      // { id: "2", title: "掌上魔都 线下咖啡店极致体验 最深刻的上海咖啡", image: "http:\/\/img.weiye.me\/zcimgdir\/album\/file_591191d94ea81.jpg", video: "", time: "2017-08-30", join: "15", view: "210" }
    ],
    pending: false, // 是否正在请求中的标识 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 加载正在进行的活动列表
    this.loadCurrent();

    this.loadBefore();

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var bl = this.data.pending
    if(!bl){
      that.setData({
        pending: true
      });
      that.loadBefore(function(){
        that.setData({
          pending: false
        });
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "掌上魔都，热门活动火热上线啦，快来看看你期待了那么久的活动吧！"
    }
  },

  /***
   * ==================================自定义方法======================================
   */

  /**
   * 加载正在进的活动列表
   */
  loadCurrent: function(){
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.request({
      url: app.globalData.url + "/admin/activity/activity_format",
      success: function (res) {
        wx.hideLoading();
        var nowList = res.data || [];

        for(var i=0; i<nowList.length; i++){
          var des = nowList[i].description;
          nowList[i].des = des.split('\n');
        }

        that.setData({
          currentList: nowList
        })
      },
      fail: function () {
        that.loadCurrent();
      }
    })
  },

  /**
   * 加载往期活动列表
   * @id 上一组最后一条数据的id
   */
  loadBefore: function(callback){
    var that = this;
    var id = "";
    var bf_list = that.data.beforeList;

    if(bf_list && bf_list.length == 0){
      id = ""
    }else{
      id = bf_list[bf_list.length - 1].id
    }

    wx.request({
      url: app.globalData.url + "/admin/activity/oldactivity_format",
      data: { "id": id },
      success: function (res) {
        var beforeList = res.data || [];

        if(beforeList.length == 0){
          that.setData({
            loadinfo: "暂无更多活动信息"
          });
          return;
        }
        beforeList = that.data.beforeList.concat(beforeList);

        that.setData({
          beforeList: beforeList
        })
        if(typeof callback == "function"){
          callback();
        }
      },
      fail: function () {
        that.loadBefore();
      }
    })
  },



// ==================非功能方法==================
  /**
   * 切换正在进行活动页
   */
  currentActivity: function(e){
    if(this.data.now == "active"){
      return;
    }else{
      this.setData({
        now: "active",
        before: ""
      })
    }
  },

  /**
   * 切换往期活动页
   */
  beforeActivity: function(e){

    if(this.data.before == "active"){
      return;
    }else{
      this.setData({
        now: "",
        before: "active"
      })
    }
  },

  /**
   * 跳转活动详情页
   */
  toDetail: function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../activitydetail/activitydetail?id='+ id,
    })
  }


})