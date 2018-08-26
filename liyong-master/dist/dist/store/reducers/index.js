import { combineReducers } from '../../lib/redux'
// reducers
import global from './global'
import loader from './loader'
import mine from './mine'
import dailySign from './dailySign'
import orders from './orders'
import addresses from './addresses'
import coupons from './coupons'
// import giftCards from './giftCards'
import coins from './coins'
import shareOrders from './shareOrders'
import payOrders from './payOrders'
import merchs from './merchs'
import merchTypes from './merchTypes'
import groupons from './groupons'
import expresses from './expresses'
import buying from './buying'

export default combineReducers({
  global,
  loader,
  mine,
  dailySign,
  orders,
  addresses,
  coupons,
  // giftCards,
  coins,
  shareOrders,
  payOrders,
  merchs,
  merchTypes,
  groupons,
  expresses,
  buying
})
