Page({

  data: {
    images: {},
    bage:{
      "page1":"block",
      "page2": "none",
      "page3":"none"
      },
    navclass:{
      "page1":"action",
      "page2": "",
      "page3": ""
    }
      

  },
  imageLoad: function (e) {
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;    //图片的真实宽高比例
    var viewWidth = wx.getSystemInfoSync().windowWidth*0.9-20,           
      viewHeight = viewWidth / ratio;    //计算的高度值
      console.log(viewWidth)
    var image = this.data.images;
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    image[1] = {
      width: viewWidth,
      height: viewHeight
    }
    this.setData({
      images: image
    })
  },

  changepage:function(e){
    var showid=e.target.dataset.showid
      this.setData({
        bage:{
          "page1": "none",
          "page2": "none",
          "page3": "none"
        }
      })
    this.setData({
      ["bage."+showid]:"block"
    })
    

    this.setData({
      navclass: {
        "page1": "",
        "page2": "",
        "page3": ""
      }
    })
    this.setData({
      ["navclass." + showid]: "action"
    })
  },

  onShareAppMessage: function (res) {
    console.log("111")

    return {
      title: '转发', // 转发标题（默认：当前小程序名称）
      path: '/pages/game/first', // 转发路径（当前页面 path ），必须是以 / 开头的完整路径
      success(e) {
        console("1")
        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false;
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            var encryptedData = res.encryptedData;
            var iv = res.iv;
          }
        })
      },
      fail(e) {
        console("2")
        // shareAppMessage:fail cancel
        // shareAppMessage:fail(detail message) 
      },
      complete() { }
    }
  },
  onLoad(e) {
    wx.showShareMenu({
      withShareTicket: true
    })
  }, 

})