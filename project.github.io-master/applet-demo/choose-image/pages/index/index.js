//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    srcArr : [],
    showImgHideen : true
  },
  onLoad: function () {
    
  },
  getUserInfo: function(e) {
    
  },

  /**
   * 图片选取方式
   */
  showType: function(e) {
    var that = this ;
    wx.showActionSheet({
      itemList: ['拍照', '图片'],
      success: function (res) {
        var tapIndex = res.tapIndex;
        that.chooseWxImage(tapIndex);  
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  /**
   * 图片选取
   */
  chooseWxImage: function(tapIndex) {
    var type = tapIndex ? 'album' : 'camera' ,
        that = this ;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: [type], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        for (var i= 0; i < tempFilePaths.length;i++){
          that.data.srcArr.push(res.tempFilePaths[i]);          
        }        
        that.setData({
          showImgHideen: false,
          srcArr: that.data.srcArr
        });
      }
    })
  },

  /**
   *  删除图片
   */
  deleteImg:function(e){
      var dataIndex = e.currentTarget.dataset.index,
          dataArr = this.data.srcArr;
      dataArr.splice(dataIndex,1);
      this.setData({
          srcArr:dataArr
      });
  },
})
