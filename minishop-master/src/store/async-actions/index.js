import {
  updateOpenId,
  updatePhoneNumber
} from 'actions'
import {
  getSession,
  addMobile
} from 'apis'
export function getOpenId () {
  return dispatch => {
    getSession().then((res) => {
      if (String(res.code) === '200') {
        dispatch(updateOpenId(res.data.openId))
        dispatch(updatePhoneNumber(res.data.mobile))
      }
    })
  }
}

export function getPhoneNumber (iv, encryptedData) {
  return dispatch => {
    addMobile({ iv, encryptedData }).then((res) => {
      if (res.data) {
        dispatch(updatePhoneNumber(res.data))
      }
    })
  }
}
