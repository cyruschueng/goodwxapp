const initialState = {
  addressId: null,
  // merchTypeSelectMap: {}, // [merchId]: select
  couponId: null,
  giftCardIds: null,
  coin: 0,

  wxRequestPayment: null,
  _paying: null
}

const buying = function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_DEFAULT_ADDRESS_BY_MERCH_ID_SUCCESS':
      const { address } = action.payload
      return { ...state, addressId: address.addressId}
    case 'PUT_CHOOSE_ADDRESS':
      const { addressId } = action.payload
      return { ...state, addressId }
    // case 'PUT_MERCH_TYPE_SELECT':
    //   const { merchTypeId, num } = action.payload
    //   state.merchTypeSelectMap[merchTypeId] = num
    //   return { ...state }
    case 'PUT_CHOOSE_COUPON':
      const { couponId } = action.payload
      return { ...state, couponId }
    case 'PUT_CHOOSE_GIFT_CARDS':
      const { giftCardIds } = action.payload
      return { ...state, giftCardIds }
    case 'PUT_USE_COIN':
      const { coin } = action.payload
      return { ...state, coin }
    case 'POST_ORDER_SUCCESS':
      const { wxRequestPayment, _paying } = action.payload
      return { ...state, wxRequestPayment,
        // addressId: null,
        merchTypeSelectMap: {},
        couponId: null,
        giftCardIds: null,
        coin: 0,
        _paying
      }
    case 'CLEAR_WX_REQUEST_PAYMENT':
      return { ...state, wxRequestPayment: null }
    case 'GET_TOPAY_SUCCESS':
      const { toPayRes, _toPaying} = action.payload
      state.wxRequestPayment = toPayRes
      state._paying = _toPaying
      return { ...state }
    default:
      return state
  }
}

export default buying
