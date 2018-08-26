const schedule = require('node-schedule');
const http = require('axios')
const secret = require('../secret.js')

let token = null;

schedule.scheduleJob('49 * * * *',async function () {
  let myToken = await getTokenFromServer();
  console.log("token 换了", myToken)
  token = myToken.access_token;
});

const getTokenFromServer = async function () {
  return new Promise((resolve, reject)=> {
    let authURL = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='
    authURL = authURL + secret.appID + '&secret=' + secret.appSecret
    http.get(authURL).then(res=> {
      resolve(res.data)
    }).catch(err=> {
      reject(err)
    })
  })
};

const getToken = async function () {
  return new Promise(async (resolve,reject)=> {
    if(token){
      resolve(token);
    }else {
      let myToken =  await getTokenFromServer();
      
      token = myToken.access_token;
      resolve(token);
    }
  })
}

module.exports = getToken
