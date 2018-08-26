import config from '../../utils/config'


// 获取用户中实物奖信息
export let getLotteryUserInfo = (watermark, id, cb) => {
    wx.request({
        url: `${config.zc_url}/lotteryEntity/getLotteryUserInfo`,
        method: 'POST',
        data: {
            watermark,
            id
        },
        success: (res) => {
            console.log('getLotteryUserInfo req:', watermark, id );
            console.log('getLotteryUserInfo res:', res );
        	cb && cb(res.data);
        },
        fail: res => {
            console.log('lotteryRedpack/getLotteryUserInfo fail:', JSON.stringify({
                watermark,
                id
            }), res);
        }
    });
}


// 实物详情接口，
export let getLotteryUserList = (watermark, id, cb) => {
    wx.request({
        url: `${config.zc_url}/lotteryEntity/getLotteryUserList`,
        method: 'POST',
        data: {
            watermark,
            id
        },
        success: (res) => {
            console.log('getLotteryUserList req', JSON.stringify({
                watermark,
                id
            }));
            console.log('getLotteryUserList res', res);
            cb && cb(res.data);
        },
        fail: res => {
            console.log('lotteryRedpack/addLotteryUser fail:', JSON.stringify({
                watermark,
                id
            }), res);
        }
    });
}
