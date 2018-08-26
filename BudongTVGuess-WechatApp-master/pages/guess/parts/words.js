const animate = require('../../../utils/animate.js');

//  清除待选字动画
const clearAllWord = function(allWords){

  for (let i = 0; i < allWords.length; i++) {
    allWords[i].animate = null;
  }
  return allWords;
};

//  获取待选字
const getAllWord = function (words) {

  words = (words || '').split('');
  var items = [];
  var index = -1;
  while (words.length > 0) {
    index = Math.round(Math.random() * (words.length - 1));
    items.push({
      'tip': words[index],
      'text': words[index],
      'animate': animate.word.choiceNone()
    });
    words.splice(index, 1);
  }
  return items;
}

//  重置选项动画
const resetTitleWord = function(titleIndex, titleWords, allWords, callback){

  allWords = clearAllWord(allWords);

  for (let i = titleIndex; i < titleWords.length; i++) {
    if (titleWords[i].index > -1) {
      allWords[titleWords[i].index].text = allWords[titleWords[i].index].tip;
      allWords[titleWords[i].index].animate = animate.word.choiceIn((i - titleIndex) * 100);
      titleWords[i].text = '';
      titleWords[i].index = -1;
      titleWords[i].animate = animate.word.entryOut((i-titleIndex) * 100);
    }
  }

  titleIndex = titleIndex;

  callback && callback(titleIndex, titleWords, allWords);
};

//  设置选项
const setTitleWord = function (titleIndex, titleWords, allIndex, allWords, callback) {

  titleWords = titleWords || [];
  allWords = allWords || [];

  if (allWords[allIndex]['text'] != ''){
    for (let i = 0; i < allWords.length; i++) {
      if (allIndex == i) {
        allWords[i]['text'] = '';
        allWords[i]['animate'] = animate.word.choiceOut();
      } else {
        allWords[i]['text'] = allWords[i]['text'];
        allWords[i]['animate'] = null;
      }
    }
    titleWords[titleIndex]['text'] = allWords[allIndex].tip;
    titleWords[titleIndex]['index'] = allIndex;
    titleWords[titleIndex]['animate'] = animate.word.entryIn();

    titleIndex += 1;

    callback && callback(titleIndex, titleWords, allWords);
  }
};

//  格式化选项
const getTitleWord = function(title) {

  var items = [];
  var titles = (title || '').split('');
  for (let i = 0; i < titles.length; i++) {
    items.push({
      'tip': titles[i],
      'text': '',
      'index': -1,
      'animate': animate.word.entryNone()
    });
  }
  return items;
};

const getTitleResult = function(titleWords){

  titleWords = titleWords || [];
  for(let i = 0; i < titleWords.length; i++){
    if (titleWords[i].tip != titleWords[i].text){
      return false;
    }
  }
  return true;
};

module.exports = {
  getAllWord: getAllWord,
  resetTitleWord: resetTitleWord,
  setTitleWord: setTitleWord,
  getTitleWord: getTitleWord,
  getTitleResult: getTitleResult
};