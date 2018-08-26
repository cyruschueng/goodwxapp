cc.Class({
    extends: cc.Component,

    properties: {
        wScore : cc.Label,
        wLeft : cc.Label,
        wBoom : cc.Label,
        wBoomContainer : cc.Node,
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
        this.wBoom.string = params.boom;
        this.wBoomContainer.active = params.boom > 0;

        fr.display.loadRemote(this.wAvatar, params.avatarUrl);
    },
});
