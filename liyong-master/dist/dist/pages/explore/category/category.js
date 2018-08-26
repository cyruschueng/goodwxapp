import { connect } from '../../../lib/wechat-weapp-redux'
import { clearError } from '../../../store/actions/loader'
import { alertError } from '../../../utils'
import { categorymerchandise } from '../../../api/homePage'
import regeneratorRuntime from '../../../lib/regenerator-runtime'

const mapStateToData = (state, options) => {
  return {
    isFetching: state.loader.isFetching,
    displayError: state.loader.displayError,
    id: state.global.group && state.global.group.id,
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
    const { categoryId } = options
    const { page, limit } = this.data
    this.setData({
      categoryId
    })
    try{
      wx.showLoading()
      const { data: goodsList} = await categorymerchandise({ id, provinceId: this.data.location.province.id, categoryId, page, limit })
      this.setData({
        goodsList
      })
    } catch(err) {
      alertError(err)
    } finally {
      wx.hideLoading()
    }
  },

  // Tab
  async changeTab (event) {
    const { id, page, limit } = this.data
    let { completed } = this.data
    const { categoryId } = event.target.dataset
    this.setData({ categoryId })
    wx.showLoading()
    try{
      const { totalCount, totalPages, data: goodsList} = await categorymerchandise({ id, cityId: this.data.location.city.id, provinceId: this.data.location.province.id, categoryId: categoryId, page, limit })
      if(page >= totalPages) {
        completed = true
      }
      this.setData({
        goodsList
      })
    } catch (err) {
      alertError(err)
    } finally {
      wx.hideLoading()
    }
  },
  // onReachBottom
  async onReachBottom (options) {
    console.log("jiazai...")
    const { id } = this.data
    const { categoryId } = options
    const { limit, goodsList } = this.data
    let { page, completed } = this.data
    if(completed) return
    this.setData({ page: ++page })
    wx.showLoading()
    try {
      const { totalCount, totalPages, data: goodsLists } = await categorymerchandise({ id, provinceId: this.data.location.province.id, categoryId, page, limit })
      if(page >= totalPages) {
        completed = true
      }
      this.setData({completed, goodsList: [...goodsList, ...goodsLists]})
    } catch (err) {
      alertError(err)
    } finally {
      wx.hideLoading()
    }
  },

  selectThing () {
    console.log("搜索商品")
    wx.navigateTo({
      url:'/pages/explore/search/search'
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
