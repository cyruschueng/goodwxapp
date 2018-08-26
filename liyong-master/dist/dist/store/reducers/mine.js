const initialState = {
  profile: null,
  groupCoupon:null
}

const mine = function (state = initialState, action) {
  switch (action.type) {
    case 'SET_MINE_PROFILE':
      const { profile } = action.payload
      return { ...state, profile }
    case 'FETCH_GROUP_COUPON_SUCCESS':
      const { couponList, isReceive } = action.payload
      state.groupCoupon = { couponList, isReceive }
      return { ...state }
    default:
      return state
  }
}

export default mine
