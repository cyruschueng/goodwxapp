/**
 * 小程序配置文件
 */
// 此处主机域名修改成腾讯云解决方案分配的域名
// var host = 'http://10.111.121.10:8080'; // env开发地址
var host = 'https://renxingstyle.xyz/tianfuxueba'; // prod生产地址

var config = {
    // 下面的地址配合云端 Demo 工作
    service: {
        host,

    /************** 增加功能 ****************/
        // 用户登录
        wxloginUrl: `${host}/user/wxlogin`,
        // 添加好友关系
        addFriendUrl: `${host}/user/addFriend`,
        // 分享增加游戏机会
        shareAddChanceUrl: `${host}/user/addChance`,
        // 是否需要注册 \ 签到
        isNeedSignUrl: `${host}/sign/needSign`,
        // 签到
        signActionUrl: `${host}/sign/action`,
        // 获取用户信息
        getUserInfoUrl: `${host}/user/info`,
        // 含排名的用户信息
        userRankInfoUrl: `${host}/user/infoWithRank`,
        // 好友排行
        friendRankUrl: `${host}/rank/friendRank`,
        // 总排行
        worldRankUrl: `${host}/rank/worldRank`,
        // 获取一轮挑战的全部10道题目
        allQuestionsUrl: `${host}/question/makeAllQuestions`,
        // 一轮挑战后保存得分
        updateQuestionResUrl: `${host}/question/updateResult`,
        // 获取相关信息接口
        // key: shareInfo->分享信息； giftDate->礼品派发倒计时
        getMsgInfoUrl: `${host}/msg/get`,
        // 礼包派发倒计时
        getGiftDateUrl: `${host}/msg/get`,
        // 获取前10名的奖励礼包信息
        listFinalGiftUrl: `${host}/gift/listFinalGift`,
        // 获取个人获得的礼包
        myGiftUrl: `${host}/gift/myGift`,
        // 领取个人礼包
        getMyGiftUrl: `${host}/gift/getGift`,
        // 终极大礼信息
        giftInfoUrl: `${host}/gift/giftInfo`,
    }
};
module.exports = config;