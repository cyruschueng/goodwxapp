import regeneratorRuntime from '../../lib/regenerator-runtime'
import { fetching, fetchend, displayError, alertError } from './loader'
import { Mine } from '../../api/index'

export const fetchProfile = _ => async (dispatch, getState) => {
  const { mine } = getState()
  if (mine.profile) return

  try {
    const profile = await Mine.getProfile()
    // format `ratio` must great then `1.00`
    profile.ratio = Math.max(0.00, profile.ratio).toFixed(2)
    dispatch(setMineProfile(profile))
  } catch (error) {
    dispatch(displayError(error))
  }
}
export const setMineProfile = profile => ({
  type: 'SET_MINE_PROFILE',
  payload: { profile }
})

export const fetchOrderList = ({ orderType, isAppend }) => async (dispatch, getState) => {
  dispatch(setMineOrderType({ orderType }))
  const { pagingMap } = getState().orders
  const { page, limit, finished } = pagingMap[orderType]
  // cache
  if (finished || (!isAppend && page != 1)) return

  try {
    const { totalPages, data: orders } = await Mine.getOrderList({ orderType, page, limit })
    const paging = { page: page + 1, limit, finished: false }
    if (page >= totalPages) paging.finished = true
    dispatch(setMineOrders({ orders, paging }))
  } catch (error) {
    dispatch(displayError(error))
  }
}
const setMineOrderType = ({ orderType }) => ({
  type: 'SET_MINE_ORDER_TYPE',
  payload: { orderType }
})
const setMineOrders = ({ orders, paging }) => ({
  type: 'SET_MINE_ORDERS',
  payload: { orders, paging }
})

export const putOrderConfirm = id => async (dispatch, getState) => {
  try {
    const data = await Mine.putOrderConfirm(id)
    dispatch(clearOrders())
    return true
  } catch (error) {
    dispatch(alertError(error))
  }
}
const clearOrders = _ => ({
  type: 'CLEAER_ORDERS',
  payload: {}
})

export const deleteOrder = id => ({
  type: 'DELETE_ORDER',
  payload: { id }
})

export const fetchOrder = id => async (dispatch, getState) => {
  // cache
  const { map } = getState().orders
  if (map[id] && map[id].order) return
  // request
  try {
    const data = await Mine.getOrder(id)
    // computed total price
    const { amount, expressFee, couponMoney, giftCardMoney, gold } = data.order
    const _amount = amount - expressFee - couponMoney - giftCardMoney - gold
    data.order._amount = _amount
    dispatch(setMineOrderDetail({ id, order: data }))
  } catch (error) {
    dispatch(displayError(error))
  }
}
const setMineOrderDetail = ({ id, order }) => ({
  type: 'SET_MINE_ORDER_DETAIL',
  payload: { id, order }
})

export const postShareOrder = ({ orderId, merchId, expressId, description, stars, images }) => async dispatch => {
  try {
    const data = await Mine.postShareOrder({ orderId, merchId, expressId, description, stars, images })
    dispatch(updateOrderShareStatus({ orderId, expressId, merchId }))
    wx.redirectTo({ url: `/pages/mine/shareOrderShow/shareOrderShow?orderId=${orderId}&expressId=${expressId}&merchId=${merchId}` })
  } catch (error) {
    dispatch(alertError(error))
  }
}
export const fetchShareOrder = ({ orderId, expressId, merchId }) => async (dispatch, getState) => {
  try {
    const shareOrder = await Mine.getShareOrder({ orderId, expressId, merchId })
    dispatch(setMineShareOrder({ orderId, expressId, merchId, shareOrder }))
  } catch (error) {
    dispatch(displayError(error))
  }
}
const updateOrderShareStatus = ({ orderId, expressId, merchId }) => ({
  type: 'UPDATE_ORDER_SHARE_STATUS',
  payload: { orderId, expressId, merchId }
})
const setMineShareOrder = ({ orderId, expressId, merchId, shareOrder }) => ({
  type: 'SET_MINE_SHARE_ORDER_DETAIL',
  payload: { orderId, expressId, merchId, shareOrder }
})

export const fetchAddressTagList = _ => async (dispatch, getState) => {
  // cache
  const { tagIds } = getState().addresses
  if (tagIds.length) return true
  try {
    const { categoryList: addressTagList } = await Mine.getAddressTagList()
    dispatch(setAddressTagList(addressTagList))
    return true
  } catch (error) {
    dispatch(displayError(error))
  }
}
const setAddressTagList = addressTagList => ({
  type: 'SET_ADDRESS_TAG_LIST',
  payload: { addressTagList }
})

export const fetchAddressList = _ => async (dispatch, getState) => {
  // cache
  const { ids } = getState().addresses
  if (ids.length) return true
  try {
    const { addressList } = await Mine.getAddressList()
    dispatch(setAddressList(addressList))
    return true
  } catch (error) {
    dispatch(displayError(error))
  }
}
const setAddressList = addressList => ({
  type: 'SET_ADDRESS_LIST',
  payload: { addressList }
})

export const putAddressDefault = id => async dispatch => {
  try {
    await Mine.putAddressDefault(id)
    dispatch(setAddressDefault(id))
  } catch (error) {
    dispatch(displayError(error))
  }
}
const setAddressDefault = id => ({
  type: 'SET_ADDRESS_DEFAULT',
  payload: { id }
})

export const deleteAddress = id => async dispatch => {
  try {
    await Mine.deleteAddress(id)
    dispatch(removeAddress(id))
  } catch (error) {
    dispatch(displayError(error))
  }
}
const removeAddress = id => ({
  type: 'DELETE_ADDRESS_SUCCESS',
  payload: { id }
})

export const fetchPCD = id => async (dispatch, getState) => {
  // is cache?
  const { provinceIds } = getState().addresses
  if (provinceIds.length) return true

  try {
    const PCD = await Mine.getPCD(id)
    dispatch(setPCD(PCD))
    return true
  } catch (error) {
    dispatch(displayError(error))
  }
}
const setPCD = PCD => ({
  type: 'SET_PCD',
  payload: { PCD }
})

export const postAddress = obj => async dispatch => {
  try {
    await Mine.postAddress(obj)
    dispatch(postAddressSuccess())
    return true
  } catch (error) {
    dispatch(alertError(error))
  }
}
const postAddressSuccess = _ => ({
  type: 'POST_ADDRESS_SUCCESS'
})

export const fetchAddress = id => async (dispatch, getState) => {
  // is cache?
  const { map } = getState().addresses
  if (map[id]) return

  try {
    const address = await Mine.getAddress(id)
    dispatch(fetchAddressSuccess({ id, address }))
  } catch (error) {
    dispatch(displayError(error))
  }
}
const fetchAddressSuccess = ({ id, address }) => ({
  type: 'FETCH_ADDRESS_SUCCESS',
  payload: { id, address }
})

export const putAddress = obj => async dispatch => {
  try {
    await Mine.putAddress(obj)
    const { addressId: id } = obj
    dispatch(putAddressSuccess({ id, address: obj }))
    return true
  } catch (error) {
    dispatch(alertError(error))
  }
}
const putAddressSuccess = ({ id, address }) => ({
  type: 'PUT_ADDRESS_SUCCESS',
  payload: { id, address }
})

export const fetchCouponList = ({ isExpired, isAppend, isAll }) => async (dispatch, getState) => {
  const tab = isExpired ? 'expired' : 'normal'
  const { pagingMap } = getState().coupons
  const { page, limit, finished } = pagingMap[tab]
  const _limit = isAll ? 1000 : limit
  // cache ?
  if (finished || (!isAppend && page != 1)) return true
  try {
    const { totalPages, items } = await Mine.getCouponList({ page, limit: _limit, isExpired })
    const paging = { page: page + 1, limit: _limit, finished: false }
    if (page >= totalPages) paging.finished = true
    dispatch(fetchCouponListSuccess({ tab, couponList: items, paging }))
    return true
  } catch (error) {
    dispatch(displayError(error))
  }
}
const fetchCouponListSuccess = ({ tab, couponList, paging }) => ({
  type: 'FETCH_COUPON_LIST_SUCCESS',
  payload: { tab, couponList, paging }
})

export const postCouponCode = code => async dispatch => {
  try {
    const coupon = await Mine.postCouponCode(code)
    dispatch(postCouponCodeSuccess(coupon))
    return true
  } catch (error) {
    dispatch(alertError(error))
  }
}
const postCouponCodeSuccess = coupon => ({
  type: 'POST_COUPON_CODE_SUCCESS',
  payload: { coupon }
})

export const fetchGiftCardList = ({ isExpired }) => async (dispatch, getState) => {
  // is cache?
  const tab = isExpired ? 'expired' : 'normal'
  if (getState().giftCards.idsMap[tab].length) return true

  try {
    const { items: giftCards } = await Mine.getGiftCardList({ isExpired })
    const tab = isExpired ? 'expired' : 'normal'
    dispatch(fetchGiftCardListSuccess({ tab, giftCards }))
    return true
  } catch (error) {
    dispatch(displayError(error))
  }
}
const fetchGiftCardListSuccess = ({ tab, giftCards }) => ({
  type: 'FETCH_GIFT_CARD_LIST_SUCCESS',
  payload: { tab, giftCards }
})

export const postGiftCardCode = code => async dispatch => {
  try {
    const giftCard = await Mine.postGiftCardCode(code)
    dispatch(postGiftCardCodeSuccess(giftCard))
    return true
  } catch (error) {
    dispatch(alertError(error))
  }
}
const postGiftCardCodeSuccess = giftCard => ({
  type: 'POST_GIFT_CARD_CODE_SUCCESS',
  payload: { giftCard }
})

export const fetchCoin = _ => async (dispatch, getState) => {
  // is cache?
  const amount = getState().coins.amount
  if (amount) return true

  try {
    const { totalGold: amount } = await Mine.getCoin()
    dispatch(fetchCoinSuccess(amount))
    return true
  } catch (error) {
    dispatch(displayError(error))
  }
}
const fetchCoinSuccess = amount => ({
  type: 'FETCH_COIN_SUCCESS',
  payload: { amount }
})

export const fetchCoinRecordList = ({ isAppend }) => async (dispatch, getState) => {
  const { paging } = getState().coins
  const { page, limit, finished } = paging
  if (finished || (!isAppend && page != 1)) return

  try {
    const { totalPages, data } = await Mine.getCoinRecordList({ page, limit })
    const paging = { page: page + 1, limit, finished: false }
    if (page >= totalPages) paging.finished = true
    dispatch(fetchCoinRecordListSuccess({ coinRecordList: data, paging }))
  } catch (error) {
    dispatch(displayError(error))
  }
}
const fetchCoinRecordListSuccess = ({ coinRecordList, paging }) => ({
  type: 'FETCH_COIN_RECORD_LIST_SUCCESS',
  payload: { coinRecordList, paging}
})

export const fetchExpress = id => async dispatch => {
  try {
    const express = await Mine.getExpress(id)
    dispatch(fetchExpressSuccess({ id, express }))
    console.log(express)
  } catch (error) {
    dispatch(displayError(error))
  }
}
const fetchExpressSuccess = ({ id, express }) => ({
  type: 'FETCH_EXPRESS_SUCCESS',
  payload: { id, express }
})

export const fetchDailySign = id => async (dispatch, getState) => {
  // is cache?
  if (getState().dailySign.prizeList.length) return

  try {
    const { checkinStatus, totalCheckinDay, prizesList } = await Mine.getDailySign(id)
    dispatch(fetchDailySignSuccess({ status: checkinStatus, timesOfWeek: totalCheckinDay, prizeList: prizesList }))
  } catch (error) {
    dispatch(alertError(error))
  }
}
const fetchDailySignSuccess = ({ status, timesOfWeek, prizeList }) => ({
  type: 'FETCH_DAILY_SIGN_SUCCESS',
  payload: { status, timesOfWeek, prizeList }
})

export const postDailySign = id => async dispatch => {
  try {
    const data = await Mine.postDailySign(id)
    dispatch(postDailySignSuccess())
    return true
  } catch (error) {
    dispatch(alertError(error))
  }
}
const postDailySignSuccess = _ => ({
  type: 'POST_DAILY_SIGN_SUCCESS',
  payload: { }
})

export const postSaleSupport = obj => async dispatch => {
  try {
    const data = await Mine.postSaleSupport(obj)
    dispatch(postSaleSupportSuccess())
    return true
  } catch (error) {
    dispatch(alertError(error))
  }
}
const postSaleSupportSuccess = _ => ({
  type: 'POST_SALE_SUPPORT_SUCCESS',
  payload: {}
})

// 查询优惠券状态(领取或未领取)
export const fetchGroupCoupon = id => async dispatch => {
  try {
    const { couponList, isReceive} = await Mine.getGroupCoupon(id)
    dispatch(fetchGroupCouponSuccess({ couponList, isReceive }))
  } catch (error) {
    dispatch(alertError(error))
  }
}
const fetchGroupCouponSuccess = ({ couponList, isReceive }) => ({
  type: 'FETCH_GROUP_COUPON_SUCCESS',
  payload: { couponList, isReceive }
})

