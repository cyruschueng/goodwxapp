// pages/index/video.js
function getRandomColor(){
  let rgb=[]
  for(let i=0;i<3;i++){
    let color=Math.floor(Math.random()*256).toString(16)
    color=color.length==1?'0'+color:color
    rgb.push(color)
  }
  return '#'+rgb.join('')
}
Page({
   bindButtonTap:function(){
     var that=this
     wx.chooseVideo({
       sourceType:['album','camera'],
       compressed:true,
       maxDuration:60,
       camera: 'back',//在部分 Android 手机下由于系统 ROM 不支持无法生效
       success:function(res){
         console.log(res.duration)
         console.log(res.size)
         that.setData({
           src:res.tempFilePath
         })
         wx.saveVideoToPhotosAlbum({
           filePath: res.tempFilePath,
           success:function(res){
             console.log(res)
           }
         })
       }
     })

   },
  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log('ids+',options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (res) {
  this.videoContext=wx.createVideoContext('myVideo')
  },
  inputValue:'',
  bindInputBlur:function(e){
  this.inputValue=e.detail.value
  },
  bindSendDanmu:function(){
    this.videoContext.sendDanmu({
      text:this.inputValue,
      color:getRandomColor()
    })
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