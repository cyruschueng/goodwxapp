var app = getApp()
Page({
  data: {
    show: 0,
    username: '',
    busname: '',
    memberId: '',
    imgUrls: [
      'https://lingju360.natappvip.cc/miniapp/resources/image/index/banner.png',
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 2000,
    duration: 1000,
    error:0
  },

  //
  toLogin: function () {
    app.ZZtoLogin()
  },

  onLoad: function () {


  },


  getbaseData: function () {
    this.setData({
      busname: app.globalData.busname,
      memberId: app.globalData.memberId,
      error: app.globalData.error
    })
  },

  onShow: function () {
    var that = this;

    wx.getStorage({
      key: 'busname',
      success: function (res) {
        that.setData({
          busname: res.data
        })
      },
    })

    var i = 0;

    this.setData({
      busname: app.globalData.busname
    })

    if (!(this.data.busname) || !(this.data.memberId)) {
      var timer;
      timer = setInterval(() => {

        var id = this.data.busname;

        if (!(this.data.busname) || !(this.data.memberId)) {
          this.getbaseData();
          i++
          if(i>=800){
            clearInterval(timer)
          }
          if (this.data.error) {
            clearInterval(timer)
          }


        } else {
          clearInterval(timer)
        }
        console.log(this.data)


      }, 600)
    }


    console.log(that.data)

    setTimeout(function () {
      that.setData({
        busname: app.globalData.busname
      })
    }, 1000)



    wx.getStorage({
      key: 'busname',
      success: function (res) {
        that.setData({
          busname: res.data
        })
      },
    })

    wx.getUserInfo({
      success: function (res) {

        that.setData({
          username: JSON.parse(res.rawData).nickName
        })
      }
    })

  },


  changeShow: function () {
    this.setData({
      show: !this.data.show
    })
  },
  //排队判断
  getQueueInfo: function () {

    app.commonAjax('cat/waitinfo/getQueueInfo', ['shopId', 'memberId'], {}, function (res) {
      if (res.data.data.myNumber == null) {

        wx.navigateTo({
          url: '/page/lineUp/index'
        })

      } else {
        if (res.data.data.id != null) {
          wx.setStorage({
            key: "userId",
            data: res.data.data.id,
            success: function () {
              wx.navigateTo({
                url: '/page/lineUp/lineUp2/index'
              })
            }
          })
        }
      }
    }, app)

  },


  getQuery: function (url2) {
    var strs;
    var url = url2.split('?')[1]
    var theRequest = new Object();
    if (url.indexOf("?") == -1) {
      strs = url.split("&");
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
    }
    return theRequest;
  },

  //扫一扫
  scan: function () {
    var that = this;

    wx.scanCode({
      success: (res) => {
        console.log(res.result)

        wx.navigateTo({
          url: '/page/order/miniDetail/index?id=' + res.result,
          success: () => {
          }
        })

      }
    })
  },


  //卡券
  card:()=>{
    wx.openCard({})
  }

})