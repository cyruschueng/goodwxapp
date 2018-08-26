const app = getApp()
Page({
    data: {
        logs: [],
        user:app.getUser(),
        info:{},
        medal:[{v:3000,t:'魅力新人'},{v:5000,t:'毅力帝'},{v:10000,t:'战无不胜'},{v:20000,t:'六出祁山'},{v:30000,t:'手机放哪了'},{v:50000,t:'什么情况'},{v:500,t:'懒癌晚期'}],
        count:0,
        card:{},
        isShowCard:false,
        canvasShow:false,
        screenWidth:750,
        snowflake: [],
        snowflakeCount: 10,
    },

    initSnowflake: function () {
      let _this = this;
      setTimeout(function () {
        if (_this.data.snowflakeCount < 20) {
          _this.setData({
            snowflakeCount: _this.data.snowflakeCount + 10
          });
          _this.initSnowflake();
        }

      }, 30000)
    },

    onShareAppMessage: function (res) {


        console.log(res)
        let _this=this;
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }

        return {
            title:"发起pk",
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
    onLoad: function () {
        this.setData({
            user:app.getUser()
        })
        this.getUserInfo();
        this.getMinStep();
        wx.showShareMenu({
            withShareTicket: true
        })

        let _this=this;


        wx.getSystemInfo({
            success:function(res){
                let w = res.windowWidth;

                _this.setData({
                    screenWidth:w
                })
            }
        })


     },
    getMinStep:function () {
    //
        let _this= this;
        wx.request({
            url: app.API_URL + "werun/get/min/step/"+ app.getUserId(),
            method: "GET",
            success: function (data) {
                console.log(data);
                let i = _this.data.medal.length-1;
                let item= _this.data.medal[i];
                let  minStep= data.data.data.min_step;
                if(minStep>500){
                    item.on=false;
                }else{
                    item.on=true;
                }
                _this.setData({
                    ['medal[' + i + ']']:item,
                    count:++_this.data.count
                })



            }
        })
    },
    getUserInfo:function () {
        let _this= this;
        wx.request({
            url: app.API_URL + "werun/get/userInfo/"+ app.getUserId(),
            method: "GET",
            success: function (data) {
                console.log(data);
                _this.setData({
                    info:data.data.data
                })
                let max = data.data.data.maxStep;
                for(let i =0;i<_this.data.medal.length-1;i++){
                    if( max >=_this.data.medal[i].v ){
                        let item= _this.data.medal[i];
                        item.on=true;
                        _this.setData({
                            ['medal['+i+']']:item,
                            count:++_this.data.count
                        })
                    }
                }

            }
        })
        // 1275
    },
    showCard:function (e) {
        console.log(e);


        let index = e.currentTarget.dataset.index;
        let item = this.data.medal[index]


            this.setData({
                isShowCard:true,
                card:item
            })






    },
    goHistory:function () {
        wx.navigateTo({
            url: '../rankHistory/rankHistory'
        })
    },
    close:function(){
      this.setData({
      isShowCard: false,
      })
    },




    evenCompEllipse: function (context, x, y, a, b) {
        context.save();
        //选择a、b中的较大者作为arc方法的半径参数
        var r = (a > b) ? a : b;
        var ratioX = a / r; //横轴缩放比率
        var ratioY = b / r; //纵轴缩放比率
        context.scale(ratioX, ratioY); //进行缩放（均匀压缩）
        context.beginPath();
        //从椭圆的左端点开始逆时针绘制
        context.setFillStyle('#F04B37');
        context.moveTo((x + a) / ratioX, y / ratioY);
        context.arc(x / ratioX, y / ratioY, r, 0, 2 * Math.PI);
        context.closePath();
        context.setGlobalAlpha(0.8)
        context.setShadow(0, 0, 20, '#F04B37');
        context.fill();

        context.restore();
    },

    saveImg:function (e) {
        app.showLoading()
        let item = e.currentTarget.dataset.card;
        let _this=this;
        let wxUserInfo = app.getWxUserInfo();
        this.setData({
            canvasShow:true
        })

        const ctx = wx.createCanvasContext('myCanvas');

        console.log(item)

        // app.showLoading();
        wx.getSystemInfo({
            success: function (res) {
                let w = res.windowWidth;
                let h = res.windowHeight;

                const ctx = wx.createCanvasContext('myCanvas');
                const grd = ctx.createLinearGradient(0, 0, 0, h)
                grd.addColorStop(0, '#FF6253')
                grd.addColorStop(1, '#FFB07E')
                ctx.setFillStyle(grd);
                ctx.fillRect(0, 0, w, h);
                ctx.draw(true);


                ctx.setFillStyle("#ffffff");
                ctx.fillRect(0, h-100, w, 100);
                ctx.draw(true);




                ctx.setTextAlign('left');
                ctx.setFontSize(16);
                ctx.setFillStyle('#333333');
                ctx.setTextBaseline('middle');
                ctx.setGlobalAlpha(1)
                ctx.fillText("我是"+wxUserInfo.nickName, 85, h - 64);
                ctx.draw(true);

                ctx.setTextAlign('left');
                ctx.setFontSize(14);
                ctx.setFillStyle('#999999');
                ctx.setTextBaseline('middle');
                ctx.setGlobalAlpha(1)
                ctx.fillText("扫码与我一起比拼步数吧！", 85, h - 38);
                ctx.draw(true);


                ctx.setTextAlign('center');
                ctx.setFontSize(44);
                ctx.setFillStyle('#ffffff');
                ctx.setTextBaseline('middle');
                ctx.setGlobalAlpha(0.8);
                ctx.fillText(item.t, w / 2, h * 0.57);
                ctx.draw(true);

                ctx.setTextAlign('center');
                ctx.setFontSize(18);
                ctx.setFillStyle('#ffffff');
                ctx.setTextBaseline('middle');
                ctx.setGlobalAlpha(0.6)
                ctx.fillText("「日步数超过" + item.v + "步」", w / 2, h * 0.65);
                ctx.draw(true);

                _this.evenCompEllipse(ctx,(w)/2,270,60,8);

                ctx.draw(true);

                ctx.setGlobalAlpha(1);



                let url = 'http://oss.xqzs.cn/resources/runmini/medal_'+ item.v +'_on.png';
                url=app.replaceDownUrl(url);
                console.log(url)
                wx.downloadFile({
                    url:url,
                    success: function (res) {
                        ctx.save()
                        ctx.drawImage(res.tempFilePath, ( w -180) / 2, h * 0.1-12, 180, 180)
                        ctx.restore();
                        ctx.draw(true);

                        if (wxUserInfo) {
                            wx.downloadFile({
                                url: wxUserInfo.avatarUrl,
                                success: function (avatarres) {

                                    ctx.save();
                                    ctx.beginPath()
                                    ctx.arc(0.08 * w + 24, h -73 + 24, 24, 0, 2 * Math.PI);
                                    ctx.clip();
                                    ctx.drawImage(avatarres.tempFilePath, 0.08 * w, h -73, 48, 48);
                                    ctx.restore();
                                    ctx.draw(true);
                                    console.log(avatarres.tempFilePath)
                                    let localQrUrl=app.getMiniProgramQrUrl()
                                    if(localQrUrl!=null&&localQrUrl!=undefined&&localQrUrl!=''){
                                        wx.downloadFile({
                                            url:localQrUrl,
                                            success: function (res) {

                                                ctx.drawImage(res.tempFilePath, w -w * 150 / 750 -25,  h - w * 150 / 750 -14, w * 150 / 750, w * 150 / 750)
                                                ctx.draw(true);
                                                _this._save();
                                                app.hideLoading();
                                            }
                                        })
                                    }else{
                                        console.log("noloacl")
                                        wx.request({
                                            url: app.API_URL + 'mini/program/qr/code/' + app.getUserId() + '/' + app.PROGRAM_ID,
                                            method: "POST",

                                            success: function (resqr) {

                                                let url = resqr.data.data.path.replace('http://oss.xqzs.cn',app.DOWN_LOAD_URL)
                                                app.setMiniProgramQrUrl(url);
                                                if (resqr.data.status == 1) {
                                                    wx.downloadFile({
                                                        url: url,
                                                        success: function (res) {
                                                            ctx.save()
                                                            ctx.drawImage(res.tempFilePath, w -w * 150 / 750 -25,  h - w * 150 / 750 -14, w * 150 / 750, w * 150 / 750)
                                                            ctx.restore();
                                                            ctx.draw(true);
                                                            _this._save();
                                                            app.hideLoading();
                                                        }
                                                    })


                                                }
                                            }
                                        });
                                    }




                                }
                            })
                        }

                    }
                })



            }
        })
    },
    _save:function () {
        let _this=this;
        setTimeout(function () {
            wx.canvasToTempFilePath({
                canvasId: 'myCanvas',
                success: function (res) {
                    console.log(res.tempFilePath)
                    wx.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath,
                        success: function (res) {

                            wx.hideLoading();
                            _this.setData({
                                canvasShow:false
                            });
                            setTimeout(function () {
                                wx.showToast({
                                    title: '保存成功',
                                    icon: 'success',
                                    duration: 2000
                                });
                            },200)
                        },
                        fail: function (res) {
                            wx.showToast({
                                title: '保存失败',
                                icon: 'error',
                                duration: 2000
                            });
                            _this.setData({
                                canvasShow:false
                            });
                            wx.hideLoading();
                        }
                    })
                }
            })
        },50)
    },
    onShow: function () {
      let _this = this;
      _this.initSnowflake();
      }
})
