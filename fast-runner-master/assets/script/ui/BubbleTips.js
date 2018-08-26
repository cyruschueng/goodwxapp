cc.Class({
    extends: cc.Component,

    properties: {
        // wPanel : cc.Node,
        wContent : cc.Label,
    },

    onLoad : function() {
    },

    show : function(text, duration, pos) {
        this.mText = text;
        duration = duration || 2;

        if (pos) {
            this.node.x = pos.x;
            this.node.y = pos.y;
        } else {
            var size = cc.director.getWinSize();
            this.node.x = size.width / 2;
            this.node.y = size.height / 2;
        }

        this.node.runAction(cc.sequence(
            cc.delayTime(duration),
            cc.callFunc(function() {
                this.node.removeFromParent();
            }.bind(this))
        ));

        var scene = cc.director.getScene();
        this.node.parent = scene;
    },

    start : function() {
        this.wContent.string = this.mText;
        // this.wPanel.width = this.wContent.node.width + 40;
    },
});
