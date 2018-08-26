cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad : function() {
    },

    start : function() {
        var size = cc.director.getWinSize();

        var w = 250;
        var h = 200;

        cc.info(size.width);
        cc.info(size.height);

        this.node.setPosition(cc.v2(0 - w, size.height + h));

        this.node.runAction(cc.sequence(
            cc.moveBy(2, cc.v2(size.width + 2 * w, -size.height - 2 * h)),
            cc.callFunc(function() {
                this.node.removeFromParent();
            }.bind(this)),
        ));
    },
});
