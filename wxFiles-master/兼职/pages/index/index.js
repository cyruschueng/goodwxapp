//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    meunIcon:[
      { label: '跑腿', icon: '/img/icon/paotui.png', path: '' },
      { label: '兼职', icon: '/img/icon/zhiwei.png', path: '' },
      { label: '周边', icon: '/img/icon/zhoubian.png', path: '' }
    ]
  },
  navToPtjob(){
    wx.navigateTo({
      url: '/pages/ptjob/ptjob',
    })
  },
  onLoad: function () {
  
  },
  
})
