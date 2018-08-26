var postsData = require('../../../data/autumn/posts-data.js')//定义一个变量用来接收其他页面传来的数据用requirerequire，路径只能用相对路径，用绝对路径是找不到的

Page({
  data: {
    //小程序总是会读取data对象来做数据绑定，这个动作我们称为动作A
    //而这动作A的执行，是在onload事件执行之后发生的
  },
  onLoad: function (options) {
    // this.setData({posts_container: postData.postList });
     this.setData({
      postList:postsData.postList
    })
  },
  onPostTap: function (event) {
    var postId = event.currentTarget.dataset.postid;//此处postid要改为小写
    // console.log("on post id is "+postId);
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId
    })
  },
  onShareAppMessage: function() {
        return {
            title: '【旅游圈 秋季出行】',
            desc: '',
            path: 'pages/season/autumn/post'
        }
    }
})