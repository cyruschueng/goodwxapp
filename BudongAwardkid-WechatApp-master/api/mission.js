//  mission.js

const ajax = require('./ajax.js');
const guess = require('./mission/guess.js');

/*
  说明：获取关卡列表
*/
const list = function (pageId, callback) {

  var missions = []

  for (let i = 0; i < 10; i++){
    missions.push({
      id: i*pageId,
      title: '关卡标题文字' + i + '-' + pageId,
      questionCount: i * 10,
      playerCount: i * 10,
      tags: ['电视剧', '综艺'],
      avatarUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=783526612,483245127&fm=27&gp=0.jpg',
      nick: '昵称',
      age: 1980 + i,
      sex: i % 2 == 0 ? '女性' : '男性'
    })
  }

  ajax.post('/mission/list.ashx', {
    pageId: pageId
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
  说明：获取关卡详情
*/
const detail = function(missionId, callback){

  ajax.post('/mission/detail.ashx', {
    missionId: missionId
  }, callback, null, {
    code: 0,
    message: '成功',
    data: {
      title: '那些经典的金庸武侠剧',
      questionCount: 15,
      playerCount: 245,
      tags: ['电视剧', '广告', '综艺'],
      avatarUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520788630722&di=efdf0233b520d2dc9d6907acfc6673ce&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01df25579edca20000018c1bce2efb.png',
      nick: '申栩',
      sex: '男性',
      age: '1983'
    }
  })
}

/*
  说明：获取关卡排行榜
*/
const rank = function(missionId, callback){

  ajax.post('/mission/rank.ashx', {
    missionId: missionId
  }, callback, null, {
    code: 0,
    message: '成功',
    data: {
      missionId: 2,
      title: '儿时的经典游戏',
      questionIndex: 3,
      questionRight: 3,
      questionCount: 5,
      items: [
        {
          avatarUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=783526612,483245127&fm=27&gp=0.jpg',
          nick: '申栩',
          score: 12,
          seconds: '1:00',
          subjectCount: 12
        },
        {
          avatarUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520788630722&di=efdf0233b520d2dc9d6907acfc6673ce&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01df25579edca20000018c1bce2efb.png',
          nick: '罗宾',
          score: 12,
          seconds: '3:00',
          subjectCount: 12
        },
        {
          avatarUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520788628883&di=14537bc9b4e13650214684a1a913058b&imgtype=0&src=http%3A%2F%2Fimg4q.duitang.com%2Fuploads%2Fitem%2F201408%2F25%2F20140825221216_hweTn.png',
          nick: '丽塔',
          score: 12,
          seconds: '23:00',
          subjectCount: 12
        }, {
          avatarUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=783526612,483245127&fm=27&gp=0.jpg',
          nick: '申栩',
          score: 12,
          seconds: '12:00',
          subjectCount: 12
        },
        {
          avatarUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520788630722&di=efdf0233b520d2dc9d6907acfc6673ce&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01df25579edca20000018c1bce2efb.png',
          nick: '罗宾',
          score: 10,
          seconds: '23:00',
          subjectCount: 12
        },
        {
          avatarUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520788628883&di=14537bc9b4e13650214684a1a913058b&imgtype=0&src=http%3A%2F%2Fimg4q.duitang.com%2Fuploads%2Fitem%2F201408%2F25%2F20140825221216_hweTn.png',
          nick: '丽塔',
          score: 5,
          seconds: '23:00',
          subjectCount: 12
        }
      ]
    }
  })
}

module.exports = {
  list: list,
  detail: detail,
  rank: rank,
  guess: guess
}
