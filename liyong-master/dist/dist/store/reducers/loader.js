const initialState = {
  isFetching: false,
  displayError: null,
  alertError: null
}

let message
let error
const loader = function (state = initialState, action) {

  switch (action.type) {
    case 'FETCHING':
      wx.showLoading()
      return { ...state, isFetching: true }
    case 'FETCHEND':
      wx.hideLoading()
      return { ...state, isFetching: false }
    case 'DISPLAY_ERROR':
      console.log(action)
      message = getMessageFromAction(action)
      console.log(action.payload)
      return { ...state, displayError: { message: message }}
    case 'ALERT_ERROR':
      console.log(action)
      message = getMessageFromAction(action)
      wx.showModal({
        title: '提示',
        content: message,
        showCancel: false
      })
      return { ...state, alertError: { message: message }}
    case 'CLEAR_ERROR':
      return { ...state, displayError: null }
    default:
      return state
  }
}

function getMessageFromAction (action) {
  let message = action.payload.message || action.payload.msg || action.payload.errMsg || action.payload || '服务器错误'
  if (/timeout/.test(message)) message = '请求超时，请重试。'
  return message
}

export default loader




