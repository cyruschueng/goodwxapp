/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

var WXBizDataCrypt = require('./WXBizDataCrypt')
var cache = require('memory-cache')
var request = require('request');

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

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

//my code start

var userinfo = [
    { mobile: "18612626431", name: "thj", score: 100, openid: "123" },
    { mobile: "18612626432", name: "test1", score: 200, openid: "" }
];
var userGroupInfo = [
    { openid: "123", groupid: 'undefined', time: new Date() }
];
cache.put("userinfo", userinfo);
cache.put("groupinfo", userGroupInfo);
/* GET home page. */
router.get('/design', function (req) {
    var appId = 'wx0d6c73ef24d2f0bf'
    var sessionKey = decodeURIComponent(req.query.key);//'Xd32s3XzxL1x81vzi4da6A=='

    var encryptedData = decodeURIComponent(req.query.data);//'E8YLxWFXrR7Z5w17V7A7JsI36G+LW+KGWqUwYOHqlXJ/OKRZlCBq+aFg9KiN/dwvFjVpyaptusGkPzPeCV5ZoHa/0t1L1gRgdycyza5F5hFM68tmBevpig4jSTnqUmCUB4BBViWEssaB0zIbiH0rfw=='
    var iv = decodeURIComponent(req.query.iv);// 'HnU5B6W8VRwuJQdbkki6Yw=='

    var pc = new WXBizDataCrypt(appId, sessionKey)

    var data = pc.decryptData(encryptedData, iv)

    console.log('解密后 data: ', data)
    //res.header("text/html");
    //res.writeHead(200y,{"Content-Type": "text/plain"});
    req.body = (data);
});
router.get("/getuser", function (req) {
    var openid = req.query.openid;
    var us = cache.get("userinfo");
    if (!us) {
        req.body = ('');
    }
    else {
        var finduser = us.find(e => e.openid == openid);
        var group = cache.get("groupinfo");
        var f = group.find(e => e.openid == openid);
        if (f) {
            finduser.groupid = f.groupid;
        }
        req.body = (finduser);
    }
})
router.get("/binduser", function (req) {
    var openid = req.query.openid;
    var mobile = req.query.mobile;
    var nickname = req.query.nickname;
    var groupid = req.query.groupid;
    var us = cache.get("userinfo");
    var finduser = us.find(e => e.mobile == mobile);
    if (finduser) {
        finduser.openid = openid;
        finduser.name = nickname;
    }
    else {
        finduser={ mobile: mobile, name: nickname, score: Math.ceil(Math.random() * 500), openid: openid };
        us.push(finduser);
    }
    cache.put("userinfo", us);
    if (groupid) {
        var group = cache.get("groupinfo");
        var f = group.find(e => e.openid == openid && e.groupid == groupid);
        if (!f) {
            group.push({ openid: openid, groupid: groupid, time: new Date() });
            cache.put("groupinfo", group);
        }
    }
    req.body = (finduser);
})
router.get("/getSessionkey", async (req) => {
    var data = req.query;
    var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=wx0d6c73ef24d2f0bf&secret=6e61680b046deea7c68209ebd1929c53&js_code=' + data.code + '&grant_type=authorization_code'
    var let = await request.get(url);
    req.body = (let);
})
router.get("/getGroupId", function (req) {
    var openid = req.query.openid;
    var us = cache.get("userinfo");
    if (!us) {
        req.body = ("");
    }
    else {
        var finduser = us.find(e => e.openid == openid);
        if (finduser) {
            req.body = ("ok");
        }
        else {
            req.body = ("");
        }
    }
})
router.get("/getRank", req => {
    var groupid = req.query.groupid;
    var group = cache.get("groupinfo");
    if (!groupid) {
        var finduser = us.find(e => e.openid == openid);

        var f = group.find(e => e.openid == openid);
        if (f) {
            groupid = f.groupid;
        }
    }
    var userlist = group.filter(e => e.groupid == groupid);
    var us = cache.get("userinfo");
    var userinfo = us.filter(e => userlist.findIndex(k => k.openid == e.openid) > -1);
    req.body = userinfo.sort((a,b)=>b.score-a.score);
})
//my code end
module.exports = router
