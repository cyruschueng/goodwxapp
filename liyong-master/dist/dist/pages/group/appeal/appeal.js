const regeneratorRuntime = require('../../../lib/regenerator-runtime')

const upyunUpload = require('../../../lib/upyun-upload')
const { appealGroup } = require('../../../api/group')
const { alert, alertError } = require('../../../utils')

Page({
  data: {
    id: '',
    openGId: '',
    filePath: ''
  },

  onLoad (options) {
    const { id, openGId } = options
    this.setData({ id, openGId })
  },

  // events
  imageSelected (event) {
    const { filePath } = event.detail
    this.setData({
      filePath
    })
  },

  async submit () {
    const { id, filePath } = this.data
    // valid
    if (!filePath) return alert('请添加照片')

    try {
      wx.showLoading()
      // upload to upyun
      const name = /\/([^\/]*)\.([^\.]*)$/.exec(filePath)[1]
      const { statusCode, errMsg, data } = await upyunUpload({
        localPath: filePath,
        remoteFolder: `/community/${id}`,
        fileName: `complaint_${name}`
      })
      console.log(statusCode, errMsg, data)
      if (statusCode !== 200) { // error
        wx.hideLoading()
        return alert('图片上传失败')
      }
      const { url } = JSON.parse(data)
      const res = await appealGroup({
        id,
        qrcode: url
      })
      wx.showToast({ title: '提交成功', icon: 'success' })
      wx.navigateBack()

    } catch (err) {
      wx.hideLoading()
      alertError(err)
    }
  }

})
