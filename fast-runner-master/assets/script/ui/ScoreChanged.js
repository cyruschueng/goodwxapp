cc.Class({
    extends: cc.Component,

    properties: {
        wAdd : cc.Label,
        wMinus : cc.Label,
    },

    onLoad : function() {
    },

    reload : function(params) {
        var score = params.score;
        var align = params.align;

        if (score > 0) {
            this.wAdd.node.active = true;
            this.wMinus.node.active = false;
            this.wAdd.string = fr.display.decorateNumPrefix(score) + '积分';
        } else {
            this.wAdd.node.active = false;
            this.wMinus.node.active = true;
            this.wMinus.string = score + '积分';
        }

        if (align == -1) {
            this.wAdd.node.anchorX = 0;
            this.wMinus.node.anchorX = 0;
        } else if (align == 0) {
            this.wAdd.node.anchorX = 0.5;
            this.wMinus.node.anchorX = 0.5;
        } else {
            this.wAdd.node.anchorX = 1;
            this.wMinus.node.anchorX = 1;
        }
    },
});
