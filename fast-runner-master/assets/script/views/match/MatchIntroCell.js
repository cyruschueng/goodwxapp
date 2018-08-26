cc.Class({
    extends: cc.Component,

    properties: {
        wLabelRank : cc.Label,
        wLabelReward : cc.Label,
    },

    onLoad : function() {
    },

    reload : function(params) {
        this.wLabelRank.string = params[0];
        this.wLabelReward.string = params[1];
    },
});
