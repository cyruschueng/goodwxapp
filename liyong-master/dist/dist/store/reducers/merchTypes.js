const initialState = {
  map: {},
  idsMap: {}
}

let merchTypeId
const merchTypes = function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_MERCH_SUCCESS':
      const { id, merch } = action.payload
      merch.intgMerchTypeList.map(merchType => {
        merchTypeId = merchType.merchTypeId
        // add `_select` property.
        merchType._select = 0
        state.map[merchTypeId] = merchType
        state.idsMap[id] = state.idsMap[id] || []
        if (!state.idsMap[id].includes(merchTypeId)) state.idsMap[id].push(merchTypeId)
      })
      return { ...state }
    case 'PUT_MERCH_TYPE_SUBSCRIBE_SUCCESS':
      merchTypeId = action.payload.merchTypeId
      state.map[merchTypeId].subscribe = true
      return { ...state }
    case 'PUT_MERCH_SUBSCRIBE_SUCCESS':
      const merchId = action.payload.merchId
      state.idsMap[merchId].map(id => state.map[id].subscribe = true)
      return { ...state }
    case 'PUT_MERCH_TYPE_SELECT':
      merchTypeId = action.payload.merchTypeId
      const num = action.payload.num
      state.map[merchTypeId]._select = num
      return { ...state }
    case 'DELETE_MERCH_TYPE_DISCOUNT':
      merchTypeId = action.payload.merchTypeId
      delete state.map[merchTypeId].promotion
      return { ...state }
    default:
      return state
  }
}

export default merchTypes
