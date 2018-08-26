import { combineReducers } from '../../modules/redux/index.js'
import {
  userInfo,
  sid,
  openId,
  phoneNumber
} from './user'
import { networkType } from './wx'

export default combineReducers({
  userInfo,
  networkType,
  sid,
  openId,
  phoneNumber
})
