/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
// var host = 'https://xtbjnn3b.qcloud.la';
var host = 'https://761549265.yangxiaochen.xyz'

// var host = 'http://192.168.1.106:5757';
// var host = 'http://192.168.11.184:5757';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`,

        // 添加闹钟接口
        addClock: `${host}/weapp/addclock`,

        // 获取闹钟接口通过闹钟id
        getClock: `${host}/weapp/clock`,

        // 获取闹钟接口通过闹钟id
        confirmClock: `${host}/weapp/confirm`,
        // 获取闹钟接口通过闹钟id
        acceptClock: `${host}/weapp/accept`,
        // 获取闹钟列表
        clockSList: `${host}/weapp/slist`,
        // 获取闹钟列表
        clockRList: `${host}/weapp/rlist`,
        // 意见反馈
        feedback: `${host}/weapp/feedback`
    }
};

module.exports = config;
