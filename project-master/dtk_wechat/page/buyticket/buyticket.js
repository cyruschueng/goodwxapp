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
    loadingHidden: false,
    tokenstorage: '',
    swapstorage: '',
    lock: false,
    imgsrc: '../../image/jia.png',
    listBox: true,
    nothing: true,
    nothingAll: true,
    // tab切换  
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    defaultHeight: 0,
    datalistAllLength: 0,
    datalistuserLength: 0,
    msgAllList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page_no = 0;
    page_noAll=0;
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
  ticketList: function (e) {
    var _this = this;
    wx.request({
      url: common.getRequestUrl + '/dtk/drafts/buy/user',
      data: {
        'page_size': page_size,
        'page_no': page_no
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': e
      },
      success: function (res) {
        if (res.data.code == 'OK') {
          wx.stopPullDownRefresh()
          var dataLength = res.data.data.length;
          _this.setData({
            loadingHidden: true,
            listBox: false
          });
          if (dataLength <= 0) {
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
            var msgListuser = _this.data.msgList;
            var msgList = res.data.data;
            /*for (var i = 0; i < dataLength; i++) {
              msgList.push(res.data.data[i]);
            }*/
            for (var j = 0; j < msgList.length; j++) {
              if (msgList[j].draft_type == 1) {
                msgList[j].draft_type = '纸票 / 电票';
              } else if (msgList[j].draft_type == 2) {
                msgList[j].draft_type = '纸票';
              } else if (msgList[j].draft_type == 3) {
                msgList[j].draft_type = '电票';
              }
              
              for (var k = 0; k < msgList[j].draft_term.length; k++){
                if (msgList[j].draft_term[k] == 1){
                  msgList[j].draft_term[k] ='不限'
                } else if (msgList[j].draft_term[k] == 2){
                  msgList[j].draft_term[k] = '1'
                } else if (msgList[j].draft_term[k] == 3) {
                  msgList[j].draft_term[k] = '3'
                } else if (msgList[j].draft_term[k] == 4) {
                  msgList[j].draft_term[k] = '6'
                } else if (msgList[j].draft_term[k] == 5) {
                  msgList[j].draft_term[k] = '12'
                }
              }
              for (var z = 0; z < msgList[j].acceptance_type.length; z++) {
                if (msgList[j].acceptance_type[z] == 1) {
                  msgList[j].acceptance_type[z] = '不限'
                } else if (msgList[j].acceptance_type[z] == 2) {
                  msgList[j].acceptance_type[z] = '大商'
                } else if (msgList[j].acceptance_type[z] == 3) {
                  msgList[j].acceptance_type[z] = '国股'
                } else if (msgList[j].acceptance_type[z] == 4) {
                  msgList[j].acceptance_type[z] = '城商'
                } else if (msgList[j].acceptance_type[z] == 5) {
                  msgList[j].acceptance_type[z] = '农商'
                } else if (msgList[j].acceptance_type[z] == 6) {
                  msgList[j].acceptance_type[z] = '农信'
                } else if (msgList[j].acceptance_type[z] == 7) {
                  msgList[j].acceptance_type[z] = '财司'
                }
              }
              var draft_term = msgList[j].draft_term.sort(_this.sortNumber);
              var acceptance_type = msgList[j].acceptance_type;
              msgList[j].draft_term = draft_term.join(' / ')
              msgList[j].acceptance_type = acceptance_type.join(' / ')
              msgList[j].update_datetime = msgList[j].update_datetime.substring(0, 10)
              msgListuser.push(msgList[j]);
              
            }
            if (page_no == 0) {
              _this.setData({
                datalistuserLength: dataLength,
                msgList: msgListuser,
                loadingHidden: true,
                nothing: true
              });
            } else {
              _this.setData({
                datalistuserLength: _this.data.datalistuserLength + dataLength,
                msgList: msgListuser,
                loadingHidden: true,
                nothing: true,
                winHeight: msgListuser.length * 220
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
  //我的收票------全部
  ticketAllList: function (e) {
    var _this = this;
    wx.request({
      url: common.getRequestUrl + '/dtk/drafts/buy',
      data: {
        'page_size': page_sizeAll,
        'page_no': page_noAll
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': e
      },
      success: function (res) {
        if (res.data.code == 'OK') {
          wx.stopPullDownRefresh()
          var dataLength = res.data.data.length;
          _this.setData({
            loadingHidden: true,
            listBox: false
          });
          if (dataLength <= 0) {
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
            var msgAllList = _this.data.msgAllList;
            var msgList = res.data.data;

            for (var j = 0; j < msgList.length; j++) {
              if (msgList[j].draft_type == 1) {
                msgList[j].draft_type = '纸票 / 电票';
              } else if (msgList[j].draft_type == 2) {
                msgList[j].draft_type = '纸票';
              } else if (msgList[j].draft_type == 3) {
                msgList[j].draft_type = '电票';
              }

              for (var k = 0; k < msgList[j].draft_term.length; k++) {
                if (msgList[j].draft_term[k] == 1) {
                  msgList[j].draft_term[k] = '不限'
                } else if (msgList[j].draft_term[k] == 2) {
                  msgList[j].draft_term[k] = '1'
                } else if (msgList[j].draft_term[k] == 3) {
                  msgList[j].draft_term[k] = '3'
                } else if (msgList[j].draft_term[k] == 4) {
                  msgList[j].draft_term[k] = '6'
                } else if (msgList[j].draft_term[k] == 5) {
                  msgList[j].draft_term[k] = '12'
                }
              }
              for (var z = 0; z < msgList[j].acceptance_type.length; z++) {
                if (msgList[j].acceptance_type[z] == 1) {
                  msgList[j].acceptance_type[z] = '不限'
                } else if (msgList[j].acceptance_type[z] == 2) {
                  msgList[j].acceptance_type[z] = '大商'
                } else if (msgList[j].acceptance_type[z] == 3) {
                  msgList[j].acceptance_type[z] = '国股'
                } else if (msgList[j].acceptance_type[z] == 4) {
                  msgList[j].acceptance_type[z] = '城商'
                } else if (msgList[j].acceptance_type[z] == 5) {
                  msgList[j].acceptance_type[z] = '农商'
                } else if (msgList[j].acceptance_type[z] == 6) {
                  msgList[j].acceptance_type[z] = '农信'
                } else if (msgList[j].acceptance_type[z] == 7) {
                  msgList[j].acceptance_type[z] = '财司'
                }
              }
              var draft_term = msgList[j].draft_term.sort(_this.sortNumberAll);
              msgList[j].draft_term = draft_term.join(' / ')
              var acceptance_type = msgList[j].acceptance_type;
              msgList[j].acceptance_type = acceptance_type.join(' / ')
              msgList[j].update_datetime = msgList[j].update_datetime.substring(0, 10)


              msgAllList.push(msgList[j]);
            }

            
          

            _this.setData({
              msgAllList: msgAllList,
              loadingHidden: true,
              nothingAll: true,
              winHeight: msgAllList.length * 290
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
  //排序
  sortNumber: function(a, b) 
  { 
    return a - b
  }, 
  //排序
  sortNumberAll: function (a, b) {
    return a - b
  }, 
  listClick: function (event) {
    if (this.data.lock) {
      return;
    }
    var id = event.currentTarget.id;
    setTimeout(function () {
      wx.navigateTo({ url: '../buyticketdetail/buyticketdetail?id=' + id })
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
    if (draftstatus == 0) {
      this.actionSheetTap(id)
    }
  },
  actionSheetTap: function (id) {
    var _this = this;
    wx.showActionSheet({
      itemList: ['设为已出'],
      success: function (e) {
        if (e.tapIndex == 0) {
          _this.goToOver(id)
        }

      }
    })
  },
  /* 新增加一笔资金业务 */
  addList: function () {
    wx.navigateTo({
      url: '../buyticketadd/buyticketadd'
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
    page_noAll=0;
    this.setData({
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
        common.login(6);
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
    page_noAll=0;
    var _this = this;
    _this.setData({
      msgList: [],
      loadingHidden: false
    });
    if (_this.data.tokenstorage !== '') {
      _this.ticketList(_this.data.tokenstorage)
      _this.ticketAllList(_this.data.tokenstorage)
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
  goToOver: function (id) {
    var _this = this;
    var id = id;
    wx.showModal({
      title: '提示',
      content: '票据已出？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: common.getRequestUrl + '/dtk/drafts/sell/' + id + '/complete',
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
              for (var i = 0; i < msgList.length; i++) {
                if (_this.data.msgList[i].id == id) {
                  _this.data.msgList[i]['draft_status'] = 1;
                  _this.data.msgList[i]['cardImage'] = '../../image/yichu.png';
                }
              }
              setTimeout(function () {
                _this.setData({
                  msgList: msgList
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

  },*/
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
          setTimeout(function () {
            _this.ticketList(res.data.token)
            _this.ticketAllList(res.data.token)
          }.bind(this), 1000);
        } else if (res.data.code == 'USER_NOT_LOGIN') {
          //app.userLogin(e)
          wx.redirectTo({
            url: '../login/login?id=6'
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
          winHeight: that.data.datalistuserLength * 220
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
            winHeight: that.data.datalistuserLength * 220
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