// /**
//  * 签到榜头信息
//  */
// exports.getGroupHeader = ({ id }) => {
//   return _request({
//     url: '/checkin/header',
//     data: {
//       communityId: id
//     }
//   })
// }

// /**
//  * 签到首页
//  */
// exports.getSignData = ({ id }) => {
//   return _request({
//     url: '/checkin/init',
//     data: {
//       communityId: id
//     }
//   })
// }

// /**
//  * 签到列表
//  */
// exports.getGroupRankList = ({ id, page = 1, limit = 5 }) => {
//   return _request({
//     url: '/checkin/list',
//     data: {
//       communityId: id,
//       p: page,
//       size: limit
//     }
//   })
// }

// /**
//  * 群动态
//  */
// exports.getGroupTimelineList = ({ id, page = 1, limit = 10 }) => {
//   return _request({
//     url: '/community/dynamic',
//     data: {
//       communityId: id,
//       p: page,
//       size: limit
//     }
//   })
// }

// /**
//  * 进群领取优惠券
//  */
// exports.getGroupCoupon = ({ id }) => {
//   return _request({
//     url: '/prize/send-coupon',
//     data: {
//       communityId: id
//     }
//   })
// }

// /**
//  * 签到
//  */
// exports.groupSign = ({ id }) => {
//   return _request({
//     url: '/checkin',
//     data: {
//       communityId: id
//     }
//   })
// }


// /**
//  * 发送验证码
//  */
// exports.sendCode = ({ phone }) => {
//   return _request({
//     url: '/sms/register',
//     method:'GET',
//     data: { phone }
//   })
// }

// /**
//  *  获取验证码
//  */
// exports.bindPhone = ({ mobile : phone, captcha }) => {
//   return _request({
//     url: '/user/bind-phone',
//     data: {
//       mobile : phone,
//       captcha
//     }
//   })
// }

// /**
//  *  提交用户信息
//  */
// exports.submitUser = obj => {
//   return _request({
//     url: '/user/apply-saler',
//     data: obj
//   })
// }

// /**
//  * 记录错误信息
//  */
// exports.errorMessage = obj => {
//   return _request({
//     url: '/user/error-record',
//     data: obj
//   })
// }

// /**
//  * push log 到服务器上
//  */
// exports.log = msg => {
//   return _request({
//     url: '/user/error-record',
//     data: {
//       errorRecord: msg
//     }
//   })
// }

// /**
//  * 热销榜单信息  hotListType: ['hours', 'days']
//  */
// exports.findList = ({ id, hotListType }) => {
//   return _request({
//     url: '/community/Leaderboard',
//     data: {
//       communityId: id,
//       hotListType: hotListType === 'daySale' ? 2 : 1
//     }
//   })
// }

// /**
//  *  发现晒单列表
//  */
// exports.shareOrderList = ({ id, page = 1, limit = 10, maxId }) => {
//   return _request({
//     url: '/merchandise/share-order-list',
//     data: {
//       communityId: id,
//       p: page,
//       size: limit,
//       maxId: maxId
//     }
//   })
// }
// /**
//  * 获取群信息
//  */
// exports.apiJsglobal = () => {
//   return _request({
//     url: '/api/jsglobal',
//     data: {
//       ver: '2.0.0'
//     }
//   })
// }
// /**
//  * 定位城市
//  */
// // exports.locationCity = ({lat, lng}) => {
// //   return _request({
// //     url: '/location/district',
// //     method: 'GET',
// //     url: `${API_ROOT}/location/coordinate`,
// //     data: { lat, lng}
// //   })
// // }
// /**
//  * 地区列表
//  */

// /**
//  * 保存所在位置
//  */
// exports.saveLocation = () => {
//   return _request({
//     url: '/location/savelocation',
//     data: {

//     }
//   })
// }



