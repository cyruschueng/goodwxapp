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
 * 获取客户详情
 */
router.post('/agent/customer/services/loadCustomerdetail', (req, res) => {
    const mockData = Mock.mock({
        code: 'SUCCESS',
        msg: '成功',
        body: {
            'customeruserid': 12,
            'realname': '@cname()',
            'minlevel|1-3': 1,
            'phonenum': 13791128652,
            'birthday': '2017-01-12',
            'countlist|1-3': [{
                typename: '@cname()',
                'totalcount|1-100': 1
            }]
        }
    })
    res.json(mockData)
})
/***
 * 修改客户详情
 */
router.post('/agent/customer/services/updateCustomerdetail', (req, res) => {
    const mockData = Mock.mock({
        code: 'SUCCESS',
        msg: '成功',
        body: true
    })
    res.json(mockData)
})

module.exports = router
