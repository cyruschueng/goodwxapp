// pages/duel/duel.js
var util = require('../../utils/util');
var app = getApp();
var passive_user_id = 0;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    wxInfo: {},
    userId: null,
    duelInfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // if (options){
      console.log("================shareId================\n",options.share_id);
      passive_user_id = options.share_id;
    // }  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    app.getUserInfo(function ( res ){
      console.log("================res of getUserInfo================\n", res);
      that.setData({
        wxInfo: res.wxInfo,
        userId: res.userId
      })

    var active_user_id = res.userId;
    console.log("================id================\n" ,active_user_id,passive_user_id)
    util.requestApi("/ydwxapp_rank/get_wxapp_pk", { "active_user_id" : active_user_id,
    "passive_user_id" : passive_user_id ,"login_source": "group_rank" }, function (res) {
      console.log("================拿到决斗数据================\n",res);
        that.setData({
          duelInfo : res.infos
        })
        for ( var i = 0; i < res.infos.length; i ++){
          var result;
          if ( res.infos[i].pk_flag == 0 )  result = "失败";
          else if ( res.infos[i].pk_flag == 1 )  result = "胜利";
          console.log("i================in res.infos[${i}]================result if \n",result)
          if ( res.infos[i].user_id == active_user_id ){
            that.setData({
                'duelInfo[0]' : res.infos[i],
              'duelInfo[0].result' : result
            });
          }
          if ( res.infos[i].user_id == passive_user_id ){
            that.setData({
              'duelInfo[1]' : res.infos[i] ,
              'duelInfo[1].result' : result
            })
          }
           
        }
          
    });

    });

    // var active_user_id = that.data.userId;
    // console.log("================id================\n" ,active_user_id,passive_user_id)
    // util.requestApi("/ydwxapp_rank/get_wxapp_pk", { "active_user_id" : active_user_id,
    // "passive_user_id" : passive_user_id ,"login_source": "group_rank" }, function (res) {
    //   console.log("================拿到决斗数据================\n",res);
    //     that.setData({
    //       duelInfo : res.infos
    //     })
    //     for ( var i = 0; i < res.infos.length; i ++){
    //       var result;
    //       if ( res.infos[i].pk_flag == 0 )  result = "失败";
    //       else if ( res.infos[i].pk_flag == 1 )  result = "胜利";
    //       console.log("i================in res.infos[${i}]================result if \n",result)
    //       if ( res.infos[i].user_id == active_user_id ){
    //         that.setData({
    //             'duelInfo[0]' : res.infos[i],
    //           'duelInfo[0].result' : result
    //         });
    //       }
    //       if ( res.infos[i].user_id == passive_user_id ){
    //         that.setData({
    //           'duelInfo[1]' : res.infos[i] ,
    //           'duelInfo[1].result' : result
    //         })
    //       }
           
    //     }
          
    // });
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
    this.onReady()

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})