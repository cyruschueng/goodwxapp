import regeneratorRuntime from '../../../lib/regenerator-runtime'
import { connect } from '../../../lib/wechat-weapp-redux'
import { fetchOrderList, putOrderConfirm, deleteOrder } from '../../../store/actions/mine'
import { fetching, fetchend, clearError } from '../../../store/actions/loader'
import { getToPay, fetchMerch, postOrder } from '../../../store/actions/group'
import { navigateErrorPage, alertError, confirm } from '../../../utils'
import { ORDER_STATUS } from '../../../constants'

const mapStateToData = (state, options) => {
  const { idsMap, pagingMap, map } = state.orders
  const { merchs } = state
  const orderType = state.orders.orderType || options.type
  return {
    isFetching: state.loader.isFetching,
    displayError: state.loader.displayError,
    groupId: state.global.group.id,

    orderType,
    orders: (idsMap[orderType] || []).map(id => map[id]),
    paging: pagingMap[orderType],
    merchMap: merchs.map
  }
}

const mapDispatchToPage = dispatch => ({
  clearError: _ => dispatch(clearError()),
  fetching: _ => dispatch(fetching()),
  fetchend: _ => dispatch(fetchend()),

  fetchOrderList: type => dispatch(fetchOrderList(type)),
  putOrderConfirm: id => dispatch(putOrderConfirm(id)),
  getToPay: id => dispatch(getToPay(id)),
  deleteOrder: id => dispatch(deleteOrder(id)),
  fetchMerch: ({ merchId, groupId }) => dispatch(fetchMerch({ merchId, groupId })),
  postOrder: obj => dispatch(postOrder(obj)),
})

const pageConfig = {
  data: {
    ORDER_STATUS,
    orderType: null
  },

  async onShow () {
    const orderType = this.data.orderType || this.options.type
    this.setData({ orderType })
    this.fetching()
    await this.fetchOrderList({ orderType })
    this.fetchend()
  },

  async onReachBottom () {
    const { orderType } = this.data
    this.fetching()
    await this.fetchOrderList({ orderType, isAppend: true })
    this.fetchend()
  },

  countdownOver (event) {
    const { id } = event.target.dataset
    console.log(id)
    this.deleteOrder(id)
  },

  async toPay (event) {
    try {
      console.log("去支付")
      const { id, merchId, orderFee } = event.target.dataset
      const { groupId, merchMap } = this.data
      this.fetching()
      const merchisSouccess = await this.fetchMerch({ groupId, merchId })
      const _paying = {
        merchs: [merchMap[merchId]],
        orderFee
      }
      const toPayisSouccess = await this.getToPay({ id, _paying })
      this.fetchend()
      if (merchisSouccess && toPayisSouccess) {
        wx.navigateTo({ url: `/pages/group/paying/paying` })
      }
    } catch (err) {
      console.log(err)
    }
  },

  chooseTab (event) {
    const { tab: orderType } = event.target.dataset
    if (orderType === this.data.orderType) return
    this.fetchOrderList({ orderType })
  },

  async confirmOrder (event) {
    if (await confirm('确认收货?')) {
      const { id } = event.target.dataset
      const isSuccess = await this.putOrderConfirm(id)
      if (isSuccess) this.onShow(this.options)
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
