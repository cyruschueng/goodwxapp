// topicdetail.js
var util = require('../../utils/util.js');
var app = getApp()
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    para: "", //  页面传递参数，id 话题id
    showbox: "hide",
    value:"",
    detail: {
      // id: "2",
      // title: "《战狼2》为什么这么火？",
      // image: "http:\/\/img.weiye.me\/zcimgdir\/album\/file_591275fdca9af.jpg",
      // content: "吴京的电影战狼2最近是火到不行了，看票房就知道了，战狼2为什么这么火？战狼2这么火，吴京到底可以赚多少钱呢？",
      // join: "120",  //  参与人数，统计数据
      // view: "2000"  //  浏览量，统计数据？
    },
    people:[
      // { pic: "http://122.152.211.147/ueditor/php/upload/image/20170908/1504869131133323.png"},
      // { pic: "http://122.152.211.147/ueditor/php/upload/image/20170908/1504869131133323.png" },
      // { pic: "http://122.152.211.147/ueditor/php/upload/image/20170908/1504869131133323.png" },
      // { pic: "http://122.152.211.147/ueditor/php/upload/image/20170908/1504869131133323.png" },
    ],
    comments: [
      // { id: "45", avatarUrl: "https://tvax3.sinaimg.cn/crop.0.0.400.400.180/006VhaXvly8fiehmglbm2j30b40b4jse.jpg", nickName: "掌上魔都", time: "2017-10-01 00:01", comment: "掌上魔都，祝贺大家国庆中秋快乐", thumb: "2158" },
    ],
    followHeart: '../../pictures/follow-ico.png',
    followOption: 'addFollow',  // 点击关注成功后，方法名变更，再次点击将执行其他方法
    followed_id: null, // 存储点击收藏后返回的收藏数据Id
    followtxt: "收藏",
    comment_current: '',
    loadinfo: '加载更多……',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
     * （1）获取页面参数(数据id)；
     * （2）加载话题相关数据；
     * （3）话题浏览量+1；
     */
    var that = this;
    // wx.showLoading({
    //   title: '加载中...',
    // })
    this.setData({
      para: options.id
    })

    //（1） 通过id获取话题主体（detail）信息
    this.loadTopic();

    // （2）参与人people
    // this.loadPeople();

    // （3）评论
    this.loadComments();

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 开始下拉刷新操作，加载最新的讨论用户数组和，评论列表
    
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 加载更多讨论
    this.loadComments();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.detail.title
    }
  },

  /**
   * ======================================自定义方法==============================
   */

  /**
   * 加载话题主体信息
   */
  loadTopic: function(){
    var that = this;
    wx.request({
      url: app.globalData.url + '/admin/topic/topic_detail',
      data: { "id": that.data.para ,openid: app.globalData.openid},
      success: function (res) {
        wx.hideLoading();

        that.setData({
          detail: res.data[0]
        })

        // 判断收藏
        that.Isfollowed();
      },
      fail: function(){
        console.log("主体加载错误")
      }
    })
  },


  /**
   * 判断收藏
   */
  Isfollowed: function(){
    var coll = this.data.detail.collect || 0;
    if (coll == 1) {
      var followedid = this.data.detail.collectid;
      // 已经收藏
      this.setData({
        followed_id: followedid,
        followOption: 'removeFollow',
        followHeart: '../../pictures/followed.png',
        followtxt: '已收藏'
      })
    }
  },



  /**
   * 加载话题参与的用户列表
   */
  loadPeople: function(){
    var that = this;
    wx.request({
      url: app.globalData.url + '/加载话题用户列表',
      data: { "topic": that.data.para },
      success: function (res) {
    
        that.setData({
          people: res.data
        })
      },
      fail: function () {
        console.log("参与列表加载错误")
      }
    })
  },

  /**
   * 加载话题评论信息
   * [{ id: "43", pic: "http:23.png", name: "小陈", time: "2017/05/21 17:20", cont: "主题思想好", thumb: "180" }]
   */
  loadComments: function(){
    var that = this;
    var list = that.data.comments;
    var current = that.data.comment_current;

    wx.request({
      url: app.globalData.url + '/admin/wx/topic_commentlist',
      data: { "top_id": that.data.para, 'current': current  },
      success: function (res) {
      
        var data = res.data;
        if(!(data instanceof Array)){ 
          that.setData({
            loadinfo: '暂无更多评论'
          })
          return;
        }

        data = list.concat(data);
        //对每组评论数据
        for (var i in data) {
            data[i].src = '../../pictures/thumb.png',
            data[i].tap = 'thumbsUp'   // 每一条数据的点击事件随着用户操作而改变
        }

        if(data.length == list.length){
          that.setData({
            comments: data,
            loadinfo: '暂无更多评论'
          })
        }else{
          
          that.setData({
            comments: data,
            comment_current: data[data.length-1].id
          })
        }

      },
      fail: function () {
        console.log("评论加载错误")
      }
    })
  },


  /**
   * 用户评论发送成功，本地显示
   * data = [{ id:"43", pic:"http://323.png", name:"大仙", time:"2017-05-21 17:20", cont:"主题思想", thumb:"180" }],
   * data为只有一条数据的数组
   */
  showSendedInfo: function(data){
    data.thumb = 0;
    var list = this.data.comments;

    list.unshift(data);
    this.setData({
      comments: list
    })
  },


  /**
   * 对评论点赞
   * 用户在离开本页面后将其在本页面的所有点赞数据批量发送
   * util.thumb
   */
  thumbsUp: function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    var config = {
      "id": id,
      "type": 2
    }

    var list = that.data.comments;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id == config.id) {
        list[i].thumb += 1;
        list[i].src = '../../pictures/thumded.png';
        list[i].tap = 'userThumbed'
      }
    }

    this.setData({
      comments: list
    })
    // 手动加1，换颜色
    // 退出该页面，打包发送数据

    util.thumb(config, function (res) {

    })

  },

  /**
   * 用户已赞
   */
  userThumbed: function () {
    wx.showToast({
      title: '您已顶过',
      duration: 500
    })
  },


  /**
   * sendThought提交评论内容
   */
  sendThought: function(e){
    var that = this;
    var user = app.globalData.userInfo;

    if(!user){
      app.getUserInfo();
    }

    var data_ = {
      top_id: that.data.para,
      comment: that.data.value,
      openid: app.globalData.openid,
      avatarUrl: app.globalData.userInfo.avatarUrl,
      nickName: app.globalData.userInfo.nickName
    }
    if(data_.comment == ''){
      return;
    }
    wx.request({
      url: app.globalData.url + "/admin/wx/topic_comment",
      data: data_ ,
      method: 'POST',
      success: function(res){
        // 评论成功，返回本条评论数据

        wx.showToast({
          title: '发送成功！',
          duration: 800
        });
 
        // 显示已发送的评论
        that.showSendedInfo(res.data)
        that.closeComments();
      },
      fail: function(){
        wx.showToast({
          title: '网络出错，请重试',
          icon: 'loading',
          duration: 1000
        })
      }
    })
  },


  /**
   * 点击收藏
   * 调用util方法
   */
  addFollow: function () {
    var that = this;
    var config = {
      'resourceid': that.data.para,
      'type': '2'
    }
    that.setData({
      followHeart: '../../pictures/followed.png',
      followOption: ''
    })

    util.toFollow(config, function (res) {
      wx.showToast({
        title: '收藏成功',
        duration: 500
      })

      if (res.data) {
        that.setData({
          followed_id: res.data.id,
          followOption: 'removeFollow',
          followtxt: "已收藏"
        })
      }
    }, function () {
      that.setData({
        followHeart: '../../pictures/follow-ico.png',
        followOption: 'addFollow',
        followtxt: "收藏"
      })
    })
  },


  /**
   * 取消收藏
   * 主要数据： 被收藏数据的Id
   */
  removeFollow: function () {
    var that = this;
    var id = that.data.followed_id;

    that.setData({
      followHeart: '../../pictures/follow-ico.png',
      followOption: ''
    })
    util.unFollow(id, function (res) {
      wx.showToast({
        title: '已取消',
        duration: 500
      })
      that.setData({
        followOption: 'addFollow',
        followtxt: "收藏"
      })
    }, function () {
      that.setData({
        followHeart: '../../pictures/followed.png',
        followOption: 'removeFollow',
        followtxt: "已收藏"
      })
    })

  },



  /**
   * areaInput输入事件
   */
  areaInput: function (e) {
    this.setData({
      value: e.detail.value
    })
  },

  //==================非功能方法=====================
  /**
   * 点击说一说按钮
   */
  startComments: function(){
    this.setData({
      showbox: ""
    })
  },

  /**
   * 关闭评论框
   */
  closeComments: function(){
    this.setData({
      showbox: "hide",
      value: ''
    })
  },

})