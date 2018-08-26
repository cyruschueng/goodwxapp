cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad : function() {
    },

    reload : function(params) {
        this.mCompleteHandler = params.onComplete;

        if (params.left) {
            this.getComponent(cc.Animation).play('shunzi_right');
        } else {
            this.getComponent(cc.Animation).play('shunzi_left');
        }
    },

    onAnimationComplete : function() {
        var handler = this.mCompleteHandler;
        this.node.removeFromParent();

        if (handler) {
            handler();
        }
    },
});
