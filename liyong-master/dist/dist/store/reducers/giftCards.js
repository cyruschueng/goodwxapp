const initialState = {
  map: {},
  idsMap: {
    normal: [],
    expired: []
  }
}

const giftCards = function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_GIFT_CARD_LIST_SUCCESS':
      const { tab, giftCards } = action.payload
      giftCards.map(giftCard => {
        const { usercouponId: id } = giftCard
        state.map[id] = giftCard
        state.idsMap[tab].push(id)
      })
      return { ...state }
    case 'POST_GIFT_CARD_CODE_SUCCESS':
      const { giftCard } = action.payload
      const { usercouponId: id } = giftCard
      state.map[id] = giftCard
      state.idsMap.normal.unshift(id)
      return { ...state }
    default:
      return state
  }
}

export default giftCards




