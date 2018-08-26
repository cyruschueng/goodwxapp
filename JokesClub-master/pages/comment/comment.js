Page({
  data:{
    list:[],
    commentList:[],
    who:"",
  },
  onLoad: function (options){
    this.data.who=options.who
    this.data.list.push(options.profile_image);
    this.data.list.push(options.name);
    this.data.list.push(options.create_time);
    this.data.list.push(options.text);
    this.data.list.push(options.ding);
    this.data.list.push(options.hate);
    this.data.list.push(options.repost);
    this.data.list.push(options.comment);
    // this.requestData("newlist")
    if (options.cdn_img != undefined){
      this.data.list.push(options.cdn_img);
      this.data.list.push(options.is_gif);
      this.data.list.push(options.height);
      this.data.list.push(options.width);
    }else{
      this.data.list.push("");
      this.data.list.push("");
      this.data.list.push("");
      this.data.list.push("");
    }
    this.commentData(options)
    this.requestDataImg("newlist")
  },
  // 评论列表渲染
  commentData: function (options, a) {
    var that = this;
    wx.request({
      url: 'https://api.budejie.com/api/api_open.php?a=dataList&c=comment&data_id='+options.who+'&hot=1',
      data: {},
      success: function (resp) {
        console.log(resp.data)
        that.setData({
          who: options.who,
          commentList: resp.data.data
        })
      }
    })
  },
  requestDataImg: function (a) {
    var that = this;
    wx.request({
      url: 'https://api.budejie.com/api/api_open.php',
      data: {
        a: a,
        c: 'data',
        type: '10',
      },
      method: 'GET',
      success: function (resp) {
        console.log(resp)
        that.setData({
          list: that.data.list.concat(resp.data.list),
        })
      }
    })
  },
  // 点赞的触摸事件
  loveDz: function () {
    console.log("喜欢")
  },
  hateDz: function () {
    console.log("不喜欢")
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
      url: '../detail/detail?url=' + url + '&height=' + height + '&width=' + width,
      success: function (resp) {
        console.log(321)
        console.log(resp)
      },
      fail: function (err) {
        console.log(err)
      },
    })
  },
})