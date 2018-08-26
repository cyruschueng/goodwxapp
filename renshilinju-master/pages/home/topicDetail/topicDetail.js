// pages/mine/mineTheme/mineTheme.js
var publicUrl = getApp();
var url = publicUrl.globalData.baseAPI;
var picUrl = publicUrl.globalData.picurl;
var dataset = require('../../../utils/date.js')

var getApplies = function (that, postid, userInfo) {
  var applies = [];

  wx.request({
    url: url + '/applies?postid=' + postid,
    data: {
    },
    header: {
      'Accept': "*/*",
      'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
    },
    success: function (res) {
      console.log(res.data);
      for (var i = 0; i < res.data.applies.length; i++) {
        var apply = {
          useravatar: res.data.applies[i].useravatar
        }
        applies.push(apply)
      }
      that.setData({
        applies: applies
      })
    },
    fail: function (error) {
      console.log(error);
    }
  })
}

var getDetails = function (that,postid, userInfo){
  var commentlists = [];
  var assets = [];

  wx.request({
    url: url + '/comments/posts/' + postid + '?userid=' + userInfo.id,
    data: {
    },
    header: {
      'Accept': "*/*",
      'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
    },
    success: function (res) {
      wx.hideLoading()
      console.log(res.data)
      var postlist = {
        id: res.data.post.id,
        title: res.data.post.title,
        body: res.data.post.body,
        assets: res.data.post.assets,
        userasset: res.data.post.userasset,
        userid: res.data.post.userid,
        eventid: res.data.post.id,
        postid: postid,
        status: res.data.post.status,
        username: res.data.post.username,
        leixing: res.data.post.leixing,
        time: dataset.getDateDiff(res.data.post.time),
        phone: res.data.post.phone,
        desc: res.data.post.desc,
        name: res.data.post.name,
        tags: res.data.post.tagthumbs
      }
      for (var i = 0; i < res.data.comment.length; i++) {
        var commentlist = {
          title: res.data.comment[i].title,
          commentableid: res.data.comment[i].commentable_id,
          username: res.data.comment[i].username,
          userasset: res.data.comment[i].userasset,
          id: res.data.comment[i].id,
          userid: res.data.comment[i].userid,
          time: dataset.getDateDiff(res.data.comment[i].time)
        }
        commentlists.push(commentlist)
      }
      that.setData({
        postlist: postlist,
        commentlists: commentlists,
        assets: assets,
        commentlenght: res.data.commentlenght,
      })
      if (that.data.postlist.leixing=='event'){
        getApplies(that, postid, userInfo);
      }
      
    }
  })
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    topic: [],
    sumposts: 0,
    title: '',
    commentInput: '',
    commentlists: [],
    assets:[],
    postlist: {},
    applies: [],
    showModalStatus: false,
    showModal: false,
    focus:true,
    userInfo: '',
    eventid: '',
    postid:'',
    path:''
  },
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  onCancel: function () {
    this.hideModal();
  },
  onConfirm: function () {
    this.hideModal();
  },
  baoming:function(res){
    var that = this;
    var userInfo = publicUrl.globalData.userInfo;
    //判断用户的小区id是否等于该post的小区id
    if (that.data.opsxqid!=null){
      if (that.data.xiaoquid != that.data.opsxqid) {
        wx.reLaunch({
          url: '/pages/check/check?name=' + that.data.invitor + '&xqname=' + that.data.opsxqname + '&xqid=' + that.data.opsxqid,
        })
      }
    }
    console.log(that.data.postlist.postid)
    console.log(userInfo.id)
    wx.request({
      url: url + '/applies',
      method: 'post',
      data: {
        postid: that.data.postlist.postid,
        userid: userInfo.id,
        desc: 111
      },
      header: {
        'Accept': "*/*",
        'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
      },
      success: function (res) {
        console.log(res.data);
        that.onShow();
      },
      fail: function (error) {
        console.log(error);
      }
    })
  },
  getComment: function (e) {
    console.log(e);
    this.setData({
      title: e.detail.value
    })
    console.log(this.data.title)
    
  },
  postComment:function(e){
    var that = this
    var userInfo = publicUrl.globalData.userInfo
    var currentStatu = e.currentTarget.dataset.statu;

    that.util(currentStatu)
    wx.request({
      url: url + '/comments/posts',
      method: 'post',
      data: {
        id: that.data.postid,
        title: that.data.title,
        userid: userInfo.id
      },
      header: {
        'Accept': "*/*",
        'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
      },
      success: function (res) {
        that.onShow()
      },
      fail: function (error) {
        console.log(error);
      }
    })
  },
  yibaoming:function(e){
    wx.showToast({
      title: '您已经报过名喽~',
      icon: 'success',
      duration: 2000
    })
  },
  powerDrawer: function (e) {
    var that = this
    //判断用户的小区id是否等于该post的小区id
    console.log("11111power111"+that.data.opsxqid)
    if (that.data.opsxqid!=null){
      if (that.data.xiaoquid != that.data.opsxqid) {
        wx.reLaunch({
          url: '/pages/check/check?name=' + that.data.invitor + '&xqname=' + that.data.opsxqname + '&xqid=' + that.data.opsxqid,
        })
      } 
    }
    var currentStatu = e.currentTarget.dataset.statu;
    that.util(currentStatu)
  }, 

  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200, //动画时长 
      timingFunction: "linear", //线性 
      delay: 0 //0则不延迟 
    });

    // 第2步：这个动画实例赋给当前的动画实例 
    this.animation = animation;

    // 第3步：执行第一组动画 
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        animationData: animation
      })

      //关闭 
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false,
            showModalStatus1:true
          }
        );
      }
    }.bind(this), 200)

    // 显示 
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true,
          showModalStatus1:false
        }
      );
    }
  },
  back: function () {
    wx.reLaunch({
      url: '/pages/home/home'
    })
  },
  call:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.postlist.phone 
    })
  },
  praise:function(res){
    console.log(res)
    var imgsrc = res.target.dataset.imgsrc;
    var userInfo = publicUrl.globalData.userInfo;
    var message='';
    var that = this;
    //判断用户的小区id是否等于该post的小区id
    if (that.data.opsxqid!=null){
      if (that.data.xiaoquid != that.data.opsxqid) {
        wx.reLaunch({
          url: '/pages/check/check?name=' + that.data.invitor + '&xqname=' + that.data.opsxqname + '&xqid=' + that.data.opsxqid,
        })
      }
    }
    console.log(that.data.postlist.id)
    wx.request({
      url: url + '/thumbsups',
      method: 'POST',
      data: {
        postid: that.data.postlist.postid,
        userid: userInfo.id,
        tag: res.currentTarget.dataset.name,
      },
      header: {
        'Accept': "*/*",
        'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
      },
      success: function (res) {
        console.log(res.data.message)
        that.onShow();
        if (res.data.message == '已创建记录！') {
          wx.showToast({
            title: '您已经赞过了',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (ops) {
    console.log(ops)
    this.setData({
      path:ops.path
    })
    wx.setNavigationBarTitle({
      title: '发布的话题'
    })
    var userInfo = publicUrl.globalData.userInfo;
    if (ops.invitor != null) {
      this.setData({
        path: "fabu"
      })
    }
    this.setData({
      postid: ops.id,
      opsxqid: ops.xqid,
      opsxqname: ops.xqname,
      invitor: ops.invitor,
      userInfo: userInfo,
      xiaoquid: userInfo.xqid,
      userid: userInfo.id
    })

    if (userInfo.id ==null){
      wx.showLoading({
        title: '加载中',
      })
    }else{
      getDetails(this, ops.id, userInfo)
    }
  },

  onShow: function (){
    var that = this
    var userInfo = publicUrl.globalData.userInfo

    if (userInfo.id == null) {
      wx.showLoading({
        title: '加载中',
      })
    } else {
      if (that.data.postid != null) {
        if (that.data.path == 'fabu') {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
        }
        getDetails(that, that.data.postid, userInfo)
      }
    }

  },

  onShareAppMessage: function (res) {
    var that = this
    var userInfo = wx.getStorageSync('userInfo');
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: userInfo.name + '通知你：',
      path: '/pages/home/topicDetail/topicDetail?id=' + that.data.postid+'&xqname='+userInfo.xqname+'&xqid='+userInfo.xqid+'&name='+userInfo.name,
      success: function (res) {
        console.log("1111success")
      },
      fail: function (res) {
        console.log("2222转发失败22222222")
      }
    }

  }

})