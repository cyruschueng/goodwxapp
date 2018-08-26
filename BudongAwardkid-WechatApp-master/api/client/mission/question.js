//  client/mission/question.js

const ajax = require('../../ajax.js');

/*
  说明：获取指定关卡的所有题目
*/
const list = function (questionId, callback) {

  var questions = []

  for (let i = 0; i < 5; i++) {
    questions.push({
      id: i,
      title: '题目标题文字' + i,
      tip: '答案提示'
    })
  }

  ajax.post('/client/mission/question/list.ashx', {
    questionId: questionId
  }, callback, null, {
      code: 0,
      message: '成功',
      data: {
        pageCount: 1,
        items: questions
      }
    })
}

/*
  说明：添加新题目
*/
const add = function(missionId, title, tip, category, voiceFileName, callback){

  ajax.post('/client/mission/question/add.ashx', {
    missionId: missionId,
    title: title,
    tip: tip,
    category: category,
    voiceFileName: voiceFileName
  }, callback, null, {
      code: 0,
      message: '成功'
    })
}

/*
  说明：删除题目
*/
const _delete = function (questionId, callback){

  ajax.post('/client/mission/question/delete.ashx', {
    questionId: questionId
  }, callback, null, {
      code: 0,
      message: '成功'
    })
}

module.exports = {
  list: list,
  add: add,
  _delete: _delete
}
