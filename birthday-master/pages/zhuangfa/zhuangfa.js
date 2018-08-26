// pages/zhuangfa/zhuangfa.js
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
      niceText:[
        '最难忘的是欢声笑语，最珍惜的是朋友情谊，让我们第一时间送上生日祝福，分享彼此的喜悦吧',
        '生日这种事嘛，肯定有礼物收，知道你懒，快来写下你的生日，让我们一起帮你收礼物吧',
        '蛋糕、烛光、笑脸，美好的时刻与你共享；友谊、鲜花、掌声，激动的瞬间与你同贺，让我们共享彼此的生日喜悦吧',
        '这里永远是我们内心最温暖的港湾，让我们一起分享彼此的生日，迎接欢聚的时刻吧',
        '忙碌的日子里，希望有我的关心相伴；平淡的生活中，希望有我的祝福相随，快来写下你的生日吧'
      ],
      now:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo: userInfo
    })
    wx.showShareMenu({
      withShareTicket: true, //要求小程序返回分享目标信息
       success(res) {
         console.log("res:",res)
      }
    })
    
  },
  onLaunch: function (ops) {
    console.log(ops);
    if (ops.scene == 1044) {
      console.log('传shareTicket：',ops.shareTicket)
      this.setData({
        shareTicket: ops.shareTicket
      })
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
    let that = this;
    let sign = wx.getStorageSync("sign");
    let mid = wx.getStorageSync("mid");
    that.setData({
      mid: mid
    })
    if (that.data.shareTicket){
        wx.getShareInfo({
          shareTicket: that.data.shareTicket,
          complete(res) {
            console.log(res);
            wx.request({
                  url: apiurl + "birth/save-group-relation?sign=" + sign + '&operator_id=' + app.data.kid,
                  data:{
                    encryptedData: res.encryptedData,
                    iv: res.iv
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  method: "GET",
                  success: function (res) {
                    console.log("所在群信息1:", res);
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
  },
  // 其他的页面函数、生命周期函数等
  onShareAppMessage() {
    let that = this;
    let sign = wx.getStorageSync("sign");
    return {
      title: that.data.niceText[that.data.now],
      withShareTicket: true,
      path: '/pages/zhuangfa0/zhuangfa0?name=' + that.data.userInfo.nickName,
      success(res) {
        wx.setStorageSync('shareTickets', res.shareTickets[0]);
        console.log("shareTickets:",res.shareTickets[0]) // 奇怪为什么 shareTickets 是个数组？这个数组永远只有一个值。
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          complete(res) {
            console.log(res)
            wx.request({
              url: apiurl + "birth/save-group-relation?sign=" + sign + '&operator_id=' + app.data.kid,
              data: {
                encryptedData:res.encryptedData, //encodeURIComponent(res.encryptedData),
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
  change(){
    let that = this;
    let now = that.data.now;
    if (now < that.data.niceText.length-1) {
      setTimeout(function () {
          now += 1;
          that.setData({
             now
          })
      }, 20)
    }else{
      that.setData({
        now:0
      })
    }
  } 
})