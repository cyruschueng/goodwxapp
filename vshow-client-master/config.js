/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名   
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

const host = "vvshow.site";

//const hostUrl = 'https://vvshow.site';  //线上服务器
const hostUrl = 'http://localhost:8080';  //本地服务器

const config = {

    // 下面的地址配合云端 Server 工作
    host,
    
    hostUrl,

    staticHostUrl: hostUrl,

    // 服务器图片目录
    imgDirUrl: `${hostUrl}/images/micapp/`,

    // 登录地址，用于建立会话
    loginUrl: `${hostUrl}/users/micapp/login`,

    // 注册地址，用于提交用户信息
    regUrl: `${hostUrl}/users/micapp/reg`,

    // 修改用户头像
    editAvatarUrl: `${hostUrl}/users/micapp/editavatar`,

    // 发送心情
    sendMoodUrl: `${hostUrl}/api/sendmood`,

    // 删除心情
    delMoodUrl: `${hostUrl}/api/delmood`,

    // 获取心情列表
    getMoodListUrl: `${hostUrl}/api/getmoodlist`, 

    // 评论vspace
    postCommentUrl: `${hostUrl}/api/postcomment`,

    // 发送formid
    saveFormIdUrl: `${hostUrl}/api/saveformid`,

    // 发送模板消息
    sendTempMsgUrl: `${hostUrl}/api/sendtempmsg`,


    // 通过sessionId获取用户信息
    getUserBySessionUrl: `${hostUrl}/users/micapp/getuserbysession`, 

    // 提交问题
    saveQuizUrl: `${hostUrl}/api/savequiz`,

    // 获得单一问题
    getQuizUrl: `${hostUrl}/api/getquiz`,

    // 回答问题
    askQuizUrl: `${hostUrl}/api/askquiz`,

    // 回答问题列表
    getQuizListUrl: `${hostUrl}/api/getquizlist`,

    // 获得服务器生成图片
    makeImageUrl: `${hostUrl}/api/makeimage`,

    // 获得服务器创意工厂列表
    getSpecialListUrl: `${hostUrl}/api/getspeciallist`,

    // 获取寻觅列表
    getMeetListUrl: `${hostUrl}/tantan/getmeetlist`,

    // 获取某个用户的信息
    getUserInfoUrl: `${hostUrl}/users/getuserinfo`, 

    // 添加匹配
    addMatchesUrl: `${hostUrl}/tantan/addmatches`,

    // 获取用户的互相喜欢列表
    getMatchListUrl: `${hostUrl}/tantan/getmatchlist`,

    // 添加留言
    addLeaveWords: `${hostUrl}/api/addleavewords`, 

    // 获取留言列表
    fetchLeaveWords: `${hostUrl}/api/fetchleavewords`,


    // 测试的请求地址，用于测试会话
    requestUrl: `${hostUrl}/testRequest`,

    // 用code换取openId
    openIdUrl: `${hostUrl}/openid`,

    // 测试的信道服务接口
    tunnelUrl: `${hostUrl}/tunnel`,

    // 生成支付订单的接口
    paymentUrl: `${hostUrl}/payment`,

    // 发送模板消息接口
    templateMessageUrl: `${hostUrl}/templateMessage`,

    // 上传文件接口
    uploadFileUrl: `${hostUrl}/upload`,

    // 下载示例图片接口
    downloadExampleUrl: `${hostUrl}/static/weapp.jpg`
};

module.exports = config
