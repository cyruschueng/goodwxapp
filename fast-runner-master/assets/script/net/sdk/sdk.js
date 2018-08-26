var sdk = cc._Class.extend({
    login : function() {
        cc.error("subclass must implement this function");
    },

    authorizeUserInfo : function() {
        cc.error("该函数仅在微信平台下有效 | " + 'sdk.authorizeUserInfo');
    },

    share : function() {
        cc.warn("该函数仅在微信平台下有效 | " + 'sdk.share');
    },

    init : function() {

    },

    setDefaultAppShare : function() {
        cc.warn("该函数仅在微信平台下有效 | " + 'sdk.setDefaultAppShare');
    },

    isInvite : function() {
        return false;
    },

    getQueryInfo : function() {
        return {};
    },

    enterInviteRoom : function() {

    },
});

module.exports = sdk;