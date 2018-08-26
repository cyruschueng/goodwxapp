cc.Class({
    extends: cc.Component,

    properties: {
        wRound : cc.Label,
        wContainer : cc.Node,
    },

    onReceiveTableCallMsg : function(result) {
        switch(result.action) {
            case fr.events.Action_Table_Call_Ready :
            {
                if (result.userId == fr.userinfo.mUserId) {
                    this.node.removeFromParent();

                    fr.tableinfo.restart();
                }
                break;
            }
        }
    },

    onLoad : function() {
        fr.display.on(this.node, fr.events.Msg_Table_Call, this.onReceiveTableCallMsg.bind(this));

        this.mCells = [];
        for (var i = 0; i < 3; i++) {
            var prefab = cc.instantiate(fr.cache.prefabs['GameResultRoundCell']);
            prefab.parent = this.wContainer;
            this.mCells.push(prefab.getComponent('GameResultRoundCell'));
        }
    },

    reload : function(params) {
        for (var i = 0; i < 3; i++) {
            var cell = this.mCells[i];
            cell.reload(params.detail[i]);
        }

        this.wRound.string = params.round;
    },

    onBtnClose : function() {
        fr.audio.playBtn();
        this.restartGame();
    },

    onBtnContinue : function() {
        fr.audio.playBtn();
        this.restartGame();
    },

    onBtnOutside : function() {
        this.restartGame();
    },

    restartGame : function() {
        fr.msg.tableCall({
            action : fr.events.Action_Table_Call_Ready,
        });
    },
});
