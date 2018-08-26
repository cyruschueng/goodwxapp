//app.js
var util = require('utils/util.js');
var baseUrl = 'https://mini.abctime.com/';
App({
    globalData:{
        sign_key:'hkf%t5SMv1HtrVS!Y%B!NPNS!!0cWgy',
        openUrl:baseUrl+'v1/wechat/wechat/get-openid',
        memaddUrl:baseUrl+'v1/member/member/add',
        topicUrl:baseUrl+'v1/topic/topic/list',
        scoreUrl:baseUrl+'v1/member/score/add',
        livesUrl:baseUrl+'v1/member/member/add-lives',
        rankUrl:baseUrl+'v1/ranking/ranking/week',
        grouprankUrl:baseUrl+'v1/ranking/ranking/group',
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
                console.log(res.version);
                console.log(res.system);
            }

        });
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
                                console.log('openid',re);
                                if(!re.data.data||re.data.data=='undefined'){
                                    return false;
                                }else {
                                    wx.setStorageSync('openid',re.data.data );//存储openid
                                    wx.getUserInfo({
                                        success:function (data) {
                                            var da = JSON.parse(data.rawData);
                                            console.log(da);
                                            // data.rawData=JSON.parse(data.rawData)
                                            wx.setStorageSync('userInfo',data.rawData);
                                            var s = "headimg_url"+da.avatarUrl+"nickname"+da.nickName+"openid"+re.data.data+"sex1"+d.sign_key;
                                            var sign = util.SHA256(s);
                                            var fd = {openid:re.data.data,sex:1,'nickname':da.nickName,headimg_url:da.avatarUrl,sign:sign};
                                            console.log(JSON.stringify(fd));
                                            wx.request({
                                                url:d.memaddUrl,
                                                data:fd,
                                                method:'POST',
                                                header: {"Content-Type": "application/x-www-form-urlencoded"},
                                                success:function (res) {
                                                    console.log('addSUC',res);
                                                    if(res.data.data.id && res.data.data.id!=''){
                                                        wx.setStorageSync('memberId', res.data.data.id);
                                                        wx.setStorageSync('lives', res.data.data.lives);
                                                        wx.setStorageSync('maxScore', res.data.data.score);
                                                    };
                                                    if(res.data.code==200){

                                                    }else{
                                                        console.log('addRES',res.data.data)
                                                    }
                                                },
                                                fail:function (res) {
                                                    console.log(res);
                                                }
                                            })
                                        },
                                        fail:function () {
                                            return;
                                            wx.showModal({
                                                title: '温馨提示',
                                                content: '“公开信息”授权失败，允许授权后才可进行答题、查看排行榜。点击重新授权，则可重新使用',
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
                                                                        url:d.memaddUrl,
                                                                        data:fd,
                                                                        method:'POST',
                                                                        header: {"Content-Type": "application/x-www-form-urlencoded"},
                                                                        success:function (res) {
                                                                            if(res.data.data.id && res.data.data.id!=''){
                                                                                wx.setStorageSync('memberId', res.data.data.id);
                                                                                wx.setStorageSync('lives', res.data.data.lives);
                                                                                wx.setStorageSync('maxScore', res.data.data.score);
                                                                            };
                                                                            if(res.data.code==200){

                                                                            }else{
                                                                                console.log('addRES',res.data.data)
                                                                            }
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
                            },
                            fail:function (res) {
                                console.log('getopenidFail',res);
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
        }else
        {
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
                        url:that.globalData.memaddUrl,
                        data:fd,
                        method:'POST',
                        header: {"Content-Type": "application/x-www-form-urlencoded"},
                        success:function (res) {
                            console.log('addSUC',res);
                            if(res.data.data.id && res.data.data.id!=''){
                                wx.setStorageSync('memberId', res.data.data.id);
                                wx.setStorageSync('lives', res.data.data.lives);
                                wx.setStorageSync('maxScore', res.data.data.score);
                            };
                            if(res.data.code==200){

                            }else{
                                console.log('addRES',res.data.data)
                            }
                        },
                        fail:function (res) {
                            console.log(res);
                        }
                    })
                }
            });
        }
    },
    onShow:function (res) {
        var gl = this.globalData;
        console.log(res);
        if(res.query.group==1&&res.scene == 1044){
            wx.getShareInfo({
                shareTicket:res.shareTicket,
                success:function (res) {
                    console.log('getGroupSuc',res);
                    var s = "encryptedData"+res.encryptedData+"iv"+res.iv+"member_id"+wx.getStorageSync('memberId')+"openid"+wx.getStorageSync('openid')+gl.sign_key;
                    var sign = util.SHA256(s);
                    var fd = {encryptedData:res.encryptedData,iv:res.iv,'member_id':wx.getStorageSync('memberId'),'openid':wx.getStorageSync('openid'),sign:sign};
                    console.log(fd);
                    wx.request({
                        url:gl.grouprankUrl,
                        data:fd,
                        method:'POST',
                        header: {"Content-Type": "application/x-www-form-urlencoded"},
                        success:function (res) {
                            console.log('groupSUC',res);
                            if(res.data.code==200){
                                wx.navigateTo({
                                    url: '../../pages/rankinglist/rankinglist?source=2&rankdata='+JSON.stringify(res.data.data),
                                });
                            }else{
                            }
                        },
                        fail:function (res) {
                            console.log('groupFail',res);
                        }
                    })
                },
                fail:function (res) {
                    console.log('getGroupfail',res)
                }
            })
        }else {
            // wx.navigateTo({
            //     url: '../../pages/index/index',
            // });
        };
    }
})