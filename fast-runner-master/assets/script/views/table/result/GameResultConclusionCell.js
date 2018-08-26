cc.Class({
    extends: cc.Component,

    properties: {
        wScore : cc.Label,
        wLeft : cc.Label,
        wName : cc.Label,
        wLine : cc.Node,
        wAvatar : cc.Sprite,
        wCrown : cc.Node,
    },

    onLoad : function() {
    },

    reload : function(params) {
        this.wScore.string = params.score;
        this.wLeft.string = params.left;
        this.wName.string = params.name;
        this.wLine.active = params.showLine;
        this.wCrown.active = params.champion;

        fr.display.loadRemote(this.wAvatar, params.avatarUrl);
    },
});
