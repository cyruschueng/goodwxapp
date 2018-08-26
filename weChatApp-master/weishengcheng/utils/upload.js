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
function getExtand(path) {
    var index1 = path.lastIndexOf(".");
    var index2 = path.length;
    return path.substring(index1, index2);
}
/* 上传一段视频 */
function uploadVideo(video, successCB, failCB) {
    if (wx.canIUse&&wx.canIUse('getFileInfo')) {
        wx.getFileInfo({
            filePath: video.tempFilePath,
            success(re) {
                console.log(re.size)
                if (re.size > 6000000) {
                    wx.hideNavigationBarLoading();
                    wx.hideToast();
                    util.showTips('视频最大限制为5M哦');
                } else {
                    _uploadVideo(video, successCB, failCB)
                }
            },fail(){
                _uploadVideo(video, successCB, failCB)
            }
        })
    }else{
        _uploadVideo(video, successCB, failCB)
    }
}

function _uploadVideo(video, successCB, failCB) {
    var extand = getExtand(video.tempFilePath);
    // 获取七牛上传token
    api.getQiniuVideoTokenApi(function (token) {
        if (token) {
            // 上传视频
            var flie = video.tempFilePath.split('//')[1];
            var key = randomString(32);
            wx.uploadFile({
                url: 'https://upload.qiniup.com',
                filePath: video.tempFilePath,
                name: 'file',
                formData: {
                    'token': token.token,
                    'file': flie,
                    'key': key + extand
                },
                // 上传成功，为video添加一个url属性，回调给外面
                success: function (remoteUrl) {
                    console.log(remoteUrl)
                    var aa = JSON.parse(remoteUrl.data);
                    if(aa.key){
                        var video_url = 'http://video.maiyizhi.cn/';
                        video_url += aa.key
                        var video = {"url": video_url};
                        successCB(video);
                    }else{
                        failCB(video);
                    }
                },
                fail: function () {
                    failCB(video);
                }
            })
        } else {
            failCB(video);
        }
    })
}

/* 上传一张图片 */
function uploadSingleB(pic, successCB) {
    var extand = getExtand(pic.path);
    // 获取七牛上传token
    api.getQiniuImageTokenApi(function (token) {
        if (token) {
            // 获取图片宽高信息
            wx.getImageInfo({
                src: pic.path,
                success: function (info) {
                    // 上传图片
                    var flie = pic.path.split('//')[1];
                    var key = randomString(32);
                    wx.uploadFile({
                        url: 'https://upload.qiniup.com',
                        filePath: pic.path,
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
                                pic.url =  img_url;
                                pic.width = info.width;
                                pic.height = info.height;
                                pic.state = 2;
                                console.log(pic)
                                successCB(pic);
                            }else{
                                pic.state = 3;
                                successCB();
                            }
                        },
                        fail: function (e) {
                            console.log(e)
                            pic.state = 3;
                            successCB();
                        }
                    })
                },
                fail: function () {
                    pic.state = 3;
                    successCB();
                }
            })
        } else {
            pic.state = 3;
            successCB();
        }
    })
}

module.exports = {
    uploadSingleB: uploadSingleB,
    uploadVideo: uploadVideo
}