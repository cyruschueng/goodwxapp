var app=getApp();
var changeNum=2;
//答题的背景音乐
const quesBc = wx.createInnerAudioContext()
quesBc.autoplay = false;
quesBc.loop=true;
quesBc.src = 'https://xcx3.zhuozhida.cn/music/quesBc.mp3';
//失败的背景音乐
const fail = wx.createInnerAudioContext()
fail.autoplay = false;
fail.src = 'https://xcx3.zhuozhida.cn/music/fail.mp3';
//开始答题的背景音乐
const countDown=wx.createInnerAudioContext();
countDown.autoplay = false;
countDown.src = 'https://xcx3.zhuozhida.cn/music/countDown.mp3';
//答对成功的背景音乐
const answerRig=wx.createInnerAudioContext();
answerRig.autoplay = false;
answerRig.src = 'https://xcx3.zhuozhida.cn/music/answerRig.wav';
//全部答对的背景音乐
const win=wx.createInnerAudioContext();
win.src = 'https://xcx3.zhuozhida.cn/music/win.mp3'
//公共函数库
var lib=require("../../utils/util.js");
Page({
    data: {
        userInfo:null,
        postList:null,
        questionLength:0,
        index:0,
        bc_default: 'white',
        bc_right: '#66bcf2',
        bc_wrong: '#ff5959',
        bc_a:'white',
        bc_b:'white',
        bc_c:'white',
        bc_d:'white',
        fontColor_w:'white',
        fontColor_a:'black',
        fontColor_b:'black',
        fontColor_c:'black',
        fontColor_d:'black',
        leftDeg:0,
        rightDeg:0,
        countNum:10,
        bShowAlert:'none',
        bWinAlert:'none',
        bOutAlert:'none',
        readyNum:3,
        showReady:'block',
        bFinal:'none'
    },
    check(){
        wx.switchTab({
            url: '../../pages/profile/profile'
        })
    },
    onLoad(){
        countDown.play();
        var that=this;
        var timer=null;
        wx.showShareMenu({
            withShareTicket:true
        });
        timer=setInterval(function(){
            if(that.data.readyNum>0){
                that.setData({
                    readyNum:that.data.readyNum-1
                })
            }else{
                clearInterval(timer);
                that.setData({
                    showReady:'none'
                })
                countDown.stop();
                quesBc.play();
                lib.countDown(that,changeNum);
            }
        },1000)
    },
    onShareAppMessage(res) {
        var randomImg=app.shareImages[Math.floor(Math.random()*app.shareImages.length)];
        var that=this;
        var title=app.globalData.userInfo.nickName;
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title:`${title}+邀请您挑战`,
            path: `${randomImg}`,
            imageUrl:'../../img/shareImg.jpg',
            success: function(res) {
                var shareTickets = res.shareTickets;
                if (shareTickets.length == 0){
                    return false;
                }
                wx.getShareInfo({
                    shareTicket: shareTickets[0],
                    success: function(res){
                        var encrypt = res.encryptedData;
                        var iv = res.iv;
                        wx.request({
                            url:'https://xcx3.zhuozhida.cn/aes/PHP/demo.php',
                            header: {
                                'content-type': 'application/x-www-form-urlencoded' // 默认值
                            },
                            method:'POST',
                            data:{
                                encrypt:encrypt,
                                iv:iv,
                                sessionKey:app.globalSession
                            },
                            success:function(res){
                                console.log('这里是转发后收到的东西')
                                console.log(res.data.openGId);
                                let bShare=true;
                                for(var i=0;i<app.globalData.arrOpenGId.length;i++){
                                    if(app.globalData.arrOpenGId[i]==res.data.openGId){
                                        wx.showToast({
                                            title: '请转发到不同群',
                                            icon: 'none',
                                            duration: 1000
                                        });
                                        bShare=false;
                                        return
                                    }
                                };
                                if(bShare){
                                    lib.nextQuestion(that,lib);
                                    if(changeNum>1){
                                        that.setData({
                                            bShowAlert:'none'
                                        })
                                        changeNum-=1;
                                    }else{
                                        that.setData({
                                            bOutAlert:'block'
                                        })
                                    }

                                    wx.showToast({
                                        title: '转发成功',
                                        icon: 'success',
                                        duration: 1000
                                    });
                                    quesBc.play();
                                    app.globalData.arrOpenGId.push(res.data.openGId);
                                    wx.setStorage({
                                        key:'userData2',
                                        data:app.globalData
                                    })
                                }
                            }
                        })
                    }
                });

            },
            fail: function(res) {
                wx.showToast({
                    title: '请转发到群哦',
                    icon: 'none',
                    duration: 2000
                });
            }
        }
    },
    onReady(){
        changeNum=2
        var that=this;
        this.setData({
            userInfo:app.globalData.userInfo,
            postList:app.globalData.postData,
            questionLength:app.globalData.postData.length
        });
    },

    btnOpClick(e){
        var that=this;
        var correct=this.data.postList[this.data.index].answer;
        if(e.target.id!=correct){
            lib.switchWrong(e,that);
            lib.switchRight(correct,that);
            if(this.data.index>=this.data.questionLength-1){
                //如果最后一题打错，无法复活
                this.outAlert();
            }
            wx.showToast({
                title: '回答错误',
                duration: 1000,
                complete(){
                    quesBc.stop();
                    lib.stop();
                    if(changeNum>1){
                        that.closeAlert();
                    }else{
                        that.outAlert();
                    }
                    fail.play();
                }
            })
        }else{
            lib.switchRight(correct,that);
            answerRig.play();
            if(this.data.index>=this.data.questionLength-1){
                lib.stop();
                quesBc.stop();
                app.globalData.nToy+=1;
                win.play();
                wx.showToast({
                    title: '恭喜你获得话费卡',
                    icon: 'success',
                    duration: 5000,
                    complete:function(){
                        that.setData({
                            bWinAlert:'block'
                        })
                    }
                })
            }
            wx.showToast({
                title: '回答正确',
                icon: 'success',
                duration: 1000,
                complete:function(){
                    if(that.data.index<that.data.questionLength){
                        setTimeout(function(){
                            lib.nextQuestion(that,lib)
                        },1000)
                    }

                }
            })
        };

    },
    closeWinAlert(){
        this.setData({
            bWinAlert:'none'
        })
        setTimeout(function(){
            wx.navigateBack()
        },1000)
    },
    closeAlert(){
        if(this.data.bShowAlert=='block'){
            this.setData({
                bShowAlert:'none',
                bFinal:'block'
            })
        }else{
            this.setData({
                bShowAlert:'block'
            })
        }
    },
    outAlert(){
        if(this.data.bOutAlert=='block'){
            this.setData({
                bOutAlert:'none',
                bFinal:'block'
            })
        }else{
            this.setData({
                bOutAlert:'block'
            })
        }
    },
    goBack(){
        wx.navigateBack()
    },
    rePlay(){
        wx.navigateBack()
    },
    onUnload() {
        lib.stop();
        quesBc.stop();
        win.stop();
        changeNum = 2;
        lib.setUser(app)
    }
})