import config from '../../utils/config'

// 提交收货地址
export let inputLotteryAddress = (watermark, getType, id, name, phone, address, cb) => {
    wx.request({
        url: `${config.zc_url}/lotteryEntity/inputLotteryAddress`,
        method: 'POST',
        data: {
            watermark,
            getType,
            id,
            name,
            phone,
            address
        },
        success: (res) => {
            console.log('提交地址req：', JSON.stringify({
                watermark,
                getType,
                id,
                name,
                phone,
                address
            }));
            console.log('提交地址res：', res);
            cb && cb(res.data);
        },
        fail: res => {
            console.log('lotteryRedpack/inputLotteryAddress fail:', JSON.stringify({
                watermark,
                getType,
                id,
                name,
                phone,
                address
            }), res);
        }
    });
}