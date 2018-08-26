//index.js
var util = require('../../utils/util.js')
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    // 页面巨幕图片路径
    jumbotronSrc: './../../static/img/banner.png',
    // 选项卡参数设置
    tabSetting: {
      item: ['群排行', '群动态'],
      selectIndex: 0,
      rankHeight: '',
      btn: {
        btnText: '签到',
        defaultSize: 'default',
        primarySize: 'default',
        warnSize: 'default',
        disabled: false,
        plain: false,
        loading: false
      },
      groupdata: [],
      rank: {  //群排行
        data: [],
        load: true
      },
      dynamicgroup: {//群动态
        data: [],
        load: true,           //初始化加载loadding
        loadNextPage: false,  //上拉刷新加载loadding
        PageNum: 0,           //当前页数
        Total: 0               //总页数
      }
    },
    showModalStatus: false,
    friendNum: undefined
  },
  //事件处理函数
  bindViewTap: function (e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      'tabSetting.selectIndex': index
    })
  },
  onLoad: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    //要求小程序返回分享目标信息
    wx.showShareMenu({
      withShareTicket: true
    })
    //获取屏幕高度
    var screenHeight = wx.getSystemInfo({
      success: function (res) {
        screenHeight = res.windowHeight;
        var rankHeight = screenHeight - (wx.getSystemInfoSync().screenWidth / 750) * (298 + 88 + 15) - 46;
        that.setData({
          'tabSetting.rankHeight': rankHeight + 'px'
        })
      }
    })
    app.checkSession(function () {
      that.checkIsSign();

      if (app.globalData.shareTicket)
        console.log(app.globalData.shareTicket)
      // 通过 1044: 带shareTicket的小程序消息卡片 过来的事件
      app.jumpSharePageFn(app.globalData.shareTicket, function (result) {
        //群排行数据回掉
        that.setData({
          'tabSetting.rank.data': result.data.body,
          'tabSetting.rank.load': false
        })

      }, function (result) {
        //群动态数据回调
        that.setData({
          'tabSetting.dynamicgroup.data': result.data.body.data,
          'tabSetting.dynamicgroup.load': false
        })
        wx.hideToast();
      });
    });
  },
  //转发函数
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      //转发标题
      title: '排行榜',
      //desc
      desc: '看看你当前的排行吧!',
      //转发路径
      path: '/pages/share/share',
      success: function (res) {
        // 转发成功
        console.log("转发成功!")
        console.log(JSON.stringify(res));
        console.log(res.shareTickets[0]);
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败!")
        console.log(JSON.stringify(res));
      },
      complete: function () {
        //转发结束后的回调函数
        console.log("转发操作!")
      }
    }
  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    var that = this;
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200, //动画时长 
      timingFunction: "linear", //线性 
      delay: 0 //0则不延迟 
    });

    // 第2步：这个动画实例赋给当前的动画实例 
    this.animation = animation;

    // 第3步：执行第一组动画 
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        animationData: animation
      })

      //关闭 
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false,
            friendNum: null
          }
        );
      }
      //关闭 
      if (currentStatu == "ok") {
        this.userSign();

      }
    }.bind(this), 200)
    // 显示 
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  //签到判断
  checkIsSign() {
    var that = this;
    util.ajax("checkIsSign", {
      session_3rd: wx.getStorageSync("session_3rd")
    }, "POST", function (res) {
      console.log(res);
      if (res.data.code == "SUCCESS") {
        //SUCCESS 是没签到
        that.setData(
          {
            'tabSetting.btn.disabled': false,
            'tabSetting.btn.btnText': '签到'
          }
        );
      } else {
        that.setData(
          {
            'tabSetting.btn.disabled': true,
            'tabSetting.btn.btnText': '已签到'
          }
        );
      }
    })
  },
  //签到
  userSign() {
    var that = this;
    wx.showLoading({
      title: '签到中',
    })
    that.setData({
      showModalStatus: false,
    })
    util.ajax('SignCommit', {
      intradayfriendNumber: that.data.friendNum,
      session_3rd: wx.getStorageSync("session_3rd")
    }, 'POST', function (res) {
      console.info("签到")
      console.log(res);
      that.loadCurriculumRankingList(function (result) {
        that.setData(
          {
            'tabSetting.btn.disabled': true,
            'tabSetting.btn.btnText': '已签到',
            'tabSetting.rank.data': result.data.body,
            'tabSetting.rank.load': false
          }
        );
        wx.hideLoading()
        wx.showToast({
          // title: '今日好友数' + that.data.friendNum,
          title: '签到成功',
          icon: 'success',
          duration: 2000
        })
      })
    }, function () {
      //complete
    }, function () {
      //fail
      // wx.showToast({
      //   // title: '今日好友数' + that.data.friendNum,
      //   title: '签到失败',
      //   icon: 'success',
      //   duration: 2000
      // })
    })
  },
  bindKeyInput(e) {
    this.setData({
      friendNum: e.detail.value
    })
  },
  //群动态上拉加载
  lower(e) {
    var that = this;
    if (that.data.tabSetting.dynamicgroup.loadNextPage) {
      return;
    }
    this.setData(
      {
        'tabSetting.dynamicgroup.loadNextPage': true
      }
    );
    this.loadDynamicgroupDate(function (result) {
      that.data.tabSetting.dynamicgroup.data.push.apply(that.data.tabSetting.dynamicgroup.data, result.data.body.data)
      //群动态数据回调
      that.setData({
        'tabSetting.dynamicgroup.data': that.data.tabSetting.dynamicgroup.data,
        'tabSetting.dynamicgroup.total': result.data.body.Total,
        'tabSetting.dynamicgroup.loadNextPage': false
      })
    });
  },
  // 刷新群动态
  loadCurriculumRankingList(fn) {
    var that = this;
    wx.getShareInfo({
      shareTicket: app.globalData.shareTicket,
      fail(res) {
        console.log(res);
      },
      complete(res) {
        //请求服务器 解密数据
        util.ajax('loadCurriculumRankingList', {
          openGIdEncryptedData: encodeURIComponent(res.encryptedData),
          openGIdIv: res.iv,
          session_3rd: wx.getStorageSync("session_3rd")
        }, 'POST', function (res) {
          // success
          console.info(res);
          if (typeof fn === "function") fn(res);
        }, function () {
          // complete
        })
      }
    })
  },
  //加载群动态
  loadDynamicgroupDate(fn) {
    var that = this;
    wx.getShareInfo({
      shareTicket: app.globalData.shareTicket,
      fail(res) {
        console.log(res);
      },
      complete(res) {
        console.log(that.data.tabSetting.dynamicgroup.PageNum)
        that.setData({
          'tabSetting.dynamicgroup.PageNum': that.data.tabSetting.dynamicgroup.PageNum + 1
        })
        //请求服务器 解密数据
        util.ajax('loadGroupDynamics', {
          openGIdEncryptedData: encodeURIComponent(res.encryptedData),
          openGIdIv: res.iv,
          session_3rd: wx.getStorageSync("session_3rd"),
          start: that.data.tabSetting.dynamicgroup.PageNum,
          limit: 10
        }, 'POST', function (res) {
          // success
          console.info(res);

          if (typeof fn === "function") fn(res);
        }, function () {
          // complete
        })
      }
    })
  }
})
