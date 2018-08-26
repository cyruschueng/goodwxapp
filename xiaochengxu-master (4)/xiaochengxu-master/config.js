
const ENV = 'prod';//prod||dev
let API_HOST = '';

if (ENV == 'prod') {
  API_HOST = 'https://user.999d.com/api/';
} else {
  API_HOST = 'http://user.i999d.cn:9805';
}

module.exports = {
  API_HOST: API_HOST,
}