// pages/detail/detail.js
var network = require("../../utils/util.js")
import { index_newsList } from '../../url.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detaildata:{},
    showView:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var articleId = options.id;
    var that = this;
    network.requestLoading(index_newsList, '', '正在加载数据', function (res) {
      console.log(res)
      var detailsData = res.data[0];
      var detaildata = detailsData[articleId];
      console.log(detaildata);
      that.setData({
        detaildata:detaildata
      })

    }, function () {
      wx.showToast({
        title: '加载数据失败',
      })
    });
  },
 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '冬季恋歌',
      path: '/pages/index/index?id=123',
      success: function (res) {
        // 转发成功
        wx.showShareMenu({
          withShareTicket: true
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  /*生成分享朋友圈图片*/
  onSharetap:function(){
    var that = this;
    // that.setData({
    //   showView: (!that.data.showView)
    // });
    console.log(that.data.showView);
    var ctx = wx.createCanvasContext('myCanvas2');
    ctx.setFillStyle('red');
    ctx.fillRect(10, 10, 150, 75);
    wx.getImageInfo({
      src: 'http://is5.mzstatic.com/image/thumb/Purple128/v4/75/3b/90/753b907c-b7fb-5877-215a-759bd73691a4/source/50x50bb.jpg',
      success: function (res) {
        console.log(res.path);
        ctx.drawImage(res.path, 0, 0, 25, 25);
        ctx.draw(true);
        //生成临时文件
        wx.canvasToTempFilePath({
          canvasId: 'myCanvas2',
          success: function (res) {
            console.log(res.tempFilePath);
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success(res) {
                wx.showToast({
                  title: '图片保存成功',
                  icon: 'success',
                  duration: 2000
                });
                console.log("图片保存成功");
              },
              fail(res) {
                wx.showToast({
                  title: '图片保存失败',
                  icon: 'fail',
                  duration: 2000
                });
                console.log("图片保存失败");
              }
            })
          }
        })
      }
    });
    // wx.downloadFile({
    //   url: 'http://is5.mzstatic.com/image/thumb/Purple128/v4/75/3b/90/753b907c-b7fb-5877-215a-759bd73691a4/source/50x50bb.jpg',
    //   success: function (res) {
    //     ctx.drawImage(res.tempFilePath, 25, 25);
        
    //   }
    // })
    
    
    
    
  }
})