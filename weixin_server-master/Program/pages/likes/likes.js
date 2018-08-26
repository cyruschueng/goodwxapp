// pages/likes.js
import config from "../../utils/config"
import util from "../../utils/util"
import likefn from "../../utils/likefn"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showStatus:false,
    uid:null,
    gid:null,
    opengid:"",
    GDetail:[],
    status:{},
    prepare:{
      uid:null,
      gid:null,
      index:null,
      toid:null
    },
    requestTime:null,
    config
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.showShareMenu({
      withShareTicket: true
    })


  //  util.onShare(/*用户二次打开时获取信息*/);
    //获取得具体群的ID，到云端调用信息。
    var app = getApp();
    var setData = {
      uid: app.globalData.uid,
      gid: options.gid,
      opengid: options.opengid
    }

    var that = this;
    console.log("进入like,初次获取数据",setData)
    that.setData(setData)
    util.getGroupDetail(options.gid,result => {
      that.setData({
        GDetail: result
      })
      console.log("请求喜欢的详情")
      console.log(result)
    });


        this.setData({
          requestTime:setInterval(()=>{
            //初次加载
            if(app.globalData.uid){
                var config = {
                  config:app.globalData.config
                }
                console.log(config)
                this.setData(config)
                clearInterval(this.data.requestTime);
            }
          },100)
        })


  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

    console.log("onShareAppMessage")
  },
  showStatus: function(e){
    var that = this
    var v = !that.data.showStatus;
    console.log(v)
    that.setData({
      showStatus:v
    })
  },
  onShareAppMessage: function () {
    var that = this;
    return {
      title: '说不定你喜欢的人，也喜欢你呢？相互暗恋会收到匹配私信。',
      path: '/pages/index/index',
      imageUrl:"../../imgs/icon/search.png",
      success: function ( res ) {
        util.share(res);
      },
      fail: function (res) {
        console.log(res)
      }
    }
  },
  likeshe:function(e){
    var that = this
    var toid=e.currentTarget.dataset.toid,
    uid=that.data.uid,
    gid=that.data.gid,
    likestatus=e.currentTarget.dataset.likestatus,
    nickname=e.currentTarget.dataset.nickname,
    gender=e.currentTarget.dataset.gender,
    avatarurl=e.currentTarget.dataset.avatarurl,
    index=e.currentTarget.dataset.index
    console.log(e)
    if (likestatus == 0){
      var showStatus = !that.data.showStatus
      var status = {
        avatarurl,
        nickname,
        gender
      }
      that.setData({
        status:status
      })
      that.setData({
        showStatus:showStatus
      })
      //将信息设置入预备提交区.
      var prepare ={
        toid,
        uid,
        gid,
        index
      }
      console.log(prepare)
      that.setData({
        prepare
      })

    }else{
      console.log("不可以再暗恋",likestatus);
    }
  },
  likesubmit:function(e){
    var that = this;
    var prepare = that.data.prepare;
    prepare["formId"] = e.detail.formId;
    prepare["session_key"] = wx.getStorageSync("session_key");

    console.log(prepare)
    if(prepare.uid == prepare.toid){
      wx.showToast({
        icon:"loading",
        title:"请不要自恋."
      });
    }else{
      likefn.likeshe(prepare,(result)=>{
        var GDetail = that.data.GDetail
        //console.log(GDetail)
        GDetail[prepare.index].islike = result.like
        //console.log(GDetail)
        that.setData({
          GDetail
        })
          wx.showToast({
            icon:"success",
            title:"暗恋成功."
          });
          var v = !that.data.showStatus;
          that.setData({
            showStatus:v
          })
        //console.log(that.data.GDetail[prepare.index])
        //console.log(result.like)
      });
    }
  },
  toindex:(e)=>{
    wx.redirectTo({
      url:"../index/index"
    });
  }
})
