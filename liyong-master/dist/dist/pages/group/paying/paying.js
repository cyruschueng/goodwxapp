import regeneratorRuntime from '../../../lib/regenerator-runtime'
import { connect } from '../../../lib/wechat-weapp-redux'
import { fetching, fetchend, clearError } from '../../../store/actions/loader'
import { clearWxRequestPayment } from '../../../store/actions/group'
import promisify from '../../../lib/promisify'


const mapStateToData = (state, options) => {
  return {
    isFetching: state.loader.isFetching,
    displayError: state.loader.displayError,

    buying: state.buying
  }
}

const mapDispatchToPage = dispatch => ({
  fetching: _ => dispatch(fetching()),
  fetchend: _ => dispatch(fetchend()),
  clearError: _ => dispatch(clearError()),

  clearWxRequestPayment: _ => dispatch(clearWxRequestPayment())
})

const pageConfig = {
  async onLoad () {
    const { wxRequestPayment, _paying } = this.data.buying
    if (!wxRequestPayment) return wx.redirectTo({ url: '/pages/mine/orderList/orderList?type=waitPay'})

    this.setData({ _paying })

    // don't need wechat pay
    if (!wxRequestPayment.toWeixin) {
      this.fetching()
      return setTimeout(() => {
        this.fetchend()
        wx.redirectTo({ url: `/pages/group/paySuccess/paySuccess?id=${wxRequestPayment.orderId}`})
      }, 500)
    }

    try {
      const success = await promisify(wx.requestPayment)(wxRequestPayment)
      this.clearWxRequestPayment()
      if (success) return wx.redirectTo({ url: `/pages/group/paySuccess/paySuccess?id=${wxRequestPayment.orderId}`})

      return wx.redirectTo({ url: '/pages/mine/orderList/orderList?type=waitPay'})
    } catch (error) {
      return wx.redirectTo({ url: '/pages/mine/orderList/orderList?type=waitPay'})
    }
  },

  countdownOver () {
    return wx.redirectTo({ url: '/pages/mine/orderList/orderList?type=waitPay'})
  },

  reload () {
    this.clearError()
    this.onLoad()
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
