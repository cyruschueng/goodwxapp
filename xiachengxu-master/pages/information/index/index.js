import { Index } from './index-model.js';
var app = getApp();
var index = new Index();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    initial: true, // 用户没有点击输入框，点击一次以后提示获取手机号，点击了就不再给按钮添加事件
    userInfo: {}, // 用户头像和手机号以及信息完成度
    showTopTips: false, // 显示顶部提示信息
    loadingHidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { avatar, mobile } = options;
    this.data.avatar = avatar;
    this.data.mobile = mobile;
    this._loadData();
  },
  _loadData() {
    var that = this;
    var { avatar, mobile } = this.data;
    var params = {
      data: {

      }
    };
    index.getUserInfo(params, res => {
      var userInfo = res.data;
      if (res && res.status) {
        if (avatar) {
          userInfo = { ...userInfo, faceImage: avatar };
        }
        if (mobile) {
          userInfo.mobile = mobile;
        }
        that.setData({
          loadingHidden: true,
          userInfo
        });
      }
    })
  },
  upload() {
    app.aldstat.sendEvent('资料完善-上传人脸');
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0];
        that.limitImageSize(src, status => {
          if (!status) {
            that.showReminder('图片超过3MB,请选择较小的图片', () => {

            });
          } else {
            wx.redirectTo({
              url: `../upload/upload?src=${src}&mobile=${that.data.userInfo.mobile}`
            });
          }
        });
      }
    })
  },
  limitImageSize(filePath, cb) {
    wx.getFileInfo({
      filePath: filePath,
      success(res) {
        if (res.size > 3000000)
          cb && cb(false);
        else
          cb && cb(true);
      },
      fail(err) {
        cb && cb(false);
      }
    })
  },
  getPhoneNumber(e) {
    app.aldstat.sendEvent('资料完善-绑定手机号');
    var that = this;
    this.setData({
      initial: false
    });
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      var params = {
        data: {
          iv: e.detail.iv,
          encryptedData: e.detail.encryptedData
        }
      };
      index.descryptPhone(params, res => {
        console.log(res);
        if (res && res.status) {
          var userInfo = { ...that.data.userInfo, mobile: res.data.phoneNumber };
          console.log(userInfo);
          that.setData({
            userInfo
          });
        }
      });
    }
  },
  updateUserInfo() {
    var that = this;
    var { userInfo } = this.data;
    if (userInfo.mobile && !this.validatePhone(userInfo.mobile)) {
      this.setData({
        showTopTips: true
      });
      setTimeout(() => {
        that.setData({
          showTopTips: false
        });
      }, 3000)
      return;
    } else if (!userInfo.mobile && !userInfo.faceImage) {
      that.showReminder('请输入手机号或者上传头像', null);
    } else {
      var params = {
        data: {
          mobile: that.data.userInfo.mobile,
          faceImage: that.data.userInfo.faceImage
        }
      };
      wx.showLoading({
        title: '保存中...',
      });
      if (!that.data.userInfo.mobile && !that.data.userInfo.faceImage) return;
      index.updateUserInfo(params, res => {
        if (res.status) {
          that.showTip('保存成功');
        }
      })
    }
  },
  getInputPhone(e) {
    var phone = e.detail.value;
    var userInfo = this.data.userInfo;
    userInfo.mobile = phone;
    this.setData({
      userInfo
    });
  },
  validatePhone(mobile) {
    if (mobile.length != 11) {
      return false;
    }
    var myreg = /^1[3|4|5|7|8][0-9]{9}$/;
    if (!myreg.test(mobile)) {
      return false;
    }
    return true;
  },
  showTip(title) {
    wx.showToast({
      title: title,
      icon: 'success',
      duration: 1000
    })
  },
  showReminder(content, cb) {
    wx.showModal({
      title: '提示',
      content: content,
      showCancel: false,
      confirmColor: '#1196ee',
      success: res => {
        if (res.confirm)
          cb && cb();
      }
    })
  }
})