//app.js
var util = require('utils/util.js');
var baseUrl = 'http://dev.wechat.abctime.com/';
App({
    globalData:{
        // sign_key:'hkf%t5SMv1HtrVS!Y%B!NPNS!!0cWgy',
        sign_key:'GriE93gIGp$5bDjQ4rc20FzxWGghTIau',
        addUrl:baseUrl+'v1/activity/activity/add',
        addscoreUrl:baseUrl+'/v1/book/book/add',
        // audioUrl:baseUrl+'v1/speaking/speaking/get-audio',
        // openUrl:baseUrl+'v1/activity/activity/get-openid',
        openUrl:'http://dev.abc-wechat.abctime.com/v1/wechat/wechat/get-openid',
        cityUrl:baseUrl+'v1/activity/activity/get-city',
        timeUrl:baseUrl+'v1/activity/activity/time',
        shelfUrl:baseUrl+'v1/book/book/shelf',
        binfoUrl:baseUrl+'v1/book/book/info',
        codeUrl:'http://dev.api.abctime.com/v1/member/message/send',
        checkUrl:'http://dev.api.abctime.com/v1/member/message/check',
        qntokenSrc:'http://dev.api.abctime.com/v1/api/api/qiniu-token?bucket=abctime-wechat',
        registerUrl:baseUrl+'v1/member/member/registr',
        topicUrl:baseUrl+'v1/book/book/get-topic',
        tsorceUrl:baseUrl+'v1/book/book/add-quiz',
        reportUrl:baseUrl+'v1/book/book/report',
        resultUrl:baseUrl+'v1/activity/activity/get-res',
        shareSrc:'https://qnfile.abctime.com/save_score.png',
        appSrc:'https://qnfile.abctime.com/abc_app.png',
        iconSrc:'https://qnfile.abctime.com/score_icon.png',
        xcxSrc:'https://qnfile.abctime.com/abc_xcx.jpg',
        sysFlag:'',
        lowscoreSrc:'',
        highscoreSrc:'',
        books:[],
        isIpx:false,
        isIp5:false,
        isiOS8:false,
        isiOS9:false,
        sysWidth:null
    },
    onLaunch: function () {
        var gl = this;
        wx.getSystemInfo({
            success: function(res) {
                if(res.system.toLowerCase().indexOf('ios')>=0){
                    gl.globalData.sysFlag = 'ios'
                }else {
                    gl.globalData.sysFlag = 'an'
                }
                console.log(res.model);
                if(res.model.indexOf('iPhone X')>=0){
                    gl.globalData.isIpx = true;
                };
                if(res.model.indexOf('iPhone 5')>=0){
                    gl.globalData.isIp5 = true;
                };
                if(res.system.indexOf('iOS 9')>=0 || res.system.indexOf('iOS 8')>=0){
                    gl.globalData.isiOS9 = true;
                };
                if(res.system.indexOf('iOS 8')>=0){
                    gl.globalData.isiOS8 = true;
                };
                gl.globalData.sysWidth = res.windowWidth;
                // console.log(res.windowWidth);
                // console.log(res.windowHeight);
                // console.log(res.language);
                console.log(res.version);
                console.log(res.system);
                // console.log(res.SDKVersion);
                // console.log(res.platform)
            }
        })
        var that = this;
        var open=wx.getStorageSync('openid');
        var userInfo=wx.getStorageSync('userInfo') || {};
        if(!open || !userInfo.nickName){
            wx.login({
                success: function(re){
                    console.log(re);
                    if(re.code) {
                        console.log(re.code);
                        var d=that.globalData;//这里存储了appid、secret、token串
                        var s = "code"+re.code+d.sign_key;
                        var sign = util.SHA256(s);
                        var str = "?code="+re.code+"&sign="+sign;
                        var l = d.openUrl;
                        console.log(l+str);
                        wx.request({
                            url: l+str,
                            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                            // header: {}, // 设置请求的 header
                            success: function(re){
                                console.log(re);
                                if(!re.data.data||re.data.data=='undefined'){
                                    return false;
                                }else {
                                    wx.setStorageSync('openid',re.data.data );//存储openid
                                    wx.getUserInfo({
                                        success:function (data) {
                                            var da = JSON.parse(data.rawData);
                                            // data.rawData=JSON.parse(data.rawData)
                                            wx.setStorageSync('userInfo',data.rawData);
                                            var s = "headimg_url"+da.avatarUrl+"nickname"+da.nickName+"openid"+re.data.data+"sex1"+d.sign_key;
                                            var sign = util.SHA256(s);
                                            var fd = {openid:re.data.data,sex:1,'nickname':da.nickName,headimg_url:da.avatarUrl,sign:sign};
                                            console.log(JSON.stringify(fd));
                                            wx.request({
                                                // url:"http://dev.wechat.abctime.com/v1/activity/activity/add",
                                                url:d.addUrl,
                                                data:fd,
                                                method:'POST',
                                                header: {"Content-Type": "application/x-www-form-urlencoded"},
                                                success:function (res) {
                                                    console.log('addRES',res);
                                                    if(res.data.data.phone && res.data.data.phone!=''){
                                                        wx.setStorageSync('phoneNum', res.data.data.phone);
                                                        wx.setStorageSync('grade', res.data.data.grade);
                                                    };
                                                    if(res.data.code==200){
                                                        if(res.data.data.phone && res.data.data.phone!=''){
                                                            wx.setStorageSync('phoneNum', res.data.data.phone);
                                                            wx.setStorageSync('grade', res.data.data.grade);
                                                        };
                                                    }else if(res.data.code==8003){
                                                        console.log('用户已添加');
                                                    };
                                                },
                                                fail:function (res) {
                                                    console.log(res);
                                                }
                                            })
                                        },
                                        fail:function () {
                                            return
                                            wx.showModal({
                                                title: '温馨提示',
                                                content: '“公开信息”授权失败，允许授权后才可进行看书、答题。点击重新授权，则可重新使用',
                                                cancelText:'不授权',
                                                confirmText:'授权',
                                                success: res=>{
                                                if (res.confirm) {
                                                wx.openSetting({
                                                    success:function(res){
                                                        if (!res.authSetting["scope.userInfo"] || !res.authSetting["scope.userLocation"]) {
                                                            //这里是授权成功之后 填写你重新获取数据的js
                                                            console.log('auth',res);
                                                            wx.getUserInfo({
                                                                success:function (data) {
                                                                    var da = JSON.parse(data.rawData);
                                                                    // data.rawData=JSON.parse(data.rawData)
                                                                    wx.setStorageSync('userInfo',data.rawData);
                                                                    var s = "headimg_url"+da.avatarUrl+"nickname"+da.nickName+"openid"+re.data.data+"sex1"+d.sign_key;
                                                                    var sign = util.SHA256(s);
                                                                    var fd = {openid:re.data.data,sex:1,'nickname':da.nickName,headimg_url:da.avatarUrl,sign:sign};
                                                                    console.log(fd);
                                                                    wx.request({
                                                                        // url:"http://dev.wechat.abctime.com/v1/activity/activity/add",
                                                                        url:d.addUrl,
                                                                        data:fd,
                                                                        method:'POST',
                                                                        header: {"Content-Type": "application/x-www-form-urlencoded"},
                                                                        success:function (res) {
                                                                            console.log(res);
                                                                            if(res.data.code==200){
                                                                                if(res.data.data.phone && res.data.data.phone!=''){
                                                                                    wx.setStorageSync('phoneNum', res.data.data.phone);
                                                                                    wx.setStorageSync('grade', res.data.data.grade);
                                                                                };
                                                                            }else if(res.data.code==8003){
                                                                                console.log('用户已添加');
                                                                            };
                                                                        },
                                                                        fail:function (res) {
                                                                            console.log(res);
                                                                        }
                                                                    })
                                                                },
                                                            })
                                                        }
                                                    }
                                                })
                                            }
                                            }
                                        })
                                        }
                                    });
                                }
                            }
                        });
                    }else {
                        console.log('获取用户登录态失败！' + res.errMsg)
                    }
                },
                fail:function (res) {
                    console.log('授权失败',res);
                }
            });
        }else{
            let id = wx.getStorageSync('openid');
            let user = wx.getStorageSync('userInfo');
            console.log(user);
            wx.getUserInfo({
                success:function (data) {
                    console.log(data);
                    wx.setStorageSync('userInfo',data.rawData);//存储openid
                    var fd = {openid:id,sex:1,'nickname':user.nickName,headimg_url:user.avatarUrl};
                    console.log(fd);
                    wx.request({
                        // url:"http://dev.wechat.abctime.com/v1/activity/activity/add",
                        url:that.globalData.addUrl,
                        data:fd,
                        method:'POST',
                        header: {"Content-Type": "application/x-www-form-urlencoded"},
                        success:function (res) {
                            console.log(res);
                            if(res.data.code==200){
                                if(res.data.data.phone && res.data.data.phone!=''){
                                    wx.setStorageSync('phoneNum', res.data.data.phone);
                                    wx.setStorageSync('grade', res.data.data.grade);
                                };
                            }else if(res.data.code==8003){
                                console.log('用户已添加');
                            };
                        },
                        fail:function (res) {
                            console.log(res);
                        }
                    })
                }
            });
        }
    },
})