/*
    * Author : chentao
    * Date : 2017.2.11
    * Desc : 牌桌操作按钮
    * Example :
*/
cc.Class({
    extends: cc.Component,

    properties: {
        wCountDownLabel : {
            displayName : 'Clock Label',
            type : cc.Label,
            default : null,
        },
        wNodeClock : cc.Node,

        wNodeEnable : cc.Node,
        wNodeDisable : cc.Node,

        wBtnAction : cc.Button,
        wBtnPromote : cc.Button,

        wStateCard : cc.Node,
        wStatePass : cc.Node,
        wStateOperate : cc.Node,
        wStateReady : cc.Node,
        wStateNotReady : cc.Node,
        wStateInvite : cc.Node,
    },

    onEventSelectCardsPreview : function(params) {
        this.wBtnAction.interactable = params.enable;
    },

    onEventSelectCardsTips : function(params) {
        this.wBtnPromote.interactable = params.enable;
    },

    onLoad : function() {
        fr.display.on(this.node, fr.events.Table_Select_Cards_Preview, this.onEventSelectCardsPreview.bind(this));
    },

    showCards : function(cards) {
        this.node.children.forEach(function(child) {
            child.active = false;
        }.bind(this));
        this.wStateCard.active = true;

        this.wStateCard.getComponent('PokerContainer').reload(cards);

        var maxWidth = this.wStateCard.getContentSize().width;
        this.showCardsAnimation(cards, maxWidth);
    },

    showCardsAnimation : function(cards, maxWidth) {
        var node = this.wStateCard;
        var pWorld = node.convertToWorldSpace(cc.v2(maxWidth / 2, 50));
        var pos = this.node.convertToNodeSpace(pWorld);

        if (fr.picker._isLIANDUI(cards)) {
            fr.display.showAnimationLIANDUI({
                pos : pos,
                parent : this.node,
            });
        } else if (fr.picker._isSHUNZI(cards)) {
            fr.display.showAnimationSHUNZI({
                pos : pos,
                parent : this.node,
                left : false,
            });
        }
    },

    showPass : function(cards) {
        this.node.children.forEach(function(child) {
            child.active = false;
        }.bind(this));
        this.wStatePass.active = true;
    },

    showOperate : function() {
        this.node.children.forEach(function(child) {
            child.active = false;
        }.bind(this));

        if (fr.tableinfo.isRobotRunning()) {
            return;
        }

        this.wStateOperate.active = true;

        var active = fr.tableinfo.canTake();
        this.wNodeEnable.active = active;
        this.wNodeDisable.active = !active;

        if (!active) {
            this.mPassTimeout = 3;
            var passCountdownUpdate = function() {
                if (--this.mPassTimeout == 0) {
                    fr.display.unscheduleAll(this.wStateOperate);
                    fr.display.emit(fr.events.Table_Select_Poker_Touch_Outside);
                }
            }.bind(this);
            fr.display.unscheduleAll(this.wStateOperate);
            fr.display.schedule(this.wStateOperate, passCountdownUpdate, 1);
        } else {
            this.mTimeout = fr.tableinfo.mOpTimeLeft + 1;
            this.unschedule(this.normalCountdownUpdate);
            this.schedule(this.normalCountdownUpdate, 1);
            this.normalCountdownUpdate();
        }

        this.wNodeClock.active = true;
        this.wBtnAction.interactable = false;
        fr.display.emit(fr.events.Table_Select_Cards_Preview_Query);
    },

    showReady : function() {
        this.node.children.forEach(function(child) {
            child.active = false;
        }.bind(this));
        this.wStateReady.active = true;
    },

    showNotReady : function() {
        this.node.children.forEach(function(child) {
            child.active = false;
        }.bind(this));
        this.wStateNotReady.active = true;
    },

    showInvite : function() {
        this.node.children.forEach(function(child) {
            child.active = false;
        }.bind(this));

        if (!fr.tableinfo.isMatch()) {
            this.wStateInvite.active = true;
        }
    },

    showNothing : function() {
        this.node.children.forEach(function(child) {
            child.active = false;
        }.bind(this));
    },

    hideReadyStatus : function() {
        this.wStateInvite.active = false;
        this.wStateNotReady.active = false;
        this.wStateReady.active = false;
    },

    normalCountdownUpdate : function() {
        this.mTimeout -= 1;
        this.wCountDownLabel.string = this.mTimeout;

        if (this.mTimeout == 0) {
            this.wNodeClock.active = false;
            this.unschedule(this.normalCountdownUpdate);

            if (this.wStateOperate.active) {
                if (fr.tableinfo.isMatch()) {
                    // fr.display.emit(fr.events.Table_Btn_Press_Promote);
                    // fr.display.emit(fr.events.Table_Btn_Press_Action);

                    // // robot
                    // fr.msg.tableCall({
                    //     action : fr.events.Action_Table_Call_Robot,
                    //     robot  : 1,
                    // });
                }
            }
        }
    },

    onBtnPass : function() {
        fr.audio.playBtn();
        fr.display.emit(fr.events.Table_Btn_Press_Pass);
    },

    onBtnPromote : function() {
        fr.audio.playBtn();
        fr.display.emit(fr.events.Table_Btn_Press_Promote);
    },

    onBtnAction : function() {
        fr.audio.playBtn();
        fr.display.emit(fr.events.Table_Btn_Press_Action);
    },

    onBtnReady : function() {
        fr.audio.playBtn();
        fr.msg.tableCall({
            action : fr.events.Action_Table_Call_Ready,
        });

        // TODO Net Interval
    },

    onBtnInvite : function() {
        fr.audio.playBtn();
        if (CC_WECHATGAME) {
            fr.sdk.invite(fr.tableinfo.mRoomId, fr.tableinfo.mTableId);
        } else {
            fr.display.showTips("PC端不可邀请!");
        }
    },
});
