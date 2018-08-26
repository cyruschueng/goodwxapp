let tcity = require("../../utils/citys.js");
let app = getApp();
let sign = wx.getStorageSync('sign');
let common = require('../../common.js');
let apiurl = 'https://friend-guess.playonwechat.com/';
import tips from '../../utils/tips.js' 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab:'city'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    console.log(options);
    let userInfo = wx.getStorageSync('userInfo');
    if (options.idol_id){
      this.setData({
        idol_id: options.idol_id,
        userInfo: userInfo
      })
    }
    // if (options.scene) {
    //   let scene = decodeURIComponent(options.scene);
    //   console.log('scene', scene);
    //   var strs = new Array(); //定义一数组 
    //   strs = scene.split("_"); //字符分割 
    //   console.log(strs);
    //   console.log("idol_id:", strs[3]);
    //   this.setData({
    //     idol_id: strs[3],
    //     userInfo: userInfo
    //   })
    // }
    if (options.scene == 1044) {
      wx.getShareInfo({
        shareTicket: shareTicket,
        success: function (res) {
          var encryptedData = res.encryptedData;
          var iv = res.iv;
        }
      })
    }
    wx.showShareMenu({
      withShareTicket: true, //要求小程序返回分享目标信息
      success(res) {
        console.log("res:", res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onLaunch: function (ops) {
    console.log(ops);
    if (ops.scene == 1044) {
      console.log('传shareTicket：', ops.shareTicket)
      this.setData({
        shareTicket: ops.shareTicket
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    app.getAuth(function () {
      let userInfo = wx.getStorageSync('userInfo');
      let sign = wx.getStorageSync('sign');
      console.log(userInfo);
      that.setData({
        userInfo: userInfo
      })
      //详情
      wx.request({
        url: apiurl + "birth/idol-detail?sign=" + sign + '&operator_id=' + app.data.kid,
        data:{
          idol_id: that.data.idol_id
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("偶像详情 :", res);
          var status = res.data.status;
          if (status == 1) {
            that.setData({
              informAll: res.data.data,
              wish_count: res.data.data.info.wish_count, //赞
              follow:res.data.data.follow_idol,
              length1: res.data.data.country_wish_rank.length
            })
          } else {
            console.log(res.data.msg)
          }
        }
      })
    })
  },
  goodPoster() {
    wx.navigateTo({
      url: '../goodPoster/goodPoster?idol_id='+this.data.idol_id
    })
  },
  dianzan(){
      let that = this;
      let sign = wx.getStorageSync('sign');
      let wish_count = that.data.wish_count;
      //点赞
      wx.request({
        url: apiurl + "birth/thumb-idol?sign=" + sign + '&operator_id=' + app.data.kid,
        data: {
          idol_id: that.data.idol_id
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("偶像点赞 :", res);
          let status = res.data.status;
          if (status == 1) {
            that.setData({
              wish_count: parseInt(wish_count)+1
            })
          } else {
            console.log(res.data.msg)
          }
        }
      })
  },
  // 关注
  guanzhu(){
    let that = this;
    let sign = wx.getStorageSync('sign');
    let follow = that.data.follow;
    console.log(follow);
    let type = '';
    if (follow==false){
       type = 0
    }else{
       type = 1
    }
    that.setData({
      type: type
    })
    wx.request({
      url: apiurl + "birth/subscribe-idol?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        idol_id: that.data.idol_id,
        type: that.data.type
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("是否关注 :", res);
        let status = res.data.status;
        if (status == 1) {
          tips.success('操作成功');
          that.setData({
            follow: !that.data.follow
          })
        } else {
          console.log(res.data.msg);
          tips.error(res.data.msg);
        }
      }
    })
  },
  tab(e){
    wx.showLoading({
      title: '加载中',
    });
    let that = this;
    let sign = wx.getStorageSync('sign');
    let tab = e.currentTarget.dataset.tab;
    console.log(tab);
    that.setData({
      tab
    })
    wx.request({
      url: apiurl + "birth/idol-detail?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        idol_id: that.data.idol_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("详情 :", res);
        let status = res.data.status;
        if (status == 1) {
          that.setData({
            informAll: that.data.data
          })
        } else {
          console.log(res.data.msg);
          tips.error(res.data.msg);
        }
      }
    })
    wx.hideLoading()
  },
// 装发到群
  onShareAppMessage() {
    let that = this;
    let sign = wx.getStorageSync("sign");
    return {
      title: '送生日祝福',
      path: '/pages/goodInform/goodInform?idol_id=' + that.data.idol_id,
      success(res) {
        console.log("shareTickets:", res.shareTickets[0]) // 奇怪为什么 shareTickets 是个数组？这个数组永远只有一个值。
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          complete(res) {
            console.log(res)
            wx.request({
              url: apiurl + "birth/save-group-relation?sign=" + sign + '&operator_id=' + app.data.kid,
              data: {
                encryptedData: res.encryptedData,
                iv: res.iv
              },
              header: {
                'content-type': 'application/json'
              },
              method: "GET",
              success: function (res) {
                console.log("所在群信息2:", res);
                var status = res.data.status;
                if (status == 1) {
                  tips.success('转发成功');
                } else {
                  console.log(res.data.msg)
                  tips.error(res.data.msg)
                }
              }
            })
          }

        })
      }
    }
  },

})