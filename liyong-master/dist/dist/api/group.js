import { _request } from './_request'

// begin: 群管理相关操作
exports.getCurrentGroup = ({ encryptedData, iv }) => {
  return _request({
    url: '/community/info',
    data: { encryptedData, iv }
  })
}

exports.getMineOtherGroups = () => {
  return _request({
    url: '/community/mine',
  })
}

exports.cancelGroup = ({ id }) => {
  return _request({
    url: '/community/cancel',
    data: {
      communityId: id,
    }
  })
}

exports.promoteGroup = ({ id }) => {
  return _request({
    url: '/community/promotion',
    data: {
      communityId: id,
    }
  })
}

exports.cancelPromoteGroup = ({ id }) => {
  return _request({
    url: '/community/cancelPromotion',
    data: {
      communityId: id,
    }
  })
}

exports.getGroupShare = ({ id }) => {
  return _request({
    url: '/community/share',
    data: { communityId: id }
  })
}

/**
 * 认领群
 * @param  {String}  options.openGId    微信群 ID
 * @param  {String}  options.remark     群备注
 * @param  {Boolean} options.setQrcode  是否上传二维码
 * @param  {String}  options.qrcode     群二维码 URL
 */
exports.claimGroup = ({ formId, id, openGId, remark, setQrcode, qrcode }) => {
  return _request({
    url: '/community/claim',
    data: {
      formId,
      wechatOpenGId: openGId,
      communityId: id,
      communityRemark: remark,
      communityType: setQrcode ? 0 : 1,
      qrCodeUrl: qrcode
    }
  })
}

/**
 * 申述群
 * @param  {String} options.id 微信群 ID
 * @param  {String} options.qrcode  群二维码 URL
 */
exports.appealGroup = ({ id, qrcode }) => {
  return _request({
    url: '/community/complaint',
    data: {
      communityId: id,
      pictureUrl: qrcode
    }
  })
}

exports.getGroup = ({ id }) => {
  return _request({
    url: '/community/query/status',
    data: { communityId: id }
  })
}

exports.updateGroup = ({ formId, id, remark, setQrcode, qrcode }) => {
  return _request({
    url: '/community/change/status',
    data: {
      formId,
      communityId: id,
      communityRemark: remark,
      communityType: setQrcode ? 0 : 1,
      qrcodeUrl: qrcode
    }
  })
}
// end: 群管理相关操作

exports.getMerch = ({ merchId, groupId }) => {
  return _request({
    url: '/merchandise/details',
    data: { communityId: groupId, merchandiseId: merchId }
  })
}

exports.getMerchShareOrderList = ({ merchId, groupId, page = 1, limit = 10 }) => {
  return _request({
    url: '/merchandise/merchandise-share-order-list',
    data: { communityId: groupId, merchandiseId: merchId, p: page, size: limit }
  })
}

exports.getMerchPayOrderList = ({ merchId, grouponId, page = 1, limit = 10 }) => {
  const url = grouponId ? '/merchandise/groupon/payorders' : '/merchandise/payorders'
  const data = grouponId ? { grouponId } : { merchandiseId: merchId }
  return _request({
    url,
    data: { ...data, p: page, size: limit }
  })
}

exports.putMerchSubscribe = ({ grouponId, merchId }) => {
  return _request({
    url: '/merchandise/subscribe',
    data: { grouponId, merchandiseId: merchId, subscribeType: 2 }
  })
}

exports.putMerchTypeSubscribe = ({ grouponId, merchId, merchTypeId }) => {
  return _request({
    url: '/merchandise/subscribe',
    data: { grouponId, merchandiseId: merchId, merchTypeId, subscribeType: 1 }
  })
}

exports.putGrouponSlogon = ({ grouponId, slogon }) => {
  return _request({
    url: '/merchandise/editgroupon',
    data: { grouponId, slogon }
  })
}

// 获取地址默认地址 如果满足要求
exports.getDefaultAddressByMerchId = merchId => {
  return _request({
    url: '/address/getShoppingAddress',
    data: { merchandiseId: merchId }
  })
}

exports.getAddressIdsByMerchId = merchId => {
  return _request({
    url: '/address/listShoppingAddress',
    data: { merchandiseId: merchId }
  })
}

exports.toPay = id => {
  return _request({
    url: '/order/to-pay',
    data: { orderId: id }
  })
}

/**
 * @param  {Object} obj
 * { merchandiseId, recommendUserId, addressId, userCouponId, giftCardIds, gold, giftCardMoney, suborderListStr }
 * `suborderListStr` [{ grouponId, merchTypeId, grouponRuleId, quantity }]
 */
exports.postOrder = obj => {
  obj = { ...obj, orderType: 1, }
  return _request({
    url: '/order/pay-trade-order',
    data: obj
  })
}
