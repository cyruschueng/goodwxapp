// pages/index/audio.js
Page({

  /**
   * 页面的初始数据
   */

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady:function(e){
    //使用wx.createAudioCoontext获取audio上下文context
    /*this.audioCtx=wx.createAudioContext('myAudio')
    this.audioCtx.setSrc('../../images/music1.mp3')
    this.audioCtx.play()*/
    this.innerAudioContext=wx.createInnerAudioContext('myaudio')
    this.innerAudioContext.autoplay=true
    this.innerAudioContext.src='../../images/music1.mp3'
  },
  data: {
  src:""
  },
  //自定义函数，bindtap绑定
  audioPlay:function(){
    this.innerAudioContext.play()
    this.innerAudioContext.onPlay(()=>{
      console.log('开始播放')
    })
    this.innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  audioPause:function(){
    this.innerAudioContext.pause()
  },
  audio14:function(){
    this.innerAudioContext.seek(14)
  },
  audioStart:function(){
    this.innerAudioContext.seek(0)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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
  onShareAppMessage: function () {
  
  }
})