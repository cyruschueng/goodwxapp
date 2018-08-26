const { hostUrl, imgDirUrl } = require('../../../../config.js');
const Map = require('../../../../utils/Map');
const { NetRequest, showTips, saveFormId } = require('../../../../utils/util');
Page({
  data: {
    isUseCoverView: true,
    hasMenu: false,
    hasCard: true,
    iconUrl: {
      maskBoy: `${imgDirUrl}mask_boy_avatar.png`,
      maskGirl: `${imgDirUrl}mask_girl_avatar.png`,
      arcWhite: `${imgDirUrl}arc_white.png`,
      pen: `${imgDirUrl}pen@1x.png`,
      position: `${imgDirUrl}icon_position.png`,
      msg: `${imgDirUrl}icon_msg.png`,
      share: `${imgDirUrl}icon_share.png`,
      arrow_top: `${imgDirUrl}icon_arrow_top.png`,
      arrow_bottom: `${imgDirUrl}icon_arrow_bottom.png`,
    },
    
    userInfo: {
      avatarUrl: `${imgDirUrl}headimg/8181505803971749.jpg`,
      nickName: '一颗心只为伱',
      desc: '想交个女朋友，相信缘分的可以随便聊聊',
      time: ['2017-08-15', '10:02:57']
    }
  },

  onLoad(){
    //console.log(wx.canIUse('cover-view'));
    let self = this;
    if (wx.canIUse('cover-view')){ //判断是否支持cover-view
      self.init();
    }else{  //不支持则显示告知升级微信版本
      self.setData({
        isUseCoverView: false
      });
    }
  },

  init(){
    let self = this;
    let map = new Map();
    
  },

  switchMenu() {
    let hasMenu = this.data.hasMenu;
    this.setData({
      hasMenu: !hasMenu
    });
  },

  //地图类
  tapMap(e){
    this.setData({
      hasCard: false
    });
  },

  

  tapPos(){
    
  }
})