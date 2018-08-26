var seatState = {
    idle : 0,       // 该状态失效
    wait : 10,
    ready : 20,
    playing : 30,
}

var tableState = {
    idle : 10,
    calling : 15,
    playing : 20,
}

var tableinfo = cc._Class.extend({

    ctor : function() {
        this.mOnlineStatus = [];
    },

    destory : function() {
        fr.userinfo.leaveTable();

        this.mDestoryed = true;
    },

    isDestoryed : function() {
        return this.mDestoryed;
    },

    isReady : function() {
        return this.mReady;
    },

    restart : function(suppress) {
        this.mTableState = tableState.idle;

        if (this.mRound == 6) {
            this.mPlayers.forEach(function(player) {
                player.coin = 0;
            }.bind(this));
            this.mRound = 0;
            this.mRoundHistory = [];
        }

        if (!suppress) {
            fr.display.emit(fr.events.Table_Game_Restart);
        }
    },

    parseQuickStartMsg : function(result) {
        this.mReady = result.isOK;
    },

    parseInfoData : function(result) {
        if (this.mDestoryed) {
            return;
        }

        this.mRoomId = result.roomId;
        this.mTableId = result.tableId;
        this.mUserInfo = fr.userinfo;
        this.mIsMatch = result.isMatch;

        var players = [];
        for(var i = 1; i < 4; i++) {
            var seatInfo = result['seat' + i];
            var player = {
                name    : seatInfo.name,
                avatar  : seatInfo.purl,
                coin    : this.mIsMatch ? result.mInfos.scores[i - 1] : seatInfo.chip,
                poker   : fr.game.parseServerPokerSymbolRule(seatInfo.card),
                state   : seatInfo.state,
                robot   : seatInfo.robot,
                sex     : seatInfo.sex,

                userId  : seatInfo.uid,
                seatId  : i,
            };

            if (player.userId == fr.userinfo.mUserId) {
                fr.userinfo.mSeatId = i;
            }

            players.push(player);
        }
        this.mPlayers = players;

        this.mCurActionPlayerIndex = result.stat.nowop;
        this.mTableState = result.stat.state;
        this.mLastCards = fr.game.parseServerPokerSymbolRule(result.stat.topcard);
        this.mLastSeatId = result.stat.topseat;

        if (!this.mIsMatch) {
            this.mRound = result.playNum;

            result.detail.forEach(function(roundData) {
                roundData.forEach(function(info) {
                    info.delta += info.bombDelta;
                });
            });
            this.mRoundHistory = result.detail;
        } else {
            var curRank = result.mInfos.rank[fr.userinfo.mSeatId - 1];
            var allPlayerNum = result.step.playerCount;
            this.mRankDes = `${curRank}/${allPlayerNum}`;
        }
    },

    parseReadyMsg : function(result) {
        if (this.mDestoryed) {
            return;
        }

        var player = this.getPlayerInfo(result.seatId);
        player.state = seatState.ready;
    },

    parseGameReady : function(result) {
        if (this.mDestoryed) {
            return;
        }

        for (var i = 0; i < 3; i++) {
            var player = this.mPlayers[i];
            var cards = result['cards' + i];
            player.poker = fr.game.parseServerPokerSymbolRule(cards);
        }

        this.mTableState = tableState.playing;
        this.mRound = result.playNum;
    },

    parseRobotMsg : function(result) {
        var seatId = fr.userinfo.mSeatId;
        var player = this.getPlayerInfo(seatId);
        player.robot = result.robots[seatId - 1];
    },

    parseCardMsg : function(result) {
        if (this.mDestoryed) {
            return;
        }

        var player = this.mPlayers[result.seatId - 1];
        player.poker = fr.game.parseServerPokerSymbolRule(result.handCards);

        this.mLastCards = fr.game.parseServerPokerSymbolRule(result.cards);
        this.mLastSeatId = result.seatId;
    },

    parseNextMsg : function(result) {
        if (this.mDestoryed) {
            return;
        }

        this.mCurActionPlayerIndex = result.stat.nowop;
        this.mTableState = result.stat.state;
        this.mLastCards = fr.game.parseServerPokerSymbolRule(result.stat.topcard);
        this.mLastSeatId = result.stat.topseat;
        this.mOpTimeLeft = result.opTime;
    },

    parseOnlineMsg : function(result) {
        if (this.mDestoryed) {
            return;
        }

        this.mOnlineStatus = result.online;
    },

    getRound : function() {
        return this.mRound;
    },

    parseBombMsg : function(result) {
        if (this.mDestoryed) {
            return;
        }

        var arr = [1, 2, 3];
        arr.forEach(function(index) {
            this.mPlayers[index - 1].coin += result['seat' + index][0];
        }.bind(this));
    },

    parseWinMsg : function(result) {
        if (this.mDestoryed) {
            return;
        }

        for (var i = 1; i < 4; i++) {
            this.mPlayers[i - 1].coin += result['seat' + i][0];
            this.mPlayers[i - 1].state = seatState.wait;
        }

        if (!this.mIsMatch) {
            var round = this.getRound();
            this.mRoundHistory[round - 1] = [
                {
                    seatId : 1,
                    delta : result['seat' + 1][0],
                    cards : result.cards[0],
                    boom : result['seat' + 1][3] > 0? result['seat' + 1][3] / 20 : 0,
                },
                {
                    seatId : 2,
                    delta : result['seat' + 2][0],
                    cards : result.cards[1],
                    boom : result['seat' + 2][3] > 0? result['seat' + 2][3] / 20 : 0,
                },
                {
                    seatId : 3,
                    delta : result['seat' + 3][0],
                    cards : result.cards[2],
                    boom : result['seat' + 3][3] > 0? result['seat' + 3][3] / 20 : 0,
                },
            ];
        } else {
            var arr = [];
            for (var i = 1; i < 4; i++) {
                arr[i - 1] = result['seat' + i][0];
            }
            this.mMatchFinalScore = arr;

            this.destory();
        }
    },

    getConclusionData : function() {
        var conclusion = {
            1 : { win : 0, score : 0 },
            2 : { win : 0, score : 0 },
            3 : { win : 0, score : 0 },
        };
        this.mRoundHistory.forEach(function(roundData) {
            roundData.forEach(function(info) {
                if (info.delta > 0) {
                    conclusion[info.seatId].win += 1;
                }
                conclusion[info.seatId].score += info.delta;
            }.bind(this));
        }.bind(this));

        return conclusion;
    },

    isSeatWaitReady : function(seatId) {
        var player = this.getPlayerInfo(seatId);
        return player.userId != 0 && player.state == seatState.wait;
    },

    isSeatIdle : function(seatId) {
        var player = this.getPlayerInfo(seatId);
        return player.userId == 0;
    },

    isAllPlayerSeated : function() {
        var ready = true;
        this.mPlayers.forEach(function(player) {
            if (player.userId == 0) {
                ready = false;
            }
        }.bind(this));
        return ready;
    },

    isPlayerSeated : function(seatId) {
        return this.mPlayers[seatId - 1].userId != 0;
    },

    isRobotRunning : function(seatId) {
        seatId = seatId || this.mUserInfo.mSeatId;
        var player = this.getPlayerInfo(seatId);
        return player.robot == 1;
    },

    isTablePlaying : function() {
        return this.mTableState === tableState.playing;
    },

    getPlayerInfo : function(seatId) {
        return this.mPlayers[seatId - 1];
    },

    isFemale : function(seatId) {
        return this.mPlayers[seatId - 1].sex == 1;
    },

    getLastPlayer : function(dst) {
        var map = [
            [1, 2],
            [1, -1],
            [-2, -1],
        ]
        return map[dst-1][1] + dst;
    },

    getNextPlayer : function(dst) {
        var map = [
            [1, 2],
            [1, -1],
            [-2, -1],
        ]
        return map[dst-1][0] + dst;
    },

    getSelfPokers : function() {
        return this.mPlayers && this.mPlayers[this.mUserInfo.mSeatId - 1].poker || [];
    },

    getPreCards : function(seatId) {
        return this.mLastSeatId == seatId? [] : this.mLastCards;
    },

    isSelfRound : function() {
        return this.mCurActionPlayerIndex == this.mUserInfo.mSeatId;
    },

    canTake : function() {
        var curCards = fr.tableinfo.getSelfPokers();
        var preCards = fr.tableinfo.getPreCards(this.mUserInfo.mSeatId);
        var recCards = fr.picker.filter(curCards, preCards);

        return recCards.matches.length > 0;
    },

    // stampAsMatch : function() {
    //     this.mIsMatch = true;
    // },

    isMatch : function() {
        return this.mIsMatch;
    },

    getFinalScore : function(seatId) {
        if (!this.mIsMatch) {
            var history = fr.tableinfo.mRoundHistory;
            var round = fr.tableinfo.getRound();
            var roundData = history[round- 1];
            return roundData[seatId - 1].delta;
        } else {
            return this.mMatchFinalScore[seatId - 1];
        }
    },
});

module.exports = tableinfo;
