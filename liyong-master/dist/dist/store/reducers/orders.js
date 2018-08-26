import { arrayRemoveItem } from '../../utils'

const initialState = {
  map: {},
  idsMap: {
    all: [],
    waitPay: [],
    waitDelivery: [],
    waitReceive: [],
    waitEvaluate: [],
    saleSupport: []
  },
  pagingMap: {
    all: { page: 1, limit: 10, finished: false },
    waitPay: { page: 1, limit: 10, finished: false },
    waitDelivery: { page: 1, limit: 10, finished: false },
    waitReceive: { page: 1, limit: 10, finished: false },
    waitEvaluate: { page: 1, limit: 10, finished: false },
    saleSupport: { page: 1, limit: 10, finished: false }
  },
  orderType: null
}


let id
const mine = function (state = initialState, action) {
  switch (action.type) {
    case 'SET_MINE_ORDER_TYPE':
      const { orderType } = action.payload
      return { ...state, orderType }
    case 'SET_MINE_ORDERS':
      const { orderType: _orderType, pagingMap } = state
      const { orders, paging } = action.payload
      pagingMap[_orderType] = paging
      orders.map(order => {
        const { orderId: id } = order
        state.idsMap[_orderType].push(id)
        state.map[id] = order
      })
      return { ...state, pagingMap }
    case 'SET_MINE_ORDER_DETAIL':
      id = action.payload.id
      const { order } = action.payload
      state.map[id] = { ...state.map[id], ...order }
      return { ...state }
    case 'UPDATE_ORDER_SHARE_STATUS':
    case 'CLEAER_ORDERS':
      const { orderId, expressId, merchId } = action.payload
      // @TODO: update => instead of simple clear
      state.map = {}
      Object.keys(state.idsMap).map(key => state.idsMap[key] = [])
      Object.keys(state.pagingMap).map(key => state.pagingMap[key] = { page: 1, limit: 10, finished: false })
      return { ...state }
    case 'DELETE_ORDER':
      id = action.payload.id
      arrayRemoveItem(state.idsMap.waitPay, id)
      return { ...state }
    default:
      return state
  }
}

export default mine
