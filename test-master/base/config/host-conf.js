const ENV_LIST = [
  {
    envName: 'dev',
    dirName: 'lingju-manage',
    apiHostname: 'http://192.168.1.212/restful',
    assetHostname: 'http://managedev.lingju360.natappvip.cc'
  },
  {
    envName: 'test',
    dirName: 'lingju-manage',
    apiHostname: 'http://biz.lingju360.natappvip.cc/restful',
    assetHostname: 'http://manage.lingju360.natappvip.cc'
  },
  {
    envName: 'prod',
    dirName: 'lingju-manage',
    apiHostname: 'http://biz.lingju360.com/restful',
    assetHostname: 'http://manage.lingju360.com'
  },
]


const HOST_ENV = process.env.HOST_ENV
let HOST_CONF
if (HOST_ENV === undefined) {
  // 没有设置环境，则默认为第一个
  HOST_CONF = ENV_LIST[0]
  console.log('缺少参数，默认使用 host-conf.js 的 ENV_LIST 的第一个参数')
} else {
  console.log( '选择的打包接口配置是：' + HOST_ENV)
  for (let i = 0; i < ENV_LIST.length; i++) {
    if (ENV_LIST[i].envName === HOST_ENV) {
      HOST_CONF = ENV_LIST[i]
      break
    }
  }
}
if (HOST_CONF === undefined) {
  HOST_CONF = ENV_LIST[0]
  console.log('参数错误，默认使用 host-conf.js 的 ENV_LIST 的第一个参数')
}

process.env.HOST_NAME = HOST_CONF.apiHostname

module.exports.HOST_CONF = HOST_CONF
