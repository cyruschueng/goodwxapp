//  client.js

const ajax = require('./ajax.js');
const mission = require('./client/mission.js');

/*
  说明：获取用户 Token
*/
const token = function(scene, callback){

  ajax.post('/client/token.ashx', {
    scene: scene 
  }, callback, null, {
    code: 0,
    message: '成功',
    data: {
      session3rd: '11111111',
      nick: '申栩 ',
      gender: 2,
      birthyear: 1982,
      avatarUrl: 'http://iconfont.alicdn.com/t/1499666341672.png@100h_100w.jpg'
    }
  })
}

/*
  说明：用户登录
*/
const login = function(code, callback){

  ajax.post('/client/login.ashx', { 
    code: code 
  }, callback, null, {
    code: 0,
    message: '成功',
    data: {
      session3rd: '11111111'
    }
  })
}

/* 
  说明：更新出生年份
*/
const birthyear = function (birthyear, callback) {

  ajax.post('/client/birthyear.ashx', {
    birthyear: birthyear
  }, callback, null, {
      code: 0,
      message: '成功'
    })
}

/* 
  说明：获取排行榜
*/
const rank = function(callback){

  ajax.post('/client/rank.ashx', {
  }, callback, null, {
      code: 0,
      message: '成功',
      data: {
        missionCount: 23,
        questionCount: 163,
        rankInAll: 235,
        rankInFriend: 7,
        friends: [
          {
            header: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=783526612,483245127&fm=27&gp=0.jpg',
            nick: '申栩',
            questionCount: 120,
            missionCount: 23
          },
          {
            header: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520788630722&di=efdf0233b520d2dc9d6907acfc6673ce&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01df25579edca20000018c1bce2efb.png',
            nick: '罗宾',
            questionCount: 28,
            missionCount: 17
          },
          {
            header: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520788628883&di=14537bc9b4e13650214684a1a913058b&imgtype=0&src=http%3A%2F%2Fimg4q.duitang.com%2Fuploads%2Fitem%2F201408%2F25%2F20140825221216_hweTn.png',
            nick: '丽塔',
            questionCount: 28,
            missionCount: 17
          }, {
            header: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=783526612,483245127&fm=27&gp=0.jpg',
            nick: '申栩',
            questionCount: 28,
            missionCount: 17
          },
          {
            header: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520788630722&di=efdf0233b520d2dc9d6907acfc6673ce&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01df25579edca20000018c1bce2efb.png',
            nick: '罗宾',
            questionCount: 193,
            missionCount: 38
          },
          {
            header: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520788628883&di=14537bc9b4e13650214684a1a913058b&imgtype=0&src=http%3A%2F%2Fimg4q.duitang.com%2Fuploads%2Fitem%2F201408%2F25%2F20140825221216_hweTn.png',
            nick: '丽塔',
            questionCount: 28,
            missionCount: 17
          }
        ]
      }
    })
}

/*
  说明：用户关系
*/
const relate = function (fromClientId, encryptedData, iv, callback){

  ajax.post('/client/relate.ashx', {
    fromClientId: fromClientId,
    encryptedData: encryptedData,
    iv: iv
  }, callback, null, {
    code: 0,
    message: '成功'
  })
}

/*
  说明：分享
*/
const share = function (encryptedData, iv, callback){

  ajax.post('/client/share.ashx', {
    encryptedData: encryptedData,
    iv: iv
  }, callback, null, {
    code: 0,
    message: '成功'
  })
}

module.exports = {
  token: token,
  login: login,
  birthyear: birthyear,
  mission: mission,
  rank: rank,
  relate: relate,
  share: share
}
