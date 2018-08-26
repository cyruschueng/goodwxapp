// pages/search/search.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchKey: '输入汉字开始搜索',
    param: {
      key: '',
      need_seg: true,
      page_num: 1,
      page_size: 30
    },
    mulTiItemW: 40,
    mulTiHei: 400,
    hasRefesh: false,
    list: [],
    px: 1,
    selected: [],
    showModal: false,
    loveIcon:'../../imgs/icon/love.png',
    shareIcon: '../../imgs/icon/share.png',
    noticeIcon:'../../imgs/icon/notice.png'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pix = wx.getSystemInfoSync().windowWidth / 750;
    let wid = this.data.mulTiItemW * pix;
    let mulTiHei = this.data.mulTiHei * pix;
    this.setData({
      mulTiItemW: wid,
      pix: pix,
      mulTiHei: mulTiHei
    })
    let hasCache = false;
    try {
      var param = wx.getStorageSync('paramMulti')
      let current = wx.getStorageSync('currentMulti')
      if (param) {
        this.setData({
          searchKey: param.key
        })
        this.data.param = param
      }
      if (current && current.list.length > 0) {
        hasCache = true;
        this.setData({
          list: current.list
        })
      }
    } catch (e) {
      this.list = [];
      this.data.param.page_num = 1;
      this.request();
    }
    if (!hasCache){
      this.list = [];
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
    this.list = [];
    this.data.param.key = e.detail.key;
    this.data.param.page_num = 1;
    this.data.param.need_seg = true;
    this.request();
  },
  del: function (e) {
    let selected = e.currentTarget.id.split('-');
    let index = selected[0];
    let sIndex = selected[1];

    let list = this.data.list;

    list[index].select.splice(sIndex, 1);
    this.setData({
      list: list
    })
  },
  select: function (e){
    let selected = e.currentTarget.id.split('-');
    let index = selected[0];
    let value = selected[1];
    let list = this.data.list;

    for(let i in this.data.list){
      if (typeof this.data.list[i].select != 'object' || this.data.list[i].select.length == 0) {
        list[i].select = [];
        list[i].scrollTop = 0;
        if( i == index){
          list[i].select[0] = value
        }
      }else if(i == index){
        let hei
        for (let j in this.data.list[i].select){
          if (value == this.data.list[i].select[j]){
            list[i].scrollTop = 30 * this.data.px * j;
            this.setData({
              list: list
            })
            return
          } else if (j == this.data.list[i].select.length - 1){
            list[i].scrollTop = 30 * this.data.px * j;
            list[i].select.push(value);
          }
        }
      }
    }
    this.setData({
      list: list
    })
  },
  scroll:function(e) {
    let scrollTop = e.detail.scrollTop;
    this.setData({
      scrollTop: scrollTop
    })
  },
  openHelp: function(){
    this.setData({
      showModal: true
    })
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
  },
  request: function (success, fail) {
    let me = this;
    me.data.param.key
    me.data.param.key != "" &&  wx.request({
      url: 'https://www.tengyu.site/api/rhyme/multi',
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
  loadMore: function (e) {  
    let index = e.currentTarget.id;
    let num = e.detail.value[0];

    if (num > this.data.list[index].cands.length -10){
      let list = this.data.list;
      let me = this;
      if (!me.data.hasRefesh) {
        if (me.data.list[index].page_num && me.data.list[index].page_num > 1){
          me.data.list[index].page_num++;
          me.data.param.page_num = me.data.list[index].page_num;
        }else{
          me.data.param.page_num = 2;
        }
        me.data.list[index].page_num = me.data.param.page_num;
        me.data.param.key = list[index].word;
        me.data.param.need_seg = false;
        me.data.hasRefesh = true;
        me.request(function (data){
          list[index].cands = list[index].cands.concat(data[0].cands);
          me.setData({
            list: list
          })
          me.data.hasRefesh = false;
        })
      }
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
      list: this.data.list
    }
    wx.setStorage({
      key: "currentMulti",
      data: current
    })
    wx.setStorage({
      key: "paramMulti",
      data: paramStorage
    })
  }
})