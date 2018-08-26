/**
 * Created by songyongming on 2017/4/17.
 */
var system = require('./utils/system.js')
var utils = require('./utils/util.js')
var wc = require('./utils/wcache.js')


/* 获取七牛token */
function getQiniuVideoTokenApi(successCB) {
    system.myRequest('https://api.maiyizhi.cn/index.php?r=api/upload/gettoken',{bucket: 'video'},successCB);
}
function getQiniuImageTokenApi(successCB) {
    system.myRequest('https://api.maiyizhi.cn/index.php?r=api/upload/gettoken',{bucket: 'pics'},successCB);
}
function getImage(imageUrl,tapUrl,successCB, failCB) {
    system.myRequest('https://'+utils.randdomDomain()+'.maiyizhi.cn/producter/php/frontend/web/index.php?r=data/default/picture',
        {
            imageUrl: imageUrl,
            tapUrl: tapUrl,
        }, successCB, failCB);
}

module.exports = {
  getImage: getImage,
    getQiniuVideoTokenApi: getQiniuVideoTokenApi,
    getQiniuImageTokenApi: getQiniuImageTokenApi,
}
