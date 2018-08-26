const initialState = {
  map: {},
  idsMap: {},
  pagingMap: {} // [`${merchId}-all|`${merchId}-groupon`] => { page: 1, limit: 10, finished: false }
}

let merchId
const payOrders = function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_MERCH_PAY_ORDER_LIST_SUCCESS':
      const { merchId, payOrderList, pagingKey, paging } = action.payload
      state.idsMap[`${merchId}-${pagingKey}`] = state.idsMap[`${merchId}-${pagingKey}`] || []
      payOrderList.map(payOrder => {
        const { orderId } = payOrder.suborders[0]
        if (!state.idsMap[`${merchId}-${pagingKey}`].includes(orderId)) {
          state.idsMap[`${merchId}-${pagingKey}`].push(orderId)
          state.map[orderId] = payOrder
        }
      })
      state.pagingMap[`${merchId}-${pagingKey}`] = paging
      return { ...state }
    default:
      return state
  }
}

export default payOrders

