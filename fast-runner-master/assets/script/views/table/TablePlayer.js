cc.Class({
    extends: cc.Component,

    properties: {
        wAvatar    : cc.Sprite,
        wName      : cc.Label,
        wCoin      : cc.Label,
        wCardNum   : cc.Label,

        wPlugin    : cc.Node,
        wRobot     : cc.Node,

        wInviteState : cc.Node,
        wDisplayState : cc.Node,
        wNodeName : cc.Node,
    },

    onReceiveTableMsg : function(result) {
        switch(result.action) {
            case fr.events.Action_Table_Info :
            {
                if (this.mSeatDirty) {
                    this.mSeatId = (fr.userinfo.mSeatId + (this.mIndex - 1) - 1 + 3) % 3 + 1;
                }

                this.reload();
                break;
            }
        }
    },

    onReceiveTableCallMsg : function(result) {
        switch(result.action) {
            case fr.events.Action_Table_Call_Game_Ready :
            {
                this.reload();
                break;
            }
            case fr.events.Action_Table_Call_Robot_Response :
            {
                this.wRobot.active = fr.tableinfo.isRobotRunning(this.mSeatId);
                break;
            }
            case fr.events.Action_Table_Call_Card :
            {
                if (result.seatId == this.mSeatId) {
                    var num = result.handCards.length;
                    this.wCardNum.string = num;
                    if (num == 1 && result.cards.length != 0) {
                        fr.audio.playWithSex('card_lastone', fr.tableinfo.isFemale(this.mSeatId));
                    }
                }

                break;
            }
            case fr.events.Action_Table_Call_Win :
            {
                this.reload();

                this.showScoreChanged(fr.tableinfo.getFinalScore(this.mSeatId));

                if (fr.tableinfo.isMatch()) {
                    this.mSeatDirty = true;
                }
                break;
            }

            case fr.events.Action_Table_Call_Bomb :
            {
                this.reload();

                var score = result['seat' + this.mSeatId][0];

                this.showScoreChanged(score);
                break;
            }
        }
    },

    showScoreChanged : function(score) {
        var s1 = fr.userinfo.mSeatId;
        var s2 = fr.tableinfo.getNextPlayer(s1);
        var s3 = fr.tableinfo.getNextPlayer(s2);

        var align = (this.mSeatId == s2)? 1 : -1;
        var posX = (this.mSeatId == s2)? 100 : 0;
        var pWorld = this.node.convertToWorldSpace(cc.v2(posX, 125));
        fr.display.showScoreChanged({
            score : score,
            align : align,
        }, pWorld);
    },

    onEventGameRestart : function() {
        this.reload();
    },

    onLoad : function() {
        fr.display.on(this.node, fr.events.Msg_Table, this.onReceiveTableMsg.bind(this));
        fr.display.on(this.node, fr.events.Msg_Table_Call, this.onReceiveTableCallMsg.bind(this));
        fr.display.on(this.node, fr.events.Table_Game_Restart, this.onEventGameRestart.bind(this));
    },

    init : function(index) {
        this.mIndex = index;
        this.mSeatId = (fr.userinfo.mSeatId + (index - 1) - 1 + 3) % 3 + 1;

        switch(index) {
            case 1 :
            {
                this.mDisablePlugin = true;
                break;
            }
            case 2 :
            {
                this.wPlugin.x = this.wPlugin.x * -1;
                break;
            }
        }

        this.reload();
    },

    reload : function() {
        this.wPlugin.active = fr.tableinfo.isTablePlaying() && !this.mDisablePlugin;

        var playerinfo = fr.tableinfo.getPlayerInfo(this.mSeatId);
        if (!playerinfo.name) {
            this.wInviteState.active = true;
            this.wDisplayState.active = false;
            return;
        }
        this.wRobot.active = playerinfo.robot == 1;

        this.wInviteState.active = false;
        this.wDisplayState.active = true;
        this.wNodeName.active = !this.mDisablePlugin;

        this.wName.string = playerinfo.name;
        this.wCoin.string = playerinfo.coin;
        fr.display.loadRemote(this.wAvatar, playerinfo.avatar);

        this.wCardNum.string = playerinfo.poker.length;
    },

    onLongTapSuccess : function() {
        cc.info('TablePlayer | Current tap seat : ' + this.mSeatId);
        fr.display.emit(fr.events.Table_Show_Player_Poker, {seatId : this.mSeatId});
    },

    onLongTapCancel : function() {
        fr.display.emit(fr.events.Table_Hide_Player_Poker, {seatId : this.mSeatId});
    },

    onBtnInvite : function() {
        if (fr.tableinfo.isMatch()) {
            return;
        }

        fr.audio.playBtn();

        if (CC_WECHATGAME) {
            fr.sdk.invite(fr.tableinfo.mRoomId, fr.tableinfo.mTableId);
        } else {
            fr.display.showTips("PC端不可邀请!");
        }
    },
});
