import { arrayRemoveItem } from '../../utils'

const initialState = {
  map: {},
  idsMap: {
    normal: [],
    expired: []
  },
  pagingMap: {
    normal: { page: 1, limit: 10, finished: false },
    expired: { page: 1, limit: 10, finished: false }
  }
}

const coupons = function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_COUPON_LIST_SUCCESS':
      const { tab, couponList, paging } = action.payload
      state.pagingMap[tab] = paging
      couponList.map(coupon => {
        const { usercouponId: id } = coupon
        state.idsMap[tab].push(id)
        state.map[id] = coupon
      })
      return { ...state }
    case 'POST_COUPON_CODE_SUCCESS':
      const { coupon } = action.payload
      state.idsMap.normal.unshift(coupon.usercouponId)
      state.map[coupon.usercouponId] = coupon
      return { ...state }
    case 'POST_ORDER_SUCCESS':
      const { couponId } = action.payload
      arrayRemoveItem(state.idsMap.normal, couponId)
      delete state.map[couponId]
      return { ...state }
    default:
      return state
  }
}

export default coupons




