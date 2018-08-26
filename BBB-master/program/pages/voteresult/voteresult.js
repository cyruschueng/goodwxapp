// pages/voteresult/voteresult.js
const util = require('../../utils/util.js')
const APPID = 'wx54231d717faf9546';
const SECRET = 'bde1565093996f734f0389402f2a1bea';
let CODE = 'BTC';
let checked = false;
let app = getApp();
const HOST = 'https://bit.macsen318.com/xcx';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coinName: CODE,
     all:{
       gain:'0%',
       loss:'0%'
     },
     group:{
       gain: '0',
       loss: '0'
     },
     from:2
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    CODE = options.coin || CODE;
    checked = options.checked || false;
    this.setData({
      coinName:CODE
    });
    wx.setStorageSync('coin', CODE);
    wx.showShareMenu({
      withShareTicket: true,
      success: function (res) {
        // 分享成功
        console.log('shareMenu share success')
        console.log('分享' + res)
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    })
  },
  getGroupInfo: function(){
    let that = this;
    let openGId = wx.getStorageSync('opengid');
    util.requestGet(`main/getGroupOne/${openGId}/${CODE}`,function(response){
      let group = response.details.info,
        gain = parseFloat(group.gain / group.total*100).toFixed(2)+'%',
        loss = parseFloat(group.loss / group.total*100).toFixed(2)+'%';

    //  group.gain = gain;
    //  group.loss = loss;

          that.setData({
            group: group
          });
    })
  },
  getAllInfo: function () {
    let that = this;
    util.requestGet(`main/getOne/${CODE}`, function (response) {
      let all = response.details.info,
        gain = parseFloat(all.gain / all.total * 100).toFixed(2) + '%',
        loss = parseFloat(all.loss / all.total * 100).toFixed(2) + '%';

      all.gain = gain;
      all.loss = loss;

      that.setData({
        all: all
      });
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;
    let opts = wx.getStorageSync('ops'),
      isChecked = checked || false;
    console.log(`isChecked${isChecked}`)
    if (opts.scene == 1044 || isChecked || !opts.scene) {
      this.setData({
        from: 1
      })
    }else{
      wx.reLaunch({
        url: "/pages/bindex/bindex"
      })
    }
  }, 

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    let opts = wx.getStorageSync('ops');
    //坑
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        if (res.code) {
          wx.setStorageSync('code', res.code);
          //发起网络请求
          wx.request({
            url: `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${res.code}&grant_type=authorization_code`,
            success: function (res) {
              wx.setStorageSync('openid', res.data.openid);
              wx.setStorageSync('session_key', res.data.session_key);
              that.getOpenGid(opts, function () {
                let openId = wx.getStorageSync('openid');
                let that = this;
                let url = `main/getCoin/${CODE}`;
                //获取币消息
                util.requestGet(url, function (response) {
                  console.log(JSON.stringify(response));
                  if (response.ok !== true && response.message.indexOf('token') == -1) {
                    wx.reLaunch({
                      url: "/pages/index/index",
                    })
                  } else if (response.ok !== true && response.message.indexOf('token') > -1) {
                   // that.onReady();
                  } else {
                    //获取某用户某币种的盈利情况
                    util.requestGet(`main/getLastPeriodsInfo/${openId}/${CODE}`, function (response) {
                      let status = response.details.info;
                      console.log(`status:${status}`);
                      if (status == 0) {
                        wx.redirectTo({
                          url: "/pages/index/index"
                        })
                      } else {
                        that.getAllInfo();
                        that.getGroupInfo();
                      }
                    });
                  }
                });
              }.bind(that));  
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });

    
  },
  getOpenGid: function (ops,cb) {
    var that = this;
    //获取openGid
    console.log('ops.scene' + ops.scene);
    if (ops.scene == 1044 || ops.scene == 1008) { // 当用户通过带 shareTicket 的分享卡片进入小程序时，小程序才开始读取群聊信息
    //if (ops.scene == 1034) { //测试
       console.log(ops.shareTicket)  //你可以取消这段代码的注释，将 shareTicket 输出至控制台
      wx.getShareInfo({
        shareTicket: ops.shareTicket,
        complete(res) {
          console.log('获取openGid$'+JSON.stringify(res)); // 输出加密后的当前群聊的 openGId
          console.log(`sessionKey:${wx.getStorageSync('session_key')},encryptedData:${res.encryptedData}, iv:${res.iv}`); 
          util.requestPost('main/decodeData',{
            sessionKey: wx.getStorageSync('session_key'),
            encryptedData: res.encryptedData,
            iv: res.iv
          },function(response){
            console.log(JSON.stringify(response));
            if(response.ok === true) {
              wx.setStorageSync('opengid', JSON.parse(response.details.decodeData).openGId);
              that.getTokenByGroup(cb);
            } 
          })
        }
      })
    } else {
      //获取token
      //that.getTokenByList(cb);
    }
  },
  //从小程序列表
  getTokenByList: function (cb) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let openid = wx.getStorageSync('openid');
    let url = `${HOST}/main/addUser/${openid}`;
    openid && wx.request({
      url: url,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        wx.hideLoading();
        console.log('token:' + res.data.details.token);
        wx.setStorageSync('token', res.data.details.token);
        cb && cb();
      },
      fail: function () {
        wx.hideLoading()
      }
    })
  },
  //从群分享中进入
  getTokenByGroup: function (cb) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let openid = wx.getStorageSync('openid');
    let openGid = wx.getStorageSync('opengid');
    let url = `${HOST}/main/addUser/${openid}/${openGid}`;
    openGid && wx.request({
      url: url,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        wx.hideLoading();
        wx.setStorageSync('token', res.data.details.token);
        console.log(cb);
        cb && cb();
      },
      fail: function () {
        wx.hideLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    // if (res.from === 'button') {
    //   // 来自页面内转发按钮
    //   console.log(res.target)
    // }
    return {
      title: CODE,
      path: `/pages/voteresult/voteresult?coin=${CODE}`,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  jumpurl:function(){
    wx.navigateTo({
      url: "/pages/bindex/bindex"
    });
  }
})