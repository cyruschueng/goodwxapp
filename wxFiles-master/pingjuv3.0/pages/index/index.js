var app = getApp();
Page({
  data: {
    userInfo: {},
    carousel: {},
    so0: 1,
    so1: 0,
    so2: 0,
    so3: 0,
    iconList: [
      { cn: '电影', en: 'movie', url: '/img/movie.png', url1: '/img/movie1.png', color: '#fe4c52' },
      { cn: '旅行', en: 'travel', url: '/img/traval.png', url1: '/img/travel1.png', color: '#41c9a5' },
      { cn: '唱歌', en: 'ktv', url: '/img/ktv.png', url1: '/img/ktv1.png', color: '#feae0f' },
      { cn: '爬山', en: 'climb', url: '/img/climb.png', url1: '/img/climb1.png', color: '#2fbceb' },
      { cn: '运动', en: 'sports', url: '/img/sports.png', url1: '/img/sports1.png', color: '#f68632' },
      { cn: '跑腿', en: 'running', url: '/img/running.png', url1: '/img/running1.png', color: '#3c9edf' },
      { cn: '酒吧', en: 'drink', url: '/img/drink.png', url1: '/img/drink1.png', color: '#ff704b' },
      { cn: '吃饭', en: 'dine', url: '/img/dine.png', url1: '/img/dine1.png', color: '#f76278' },
      { cn: '逛街', en: 'shopping', url: '/img/shopping.png', url1: '/img/shopping1.png', color: '#15c3ba' },
      { cn: '公益', en: 'charity', url: '/img/chrity.png', url1: '/img/chrity1.png', color: '#8fca00' },
    ],
    city: '杭州',
    act: [],
    allpage: 1,
    actpage: 1,
    applypage: 1,
    finishpage: 1,
    all: [],
    apply: [],
    finish: [],
    uid: wx.getStorageSync('userInfo').id
  },
  onShareAppMessage: function () {
    return {
      title: '首页',
      path: '/pages/index/index',
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  },
  changeTap: function (e) {
    var that = this
    var id = e.currentTarget.id;
    if (id == 'so0') {
      this.setData({
        so0: 1,
        so1: 0,
        so2: 0,
        so3: 0,
      })
    } else if (id == 'so1') {
      this.setData({
        so0: 0,
        so1: 1,
        so2: 0,
        so3: 0,
      })
      wx.request({
        url: app.api + 'me/act',
        data: {
          openid: wx.getStorageSync('openid'),
          page: 1,
        },
        method: 'POST',
        header: {
          "Content-Type": "application/json"
        },
        success: function (res) {
          console.log("act----")
          console.log(res)
          wx.hideToast();
          if (res.data.code == 1) {
            if (res.data.data.list != undefined) {
              for(var i=0;i<res.data.data.list.length;i++){
                res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');
        res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');
              }
              that.setData({ act: res.data.data.list, actpage: 1 });
            }
          } else {
            setTimeout(function () {
              wx.hideToast()
            }, 3000);
          }
        },
        fail: function () {
          wx.hideToast();
          wx.showToast({
            title: '发生异常',
            icon: 'success',
            duration: 3000
          });
          setTimeout(function () {
            wx.hideToast()
          }, 3000);
        },
        error: function () {
          wx.hideToast();
          wx.showToast({
            title: '发生异常',
            icon: 'success',
            duration: 3000
          });
          setTimeout(function () {
            wx.hideToast()
          }, 3000);
        }
      });
    } else if (id == 'so2') {
      this.setData({
        so0: 0,
        so1: 0,
        so2: 1,
        so3: 0,
      })
      wx.request({
        url: app.api + 'me/apply',
        data: {
          uid: wx.getStorageSync('userInfo').id,
          page: 1,
        },
        method: 'POST',
        header: {
          "Content-Type": "application/json"
        },
        success: function (res) {
          wx.hideToast();
          console.log('apply----')
          console.log(res)
          if (res.data.code == 1) {
            
            if (res.data.data.list != undefined) {
              for(var i=0;i<res.data.data.list.length;i++){
                res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');
        res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');
              }
              that.setData({ apply: res.data.data.list, applypage: 1 });

            }
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 3000
            });
            setTimeout(function () {
              wx.hideToast()
            }, 3000);
          }
        },
        fail: function () {
          wx.hideToast();
          wx.showToast({
            title: '发生异常',
            icon: 'success',
            duration: 3000
          });
          setTimeout(function () {
            wx.hideToast()
          }, 3000);
        },
        error: function () {
          wx.hideToast();
          wx.showToast({
            title: '发生异常',
            icon: 'success',
            duration: 3000
          });
          setTimeout(function () {
            wx.hideToast()
          }, 3000);
        }
      });
    } else {
      this.setData({
        so0: 0,
        so1: 0,
        so2: 0,
        so3: 1,
      })
      wx.request({
        url: app.api + 'me/finish',
        data: {
          uid: wx.getStorageSync('userInfo').id,
          page: 1,
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Content-Type": "application/json"
        }, // 设置请求的 header
        success: function (res) {
          wx.hideToast();
          console.log('finish----')
          console.log(res)
          if (res.data.code == 1) {
            if (res.data.data.list != undefined) {
              for(var i=0;i<res.data.data.list.length;i++){
                res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');
        res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');
              }
              that.setData({
                finish: res.data.data.list,
                finishpage: 1
              });
            }
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 3000
            });
            setTimeout(function () {
              wx.hideToast()
            }, 3000);
          }
        },
        fail: function () {
          wx.hideToast();
          wx.showToast({
            title: '发生异常',
            icon: 'success',
            duration: 3000
          });
          setTimeout(function () {
            wx.hideToast()
          }, 3000);
        },
        error: function () {
          wx.hideToast();
          wx.showToast({
            title: '发生异常',
            icon: 'success',
            duration: 3000
          });
          setTimeout(function () {
            wx.hideToast()
          }, 3000);
        }
      });
    }
  },
  navToFind: function (e) {
    wx.navigateTo({
      url: '/pages/find/find?aid=' + e.target.dataset.aid + '&uid=' + e.target.dataset.uid
    })
  },
  navToCity: function () {
    wx.navigateTo({
      url: '/pages/city/city?type=index'
    })
  },
  navToDetail: function (e) {
    var types = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/detail/detail?types=' + types + '&id=' + e.currentTarget.dataset.id + '&uid=' + e.currentTarget.dataset.uid,
    })
  },
  navToClassify: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/classify/classify?en=' + e.currentTarget.dataset.en + '&cn=' + e.currentTarget.dataset.cn
    })
  },
  navToSearch: function () {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  navToEvaluate: function (e) {
    wx.navigateTo({
      url: '/pages/evaluate/evaluate?aid=' + e.currentTarget.dataset.aid
    })
  },
  onLoad: function (options) {

  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    this.load();
  },
  load: function () {
    var that = this;
    var tu = wx.getStorageSync('hobby');
    var op = [];
    for (var i = 0; i < tu.length; i++) {
      var sp = '';
      for (var j = 0; j < tu[i].list.length; j++) {
        if (tu[i].list[j].sel == 1) {
          sp = sp + tu[i].list[j].name + '|'
        }
      }
      console.log(sp)
      sp = sp.substr(0, sp.length - 1)
      op.push(sp.split('|'))
    }
    console.log(op)
    wx.request({
      url: app.api + 'arraySearchActs',
      data: {
        city: wx.getStorageSync('city'),
        page: 1,
        sex: op[4],
        age: op[1],
        constellation: op[3],
        marital: op[2],
        expend: op[6],
        budget: op[5],
        general: op[0]
      },
      method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function (res) {
        console.log('-----guolv')
        console.log(res)
        if (res.data.code == 1) {
          for(var i=0;i<res.data.data.list.length;i++){
                res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');
        res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');
              }
          that.setData({
            all: res.data.data.list
          })
        } else {
          that.setData({
            all: [],
            allpage:1
          })
        }
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
    wx.request({
      url: app.api + 'getPic',

      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          carousel: res.data.data
        })
      }
    })
    
    if (that.data.so3 == 1) {
      wx.request({
        url: app.api + 'me/finish',
        data: {
          uid: wx.getStorageSync('userInfo').id,
          page: 1,
        },
        method: 'POST',
        header: {
          "Content-Type": "application/json"
        },
        success: function (res) {
          wx.hideToast();
          console.log('finish----')
          console.log(res)
          if (res.data.code == 1) {
            for(var i=0;i<res.data.data.list.length;i++){
                res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');
        res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');
              }
            if (res.data.data.list != undefined) {
              
                that.setData({ finish: res.data.data.list, finishpage: 1 });
              

            }
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 3000
            });
            setTimeout(function () {
              wx.hideToast()
            }, 3000);
          }
        },
        fail: function () {
          wx.hideToast();
          wx.showToast({
            title: '发生异常',
            icon: 'success',
            duration: 3000
          });
          setTimeout(function () {
            wx.hideToast()
          }, 3000);
        },
        error: function () {
          wx.hideToast();
          wx.showToast({
            title: '发生异常',
            icon: 'success',
            duration: 3000
          });
          setTimeout(function () {
            wx.hideToast()
          }, 3000);
        }
      });
    }

 if (that.data.so1 == 1) {
      wx.request({
        url: app.api + 'me/act',
        data: {
          openid: wx.getStorageSync('openid'),
          page: 1,
        },
        method: 'POST',
        header: {
          "Content-Type": "application/json"
        },
        success: function (res) {
          console.log("act----")
          console.log(res)
          wx.hideToast();
          if (res.data.code == 1) {
            if (res.data.data.list != undefined) {
              for(var i=0;i<res.data.data.list.length;i++){
                res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');
        res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');
              }
              that.setData({ act: res.data.data.list, actpage: 1 });
            }
          } else {
            setTimeout(function () {
              wx.hideToast()
            }, 3000);
          }
        },
        fail: function () {
          wx.hideToast();
          wx.showToast({
            title: '发生异常',
            icon: 'success',
            duration: 3000
          });
          setTimeout(function () {
            wx.hideToast()
          }, 3000);
        },
        error: function () {
          wx.hideToast();
          wx.showToast({
            title: '发生异常',
            icon: 'success',
            duration: 3000
          });
          setTimeout(function () {
            wx.hideToast()
          }, 3000);
        }
      });
    } 

  },
  onReady: function () {
  },
  onShow: function () {
    var that = this;
    var city = wx.getStorageSync('city');
    if (city && city.length > 0) {
      city = city.replace('市', '');
      this.setData({ city: city });
    }
    if (!city) {
      wx.redirectTo({
        url: '/pages/city/city'
      });
    }
    app.getUserInfo();
    that.setData({ userInfo: wx.getStorageSync('userInfo') })
    this.load();
  },
  onHide: function () {
  },
  onUnload: function () {
  },
  onReachBottom: function (e) {
    var c = wx.getStorageSync('city');
    this.setData({ city: c });
    var that = this;
    wx.showToast({
      title: '加载下一页',
      icon: 'loading',
      duration: 1000
    });
    if (that.data.so0 == 1) {
      var tu = wx.getStorageSync('hobby');
      var op = [];
      for (var i = 0; i < tu.length; i++) {
        var sp = '';
        for (var j = 0; j < tu[i].list.length; j++) {
          if (tu[i].list[j].sel == 1) {
            sp = sp + tu[i].list[j].name + '|'
          }
        }
        console.log(sp)
        sp = sp.substr(0, sp.length - 1)
        op.push(sp.split('|'))
      }
      var page = that.data.allpage + 1
      wx.request({
        url: app.api + 'arraySearchActs',
        data: {
          city: wx.getStorageSync('city'),
          page: page,
          sex: op[4],
          age: op[1],
          constellation: op[3],
          marital: op[2],
          expend: op[6],
          budget: op[5],
          general: op[0]
        },
        method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/json'
        }, // 设置请求的 header
        success: function (res) {
          console.log('-----guolv')
          console.log(res)
          if (res.data.code == 1) {
            if (res.data.data.list != undefined) {
              for(var i=0;i<res.data.data.list.length;i++){
                res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');
        res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');
              }
              var l = that.data.all;
              if (res.data.data.list.length > 0) {
                for (var i = 0; i < res.data.data.list.length; i++) {
                  l.push(res.data.data.list[i])
                }
                that.setData({ all: l, allpage: page });
              }

            }
          } else {

            setTimeout(function () {
              wx.hideToast()
            }, 1000);
          }
        },
        fail: function (res) {
          // fail
        },
        complete: function (res) {
          // complete
        }
      })
      
    }
    if (that.data.so1 == 1) {
      var page = that.data.actpage + 1
      wx.request({
        url: app.api + 'me/act',
        data: {
          openid: wx.getStorageSync('openid'),
          page: page,
        },
        method: 'POST',
        header: {
          "Content-Type": "application/json"
        },
        success: function (res) {
          wx.hideToast();
          console.log('act---')
          console.log(res)
          if (res.data.code == 1) {
            if (res.data.data.list != undefined) {
              for(var i=0;i<res.data.data.list.length;i++){
                res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');
        res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');
              }
              var l = that.data.act;
              if (res.data.data.list.length > 0) {
                for (var i = 0; i < res.data.data.list.length; i++) {
                  l.push(res.data.data.list[i])
                }
                that.setData({ act: l, actpage: res.data.data.current_page });
              }

            }
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 3000
            });
            setTimeout(function () {
              wx.hideToast()
            }, 3000);
          }
        },
        fail: function () {
          wx.hideToast();
          wx.showToast({
            title: '发生异常',
            icon: 'success',
            duration: 3000
          });
          setTimeout(function () {
            wx.hideToast()
          }, 3000);
        },
        error: function () {
          wx.hideToast();
          wx.showToast({
            title: '发生异常',
            icon: 'success',
            duration: 3000
          });
          setTimeout(function () {
            wx.hideToast()
          }, 3000);
        }
      });
    }
    if (that.data.so2 == 1) {
      var page = that.data.applypage + 1
      wx.request({
        url: app.api + 'me/apply',
        data: {
          uid: wx.getStorageSync('userInfo').id,
          page: page,
        },
        method: 'POST',
        header: {
          "Content-Type": "application/json"
        },
        success: function (res) {
          wx.hideToast();
          console.log('apply----')
          console.log(res)
          if (res.data.code == 1) {
            if (res.data.data.list != undefined) {
              for(var i=0;i<res.data.data.list.length;i++){
                res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');
        res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');
              }
              var l = that.data.apply;
              if (res.data.data.list.length > 0) {
                for (var i = 0; i < res.data.data.list.length; i++) {
                  l.push(res.data.data.list[i])
                }
                that.setData({ apply: l, applypage: res.data.data.current_page });
              }

            }
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 3000
            });
            setTimeout(function () {
              wx.hideToast()
            }, 3000);
          }
        },
        fail: function () {
          wx.hideToast();
          wx.showToast({
            title: '发生异常',
            icon: 'success',
            duration: 3000
          });
          setTimeout(function () {
            wx.hideToast()
          }, 3000);
        },
        error: function () {
          wx.hideToast();
          wx.showToast({
            title: '发生异常',
            icon: 'success',
            duration: 3000
          });
          setTimeout(function () {
            wx.hideToast()
          }, 3000);
        }
      });
    }

    if (that.data.so3 == 1) {
      var page = that.data.finishpage + 1
      wx.request({
        url: app.api + 'me/finish',
        data: {
          uid: wx.getStorageSync('userInfo').id,
          page: page,
        },
        method: 'POST',
        header: {
          "Content-Type": "application/json"
        },
        success: function (res) {
          wx.hideToast();
          console.log('finish----')
          console.log(res)
          if (res.data.code == 1) {
            if (res.data.data.list != undefined) {
              for(var i=0;i<res.data.data.list.length;i++){
                res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');
        res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');res.data.data.list[i].icon = res.data.data.list[i].icon.replace('\\','');
              }
              var l = that.data.finish;
              if (res.data.data.list.length > 0) {
                for (var i = 0; i < res.data.data.list.length; i++) {
                  l.push(res.data.data.list[i])
                }
                that.setData({ finish: l, finishpage: res.data.data.current_page });
              }

            }
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 3000
            });
            setTimeout(function () {
              wx.hideToast()
            }, 3000);
          }
        },
        fail: function () {
          wx.hideToast();
          wx.showToast({
            title: '发生异常',
            icon: 'success',
            duration: 3000
          });
          setTimeout(function () {
            wx.hideToast()
          }, 3000);
        },
        error: function () {
          wx.hideToast();
          wx.showToast({
            title: '发生异常',
            icon: 'success',
            duration: 3000
          });
          setTimeout(function () {
            wx.hideToast()
          }, 3000);
        }
      });
    }
  }
})