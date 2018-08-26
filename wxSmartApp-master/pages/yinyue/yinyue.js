import {
  scansaoma, gofujin, gofenxaing
} from "../../libs/saoma";
import { goToUser, goToShare, goToMyWallet, goToUserInfo, goToMyDevice, goToFollowList, goToFansList, goToPhoneTest, goToReceiveDev } from "../../libs/router";

let app = getApp();
let PATH = app.globalData.PATH;
let IMG_PATH = app.globalData.IMG_PATH;
let VIDEO_PATH = app.globalData.VIDEO_PATH;
let arr = [];

function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 1000).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}


Page({

  data: {
    IMG_PATH: IMG_PATH,
    VIDEO_PATH: VIDEO_PATH,
    src: '',
    video_data: [],
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
      }

    ],
    a: true
  },


  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo');
  },

  inputValue: '',


  onLoad: function (option) {
    let that = this;
    console.log(option)
    this.setData({
      index: option.index
    })

    getBanner(that);

    wx.request({
      url: PATH + "/resource-service/movie/get",
      data: {
        id: option.index,
        userId: app.globalData.userId,

      },
      header: {
        "Access-token": app.globalData.accessToken,
      },
      method: 'GET',
      success: function (res) {
        console.log("bbb");
        console.log(res.data.passVisit)
        that.setData({ video_data: res.data.passVisit, movieAct: res.data.danmu })
        that.setData({ movieUrl: res.data.movie.imgUrl})
        console.log("------------------------------------");

        var danmu = res.data.danmu;
        
        

        console.log(danmu);
        for (var i = 0; i < danmu.length; i++) {

           var temp = new Object();
           temp.text = danmu[i];
           temp.color = getRandomColor();
           temp.time = i + 1;
           arr.push(temp);

        }
        that.setData({ danmuList: arr })
        console.log(that.data.danmuList);
        console.log("------------------------------------");

      }

    })

  },



  bindInputBlur: function (e) {
    this.inputValue = e.detail.value
  },


  goToHistoryShare: function (e) {
    console.log(e);
    let that = this;
    wx.navigateTo({
      url: '../shareHistory/shareHistory?id=' + e.currentTarget.dataset.id + '&isNotice=' + that.data.isNotice
    });
  },


  bindButtonTap: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success: function (res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },



  bindSendDanmu: function () {

    let that = this;


    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })

    //插入弹幕
    wx.request({

      url: PATH + "/resource-service/movie/insertAct",
      data: {
        id: that.data.index,
        userId: app.globalData.userId,
        content: this.inputValue
      },
      header: {
        "Access-token": app.globalData.accessToken,
      },
      method: 'GET',
      success: function (res) {
        console.log(res);

      }
    })






  },

  onShow: function () {
    wx.showShareMenu({
      withShareTicket: true,
      success: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },
  //分享
  onShareAppMessage: function (res) {
    let that = this;
    that.setData({
      hide: true
    })
    let path_share;
    path_share = '/pages/yinyue/yinyue?type=share&id=' + that.data.index + "&invideCode=" + app.globalData.userId
    return {
      title: '爱心分享图片，轻松月入百万！',
      path: path_share,
      success: function (res) {
        console.log(res);
        // 转发成功
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log(res);

          }
        })
      },
      fail: function (res) {
        // 转发失败
      },
      complete: function () {
        that.setData({
          hide: false
        })
      }
    }
  },




  // 去地图
  goToMap: function () {
    gofujin(app.globalData.location)
  },
  // 触电扫码
  scanCode: function () {
    let that = this;
    scansaoma(app.globalData.userId, goToReceiveDev, PATH)
  },
  // 我的
  goToUser: function () {
    // goToUser();
    wx.reLaunch({
      url: '/pages/user/user'
    })
  },
  // 秀秀
  goToShare: function () {
    let that = this;
    gofenxaing()

  },
  //首页
  homePage: function () {
    wx.reLaunch({
      url: '/pages/main/main',
    })
  }
})

function getBanner(that) {
  wx.request({
    url: PATH + '/resource-service/share/getBanner',
    method: 'get',
    header: {
      'Access-Token': app.globalData.accessToken,
    },
    success: function (res) {
      console.log(res);
      if (res.statusCode == 200 && res.data.status == 200) {
        var a = Math.floor(Math.random() * 5);

        console.log(a)
        that.setData({
          imgUrls: res.data.list[a]
        });

        console.log(that.data.imgUrls);

      }
    }
  })
}