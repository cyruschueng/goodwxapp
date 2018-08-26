//  mission/guess.js

let questionIndex = 1;

const ajax = require('../ajax.js');

/*
  说明： 获取下一个题目
*/
const next = function (missionId, callback) {

  questionIndex++;
  console.log(questionIndex)

  ajax.post('/mission/guess/next.ashx', {
    missionId: missionId
  }, callback, null, {
      code: 0,
      message: '成功',
      data: {
        missionId: 1,
        questionId: 2,
        voiceUrl: '',
        title: '魂斗罗',
        category: '游戏',
        tip: '上上下下左左右右',
        questionIndex: questionIndex,
        questionCount: 5,
        author: {
          header: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520788630722&di=efdf0233b520d2dc9d6907acfc6673ce&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01df25579edca20000018c1bce2efb.png',
          nick: '申栩',
          sex: '男性',
          age: '1983',
        }
      }
    })
}

module.exports = {
  next: next
}
