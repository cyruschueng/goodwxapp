const regeneratorRuntime = require('../../../lib/regenerator-runtime')

const upyunUpload = require('../../../lib/upyun-upload')
const { claimGroup, getGroup, updateGroup } = require('../../../api/group')
const { navigateErrorPage, alertError, alert, pushLog } = require('../../../utils')

Page({
  data: {
    view: '',
    id: '',
    openGId: '',
    remark: '',
    showUpload: true,
    filePath: '',
  },

  async onLoad (options) {
    const { view, id = '', openGId = '' } = options
    this.setData({ view, id, openGId })

    // get group info
    if (view == 'update') {
      wx.setNavigationBarTitle({ title: '更新' })
      wx.showNavigationBarLoading()
      try {
        const { communityRemark: remark, communityType, qrcodeUrl: filePath } = await getGroup({ id })
        this.setData({ remark, filePath, showUpload: communityType == 0 })

      } catch (err) {
        navigateErrorPage(err)
      } finally {
        wx.hideNavigationBarLoading()
      }
    }

  },

  remarkBlur (event) {
    const { detail: { value: remark }} = event
    this.setData({ remark })
  },

  // events
  imageSelected (event) {
    const { filePath } = event.detail
    this.setData({
      filePath
    })
  },
  switchUploadQrcode (event) {
    const showUpload = event.detail.value
    this.setData({ showUpload })
  },

  async submit (event) {
    const { formId } = event.detail
    // valid remark and (filePath or showUpload)
    const { view, id, openGId, remark, filePath, showUpload } = this.data
    let url = ''
    if(!remark.trim()) {
      return alert('请输入群备注')
    }
    if (!filePath && showUpload) {
      return alert('请上传群二维码 或 选择不设置')
    }

    wx.showLoading()
    try {
      // upload image to upyun
      const isURL = filePath.startsWith('https')
      if (isURL) {
        url = filePath
      } else if (filePath && showUpload) {
        const { statusCode, errMsg, data } = await upyunUpload({
          localPath: filePath,
          remoteFolder: `/community/${id}`,
          fileName: 'qr'
        })
        if (statusCode !== 200) { // error
          wx.hideLoading()
          pushLog({
            method: 'upyunUpload',
            msg: JSON.stringify({ statusCode, errMsg, data }),
            level: 'ERROR'
          })
          return alert('图片上传失败')
        }
        const obj = JSON.parse(data)
        url = obj.url
      }

      // request api => claim or update
      // claim
      if (view == 'claim') {
        await claimGroup({
          formId,
          id,
          openGId,
          remark,
          setQrcode: showUpload,
          qrcode: url
        })
      } else { // update
        await updateGroup({
          formId,
          id,
          remark,
          setQrcode: showUpload,
          qrcode: url
        })
      }

      wx.showToast({
        title: '保存成功',
        icon: 'success',
      })

      if (view == 'claim') {
        return wx.reLaunch({ url: '/pages/index/index' })
      }

      setTimeout(function () {
        wx.navigateBack()
      }, 300)

    } catch (err) {
      wx.hideLoading()
      pushLog({
        method: 'submit catch',
        msg: JSON.stringify(err),
        level: 'ERROR'
      })
      alertError(err)
    }
  }
})
