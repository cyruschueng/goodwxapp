cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad : function() {
        // TODO
        var scale = Math.max(cc.winSize.width / this.node.width, cc.winSize.height / this.node.height);
        this.node.scale = scale;
    },
});
