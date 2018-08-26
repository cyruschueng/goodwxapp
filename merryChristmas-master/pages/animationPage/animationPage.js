Page({
  data: {
    videoUrl: [

    ],
    timeNum: 10,
  },
  onLoad(options) {
    this.setData({
      id: options.id
    })
    // this.delayRoute();
  },
  // 不同入口处理
  diffEnterDeal(options) {
    console.log(options)
    switch (Number(options.id)) {
      case 0: {
        wx.setNavigationBarTitle({
          title: '我和你，就是秋裤扎在袜子里的安心',
        })
        break;
      }
      case 1: {
        wx.setNavigationBarTitle({
          title: '你说失而复得才叫真爱，我想兜兜转转都是安排',
        })
        break;
      }
      case 2: {
        wx.setNavigationBarTitle({
          title: '如果有人追你，我就绊倒他',
        })
        break;
      }
      case 3: {
        wx.setNavigationBarTitle({
          title: '如果有人追你，我就绊倒他',
        })
        break;
      }
      case 4: {
        wx.setNavigationBarTitle({
          title: '我每天都有好吃的，大家都可以吃，你可以吃完',
        })
        break;
      }
      case 5: {
        wx.setNavigationBarTitle({
          title: '你只有今天这么漂亮吗？还是每天都这么美',
        })
        break;
      }
    }
  },
  // 视频播放结束
  ended() {
    wx.navigateTo({
      url: '/pages/sharePage/sharePage',
    })
  },
  // X秒后跳转
  delayRoute() {
    let that = this;
    let timeNum = this.data.timeNum;
    let time = setInterval(x => {
      timeNum--;
      that.setData({
        timeNum: timeNum
      })
      if (timeNum == 0) {
        wx.redirectTo({
          url: '/pages/sharePage/sharePage',
        })
        clearInterval(time);
      }
    }, 1000)
  }
})