//获取应用实例
Page({
  data: {
    current: 2,
    scrollTop: 0,
    scrollHeight: 0,
    pageNum: 1,
    hasRefesh: false,
    list: [],
    arr: [],
    arrHight: [],
    itemHeight: 96,
    offsetItemHeight: 42,
    px: 1,
    bottom: false,
    shareIcon: '../../imgs/icon/share.png',
    navH: 90
  },
  onShareAppMessage: function (res) {
    return {
      title: '押韵鹦鹉',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
        // shareAppMessage: ok,
        // shareTickets 数组，每一项是一个 shareTicket ，对应一个转发对象
        // 需要在页面onLoad()事件中实现接口
        wx.showShareMenu({
          // 要求小程序返回分享目标信息
          withShareTicket: true
        });
        if (res.shareTickets) {
          // 获取转发详细信息
          wx.getShareInfo({
            shareTicket: res.shareTickets[0],
            success(res) {
              res.errMsg; // 错误信息
              res.encryptedData;  //  解密后为一个 JSON 结构（openGId    群对当前小程序的唯一 ID）
              res.iv; // 加密算法的初始向量
            }
          });
        }
      }
    }
  },
  //加载更多
  loadMore: function (e) {
    var that = this;
    if(this.data.bottom){
      wx.showToast({
        title: '没找到结果哦',
        icon: 'fail',
        duration: 1000
      })
    }else if (!this.data.hasRefesh){
      this.data.pageNum++;
      this.data.hasRefesh = true;
      this.request(function(data){
        that.setData({
          list: that.data.list.concat(data)
        })
        that.data.hasRefesh = false;
      })
    }
  },
  request: function (success){
    var that = this
    wx.request({
      url: 'https://www.tengyu.site/api/rhyme/gallery',
      data:{
        page_num: that.data.pageNum ,
        page_size:10
      },
      success: function (res) {
        if (res.data.status.code == 0) {
          if (res.data.result.gallery.length > 0) {
            if (success){
              success(res.data.result.gallery)
            }else{
              var arr = [];
              var arrHight = [];
              var seeHeight = that.data.scrollHeight; //可见区域高度
              var length = seeHeight / that.data.itemHeight;
              for (var i = 0; i < length; i++) {
                arr[i] = true;
                arrHight[i] = i * that.data.itemHeight;
              }
              that.setData({
                arr: arr,
                arrHight: arrHight,
                list: res.data.result.gallery
              })
            }
            that.data.bottom = false;
          } else {
            that.data.bottom = true;
            wx.showToast({
              title: '没找到结果哦',
              icon: 'fail',
              duration: 1000
            })
            that.setData({
              hasRefesh: false
            })
          }
        } else {
          wx.showToast({
            title: '没找到结果哦',
            icon: 'fail',
            duration: 1000
          })
          that.setData({
            hasRefesh: false
          })
        }
      }
    })
  },
  scroll(e) {
    var arrHight = this.data.arrHight;
    var event = e;
    var scrollTop = e.detail.scrollTop;
    var arr = this.data.arr;
    for (var i = arrHight.length; i < this.data.list.length; i++) {
      let dis = arrHight[arrHight.length - 1] + 60 - this.data.scrollHeight;
      if ((arrHight[arrHight.length - 1] + 60 - this.data.scrollHeight) < scrollTop) {
        if (!arr[i]) {
          arr[i] = true;
          arrHight[i] = this.data.offsetItemHeight * this.data.pix;
        }
      }
    }
    this.setData({
      arr: arr,
      scrollTop: scrollTop
    })
  },
  onLoad: function () {
    let pix = wx.getSystemInfoSync().windowWidth / 750;
    let hei = this.data.offsetItemHeight * pix;
    let navH = this.data.navH * pix;
    this.setData({
      itemHeight: hei,
      pix: pix,
      navH: navH
    })
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    let hasCache = false;
    try {
      var param = wx.getStorageSync('paramFaxian')
      let current = wx.getStorageSync('currentFaxian')
      if (param) {
        this.data.pageNum = param
      }
      if (current && current.list.length > 0) {
        hasCache = true;
        var arr = [];
        var arrHight = [];
        var seeHeight = this.data.scrollHeight; //可见区域高度
        var length = seeHeight / this.data.itemHeight;
        for (var i = 0; i < length; i++) {
          arr[i] = true;
          arrHight[i] = i * this.data.itemHeight;
        }
        this.setData({
          arr: arr,
          arrHight: arrHight,
          list: current.list,
          total: current.total,
          scrollTop: current.scrollTop
        })
      }else{
        this.request();
      }
    } catch (e) {
      this.request();
    }
    if (!hasCache) {
      this.request();
    }
     
    wx.showShareMenu({
      withShareTicket: true
    }) 
  },
  onShow: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onHide: function () {
    let paramStorage = Number(this.data.pageNum);
    let current = {
      list: this.data.list,
      scrollTop: this.data.realScrollTop//页面滚动距离
    }
    wx.setStorage({
      key: "currentFaxian",
      data: current
    })
    wx.setStorage({
      key: "paramFaxian",
      data: paramStorage
    })
  }
})
