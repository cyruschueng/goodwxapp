cc.Class({
    extends: cc.Component,

    properties: {
        wNodePromotion : cc.Node,
        wNodeStage : cc.Node,
        wNodeWait : cc.Node,
        wNodeRank : cc.Node,
        wNodeOut : cc.Node,

        wNodeContainer : cc.Node,

        wRankCur : cc.Label,
        wRankTotal : cc.Label,

        wDesc : cc.Label,
        wParticipateNum : cc.Label,
        wParticipatePro : cc.ProgressBar,

        wBtnBack : cc.Node,
    },

    onReceiveMatchSignOutMsg : function(result) {
        if (result) {
            fr.msg.leaveMatch();
        }
    },

    onReceiveMatchUpdateMsg : function(result) {
        this.updateParticipateNum();
    },

    onReceiveQuickStartMsg : function(result) {
        // this.node.removeFromParent();
    },

    onReceiveTableMsg : function(result) {
        switch(result.action) {
            case fr.events.Action_Table_Info :
            {
                this.node.removeFromParent();
            }
        }
    },

    onReceiveMatchDesMsg : function() {
        this.reload({wait : true});
    },

    onLoad : function() {
        fr.display.on(this.node, fr.events.Msg_Match_Sign_Out, this.onReceiveMatchSignOutMsg.bind(this));
        fr.display.on(this.node, fr.events.Msg_Match_Update, this.onReceiveMatchUpdateMsg.bind(this));
        fr.display.on(this.node, fr.events.Msg_Quick_Start, this.onReceiveQuickStartMsg.bind(this));
        fr.display.on(this.node, fr.events.Msg_Table, this.onReceiveTableMsg.bind(this));
        fr.display.on(this.node, fr.events.Msg_Match_Des, this.onReceiveMatchDesMsg.bind(this));
    },

    reload : function(params) {
        if (params.wait) {
            this.switch2wait();
        } else {
            this.switch2result();
        }
    },

    updateMatchInfo : function() {
        fr.msg.fetchMatchUpdate();
    },

    updateParticipateNum : function() {
        var match = fr.matchinfo;
        this.wDesc.string = match.mConditionStr;
        this.wParticipateNum.string = match.mParticipateNum;
        this.wParticipatePro.progress = match.mParticipateNum / match.mMaxParticipateNum;
    },

    switch2wait : function() {
        fr.msg.enterMatch();

        this.wBtnBack.active = true;

        this.unschedule(this.updateMatchInfo);
        this.schedule(this.updateMatchInfo, 6);
        this.updateMatchInfo();
        //================================================

        this.wNodeWait.active = true;
        this.wNodePromotion.active = false;
        this.wNodeOut.active = false;
        this.wNodeRank.active = false;

        this.updateParticipateNum();
        this.loadStageChain(fr.matchinfo.mMaxParticipateNum);
    },

    switch2result : function() {
        this.wNodeWait.active = false;
        this.wNodePromotion.active = true;
        this.wNodeOut.active = false;
        this.wNodeRank.active = true;
        this.wBtnBack.active = false;

        var curRank = fr.matchinfo.getCurRank();
        var curStage = fr.matchinfo.getCurStage();
        this.loadStageChain(curRank);
        this.wRankCur.string = curRank;
        this.wRankTotal.string = `/${curStage}`;

        if (fr.matchinfo.isOver()) {
            if (curRank != 1) {
                this.wNodePromotion.active = false;
                this.wNodeOut.active = true;
            }

            // 淘汰
            this.scheduleOnce(function() {
                fr.window.show('MatchResult');
            }, 2);
        }
    },

    loadStageChain : function(curRank) {
        this.wNodeContainer.removeAllChildren();

        var match = fr.matchinfo;
        var reachNum = 0;
        var totalNum = match.mStageArr.length;
        var width;
        for (var i = match.mStageArr.length - 1; i >=0; i--) {
            var num = match.mStageArr[i];
            var prefab = cc.instantiate(fr.cache.prefabs['MatchStageCell']);
            prefab.parent = this.wNodeContainer;

            prefab.getComponent("MatchStageCell").reload({
                desc : num == 0? '冠军' : num,
                reached : curRank <= num,
                cutline : i == 0,
                ended : num == 0,
            });
            width = prefab.getContentSize().width;

            if (curRank < num) {
                reachNum++;
            }
        }

        if (totalNum > 5) {
            var offset = Math.max(Math.min(reachNum - 3, totalNum - 5), 0);
            this.wNodeContainer.x = ((totalNum - 5) / 2 - offset) *  width
        }
    },

    onBtnBack : function() {
        fr.audio.playBtn(true);
        fr.msg.signoutMatch();
    },
});
