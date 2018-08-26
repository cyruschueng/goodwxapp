const initialState = {
  amount: null,
  recordList: [],
  paging: { page: 1, limit: 10, finished: false }
}

const coins = function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_COIN_SUCCESS':
      const { amount } = action.payload
      state.amount = amount
      return { ...state }
    case 'FETCH_COIN_RECORD_LIST_SUCCESS':
      const { coinRecordList, paging } = action.payload
      state.paging = paging
      state.recordList = [...state.recordList, ...coinRecordList]
      return { ...state }
    case 'POST_ORDER_SUCCESS':
      const { coin } = action.payload
      state.amount -= coin
      return { ...state }
    default:
      return state
  }
}

export default coins
