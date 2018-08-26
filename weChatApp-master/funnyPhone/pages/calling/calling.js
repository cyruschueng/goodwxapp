// pages/preview/preview.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:"",
    workInfo:"",
    tempFilePath:"",
    audioUrl:"",
    accept:false,
    timer:"00:00",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // var workInfo = JSON.parse(options.workInfo);
    // var workInfo = decodeURIComponent(options.workInfo)
    // var workInfo = JSON.parse(workInfo)
    // var workInfo = options.workInfo;
    var workInfo = {image:options.image,name:options.name}
    console.log("workInfo")
    console.log(workInfo)

    var tempFilePath = options.tempFilePath;
    // console.log(options)
    this.setData({
      workInfo:workInfo,
      tempFilePath:tempFilePath
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('myAudio')
    this.audioCtx.play()
  },

   onShow: function (options) {
    console.log("options")
    console.log(options)
  },
  receptCall(){
    var that = this;
    that.setData({
      accept:true
    })

    var number = 0;
    that.callingTimer = setInterval(function(){
        number++;
        console.log(number)
        var time;
        var minute = Math.floor(number/60);
        var second = number%60;
        console.log(second)
        if(second<10){
          time = "0"+minute+":"+"0"+second;
          that.setData({
            timer:time
          })
          console.log(time)
        }else if(second>=10){
          time = "0"+minute+":"+second;
          that.setData({
            timer:time
          })
        }
    },1000)

    this.audioCtx.pause();
    console.log("audioUrlaudioUrl")
    console.log(that.data.tempFilePath)
    this.audioCtx.setSrc(that.data.tempFilePath)
    this.audioCtx.play();
  },
  rejectCall(){
    clearInterval(this.callingTimer);
    wx.redirectTo({
      url: '../produce/produce'
    })
  },
  timer(){
    var number = 0;
    this.timer = setInterval(function(){
        number++;
        console.log(number)
        var time;
        var minute = Math.floor(number/60);
        var second = number%60;
        console.log(second)
        if(second<10){
          time = "0"+minute+":"+"0"+second;
          that.setData({
            timer:time
          })
          console.log(time)
        }else if(second>=10){
          time = "0"+minute+":"+second;
          that.setData({
            timer:time
          })
        }
    },1000)
  }
})