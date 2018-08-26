
var app = getApp()

Page({
  data: {
    rentText:'租金',
    rentArray: ['不限', '0-1元/㎡·天', '1-2元/㎡·天', '2-3元/㎡·天', '3-4元/㎡·天', '4-5元/㎡·天','5元/㎡·天以上'],
    rentFlag:0,
    areaText:'面积',
    areaArray: ['不限', '0-100㎡', '100-200㎡', '200-300㎡', '300-500㎡', '500-1000㎡','1000㎡以上'],
    areaFlag:0,
    decorateText:'装修',
    decorateArray:['不限','毛坯','简装','精装','中装','豪装'],
    decorateFlag:0,
    list:[
      { title: '某某大厦A座7楼', rent: '1.3', area: '400', dec: '毛坯', price: '1.5', image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519744832666&di=96439e226c36de39ced65ba1653ef14f&imgtype=0&src=http%3A%2F%2Fstatic-xiaoguotu.17house.com%2Fxgt%2Fs%2F20%2F1462883864149aa.jpg'},
      { title: '某某大厦B座15楼', rent: '2', area: '1000', dec: '简装', price: '6', image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519744802296&di=997eaa93a7869e92dee2dc667b971caa&imgtype=0&src=http%3A%2F%2Fwww.hw3a.cn%2Fupfiles%2Fimage%2Fimage%2F20160303%2F20160303104520_32038.jpg' },
      { title: '某某大厦C座9楼', rent: '4', area: '500', dec: '精装', price: '5.3', image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519744936056&di=c0668eb1fdba784c5fcf2bd0679e62ae&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F35%2F11%2F24A58PICJ46_1024.jpg' }
    ]
  },
  onLoad: function () {
    
  },
  navToDetail: function (e) {
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  }
})
