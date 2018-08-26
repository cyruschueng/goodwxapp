cc.Class({
    extends: cc.Component,

    properties: {
        wContainer : cc.Node,
    },

    onLoad : function() {
        this.mCells = [];
        for (var i = 0; i < 3; i++) {
            var prefab = cc.instantiate(fr.cache.prefabs['GameResultDetailCell']);
            prefab.parent = this.wContainer;
            this.mCells.push(prefab.getComponent('GameResultDetailCell'));
        }
    },

    reload : function(params) {
        for (var i = 0; i < 3; i++) {
            var cell = this.mCells[i];
            cell.reload(params.detail[i]);
        }
    },

    onBtnClose : function() {
        fr.audio.playBtn();
        this.node.removeFromParent();
    },

    onBtnDetail : function() {
        fr.audio.playBtn();
        // this.node.removeFromParent();
    },

    onBtnOutside : function() {
        this.node.removeFromParent();
    },
});
