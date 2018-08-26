var app=getApp();
var bStar=false;
var lib=require("../../utils/util.js");
var count=0;
//背景音乐
const innerAudioContext = wx.createInnerAudioContext()
innerAudioContext.autoplay = true;
innerAudioContext.loop=true;
innerAudioContext.src = 'https://xcx3.zhuozhida.cn/music/bk.mp3'



Page({
    data:{
        bShowDetail:'none',
        session_key:null,
        openId:null,
        now:0,
        toyRank:null,
        hadRank:null,
        items:[{
            "name": '智力榜'
        },{
            "name":'毅力榜'
        },{
            "name":"答题奖品"
        }
        ]
    },
    setCur(e){
        this.setData({
            now:e.target.dataset.index
        })
    },
    onShow(){
        count=0;
        innerAudioContext.play();
        var that=this;
        wx.request({
            url: 'https://xcx3.zhuozhida.cn/toy.php',
            data: {
            },
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                that.setData({
                    toyRank:res.data
                })
            }
        });
        wx.request({
            url: 'https://xcx3.zhuozhida.cn/has.php',
            data: {
                "count":count
            },
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                count+=1;
                that.setData({
                    hadRank:res.data
                })
                console.log('返回的has')
                console.log(res.data);
            }
        })
    },
    onLoad(){
        var that=this;
        wx.showShareMenu({
            withShareTicket:true
        })
        wx.login({
            success:function (res){
                wx.request({
                    url: 'https://xcx3.zhuozhida.cn/getUser.php',
                    data: {
                        code:res.code
                    },
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function(res) {
                        app.globalData.openId=res.data.openid;
                        app.globalSession=res.data.session_key;
                        that.setData({
                            session_key:res.data.session_key,
                            openId:res.data.openid
                        })
                        wx.request({
                            url: 'https://xcx3.zhuozhida.cn/allData.php',
                            data: {
                               openId:app.globalData.openId
                            },
                            success: function(res) {
                                if(res.data==null){
                                    //用户第一次玩，创建该用户;
                                    lib.setUser(app);
                                }else{
                                    app.globalData.arrOpenGId=res.data.arrOpenGId.split(',');
                                    app.globalData.nToy=Number(res.data.toy);
                                    app.globalData.changeNum=Number(res.data.changeNum);
                                    app.globalData.hasChanged=Number(res.data.has);
                                }
                                bStar=true;
                            }
                        })
                    }
                })
            }
        });
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
            path: '/pages/index/index',
            imageUrl:`${randomImg}`,
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
                                sessionKey:that.data.session_key
                            },
                            success:function(res){
                                console.log('这里是转发后收到的东西')
                                console.log(res.data.openGId);
                                let bShare=true;
                                if(app.globalData.arrOpenGId.length==0){
                                    console.log('dayu0');
                                }
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
                                    app.globalData.changeNum+=1;
                                    wx.showToast({
                                        title: '转发成功',
                                        icon: 'success',
                                        duration: 1000
                                    });
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
    toAnswer(){
        var that=this;
        console.log('用户'+app.globalData.userInfo)
        if(!app.globalData.userInfo){
            wx.showToast({
                title: '没有授权无法挑战哦',
                icon: 'none',
                duration: 2000
            })
            wx.getUserInfo({
                success: function(res) {
                    app.globalData.userInfo = res.userInfo
                }
            });
            return;
        }
        if(app.globalData.changeNum<=0){
            wx.showToast({
                title: '次数不足挑战失败',
                icon: 'none',
                duration: 1000
            })
            return
        };
        wx.showLoading({
            title: '加载题目中~',
        });
        if(bStar){
            bStar=false;
            innerAudioContext.stop();
            wx.request({
                url: 'https://xcx3.zhuozhida.cn/server.php',
                header: {
                    'content-type': 'application/json'
                },
                success: function(res) {
                    for(var i=0;i<res.data.length;i++){
                        res.data[i].content=res.data[i].content.split(',');
                    }
                    console.log(res.data)
                    app.globalData.postData=res.data;
                    wx.navigateTo({
                        url:'../question/question'
                    })
                    console.log('before'+app.globalData.changeNum);
                    app.globalData.changeNum-=1;
                    app.globalData.hasChanged+=1;
                    console.log('after'+app.globalData.changeNum);
                    wx.hideLoading();
                    bStar=true;

                    console.log('挑战次数'+app.globalData.changeNum)
                },
                fail:function(){
                    wx.showToast({
                        title: '请求数据失败了',
                        icon: 'none',
                        duration: 4000
                    })
                }
            })
        }


    },
    share(){
        wx.showShareMenu({
            withShareTicket: true
        })
    },
    detail(){
        if(this.data.bShowDetail=='none'){
            this.setData({
                bShowDetail:'block'
            })
        }else{
            this.setData({
                bShowDetail:'none'
            })
        }

    },
    onUnload(){
        lib.setUser(app);
    },
    toForm(){
        wx.navigateTo({
            url:'../form/form'
        })
    },
    exchange(){
        if(app.globalData.nToy<=0){
            wx.showToast({
                title: '话费卡数量不足,无法兑换',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        var that=this;
        wx.showModal({
            title: '提示',
            content: '您是否兑换话费卡,获得3次挑战机会？',
            success: function(res) {
                if (res.confirm) {
                    app.globalData.changeNum+=3;
                    app.globalData.nToy-=1;
                    console.log('挑战次数'+app.globalData.changeNum);
                    lib.setUser(app);
                    wx.showToast({
                        title: '已获得3次挑战机会',
                        icon: 'success',
                        duration: 1000
                    });
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    //点击加载更多
    loadMore(){
        var that=this;
        wx.request({
            url: 'https://xcx3.zhuozhida.cn/has.php',
            data: {
                "count":count
            },
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                count+=1;
                let loadArr=that.data.hadRank.concat(res.data);
                that.setData({
                    hadRank:loadArr
                })
                console.log('返回的新has')
                console.log(count)
                console.log(res.data);
            }
        })
    }
})