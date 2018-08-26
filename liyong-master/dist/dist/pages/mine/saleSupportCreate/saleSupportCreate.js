import regeneratorRuntime from '../../../lib/regenerator-runtime'
import { connect } from '../../../lib/wechat-weapp-redux'
import { fetching, fetchend, clearError } from '../../../store/actions/loader'
import { postSaleSupport } from '../../../store/actions/mine'
import { fetchSaleSupportReasonList } from '../../../store/actions/global'
import { alertError } from '../../../utils'
import upyunUpload from '../../../lib/upyun-upload'

const mapStateToData = (state, options) => {
  return {
    isFetching: state.loader.isFetching,
    displayError: state.loader.displayError,

    reasonList: state.global.saleSupportReasonList
  }
}

const mapDispatchToPage = dispatch => ({
  fetching: _ => dispatch(fetching()),
  fetchend: _ => dispatch(fetchend()),
  clearError: _ => dispatch(clearError()),

  fetchSaleSupportReasonList: _ => dispatch(fetchSaleSupportReasonList()),
  postSaleSupport: obj => dispatch(postSaleSupport(obj))
})

const pageConfig = {
  data: {
    imagePaths: [],
    displayReason: null
  },

  async onShow (options) {
    this.fetching()
    await this.fetchSaleSupportReasonList()
    this.fetchend()
  },

  reasonChange (event) {
    const { reasonList } = this.data
    const index = event.detail.value
    this.setData({ displayReason: reasonList[index].title })
  },

  imageSelected (event) {
    const { imagePaths } = this.data
    const { filePaths } = event.detail
    this.setData({ imagePaths: [...imagePaths, ...filePaths] })
  },

  removeImage (event) {
    const { index } = event.target.dataset
    const { imagePaths } = this.data
    imagePaths.splice(index, 1)
    this.setData({ imagePaths })
  },

  async submit (event) {
    // serviceReason
    const { suborderId } = this.options
    const { reasonList, imagePaths } = this.data
    const { quantity: damageCount, tel: phone, reason: reasonIndex, description: reasonDesc } = event.detail.value
    const serviceReason = reasonList[reasonIndex].serviceReason

    // valid
    // @TODO

    // upload
    try {
      wx.showLoading()
      const results = await Promise.all(imagePaths.map(imagePath => upyunUpload({
        localPath: imagePath,
        remoteFolder: `/saleSupport/${suborderId}/`
      })))
      const imageList = results.map(({ data }) => {
        const { url } = JSON.parse(data)
        return url
      }).join(',')
      // post
      const isSuccess = this.postSaleSupport({ suborderId, damageCount, phone, serviceReason, reasonDesc, imageList })
      if (isSuccess) wx.navigateBack()
    } catch (error) {
      alertError(error)
    } finally {
      wx.hideLoading()
    }

  },

  reload () {
    this.clearError()
    this.onShow(this.options)
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
