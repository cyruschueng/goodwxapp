import {utiles} from '../../utils/util.js';
var app = getApp();
Page({
  data: {
    imgUrls: [
      '/images/iconfont/bannar1.png',
      '/images/iconfont/bannar2.png',
      '/images/iconfont/bannar3.png'
    ],
    showModalStatus: false,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 2000,
    circular: true
  },
  onLoad: function (res) {
    //---- edit by xyd
    var wxUid = wx.getStorageSync('wxUid');
    var wxSid = wx.getStorageSync('wxSid');
    app.globalData.Uid = wxUid;
    app.globalData.Sid = wxSid;
    //----- end
    //app.globalData.Uid = res.Uid;
    //app.globalData.Sid = res.Sid;
  },
  innerClick: function () {
    wx.navigateTo({
      url: '../../pages/movie/movie?id=1',
    })
  },
  altertueClick: function () {
    wx.navigateTo({
      url: '../../pages/particulars/particulars?id=1',
    })
  },
  outClick: function () {
    // console.log('outClick');
  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  subscribeclick: function (e) {
    wx.navigateTo({
      url: '/pages/order-list/order?from=manage'
    })
  },
  shoppingClick: function () {
    wx.navigateTo({
      url: '../shopping/shopping'
    })
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例
    var animation = wx.createAnimation({
      duration: 200,  //动画时长
      timingFunction: "linear", //线性
      delay: 0  //0则不延迟
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
            showModalStatus: false
          }
        );
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
  onShareAppMessage() {
    return {
      title: '叮店'
    }
  }
})