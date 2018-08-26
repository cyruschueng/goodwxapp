const App = getApp()

Page({
  data: {
    isCreate: 1,
    hasCanvas: 0,
    count: '2222',
    order: [
      'https://onb3ey4ll.qnssl.com/o_1bjresq5oroo1c5p13tfacr1s329.jpg', 
      'https://onb3ey4ll.qnssl.com/o_1bjrefo4u1ele1uk61d2h1dbr1u2l9.jpg', 
      'https://onb3ey4ll.qnssl.com/o_1bjrem16t10i8cnh1sg1if71qo39.jpg', 
      'https://onb3ey4ll.qnssl.com/o_1bjresq5oroo1c5p13tfacr1s329.jpg', 
      'https://onb3ey4ll.qnssl.com/o_1bjreqpd61os567j1ec01qec1c8a9.jpg', 
      'https://onb3ey4ll.qnssl.com/o_1bjresq5oroo1c5p13tfacr1s329.jpg', 
      'https://onb3ey4ll.qnssl.com/o_1bjresq5oroo1c5p13tfacr1s329.jpg', 
      'https://onb3ey4ll.qnssl.com/o_1bjresq5oroo1c5p13tfacr1s329.jpg'
    ],
    Content:[
      '将文字简单将文字简单将文字简1',
      '将文字简单将文字简单将文字简2',
      '将文字简单将文字简单将文字简3',
      '将文字简单将文字简单将文字简4',
      '将文字简单将文字简单将文字简5',
      '将文字简单将文字简单将文字简6',
      '将文字简单将文字简单将文字简7',
      '将文字简单将文字简单将文字简8',
    ],  
    bgWishes: 'https://onb3ey4ll.qnssl.com/o_1bjresq5oroo1c5p13tfacr1s329.jpg', 
    wishesContent: '将文字简单将文字简单将文字简单将文字简单分行，每十六个字符为一将文字简单分行，每十六个字符为一',
    lowerUrl: '../../../assets/images/index-header@1x.png',
  },    
  onLoad(option) {
    this.setData({
      id: option.id,
    })
    this.getUserInfo()  
  },
  navigateTo(e) {
    App.WxService.navigateTo('/pages/test/index', {
        id: e.currentTarget.dataset.id
    })
  },
  bgChange(e) {
    const id = e.currentTarget.dataset.id
    this.setData({
      bgWishes: this.data.order[id],
      wishesContent: this.data.Content[id],
    })
  },
  loadResources() {
    var _this = this
    const [{ bgWishes }, avatarUrl] = [_this.data, _this.data.userInfo.avatarUrl]
    console.log(bgWishes)
    const downloadFile = (url) => {
      return new Promise((fulfill, reject) => {
        wx.downloadFile({
          url,
          success({
              tempFilePath
            }) {
              fulfill(tempFilePath)
            },
            fail() {
              reject(`获取图片失败:${src}`)
            }
        })
      })
    }
    let promises = [downloadFile(bgWishes
    ), downloadFile(avatarUrl)]
    return Promise.all(promises).then(values => {
      return {
        bgWishes: values[0],
        avatarUrl: values[1],
      }
    })    
  },
  syntheisis() {
    var _this = this
    _this.loadResources()
    .then(res => {
      const resources = res
      App.WxService.showLoading({
        title: '正在生成图片',
        mask: true,
      })
      _this.setData({
        hasCanvas: 1,
      }) 
      _this.drawImage({resources})
      setTimeout(function () {
        App.WxService.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 300,
          height: 495,
          destWidth: 300,
          destHeight: 495,
          canvasId: 'myCanvas', 
        })
        .then(res => {
          App.WxService.hideLoading()
          _this.setData({
            isCreate: 0,
            hasCanvas: 0,
            tempFilePath: res.tempFilePath,
          }) 
        }) 
      }, 3000)
    })
  },
  keepImage() {
    App.WxService.showLoading({
      title: '保存中',
      mask: true,
    })
    App.WxService.saveImageToPhotosAlbum({
      filePath: this.data.tempFilePath,
    })
    .then(res => {
      App.WxService.hideLoading()
    })
    .catch(res => {
      App.WxService.hideLoading()
    })
  },
  drawImage({resources}) {
    const ctx = wx.createCanvasContext('myCanvas')
    const [{ bgWishes, avatarUrl }, nickName, { count, wishesContent, lowerUrl }] = [ resources, this.data.userInfo.nickName, this.data]
    const [CANVAS_W, CANVAS_H] = [300, 375]
    // draw background
    ctx.drawImage(bgWishes, 0, 0, CANVAS_W, CANVAS_H)
    // draw wishes content
    const getWishBlocks = (content = '') => {
      let result = []
      if (typeof content === 'string') {
        // 将文字简单分行，每十六个字符为一行
          const COUNT_PER_BLOCK = 16
          for (let offset = 0, l = content.length; offset < l;) {
            let [start, end, block] = [offset, offset + COUNT_PER_BLOCK, content.substring(start, end)]
            result.push(block)
            offset += COUNT_PER_BLOCK
          }
      }
      return result
    }
    const [WISHES_X, WISHES_Y, WISHES_LIGHT_HEIGHT] = [CANVAS_W / 2, 90, 21] 
    ctx.setTextAlign('center')
    ctx.setFontSize(15)
    let wishesContentBlocks = getWishBlocks(wishesContent)
    for (let i = 0, l = wishesContentBlocks.length; i < l; i++) {
      let [x, y] = [WISHES_X, WISHES_Y + WISHES_LIGHT_HEIGHT * i] 
      ctx.fillText(wishesContentBlocks[i], x, y)
    }
    // draw userInfo avatar
    const [AVATAR_X, AVATAR_Y, AVATAR_SIZE] = [ CANVAS_W - 5 - 53, CANVAS_H - 104 - 15, 53]
    ctx.drawImage(avatarUrl, AVATAR_X, AVATAR_Y, 53, 53)
    // draw avatar border nickname
    const [NICKNAME_X, NICKNAME_Y] = [CANVAS_W - 5, CANVAS_H - 20 - 5 - 15]
    ctx.setTextAlign('right')
    ctx.setFontSize(15)
    ctx.fillText(nickName, NICKNAME_X, NICKNAME_Y)
    // draw wishes count
    const [COUNT_X, COUNT_Y] = [NICKNAME_X, CANVAS_H - 15]
    ctx.setTextAlign('right')
    ctx.setFontSize(13)
    ctx.fillText(`已有${count}位好友帮他赚车`, COUNT_X, COUNT_Y)   
    // draw background-lower
    const [LOWER_W, LOWER_H] = [300, 120]
    ctx.drawImage(lowerUrl, 0, 375, LOWER_W, LOWER_H)
    ctx.draw()
    return ctx
  },
  // navigateTo(e) {
  //   App.WxService.navigateTo('/pages/make/custom/index', {
  //     id: e.currentTarget.dataset.id
  //   })
  // },
  getUserInfo() {
    const userInfo = App.globalData.userInfo
    if (userInfo) {
      this.setData({
        userInfo: userInfo
      })
      return
    }
    App.getUserInfo()
    .then(data => {
      this.setData({
        userInfo: data
      })
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.data.title,
      imageUrl: '/assets/images/home.png',
      path: 'pages/make/share/index',
      success: function (res) {
        // 转发成功
        //console.log(res)
        wx.getShareInfo({
          success: function (res) {
            //console.log(res)
          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})