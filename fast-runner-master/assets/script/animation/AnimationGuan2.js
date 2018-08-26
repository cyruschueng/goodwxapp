cc.Class({
    extends: cc.Component,

    properties: {
        wDisplay : cc.Sprite,
    },

    onLoad : function() {
    },

    reload : function(params) {
        this.wDisplay.getComponent('SpriteArray').switch(params.state);
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
