import config from '../../utils/config'


//初始化
export let init = (watermark, channelCode, programCode, cb) => {
    wx.request({
        url: `${config.https_url}/mini/init`,
        data: {
            watermark,
            channelCode,
            programCode
        },
        success: (res) => {
            var { data } = res.data;
            cb && cb(data, res.data.errCode)
        },
        fail: res => {
            console.log('mini/init fail:', res);
        }
    });
}


// 抢红包接口
export let lottery = (watermark, id, cb) => {
    wx.request({
        url: `${config.zc_url}/lotteryRedpack/lottery`,
        method: 'POST',
        data: {
            id,
            watermark
        },
        success: (res) => {
            console.log('领红包接口 req:', watermark, id);
            console.log('领红包接口 res:', res);

            if (res.statusCode == 200) {
                cb && cb(res.data);
            }
        },
        fail: res => {
          wx.showModal({
            title: '错误',
            content: '抢红包人太多，先参与下直播互动吧',
            success: function (res) {
              wx.reLaunch({
                url: '/pages/main/main',
              })
            }
          })
            console.log('lotteryRedpack/lottery fail:', res);
        }
    });
}

// 用户参加实物抽奖
export let addLotteryUser = (watermark, fromId, cb) => {
    wx.request({
        url: `${config.zc_url}/lotteryEntity/addLotteryUser`,
        method: 'POST',
        data: {
            watermark,
            fromId
        },
        success: (res) => {
            console.log('参加实物抽奖 req', JSON.stringify({
                watermark,
                fromId
            }));
            console.log('参加实物抽奖 res', res);
            cb && cb(res.data);
        },
        fail: res => {
            console.log('lotteryRedpack/addLotteryUser fail:', JSON.stringify({
                watermark,
                fromId
            }), res);
        }
    });
}


// 获取用户金额
export let getUserMoney = (watermark, cb) => {
    wx.request({
        url: `${config.zc_url}/userCenter/getUserMoney`,
        data: {
            watermark
        },
        success: (res) => {
            cb && cb(res.data);
        },
        fail: res => {
            console.log('lotteryRedpack/addLotteryUser fail:', res);
        }
    });
}