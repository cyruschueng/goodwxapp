// pages/crxk/crxk.js
var Ranks = new Array();//用于给data里的rank[]赋值操作
var that;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    brand: '',
    model: '',
    platform: '',
    system: '',
    version: '',
    phones: [
      {
        avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoPp3vDwNyHRBemcwyViab3lvXahriae9Ljr9jct9avHxGrWx6A110vxanYfuK4FONgfW18dPewaR8Q/0",
        userName:'灿若星空',
        model:'iponeXX'

      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    //获取当前手机信息
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          brand: res.brand,
          model: res.model,
          platform: res.platform,
          system: res.system,
          version: res.version
        })
      }
    })
    //微信登录
    wx.login({
      success: function (res) {
        wx.showLoading({
          title: '加载中~',
        })
        getInfo(res.code)
      }
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
    wx.showShareMenu({
      withShareTicket: true
    });
    return {
      title: '来看看你朋友们都用什么手机',
      //可以定义路径，就是用户点开后显示的页面
      path: '/pages/crxk/crxk',
      success: function (res) {
        //转发成功后的shareTickets
        console.log(res.shareTickets[0])
        if (res.shareTickets[0] != null) {
          wx.showToast({
            title: '转发成功',
          })
          //发送并接受信息
          postMassage(res.shareTickets[0])
          //显示排行榜
          that.setData({
            text_show: 'none',
            rank_show: 'block'
          });
        } else {
          wx.showToast({
            title: '获取群信息失败',
          })
        }
      }
    }
  }
})

function getInfo(code) {
  wx.getUserInfo({
    withCredentials: true,
    success: function (res) {
      console.log(res.userInfo);
      wx.request({
        url: 'https://w.appudid.cn/xcx/Userinfo',
        method: 'POST',
        data: {
          code: code,
          userName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl,
          gender: res.userInfo.gender
        },
        success: function (res) {
          if (app.globalData.openId == null) {
            wx.showModal({
              title: '获取信息失败',
              content: '服务器开小差了~等会再来吧',
            })
          }
          console.log('从服务器获取的openID等数据')
          console.log(res.data)
          wx.hideLoading()
        },
        fail: function () {
          wx.showToast({
            title: '网络错误，请稍后重试',
            icon: 'loading'
          })
        }
      })
    },
    fail: function () {
      wx.showModal({
        title: '提示',
        content: '您必须授权信息后才能查看排名信息哦',
        cancelText: '取消',
        confirmText: '授权',
        success: function (res) {
          if (res.confirm) {
            wx.openSetting({
              success: function (res) {
                if (res.authSetting["scope.userInfo"] == true) {
                  console.log('重新授权成功')
                  wx.getUserInfo({
                    withCredentials: false,
                    success: function (res) {
                      wx.request({
                        url: 'https://w.appudid.cn/xcx/Userinfo',
                        method: 'POST',
                        data: {
                          code: code,
                          userName: res.userInfo.nickName,
                          avatarUrl: res.userInfo.avatarUrl,
                          gender: res.userInfo.gender
                        },
                        success: function (res) {
                        },
                        fail: function () {
                          wx.showToast({
                            title: '网络错误，请稍后重试',
                            icon: 'loading'
                          })
                        }
                      })
                    }
                  })
                }
              }
            })
          }
        }
      })
    }
  })
}

function postMassage(st) {
  console.log(st);
  var iv;
  var encryptedData;
  wx.getShareInfo({
    shareTicket: st,
    success: function (res) {
      console.log(res)
      wx.request({
        url: 'https://w.appudid.cn/xcx/qunid/',
        method: 'POST',
        data: {
          openId: openId,
          session_key: session_key,
          iv: res.iv,
          encryptedData: res.encryptedData
        },
        success: function (res) {
          wx.hideLoading();
          if (res.data.code == '0000') {
            wx.showToast({
              title: '网络故障，请退出重试',
              icon: 'loading'
            })
          }
          console.log(res.data)
          handleJson(res.data)
          //返回一个数组，数组里面包裹着对象，按照体质分数排名
          //每个对象包含
          //头像 昵称 体质得分 性别 点赞数目 心是亮的还是灰色的 
        }
      })
    }
  })
}

function handleJson(json) {
  //首先清空数组
  //Ranks.length = 0;这个不管用
  Ranks.splice(0, Ranks.length);
  for (var key in json) {
    var rank_item = new Object()
    if (json[key].is_exist == 0) {
      that.setData({
        test_show: 'block'
      })
    }
    that.setData({
      Gid: json[key].qopenid
    })
    rank_item.avatarUrl = json[key].avatarUrl;
    rank_item.userName = json[key].username;
    rank_item.body_score = json[key].score;
    rank_item.thumbs_up_count = json[key].zan;
    rank_item.openId = json[key].openid;
    rank_item.is_zan = 0;
    if (json[key].zan < 1) {
      rank_item.heart_src = '/img/my_body/rank/heart.png';
    } else {
      rank_item.heart_src = '/img/my_body/rank/heart-active.png'
    }
    if (json[key].gender == 0) {
      rank_item.sex_src = '/img/my_body/rank/woman.png';
    } else {
      rank_item.sex_src = '/img/my_body/rank/man.png';
    }
    //把遍历结果放到数组
    Ranks.push(rank_item)
  }
  that.setData({
    rank: Ranks
  })
  console.log(Ranks)
}
