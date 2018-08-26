import regeneratorRuntime from '../../lib/regenerator-runtime'
import { fetching, fetchend, displayError, alertError } from './loader'
import Global from '../../api/global'
import homePage from '../../api/homePage'
import { setLocationHeader } from '../../api/_request'

export const fetchWeappEntry = ({ encryptedData, iv }) => async dispatch => {
  dispatch(fetching())
  try {
    const result = await Global.getIndex({ encryptedData, iv })
    const { weappOpenGid: openGId, communityId: id, pageType: entryType, nonMembersPage, salerId: authorId } = result
    const group = { id, openGId, nonMembersPage, authorId }
    dispatch(setEntryType(entryType))
    dispatch(setGroup(group))
  } catch (error) {
    dispatch(displayError(error))
  } finally {
    dispatch(fetchend())
  }
}
const setGroup = group => ({
  type: 'SET_GROUP',
  payload: { group }
})
const setEntryType = entryType => ({
  type: 'SET_ENTRY_TYPE',
  payload: { entryType }
})

export const fetchPCD = id => async (dispatch, getState) => {
  // is cache?
  const { provinceIds } = getState().addresses
  if (provinceIds.length) return true

  try {
    const PCD = await Global.getPCD(id)
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

export const postLocation = ({ provinceId, cityId }) => async (dispatch, getState) => {
  // is postLocation is same return true
  const location = getState().global.location
  if (cityId && location.city && location.city.id == cityId) return true
  if (!cityId && location.province.id == provinceId) return

  try {
    const location = await Global.postLocation({ provinceId, cityId })
    setLocationHeader(cityId || provinceId)
    dispatch(postLocationSuccess(location))
    return true
  } catch (error) {
    dispatch(alertError(error))
  }
}
const postLocationSuccess = location => ({
  type: 'POST_LOCATION_SUCCESS',
  payload: { location }
})

export const fetchLocation = ({ province, city }) => async dispatch => {
  try {
    // const { province, city } = await Global.getLocation({ lat, lng })
    dispatch(fetchLocationSuccess({ province, city }))
  } catch (error) {
    dispatch(alertError(error))
  }
}
const fetchLocationSuccess = ({ province, city }) => ({
  type: 'FETCH_LOCATION_SUCCESS',
  payload: { province, city }
})

export const fetchSaleSupportReasonList = _ => async (dispatch, getState) => {
  // is cache?
  if (getState().global.saleSupportReasonList.length) return

  try {
    const saleSupportReasonList = await Global.getSaleSupportReasonList()
    dispatch(fetchSaleSupportReasonListSuccess(saleSupportReasonList))
  } catch (error) {
    dispatch(alertError(error))
  }
}
const fetchSaleSupportReasonListSuccess = saleSupportReasonList => ({
  type: 'FETCH_SALE_SUPPORT_REASON_LIST_SUCCESS',
  payload: { saleSupportReasonList }
})

export const checkSaleSupport = saleSupportMessage => async dispatch => {
  try {
    dispatch(checkSaleSupportSuccess(saleSupportMessage))
  } catch (error) {
    dispatch(alertError(error))
  }
}
const checkSaleSupportSuccess = saleSupportMessage => ({
  type: 'CHECK_SALE_SUPPORT_SUCCESS',
  payload: { saleSupportMessage }
})

export const getSearchLocation = ({ type, locationId }) => async dispatch => {
  try {
    const { province, city } = await Global.postLocation({ type, locationId })
    dispatch(getSearchLocationSuccess({ searchProvince:province, searchCity:city }))
  } catch (error) {
    dispatch(alertError(error))
  }
}
const getSearchLocationSuccess = ({ searchProvince, searchCity }) => ({
  type: 'GET_SEARCH_LOCATION_SUCCESS',
  payload: { searchProvince, searchCity }
})

// 今日特卖
export const specialSale = ({ type, communityId }) => async dispatch => {
  try {
    const res = await homePage.promotion({ type, communityId })
    dispatch(specialSaleSuccess(res))
  } catch (error) {
    dispatch(alertError(error))
  }
}
const specialSaleSuccess = (res) => ({
  type: 'SPECIALSALE_SUCCESS',
  payload: { res }
})