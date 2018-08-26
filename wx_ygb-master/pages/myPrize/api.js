import config from '../../utils/config'

// 个人中心-实物列表
export let getUserEntityList = (watermark, index, cb) => {
    wx.request({
        url: `${config.zc_url}/userCenter/getUserEntityList`,
        method: 'POST',
        data: {
            watermark,
            index
        },
        success: (res) => {
            cb && cb(res.data);
            console.log('我的实物列表：', res);
        },
        fail: res => {
            console.log('lotteryRedpack/getUserEntityList fail:', res);
        }
    });
}

// 个人中心-实物详情接口
export let getUserEntityDetail = (watermark, id, cb) => {
    wx.request({
        url: `${config.zc_url}/userCenter/getUserEntityDetail`,
        method: 'POST',
        data: {
            watermark,
            id
        },
        success: (res) => {

            console.log('getUserEntityDetail req:', {
                watermark,
                id
            });
            console.log('getUserEntityDetail res:', res);
            cb && cb(res.data);
        },
        fail: res => {
            console.log('lotteryRedpack/getUserEntityDetail fail:', res);
        }
    });
}