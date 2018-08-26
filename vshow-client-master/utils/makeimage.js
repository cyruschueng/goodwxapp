/*
  *服务器生成图片对象
  对应文件为speciallist 和makespecial

*/
const { imgDirUrl } = require('../config');
const fnList = [{
  id: 0,   //发光瓶子
  mainImgUrl: `${imgDirUrl}banner_factory.jpg`,
  subImgUrl: `${imgDirUrl}personality.jpg`,
  title: '发光瓶子',
  formList: [{
    id: 0,
    tips: '自定义文字',
    placeholder: '仅限3个字'
  }]
}, {
    id: 1,   //赵丽颖举牌
  mainImgUrl: `${imgDirUrl}banner_zly.jpg`,
  subImgUrl: `${imgDirUrl}tips_zly.jpg`,
  title: '赵丽颖 举牌',
  formList: [{
    id: 0,
    tips: '第一行文字',
    placeholder: '最多10个字'
  },{
    id: 1,
    tips: '第二行文字',
    placeholder: '最多10个字'
  }]
  }, {
    id: 2,   //angela举牌
    mainImgUrl: `${imgDirUrl}banner_angel.png`,
    subImgUrl: `${imgDirUrl}tips_angel.png`,
    title: 'Angelababy 举牌',
    formList: [{
      id: 0,
      tips: '第一行文字',
      placeholder: '最多6个字'
    }, {
      id: 1,
      tips: '第二行文字',
      placeholder: '最多6个字'
    }]
}]
module.exports = fnList;