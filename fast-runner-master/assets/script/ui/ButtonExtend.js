cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad : function() {
        this.node.on('touchstart', this.onTouchBegan, this);
        this.node.on('touchmove', this.onTouchMoved, this);
        this.node.on('touchend', this.onTouchEnded, this);
        this.node.on('touchcancel', this.onTouchCancel, this);
    },

    onTouchBegan : function(event) {
    },

    onTouchMoved : function(event) {
    },

    onTouchEnded : function(event) {
    },

    onTouchCancel : function(event) {
        this.onTouchEnded();
    },
});
