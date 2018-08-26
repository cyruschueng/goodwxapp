import regeneratorRuntime from '../../../lib/regenerator-runtime'
import { connect } from '../../../lib/wechat-weapp-redux'
import { fetchOrder, postShareOrder } from '../../../store/actions/mine'
import { alertError } from '../../../utils'
import upyunUpload from '../../../lib/upyun-upload'


const mapStateToData = (state, options) => {
  const { orderId } = options
  return {
    order: state.orders.map[orderId]
  }
}

const mapDispatchToPage = dispatch => ({
  postShareOrder: obj => dispatch(postShareOrder(obj)),
  fetchOrder: id => dispatch(fetchOrder(id))
})

const pageConfig = {
  data: {
    stars: 5,
    starsMap: ['极不满意', '不满意', '一般', '较满意', '满意'],
    imagePaths: [],
  },

  async onLoad (options) {
    const { orderId, expressId, merchId } = options
    // TODO: display merch poster
    await this.fetchOrder(orderId)
  },

  chooseStars (event) {
    const { stars } = event.target.dataset
    this.setData({ stars })
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
    // valid
    const { description } = event.detail.value
    if (!description.trim()) {
      alertError('请输入评价内容')
    }
    const { imagePaths } = this.data
    if (imagePaths.length <= 0) {
      alertError('请至少上传一张照片')
    }

    // upload
    const { stars } = this.data
    const { orderId, merchId, expressId } = this.options
    try {
      wx.showLoading()
      const results = await Promise.all(imagePaths.map(imagePath => upyunUpload({
        localPath: imagePath,
        remoteFolder: `/shareOrder/${orderId}/${merchId}/${expressId}`
      })))
      const images = results.map(({ data }) => {
        const { url } = JSON.parse(data)
        return url
      })
      const res = await this.postShareOrder({ orderId, merchId, expressId, description, stars, images })
    } catch (error) {
      alertError(error)
    } finally {
      wx.hideLoading()
    }
  }
}

Page(
  connect(
    mapStateToData,
    mapDispatchToPage
  )(pageConfig)
)

