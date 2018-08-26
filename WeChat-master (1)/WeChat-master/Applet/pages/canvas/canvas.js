// pages/canvas/canvas.js
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
    const ctx = wx.createCanvasContext('myCanvas');
    ctx.setFillStyle('blue');
      ctx.fillRect(0,0,375,300);


      ctx.setFillStyle('pink');
      ctx.setFontSize('20');
      ctx.setTextAlign('center');
      ctx.fillText('Hello', 100, 280)
      ctx.setFillStyle('yellow');
      ctx.fillText('World', 300, 280)
      //上传图片
      /*wx.chooseImage({
          success: function(res){
              console.log(res);
              ctx.drawImage(res.tempFilePaths[0], 0, 0, 150, 100)
              ctx.draw()
          }
      })*/
      //这个tempFilePaths应该是后端传过来的图片，可以封装为函数，tempFilePaths作为参数传过来，参数获取到之后再调用绘制canvas;
      // ctx.drawImage('http://tmp/wx201070c15385a377.o6zAJs8K071VheWTO07zzHgnG5a8.bc39ad4615333a21cdeea841aeb8ada2.jpg', 100, 40, 150, 100)
      ctx.drawImage('http://pic1.58cdn.com.cn/nowater/wxacode/n_v23d1a07a5418348d5af4a84db0aec552c.jpg', 90, 40, 215, 215)
      ctx.draw()
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
  
  },
    saveImage:function () {
        console.log(222);
        wx.canvasToTempFilePath({
            x:0,
            y:0,
            canvasId:'myCanvas',
            success:function (res) {
                console.log('success');
                console.log(res);
                //成功之后保存到本地
                wx.saveImageToPhotosAlbum({
                    filePath:res.tempFilePath,
                    success:function (result) {
                        console.log('保存成功',result);
                        wx.showToast({
                            title:'保存成功',
                            icon:'success',
                            duration:2000
                        });
                    },
                    fail:function (result) {
                        console.log('fail',result);
                    },
                    complete:function (result) {
                        console.log('complete',result);
                    }
                });
            },
            fail:function (res) {
                console.log('fail');
                console.log(res);
            },
            complete:function (res) {
                console.log('complete');
                console.log(res);
            }
        });
    }
})