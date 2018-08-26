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
 * 视频所有类型接口
 */
router.post('/agent/video/services/loadAllCorpVedioType', (req, res) => {
    const names = ['推荐', '精选', '理财师', '全球投资', '微营销', '微课']
    const mockData = Mock.mock({
        code: 'SUCCESS',
        msg: '成功',
        'body|5': [
            {
                'id|+1': 1,
                createtime: '@date(T)',
                'description|+1': names,
                'name|+1': names,
                order: 0,
                updatetime: '@date(T)'
            }
        ]
    })
    res.json(mockData)
})

/***
 * 根据typeid获取视频数据
 */
router.post('/agent/video/services/loadVedioListByType', (req, res) => {
    const mockData = Mock.mock({
        'list|9': [
            {
                'id|+1': 1,
                title: '@cword(3, 5)',
                introduce: '@cparagraph(1)',
                videoImg: '@image(200x100, @hex())',
                'playcount|1-100': 1000,
                'thumbsupcount|1-100': 1000,
                'sharedcount|1-100': 1000
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
