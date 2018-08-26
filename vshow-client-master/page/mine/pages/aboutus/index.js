const { addLeaveWords } = require('../../../../config');
const data = {
  fnList: [{
    id: 0,
    title: '为我们代言',
    desc: '生成您的私人代言微V秀海报'
  }/*, {
      id: 1,
      title: '吐槽我们',
      desc: '吐槽、建议、赞美、抨击，都可以私信我们'
  }, {
      id: 2,
      title: '最新公告',
      desc: '一些最新动态会在这里展示'
    }*/]
}


Page({
  data,

  tapMedia(e){
    let id = e.currentTarget.id - 0;
    switch(id){
      case 0:   //为我们代言
        wx.navigateTo({
          url: '../wodaiyan/index',
        })
      break;
      case 1:   //吐槽我们
        wx.navigateTo({
          url: '../../../common/textarea/index?url=' + addLeaveWords,
        })
        break;

      case 2:   //最新公告
        wx.navigateTo({
          url: '/plugins/wecropper/index?cutHeight=400',
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