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
router.post('/cust/product/services/loadDetail', (req, res) => {
    const mockData = Mock.mock({
        // 图片
        bigimgsrc: '@image(100x170, @hex())',
        // 分享图片
        smallimgsrc: 'http://wmimage.qn.d1money.com/poster/201712/26/1514279844282254270.png',
        introduce: '@cparagraph(1,3)',
        // 标题
        name: '@cword(3,5)',
        // 外接地址(易企秀链接)
        showurl: 'http://d.eqxiu.com/s/jklyDRlh',
        buyurl: 'http://d1money.com',
        // 阅读
        'totalreadcount|1-100': 1,
        // 购买
        'totalbuytcount|1-100': 1,
        // 转发
        'totalsharecount|1-100': 1
    })
    ResultMap.body = mockData
    res.json(ResultMap)
})

// 获取活动发布者信息
router.post('/cust/product/services/loadShareUserDetail', (req, res) => {
    const mockData = Mock.mock({
        wx_ewm: 'http://wmimage.qn.d1money.com/poster/201712/26/1514279844282254270.png',
        'headurl|+1': userImg,
        realname: '@cname',
        mobile: '13791128653'
    })
    ResultMap.body = mockData
    res.json(ResultMap)
})
module.exports = router
