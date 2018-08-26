var app = getApp()
Page({
  data: {
    host: 'https://m.changtounet.com/',
    config:[
      { id: 0, num: 210, title: '免费再来一次' },
      { id: 1, num: 0, title: '28投圆' },
      { id: 2, num: 30, title: '38投圆' },
      { id: 3, num: 60, title: '58投圆' },
      { id: 4, num: 90, title: '京东50' },
      { id: 5, num: 120, title: '88投圆' },
      { id: 6, num: 150, title: '118投圆' },
      { id: 7, num: 180, title: '1180投圆' },
    ],
    circleList: [],//圆点数组
    awardList: [],//奖品数组
    colorCircleFirst: '#FFDF2F',//圆点颜色1
    colorCircleSecond: '#FE4D32',//圆点颜色2
    colorAwardDefault: '#F5F0FC',//奖品默认颜色
    colorAwardSelect: '#ffe400',//奖品选中颜色
    indexSelect: 0,//被选中的奖品index
    isRunning: false,//是否正在抽奖
    imageAward: [
      '../../images/1.png',
      '../../images/2.png',
      '../../images/3.png',
      '../../images/4.png',
      '../../images/5.png',
      '../../images/6.png',
      '../../images/7.png',
      '../../images/8.png',
    ],//奖品图片数组
  },
  onLoad: function () {
    checklogin();
    var _this = this;
    //圆点设置
    var leftCircle = 7.5;
    var topCircle = 7.5;
    var circleList = [];
    for (var i = 0; i < 24; i++) {
      if (i == 0) {
        topCircle = 15;
        leftCircle = 15;
      } else if (i < 6) {
        topCircle = 7.5;
        leftCircle = leftCircle + 102.5;
      } else if (i == 6) {
        topCircle = 15
        leftCircle = 620;
      } else if (i < 12) {
        topCircle = topCircle + 94;
        leftCircle = 620;
      } else if (i == 12) {
        topCircle = 565;
        leftCircle = 620;
      } else if (i < 18) {
        topCircle = 570;
        leftCircle = leftCircle - 102.5;
      } else if (i == 18) {
        topCircle = 565;
        leftCircle = 15;
      } else if (i < 24) {
        topCircle = topCircle - 94;
        leftCircle = 7.5;
      } else {
        return
      }
      circleList.push({ topCircle: topCircle, leftCircle: leftCircle });
    }
    this.setData({
      circleList: circleList
    })
    //圆点闪烁
    setInterval(function () {
      if (_this.data.colorCircleFirst == '#FFDF2F') {
        _this.setData({
          colorCircleFirst: '#FE4D32',
          colorCircleSecond: '#FFDF2F',
        })
      } else {
        _this.setData({
          colorCircleFirst: '#FFDF2F',
          colorCircleSecond: '#FE4D32',
        })
      }
    }, 500)
    //奖品item设置
    var awardList = [];
    //间距,怎么顺眼怎么设置吧.
    var topAward = 25;
    var leftAward = 25;
    for (var j = 0; j < 8; j++) {
      if (j == 0) {
        topAward = 25;
        leftAward = 25;
      } else if (j < 3) {
        topAward = topAward;
        //166.6666是宽.15是间距.下同
        leftAward = leftAward + 166.6666 + 15;
      } else if (j < 5) {
        leftAward = leftAward;
        //150是高,15是间距,下同
        topAward = topAward + 150 + 15;
      } else if (j < 7) {
        leftAward = leftAward - 166.6666 - 15;
        topAward = topAward;
      } else if (j < 8) {
        leftAward = leftAward;
        topAward = topAward - 150 - 15;
      }
      var imageAward = this.data.imageAward[j];
      awardList.push({ topAward: topAward, leftAward: leftAward, imageAward: imageAward });
    }
    this.setData({
      awardList: awardList
    })
  },
  //开始游戏
  startGame: function () {
    checklogin();
    var g=this

    var userid='';
    wx.getStorage({
      key: 'userid',
      success: function (res) { 

        userid = res.data;
        wx.request({
          url: g.data.host+'smallApp/login.ashx',
          data: { action: 'LotteryGame', userid: userid },
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            var iswinning = parseInt(res.data.data.iswinning);
            if (iswinning<=0)
            {
              wx.showModal({
                title: '提示',
                content: res.data.data.msg,
                showCancel: true,//去掉取消按钮
                confirmText:'切换账号',
                success: function (res) {
                  wx.removeStorage({
                    key: 'userid',
                    success: function (res) {
                      checklogin();
                    }
                  })
                }
              })
              // wx.showToast({ title: res.data.data.msg });
              return;
            }
            var model= g.data.config[iswinning];
/** */
            // var touyuannum = (210 * 3) + parseInt(model.num);
            var touyuannum = (30 * 8 * 3) + parseInt(model.num);
            if (g.data.isRunning) return
            g.setData({
              isRunning: true
            })
            var indexSelect = 0
            var i = 0;
            var timer = setInterval(function () {
              indexSelect++;
              //这里我只是简单粗暴用y=30*x+200函数做的处理.可根据自己的需求改变转盘速度
              i += 30;
              if (i > touyuannum) {
                //去除循环
                clearInterval(timer)
                //获奖提示
                wx.vibrateLong({
                  success: function () {
                    // wx.showToast({ title: '震动' });
                  }
                })
                wx.showModal({
                  title: '恭喜您',
                  content: res.data.data.alert,
                  showCancel: false,//去掉取消按钮
                  success: function (res) {
                    if (res.confirm) {
                      g.setData({
                        isRunning: false
                      })
                    }
                  }
                })
              }
              indexSelect = indexSelect % 8;
              g.setData({
                indexSelect: indexSelect
              })
            }, (200 + i))
/** */
            

          },
          complete: function () {

          }, fail: function () {

          }
        })
      }
    })

    
  },
  onShareAppMessage: function () {
    return {
      title: '投圆转转赚',
      path: '/pages/lotto/lotto',
      success: function (res) {
        // 转发成功
        wx.showToast({ title: '转发成功' });
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({ title: '转发失败' });
      }
    }
  }
})

var checklogin=function(){
  wx.getStorage({
    key: 'userid',
    success: function (res) {

    }, fail: function () {
      wx.reLaunch({
        url: '../login/login'
      })
    }
  })

}