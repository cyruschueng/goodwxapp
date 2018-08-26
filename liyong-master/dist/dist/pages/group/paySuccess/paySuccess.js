import regeneratorRuntime from '../../../lib/regenerator-runtime'
import { connect } from '../../../lib/wechat-weapp-redux'
import { fetching, fetchend, clearError } from '../../../store/actions/loader'
// import { fetchOrder } from '../../../store/actions/mine'

const mapStateToData = (state, options) => {
  return {
    isFetching: state.loader.isFetching,
    displayError: state.loader.displayError,
  }
}

const mapDispatchToPage = dispatch => ({
  fetching: _ => dispatch(fetching()),
  fetchend: _ => dispatch(fetchend()),
  clearError: _ => dispatch(clearError())

})

const pageConfig = {

  gotoOrderDetail () {
    const { id } = this.options
    wx.redirectTo({ url: `/pages/mine/orderDetail/orderDetail?id=${id}`})
  },

  gotoGroupIndex () {
    wx.redirectTo({ url: '/pages/explore/selection/selection' })
  },

  reload () {
    this.clearError()
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
