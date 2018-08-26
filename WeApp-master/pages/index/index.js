//index.js
var util = require('../../utils/util.js');
var app = getApp();
const URL = "https://xcx.toupaiyule.com";


var pageObject = {};
pageObject.data = {
  // page
  winWidth: 0,
  winHeight: 0,
  // tab switch
  currentTab: 1,
  // tips info
  defaultLoadContent: '数据加载完成.',

  // star data
  starsList: [],
  top3Stars: [],
  otherStars: [],
  starCategories: ["全部", "男明星", "女明星"],
  starTypeIndex: 0,
  currentTitle: '', // current title for the user&star

  // wh data
  whCategories: ["全部", "男网红", "女网红"],
  whTypeIndex: 0,
  whsList: [],
  numWH: 0,
  // user data
  everStarnames: [],
  everStarContris: [],
  everStarIndex: 0,
  supportersList: [],

  // current user info
  userInfo: {},
  openid: null,
  hasUserInfo: false,
  canIUse: wx.canIUse('button.open-type.getUserInfo'),
};

pageObject.onLoad = function () {
  // wx.showShareMenu({
  //   withShareTicket: true,
  //   success: function (res) {
  //     wx.showToast({
  //       title: '转发成功',
  //       icon: 'success',
  //       duration: 2000
  //     });
  //   },
  //   fail: function (res) {
  //     wx.showToast({
  //       title: '转发失败',
  //       image: '../images/error.png',
  //       icon: 'success',
  //       duration: 2000
  //     });
  //   }
  // })

  // get userinfo
  if (app.globalData.userInfo) {
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
    });
    // this.checkUser(this.data.userInfo);
  } else if (this.data.canIUse) {
    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    // 所以此处加入 callback 以防止这种情况
    app.userInfoReadyCallback = res => {
      this.setData({
        userInfo: res.userInfo,
        hasUserInfo: true
      });
      // this.checkUser(this.data.userInfo);
    }
  } else {
    // 在没有 open-type=getUserInfo 版本的兼容处理
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
        // this.checkUser(this.data.userInfo);
      }
    });
  }

  // get sys info
  var that = this;
  // 获取系统信息 
  wx.getSystemInfo({
    success: function (res) {
      that.setData({
        winWidth: res.windowWidth,
        winHeight: res.windowHeight
      });
    }
  });
  if (that.data.openid == null) {
    app.getOpenid(function (openid) {
      that.setData({
        openid: openid
      });
      that.checkUser(that.data.userInfo);
    });
  }

};
// end onLoad

// page actions
pageObject.onShareAppMessage = function () {
  return {
    title: '头牌娱乐小程序',
    path: '/pages/index/index',
    success: function (res) {
      wx.showToast({
        title: '转发成功',
        icon: 'success',
        duration: 2000
      });
      // Get the share inticket
      wx.getShareInfo({
        shareTicket: res.shareTickets[0],
        success: function (res) { console.log(res) },
        fail: function (res) { console.log(res) }
      })
    },
    fail: function (res) {
      wx.showToast({
        title: '转发失败',
        image: '../images/error.png',
        icon: 'success',
        duration: 2000
      });
    }
  }
},

  // 滑动切换tab 
  pageObject.bindChange = function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
    if (e.detail.current == 2) {
      that.getSupporters(function (data) {
        for (let d of data) {
          if (d.openid == app.globalData.openid) {
            that.setData({
              currentTitle: d.title,
              supportersList: data
            });
          }
        }
      });
    }
  };
// 点击tab切换 
pageObject.swichNav = function (e) {
  var that = this;
  if (this.data.currentTab === e.target.dataset.current) {
    return false;
  } else {
    if (e.detail.current == 2) {
      that.getSupporters(function (data) {
        for (let d of data) {
          if (d.openid == app.globalData.openid) {
            that.setData({
              currentTitle: d.title,
              supportersList: data
            });
          }
        }
      });
    }
    that.setData({
      currentTab: e.target.dataset.current
    })
  }
};
// refresh
pageObject.onPullDownRefresh = function () {
  this.pullUpdateFlowerRankList();
};
pageObject.pullUpdateFlowerRankList = function () {
  var that = this;
  wx.showNavigationBarLoading();
  // refresh star page
  if (that.data.currentTab == 1) {
    if (that.data.starTypeIndex == 0) {
      that.getAllStars(function (data) {
        var top3Stars = data.slice(0, 3);
        var otherStars = data.slice(3);
        that.setData({
          starsList: data,
          top3Stars: top3Stars,
          otherStars: otherStars
        });
      });
    } else if (that.data.starTypeIndex == 1) {
      that.getMaleStars(function (data) {
        var top3Stars = data.slice(0, 3);
        var otherStars = data.slice(3);
        that.setData({
          starsList: data,
          top3Stars: top3Stars,
          otherStars: otherStars
        });
      });
    } else {
      that.getFemaleStars(function (data) {
        var top3Stars = data.slice(0, 3);
        var otherStars = data.slice(3);
        that.setData({
          starsList: data,
          top3Stars: top3Stars,
          otherStars: otherStars
        });
      });
    }
  } else if (that.data.currentTab == 0) {
    // refresh wanghong page
    if (that.data.whTypeIndex == 0) {
      that.getAllWHs(function (data, num) {
        that.setData({
          numWH: num,
          whsList: data
        });
      });
    } else if (that.data.whTypeIndex == 1) {
      that.getMaleWHs(function (data, num) {
        that.setData({
          numWH: num,
          whsList: data
        });
      });
    } else {
      that.getFemaleWHs(function (data, num) {
        that.setData({
          numWH: num,
          whsList: data
        });
      });
    }
  }
  that.getEverStars(function (starnames, contris) {
    that.setData({
      everStarnames: starnames,
      everStarContris: contris
    });
  });
  wx.stopPullDownRefresh();
  setTimeout(function () {
    wx.hideNavigationBarLoading();
  }, 1000);
  // that.getAllStars(function (data) {
  //   var top3Stars = data.slice(0, 3);
  //   var otherStars = data.slice(3);
  //   that.setData({
  //     starsList: data,
  //     top3Stars: top3Stars,
  //     otherStars: otherStars
  //   });
  //   that.getAllWHs(function (data, num) {
  //     that.setData({
  //       numWH: num,
  //       whsList: data
  //     });
  //   });
  //   wx.stopPullDownRefresh();
  //   setTimeout(function () {
  //     wx.hideNavigationBarLoading();
  //   }, 1000);
  // });
};
//上滑加载更多
// onReachBottom: function (e) {
//   var that = this;
//   var mainRankList = that.data.mainRankList;
//   var updateFlowerData = that.data.flowerData;
//   if (updateFlowerData.has_more == 0) {
//     console.log("已经没有更多数据.");
//   } else {
//     that.loadMoreRankInfo(function (data) {
//       //
//       var newmainRankList = mainRankList.concat(data.flower_list);

//       updateFlowerData['last_id'] = data.last_id;
//       updateFlowerData['has_more'] = data.has_more;
//       that.setData({
//         mainRankList: newmainRankList,
//         flowerData: updateFlowerData
//       });
//     });
//   }
// },
pageObject.loadMoreRankInfo = function (cal) {
  var that = this;
  util.JFrequest({
    url: 'https://t.superabc.cn/c/os/reading/getflowerranklist',
    param: {
      last_id: that.data.flowerData.last_id
    },
    success: function (res) {
      if (res && res.statusCode == 200 && res.data && res.data.code == 0) {
        if (typeof cal == 'function') {
          cal(res.data.data);
        }
      } else {
        console.log("请求数据失败，读取缓存");
        //
      }
    }
  });
};

// User operations
pageObject.getUserInfo = function (e) {
  app.globalData.userInfo = e.detail.userInfo;
  this.setData({
    userInfo: e.detail.userInfo,
    hasUserInfo: true
  });
  var that = this;
  that.getAllStars(function (data) {
    var top3Stars = data.slice(0, 3);
    var otherStars = data.slice(3);
    that.setData({
      starsList: data,
      top3Stars: top3Stars,
      otherStars: otherStars
    });
  });
};

pageObject.getSupporters = function (cal) {
  var starname = this.data.everStarnames[this.data.everStarIndex];
  if (app.globalData.userInfo != null) {
    wx.request({
      url: URL + '/stars/getSupporters/' + starname,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (typeof cal == 'function') {
          cal(res.data.data);
        }
      }
    });
  }
};

pageObject.everStarChange = function (e) {
  this.setData({
    everStarIndex: e.detail.value
  });
  var that = this;
  // get user's rank with the star
};


// Star operations
// run after the user log in to the app
// Get different type of stars with the picker
pageObject.starTypeChange = function (e) {
  this.setData({
    starTypeIndex: e.detail.value
  });
  var that = this;
  if (e.detail.value == 0) {
    that.getAllStars(function (data) {
      var top3Stars = data.slice(0, 3);
      var otherStars = data.slice(3);
      that.setData({
        starsList: data,
        top3Stars: top3Stars,
        otherStars: otherStars
      });
    });
  } else if (e.detail.value == 1) {
    that.getMaleStars(function (data) {
      var top3Stars = data.slice(0, 3);
      var otherStars = data.slice(3);
      that.setData({
        starsList: data,
        top3Stars: top3Stars,
        otherStars: otherStars
      });
    });
  } else {
    that.getFemaleStars(function (data) {
      var top3Stars = data.slice(0, 3);
      var otherStars = data.slice(3);
      that.setData({
        starsList: data,
        top3Stars: top3Stars,
        otherStars: otherStars
      });
    });
  }
};

pageObject.unflowerStar = function (e) {
  var that = this;
  wx.request({
    url: URL + '/stars/unflowerStar',
    data: {
      openid: app.globalData.openid,
      username: app.globalData.userInfo.nickName,
      starname: e.currentTarget.dataset.name
    },
    method: 'POST',
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      wx.showToast({
        title: res.data.msg,
        icon: 'success',
        duration: 2000
      });
      if (res.data.success) {
        that.pullUpdateFlowerRankList();
      }
    }
  });
},
  pageObject.flowerStar = function (e) {
    var that = this;
    wx.request({
      url: URL + '/stars/flowerStar',
      data: {
        openid: app.globalData.openid,
        username: app.globalData.userInfo.nickName,
        avatar: app.globalData.userInfo.avatarUrl,
        starname: e.currentTarget.dataset.name
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          duration: 1000
        });
        if (res.data.success) {
          that.pullUpdateFlowerRankList();
        }
      }
    });
  },

  pageObject.checkUser = function (userInfo) {
    var that = this;
    var oid = that.data.openid;
    wx.request({
      url: URL + '/users/exists/' + oid,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (!res.data.exists) {
          // if not, create a user
          wx.request(
            {
              url: URL + '/users/createUser',
              method: 'POST',
              data: {
                openid: oid,
                username: userInfo.nickName,
                avatar: userInfo.avatarUrl
              },
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                console.log(res.data.msg);
                // get all stars

                that.getAllStars(function (data) {
                  var top3Stars = data.slice(0, 3);
                  var otherStars = data.slice(3);
                  that.setData({
                    starsList: data,
                    top3Stars: top3Stars,
                    otherStars: otherStars
                  });
                });
                that.getAllWHs(function (data, num) {
                  that.setData({
                    numWH: num,
                    whsList: data
                  });
                });
                that.getEverStars(function (starnames, contris) {
                  that.setData({
                    everStarnames: starnames,
                    everStarContris: contris
                  }, function () {
                    // console.log('CCCCCCC');
                    // callback not work
                    // that.getSupporters(function (data) {
                    //   for (let d of data) {
                    //     if (d.openid == app.globalData.openid) {
                    //       that.setData({
                    //         currentTitle: d.title,
                    //         supportersList: data
                    //       });
                    //     }
                    //   }
                    // });
                  });
                });
              }
            });
        } else {

          // if yes, nothing
          wx.showToast({
            title: '欢迎回来!',
            icon: 'success',
            duration: 1000
          });
          console.log('欢迎回来' + userInfo.nickName);
          // get all stars
          that.getAllWHs(function (data, num) {
            that.setData({
              numWH: num,
              whsList: data
            });
          });
          that.getEverStars(function (starnames, contris) {
            that.setData({
              everStarnames: starnames,
              everStarContris: contris
            });
          });
          that.getAllStars(function (data) {
            var top3Stars = data.slice(0, 3);
            var otherStars = data.slice(3);
            that.setData({
              starsList: data,
              top3Stars: top3Stars,
              otherStars: otherStars
            });
          });
        }
      }
    });
  };

pageObject.getEverStars = function (cal) {
  if (app.globalData.userInfo != null) {
    wx.request({
      url: URL + '/users/getEverStars/' + app.globalData.openid,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (typeof cal == 'function') {
          cal(res.data.starnames, res.data.contributions);
        }
      }
    });
  }
};
pageObject.getAllStars = function (cal) {
  if (app.globalData.userInfo != null) {
    wx.request({
      url: URL + '/stars/getAllStars/' + app.globalData.openid,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (typeof cal == 'function') {
          cal(res.data.data);
        }
      }
    });
  }
};
pageObject.getMaleStars = function (cal) {
  wx.request({
    url: URL + '/stars/getMaleStars/' + app.globalData.openid,
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (typeof cal == 'function') {
        cal(res.data.data);
      }
    }
  });
};
pageObject.getFemaleStars = function (cal) {
  wx.request({
    url: URL + '/stars/getFemaleStars/' + app.globalData.openid,
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (typeof cal == 'function') {
        cal(res.data.data);
      }
    }
  });
};

// pageObject.init = function () {
//   wx.request({
//     url: URL + '/stars/init',
//     method: 'GET',
//     header: {
//       'content-type': 'application/json'
//     },
//     success: function (res) {
//       console.log(res.data.msg);
//     }
//   });
// }


// WH operations
pageObject.addWH = function (e) {
  wx.navigateTo({
    url: '../addWH/addWH'
  });
};

pageObject.whTypeChange = function (e) {
  this.setData({
    whTypeIndex: e.detail.value
  });
  var that = this;
  if (e.detail.value == 0) {
    that.getAllWHs(function (data, num) {
      that.setData({
        numWH: num,
        whsList: data
      });
    });
  } else if (e.detail.value == 1) {
    that.getMaleWHs(function (data, num) {
      that.setData({
        numWH: num,
        whsList: data
      });
    });
  } else {
    that.getFemaleWHs(function (data, num) {
      that.setData({
        numWH: num,
        whsList: data
      });
    });
  }
};

pageObject.getAllWHs = function (cal) {
  if (app.globalData.userInfo != null) {
    wx.request({
      url: URL + '/wanghong/getAllWHs/' + app.globalData.openid,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (typeof cal == 'function') {
          cal(res.data.data, res.data.num);
        }
      }
    });
  }
};
pageObject.getMaleWHs = function (cal) {
  wx.request({
    url: URL + '/wanghong/getMaleWHs/' + app.globalData.openid,
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (typeof cal == 'function') {
        cal(res.data.data, res.data.num);
      }
    }
  });
};
pageObject.getFemaleWHs = function (cal) {
  wx.request({
    url: URL + '/wanghong/getFemaleWHs/' + app.globalData.openid,
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (typeof cal == 'function') {
        cal(res.data.data, res.data.num);
      }
    }
  });
};

pageObject.unflowerWH = function (e) {
  var that = this;
  wx.request({
    url: URL + '/wanghong/unflowerWH',
    data: {
      openid: app.globalData.openid,
      username: app.globalData.userInfo.nickName,
      whname: e.currentTarget.dataset.name
    },
    method: 'POST',
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      wx.showToast({
        title: res.data.msg,
        icon: 'success',
        duration: 2000
      });
      if (res.data.success) {
        that.pullUpdateFlowerRankList();
      }
    }
  });
};
pageObject.flowerWH = function (e) {
  var that = this;
  wx.request({
    url: URL + '/wanghong/flowerWH',
    data: {
      openid: app.globalData.openid,
      username: app.globalData.userInfo.nickName,
      whname: e.currentTarget.dataset.name
    },
    method: 'POST',
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      wx.showToast({
        title: res.data.msg,
        icon: 'success',
        duration: 1000
      });
      if (res.data.success) {
        that.pullUpdateFlowerRankList();
      }
    }
  });
};


Page(pageObject)