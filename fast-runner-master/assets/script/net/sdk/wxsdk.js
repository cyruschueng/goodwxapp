// wx.getClipboardData({
//     'success': function(res) {
//         cc.warn('wx.getClipboardData | success | ' + JSON.stringify(arguments));
//     },
//     'fail': function(res) {
//         cc.error('wx.getClipboardData | failed | ' + JSON.stringify(arguments));
//     }
// });

// wx.setClipboardData({
//     'data': '小游戏',
//     'success': function(res) {
//         cc.warn('wx.setClipboardData | success | ' + JSON.stringify(arguments));
//     },
//     'fail': function(res) {
//         cc.error('wx.setClipboardData | failed | ' + JSON.stringify(arguments));
//     }
// });

// wx.showToast({
//     title : arguments[0],
//     image : arguments[1], // 本地路径，但是在模拟器上可以用url，真机看不到图片
//     duration : 2000,
// })

var wxsdk = cc.Class({
    extends : require("sdk"),

    ctor : function() {
        this.m_key_uuid = 'uuid';
        this.m_key_token = 'token';

        this.m_ticket = null;
        this.m_query_info = {};
    },

    isInvite : function() {
        return this.m_query_info.action == 'invite';
    },

    clearInvite : function() {
        this.m_query_info.action = '';
    },

    getQueryInfo : function() {
        return this.m_query_info;
    },

    enterInviteRoom : function() {
        fr.display.showTips("正在进入牌桌...");
        this.clearInvite();

        fr.msg.enter_custom_room({
            roomId : parseInt(this.m_query_info.roomId),
            tableId : parseInt(this.m_query_info.tableId),
        });
    },

    init : function() {
        var self = this;
        wx.showShareMenu({
            withShareTicket : true,
            success : function(params) {
                cc.warn('wx.showShareMenu | success | ' + JSON.stringify(arguments));
                self.setDefaultAppShare();
            },
            fail : function() {
                cc.error('wx.showShareMenu | failed | ' + JSON.stringify(arguments));
            },
        });

        wx.onShow(function(params){
            cc.warn('wx.onShow | callback | ' + JSON.stringify(arguments));
            this.m_query_info = params.query;

            if (cc.game.isPaused) {
                cc.game.resume();
            }

            fr.audio.resume();


            if (fr.userinfo.mLogined) {
                this.enterInviteRoom();
            }

            // fr.display.emit(fr.events.Game_Enter_Fore, params.query);
        }.bind(this));

        wx.onHide(function(params) {
            cc.warn('wx.onHide | callback | ' + JSON.stringify(arguments));

            if (!cc.game.isPaused) {
                cc.game.pause();
            }

            fr.audio.pause();
        });
    },

    setDefaultAppShare : function() {
        wx.onShareAppMessage(function() {
            cc.warn('wx.onShareAppMessage | success | ' + JSON.stringify(arguments));

            var config = fr.config.share.default;
            var username = fr.userinfo.mUserName || '您的好友'
            var txt = config.txt.replace('replace', username);
            var pic = config.pic;

            return {
                'title': txt,
                'imageUrl': pic,
                'query': 'action=share',
                'success': function(obj) {
                    cc.warn('wx.onShareAppMessage | callback | success | ' + JSON.stringify(arguments));
                    self.m_ticket = obj.shareTickets;
                },
                'fail': function(obj) {
                    // 取消转发
                    // cc.log('wx.onShareAppMessage | callback | success | ' + JSON.stringify(arguments));
                },
            }
        });
    },

    generateUUID : function() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 32; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        // s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    },

    login : function() {
        var self = this;

        wx.getStorage({
            key     : self.m_key_uuid,
            success : function(params) {
                self.mUUID = params.data;
            },
            fail    : function(params) {
                self.mUUID = self.generateUUID();
            },
            complete: function(params) {
                wx.setStorage({ key: self.m_key_uuid, data: self.mUUID, });

                wx.checkSession({
                    success     : function() {
                        cc.warn("login | check session success, loginWithToken");
                        self.loginWithToken();
                    },
                    fail        : function() {
                        cc.warn("login | check session failed, loginWithAuthorize");
                        self.loginWithAuthorize();
                    },
                });
            },
        });
    },

    loginWithToken : function() {
        var self = this;
        wx.getStorage({
            key     : self.m_key_token,
            success : function(params) {
                cc.warn('login | wx.getStorage | token | success | ' + JSON.stringify(params));
                self.mToken = params.data;
                self.loginGameServerWithToken();
            },
            fail    : function(params) {
                cc.warn('login | wx.getStorage | token | failed | ' + JSON.stringify(params));

                self.loginWithAuthorize();
            },
        });
    },

    loginWithAuthorize : function() {
        var self = this;
        wx.login({
            success : function(params) {
                cc.warn("login | wx.login success : " + JSON.stringify(params));
                self.mSnsId = 'wxapp:' + params.code;

                wx.getSetting({
                    success : function(params) {
                        cc.warn("login | wx.getSetting success : " + JSON.stringify(params));

                        if (!params.authSetting['scope.userInfo']) {
                            wx.authorize({
                                scope   : 'scope.userInfo',
                                success : function(params) {
                                    cc.warn("login | wx.authorize success : " + JSON.stringify(params));
                                    self.loginGameServerWithSnsId(params.userInfo);
                                },
                                fail    : function() {
                                    cc.error("login | wx.authorize failed : " + JSON.stringify(params));
                                    fr.display.emit(fr.events.Login_Authorize_Failed);
                                },
                            })
                        } else {
                            wx.getUserInfo({
                                success : function(params) {
                                    cc.warn("login | wx.getUserInfo success : " + JSON.stringify(params));
                                    self.loginGameServerWithSnsId(params.userInfo);
                                },
                                fail    : function (res) {
                                    cc.error("login | wx.getUserInfo failed : " + JSON.stringify(params));
                                }
                            })
                        }
                    },
                })
            },

            fail : function() {
                cc.error('login | wx.login | failed | ' + JSON.stringify(params));
            },
        });
    },

    loginGameServerWithSnsId : function(userInfo) {
        var self = this;

        wx.request({
            url     : fr.config.sdkUrl + "open/v6/user/LoginBySnsIdNoVerify?",
            data    : {
                appId       : fr.config.appId,
                gameId      : fr.config.gameId,
                clientId    : fr.config.clientId,
                uuid        : self.mUUID,
                snsId       : self.mSnsId,
                wxAppId     : fr.config.wxAppId,
                nickName    : userInfo.nickName,
                gender      : (userInfo.gender + 2) % 3, //  微信=>0:未知、1:男、2:女  途游=>0:男、1:女 2：未知
                avatarUrl   : userInfo.avatarUrl,
            },
            success : function(params) {
                cc.warn('login | wx.request | LoginBySnsIdNoVerify | success | ' + JSON.stringify(params));

                var result = params.data.result;
                if (result.code === 0)
                {
                    wx.setStorage({ key: self.m_key_token, data: result.token, });
                    fr.userinfo.parseSnsData(result);
                    fr.socket.connect(fr.userinfo.mSocketUrl);
                }
            },
            fail    : function(params) {
                cc.error('login | wx.request | LoginBySnsIdNoVerify | failed | ' + JSON.stringify(params));
            },
        });
    },

    loginGameServerWithToken : function(userInfo) {
        var self = this;

        wx.request({
            url     : fr.config.sdkUrl + "open/v6/user/loginByToken?",
            data    : {
                appId   : fr.config.appId,
                clientId: fr.config.clientId,
                imei    : "null",
                uuid    : self.uuid,
                token   : self.mToken,
            },
            success : function(params) {
                cc.warn('login | wx.request | loginByToken | success | ' + JSON.stringify(params));

                var result = params.data.result;
                if (result.code === 0)
                {
                    fr.userinfo.parseSnsData(result);
                    fr.socket.connect(fr.userinfo.mSocketUrl);
                } else {
                    self.loginWithAuthorize();
                }
            },

            fail    : function(params) {
                cc.warn('login | wx.request | loginByToken | failed | ' + JSON.stringify(params));

                self.loginWithAuthorize();
            },
        });
    },

    authorizeUserInfo : function() {
        var self = this;
        wx.openSetting({
            success: function(params) {
                cc.warn('login | wx.openSetting | success | ' + JSON.stringify(params));
                if (params.authSetting['scope.userInfo']) {
                    self.loginWithAuthorize();
                }
            },
            fail: function(res) {
                cc.error('login | wx.openSetting | failed | ' + JSON.stringify(params));
            },
        });
    },

    randomShare : function(query) {
        var list = fr.config.share.random;
        var ranIndex = Math.floor(Math.random() * list.length);

        var username = fr.userinfo.mUserName || '您的好友'
        var txt = list[ranIndex].txt.replace('replace', username);
        var pic = list[ranIndex].pic;
        this.share(txt, pic, query || 'action=share');
    },

    share : function(title, imageUrl, query) {
        var self = this;

        title = title || fr.config.share.title;
        imageUrl = imageUrl || fr.config.share.imageUrl;
        query = query || '';

        wx.shareAppMessage({
            title : title,
            imageUrl : imageUrl,
            query : query,
            success : function(params) {
                cc.warn('wx.shareAppMessage | success | ' + JSON.stringify(arguments));
                self.m_ticket = params.shareTickets;

                // wx.getShareInfo({
                //     shareTicket : self.m_ticket,
                //     success : function(params) {
                //         cc.warn('wx.getShareInfo | success | ' + JSON.stringify(arguments));
                //     },
                //     fail : function(params) {
                //         cc.warn('wx.getShareInfo | failed | ' + JSON.stringify(arguments));
                //     },
                // })
            },
            fail : function () {
                // 取消转发
                // cc.error('wx.shareAppMessage | failed | ' + JSON.stringify(arguments));
            },
        });
    },

    invite : function(roomId, tableId) {
        var query = `action=invite&roomId=${roomId}&tableId=${tableId}`;
        this.randomShare(query);
    },
});

module.exports = wxsdk;