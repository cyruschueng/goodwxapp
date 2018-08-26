// 定义常量
const IMGURL = 'http://demo.icarplus.net'
const HOST = `${IMGURL}/api.php`
const [DATA, CODE, SUCCESSCODE, MESSAGE] = ['data', 'returnCode', '10000', 'returnMsg']
const M = { m: 'ApiFindCar' }

class wc {
  constructor() {
    this.host = HOST
    this.imgUrl = IMGURL
    this.data = DATA
    this.code = CODE
    this.success = SUCCESSCODE
    this.message = MESSAGE
  }

  get(data, success) {
    this.showLoading()
    wx.request({
      url: this.host,
      data: this.extend(M, data || {}),
      success: (res) => {
        // this.hideLoding()
        typeof (success) === 'function' && success(res.data)
      },
      complete: (res) => {
        console.log(res.data)
        if (res.data[this.code] === this.success || res.data[this.code] === parseInt(this.success)) {
          this.hideLoding()
        }

        // if (res.data[this.code] !== this.success && res.data[this.code] !== parseInt(this.success)) {
        //   this.showModal(res.data[this.message])
        // }
      }
    })
  }

  navigateBack(delta) {
    wx.navigateBack({
      delta: delta || 1
    })
  }

  showToast([title = '提示', icon = 'success', duration = 2000]) {
    wx.showToast({
      title,
      icon,
      duration
    })
  }

  showLoading() {
    wx.showLoading({
      title: 'loading',
      mask: true
    })
  }

  hideLoding() {
    wx.hideLoading()
  }

  showModal(content, success, showCancel, title) {
    wx.showModal({
      title: title || '提示',
      content: content || '',
      showCancel: showCancel || false,
      cancelText: '',
      cancelColor: '',
      confirmText: '',
      confirmColor: '',
      success: function (res) {
        if (!!success && res.confirm && typeof (success) === 'function') {
          success()
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }

  // 扩展json
  extend(destination, source) {
    for (let property in source) {
      destination[property] = source[property];
    }
    return destination
  }
}

export default wc