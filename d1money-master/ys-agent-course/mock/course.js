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
 * 课程所有类型接口
 */
router.post('/agent/curriculum/services/loadCurriculumType', (req, res) => {
    const names = ['web前端', 'Java', '大数据', '人工智能', 'VR技术', 'Python']
    const mockData = Mock.mock({
        code: 'SUCCESS',
        msg: '成功',
        'body|5': [
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
router.post('/agent/curriculum/services/loadCurriculumList', (req, res) => {
    const mockData = Mock.mock({
        'list|9': [
            {
                'id|+1': 1,
                title: '@cword(3, 5)',
                introduce: '@cparagraph(1)',
                imgsrc: '@image(200x100, @hex())',
                'learncount|1-100': 1000
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
module.exports = router
