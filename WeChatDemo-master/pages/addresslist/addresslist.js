// pages/addresslist/addresslist.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    tabs: ["按行业", "按专业", "按年级"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    list1: [],
    list2: [],
    list3: [],
    url: '',
    people: 0,
    alumniID: 0,
    search: '',
    nowPage: 1, // 设置加载的第几次，默认是第一次 
    pageNum: 15, //返回数据的个数
    loading: false, //"上拉加载"的变量，默认false，隐藏  
    loadingcomplete: false  //“没有数据”的变量，默认false，隐藏
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    var _this = this;
    var openid = app.globalData.openid;
    if (openid != '' || openid != undefined) {
      var datas = {
        keywords: e.detail.value,
        id: _this.data.alumniID
      }
      wx.request({
        url: app.globalData.url + 'searchXiaoyou',
        data: datas,
        method: 'POST',
        success: function (res) {
          _this.setData({
            search: res.data
          });
        },
        fail: function (res) {
        }
      })
    }
    this.setData({
      inputVal: e.detail.value
    });
  },
  tabClick: function (e) {
    var _this = this;
    var types = parseInt(e.currentTarget.id) + 1;
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
      nowPage: 1,
      loadingcomplete: false
    });
    wx.request({
      url: app.globalData.url + 'apiXiaoyouDetail2',
      data: {
        id: _this.data.alumniID,
        type: types,
        nowPage: _this.data.nowPage,
        pageNum: _this.data.pageNum
      },
      success: function (res) {
        if (types == 3){
          _this.setData({
            list3: res.data
          })
        } else if(types == 2){
          _this.setData({
            list2: res.data
          })
        } else if (types == 1) {
          _this.setData({
            list1: res.data
          })
        }
        var lengths = 0;
        for (var x in res.data) {
          lengths += res.data[x].length;
        }
        if (lengths >= _this.data.pageNum) {
          _this.setData({
            loading: true
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this;
    that.setData({
      alumniID: options.id
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    // wx.request({
    //   url: app.globalData.url + 'apiXiaoyouDetail',
    //   data: {
    //     id: options.id,
    //     type: 1,
    //     nowPage: that.data.nowPage,
    //     pageNum: that.data.pageNum
    //   },
    //   success: function(res){
    //     that.setData({
    //       list1: res.data
    //     })
    //   }
    // })
    wx.request({
      url: app.globalData.url + 'apiXiaoyouDetail2',
      data: {
        id: options.id,
        type: that.data.activeIndex + 1,
        nowPage: that.data.nowPage,
        pageNum: that.data.pageNum
      },
      success: function (res) {
        wx.hideLoading();
        that.setData({
          list2: res.data
        })
        var lengths = 0;
        for (var x in res.data) {
          lengths += res.data[x].length;
        }
        if (lengths >= that.data.pageNum){
          that.setData({
            loading: true
          })
        }
      }
    })
    // console.info(that.data.navbar+1);
    // wx.request({
    //   url: app.globalData.url + 'apiXiaoyouDetail',
    //   data: {
    //     id: options.id,
    //     type: 3,
    //     nowPage: that.data.nowPage,
    //     pageNum: that.data.pageNum
    //   },
    //   success: function (res) {
    //     that.setData({
    //       list3: res.data
    //     })
    //   }
    // })
    var _this = this;
    wx.request({
      url: app.globalData.url + 'apiXiaoyouhuiDetail/' + options.id,
      success: function (res) {
        that.setData({
          people: res.data.number_xiaoyouhui
        })
      },
      fail: function (res) {
      }
    })
  },
  watch: function () {
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
    this.setData({
      inputVal: "",
      inputShowed: false
    });
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var _this = this;
    if (_this.data.loading && !_this.data.loadingcomplete) {
      _this.setData({
        nowPage: parseInt(_this.data.nowPage) + 1
      })
      _this.requests();
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  requests: function(){
    
    var _this = this;
    var nowpage = _this.data.nowPage;
    var types = parseInt(_this.data.activeIndex) + 1;
    wx.request({
      url: app.globalData.url + 'apiXiaoyouDetail2',
      data: {
        id: _this.data.alumniID,
        type: types,
        nowPage: nowpage,
        pageNum: _this.data.pageNum
      },
      success: function (res) {
        if (res.data == '' || res.data == null){
          _this.setData({
            loading: false,
            loadingcomplete: true
          })
        }else{
          if (types == 3) {
            var list3 = _this.data.list3;
            for (var i in res.data) {
              if (list3.hasOwnProperty(i)) {
                list3[i] = list3[i].concat(res.data[i]);
              } else {
                list3[i] = res.data[i];
              }
            }
            _this.setData({
              list3: list3
            })
          } else if (types == 2) {
            var list2 = _this.data.list2;
            for (var i in res.data) {
              if (list2.hasOwnProperty(i)) {
                list2[i] = list2[i].concat(res.data[i]);
              } else {
                list2[i] = res.data[i];
              }
            }
            _this.setData({
              list2: list2
            })
          } else if (types == 1) {
            var list1 = _this.data.list1;
            for (var i in res.data) {
              if (list1.hasOwnProperty(i)) {
                list1[i] = list1[i].concat(res.data[i]);
              } else {
                list1[i] = res.data[i];
              }
            }
            _this.setData({
              list1: list1
            })
          }
        }
      }
    })
  }
})