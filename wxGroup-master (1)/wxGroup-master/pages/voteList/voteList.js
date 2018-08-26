var Util = require('../../utils/util.js');
var Api = require('../../utils/GroupRequest.js');
var app = getApp();
var User = require('../../utils/UserManager.js');
var mbook = 1;
var isEnd = false;
var isRequest = false;
var shareInfo;
var isPullDowm = false;
var showEmptyData = function (pageInstance) {
  var emptyData = {};
  emptyData.emptyImg = '../../imgs/empty.png';
  emptyData.emptyText1 = '你还没有参与的投票';
  emptyData.emptyText2 = '快去发起投票吧';
  pageInstance.setData({ emptyData: emptyData, empty: true });
};
var getVotes = function(uid,pageInstance){
  if(isEnd || isRequest){
    return;
  }
  isRequest = true;
  if(!isPullDowm){
    wx.showLoading({
      title: '加载中',
    });
  }
   var reqData={};
   if(shareInfo && shareInfo.iv){
      reqData.iv = shareInfo.iv;
      reqData.encryptedData = shareInfo.encryptedData;
      reqData.sessionkey = User.Singleton.getInstance().getLoginUserInfo().session_key;
   }
   reqData.mbook = mbook;
   reqData.uid = uid;
  Api.request({
    url:"/api/vote/v1/getVoteList",
    data:reqData,
    success:function(data){
      mbook = data.mbook;
      isEnd = data.isEnd;
      var votes = data.list;
      for(var i = 0 ; i<votes.length ; i++ ){
        var data = votes[i];
        data.createTime = Util.formatTime(new Date(parseInt(data.createTime)));
        if (Util.convertDateFromString(data.endTime) > Util.convertDateFromString(Util.getNowFormatDate() + " " + Util.getNowFormatTime())) {
          data.voteTag = '进行中';
          data.isEnd = false;
        } else {
          data.voteTag = '已结束';
          data.isEnd = true;
        }
        var userInfo = data.creater.rawData;
        userInfo = JSON.parse(userInfo);
        data.creater.wxInfo = userInfo;

        var hasVote = false;
        for (var k = 0; k < data.options.length; k++) {
          for (var j = 0; j < data.options[k].voteUsers.length; j++) {
            if (data.options[k].voteUsers[j].uid == User.Singleton.getInstance().getLoginUserInfo().uid) {
              hasVote = true;
              break;
            }
          }
        }
        if(hasVote){
          data.voteStatusInfo = "已投票查看详情";
        }else{
          if(data.isEnd){
            data.voteStatusInfo = "投票截止，查看结果";
          }else{
            data.voteStatusInfo = "立即前往投票";
          }
        }
        votes[i] = data;
      }
      var arrays = pageInstance.data.voteList;
      if(!arrays || typeof arrays == 'undefined' || isPullDowm){
        arrays = new Array();
      }
      arrays = arrays.concat(votes);

      if (typeof arrays == 'undefined' || arrays.length == 0) {
        showEmptyData(pageInstance);
        return;
      }

      pageInstance.setData({
        voteList:arrays
      })
    },
    compelete:function(){
      isRequest = false;
      wx.hideLoading()
      wx.stopPullDownRefresh()
    }
  })
};
Page({
  data:{
    voteList:[]
  },
  lookVote:function(res){
    wx.navigateTo({
      url: '../voteDetail/voteDetail?voteId='+res.currentTarget.dataset.voteId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    mbook = 1;
    isEnd = false;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        that.setData({
          winHeight: res.windowHeight * res.pixelRatio
        })
      },
    })
    var that = this;
    wx.getShareInfo({
      shareTicket: User.Singleton.getInstance().getShareTicket(),
      success:function(info){
        shareInfo = info;
        console.log(shareInfo);
        getVotes(User.Singleton.getInstance().getLoginUserInfo().uid, that);
      },
      fail:function(){
        getVotes(User.Singleton.getInstance().getLoginUserInfo().uid, that);
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('pull --')
    if(isRequest){
      return;
    }
     mbook = 1;
     isEnd = false;
     isRequest = false;
     isPullDowm = true;
     getVotes(User.Singleton.getInstance().getLoginUserInfo().uid, this);
  },
  /**
   * 页面上拉触底事件的处理函数
   */
   lower: function () {
    isPullDowm = false;
    getVotes(User.Singleton.getInstance().getLoginUserInfo().uid, this);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  publish:function(res){
    wx.redirectTo({
      url: '../vote/vote',
    })
  },
  
})