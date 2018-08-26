cc.Class({
    extends: cc.Component,

    properties: {
        wScore : cc.Label,
        wLeft : cc.Label,
        wName : cc.Label,
        wLine : cc.Node,
        wAvatar : cc.Sprite,
    },

    onLoad : function() {
    },

    reload : function(params) {
        this.wScore.string = params.score;
        this.wLeft.string = params.left;
        this.wName.string = params.name;
        this.wLine.active = params.showLine;

        fr.display.loadRemote(this.wAvatar, params.avatarUrl);
    },
});
