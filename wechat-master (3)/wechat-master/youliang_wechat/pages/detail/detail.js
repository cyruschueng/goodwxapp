var WxParse = require('../../wxParse/wxParse.js');

Page({
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    time:'',
    article_content: '',
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    author: '',
    src: '',
    summary:'',
    news_id:0,
    hidden: false,
    info:{},
    hidden: false,
  },
 
  funplay: function () {
    console.log("audio play");
  },
  funpause: function () {
    console.log("audio pause");
  },
  funtimeupdate: function (u) {
    console.log(u.detail.currentTime);
    console.log(u.detail.duration);
  },
  funended: function () {
    console.log("audio end");
  },
  funerror: function (u) {
    console.log(u.detail.errMsg);
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
   
      that.data.news_id= options.news_id;
       
      console.log(that.data.news_id);
      wx.request({
        //获取openid接口  
        url: 'https://youliang.shaoziketang.com/news_detail.php',
        data: {
          news_id: that.data.news_id,
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        success: function (res) {
          console.log(res);
         
          that.setData({
            title: res.data.info.title,
            time: res.data.info.create_time,
            author: res.data.info.author,
            src: res.data.info.audio,
            title: res.data.info.title,
            summary: res.data.info.summary,
            hidden: true,
            info:res.data,
            content: WxParse.wxParse('article_content', 'html', res.data.info.detail, that, 5),
            hidden: true,
          })
          wx.clearStorageSync('cmsinfo',res.data)
        }
      })
      
  },

 
  onShareAppMessage: function () {
    var that = this;
    var url ="../detail/detail?news_id="+that.data.news_id;
    console.log(that.data.title);
    console.log(that.data.summary);
    return {
      title:that.data.title,
      desc: that.data.summary,
      path: url,

    }
  
  }
})