var TableState = {
    not_ready : 1,
    ready : 2,
    action : 3,
}

cc.Class({
    extends: cc.Component,

    properties: {
        wContainer  : cc.Node,
        wPoker      : cc.Prefab,

        wPlayer0     : cc.Node,
        wPlayer1    : cc.Node,
        wPlayer2     : cc.Node,
        wPlayer     : cc.Prefab,

        wContainerDebug  : cc.Node,

        wController1 : cc.Node,
        wController2 : cc.Node,
        wController3 : cc.Node,

        wRound : cc.Label,
        wCoin : cc.Label,
        wRank : cc.Label,

        wNodeRound : cc.Node,
        wNodeRank : cc.Node,
        wNodeRoundDetail : cc.Node,
        wNodeRankReward : cc.Node,

        wNodeRankRewardList : cc.Node,
        wNodeRankContainer : cc.Node,

        wNodeRobot : cc.Node,
    },

    onShowPlayerPoker : function(data) {
        fr.display.emit(fr.events.Table_Query_Other_Player_Pokers, {
            seatId : data.seatId,
            callback : function(pokers) {
                this.wContainerDebug.getComponent('PokerContainer').reload(pokers);
            }.bind(this),
        });
    },

    onHidePlayerPoker : function(data) {
        this.wContainerDebug.getComponent('PokerContainer').reload([]);
    },

    onReceiveRoomLeaveMsg : function(result) {
        if (result.userId == fr.userinfo.mUserId) {
            this.backToHall();
        }
    },

    onReceiveTableMsg : function(result) {
        switch(result.action) {
            case fr.events.Action_Table_Info :
            {
                if (this.mNeedLaunch) {
                    this.launchTable();
                } else {
                    this.reloadPrepareState();
                }

                if (fr.tableinfo.isMatch()) {
                    if (!this.mIsMatchTipsShowed && fr.tableinfo.isAllPlayerSeated()) {
                        this.mIsMatchTipsShowed = true;
                        fr.display.showTips(result.step.note);
                        this.onEventGameRestart();
                    }

                }
            }
        }
    },

    onReceiveTableCallMsg : function(result) {
        switch(result.action) {
            case fr.events.Action_Table_Call_Ready :
            {
                this.reloadPrepareState();
                break;
            }
            case fr.events.Action_Table_Call_Game_Ready :
            {
                fr.game.mHeadFirstValid = true;
                this.mHeadFirst = result.bossId;

                this.reloadPrepareState(true);
                this.reloadTableInfo();
                this.generatePokers();
                break;
            }
            case fr.events.Action_Table_Call_Robot_Response :
            {
                this.wNodeRobot.active = fr.tableinfo.isRobotRunning();

                if (result.tips) {
                    fr.display.showTips(result.tips);
                }
                break;
            }
            case fr.events.Action_Table_Call_Card :
            {
                if (result.seatId == fr.userinfo.mSeatId) {
                    this.generatePokers(true);
                }
                this.showPreviewPokers();

                var poker = fr.game.parseServerPokerSymbolRule(result.cards);
                if (fr.picker._isAirplane(poker)) {
                    fr.display.showAnimationAirplane({});
                } else if (fr.picker._isBoom(poker)) {
                    fr.display.showAnimationBoom({});
                }
                break;
            }
            case fr.events.Action_Table_Call_Next :
            {
                var seatId = fr.tableinfo.mCurActionPlayerIndex;

                if (this.mState == TableState.not_ready) {
                    this.mToDoOperate = true;
                } else {
                    if (seatId == fr.userinfo.mSeatId) {
                        this.switchState(TableState.ready);
                    } else {
                        this.getController(seatId).showOperate(!result.greaterCards);
                    }
                }

                break;
            }
            case fr.events.Action_Table_Call_Bomb :
            {
                this.reloadTableInfo();
            }
            case fr.events.Action_Table_Call_Win :
            {
                this.mIsMatchTipsShowed = false;

                this.reloadTableInfo();

                var lSeatId = fr.tableinfo.getLastPlayer(fr.userinfo.mSeatId);
                var cSeatId = fr.userinfo.mSeatId;
                var rSeatId = fr.tableinfo.getNextPlayer(fr.userinfo.mSeatId);

                var lCards = fr.game.parseServerPokerSymbolRule(result.cards[lSeatId - 1]);
                var cCards = fr.game.parseServerPokerSymbolRule(result.cards[cSeatId - 1]);
                var rCards = fr.game.parseServerPokerSymbolRule(result.cards[rSeatId - 1]);

                this.wController1.getComponent('TableOperateLite').showCards(lCards);
                this.wController2.getComponent('TableOperateLite').showCards(rCards);
                this.wController3.getComponent('TableOperate').showCards(cCards);

                this.wContainer.removeAllChildren();

                var state = result.punishStu[fr.userinfo.mSeatId - 1];
                if (state != 0) {
                    var map = {
                        '1' : ['showAnimationTableAchieve', 0],
                        '2' : ['showAnimationTableAchieve', 1],
                        '-1' : ['showAnimationTablePunish', 0],
                        '-2' : ['showAnimationTableAchieve', 1],
                    }
                    var content = map[String(state)];
                    fr.display[content[0]]({
                        state : content[1],
                        onComplete : function() {
                            this.scheduleOnce(function() {
                                this.showResult();
                            }.bind(this), 0.2);
                        }.bind(this),
                    });
                } else {
                    this.scheduleOnce(function() {
                        this.showResult();
                    }.bind(this), 1);
                }

                break;
            }

            case fr.events.Action_Table_Call_Quit :
            {
                if (result.res == 0 && result.voteInfos.length == 1) {
                    var voteInfo = result.voteInfos[0];
                    if (voteInfo.seatId != fr.userinfo.mSeatId && voteInfo.vote) {
                        this.showQuit(result.voteInfos);
                    }
                }
                break;
            }
        }
    },

    backToHall : function() {
        cc.director.loadScene('hall');
    },

    showResult : function() {
        var isMatch = fr.tableinfo.isMatch();
        if (!isMatch) {
            if (fr.tableinfo.getRound() == 6) {
                fr.game.showResultConclusion();
            } else {
                fr.game.showResultRound();
            }
        } else {
            // fr.display.showMatchResult();
        }
    },

    getController : function(seatId) {
        if (seatId < 1 || seatId > 3) {
            cc.error('TableController | seatId out of range. respect 1~3, receive ' + seatId);
            return;
        }

        var selfSeatId = fr.userinfo.mSeatId;
        if (selfSeatId != seatId) {
            if (fr.tableinfo.getLastPlayer(selfSeatId) == seatId) {
                return this.wController1.getComponent('TableOperateLite');
            } else {
                return this.wController2.getComponent('TableOperateLite');
            }
        } else {
            return this.wController3.getComponent('TableOperate');
        }
    },

    showPreviewPokers : function() {
        var lastSeatId = fr.tableinfo.mLastSeatId;
        var selfSeatId = fr.userinfo.mSeatId;
        var cards = fr.tableinfo.mLastCards;

        if (lastSeatId < 1 || lastSeatId > 3) {
            return;
        }

        if (cards.length == 0) {
            this.getController(lastSeatId).showPass();
            fr.audio.playWithSex('card_pass', fr.tableinfo.isFemale(lastSeatId));
        } else {
            this.getController(lastSeatId).showCards(cards);
            fr.audio.playCardType(cards, fr.tableinfo.isFemale(lastSeatId));
        }
    },

    onEventSelectCards : function(param) {
        fr.msg.tableCall({
            action : fr.events.Action_Table_Call_Card,
            cards : param.cards,
        });

        this.wController3.getComponent('TableOperate').showCards([]);
    },

    onEventGameRestart : function(params) {
        this.mState = TableState.not_ready;
        this.mHasNotifyReadyState = false;

        this.reloadPrepareState();
        this.reloadTableInfo();
    },

    onEventTableQuitConfirm : function() {
        fr.game.showResultConclusion({
            quit : true,
            onClose : function() {
                this.backToHall();
            }.bind(this),
        });
    },

    onReceiveMatchWaitMsg : function(result) {
        fr.window.show('MatchWaiting', 'MatchWaiting', {});
    },

    onReceiveMatchOverMsg : function(result) {
        fr.window.show('MatchWaiting', 'MatchWaiting', {});
    },

    onLoad : function() {
        this.mPokerResMap = [];
        this.mState = TableState.not_ready;

        fr.display.on(this.node, fr.events.Table_Show_Player_Poker, this.onShowPlayerPoker.bind(this));
        fr.display.on(this.node, fr.events.Table_Hide_Player_Poker, this.onHidePlayerPoker.bind(this));
        fr.display.on(this.node, fr.events.Msg_Table_Call, this.onReceiveTableCallMsg.bind(this));
        fr.display.on(this.node, fr.events.Msg_Room_Leave, this.onReceiveRoomLeaveMsg.bind(this));
        fr.display.on(this.node, fr.events.Msg_Table, this.onReceiveTableMsg.bind(this));

        fr.display.on(this.node, fr.events.Table_Select_Cards, this.onEventSelectCards.bind(this));
        fr.display.on(this.node, fr.events.Table_Game_Restart, this.onEventGameRestart.bind(this));
        fr.display.on(this.node, fr.events.Table_Quit_Confirm, this.onEventTableQuitConfirm.bind(this));

        fr.display.on(this.node, fr.events.Msg_Match_Wait, this.onReceiveMatchWaitMsg.bind(this));
        fr.display.on(this.node, fr.events.Msg_Match_Over, this.onReceiveMatchOverMsg.bind(this));
    },

    start : function() {
        if (!fr.tableinfo.isReady()) {
            this.mNeedLaunch = true;
            if (fr.matchinfo.mWaitMatch) {
                fr.window.show('MatchWaiting', 'MatchWaiting', {});
            } else {
                fr.window.show('MatchWaiting', 'MatchWaiting', {wait : true});
            }
        } else {
            this.launchTable();
        }
    },

    launchTable : function() {
        this.scheduleOnce(function() {
            this.loadAvatar();
            this.reloadTableInfo();

            if (fr.tableinfo.isTablePlaying()) {
                // 断线重练
                this.generatePokers(true);
                this.reloadPrepareState(true);
                this.showPreviewPokers();
            } else {
                this.reloadPrepareState();
            }
        }.bind(this), 0);

        this.mNeedLaunch = false;
        fr.audio.playBg('table');
    },

    reloadPrepareState : function(hide) {
        var s1 = fr.userinfo.mSeatId;
        var s2 = fr.tableinfo.getNextPlayer(s1);
        var s3 = fr.tableinfo.getNextPlayer(s2);

        var arr = [s1, s2, s3];
        arr.forEach(function(seatId) {
            if (fr.tableinfo.isTablePlaying()) {
                this.getController(seatId).hideReadyStatus();
            } else {
                if (fr.tableinfo.isPlayerSeated(seatId)) {
                    if (hide) {
                        this.getController(seatId).showNothing();
                    } else {
                        if (fr.tableinfo.isSeatWaitReady(seatId)) {
                            this.getController(seatId).showNotReady();
                        } else if (fr.tableinfo.isSeatIdle(seatId)) {
                            this.getController(seatId).showNothing();
                        } else {
                            this.getController(seatId).showReady();
                        }
                    }
                } else {
                    this.getController(seatId).showNothing();
                }
            }
        }.bind(this));

        if (!fr.tableinfo.isAllPlayerSeated()) {
            this.getController(s1).showInvite();
        }
    },

    update : function(dt) {
        if (this.mState == TableState.ready) {
            if (fr.tableinfo.isSelfRound()) {
                this.switchState(TableState.action);
            } else {
                if (this.mToDoOperate) {
                    this.mToDoOperate = false;
                    this.getController(fr.tableinfo.mCurActionPlayerIndex).showOperate();
                }
            }
        }
    },

    generatePokers : function(directly) {
        var pokers = fr.tableinfo.getSelfPokers();

        var step = function(curStep) {
            this.wContainer.removeAllChildren();

            for(var i = 0; i < curStep; i++) {
                var poker = cc.instantiate(this.wPoker);
                poker.getComponent('PokerItem').init(pokers[i], this.mPokerResMap);
                this.wContainer.addChild(poker);
            }

            this.wContainer.sortAllChildren();
        }.bind(this);

        if (directly) {
            step(pokers.length);
            if (this.mState == TableState.not_ready) {
                this.switchState(TableState.ready);

                this.wNodeRobot.active = fr.tableinfo.isRobotRunning();
            }
        } else {
            var curStep = 0;

            var stepRefresh = function() {
                curStep += 1;
                if (curStep <= pokers.length){
                    step(curStep);
                } else {
                    fr.game.mHeadFirstValid = false;
                    this.unschedule(stepRefresh);
                    if (this.mState == TableState.not_ready) {
                        this.switchState(TableState.ready);

                        this.wNodeRobot.active = fr.tableinfo.isRobotRunning();
                    }
                }
            };
            this.unschedule(stepRefresh);
            this.schedule(stepRefresh, 0.18);
            stepRefresh();

            // 首出效果
            if (this.mHeadFirst != fr.userinfo.mSeatId) {
                this.getController(this.mHeadFirst).showCards([{digit : 3, style : 2}]);
            }
        }
    },

    switchState : function(state) {
        this.mState = state;
        switch(state) {
            case TableState.ready:
            {
                if (!this.mHasNotifyReadyState) {
                    this.mHasNotifyReadyState = true;
                    fr.display.emit(fr.events.Table_State_Ready_Done);
                }
                break;
            }
            case TableState.action:
            {
                this.wController3.getComponent('TableOperate').showOperate();

                fr.display.emit(fr.events.Table_Filter_Poker);
            }
        }
    },

    loadAvatar : function() {
        for(var i = 0; i < 3; i++) {
            var player = cc.instantiate(this.wPlayer);
            player.getComponent('TablePlayer').init(i);
            this['wPlayer' + i].addChild(player);
        }
    },

    reloadTableInfo : function() {
        var isMatch = fr.tableinfo.isMatch();
        if (!isMatch) {
            if (fr.tableinfo.isTablePlaying()) {
                this.wRound.string = fr.tableinfo.getRound();
            } else {
                this.wRound.string = fr.tableinfo.getRound() + 1;
            }
        } else {
            this.wRank.string = fr.tableinfo.mRankDes;
        }
        this.wNodeRound.active = !isMatch;
        this.wNodeRank.active = isMatch;
        this.wNodeRoundDetail.active = !isMatch;
        this.wNodeRankReward.active = isMatch;

        this.wCoin.string = fr.tableinfo.getPlayerInfo(fr.userinfo.mSeatId).coin;
    },

    onBtnBack : function() {
        fr.audio.playBtn(true);

        if (fr.tableinfo.isMatch()) {
            fr.display.showTips("比赛不可离开");
            return;
        }

        if (!fr.tableinfo.isTablePlaying() && fr.tableinfo.getRound() == 0) {
            fr.display.showDialog({
                desc : "离开牌桌？",
                onConfirm : function() {
                    fr.msg.room({
                        action : fr.events.Action_Table_Leave,
                    });
                },
            });
        } else {
            this.showQuit([]);
        }
    },

    showQuit : function(voteInfo) {
        var s1 = fr.userinfo.mSeatId;
        var s2 = fr.tableinfo.getNextPlayer(s1);
        var s3 = fr.tableinfo.getNextPlayer(s2);

        var n1 = fr.tableinfo.getPlayerInfo(s1);
        var n2 = fr.tableinfo.getPlayerInfo(s2);
        var n3 = fr.tableinfo.getPlayerInfo(s3);

        fr.display.showDialogQuit({
            voteInfo : voteInfo,
            seatInfo : [s3, s1, s2],
            nameInfo : [n3.name, n1.name, n2.name],
        });
    },

    onBtnRoundHistory : function() {
        fr.audio.playBtn();
        fr.game.showRoundHistory();
    },

    onBtnRankReward : function() {
        fr.audio.playBtn();

        this.wNodeRankRewardList.active = !this.wNodeRankRewardList.active;
        if (this.wNodeRankRewardList.active) {
            this.wNodeRankContainer.removeAllChildren();

            var rewards = fr.matchinfo.getRewardInfo();
            fr.display.dump(rewards);
            for (var i = 0; i < rewards.length; i++) {
                var rankInfo = rewards[i];
                var rank;
                var desc;
                if (rankInfo.desc.length > 1) {
                    rank = rankInfo.desc[0];
                    desc = rankInfo.desc[1];
                } else {
                    rank = `第${i+1}名`;
                    desc = rankInfo.desc[0];
                }
                var prefab = cc.instantiate(fr.cache.prefabs['RankListCell']);
                prefab.getComponent('RankListCell').init({
                    rank : rank,
                    desc : desc,
                });
                prefab.parent = this.wNodeRankContainer;
            }
        }
    },

    onBtnCancelRobot : function() {
        fr.msg.tableCall({
            action : fr.events.Action_Table_Call_Robot,
            robot  : 0,
        });
    },
});
