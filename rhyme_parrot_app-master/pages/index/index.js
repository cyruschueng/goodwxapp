//index.js
//获取应用实例
Page({
  data: {
    searchKey: '山',
    param: {
      key: '山',
      use: 'rhyme',
      merged_by: 'pinyin',
      page_num: 1,
      detail_of: 'an',
      sort_reverse: 'True',
      source: 'song',
      need_expand: false,
      page_size: 10,
      sort_reverse: 'True'
    },
    setIcon: '../../imgs/icon/set.png',
    shareIcon: '../../imgs/icon/share.png',
    noticeIcon: '../../imgs/icon/notice.png',
    modalTitle: '',
    hasRefesh: false,
    radioItems: [],
    showModalStatus: true,
    searchBorderColor: '#aaddca',
    scrollHeight: 0,
    querySelected: {
      song: '歌词',
      poem: '诗词',
      char: '汉字',
      pinyin: '拼音',
      rhyme: '韵母'
    },
    content: '自定义toast组件',
    list: [],
    arr: [],
    arrHight: [],
    scrollTop: 0,
    itemHeight: 96,
    offsetItemHeight: 192,
    px: 1,
    bottom: false,
    showDeatil: false,
    detail:{}
  },
  showModal: function(e){
    let items;
    let me = this;
    switch (e.currentTarget.id){
      case 'source':
        me.setData({
          modalTitle: '搜索来源'
        })
        items = [{ name: '歌词', value: 'song'},
        { name: '诗词', value: 'poem'}]
        break
      case 'use':
        me.setData({
          modalTitle: '搜索因素'
        })
        items = [{ name: '汉字', value: 'char' },
        { name: '拼音', value: 'pinyin' },
        { name: '韵母', value: 'rhyme'}]
        break
      case 'merged_by':
        me.setData({
          modalTitle: '是否合并'
        })
        items = [{ name: '汉字', value: 'char' },
        { name: '拼音', value: 'pinyin' },
        { name: '韵母', value: 'rhyme' },
        {name: '不合并', value: 'false'}]
        break
    }
    for (let i in items) {
      let index = -1;
      if (this.data.param[e.currentTarget.id] == items[i].value) {
        items[i].checked = true;
        index = i;
        break
      } else if (i == items.length - 1) {
        items[0].checked = true;
      } 
    }
    this.setData({
      showModalStatus: true,
      radioItems: items
    })
  },
  radioChange: function (e) {
    let value = this.data.param
    switch (this.data.modalTitle){
      case '搜索来源':
        value.source = e.detail.value 
        break
      case '搜索因素':
        value.use = e.detail.value 
        break
      case '是否合并':
        value.merged_by = e.detail.value 
        break
    }
    this.setData({
      param: value
    })
    this.data.param.page_num =1;
    this.setData({
      scrollTop: 0
    })
    this.request();
  },
  openToastPannel(){
    wx.showModal({
      title: '押韵鹦鹉',
      content: '押韵鹦鹉可以查找押韵素材，帮助你创作诗歌。输入一句自己写的歌词或者想押韵的字，点击搜索，可以找到与之押韵的歌词或者诗句。欢迎分享和收藏押韵鹦鹉！'
    })
  },
  onLoad: function () {
    let pix = wx.getSystemInfoSync().windowWidth / 750;
    let hei = this.data.offsetItemHeight * pix;
    this.setData({
      itemHeight: hei,
      pix: pix
    })
    let hasCache = false;
    try {
      var param = wx.getStorageSync('param')
      let current = wx.getStorageSync('current')
      if (param) {
        this.setData({
          searchKey: param.key,
          param: param
        })
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
        this.setData({
          arr: arr,
          arrHight: arrHight,
          list: current.list,
          scrollTop: current.scrollTop
        })
      }
    } catch (e) {
      this.data.param.page_num = 1;
      this.request();
    }
    if (!hasCache) {
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
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  //加载更多
  loadMore: function (e) {
    let me = this;
    let page_num = (me.data.param.page_num);
    if (!me.data.hasRefesh && me.data.bottom) {
      me.data.param.page_num = (page_num + 1);
      me.data.hasRefesh = true
      me.request(function (data){
        me.setData({
          list: me.data.list.concat(data),
          hasRefesh: false
        })
      })
    }
  },
  searchRequest: function (e) {
    this.data.param.key = e.detail.key;
    this.data.param.page_num = 1;
    this.setData({
      scrollTop:0
    })
    this.request();
  },
  request: function (success, fail) {
    let me = this;
    wx.request({
      url: 'https://www.tengyu.site/api/rhyme/rhyme',
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
                list: res.data.result.list
              })
            }else {
              success(res.data.result.list)
            }
            me.data.bottom = true;
            me.setData({
              hasRefesh: false
            })
          } else {
            me.data.bottom = false;
            wx.showToast({
              title: '没找到结果哦',
              icon: 'fail',
              duration: 1000
            })
            me.setData({
              hasRefesh: false
            })
          }
        } else {
          wx.showToast({
            title: '没找到结果哦',
            icon: 'fail',
            duration: 1000
          })
          me.setData({
            hasRefesh: false
          })
        }
      }
    })
  },
  onShow: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  }, 
  scroll(e){
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
  onHide: function() {
      let paramStorage = this.data.param;
      let current = {
        list: this.data.list,
        scrollTop: this.data.scrollTop//页面滚动距离
      }
      wx.setStorage({
        key: "current",
        data: current
      })
      wx.setStorage({
        key: "param",
        data: paramStorage
      })  
  },
  openDeatil(e){
    let index = e.currentTarget.id;
    let detail = this.data.list[index];
    this.setData({
      showDeatil: true,
      detail:detail
    });
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showDeatil: false
    });
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
  }
})
