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
 * 获取文章详情
 */
router.post('/cust/article/services/loadArticleDetail', (req, res) => {
    const mockData = Mock.mock({
        code: 'SUCCESS',
        msg: '成功',
        body: {
            'readcount': 20,
            'commentcount': 1,
            'shareuserid': 32,
            'articleRedis': {
                'id': 'C2PL3JuGJNTLl9xCeVRi5l',
                'userid': 9,
                'corpid': -999999,
                'title': '测试发布',
                'content': '@cparagraph(3,8)',
                'description': '测试发布',
                'imgsrc': 'http://pkufi.qn.d1money.com/pic/201712/18/1513576801243220829.jpg',
                'sourceid': 3,
                'publishtime': '2017-12-18 14:00:01',
                'updatetime': '2017-12-18 14:00:04'
            },
            'ThumbsUpUser': [
                {
                    'createtime': '2018-01-11 00:18:13',
                    'nickname': '188',
                    'headurl': 'http://pkufi.qn.d1money.com/head/201801/11/32/46.jpg?v=1516099578471',
                    'id': 32,
                    'type': 1
                },
                {
                    'createtime': '2018-01-11 00:19:04',
                    'nickname': '李大头',
                    'headurl': 'http://pkufi.qn.d1money.com/head/201801/11/11/46.jpg?v=1516099578490',
                    'id': 11,
                    'type': 1
                }
            ],
            'userthumbsupcount': 1,
            'sourcename': '央视网',
            'thumbsupcount': 2,
            'shortcontent': '新华社大马士革１２月１１日电（记者郑一晗）俄罗斯总统普京１１日在俄罗斯驻叙利亚赫'
        }
    })
    res.json(mockData)
})


/***
 * 获取文章评论数据
 */
router.post('/cust/article/services/loadArticleCommentList', (req, res) => {
    const mockData = Mock.mock({
        'list|1-7': [
            {
                'replyCount': 1,
                'createtime': '@datatime(T)',
                'nickname': '@cname()',
                'articlecommentReplyList': [
                    {
                        'createtime': '2018-01-11 00:19:04',
                        'nickname': '@cname()',
                        'id': 11,
                        'type': 1,
                        'content': '@cparagraph(1)'
                    }
                ],
                'commentid': 1,
                'commentheadurl': '@image(55x55, @hex())',
                'id': 32,
                'type': 1,
                'content': '@cparagraph(1)'
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
 * 获取自定义组件
 */
router.post('/cust/component/services/loadComponentList', (req, res) => {
    const mockData = Mock.mock({
        'sort': ['fpCard', 'articleList', 'activityList', 'videoList', 'productList', 'fpUserEWM'],
        'fpCard': {
            'wx_ewm': 'http://wmimage.qn.d1money.com/head/201712/01/10/wx_ewm.jpg?v=1516169637273',
            'mobile': '17853593651',
            'headurl': 'http://wmimage.qn.d1money.com/head/201712/01/10/46.jpg?v=1516169637213',
            'realname': '高世超',
            'corpname': '北大方正'
        },
        'articleList|1-2': [{
            id: 'AO-3RAw69FjIuD9Wo7AGfl',
            imgSrc: '@image(200x100, @hex())',
            title: '@cword(8, 32)',
            sourcename: '@cword(3,5)',
            publishtime: '@datatime()',
            introduce: '@cparagraph(1)',
            'commentcount|1-100': 1000,
            'thumbsupcount|1-100': 1000,
            'readcount|1-100': 1000
        }],
        'videoList|1-2': [{
            'id|+1': 1,
            title: '@cword(3, 5)',
            introduce: '@cparagraph(1)',
            videoImg: '@image(200x100, @hex())',
            'playcount|1-100': 1000,
            'thumbsupcount|1-100': 1000,
            'sharedcount|1-100': 1000
        }],
        'activityList|1-2': [{
            'id|+1': 1,
            // 标题
            name: '@cword(3, 5)',
            // 副标题
            subtitle: '@cword(5, 9)',
            // 背景图
            bigimgsrc: '@image(100x170, @hex())',
            begintime: '@datetime',
            endtime: '@datetime',
            'typeid|0-1': 0,
            // 总接受
            'totalacceptcount|1-100': 1,
            // 总转发
            'totalsharecount|1-100': 1,
            // 总阅读
            'totalreadcount|1-100': 1
        }],
        'productList|1-2': [{
            'id|+1': 1,
            // 标题
            name: '@cword(3, 5)',
            // 副标题
            subtitle: '@cword(5, 9)',
            // 背景图
            bigimgsrc: '@image(100x170, @hex())',
            'typeid|0-1': 0,
            // 总接受
            'totalbuycount|1-100': 1,
            // 总转发
            'totalsharecount|1-100': 1,
            // 总阅读
            'totalreadcount|1-100': 1
        }],
        'fpUserEWM': {
            url: 'http://wmimage.qn.d1money.com/head/201712/01/10/wx_ewm.jpg?v=1516169637273'
        }
    })
    ResultMap.body = mockData
    res.json(ResultMap)
})

module.exports = router
