const { imgDirUrl, getUserInfoUrl, hostUrl } = require('../../../../../../config');
const { NetRequest, showTips } = require('../../../../../../utils/util.js');
const app = getApp();
Page({
  data: {
    imgUrl: `${imgDirUrl}headimg/8181505803971749.jpg`,
    iconManUrl: `${imgDirUrl}icon_man_black.png`,
    iconGirlUrl: `${imgDirUrl}icon_girl_black.png`,
    iconLikeMiniUrl: `${imgDirUrl}icon_like_mini.png`,
    iconShareUrl: `${imgDirUrl}icon_share.png`,
    customer: {},
    user: {}
  },

  onLoad(params){
    let { id } = params, self = this;
    if(!id) return console.error('id无效');
    NetRequest({
      url: getUserInfoUrl,
      data: {
        id
      },
      success(res){
        //console.log(res);
        let { statusCode, data } = res;
        if (-statusCode === -200) {
          !/http/.test(data.avatarUrl) && (data.avatarUrl = hostUrl + data.avatarUrl);
          self.setData({
            customer: data
          });
        } else {
          showTips(data);
        }
      },
      fail(res){
        showTips('获取失败');
      }
    });

    app.getUserInfo(userInfo => {
      self.setData({
        user: userInfo
      });
    });
  }



})