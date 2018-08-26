var app = getApp()
Page({
  data: {
    benid:wx.getStorageSync('userInfo').id,
    drop: ['/img/down.png', '/img/up.png'],
    iconList: [
      { cn: '电影', en: 'movie', url: '/img/movie.png', url1: '/img/movie1.png', color: '#fe4c52' },
      { cn: '旅行', en: 'travel', url: '/img/traval.png', url1: '/img/travel1.png', color: '#41c9a5' },
      { cn: '唱歌', en: 'ktv', url: '/img/ktv.png', url1: '/img/ktv1.png', color: '#feae0f' },
      { cn: '爬山', en: 'climb', url: '/img/climb.png', url1: '/img/climb1.png', color: '#2fbceb' },
      { cn: '运动', en: 'sports', url: '/img/sports.png', url1: '/img/sports1.png', color: '#f68632' },
      { cn: '跑腿', en: 'running', url: '/img/running.png', url1: '/img/running1.png', color: '#3c9edf' },
      { cn: '酒吧', en: 'drink', url: '/img/drink.png', url1: '/img/drink1.png', color: '#ff704b' },
      { cn: '吃饭', en: 'dine', url: '/img/dine.png', url1: '/img/dine1.png', color: '#f76278' },
      { cn: '逛街', en: 'shopping', url: '/img/shopping.png', url1: '/img/shopping1.png', color: '#15c3ba' },
      { cn: '公益', en: 'charity', url: '/img/chrity.png', url1: '/img/chrity1.png', color: '#8fca00' },
    ],
    typeList: [
      { id: 0, name: '年龄段', list: ['不限', '18-23岁', '24-29岁', '30-35岁', '36-41岁', '42-50岁', '51-60岁'], active: 0, open: false },
      { id: 1, name: '婚姻状态', list: ['不限', '未婚', '已婚', '离异'], active: 0, open: false },
      { id: 2, name: '星座', list: ['不限', '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天枰座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'], active: 0, open: false },
      { id: 3, name: '开支性质', list: ['不限', 'AA', '我做东', '求请', '男A女免'], active: 0, open: false },
      { id: 4, name: '性别', list: ['不限', '男', '女'], active: 0, open: false },
      { id: 5, name: '金额', list: ['不限', '10-100元', '100-500元', '500-1000元', '1000-5000元'], active: 0, open: false },
    ],
    city: '',
    toShow: [],
    op: false,
    list: [],
    total: 0,
    total_page: 0,
    limit: 5,
    page: 1,
    city: wx.getStorageSync('city'),
    cn: '电影',
    en: 'movie',
    re: true,
    hobby: [],
  },
  bindTapType: function (e) {

    var that = this
    var cn = e.currentTarget.dataset.cn
    var en = e.currentTarget.dataset.en
    this.setData({ cn: cn, en: en, op: true })
    var list = this.data.typeList;
    for (var i = 0; i < list.length; i++) {
      list[i].list[0] = "";
    }
    // 条件不选是填 “”  不能填 “不限”
    wx.request({
      url: app.api + 'searchActs',
      method: 'post',
      data: {
        city: that.data.city,
        keyword: that.data.en,
        constellation: list[2].list[list[2].active],
        marital: list[1].list[that.data.typeList[1].active],
        budget: list[5].list[list[5].active],
        expend: list[3].list[list[3].active],
        ageinfo: list[0].list[list[0].active],
        sexinfo: list[4].list[list[4].active],
        page: 1
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        wx.hideToast();
        if (res.data.code == 1) {
          that.setData({ list: res.data.data.list });
          that.setData({ total: res.data.data.total });
          that.setData({ total_page: res.data.data.total_page });
          that.setData({ page: res.data.data.current_page });
          that.setData({ re: false })
          if (res.data.data.list.length > 0) {
            that.setData({ re: false })
          }
        }

        console.log("--------------search");
        console.log(res);
      },
      fail: function () {
        wx.hideToast();
        wx.showToast({
          title: '发生异常',
          icon: 'success',
          duration: 3000
        });
        setTimeout(function () {
          wx.hideToast()
        }, 3000);
      },
      error: function () {
        wx.hideToast();
        wx.showToast({
          title: '发生异常',
          icon: 'success',
          duration: 3000
        });
        setTimeout(function () {
          wx.hideToast()
        }, 3000);
      }
    });

  },
  onPullDownRefresh: function () {
    var that = this
    wx.stopPullDownRefresh()
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 1000
    });
    var list = this.data.typeList;

    for (var i = 0; i < list.length; i++) {
      list[i].list[0] = "";
    }
    wx.request({
      url: app.api + 'searchActs',
      method: 'post',
      data: {
        city: that.data.city,
        keyword: that.data.en,
        constellation: list[2].list[list[2].active],
        marital: list[1].list[that.data.typeList[1].active],
        budget: list[5].list[list[5].active],
        expend: list[3].list[list[3].active],
        ageinfo: list[0].list[list[0].active],
        sexinfo: list[4].list[list[4].active],
        page: 1
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        wx.hideToast();
        if (res.data.code == 1) {
          that.setData({ list: res.data.data.list });
          that.setData({ total: res.data.data.total });
          that.setData({ total_page: res.data.data.total_page });
          that.setData({ page: res.data.data.current_page });
          that.setData({ re: false })
          if (res.data.data.list.length > 0) {
            that.setData({ re: false })
          }
        }

        console.log("--------------claascify");
        console.log(res);
      },
      fail: function () {
        wx.hideToast();
        wx.showToast({
          title: '发生异常',
          icon: 'success',
          duration: 3000
        });
        setTimeout(function () {
          wx.hideToast()
        }, 3000);
      },
      error: function () {
        wx.hideToast();
        wx.showToast({
          title: '发生异常',
          icon: 'success',
          duration: 3000
        });
        setTimeout(function () {
          wx.hideToast()
        }, 3000);
      }
    });
  },
  navToDetail: function (e) {
    var types = e.currentTarget.id;
    if (e.currentTarget.dataset.uid == wx.getStorageSync('userInfo').id) {
      types = 'meact'
    }
    wx.navigateTo({
      url: '/pages/detail/detail?types=' + types + '&id=' + e.currentTarget.dataset.id + '&uid=' + e.currentTarget.dataset.uid,
    })
  },
  selectType: function (e) {
    var id = e.currentTarget.id;
    var that = this;
    var list = this.data.typeList;
    if (list[id].open == true) {
      list[id].open = false;
      this.setData({ typeList: list })
      this.setData({ toShow: that.data.typeList[id] })
    } else {
      list[id].open = true;
      this.setData({ typeList: list })
      this.setData({ toShow: that.data.typeList[id] })
    }
  },
  doselect: function (e) {
    var id = e.currentTarget.id;
    var that = this;
    var list = this.data.typeList;
    list[that.data.toShow.id].active = id;
    list[that.data.toShow.id].open = false;
    this.setData({ typeList: list, toShow: list[that.data.toShow.id] });
    for (var i = 0; i < list.length; i++) {
      list[i].list[0] = "";
    }
    console.log("doselect---")
    console.log(list)
    // 条件不选是填 “”  不能填 “不限”
    wx.request({
      url: app.api + 'searchActs',
      method: 'post',
      data: {
        city: that.data.city,
        keyword: that.data.en,
        constellation: list[2].list[list[2].active],
        marital: list[1].list[that.data.typeList[1].active],
        budget: list[5].list[list[5].active],
        expend: list[3].list[list[3].active],
        ageinfo: list[0].list[list[0].active],
        sexinfo: list[4].list[list[4].active],
        page: 1
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        wx.hideToast();
        if (res.data.code == 1) {
          that.setData({ list: res.data.data.list });
          that.setData({ total: res.data.data.total });
          that.setData({ total_page: res.data.data.total_page });
          that.setData({ page: res.data.data.current_page });

        } else {
          that.setData({ list: [], op: true, re: false })
        }
        console.log("--------------claascify");
        console.log(res);
      },
      fail: function () {
        wx.hideToast();
        wx.showToast({
          title: '发生异常',
          icon: 'success',
          duration: 3000
        });
        setTimeout(function () {
          wx.hideToast()
        }, 3000);
      },
      error: function () {
        wx.hideToast();
        wx.showToast({
          title: '发生异常',
          icon: 'success',
          duration: 3000
        });
        setTimeout(function () {
          wx.hideToast()
        }, 3000);
      }
    });
  },
  descartes: function (list) {
    var point = {};

    var result = [];
    var pIndex = null;
    var tempCount = 0;
    var temp = [];
    for (var index in list) {
      if (typeof list[index] == 'object') {
        point[index] = { 'parent': pIndex, 'count': 0 }
        pIndex = index;
      }
    }
    if (pIndex == null) {
      return list;
    }

    while (true) {
      for (var index in list) {
        tempCount = point[index]['count'];
        temp.push(list[index][tempCount]);
      }

      result.push(temp);
      temp = [];

      while (true) {
        if (point[index]['count'] + 1 >= list[index].length) {
          point[index]['count'] = 0;
          pIndex = point[index]['parent'];
          if (pIndex == null) {
            return result;
          }

          index = pIndex;
        }
        else {
          point[index]['count']++;
          break;
        }
      }
    }
  },
  onLoad: function (options) {
    var that = this
    var city = wx.getStorageSync('city');
    if (city && city.length > 0) {
      city = city.replace('市', '');
      this.setData({ city: city });
    }
    this.setData({
      hobby: wx.getStorageSync('hobby')
    })
    console.log(wx.getStorageSync('hobby'))
    var tu = wx.getStorageSync('hobby');
    var op = [];
    for (var i = 0; i < tu.length; i++) {
      var sp = '';
      for (var j = 0; j < tu[i].list.length; j++) {
        if (tu[i].list[j].sel == 1) {
          sp = sp + tu[i].list[j].name + '|'
        }
      }
      console.log(sp)
      sp = sp.substr(0,sp.length-1)
      op.push(sp.split('|'))
    }
    console.log(op)
    
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    var city = wx.getStorageSync('city');
    if (city && city.length > 0) {
      city = city.replace('市', '');
      this.setData({ city: city });
    }
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  inputSearch: function (e) {
    var that = this;
    var keyword = e.detail.value;
    console.log(keyword)
    if (keyword.length > 0) {
      wx.showToast({
        title: '正在加载',
        icon: 'loading',
        duration: 2000
      });
      wx.request({
        url: app.api + 'searchActs',
        method: 'post',
        data: {
          city: that.data.city,
          keyword: keyword,
          constellation: '',
          marital: "",
          budget: '',
          expend: '',
          ageinfo: '',
          sexinfo: '',
          page: 1
        },
        header: {
          "Content-Type": "application/json"
        },
        success: function (res) {
          wx.hideToast();
          if (res.data.code == 1) {
            that.setData({ keyword: keyword });
            that.setData({ list: res.data.data.list });
            that.setData({ total: res.data.data.total });
            that.setData({ total_page: res.data.data.total_page });
            that.setData({ page: res.data.data.current_page });
            that.setData({op:true,re:false})
          } else {
            if (keyword == '') {
              that.setData({ kw: 's' });
              that.setData({list: [] })
            } else {
              that.setData({ kw: keyword });
              that.setData({ list: [] })
            }
          }
          console.log(res);
        },
        fail: function () {
          wx.hideToast();
          wx.showToast({
            title: '发生异常',
            icon: 'success',
            duration: 3000
          });
          setTimeout(function () {
            wx.hideToast()
          }, 3000);
        },
        error: function () {
          wx.hideToast();
          wx.showToast({
            title: '发生异常',
            icon: 'success',
            duration: 3000
          });
          setTimeout(function () {
            wx.hideToast()
          }, 3000);
        }
      });
    }
  },
  onReachBottom: function (e) {
    var c = wx.getStorageSync('city');
    this.setData({ city: c });
    var that = this;
    wx.showToast({
      title: '加载下一页',
      icon: 'loading',
      duration: 3000
    });
    var lis = that.data.typeList
    var page = this.data.page + 1;
    for (var i = 0; i < lis.length; i++) {
      lis[i].list[0] = "";
    }
    wx.request({
      url: app.api + 'searchActs',
      method: 'post',
      data: {
        city: that.data.city,
        keyword: that.data.en,
        constellation: lis[2].list[lis[2].active],
        marital: lis[1].list[lis[1].active],
        budget: lis[5].list[lis[5].active],
        expend: lis[3].list[lis[3].active],
        ageinfo: lis[0].list[lis[0].active],
        sexinfo: lis[4].list[lis[4].active],
        page: page
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        wx.hideToast();
        if (res.data.code == 1) {
          var l = that.data.list;
          if (res.data.data.list.length > 0) {
            for (var i = 0; i < res.data.data.list.length; i++) {
              l.push(res.data.data.list[i])
            }
            that.setData({ list: l });
            that.setData({ total: res.data.data.total });
            that.setData({ total_page: res.data.data.total_page });
            that.setData({ page: res.data.data.current_page });
          }

        }
      },
      fail: function () {
        wx.hideToast();
        wx.showToast({
          title: '发生异常',
          icon: 'success',
          duration: 3000
        });
        setTimeout(function () {
          wx.hideToast()
        }, 3000);
      },
      error: function () {
        wx.hideToast();
        wx.showToast({
          title: '发生异常',
          icon: 'success',
          duration: 3000
        });
        setTimeout(function () {
          wx.hideToast()
        }, 3000);
      }
    });
  },
})