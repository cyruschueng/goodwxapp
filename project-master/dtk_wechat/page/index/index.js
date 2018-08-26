// index.js
var common = require('../../common/common.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    tokenstorage: '',
    swapstorage: '',
    userRole:'',
    indicatorColor: '#fff',
    indicatorActiveColor: '#dd553d',
    spread: '',
    spreadfirst: '',
    spreadLength:'',
    dataList: [],
    fxcximage: '1',
    buyticketimage: '1',
    ticketimage: '1',
    cardimage: '1',
    calculatorimage: '1',
    calendarimage: '1',
    bankimage: '1',
    shiborimage: '1',
    abouimage: '1',
    count:'',
    ressbookimage: '1',
    newsimage: '1',
    interestrateimage: '1',
    chooseimage: '1'
  },
  goToRisk: function () {
    wx.navigateTo({
      url: '../risk/risk'
    })
  },
  goTofengrong: function () {
    wx.navigateTo({
      url: '../fengrong/fengrong'
    })
  },
  goTojrfzyjh: function () {
    wx.navigateTo({
      url: '../partner/jrfzyjh/jrfzyjh'
    })
  },
  /* 计算器 */
  goToCalculator: function () {
    var _this = this;
    setTimeout(function () {
      wx.navigateTo({
        url: '../calculator/calculator'
      })
    }, 100);
    setTimeout(function () {
      _this.setData({
        calculatorimage: '1'
      })
    }, 400);
  },
  goToCalculatortouchstart: function () {
    var _this = this;
    this.setData({
      calculatorimage: '0.4'
    })
  },

  cleared: function () {
    var _this=this;
    setTimeout(function () {
      _this.setData({
        fxcximage: '1',
        buyticketimage: '1',
        ticketimage: '1',
        cardimage: '1',
        calculatorimage: '1',
        calendarimage: '1',
        bankimage: '1',
        shiborimage: '1',
        abouimage: '1',
        ressbookimage: '1',
        newsimage: '1',
        interestrateimage:'1',
        chooseimage:'1'
      })
    }, 500);
  },
  /* 资金业务 */
  goTofxcx: function () {
    var _this=this;
    setTimeout(function () {
      wx.navigateTo({
        url: '../list/list?urlid=user'
      })
    }, 100);
    setTimeout(function () {
      _this.setData({
        fxcximage: '1'
      })
    }, 400);
  },
  goTofxcxtouchstart: function () {
    var _this=this;
    this.setData({
      fxcximage: '0.4'
    })
  },
  goToyhzx: function () {
    wx.switchTab({
      url: '../user/user'
    })
  },
  //票友通讯录
  goToaddressbook: function () {
    var _this = this;
    setTimeout(function () {
      wx.navigateTo({
        url: '../addressbook/addressbook'
      })
    }, 100);
    setTimeout(function () {
      _this.setData({
        ressbookimage: '1'
      })
    }, 400);
  },
  goToaddressbooktouchstart: function () {
    var _this = this;
    this.setData({
      ressbookimage: '0.4'
    })
  },
  //票据资讯
  goTonews: function () {
    var _this = this;
    setTimeout(function () {
      wx.navigateTo({
        url: '../news/news'
      })
    }, 100);
    setTimeout(function () {
      _this.setData({
        newsimage: '1'
      })
    }, 400);
  },
  goTonewstouchstart: function () {
    var _this = this;
    this.setData({
      newsimage: '0.4'
    })
  },
  /* SHIBOR */
  goToshibor: function () {
    var _this = this;
    setTimeout(function () {
      wx.navigateTo({
        url: '../shibor/shibor'
      })
    }, 100);
    setTimeout(function () {
      _this.setData({
        shiborimage: '1'
      })
    }, 400)
  },
  goToshibortouchstart: function () {
    var _this = this;
    this.setData({
      shiborimage: '0.4'
    })
  },
  /* 关于我们 */
  goToAbout: function () {
    var _this = this;
    setTimeout(function () {
      wx.navigateTo({
        url: '../about/about'
      })
    }, 100);
    setTimeout(function () {
      _this.setData({
        abouimage: '1'
      })
    }, 400)
  },
  goToAbouttouchstart: function () {
    var _this = this;
    this.setData({
      abouimage: '0.4'
    })
  },
  /* 大额行号 */
  goToBank: function () {
    var _this = this;
    setTimeout(function () {
      wx.navigateTo({
        url: '../bankquery/bankquery'
      })
    }, 100);
    setTimeout(function () {
      _this.setData({
        bankimage: '1'
      })
    }, 400)
  },
  goToBanktouchstart: function () {
    var _this = this;
    this.setData({
      bankimage: '0.4'
    })
  },
  /* 开票日历 */
  goTocalendar: function() {
    var _this = this;
    setTimeout(function () {
      wx.navigateTo({
        url: '../calendar/calendar'
      })
    }, 100);
    setTimeout(function () {
      _this.setData({
        calendarimage: '1'
      })
    }, 400)
  },
  goTocalendartouchstart: function () {
    var _this = this;
    this.setData({
      calendarimage: '0.4'
    })
  },
 /* 我要卖票 */
  goToticket:function(){
    var _this = this;
    setTimeout(function () {
      wx.navigateTo({
        url: '../ticket/ticket'
      })
    }, 100);
    setTimeout(function () {
      _this.setData({
        ticketimage: '1'
      })
    }, 400)
  },
  goTotickettouchstart: function () {
    var _this = this;
    this.setData({
      ticketimage: '0.4'
    })
  },
  /* 我要收票 */
  goTobuyticket: function () {
    var _this = this;
    setTimeout(function () {
      wx.navigateTo({
        url: '../buyticket/buyticket'
      })
    }, 100);
    setTimeout(function () {
      _this.setData({
        buyticketimage: '1'
      })
    }, 400)
  },
  goTobuytickettouchstart: function () {
    var _this = this;
    this.setData({
      buyticketimage: '0.4'
    })
  },
  /* 业务推广 */
  goTocard: function () {
    var _this = this;
    setTimeout(function () {
      wx.navigateTo({
        url: '../card/card'
      })
    }, 100);
    setTimeout(function () {
      _this.setData({
        cardimage: '1'
      })
    }, 400)
  },
  goTocardtouchstart: function () {
    var _this = this;
    this.setData({
      cardimage: '0.4'
    })
  },
  cardlist: function () {
    wx.navigateTo({
      url: '../cardList/cardList'
    })
  }, 
  //利率反查
  goTointerestrate: function () {
    var _this = this;
    setTimeout(function () {
      wx.navigateTo({
        url: '../reverse/reverse'
      })
    }, 100);
    setTimeout(function () {
      _this.setData({
        interestrateimage: '1'
      })
    }, 400)
  },
  goTointerestratetouchstart: function () {
    var _this = this;
    this.setData({
      interestrateimage: '0.4'
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    //获取storage的token
    wx.getStorage({
      key: 'tokenstorage',
      success: function (res) {
        _this.setData({
          tokenstorage: res.data,
        })
      }
    })
    //获取storage的swap
    wx.getStorage({
      key: 'swapstorage',
      success: function (res) {
        _this.setData({
          swapstorage: res.data,
        })
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
    var _this = this;
    wx.getStorage({
      key: 'tokenstorage',
      success: function (res) {
        _this.setData({
          tokenstorage: res.data,
        })
      }
    })
    //获取角色权限
    wx.getStorage({
      key: 'userRole',
      success: function (res) {
        _this.setData({
          userRole: res.data,
        })
      }
    })
    //获取storage的新闻列表和banner
    try {
      var value = wx.getStorageSync('newsList')
      var banner = wx.getStorageSync('banner')
      if (value) {
        _this.setData({
          newsList: value,
        })
      } else {
        _this.newsList();
      }
      if (banner) {
        _this.setData({
          imgUrls: banner,
        })
      } else {
        _this.banner();
      }
    } catch (e) {
      // Do something when catch error
    }
    //异步请求，成功执行，
    wx.getStorage({
      key: 'newsList',
      success: function (res) {
        _this.newsList();
      }
    })
    wx.getStorage({
      key: 'banner',
      success: function (res) {
        _this.banner();
      }
    })
    _this.count()
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
  
  onPullDownRefresh: function () {

  },
 */
  /**
   * 页面上拉触底事件的处理函数

  onReachBottom: function () {

  },
   */
  /**
   * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return {
      title: '票据通'
    }
  },
  newsList: function () {
    var _this = this;
    wx.request({
      url: common.getRequestUrl + '/dtk/news',
      data: {
        'page_size': 3,
        'page_no': 0
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.code == 'OK') {
          wx.stopPullDownRefresh()
          var dataLength = res.data.data.length;
          if (dataLength <= '0') {
            wx.showToast({
              title: '没有数据了',
              duration: 2000
            })
            _this.setData({
              loadingHidden: true
            });
          } else if (dataLength > 0) {
            var dataList = res.data.data;
            for (var j = 0; j < dataList.length; j++) {
              var create_datetime = dataList[j].create_datetime
              dataList[j].create_datetime = create_datetime.substring(0, 10);
            }
            wx.setStorageSync('newsList', dataList)
            _this.setData({
              dataList: dataList,
              loadingHidden: true
            });
          }
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../index/index'
            })
          }.bind(this), 500);
        }
        if (_this.data.dataList.length <= 0) {
          _this.setData({
            listBox: true
          });
        } else {
          _this.setData({
            listBox: false
          });
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  //取得通讯录人数
  count: function () {
    var _this = this;
    wx.request({
      url: common.getRequestUrl + '/dtk/contacts/count',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.code == 'OK') {
          _this.setData({
            count: res.data.count
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../index/index'
            })
          }.bind(this), 500);
        }
      },
      fail: function (err) {
        console.log(err)
      }
    }) 
  },

  //检索banner图
  banner: function () {
    var _this = this;
    wx.request({
      url: common.getRequestUrl + '/dtk/search/banner',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {},
      success: function (res) {
        if (res.data.code == 'OK') {
          _this.setData({
            imgUrls: res.data.data
          })
          wx.setStorageSync('banner', res.data.data);
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../index/index'
            })
          }.bind(this), 500);
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  listClick: function (event) {
    var id = event.currentTarget.id;
    setTimeout(function () {
      wx.navigateTo({ url: '../carddetail/carddetail?id=' + id })
    }, 400);
  },
  goTobanner: function (event){
    var newsid = event.currentTarget.dataset.newsid;
    if (newsid !== 0){
      setTimeout(function () {
        wx.navigateTo({ url: '../newsdetail/newsdetail?id=' + newsid })
      }, 400);
    }
    
  },
  //图片打码
  goTochooseImage:function(){
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
      }
    })
    setTimeout(function () {
      _this.setData({
        chooseimage: '1'
      })
    }, 400)
  },
  goTochooseImagetouchstart: function () {
    var _this = this;
    this.setData({
      chooseimage: '0.4'
    })
  },
  listClick: function (event) {
    var id = event.currentTarget.id;
    setTimeout(function () {
      wx.navigateTo({ url: '../newsdetail/newsdetail?id=' + id })
    }, 200);

  },



})