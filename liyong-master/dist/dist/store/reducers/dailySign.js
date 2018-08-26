const initialState = {
  status: false,
  timesOfWeek: null,
  prizeList: []
}

const dailySign = function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_DAILY_SIGN_SUCCESS':
      const { timesOfWeek, prizeList, status } = action.payload
      return { ...state, status, timesOfWeek, prizeList }
    case 'POST_DAILY_SIGN_SUCCESS':
      state.status = true
      state.timesOfWeek++
      return { ...state }
    default:
      return state
  }
}

export default dailySign
