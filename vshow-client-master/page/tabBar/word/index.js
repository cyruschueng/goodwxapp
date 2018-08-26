// pages/find/find.js
const imgRootDir = '/page/common/resources/kindWord';
const data = {
  wordBgUrl: `${imgRootDir}/word_bg.jpg`,
  wordList: [{
    url: 'make/make',
    text: '以一当百',
    imgPath: `${imgRootDir}/yydb.jpg`,
    pid: 1
  }, {
      url: 'make/make',
      text: '扑朔迷离',
      imgPath: `${imgRootDir}/psml.jpg`,
      pid: 2
  }]
}
Page({
  data,

  onShareAppMessage() {
    return {
      title: '一起制作美图佳句吧'
    }
  }
})