var util = require('../../../util/util.js');

Page({
  data: {
    focus: true,
    hellspawnList: [],
    popularList: [],
    searchText: "",
    page: 1,
    hidden: false,
    show: true,//搜索结果
    tabhideen: true,//tab切换
    searchData: [],
    empty: {
      isshow: true,
      title: '咦？什么也没有？'
    },
    newData: {
      data: [],
      pgoffset: 20,
      pgstart: 0,
      type: 'new',
      hotshidden: false, // 显示加载更多 loading
      hothidden: true,
      loadingMore: false, //是否正在加载
    },
    hotData: {
      data: [],
      pgoffset: 20,
      pgstart: 0,
      type: 'hot',
      hotshidden: false, // 显示加载更多 loading
      hothidden: true,
      loadingMore: false, //是否正在加载
    }
  },
  onLoad: function (options) {
    this.setData({
      searchData: wx.getStorageSync('searchData')
    })
  },
  //事件处理函数
  getPopular: function () {
    var that = this;
    //大家都再搜
    util.Ajax('v1/promote/list', {
      page: that.data.page,
      type: 'keywords'
    }, function (res) {
      if (res.data.errno == 0) {
        that.setData({
          popularList: res.data.response,
          hidden: true,
          // hotshidden: true
        })
      }
    });

  },
  bindSearch: function (e) {
    this.setData({
      searchText: e.detail.value
    })
  },
  handleTap: function (event) {
    if (event.target.dataset.index == 1) {
      this.setData({
        tabhideen: true
      })
    } else {
      this.setData({
        tabhideen: false
      })
    }
  },
  controlClose: function () {
    this.setData({
      focus: false
    })
    return;

  },
  openClose: function () {
    this.setData({
      focus: true
    })
    return;
  },
  clickClose: function () {

    this.setData({
      focus: false,
      searchText: '',
      show: true,
      searchData: wx.getStorageSync('searchData')

    })
    return;
  },
  searchClickEvent: function (event) {

    var keyword = event.target.dataset.keyword;
    var that = this;
    if (keyword) {

      that.setData({
        searchText: keyword
      })

    }


    if (!that.data.searchText) {
      return;
    }

    //存储搜索记录
    var searchData = wx.getStorageSync('searchData') || [];
    searchData.unshift(that.data.searchText);
    let sd = util.arrUnique(searchData);
    wx.setStorageSync('searchData', sd);

    searchAjax(that.data.newData, that.data.searchText, function (data) {

      if (that.data.newData.pgstart == 0 && data.length == 0) {
        that.setData({
          show: false,
          'newData.hotshidden': true,
          'empty.isshow': false
          // hotshidden: true
        })
        return;
      }

      that.setData({
        'newData.data': data,
        show: false,
        'newData.hotshidden': true
        // hotshidden: true
      })
    })

    searchAjax(that.data.hotData, that.data.searchText, function (data) {

      if (that.data.hotData.pgstart == 0 && data.length == 0) {
        that.setData({
          show: false,
          'hotData.hotshidden': true,
          'empty.isshow': false
          // hotshidden: true
        })
        return;
      }

      that.setData({
        'hotData.data': data,
        show: false,
        'hotData.hotshidden': true
        // hotshidden: true
      })
    })



  },
  delHistory: function (event) {
    let idx = event.target.dataset.idx
    if (idx != undefined) {
      let searchData = wx.getStorageSync('searchData');
      let sd = util.arrRemove(searchData, idx);
      wx.setStorageSync('searchData', sd);
      this.setData({
        searchData: sd
      })
    }
    return;
  },
  scrolltolower: function (e) {

    var that = this;
    var tabhideen = that.data.tabhideen;
    //true->最新 false->最热
    if (tabhideen) {
      var searchData = that.data.newData;
    } else {
      var searchData = that.data.hotData;
    }

    if (searchData.loadingMore) return;
    searchData.pgstart++;

    if (tabhideen) {
      that.setData({
        'newData.hotshidden': false,
        'newData.loadingMore': true
      })
    } else {
      that.setData({
        'hotData.hotshidden': false,
        'hotData.loadingMore': true
      })
    }

    searchAjax(searchData, that.data.searchText, function (data) {
      if (data.length < searchData.pgoffset) {
        if (tabhideen) {
          that.setData({
            'newData.hotshidden': false
          })
        } else {
          that.setData({
            'hotData.hotshidden': false,
          })
        }

      }
      if (tabhideen) {
        that.setData({
          'newData.data': (searchData.data).concat(data),
          'newData.loadingMore': false
        })
      } else {
        that.setData({
          'hotData.data': (searchData.data).concat(data),
          'hotData.loadingMore': false
        })
      }

    })

  },
  onShareAppMessage: function () {
    return {
      title: '99广场舞 - 专业广场舞视频教学网站',
      desc: '99广场舞以“人人都是舞蹈家”为核心理念，以“全民健身”为主旨，注重打造一个专业、全面、便捷的广场舞视频分享交流平台，让喜爱广场舞的人们，在学跳广场舞的过程中，不仅能够健身娱乐休闲，更能一步步的实现自己的舞蹈梦。',
      path: 'page/999d/index/index'
    }
  },
  onShow: function () {
    this.getPopular();
  }

})

function searchAjax(data, keyword, callback) {

  util.Ajax('v2/app/search', {
    pgoffset: data.pgoffset,
    pgstart: data.pgstart,
    keywords: keyword,
    type: data.type
  }, function (res) {
    if (res.data.code == 0) {
      callback && callback(res.data.data);
    }
  });




}
