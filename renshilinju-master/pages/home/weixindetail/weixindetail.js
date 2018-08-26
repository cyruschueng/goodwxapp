// pages/home/weixindetail/weixindetail.js
var publicUrl = getApp();
var url = publicUrl.globalData.baseAPI;
var picUrl = publicUrl.globalData.picurl;
var dataset = require('../../../utils/date.js')


var getDetails = function (that, weixinid, userInfo){
  var commentlists = [];
  var assets = [];
  wx.request({
    url: url + '/comments/weixins/' + weixinid,
      data: {
      },
      header: {
        'Accept': "*/*",
        'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        var weixinlist={
          wid: res.data.weixins.id,
          userid: res.data.weixins.userid,
          username: res.data.weixins.username,
          userasset: res.data.weixins.userasset,
          time: res.data.weixins.time,
          wname: res.data.weixins.name,
          weino: res.data.weixins.weino,
          xiaoquid: res.data.weixins.xiaoqu_id,
          desc: res.data.weixins.desc,
          assets: res.data.weixins.assets
        }
        for (var i = 0; i < res.data.comments.length; i++) {
          var commentlist = {
            title: res.data.comments[i].title,
            commentableid: res.data.comments[i].commentable_id,
            id: res.data.comments[i].id,
            userid: res.data.comments[i].userid,
            userasset: res.data.comments[i].userasset,
            username: res.data.comments[i].username,
            // time: res.data.comments[i].time,
            time: dataset.getDateDiff(res.data.comments[i].time),
          }
          commentlists.push(commentlist)
        }
        that.setData({
          weixinlist: weixinlist,
          commentlists: commentlists,
          commentlenght: res.data.commentlenght
        })
      }
    });
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weixinlist:[],
    title: '',
    commentlists: [],
    userInfo:'',
    weixinid:'',
    path:''
  },
  fuzhi:function(e){
    console.log(e.currentTarget.dataset.num)
    wx.setClipboardData({
      data: e.currentTarget.dataset.num,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data) // data
            wx.showToast({
              title: '复制成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
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
  postComment: function (e) {
    var that = this
    console.log(e)
    console.log(that.data.title)
    var currentStatu = e.currentTarget.dataset.statu;
    var userInfo = publicUrl.globalData.userInfo
    that.util(currentStatu)
    wx.request({
      url: url + '/comments/weixins',
      method: 'post',
      data: {
        id: that.data.weixinid,
        title: that.data.title,
        userid:userInfo.id
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
    var that = this
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
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示 
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  back: function(){
    wx.reLaunch({
      url:'/pages/home/home'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (ops) {
    console.log(ops)
    var userInfo = publicUrl.globalData.userInfo;
    wx.setNavigationBarTitle({
      title: '发布的社群'
    })
    if (ops.invitor != null) {
      this.setData({
        path: "fabu"
      })
    } 
    this.setData({
      path:ops.path,
      weixinid: ops.id,
      opsxqid: ops.xqid,
      opsxqname: ops.xqname,
      invitor: ops.invitor,
      userInfo: userInfo,
      xiaoquid: userInfo.xqid,
      userid: userInfo.id
    })

    
    var commentlists = [];
    if (userInfo.id == null) {
      wx.showLoading({
        title: '加载中',
      })
    } else {
      getDetails(this, ops.id, userInfo)
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    var userInfo = publicUrl.globalData.userInfo

    if (userInfo.id == null) {
      wx.showLoading({
        title: '加载中',
      })
    } else {
      if (that.data.weixinid != null) {
        getDetails(that, that.data.weixinid, userInfo)
      }
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var userInfo = wx.getStorageSync('userInfo');
    console.log(userInfo)
    var that =this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: userInfo.name + '通知你：',
      path: '/pages/home/weixindetail/weixindetail?id=' + that.data.weixinid + '&xqname=' + userInfo.xqname + '&xqid=' + userInfo.xqid + '&name=' + userInfo.name,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})