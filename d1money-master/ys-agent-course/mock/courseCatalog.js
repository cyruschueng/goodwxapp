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
router.post('/agent/curriculum/services/loadCurriculumLessonDetail', (req, res) => {
    const mockData = Mock.mock({
        code: 'SUCCESS',
        msg: '成功',
        'body': {
            // 课程id
            'curriculumid|+1': 1,
            // 课时id
            'id|+1': 1,
            // 课时文件
            fileid: '4564972818749501733',
            // 课时名称
            title: '@cword(3, 5)',
            // 类型名称
            typename: '类型名称',
            // 课时图片
            imgsrc: '@image(200x100, @hex())',
            // 课时介绍
            introduce: '@cparagraph(1)',
            // 讲师名称
            lecturer: '@cname',
            // 讲师介绍
            lecturerintro: '@cparagraph(1-3)',
            // 当前用户是否已点赞
            userthumbsup: 0,
            'playcount|1-100': 1000,
            // 点赞数
            'thumbsupcount|1-100': 1000
        }
    })
    res.json(mockData)
})

/***
 * 获取课时
 */
router.post('/agent/curriculum/services/loadCurriculumLessonList', (req, res) => {
    const mockData = Mock.mock({
        code: 'SUCCESS',
        msg: '成功',
        body: {
            curriculum: {
                'id|+1': 1,
                title: '@cword(3, 5)',
                introduce: '@cparagraph(1)',
                imgsrc: '@image(200x100, @hex())'
            },
            'list|3-9': [
                {
                    // 课程id
                    'curriculumid|+1': 1,
                    // 课时id
                    'id|+1': 1,
                    // 课时名称
                    title: '@cword(3, 5)',
                    // 课时图片
                    imgsrc: '@image(200x100, @hex())',
                    // 课时介绍
                    introduce: '@cparagraph(1)',
                    // 讲师名称
                    lecturer: '@cname',
                    'learncount|1-100': 1000
                }
            ]
        }
    })
    res.json(mockData)
})
module.exports = router
