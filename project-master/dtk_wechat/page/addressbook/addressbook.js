var common = require('../../common/common.js');
var app = getApp();
var page_no = 0;
var page_size = 10;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: false,
    listBox: true,
    swapstorage:'',
    tokenstorage:'',
    dataList:[],
    isopen:'',
    bindphone:'',
    searchkey:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page_no = 0;
    this.setData({
      dataList: [],
      loadingHidden: false
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
    //是否公开
    wx.getStorage({
      key: 'isopen',
      success: function (res) {
        _this.setData({
          isopen: res.data,
        })
      },fail: function (res) {
      }
    })
    //绑定手机号
    wx.getStorage({
      key: 'bindphone',
      success: function (res) {
        _this.setData({
          bindphone: res.data,
        })
      }, fail: function (res) {
      }
    })
    //获取storage的token
    wx.getStorage({
      key: 'tokenstorage',
      success: function (res) {
        _this.setData({
          tokenstorage: res.data
        })
        _this.addressbookList(res.data)
      },
      fail: function (res) {
        common.login(2);
        _this.setData({
          tokenstorage: '',
          loadingHidden: true
        })
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
  addressbookList:function(e){
    var _this = this;
    wx.request({
      url: common.getRequestUrl + '/dtk/contacts',
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
          if (dataLength <= '0') {
            wx.showToast({
              title: '没有数据了',
              duration: 2000
            })
            _this.setData({
              loadingHidden: true,
              listBox: false
            });
          } else if (dataLength > 0) {
            var dataList = _this.data.dataList;
            for (var i = 0; i < dataLength; i++) {
              dataList.push(res.data.data[i]);
            }

            _this.setData({
              dataList: dataList,
              loadingHidden: true,
              listBox: false
            });
            page_no++;
          }
        } else if (res.data.code == 'TOKEN_INVLID') {
          setTimeout(function () {
            _this.exchangeToken()
          }.bind(this), 200);
        } else if (res.data.code == 'USER_NOT_OPEN') {
          _this.setData({
            loadingHidden: true,
            listBox: false
          });
        } else if (res.data.code == 'USERID_NOT_EXIST') {
          wx.showToast({
            title: '未绑定手机号',
            duration: 2000
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '../userInfo/userInfo'
            })
          }.bind(this), 500);
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
    var id = event.currentTarget.id;
    setTimeout(function () {
      wx.navigateTo({ url: '../addressbookdetail/addressbookdetail?id=' + id })
    }, 200);

  },
  //换取 token

  exchangeToken: function () {
    var _this = this;
    wx.request({
      url: common.getRequestUrl + '/dtk/users/token',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'swap': _this.data.swapstorage
      },
      success: function (res) {
        if (res.data.code == 'OK') {
          wx.setStorageSync('tokenstorage', res.data.token)
          _this.setData({
            tokenstorage: res.data.token
          })
          _this.addressbookList(res.data.token);
        } else if (res.data.code == 'USER_NOT_LOGIN') {
          //app.userLogin(e)
          wx.redirectTo({
            url: '../login/login?id=7'
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
            _this.setData({
              tokenstorage: '',
              swapstorage: ''
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
    var _this = this;
    _this.setData({
      loadingHidden: false
    });
    if (_this.data.searchkey == '') {
      _this.addressbookList(_this.data.tokenstorage)
    } else {
      _this.clickSearch(0)
      _this.setData({
        loadingHidden: true
      });
    }
  },

  /**
   * 用户点击右上角分享

  onShareAppMessage: function () {
  
  }   */
  gotopublic: function () {
    wx.redirectTo({
      url: '../userInfo/userInfo'
    })
  },
  searchVal: function (e) {
    page_no=0;
    this.setData({
      searchkey: e.detail.value
    })
  },
  clickSearch:function(e){
    var _this = this;
    if(e==0){
      console.log('==============-------------------------------------')
      wx.request({
        url: common.getRequestUrl + '/dtk/search/contacts',
        data: {
          'page_size': page_size,
          'page_no': page_no,
          'key': _this.data.searchkey
        },
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'token': _this.data.tokenstorage
        },
        success: function (res) {
          if (res.data.code == 'OK') {
            var dataLength = res.data.data.length;
            if (dataLength <= '0') {
              wx.showToast({
                title: '没有对应数据了',
                duration: 2000
              })
            } else if (dataLength > 0) {
              var dataList = _this.data.dataList;
              for (var i = 0; i < dataLength; i++) {
                dataList.push(res.data.data[i]);
              }

              _this.setData({
                dataList: dataList,
                loadingHidden: true,
                listBox: false
              });
              page_no++;
            }
          } else if (res.data.code == 'TOKEN_INVLID') {
            setTimeout(function () {
              _this.exchangeToken()
            }.bind(this), 200);
          } else if (res.data.code == 'USER_NOT_OPEN') {
            _this.setData({
              loadingHidden: true,
              listBox: false
            });
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
    }else{
      page_no=0;
      _this.setData({
        dataList: [],
        loadingHidden: true
      });
      wx.request({
        url: common.getRequestUrl + '/dtk/search/contacts',
        data: {
          'page_size': page_size,
          'page_no': page_no,
          'key': _this.data.searchkey
        },
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'token': _this.data.tokenstorage
        },
        success: function (res) {
          if (res.data.code == 'OK') {
            var dataLength = res.data.data.length;
            if (dataLength <= '0') {
              wx.showToast({
                title: '没有对应数据了',
                duration: 2000
              })
              _this.setData({
                dataList: [],
                loadingHidden: true
              });
            } else if (dataLength > 0) {
              var dataList = _this.data.dataList;
              for (var i = 0; i < dataLength; i++) {
                dataList.push(res.data.data[i]);
              }

              _this.setData({
                dataList: dataList,
                loadingHidden: true
              });
              page_no++;
            }
          } else if (res.data.code == 'TOKEN_INVLID') {
            setTimeout(function () {
              _this.exchangeToken()
            }.bind(this), 200);
          } else if (res.data.code == 'USER_NOT_OPEN') {
            _this.setData({
              loadingHidden: true
            });
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
    }
    
  }
})