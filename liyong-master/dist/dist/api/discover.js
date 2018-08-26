import _request from './_request'
import { ORDER_TYPE } from '../constants'

const formatToConstKey = str => {
  return str.replace(/([A-Z])/g, '_$1').toUpperCase()
}

/**
 *  发现晒单列表
 */
exports.shareOrderList = ({ id, page = 1, limit = 10 }) => {
  return _request({
    url: '/merchandise/share-order-list',
    data: {
      communityId: id,
      p: page,
      size: limit
    }
  })
}


/**
 * 热销榜
 * hotListType: ['daySale', 'weekSale']
 */
exports.findList = ({ id, hotListType }) => {
  return _request({
    url: '/community/Leaderboard',
    data: {
      communityId: id,
      hotListType: hotListType === 'daySale' ? 2 : 1
    }
  })
}

/**
 * 签到榜
 */
exports.groupSign = ({ id }) => {
  return _request({
    url: '/checkin',
    data: {
      communityId: id
    }
  })
}

