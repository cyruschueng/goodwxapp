/**
 * Created by GUQIANG on 2017/11/21.
 */
module(function (render) {
    var introStr = "<div class='pc-info'>" +
                        "<div class='pc-info-title'>第23届冬季奥运会开幕了！新华社独家带你全景看冬奥，还可订制你的冬奥海报，一起来参与吧！</div>" +
                        "<div class='pc-info-content'>"+
                                "<div class='pc-info-item'><div class='pc-info-item-title'>制作团队：</div><div class='pc-info-item-text'></div></div>"+
                                "<div class='pc-info-item'><div class='pc-info-item-title'>出品人：</div><div class='pc-info-item-text'>许基仁、兰红光、陈凯星、冯瑛冰</div></div>"+
                                "<div class='pc-info-item'><div class='pc-info-item-title'>监制：</div><div class='pc-info-item-text'>袁建、周杰、马书平</div></div>"+
                                "<div class='pc-info-item'><div class='pc-info-item-title'>策划：</div><div class='pc-info-item-text'>周继坚、牟帆\n</div></div>"+
                                "<div class='pc-info-item'><div class='pc-info-item-title'>记者：</div><div class='pc-info-item-text'>王镜宇、费茂华、吕小炜、高洁、王昊飞、赵逸赫、耿学鹏、姚琪琳</div></div>"+
                                "<div class='pc-info-item'><div class='pc-info-item-title'>制作：</div><div class='pc-info-item-text'>马发展、焦旭锋</div></div>"+
                                "<div class='pc-info-item'><div class='pc-info-item-title'>技术支持：</div><div class='pc-info-item-text'>微景天下、天天P图</div></div>"+
                        "</div>"+
                    "</div>";
    var models = {
        men: [{
            id: 6100,
            thumbnail: '/images/moban/boy1.jpg'
        },
            {
            id: 6260 ,
            thumbnail: '/images/moban/boy2.jpg'
        },
            {
            id: 6097,
            thumbnail: '/images/moban/boy3.jpg'
        },{
            id: 6098,
            thumbnail: '/images/moban/boy4.jpg'
        },{
            id: 6099,
            thumbnail: '/images/moban/boy5.jpg'
        }],
        women: [{
            id: 6091,
            thumbnail: '/images/moban/girl1.jpg'
        },{
            id: 6092,
            thumbnail: '/images/moban/girl2.jpg'
        },{
            id: 6093,
            thumbnail: '/images/moban/girl3.jpg'
        },
            {
            id: 6260 ,
            thumbnail: '/images/moban/boy2.jpg'
        },
            {
            id: 6095,
            thumbnail: '/images/moban/girl4.jpg'
        }]
    }
    // utils
    var getModels = function(){
        return models
    }
    var getRandomModel = function(isMan){
        var model = models[isMan ? 'men' : 'women']
        return model[Math.floor(Math.random() * model.length)]
    }
    var errorMap = {
        '4096': {
            msg: '参数非法'
        },
        '12289': {
            msg: '应用不存在'
        },
        '12801': {
            msg: '素材不存在'
        },
        '12802': {
            msg: '素材ID与应用ID不匹配'
        },
        '16389': {
            msg: '缺失API权限'
        },
        '16396': {
            msg: '图片格式非法'
        },
        '16397': {
            msg: '图片体积过大'
        },
        '16402': {
            msg: '图片没有人脸或人脸无法识别'
        },
        '16403': {
            msg: '相似度错误'
        },
        '16404': {
            msg: '人脸检测失败'
        },
        '16405': {
            msg: '图片解码失败'
        },
        '16406': {
            msg: '特征处理失败'
        },
        '16407': {
            msg: '提取轮廓错误'
        },
        '16408': {
            msg: '提取性别错误'
        },
        '16409': {
            msg: '提取表情错误'
        },
        '16410': {
            msg: '提取年龄错误'
        },
        '16411': {
            msg: '提取姿态错误'
        },
        '16412': {
            msg: '提取眼镜错误'
        },
        '16413': {
            msg: '提取魅力值错误'
        },
        '16415': {
            msg: '图片为空'
        },
        '16418': {
            msg: '人脸不存在'
        },
        '16421': {
            msg: '人脸个数超过限制'
        },
        '16422': {
            msg: '个体个数超过限制'
        },
        '16425': {
            msg: '无效的图片格式'
        },
        '16426': {
            msg: '图片模糊度检测失败'
        }
    }
    var getErrorMap = function(){
        return errorMap
    }
    var getErrorMsgByCode = function(code){
        if(!code || !errorMap[code+'']){
            return null
        }
        return errorMap[code+'']
    }

    var getCreateDom = function(name){
        return document.createElement(name)
    }
    var getCompressRatio = function (base) {
        if(!base){
            return 0.6
        }
        return Math.min(0.6, 1/(base.length / BASEMAXLEN))
    }
    var BASEMAXLEN = 100 * 1024
    var getCompressImg = function(base, max, callback){
        max = max || BASEMAXLEN
        if(!base){
            return callback('未有选中的图片')
        }
        if(base.length < max){
            return callback(null, base)
        }
        if(!/^data:image\/jpeg/.test(base)){
            base = 'data:image/jpeg;base64,' + base
        }
        var img = getCreateDom('img')
        var cvs = getCreateDom('canvas')
        var ctx = cvs.getContext('2d')
            ctx.fillStyle='#ffffff'
        var canvas = getCreateDom('canvas')
        var context = canvas.getContext('2d')
            context.fillStyle = '#ffffff'
        img.onload = function(){
            cvs.width = img.naturalWidth
            cvs.height = img.naturalHeight
            canvas.width = cvs.width
            canvas.height = cvs.height
            ctx.fillRect(0, 0, cvs.width, cvs.height)
            ctx.drawImage(this, 0, 0, cvs.width, cvs.height)
            var index = 10
            var ratio = 0.8
            while((base.length > max) && index){
                context.fillRect(0, 0, canvas.width, canvas.height)
                canvas.width *= ratio
                canvas.height *= ratio
                context.drawImage(cvs, 0, 0, cvs.width, cvs.height, 0, 0, canvas.width, canvas.height)
                base = canvas.toDataURL('image/jpeg', 0.6)
                index--
                // console.log(base.length)
            }
            callback(null, base)
        }
        img.onerror = function(){
            callback('图片解析失败,请重新选择尝试')
        }
        img.src = base
    }
    return {
        getRandomModel: getRandomModel,
        getModels: getModels,
        getErrorMap: getErrorMap,
        getErrorMsgByCode: getErrorMsgByCode,
        introStr: introStr,
        getCompressRatio: getCompressRatio,
        getCompressImg: getCompressImg
    }
})