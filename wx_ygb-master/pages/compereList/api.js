import config from '../../utils/config'

//列表
export let msgList = (channelCode, programCode, cb) => {
    wx.request({
        url: `${config.https_url}/mini/msgList`,
        data: {
          channelCode,
          programCode
        },
        success: (res) => {
            if (res.statusCode == 200) {
                var { data } = res.data;
                if(data){
                    cb && cb(data)
                }
            }
        },
        fail: res => {
            console.log('mini/msgList fail:', res);
        }
    });
}
