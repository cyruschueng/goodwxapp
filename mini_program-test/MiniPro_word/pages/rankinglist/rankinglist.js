// rankinglist.js
var util = require('../../utils/util.js');
var app = getApp();
var rankUrl = app.globalData.rankUrl;
var topicUrl = app.globalData.topicUrl;
var rankUrl = app.globalData.rankUrl;
var livesUrl = app.globalData.livesUrl;
var sign_key = app.globalData.sign_key;
var emNum = 0,bTimer,member_id,openid,maxScore,canTap=true;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ranklistdatas: {},
    head_img:'',
    nickname:'',
    maxNum:0,
    groupStatus:true,
    addHeart:false,
    audioSrc:'https://qnfile.abctime.com/pkstart.mp3'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options);
      var that = this;
      if(options.source && parseInt(options.source)==2){
          var gData = JSON.parse(options.rankdata);
          console.log('gD',gData);
          this.setData({groupStatus:true,ranklistdatas:gData||{}});
      }else {
          var user = JSON.parse(wx.getStorageSync('userInfo'));
          this.setData({groupStatus:false,head_img:user.avatarUrl,nickname:user.nickName});
          bTimer = setInterval(function () {
              openid = wx.getStorageSync('openid');
              member_id = wx.getStorageSync('memberId');
              maxScore = wx.getStorageSync('maxScore');
              // if(){}
              if(openid&&member_id){
                  clearInterval(bTimer);
                  that.setData({maxNum:maxScore})
                  that.getRankinglist(openid,member_id);
              }
          },200);
      }
  },
    hideAdd:function () {
        this.setData({addHeart:false})
    },
  toTest:function(){
      if(canTap){
          canTap = false;
          this.audioCtx.play();
          var s = "p1"+sign_key;
          var sign = util.SHA256(s);
          var fd={p:1,sign:sign};
          wx.request({
              url:topicUrl,
              data:fd,
              method:'POST',
              header: {"Content-Type": "application/x-www-form-urlencoded"},
              success:function (res) {
                  console.log('topic',res);
                  if(res.data.code==200){
                      app.globalData.quiz = res.data.data;
                      var data = res.data.data;
                      wx.getImageInfo({
                          src: data[0].title,
                          success:function (re) {
                              wx.navigateTo({
                                  url: '../../pages/test/test'
                              })
                          },
                          fail:function () {
                              wx.navigateTo({
                                  url: '../../pages/test/test'
                              });
                          }
                      })
                  }
              },
              fail:function (res) {
                  console.log(res);
                  canTap = true;
                  wx.showModal({
                      title: '提示',
                      content: '网络情况不好,请检查网络后重新挑战',
                      success: function(res) {
                          if (res.confirm) {
                              wx.navigateBack({
                                  delta: 2
                              })
                          } else if (res.cancel) {
                          }
                      }
                  })
              }
          })
      }
  },
  getRankinglist:function (op,me) {
      var that = this;
      var s = "member_id"+me+"openid"+op+sign_key;
      var sign = util.SHA256(s);
      var fd={member_id:me,openid:op,sign:sign};
      console.log(fd);
      wx.request({
          url:rankUrl,
          data:fd,
          method:'POST',
          header: {"Content-Type": "application/x-www-form-urlencoded"},
          success:function (res) {
              console.log(res)
              console.log('rankList',res.data.data);
              if(res.data.code==200){
                  that.setData({ranklistdatas:res.data.data})
              }
          },
          fail:function (res) {
              console.log(res);
              wx.hideLoading();
              wx.showModal({
                  title: '提示',
                  content: '网络情况不好,请检查网络后重新挑战',
                  success: function(res) {
                      if (res.confirm) {
                          wx.navigateBack({
                              delta: 2
                          })
                      } else if (res.cancel) {
                      }
                  }
              })
          }
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      this.audioCtx = wx.createAudioContext('startAudio');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      canTap = true;
      // this.getRankinglist(openid,member_id);
      wx.showShareMenu({
          withShareTicket: true,
          success: function (res) {
              // 分享成功
              // console.log(JSON.stringify(res))
          },
          fail: function (res) {
              // 分享失败
              // console.log(res)
          }
      });
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
      // console.log('1234hide')
      // wx.reLaunch({
      //     url: '../../pages/index/index'
      // })
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
  onShareAppMessage: function (res) {
      var that = this;
      var path = '/pages/index/index',ss=1;
      var title = '抢词夺礼，测测你在美国读几年级？';
      var imageUrl = '';
      if (res.from === 'button') {
          // 来自页面内转发按钮
          console.log(res.target)
          path = '/pages/index/index?group=1';
          title = '超魔性的单词小游戏，看看你能排第几？';
          imageUrl = '/images/share_rankUrl.png';
          ss=2
      }
      return {
          title: title,
          path: path,
          imageUrl:imageUrl,
          success: function(res) {
              console.log(res);
              // 转发成功
              wx.getShareInfo({
                  shareTicket: res.shareTickets[0],
                  success: function (res) {
                      console.log(ss);
                      // if(ss==1){
                          var n = wx.getStorageSync('lives')+1
                          wx.setStorageSync('lives',n);
                          var s = 'lives1'+'member_id'+member_id+'openid'+openid+'type1'+sign_key;
                          var sign = util.SHA256(s);
                          var fd={lives:1,member_id:member_id,openid:openid,type:1,sign:sign};
                          console.log(fd);
                          wx.request({
                              url:livesUrl,
                              data:fd,
                              method:'POST',
                              header: {"Content-Type": "application/x-www-form-urlencoded"},
                              success:function (res) {
                                  console.log('addLives',res);
                                  if(res.data.code==200){
                                      that.setData({addHeart:true})
                                  }
                              },
                              fail:function (res) {
                                  console.log(res);
                                  wx.hideLoading();
                                  wx.showModal({
                                      title: '提示',
                                      content: '网络情况不好,请检查网络后重新挑战',
                                      success: function(res) {
                                          if (res.confirm) {
                                              wx.navigateBack({
                                                  delta: 2
                                              })
                                          } else if (res.cancel) {
                                          }
                                      }
                                  })
                              }
                          })
                      // }
                  },
                  fail: function (res) { console.log(res) },
                  complete: function (res) { console.log(res) }
              })
          },
          fail: function(res) {
              console.log(res);
          }
      }
  }
})