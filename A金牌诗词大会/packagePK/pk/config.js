const devServer = 'ws://test-m-qun.umeng100.com'
// const testServer = 'ws://test-m-qun.umeng100.com'
const testServer = 'ws://172.21.136.8:9688'
const betaServer = 'ws://test-m-qun.umeng100.com'
// const betaServer = 'ws://poetry-competition.genshuixue.com/'
const proServer = 'ws://m-qun.umeng100.com'

const NODE_ENV = require('../../NODE_ENV.js');

let path = null;
// es6 版本
if (NODE_ENV === 'dev') {
    path = devServer;
}
else if (NODE_ENV === 'test') {
    path = testServer;
}
else if (NODE_ENV === 'beta') {
    path = betaServer;
}
else if (NODE_ENV === 'production') {
    path = proServer;
}
const config = {
    // 前4道200，最后一道400
    TOTAL_SCORE: 4 * 200 + 400,
    // 标题占位符
    TITLE_FLAG: '$$',
    // 倒计时开始值
    COUNT_DOWN_NUM: 10,
    // 最后一道题索引
    LAST_ROUND_INDEX: 5,
    // 服务地址
    SERVER_HOST: path,
    PATHS: {
        PK: 'fighting'
    },
    CMD_TYPE: {
        CLIENT: {
            MATCH: 'match',
            TESTING: 'testing',
            READY: 'ready',
            ANSWER: 'answer',
            CREATE_FRIEND_RING: 'createFriendRing',
            JOIN_FRIEND_RING: 'joinFriendRing',
            BEGIN_FRIEND_RING: 'beginFriendRing',
            CANCEL_FRIEND_RING: 'cancelFriendRing',
            REPLAY_FRIEND_RING: 'replayFriendRing',
            REPLAY_FRIEND_RING_OK: 'replayFriendRingOK',
            // 逃跑
            RUNAWAY: 'runaway'
        },
        SERVER: {
            INTRODUCE: 'introduce',
            QUESTION: 'question',
            REPORT: 'report',
            FINAL_REPORT: 'finalReport',
            // 中途退赛
            RUNAWAY_REPORT: 'runawayReport',
            RING_CANCELED: 'ringCanceled',
            RING_CREATED: 'ringCreated',
            ASK_REPLAY_FRIEND_RING: 'askReplayFriendRing',
            // 好友邀请已开始
            FRIEND_RING_HAS_BEGIN: 'friendRingHasBegin',
            // 好友已逃跑
            JOIN_NOT_FOUND_FRIEND_RING: 'joinNotFoundFriendRing',
            ERROR: 'error',
            RECONNECT: 'reconnect'
        }
    },
    // 显示类型
    DISPLAY_TYPE: {
        SHOW: 'show',
        HIDDEN: 'hidden'
    },
    // 比赛类型
    GAME_TYPE: {
        // pk
        PK: 'pk',
        // 邀请赛
        INVITE: 'invite',
        // 练习赛
        PRACTICE: 'practice'
    },
    // 比赛状态
    GAME_STATUS:{
        // 寻找对手阶段
        FIND: 'find',
        // pk阶段
        PK: 'pk',
        // 比赛结束
        OVER: 'over',
        // 目前主要用于好友邀请失败
        FIND_ERROR: 'find-error'
    },
    // 比较结果 0: 平局，1：胜利，2：失败
    GAME_RESULT_STATUS: {
        WIN: 1,
        FAIL: 2,
        DRAW: 0
    },
    // 计算方式
    CAL_TYPE: {
        ADD: 'add',
        MINUS: 'minus'
    },
    // 分享类型
    SHARE_TYPE: {
        // 邀请好友
        INVITE: 'invite',
        // 普通
        NORMAL: 'normal'
    }
};

export default config;
