// pages/articledetail/articledetail.js

var WxParse = require('../../components/wxParse/wxParse.js');
var util = require('../../utils/util.js');
var app = getApp()
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    article: {
      //  "id": "16", "title": "上海最后的处女地！绝美渔村!", 
      // "cover": ["http://122.152.211.147/ueditor/php/upload/image/20170908/1504869133118174.png"], 
      // "author": "小蘑菇", 
      // "content": '<p style="color:#f40;">文章主要内容</p><p>文章主要内容</p><p>文章主要内容</p><p><img src="http://122.152.211.147/ueditor/php/upload/image/20170908/1504869133118174.png"></p>'
    },
    value: "", // 用户评论的内容
    commentsList: [
      // {
      //   id: "3", 
      //     avatarUrl: "http://122.152.211.147/ueditor/php/upload/image/20170908/1504869133118174.png",
      //     nickName: "Bragg"
      //   comment: "我们的诚实没有获得相等的回报，而且我认为阿森纳后卫穆斯塔菲也应该被红牌驱逐。",
      //   // 我认为今天晚上，观众足以看清楚事实。桑切斯开场那次无疑是假摔，当时并没有人碰到他，但裁判却给了阿森纳一个任意球。”
      //   thumb: 25
      // }
    ], // 评论内容列表
    recommendsList: [], // 推荐阅读列表
    followHeart: '../../pictures/follow-ico.png',  // 初始化收藏心图，‘../../pictures/followed.png’
    followOption: 'addFollow',  // 点击关注成功后，方法名变更，再次点击将执行其他方法
    followed_id: '', // 存储点击收藏后返回的收藏数据Id
    followtxt: '收藏',
    comment_current: '', // 评论已加载到
    loadinfo: '展开评论',
    mainShow: "hide", // 全部内容的容器
    loadingShow: "", // 加载背景
    commentShow: "hide", // 评论框容器
    contentShow: "hide", // 文章正文容器
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    /**
    * WxParse.wxParse(bindName , type, data, target,imagePadding)
    * 1.bindName绑定的数据名(必填)
    * 2.type可以为html或者md(必填)
    * 3.data为传入的具体数据(必填)
    * 4.target为Page对象,一般为this(必填)
    * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
    */

    var that = this;
    that.setData({
      id: options.id,
      openid: app.globalData.openid
    })

    that.loadArticle();

    that.loadComments();
  },

/**
 * 监听页面隐藏
 * 将本篇文章的点赞数据同步
 */
onHide: function(){
  
},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // onPullDownRefresh: function () {
  
  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // this.loadComments();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.article.title,
      imageUrl: this.data.article.image.split(",")[0],
      success: function(e){
        wx.showShareMenu({
          withShareTicket: true
        })
      }
    }
  },

  //===========================自定义方法=============================
test: function(){
  var query = wx.createSelectorQuery()
  var query = wx.createSelectorQuery()
  query.select('#content').boundingClientRect()
  query.selectViewport().scrollOffset()
  query.exec(function (res) {
    console.log(res)
  })
},


/**
 * 加载文章内容并显示
 */
loadArticle: function(){
  var that = this;
  // wx.showLoading({
  //   title: '加载中',
  // })
  wx.request({
    url: app.globalData.url + "/admin/article/article_detail",
    data: { "id": that.data.id, 'openid': that.data.openid },
    success: function (res) {
      var article = res.data;

      article.from = article.from == "" ? '原创' : article.from

      that.setData({
        article: article,
        mainShow: ""
      })

      // var time1 = Math.round(new Date() / 1000)
      WxParse.wxParse('moduContent', 'html', that.data.article.content, that, 0);
      // var time2 = Math.round(new Date() / 1000)
      
      that.setData({
        loadingShow: "hide",
        contentShow: ""
      })
      setTimeout(function(){
        that.setData({
          commentShow: ""
        })
      },430)
      
      // console.log("文章解析时间："+ (time2-time1));
      // 判断收藏
      that.Isfollowed();

      // test
      setTimeout(function(){
        that.test();
      },1500)
      // test
    },
    fail: function () {
      wx.showToast({
        title: '网络错误，请刷新重试',
        icon: 'loading',
        duration: '1000'
      })
    }
  })
},

/**
 * 加载文章评论列表
 */
loadComments: function(callback){
  var that = this;
  var list = that.data.commentsList;
  var current = that.data.comment_current;

  wx.request({
    url: app.globalData.url + '/admin/wx/article_commentlist',
    data: { "article_id": that.data.id, 'current': current },
    success: function (res) {

      var data = res.data;
      if (!(data instanceof Array)) {
        that.setData({
          loadinfo: '暂无更多评论'
        })
        return;
      }

      //对每组评论数据
      for(var i in data){
        data[i].src = '../../pictures/thumb.png',
        data[i].tap = 'userThumb'   // 每一条数据的点击事件随着用户操作而改变
      }

      data = list.concat(data);
      if (data.length == list.length) {
        that.setData({
          commentsList: data,
          loadinfo: '暂无更多评论'
        })
      } else {

        that.setData({
          commentsList: data,
          comment_current: data[data.length - 1].id
        })
      }

    },
    fail: function () {
      console.log("评论加载错误")
    }
  })
},

/**
 * 加载相关阅读（暂不考虑）
 */
loadRecommend: function(){},



/**
 * 文章是否已经收藏的判断
 */
Isfollowed: function(){

  var collect = this.data.article.collect;
  
  if(collect == 1){
    var followedid = this.data.article.id;
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
 * 提交评论
 * （1）用户省份信息验证
 */
sendMessage: function(){
  var that = this;

  /**
   * data参数介绍
   * @articleid: 文章id
   * @value：用户的评论内容
   * @openid：用户的唯一标识
   */

  var data = {
    article_id: that.data.id,
    comment: that.data.value,
    openid: app.globalData.openid,
    avatarUrl: app.globalData.userInfo.avatarUrl,
    nickName: app.globalData.userInfo.nickName
  }

  that.submitMsg = function(para){
    wx.request({
      url: app.globalData.url + '/admin/wx/article_comment',
      data: para,
      method: 'POST',
      success: function (res) {
        // 评论发送成功，将该条评论置顶显示
        var data = res.data;
        if(data.id){
          wx.showToast({
            title: '评论成功',
            duration: 800
          })
          data.src = '../../pictures/thumb.png';
          data.tap = 'userThumb'

          var list = that.data.commentsList;
        
          list.unshift(data);
          that.setData({
            commentsList: list,
            value: ''
          })
        }
      },
      fail: function () {
        // that.sendMessage();
        wx.showToast({
          title: '网络错误',
          icon: '；loading',
          duration: 800,
          mask: true
        })
      }
    })
  }

  // (1)
  if(data.comment.trim() == ''){
    return;
  }
  wx.checkSession({
    success: function(){
      that.submitMsg(data);
    },
    fail: function(){
      app.userCheckLogin();
    }
  })
},


/**
 * 用户点赞
 */
  userThumb: function(e){
    var config = {
      'id': e.currentTarget.dataset.id,
      'type': 1
    }
    var list = this.data.commentsList

    for(var i = 0; i<list.length; i++ ){
      if(list[i].id == config.id){
        list[i].thumb += 1;
        list[i].src = '../../pictures/thumded.png';
        list[i].tap = 'userThumbed'
      }
    }

    this.setData({
      commentsList: list
    })
    // 手动加1，换颜色
    // 退出该页面，打包发送数据

    util.thumb(config, function(res){
      
    })


  },

  /**
   * 用户已赞
   */
  userThumbed: function(){
    wx.showToast({
      title: '您已顶过',
      duration: 500
    })
  },


  /**
   * 点击收藏
   * 调用util方法
   */
  addFollow: function(){
    var that = this;
    var config = {
      'resourceid': this.data.id,
      'type': '1'
    }
    that.setData({
      followHeart: '../../pictures/followed.png',
      followOption: ''
    })

    util.toFollow(config, function(res){
      wx.showToast({
        title: '收藏成功',
        duration: 500
      })
      if(res.data){
        that.setData({
          followed_id: res.data.id,
          followOption: 'removeFollow',
          followtxt: '已收藏'
        })
      }

    }, function(){
      that.setData({
        followHeart: '../../pictures/follow-ico.png',
        followOption: 'addFollow'
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
    util.unFollow(id,function(res){
      wx.showToast({
        title: '已取消',
        duration: 500
      })
      that.setData({
        followOption: 'addFollow',
        followtxt: '收藏'
      })
    },function(){
      that.setData({
        followHeart: '../../pictures/followed.png',
        followOption: 'removeFollow',
        followtxt: '已收藏'
      })
    })
    
  },


//=============================非功能代码===============================

/**
 * 监听用户输入，实时更新value
 */
  getInputValue: function(e){
    var val = e.detail.value;

    this.setData({
      value: val
    })
  },

  /**
   * 点击分享
   */
  shareArticle: function(){
    this.onShareAppMessage()
  }
})