var Util = require('../../utils/util.js');
var Api = require('../../utils/GroupRequest.js');
var app = getApp();
var User = require('../../utils/UserManager.js');
var mbook = 1;
var isEnd = false;
var isRequest = false;
var isPullDowm = false;
var showEmptyData = function (pageInstance) {
  var emptyData = {};
  emptyData.emptyImg = '../../imgs/empty.png';
  emptyData.emptyText1 = '你还没有参与的备忘录';
  emptyData.emptyText2 = '快去添加一条备忘录吧';
  pageInstance.setData({ emptyData: emptyData, empty: true });
};
var getMemo = function (uid, pageInstance) {
  if (isEnd || isRequest) {
    return;
  }
  isRequest = true;
  if (!isPullDowm) {
    wx.showLoading({
      title: '加载中',
    });
  }
  Api.request({
    url: "/api/memorandum/v1/getMemorandumList",
    data: {
      uid:uid,
      mbook:mbook
    },
    success: function (data) {
      mbook = data.mbook;
      isEnd = data.isEnd;
      var memos = data.list;
      for (var i = 0; i < memos.length; i++) {
        var data = memos[i];
        data.createTimes = Util.formatTime(new Date(parseInt(data.createTime)));
        if(data.endTime > Util.convertDateFromString(Util.getNowFormatDate() + " " + Util.getNowFormatTime())) {
          data.memoTag = '进行中';
          data.isEnd = false;
        } else {
          data.memoTag = '已结束';
          data.isEnd = true;
        }
        data.endTime = Util.formatTime(new Date(parseInt(data.endTime)));
        var userInfo = data.createrUser.rawData;
        userInfo = JSON.parse(userInfo);
        data.createrUser.wxInfo = userInfo;
        memos[i] = data;
      }
      var arrays = pageInstance.data.memoList;
      if (!arrays || typeof arrays == 'undefined' || isPullDowm) {
        arrays = new Array();
      }
      arrays = arrays.concat(memos);

      if (typeof arrays == 'undefined' || arrays.length == 0) {
        showEmptyData(pageInstance);
        return;
      }

      pageInstance.setData({
        memoList: arrays
      })
    },
    compelete: function () {
      isRequest = false;
      wx.hideLoading()
      wx.stopPullDownRefresh()
    }
  })
};
Page({
  data: {
    memoList: []
  },
  lookMemo: function (res) {
    wx.navigateTo({
      url: '../memorandumDetail/memorandumDetail?memoId=' + res.currentTarget.dataset.memoId,
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
      success: function (res) {
        console.log(res)
        that.setData({
          winHeight: res.windowHeight * res.pixelRatio
        })
      },
    })
    getMemo(User.Singleton.getInstance().getLoginUserInfo().uid, this);
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('pull --')
    if (isRequest) {
      return;
    }
    mbook = 1;
    isEnd = false;
    isRequest = false;
    isPullDowm = true;
    getMemo(User.Singleton.getInstance().getLoginUserInfo().uid, this);
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  lower: function () {
    isPullDowm = false;
    getMemo(User.Singleton.getInstance().getLoginUserInfo().uid, this);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  publish: function (res) {
    wx.redirectTo({
      url: '../memorandum/memorandum',
    })
  },

})