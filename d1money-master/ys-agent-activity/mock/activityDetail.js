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

// 获取活动页面详情
router.post('/agent/activity/services/loadActivityDetail', (req, res) => {
    const mockData = Mock.mock({
        // 图片
        bigimgsrc: '@image(100x170, @hex())',
        // 分享图片
        smallimgsrc: 'http://wmimage.qn.d1money.com/poster/201712/26/1514279844282254270.png',
        introduce: '@cparagraph(1,3)',
        // 标题
        name: '@cword(3,5)',
        // 外接地址(易企秀链接)
        url: 'http://www.baidu.com',
        // 阅读
        'totalreadcount|1-100': 1,
        // 接受
        'totalacceptcount|1-100': 1,
        // 转发
        'totalsharecount|1-100': 1
    })
    ResultMap.body = mockData
    res.json(ResultMap)
})

// 获取用户 接受/阅读/转发 列表
router.post('/agent/activity/services/loaduserActivitydataByactivityid', (req, res) => {
    const mockData = Mock.mock({
        'list|7-9': [{
            actiontime: '@date(T)',
            createtime: '@date(T)',
            'headurl|+1': userImg,
            'level|2-4': 0,
            'realname': '@cname',
            'userid|+1': 1
        }],
        pageCount: 2,
        pageNo: 0,
        pageSize: 9,
        totalCount: 18
    })
    ResultMap.body = mockData
    res.json(ResultMap)
})
module.exports = router
