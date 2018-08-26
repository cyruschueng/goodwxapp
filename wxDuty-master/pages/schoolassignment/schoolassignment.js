// pages/schoolassignment/schoolassignment.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //小程序总是会读取data对象来做数据绑定，这个动作我们称为动作A
    //而这个动作A的执行，是在onLoad事件执行之后发生的
    urlImg: [
      '/image/post/cat.png',
      '/image/post/vr.png',
      '/image/post/bl.png',
    ],
    assigns: [
      {
        postId: 0,
        breif: "三角函数问题",
        dateTime: '2017-10-14 星期六',
        diffiDegree: 0
      },
      {
        postId: 1,
        breif: "矩形问题",
        dateTime: '2017-10-13 星期五',
        diffiDegree: 0,
      },
      {
        postId: 2,
        breif: "求面积",
        dateTime: '2017-10-12 星期四',
        diffiDegree: 0,
      }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   posts_key: postsDate.postLists
    // })
  },
  onPostTap: (event) => {
    //target 和 currenTarget
    //target 指的点击的当前组件 而 currenTarget指的是事件捕获的组件

    var postId = event.currentTarget.dataset.postid;
    //页面跳转
    wx.navigateTo({
      url: 'assignDetail/assighDetail?id=' + postId,
    })

  }
})