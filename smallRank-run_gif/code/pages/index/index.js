//index.js
//获取应用实例
const app = getApp()
import marquee from '../marquee/marquee.js';
import NumberAnimate from "../../utils/NumberAnimate";
var timeOutHeart=null;
var runTime=null;
var options = Object.assign(marquee, {
    data: {
        userId:app.getUserId(),
        marquee: { text: '生命在于运动，您迈出的每一步都将带来价值！每天都可将前一天的运动步数兑换成积分哟！' },
        tab:0,
        tabOver:false,
        todayNum:0,
        tjHeight:300,
        wHeight:600,
        today:[],
        allToday:[],
        yesterday:[],
        lastMonth:[],
        lastWeek:[],
        user:{},
        myRank:{rank:1},
        myTodayRank:{rank:1},
        todayChanged:false,
        noticeLink:'',
        timeInData:null,
        todayChangeCoin:{},
        yesterdayChangeCoin:{},
        timetime:0,
        showAddCoinAninate:false,
        todayRunNum:0,
        round:false,
        canIUse: wx.canIUse('button.open-type.contact'),
        isSubscribe:false,
        lionX:77,
        lionY:0,
        snowflake:[],
        snowflakeCount:10,
        bindMiniProgramTip:false,
        bindMiniProgramTipOut:null,
        APP_ID:app.APP_ID,
        canvasShow:true,
        goal:3000

    },
    goTj:function () {
        wx.navigateTo({
            url: '/pages/statistics/statistics'
        })
    },
    goTarget:function () {
        wx.navigateTo({
            url: '/pages/target/target'
        })
    },
    goPK:function () {
        wx.navigateTo({
            url: '/pages/friendsRank/friendsRank'
        })
    },
    showBind:function (e) {
        console.log(e)
        this.setData({
            bindMiniProgramTip:true,
            bindMiniProgramTipOut:true
        })
    },
    closeBindMiniProgramTip:function () {
        let _this= this;
        _this.setData({
            bindMiniProgramTipOut:false
        });
        setTimeout(function () {
            _this.setData({
                bindMiniProgramTip:false,
                bindMiniProgramTipOut:null
            });
        },500)
    },
    copyAppId:function () {
        app.copy(app.APP_ID);
    },
    copyPage:function () {
        app.copy('pages/index/index');

    },
    initSnowflake:function () {
        let _this=this;
        setTimeout(function () {
            if(_this.data.snowflakeCount<30){
                _this.setData({
                    snowflakeCount:_this.data.snowflakeCount+10
                });
                _this.initSnowflake();
            }

        },1500)
    },

    getExChangeCoin:function () {
       //werun/coin/exchange
        let _this=this;
        wx.request({
            url: app.API_URL + "werun/coin/exchange/" + this.data.userId,
            method: "GET",
            success: function (data) {
                if(data.data.status==1){
                    _this.setData({
                        yesterdayChangeCoin: data.data.data[0],
                        todayChangeCoin: data.data.data[1]
                    });
                    if(_this.data.yesterdayChangeCoin.isExchange==1){
                        _this.setData({
                            todayChanged: true,
                        });
                    }
                }


            }
        })

    },

    goRank:function () {
        wx.navigateTo({
            url: '../friendsRank/friendsRank'
        })
    },
    flyStart:function (e) {
        let _this=this;
        console.log(e)
        let itemInfo= _this.getItemInfo(e);
        let item= itemInfo.item;
        let dataRe= itemInfo.dataRe;
        console.log(item)
        item.flyHeart=[];

        for(let i =0  ;i<5;i++){
            item.flyHeart.push({rnd:i});
        }
        _this.setData({
            [dataRe]: item
        });
        timeOutHeart =  setInterval(function () {
            _this.rndFlyHeart(item,dataRe)
        },500)

    },
    rndFlyHeart:function (item,dataRe) {
        let _this=this;
        let rnd = parseInt(Math.random()*5);
        if(typeof item.flyHeart !='object'){
            item.flyHeart=[];
        }
        item.flyHeart.push({rnd:rnd});
        rnd = parseInt(Math.random()*5);
        item.flyHeart.push({rnd:rnd});
        rnd = parseInt(Math.random()*5);
        item.flyHeart.push({rnd:rnd});
        _this.setData({
            [dataRe]: item
        });
    },
    getItemInfo:function (e) {
        let _this=this;
        let index = e.currentTarget.dataset.index;
        let typeIndex = e.currentTarget.dataset.typeindex;
        let item,dataRe;
        if (typeIndex == 0) {
            item = _this.data.today[index];
            dataRe="today["+index+"]";
        } else if (typeIndex == 1) {
            item = _this.data.allToday[index];
            dataRe="allToday["+index+"]";
        }

        return {item:item,dataRe:dataRe}
    },

    flyOver:function (e) {
        let _this=this;
        let itemInfo= _this.getItemInfo(e);
        let item= itemInfo.item;
        let dataRe= itemInfo.dataRe;
        if(timeOutHeart){
            clearInterval(timeOutHeart)
        }
        setTimeout(function () {
            item.flyHeart=[];
            _this.setData({
                [dataRe]: item
            });
        },2900)
    },

    care:function (e) {
        let _this = this;
         let index = e.currentTarget.dataset.index;
        let typeIndex = e.currentTarget.dataset.typeindex;

        let item;
        let dataType="day";
        if (typeIndex == 0) {
            item = _this.data.today[index];
        } else if (typeIndex == 1) {
            item = _this.data.allToday[index];
        }


        if(_this.data.userId==item.userId){
            _this.goCareListFromItem(item.id,item.careCount);
        }else{
            wx.request({
                url: app.API_URL + "werun/care",
                method: "PUT",
                data: {
                    userId: _this.data.userId,
                    withId : item.id,
                    type:dataType
                },
                success: function (data) {
                    if(data.data.status===1){
                        let dataRe =[];

                        if (typeIndex == 0) {
                            dataRe =  _this.data.today
                        } else if (typeIndex == 1) {
                            dataRe =  _this.data.allToday
                        }
                        dataRe[index].careCount=data.data.data.count;
                        dataRe[index].careMe=1;
                        dataRe[index].hit=true;
                        if (typeIndex == 0) {
                            _this.setData({
                                today:dataRe
                            });
                            _this.getMyRank(0)
                        } else if (typeIndex == 1) {
                            _this.setData({
                                allToday:dataRe
                            });
                            _this.getMyRank(1)
                        } else if (typeIndex == 2) {
                            _this.setData({
                                lastWeek:dataRe
                            });
                            _this.getMyRank(2)
                        } else if (typeIndex == 3) {
                            _this.setData({
                                lastMonth:dataRe
                            });
                            _this.getMyRank(3)
                        }
                    }



                }
            })
        }





    },
    scroll:function (e) {
        let top=e.detail.scrollTop;
        if(top>=416){
            this.setData({
                tabOver:true,
            })
        }else{
            this.setData({
                tabOver:false,
            })
        }
    },
    initScreen:function () {
        let _this=this;
        wx.getSystemInfo({
            success: function(res) {
                let  w= res.windowWidth;
                let  h = res.windowHeight;
                _this.setData({
                    wHeight:h,
                    tjHeight:  h -300
                })

            }
        })
    },
    getUserInfo: function () {
        let _this = this;
        wx.request({
            url: app.API_URL + "user/find/by/user/Id/" + _this.data.userId,
            method: "GET",
            success: function (data) {
                _this.setData({
                    user: data.data.data,
                    isSubscribe:data.data.data.issubscribe
                });

            }
        })
    },
    beComeFriend:function () {
        let _this = this;
        let fromuserid= wx.getStorageSync('fromuserid');
        if(fromuserid&&fromuserid!=''){
            console.log("beComeFriendfromus1111111erid"+fromuserid)
            wx.request({
                url: app.API_URL + "user/be/friend/width/ids/"+fromuserid+'/' + _this.data.userId,
                method: "POST",
                success: function (data) {
                    console.log("beComeFriendfrdataerid"+ +"|_this.data.userId"+_this.data.userId);
                    console.log(data)
                    if(data.data.status==1){

                    }


                }
            })


        }
    },
    getMyRank:function (index) {
        if(index==0){
            this.setData({
                myRank: this._getMyRank(this.data.today),
                myTodayRank: this._getMyRank(this.data.today),
            })




        }else if(index==1){


            this.setData({
                myRank: this.data.myRank1,
            })
            // this.setData({
            //     myRank: this._getMyRank(this.data.yesterday),
            // })
        }else if(index==2){
            this.setData({
                myRank: this._getMyRank(this.data.lastWeek),
            })
        }else if(index==3){
            this.setData({
                myRank: this._getMyRank(this.data.lastMonth),
            })
        }
    },
    _getMyRank:function (data) {
        let rank={rank:1};
        for(let i =0;i<data.length;i++){
            if(data[i].userId==this.data.userId){
                rank=data[i];
                rank.rank=i+1;

                break
            }
        }
        return rank;
    },
    getRunData:function () {
        let _this=this;
        let data = app.getRunStorageData();
        if(data.length>0){
            clearTimeout(_this.data.timeInData);


            let todayRunNumEnd=data[data.length-1].step;

            _this.getGoal(todayRunNumEnd);

            if(todayRunNumEnd>_this.data.todayNum) {
                let n1 = new NumberAnimate({
                    from: _this.data.todayNum,
                    end:todayRunNumEnd,
                    speed: 1000,
                    refreshTime: 50,
                    decimals: 0,
                    onUpdate: () => {
                        this.setData({
                            todayNum: n1.tempValue,
                            round:true
                        });
                    },
                    onComplete: () => {

                    }
                });
            }


            if(_this.data.userId){
                wx.request({
                    url: app.API_URL + "werun/"+_this.data.userId,
                    method: "PUT",
                    data:{stepData:data},
                    success: function (data) {
                        // _this.getLastWeekData();
                        _this.getTodayTopData();
                        _this.getTodayData();
                        // _this.getYesterdayData();

                    }
                })
            }
        }else{
             _this.setData({
                 timeInData: setTimeout( function () {
                     _this.getRunData();
                 },300)

             })

        }
    },
    initRunDataItem:function (item) {
        item.nickName=  item.nickName.substring(0,7);
        item.faceUrl= app.string.smallFace(item.faceUrl);
        if(item.sex==1){
            item.km= Math.ceil(item.step * 0.74 / 1000);
            item.kll=Math.ceil(item.step * 0.74 / 1000 * 40)
        }else{
            item.km= Math.ceil(item.step * 0.66 / 1000);
            item.kll=Math.ceil(item.step * 0.66 / 1000 * 35)
        }
        return item;
    },
    getTodayData:function () {
        let _this=this;
        this._getData("today",function (data) {
            _this.setData({
                today: data.data.data.rows
            });
            _this.getMyRank(0);
        })
    },
    getTodayTopData:function () {
        let _this=this;
        if(this.data.userId){
            wx.showLoading()
            wx.request({
                url: app.API_URL + "werun/rank/all/today/"+this.data.userId +"/100",
                method: "GET",
                success: function (data) {
                    console.log(data.data)
                    for(let i=0;i<data.data.data.rows.length;i++){
                        data.data.data.rows[i] =_this.initRunDataItem( data.data.data.rows[i] );
                    }
                    _this.setData({
                        allToday: data.data.data.rows,
                        myRank1:_this.initRunDataItem(data.data.data.userRank)
                    });
                    wx.hideLoading();
                }
            })
        }



    },

    getGoal:function (step) {
        let _this= this;
        wx.request({
            url: app.API_URL + "werun/get/day/goal/"+this.data.userId ,
            method: "GET",
            success: function (data) {
                let remote = step / data.data.data.goal * 360;
                if (remote > 360) remote = 360;
                let duration = 1500;
                let animation = wx.createAnimation({
                    duration: duration,
                })
                animation.rotate(remote).step()
                let animation2 = wx.createAnimation({
                    duration: duration,
                })
                animation2.rotate(-remote).step()
                _this.setData({
                    animationLion: animation.export(),
                    animationLion2: animation2.export()
                });

                if (remote <= 180) {
                    let rightanimation = wx.createAnimation({
                        duration: duration,
                    })
                    rightanimation.rotate(remote).step()
                    _this.setData({
                        animationRightCrile: rightanimation.export()
                    });
                } else {
                    let rightanimation = wx.createAnimation({
                        duration: duration * 180 / remote,

                    })
                    rightanimation.rotate(180).step()

                    let leftanimation = wx.createAnimation({
                        duration: duration - duration * 180 / remote,
                        delay: duration * 180 / remote
                    })
                    leftanimation.rotate((remote - 180)).step();
                    _this.setData({
                        animationLeftCrile: leftanimation.export(),
                        animationRightCrile: rightanimation.export()
                    });
                }
            }
        })

    },


    _getData:function (type,callback) {

        let _this=this;
        if(this.data.userId){
            wx.showLoading()
            wx.request({
                url: app.API_URL + "werun/rank/"+type+"/"+this.data.userId ,
                method: "GET",
                success: function (data) {
                    for(let i=0;i<data.data.data.rows.length;i++){
                        data.data.data.rows[i] =_this.initRunDataItem( data.data.data.rows[i] );
                    }
                    callback(data);
                    wx.hideLoading()
                }
            })
        }

    },
    getNotice:function () {
        let _this=this;
        //消息提醒
        wx.request({
            url: app.API_URL + 'werun/last/notice/' + _this.data.userId,
            success: function (res) {
                if (res.data.status == 1) {
                    let noticeLink = '/pages/notice/notice?time=' + app.run.dateTime.getTimeStamp();
                    _this.setData({
                        notice: res.data.data,
                        noticeLink: noticeLink
                    })


                }
            }
        })
    },
    goCareList:function (e) {
        let _this=this;
        let id =  e.currentTarget.dataset.id;
        let count =  e.currentTarget.dataset.count;
        if(count==0)return;
        let type = "day";
        if(_this.data.tab==2){
            type = "week";
        }else   if(_this.data.tab==3){
            type = "month";
        }
         wx.navigateTo({
            url: '/pages/care/list?type='+type+'&id='+id
        })


    },

    goCareListFromItem:function (id,count) {
        let _this=this;
        if(count==0)return;
        let type = "day";
        if(_this.data.tab==2){
            type = "week";
        }else   if(_this.data.tab==3){
            type = "month";
        }
        wx.navigateTo({
            url: '/pages/care/list?type='+type+'&id='+id
        })


    },
    onLoad: function (options) {


        if(options.fromuserid) {
            wx.setStorageSync('fromuserid', options.fromuserid);

            if(options.shareTicket){
                console.log(options.shareTicket)
                this.createPk(options.shareTicket,options.fromuserid)
            }
        }

        // console.log("options.fromuserid"+options.fromuserid)
        this.setData({ userId: app.getUserId() });
        this.isChanged();
        this.initScreen();
        this.getUserInfo();
        this.beComeFriend();


        const str = this.data.marquee.text;
        const width = this.getWidth(str);
         this.setData({ [`${'marquee'}.width`]: width });

    },
    initData:function () {
        this.getRunData();
        this.getExChangeCoin();
    },


    cirle:function (ctx,deg) {
        let _this=this;
        let R = 77; //半径
        let a= deg*Math.PI/180; //弧度
        let x,y;
        if(deg<=90){
            x = R + Math.sin(a)* R ;
            y = R - Math.cos(a)* R ;
        }else if(deg<180){
            a= (deg-90)*Math.PI/180
            x = R + Math.cos(a)* R ;
            y = R + Math.sin(a)* R ;
        }else if(deg < 270){
            a= (deg-180)*Math.PI/180
            x = R - Math.sin(a)* R ;
            y = R + Math.cos(a)* R ;
        }else{
            a= (deg-270)*Math.PI/180
            x = R - Math.cos(a)* R ;
            y = R - Math.sin(a)* R ;
        }



        x +=5;
        y +=5;

        this.setData({
            lionX:x,
            lionY:y
        })

        ctx.arc(x,y, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.draw(true);




    },


    onShow:function () {
        let _this = this;
        _this.initSnowflake();













        wx.showShareMenu({
            withShareTicket: true
        })

        if (_this.data.userId) {

            wx.login({
                success: function (loginRes) {
                    // console.log("showLoainres");
                    wx.getWeRunData({
                        success(runRes) {
                            //发起网络请求
                            wx.request({
                                url: app.API_URL + "wei/xin/post/decrypt/data",
                                method: "POST",
                                data: {
                                    iv: runRes.iv,
                                    encryptedData: runRes.encryptedData,
                                    code: loginRes.code
                                },
                                success: function (data) {

                                    if (data.data.data.stepInfoList) {
                                        app.setRunStorageData(data.data.data.stepInfoList);
                                    }
                                    _this.initData();

                                }
                            })

                        }
                    });
                }
            });
            _this.getNotice();


        }


    },
    tab:function (e) {
        let  index= e.currentTarget.dataset.index
        this.setData({
            tab: index
        });
        this.getMyRank(index);
    },
    isChanged:function () {
        let _this=this;
        wx.getStorage({
            key: 'todayChanged',
            success: function(res) {

                if(_this.getDateFormat()==res.data.date){
                    _this.setData({
                        todayChanged:true
                    });
                }


            }
        })
    },
    getDateFormat:function () {
        let date=new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return year+"-"+month+'-'+day
    },
    change:function () {
        let _this=this;
        if(this.data.todayChanged){
            return ;
        }
        wx.showLoading();
        wx.request({
            url: app.API_URL + "werun/exchange/coin",
            method: "PUT",
            data:{
                userId:this.data.userId,
            },
            success: function (data) {
                wx.hideLoading();
                 if(data.data.status===1){

                    _this.getUserInfo();
                    wx.setStorage({
                        key:"todayChanged",
                        data:{date:_this.getDateFormat(),changed:true}
                    })
                    _this.setData({
                        todayChanged:true,
                        showAddCoinAninate:true
                    });
                }
            }
        })

    },
    onShareAppMessage: function (res) {
        console.log(res)
        let _this=this;
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            path: '/pages/index/index?fromuserid='+_this.data.userId,
            success: function(res) {
                // 转发成功
                console.log(res)
                wx.getShareInfo({
                    shareTicket: res.shareTickets[0],
                    success: function (res) {

                        wx.login({
                            success: function (loginRes) {
                                wx.request({
                                    url: app.API_URL + "wei/xin/post/decrypt/data",
                                    method: "POST",
                                    data: {
                                        iv: res.iv,
                                        encryptedData: res.encryptedData,
                                        code: loginRes.code
                                    },
                                    success: function (data) {
                                        console.log(data.data.data);
                                        console.log(data.data.data.openGId);
                                        _this.setData({
                                            ggggggid:data.data.data.openGId
                                        })

                                    }
                                })
                            }
                        })


                        console.log(res)
                    },
                    fail: function (res) {
                        console.log(res)
                    },
                 })
            },
            fail: function(res) {
                // 转发失败
            }
        }
    },
    createPk:function (shareTicket,fromuserid) {
        let _this=this;
        wx.getShareInfo({
            shareTicket: shareTicket,
            success: function (res) {

                wx.login({
                    success: function (loginRes) {
                        wx.request({
                            url: app.API_URL + "wei/xin/post/decrypt/data",
                            method: "POST",
                            data: {
                                iv: res.iv,
                                encryptedData: res.encryptedData,
                                code: loginRes.code
                            },
                            success: function (data) {


                                wx.request({
                                    url: app.API_URL + "werun/pk",
                                    method: "POST",
                                    data: {
                                        userId : app.getUserId(),
                                        shareUserId :fromuserid,
                                        openGId: data.data.data.openGId,
                                        programId:app.PROGRAM_ID
                                    },
                                    success: function (data) {

                                        console.log(data);
                                    }
                                })






                            }
                        })
                    }
                })
                console.log(res)
            },
            fail: function (res) {
                console.log(res)
            },
        })
    }
});
Page(options);

