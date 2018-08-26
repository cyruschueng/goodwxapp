import regeneratorRuntime from '../../../lib/regenerator-runtime'
import { connect } from '../../../lib/wechat-weapp-redux'
import { fetching, fetchend, clearError } from '../../../store/actions/loader'
import { fetchGiftCardList, postGiftCardCode } from '../../../store/actions/mine'
import { putChooseGiftCards } from '../../../store/actions/group'

const store = getApp().store
const mapStateToData = (state, options) => {
  const { tab = 'normal' } = options
  const { idsMap, map } = state.giftCards
  return {
    isFetching: state.loader.isFetching,
    displayError: state.loader.displayError,

    tab,
    normalGiftCardList: idsMap.normal.map(id => map[id]),
    expiredGiftCardList: idsMap.expired.map(id => map[id]),
  }
}

const mapDispatchToPage = dispatch => ({
  fetching: _ => dispatch(fetching()),
  fetchend: _ => dispatch(fetchend()),
  clearError: _ => dispatch(clearError()),

  fetchGiftCardList: ({ isExpired }) => dispatch(fetchGiftCardList({ isExpired })),
  postGiftCardCode: code => dispatch(postGiftCardCode(postGiftCardCode)),
  putChooseGiftCards: ids => dispatch(putChooseGiftCards(ids)),
})

const pageConfig = {
  data: {
    choose: false,
    code: ''
  },

  async onShow (options) {
    const { view } = this.options
    // if is merch buy choose address
    if (view === 'choose') {
      wx.setNavigationBarTitle({ title: '选择礼品卡' })
      this.setData({ choose: true })
    }

    this.fetching()
    await Promise.all([
      this.fetchGiftCardList({ isExpired: false }),
      this.fetchGiftCardList({ isExpired: true })
    ])
    this.fetchend()

    const { giftCardIds } = store.getState().buying
    const { normalGiftCardList } = this.data
    normalGiftCardList.map(giftCard => {
      giftCard._select = ~giftCardIds.indexOf(giftCard.usercouponId) ? true : false
    })
    this.setData({ normalGiftCardList })
  },

  selectGiftCard (event) {
    const { index } = event.target.dataset
    const { normalGiftCardList } = this.data
    normalGiftCardList[index]._select = !normalGiftCardList[index]._select
    this.setData({ normalGiftCardList })
  },

  chooseGiftCards () {
    const { normalGiftCardList } = this.data
    this.putChooseGiftCards(
      normalGiftCardList
        .filter(giftCard => giftCard._select)
        .map(giftCard => giftCard.usercouponId)
    )
    wx.navigateBack()
  },

  // events
  codeChange (event) {
    const { value } = event.detail
    this.setData({ code: value })
  },
  async exchange () {
    const { code } = this.data
    this.fetching()
    this.postGiftCardCode(code)
    this.fetchend()
  },

  changeTab (event) {
    const { tab } = event.target.dataset
    const { _tab } = this.data
    if (tab == _tab) return

    this.setData({ tab })
  },

  gotoRecordList (event) {
    const { id } = event.target.dataset
    wx.navigateTo({ url: `/pages/mine/giftCardRecordList/giftCardRecordList?id=${id}` })
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

