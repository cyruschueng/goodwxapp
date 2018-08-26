//app.js
App({
  onLaunch: function () {
      this.globalData.system_info = wx.getSystemInfoSync()
      this.globalData.user = wx.getStorageSync('user')
  },
  onHide:function () {
    var alpclipboard = wx.getStorageSync('alpclipboard');
    if (wx.setClipboardData && alpclipboard) {
      wx.setClipboardData({
        data: alpclipboard,
        success: function(re) {
        }
      })
    }
  },
  globalData:{
      user:null,
      system_info:null
  },
    config:{
        sex:[
            {
                value: 0,
                name: '男',
                checked:true
            },
            {
                value: 1,
                name: '女'
            }
        ],
        pianhao1:[
            {
                value: 1,
                name: '单字名'
            },
            {
                value: 2,
                name: '双字名',
                checked:true
            }
        ],
        lifa:[
            {
                value: 0,
                name: '公历',
                checked:true
            },
            {
                value: 1,
                name: '农历'
            }
        ],pianhao2: [
            {
                value: 0,
                name: '智能起名'
            },
            {
                value: 1,
                name: '固定首字'
            },
            {
                value: 2,
                name: '固定尾字'
            },
            {
                value: 3,
                name: '诗经楚辞起名'
            }
        ]
    }
})