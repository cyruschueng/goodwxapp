import regeneratorRuntime from '../../../lib/regenerator-runtime'
import promisify from '../../../lib/promisify'
import {
  getCurrentGroup, getMineOtherGroups, cancelGroup,
  promoteGroup, cancelPromoteGroup, getGroupShare
} from '../../../api/group'
import {
  navigateErrorPage, alertError,
  confirm, alert,
  defaultShareAppMessage, handlerAuthFail
} from '../../../utils'
import upyunUpload from '../../../lib/upyun-upload'

import { connect } from '../../../lib/wechat-weapp-redux'
import { clearError } from '../../../store/actions/loader'


const mapStateToData = (state, options) => {
  return {
    isFetching: state.loader.isFetching,
    displayError: state.loader.displayError,

    shareTicket: state.global.shareTicket
  }
}

const mapDispatchToPage = dispatch => ({
  clearError: _ => dispatch(clearError())
})

const pageConfig = {
  data: {
    showModal: false,
    currentGroup: null,
    otherGroups: [],
    totalCoin: 0,
    qrcodeMap: {}, // id => imageURL
    currentQrcode: null,
  },

  async onLoad () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  onShareAppMessage: defaultShareAppMessage,

  onShow () {
    this.setData({qrcodeMap:{}})
    this.init()
  },

  // methods
  async init () {
    wx.showNavigationBarLoading()
    const { shareTicket } = this.data
    if (!shareTicket) return

    try {
      const { encryptedData, iv } = await promisify(wx.getShareInfo)({ shareTicket })
      const [currentGroup, otherGroups] = await Promise.all([
        getCurrentGroup({ encryptedData, iv }),
        getMineOtherGroups(),
      ])
      this.setData({ currentGroup, otherGroups })
    } catch (err) {
      navigateErrorPage(err)
    } finally {
      wx.hideNavigationBarLoading()
    }
  },

  // events
  tapClaim (event) {
    // valid
    const { currentGroup } = this.data
    if (currentGroup.canCommunityNum <= 0) {
      return alert('已达到认领数量上限')
    }

    const { openGId } = event.target.dataset
    const { id } = event.target
    wx.navigateTo({
      url: `/pages/group/claimOrUpdate/claimOrUpdate?view=claim&id=${id}&openGId=${openGId}`
    })
  },

  tapUpdate (event) {
    const { openGId } = event.target.dataset
    const { id } = event.target
    wx.navigateTo({
      url: `/pages/group/claimOrUpdate/claimOrUpdate?view=update&id=${id}&openGId=${openGId}`
    })
  },

  tapAppeal (event) {
    // valid
    const { currentGroup } = this.data
    if (currentGroup.canCommunityNum <= 0) {
      return alert('已达到认领数量上限')
    }

    const { openGId } = event.target.dataset
    const { id } = event.target
    wx.navigateTo({
      url: `/pages/group/appeal/appeal?id=${id}&openGId=${openGId}`
    })
  },

  async tapCancel (event) {
    const { id } = event.target
    const cancel = await confirm('取消认领该群？')
    if (cancel) {
      try {
        wx.showLoading()
        await cancelGroup({ id })
        // local remove
        let { otherGroups } = this.data
        otherGroups = otherGroups.filter(group => {
          return group.communityId != id
        })
        this.setData({ otherGroups })
        // request again
        await this.init()
      } catch (err) {
        alertError(err)
      } finally {
        wx.hideLoading()
      }
    }
  },

  async tapPromote (event) {
    const { id } = event.target
    wx.showLoading()
    try {
      const res = await promoteGroup({ id })
      wx.showToast({ title: '成功', icon: 'success' })
      this.init()
    } catch (err) {
      wx.hideLoading()
      alertError(err)
    }
  },

  async tapCancelPromote (event) {
    const { id } = event.target
    wx.showLoading()
    try {
      const res = await cancelPromoteGroup({ id })
      wx.showToast({ title: '成功', icon: 'success' })
      this.init()
    } catch (err) {
      wx.hideLoading()
      alertError(err)
    }
  },

  async tapShare (event) {
    const { qrcodeMap } = this.data
    const { id } = event.target

    if (qrcodeMap[id])
      return this.setData({ currentQrcode: qrcodeMap[id], showModal: true })

    wx.showLoading()
    try {
      const { promotionImgUrl } = await getGroupShare({ id })
      qrcodeMap[id] = promotionImgUrl
      this.setData({ qrcodeMap, currentQrcode: qrcodeMap[id], showModal: true })
    } catch (err) {
      alertError(err)
    } finally {
      wx.hideLoading()
    }
  },

  async saveQrcode (event) {
    const itemList = ['保存图片']
    try {
      const { tapIndex } = await promisify(wx.showActionSheet)({ itemList })
      await promisify(wx.authorize)({ scope: 'scope.writePhotosAlbum' })
      // const qrcode = 'https://imgcdn.youhaodongxi.com/weapp/icon-share-396710facd.png'
      const { qrcode } = event.target.dataset

      wx.showLoading()
      const { tempFilePath: filePath } = await promisify(wx.downloadFile)({ url: qrcode })
      const res = await promisify(wx.saveImageToPhotosAlbum)({ filePath })
      wx.showToast({ title: '保存成功', icon: 'success' })
    } catch (err) {
      // actionSheet 取消
      wx.hideLoading()
      if (err.errMsg == 'authorize:fail auth deny') return handlerAuthFail()
      if (err.errMsg == 'showActionSheet:fail cancel') return
      if (err.errMsg == 'saveImageToPhotosAlbum:fail cancel') return
      alertError(err)
    }
  },

  closeModal () {
    this.setData({ showModal: false })
  },

  gotoQA () {
    const url = 'https://imgcdn.youhaodongxi.com/weapp/qa-6cc861e203.html'
    wx.navigateTo({
      url: `/pages/webView/webView?url=${url}`
    })
  },

  reload () {
    this.clearError()
    this.onLoad(this.options)
  },
  onUnload () {
    this.clearError()
  }
}

Page(
  connect(
    mapStateToData,
    mapDispatchToPage
  )(pageConfig)
)
