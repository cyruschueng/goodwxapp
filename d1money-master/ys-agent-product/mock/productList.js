const express = require('express')
const router = express.Router()
const Mock = require('mockjs')
const Random = Mock.Random

let ResultMap = {
    code: 'SUCCESS',
    msg: '成功',
    body: null
}
/***
 * 海报所有类型接口
 */
router.post('/agent/product/services/loadAllType', (req, res) => {
    const names = ['推荐', '正能量', '金句', '理念', '节日', '产品', '产品1', '产品2', '产品3', '产品4']
    const mockData = Mock.mock({
        code: 'SUCCESS',
        msg: '成功',
        'body|10': [
            {
                'id|+1': 1,
                createtime: '@date(T)',
                description: 'hahaha',
                'name|1': names,
                order: 0,
                updatetime: '@date(T)'
            }
        ]
    })
    res.json(mockData)
})

/***
 * 分页获取产品列表
 */
router.post('/agent/product/services/loadListByUser', (req, res) => {
    const mockData = Mock.mock({
        'list|9': [
            {
                'id|+1': 1,
                // 标题
                name: '@cword(3, 5)',
                // 副标题
                subtitle: '@cword(5, 9)',
                'iscommend|0-1': 0,
                // 背景图
                bigimgsrc: '@image(100x170, @hex())',
                'typeid|0-1': 0,
                // 总购买
                'totalbuytcount|1-100': 1,
                // 总转发
                'totalsharecount|1-100': 1,
                // 总阅读
                'totalreadcount|1-100': 1
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

// 推荐
router.post('/agent/product/services/commendByid', (req, res) => {
    ResultMap.body = true
    res.json(ResultMap)
})
module.exports = router
