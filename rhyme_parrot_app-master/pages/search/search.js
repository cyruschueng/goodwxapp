// pages/search/search.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchKey: '山雨',
    param: {
      key: '山雨',
      source: 'song',
      page_num: 1,
      page_size: 10
    },
    hasRefesh: false,
    list: [],
    px: 1,
    total: 0,
    radioItems: [{ name: '歌词', value: 'song' , checked: true},
      { name: '诗词', value: 'poem', checked: false}],
    scrollHeight: 0,
    arr: [],
    arrHight: [],
    scrollTop: 0,
    itemHeight: 96,
    shareIcon: '../../imgs/icon/share.png',
    offsetItemHeight: 192
  },
  scroll(e) {
    var arrHight = this.data.arrHight;
    var event = e;
    var scrollTop = e.detail.scrollTop;
    var arr = this.data.arr;
    for (var i = arrHight.length; i < this.data.list.length; i++) {
      let dis = arrHight[arrHight.length - 1] + 60 - this.data.scrollHeight;
      if (dis < scrollTop) {
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
  openToastPannel() {
    wx.showModal({
      title: '押韵鹦鹉',
      content: '输入你想查找的词或者字，点击搜索，可以找到与之押韵的歌词或者诗句。欢迎分享和收藏押韵鹦鹉！'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pix = wx.getSystemInfoSync().windowWidth / 750;
    let hei = this.data.offsetItemHeight * pix;
    this.setData({
      itemHeight: hei,
      pix: pix
    })

    let hasCache = false;
    try {
      var param = wx.getStorageSync('paramSearch')
      let current = wx.getStorageSync('currentSearch')
      if (param) {
        this.setData({
          searchKey: param.key
        })
        this.data.param = param
      }
      if (current && current.list.length > 0) {
        hasCache = true;
        var arr = [];
        var arrHight = [];
        var seeHeight = me.data.scrollHeight; //可见区域高度
        var length = seeHeight / me.data.itemHeight;
        for (var i = 0; i < length; i++) {
          arr[i] = true;
          arrHight[i] = i * me.data.itemHeight;
        }
        let sources = [];
        for (let i in this.data.radioItems){
          this.sources.push(this.data.radioItems[i])
          if (this.data.param.source == this.data.radioItems[i].value){
            this.data.radioItems[i].checked = true;
          }else{
            this.data.radioItems[i].checked = false;
          }         
        }
        this.setData({
          radioItems: radioItems
        })

        this.setData({
          arr: arr,
          arrHight: arrHight,
          list: current.list,
          total: current.total,
          scrollTop: current.scrollTop
        })
      }
    } catch (e) {
      this.data.param.page_num = 1;
      this.request();
    }
    if (!hasCache){
      this.data.param.page_num = 1;
      this.request();
    }
    let me = this;
    wx.getSystemInfo({
      success: function (res) {
        me.setData({
          scrollHeight: res.windowHeight
        });
      }
    }); 
  },
  searchRequest: function (e) {
    this.data.param.key = e.detail.key;
    this.data.param.page_num = 1;
    this.setData({
      scrollTop:0
    })
    this.request();
  },
  radioChange: function(e) {
    this.data.param.source = e.detail.value;
    this.data.param.page_num = 1;
    this.setData({
      scrollTop: 0
    })
    this.request();
  },
  request: function (success, fail) {
    let me = this;
    wx.request({
      url: 'https://www.tengyu.site/api/rhyme/search',
      data: me.data.param,
      success: function (res) {
        if (res.data.status.code == 0) {
          if (res.data.result.list.length > 0) {
            if(!success) {
              var arr = [];
              var arrHight = [];
              var seeHeight = me.data.scrollHeight; //可见区域高度
              var length = seeHeight / me.data.itemHeight;
              for (var i = 0; i < length; i++) {
                arr[i] = true;
                arrHight[i] = i * me.data.itemHeight;
              } 
              me.setData({
                arr: arr,
                arrHight: arrHight,
                total: res.data.result.total,
                list: res.data.result.list
              })
            }else {
              success(res.data.result.list)
            }
            me.setData({
              total: res.data.result.total
            })
          } else {
            wx.showToast({
              title: '没找到结果哦',
              icon: 'fail',
              duration: 1000
            })
            me.data.hasRefesh = false
          }
        } else {
          wx.showToast({
            title: '没找到结果哦',
            icon: 'fail',
            duration: 1000
          })
          me.data.hasRefesh = false
        }
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  loadMore: function () {
    let me = this;
    if (!me.data.hasRefesh) {
      me.data.param.page_num++;
      me.data.hasRefesh = true;
      me.request(function (data){
        me.setData({
          list: me.data.list.concat(data)
        })
        me.data.hasRefesh = false;
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
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
  onHide: function () {
    let paramStorage = this.data.param;
    let current = {
      list: this.data.list,
      total: this.data.total,
      scrollTop: this.data.scrollTop//页面滚动距离
    }
    wx.setStorage({
      key: "currentSearch",
      data: current
    })
    wx.setStorage({
      key: "paramSearch",
      data: paramStorage
    })
  }
})