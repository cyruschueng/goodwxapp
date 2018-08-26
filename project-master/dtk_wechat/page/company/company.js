// company.js
var common = require('../../common/common.js');
var app = getApp();
var page_no = 0;
var page_size = 10;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgList: [],
    loadingHidden: false,
    showlist: true,
    tokenstorage: '',
    swapstorage: '',
    admin_user_role:'',
    user_logo_url:'../../image/m.png',
    approve: '../../image/yrz.png',
    auth_flag:'',
    Data: [{ id: 4, name: '初审员' }, { id: 5, name: '复核员' }], 
    Index: 0,
    users_id:'',
    listId:'',
    actionSheetHidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    page_no = 0;
    _this.setData({
      msgList:[]
    })
    //获取storage的token
    wx.getStorage({
      key: 'tokenstorage',
      success: function (res) {
        _this.setData({
          tokenstorage: res.data
        })
      }
    })
    //获取storage的swap
    wx.getStorage({
      key: 'swapstorage',
      success: function (res) {
        _this.setData({
          swapstorage: res.data
        })
      }
    })
    //获取storage的userRole
    wx.getStorage({
      key: 'userRole',
      success: function (res) {
        if (res.data==''){
          _this.setData({
            loadingHidden: true
          });
          wx.showToast({
            title: '没有权限访问',
            duration: 2000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../index/index'
            })
          }.bind(this), 1000);
        }else{
          _this.setData({
            admin_user_role: res.data
          })
          setTimeout(function () {
            _this.companyList()
          }.bind(this), 500);
        }
      },
      fail: function (res) {
        _this.setData({
          loadingHidden: true
        });
        wx.showToast({
          title: '没有权限访问',
          duration: 2000
        })
        setTimeout(function () {
          wx.switchTab({
            url: '../index/index'
          })
        }.bind(this), 1000);
      }
    })

    
  },
  companyList:function(){
    var _this = this;
    wx.request({
      url: common.getRequestUrl + '/dtk/companys/users',
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
          if (dataLength <= '0') {
            wx.showToast({
              title: '没有数据了',
              duration: 2000
            })
            _this.setData({
              loadingHidden: true
            });
          } else if (dataLength > 0) {
            var msgList = _this.data.msgList;
            
            for (var i = 0; i < dataLength; i++) {
              msgList.push(res.data.data[i]);
            }
            _this.setData({
              msgList: msgList,
              loadingHidden: true
            });
            page_no++;
          }
        } else if (res.data.code == 'TOKEN_INVLID') {
          this.exchangeToken()
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this=this;
    page_no = 0;
    _this.setData({
      msgList: []
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
    var _this = this;
    _this.setData({
      msgList: [],
      loadingHidden: false
    });
    if (_this.data.tokenstorage !== '') {
      console.log(page_no +'监听用户下拉动作')
      setTimeout(function () {
        _this.companyList()
      }.bind(this), 500);
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
      setTimeout(function () {
        _this.companyList()
      }.bind(this), 500);
    } else {
      _this.setData({
        loadingHidden: true
      });
    }
  },

  /**
   * 用户点击右上角分享

  onShareAppMessage: function () {
  
  }   */
  /* 同意企业用户认证 */
  goToagree: function () {
    var _this = this;
    var msgList = _this.data.msgList;
    var id = _this.data.listId;
    wx.request({
      url: common.getRequestUrl + '/dtk/companys/users/' + id+'/auth/agree',
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'token': this.data.tokenstorage
      },
      success: function (res) {
        if (res.data.code == 'OK') {
          wx.showToast({
            title: '通过申请',
            icon: 'success',
            duration: 2000
          })
          //循环找到对应数据，替换对应数据
          for (var i = 0; i < msgList.length; i++) {
            if (_this.data.msgList[i].id == id) {
              _this.data.msgList[i]['auth_flag'] = 1
            }
          }
          _this.setData({
            msgList: msgList
          });
        } else if (res.data.code == 'TOKEN_INVLID') {
          this.exchangeToken()
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
  /* 拒绝/取消企业用户认证 */
  goTorefuse: function () {
    var _this = this;
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
    var id = _this.data.listId;
    var msgList = _this.data.msgList; 
    wx.request({
      url: common.getRequestUrl + '/dtk/companys/users/' + id + '/auth/refuse',
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'token': this.data.tokenstorage
      },
      success: function (res) {
        if (res.data.code == 'OK') {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          //循环找到对应数据，对数据隐藏 msgList.splice(i, 1)
          for (var i = 0; i < msgList.length; i++) {
            if (_this.data.msgList[i].id == id) {
              msgList.splice(i, 1)
            }
          }
          _this.setData({
            msgList: msgList
          });
        } else if (res.data.code == 'TOKEN_INVLID') {
          this.exchangeToken()
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
  goTorole: function (){
    var users_id = this.data.listId;
    console.log(users_id+':我是id')
    var _this = this;
    _this.setData({
      users_id: users_id,
      actionSheetHidden: !this.data.actionSheetHidden
    });
  },
  bindChange: function (e) {
    var _this = this;
    var user_role = _this.data.Data[e.detail.value].id;
    var msgList = _this.data.msgList; 
    wx.request({
      url: common.getRequestUrl + '/dtk/companys/users/' + _this.data.users_id + '/role',
      method: 'POST',
      data:{
        'user_role': user_role
      },
      header: {
        'content-type': 'application/json',
        'token': this.data.tokenstorage
      },
      success: function (res) {
        if (res.data.code == 'OK') {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          //循环找到对应数据，替换对应数据
          for (var i = 0; i < msgList.length; i++) {
            if (_this.data.msgList[i].id == _this.data.users_id) {
              _this.data.msgList[i]['user_role'] = user_role
            }
          }
          _this.setData({
            msgList: msgList
          });
        } else if (res.data.code == 'TOKEN_INVLID') {
          this.exchangeToken()
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


    this.setData({
      Index: e.detail.value
    });
  }, 
  listClick: function (event) {
    if (this.data.lock) {
      return;
    }
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
    var _this=this;
    var authflag = event.currentTarget.dataset.authflag;
    var userrole = event.currentTarget.dataset.userrole;
    var id = event.currentTarget.id;
    _this.setData({
      listId: id
    })
    console.log("=======================我是长按" + _this.data.listId)
    if (authflag == 0 || authflag == 2){
      _this.actionSheetTap()
    } else if (authflag == 1 && userrole !== 2){
      _this.actiondistribution()
    }
  },
  actionSheetTap: function () {
    var _this = this;
    wx.showActionSheet({
      itemList: ['同意', '拒绝'],
      success: function (e) {
        if (e.tapIndex == 0) {
          _this.goToagree()
        } else if (e.tapIndex == 1) {
          _this.goTorefuse()
        }
      }
    })
  },
  actiondistribution: function () {
    var _this = this;
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetbindchange: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
})