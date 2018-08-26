// pages/shop/share/share.js
const _function = require('../../../utils/functionData');
const requestUtil = require('../../../utils/requestUtil');
const _DuoguanData = require('../../../utils/data');
const WxParse = require('../../../wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    goods_info: [],
    this_goods_id: 0,
    data_list: [],
    shareuid: ''
  },
  go_goods_info:function(){
    wx.redirectTo({
      url: '../malldetail/malldetail?sid=' + this.data.this_goods_id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var scene = decodeURIComponent(options.scene)
    var tmpgid = 0;
    var tmpsuid = '';
    if (scene != undefined)
    {
      var zuhe = [];
      zuhe = scene.split('&');
      if (zuhe.length >1)
      {
        tmpgid = zuhe[0];
        tmpsuid = zuhe[1];
      }
      else if (zuhe.length > 0)
      {
        tmpgid = zuhe[0];
      }
    }
    
    
    var post_id = options.sid;
    var suid = options.shareuid;
    if (post_id != undefined)
    {
      that.setData({
        this_goods_id: post_id
      });
    }
    else
    {
      that.setData({
        this_goods_id: tmpgid
      });
    }
  
    if (suid != undefined) {
      that.setData({
        shareuid: suid
      });
    } else{
      that.setData({
        shareuid: tmpsuid
      });
    }
    //加载用户信息
    requestUtil.get(_DuoguanData.duoguan_user_info_url, {}, (data) => {
      console.log(data);
      this.setData({ userInfo: data });
      that.getDataList(that.data.this_goods_id, data.openId, that.data.shareuid);
    });
    //请求商品详情
    // _function.getGoodsInfo(that.data.this_goods_id, that.initGoodsInfoData, this);
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/Api/getGoodsInfo.html',
      { sid: that.data.this_goods_id},
      (data) => {
        that.initGoodsInfoData(data)
      }, this, { isShowLoading: false });
  },
  //获取数据
  getDataList: function (gid,myo, sho) {
    var that = this
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/FenxiaoApi/goodsfxcode', { goodsid: gid, myopenid: myo, shareuid: sho }, (info) => {
      console.log(info);
      that.setData({ data_list: info });
      WxParse.wxParse('content', 'html', info.fxrule, that);
    });
  },
  initGoodsInfoData: function (data) {
    var that = this
    that.setData({
      goods_info: data
    })
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
        else {
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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
    var that = this
    //加载用户信息
    requestUtil.get(_DuoguanData.duoguan_user_info_url, {}, (data) => {
      console.log(data);
      this.setData({ userInfo: data });
      that.getDataList(that.data.this_goods_id, data.openId, that.data.shareuid);
    }, this, { completeAfter: wx.stopPullDownRefresh });
    //请求商品详情
    // _function.getGoodsInfo(that.data.this_goods_id, that.initGoodsInfoData, this);
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/Api/getGoodsInfo.html',
      { sid: that.data.this_goods_id },
      (data) => {
        that.initGoodsInfoData(data)
      }, this, { isShowLoading: false });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    return {
      title: '我要推广',
      desc: '',
      path: '/pages/shop/share/share?sid=' + that.data.this_goods_id + '&shareuid=' + that.data.data_list.shareuid
    };
  }
})