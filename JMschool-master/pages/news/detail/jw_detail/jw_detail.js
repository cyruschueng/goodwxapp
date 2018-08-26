//index.js
//获取应用实例
var app = getApp();
var WxParse = require('../../../../wxParse/wxParse.js');
Page({
  data: {},
  files_list: [],
  onLoad: function (options) {
    var _this = this;
    wx.showNavigationBarLoading();
    wx.request({
      url: app._server + '/school/api/jwdetail.php',
      data: {
        detail: options.detail
      },
      success: function (res) {
        if (res.data.data && res.data.code == 200) {
          WxParse.wxParse('article', 'html', res.data.data, _this, 5);
          _this.setData({
            'title': options.title,
            'time': options.time,
          });
        } else {
          app.showErrorModal("教务信息详情获取失败");
        }
      },
      fail: function (res) {
        app.showErrorModal("网络错误");
      },
      complete: function () {
        wx.hideNavigationBarLoading();
      }
    });

    //附件下载
    if (options.fujian1 !== 'null') {
      _this.setData({
        'files_list.0.fjname': options.fjname1,
        'files_list.0.fujian': options.fujian1,
        'files_len': '1'
      })
      if (options.fujian2 !== 'null') {
        _this.setData({
          'files_list.1.fjname': options.fjname2,
          'files_list.1.fujian': options.fujian2,
          'files_len': '2'
        })
        if (options.fujian3 !== 'null') {
          _this.setData({
            'files_list.2.fjname': options.fjname3,
            'files_list.2.fujian': options.fujian3,
            'files_len': '3'
          })
          if (options.fujian4 !== 'null') {
            _this.setData({
              'files_list.3.fjname': options.fjname4,
              'files_list.3.fujian': options.fujian4,
              'files_len': '4'
            })
            if (options.fujian5 !== 'null') {
              _this.setData({
                'files_list.4.fjname': options.fjname5,
                'files_list.4.fujian': options.fujian5,
                'files_len': '5'
              })
            }
          }
        }
      }
    }
  },


  getFj: function (e) {
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '预览或下载附件需要消耗流量，是否继续？',
      confirmText: '继续',
      success: function (res) {
        if (res.confirm) {
          app.showLoadToast('下载中，请稍候');
          wx.showNavigationBarLoading();
          _this.setData({
            file_loading: true
          });
          //下载
          wx.downloadFile({
            url: e.currentTarget.dataset.url,
            success: function (res) {
              var filePath = res.tempFilePath;
              //预览
              wx.openDocument({
                filePath: filePath,
                success: function (res) {
                  console.info('预览成功');
                },
                fail: function (res) {
                  app.showErrorModal(res.errMsg, '预览失败');
                },
                complete: function () {
                  wx.hideNavigationBarLoading();
                  wx.hideToast();
                  _this.setData({
                    file_loading: false
                  });
                }
              });
            },
            fail: function (res) {
              app.showErrorModal(res.errMsg, '下载失败');
              wx.hideNavigationBarLoading();
              wx.hideToast();
              _this.setData({
                file_loading: false
              });
            }
          });
        }
      }
    });
  }
})






