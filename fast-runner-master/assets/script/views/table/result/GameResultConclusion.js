cc.Class({
    extends: cc.Component,

    properties: {
        wContainer : cc.Node,

        wBtnOnceMore : cc.Node,
        wBtnViewDetail : cc.Node,
        wBtnShare : cc.Node,

        wNodeDesc : cc.Node,
    },

    onReceiveTableCallMsg : function(result) {
        switch(result.action) {
            case fr.events.Action_Table_Call_Ready :
            {
                if (result.userId == fr.userinfo.mUserId) {
                    this.restartGame();
                }
                break;
            }
        }
    },

    onLoad : function() {
        fr.display.on(this.node, fr.events.Msg_Table_Call, this.onReceiveTableCallMsg.bind(this));

        this.mCells = [];
        for (var i = 0; i < 3; i++) {
            var prefab = cc.instantiate(fr.cache.prefabs['GameResultConclusionCell']);
            prefab.parent = this.wContainer;
            this.mCells.push(prefab.getComponent('GameResultConclusionCell'));
        }
    },

    reload : function(params) {
        for (var i = 0; i < 3; i++) {
            var cell = this.mCells[i];
            cell.reload(params.detail[i]);
        }

        if (params.quit) {
            this.wBtnOnceMore.active = false;
            this.wNodeDesc.active = false;
            this.wBtnShare.x = 130;
            this.wBtnViewDetail.x = -130;
        } else {
            this.wBtnOnceMore.active = true;
            this.wNodeDesc.active = true;
            this.wBtnShare.x = 208;
            this.wBtnViewDetail.x = 0;
        }

        this.mCloseHandler = params.onClose;
    },

    onBtnClose : function() {
        fr.audio.playBtn();
        if (this.mCloseHandler) {
            var callback = this.mCloseHandler;
            this.node.removeFromParent();
            callback();
        } else {
            this.restartGame();
        }
    },

    onBtnOutside : function() {
    },

    onBtnOnceMore : function() {
        fr.audio.playBtn();
        fr.msg.tableCall({
            action : fr.events.Action_Table_Call_Ready,
        });
    },

    onBtnViewDetail : function() {
        fr.audio.playBtn();
        fr.game.showRoundHistory();
    },

    onBtnShare : function() {
        fr.audio.playBtn();

        fr.sdk.randomShare();
    },

    restartGame : function() {
        this.node.removeFromParent();

        fr.tableinfo.restart();
    },
});
