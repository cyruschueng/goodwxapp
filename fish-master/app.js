const
  constants = require('./config/constants'),
  UserIO = require('./io/User')

App({
  onLaunch: function(ops) {
    let that = this

    // 引入 BaaS SDK
    require('./lib/sdk-v1.1.3')

    // 从 BaaS 后台获取 ClientID
    let clientId = constants.CLIENT_ID

    wx.BaaS.init(clientId)

    let userId = this.getUserId()
    if (!userId) {
      wx.BaaS.login()
        .then(res => {
          console.log('BaaS is logined!')
          let uid = wx.BaaS.storage.get('userinfo').id
          UserIO.getUser({uid})
            .then(res => {
              console.log('user', res)
              // 将用户添加入 User table
              if (!res.data.objects.length) UserIO.addUser()
            })
            .catch(e => {})

        }).catch(err => {
          console.dir(err)
        })
    }

    // 判断用户从哪个群组进入页面
    if(ops.scene == 1044){
      let shareTicket = ops.shareTicket
      wx.getShareInfo({
        shareTicket,
          complete(res){

            wx.BaaS.wxDecryptData(res.encryptedData, res.iv, 'open-gid').then(decrytedData => {
              console.log('decrytedData', decrytedData)
              that.globalData.gid = decrytedData.openGId
            })
          }
      })
    }
    // this.getSystemInfo()
  },

  getUserId() {
    if (this.userId) {
      return this.userId
    }

    this.userId = wx.BaaS.storage.get('uid')
    return this.userId
  },

  getSystemInfo() {
    wx.getSystemInfo({
      success(res) {
        this.systemInfo = res
      }
    })
  },

  globalData: {
    systemInfo: {},
    gid: '',
  }
})
