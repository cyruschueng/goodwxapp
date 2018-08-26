cc.Class({
    extends: cc.Component,

    properties: {
        wName : cc.Label,
        wAvatar : cc.Sprite,
    },

    onLoad : function() {
    },

    init : function(params) {
        this.wName.string = params.name;
        fr.display.loadRemote(this.wAvatar, params.pic);
    },
});
