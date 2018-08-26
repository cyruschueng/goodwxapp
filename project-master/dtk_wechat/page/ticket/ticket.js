var common = require('../../common/common.js');
var util = require('../../common/util.js')
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
    lock: false,
    imgsrc: '../../image/jia.png',
    listBox: true,
    nothing: true,
    // tab切换  
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    defaultHeight: 0,
    datalistAllLength: 0,
    datalistuserLength: 0,
    nothingAll: true
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
  ticketList:function(){
    var _this = this;
    wx.request({
      url: common.getRequestUrl + '/dtk/drafts/sell/user',
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
        if (res.data.code == 'OK') {
          wx.stopPullDownRefresh()
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
            if (page_no == 0) {
              _this.setData({
                nothing: false
              });
            }
          } else if (dataLength > 0) {
            //var msgList = _this.data.msgList;
            //for (var i = 0; i < dataLength; i++) {
            //  msgList.push(res.data.data[i]);
            //}
            var msgList = res.data.data;
            for (var j = 0; j < msgList.length; j++) {
              /*if (msgList[j].draft_status == 0){
                if (msgList[j].draft_type == 1 || msgList[j].draft_type == 3) {
                  msgList[j].cardImage = '../../image/business.png';
                } else {
                  msgList[j].cardImage = '../../image/silver.png';
                }
              }else{
                msgList[j].cardImage = '../../image/yichu.png';
              }*/
              if (msgList[j].draft_type == 1 || msgList[j].draft_type == 3) {
                msgList[j].cardImage = '../../image/silver.png';
              } else {
                msgList[j].cardImage = '../../image/business.png';
              }
              var str = msgList[j].draft_value;
              var s = str.toString();
              if (s.length > 4) {
                msgList[j].draft_value = s.substring(0, s.length - 4)
              } else {
                msgList[j].draft_value = str
              }
              if (msgList[j].draft_value == 0 || msgList[j].draft_value == '不限'){
                msgList[j].draft_value='不限'
              }else{
                msgList[j].draft_value = msgList[j].draft_value
              }
              if (msgList[j].sell_price == 0 || msgList[j].sell_price == '不限') {
                msgList[j].sell_price = '不限'
              } else {
                msgList[j].sell_price = msgList[j].sell_price
              }
              if (msgList[j].acceptance == '') {
                msgList[j].acceptance = '保密'
              }
              msgList[j].update_datetime = msgList[j].update_datetime.substring(0, 10)
            }
            var oldmsgList = _this.data.msgList;
            for (var i = 0; i < dataLength; i++) {
              oldmsgList.push(msgList[i]);
            }

            
            if (page_no == 0) {
              _this.setData({
                datalistuserLength: dataLength,
                msgList: oldmsgList,
                loadingHidden: true,
                nothing: true
              });
            } else {
              _this.setData({
                datalistuserLength: _this.data.datalistuserLength + dataLength,
                msgList: oldmsgList,
                loadingHidden: true,
                nothing: true,
                winHeight: oldmsgList.length * 265
              });
            }
            page_no++;
          }
        } else if (res.data.code == 'TOKEN_INVLID') {
          setTimeout(function () {
            _this.exchangeToken(_this.data.swapstorage, 5)
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
      url: common.getRequestUrl + '/dtk/drafts/sell',
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
        if (res.data.code == 'OK') {
          wx.stopPullDownRefresh()
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
            //var msgList = _this.data.msgAllList;
            //for (var i = 0; i < dataLength; i++) {
            //  msgList.push(res.data.data[i]);
            //}
            var msgList = res.data.data;
            for (var j = 0; j < msgList.length; j++) {
              /*if (msgList[j].draft_status == 0){
                if (msgList[j].draft_type == 1 || msgList[j].draft_type == 3) {
                  msgList[j].cardImage = '../../image/business.png';
                } else {
                  msgList[j].cardImage = '../../image/silver.png';
                }
              }else{
                msgList[j].cardImage = '../../image/yichu.png';
              }*/
              if (msgList[j].draft_type == 1 || msgList[j].draft_type == 3) {
                msgList[j].cardImage = '../../image/silver.png';
              } else {
                msgList[j].cardImage = '../../image/business.png';
              }
              var str = msgList[j].draft_value;
              var s = str.toString();
              console.log(page_noAll)
              if (s.length > 4) {
                msgList[j].draft_value = s.substring(0, s.length - 4)
              } else {
                msgList[j].draft_value = str
              }
              if (msgList[j].draft_value == 0 || msgList[j].draft_value == '不限') {
                msgList[j].draft_value = '不限'
              } else {
                msgList[j].draft_value = msgList[j].draft_value
              }
              if (msgList[j].sell_price == 0 || msgList[j].sell_price == '不限') {
                msgList[j].sell_price = '不限'
              } else {
                msgList[j].sell_price = msgList[j].sell_price
              }
              if (msgList[j].acceptance == '') {
                msgList[j].acceptance = '保密'
              }
              msgList[j].update_datetime = msgList[j].update_datetime.substring(0, 10)
            }
            var oldmsgList = _this.data.msgAllList;
            for (var i = 0; i < dataLength; i++) {
              oldmsgList.push(msgList[i]);
            }
            _this.setData({
              msgAllList: oldmsgList,
              loadingHidden: true,
              nothingAll: true,
              winHeight: oldmsgList.length * 290
            });
            console.log(_this.data.msgAllList)
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
            _this.exchangeToken(_this.data.swapstorage, 5)
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
    setTimeout(function () {
      wx.navigateTo({ url: '../ticketdetail/ticketdetail?id=' + id })
    }, 400);

  },
  touchend: function () {
    if (this.data.lock) {
      setTimeout(() => {
        this.setData({ lock: false });
      }, 100);
    }
  },
  mylongtap: function (event) {
    this.setData({ lock: true });
    var id = event.currentTarget.id;
    var draftstatus = event.currentTarget.dataset.draftstatus;
    if (draftstatus==0){
      this.actionSheetTap(id)
    }
  },
  actionSheetTap: function (id) {
    var _this = this;
    wx.showActionSheet({
      itemList: ['设为已出'],
      success: function (e) {
        if (e.tapIndex == 0){
          _this.goToOver(id)
        }
        
      }
    })
  },
  /* 新增加一笔资金业务 */
  addList: function () {
    wx.navigateTo({
      url: '../ticketadd/ticketadd'
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
    page_no = 0;
    page_noAll = 0;
    this.setData({
      msgList: [],
      msgAllList: [],
      loadingHidden: false,
      listBox: true,
      currentTab:0
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
        common.login(5);
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
    _this.data.msgList = []
    _this.setData({
      //msgList: [],
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
  goToOver: function (id){
    var _this = this;
    var id=id;
    wx.showModal({
      title: '提示',
      content: '票据已出？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: common.getRequestUrl + '/dtk/drafts/sell/' + id+'/complete',
            method: 'PUT',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'token': _this.data.tokenstorage
            },
            success: function (res) {
              wx.showToast({
                title: '成功',
                icon: 'cancel',
                duration: 2000
              })
              //循环找到对应数据，替换对应数据
              var msgList = _this.data.msgList;
              var msgAllList = _this.data.msgAllList;
              for (var i = 0; i < msgList.length; i++) {
                if (_this.data.msgList[i].id == id) {
                  _this.data.msgList[i]['draft_status'] = 1;
                }
              }
              for (var j = 0; j < msgAllList.length; j++) {
                if (_this.data.msgAllList[j].id == id) {
                  _this.data.msgAllList[j]['draft_status'] = 1;
                }
              }
              setTimeout(function () {
                _this.setData({
                  msgList: msgList,
                  msgAllList: msgAllList
                });
              }.bind(this), 500);
            },
            fail: function (err) {
              console.log(err)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
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
          _this.ticketAllList(res.data.token);
        } else if (res.data.code == 'USER_NOT_LOGIN') {
          //app.userLogin(e)
          wx.redirectTo({
            url: '../login/login?id=5'
          })
        } else {
          app.userLogin(e)
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
    var _this = this;
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
          winHeight: that.data.datalistuserLength * 264
        })
      }
    } else if (e.detail.current == 0) {
      if (page_noAll == 0) {
        that.setData({
          winHeight: that.data.defaultHeight
        })
      } else {
        that.setData({
          winHeight: that.data.datalistAllLength * 290
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
            winHeight: that.data.datalistuserLength * 265
          })
        }
      } else if (e.target.dataset.current == 0) {
        if (page_noAll == 0) {
          that.setData({
            winHeight: that.data.defaultHeight
          })
        } else {
          that.setData({
            winHeight: that.data.datalistAllLength * 290
          })
        }
      }
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})