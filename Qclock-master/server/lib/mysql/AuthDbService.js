const uuidGenerator = require('uuid/v4')
const moment = require('moment')
const ERRORS = require('../constants').ERRORS
const mysql = require('./index')

/**
 * 储存用户信息
 * @param {object} userInfo
 * @param {string} sessionKey
 * @return {Promise}
 */
function saveUserInfo (userInfo, skey, sessionKey) {
    const uuid = uuidGenerator()
    const createTime = moment().format('YYYY-MM-DD HH:mm:ss')
    const lastVisitTime = createTime
    const openId = userInfo.openId
    const kUserInfo = JSON.stringify(userInfo)

    // 查重并决定是插入还是更新数据
    return mysql('cSessionInfo').count('open_id as hasUser').where({
        openId
    })
    .then(res => {
        // 如果存在用户则更新
        if (res[0].hasUser) {
            return mysql('cSessionInfo').update({
                uuid, skey, createTime, lastVisitTime, sessionKey, kUserInfo
            }).where({
                openId
            })
        } else {
            return mysql('cSessionInfo').insert({
                uuid, skey, createTime, lastVisitTime, openId, sessionKey, kUserInfo
            })
        }
    })
    .then(() => ({
        userinfo: userInfo,
        skey: skey
    }))
    .catch(e => {
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    })
}

/**
 * 通过 skey 获取用户信息
 * @param {string} skey 登录时颁发的 skey 为登录态标识
 */
function getUserInfoBySKey (skey) {
    if (!skey) throw new Error(ERRORS.DBERR.ERR_NO_SKEY_ON_CALL_GETUSERINFOFUNCTION)

    return mysql('cSessionInfo').select('*').where({
        skey
    })
}

module.exports = {
    saveUserInfo,
    getUserInfoBySKey
}
