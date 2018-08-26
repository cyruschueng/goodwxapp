// user.js
var common = require('../../common/common.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: false,
    tokenstorage: '',
    swapstorage: '',
    name: '',
    user_id: '',
    user_role: '',
    company: '',
    actionSheetHidden: true,
    userLogin: false,
    wechat:'',
    srcavatar: '../../image/m.png',
    avatarInfo:'',
    address:'',
    gender:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    //获取storage的token
    wx.getStorage({
      key: 'tokenstorage',
      success: function (res) {
        _this.setData({
          tokenstorage: res.data,
        })
      },
      fail: function (res){
        _this.setData({
          tokenstorage: '',
          userLogin: true,
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
    /*
    let { avatar } = options
    if (avatar) {
      this.setData({
        src: avatar
      })
    }*/

  },
  //获取用户信息
  userdata:function(e){
    var _this = this;

    wx.request({
      url: common.getRequestUrl + '/dtk/users/user',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': _this.data.tokenstorage
      },
      success: function (res) {
        if (res.data.code == 'OK') {
          wx.setStorageSync('avatarInfo', '');
          console.log(res.data.data[0].avatar+'我是头像')
          wx.setStorageSync('userRole', res.data.data[0].role)
          wx.setStorageSync('userId', res.data.data[0].id)
          if (res.data.data[0].avatar == '') {
            _this.setData({
              srcavatar: '../../image/m.png'
            })
          } else {
            wx.setStorageSync('avatarInfo', res.data.data[0].avatar)
            setTimeout(function () {
              _this.setData({
                srcavatar: res.data.data[0].avatar
              })
            }.bind(this), 500);
            
          }
          if (res.data.data[0].gender == 0) {
              res.data.data[0].gender='未知'
          } else if (res.data.data[0].gender == 1) {
              res.data.data[0].gender='男'
          } else if (res.data.data[0].gender == 2) {
              res.data.data[0].gender='女'
          }
          _this.setData({
            //name: res.data.data[0].name,
            //company: res.data.data[0].company,
            //address: res.data.data[0].address,
            loadingHidden: true,
            //src: res.data.data[0].user_logo_url
            dataList: res.data.data[0]
          })
          try {
            wx.setStorageSync('isopen', res.data.data[0].isopen)
            //绑定手机号
            wx.setStorageSync('bindphone', res.data.data[0].user_id)
          } catch (e) {
          }
          
        } else if (res.data.code == 'TOKEN_INVLID') {
          _this.exchangeToken(_this.data.swapstorage, 2)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'cancel',
            duration: 1000
          })
          try {
            wx.setStorageSync('tokenstorage', '');
            wx.setStorageSync('swapstorage', '')
            wx.setStorageSync('myData', '')
            wx.setStorageSync('avatarInfo', '')
            _this.setData({
              tokenstorage: '',
              swapstorage: '',
              myData: ''
            })
          } catch (e) {
          }
          setTimeout(function () {
            wx.switchTab({
              url: '../index/index'
            })
          }.bind(this), 1000);
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  goToUserInfo: function () {
    wx.navigateTo({
      url: '../userInfo/userInfo'
    })
  },
  bindphone: function () {
    wx.navigateTo({
      url: '../bindphone/bindphone'
    })
  },
  /* 退出登录 */
  goToQuit:function(){
    var _this=this;
    wx.showModal({
      title: '提示',
      content: '是否退出登录',
      success: function (res) {
        if (res.confirm) {
          wx.showToast({
            title: '成功退出',
            icon: 'cancel',
            duration: 2000
          })
          try {
            wx.setStorageSync('tokenstorage', '');
            wx.setStorageSync('swapstorage', '');
            wx.setStorageSync('myData', '');
            wx.setStorageSync('userRole', '');
            wx.setStorageSync('avatarInfo', '../../image/m.png');
            wx.setStorageSync('userId', '')
          } catch (e) {
          }
          _this.setData({
            tokenstorage: '',
            swapstorage: '',
            myData: '',
            srcavatar: '../../image/m.png'
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../index/index'
            })
          }.bind(this), 800);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
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
    var _this = this;
    //获取storage的token
    wx.getStorage({
      key: 'tokenstorage',
      success: function (res) {
        _this.setData({
          tokenstorage: res.data,
        })
        _this.userdata(res.data)
      },
      fail: function (res) {
        common.login(2);
        _this.setData({
          tokenstorage: ''
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
  
  onPullDownRefresh: function () {
    var _this = this;
    var tokenstorage = _this.data.tokenstorage;
    if (tokenstorage !== '') {
      _this.setData({
        userLogin: false,
        loadingHidden: false
      })
      setTimeout(function () {
        _this.userdata()
      }.bind(this), 500);
    } else {
      _this.setData({
        userLogin: true,
        loadingHidden: true
      })
    }
  },
 */
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },
  actionSheetTap: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetChange: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  /**
   * 用户点击右上角分享
   
  onShareAppMessage: function () {
  
  }*/
  /**
   * 上传显示头像
  */
  changeAvatar: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        const src = res.tempFilePaths[0]
       
       
        wx.redirectTo({
          url: '../upload/upload?src=' + src+'&id=1'
        })
         
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
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
          _this.userdata(res.data.token);
        } else if (res.data.code == 'USER_NOT_LOGIN') {
          //app.userLogin(e)
          wx.redirectTo({
            url: '../login/login?id=2'
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
  /* 退出登录 */
  goToQuit: function () {
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '是否退出登录',
      success: function (res) {
        if (res.confirm) {
          wx.showToast({
            title: '成功退出',
            icon: 'cancel',
            duration: 2000
          })
          try {
            wx.setStorageSync('tokenstorage', '');
            wx.setStorageSync('swapstorage', '');
          } catch (e) {
          }
          _this.setData({
            tokenstorage: '',
            swapstorage: ''
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../index/index'
            })
          }.bind(this), 800);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
})