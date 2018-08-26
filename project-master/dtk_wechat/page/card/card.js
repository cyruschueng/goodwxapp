// list.js
var common = require('../../common/common.js');
var app = getApp();
var page_no = 0;
var page_size = 10;
var page_noAll = 0;
var page_sizeAll = 10;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgList: [],
    msgAllList: [],
    loadingHidden: false,
    tokenstorage: '',
    swapstorage: '',
    imgsrc: '../../image/jia.png',
    cardImage:'../../image/card_left.png',
    lock: false,
    listBox: true,
    nothing: true,
    nothingAll: true,
    // tab切换  
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    defaultHeight: 0,
    datalistAllLength: 0,
    datalistuserLength: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page_no = 0;
    page_noAll = 0;
    this.setData({
      msgList: [],
      msgAllList: []
    })
    var _this = this;
    wx.getStorage({
      key: 'tokenstorage',
      success: function (res) {
        _this.setData({
          tokenstorage: res.data
        })
      },
      fail: function (res) {
        _this.setData({
          tokenstorage: ''
        })
      }
    })
    //获取storage的swap
    wx.getStorage({
      key: 'swapstorage',
      success: function (res) {
        _this.setData({
          swapstorage: res.data,
        })
      }
    })
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight+100,
          defaultHeight: res.windowHeight
        });
      }
    });
  },
  ticketList: function () {
    var _this = this;
    wx.request({
      url: common.getRequestUrl + '/dtk/advertisements/user',
      data: {
        'page_size': page_size,
        'page_no': page_no
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': this.data.tokenstorage
      },
      success: function (res) {
        wx.stopPullDownRefresh()
        if (res.data.code == 'OK') {
          var dataLength = res.data.data.length;
          _this.setData({
            loadingHidden: true,
            listBox: false
          });
          if (dataLength <= '0') {
            wx.showToast({
              title: '没有数据了',
              duration: 2000
            })
            if (page_no==0){
              _this.setData({
                nothing: false
              });
            }
          } else if (dataLength > 0) {
            var msgList = _this.data.msgList;
            for (var i = 0; i < dataLength; i++) {
              msgList.push(res.data.data[i]);
            }
            for (var j = 0; j < msgList.length; j++) {
              var str = msgList[j].update_datetime;
              var s = str.toString();
              msgList[j].update_datetime = s.substring(0, 10)
            }
            if (page_no == 0) {
              _this.setData({
                datalistuserLength: dataLength,
                msgList: msgList,
                loadingHidden: true,
                nothing: true,
              });
            } else {
              _this.setData({
                datalistuserLength: _this.data.datalistuserLength + dataLength,
                msgList: msgList,
                loadingHidden: true,
                nothing: true,
                winHeight: msgList.length * 195
              });
              console.log(_this.data.datalistuserLength)
            }
            page_no++;
          }
        } else if (res.data.code == 'TOKEN_INVLID') {
          setTimeout(function () {
            _this.exchangeToken(_this.data.swapstorage, 1)
          }.bind(this), 200);
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../index/index'
            })
          }.bind(this), 500);
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  ticketAllList: function () {
    var _this = this;
    wx.request({
      url: common.getRequestUrl + '/dtk/advertisements/open',
      data: {
        'page_size': page_sizeAll,
        'page_no': page_noAll
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': this.data.tokenstorage
      },
      success: function (res) {
        wx.stopPullDownRefresh()
        if (res.data.code == 'OK') {
          var dataLength = res.data.data.length;
          _this.setData({
            loadingHidden: true,
            listBox: false
          });
          if (dataLength <= '0') {
            wx.showToast({
              title: '没有数据了',
              duration: 2000
            })
            if (page_noAll == 0) {
              _this.setData({
                nothingAll: false
              });
            }
          } else if (dataLength > 0) {
            var msgList = _this.data.msgAllList;
            for (var i = 0; i < dataLength; i++) {
              msgList.push(res.data.data[i]);
            }
            for (var j = 0; j < msgList.length; j++) {
              var str = msgList[j].update_datetime;
              var s = str.toString();
              msgList[j].update_datetime = s.substring(0, 10)
            }  
            _this.setData({
              msgAllList: msgList,
              loadingHidden: true,
              nothingAll: true,
              winHeight: msgList.length * 195
            });
            if (page_noAll == 0) {
              _this.setData({
                datalistAllLength: dataLength
              });
            } else {
              _this.setData({
                datalistAllLength: _this.data.datalistAllLength + dataLength
              });
            }
            page_noAll++;
          }
        } else if (res.data.code == 'TOKEN_INVLID') {
          setTimeout(function () {
            _this.exchangeToken(_this.data.swapstorage, 1)
          }.bind(this), 200);
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../index/index'
            })
          }.bind(this), 500);
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  listClick: function (event) {
    if (this.data.lock) {
      return;
    }
    var id = event.currentTarget.id;
    wx.navigateTo({ url: '../carddetail/carddetail?id=' + id })
  },
  touchend: function () {
    if (this.data.lock) {
      setTimeout(() => {
        this.setData({ lock: false });
      }, 100);
    }
  },
  mylongtap: function (event){
    this.setData({ lock: true });
    var id = event.currentTarget.id;
    var adstatus = event.currentTarget.dataset.adstatus;
    if (adstatus !== 0) {
      this.actionSheetTap(id)
    }
  },
  actionSheetTap: function (id) {
    var _this=this;
    wx.showActionSheet({
      itemList: ['修改', '删除'],
      success: function (e) {
        if (e.tapIndex==0){
          _this.editCard(id)
        } else if (e.tapIndex == 1){
          _this.goTodeleteCard(id)
        }
        console.log(e.tapIndex + '-----' + id)
      }
    })
  },
  /* 新增加一笔资金业务 */
  addList: function () {
    wx.navigateTo({
      url: '../cardadd/cardadd'
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
    var _this = this;
    page_no = 0;
    page_noAll = 0;
    _this.setData({
      msgList: [],
      msgAllList: [],
      loadingHidden: false,
      listBox: true,
      currentTab: 0
    })
    var _this = this;
    //获取storage的token
    wx.getStorage({
      key: 'tokenstorage',
      success: function (res) {
        _this.setData({
          tokenstorage: res.data
        })
        _this.ticketList(res.data)
        _this.ticketAllList(res.data)
      },
      fail: function (res) {
        common.login(1);
        _this.setData({
          tokenstorage: '',
          loadingHidden: true
        })
      }
    })
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
    page_no = 0;
    page_noAll = 0;
    var _this = this;
    _this.setData({
      msgList: [],
      loadingHidden: false
    });
    if (_this.data.tokenstorage !== '') {
      _this.ticketList(_this.data.tokenstorage)
    } else {
      _this.setData({
        loadingHidden: true
      });
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var _this = this;
    _this.setData({
      loadingHidden: false
    });
    if (_this.data.tokenstorage !== '') {
      if (_this.data.currentTab == 0) {
        _this.ticketAllList(_this.data.tokenstorage)
      } else {
        _this.ticketList(_this.data.tokenstorage)
      }
    } else {
      _this.setData({
        loadingHidden: true
      });
    }
  },

  editCard: function (id) {
    var _this = this;
    wx.navigateTo({ url: '../cardadd/cardadd?id=' + id })
  },
  goTodeleteCard: function (id) {
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '是否删除该业务推广',
      success: function (res) {
        if (res.confirm) {
          _this.deleteCard(id)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  deleteCard: function (e) {
    var _this = this;
    wx.request({
      url: common.getRequestUrl + '/dtk/advertisements/' + e,
      method: 'DELETE',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': _this.data.tokenstorage
      },
      success: function (res) {
        if (res.data.code == 'OK') {
          wx.showToast({
            title: '删除成功',
            icon: 'cancel',
            duration: 1000
          })
          page_no = 0;

          //循环找到对应数据，替换对应数据
          var msgList = _this.data.msgList;
          var msgAllList = _this.data.msgAllList;
          for (var i = 0; i < msgList.length; i++) {
            if (_this.data.msgList[i].id == e) {
              _this.data.msgList[i]['ad_status'] = 0;
            }
          }
          for (var j = 0; j < msgAllList.length; j++) {
            if (_this.data.msgAllList[j].id == e) {
              _this.data.msgAllList[j]['ad_status'] = 0;
            }
          }
          setTimeout(function () {
            _this.setData({
              msgList: msgList,
              msgAllList: msgAllList
            });
          }.bind(this), 500);

        } else if (res.data.code == 'TOKEN_INVLID') {
          _this.exchangeToken(_this.data.swapstorage, 1)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'cancel',
            duration: 1000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../index/index'
            })
          }.bind(this), 500);
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  /**
   * 用户点击右上角分享
   
  onShareAppMessage: function () {

  }*/
  //换取 token
  exchangeToken: function (swap, e) {
    console.log('换取 token:' + swap);
    var _this = this;
    wx.request({
      url: common.getRequestUrl + '/dtk/users/token',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'swap': swap
      },
      success: function (res) {
        if (res.data.code == 'OK') {
          wx.setStorageSync('tokenstorage', res.data.token)
          _this.setData({
            tokenstorage: res.data.token
          })
          _this.ticketList(res.data.token);
        } else if (res.data.code == 'USER_NOT_LOGIN') {
          //app.userLogin(e)
          wx.redirectTo({
            url: '../login/login?id=1'
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'cancel',
            duration: 2000
          })
          try {
            wx.setStorageSync('tokenstorage', '');
            wx.setStorageSync('swapstorage', '')
            wx.setStorageSync('myData', '')
            wx.setStorageSync('avatarInfo', '')
            _this.setData({
              tokenstorage: '',
              swapstorage: '',
              myData: '',
              srcavatar: '../../image/m.png'
            })
          } catch (e) {
          }
          setTimeout(function () {
            wx.switchTab({
              url: '../index/index'
            })
          }.bind(this), 500);
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })

  },
  onforwarding: function () {
    var _this=this;
    _this.setData({
      listBox: false
    });
  },
  /** 
    * 滑动切换tab 
  */
  bindChange: function (e) {
    var that = this;
    if (e.detail.current == 1) {
      if (page_no == 0) {
        that.setData({
          winHeight: that.data.defaultHeight
        })
      } else {
        that.setData({
          winHeight: that.data.datalistuserLength * 195
        })
      }
    } else if (e.detail.current == 0) {
      if (page_noAll == 0) {
        that.setData({
          winHeight: that.data.defaultHeight
        })
      } else {
        that.setData({
          winHeight: that.data.datalistAllLength * 195
        })
      }
    }
    that.setData({ currentTab: e.detail.current });
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      if (e.target.dataset.current == 1) {
        if (page_no == 0) {
          that.setData({
            winHeight: that.data.defaultHeight
          })
        } else {
          that.setData({
            winHeight: that.data.datalistuserLength * 195
          })
        }
      } else if (e.target.dataset.current == 0) {
        if (page_noAll == 0) {
          that.setData({
            winHeight: that.data.defaultHeight
          })
        } else {
          that.setData({
            winHeight: that.data.datalistAllLength * 195
          })
        }
      }
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})