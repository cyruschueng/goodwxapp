cc.Class({
    extends: cc.Component,

    properties: {
        wRank : cc.Label,
        wDesc : cc.Label,
    },

    onLoad : function() {
    },

    init : function(params) {
        this.wRank.string = params.rank;
        this.wDesc.string = params.desc;
    },
});
