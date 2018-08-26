//index.js
//获取应用实例
var app = getApp()
var sv = require('../../utils/server.js')
Page({
  data: {
    imgUrls: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517818839&di=72cfaeb7571ce0fc4a16c7b6063931b1&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.lvmama.com%2Fuploads%2Fpc%2Fplace2%2F2014-10-11%2F1412999804752.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517224171569&di=2e4553fc0cc25c31cd2b5ec34221bbca&imgtype=0&src=http%3A%2F%2Fwww.hpa.net.cn%2Fbinger%2Fimages2%2F2015-4-26%2F201504260051589012_3693.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517224246653&di=b18314f46ffe3d4ad57f6dee48e3f1ae&imgtype=0&src=http%3A%2F%2Fwww.zt.zj.com%2Fcns%2F2012_3thyzj%2F192114_1.jpg'
    ],
    iconList: [],
    dataList:[
      { image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517291968254&di=ac7a0fa146d7b5ed01ee4bbb8717716a&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F7a899e510fb30f2404da4ef0c295d143ac4b0384.jpg', title: '湖畔民宿风情', subTitle: '像家一样温馨' },
      { image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517294252883&di=79c0aec9384e2dd577b38ee7cbfb0268&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3D47252ce41a38534398c28f62fb7ada0b%2Ffaf2b2119313b07eb88f8f8006d7912397dd8c0c.jpg', title: '芦苇从中嬉戏', subTitle: '体验不一样的湖畔活动' }
    ]
  },
  navTodetail(e){
    wx.navigateTo({
      url: '/pages/details/' + e.currentTarget.dataset.page + '/' + e.currentTarget.dataset.page,
    })
  },
  navToList(e){
    wx.navigateTo({
      url: '/pages/list/list?id='+e.currentTarget.dataset.id,
    })
  },
  onLoad: function () {
    this.setData({
      iconList:sv.iconList
    })
  },
  onShareAppMessage(){
    
  }

})
