import regeneratorRuntime from '../../../lib/regenerator-runtime'
import { connect } from '../../../lib/wechat-weapp-redux'
import { fetching, fetchend, clearError } from '../../../store/actions/loader'
import { fetchMerch, fetchMerchShareOrderList, fetchMerchPayOrderList } from '../../../store/actions/group'
import { isEnterFinished } from '../../../utils'

const store = getApp().store
const mapStateToData = (state, options) => {
  return {
    isFetching: state.loader.isFetching,
    displayError: state.loader.displayError,

    groupId: state.global.group.id,
  }
}

const mapDispatchToPage = dispatch => ({
  fetching: _ => dispatch(fetching()),
  fetchend: _ => dispatch(fetchend()),
  clearError: _ => dispatch(clearError()),

  fetchMerch: ({ merchId, groupId, isRefresh }) => dispatch(fetchMerch({ merchId, groupId, isRefresh })),
  fetchMerchShareOrderList: ({ merchId, groupId, isAppend }) => dispatch(fetchMerchShareOrderList({ merchId, groupId, isAppend })),
  fetchMerchPayOrderList: ({ merchId, grouponId, isAppend }) => dispatch(fetchMerchPayOrderList({ merchId, grouponId, isAppend }))
})

const pageConfig = {
  data: {
    stickShareOrderList: [],
    moreShareOrderList: [],

    heroPayOrderNumber: 0,
    payOrderList: [],
    heroPayOrderList: [],

    onlyShowHeroPayOrderList: false
  },

  async onShow () {
    if (!isEnterFinished(store)) return

    const { id } = this.options
    const { groupId } = this.data
    this.fetching()
    const _result = await this.fetchMerch({ merchId: id, groupId })
    const grouponId = store.getState().groupons.idMap[id]
    const results = await Promise.all([
      this.fetchMerchShareOrderList({ merchId: id, groupId }),
      this.fetchMerchPayOrderList({ merchId: id, grouponId })
    ])
    this.fetchend()

    // if request hava fail
    if ([_result, ...results].some(item => item == null)) {
      return
    }

    this.setData({ heroPayOrderNumber: results[1] })
    this._computedShareOrderList()
    this._computedHeroPayOrderList()

    // if the shareOrderList length < 5, then request the payOrderList.
    const shareOrderIds = store.getState().shareOrders.idsMap[id] || []
    if (shareOrderIds.length < 5) {
      await this.fetchMerchPayOrderList({ merchId: id })
      this._computedPayOrderList()
    }
  },

  async onReachBottom () {
    const { id } = this.options
    const { groupId, onlyShowHeroPayOrderList } = this.data
    if (!onlyShowHeroPayOrderList) {
      // if finished return
      const _shareOrderListFinished = store.getState().shareOrders.pagingMap[id].finished
      const _payOrderListFinished = store.getState().payOrders.pagingMap[`${id}-all`]
        ? store.getState().payOrders.pagingMap[`${id}-all`].finished
        : false
      if (_shareOrderListFinished && _payOrderListFinished) return

      this.fetching()
      const _fetchShareOrderListSuccess = await this.fetchMerchShareOrderList({ merchId: id, groupId, isAppend: true })
      if (_fetchShareOrderListSuccess) this._computedShareOrderList()

      // is merch shareOrderList finished, fetch the payOrderList
      if (_shareOrderListFinished) {
        const _fetchPayOrderListSuccess = await this.fetchMerchPayOrderList({ merchId: id, isAppend: true })
        if (_fetchPayOrderListSuccess) this._computedPayOrderList()
      }
    } else {
      // if finished return
      const _HeroPayOrderListFinished = store.getState().payOrders.pagingMap[`${id}-groupon`].finished
      if (_HeroPayOrderListFinished) return

      this.fetching()
      const grouponId = store.getState().groupons.idMap[id]
      const _fetchHeroPayOrderListSuccess = await this.fetchMerchPayOrderList({ merchId: id, grouponId, isAppend: true })
      if (_fetchHeroPayOrderListSuccess) this._computedHeroPayOrderList()
    }
    this.fetchend()
  },

  _computedShareOrderList () {
    const { id } = this.options
    const { map, idsMap } = store.getState().shareOrders
    const stickShareOrderList = []
    const moreShareOrderList = []
    idsMap[id].map(id => {
      const shareOrder = map[id]
      shareOrder.sticking
        ? stickShareOrderList.push(shareOrder)
        : moreShareOrderList.push(shareOrder)
    })
    this.setData({ stickShareOrderList, moreShareOrderList })
  },

  _computedPayOrderList () {
    const { id } = this.options
    const { map, idsMap } = store.getState().payOrders
    const ids = idsMap[`${id}-all`] || []
    const payOrderList = ids.map(id => map[id])
    this.setData({ payOrderList })
  },

  _computedHeroPayOrderList () {
    const { id } = this.options
    const { map, idsMap } = store.getState().payOrders
    const ids = idsMap[`${id}-groupon`] || []
    const heroPayOrderList = ids.map(id => map[id])
    this.setData({ heroPayOrderList })
  },

  toggleHeroPayOrderList () {
    const { onlyShowHeroPayOrderList } = this.data
    this.setData({ onlyShowHeroPayOrderList: !onlyShowHeroPayOrderList })
  },

  reload () {
    this.clearError()
    this.onShow()
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
