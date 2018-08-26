// list.js
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
    msgAllList:[],
    loadingHidden: false,
    tokenstorage: '',
    swapstorage: '',
    imgEarly: '../../image/chu.png',
    imgDouble: '../../image/fu.png',
    height: 0,
    scrollY: true,
    enableBackToTop:true,
    showModalStatus: false,
    deleteTest:'',
    reason:'',
    id:'',
    imgsrc: '../../image/jia.png',
    complete: '../../image/complete.png',
    urlid:'',
    lock: false,
    righttop: false,
    listBox: true,
    nothing: true,
    nothingAll: true,
    // tab切换  
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    defaultHeight:0,
    datalistAllLength:0,
    datalistuserLength:0
  },
  //列表点击
  listClick: function (event) {
    if (this.data.lock) {
      return;
    }
    var id = event.currentTarget.id;
    //区分详细页面显示
    wx.setStorageSync('xystorage', '1')
    setTimeout(function () {
      wx.navigateTo({ url: '../detail/detail?id=' + id })
    }, 400);
    
  },
  touchend: function () {
    if (this.data.lock) {
      setTimeout(() => {
        this.setData({ lock: false });
      }, 100);
    }
  },
  //列表长按
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
      itemList: ['业务完成'],
      success: function (e) {
        if (e.tapIndex == 0) {
          _this.goToOver(id)
        }

      }
    })
  },
  /**
     * 业务完成
     */
  goToOver: function (id) {
    var _this = this;
    var id = id;
    wx.showModal({
      title: '提示',
      content: '业务设为完成？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: common.getRequestUrl + '/dtk/funds/' + id + '/complete',
            method: 'POST',
            header: {
              'content-type': 'application/json',
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
                  _this.data.msgList[i]['fund_status'] = 1
                }
              }
              for (var j = 0; j < msgAllList.length; j++) {
                if (_this.data.msgAllList[j].id == id) {
                  _this.data.msgAllList[j]['fund_status'] = 1
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.urlid+':我是进入页面的url')
    page_no = 0;
    page_noAll = 0;
    this.setData({
      urlid: options.urlid
    })
    var _this = this;
    //获取storage的token
    wx.getStorage({
      key: 'tokenstorage',
      success: function (res) {
        _this.setData({
          tokenstorage: res.data, 
        })
      },
      fail: function (res) {
        _this.setData({
          tokenstorage: '',
          loadingHidden: true
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

    this.pixelRatio = app.data.deviceInfo.pixelRatio;
    var windowHeight = app.data.deviceInfo.windowHeight;
    var height = windowHeight;
    this.setData({ height: height });
  
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
    });
    //获取storage的token
    wx.getStorage({
      key: 'tokenstorage',
      success: function (res) {
        _this.setData({
          tokenstorage: res.data
        })
        _this.userList(res.data)
        _this.userAllList(res.data)
      },
      fail: function (res) {
        common.login(4);
        _this.setData({
          tokenstorage: '',
          loadingHidden: true
        })
      }
    })
    
  },
  /**
   * 获取--当前用户资金业务信息
   */
  userList:function(e){
    var _this = this;
    wx.request({
      url: common.getRequestUrl + '/dtk/funds/user',
      data:{
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
            var msgList = res.data.data;
            var myhash = new Object();
            for (var i = 0; i < dataLength; i++) {
              //msgList.push(res.data.data[i]);
              myhash[res.data.data[i].id] = res.data.data[i];
            }
           
            for (var j = 0; j < msgList.length; j++) {
              var str = msgList[j].funds_value;
              var s = str.toString();
              if (s.length>4){
                msgList[j].funds_value = s.substring(0, s.length - 4)
              }else{
                msgList[j].funds_value = str
              }
              if (msgList[j].funds_type == '时点存款') {
                msgList[j].imgTitle = '../../image/t1.png';
              } else if (msgList[j].funds_type == '保证金代存') {
                msgList[j].imgTitle = '../../image/t2.png'
              } else if (msgList[j].funds_type == '敞口代还') {
                msgList[j].imgTitle = '../../image/t3.png'
              } else if (msgList[j].funds_type == '流贷倒贷') {
                msgList[j].imgTitle = '../../image/t4.png'
              } else {
                msgList[j].imgTitle = '../../image/t5.png'
              }

              if (msgList[j].funds_value == 0 || msgList[j].funds_value == '不限') {
                msgList[j].funds_value = '不限';
              } else {
                msgList[j].funds_value = msgList[j].funds_value
              } 
              if (msgList[j].yield_rate == 0 || msgList[j].yield_rate == '面议') {
                msgList[j].yield_rate = '面议';
              } else {
                msgList[j].yield_rate = msgList[j].yield_rate
              }
              if (msgList[j].funds_duration == 0 || msgList[j].funds_duration == '不限') {
                msgList[j].funds_duration = '不限';
              } else {
                msgList[j].funds_duration = msgList[j].funds_duration
              }
              msgList[j].update_datetime = msgList[j].update_datetime.substring(0, 10)
            }

            try {
              wx.setStorageSync('myData', myhash)
            } catch (e) {
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
                winHeight: oldmsgList.length * 250
              });
            }
            page_no++;
          }
        } else if (res.data.code == 'TOKEN_INVLID') {
          setTimeout(function () {
            _this.exchangeToken(_this.data.swapstorage, 4)
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
  /**
   * 获取--全部资金业务信息
   */
  userAllList: function (e) {
    var _this = this;
    wx.request({
      url: common.getRequestUrl + '/dtk/funds',
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
            var msgList = res.data.data;
            var myhash = new Object();
            for (var i = 0; i < dataLength; i++) {
              //msgList.push(res.data.data[i]);
              myhash[res.data.data[i].id] = res.data.data[i];
            }

            for (var j = 0; j < msgList.length; j++) {
              var str = msgList[j].funds_value;
              var s = str.toString();
              if (s.length > 4) {
                msgList[j].funds_value = s.substring(0, s.length - 4)
              } else {
                msgList[j].funds_value = str
              }
              if (msgList[j].funds_type == '时点存款') {
                msgList[j].imgTitle = '../../image/t1.png';
              } else if (msgList[j].funds_type == '保证金代存') {
                msgList[j].imgTitle = '../../image/t2.png'
              } else if (msgList[j].funds_type == '敞口代还') {
                msgList[j].imgTitle = '../../image/t3.png'
              } else if (msgList[j].funds_type == '流贷倒贷') {
                msgList[j].imgTitle = '../../image/t4.png'
              } else {
                msgList[j].imgTitle = '../../image/t5.png'
              }

              if (msgList[j].funds_value == 0 || msgList[j].funds_value == '不限') {
                msgList[j].funds_value = '不限';
              } else {
                msgList[j].funds_value = msgList[j].funds_value
              }
              if (msgList[j].yield_rate == 0 || msgList[j].yield_rate == '面议') {
                msgList[j].yield_rate = '面议';
              } else {
                msgList[j].yield_rate = msgList[j].yield_rate
              }
              if (msgList[j].funds_duration == 0 || msgList[j].funds_duration == '不限') {
                msgList[j].funds_duration = '不限';
              } else {
                msgList[j].funds_duration = msgList[j].funds_duration
              }
              msgList[j].update_datetime = msgList[j].update_datetime.substring(0, 10)
            }

            try {
              wx.setStorageSync('myData', myhash)
            } catch (e) {
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
            if (page_noAll==0){
              _this.setData({
                datalistAllLength:dataLength
              });
            }else{
              _this.setData({
                datalistAllLength: _this.data.datalistAllLength+ dataLength
              });
            }
            page_noAll++;
          }
        } else if (res.data.code == 'TOKEN_INVLID') {
          setTimeout(function () {
            _this.exchangeToken(_this.data.swapstorage, 4)
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



  /* 新增加一笔资金业务 */
  addList:function(){
    wx.navigateTo({
      url: '../drawer/drawer'
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    page_no = 0;
    page_noAll = 0;
    var _this=this;
    _this.data.msgList=[]
    _this.setData({
      //msgList: [],
      loadingHidden: false
    });
    if (_this.data.tokenstorage !== '') {
      _this.userList(_this.data.tokenstorage)
    }else{
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
      if (_this.data.currentTab==0){
        _this.userAllList(_this.data.tokenstorage)
      }else{
        _this.userList(_this.data.tokenstorage)
      }
      
    } else {
      _this.setData({
        loadingHidden: true
      });
    }
  },




  deleteButton: function (e) {
    this.setData({
      id: e.currentTarget.id
    })
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200, //动画时长 
      timingFunction: "linear", //线性 
      delay: 0 //0则不延迟 
    });

    // 第2步：这个动画实例赋给当前的动画实例 
    this.animation = animation;

    // 第3步：执行第一组动画 
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        animationData: animation
      })
      //关闭 
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示 
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  deleteReason: function (e) {
    this.setData({
      reason: e.detail.value
    })
  },
  deleteBox:function(){
    var _this=this;
    var reason = _this.data.reason;
    console.log(reason)
    if (reason !== ''){
      var id=_this.data.id;
      setTimeout(function () {
      wx.request({
        url: common.getRequestUrl + '/dtk/funds/' + id + '?reason=' + reason,
        method: 'DELETE',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'token': _this.data.tokenstorage
        },
        success: function (res) {
          console.log(res.data.code)
          if (res.data.code == 'OK') {
            this.userList(_this.data.tokenstorage)
            
          } else if (res.data.code == 'TOKEN_INVLID') {
            wx.switchTab({
              url: '../index/index'
            })
            setTimeout(function () {
              _this.exchangeToken(_this.data.swapstorage, 4)
            }.bind(this), 200);
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
      }.bind(this), 1000)
    }else{
      wx.showToast({
        title: '请填写删除信息',
        icon: 'cancel',
        duration: 1000
      })
    }
  },
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
          _this.userList(res.data.token);
          _this.userAllList(res.data.token); 
        } else if (res.data.code == 'USER_NOT_LOGIN') {
          //app.userLogin(e)
          wx.redirectTo({
            url: '../login/login?id=4'
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
  onforwarding:function(){
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
          winHeight: that.data.datalistuserLength * 250
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
      if (e.target.dataset.current == 1){
        if (page_no == 0){
          that.setData({
            winHeight: that.data.defaultHeight
          })
        }else{
          that.setData({
            winHeight: that.data.datalistuserLength * 250
          })
        }
      } else if (e.target.dataset.current == 0){
        if (page_noAll == 0){
          that.setData({
            winHeight: that.data.defaultHeight
          })
        }else{
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