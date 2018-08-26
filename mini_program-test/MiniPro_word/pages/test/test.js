var util = require('../../utils/util.js');
const app = getApp();
// var scoreUrl = app.globalData.scoreUrl;
var sign_key = app.globalData.sign_key;
var topicUrl = app.globalData.topicUrl;
var scoreUrl = app.globalData.scoreUrl;
var livesUrl = app.globalData.livesUrl;
var page = 0,openid='',member_id,bTimer,liveUsed=false;
var score;
var count = 5,time,markArray=[false,false,false],_that;
var start_time,canTap=true;
var countdown = function (that,flag) {
  clearTimeout(time);
  if(flag){
    return;
  }
    time = setTimeout(function(){
            // console.log('time---')
            that.setData({
                second: second - 10
            });
            countdown(that);
        }
    ,100)
    var second = that.data.second;
    if (second == 0) {
        that.setData({count:0});
        countdown(that,1);
        if(that.data.heartNum>0&&!liveUsed){
            liveUsed = true;
            that.setData({second:500});
            that.setData({heartConStatus:true});
            var n = that.data.heartNum-1;
            that.setData({heartNum:n,second:500,count:5})
            wx.setStorageSync('lives',n);
            that.audioCtx.play();
            setTimeout(function () {
                that.setData({heartConStatus:false});
                page++;
                markArray=[false,false,false];
                that.setData({markArr:markArray,page:page});
                countdown(that);
            },1200);
        }else {
            that.audioCtx2.play();
            if(page>wx.getStorageSync('maxScore')){
                wx.setStorageSync('maxScore',page);
            }
          var end_time = new Date().getTime();
          var duration = end_time - start_time;
          that.setData({second:500});
            if(page>0){
                var s = "duration"+duration+"member_id"+member_id+"openid"+openid+"score"+page+sign_key;
                var sign = util.SHA256(s);
                var fd={duration:duration,member_id:member_id,openid:openid,score:page,sign:sign};
                console.log(fd);
                wx.request({
                    url:scoreUrl,
                    data:fd,
                    method:'POST',
                    header: {"Content-Type": "application/x-www-form-urlencoded"},
                    success:function (res) {
                        console.log('scoreRes',res);
                        if(res.data.code==200){
                            setTimeout(function () {
                                wx.redirectTo({
                                    url: '../../pages/result/result?num='+page,
                                });
                            },1000)
                        };
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
            }else {
                setTimeout(function () {
                    wx.redirectTo({
                        url: '../../pages/result/result?num='+page,
                    });
                },1000)
            }
        }
    }else if(second%100==0) {
      if(second==400){
              that.setData({count:4});
      }else if(second==300){
          that.setData({count:3});
      }else if(second==200){
          that.setData({count:2});
      }else if(second==100){
          that.setData({count:1});
      }
  }

};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:page,
    second:500,
    count:5,
    quiz:[],
    timeArr:[],
    flagStatus:false,
    heartConStatus:false,
    heartNum:0,
    markArr:[false,false,false],
    reviveSrc:'https://qnfile.abctime.com/revive.mp3',
    rightSrc:'https://qnfile.abctime.com/rightWord.mp3',
    wrongSrc:'https://qnfile.abctime.com/wrongWord.mp3'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.hideShareMenu();
    let userInfo = wx.getStorageSync('userInfo');
    var that = this;
    _that = this;
    bTimer = setInterval(function () {
      var lives = wx.getStorageSync('lives');
      if(lives === 0||lives>0){
          clearInterval(bTimer);
          that.setData({heartNum:lives});
          openid=wx.getStorageSync('openid');
          member_id=wx.getStorageSync('memberId');
      }
    },200);
    start_time = new Date().getTime();
    page = 0;
    this.setData({page:page});
    let app = getApp();
    this.setData({quiz:app.globalData.quiz});
  },
  check_ans:function (e) {
      console.log(e);
      console.log(canTap);
      if(canTap){
          canTap = false
      }else {
          return;
      }
    var i = e.currentTarget.dataset.index;
      markArray[i]=true;
    this.setData({markArr:markArray});
    console.log(i);
      // return;
    var end_time = new Date().getTime();
    var duration = end_time - start_time;
    var flag = e.currentTarget.dataset.flag;
    var title = e.currentTarget.dataset.title;
    var word = e.currentTarget.dataset.word;
    var that = this;
    if(flag){
        page++;
        this.audioCtx1.play();
        if(page==80){
            this.getTopic(2);
        }else if(page==180){
            this.getTopic(3);
        }else if(page==280){
            this.getTopic(4);
        }else if(page==380){
            this.getTopic(5);
        }else if(page==500){
            wx.setStorageSync('maxScore',500);
            setTimeout(function () {
                wx.redirectTo({
                    url: '../../pages/result/result?num='+500,
                });
            },1000);
            var s = "duration"+duration+"member_id"+member_id+"openid"+openid+"score"+500+sign_key;
            var sign = util.SHA256(s);
            var fd={duration:duration,member_id:member_id,openid:openid,score:500,sign:sign};
            console.log(fd);
            wx.request({
                url:scoreUrl,
                data:fd,
                method:'POST',
                header: {"Content-Type": "application/x-www-form-urlencoded"},
                success:function (res) {
                    console.log('scoreRes',res);
                    if(res.data.code==200){
                        setTimeout(function () {
                            wx.redirectTo({
                                url: '../../pages/result/result?num='+page,
                            });
                        },1000)
                    };
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
        }
        markArray=[false,false,false];
        this.setData({count:5,markArr:markArray,page:page,second:500});
        canTap = true;
        countdown(this);
    }else {
        console.log('resultNum',page);
        if(this.data.heartNum>0&&!liveUsed){
            console.log('used');
            liveUsed = true;
            this.setData({heartConStatus:true});
            var n = that.data.heartNum-1
            that.setData({heartNum:n})
            wx.setStorageSync('lives',n);
            countdown(this,1);
            this.audioCtx.play();
            setTimeout(function () {
                that.setData({heartConStatus:false});
                page++;
                markArray=[false,false,false];
                that.setData({count:5,markArr:markArray,page:page,second:500});
                canTap = true;
                countdown(that);
            },1200);
        }else {
            this.audioCtx2.play();
            if(page>wx.getStorageSync('maxScore')){
                wx.setStorageSync('maxScore',page);
            }
            markArray=[false,false,false];
            that.setData({markArr:markArray})
            countdown(this,1);
            this.setData({second:500});
            if(page>0){
                var s = "duration"+duration+"member_id"+member_id+"openid"+openid+"score"+page+sign_key;
                var sign = util.SHA256(s);
                var fd={duration:duration,member_id:member_id,openid:openid,score:page,sign:sign};
                console.log(fd);
                wx.request({
                    url:scoreUrl,
                    data:fd,
                    method:'POST',
                    header: {"Content-Type": "application/x-www-form-urlencoded"},
                    success:function (res) {
                        console.log('scoreRes',res);
                        if(res.data.code==200){
                            setTimeout(function () {
                                wx.redirectTo({
                                    url: '../../pages/result/result?num='+page,
                                });
                            },1000)
                        };
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
            }else {
                setTimeout(function () {
                    wx.redirectTo({
                        url: '../../pages/result/result?num='+page,
                    });
                },1000)
            }

        }
    }
  },
  getTopic:function (p) {
      var s = "p"+p+sign_key;
      var sign = util.SHA256(s);
      var fd={p:p,sign:sign};
      var that = this;
      wx.request({
          url:topicUrl,
          data:fd,
          method:'POST',
          header: {"Content-Type": "application/x-www-form-urlencoded"},
          success:function (res) {
              if(res.data.code==200){
                  that.setData({quiz:that.data.quiz.concat(res.data.data)})
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
      this.audioCtx = wx.createAudioContext('reviveAudio');
      this.audioCtx1 = wx.createAudioContext('rightAudio');
      this.audioCtx2 = wx.createAudioContext('wrongAudio');
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      canTap = true;
      markArray=[false,false,false];
    liveUsed = false;
    //++++
    countdown(this);
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
      countdown(this,1);
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
  // onShareAppMessage: function (res) {
  //     countdown(this,1);
  //     var that = this;
  //     if (res.from === 'button') {
  //         // 来自页面内转发按钮
  //         console.log(res.target)
  //     }
  //     return {
  //         title: '看看你能排第几',
  //         path: '/pages/index/index?id=123',
  //         success: function(res) {
  //             console.log(res);
  //             var n = that.data.heartNum+1
  //             that.setData({heartNum:n})
  //             wx.setStorageSync('lives',n);
  //             countdown(that);
  //             var s = 'lives1'+'member_id'+member_id+'openid'+openid+'type1'+sign_key;
  //             var sign = util.SHA256(s);
  //             var fd={lives:1,member_id:member_id,openid:openid,type:1,sign:sign};
  //             console.log(fd);
  //             wx.request({
  //                 url:livesUrl,
  //                 data:fd,
  //                 method:'POST',
  //                 header: {"Content-Type": "application/x-www-form-urlencoded"},
  //                 success:function (res) {
  //                     console.log('addLives',res);
  //                     if(res.data.code==200){
  //
  //                     }
  //                 },
  //                 fail:function (res) {
  //                     console.log(res);
  //                     wx.hideLoading();
  //                     wx.showModal({
  //                         title: '提示',
  //                         content: '网络情况不好,请检查网络后重新挑战',
  //                         success: function(res) {
  //                             if (res.confirm) {
  //                                 wx.navigateBack({
  //                                     delta: 2
  //                                 })
  //                             } else if (res.cancel) {
  //                             }
  //                         }
  //                     })
  //                 }
  //             })
  //             // 转发成功
  //             // wx.getShareInfo({
  //             //     shareTicket: res.shareTickets[0],
  //             //     success: function (res) {
  //             //         console.log(res);
  //             //
  //             //     },
  //             //     fail: function (res) { console.log(res) },
  //             //     complete: function (res) { console.log(res) }
  //             // })
  //         },
  //         fail: function(res) {
  //             console.log(res);
  //         }
  //     }
  // }
})