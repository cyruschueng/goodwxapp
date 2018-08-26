var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({
  data: {
    toView: 'red',
    scrollTop: 100,
    x: 0,
    y: 0
  },
  //这个是在设置一个可移动范围的时的tap
  // tap: function (e) {
  //   console.log("tap");
  //   this.setData({
  //     x: 30,
  //     y: 30
  //   });
  // },
  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    //console.log(e)
  },
  //这个是滚动条tap
  //其实就是滚动到指定id位置
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  //滚动一点距离
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  onReady() {
    this.videoCtx = wx.createVideoContext('myVideo')
  },
  play() {
    this.videoCtx.play()
  },
  pause() {
    this.videoCtx.pause()
  },

  onReachBottom: function () {
    //有了这个根本不需要 scroll-view 就可以做上拉加载了
    console.log("触底效果!")
  },
  onPullDownRefresh: function () {
    console.log("下来刷新了");
    //wx.stopPullDownRefresh()
  }

})