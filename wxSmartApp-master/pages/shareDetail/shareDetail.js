import { goToUser, goToUserList, goToShare, goToNearbyDev, goToMapNav, goToReceiveDev, goToUserInfo, goToPayUseFee, goToShareDetail } from "../../libs/router";
import {
  scansaoma, gofujin, gofenxaing
} from "../../libs/saoma";
//获取应用实例

let app = getApp();
let PATH = app.globalData.PATH;

let IMG_PATH = app.globalData.IMG_PATH;

let userInfoSync = wx.getStorageSync("userInfo");
let pushComment = true;
Page({
  data: {
    IMG_PATH: IMG_PATH,
    content: '',
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    
  },
  //事件处理函数
  onLoad: function (options) {
    console.log(options)
    let that = this;
    getBanner(that);
    if (options.type == 'share') {
        this.setData({
            showGoHomeBtn: true
        });
    } else {
        this.setData({
            showGoHomeBtn: false
        });
    }
    if (options.read_id && options.read_id != 'undefined') {
      wx.request({
        url: PATH + "/resource-service/share/readShareAct",
        header: {
          'Access-Token': app.globalData.accessToken,
        },
        method: "GET",
        data: {
          id: options.read_id
        },
        success: function (res) {
          console.log(res);
        },
      });
    }
    
    that.setData({
      id: options.id,
      source: options.source
    })
    getDetail(that, options.id);
  },
  // 去地图
  goToMap: function () {
    gofujin(app.globalData.location)
  },
  // 触电扫码
  scanCode: function () {
    let that = this;
    scansaoma(app.globalData.userId, goToReceiveDev,PATH)
  },
  // 我的
  goToUser: function () {
    // goToUser();
    wx.reLaunch({
      url:'/pages/user/user'
    })
  },
  // 分享
  goToShare: function () {
    let that = this;
    gofenxaing()

  },
  //首页
  homePage: function () {
    wx.reLaunch({
      url: '/pages/main/main',
    })
  },
  onShow: function () {
    wx.showShareMenu({
      withShareTicket: true,
      success: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },
  bindCallPhone: function (e) {
    wx.showModal({
      title: '提示',
      content: '确定拨打对方的电话吗',
      success: function (res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.phone
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onShareAppMessage: function (res) {
    let that = this;
    that.setData({
        hide: true
    })
    let path_share;
    // if (res.from === 'button') {
    //   // 来自页面内转发按钮
    //   console.log(res.target)
    //   path_share = '/pages/login/login?type=share&id=' + that.data.id
    // } else {
    //     path_share = '/pages/login/login';
    // }
    path_share = '/pages/login/login?type=share&id=' + that.data.id + "&invideCode=" + app.globalData.userId
    return {
      title: '爱心分享图片，轻松月入百万！',
      path: path_share,
      success: function (res) {
        console.log(res);
        // 转发成功
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log(res);
            
          }
        })
      },
      fail: function (res) {
        // 转发失败
      },
      complete: function () {
          that.setData({
              hide: false
          })
      }
    }
  },
  goToMapNav: function (e) {
    // console.log(e);
    if (!e.currentTarget.dataset.lng || e.currentTarget.dataset.lng == '') {
      tipModal('该用户没用共享位置');
      return;
    }
    let mapData = {
      lng: e.currentTarget.dataset.lng,
      lat: e.currentTarget.dataset.lat
    };
    goToMapNav(mapData);
  },
  // 查看图片
  bindLookImage: function () {
    let that = this;
    wx.previewImage({
      urls: [that.data.share.imgUrl]
    })
  },
  // 去用户列表（点赞的列表）
  goToUserList: function () {
    let id = this.data.share.id
    goToUserList(id);
  },
  // 取消关注
  bindDelFollow: function (e) {
    // console.log(e);
    let that = this;
    let followUserId = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '提示',
      content: '确定取消关注该用户吗',
      success: function (res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          wx.request({
            url: PATH + "/resource-service/fans/delFollow",
            header: {
              'Access-Token': app.globalData.accessToken,
            },
            method: "GET",
            data: {
              userId: app.globalData.userId,
              followUserId: followUserId
            },
            success: function (res) {
              // console.log(res);
              if (res.data.status == 200) {
                wx.showToast({
                  title: res.data.message,
                  icon: 'success',
                  duration: 2000,
                  success: function () {
                    getDetail(that);
                  }
                })
              }
            }
          });
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },
  bindFollow: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    if (id == app.globalData.userId) {
      tipModal("不能关注自己");
      return;
    }
    // console.log(id);
    wx.request({
      url: PATH + "/resource-service/fans/follow",
      header: {
        'Access-Token': app.globalData.accessToken,
      },
      method: "GET",
      data: {
        userId: app.globalData.userId,
        followUserId: id 
      },
      success: function (res) {
        // console.log(res);
        if (res.data.status == 200) {
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000,
            success: function () {
              getDetail(that);
            }
          })
        }
        if (res.data.status == 210) {
          wx.showToast({
            title: res.data.message,
            icon: 'loading',
            duration: 2000
          })
        }
      }
    });
  },
  // banner活动导航
  bindGoActive: function (e) {
    let item = e.currentTarget.dataset.item;
    let that = this;
    let active_id = that.data.imgUrls.active_id

    
    //   let index = e.currentTarget.dataset.index;
    //   // item.active_id = e.currentTarget.dataset.index
    //   let imgUrls = this.data.imgUrls
    //   console.log(index)
    //   imgUrls[index].active_id = index
    //   console.log(imgUrls[index].active_id)
    //   wx.request({
    //   url: PATH + "/resource-service//share/getActive",
    //   data: {
    //     id: imgUrls[index].active_id
    //   },
    //   header: {
    //     'Access-Token': app.globalData.accessToken,
    //   },
    //   method: "GET",
    //   success: function(res) {
    //     console.log(res)
    //   },

    // })
    if (active_id != '') {
      wx.navigateTo({
        url: '../activePage/activePage?id=' + active_id+ '&title=' + that.data.imgUrls.titel,
      });
    }
  },
  // 点赞
  bindLike:function () {
    let that = this;
    pushLikeOrContent(that, 1);
  },
  // 取消点赞
  bindUnLike: function () {
    let that = this;
    wx.request({
      url: PATH + '/resource-service/share/deleteActShare',
      method: 'GET',
      header: {
        'Access-Token': app.globalData.accessToken,
      },
      data: {
        userId: app.globalData.userId,
        shareId: that.data.share.id
        // shareActId: 
      },
      //post success
      success: function (res) {
        // console.log(res)
        if (res.statusCode == 200 && res.data.status == 200) {
          wx.showToast({
            title: '已取消点赞',
            icon: 'success',
            duration: 2000,
            success: function () {
              getDetail(that);
            }
          })
        }
      }
    })
  },
  //获取焦点事件
 
  bindContent:function (e) {
    console.log(e)
    let that = this;
    that.setData({
      content: e.detail.value
    })
  },
  bindHome: function (){
      wx.reLaunch({
          url: '../main/main',
      })
  },
  bindPushContent: function () {
    let that = this;
    if (that.data.content == '') {
      tipModal("还没有填写评论");
    }
    pushLikeOrContent(that, 2)
  },
  goToHistoryShare: function () {
    let that = this;
    wx.navigateTo({
      url: '../shareHistory/shareHistory?id=' + that.data.share.userId + '&isNotice=' + that.data.isNotice
    });
  },
  goToShareHistory: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../shareHistory/shareHistory?id=' + id
    });
  }
})

function pushLikeOrContent(that, actType) {
  if (pushComment) {
    pushComment = false;
  } else {
    return;
  }

  let postData = {
    userId: app.globalData.userId,
    shareId: that.data.share.id,
    actType: actType
  }
  if (actType == 2) {
    if (that.data.content == '') {
      return;
    }
    postData.content = that.data.content;
  }
  wx.request({
    url: PATH + '/resource-service/share/actShare',
    method: 'POST',
    header: {
      'Access-Token': app.globalData.accessToken,
    },
    data: postData,
    //post success
    success: function (res) {
      // console.log(res)
      if (res.statusCode == 200 && res.data.status == 200) {
        if (actType == 1) {
          getDetail(that);
          pushComment = true;
        } else {
          wx.showToast({
            title: '发表成功',
            icon: 'success',
            duration: 1500,
            success: function () {
              setTimeout(function () {
                that.setData({
                  content: ''
                });
                getDetail(that);
                pushComment = true;
              }, 1500);
            }
          })
        }
      } else {
        tipModal(res.data.message);
      }
    }
  });
}
function getDetail(that) {
  let id = that.data.id;
  // console.log(id);
  wx.request({
    url: PATH + '/resource-service/share/getShareDetail',
    method: 'GET',
    header: {
      'Access-Token': app.globalData.accessToken,
    },
    data: {
      userId: app.globalData.userId,
      id: id
    },
    //post success
    success: function (res) {
      console.log(res)
      if (res.statusCode == 200 && res.data.status == 200) {
        that.setData({
          share: res.data.result.share,
          commentList: res.data.result.commentList,
          actList: res.data.result.actList,
          isNotice: res.data.result.isNotice,
          isAct: res.data.result.isAct
        });
      } else {
        tipModal(res.data.message);
      }
    }
  })
}
function tipModal(tip) {
  wx.showToast({
    title: tip,
    icon: 'loading',
    duration: 1500
  })
}
// 随机函数
function rand() {
  return Math.floor(Math.random() * (2 - 0 + 1)) + 0;
}
function getBanner(that) {
  wx.request({
    url: PATH + '/resource-service/share/getBanner',
    method: 'get',
    header: {
      'Access-Token': app.globalData.accessToken,
    },
    success: function (res) {
      console.log(res);
      console.log(111)
      let suiji = rand()
      console.log(suiji)

      console.log(111)
      if (res.statusCode == 200 && res.data.status == 200) {
        that.setData({
          imgUrls: res.data.list[suiji]
        });
      }
      console.log(that.data.imgUrls)
    }
  })
}