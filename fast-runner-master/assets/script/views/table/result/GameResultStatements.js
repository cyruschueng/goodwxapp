cc.Class({
    extends: cc.Component,

    properties: {
        wAvatar1 : cc.Sprite,
        wAvatar2 : cc.Sprite,
        wAvatar3 : cc.Sprite,

        wName1 : cc.Label,
        wName2 : cc.Label,
        wName3 : cc.Label,

        wContainer : cc.Node,

        wScore1 : cc.Label,
        wScore2 : cc.Label,
        wScore3 : cc.Label,
    },

    onLoad : function() {
    },

    reload : function(params) {
        params.detail.forEach(function(roundData) {
            var prefab = cc.instantiate(fr.cache.prefabs['GameResultStatementsCell']);
            prefab.parent = this.wContainer;
            prefab.getComponent('GameResultStatementsCell').reload(roundData);
        }.bind(this));

        var arr = [1, 2, 3];
        arr.forEach(function(index) {
            fr.display.loadRemote(this['wAvatar' + index], params.avatarUrl[index - 1]);
            this['wName' + index].string = params.name[index - 1];
        }.bind(this));

        var sum = [0, 0, 0];
        params.detail.forEach(function(roundData) {
            sum[0] += roundData.score[0];
            sum[1] += roundData.score[1];
            sum[2] += roundData.score[2];
        }.bind(this));

        var arr = [1, 2, 3];
        arr.forEach(function(index) {
            var score = sum[index - 1];
            var label = this['wScore' + index];

            label.string = score;

            if (score > 0) {
                label.node.color = new cc.Color(0xde, 0x64, 0x21);
            } else {
                label.node.color = new cc.Color(0x7e, 0x4c, 0x28);
            }
        }.bind(this));
    },

    onBtnClose : function() {
        fr.audio.playBtn();
        this.node.removeFromParent();
    },

    onBtnOutside : function() {
        this.node.removeFromParent();
    },
});
