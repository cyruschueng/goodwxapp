const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poster:'https://friend-guess.playonwechat.com/assets/template_thumb/668720180105093103.jpg'
  },
  onLoad: function (options) {
    let poster = options.poster;  
    this.setData({
      poster: poster
    })
  },
  onShow: function () {
    let that = this;
    app.getAuth(function () {

    })
  }

})