cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad : function() {
        this.node.width = cc.winSize.width;
        this.node.height = cc.winSize.height;
    },
});
