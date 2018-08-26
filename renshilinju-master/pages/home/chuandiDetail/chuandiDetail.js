// pages/home/chuandiDetail/chuandiDetail.js
var publicUrl = getApp();
var url = publicUrl.globalData.baseAPI;
var picUrl = publicUrl.globalData.picurl;
var dataset = require('../../../utils/date.js')

var getDetails = function (that, passesid, userInfo){
  console.log(passesid)
  console.log("passesid")
  console.log(userInfo)
  console.log("passesid")



  wx.request({
    url: url + '/passes/' + passesid,
    data: {
    },
    header: {
      'Accept': "*/*",
      'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
    },
    success: function (res) {
      wx.hideLoading()
      console.log(res.data)
      success: {
        console.log(res.data)
        var assetindex = res.data.asset.indexOf('?');
        var passelist = {
          id: res.data.id,
          // userasset: userInfo.avatar,
          // username: userInfo.name,
          leixing: res.data.leixing,
          time: res.data.time,
          title: res.data.title,
          asset: picUrl + res.data.asset.substring(0, assetindex),
        }
        that.setData({
          passelist: passelist,
        })
        getExchanges(that, passesid, userInfo);

        console.log(passelist)
      }
    }
  })
}

var getExchanges = function (that, passesid, userInfo){
  var applies = [];
  wx.request({
    url: url + '/exchanges?passid=' + passesid,
    data: {
    },
    header: {
      'Accept': "*/*",
      'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
    },
    success: function (res) {
      console.log(res.data);
      for (var i = 0; i < res.data.exchanges.length; i++) {
        var apply = {
          useravatar: res.data.exchanges[i].useravatar,
          time: res.data.exchanges[i].time,
          username: res.data.exchanges[i].username
        }
        applies.push(apply)
        console.log(applies)
      }
      that.setData({
        applies: applies
      })
      getComments(that, passesid, userInfo);
    },
    fail: function (error) {
      console.log(error);
    }
  })
}

var getComments = function (that, passesid, userInfo){
  var comments = [];
  var user = [];

  wx.request({
    url: url + '/comments/passes/' + passesid,
    data: {
      passid: passesid,
      userid: userInfo.id
    },
    header: {
      'Accept': "*/*",
      'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
    },
    success: function (res) {
      console.log(res.data)
      var user={
        userasset: res.data.pass.userasset,
        username: res.data.pass.username
      }
      for (var i = 0; i < res.data.comments.length; i++) {
        var comment = {
          id: res.data.comments[i].id,
          commentableid: res.data.comments[i].commentable_id,
          title: res.data.comments[i].title,
          userasset: res.data.comments[i].userasset,
          username: res.data.comments[i].username,
          uid: res.data.comments[i].userid,
          time: dataset.getDateDiff(res.data.comments[i].time),
        }
        comments.push(comment)
      }
      that.setData({
        comments: comments,
        user:user,
        commentlenght: res.data.comments.length,
        status: res.data.pass.status
      })
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
    comments: '',
    list: {},
    passelist: {},
    applies: [],
    showModalStatus: false,
    showModal: false,
    focus: true,
    userInfo: '',
    eventid: '',
    status:'',
    passesid:'',
    user:[],
    path:''
  },
  want:function(res){
    var that = this;
    var userInfo = publicUrl.globalData.userInfo;
    //判断用户的小区id是否等于该post的小区id
    if (that.data.opsxqid != null) {
      if (that.data.xiaoquid != that.data.opsxqid) {
        wx.reLaunch({
          url: '/pages/check/check?name=' + that.data.invitor + '&xqname=' + that.data.opsxqname + '&xqid=' + that.data.opsxqid,
        })
      }
    }
    wx.request({
      url: url + '/exchanges',
      method: 'post',
      data: {
        passid: that.data.passelist.id,
        userid: userInfo.id,
        desc: 111
      },
      header: {
        'Accept': "*/*",
        'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
      },
      success: function (res) {
        console.log(res);
        that.onShow();
      },
      fail: function (error) {
        console.log(error);
      }
    })
  },
  showDialogBtn: function (event) {
    console.log(event)
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
  getComment: function (e) {
    console.log(e);
    this.setData({
      title: e.detail.value
    })
    console.log(this.data.title)

  },
  postComment: function (e) {
    var that = this;
    console.log(e)
    console.log(this.data.title)
    var userInfo = publicUrl.globalData.userInfo
    var currentStatu = e.currentTarget.dataset.statu;
    that.util(currentStatu)
    wx.request({
      url: url + '/comments/passes',
      method: 'post',
      data: {
        id: that.data.passelist.id,
        title: that.data.title,
        userid: userInfo.id
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
  powerDrawer: function (e) {
    var that = this;
    //判断用户的小区id是否等于该post的小区id
    if (that.data.opsxqid != null) {
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
            showModalStatus1: true
          }
        );
      }
    }.bind(this), 200)

    // 显示 
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true,
          showModalStatus1: false
        }
      );
    }
  },
  fanhui:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  back: function () {
    var that = this
    if (that.data.opsxqid != null) {
      if (that.data.xiaoquid != that.data.opsxqid) {
        wx.reLaunch({
          url: '/pages/check/check?name=' + that.data.invitor + '&xqname=' + that.data.opsxqname + '&xqid=' + that.data.opsxqid,
        })
      }
    }
    wx.reLaunch({
      url: '/pages/home/home'
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (ops) {
    console.log(ops)
    wx.setNavigationBarTitle({
      title: '发布的传递'
    })
    var userInfo = publicUrl.globalData.userInfo;

    if (ops.invitor != null){
      this.setData({
        path:"fabu"
      })
    }

    this.setData({
      path:ops.path,
      passesid: ops.id,
      opsxqid: ops.xqid,
      opsxqname: ops.xqname,
      invitor: ops.invitor,
      userInfo: userInfo,
      xiaoquid: userInfo.xqid,
      userid: userInfo.id
    })

    if (userInfo.id == null) {
      wx.showLoading({
        title: '加载中',
      })
    } else {
      getDetails(this, ops.id, userInfo)
    }
  },

  onShow:function(){
    var that = this
    var userInfo = publicUrl.globalData.userInfo

    if (userInfo.id == null) {
      wx.showLoading({
        title: '加载中',
      })
    } else {
      if (that.data.passesid != null) {
        getDetails(that, that.data.passesid, userInfo)
      }
    }
  },
  onShareAppMessage: function (res) {
    var userInfo = wx.getStorageSync('userInfo');
    var that =this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: userInfo.name + '通知你：',
      path: '/pages/home/chuandiDetail/chuandiDetail?id=' + that.data.passesid + '&xqname=' + userInfo.xqname + '&xqid=' + userInfo.xqid + '&name=' + userInfo.name,
      success: function (res) {
        console.log("11111111111")
      },
      fail: function (res) {
        console.log("222222222222")
      }
    }

  }

})