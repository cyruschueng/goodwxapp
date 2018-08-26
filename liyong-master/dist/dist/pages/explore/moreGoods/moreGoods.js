import { connect } from '../../../lib/wechat-weapp-redux'
import { clearError } from '../../../store/actions/loader'
import { alertError } from '../../../utils'
import { specialtopicdetail } from '../../../api/homePage'
import regeneratorRuntime from '../../../lib/regenerator-runtime'


const mapStateToData = (state, options) => {
  return {
    isFetching: state.loader.isFetching,
    displayError: state.loader.displayError,
    id: state.global.group && state.global.group.id,
    provinceId: state.global.location.province.id,
    location: state.global.location
  }
}

const mapDispatchToPage = dispatch => ({
  clearError: _ => dispatch(clearError())

})

const pageConfig = {
  data:{
    page: 1,
    limit: 10,
    completed: false,
    goodsList: []
  },

  async onLoad (options) {
    const { id } = this.data
    const { specialTopicId } = options
    console.log(specialTopicId)
    this.setData({
      specialTopicId
    })
    try{
      wx.showLoading()
      const { headerContent, merchandiseContent } = await specialtopicdetail({ id, cityId: this.data.location.city.id, provinceId: this.data.location.province.id, specialTopicId })
      this.setData({
        headerContent,
        merchandiseContent
      })
      const { content } = headerContent[0]
      console.log(content)
    } catch(err) {
      alertError(err)
    } finally {
      wx.hideLoading()
    }
  },
  moreThings () {
    wx.navigateTo({
      url:'/pages/explore/selection/selection'
    })
  },
  gotoMerchShow (event) {
    console.log("商品详情页")
    const { id } = event.currentTarget.dataset
    wx.navigateTo({ url: `/pages/group/merchShow/merchShow?id=${id}` })
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
