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
router.post('/agent/course/services/loadAllCorpVedioType', (req, res) => {
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
router.post('/agent/course/services/loadVedioListByType', (req, res) => {
    const mockData = Mock.mock({
        // 'list|9': [
        //     {
        //         'id|+1': 1,
        //         title: '@cword(3, 5)',
        //         introduce: '@cparagraph(1)',
        //         videoImg: '@image(200x100, @hex())',
        //         'playcount|1-100': 1000,
        //         'thumbsupcount|1-100': 1000,
        //         'sharedcount|1-100': 1000
        //     }
        // ],
        list: [
            {
                id: 1,
                title: '赛艇活动',
                introduce: '端午节,赛艇活动',
                courseImg: 'http://wmimage.qn.d1money.com/video/728.jpg-videoCardShareStyle',
                'playcount|1-100': 1000,
                'thumbsupcount|1-100': 1000,
                'sharedcount|1-100': 1000
            },
            {
                id: 2,
                title: '第一财富网对话理财师 - 吴萍',
                introduce: '第一财富网对话理财师 - 吴萍',
                courseImg: 'http://wmimage.qn.d1money.com/video/681.jpg-videoCardShareStyle',
                'playcount|1-100': 1000,
                'thumbsupcount|1-100': 1000,
                'sharedcount|1-100': 1000
            },
            {
                id: 3,
                title: '第一财富网对话理财师 - 储花梅',
                introduce: '第一财富网对话理财师 - 储花梅',
                courseImg: 'http://wmimage.qn.d1money.com/video/669.jpg-videoCardShareStyle',
                'playcount|1-100': 1000,
                'thumbsupcount|1-100': 1000,
                'sharedcount|1-100': 1000
            },
            {
                id: 4,
                title: '公司宣传片',
                introduce: '第一财富网公司宣传记录片',
                courseImg: 'http://wmimage.qn.d1money.com/video/662.jpg-videoCardShareStyle',
                'playcount|1-100': 1000,
                'thumbsupcount|1-100': 1000,
                'sharedcount|1-100': 1000
            },
            {
                id: 5,
                title: '桐湾投资 宣传片',
                introduce: '桐湾投资宣传纪录片',
                courseImg: 'http://wmimage.qn.d1money.com/video/661.jpg-videoCardShareStyle',
                'playcount|1-100': 1000,
                'thumbsupcount|1-100': 1000,
                'sharedcount|1-100': 1000
            },
            {
                id: 6,
                title: '金融大爆炸 - 第5期',
                introduce: '金融大爆炸 - 第5期',
                courseImg: 'http://wmimage.qn.d1money.com/video/552.jpg-videoCardShareStyle',
                'playcount|1-100': 1000,
                'thumbsupcount|1-100': 1000,
                'sharedcount|1-100': 1000
            },
            {
                id: 7,
                title: '金融大爆炸 - 第3期 TOM猫',
                introduce: '金融大爆炸 - 第3期 TOM猫',
                courseImg: 'http://wmimage.qn.d1money.com/video/519.jpg-videoCardShareStyle',
                'playcount|1-100': 1000,
                'thumbsupcount|1-100': 1000,
                'sharedcount|1-100': 1000
            },
            {
                id: 8,
                title: '全国十佳理财师网络视频人气大赛-杨洋',
                introduce: '全国十佳理财师网络视频人气大赛-杨洋',
                courseImg: 'http://wmimage.qn.d1money.com/video/105.jpg-videoCardShareStyle',
                'playcount|1-100': 1000,
                'thumbsupcount|1-100': 1000,
                'sharedcount|1-100': 1000
            },
            {
                id: 9,
                title: '赛艇活动',
                introduce: '端午节,赛艇活动',
                courseImg: 'http://wmimage.qn.d1money.com/video/681.jpg-videoCardShareStyle',
                'playcount|1-100': 1000,
                'thumbsupcount|1-100': 1000,
                'sharedcount|1-100': 1000
            },
            {
                id: 10,
                title: '赛艇活动',
                introduce: '端午节,赛艇活动',
                courseImg: 'http://wmimage.qn.d1money.com/video/681.jpg-videoCardShareStyle',
                'playcount|1-100': 1000,
                'thumbsupcount|1-100': 1000,
                'sharedcount|1-100': 1000
            }
        ],
        pageCount: 2,
        pageNo:
            0,
        pageSize:
            9,
        totalCount:
            18
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
