var detail = '../detail/detail'
Page({
  data: {
    list: [],
    maxtime: '',
    loadingHidden: false
  },
  onLoad: function (options) {
    this.requestData('newlist');
    wx.showShareMenu({
      withShareTicket: true,
      success: function (res) {
        // 分享成功
        console.log(res)
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    })
  },
  onShareAppMessage: function () {
    var that = this
    return {
      title: '那就来看段子',
      path: 'pages/img/img',
      success: function (res) {
        console.log(res.shareTickets[0])
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (res) { console.log(res) },
          fail: function (res) { console.log(res) },
          complete: function (res) { console.log(res) }
        })
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
  },
  onPullDownRefresh: function () {
    // 显示导航栏loading  
    wx.showNavigationBarLoading();
    // 调用接口加载数据  
    // this.requestData("newlist");
    // 隐藏导航栏loading  
    wx.hideNavigationBarLoading();
    // 当处理完数据刷新后，wx.stopPullDownRefresh可以停止当前页面的下拉刷新  
    wx.stopPullDownRefresh();
  },
  // 上拉加载  
  onReachBottom(e) {
    let that = this;
    that.setData({
      page: that.data.page + 1,  // 每次触发上拉事件，把pageNum+1  
      isFirstLoad: false
    });
    that.requestData("list");
  },
  requestData: function (a) {
    var that = this;
    wx.request({
      url: 'https://api.budejie.com/api/api_open.php',
      data: {
        a: a,
        c: 'data',
        // 上一页的maxtime作为加载下一页的条件，
        maxtime: this.data.maxtime,
        type: '10',
      },
      method: 'GET',
      success: function (resp) {
        that.setData({
          list: that.data.list.concat(resp.data.list),
          loadingHidden: true,
          maxtime: resp.data.info.maxtime
        })
      }
    })
  },
  /**
   * 查看大图
   */
  lookBigPicture: function (e) {
    //图片url 对应wxml中data-url="{{item.url}}"
    var url = e.currentTarget.dataset.url;
    //获取图片高度 对应wxml中data-height="{{item.height}}"
    var height = e.currentTarget.dataset.height;
    //获取图片高度 对应wxml中data-width="{{item.width}}"
    var width = e.currentTarget.dataset.width;
    // 传参方式向GET请求
    wx.navigateTo({
      //这里渲染出了找不到的错...
      url: detail + '?' + 'url=' + url + "&height=" + height + "&width=" + width,
      success: function (resp) {
        console.log("img")
      },
      fail: function (err) {
        console.log("gg")
      },
    })
  },
  // 点赞的触摸事件
  loveDz: function () {
    console.log("喜欢")
  },
  hateDz: function () {
    console.log("不喜欢")
  },
  shareDz: function () {
    console.log("转发")
  },
  commentDz: function (e) {
    var newData = []
    console.log(e.currentTarget.id)
    for (let i = 0; i < this.data.list.length; i++) {
      if (this.data.list[i].id == e.currentTarget.id) {
        newData.push(this.data.list[i])
      }
    }
    var a = newData[0].profile_image
    var b = newData[0].name
    var c = newData[0].create_time
    var d = newData[0].text
    var ee = newData[0].ding
    var f = newData[0].hate
    var g = newData[0].repost
    var h = newData[0].comment
    var i = newData[0].cdn_img
    var j = newData[0].is_gif
    var k = newData[0].height
    var l = newData[0].width
    wx.navigateTo({
      url: '../comment/comment?who=' + e.currentTarget.id + '&profile_image=' + a + '&name=' + b + '&create_time=' + c + '&text=' + d + '&ding=' + ee + '&hate=' + f + '&repost=' + g + '&comment=' + h + '&cdn_img=' + i + '&is_gif=' + j + '&height=' + k + '&width=' + l,
    })
  },
})