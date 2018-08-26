var api = require('../api.js')
var util = require('util.js')

/* 随机生产字符串 */
function randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;
    var pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

// 获取扩展名
function getExtand(path = '') {
    var index1 = path.lastIndexOf(".");
    var index2 = path.length;
    return path.substring(index1, index2);
}

/* 上传一张图片 */
function uploadSingleB(path, successCB) {
    var extand = getExtand(path);
    // 获取七牛上传token

    api.getQiniuImageTokenApi(function (token) {
        if (token) {
            // 获取图片宽高信息
            wx.getImageInfo({
                src: path,
                success: function (info) {
                    // 上传图片
                    console.log("info",info)
                    console.log("path",path)
                    // var flie = path.split('//')[1];
                    var flie = path;
                    var key = randomString(32);
                    // console.log("file",file)
                    wx.uploadFile({
                        url: 'https://upload.qiniup.com',
                        filePath: path,
                        name: 'file',
                        formData: {
                            'token': token.token,
                            'file': flie,
                            'key': key + extand
                        },
                        // 上传成功，构造remoteUrl，回调给外面
                        success: function (remoteUrl) {
                             
                            var aa = JSON.parse(remoteUrl.data);
                            var img_url = 'http://pics.maiyizhi.cn/';
                            img_url += aa.key;
                            if(aa.key) {
                              let pic = {}
                              pic.url = img_url;
                              pic.width = info.width;
                              pic.height = info.height;
                              successCB(pic);
                            }else{
                                successCB();
                            }
                        },
                        fail: function (e) {
                            console.log(123123)
                            successCB();
                        }
                    })
                },
                fail: function () {
                    successCB();
                }
            })
        } else {
            successCB();
        }
    })
}

module.exports = {
    uploadSingleB: uploadSingleB
}