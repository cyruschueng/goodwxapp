const initialState = {
  map: {},
  idMap: {}
}

let grouponId
let merchId
const groupons = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MERCH_SUCCESS':
      const { id, merch } = action.payload
      const { intgGroupon: groupon } = merch
      grouponId = groupon.grouponId
      state.map[grouponId] = groupon
      state.idMap[id] = grouponId
      return { ...state }
    case 'PUT_GROUPON_SLOGON_SUCCESS':
      grouponId = action.payload.grouponId
      const slogon = action.payload.slogon
      state.map[grouponId].slogon = slogon
      return { ...state }
    default:
      return state
  }
}

export default groupons
