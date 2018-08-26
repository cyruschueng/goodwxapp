var config = {
    // sdkUrl : 'https://openpdk.nalrer.cn/',
    sdkUrl : 'http://140.143.201.170:8000/',
    // sdkUrl : 'http://172.16.0.44:8000/',
    cdnUrl : 'https://pdkqn.nalrer.cn/pdk/',
    snsId  : 'wxapp:071AUTMl13fYim0KR4Nl18LPMl1AUTMS1',

    appId       : 9999,
    hallId      : 9999,
    clientId    : 'H5_5.1_weixin.weixin.0-hall150.weixin.tuyoo',
    // wxAppId     : 'wx4f9ed50825c347a7', // specify
    wxAppId     : 'wx6ac3f5090a6b99c5', // uniform
    gameId      : 150,
    deviceId    : 'wechatGame',

    share : {
        random : [
            {
                txt : `replace喊你一起赢现金红包`,
                pic : 'https://pdkqn.nalrer.cn/pdk/res/other/share_preview_2.jpg',
            },
            {
                txt : `【replace@你】点我赢红包，免费领>>`,
                pic : 'https://pdkqn.nalrer.cn/pdk/res/other/share_preview_1.jpg',
            },
            {
                txt : `replace喊你PK一把跑得快，敢来和我比拼一下吗？`,
                pic : 'https://pdkqn.nalrer.cn/pdk/res/other/share_preview_3.jpg',
            }
        ],
        default : {
            txt : `【replace@你】点我赢红包，免费领>>`,
            pic : 'https://pdkqn.nalrer.cn/pdk/res/other/share_preview_1.jpg',
        }
    },


    remoteAssets : [
        'res/raw-assets/resources/sound/bg_hall.mp3',
        'res/raw-assets/resources/sound/btn_click_back.mp3',
        'res/raw-assets/resources/sound/bg_table_2.mp3',
        'res/raw-assets/resources/sound/bg_table_1.mp3',
        'res/raw-assets/resources/sound/ani_card_type_4.mp3',
        'res/raw-assets/resources/sound/ani_card_type_3.mp3',
        'res/raw-assets/resources/sound/btn_click_normal.mp3',
        'res/raw-assets/resources/sound/ani_card_type_2.mp3',
        'res/raw-assets/resources/sound/ani_card_type_1.mp3',
    ],
}

module.exports = config;
