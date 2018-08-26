cc.Class({
    extends: cc.Component,

    properties: {
        wLabelContent : cc.Label,
        wStateAgree : [cc.Sprite],
        wStateDisagree : [cc.Sprite],
        wBtnAgree : cc.Node,
        wBtnCancel : cc.Node,
        wBtnConfirm : cc.Node,
    },

    onLoad : function() {
        fr.display.on(this.node, fr.events.Msg_Table_Call, this.onReceiveTableCallMsg.bind(this));

        this.mResult = 0;
    },

    onReceiveTableCallMsg : function(result) {
        switch(result.action) {
            case fr.events.Action_Table_Call_Quit :
            {
                if (result.res == 1 && result.voteInfo != 3) {
                    this.mVoteInfo = [
                        {seatId : 1, vote : 1},
                        {seatId : 2, vote : 1},
                        {seatId : 3, vote : 1},
                    ];
                } else {
                    this.mVoteInfo = result.voteInfos;
                }

                this.mResult = result.res;
                this._reload();
            }
        }
    },

    reload : function(params) {
        this.mSeatInfo = params.seatInfo;
        this.mVoteInfo = params.voteInfo;
        this.mNameInfo = params.nameInfo;

        this.mSeatArr = [];
        for (var i = 0; i < this.mSeatInfo.length; i++) {
            var seatId = this.mSeatInfo[i];
            this.mSeatArr[seatId - 1] = i;
        }

        if (this.mVoteInfo.length == 0) {
            this.wLabelContent.string = '牌桌解散将征求其他玩家同意\n\n确认发起？';
            this.mSelfLaunch = true;
        } else {
            var targetSeatId = this.mVoteInfo[0].seatId;
            var targetIndex = this.mSeatArr[targetSeatId - 1];
            var name = this.mNameInfo[targetIndex];
            this.wLabelContent.string = '玩家 ' + name + ' 发起了解散牌桌请求\n\n是否同意?';
            this.mSelfLaunch = false;
        }

        this._reload();
    },

    _reload : function() {
        for (var i = 0; i < 3; i++) {
            this.wStateAgree[i].node.active = false;
            this.wStateDisagree[i].node.active = false;
        }

        this.mVoteInfo.forEach(function(info) {
            var seatId = info.seatId;
            var agree = info.vote;

            var index = this.mSeatArr[seatId - 1];
            if (agree == 1) {
                this.wStateAgree[index].node.active = true;
            } else {
                this.wStateDisagree[index].node.active = true;
            }
        }.bind(this));

        switch(this.mResult) {
            case -1 :
            {
                this.switch(true);
                this.wLabelContent.string = '有玩家拒绝了牌桌解散请求，继续游戏!';
                break;
            }
            case 0 :
            {
                this.switch(false);
                break;
            }
            case 1 :
            {
                this.switch(true);
                this.wLabelContent.string = '决议获得了所有人通过，牌桌解散!';
                break;
            }
        }
    },

    switch : function(single) {
        this.wBtnAgree.active = !single;
        this.wBtnCancel.active = !single;
        this.wBtnConfirm.active = single;
    },

    onBtnOutside : function() {

    },

    onBtnAgree : function() {
        fr.audio.playBtn();
        fr.msg.tableCall({
            action : fr.events.Action_Table_Call_Quit,
            vote : 1,
        });
        this.wBtnAgree.active = false;
        this.wBtnCancel.active = false;
    },

    onBtnCancel : function() {
        fr.audio.playBtn();
        if (this.mSelfLaunch) {
            this.node.removeFromParent();
        } else {
            fr.msg.tableCall({
                action : fr.events.Action_Table_Call_Quit,
                vote : 0,
            });
            this.wBtnAgree.active = false;
            this.wBtnCancel.active = false;
        }
    },

    onBtnConfirm : function() {
        fr.audio.playBtn();
        if (this.mResult == 1) {
            fr.display.emit(fr.events.Table_Quit_Confirm);
        } else {
            this.node.removeFromParent();
        }
    },
});
