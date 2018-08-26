const initialState = {
  map: {},
  idsMap: {},
  pagingMap: {} // [merchId] => { page: 1, limit: 10, finished: false }
}

let merchId
const shareOrders = function (state = initialState, action) {
  switch (action.type) {
    case 'SET_MINE_SHARE_ORDER_DETAIL':
      const { orderId, expressId, shareOrder } = action.payload
      merchId = action.payload.merchId
      state.map[`${orderId}-${expressId}-${merchId}`] = shareOrder
      return { ...state }
    case 'FETCH_MERCH_SHARE_ORDER_LIST_SUCCESS':
      const { shareOrderList, paging } = action.payload
      merchId = action.payload.merchId
      state.idsMap[merchId] = state.idsMap[merchId] || []
      shareOrderList.map(shareOrder => {
        const { shareOrderId } = shareOrder.shareOrder
        if (!state.idsMap[merchId].includes(shareOrderId)) state.idsMap[merchId].push(shareOrderId)
        state.map[shareOrderId] = shareOrder
      })
      state.pagingMap[merchId] = paging
      return { ...state }
    default:
      return state
  }
}

export default shareOrders

