const { imgDirUrl, getUserInfoUrl, hostUrl } = require('../../../../../../config');
const { NetRequest, showTips } = require('../../../../../../utils/util.js');
const app = getApp();
Page({
  data: {
    userAvatarUrl: `${imgDirUrl}headimg/8181505803971749.jpg`,
    customer: {},
    user: {}
  },
  
  onLoad(params){
    let { id } = params;
    let self = this;
    if (!id) return console.log('不存在');
    let userInfo = app.globalData.userInfo;
    NetRequest({
      url: getUserInfoUrl,
      data: {
        id
      },
      success(res) {
        //console.log(res);
        let { statusCode, data } = res;
        //console.log(isMatches, halfId);
        if (-statusCode === -200) {  //获取用户信息成功
          !/http/.test(data.avatarUrl) && (data.avatarUrl = hostUrl + data.avatarUrl);
          self.setData({
            customer: data
          });
        }else{
          showTips('获取失败,稍后重试');
        }
      },
      fail(res) {
        showTips('获取失败,稍后重试');
      }
    });
    self.setData({
      user: userInfo
    }
      
    );
  },

  beginSwipe(){
    wx.navigateBack({
      delta: 1
    });
  },

  beginChat(){
    let { customer } = this.data;
    wx.redirectTo({
      url: '../chat/index?id=' + customer._id
    });
  }
})