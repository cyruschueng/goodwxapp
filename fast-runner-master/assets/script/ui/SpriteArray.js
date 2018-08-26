cc.Class({
    extends: cc.Component,

    properties: {
        frames : {
            default : [],
            type    : cc.SpriteFrame,
        }
    },

    onLoad : function() {
    },

    switch : function(index) {
        var sprite = this.node.getComponent('cc.Sprite');
        sprite.spriteFrame = this.frames[index];
    },
});
