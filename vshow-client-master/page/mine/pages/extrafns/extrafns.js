let { imgDirUrl } = require('../../../../config');
const data = {
  subwayMapUrl: `${imgDirUrl}/subway_map.jpg`,
  fnList: [{
    id: 0,
    title: '扫码',
    desc: '扫码识别二维码信息，以助分析'
  }, {
      id: 1,
      title: '裁剪工具1',
      desc: '裁切比例: 1:1，用途：制作头像等'
    }, {
      id: 2,
      title: '裁剪工具2',
      desc: '裁切比例: 4:3，手机常用比例'
  }/*,{
    id: 3,
    title: '寻觅',
    desc: '通过头像遇见更好的遇见吧'
    } */]
}


Page({
  data,

  tapMedia(e){
    let id = e.currentTarget.id - 0;
    switch(id){
      case 0:   //北京地图
        wx.navigateTo({
          url: '../scancode/index',
        })
      break;
      case 1:   //图片裁剪1
        wx.navigateTo({
          url: '/page/common/wecropper/index',
        })
        break;

      case 2:   //图片裁剪2
        wx.navigateTo({
          url: '/page/common/wecropper/index?cutHeight=400',
        })
        break;

      case 3:   //探探
        wx.navigateTo({
          url: '../meet/index',
        })
        break;

      
    }
  },
  onShareAppMessage() {
    return {
      title: '一起来玩转微V秀吧',
      path: '/page/tabBar/photo/index'
    }
  }
})