import config from '../../utils/config'


//初始化
export let checkStatus = (channelCode, programCode, cb) => {
    wx.request({
        url: `${config.https_url}/mini/checkStatus`,
        data: {
            channelCode,
            programCode
        },
        success: (res) => {
            var { data } = res.data;
            cb && cb(data, res.data.errCode)
        },
        fail: res => {
            console.log('mini/checkStatus fail:', res);
        }
    });
}  

// 历史列表
export let history = (req, cb) => {
    wx.request({
        url: `${config.https_url}/mini/${req.channelCode}/${req.programCode}/history`,
        data: {
            channelCode: req.channelCode,
            programCode: req.programCode,
            index: req.index
        },
        success: (res) => {
            var { data } = res.data;
            cb && cb(data);
        },
        fail: res => {
            console.log('mini/history fail:', res);
        }
    });
}

//顶部info
export let program = (req) => {
    wx.request({
        url: `${config.https_url}/mini/${req.channelCode}/${req.programCode}/program`,
        data: {
            channelCode: req.channelCode,
            programCode: req.programCode
        },
        success: (res) => {
            var { data } = res.data;
            req.success && req.success(data);
        },
        fail: res => {
            console.log('mini/program fail:', res);
        }
    });
}



