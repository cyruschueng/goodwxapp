import Api from '../../../utils/config/api.js';
// actStatus
import { GLOBAL_API_DOMAIN } from '../../../utils/config/config.js';
var app = getApp();
Page({
  data: {
    _build_url: GLOBAL_API_DOMAIN,   //域名
    actid: '',  //活动ID
    actdetail: [],  //根据ID查询某一条数据详情
    actlist: [],    //参加活动商家列表
    _value: '',  //搜索查询关键字
    starttime: '', //距离活动开始时间
    endtime: '', //距离活动结束时间
    page:1
  },

  onLoad: function (options) {
    this.setData({
      actid: options.actid
    });
    this.getactdetails();
    this.getactlist()
  },
  getactdetails() {  //获取单个活动详情
    let that = this;
    let _parms = {
      id: this.data.actid,
      userId: app.globalData.userInfo.userId,
      userName: app.globalData.userInfo.userName,
      sourceType: '1'
    }
    Api.actdetail(_parms).then((res) => {
      if(res.data.code == 0){
        let _endtime = res.data.data.endTime;
        let _startTime = res.data.data.startTime;
        _startTime = Date.parse(_startTime);
        _endtime = Date.parse(_endtime);
        let today = new Date();
        today = Date.parse(today);
        let dateSpan = _endtime - today;
        let dateTime = _startTime - today;
        let overdays = Math.floor(dateTime / (24 * 3600 * 1000));
        let iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
        if (iDays < 1) {
          iDays = 0
        }
        that.setData({
          endtime: iDays,
          starttime: overdays
        })
        that.setData({
          actdetail: res.data.data
        })
        wx.stopPullDownRefresh()
        wx.hideLoading();
      }
    })
  },
  lookActImg: function() {   //查看活动详情
    app.globalData.userInfo.actInfoImg = this.data.actdetail.actUrl
    wx.navigateTo({
      url: '../act-info/act-info'
    })
  },
  getactlist() {  //获取参加某一活动的商家列表
    let that = this;
    let _parms = {
      page:this.data.page,
      row:8,
      actId: this.data.actid,
      voteUserId: '1'
    }
    Api.actshoplist(_parms).then((res) => {
      wx.hideLoading()
      if(res.data.code ==0){
        if (res.data.data.list != '' && res.data.data.list != null){
          let _actlist = this.data.actlist
          let _data = res.data.data.list
          for (var i = 0; i < _data.length; i++) {
            _actlist.push(_data[i]);
          }
          that.setData({
            actlist: _actlist
          })
        }
        if (that.data.page == 1) {
          wx.stopPullDownRefresh()
        } else {
          wx.hideLoading();
        }
      }
    })
  },

  bindInput: function (e) {  //实时获取输入的值
    let value = e.detail.value
    this.setData({
      _value: e.detail.value
    })
  },

  selectnum() {  // 执行搜索  
    let that = this;
    this.setData({
      actlist: []
    })
    let _parms = {
      actId: this.data.actid,
      searchKey: this.data._value,
      voteUserId: app.globalData.userInfo.userId,
    }
    Api.actshoplist(_parms).then((res) => {
      that.setData({
        actlist: res.data.data.list
      })
    })
  },

  clickshop: function (e) {  //点击某个商家 跳转到该商家详情页
    let stopid = e.currentTarget.id
    wx.navigateTo({
      url: '../../index/merchant-particulars/merchant-particulars?shopid=' + stopid
    })
  },
  clickVote: function (e) {  //投票
    let that = this;
    if (this.data.endtime == 0){
      wx.showToast({
        mask: true,
        icon: 'none',
        title: '活动已结束，停止投票'
      }, 1500)
      return false
    }
    if (this.data.actdetail.actStatus == 0){
      wx.showToast({
        mask: true,
        icon: 'none',
        title: '活动还未开始，暂不可投票'
      }, 1500)
      return false
    }
    let stopid = e.currentTarget.id;
    let vote = this.data.actdetail
    let _parms = {
      actId: this.data.actid,
      shopId: stopid,
      userId: app.globalData.userInfo.userId,
      voteUserId: app.globalData.userInfo.userId
    }
    let arr = this.data.actlist
    for (let i = 0; i < arr.length; i++) {
      let ind = i;
      if (stopid == arr[i].id) {
        if (arr[i].isVote != 0) {
          Api.votedelete(_parms).then((res) => {
            if (res.data.code == 0) {
              arr[ind].isVote = 0,
                arr[ind].voteNum = arr[i].voteNum + 1,
                ++vote.voteNum
                that.setData({
                  actlist: arr,
                  actdetail:vote
                })
              wx.showToast({
                mask: true,
                icon: 'none',
                title: '投票成功'
              }, 1500)
            }
          })
        } else {
          Api.voteadd(_parms).then((res) => {
            if (res.data.code == 0) {
              arr[ind].isVote = 1,
                arr[ind].voteNum = arr[i].voteNum - 1,
                --vote.voteNum
                that.setData({
                  actlist: arr,
                  actdetail: vote
                })
                
              wx.showToast({
                mask: true,
                icon: 'none',
                title: '已取消'
              }, 1500)
            }
          })
        }
      }
    }
  },
  takePartIn: function() {   //商家报名活动
    //userType  1 普通用户/2 商家用户
    let that = this,
        userType = app.globalData.userInfo.userType,
        shopId = app.globalData.userInfo.shopId;
    if (this.data.actdetail.actStatus == 0){
      wx.showToast({
        title: '抱歉! 活动还未开始，暂不接受报名',
        icon: 'none'
      })
    }else if (this.data.endtime == 0){
      wx.showToast({
        title: '抱歉! 活动已结束,不再接受报名',
        icon: 'none'
      })
    }else if (userType == 1) {
      wx.showToast({
        title: '抱歉！仅商家用户才可以报名活动',
        icon: 'none'
      })
    } else if (userType == 2) {
      let _parms = {
        actId: this.data.actid,
        shopId: shopId
      }
      Api.takepartin(_parms).then((res) => {
        let _data = this.data.actdetail
        if(res.data.code == 0) {
          wx.showToast({
            title: '报名成功!',
            icon: 'none'
          })
          _data.isSign = 1
          that.setData({
            actdetail: _data
          });
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }
      })
    }
  },
  onReachBottom: function () {  //用户上拉触底
      wx.showLoading({
        title: '加载中..'
      })
      this.setData({
        page: this.data.page + 1
      });
      this.getactlist();
  },
  onPullDownRefresh: function () {    //用户下拉刷新
    wx.showLoading({
      title: '加载中..'
    })
    this.setData({
      actlist: [],
      page: 1
    });
    this.getactlist();
  }
})