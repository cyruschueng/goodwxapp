// pages/addsOver/addsOver.js
let utils = require('../../utils/util.js');
Page({
  data: {
    logo:'',
    avatar: '',
    nickName:'',
    title:'',
    describe:'',
    result:false,
    total:0,
    time:'',
    num:0,
    endTime:'',
    isUser:false,
    is_anony: 1,
    is_open: 1,
    has_correct: 2,
    is_limit:0,
    id:'',
    is_relay:'',
    is_push:'',
    limit_time:'',
    is_answer:-1,
    code:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    wx.showShareMenu({
      withShareTicket: true //要求小程序返回分享目标信息
    });
    var that = this;
    console.log(options.id);
    that.setData({
      id: options.id
    });
    console.log(wx.getStorageSync('uid'));
    if (wx.getStorageSync('uid') == '' || wx.getStorageSync('token')==''){
      console.log('go');
      // getApp().userLogin();
      wx.reLaunch({
        url: '/pages/addsOver/addsOver?id='+that.data.id,
      });
      console.log(wx.getStorageSync('uid'));
    }else{
      wx.request({
        url: getApp().appApi.getUserInfoAPI,
        data: {
          id: wx.getStorageSync('uid')
        },
        dataType: 'json',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'token': wx.getStorageSync('token'),
          'uid': wx.getStorageSync('uid')
        },
        success: function (res) {
          console.log(res);
          console.log(res.data.result.item.department);
          console.log(res.data.result.item.username);
          if (res.data.result.item.department == null || res.data.result.item.username == null || res.data.result.item.department == "" || res.data.result.item.username == "") {
            wx.reLaunch({
              url: '/pages/user/user?key=2&id=' + options.id,
            })
            // wx.showModal({
            //   title: '温馨提示！',
            //   content: '创建问卷前必须完善用户信息，是否完善？',
            //   success: function (res) {
            //     if (res.confirm) {
                 
            //     } else if (res.cancel) {
            //       wx.reLaunch({
            //         url: '/pages/addsOver/addsOver?id=' + options.id,
            //       })
            //     }
            //   }
            // })
          }
        }
      });
      wx.request({
        url: getApp().appApi.getInfoAPI,
        data: {
          id: options.id,
          uid: wx.getStorageSync('uid')
        },
        dataType: 'json',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'token': wx.getStorageSync('token'),
          'uid': wx.getStorageSync('uid')
        },
        success: function (res) {
          if (res.data.code == 1001) {
            getApp().userLogin();
          }
          if (res.data.code != 200) {
            wx.showModal({
              title: '请求失败！',
              content: res.data.msg,
              showCancel: false
            })
          } else {
            console.log(res.data);
            that.setData({
              code: res.data.code
            });
            if (res.data.result.item.if_answer == 1) {
              that.setData({
                result: true
              })
            } else {
              that.setData({
                result: false
              })
            }
            if (res.data.result.item.has_correct == 1) {
              wx.setStorageSync('answer', true)
            } else {
              wx.setStorageSync('answer', false)
            }
            that.setData({
              logo: res.data.result.item.img,
              title: res.data.result.item.title,
              describe: res.data.result.item.describe,
              num: res.data.result.item.join_total,
              is_open: res.data.result.item.is_open,
              has_correct: res.data.result.item.has_correct,
              is_anony: res.data.result.item.is_anony,
              is_push: res.data.result.item.is_push,
              time: res.data.result.item.add_time,
              is_limit: res.data.result.item.is_limit,
              endTime: utils.formatDate(parseInt(res.data.result.item.limit_time) * 1000),
              total: res.data.result.item.option_total,
              is_relay: res.data.result.item.is_relay,
              limit_time: parseInt(res.data.result.item.limit_time) * 1000,
              avatar: res.data.result.item.avatar ? res.data.result.item.avatar : getApp().globalData.default_avatar,
              nickName: res.data.result.item.nickname
            });

            try {
              var ui = wx.getStorageSync('uid');
              console.log('用户' + ui);
              if (!ui) {
                getApp().userLogin();
                wx.reLaunch({
                  url: '/pages/addsOver/addsOver?id=' + that.dataset.id,
                })
              } else {
                if (ui == res.data.result.item.uid) {
                  that.setData({
                    isUser: false
                  });
                  wx.showShareMenu({

                  });
                } else {
                  that.setData({
                    isUser: true
                  });
                  if (res.data.result.item.is_relay == 1) {
                    wx.hideShareMenu({
                    })
                  } else {
                    wx.showShareMenu({
                    });
                  }
                }
              }
            } catch (e) {

            }
            // wx.request({
            //   url: getApp().appApi.getUserInfoAPI,
            //   data: {
            //     id: res.data.result.item.uid
            //   },
            //   dataType: 'json',
            //   method: 'POST',
            //   header: {
            //     'content-type': 'application/x-www-form-urlencoded',
            //     'token': wx.getStorageSync('token'),
            //     'uid': wx.getStorageSync('uid')
            //   },
            //   success: function (res) {
            //     console.log(res);
            //     wx.showModal({
            //       title: '33',
            //       content: res.data.result.item.uid+'==='+res,
            //     })
            //     if (res.data.code != 200) {
            //       wx.showModal({
            //         title: '请求失败！',
            //         content: res.data.msg,
            //         showCancel: false
            //       })
            //     } else { 
            //     that.setData({
            //       avatar: res.data.result.item.avatar ? res.data.result.item.avatar : getApp().globalData.default_avatar,
            //       nickName: res.data.result.item.nickname
            //     });
            //     }
            //   }
            // })
          }
        }
      });
    }
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
    // wx.showModal({
    //   title: '',
    //   content: wx.getStorageSync('token'),
    // });
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
  edits:function(){
    var that = this;
    wx.reLaunch({
      url: '/pages/eidtAnswer/eidtAnswer?id='+that.data.id,
    })
  },
  warn:function(){
    var that = this;
    let reportList = ['广告或垃圾信息', '抄袭或未授权转载', '其他'];
    wx.showActionSheet({
      itemList: ['广告或垃圾信息', '抄袭或未授权转载', '其他'],
      success: function (res) {
        console.log(res);
        console.log(wx.getStorageSync('uid'));
        if (parseInt(res.tapIndex)>=0) {console.log('go');
          wx.request({
            url: getApp().appApi.complainAPI,
            data: {
              uid: wx.getStorageSync('uid'),
              question_id: that.data.id
            },
            dataType: 'json',
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'token': wx.getStorageSync('token'),
              'uid': wx.getStorageSync('uid')
            },
            success: function (res) {
              console.log(res);
              if (res.data.code != 200) {
                wx.showModal({
                  title: '请求失败！',
                  content: res.data.msg,
                  showCancel: false
                })
              } else {
                wx.showToast({
                  title: '举报成功',
                  icon: 'success',
                  duration: 1000
                });
              }
            }
          });
        }

      },
      fail: function (res) {
        console.log(res.errMsg);
      }
    })
  },
  one:function(){
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  two: function () {
    wx.switchTab({
      url: '/pages/list/list'
    })
  },
  thr: function () {
    wx.switchTab({
      url: '/pages/profile/profile'
    })
  },
  bigImg:function(){
    var imgurl = this.data.logo;
    wx.previewImage({
      current: imgurl, // 当前显示图片的http链接
      urls: [imgurl] // 需要预览的图片http链接列表
    })
  },
  checkTime:function(){
    var that = this;
    if ((that.data.is_limit == 1)&&(that.data.limit_time-new Date().getTime()>0)){
      if (that.data.limit_time - new Date().getTime()<=5*60*1000){
        wx.showModal({
          title: '温馨提示！',
          content: '答题还剩时间：' + utils.durationFormat(that.data.limit_time - new Date().getTime()) +',是否回答?',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/answer/answer?id=' + that.data.id,
              })
            } else if (res.cancel) {
            }
          }
        });
      }else{
        wx.navigateTo({
          url: '/pages/answer/answer?id=' + that.data.id,
        })
      }
    } else if ((that.data.is_limit == 1) && (that.data.limit_time - new Date().getTime() <= 0)){
      wx.showModal({
        title: '非常抱歉，答题时间已过！',
        content: '',
        showCancel:false
      });
    } else if (that.data.is_limit == 2){
      wx.navigateTo({
        url: '/pages/answer/answer?id=' + that.data.id,
      })
    }
  },
  am: function () {
    var that = this;
    wx.reLaunch({
      url: '/pages/addsOver/addsOver?id='+that.data.id,
    })
  },
  onShareAppMessage() {
    var that = this;
    return {
      title: '分享',
      path: '/pages/addsOver/addsOver?id=' + that.data.id,
      success(res) {
        wx.showModal({
          title: '',
          content: res.shareTickets[0],
        })
        console.log(res.shareTickets[0]) ;
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          complete(res) {
            console.log(res)
          }
        })
      }
    }
  }
})