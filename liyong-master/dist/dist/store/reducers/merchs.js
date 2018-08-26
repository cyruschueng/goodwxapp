const initialState = {
  map: {},
}

let merchId
const merchs = function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_MERCH_SUCCESS':
      const { id, merch } = action.payload
      const _merch = { ...merch }
      delete _merch.intgMerchTypeList
      delete _merch.intgGroupon
      delete _merch.expressFeeList
      // add `_expressFeeMap` property
      // { [merchId-provinceId]: fee }
      _merch._expressFeeMap = {}
      merch.expressFeeList.map(item => {
        _merch._expressFeeMap[`${id}-${item.province}`] = item.expressFee
      })
      state.map[id] = _merch
      return { ...state }
    case 'PUT_MERCH_SUBSCRIBE_SUCCESS':
      merchId = action.payload.merchId
      map[merchId].isSubscribe = true
      return { ...state }
    case 'POST_ORDER_SUCCESS':
      merchId = action.payload.merchId
      delete state.map[merchId]
      return { ...state }
    case 'POST_LOCATION_SUCCESS':
      return { ...state, map: {}}
    default:
      return state
  }
}

export default merchs
