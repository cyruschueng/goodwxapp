import regeneratorRuntime from '../../lib/regenerator-runtime'
import { fetching, fetchend, displayError, alertError } from './loader'
import Group from '../../api/group'
import { emptyObject } from '../../utils'

export const fetchMerch = ({ merchId, groupId, isRefresh }) => async (dispatch, getState) => {
  // is cache?
  const map = getState().merchs.map
  if (!isRefresh && map[merchId]) return true
  try {
    const merch = await Group.getMerch({ merchId, groupId })
    // TODO temp add data error
    if (!merch.intgGroupon.grouponId) {
      return dispatch(displayError('没有 grouponId'))
    }
    dispatch(fetchMerchSuccess({ id: merchId, merch }))
    return true
  } catch (error) {
    dispatch(displayError(error))
  }
}
const fetchMerchSuccess = ({ id, merch }) => ({
  type: 'FETCH_MERCH_SUCCESS',
  payload: { id, merch }
})

export const fetchMerchShareOrderList = ({ merchId, groupId, isAppend }) => async (dispatch, getState) => {
  const { page, limit, finished } = getState().shareOrders.pagingMap[merchId]
    || { page: 1, limit: 10, finished: false }
  // cache
  if (finished || (!isAppend && page != 1)) return true

  try {
    const { totalPages, totalCount, data: shareOrderList } = await Group.getMerchShareOrderList({ merchId, groupId, page, limit })
    const paging = { page: page + 1, limit, finished: false }
    if (page >= totalPages) paging.finished = true
    dispatch(fetchMerchShareOrderListSuccess({ merchId, shareOrderList, paging }))
    return true
  } catch (error) {
    dispatch(displayError(error))
  }
}
const fetchMerchShareOrderListSuccess = ({ merchId, shareOrderList, paging }) => ({
  type: 'FETCH_MERCH_SHARE_ORDER_LIST_SUCCESS',
  payload: { merchId, shareOrderList, paging }
})

export const fetchMerchPayOrderList = ({ merchId, grouponId, isAppend }) => async (dispatch, getState) => {
  const pagingKey = grouponId ? 'groupon' : 'all'
  const { page, limit, finished } = getState().payOrders.pagingMap[`${merchId}-${pagingKey}`]
    || { page: 1, limit: 10, finished: false }

  console.log(finished, isAppend, page)
  // cache
  if (finished || (!isAppend && page != 1)) return true

  try {
    const { totalPages, totalCount, data: payOrderList } = await Group.getMerchPayOrderList({ merchId, grouponId, page, limit })
    const paging = { page: page + 1, limit, finished: false }
    if (page >= totalPages) paging.finished = true
    dispatch(fetchMerchPayOrderListSuccess({ merchId, payOrderList, pagingKey, paging }))
    return totalCount
  } catch (error) {
    dispatch(displayError(error))
  }
}
const fetchMerchPayOrderListSuccess = ({ merchId, payOrderList, pagingKey, paging }) => ({
  type: 'FETCH_MERCH_PAY_ORDER_LIST_SUCCESS',
  payload: { merchId, payOrderList, pagingKey, paging }
})

export const putMerchSubscribe = ({ grouponId, merchId }) => async dispatch => {
  try {
    const data = await Group.putMerchSubscribe({ grouponId, merchId })
    dispatch(putMerchSubscribeSuccess(merchId))
    return true
  } catch (error) {
    dispatch(alertError(error))
  }
}
const putMerchSubscribeSuccess = merchId => ({
  type: 'PUT_MERCH_SUBSCRIBE_SUCCESS',
  payload: { merchId }
})

export const putMerchTypeSubscribe = ({ grouponId, merchId, merchTypeId }) => async dispatch => {
  try {
    const data = await Group.putMerchTypeSubscribe({ grouponId, merchId, merchTypeId })
    dispatch(putMerchTypeSubscribeSuccess(merchTypeId))
    return true
  } catch (error) {
    dispatch(alertError(error))
  }
}
const putMerchTypeSubscribeSuccess = merchTypeId => ({
  type: 'PUT_MERCH_TYPE_SUBSCRIBE_SUCCESS',
  payload: { merchTypeId }
})

export const putGrouponSlogon = ({ grouponId, slogon }) => async dispatch => {
  try {
    const data = await Group.putGrouponSlogon({ grouponId, slogon })
    dispatch(putGrouponSlogonSuccess({ grouponId, slogon }))
    return true
  } catch (error) {
    dispatch(alertError(error))
  }
}
const putGrouponSlogonSuccess = ({ grouponId, slogon }) => ({
  type: 'PUT_GROUPON_SLOGON_SUCCESS',
  payload: { grouponId, slogon }
})

export const putMerchTypeSelect = ({ merchTypeId, num }) => ({
  type: 'PUT_MERCH_TYPE_SELECT',
  payload: { merchTypeId, num }
})

export const deleteMerchTypeDiscount = merchTypeId => ({
  type: 'DELETE_MERCH_TYPE_DISCOUNT',
  payload: { merchTypeId }
})

export const fetchDefaultAddressByMerchId = merchId => async (dispatch, getState) => {
  // is cache?
  if (getState().addresses.validDefaultIdMap[merchId] !== undefined) return true

  try {
    const address = await Group.getDefaultAddressByMerchId(merchId)
    if (!emptyObject(address)) dispatch(fetchDefaultAddressByMerchIdSuccess({ merchId, address }))
    return true
  } catch (error) {
    dispatch(displayError(error))
  }
}
const fetchDefaultAddressByMerchIdSuccess = ({ merchId, address }) => ({
  type: 'FETCH_DEFAULT_ADDRESS_BY_MERCH_ID_SUCCESS',
  payload: { merchId, address }
})

export const fetchAddressIdsByMerchId = merchId => async (dispatch, getState) => {
  // is cache?
  const { validIdsMap } = getState().addresses
  if (validIdsMap[merchId]) return

  try {
    const { addressList = [] } = await Group.getAddressIdsByMerchId(merchId)
    dispatch(fetchAddressIdsByMerchIdSuccess({ merchId, addressList }))
    return true
  } catch (error) {
    dispatch(displayError(error))
  }
}
const fetchAddressIdsByMerchIdSuccess = ({ merchId, addressList }) => ({
  type: 'FETCH_ADDRESS_IDS_BY_MERCH_ID_SUCCESS',
  payload: { merchId, addressList }
})

/** begin: buying actions */
export const putChooseAddress = addressId => ({
  type: 'PUT_CHOOSE_ADDRESS',
  payload: { addressId }
})
export const putChooseCoupon = couponId => ({
  type: 'PUT_CHOOSE_COUPON',
  payload: { couponId }
})
export const putChooseGiftCards = giftCardIds => ({
  type: 'PUT_CHOOSE_GIFT_CARDS',
  payload: { giftCardIds }
})
export const putUseCoin = coin => ({
  type: 'PUT_USE_COIN',
  payload: { coin }
})

export const postOrder = obj => async dispatch => {
  try {
    const wxRequestPayment = await Group.postOrder(obj)
    // note: keyword `package` is reserved
    wxRequestPayment.package = wxRequestPayment.extended
    dispatch(postOrderSuccess({ wxRequestPayment, _paying: obj._paying, couponId: obj.userCouponId, coin: obj.gold }))
    return true
  } catch (error) {
    dispatch(alertError(error))
  }
}
const postOrderSuccess = ({ wxRequestPayment, _paying, couponId, coin }) => ({
  type: 'POST_ORDER_SUCCESS',
  payload: { wxRequestPayment, _paying, couponId, coin }
})

export const clearWxRequestPayment = _ => ({
  type: 'CLEAR_WX_REQUEST_PAYMENT'
})

export const getToPay = ({ id, _paying }) => async dispatch => {
  try {
    const res = await Group.toPay(id)
    dispatch(getToPaySuccess({toPayRes:res, _toPaying:_paying}))
    return true
  } catch (error) {
    dispatch(alertError(error))
  }
}
const getToPaySuccess = ({toPayRes, _toPaying}) => ({
  type: 'GET_TOPAY_SUCCESS',
  payload: { toPayRes, _toPaying }
})

/** end: buying actions */
