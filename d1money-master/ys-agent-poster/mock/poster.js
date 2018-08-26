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
router.post('/agent/poster/services/loadAllPosterType', (req, res) => {
    const names = ['推荐', '正能量', '金句', '理念', '节日', '产品']
    const mockData = Mock.mock({
        code: 'SUCCESS',
        msg: '成功',
        'body|6': [
            {
                'id|+1': 1,
                createtime: '@date(T)',
                'description|+1': names,
                'name|1': names,
                order: 0,
                updatetime: '@date(T)'
            }
        ]
    })
    res.json(mockData)
})

/***
 * 根据typeid获取海报数据
 */
router.post('/agent/poster/services/loadAllcorpPostersByTypeid', (req, res) => {
    const mockData = Mock.mock({
        'list|9': [
            {
                'id|+1': 1,
                title: '@cword(3, 5)',
                imgsrc: '@image(100x170, @hex())'
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
 * 增加海报点击量
 */
router.post('/agent/poster/services/addClickRecord', (req, res) => {
    ResultMap.body = 'SUCCESS'
    res.json(ResultMap)
})
module.exports = router
