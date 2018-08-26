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
/**
 * 视频详细接口
 */
router.post('/agent/cust/services/loadVedioDetailByVedioid', (req, res) => {
    const mockData = Mock.mock({
        code: 'SUCCESS',
        msg: '成功',
        body: {
            // id
            id: '@increment',
            fileid: '4564972818749501733',
            // 视频封面
            videoImg: 'http://wmimage.qn.d1money.com/video/681.jpg-videoCardShareStyle',
            // 视频标题
            title: '对话理财师 - 吴萍',
            // 视频介绍
            introduce: '对话理财师 - 吴萍 的精彩演讲',
            // 视频类型
            typename: '对话理财师',
            // 主讲人
            lecturer: '吴萍',
            // 当前用户是否已点赞
            userthumbsup: 0,
            // 播放数
            'playcount|1-100': 1000,
            // 点赞数
            'thumbsupcount|1-100': 1000,
            // 分享数
            'sharedcount|1-100': 1000,
            // 评论数
            'commentcount|1-100': 1000
        }
    })
    res.json(mockData)
})

/**
 * 提交评论
 */
router.post('/agent/cust/services/submitVedioComment', (req, res) => {
    const mockData = Mock.mock({
        code: 'SUCCESS',
        msg: '成功',
        body: {
            headurl: '@image(46x46, @hex())',
            nickname: '@cname',
            'id|+1': 1
        }
    })
    res.json(mockData)
})

/**
 * 回复评论
 */
router.post('/agent/cust/services/submitVedioCommentReply', (req, res) => {
    const mockData = Mock.mock({
        code: 'SUCCESS',
        msg: '成功',
        body: {
            id: '@increment',
            nickname: '@cname'
        }
    })
    res.json(mockData)
})


/***
 * 获取所有评论列表
 */
router.post('/agent/cust/services/loadVedioCommentList', (req, res) => {
    const mockData = Mock.mock({
        'list|0-2': [
            {
                'id': '@increment',
                'headurl|+1': userImg,
                nickname: '@cname',
                content: '@cparagraph(1,3)',
                'commentReplyList|0-3': [
                    {
                        nickname: '@cname',
                        content: '@cparagraph(1,3)'
                    }
                ],
                createtime: '@datetime'
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
 * 视频点赞接口
 */
router.post('/agent/cust/services/submitVedioThumbsup', (req, res) => {
    ResultMap.body = 'SUCCESS'
    res.json(ResultMap)
})
/***
 * 视频取消点赞接口
 */
router.post('/agent/cust/services/cancelVedioThumbsup', (req, res) => {
    ResultMap.body = 'SUCCESS'
    res.json(ResultMap)
})
module.exports = router
