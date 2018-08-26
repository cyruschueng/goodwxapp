var app = getApp()
Page({
  data: {
    star: [0, 0, 0, 0, 0],
    url: ['/img/star1.png', '/img/star2.png'],
    evalList: [
      { title: '帅气', color: 0, }, { title: '漂亮', color: 0, },
      { title: '强壮', color: 0, }, { title: '幽默', color: 0, },
      { title: '装逼', color: 0, }, { title: '守时', color: 0, },
      { title: '迟到', color: 0, }, { title: '开心', color: 0, },
      { title: '满意', color: 0, }, { title: '期待下次', color: 0, },
      { title: '一般', color: 0, }, { title: '失望', color: 0, },
      { title: '狂妄', color: 0, }, { title: '健谈', color: 0, },
      { title: '虚伪', color: 0, }, { title: '文雅', color: 0, },
      { title: '大方', color: 0, }, { title: '小气', color: 0, },
      { title: '性感', color: 0, }, { title: '屌丝', color: 0, },
      { title: '绅士', color: 0, }, { title: '淑女', color: 0, },
      { title: '很屌', color: 0, }, { title: '大叔', color: 0, }
    ],
    aid: 0,
  },
  bindStar: function (e) {
    var index = e.target.dataset.index;
    var list = this.data.star;
    if (list[index] == 1) {
      if (list[index + 1] == 1) {
        for (var i = 0; i < list.length; i++) {
          if (i <= index) {
            list[i] = 1
          } else {
            list[i] = 0
          }
        }
      } else {
        for (var i = 0; i < index + 1; i++) {
          list[i] = 0
        }
      }
    } else {
      for (var i = 0; i < index + 1; i++) {
        list[i] = 1
      }
    }
    this.setData({ star: list })
  },
  bindEva: function (e) {
    var index = e.target.dataset.index;
    var list = this.data.evalList;
    if (list[index].color == 1) {
      list[index].color = 0
    } else {
      this.setData({ evalList: list })
      var temp = 0;
      for (var i = 0; i < list.length; i++) {
        if (list[i].color == 1) {
          temp = temp + 1;
        }
      }
      if (temp < 5) {
        list[index].color = 1
      } else {
        wx.showToast({
          title: '最多选5个哦',
          icon: 'success',
          image: '/img/60.png',
          duration: 1000
        })
      }
    }
    this.setData({ evalList: list })
  },
  submit: function () {
    var that = this
    var eva = 0;
    var star = 0;
    for (var i = 0; i < this.data.evalList.length; i++) {
      if (this.data.evalList[i].color == 1) {
        eva = eva + 1;
      }
    }
    for (var i = 0; i < this.data.star.length; i++) {
      if (this.data.star[i] == 1) {
        star = star + 1
      }
    }
    if (star == 0) {
      wx.showToast({
        title: '您还没有评分哦',
        icon: 'success',
        image: '/img/60.png',
        duration: 1000
      })
    } else if (eva == 0) {
      wx.showToast({
        title: '您还没有评价哦',
        icon: 'success',
        image: '/img/60.png',
        duration: 1000
      })
    } else {
      var str = '';
      for (var i = 0; i < this.data.evalList.length; i++) {
        if (this.data.evalList[i].color == 1) {
          str = str + '|' + this.data.evalList[i].title;
        }
      }
      console.log(wx.getStorageSync('userInfo').id)
      wx.request({
        url: app.api + 'comment',
        data: {
          uid: wx.getStorageSync('userInfo').id,
          id: that.data.aid,
          tags: str,
          score: eva
        },

        method: 'post',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log("-------com");
          console.log(res);
          if (res.data.code == 1) {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000
            });
            setTimeout(function () {
              wx.hideToast();
            }, 1000);
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/index/index'
              });
            }, 1000);
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 7000
            });
            setTimeout(function () {
              wx.hideToast();
            }, 7000);
          }
        },
        fail: function (res) {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 7000
          });
          setTimeout(function () {
            wx.hideToast();
          }, 7000);
        },
        complete: function (res) {

        }
      })
    }
  },
  onLoad: function (options) {
    this.setData({ aid: options.aid })
  },
  onReady: function () {
  },
  onShow: function () {
  },
  onHide: function () {
  },
  onUnload: function () {
  }
})