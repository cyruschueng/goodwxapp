var app = getApp()
Page({
  data: {
    thisid: false,
    titleLabel: ['距离萍聚开始', '萍聚已开始', '萍聚已成功'],
    titleFlag: 0,
    iconList: [
      { cn: '电影', en: 'movie', url: '/img/movie1.png', color: '#fe4c52' },
      { cn: '旅行', en: 'travel', url: '/img/travel1.png', color: '#41c9a5' },
      { cn: '唱歌', en: 'ktv', url: '/img/ktv1.png', color: '#feae0f' },
      { cn: '爬山', en: 'climb', url: '/img/climb1.png', color: '#2fbceb' },
      { cn: '运动', en: 'sports', url: '/img/sports1.png', color: '#f68632' },
      { cn: '跑腿', en: 'running', url: '/img/running1.png', color: '#3c9edf' },
      { cn: '酒吧', en: 'drink', url: '/img/drink1.png', color: '#ff704b' },
      { cn: '吃饭', en: 'dine', url: '/img/dine1.png', color: '#f76278' },
      { cn: '逛街', en: 'shopping', url: '/img/shopping1.png', color: '#15c3ba' },
      { cn: '公益', en: 'chrity', url: '/img/chrity1.png', color: '#8fca00' },
    ],
    show: true,
    showTxt: '收起萍聚详情',
    drop: ['/img/dropdown.png', '/img/up_d.png'],
    msglist: [
      { url: '/img/d1.png', value: '2017-25-56 09:12' },
      { url: '/img/d2.png', value: '那你就开始是的' },
      { url: '/img/d3.png', value: '1000-5000元 AA' },
      { url: '/img/d4.png', value: '约一人 女' },
      { url: '/img/d5.png', value: '看电视剧分不开了山东矿机分克里斯考虑到就是老师的快乐圣诞节快乐圣诞节卡萨丁' },
    ],
    types: '',
    pjmsg: {},
    girl: [],
    boy: [],
    actFlag: [1, 0, 0, 0],
    gbl: [],
    id: 0,
    uid: 0,
    aid: wx.getStorageSync('userInfo').id
  },
  agreeBind: function (e) {
    var Id = e.currentTarget.id;
    var that = this;
    console.log("参数： " + that.data.aid + ":" + that.data.id + ":" + Id)
    wx.request({
      url: app.api + 'audit',
      data: {
        uid: that.data.aid,
        id: that.data.id,
        mid: Id,
        audit: '1'
      },
      method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/json"
      }, // 设置请求的 header
      success: function (res) {
        console.log("ssssss")
        console.log(res)
        if (res.data.code == 1) {
          wx.redirectTo({
            url: '/pages/detail/detail?types=meact&id=' + that.data.id + '&uid=' + that.data.uid

          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'success'
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

  },
  deletepj: function (e) {
    var Id = e.currentTarget.id;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定删除？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.api + 'delact',
            data: {
              id: Id,
              uid: wx.getStorageSync('userInfo').id
            },
            method: 'post',
            header: {
              "Content-Type": "application/json"
            }, // 设置请求的 header
            success: function (res) {
              if (res.data.code == 1) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                })
                wx.switchTab({
                  url: '/pages/index/index',
                  success: function (res) {
                    console.log(res)
                  },

                })
              }
            },
            fail: function (res) {
              wx.showToast({
                title: '删除失败',
                icon: 'success',
                duration: 2000
              })
            },
            complete: function (res) {
              // complete
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  changeActTap: function (e) {
    var af = this.data.actFlag;
    for (var i = 0; i < af.length; i++) {
      af[i] = 0
    }
    af[e.currentTarget.dataset.set] = 1
    this.setData({
      actFlag: af
    })
  },
  showDetail: function () {
    if (this.data.show == true) {
      this.setData({ show: false, showTxt: '展开萍聚详情' })
    } else {
      this.setData({ show: true, showTxt: '收起萍聚详情' })
    }
  },
  phoneCall: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.number
    })
  },
  delBtn: function () {
    wx.showModal({
      title: '提示',
      content: '确定要删除？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  navToFinduser: function (e) {
    wx.navigateTo({
      url: '/pages/finduser/finduser?uid=' + e.currentTarget.dataset.uid+'&audit='+e.currentTarget.dataset.audit
    })
  },
  onLoad: function (options) {
    var that = this
      that.setData({ types: options.types, id: options.id, uid: options.uid })
  },
  onShareAppMessage: function () {
    var that = this
    return {
      title: '萍聚',
      path: '/pages/detail/detail?types=taact&id='+that.data.id+'&uid='+that.data.uid,
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
      }
    }
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    var that = this
    wx.request({
      url: app.api + 'me/apply' + that.data.aid,
      data: {
      },
      method: 'get',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log("-------quxiao")
        console.log(res)

      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })

    wx.request({
      url: app.api + 'act/' + that.data.id,
      data: {},
      method: 'get',
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function (res) {
        console.log("------meact");
        console.log(res)
        res.data.data.icon = res.data.data.icon.replace('\\','');
        res.data.data.icon = res.data.data.icon.replace('\\','');
        res.data.data.icon = res.data.data.icon.replace('\\','');
        res.data.data.icon = res.data.data.icon.replace('\\','');
        res.data.data.icon = res.data.data.icon.replace('\\','');
        res.data.data.icon = res.data.data.icon.replace('\\','');
        that.setData({
          pjmsg: res.data.data,
        });
        var los = that.data.msglist;
        los[0].value = res.data.data.open_date + ' ' + res.data.data.open_time
        los[1].value = res.data.data.city + ' ' + res.data.data.address
        los[2].value = res.data.data.budget + ' ' + res.data.data.expend_title
        los[3].value = '约' + res.data.data.num + '人 ' + res.data.data.sex_limit_title
        los[4].value = res.data.data.des
        that.setData({
          msglist: los,
          uid: res.data.data.uid
        });
        wx.request({
          url: app.api + 'me/act/apply',
          data: {
            id: res.data.data.id,
            sex: 1
          },
          method: 'post',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log("------member");
            console.log(res);
            
            if (res.data.code == 1) {
            
              for (var i = 0; i < res.data.data.list.length; i++) {
                res.data.data.list[i].avatar = res.data.data.list[i].avatar.replace('\\','');
        res.data.data.list[i].avatar = res.data.data.list[i].avatar.replace('\\','');
        res.data.data.list[i].avatar = res.data.data.list[i].avatar.replace('\\','');
        res.data.data.list[i].avatar = res.data.data.list[i].avatar.replace('\\','');
        res.data.data.list[i].avatar = res.data.data.list[i].avatar.replace('\\','');
                if (res.data.data.list[i].uid == wx.getStorageSync('userInfo').id) {
                  that.setData({
                    thisid: true,
                  });
                }
              }
              that.setData({
                girl: res.data.data.list,
              });
            }
          },
        })
        wx.request({
          url: app.api + 'me/act/apply',
          data: {
            id: that.data.id,
            sex: 2
          },
          method: 'post',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log("------member");
            console.log(res);
            if (res.data.code == 1) {
              
              for (var i = 0; i < res.data.data.list.length; i++) {
                res.data.data.list[i].avatar = res.data.data.list[i].avatar.replace('\\','');
        res.data.data.list[i].avatar = res.data.data.list[i].avatar.replace('\\','');
        res.data.data.list[i].avatar = res.data.data.list[i].avatar.replace('\\','');
        res.data.data.list[i].avatar = res.data.data.list[i].avatar.replace('\\','');
        res.data.data.list[i].avatar = res.data.data.list[i].avatar.replace('\\','');
                if (res.data.data.list[i].uid == wx.getStorageSync('userInfo').id) {
                  
                  that.setData({
                    thisid: true,
                  });
                }
              }
              that.setData({
                boy: res.data.data.list,
              });

            }
          },
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    });
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  backApply: function (e) {
    console.log(e.currentTarget.dataset.aid + "---" + e.currentTarget.dataset.uid)
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要取消吗？\n取消了就不能报名了哦！',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.api + 'audit',
            data: {
              uid: that.data.uid,
              id: that.data.id,
              mid: that.data.aid,
              audit: '2'
            },
            method: 'post',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log("click naoming");
              console.log(res);
              if (res.data.code == 1) {
                wx.showToast({
                  title: '取消成功',
                  icon: 'success',
                  duration: 2000
                })
                wx.redirectTo({
                  url: '/pages/detail/detail?types=taact&id=' + that.data.id + '&uid=' + that.data.uid

                })
              }




            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  joinBtnOnClick: function () {
    var that = this;
    if (wx.getStorageSync('userInfo') == null) {
      wx.showModal({
        title: '您还没有注册哦',
        content: '是否前往注册',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/own/own?types=detail'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    if (wx.getStorageSync('userInfo').mobile == null || wx.getStorageSync('userInfo').mobile == '') {
      wx.showModal({
        title: '您还没有填写手机号',
        content: '前往完善信息',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/own/own?types=detail'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    wx.request({
      url: app.api + 'apply',
      data: {
        id: that.data.id,
        uid: wx.getStorageSync('userInfo').id,
        openid: wx.getStorageSync('userInfo').openid
      },
      method: 'post',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("click naoming");
        console.log(res);
        if (res.data.code == 1) {
          wx.showToast({
            title: '报名成功',
            icon: 'success',
            duration: 2000
          })
          wx.redirectTo({
            url: '/pages/detail/detail?types=taact&id=' + that.data.id + '&uid=' + that.data.uid

          })
        }




      }
    })

  },
  addToBook: function (e) {
    wx.showModal({
      title: '提示',
      content: '确定要添加到通讯录？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.api + 'me/postMBook',
            data: {
              uid: wx.getStorageSync('userInfo').id,
              fid: e.currentTarget.dataset.uid
            },
            method: 'post',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              if (res.data.code == 1) {
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 2000
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})