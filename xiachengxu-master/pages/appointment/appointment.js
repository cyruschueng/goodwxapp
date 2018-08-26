// pages/appointment/appointment.js
import { getDate, getTime, getDateByMill, getTimeByMill } from '../../utils/util.js';
import { Appointment } from './appointment-model.js';
var app = getApp();
var appoint = new Appointment();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    isAdd: true, // 是否是新增预约还是修改预约
    isModify: true, // 是否点击了修改按钮
    storeNo: '',
    showMore: false, // 显示更多的预约商品
    loadingHidden: false,
    initial: true, // 只有一次输入框提示获取用户手机号
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.storeNo = options.storeNo || wx.getStorageSync('storeNo');
    if (options.type == 'multiple') {
      this.setData({
        type: options.type
      });
      // 获取批量预约的商品
      var appointProducts = wx.getStorageSync('appointProducts');
      this.setData({
        multipleProducts: appointProducts
      });

    } else {
      var id = options.id || '';
      if (id) {
        this.setData({
          isModify: false,
          isAdd: false,
          from: options.from,
          id
        });
      }
    }
    this._loadData();
  },

  _loadData(param) {
    /**
     * 获取商品所属门店信息
     */
    var params = {
      data: {
        storeNo: this.data.storeNo,
      }
    };
    var data = app.globalData.appoint;
    var curDate = new Date();
    data.date = data.bookingDate ? data.bookingDate.split(' ')[0] : getDate(curDate);
    data.time = data.bookingDate ? data.bookingDate.split(' ')[1] : getTime(curDate);
    var date = getDate(curDate);
    var time = getTime(curDate);
    appoint.getStoreInfo(params, res => {
      if (res.status) {
        this.setData({
          storeInfo: res.data,
          appoint: data,
          loadingHidden: true,
          initial: !data.mobile,
          date,
          time
        });
      }
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindChange(e) {
    var type = appoint.getDataSet(e, 'type');
    var data = this.data.appoint;
    var value = e.detail.value;
    switch (type) {
      case 'name':
        data.bookerName = value;
        break;
      case 'mobile':
        data.mobile = value;
        break;
      case 'date':
        data.date = value;
        break;
      case 'time':
        data.time = value;
        break;
    }
    this.setData({
      appoint: data,
      initial: !data.mobile
    });
  },
  formSubmit(e) {
    var info = e.detail.value;
    var that = this;
    var appointData = this.data.appoint;
    var product = {
      goodsId: appointData.goodsId,
      goodsName: appointData.goodsName,
      goodsPic: appointData.goodsPic,
      goodsPrice: appointData.goodsPrice
    }
    if (!info.userName || !info.mobile || !info.date || !info.time) {
      this.showTips('信息填写不完整');
    } else if (info.mobile.charAt(0) !== '1' || info.mobile.length !== 11) {
      this.showTips('手机号码格式错误');
    } else {
      this.setData({
        loading: true
      });
      var postData;
      if (this.data.id) {
        postData = {
          data: {
            bookingId: this.data.id,
            bookingDate: `${info.date} ${info.time}`,
            bookerName: info.userName,
            mobile: info.mobile,
            remark: 'remark',
            storeNo: this.data.storeNo
          }
        }
      } else {
        var param = {
          storeNo: this.data.storeNo,
          bookerName: info.userName,
          mobile: info.mobile,
          remark: 'desc',
          bookingDate: `${info.date} ${info.time}`,
          formId: e.detail.formId
        };
        var params = { ...param, ...product };
        postData = {
          data: params
        }
      }
      appoint.makeAppoint(postData, data => {
        that.setData({
          loading: false,
          isAdd: false,
          isModify: !that.data.isModify
        });
        if (data.status) {
          if (!postData.data.bookingId) {
            appointData.bookingId = data.data.bookingId;
            this.setData({
              appoint: appointData
            });
          }
          var mess = '店员会为您提前准备好商品，请在预约时间前到店试穿';
          var title = postData.data.bookingId ? '修改预约成功' : '预约成功';
          that.showFeedback(title, mess, () => {
            // 此处处理是重复预约后返回预约列表进行缓存数据的增加
            app.globalData.appoint = { id: postData.data.bookingId || data.data.bookingId, bookingCount: postData.data.bookingId ? 0 : data.data.bookingCount, name: info.userName, phone: info.mobile, createTime: `${info.date} ${info.time}`, ...product };
            app.globalData.product = { ...product, appoint: true };
            // 清楚批量预约生成的缓存
            wx.removeStorageSync('appointProducts');
            wx.navigateBack({

            })
          })
        } else {
          that.showFeedback('预约失败', '请重新提交预约信息', () => {

          })
        }
      })
    }

  },
  // 批量预约
  multipleAppoint(e) {
    var that = this;
    var info = e.detail.value;
    if (!info.userName || !info.mobile || !info.date || !info.time) {
      this.showTips('信息填写不完整');
    } else if (info.mobile.charAt(0) !== '1' || info.mobile.length !== 11) {
      this.showTips('手机号码格式错误');
    } else {
      var products = wx.getStorageSync('appointProducts'), goodsIds = [];
      products.forEach(item => {
        goodsIds.push(item.goodsId);
      });
      var bookInfo = e.detail.value;
      var params = {
        data: {
          formId: e.detail.formId,
          bookerName: bookInfo.userName,
          mobile: bookInfo.mobile,
          storeNo: this.data.storeNo,
          bookingDate: `${bookInfo.date} ${bookInfo.time}`,
          remark: '',
          goodsIds
        }
      };
      appoint.appointMultipleProducts(params, res => {
        if (res.status) {
          wx.setStorageSync('cart-fresh', true);
          wx.setStorageSync('fresh', true)
          that.showFeedback('预约成功', '店员会为您提前准备好商品，请在预约时间前到店试穿', () => {
            wx.removeStorageSync('appointProducts');
            wx.navigateBack({

            })
          })
        } else {
          that.showFeedback('预约失败', '请重新提交预约信息', () => {

          })
        }
      })
    }

  },
  showMoreProducts() {
    this.setData({
      showMore: !this.data.showMore
    });
  },
  showTips(title) {
    wx.showToast({
      title: title,
      duration: 1000,
      icon: 'success'
    })
  },
  showFeedback(title, content, cb) {
    wx.showModal({
      title: title,
      content: content,
      showCancel: false,
      confirmColor: '#1196ee',
      success: (res) => {
        if (res.confirm) {
          cb && cb();
        }
      }
    })
  },
  cancelAppoint(e) {
    var that = this;
    this.showConfirm('是否确认取消预约', true, res => {
      if (res.confirm) {
        wx.showLoading({
          title: '取消预约中',
          mask: true
        })
        var id = appoint.getDataSet(e, 'id');
        var params = {
          data: {
            bookingId: id,
            storeNo: this.data.storeNo
          }
        };
        appoint.cancelAppoint(params, data => {
          wx.hideLoading();
          if (data.status) {
            app.globalData.appoint = {
              bookingId: id,
              bookingStatus: 0
            }
            that.showConfirm('成功取消预约', false, res => {
              if (res.confirm) {
                wx.navigateBack({

                })
              }
            });
          } else {
            that.showConfirm('取消预约失败，请再次尝试取消', false, null);
          }
        })

      }
    });

  },
  /**
   * 取消预约
   */
  cancelMakeAppoint() {
    wx.navigateBack({

    })
  },
  /**
   * 修改预约
   */
  modifyAppoint(e) {
    var id = appoint.getDataSet(e, 'id');
    this.setData({
      id: id,
      isModify: !this.data.isModify
    });
  },
  appointOperation(e) {
    var that = this;
    var bookingStatus = parseInt(appoint.getDataSet(e, 'status'));
    var content = bookingStatus == 3 ? '确认此用户未赴约' : '确认此用户已赴约';
    this.showConfirm(content, true, res => {
      if (res.confirm) {
        var bookingId = appoint.getDataSet(e, 'id');
        var postData = {
          data: {
            bookingId,
            bookingStatus
          }
        }
        wx.showLoading({
          title: '处理中...',
        })
        appoint.appointOperate(postData, res => {
          if (res.status) {
            wx.hideLoading();
            app.globalData.appoint = {
              bookingId: bookingId,
              status: bookingStatus
            };
            wx.navigateBack({})
          }
        })
      }
    });
  },
  getUserPhoneNumber(e) {
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
      // 解密数据获取手机号
      appoint.descryptPhone(params, res => {
        if (res && res.status) {
          var appoint = { ...that.data.appoint, mobile: res.data.phoneNumber };
          wx.setStorageSync('mobile', res.data.phoneNumber)
          that.setData({
            appoint
          });
        }
      });
    }
  },
  showConfirm(content, isShowCancel, callback) {
    wx.showModal({
      title: '提示',
      content: content,
      confirmColor: '#1196ee',
      showCancel: isShowCancel,
      success: res => {
        callback && callback(res);
      }
    })
  },
  showTips: function (title) {
    wx.showToast({
      title: title,
      duration: 1000,
      icon: 'success'
    })
  },

})