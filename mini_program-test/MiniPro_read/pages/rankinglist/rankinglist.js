// rankinglist.js
var util = require('../../utils/util.js');
var app = getApp();
var rankUrl = app.globalData.rankUrl;
var topicUrl = app.globalData.topicUrl;
var livesUrl = app.globalData.livesUrl;
var sign_key = app.globalData.sign_key,canDraw=true,id;
var openid='',member_id,number,canTap=true,myAudio,p=0,q=0,l=0,_that,audioSrc,flag=1;
var pauseArr = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
const ctx = wx.createCanvasContext('shareCanvas');
const innerAudioContext = wx.createInnerAudioContext();
innerAudioContext.onPlay(() => {
    console.log('开始播放')
    console.log(p)
    console.log(q)
})
innerAudioContext.onPause(() => {

})
innerAudioContext.onError((res) => {
    console.log(res.errMsg)
    console.log(res.errCode)
})
innerAudioContext.onEnded((res) => {
    // for(var i in pauseArr){
    //     pauseArr[i] = false;
    //     i++;
    // }
    // pauseArr[0]=true;
    // _that.setData({pauseArr:pauseArr})
    switch(flag){
        case 1:
            if(p<l-2){
                p++;
                _that.myaudioPlay(p)
            }else {
                p=0
                for(var i in pauseArr){
                    pauseArr[i] = false;
                    i++;
                }
                _that.setData({pauseArr:pauseArr})
            };break;
        case 2:
            if(q<l-2){
                q++;
                _that.audioPlay(q)
            }else {
                q=0
                for(var i in pauseArr){
                    pauseArr[i] = false;
                    i++;
                }
                _that.setData({pauseArr:pauseArr})
            };break;
        default:break;
    }
})
Page({
    /**
     * 页面的初始数据
     */
    data: {
        head_img:'',
        nickname:'',
        book_name:'',
        userScore:0,
        haveAudio:false,
        maxScore:0,
        audioSrc:'https://qnfile.abctime.com/pkstart.mp3',
        infoStatus:false,
        ipX:app.globalData.isIpx?true:false,
        ranklistdatas:[],
        user:[],
        showSave:false,
        haveList:false,
        saveStatus:true,
        pauseArr:[]
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        _that = this;
        var user = JSON.parse(wx.getStorageSync('userInfo'));
        // if(options.myAudio){
        //     myAudio = JSON.parse(options.myAudio);
        //     l = myAudio.length;
        // }
        openid=wx.getStorageSync('openid');
        member_id=wx.getStorageSync('memberId');
        id = options.book_id || options.id;
        this.setData({pauseArr:pauseArr,book_name:options.name,head_img:user.avatarUrl,nickname:user.nickName});

        var s = "book_id"+options.book_id+"member_id"+options.member_id+sign_key;
        var sign = util.SHA256(s);
        var str = "?book_id="+options.book_id+"&member_id="+member_id+"&sign="+sign;
        // var str = "?member_id="+member_id+"&id="+id+"&sign="+sign;
        console.log(rankUrl+str);
        wx.request({
            url:rankUrl+str,
            success:res=>{
            console.log(res);
            console.log(res.data.data.user)
            if(res.data.data.user){
                _that.setData({user:res.data.data.user})
            }
            if(res.data.data.user.audio_json){
                _that.setData({haveAudio:true})
            }else {
                _that.setData({haveAudio:false})
            }
            if(res.data.data.list){
                _that.setData({haveList:true,ranklistdatas:res.data.data.list})
            }else {
                _that.setData({haveList:false,ranklistdatas:res.data.data.list})
            }
        // this.imgLoad(res.data.data.pic);
    }
    });
    },
    myPlay:function () {
        flag=1;
        myAudio = this.data.user.audio_json;
        l = myAudio.length;
        innerAudioContext.src = myAudio[q];
        if(!this.data.pauseArr[0]){
            innerAudioContext.play();
            for(var i in pauseArr){
                pauseArr[i] = false;
                i++;
            }
            pauseArr[0]=true;
            this.setData({pauseArr:pauseArr})
        }else {
            innerAudioContext.stop();
            p=0;
            for(var i in pauseArr){
                pauseArr[i] = false;
                i++;
            }
            this.setData({pauseArr:pauseArr})
        }
    },
    myaudioPlay:function (p) {
        innerAudioContext.src = myAudio[p];
        innerAudioContext.play();
    },
    auPlay:function (e) {
        flag=2;
        q=0;
        var ind = e.currentTarget.dataset.ind;
        audioSrc = e.currentTarget.dataset.src;
        l = audioSrc.length;
        innerAudioContext.src = audioSrc[q];
        console.log(innerAudioContext.paused);
        if(!this.data.pauseArr[ind]){
            innerAudioContext.play();
            for(var i in pauseArr){
                pauseArr[i] = false;
                i++;
            }
            pauseArr[ind]=true;
            this.setData({pauseArr:pauseArr})
        }else {
            innerAudioContext.stop();
            q=0;
            for(var i in pauseArr){
                pauseArr[i] = false;
                i++;
            }
            this.setData({pauseArr:pauseArr})
            console.log('333333')
        }
    },
    audioPlay:function (q) {
        innerAudioContext.src = audioSrc[q];
        innerAudioContext.play();
    },
    showInfo:function () {
        this.setData({infoStatus:true})
    },
    hideInfo:function () {
        this.setData({infoStatus:false})
    },
    hideSave:function () {
        this.setData({showSave:false})
    },
    toRank:function () {
        wx.navigateTo({
            url: '../../pages/rankinglist/rankinglist?source=1'
        })
    },
    showSave:function () {
        this.setData({showSave:true})
    },
    hideSave:function () {
        this.setData({showSave:false})
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
                                                    ctx.save();
                                                    ctx.setFontSize(26);
                                                    ctx.setTextAlign('center');
                                                    ctx.setFillStyle('#CBB0F6');
                                                    ctx.fillText(that.data.nickname, 300, 229);
                                                    ctx.restore();
                                                    ctx.save();
                                                    ctx.setFontSize(60);
                                                    ctx.setTextAlign('center');
                                                    ctx.setFillStyle('#FFFFFF');
                                                    ctx.fillText(that.data.user.score||0, 300, 413);
                                                    // ctx.fillText(99,300, 413);
                                                    ctx.restore();
                                                    ctx.save();
                                                    ctx.setFontSize(26);
                                                    ctx.setTextAlign('center');
                                                    ctx.setFillStyle('#CBB0F6');
                                                    ctx.fillText(readText, 300, 849);
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
        innerAudioContext.stop();
        for(var i in pauseArr){
            pauseArr[i] = false;
            i++;
        }
        this.setData({pauseArr:pauseArr})
        this.setData({showSave:false});
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        innerAudioContext.stop();
        for(var i in pauseArr){
            pauseArr[i] = false;
            i++;
        }
        this.setData({pauseArr:pauseArr})
        this.setData({showSave:false})
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
        var that = this
        return {
            title: '读RAZ我竟然得了'+that.data.user.score+'分，你敢来PK一下吗？',
            path: '/pages/index/index?to=book&id='+id,
            success: function(res) {
                console.log(res);
            },
            fail: function(res) {
                console.log(res);
            }
        }
    }
})