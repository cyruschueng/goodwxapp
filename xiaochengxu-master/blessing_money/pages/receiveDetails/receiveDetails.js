//index.js
var app = getApp()
var showView = false
var showView1 = true
Page({
  data: {
    isPlay:false,
    isSpeaking: false,
    animationDataA1: {},
    animationDataA2: {},
    animationDataB1: {},
    animationDataB2: {},
    showView7:true,
    showView: false,
    showView1: true,
    showView3: false,
    showView4: true,
    showView5: false,
    showView6: true,
    showView2: true,
    j: 1,//帧动画初始图片 
    id: "",
    cid: "",
    openid:"",
    currentAni: 1,
    aniTimer: null,
  },
  globalData: {
    dataUrl: "",
    
  },
  onShareAppMessage: function () {
    var that = this
    console.log("1"+that.data.id)
    return {
      title: '微信小程序之祝福语包',
      desc: '一起来送上你的祝福吧!',
      path: '/pages/receiveDetails/receiveDetails?cid=' + that.data.id,
      success: function (res) {
        //console.log(that.data.id)
      }
    }
  },
  //事件处理函数
  sendEnvelop: function () {
    wx.navigateTo({
      url: '../sendEnvelop/sendEnvelop'
    })
  },
  //我要发
  selectTheme: function () {
    wx.navigateTo({
      url: '../selectTheme/selectTheme'
    })
  },

  toPause: function(){
    var _this = this; 
    this.setData({
      showView3: true,
      showView4: false
    })
    wx.pauseBackgroundAudio()
  },

  toStart: function () {
    var _this = this;
    this.setData({
      showView3: false,
      showView4: true
    })
    wx.playBackgroundAudio({
      dataUrl: getApp().globalData.dataUrl,
        title: '',
        coverImgUrl: ''
      })
  },

  onLoad: function (options) {
    var that = this
    var cid = options.cid
    if (cid){
     var hid = options.cid
    }else{
      hid = options.hid
    }
    getApp().globalData.qid = hid
    var openid = options.openid
    //console.log(openid)
    wx.request({
      url: 'https://www.mqtp8.cn/wishis/pay/hongBao', //余额接口
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {//这里写你要请求的参数
        id: getApp().globalData.qid,
        openId: getApp().globalData.openId,
      },
      success: function (res) { 
        //console.log(res)
        that.data.dataUrl = res.data.theme.music;
        getApp().globalData.dataUrl = res.data.theme.music 
        wx.playBackgroundAudio({
          dataUrl: res.data.theme.music,
          title: '',
          coverImgUrl: ''
        })
        //console.log("30"+getApp().globalData.dataUrl)
        if (res.data[0].num != res.data[0].no && res.data[0].status==0){
          that.setData({
            showView7: false,
            })
        }
        if (res.data[0].num == res.data[0].no){
          that.data.showView = true;
          that.data.showView1 = true;
          that.data.showView2 = false;
          if (res.data.my==0){
            if (res.data[0].type == 1) {
              that.setData({
                showView: true,
                showView1: true,
                showView5: false,
                showView6: true,
                showView2: false,
                id: res.data[0].id,
                items: res.data.record,
                p1: res.data.theme.p1,
                p2: res.data.theme.p2,
                p3: res.data.theme.p3,
                color:res.data.theme.color,
                bgcolor: res.data.theme.bgcolor,
                headimgurl: res.data[0].headimgurl,
                nickname: res.data[0].nickname,
                wishes_world: res.data[0].words,
                much: res.data[0].money,
                no: res.data[0].no,
                totle: res.data[0].num,
              })
              //console.log(that.data.showView2)
            } else {
              that.setData({
                showView: true,
                showView1: true,
                showView5: true,
                showView6: false,
                showView2: false,
                id: res.data[0].id,
                items: res.data.record,
                p1: res.data.theme.p1,
                p2: res.data.theme.p2,
                p3: res.data.theme.p3,
                color: res.data.theme.color,
                bgcolor: res.data.theme.bgcolor,
                headimgurl: res.data[0].headimgurl,
                nickname: res.data[0].nickname,
                wishes_world: res.data[0].words,
                much: res.data[0].money,
                no: res.data[0].no,
                totle: res.data[0].num,
              })
            }
          }else{
            if (res.data[0].type == 1) {
              that.setData({
                showView: true,
                showView1: true,
                showView5: false,
                showView6: true,
                showView2: false,
                id: res.data[0].id,
                items: res.data.record,
                p1: res.data.theme.p1,
                p2: res.data.theme.p2,
                p3: res.data.theme.p3,
                color: res.data.theme.color,
                bgcolor: res.data.theme.bgcolor,
                headimgurl: res.data[0].headimgurl,
                nickname: res.data[0].nickname,
                wishes_world: res.data[0].words,
                money: res.data.my,
                much: res.data[0].money,
                no: res.data[0].no,
                totle: res.data[0].num,
              })
              //console.log(that.data.showView2)
            } else {
              that.setData({
                showView: true,
                showView1: true,
                showView5: true,
                showView6: false,
                showView2: false,
                id: res.data[0].id,
                items: res.data.record,
                p1: res.data.theme.p1,
                p2: res.data.theme.p2,
                p3: res.data.theme.p3,
                color: res.data.theme.color,
                bgcolor: res.data.theme.bgcolor,
                headimgurl: res.data[0].headimgurl,
                nickname: res.data[0].nickname,
                wishes_world: res.data[0].words,
                money: res.data.my,
                much: res.data[0].money,
                no: res.data[0].no,
                totle: res.data[0].num,
              })
            }
          }
    
        }else{

          if (res.data.my > 0){   
            if (res.data[0].type==1){
              that.data.showView = true;
              that.data.showView1 = false;
              that.data.showView5 = false;
              that.data.showView6 = true;
              that.setData({
                showView: true,
                showView1: false,
                showView5: false,
                showView6: true,
                id: res.data[0].id,
                items: res.data.record,
                p1: res.data.theme.p1,
                p2: res.data.theme.p2,
                p3: res.data.theme.p3,
                color: res.data.theme.color,
                bgcolor: res.data.theme.bgcolor,
                headimgurl: res.data[0].headimgurl,
                nickname: res.data[0].nickname,
                wishes_world: res.data[0].words,
                money: res.data.my,
                much: res.data[0].money,
                no: res.data[0].no,
                totle: res.data[0].num,
              })
            }else{
              that.data.showView = true;
              that.data.showView1 = false;
              that.data.showView5 = true;
              that.data.showView6 = false;
              that.setData({
                showView: true,
                showView1: false,
                showView5: true,
                showView6: false,
                id: res.data[0].id,
                items: res.data.record,
                p1: res.data.theme.p1,
                p2: res.data.theme.p2,
                p3: res.data.theme.p3,
                color: res.data.theme.color,
                bgcolor: res.data.theme.bgcolor,
                headimgurl: res.data[0].headimgurl,
                nickname: res.data[0].nickname,
                wishes_world: res.data[0].words,
                money: res.data.my,
                much: res.data[0].money,
                no: res.data[0].no,
                totle: res.data[0].num,
              })
            }
          }else{           
            getApp().globalData.vurl = res.data[0].words
            if (res.data[0].type == 1) {
              that.data.showView = false;
              that.data.showView1 = true;
              that.data.showView5 = false;
              that.data.showView6 = true;
              that.setData({
                showView: false,
                showView1: true,
                showView5: false,
                showView6: true,
                id: res.data[0].id,
                items: res.data.record,
                p1: res.data.theme.p1,
                p2: res.data.theme.p2,
                p3: res.data.theme.p3,
                color: res.data.theme.color,
                bgcolor: res.data.theme.bgcolor,
                headimgurl: res.data[0].headimgurl,
                nickname: res.data[0].nickname,
                wishes_world: res.data[0].words,
                much: res.data[0].money,
                no: res.data[0].no,
                totle: res.data[0].num,
              })
            } else {
              that.data.showView = false;
              that.data.showView1 = true;
              that.data.showView5 = true;
              that.data.showView6 = false;
              that.setData({
                showView: false,
                showView1: true,
                showView5: true,
                showView6: false,
                id: res.data[0].id,
                items: res.data.record,
                p1: res.data.theme.p1,
                p2: res.data.theme.p2,
                p3: res.data.theme.p3,
                color: res.data.theme.color,
                bgcolor: res.data.theme.bgcolor,
                headimgurl: res.data[0].headimgurl,
                nickname: res.data[0].nickname,
                much: res.data[0].money,
                no: res.data[0].no,
                totle: res.data[0].num,
              })
            }
          }
        }
        }
    })
    
    var that = this;
    that.showAni();
    if (this.data.aniTimer == null) {
      this.data.timer = setInterval(function (obj) {
        that.showAni();
      }, 5200);
    }
  },

  //语音播放
  playVoice: function (res) {
    var that = this
    that.setData({
      showView3: true,
      showView4: false
    })
    wx.playBackgroundAudio({
      dataUrl: getApp().globalData.vurl,
      success: function (res) {
        wx.pauseBackgroundAudio()
      },
    })
  },

  turnCoin: function () {
    var that = this
    wx.request({
      url: 'https://www.mqtp8.cn/wishis/pay/getMoney', //余额接口
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      data: {//这里写你要请求的参数
        openId: getApp().globalData.openId,
        hid: getApp().globalData.qid,
      },
      success: function (res) {      
        console.log(res)
        that.setData({
          money: res.data.money,
        })
        wx.request({
          url: 'https://www.mqtp8.cn/wishis/pay/hongBao', //红包接口
          method: 'POST',
          header: {
            'Content-Type': 'application/json'
          },
          data: {//这里写你要请求的参数
            id: getApp().globalData.qid,
            openId: getApp().globalData.openid,
          },
          success: function (res) {
            console.log(res)
            that.setData({
              items: res.data.record,
              no: res.data[0].no,
            })
          }
        })
      }
    })
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: "linear",
    })

    this.animation = animation

    this.animation.translateY(-200).rotateY(1440).scale(2, 2).opacity(0).step()
    this.setData({
      animationData: animation.export(), 
      showView1: false,
    })   
  },

  showAni: function () {
    //console.log("showAni");

    var height = wx.getSystemInfoSync().windowHeight;
    var animation1 = wx.createAnimation({
      timingFunction: "linear",
    })

    //图1
    animation1.translateY(height * 2).step({ duration: 10000 });
    animation1.translateY(0).step({ duration: 0 });

    if (this.data.currentAni == 1) {
      this.setData({
        animationDataA1: animation1.export()
      })
    } else {
      this.setData({
        animationDataB1: animation1.export()
      })
    }

    //图2
    var animation2 = wx.createAnimation({
      timingFunction: "linear",
    })

    animation2.translateY(height * 2).step({ duration: 8000 });
    animation2.translateY(0).step({ duration: 0 });

    if (this.data.currentAni == 1) {
      this.setData({
        animationDataA2: animation2.export()
      })
    } else {
      this.setData({
        animationDataB2: animation2.export()
      })
    }

    var i = 1;
    if (this.data.currentAni == 1) {
      i = 2;
    } else {
      i = 1;
    }
    this.setData({
      currentAni: i
    })
  }
})


//麦克风帧动画 
function speaking() {
  var _this = this;
  //话筒帧动画 
  var i = 1;
  this.timer = setInterval(function () {
    i++;
    i = i % 5;
    _this.setData({
      j: i
    })
  }, 200);
}