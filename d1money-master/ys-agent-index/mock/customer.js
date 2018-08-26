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
 * 获取客户分级列表
 */
router.post('/agent/customer/services/selectAllCustomerGrade', (req, res) => {
    const names = ['普通客户', '中端', '高净值']
    const mockData = Mock.mock({
        code: 'SUCCESS',
        msg: '成功',
        'body|4': [
            {
                'id|+1': 1,
                'name|+1': names,
                order: 0
            }
        ]
    })
    res.json(mockData)
})
/***
 * 获取客户状态列表
 */
router.post('/agent/customer/services/selectAllCustomerState', (req, res) => {
    const names = ['可以沟通', '初步沟通', '一次拜访', '确定意向']
    const mockData = Mock.mock({
        code: 'SUCCESS',
        msg: '成功',
        'body|4': [
            {
                'id|+1': 1,
                'name|+1': names,
                order: 0
            }
        ]
    })
    res.json(mockData)
})

/***
 * 根据typeid获取视频数据
 */
router.post('/agent/customer/services/loadCustomerlist', (req, res) => {
    const mockData = Mock.mock({
        'list|4-9': [
            {
                'customeruserid|+1': 1,
                'headurl|+1': userImg,
                realname: '@cname',
                createtime: '@datetime',
                'minlevel|1-3': 1,  // 好友非好友
                typeicons: '看我文章|red|icon ,转发文章|blue|icon'
            }
        ],
        pageCount: 2,
        pageNo: 0,
        pageSize: 9,
        totalCount: 18
    })
    ResultMap.body = mockData
    res.json(ResultMap)
})
/***
 * 增加视频点击量
 */
router.post('/agent/poster/services/addClickRecord', (req, res) => {
    ResultMap.body = 'SUCCESS'
    res.json(ResultMap)
})
module.exports = router
