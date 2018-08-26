/**
 * Created by GUQIANG on 2017/11/21.
 */
// var params = {
//     app_id: 1106699138, // int 应用标识
//     image: '',// 原始图片的base64编码数据（大小上限500KB）
//     model: 1, // int 模板id
//     nonce_str: '123',// string 非空且长度上限32字节
//     // sign: '',// string 非空且长度固定32字节
//     time_stamp: ''// int 请求时间戳（秒级）
// }
module('config.js', function (config) {
    var faceMergeUrl = 'https://api.ai.qq.com/fcgi-bin/ptu/ptu_facemerge'
    var APPKEY = '8UDQHdS5wUK40otT'
    var APPID  = 1106699138
    var BASEMAXLEN = 500 * 1024
    // utils
    var getDealAppKey = (function(){
        var delAppKey = null
        return function(){
            if(delAppKey){
                return delAppKey
            }
            delAppKey = 'app_key='+decodeURI(APPKEY)
            return delAppKey
        }
    })()
    var getCreateDom = function(name){
        return document.createElement(name)
    }
    var getTimeStampSeconds = function(){
        return Math.floor(+new Date())
    }
    var getSign = function(obj){
        var str = ''
        for(var i in obj){
            str += (str ? '&' : '' )
            str += i + '=' + decodeURI(obj[i])
        }
        str += '&' + getDealAppKey()
        return com.vizengine.$.md5(str)
    }
    var getCompressImg = function(base, callback){
        if(!base){
            return callback('未有选中的图片')
        }
        if(base.length < BASEMAXLEN){
            return callback(null, base)
        }
        var img = getCreateDom('img')
        var cvs = getCreateDom('canvas')
        var ctx = cvs.getContext('2d')
        ctx.fillStyle='#ffffff'
        img.onload = function(){
            cvs.width = img.naturalWidth
            cvs.height = img.naturalHeight
            ctx.fillRect(0, 0, cvs.width, cvs.height)
            ctx.drawImage(this, 0, 0, cvs.width, cvs.height)
            var ratio = 0.8
            var compressRatio = 1 / Math.floor(base.length / BASEMAXLEN)
            var compressBase = cvs.toDataURL('image/jpeg', compressRatio)
            while(compressBase.length > BASEMAXLEN){
                compressRatio = compressRatio * ratio
                compressBase = cvs.toDataURL('image/jpeg', compressRatio)
            }
            callback(null, compressBase)
        }
        img.onerror = function(){
            callback('图片解析失败,请重新选择尝试')
        }
        img.src = base
    }

    var mergePost = function(base, modelId, callback){
        modelId = modelId || (config.getRandomModel()).id
        var params = {
            app_id: APPID,
            image: base.split("base64,")[1],
            model: modelId,
            nonce_str: '123',
            time_stamp: getTimeStampSeconds()
        }
        console.log(params)
        var sign = getSign(params)
        params.sign = sign
        console.log(params)
        $.post(faceMergeUrl, params, function (res) {
                res = JSON.parse(res);
                console.log(res)
            }
        )
    }
    var mergeFace = function(base, modelId, callback){
        getCompressImg(base, function(err, compressBase){
            if(err){
                callback && callback({
                    res: -11111,
                    msg: err
                })
            } else {
                mergePost(compressBase, modelId, callback)
            }
        })
    }
    return {
        mergeFace: mergeFace
    }
})