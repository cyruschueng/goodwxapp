// 存放所有的接口，和接口所请求的方式
const main = 'https://easy-mock.com/mock/5a40aeb29a7a835ab48c46bf/example'
const baseUrl = 'http://192.168.1.175:8180' // 瑞峰服务

export const TO_LOGIN = { url: main + '/mock', type: 'get' } // 登陆接口
export const TEST2 = { url: main + '/upload', type: 'post' } // 登陆接口
