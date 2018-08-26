import regeneratorRuntime from '../../../lib/regenerator-runtime'
import { connect } from '../../../lib/wechat-weapp-redux'
import { fetching, fetchend, clearError } from '../../../store/actions/loader'
import { fetchCouponList, postCouponCode } from '../../../store/actions/mine'
import { putChooseCoupon } from '../../../store/actions/group'
import { showSuccess } from '../../../utils'
import { COUPON } from '../../../constants'

const store = getApp().store
const mapStateToData = (state, options) => {
  const { tab = 'normal' } = options
  const { idsMap, pagingMap, map } = state.coupons
  return {
    isFetching: state.loader.isFetching,
    displayError: state.loader.displayError,

    tab,
    paging: pagingMap[tab],
    couponList: idsMap[tab].map(id => map[id]),
    COUPON
  }
}

const mapDispatchToPage = dispatch => ({
  fetching: _ => dispatch(fetching()),
  fetchend: _ => dispatch(fetchend()),
  clearError: _ => dispatch(clearError()),

  fetchCouponList: ({ isExpired, isAppend }) => dispatch(fetchCouponList({ isExpired, isAppend })),
  postCouponCode: code => dispatch(postCouponCode(code)),

  putChooseCoupon: id => dispatch(putChooseCoupon(id))
})

const pageConfig = {
  onLoad () {
    const { tab } = this.data
    if (tab === 'expired') wx.setNavigationBarTitle({ title: '过期优惠劵' })
  },

  async onShow () {
    const { view } = this.options
    const { tab, paging } = this.data

    // if is merch buy choose coupon
    if (view === 'choose') {
      wx.setNavigationBarTitle({ title: '选择优惠券' })
      this.setData({ choose: true })
      this._computedCouponList()
    }

    if (paging.finished) return

    this.fetching()
    await this.fetchCouponList({ isExpired: tab === 'expired', isAppend: false })
    this.fetchend()
  },

  _computedCouponList () {
    console.log('_computedCouponList')
    const { merchId, amount } = this.options
    const { couponList } = this.data

    // valid couponList
    const merch = store.getState().merchs.map[merchId]
    couponList.map(coupon => {
      // time limit
      const now = Date.now()
      const { startTime, endTime } = coupon
      const _startTime = new Date(startTime).getTime() + new Date(startTime).getTimezoneOffset() * 60 * 1000
      const _endTime = new Date(endTime).getTime() + 3600 * 24 * 1000 + new Date(startTime).getTimezoneOffset() * 60 * 1000
      if (now < _startTime || now > _endTime) {
        coupon._limit = true
        return coupon
      }
      // if coupon hava tagId and not eq merch.tagId
      if (coupon.tagId != 0 && coupon.tagId != merch.tagId) {
        coupon._limit = true
        return coupon
      }
      // amount (add expressFee)
      if (coupon.useLimit == COUPON.TYPE.FULL_MINUS && amount < coupon.amount) {
        coupon._limit = true
        return coupon
      }

      coupon._limit = false
      return coupon
    })
    this.setData({ couponList })
  },

  chooseCoupon (event) {
    if (this.options.view !== 'choose') return

    const { id = 0 } = event.target.dataset
    this.putChooseCoupon(id)
    wx.navigateBack()
  },

  onReachBottom () {
    const { tab, paging } = this.data
    if (paging.finished) return

    this.fetching()
    this.fetchCouponList({ isExpired: tab === 'expired', isAppend: true })
    this.fetchend()
  },

  // events
  codeChange (event) {
    const { value } = event.detail
    this.setData({ code: value })
  },

  async exchange () {
    const { code } = this.data
    const isSuccess = await this.postCouponCode(code)
    // clear code
    if (isSuccess) {
      this.setData({ code: '' })
      showSuccess('优惠劵兑换成功')
    }
  },

  getExpireCouponList (event) {
    wx.navigateTo({ url: `/pages/mine/couponList/couponList?tab=expired` })
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

