/**
 * ajax 服务路由集合
 */
const check = require('../middlewares/authCheck.js')
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', controllers.login.login)
// router.get('/slogin', controllers.login.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)
//添加闹钟
router.post('/clock', check, controllers.addClock.addClock)
//添加闹钟
router.post('/addclock', check, controllers.addClock.addClockNew)
//获取确认闹钟信息
router.get('/clock', check, controllers.addClock.getClock)
//确认闹钟提醒
router.post('/confirm', check, controllers.addClock.confirmClock)
//好友接受闹钟提醒
router.post('/accept', check, controllers.addClock.acceptClock)
//获取我发送的闹钟信息
router.get('/slist', check, controllers.list.send)
//获取我接收的闹钟信息
router.get('/rlist', check, controllers.list.receive)
//获取我接收的闹钟信息
router.post('/feedback', check, controllers.feedback)

module.exports = router
