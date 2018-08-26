const express = require('express')
const router = express.Router()
const Mock = require('mockjs')
const Random = Mock.Random
const {userImg} = require('./defaultParameter')

let ResultMap = {
    code: 'SUCCESS',
    msg: '成功',
    body: null
}
/***
 * 更新用户头像
 */
router.post('/agent/user/services/doUploaUserHeadImgSrc', (req, res) => {
    const mockData = Mock.mock({
        code: 'SUCCESS',
        msg: '成功',
        body: true
    })
    res.json(mockData)
})
/***
 * 更新二维码接口
 */
router.post('/agent/user/services/doUploaUserQRCardSrc', (req, res) => {
    const mockData = Mock.mock({
        code: 'SUCCESS',
        msg: '成功',
        body: true
    })
    res.json(mockData)
})
/***
 * 发送验证码接口
 */
router.post('/agent/user/services/sendVerificationCode', (req, res) => {
    const mockData = Mock.mock({
        code: 'SUCCESS',
        msg: '成功',
        body: true
    })
    res.json(mockData)
})

/***
 * 更新用户信息接口
 */
router.post('/agent/user/services/updateUser', (req, res) => {
    const mockData = Mock.mock({
        code: 'SUCCESS',
        msg: '成功',
        body: true
    })
    res.json(mockData)
})

module.exports = router
