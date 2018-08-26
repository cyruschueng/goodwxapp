const apiurl = 'https://friend-guess.playonwechat.com' //域名

const auth = apiurl + '/api/auth-by-three' // 授权

const saveUserInfo = apiurl + '/api/save-user-info' // 保存用户信息

module.exports = {
	auth,
	saveUserInfo
}