const http = require('./request.js');

/**登录接口 */
const login = (params, success, fail) =>{
  return http.request('/v1/auth/login', params, success, fail)
}
/**游戏积分上报 */
const gamePoint = (params, success, fail) => {
  return http.request('/v1/bi/game-point', params, success, fail)
}
/**排行列表 */
const rank = (params, success, fail) => {
  return http.request('/v1/bi/rank', params, success, fail)
}
/**更新用户信息 */
const updateUserInfo = (params, success, fail) => {
  return http.request('/v1/user/update-userinfo', params, success, fail)
}
/** 获取用户信息 */
const userInfo = (params, success, fail) => {
  return http.request('/v1/user/info', params, success, fail)
}
/** 检查是否还能继续游戏 */
const isPlayGame = (params, success, fail) => {
  return http.request('/v1/bi/check-game', params, success, fail)
}
/** 分享上报 */
const submitShare = (params, success, fail) => {
  return http.request('/v1/bi/share', params, success, fail)
}
/*检查当天是否还能继续游戏*/
const isPlayGameDay = (params, success, fail) => {
  return http.request('/v1/bi/check-day-game', params, success, fail)
}
/*获取游戏续命次数*/
const gameTime = (params, success, fail) => {
  return http.request('/v1/bi/game-time', params, success, fail)
}

module.exports = {
  login: login,
  gamePoint: gamePoint,
  rank: rank,
  userInfo: userInfo,
  updateUserInfo: updateUserInfo,
  isPlayGame: isPlayGame,
  submitShare: submitShare,
  isPlayGameDay: isPlayGameDay,
  gameTime: gameTime
}