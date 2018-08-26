import { connect } from '../../../lib/wechat-weapp-redux'
import { clearError } from '../../../store/actions/loader'
import { alertError } from '../../../utils'
import { updateinfo } from '../../../api/homePage'
import upyunUpload from '../../../lib/upyun-upload'
import regeneratorRuntime from '../../../lib/regenerator-runtime'


const mapStateToData = (state, options) => {
  return {
    isFetching: state.loader.isFetching,
    displayError: state.loader.displayError,
  }
}

const mapDispatchToPage = dispatch => ({
  clearError: _ => dispatch(clearError())

})

const pageConfig = {
  data:{
    filePath: ''
  },

  async onLoad (options) {
    const { avatar, nickname } = options
    this.setData({
      nickname,
      avatar
    })
  },

  imageSelected (event) {
    const { imagePaths } = this.data
    const { filePath } = event.detail
  },
  async formSubmit (event) {
    console.log(event.detail.value)
    const { nickname, description } = event.detail.value
    wx.showLoading()
    try {
      const res = await updateinfo({ nickname, description, avatar: ''})
    } catch (err) {
      alertError(err)
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
