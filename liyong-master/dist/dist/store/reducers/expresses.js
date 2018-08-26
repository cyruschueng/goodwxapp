const initialState = {
  map: {},
}

const expresses = function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_EXPRESS_SUCCESS':
      const { id, express } = action.payload
      state.map[id] = express
      return { ...state }
    default:
      return state
  }
}

export default expresses
