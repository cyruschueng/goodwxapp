import config from './utils/config'

App({
  
  title: '',
  scene: 0,
  shareTicket: '',
  issueCode: '', //期数code
  onLaunch: function (options) {
    wx.showLoading({
      title: '界面加载中...',
    });
    console.log("app onLaunch:", options);
    this.shareTicket = options.shareTicket || '';

    if (options.scene) {
      this.scene = options.scene;
    }
    var {
            channel_code,
      program_code,
      appid,   
      extAppid
        } = wx.getExtConfigSync();
    this.channel_code = channel_code;
    this.program_code = program_code;

    //console.log("onLaunch:", options);
  },
  onShow: function (options) {

    try {
      var res = wx.getSystemInfoSync()
      console.log('基础库版本：', res.SDKVersion)
    } catch (e) {
      // Do something when catch error
    }

    console.log("app onShow:", options);
    this.scene = options.scene || 0;
    this.shareTicket = options.shareTicket || '';

  },
  getOpenGIdMy(id, iv, encryptedData, cb) {
    this.getWatermark((watermark) => {
      wx.request({
        url: `${config.zc_url}/lotteryRedpack/userGroupInto`,
        method: 'POST',
        data: {
          id,
          watermark,
          iv,
          encryptedData
        },
        success: (res) => {
          console.log('lotteryRedpack/userGroupInto success req:', JSON.stringify({
            id,
            watermark,
            iv,
            encryptedData
          }));

          console.log('lotteryRedpack/userGroupInto success res:', res);

          if (res.statusCode == 200) {
            cb && cb(res.data);
          } else {
            console.log('lotteryRedpack/userGroupInto statusCode != 200:', res);

          }
        },
        fail: (res) => {
          console.log('lotteryRedpack/userGroupInto fail :', res);
        }
      });
    });
  },
  getOpenGId(id, cb) {
    wx.getShareInfo({
      shareTicket: this.shareTicket,
      success: (res) => {
        console.log('wx.getShareInfo success:', res);

        var { iv, encryptedData } = res;

        this.getOpenGIdMy(id, iv, encryptedData, cb);

      }
    });
  },
  getWatermark(cb) {
    wx.checkSession({
      success: () => {
        var watermark = wx.getStorageSync(this.program_code + '_watermark');
        if (!watermark) {
          this.login(cb);
        } else {
          wx.setStorageSync(this.program_code + "_watermark", watermark);
          cb && cb(watermark);
        }

      },
      fail: () => {
        //console.log('水印过期');
        this.login(cb);
      }
    });
  },

  login(cb) {

    var {
            channel_code,
      program_code,
      appid,
      extAppid
        } = wx.getExtConfigSync();

    wx.login({
      success: function (res) {
        console.log('login 参数：', JSON.stringify({
          appId: appid,
          channelCode: channel_code,
          code: res.code,
          extAppid: extAppid,
          programCode: program_code
        }))

        if (res.code) {
          //发起网络请求
          wx.request({
            url: `${config.https_url}/mini/login`,
            method: 'POST',
            data: {
              appId: appid,
              channelCode: channel_code,
              code: res.code,
              extAppid: extAppid,
              programCode: program_code
            },
            success: (res) => {
              console.log('login res:', res);
              if (res.statusCode == 200) {
                var watermark = res.data.data
                if (watermark) {
                  wx.setStorageSync(program_code + "_watermark", watermark);
                  cb && cb(watermark);
                }
              } else {

                //console.log('mini/login errCode :', res);
              }
            },
            fail: (res) => {
              console.log('mini/login fail :', res);
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  //流量统计id 是否存在， 不存在调用统计接口并存入id，存在就不做处理
  //flowId 静态资源id
  //issueCode 期数code 在初始化接口返回
  flowStatis(flowId) {
    this.recordAdvert('CLICK', flowId);

    var key = 'flowArr_' + flowId;
    var flowObj = wx.getStorageSync(key);
    if (flowObj) {
      return false;
    } else {
      wx.setStorageSync(key, flowId);
      if (this.issueCode) {
        this.recordFlow(flowId, this.issueCode);
      } else {
        console.log('没调统计，期数code不存在！');
      }
      return true;
    }
  },
  // 流量统计
  recordFlow(flowId, issueCode) {
    this.getWatermark((watermark) => {
      wx.request({
        url: `${config.zc_url}/log/flow`,
        method: 'POST',
        data: {
          watermark,
          resourceCode: flowId,
          issueCode
        },
        success: (res) => {
          console.log('流量 统计成功');
        },
        fail: res => {
          console.log('/log/flow fail:', res);
        }
      });
    });
  },
  // 电话热线统计
  // advertiserId 广告商id
  // issueCode 期数code init接口取
  recordHotline(advertiserId, issueCode) {
    this.getWatermark((watermark) => {
      wx.request({
        url: `${config.zc_url}/log/hotline`,
        method: 'POST',
        data: {
          watermark,
          advertiserId,
          channelCode: this.channel_code,
          programCode: this.program_code,
          issueCode
        },
        success: (res) => {
          console.log('电话热线 统计成功');
        },
        fail: res => {
          console.log('/log/hotline fail:', res);
        }
      });
    });
  },

  //广告统计
  //advertEvent 类型, 0: 曝光 1: 点击 2: 分享 = ['EXPOSURE', 'CLICK', 'SHARE'],
  recordAdvert(advertEvent, resourceCode) {
    this.getWatermark((watermark) => {
      wx.request({
        url: `${config.zc_url}/log/advert`,
        method: 'POST',
        data: {
          advertEvent,
          watermark,
          resourceCode,
          issueCode: this.issueCode
        },
        success: (res) => {
          console.log('广告CLICK 统计成功');
        },
        fail: res => {
          console.log('/log/advert fail:', res);
        }
      });
    });
  }
});