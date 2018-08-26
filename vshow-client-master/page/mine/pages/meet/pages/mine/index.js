const { imgDirUrl } = require('../../../../../../config');
const { NetRequest, showTips } = require('../../../../../../utils/util.js');
Page({
  data: {
    userAvatarUrl: `${imgDirUrl}headimg/8181505803971749.jpg`,

    fnItem: [{
      icon: '',
      text: '左滑右滑',
      isOpen: true,
      iconClass: 'i_swipe'
    }, {
      icon: '',
      text: '消息',
      isOpen: true,
      iconClass: 'i_msg'
      }, {
        icon: '',
        text: '朋友圈',
        isOpen: false,
        iconClass: 'i_space'
    },{
      icon: '',
      text: '设置',
      isOpen: false,
      iconClass: 'i_set'
      },{
        icon: '',
        text: '新手指导',
        isOpen: false,
        iconClass: 'i_guide'
    },{
      icon: '',
      text: '推荐给好友',
      isOpen: false,
      iconClass: 'i_share'
    }]
  }
})