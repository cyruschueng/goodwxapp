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
 * 获取第一二身份和好文推荐
 */
router.post('/agent/article/services/articleClassification', (req, res) => {
    const mockData = Mock.mock({
        'tagTypelist': [
            {
                'id': 5,
                'name': '新的',
                'slogan': 'solgan',
                'description': '是是是',
                'imgsrc': '路径',
                'order': 2,
                'createtime': '2017-12-06 17:15:59',
                'updatetime': '2017-12-06 17:16:02',
                'articleTags': []
            },
            {
                'id': 3,
                'name': '北大方正',
                'slogan': '北大方正就是行',
                'description': '反反复复付付',
                'imgsrc': 'www.iww',
                'order': 1,
                'createtime': '2017-12-06 16:48:53',
                'updatetime': '2017-12-06 16:48:56',
                'articleTags': []
            },
            {
                'id': 1,
                'name': '每日财经',
                'slogan': '每日财经的标语',
                'description': null,
                'imgsrc': '',
                'order': null,
                'createtime': null,
                'updatetime': null,
                'articleTags': [
                    {
                        'id': 4,
                        'typeid': 1,
                        'name': '基金',
                        'slogan': null,
                        'iconclass': 'icon-jinrong',
                        'description': '基金啊基金 你就是坑爹啊',
                        'colorcode': '#5aa9f5',
                        'order': null,
                        'articlecount': 0,
                        'createtime': null,
                        'updatetime': null
                    },
                    {
                        'id': 5,
                        'typeid': 1,
                        'name': '股票',
                        'slogan': null,
                        'iconclass': 'icon-gupiao',
                        'description': null,
                        'colorcode': null,
                        'order': null,
                        'articlecount': 0,
                        'createtime': null,
                        'updatetime': null
                    },
                    {
                        'id': 24,
                        'typeid': 1,
                        'name': '基金4',
                        'slogan': null,
                        'iconclass': 'icon-jinrong',
                        'description': '基金啊基金 你就是坑爹啊',
                        'colorcode': '#5aa9f5',
                        'order': null,
                        'articlecount': 0,
                        'createtime': null,
                        'updatetime': null
                    },
                    {
                        'id': 25,
                        'typeid': 1,
                        'name': '基金5',
                        'slogan': null,
                        'iconclass': 'icon-jinrong',
                        'description': '基金啊基金 你就是坑爹啊',
                        'colorcode': '#5aa9f5',
                        'order': null,
                        'articlecount': 0,
                        'createtime': null,
                        'updatetime': null
                    },
                    {
                        'id': 26,
                        'typeid': 1,
                        'name': '基金6',
                        'slogan': null,
                        'iconclass': 'icon-jinrong',
                        'description': '基金啊基金 你就是坑爹啊',
                        'colorcode': '#5aa9f5',
                        'order': null,
                        'articlecount': 0,
                        'createtime': null,
                        'updatetime': null
                    }
                ]
            },
            {
                'id': 2,
                'name': '保险动态',
                'slogan': '保险动态标语',
                'description': null,
                'imgsrc': null,
                'order': null,
                'createtime': null,
                'updatetime': null,
                'articleTags': [
                    {
                        'id': 19,
                        'typeid': 2,
                        'name': '加的',
                        'slogan': null,
                        'iconclass': 'icon-jinrong',
                        'description': null,
                        'colorcode': 'red',
                        'order': 0,
                        'articlecount': 0,
                        'createtime': null,
                        'updatetime': null
                    },
                    {
                        'id': 1,
                        'typeid': 2,
                        'name': '每日推荐',
                        'slogan': null,
                        'iconclass': 'icon-jinrong',
                        'description': null,
                        'colorcode': 'red',
                        'order': null,
                        'articlecount': 0,
                        'createtime': null,
                        'updatetime': null
                    },
                    {
                        'id': 2,
                        'typeid': 2,
                        'name': '理财师',
                        'slogan': null,
                        'iconclass': 'icon-baoxian',
                        'description': '测试测试',
                        'colorcode': 'yellow',
                        'order': null,
                        'articlecount': 0,
                        'createtime': null,
                        'updatetime': null
                    },
                    {
                        'id': 3,
                        'typeid': 2,
                        'name': '金融',
                        'slogan': null,
                        'iconclass': 'icon-bao',
                        'description': null,
                        'colorcode': 'yellow',
                        'order': null,
                        'articlecount': 0,
                        'createtime': null,
                        'updatetime': null
                    },
                    {
                        'id': 14,
                        'typeid': 2,
                        'name': '1',
                        'slogan': null,
                        'iconclass': 'icon-jinrong',
                        'description': null,
                        'colorcode': 'red',
                        'order': null,
                        'articlecount': 0,
                        'createtime': null,
                        'updatetime': null
                    },
                    {
                        'id': 15,
                        'typeid': 2,
                        'name': '每日推荐3',
                        'slogan': null,
                        'iconclass': 'icon-jinrong',
                        'description': null,
                        'colorcode': 'red',
                        'order': null,
                        'articlecount': 0,
                        'createtime': null,
                        'updatetime': null
                    },
                    {
                        'id': 16,
                        'typeid': 2,
                        'name': '每日推荐4',
                        'slogan': null,
                        'iconclass': 'icon-jinrong',
                        'description': null,
                        'colorcode': 'red',
                        'order': null,
                        'articlecount': 0,
                        'createtime': null,
                        'updatetime': null
                    },
                    {
                        'id': 17,
                        'typeid': 2,
                        'name': '每日推荐5',
                        'slogan': null,
                        'iconclass': 'icon-jinrong',
                        'description': null,
                        'colorcode': 'red',
                        'order': null,
                        'articlecount': 0,
                        'createtime': null,
                        'updatetime': null
                    },
                    {
                        'id': 18,
                        'typeid': 2,
                        'name': '6',
                        'slogan': '',
                        'iconclass': 'icon-jinrong',
                        'description': '',
                        'colorcode': 'red',
                        'order': null,
                        'articlecount': 0,
                        'createtime': null,
                        'updatetime': null
                    },
                    {
                        'id': 20,
                        'typeid': 2,
                        'name': '每日推荐6',
                        'slogan': null,
                        'iconclass': 'icon-jinrong',
                        'description': null,
                        'colorcode': 'red',
                        'order': null,
                        'articlecount': 0,
                        'createtime': null,
                        'updatetime': null
                    }
                ]
            },
            {
                'id': 4,
                'name': '新的222',
                'slogan': null,
                'description': null,
                'imgsrc': null,
                'order': null,
                'createtime': null,
                'updatetime': null,
                'articleTags': []
            }
        ],
        'userTags': {
            'name': '第二身份',
            'id': -1,
            'slogan': '第二身份的标语',
            'tags': [
                {
                    'id': 6,
                    'typeid': -1,
                    'name': '宝妈',
                    'slogan': null,
                    'iconclass': 'icon-lvyoutehui',
                    'description': null,
                    'colorcode': null,
                    'order': null,
                    'articlecount': 0,
                    'createtime': null,
                    'updatetime': null
                },
                {
                    'id': 7,
                    'typeid': -1,
                    'name': '小白',
                    'slogan': null,
                    'iconclass': 'icon-xinyongqiahuankuan',
                    'description': null,
                    'colorcode': null,
                    'order': null,
                    'articlecount': 0,
                    'createtime': null,
                    'updatetime': null
                },
                {
                    'id': 8,
                    'typeid': -1,
                    'name': '职场新手',
                    'slogan': null,
                    'iconclass': 'icon-baoxian',
                    'description': null,
                    'colorcode': null,
                    'order': null,
                    'articlecount': 0,
                    'createtime': null,
                    'updatetime': null
                },
                {
                    'id': 11,
                    'typeid': -1,
                    'name': '理财3',
                    'slogan': null,
                    'iconclass': 'icon-baoxian',
                    'description': null,
                    'colorcode': '#5aa9f5',
                    'order': 0,
                    'articlecount': 0,
                    'createtime': null,
                    'updatetime': null
                },
                {
                    'id': 12,
                    'typeid': -1,
                    'name': '理财4',
                    'slogan': null,
                    'iconclass': 'icon-baoxian',
                    'description': null,
                    'colorcode': '#5aa9f5',
                    'order': 0,
                    'articlecount': 0,
                    'createtime': null,
                    'updatetime': null
                },
                {
                    'id': 13,
                    'typeid': -1,
                    'name': '理财5',
                    'slogan': null,
                    'iconclass': 'icon-baoxian',
                    'description': null,
                    'colorcode': '#5aa9f5',
                    'order': 0,
                    'articlecount': 0,
                    'createtime': null,
                    'updatetime': null
                },
                {
                    'id': 21,
                    'typeid': -1,
                    'name': '基金',
                    'slogan': null,
                    'iconclass': 'icon-jinrong',
                    'description': '基金啊基金 你就是坑爹啊',
                    'colorcode': '#5aa9f5',
                    'order': null,
                    'articlecount': 0,
                    'createtime': null,
                    'updatetime': null
                },
                {
                    'id': 22,
                    'typeid': -1,
                    'name': '基金1',
                    'slogan': null,
                    'iconclass': 'icon-jinrong',
                    'description': '基金啊基金 你就是坑爹啊',
                    'colorcode': '#5aa9f5',
                    'order': null,
                    'articlecount': 0,
                    'createtime': null,
                    'updatetime': null
                }
            ]
        },
        'recommend3Articles': [
            {
                'iscommend': 0,
                'sourceid': -777777,
                'readcount': 132,
                'commentcount': 13,
                'userthumbsupcount': 0,
                'publishtime': '2017-12-13 16:41:27',
                'description': 'xindex推进',
                'thumbsupcount': 4,
                'id': 'A*D9S51-FIKq06z-C438UO',
                'title': '采用“平均成本投资法”有什么好处？',
                'imgSrc': 'http://wmimage.qn.d1money.com/pic/201712/22/1513923640199707143.png',
                'userid': 9
            },
            {
                'iscommend': 1,
                'sourceid': -777777,
                'readcount': 197,
                'commentcount': 9,
                'userthumbsupcount': 0,
                'publishtime': '2017-12-13 16:41:22',
                'description': '新话术1',
                'thumbsupcount': 10,
                'id': 'A*DlRFCpxLb4cdxesHB3iY',
                'title': '白领，你有“惧上”症吗？',
                'imgSrc': 'http://wmimage.qn.d1money.com/pic/s2013-02-26/1/1/2013022622201165968.jpg',
                'userid': 9
            }
        ]
    })
    ResultMap.body = mockData
    res.json(ResultMap)
})
/***
 * 获取第二身份选择列表
 */
router.post('/agent/article/services/selectAllSecordIdentity', (req, res) => {
    const mockData = Mock.mock({
        code: 'SUCCESS',
        msg: '成功',
        'body|8-10': [
            {
                'id|+1': 1,
                'typeid': -1,
                'name': '@cword(2,5)',
                'slogan': null,
                'iconclass': 'icon-baoxian',
                'description': null,
                'colorcode': '@hex()',
                'order': 0,
                'articlecount': 0,
                'createtime': null,
                'updatetime': null
            }
        ]
    })
    res.json(mockData)
})

/***
 * 获取文章详情
 */
router.post('/agent/article/services/loadArticleDetail', (req, res) => {
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
 * 获取文章Tag
 */
router.post('/agent/article/services/loadArticleTagBytagid', (req, res) => {
    const mockData = Mock.mock({
        code: 'SUCCESS',
        msg: '成功',
        body: {
            'id': 5,
            'typeid': 1,
            'name': '股票',
            'slogan': null,
            'iconclass': 'icon-gupiao',
            'description': null,
            'colorcode': null,
            'order': null,
            'articlecount': 0,
            'createtime': null,
            'updatetime': null
        }
    })
    res.json(mockData)
})

/***
 * 根据type获取文章数据
 */
router.post('/agent/article/services/loadArticlelistByclickType', (req, res) => {
    const mockData = Mock.mock({
        'list|9': [
            {
                id: 'AO-3RAw69FjIuD9Wo7AGfl',
                'iscommend|0-1': 0,
                imgSrc: '@image(200x100, @hex())',
                title: '@cword(3, 5)',
                publishtime: '@datatime()',
                introduce: '@cparagraph(1)',
                videoImg: '@image(200x100, @hex())',
                'commentcount|1-100': 1000,
                'thumbsupcount|1-100': 1000,
                'readcount|1-100': 1000
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
 * 根据tagid获取文章数据
 */
router.post('/agent/article/services/loadarticlesBytagid', (req, res) => {
    const mockData = Mock.mock({
        'list|9': [
            {
                id: 'AO-3RAw69FjIuD9Wo7AGfl',
                'iscommend|0-1': 0,
                imgSrc: '@image(200x100, @hex())',
                title: '@cword(3, 5)',
                publishtime: '@datatime()',
                introduce: '@cparagraph(1)',
                videoImg: '@image(200x100, @hex())',
                'commentcount|1-100': 1000,
                'thumbsupcount|1-100': 1000,
                'readcount|1-100': 1000
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
 * 获取文章评论数据
 */
router.post('/agent/article/services/loadArticleCommentList', (req, res) => {
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
router.post('/agent/component/services/loadComponentList', (req, res) => {
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

// 推荐
router.post('/agent/article/services/commendByid', (req, res) => {
    ResultMap.body = true
    res.json(ResultMap)
})
module.exports = router
