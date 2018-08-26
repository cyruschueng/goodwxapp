import { _request } from './_request'
import { ORDER_TYPE } from '../constants'

const formatToConstKey = str => {
  return str.replace(/([A-Z])/g, '_$1').toUpperCase()
}
/**
 * 个人中心信息
 */
exports.getProfile = _ => {
  return _request({
    url: '/user/mine-info'
  })
}
/**
 * 订单列表
 */
exports.getOrderList = ({ orderType, page = 1, limit = 10}) => {
  orderType = ORDER_TYPE[formatToConstKey(orderType)]
  return _request({
    url: '/order/list',
    data: { orderType, p: page, size: limit }
  })
}
/**
 * 指定订单详情
 */
exports.getOrder = id => {
  return _request({
    url: '/order/detail',
    data: { orderId: id }
  })
}
/**
 * 确认收货
 */
exports.putOrderConfirm = id => {
  return _request({
    url: '/order/confirmgoods',
    data: { orderId: id }
  })
}
/**
 * 创建晒单
 */
exports.postShareOrder = ({ orderId, merchId, expressId, description, stars, images }) => {
  return _request({
    url: '/shareorder/create',
    data: {
      orderId,
      expressId,
      description,
      merchandiseId: merchId,
      grade: stars,
      imageUrl: images
    }
  })
}
/**
 * 晒单详情
 */
exports.getShareOrder = ({ orderId, expressId, merchId }) => {
  return _request({
    url: '/shareorder/show',
    data: { orderId, expressId, merchandiseId: merchId }
  })
}
/**
 * 省市区列表
 */
exports.getPCD = merchId => {
  return _request({
    url: '/address/listPcd',
    data: {
      merchandiseId: merchId
    }
  })
}
/**
 * 地址种类列标表
 */
exports.getAddressTagList = () => {
  return _request({
    url: '/address/listCategory'
  })
}
/**
 * 收货地址列表
 */
exports.getAddressList = _ => {
  return _request({
    url: '/address/list'
  })
}
/**
 * 删除地址
 */
exports.deleteAddress = id => {
  return _request({
    url: '/address/delete',
    data: { addressId: id }
  })
}
/**
 * 设置默认地址
 */
exports.putAddressDefault = id => {
  return _request({
    url: '/address/setDefault',
    data: { addressId: id }
  })
}
/**
 * 创建地址
 */
exports.postAddress = obj => {
  return _request({
    url: '/address/create',
    data: obj
  })
}
/**
 * 详细信息
 */
exports.getAddress = id => {
  return _request({
    url: '/address/detail',
    data: { addressId: id }
  })
}
/**
 * 编辑地址
 */
exports.putAddress = obj => {
  return _request({
    url: '/address/update',
    data: obj
  })
}

exports.getCouponList = ({ isExpired = false, page = 1, limit = 10 }) => {
  return _request({
    url: '/coupon/myCoupons',
    data: { expire: ~~!isExpired, p: page, size: limit, category: 1 }
  })
}
/**
 * 兑换优惠券
 */
exports.postCouponCode = code => {
  return _request({
    url: '/coupon/exchangeCoupon',
    data: { couponCode: code }
  })
}

exports.getGiftCardList = ({ isExpired = false, page = 1, limit = 100 }) => {
  return _request({
    url: '/coupon/myCoupons',
    data: { expire: ~~!isExpired, p: page, size: limit, category: 3 }
  })
}
/**
 * 兑换礼品卡
 */
exports.postGiftCardCode = code => {
  return _request({
    url: '/coupon/exchangeCoupon',
    data: { couponCode: code }
  })
}
/**
 * 礼品卡流水
 */
exports.getGiftCardRecordList = ({ id, page = 1, limit = 10 }) => {
  return _request({
    url: '/coupon/giftCardTarde',
    data: { usercouponId: id, p: page, size: limit }
  })
}

exports.getExpress = id => {
  return _request({
    url: '/express/queryexpress',
    data: { expressId: id }
  })
}

exports.getDailySign = id => {
  return _request({
    url: '/checkin/init',
    data: { communityId: id }
  })
}

exports.postDailySign = id => {
  return _request({
    url: '/checkin',
    data: { communityId: id }
  })
}
/**
 * 检查优惠券的状态(领取或未领取的优惠券)
 */
exports.getGroupCoupon = ({ id }) => {
  return _request({
    url: '/prize/check-send-coupon',
    data: {
      communityId: id
    }
  })
}

/**
 * 领取优惠券
 */
exports.postGroupCoupon = ({ id }) => {
  return _request({
    url: '/prize/send-coupon',
    data: {
      communityId: id
    }
  })
}

exports.getCoin = _ => {
  return _request({
    url: '/gold',
    method: 'POST'
  })
}

exports.getCoinRecordList = ({ page, limit }) => {
  return _request({
    url: '/gold/trade',
    data: { p: page, size: limit }
  })
}

/**
 * @param  {Object} obj
 * { suborderId, damageCount, phone, serviceReason, reasonDesc, imageList }
 */
exports.postSaleSupport = obj => {
  return _request({
    url: '/saleSupport/apply-sale-support',
    data: obj
  })
}

/**
 * 抽奖初始化
 */
exports.getLuckDrawData = ({ id }) => {
  return _request({
    url: '/prize/init',
    data: { communityId: id }
  })
}

/**
 * 抽奖
 */
exports.luckDraw = ({ id }) => {
  return _request({
    url: '/prize/draw',
    data: { communityId: id}
  })
}


