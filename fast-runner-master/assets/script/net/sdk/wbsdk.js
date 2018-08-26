var wbsdk = cc.Class({
    extends : require("sdk"),

    login : function() {
        var account = {
            appId       : fr.config.appId,
            clientId    : fr.config.clientId,
            snsId       : fr.config.snsId,
            wxAppId     : fr.config.wxAppId,
        };
        var remoteUrl = fr.config.sdkUrl + "open/v6/user/LoginBySnsIdNoVerify?" + fr.display.object2url(account);

        fr.http.request(remoteUrl, function(ret) {
            var result = ret['result'];
            cc.log("wblogin | receive http request cb : " + JSON.stringify(result));
            if (result.code === 0)
            {
                fr.userinfo.parseSnsData(result);
                fr.socket.connect(fr.userinfo.mSocketUrl);
            }
        }.bind(this));
    },
});

module.exports = wbsdk;