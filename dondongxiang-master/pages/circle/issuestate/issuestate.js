// pages/circle/issuestate/issuestate.js
var app = getApp();
Page({
  data: {
    FilePaths:[],
    famdesc:"",
  },
  onLoad: function (options) {
  
  },
  FamilySce:function(e){
    this.setData({
      famdesc: e.detail.value
    })
  },
  FamilyImg:function(){
    var _this = this;
    wx.chooseImage({
      count: 5,
      sizeType: ['original'],
      success: function (res) {
        var FilePaths = res.tempFilePaths;
        var picurl = [];
        for (var j = 0; j < FilePaths.length; j++) {
              wx.uploadFile({
                url: app.globalData.url +'/shop/shop/uploadShopImgs',
                filePath: FilePaths[j],
                name: 'shop_imgs[]',
                formData: {},
                success: function (res) {
                  console.log(res);
                    var rdata = JSON.parse(res.data);
                    picurl.push(rdata.data[0])
                    _this.setData({
                        FilePaths: picurl
                    })
                }
              })
        }
      }
    })
  },
  //发布动态
  setMyFamily:function (){
    var _this = this;
    wx.request({
      url: app.globalData.url +'/user/user/publishDynamics',
      method:'post',
      data: {
        user_id: app.globalData.user_id,
        content: _this.data.famdesc,
        img_url: _this.data.FilePaths,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.errcode==0){
            wx.showToast({
              title: '发布成功',
              icon: 'success',
              duration: 1000
            })
            setTimeout(function(){
              wx.reLaunch({
                url: '/pages/circle/cricle'
              })
            },800);
        }
      }
    })
  }
})