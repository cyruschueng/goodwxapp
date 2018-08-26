const app = getApp();
const common = require('../../common.js');
const apiurl = 'https://friend-guess.playonwechat.com/';
let sign = wx.getStorageSync('sign');
import tips from '../../utils/tips.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      g_id: options.g_id
    })
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
    let that = this;
    let sign = wx.getStorageSync('sign');
    wx.showLoading({
      title: '加载中',
    });
    // 群信息
    wx.request({
      url: apiurl + "birth/group-detail?sign=" + sign + '&operator_id=' + app.data.kid,
      data:{
        g_id: that.data.g_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("群详情:", res);
        var status = res.data.status;
        if (status == 1) {
          wx.setStorageSync('informAll', res.data.data);
          that.setData({
            informAll: res.data.data
          })
        } else {
          console.log(res.data.msg)
        }
      }
    })
    wx.hideLoading()
  },
  setting(){
    wx.navigateTo({
      url: '../qunsetting/qunsetting?g_id=' + this.data.g_id
    })
  },
  // 详情
  inform(e){
    let that = this;
    let mf_id = e.currentTarget.dataset.mf_id;
    wx.navigateTo({
      url: '../hinform/hinform?mf_id=' + mf_id
    })
  },
 // 邀请群里更多的人加入
  onShareAppMessage() {
    let that = this;
    let sign = wx.getStorageSync("sign");
    let niceName = that.data.informAll.group_info.group_name;
    let index = niceName.indexOf("的");
      // nickName = niceName.substring(0, index);
       that.setData({
         nickName: niceName.substring(0, index)
       })
    return {
      title: '邀请加入' + that.data.informAll.group_info.group_name,
      path: '/pages/zhuangfa0/zhuangfa0?name=' + that.data.nickName +'share_gid='+ that.data.g_id,
      success(res) {
        console.log("shareTickets:", res);
        console.log("shareTickets:", res.shareTickets[0]) // 奇怪为什么 shareTickets 是个数组？这个数组永远只有一个值。
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          complete(res) {
            console.log(res)
            wx.request({
              url: apiurl + "birth/save-group-relation?sign=" + sign + '&operator_id=' + app.data.kid,
              data: {
                encryptedData: res.encryptedData, //encodeURIComponent(res.encryptedData),
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