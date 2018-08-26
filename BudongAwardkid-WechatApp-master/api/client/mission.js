//  client/mission.js

const ajax = require('../ajax.js');
const question = require('./mission/question.js');

/*
  说明：获取用户创建的所有关卡
*/
const list = function (callback) {

  var missions = []

  for (let i = 0; i < 5; i++) {
    missions.push({
      id: i,
      title: '关卡标题文字' + i
    })
  }

  ajax.post('/client/mission/list.ashx', {
  }, callback, null, {
      code: 0,
      message: '成功',
      data: {
        pageCount: 3,
        items: missions
      }
    })
}

/*
  说明：创建新关卡
*/
const create = function (title, callback) {

  ajax.post('/client/mission/create.ashx', {
    title: title
  }, callback, null, {
      code: 0,
      message: '成功',
      data: {
        missionId: 222
      }
    })
}

module.exports = {
  list: list,
  create: create,
  question: question
}
