import { _request } from './_request'

exports.getSessionId = code => {
  return _request({
    url: '/signin/login',
    data: { code }
  })
}

exports.postUserInfo = ({ encryptedData, iv, code }) => {
  return _request({
    url: '/signin/register',
    data: { encryptedData, iv, code }
  })
}

exports.getIndex = ({ encryptedData, iv }) => {
  return _request({
    url: '/index',
    data: {
      encryptedData,
      iv,
    },
  })
}

exports.getSaleSupportReasonList = _ => {
  return _request({
    url: '/saleSupport/get-sale-support-reason',
    method: 'GET'
  })
}

exports.getCheckSaleSupport = suborderId => {
  return _request({
    url: '/saleSupport/check-sale-support',
    method: 'GET',
    data: { suborderId }
  })
}

// exports.locationCity = ({ lat, lng}) => {
//   return _request({
//     method: 'GET',
//     url:'/location/coordinate',
//     data: {
//       lat,
//       lng
//     }
//   })
// }
exports.getPCD = merchId => {
  return _request({
    url: '/address/listPcd',
    data: {
      merchandiseId: merchId
    }
  })
}

// get put delete post
exports.getLocation = ({ lat, lng }) => {
  return _request({
    method: 'GET',
    url:'/location/coordinate',
    data: {
      lat,
      lng
    }
  })
}
/**
 * 保存定位城市
 */

exports.postLocation = ({ provinceId, cityId }) => {
  // type: 1 省份, 2 城市
  const type = cityId ? 2 : 1
  const locationId = cityId || provinceId
  return _request({
    url: '/location/savelocation',
    data: {
      type,
      locationId
    }
  })
}


exports.allCityList = () => {
  return _request({
    method: 'GET',
    url: `/location/district`,
    data: {
    }
  })
}
