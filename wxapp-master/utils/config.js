const devServer = 'http://127.0.0.1:8080'
const testServer = 'https://test-m-qun.umeng100.com'
const betaServer = 'https://test-m-qun.umeng.com'
// const betaServer = 'https://poetry-competition.genshuixue.com'
const proServer = 'https://m-qun.umeng100.com'

const NODE_ENV = require('../NODE_ENV');

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
    // 当前app版本，每次发布新版本记得更新
    // APP_VERSION: '0.0.1',
    // 服务地址
    SERVER_HOST: path,
    SERVER_HOST_ROOT: path,
    PATHS: {
        PV0: 'https://pb0.genshuixue.com/pv0.gif',
        /**
         * habo上报
         */
        HABO: 'https://click.genshuixue.com/gs.gif',
        /**
         * 登录信息接口
         */
        LOGIN: '/miniprogram/open/wxLogin.ajax',
        /**
         * 获取用户信息
         */
        PROFILE: '/miniprogram/scdh/login/queryProfileInfo.ajax',
        /**
         * 获取好友排名
         */
        FRIEND_RANK: '/miniprogram/scdh/login/queryFriendRank.ajax',
        /**
         * 获取世界排名
         */
        WORLD_RANK: '/miniprogram/scdh/login/queryWorldRank.ajax',
        /**
         * 获取雷达图数据
         */
        RADAR: '/miniprogram/scdh/login/queryRadarInfo.ajax',
        /**
         * 签到
         */
        CHECK_IN: '/miniprogram/public/login/checkIn.ajax',
        /**
         * 获取签到信息
         */
        CHECK_INFO: '/miniprogram/scdh/login/queryLoginCoinRewards.ajax',
        /**
         * 分享奖励
         */
        SHARE: '/miniprogram/scdh/login/share.ajax',
        /**
         * 群排行榜
         */
        GROUP_RANK: '/miniprogram/scdh/login/queryGroupRank.ajax',
        /**
         * 分享奖励查询
         */
        SHARE_MONEY: '/miniprogram/scdh/login/queryShareMoney.ajax',
        /**
         * 获取websocket地址
         */
        PK_SERVER: '/miniprogram/scdh/login/queryPkServerInfo.ajax',
        /**
         * 设置自定义数据
         */
        SET_MY_VALUE: '/open/data/setValue.ajax',
        /**
         * 获取自定义数据
         */
        GET_MY_VALUE: '/open/data/getValue.ajax',
        /**
         * 日志报告
         */
        REPORT_LOG: '/open/data/reporter.ajax'
    },
    GRADE_MAP: {
        '1' : '学童',
        '2' : '儒生',
        '3' : '秀才',
        '4' : '举人',
        '5' : '贡生',
        '6' : '进士',
        '7' : '大学士',
        '8' : '文史大师',
        '9' : '万卷宗师',
        '10' : '博学史诗',
        '11' : '百家传说',
        '12' : '诗词王者'
    },
    INVITE_TEXT_ARR: [
        '想和你PK智商，看看谁是读书人！',
        '在诗词大会向你发出战书，谁输谁发红包！',
        '在诗词大会向你发出战书，谁输谁请吃饭！',
        '在春节期间非常无聊，想和你玩耍！'
    ],
    SHARE_IMGS: [
        'https://imgs.genshuixue.com/0cms/d/file/content/2018/02/5a72c6602e4f5.png',
        'https://imgs.genshuixue.com/0cms/d/file/content/2018/02/5a72c6606e6d5.png',
        'https://imgs.genshuixue.com/0cms/d/file/content/2018/02/5a72c660bfaad.png',
        'https://imgs.genshuixue.com/0cms/d/file/content/2018/02/5a72c6610b65a.png',
        'https://imgs.genshuixue.com/0cms/d/file/content/2018/02/5a72c6614be14.png'
    ],
    // 进入方向
    DIRECTION: {
        LEFT: 'left',
        RIGHT: 'right'
    },
    /**
     * 背景音乐资源在线地址
     */
    OSS_BG_MUSICS: {
        // 拔剑
        DREW_SWORD: 'https://file.gsxservice.com/48213918_c70sirq0.mp3',
        // 背景音乐-答题中
        ANSWERING: 'https://file.gsxservice.com/48213924_r2u50vac.mp3',
        // 背景音乐
        BG_MUSIC: 'https://file.gsxservice.com/48213929_kgn73vyo.mp3',
        // 按钮点击
        CLICK_BTN: 'https://file.gsxservice.com/48213936_b0aksf1w.wav',
        // 呼的一声
        WIND: 'https://file.gsxservice.com/48213941_1vdh8g8l.mp3',
        // 挑战胜利
        VICTORY: 'https://file.gsxservice.com/48213948_40yk2smn.wav',
        // 挑战失败-秋风扫落叶
        DEFEAT_WIND: 'https://file.gsxservice.com/48213949_m8x2kfzh.mp3',
        // 挑战失败
        DEFEAT: 'https://file.gsxservice.com/48213957_5ltr3for.mp3',
        // 平局
        DOGFALL: 'https://file.gsxservice.com/48213964_cryo0jyc.mp3',
        // 选择错误
        WRONG: 'https://file.gsxservice.com/48213967_w6sfdee9.wav',
        // 选择正确
        CORRECT: 'https://file.gsxservice.com/48213971_ln7zdhk2.mp3',
        // 寻找对手中
        FIND_PLAYER: 'https://file.gsxservice.com/48213973_rebr5yfo.mp3'
    },
    TENCENT_BG_MUSICS: {
        // 拔剑
        DREW_SWORD: 'https://poetry-audio-1256069738.cos.ap-beijing.myqcloud.com/%E8%AF%97%E8%AF%8D%E5%A4%A7%E4%BC%9A%E9%9F%B3%E4%B9%90/%E6%8B%94%E5%89%91%E5%A3%B0%E9%9F%B3.mp3?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDcc76OiODH0KsTwGp1Dcy2LgRpqNCOKMT%26q-sign-time%3D1517922214%3B1517924014%26q-key-time%3D1517922214%3B1517924014%26q-header-list%3D%26q-url-param-list%3D%26q-signature%3D5891b5ced0da035639f9054edccef3c78a79b0b3&token=cc13eed6e17495fcc8a4a0f25ccd191991b922e510001&clientIP=36.110.63.220&clientUA=f52a3dbc-4c9d-4542-b104-8d3100d2e065',
        // 背景音乐-答题中
        ANSWERING: 'https://poetry-audio-1256069738.cos.ap-beijing.myqcloud.com/%E8%AF%97%E8%AF%8D%E5%A4%A7%E4%BC%9A%E9%9F%B3%E4%B9%90/%E8%83%8C%E6%99%AF%E9%9F%B3%E4%B9%90-%E7%AD%94%E9%A2%98%E4%B8%AD.mp3?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDdcpNQMOT5Q06lcSjVzjP7HaoaulRg0Oc%26q-sign-time%3D1517922359%3B1517924159%26q-key-time%3D1517922359%3B1517924159%26q-header-list%3D%26q-url-param-list%3D%26q-signature%3D83ad6290d931e607032b6029f569665572d9ed52&token=d70c25eaf06fb0aa28d485e5823c41aa7da6ed7010001&clientIP=36.110.63.220&clientUA=c9175c80-7b92-4c63-bd50-7fc722252a7c',
        // 背景音乐
        BG_MUSIC: 'https://poetry-audio-1256069738.cos.ap-beijing.myqcloud.com/%E8%AF%97%E8%AF%8D%E5%A4%A7%E4%BC%9A%E9%9F%B3%E4%B9%90/%E8%83%8C%E6%99%AF%E9%9F%B3%E4%B9%90.mp3?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKID0YieZCtY1aH25HdQhD97441rGBLdwag2%26q-sign-time%3D1517922381%3B1517924181%26q-key-time%3D1517922381%3B1517924181%26q-header-list%3D%26q-url-param-list%3D%26q-signature%3D8368e24c7974ecdec3d8b564201a61119d85c8d2&token=91d5b5b223f1b2644da336c378eb71ae073be85f10001&clientIP=36.110.63.220&clientUA=e1b18096-e563-490b-ab0d-e6bbbfdd9ecb',
        // 按钮点击
        CLICK_BTN: 'https://poetry-audio-1256069738.cos.ap-beijing.myqcloud.com/%E8%AF%97%E8%AF%8D%E5%A4%A7%E4%BC%9A%E9%9F%B3%E4%B9%90/%E7%82%B9%E5%87%BB%E6%8C%89%E9%92%AE.wav?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDLm7XyPNXakFtuoUz30G1XgnXSg81oo68%26q-sign-time%3D1518007107%3B1518008907%26q-key-time%3D1518007107%3B1518008907%26q-header-list%3D%26q-url-param-list%3D%26q-signature%3D6364b4f2d538df9a1ea7b666a5ae3f81e78eeb5a&token=be36c1cc6a9d37071a5169b14f638de2ad3b267f10001&clientIP=36.110.63.220&clientUA=f904870f-ccff-4d84-9565-e802306b59e8',
        // 呼的一声
        WIND: 'https://poetry-audio-1256069738.cos.ap-beijing.myqcloud.com/%E8%AF%97%E8%AF%8D%E5%A4%A7%E4%BC%9A%E9%9F%B3%E4%B9%90/%E5%91%BC%E7%9A%84%E4%B8%80%E5%A3%B0.mp3?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDHNkFOtcnptNWI6Dt2JUSzAVjNHe27dSf%26q-sign-time%3D1517922164%3B1517923964%26q-key-time%3D1517922164%3B1517923964%26q-header-list%3D%26q-url-param-list%3D%26q-signature%3D17d7a1fa5782308a9e7c7460672f155d15e06f08&token=dedc6de5a6666519e55a9aba975e2ddc37d72de910001&clientIP=36.110.63.220&clientUA=eb26ac9c-7a5c-43f9-82de-2b294c61f8df',
        // 挑战胜利
        VICTORY: 'https://poetry-audio-1256069738.cos.ap-beijing.myqcloud.com/%E8%AF%97%E8%AF%8D%E5%A4%A7%E4%BC%9A%E9%9F%B3%E4%B9%90/%E6%8C%91%E6%88%98%E8%83%9C%E5%88%A9.wav?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKID9wroNUiBx69mPBWAX8w2fy8c3zUz9inv%26q-sign-time%3D1517922311%3B1517924111%26q-key-time%3D1517922311%3B1517924111%26q-header-list%3D%26q-url-param-list%3D%26q-signature%3D31ccb074c4c36b342f2bbf4c5ca82818029141cb&token=1989e7c7c80da22a3e72147466d9d0cc0783d3af10001&clientIP=36.110.63.220&clientUA=f30dc784-6a51-4bf8-8e35-0bd4e4e5388e',
        // 挑战失败-秋风扫落叶
        DEFEAT_WIND: 'https://poetry-audio-1256069738.cos.ap-beijing.myqcloud.com/%E8%AF%97%E8%AF%8D%E5%A4%A7%E4%BC%9A%E9%9F%B3%E4%B9%90/%E6%8C%91%E6%88%98%E5%A4%B1%E8%B4%A5-%E7%A7%8B%E9%A3%8E%E6%89%AB%E8%90%BD%E5%8F%B6.mp3?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDY9X00MGD5mu0hyDwW94OJD0PEiHrciwG%26q-sign-time%3D1517922253%3B1517924053%26q-key-time%3D1517922253%3B1517924053%26q-header-list%3D%26q-url-param-list%3D%26q-signature%3D917729d5702d640c8a8fd208a0008ad93603a453&token=5c318bff71f911265e25c65c70d35d47807d1c7510001&clientIP=36.110.63.220&clientUA=0ef4fb46-1db5-4167-bbe8-17bcc50ae022',
        // 挑战失败
        DEFEAT: 'https://poetry-audio-1256069738.cos.ap-beijing.myqcloud.com/%E8%AF%97%E8%AF%8D%E5%A4%A7%E4%BC%9A%E9%9F%B3%E4%B9%90/%E6%8C%91%E6%88%98%E5%A4%B1%E8%B4%A5.mp3?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDRxtx1zDAedqeIKhd7TJss8nj2ze0hukm%26q-sign-time%3D1517922270%3B1517924070%26q-key-time%3D1517922270%3B1517924070%26q-header-list%3D%26q-url-param-list%3D%26q-signature%3D08a6e8e69bb112eaaa0267afbaff3e4655e9f79a&token=359ab5f60fdc7482db5e2e064b2cd82d375f1d7910001&clientIP=36.110.63.220&clientUA=1e6f2afa-53c1-4db0-bb20-febef2dc4d5f',
        // 平局
        DOGFALL: 'https://poetry-audio-1256069738.cos.ap-beijing.myqcloud.com/%E8%AF%97%E8%AF%8D%E5%A4%A7%E4%BC%9A%E9%9F%B3%E4%B9%90/%E6%8C%91%E6%88%98%E6%88%98%E6%88%90%E5%B9%B3%E5%B1%80.mp3?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDjn8a4tkSHCMGIbMkazt3Z1rUhfNGXPlx%26q-sign-time%3D1517922290%3B1517924090%26q-key-time%3D1517922290%3B1517924090%26q-header-list%3D%26q-url-param-list%3D%26q-signature%3D1550cdd2a9061d3d17160435d3c997eec4bf4867&token=c4f55d3b4c622ef023afd618bc0fd4856eab007310001&clientIP=36.110.63.220&clientUA=fd0c4d69-c721-41f3-ac87-8ce24a009e67',
        // 选择错误
        WRONG: 'https://poetry-audio-1256069738.cos.ap-beijing.myqcloud.com/%E8%AF%97%E8%AF%8D%E5%A4%A7%E4%BC%9A%E9%9F%B3%E4%B9%90/%E9%80%89%E6%8B%A9%E9%94%99%E8%AF%AF.wav?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTpUJqTmJMlFJr7WShteS2mP91r3T3nRH%26q-sign-time%3D1517922417%3B1517924217%26q-key-time%3D1517922417%3B1517924217%26q-header-list%3D%26q-url-param-list%3D%26q-signature%3D7ede6f51d4e422ad337e76dc2e5cedc55d205ff9&token=547bb971ae772db49e702c530dbf0a646395f37510001&clientIP=36.110.63.220&clientUA=52d1a30b-d882-4110-8572-99552d5b81f0',
        // 选择正确
        CORRECT: 'https://poetry-audio-1256069738.cos.ap-beijing.myqcloud.com/%E8%AF%97%E8%AF%8D%E5%A4%A7%E4%BC%9A%E9%9F%B3%E4%B9%90/%E9%80%89%E6%8B%A9%E6%AD%A3%E7%A1%AE.mp3?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDO2uu0HeuiMgole6HnOxsvNb50Ta3kKOf%26q-sign-time%3D1517922401%3B1517924201%26q-key-time%3D1517922401%3B1517924201%26q-header-list%3D%26q-url-param-list%3D%26q-signature%3D17d5bedee74c63a8881424fae06d62210a8c2f2f&token=aa7b3cbd2940061dedf31600c8f0676c2869678f10001&clientIP=36.110.63.220&clientUA=be04f032-1a80-4d4d-b200-683c3698885c',
        // 寻找对手中
        FIND_PLAYER: 'https://poetry-audio-1256069738.cos.ap-beijing.myqcloud.com/%E8%AF%97%E8%AF%8D%E5%A4%A7%E4%BC%9A%E9%9F%B3%E4%B9%90/%E5%AF%BB%E6%89%BE%E5%AF%B9%E6%89%8B%E4%B8%AD.mp3?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDImyTqZRqaA6W4aS5e8VR0w2QBpfAwHTx%26q-sign-time%3D1517922195%3B1517923995%26q-key-time%3D1517922195%3B1517923995%26q-header-list%3D%26q-url-param-list%3D%26q-signature%3De1da5835fed6058559a59a2b827c14a7c4a7225f&token=26f429aed12f5ebb8360417c6b52eec3f80562ce10001&clientIP=36.110.63.220&clientUA=c1e7c4c4-fecf-445f-9723-e4e45de77a44'
    },
    // 动画间隔，要和css中统一
    ANIMATION_INTERVAL: {
        QUICKEST: 150,
        QUICKER: 250,
        QUICK: 500,
        NORMAL: 1000,
        SLOW: 1500,
        SLOWER: 2000,
        SLOWEST: 2500
    }
};

export default config;
