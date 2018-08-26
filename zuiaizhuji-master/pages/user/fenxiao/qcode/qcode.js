const WxParse = require('../../../../wxParse/wxParse.js');
const app = getApp();
const requestUtil = require('../../../../utils/requestUtil');
const _DuoguanData = require('../../../../utils/data');
Page({
  data: {
    userInfo: {},
    data_list: [],
    shareopenid: ''
  },
  onLoad: function (options) {
    var that = this
    var scene = decodeURIComponent(options.scene)
    var sopenid = options.shareopenid;
    if (sopenid != undefined){
      that.setData({
        shareopenid: sopenid
      });
    } else if (scene != undefined){
      that.setData({
        shareopenid: scene
      });
    }
    //加载用户信息
    requestUtil.get(_DuoguanData.duoguan_user_info_url, {}, (data) => {
      console.log(data);
      this.setData({ userInfo: data });
      that.getDataList(data.openId, that.data.shareopenid);
    });
  },
  //获取数据
  getDataList: function (myo,sho) {
    var that = this
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/FenxiaoApi/fenxiaocode', { myopenid: myo, shareopenid: sho }, (info) => {
      console.log(info);
      that.setData({ data_list: info });
      WxParse.wxParse('content', 'html', info.fxrule, that);
    });
  },
  //保存二维码
  saveimage: function () {
    var that = this
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success(res) {
              // 用户已经同意小程序使用保存图片到系统相册功能，后续调用 wx.saveImageToPhotosAlbum 接口不会弹窗询问
              wx.getImageInfo({
                src: that.data.data_list.codeurl,
                success: function (res) {
                  var path = res.path;
                  wx.saveImageToPhotosAlbum({
                    filePath: path,
                    success: function (res) {
                      wx.showModal({
                        title: '提示',
                        content: '保存图片成功',
                        showCancel: false
                      })
                    },
                    fail: function (res) {
                      wx.showModal({
                        title: '保存图片失败',
                        content: res.errMsg,
                        showCancel: false
                      })
                    }
                  })
                },
                fail: function (res) {
                  wx.showModal({
                    title: '获取图片信息失败',
                    content: res.errMsg,
                    showCancel: false
                  })
                }
              })
            }
          })
        }
        else
        {
          wx.getImageInfo({
            src: that.data.data_list.codeurl,
            success: function (res) {
              var path = res.path;
              wx.saveImageToPhotosAlbum({
                filePath: path,
                success: function (res) {
                  wx.showModal({
                    title: '提示',
                    content: '保存图片成功',
                    showCancel: false
                  })
                },
                fail: function (res) {
                  wx.showModal({
                    title: '保存图片失败',
                    content: res.errMsg,
                    showCancel: false
                  })
                }
              })
            },
            fail: function (res) {
              wx.showModal({
                title: '获取图片信息失败',
                content: res.errMsg,
                showCancel: false
              })
            }
          })
        }
      }
    })
  },
  /**
     * 下拉刷新
     */
  onPullDownRefresh: function () {
    var that = this
    //加载用户信息
    requestUtil.get(_DuoguanData.duoguan_user_info_url, {}, (data) => {
      console.log(data);
      this.setData({ userInfo: data });
      that.getDataList(data.openId, that.data.shareopenid);
    }, this, { completeAfter: wx.stopPullDownRefresh });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    return {
      title: '我要代言',
      desc: '',
      path: '/pages/user/fenxiao/qcode/qcode?shareopenid=' + that.data.data_list.shareopenid
    };
  }
})