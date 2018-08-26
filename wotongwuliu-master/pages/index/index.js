//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    companyName1:"上海沃通物流有限公司",
    jianjie:"的服务品质",
    jianjie_title1:"专业  ",
    jianjie2: "的服务体验",
    jianjie_title2: "航空  ",
    company_product1:"国内整车直达  零担快运  仓储",
    address:"上海地址:上海青浦区(九星市场)嘉松中路4451弄18号",
    address2: "江苏地址:江苏南通海门扬子江路666号",
    address3: "安徽地址:安徽省颍上县政务北路199号",
    time:"8:30-21:00",
    phoneNumber:"131-6700-0028",
    telphone:'131-6700-0038',
    picture:"公司照片"

    },

  
  bindComImg1: function () {
    wx.navigateTo({
      url: '../comimg1/comimg1?title= ',
    })
  },
  bindComImg2: function () {
    wx.navigateTo({
      url: '../comimg2/comimg2?title= ',
    })
  },
  bindComImg3: function () {
    wx.navigateTo({
      url: '../comimg3/comimg3?title= ',
    })
  },
  bindComImg4: function () {
    wx.navigateTo({
      url: '../comimg4/comimg4?title= ',
    })
  },
  bindComImg5: function () {
    wx.navigateTo({
      url: '../comimg5/comimg5?title= ',
    })
  },
  bindComImg6: function () {
    wx.navigateTo({
      url: '../comimg6/comimg6?title= ',
    })
  },
  bindComImg7: function () {
    wx.navigateTo({
      url: '../comimg7/comimg7?title= ',
    })
  },
  bindComImg8: function () {
    wx.navigateTo({
      url: '../comimg8/comimg8?title= ',
    })
  },
  bindComImg9: function () {
    wx.navigateTo({
      url: '../comimg9/comimg9?title= ',
    })
  },

  contact: function () {
    wx.navigateTo({
      url: 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=ACCESS_TOKEN',
    })
  },


//图片预览
  previewImg01: function (event) {
    var ImageLinkArray = [
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/k2yYSrXDIffIzjF85jqSabS1SvTDu4m2JJ3LsOfEcGo!/b/dPIAAAAAAAAA&bo=SwOAAgAAAAARAP0!&rf=viewer_4",
      "http://a1.qpic.cn/psb?/V14aANop016eIZ/giNrZad1nrDOz23VfcCGsj7yDDs3QgR7i97A1NIegw8!/b/dD4BAAAAAAAA&bo=qgPkAQAAAAARAHs!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/LuBsoqDg8zm.nC9yTfDpqbOnna5VpU8j.K2vq9Pw4So!/b/dPIAAAAAAAAA&bo=IAMkAgAAAAARADI!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/H3eDldOuHVdBch6AK2u7gkVIC.HYFJ.zXVz2pUDugSI!/b/dGoBAAAAAAAA&bo=IAMaAgAAAAARAAw!&rf=viewer_4",
      "http://a1.qpic.cn/psb?/V14aANop016eIZ/l48LQpD1pV8QPHtjBNy2gY*5QEWpZoDa7exaYZPATmM!/b/dD4BAAAAAAAA&bo=.AH4AQAAAAARADc!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/GAa1uYaQMAbxT5neTNbJkiPshYU.1cBz*avjr8r1g0k!/b/dPIAAAAAAAAA&bo=gAKAAgAAAAARADc!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/v..55PvpAxxZUAZhNSNza44hx1AdzFOYCPl5ocoz5zo!/b/dPIAAAAAAAAA&bo=IANZAgAAAAARAE8!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/E8PvZItgMR8jGyIt3cSxz0PPhVXaxuY2cwyynWYebP4!/b/dPIAAAAAAAAA&bo=qgNcAgAAAAARAMA!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/0HTnuOWBz8g9au839ugnzTH1bnmhj4xdvWpww7bjyGo!/b/dPIAAAAAAAAA&bo=IAMwAgAAAAARByE!&rf=viewer_4"
    ]
    wx.previewImage({
      current: ImageLinkArray[0], // 当前显示图片的http链接
      urls: ImageLinkArray,// 需要预览的图片http链接列表
    })
  },
  previewImg02: function (event) {
    var ImageLinkArray = [
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/k2yYSrXDIffIzjF85jqSabS1SvTDu4m2JJ3LsOfEcGo!/b/dPIAAAAAAAAA&bo=SwOAAgAAAAARAP0!&rf=viewer_4",
      "http://a1.qpic.cn/psb?/V14aANop016eIZ/giNrZad1nrDOz23VfcCGsj7yDDs3QgR7i97A1NIegw8!/b/dD4BAAAAAAAA&bo=qgPkAQAAAAARAHs!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/LuBsoqDg8zm.nC9yTfDpqbOnna5VpU8j.K2vq9Pw4So!/b/dPIAAAAAAAAA&bo=IAMkAgAAAAARADI!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/H3eDldOuHVdBch6AK2u7gkVIC.HYFJ.zXVz2pUDugSI!/b/dGoBAAAAAAAA&bo=IAMaAgAAAAARAAw!&rf=viewer_4",
      "http://a1.qpic.cn/psb?/V14aANop016eIZ/l48LQpD1pV8QPHtjBNy2gY*5QEWpZoDa7exaYZPATmM!/b/dD4BAAAAAAAA&bo=.AH4AQAAAAARADc!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/GAa1uYaQMAbxT5neTNbJkiPshYU.1cBz*avjr8r1g0k!/b/dPIAAAAAAAAA&bo=gAKAAgAAAAARADc!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/v..55PvpAxxZUAZhNSNza44hx1AdzFOYCPl5ocoz5zo!/b/dPIAAAAAAAAA&bo=IANZAgAAAAARAE8!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/E8PvZItgMR8jGyIt3cSxz0PPhVXaxuY2cwyynWYebP4!/b/dPIAAAAAAAAA&bo=qgNcAgAAAAARAMA!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/0HTnuOWBz8g9au839ugnzTH1bnmhj4xdvWpww7bjyGo!/b/dPIAAAAAAAAA&bo=IAMwAgAAAAARByE!&rf=viewer_4"
    ]
    wx.previewImage({
      current: ImageLinkArray[1], // 当前显示图片的http链接
      urls: ImageLinkArray,// 需要预览的图片http链接列表
    })
    ;
    wx.previewImage
  },
  previewImg03: function (event) {
    var ImageLinkArray = [
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/k2yYSrXDIffIzjF85jqSabS1SvTDu4m2JJ3LsOfEcGo!/b/dPIAAAAAAAAA&bo=SwOAAgAAAAARAP0!&rf=viewer_4",
      "http://a1.qpic.cn/psb?/V14aANop016eIZ/giNrZad1nrDOz23VfcCGsj7yDDs3QgR7i97A1NIegw8!/b/dD4BAAAAAAAA&bo=qgPkAQAAAAARAHs!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/LuBsoqDg8zm.nC9yTfDpqbOnna5VpU8j.K2vq9Pw4So!/b/dPIAAAAAAAAA&bo=IAMkAgAAAAARADI!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/H3eDldOuHVdBch6AK2u7gkVIC.HYFJ.zXVz2pUDugSI!/b/dGoBAAAAAAAA&bo=IAMaAgAAAAARAAw!&rf=viewer_4",
      "http://a1.qpic.cn/psb?/V14aANop016eIZ/l48LQpD1pV8QPHtjBNy2gY*5QEWpZoDa7exaYZPATmM!/b/dD4BAAAAAAAA&bo=.AH4AQAAAAARADc!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/GAa1uYaQMAbxT5neTNbJkiPshYU.1cBz*avjr8r1g0k!/b/dPIAAAAAAAAA&bo=gAKAAgAAAAARADc!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/v..55PvpAxxZUAZhNSNza44hx1AdzFOYCPl5ocoz5zo!/b/dPIAAAAAAAAA&bo=IANZAgAAAAARAE8!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/E8PvZItgMR8jGyIt3cSxz0PPhVXaxuY2cwyynWYebP4!/b/dPIAAAAAAAAA&bo=qgNcAgAAAAARAMA!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/0HTnuOWBz8g9au839ugnzTH1bnmhj4xdvWpww7bjyGo!/b/dPIAAAAAAAAA&bo=IAMwAgAAAAARByE!&rf=viewer_4"
    ]
    wx.previewImage({
      current: ImageLinkArray[2], // 当前显示图片的http链接
      urls: ImageLinkArray,// 需要预览的图片http链接列表
    })
  },
  previewImg04: function (event) {
    var ImageLinkArray = [
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/k2yYSrXDIffIzjF85jqSabS1SvTDu4m2JJ3LsOfEcGo!/b/dPIAAAAAAAAA&bo=SwOAAgAAAAARAP0!&rf=viewer_4",
      "http://a1.qpic.cn/psb?/V14aANop016eIZ/giNrZad1nrDOz23VfcCGsj7yDDs3QgR7i97A1NIegw8!/b/dD4BAAAAAAAA&bo=qgPkAQAAAAARAHs!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/LuBsoqDg8zm.nC9yTfDpqbOnna5VpU8j.K2vq9Pw4So!/b/dPIAAAAAAAAA&bo=IAMkAgAAAAARADI!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/H3eDldOuHVdBch6AK2u7gkVIC.HYFJ.zXVz2pUDugSI!/b/dGoBAAAAAAAA&bo=IAMaAgAAAAARAAw!&rf=viewer_4",
      "http://a1.qpic.cn/psb?/V14aANop016eIZ/l48LQpD1pV8QPHtjBNy2gY*5QEWpZoDa7exaYZPATmM!/b/dD4BAAAAAAAA&bo=.AH4AQAAAAARADc!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/GAa1uYaQMAbxT5neTNbJkiPshYU.1cBz*avjr8r1g0k!/b/dPIAAAAAAAAA&bo=gAKAAgAAAAARADc!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/v..55PvpAxxZUAZhNSNza44hx1AdzFOYCPl5ocoz5zo!/b/dPIAAAAAAAAA&bo=IANZAgAAAAARAE8!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/E8PvZItgMR8jGyIt3cSxz0PPhVXaxuY2cwyynWYebP4!/b/dPIAAAAAAAAA&bo=qgNcAgAAAAARAMA!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/0HTnuOWBz8g9au839ugnzTH1bnmhj4xdvWpww7bjyGo!/b/dPIAAAAAAAAA&bo=IAMwAgAAAAARByE!&rf=viewer_4"
    ]
    wx.previewImage({
      current: ImageLinkArray[3], // 当前显示图片的http链接
      urls: ImageLinkArray,// 需要预览的图片http链接列表
    })
  },
  previewImg05: function (event) {
    var ImageLinkArray = [
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/k2yYSrXDIffIzjF85jqSabS1SvTDu4m2JJ3LsOfEcGo!/b/dPIAAAAAAAAA&bo=SwOAAgAAAAARAP0!&rf=viewer_4",
      "http://a1.qpic.cn/psb?/V14aANop016eIZ/giNrZad1nrDOz23VfcCGsj7yDDs3QgR7i97A1NIegw8!/b/dD4BAAAAAAAA&bo=qgPkAQAAAAARAHs!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/LuBsoqDg8zm.nC9yTfDpqbOnna5VpU8j.K2vq9Pw4So!/b/dPIAAAAAAAAA&bo=IAMkAgAAAAARADI!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/H3eDldOuHVdBch6AK2u7gkVIC.HYFJ.zXVz2pUDugSI!/b/dGoBAAAAAAAA&bo=IAMaAgAAAAARAAw!&rf=viewer_4",
      "http://a1.qpic.cn/psb?/V14aANop016eIZ/l48LQpD1pV8QPHtjBNy2gY*5QEWpZoDa7exaYZPATmM!/b/dD4BAAAAAAAA&bo=.AH4AQAAAAARADc!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/GAa1uYaQMAbxT5neTNbJkiPshYU.1cBz*avjr8r1g0k!/b/dPIAAAAAAAAA&bo=gAKAAgAAAAARADc!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/v..55PvpAxxZUAZhNSNza44hx1AdzFOYCPl5ocoz5zo!/b/dPIAAAAAAAAA&bo=IANZAgAAAAARAE8!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/E8PvZItgMR8jGyIt3cSxz0PPhVXaxuY2cwyynWYebP4!/b/dPIAAAAAAAAA&bo=qgNcAgAAAAARAMA!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/0HTnuOWBz8g9au839ugnzTH1bnmhj4xdvWpww7bjyGo!/b/dPIAAAAAAAAA&bo=IAMwAgAAAAARByE!&rf=viewer_4"
    ]
    wx.previewImage({
      current: ImageLinkArray[4], // 当前显示图片的http链接
      urls: ImageLinkArray,// 需要预览的图片http链接列表
    })
  },
  previewImg06: function (event) {
    var ImageLinkArray = [
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/k2yYSrXDIffIzjF85jqSabS1SvTDu4m2JJ3LsOfEcGo!/b/dPIAAAAAAAAA&bo=SwOAAgAAAAARAP0!&rf=viewer_4",
      "http://a1.qpic.cn/psb?/V14aANop016eIZ/giNrZad1nrDOz23VfcCGsj7yDDs3QgR7i97A1NIegw8!/b/dD4BAAAAAAAA&bo=qgPkAQAAAAARAHs!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/LuBsoqDg8zm.nC9yTfDpqbOnna5VpU8j.K2vq9Pw4So!/b/dPIAAAAAAAAA&bo=IAMkAgAAAAARADI!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/H3eDldOuHVdBch6AK2u7gkVIC.HYFJ.zXVz2pUDugSI!/b/dGoBAAAAAAAA&bo=IAMaAgAAAAARAAw!&rf=viewer_4",
      "http://a1.qpic.cn/psb?/V14aANop016eIZ/l48LQpD1pV8QPHtjBNy2gY*5QEWpZoDa7exaYZPATmM!/b/dD4BAAAAAAAA&bo=.AH4AQAAAAARADc!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/GAa1uYaQMAbxT5neTNbJkiPshYU.1cBz*avjr8r1g0k!/b/dPIAAAAAAAAA&bo=gAKAAgAAAAARADc!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/v..55PvpAxxZUAZhNSNza44hx1AdzFOYCPl5ocoz5zo!/b/dPIAAAAAAAAA&bo=IANZAgAAAAARAE8!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/E8PvZItgMR8jGyIt3cSxz0PPhVXaxuY2cwyynWYebP4!/b/dPIAAAAAAAAA&bo=qgNcAgAAAAARAMA!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/0HTnuOWBz8g9au839ugnzTH1bnmhj4xdvWpww7bjyGo!/b/dPIAAAAAAAAA&bo=IAMwAgAAAAARByE!&rf=viewer_4"
    ]
    wx.previewImage({
      current: ImageLinkArray[5], // 当前显示图片的http链接
      urls: ImageLinkArray,// 需要预览的图片http链接列表
    })
  },
  previewImg07: function (event) {
    var ImageLinkArray = [
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/k2yYSrXDIffIzjF85jqSabS1SvTDu4m2JJ3LsOfEcGo!/b/dPIAAAAAAAAA&bo=SwOAAgAAAAARAP0!&rf=viewer_4",
      "http://a1.qpic.cn/psb?/V14aANop016eIZ/giNrZad1nrDOz23VfcCGsj7yDDs3QgR7i97A1NIegw8!/b/dD4BAAAAAAAA&bo=qgPkAQAAAAARAHs!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/LuBsoqDg8zm.nC9yTfDpqbOnna5VpU8j.K2vq9Pw4So!/b/dPIAAAAAAAAA&bo=IAMkAgAAAAARADI!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/H3eDldOuHVdBch6AK2u7gkVIC.HYFJ.zXVz2pUDugSI!/b/dGoBAAAAAAAA&bo=IAMaAgAAAAARAAw!&rf=viewer_4",
      "http://a1.qpic.cn/psb?/V14aANop016eIZ/l48LQpD1pV8QPHtjBNy2gY*5QEWpZoDa7exaYZPATmM!/b/dD4BAAAAAAAA&bo=.AH4AQAAAAARADc!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/GAa1uYaQMAbxT5neTNbJkiPshYU.1cBz*avjr8r1g0k!/b/dPIAAAAAAAAA&bo=gAKAAgAAAAARADc!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/v..55PvpAxxZUAZhNSNza44hx1AdzFOYCPl5ocoz5zo!/b/dPIAAAAAAAAA&bo=IANZAgAAAAARAE8!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/E8PvZItgMR8jGyIt3cSxz0PPhVXaxuY2cwyynWYebP4!/b/dPIAAAAAAAAA&bo=qgNcAgAAAAARAMA!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/0HTnuOWBz8g9au839ugnzTH1bnmhj4xdvWpww7bjyGo!/b/dPIAAAAAAAAA&bo=IAMwAgAAAAARByE!&rf=viewer_4"
    ]
    wx.previewImage({
      current: ImageLinkArray[6], // 当前显示图片的http链接
      urls: ImageLinkArray,// 需要预览的图片http链接列表
    })
  },
  previewImg08: function (event) {
    var ImageLinkArray = [
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/k2yYSrXDIffIzjF85jqSabS1SvTDu4m2JJ3LsOfEcGo!/b/dPIAAAAAAAAA&bo=SwOAAgAAAAARAP0!&rf=viewer_4",
      "http://a1.qpic.cn/psb?/V14aANop016eIZ/giNrZad1nrDOz23VfcCGsj7yDDs3QgR7i97A1NIegw8!/b/dD4BAAAAAAAA&bo=qgPkAQAAAAARAHs!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/LuBsoqDg8zm.nC9yTfDpqbOnna5VpU8j.K2vq9Pw4So!/b/dPIAAAAAAAAA&bo=IAMkAgAAAAARADI!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/H3eDldOuHVdBch6AK2u7gkVIC.HYFJ.zXVz2pUDugSI!/b/dGoBAAAAAAAA&bo=IAMaAgAAAAARAAw!&rf=viewer_4",
      "http://a1.qpic.cn/psb?/V14aANop016eIZ/l48LQpD1pV8QPHtjBNy2gY*5QEWpZoDa7exaYZPATmM!/b/dD4BAAAAAAAA&bo=.AH4AQAAAAARADc!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/GAa1uYaQMAbxT5neTNbJkiPshYU.1cBz*avjr8r1g0k!/b/dPIAAAAAAAAA&bo=gAKAAgAAAAARADc!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/v..55PvpAxxZUAZhNSNza44hx1AdzFOYCPl5ocoz5zo!/b/dPIAAAAAAAAA&bo=IANZAgAAAAARAE8!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/E8PvZItgMR8jGyIt3cSxz0PPhVXaxuY2cwyynWYebP4!/b/dPIAAAAAAAAA&bo=qgNcAgAAAAARAMA!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/0HTnuOWBz8g9au839ugnzTH1bnmhj4xdvWpww7bjyGo!/b/dPIAAAAAAAAA&bo=IAMwAgAAAAARByE!&rf=viewer_4"
    ]
    wx.previewImage({
      current: ImageLinkArray[7], // 当前显示图片的http链接
      urls: ImageLinkArray,// 需要预览的图片http链接列表
    })
  },
  previewImg09: function (event) {
    var ImageLinkArray = [
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/k2yYSrXDIffIzjF85jqSabS1SvTDu4m2JJ3LsOfEcGo!/b/dPIAAAAAAAAA&bo=SwOAAgAAAAARAP0!&rf=viewer_4",
      "http://a1.qpic.cn/psb?/V14aANop016eIZ/giNrZad1nrDOz23VfcCGsj7yDDs3QgR7i97A1NIegw8!/b/dD4BAAAAAAAA&bo=qgPkAQAAAAARAHs!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/LuBsoqDg8zm.nC9yTfDpqbOnna5VpU8j.K2vq9Pw4So!/b/dPIAAAAAAAAA&bo=IAMkAgAAAAARADI!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/H3eDldOuHVdBch6AK2u7gkVIC.HYFJ.zXVz2pUDugSI!/b/dGoBAAAAAAAA&bo=IAMaAgAAAAARAAw!&rf=viewer_4",
      "http://a1.qpic.cn/psb?/V14aANop016eIZ/l48LQpD1pV8QPHtjBNy2gY*5QEWpZoDa7exaYZPATmM!/b/dD4BAAAAAAAA&bo=.AH4AQAAAAARADc!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/GAa1uYaQMAbxT5neTNbJkiPshYU.1cBz*avjr8r1g0k!/b/dPIAAAAAAAAA&bo=gAKAAgAAAAARADc!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/v..55PvpAxxZUAZhNSNza44hx1AdzFOYCPl5ocoz5zo!/b/dPIAAAAAAAAA&bo=IANZAgAAAAARAE8!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/E8PvZItgMR8jGyIt3cSxz0PPhVXaxuY2cwyynWYebP4!/b/dPIAAAAAAAAA&bo=qgNcAgAAAAARAMA!&rf=viewer_4",
      "http://a3.qpic.cn/psb?/V14aANop016eIZ/0HTnuOWBz8g9au839ugnzTH1bnmhj4xdvWpww7bjyGo!/b/dPIAAAAAAAAA&bo=IAMwAgAAAAARByE!&rf=viewer_4"
    ]
    wx.previewImage({
      current: ImageLinkArray[8], // 当前显示图片的http链接
      urls: ImageLinkArray,// 需要预览的图片http链接列表
    })
  },

  //地图导航  高德
  Mapnavigation: function (e) {
    wx.openLocation({
      type: 'wgs84',
      latitude: 31.190523018285567,
      longitude: 121.22239999999998,
      name: '上海沃通物流有限公司',
      address: '上海青浦区(九星市场)嘉松中路4451弄18号',
      success: function () {
        console.log("地图导航成功！")
      },
      fail: function () {
        console.log("地图导航失败！")
      }
    
    })
  },

  Mapnavigation2: function (e) {
    wx.openLocation({
      type: 'wgs84',
      latitude: 31.80610501820641,
      longitude: 121.11376,
      name: '上海沃通物流有限公司',
      address: '江苏南通海门扬子江路666号',
      success: function () {
        console.log("地图导航成功！")
      },
      fail: function () {
        console.log("地图导航失败！")
      }

    })
  },


  Mapnavigation3: function (e) {
    wx.openLocation({
      type: 'wgs84',
      latitude: 32.659263371076605,
      longitude: 116.255219,
      name: '上海沃通物流有限公司',
      address: '安徽省颍上县政务北路199号',
      success: function () {
        console.log("地图导航成功！")
      },
      fail: function () {
        console.log("地图导航失败！")
      }

    })
  },
  
  //拨打电话
  callmeTap: function () {
    wx.makePhoneCall({
      phoneNumber: '13167000028',
      leading: "拨打热线",
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },

  callmephone: function () {
    wx.makePhoneCall({
      phoneNumber: '13167000038',
      leading: "拨打热线",
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  

  onLoad: function (opt) {

    //转发前配置
    wx.showShareMenu({
      withShareTicket: true
    })

    //转发到群组后打开
    /** 判断场景值，1044 为转发场景，包含shareTicket 参数 */
    if (opt.scene == 1044) {
      wx.getShareInfo({
        shareTicket: opt.shareTicket,
        success: function (res) {
          var encryptedData = res.encryptedData;
          var iv = res.iv;
        }
      })
    }
  

    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },

  //转发时获取群信息
  onShareAppMessage: function () {
    return {
      title: '沃通物流',
      desc: '小程序',
      path: '/pages/index/index'
    }
  }

})


