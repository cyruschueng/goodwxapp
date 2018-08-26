var WxParse = require('../../wxParse/wxParse.js');
Page({
  data:{
    comments:[],
   // newsTitle:'',

  },
  onShareAppMessage: function (titles) {
    return {
      title: this.data.newsTitle,
      path: '/page/article/article?id='+this.data.currentPostId,
      success: function(res) {
        wx.showToast({
          title: '已发送', 
          icon: 'success', 
          duration: 1000
          }),
          wx.showShareMenu({
            withShareTicket: true
          })
      },
      fail: function(res) {
        
      }
    }
  },
  onLoad:function(options){
    var postId = options.id;
    this.setData({
      currentPostId: postId
    })

    console.log(postId)
    var that=this;

    wx.request({
      url:getApp().URLS+'mqrx/news/detail?id=' + postId,
      data:{

      },
      header:{
        "Content-Type":"applciation/json"
      },
      method:"GET",
      success:function(res){
        var list = res.data.data.news;
        var commentList = res.data.data.replys;
        var timestamp4 = new Date(list.publishDate);
        var timestamp=timestamp4.toLocaleDateString().replace(/\//g, "-") + " " +timestamp4.toTimeString().substr(0, 8);
        list.publishDate=timestamp;
        list.content=WxParse.wxParse('content', 'html', list.content, that, 5);

        for(var i=0;i<commentList.length;i++){
            var timestamp3 = new Date(commentList[i].replyDate);
            var timestamp2=timestamp3.toLocaleDateString().replace(/\//g, "-") + " " +timestamp3.toTimeString().substr(0, 8);     
            commentList[i].replyDate=timestamp2;
        }

　　　　　that.setData({
            array:list, 
            comments:commentList,
            newsTitle:res.data.data.news.title
        })
      },
    })
},
})