// pages/cvs/cvs.js

const w = wx.getSystemInfoSync();
const win = {
        windowWidth: w.windowWidth,
        windowHeight: w.windowWidth * 1.79 + Math.floor(210 * w.windowWidth / 750 * 100) / 100
    }
;

const app = getApp();

const avatarUrl = "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqVJZwIuhcenSVMv4fjslVOPuLYSLNOv3oxluJfuIdc5cECgzeJsokMJnNRJVk93W0W90AEREiaglg/0"

const lineHeight = 30;

function canvasTextAutoLine(str, ctx, initX, initY, canvasWidth, lineHeight) {
    // var ctx = canvas.getContext("2d");
    var lineWidth = 0;
    var lastSubStrIndex = 0;
    var strArr = [];

    for (let i = 0; i < str.length; i++) {
        lineWidth += ctx.measureText(str[i]).width;
        if (lineWidth / 1.3 > canvasWidth - initX) {//减去initX,防止边界出现的问题
            strArr.push(str.substring(lastSubStrIndex, i));
            lineWidth = 0;
            lastSubStrIndex = i;
        }
        if (i == str.length - 1) {
            strArr.push(str.substring(lastSubStrIndex))

        }
    }
    return strArr;
}

/**
 * 进行缩放
 * @param size
 * @returns {number}
 */
function getScaleSize(size) {
    const retio = win.windowWidth / 750;

    return Math.floor(size * retio * 100) / 100;

}

function getTxtWidth(ctx, txt) {
    return ctx.measureText(txt).width * 1.3;
}

const reportTxt = {
    5: '厉害了，你可能就是传说中的“学霸”、“别人家的孩子”，旁人对你的专注力水平只有羡慕的份儿！能在自己想做的事情上坚持很久、且保持高效的专注力，让你受益匪浅，请坚持下去吧！本款游戏也适用于学前孩童的专注力测试，你家娃有没有学霸潜质？快来测一测吧！提前掌握孩子的专注力水平，并有助于进一步激发学习兴趣、养成良好学习习惯喔！',
    3: '恭喜你，你的专注力不错，但暂未达到优秀水平。也许会因专注力不够，导致很多事情做得不够完美。多多挑战拼单词训练，并注意有意识地提高做事效率，专注力水平自然会悄然提升。本款游戏也适用于学前孩童的专注力测试，你家娃有没有学霸潜质？快来测一测吧！提前掌握孩子的专注力水平，有助于进一步激发学习兴趣、养成良好学习习惯喔！',
    1: '注意啦，你的体质很可能自带“不被外界打扰”的属性，专注力就像风一样捉摸不定。别着急，多多挑战拼单词训练，并在平时有意识地提高做事效率，专注力水平会一步步提升的。本款游戏也适用于学前孩童的专注力测试，你家娃有没有学霸潜质？快来测一测吧！提前掌握孩子的专注力水平，有助于进一步激发学习兴趣、养成良好学习习惯喔！'
}


Page({

    /**
     * 页面的初始数据
     */
    data: {
        level: 5,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let num = 5;

        if (options.num > 5 && options.num < 15) {
            num = 3;
        } else if (options.num > 15) {
            num = 5;
        } else {
            num = 1;
        }

        this.setData({
            level: num
        })
        // wx.getImageInfo({
        //     src: '../res/ruleTxt.png',
        //     success: function (res) {
        //         console.log(res.width)
        //         console.log(res.height)
        //     },
        //     error: function (err) {
        //         console.log(err);
        //     }
        // })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

        const context = wx.createCanvasContext('firstCanvas');
        const flowerNum = this.data.level;
        const flowerGap = 10;

        const rect = {
            w: 300,
            h: 200
        }
        const _sArr = canvasTextAutoLine(reportTxt[this.data.level], context, 0, 0, rect.w / 2 - 10, 25);
        // this.ctx = context;

        // 绘制背景

        const bgRepeatNum = Math.floor(win.windowHeight / getScaleSize(64)) + 1;

        for (let ri = 0; ri < bgRepeatNum; ri++) {
            context.drawImage('../../res/rslt_bg.png', 0, ri * getScaleSize(64), win.windowWidth, getScaleSize(64))
        }


        context.drawImage('../../res/cvsHeader.png', getPosX(651), 0, getScaleSize(651), getScaleSize(319));

        context.save();

        // context.
        // console.log(app.globalData.userInfo);

        // 绘制 昵称
        context.setFontSize(20);
        context.setFillStyle('#1e3693');
        // context.fillText('This is a test', 100, 500);
        // context.fillText("my", getPosX(context.measureText(app.globalData.userInfo.nickName).width * 2), getScaleSize(367) + getScaleSize(30));
        context.fillText("my", getPosX(context.measureText('my').width * 2), getScaleSize(367) + getScaleSize(30));

        // const rStart = context.measureText(`真棒！获得${this.data.level}朵红花`).width;
        const rStart = getTxtWidth(context, `真棒！获得${this.data.level}朵红花`);
        context.fillText("真棒！获得", getPosX(rStart * 2), getScaleSize(580));
        context.setFillStyle("red");
        context.fillText(this.data.level, getPosX(rStart * 2) + getTxtWidth(context, '真棒！获1'), getScaleSize(580));
        context.setFillStyle("#1e3693")
        context.fillText('朵红花', getPosX(rStart * 2) + getTxtWidth(context, '真棒！获得3'), getScaleSize(580));
        // context.fillText("真棒！获得", getPosX(context.measureText(`真棒！获得${this.data.level}朵红花`).width * 2), getScaleSize(430))

        context.restore();
        context.beginPath();


        // 绘制 花朵
        const flowerY = getScaleSize(424);
        const flowerSize = getScaleSize(101);
        const flowerStartX = (win.windowWidth - flowerGap * (flowerNum - 1) - flowerNum * flowerSize) * 0.5;

        for (let i = 0; i < flowerNum; i++) {
            context.drawImage('../../res/flower.png', flowerStartX + i * (flowerSize + flowerGap), flowerY, flowerSize, flowerSize);

        }

        context.restore();
        context.save();

        // 绘制评价框体

        context.translate(win.windowWidth / 2 - rect.w / 2, getScaleSize(630));

        context.rect(0, 0, rect.w, 30 * _sArr.length + 20);
        context.setFillStyle('#e1f7fd');

        context.fill();
        context.lineJoin = 'round';
        context.lineWidth = 2;
        context.setStrokeStyle("#1e3693");
        context.stroke();
        context.restore();

        context.save();

        // 绘制评价
        context.translate(win.windowWidth / 2 - rect.w / 2, getScaleSize(630));
        context.setFontSize(14);
        context.setFillStyle('#354eb5');


        _sArr.map((s, idx) => {
            context.fillText(s, 10, idx * lineHeight + lineHeight);
        });


        // context.fillText('sdfafadsfadsfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasfafasfasfadf', 20, 20);
        context.restore();
        context.save();
        // 绘制二维码
        context.drawImage('../../res/qrcode.png', getPosX(210), win.windowHeight - getScaleSize(210) * 1.5, getScaleSize(210), getScaleSize(210));
        // context.drawImage('../../res/qrcode.png', 300, 300, getScaleSize(210), getScaleSize(210));


        context.restore();

        context.beginPath();
        // 绘制头像

        // context.translate(0, 0);
        // context
        context.arc(win.windowWidth / 2, getScaleSize(239 + 70), getScaleSize(54), 0, 2 * Math.PI);
        context.setFillStyle('green');
        context.stroke();
        context.clip();
        wx.downloadFile({
            url: avatarUrl,
            success: function () {
                context.drawImage(avatarUrl, getPosX(108), getScaleSize(239 + 17), getScaleSize(104), getScaleSize(104));
                context.draw();

            }
        });
        context.restore();
        context.save();
        // context.beginPath();
        // context.translate(0, 0);
        // context.setFontSize(20);
        // context.setFillStyle('yellow');
        // // context.fillText('This is a test', 100, 500);
        // context.fillText('ddddd', getPosX(context.measureText(app.globalData.userInfo.nickName).width), getScaleSize(367));
        // context.restore();


        context.restore();
        context.draw();


        const txt = wx.createCanvasContext('btnCvs');

        txt.beginPath();
        txt.rect(0, 0, 100, 40);
        txt.setFillStyle('#1e3693');
        txt.fill();
        txt.save();
        txt.beginPath();

        txt.setFillStyle('white');

        txt.setFontSize(14);
        txt.fillText('保存图片', 22, 22);
        txt.restore();
        txt.draw();


        function getPosX(size) {
            return (win.windowWidth - getScaleSize(size)) * 0.5
        }
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    saveImage() {
        wx.showLoading();
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: win.windowWidth,
            height: win.windowHeight,
            destWidth: win.windowWidth,
            destHeight: win.windowHeight,
            quality: 1,
            fileType: 'png',
            canvasId: 'firstCanvas',
            success: function (res) {
                console.log(res.tempFilePath);
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success(res) {
                    }
                })

                wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 2000
                })
            },
            complete: function () {
                wx.hideLoading();
            }
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    canvasIdErrorCallback(e) {
        console.log(e);
    }

})