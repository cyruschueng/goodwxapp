var app = getApp();
var that;
Page({
  data: {
    query: '',//查询的关键字
    bookList: [],
    bookDetail: '',
    detailStatus: false,
    windowHeight: 0,
    windowWidth: 0,
    currentPage:1,
    allPages:1,
    hideHeader: true,
    hideBottom: true,
    refreshTime: '', // 刷新的时间 
    scrollTop:0,
    loadMoreData:'上拉加载下一页',
  },

  onLoad: function (option) {
    var date = new Date();
    this.setData({
      refreshTime: date.toLocaleTimeString()
    })
    if (option.q) {
      this.setData({
        query: option.q
      });
      this.queryBook();
    }
  },
  onShow: function (option) {
    that=this
    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
  },
  handleInput: function (e) {
    this.setData({
      query: e.detail.value
    });
  },

  // 获取焦点
  inputFocus: function (e) {
    if (e.target.id === 'query') {
      this.setData({
        queryFocus: true
      });
    }
  },

  // 失去焦点
  inputBlur: function (e) {
    if (e.target.id === 'query') {
      this.setData({
        queryFocus: false
      });
    }
  },

  queryBook: function (e) {
    if (e && e.target.id === 'query') {
      this.setData({
        query: e.detail.value,
        currentPage: 1,
        allPages: 1,
      });
    }
    // 加载中
    wx.showLoading({
      title: '查询中',
      mask: true
    });

    wx.request({
      url: getApp().data.serachBookUrl,
      method: 'POST',
      data: {
        bookName: this.data.query
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: requestRes => {
        var _requestRes = requestRes.data;
        console.log(_requestRes.lists[0].page);
        var pageNum = _requestRes.lists[0].page;
        if (_requestRes.lists.length > 0) {
          this.setData({
            bookList: _requestRes.lists,
            allPages: pageNum.split("/")[1]//总页数
          });
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '查询失败',
            image: '/image/common/fail.png',
            duration: 2000
          });
        }
      },
      fail: () => {
        wx.hideLoading();
        wx.showToast({
          title: '未知错误',
          image: '/image/common/fail.png',
          duration: 2000
        });
      },
      complete: () => {
        wx.hideLoading();
      }
    });
  },

  getDetail: function (href) {
    this.setData({
      bookDetail: ''
    });
    // 加载中
    wx.showLoading({
      title: '加载中',
      mask: true
    });

    wx.request({
      url: getApp().data.serachBookDetailUrl,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        href: href
      },
      success: requestRes => {
        var _requestRes = requestRes.data;
        console.log(_requestRes);

        if (_requestRes.tv_libdetail_detail != "") {
          this.setData({
            bookDetail: _requestRes
          });
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '查询失败',
            image: '/image/common/fail.png',
            duration: 2000
          });
        }
      },
      fail: () => {
        wx.hideLoading();
        wx.showToast({
          title: '未知错误',
          image: '/image/common/fail.png',
          duration: 2000
        });
      },
      complete: () => {
        wx.hideLoading();
      }
    });
  },

  showDetail: function (e) {
    var id = e.currentTarget.id;

    if (id) {
      this.getDetail(id);
    }
    // 更新视图
    this.setData({
      detailStatus: true
    });
  },
  pullUpLoad: function (e) {
    this.nextPage()
  },

  onPullDownRefresh: function () {
    console.log('下拉上一页');
    var self = this;
    // 当前页是最后一页
    if (self.data.currentPage == 1) {
      wx.showToast({
        title: '已是第一页',
        icon: 'success',
        duration: 2000
      })
      return;
    }
    this.setData({
      currentPage: this.data.currentPage - 1
    })
    this.nextPage('上一页');
    
  }, 
  onReachBottom: function () {
    console.log("上拉加载下一页")
    var self = this;
    // 当前页是最后一页
    if (self.data.currentPage == self.data.allPages) {
      self.setData({
        loadMoreData: '已加载全部'
      })
      return;
    }
    this.setData({
      currentPage: this.data.currentPage + 1
    })
    this.nextPage('下一页');
    self.setData({
      hideBottom: false
    })

    
  }, 

  
  nextPage:function(title){
    console.log('currentPage:' + this.data.currentPage)    
    // 加载中
    wx.showLoading({
      title: title,
      mask: true
    });

    wx.request({
      url: getApp().data.serachBookNextPageUrl,
      method: 'POST',
      data: {
        bookName: this.data.query,
        num: this.data.currentPage
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: requestRes => {
        var _requestRes = requestRes.data;
        // console.log(_requestRes);
        if (_requestRes.lists.length > 0) {
          this.setData({
            bookList:  _requestRes.lists,
          });
          wx.pageScrollTo({
            scrollTop: 0
          })
          console.log(this.data.bookList);
          
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '查询失败',
            image: '/image/common/fail.png',
            duration: 2000
          });
        }
      },
      fail: () => {
        wx.hideLoading();
        wx.showToast({
          title: '未知错误',
          image: '/image/common/fail.png',
          duration: 2000
        });
      },
      complete: () => {
        wx.hideLoading();
      }
    });
  },
  hideDetail: function (e) {
    if (e.target.id === 'query-detail' || e.target.id === 'close-detail') {
      this.setData({
        detailStatus: false
      });
    }
  }
});
