import { connect } from '../../../lib/wechat-weapp-redux'
import { fetchShareOrder } from '../../../store/actions/mine'
import { clearError } from '../../../store/actions/loader'
import { alertError } from '../../../utils'

const mapStateToData = (state, options) => {
  const { orderId, expressId, merchId } = options
  return {
    isFetching: state.loader.isFetching,
    displayError: state.loader.displayError,
    shareOrder: state.shareOrders.map[`${orderId}-${expressId}-${merchId}`]
  }
}

const mapDispatchToPage = dispatch => ({
  fetchShareOrder: ({ orderId, expressId, merchId }) => dispatch(fetchShareOrder({ orderId, expressId, merchId }))
})

const pageConfig = {
  onLoad (options) {
    const { orderId, expressId, merchId } = options
    this.fetchShareOrder({ orderId, expressId, merchId })
  },

  reload () {
    clearError()
    this.onLoad(this.options)
  }
}

Page(
  connect(
    mapStateToData,
    mapDispatchToPage
  )(pageConfig)
)
