// mine.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    dot: 'hide',
    collectNum: 0,  // 收藏总数
    myActNum: 0,  // 我[参与的]活动总数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
    
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      app.getUserInfo(function (userInfo) {
        that.setData({
          userInfo: userInfo
        })
      })
    }

    // 检测消息
    this.check_newMessage();
    that.getGlobal();
 
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    
    // 获取收藏与我的活动的数量
    that.getGlobal();
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

/**
 * =========================自定义方法========================
 */

  /**
   * 获取收藏与活动的统计数据
   */
  getGlobal: function(){

    var that = this;
    wx.request({
      url: app.globalData.url + "/admin/wx/pieces",
      data: {"openid": app.globalData.openid},
      success: function(res){
        that.setData({
          myActNum: res.data.actnum,
          collectNum: res.data.collect
        })
      }
    })
  },


  /**
   * 页面跳转
   */
  mineNavigate: function(e){
    let url = e.currentTarget.dataset.to;
    if (url == '../message/message'){
      this.setData({
        dot: 'hide'
      })
    }

    wx.navigateTo({
      url: url
    })
  },

/**
 * 查看新消息
 * 查看本地消息缓存中的id=>oid，搜索数据库最新消息的id=>nid
 * nid > oid 则表明系统有最新消息下发，则显示红色消息提示点
 */
  check_newMessage: function(){
    var that = this;
    var storage_id = wx.getStorageSync("systemId") || "";
    console.log(storage_id)

    // 参数id，搜索>id的数据，返回消息数组，时间降序
    // 数组为空
    // 参数id为空，则返回全部系统消息
    wx.request({
      url: app.globalData.url + "/admin/wx/update_message",
      data: { "current": storage_id },
      success: function(res){
        var msg = res.data;
        var msg_id = msg[0] && msg[0].id || "";

        if(msg_id > storage_id){
          that.setData({
            dot: 'dot'
          });

          // 更新消息id缓存
          wx.setStorage({
            key: 'systemId',
            data: msg_id,
          });
          //更新消息列表缓存
          that.update_storage(msg);
          
          
        }
      }
    })
  },

  
/**
 * 更新列表缓存
 */
update_storage: function(msg){
  wx.getStorageInfo({
    success: function (res) {
      if (res.keys.indexOf('systemList') > -1) {
        wx.getStorage({
          key: 'systemList',
          success: function (res) {
            var old_data = res.data;
            msg = msg.concat(old_data);

            wx.setStorage({
              key: 'systemList',
              data: msg,
            })
          },
        })
      }else{
        wx.setStorage({
          key: 'systemList',
          data: msg,
        })
      }
    },
  })
},

})