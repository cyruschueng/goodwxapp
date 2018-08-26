//获取应用实例
const app = getApp()

Page({
  data: {
    countdownnum: 3,
    animationData: {}
  },
  onLoad: function (option) {
    wx.showShareMenu({
      withShareTicket: true
    })
    // const _this = this
    let animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear'
    })
    animation.scale(0, 0).opacity(0).step()
    let _num = this.data.countdownnum
    let _text = _num
    const _countdown = setInterval(function () {
      _num--;
      _text = _num
      if (_num <= 0) {
        _text = "READY GO!"
        clearInterval(_countdown)
        this.setData({
          animationData: animation.export()
        })
      }
      this.setData({
        countdownnum: _text
      })
      console.log(this.data.countdownnum)
    }.bind(this), 1000);
  },
  countdownRemove: obj => {
    wx.request({
      url: 'https://yfxqngx.wdcloud.cc/wdcloud-cms/wdcms/portalzone/searchZoneColumnContent',
      method: 'POST', 
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        rowkey: '1100000000000000143',
        appid: 'apptenant100000000',
        businessid: '000000'
      },
      success: function (res) {
        console.group("request");
        console.log(res);
        console.groupEnd();
      }
    })
  },
  onShareAppMessage: option => {
    return {
      title: '喵~快快来给主子铲屎来···',
      imageUrl: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eq038LY83UibkF3dx28FCTMzZsDRsy06fHf9xJrcBw3M6MbVo2b7ibHJJnSu00tEOEG42q6e7hK8syQ/0',
      path: '/pages/home/home?id=123',
      success: function (res) {
        // 转发成功
        console.group("转发成功")
        console.log(res)
        console.groupEnd()
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: res => {
            console.group("转发getShareInfo成功")
            console.log(res)
            console.groupEnd()
          }
        });
      },
      fail: function (res) {
        console.log("转发失败")
        // 转发失败
      }
    }
  }
})