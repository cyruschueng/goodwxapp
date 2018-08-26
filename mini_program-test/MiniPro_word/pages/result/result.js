// rankinglist.js
var util = require('../../utils/util.js');
var app = getApp();
var rankUrl = app.globalData.rankUrl;
var topicUrl = app.globalData.topicUrl;
var livesUrl = app.globalData.livesUrl;
var sign_key = app.globalData.sign_key,canDraw = true;
const ctx = wx.createCanvasContext('shareCanvas');
var emNum = 0,maxS=0,openid='',member_id,number,canTap=true;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        head_img:'',
        wordNum:0,
        wordSrc:'',
        wordName:'',
        nickname:'',
        maxScore:0,
        heartNum:0,
        addHeart:false,
        audioSrc:'https://qnfile.abctime.com/pkstart.mp3',
        infoStatus:false,
        ipX:app.globalData.isIpx?true:false,
        showSave:false,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        number = parseInt(options.num)||0;
        var user = JSON.parse(wx.getStorageSync('userInfo'));
        var lives = wx.getStorageSync('lives');
        console.log(user);
        maxS = wx.getStorageSync('maxScore');
        openid=wx.getStorageSync('openid');
        member_id=wx.getStorageSync('memberId');
        // this.setData({heartNum:lives,maxScore:maxS,head_img:user.avatarUrl,nickname:user.nickName,wordNum:parseInt(options.num)||0,wordSrc:options.title,wordName:options.word})
        this.setData({heartNum:lives,maxScore:maxS,head_img:user.avatarUrl,nickname:user.nickName,wordNum:parseInt(options.num)||0})
    },
    showInfo:function () {
        this.setData({infoStatus:true})
    },
    hideInfo:function () {
        this.setData({infoStatus:false})
    },
    hideAdd:function () {
        this.setData({addHeart:false})
    },
    toRank:function () {
        wx.navigateTo({
            url: '../../pages/rankinglist/rankinglist?source=1'
        })
    },
    toTest:function(){
        if(canTap){
            canTap = false;
            this.audioCtx.play();
            var s = "p1"+sign_key;
            var sign = util.SHA256(s);
            var fd={p:1,sign:sign};
            wx.request({
                url:topicUrl,
                data:fd,
                method:'POST',
                header: {"Content-Type": "application/x-www-form-urlencoded"},
                success:function (res) {
                    console.log('topic',res);
                    if(res.data.code==200){
                        app.globalData.quiz = res.data.data;
                        var data = res.data.data;
                        wx.getImageInfo({
                            src: data[0].title,
                            success:function (re) {
                                wx.redirectTo({
                                    url: '../../pages/test/test'
                                })
                            },
                            fail:function () {
                                wx.redirectTo({
                                    url: '../../pages/test/test'
                                });
                            }
                        })
                    }
                },
                fail:function (res) {
                    console.log(res);
                    canTap = true;
                    wx.showModal({
                        title: '提示',
                        content: '网络情况不好,请检查网络后重新挑战',
                        success: function(res) {
                            if (res.confirm) {
                                wx.navigateBack({
                                    delta: 2
                                })
                            } else if (res.cancel) {
                            }
                        }
                    })
                }
            })
        }
    },
    showSave:function () {
        this.setData({showSave:true})
    },
    hideSave:function () {
        this.setData({showSave:false})
    },

    saveImg113:function (e) {
        console.log(canDraw);
        if(canDraw){
            canDraw = false;
            var that = this;
            wx.showLoading({
                title: '生成图片',
            });
            var readText = '长按扫码，免费领取RAZ原版绘本';
            ctx.save();
            ctx.rect(0, 0, 600,900)
            ctx.setFillStyle('#553C7F')
            ctx.fill();
            ctx.restore();
            ctx.draw();
            // that.setData({drawEnd:true});
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 300*2,
                height: 450*2,
                destWidth: 300*2,
                destHeight: 450*2,
                canvasId: 'shareCanvas',
                success: function(data) {
                    console.log(data);
                    wx.getSetting({
                        success(res){
                            console.log(res);
                            if(!res.authSetting['scope.writePhotosAlbum']){
                                wx.authorize({
                                    scope:'scope.writePhotosAlbum',
                                    success(){
                                        wx.saveImageToPhotosAlbum({
                                            filePath:data.tempFilePath,
                                            success: function (res) {
                                                wx.hideLoading();
                                                console.log(data.tempFilePath);
                                                console.log(res);
                                                wx.showToast({
                                                    title: '保存成功',
                                                    duration: 2000
                                                })
                                                canDraw = true;
                                            },
                                            fail:function (res) {
                                                wx.hideLoading();
                                                if(res.errMsg=='saveImageToPhotosAlbum:fail system deny'){
                                                    that.showMessage('请打开系统保存照片权限')
                                                }else {
                                                    that.showMessage(res.errMsg)
                                                }
                                                canDraw = true;
                                            }
                                        })
                                    },
                                    fail(){
                                        wx.hideLoading();
                                        wx.showModal({
                                            title: '温馨提示',
                                            content: '“保存相册”授权失败，允许授权后才可保存图片到您的相册。点击授权，可重新使用',
                                            cancelText:'不授权',
                                            confirmText:'授权',
                                            success: res=>{
                                            if (res.confirm) {
                                            wx.openSetting({
                                                success: function (res) {
                                                    if (!res.authSetting['scope.writePhotosAlbum']) {
                                                        wx.authorize({
                                                            scope: 'scope.writePhotosAlbum',
                                                            success() {
                                                                wx.hideLoading();
                                                                console.log(data.tempFilePath);
                                                                console.log(res);
                                                                wx.showToast({
                                                                    title: '保存成功',
                                                                    duration: 2000
                                                                })
                                                                canDraw = true;
                                                            },
                                                            fail:function (res) {
                                                                console.log(res)
                                                                wx.hideLoading();
                                                                if(res.errMsg=='saveImageToPhotosAlbum:fail system deny'){
                                                                    that.showMessage('请打开系统保存照片权限')
                                                                }else {
                                                                    that.showMessage(res.errMsg)
                                                                }
                                                                canDraw = true;
                                                            }

                                                        })
                                                    }else {
                                                        canDraw = true;
                                                    }
                                                },
                                                fail:function (res) {
                                                    console.log(res)
                                                    canDraw = true;
                                                }
                                            })
                                        }else {
                                            canDraw = true;
                                        }
                                    }
                                    })
                                    }
                                })
                            }else{
                                wx.saveImageToPhotosAlbum({
                                    filePath:data.tempFilePath,
                                    success: function (res) {
                                        console.log(res)
                                        wx.hideLoading();
                                        wx.showToast({
                                            title: '保存成功',
                                            duration: 2000
                                        })
                                        canDraw = true;
                                    },
                                    fail:function (res) {
                                        console.log(res);
                                        wx.hideLoading();
                                        if(res.errMsg=='saveImageToPhotosAlbum:fail system deny'){
                                            that.showMessage('请打开系统保存照片权限')
                                        }else {
                                            that.showMessage(res.errMsg)
                                        }
                                        canDraw = true;
                                    }
                                })
                            }
                        }
                    })

                }
            })
        }
    },



    saveImg11:function (e) {
        console.log(canDraw);
        if(canDraw){
            canDraw = false;
            var that = this;
            wx.showLoading({
                title: '生成图片',
            });
            var readText = '长按扫码，免费领取RAZ原版绘本';
            ctx.save();
            ctx.rect(0, 0, 600,900)
            ctx.setFillStyle('#553C7F')
            ctx.fill();
            ctx.restore();
            wx.getImageInfo({
                src: that.data.head_img,
                success: function (res) {
                    console.log(res);
                    ctx.save();
                    ctx.drawImage(res.path,235,56,130,130);
                    ctx.restore();
                    wx.getImageInfo({
                        src:"https://qnfile.abctime.com/raztext.png",
                        success:function (res) {
                            ctx.save();
                            ctx.drawImage(res.path,85,263,430,30);
                            ctx.restore();
                            wx.getImageInfo({
                                src: "https://qnfile.abctime.com/codeBg.png",
                                success: function (res) {
                                    console.log(res);
                                    ctx.save();
                                    ctx.drawImage(res.path,101*2,300*2,200,200);
                                    ctx.restore();
                                    wx.getImageInfo({
                                        src: "https://qnfile.abctime.com/mini_mainCode.jpg",
                                        success: function (res) {
                                            console.log(res);
                                            ctx.save();
                                            ctx.drawImage(res.path,112.5*2,313*2,150,150);
                                            ctx.restore();
                                            wx.getImageInfo({
                                                src: "https://qnfile.abctime.com/mainsocre_bg.png",
                                                success: function (res) {
                                                    console.log(res);
                                                    ctx.save();
                                                    ctx.drawImage(res.path,69.5*2,156*2,322,276);
                                                    ctx.restore();
                                                    ctx.save();
                                                    ctx.beginPath();
                                                    ctx.setLineWidth(30)
                                                    ctx.arc(300, 121, 80, 0, 2 * Math.PI)
                                                    ctx.setStrokeStyle('#553C7F');
                                                    // ctx.setStrokeStyle('red');
                                                    ctx.stroke()
                                                    ctx.restore();
                                                    ctx.save();
                                                    ctx.beginPath();
                                                    ctx.setLineWidth(4)
                                                    ctx.arc(300, 121, 65, 0, 2 * Math.PI)
                                                    ctx.setStrokeStyle('#ffffff');
                                                    // ctx.setStrokeStyle('red');
                                                    ctx.stroke()
                                                    ctx.restore();
                                                    ctx.draw();
                                                    // that.setData({drawEnd:true});
                                                    wx.canvasToTempFilePath({
                                                        x: 0,
                                                        y: 0,
                                                        width: 300*2,
                                                        height: 450*2,
                                                        destWidth: 300*2,
                                                        destHeight: 450*2,
                                                        canvasId: 'shareCanvas',
                                                        success: function(data) {
                                                            console.log(data);
                                                            wx.getSetting({
                                                                success(res){
                                                                    console.log(res);
                                                                    if(!res.authSetting['scope.writePhotosAlbum']){
                                                                        wx.authorize({
                                                                            scope:'scope.writePhotosAlbum',
                                                                            success(){
                                                                                wx.saveImageToPhotosAlbum({
                                                                                    filePath:data.tempFilePath,
                                                                                    success: function (res) {
                                                                                        wx.hideLoading();
                                                                                        console.log(data.tempFilePath);
                                                                                        console.log(res);
                                                                                        wx.showToast({
                                                                                            title: '保存成功',
                                                                                            duration: 2000
                                                                                        })
                                                                                        canDraw = true;
                                                                                    },
                                                                                    fail:function (res) {
                                                                                        wx.hideLoading();
                                                                                        if(res.errMsg=='saveImageToPhotosAlbum:fail system deny'){
                                                                                            that.showMessage('请打开系统保存照片权限')
                                                                                        }else {
                                                                                            that.showMessage(res.errMsg)
                                                                                        }
                                                                                        canDraw = true;
                                                                                    }
                                                                                })
                                                                            },
                                                                            fail(){
                                                                                wx.hideLoading();
                                                                                wx.showModal({
                                                                                    title: '温馨提示',
                                                                                    content: '“保存相册”授权失败，允许授权后才可保存图片到您的相册。点击授权，可重新使用',
                                                                                    cancelText:'不授权',
                                                                                    confirmText:'授权',
                                                                                    success: res=>{
                                                                                    if (res.confirm) {
                                                                                    wx.openSetting({
                                                                                        success: function (res) {
                                                                                            if (!res.authSetting['scope.writePhotosAlbum']) {
                                                                                                wx.authorize({
                                                                                                    scope: 'scope.writePhotosAlbum',
                                                                                                    success() {
                                                                                                        wx.hideLoading();
                                                                                                        console.log(data.tempFilePath);
                                                                                                        console.log(res);
                                                                                                        wx.showToast({
                                                                                                            title: '保存成功',
                                                                                                            duration: 2000
                                                                                                        })
                                                                                                        canDraw = true;
                                                                                                    },
                                                                                                    fail:function (res) {
                                                                                                        console.log(res)
                                                                                                        wx.hideLoading();
                                                                                                        if(res.errMsg=='saveImageToPhotosAlbum:fail system deny'){
                                                                                                            that.showMessage('请打开系统保存照片权限')
                                                                                                        }else {
                                                                                                            that.showMessage(res.errMsg)
                                                                                                        }
                                                                                                        canDraw = true;
                                                                                                    }

                                                                                                })
                                                                                            }else {
                                                                                                canDraw = true;
                                                                                            }
                                                                                        },
                                                                                        fail:function (res) {
                                                                                            console.log(res)
                                                                                            canDraw = true;
                                                                                        }
                                                                                    })
                                                                                }else {
                                                                                    canDraw = true;
                                                                                }
                                                                            }
                                                                            })
                                                                            }
                                                                        })
                                                                    }else{
                                                                        wx.saveImageToPhotosAlbum({
                                                                            filePath:data.tempFilePath,
                                                                            success: function (res) {
                                                                                console.log(res)
                                                                                wx.hideLoading();
                                                                                wx.showToast({
                                                                                    title: '保存成功',
                                                                                    duration: 2000
                                                                                })
                                                                                canDraw = true;
                                                                            },
                                                                            fail:function (res) {
                                                                                console.log(res);
                                                                                wx.hideLoading();
                                                                                if(res.errMsg=='saveImageToPhotosAlbum:fail system deny'){
                                                                                    that.showMessage('请打开系统保存照片权限')
                                                                                }else {
                                                                                    that.showMessage(res.errMsg)
                                                                                }
                                                                                canDraw = true;
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                            })

                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })

                        }
                    })

                }
            });
        }
    },


    saveImg:function (e) {
        console.log(canDraw);
        if(canDraw){
            canDraw = false;
            var that = this;
            wx.showLoading({
                title: '生成图片',
            });
            var readText = '长按扫码，免费领取RAZ原版绘本';
            var grageText = '',tagText='';
            if(this.data.wordNum<50){
                grageText = '“美国小学一年级”';
                tagText = '真正努力过的人，就会明白天赋的重要'
            }else if(this.data.wordNum>50&&this.data.wordNum<=120){
                grageText = '“美国小学二年级”';
                tagText = '失败并不可怕，可怕的是你还相信这句话'
            }else if(this.data.wordNum>120&&this.data.wordNum<=220){
                grageText = '“美国小学三年级”';
                tagText = '生活不止眼前的苟且，还有读不完的词汇'
            }else if(this.data.wordNum>220&&this.data.wordNum<=340){
                grageText = '“美国小学四年级”';
                tagText = '如果你还在坚持，说明你还不够绝望'
            }else if(this.data.wordNum>340){
                grageText = '“美国小学五年级”';
                tagText = '恭喜你，达到了美国小学水平'
            }
            ctx.save();
            ctx.rect(0, 0, 750,1334);
            ctx.setFillStyle('#003249')
            ctx.fill();
            ctx.restore();
            wx.getImageInfo({
                src: that.data.head_img,
                success: function (res) {
                    console.log(res);
                    ctx.save();
                    ctx.drawImage(res.path,310,90,130,130);
                    ctx.restore();
                    wx.getImageInfo({
                        src: "https://qnfile.abctime.com/codeBg.png",
                        success: function (res) {
                            console.log(res);
                            ctx.save();
                            ctx.drawImage(res.path,137.5*2,460*2,200,200);
                            ctx.restore();
                            ctx.save();
                            ctx.drawImage(res.path,296,76,158,158);
                            ctx.restore();
                            wx.getImageInfo({
                                src: "https://qnfile.abctime.com/mini_qcdlCode.jpg",
                                success: function (res) {
                                    console.log(res);
                                    ctx.save();
                                    ctx.drawImage(res.path,150*2,472.5*2,150,150);
                                    ctx.restore();
                                    wx.getImageInfo({
                                        src: "https://qnfile.abctime.com/word_board.png",
                                        success: function (res) {
                                            console.log(res);
                                            ctx.save();
                                            ctx.drawImage(res.path,0,80,375*2,440*2);
                                            ctx.restore();
                                            ctx.save();
                                            ctx.setFontSize(46);
                                            ctx.setTextAlign('center');
                                            ctx.setFillStyle('#ffffff');
                                            ctx.fillText(grageText, 375, 580);
                                            ctx.restore();
                                            ctx.save();
                                            ctx.setFontSize(26);
                                            ctx.setTextAlign('center');
                                            ctx.setFillStyle('#78CAED');
                                            ctx.fillText(that.data.nickname, 375, 260);
                                            ctx.restore();
                                            ctx.save();
                                            ctx.setFontSize(76);
                                            ctx.setTextAlign('center');
                                            ctx.setFillStyle('#FFFFFF');
                                            ctx.fillText(that.data.wordNum, 375, 790);
                                            ctx.restore();
                                            ctx.save();
                                            ctx.setFontSize(26);
                                            ctx.setTextAlign('center');
                                            ctx.setFillStyle('#78CAED');
                                            ctx.fillText(readText, 375, 1200);
                                            ctx.restore();
                                            ctx.draw();
                                            // that.setData({drawEnd:true});
                                            wx.canvasToTempFilePath({
                                                x: 0,
                                                y: 0,
                                                width: 375*2,
                                                height: 667*2,
                                                destWidth: 375*2,
                                                destHeight: 667*2,
                                                canvasId: 'shareCanvas',
                                                success: function(data) {
                                                    console.log(data);
                                                    wx.getSetting({
                                                        success(res){
                                                            console.log(res);
                                                            if(!res.authSetting['scope.writePhotosAlbum']){
                                                                wx.authorize({
                                                                    scope:'scope.writePhotosAlbum',
                                                                    success(){
                                                                        wx.saveImageToPhotosAlbum({
                                                                            filePath:data.tempFilePath,
                                                                            success: function (res) {
                                                                                wx.hideLoading();
                                                                                console.log(data.tempFilePath);
                                                                                console.log(res);
                                                                                wx.showToast({
                                                                                    title: '保存成功',
                                                                                    duration: 2000
                                                                                })
                                                                                canDraw = true;
                                                                            },
                                                                            fail:function (res) {
                                                                                wx.hideLoading();
                                                                                if(res.errMsg=='saveImageToPhotosAlbum:fail system deny'){
                                                                                    that.showMessage('请打开系统保存照片权限')
                                                                                }else {
                                                                                    that.showMessage(res.errMsg)
                                                                                }
                                                                                canDraw = true;
                                                                            }
                                                                        })
                                                                    },
                                                                    fail(){
                                                                        wx.hideLoading();
                                                                        wx.showModal({
                                                                            title: '温馨提示',
                                                                            content: '“保存相册”授权失败，允许授权后才可保存图片到您的相册。点击授权，可重新使用',
                                                                            cancelText:'不授权',
                                                                            confirmText:'授权',
                                                                            success: res=>{
                                                                            if (res.confirm) {
                                                                            wx.openSetting({
                                                                                success: function (res) {
                                                                                    if (!res.authSetting['scope.writePhotosAlbum']) {
                                                                                        wx.authorize({
                                                                                            scope: 'scope.writePhotosAlbum',
                                                                                            success() {
                                                                                                wx.hideLoading();
                                                                                                console.log(data.tempFilePath);
                                                                                                console.log(res);
                                                                                                wx.showToast({
                                                                                                    title: '保存成功',
                                                                                                    duration: 2000
                                                                                                })
                                                                                                canDraw = true;
                                                                                            },
                                                                                            fail:function (res) {
                                                                                                wx.hideLoading();
                                                                                                if(res.errMsg=='saveImageToPhotosAlbum:fail system deny'){
                                                                                                    that.showMessage('请打开系统保存照片权限')
                                                                                                }else {
                                                                                                    that.showMessage(res.errMsg)
                                                                                                }
                                                                                                canDraw = true;
                                                                                            }

                                                                                        })
                                                                                    }else {
                                                                                        canDraw = true;
                                                                                    }
                                                                                },
                                                                                fail:function () {
                                                                                    canDraw = true;
                                                                                }
                                                                            })
                                                                        }else {
                                                                            canDraw = true;
                                                                        }
                                                                    }
                                                                    })
                                                                    }
                                                                })
                                                            }else{
                                                                wx.saveImageToPhotosAlbum({
                                                                    filePath:data.tempFilePath,
                                                                    success: function (res) {
                                                                        wx.hideLoading();
                                                                        wx.showToast({
                                                                            title: '保存成功',
                                                                            duration: 2000
                                                                        })
                                                                        canDraw = true;
                                                                    },
                                                                    fail:function (res) {
                                                                        wx.hideLoading();
                                                                        if(res.errMsg=='saveImageToPhotosAlbum:fail system deny'){
                                                                            that.showMessage('请打开系统保存照片权限')
                                                                        }else {
                                                                            that.showMessage(res.errMsg)
                                                                        }
                                                                        canDraw = true;
                                                                    }
                                                                })
                                                            }
                                                        }
                                                    })

                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            });
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.audioCtx = wx.createAudioContext('startAudio');
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        canTap = true;
        canDraw = true;
        wx.showShareMenu({
            withShareTicket: true,
            success: function (res) {
                // 分享成功
                // console.log(JSON.stringify(res))
            },
            fail: function (res) {
                // 分享失败
                // console.log(res)
            }
        });
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        this.setData({showSave:false});
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        this.setData({showSave:false});
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
    onShareAppMessage: function (res) {
        var that = this;
        var path = '/pages/index/index',ss=1;
        var title = '我在词汇量闯关中获得'+number+'分，你敢来挑战一下么？';
        var imageUrl = '';
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target);
            ss=2;
            path = '/pages/index/index?group=1';
            title = '超魔性的单词小游戏，看看你能排第几？';
            imageUrl = '/images/share_rankUrl.png';
        }else {
            ss=1
        }
        return {
            title: title,
            path: path,
            imageUrl:imageUrl,
            success: function(res) {
                console.log(res);
                // 转发成功
                wx.getShareInfo({
                    shareTicket: res.shareTickets[0],
                    success: function (res) {
                        console.log(ss)
                        // if(ss==1){
                            var n = wx.getStorageSync('lives');
                            console.log(n);
                            wx.setStorageSync('lives',n+1);
                            var s = 'lives1'+'member_id'+member_id+'openid'+openid+'type1'+sign_key;
                            var sign = util.SHA256(s);
                            var fd={lives:1,member_id:member_id,openid:openid,type:1,sign:sign};
                            console.log(fd);
                            wx.request({
                                url:livesUrl,
                                data:fd,
                                method:'POST',
                                header: {"Content-Type": "application/x-www-form-urlencoded"},
                                success:function (res) {
                                    console.log('addLives',res);
                                    if(res.data.code==200){
                                        that.setData({addHeart:true})
                                    }
                                },
                                fail:function (res) {
                                    console.log(res);
                                    wx.hideLoading();
                                    wx.showModal({
                                        title: '提示',
                                        content: '网络情况不好,请检查网络后重新挑战',
                                        success: function(res) {
                                            if (res.confirm) {
                                                wx.navigateBack({
                                                    delta: 2
                                                })
                                            } else if (res.cancel) {
                                            }
                                        }
                                    })
                                }
                            })
                        // }
                    },
                    fail: function (res) { console.log(res) },
                    complete: function (res) { console.log(res) }
                })
            },
            fail: function(res) {
                console.log(res);
            }
        }
    }
})