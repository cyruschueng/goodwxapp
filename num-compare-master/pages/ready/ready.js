/*即将跳转的URL地址*/
let nextUrl = '';
let utils = require('../../utils/util.js');
let timer = null;
Page({
  data: {
    readyTime: 3,
    animationReady: {},
    curr_progress: 1,
    curr_point: 0,
    readyTitle: '准备'
  },
  onLoad(options){
    /*隐藏转发按钮*/
    wx.hideShareMenu();
    console.log(options)
    if(options.progress != undefined){
      console.log(options)
      this.setData({
        curr_progress: options.progress,
        curr_point: options.score,
        readyTitle: '准备继续'
      })

      wx.getStorage({
        key: 'gameChanceCount',
        success: function (res) {
          console.log(res)
          let data = res.data;
          wx.setStorage({
            key: 'gameChanceCount',
            data: data-1,
          })
        } 
      });

      nextUrl = "/pages/game/game?progress=" + options.progress+"&score="+options.score
    }else{
      nextUrl = "/pages/game/game?progress=1&score=0"
    }
    console.log(options);
  },
  onShow: function () {
    /**动态设置时间变化 */
    timer = setInterval(function(){
      let readytime = this.data.readyTime
      readytime--;
      utils.playMedia(2)
      if (readytime == 0){
        clearInterval(timer)
        wx.redirectTo({
          url: nextUrl
        })
      }

      this.setData({
        readyTime: readytime
      })

    }.bind(this), 1000)
    
  },
  onUnload(){
    clearInterval(timer)
    console.log('卸载页面')
  }
})
