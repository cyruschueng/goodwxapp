import regeneratorRuntime from '../../../lib/regenerator-runtime'
import { connect } from '../../../lib/wechat-weapp-redux'
import { fetching, fetchend, clearError } from '../../../store/actions/loader'
import { fetchPCD, postLocation } from '../../../store/actions/global'
import { fetchMerch, fetchMerchShareOrderList,
  putMerchSubscribe, putMerchTypeSubscribe,
  deleteMerchTypeDiscount, putMerchTypeSelect
} from '../../../store/actions/group'
import { isEnterFinished, alert } from '../../../utils'

const store = getApp().store
const mapStateToData = state => {
  const { addresses } = state
  return {
    isFetching: state.loader.isFetching,
    displayError: state.loader.displayError,

    groupId: state.global.group.id,

    location: state.global.location,
    provinceIds: addresses.provinceIds,
    provinceMap: addresses.provinceMap,
    cityMap: addresses.cityMap
  }
}

const mapDispatchToPage = dispatch => ({
  fetching: _ => dispatch(fetching()),
  fetchend: _ => dispatch(fetchend()),
  clearError: _ => dispatch(clearError()),

  fetchMerch: ({ merchId, groupId, isRefresh }) => dispatch(fetchMerch({ merchId, groupId, isRefresh })),
  fetchMerchShareOrderList: ({ merchId, groupId }) => dispatch(fetchMerchShareOrderList({ merchId, groupId })),

  putMerchSubscribe: ({ grouponId, merchId }) => dispatch(putMerchSubscribe({ grouponId, merchId })),
  putMerchTypeSubscribe: ({ grouponId, merchId, merchTypeId }) => dispatch(putMerchTypeSubscribe({ grouponId, merchId, merchTypeId })),
  deleteMerchTypeDiscount: id => dispatch(deleteMerchTypeDiscount(id)),
  putMerchTypeSelect: ({ merchTypeId, num }) => dispatch(putMerchTypeSelect({ merchTypeId, num })),
  fetchPCD: id => dispatch(fetchPCD(id)),
  postLocation: ({ provinceId, cityId }) => dispatch(postLocation({ provinceId, cityId}))
})

const pageConfig = {
  data: {
    merch: null,
    merchTypes: [],
    groupon: null,

    subscribeSuccessModal: false,
    deliveryModal: false,

    chooseMerchTypeIds: [],
    popupMerchTypeList: [],
    chooseMerchTypePopup: false,

    chooseLocationPopup: false,
    chooseLocation: {
      provinceId: null,
      cityId: null
    }
  },

  async onShow (opts) {
    if (!isEnterFinished(store)) return
    console.log('onShow')

    const { id } = this.options
    const { groupId } = this.data
    const isRefresh = opts && opts.isRefresh
    this.fetching()
    const results = await Promise.all([
      this.fetchMerch({ groupId, merchId: id, isRefresh }),
      this.fetchMerchShareOrderList({ groupId, merchId: id })
    ])
    this.fetchend()

    // fail
    if (results.some(item => !item)) {
      return
    }

    this._computedMerch()
    this._computedDeliveryTime()
    this._computedDescription()
    this._computedShareOrderList()
    this._computedPopupMerchTypeList()
  },

  _computedMerch () {
    const { id } = this.options
    const { merchs, merchTypes, groupons } = store.getState()
    const merch = merchs.map[id]
    const _merchTypes = merchTypes.idsMap[id].map(id => merchTypes.map[id])
    const groupon = groupons.map[groupons.idMap[id]]
    this.setData({ merch, merchTypes: _merchTypes, groupon })
  },

  _computedDeliveryTime () {
    const { merch } = this.data
    const array = merch.deliveryTime.split('<br/>')
    this.setData({ deliveryTimeArray: array })
  },

  _computedDescription () {
    const { merch } = this.data
    const array = merch.description ? merch.description.split('<br/>') : []
    this.setData({ descriptionArray: array })
  },

  _computedShareOrderList () {
    const { id } = this.options
    const { shareOrders } = store.getState()
    const ids = shareOrders.idsMap[id].slice(0, 3)
    const shareOrderList = ids.map(id => shareOrders.map[id])
    this.setData({ shareOrderList })
  },

  _computedPopupMerchTypeList () {
    const { merchTypes } = this.data
    const popupMerchTypeList = merchTypes.filter(merchType => merchType.quantity)
    this.setData({ popupMerchTypeList })
  },

  async onPullDownRefresh () {
    await this.onShow({ isRefresh: true })
    wx.stopPullDownRefresh()
  },

  // events
  async merchTypeSubscribe (event) {
    const { merchTypeId } = event.target.dataset
    const { id } = this.options
    const { grouponId } = this.data.groupon
    this.fetching()
    const isSuccess = await this.putMerchTypeSubscribe({ grouponId, merchId: id, merchTypeId })
    if (isSuccess) {
      this.setData({ subscribeSuccessModal: true })
    }
    this.fetchend()
  },

  async merchSubscribe () {
    const { id } = this.options
    const { grouponId } = this.data.groupon
    this.fetching()
    const isSuccess = await this.putMerchSubscribe({ grouponId, merchId: id })
    if (isSuccess) {
      this.setData({ subscribeSuccessModal: true })
    }
    this.fetchend()
  },

  hideSubscribeSuccessModal () {
    this.setData({ subscribeSuccessModal: false })
  },

  showDeliveryModal () {
    this.setData({ deliveryModal: true })
  },

  hideDeliveryModal () {
    this.setData({ deliveryModal: false })
  },

  gotoMerchEdit () {
    const { id } = this.options
    wx.navigateTo({ url: `/pages/group/merchEdit/merchEdit?id=${id}` })
  },

  gotoMerchShareOrderList () {
    const { id } = this.options
    const { shareOrderList } = this.data
    if (!shareOrderList.length) return
    wx.navigateTo({ url: `/pages/group/merchShareOrderList/merchShareOrderList?id=${id}` })
  },

  gotoGroupIndex () {
    wx.navigateTo({ url: '/pages/explore/selection/selection' })
  },

  gotoMerchBuy () {
    const { id } = this.options
    const { popupMerchTypeList } = this.data
    const isOnlyOneValidMerchType = popupMerchTypeList.length <= 1
    if (isOnlyOneValidMerchType) {
      return wx.navigateTo({ url: `/pages/group/merchBuy/merchBuy?id=${id}` })
    }
    this.setData({ chooseMerchTypePopup: true })
  },

  gotoMerchBuyByPopup () {
    const { id } = this.options
    const { chooseMerchTypeIds } = this.data
    if (!chooseMerchTypeIds.length) {
      return alert('请选择需要购买的规格')
    }

    this.closeChooseMerchTypePopup()
    return wx.navigateTo({ url: `/pages/group/merchBuy/merchBuy?id=${id}` })
  },

  countdownOver (event) {
    const { id } = event.target.dataset
    this.deleteMerchTypeDiscount(id)
  },

  chooseMerchType (event) {
    const { merchTypeId } = event.target.dataset
    const { chooseMerchTypeIds } = this.data
    if (!chooseMerchTypeIds.includes(merchTypeId)) {
      chooseMerchTypeIds.push(merchTypeId)
      this.setData({ chooseMerchTypeIds })
      this.putMerchTypeSelect({ merchTypeId, num: 1 })
    } else {
      this.setData({ chooseMerchTypeIds: chooseMerchTypeIds.filter(id => id != merchTypeId) })
      this.putMerchTypeSelect({ merchTypeId, num: 0 })
    }
  },

  closeChooseMerchTypePopup () {
    this.setData({ chooseMerchTypePopup: false })
  },

  async showChooseLocationPopup () {
    this.fetching()
    await this.fetchPCD()
    this.fetchend()
    this.setData({ chooseLocationPopup: true })
  },

  closeChooseLocationPopup () {
    this.setData({ chooseLocationPopup: false })
  },

  chooseLocationProvince (event) {
    const { provinceId } = event.target.dataset
    const { cityIdsMap } = store.getState().addresses
    const chooseLocation = { provinceId }
    this.setData({ chooseLocation, cityIds: cityIdsMap[provinceId] })
  },

  async chooseLocationCity (event) {
    console.log(event)
    const { provinceId } = this.data.chooseLocation
    const { cityId } = event.target.dataset
    const isSuccess = await this.postLocation({ provinceId, cityId })
    if (isSuccess) {
      await this.onShow()
      this.closeChooseLocationPopup()
      this.chooseLocationChangeTab()
    }
  },

  chooseLocationChangeTab () {
    const chooseLocation = { provinceId: null }
    this.setData({ chooseLocation })
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
