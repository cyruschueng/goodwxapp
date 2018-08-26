cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad : function() {
    },

    reload : function(params) {
        this.mCompleteHandler = params.onComplete;
    },

    onAnimationComplete : function() {
        var handler = this.mCompleteHandler;
        this.node.removeFromParent();

        if (handler) {
            handler();
        }
    },
});
