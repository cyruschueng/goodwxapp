import { connect } from '../../../lib/wechat-weapp-redux'
import { fetchOrder } from '../../../store/actions/mine'
import { clearError } from '../../../store/actions/loader'
import { fetchSaleSupportReasonList, checkSaleSupport } from '../../../store/actions/global'
import regeneratorRuntime from '../../../lib/regenerator-runtime'
import { getCheckSaleSupport } from '../../../api/global'

const mapStateToData = (state, options) => {
  const { id } = options
  return {
    isFetching: state.loader.isFetching,
    displayError: state.loader.displayError,
    order: state.orders.map[id]
  }
}

const mapDispatchToPage = dispatch => ({
  fetchOrder: id => dispatch(fetchOrder(id)),
  clearError: _ => dispatch(clearError()),
  fetchSaleSupportReasonList: _ => dispatch(fetchSaleSupportReasonList()),
  checkSaleSupport: saleSupportMessage => dispatch(checkSaleSupport(saleSupportMessage))
})

const pageConfig = {
  onLoad (options) {
    const { id } = options
    this.fetchOrder(id)
  },

  async gotoSaleSupportCreate (event) {
    console.log('gotoSaleSupportCreate')
    const { suborderId } = event.target.dataset
    const { id } = this.options
    try{
      const saleSupportMessage = await getCheckSaleSupport(id)
      await this.checkSaleSupport(saleSupportMessage)
      wx.navigateTo({ url: `/pages/mine/saleSupportShow/saleSupportShow?suborderId=${id}`})
    } catch(err) {
      wx.navigateTo({ url: `/pages/mine/saleSupportCreate/saleSupportCreate?suborderId=${id}` })
    }
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
