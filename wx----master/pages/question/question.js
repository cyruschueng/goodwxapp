var app=getApp();
var changeNum=2;
//公共函数库
var lib=require("../../utils/util.js");
Page({
    data: {
        userInfo:null,
        postList:null,
        questionLength:0,
        index:0,
        bc_default: '#95ecb4',
        bc_right: '#66bcf2',
        bc_wrong: '#ff5959',
        bc_a:'#95ecb4',
        bc_b:'#95ecb4',
        bc_c:'#95ecb4',
        bc_d:'#95ecb4',
        leftDeg:0,
        rightDeg:0,
        countNum:10,
        bShowAlert:'none'
    },
    onLoad(){
        wx.showShareMenu({
            withShareTicket:true
        })
    },
    onShareAppMessage(res) {
        var that=this;
        var title=app.globalData.userInfo.nickName;
        return {
            title:`${title}+邀请您一起挑战`,
            path: '/pages/question/question?id=123',
            success: function(res) {
                var shareTickets = res.shareTickets;
                if (shareTickets.length == 0){
                    return false;
                }
                wx.getShareInfo({
                    shareTicket: shareTickets[0],
                    success: function(res){
                        var encryptedData = res.encryptedData;
                        var iv = res.iv;
                        console.log(res)
                    }
                })
                changeNum=changeNum-1;
                console.log(changeNum);
                if(changeNum<=0){
                    wx.showToast({
                        title: '复活次数用光了',
                        icon: 'none',
                        duration: 1000
                    });
                    return
                }
                wx.showToast({
                    title: '复活成功',
                    icon: 'success',
                    duration: 1000
                });
                that.nextQuestion();
                that.setData({
                    bShowAlert:'none'
                })
            },
            fail: function(res) {
                wx.showToast({
                    title: '转发失败',
                    icon: 'none',
                    duration: 1000
                });
            }
        }
    },
    onReady(){
        var that=this;
        lib.countDown(that);
        console.log(app.globalData.userInfo);
        this.setData({
            userInfo:app.globalData.userInfo,
            postList:app.globalData.postData,
            questionLength:app.globalData.postData.length
        });
    },
    nextQuestion(){
        var that=this;
        if(this.data.index>=this.data.questionLength-1){
            wx.showToast({
                title: '这已经是最后一题了',
                icon: 'none',
                duration: 2000
            })
            return
        }
        lib.resetBackground(that);
        lib.countDown(that);
        this.setData({
            index:this.data.index+1
        })
    },
    btnOpClick(e){
        var that=this;
        var correct=this.data.postList[this.data.index].answer;
        if(e.target.id!=correct){
            lib.switchWrong(e,that);
            lib.switchRight(correct,that)
            wx.showToast({
                title: '回答错误',
                duration: 1000,
                complete(){
                    lib.stop();
                    that.closeAlert();
                }
            })
        }else{
            lib.switchRight(correct,that);
            if(this.data.index>=this.data.questionLength-1){
                app.globalData.nToy+=1;
                wx.showToast({
                    title: '恭喜你获得一个娃娃',
                    icon: 'success',
                    duration: 5000,
                    complete:function(){
                        wx.switchTab({
                            url:'../profile/profile'
                        })
                    }
                })
            }
            wx.showToast({
                title: '回答正确',
                icon: 'success',
                duration: 1000,
                complete:function(){
                    setTimeout(function(){
                        that.nextQuestion()
                    },1000)
                }
            })
        };

    },
    closeAlert(){
        if(this.data.bShowAlert=='block'){
            this.setData({
                bShowAlert:'none'
            })
            setTimeout(function(){
                wx.navigateBack()
            },1000)
        }else{
            this.setData({
                bShowAlert:'block'
            })
        }

    },
    onUnload(){
        changeNum=2;
        wx.setStorage({
            key:'userData',
            data:app.globalData
        }),
        wx.request({
            url: 'https://xcx3.zhuozhida.cn/add.php',
            data: {
                userName:app.globalData.userInfo.nickName,
                userImg:app.globalData.userInfo.avatarUrl,
                openId:app.globalData.openId,
                hasChanged:app.globalData.hasChanged,
                nToy:app.globalData.nToy
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            method:'POST',
            success: function(res) {
                console.log(res.data)
            }
        })
    }
})