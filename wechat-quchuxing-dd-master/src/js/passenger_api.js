let extConfig = wx.getExtConfigSync? wx.getExtConfigSync(): {}

const API_ROOT = extConfig.host || `https://t1.passenger.quchuxing.com.cn`

const api = require('./apiUtils')

import { _apiPOST, _apiGET, _apiPUT, _apiDELETE } from './apiUtils'

const REQUEST_TYPE = ['GET','POST','PUT','DELETE']

// export const getActivitiesInfo = (id, options) => _apiGET(`${API_ROOT}/activities/${id}`,options)
//
// 乘客最近行程 /travel/latestOne
export const getPassengerRecentTrip = (options) => _apiPOST(`${API_ROOT}/travel/latestOne`, options)

// 乘客创建行程 /travel/passenger/create
export const postJounrey = (options) => _apiPOST(`${API_ROOT}/travel/passenger/createlv1`, options)

// 乘客匹配车主 /travel/matching
export const postMatchCompany = (options) => _apiPOST(`${API_ROOT}/travel/matching`, options)

// 匹配乘客 /travel/matching/passenger
export const postMatchPeople = (options) => _apiPOST(`${API_ROOT}/travel/matching/passenger`, options)

// 支付
export const postPay = (options) => _apiPOST(`${API_ROOT}/orders/createlv4`, options)

//  /orders/Travel 行程列表
export const getMineTraval = (options) => _apiPOST(`${API_ROOT}/orders/travel`, options)

// 乘客关闭匹配 /travel/changeTravelStatus
export const deleteTraval = (options) => _apiPOST(`${API_ROOT}/travel/changeTravelStatus`, options)

// 取消支付
export const closeWxPay = (options) => _apiPOST(`${API_ROOT}/orders/cancel`, options)

// 获取价格区间 /orders/computePricelv1
export const getComputePricelv1 = (options) => _apiPOST(`${API_ROOT}/orders/computePricelv1`, options)

// 乘客取消行程 /orders/refundlv2
export const deletePeopleTravel = (options) => _apiPOST(`${API_ROOT}/orders/refundlv2`, options)

// /orders/up 乘客标记上车
export const clickOnTheTrain = (options) => _apiPOST(`${API_ROOT}/orders/up`, options)

// /orders/Travel 查看好友发布的行程
export const getFriendsItinerary = (options) => _apiPOST(`${API_ROOT}/orders/Travel`, options)

// 乘客完成行程 下车 /orders/down
export const passengerDown = (options) => _apiPOST(`${API_ROOT}/orders/down`, options)

// 标记车主迟到
export const markedLate = (options) => _apiPOST(`${API_ROOT}/orders/late`, options)

//https://t1.passenger.quchuxing.com.cn/travel/detailv1 行程详情
export const travelDetails = (options) => _apiPOST(`${API_ROOT}/travel/detailv1`, options)

// 乘客下单前取消行程接口 /travel/cancel
export const beforePassengerDelete = (options) => _apiPOST(`${API_ROOT}/travel/cancel`, options)

// 查询未支付订单
export const getUnpaidOrders = (options) => _apiPOST(`${API_ROOT}/orders/nopaylv1`, options)
