var game = {
    // 生成随机手牌
    generate : function() {
        var digitRepo = [];

        for (var i = 0; i < 13; i++) {
            var digit = i + 3;
            if (i == 11) {
                digitRepo[i] = [digit, [this._random(4)]];
            } else if (i == 12) {
                var arr = [0, 1, 2, 3];
                var delIndex = this._random(4);
                arr.splice(delIndex, 1);
                digitRepo[i] = [digit, arr];
            } else {
                digitRepo[i] = [digit, [0, 1, 2, 3]];
            }
        }

        var list = [];
        for (var round = 0; round < 2; round++) {
            var arr = [];
            for (var i = 0; i < 16; i++) {
                var digitIndex = this._random(digitRepo.length);
                var digit = digitRepo[digitIndex][0];
                var styleRepo = digitRepo[digitIndex][1];
                var styleIndex = this._random(styleRepo.length);
                var style = styleRepo[styleIndex];

                styleRepo.splice(styleIndex, 1);
                if (styleRepo.length == 0) {
                    digitRepo.splice(digitIndex, 1);
                }

                arr[i] = {digit : digit, style : style};
            }
            list[round] = arr;
        }

        var left = [];
        for (var i = 0; i < digitRepo.length; i++) {
            var digit = digitRepo[i][0];
            var styleRepo = digitRepo[i][1];
            for(var j = 0; j < styleRepo.length; j++) {
                var style = styleRepo[j];
                left[left.length] = {digit : digit, style : style};
            }
        }
        list[2] = left;
    },

    _random : function(range) {
        return Math.floor(Math.random() * range);
    },

    parseServerPokerSymbolRule : function(list) {
        var rt = [];
        list.forEach(function(num) {
            if (num == -1) {
                rt.push({digit : 0, style : 0});
            } else {
                var style = Math.floor(num / 13);
                var digit = num % 13 + 1;

                digit = digit == 1 ? 14 : digit;
                digit = digit == 2 ? 15 : digit;

                rt.push({digit : digit, style : style});
            }
        });
        return rt;
    },

    parseClientPokerSymbolRule : function(list) {
        var rt = [];
        list.forEach(function(identity) {
            var digit = identity.digit;
            var style = identity.style;

            if (digit == 0) {
                rt.push(-1);
            } else {
                digit = digit == 14 ? 1 : digit;
                digit = digit == 15 ? 2 : digit;

                rt.push(style * 13 + digit - 1);
            }
        });
        return rt;
    },

    showRoundHistory : function() {
        var prefab = cc.instantiate(fr.cache.prefabs['GameResultStatements']);
        prefab.parent = cc.director.getScene();

        var s1 = fr.userinfo.mSeatId;
        var s2 = fr.tableinfo.getNextPlayer(s1);
        var s3 = fr.tableinfo.getNextPlayer(s2);

        var p1 = fr.tableinfo.getPlayerInfo(s1);
        var p2 = fr.tableinfo.getPlayerInfo(s2);
        var p3 = fr.tableinfo.getPlayerInfo(s3);

        var params = {
            detail : [],
            avatarUrl : [ p1.avatar, p2.avatar, p3.avatar, ],
            name : [ p1.name, p2.name, p3.name, ],
        };
        for (var i = 0; i < fr.tableinfo.mRoundHistory.length; i++) {
            var score = [];
            var round = fr.tableinfo.mRoundHistory[i];
            round.forEach(function(player) {
                score[player.seatId - 1] = player.delta;
            });
            params.detail.push({
                round : i + 1,
                score : score,
            });
        }
        prefab.getComponent('GameResultStatements').reload(params);

        var size = cc.director.getWinSize();
        prefab.setPosition(cc.v2(size.width / 2, size.height / 2));
    },

    showResultConclusion : function(bonusParams) {
        var prefab = cc.instantiate(fr.cache.prefabs['GameResultConclusion']);
        prefab.parent = cc.director.getScene();

        var s1 = fr.userinfo.mSeatId;
        var s2 = fr.tableinfo.getNextPlayer(s1);
        var s3 = fr.tableinfo.getNextPlayer(s2);

        var p1 = fr.tableinfo.getPlayerInfo(s1);
        var p2 = fr.tableinfo.getPlayerInfo(s2);
        var p3 = fr.tableinfo.getPlayerInfo(s3);

        var conclusion = fr.tableinfo.getConclusionData();

        // champion
        var maxScore = 0;
        var arr = [s1, s2, s3];
        arr.forEach(function(seatId) {
            var score = conclusion[seatId].score;
            if (score > maxScore) {
                maxScore = score;
            }
        });

        bonusParams = bonusParams || {};
        var params = {
            detail : [
                {
                    score : conclusion[s1].score,
                    name : p1.name,
                    left : conclusion[s1].win,
                    avatarUrl : p1.avatar,
                    showLine : true,
                    champion : maxScore != 0  && (conclusion[s1].score == maxScore),
                },
                {
                    score : conclusion[s2].score,
                    name : p2.name,
                    left : conclusion[s2].win,
                    avatarUrl : p2.avatar,
                    showLine : true,
                    champion : maxScore != 0  && (conclusion[s2].score == maxScore),
                },
                {
                    score : conclusion[s3].score,
                    name : p3.name,
                    left : conclusion[s3].win,
                    avatarUrl : p3.avatar,
                    showLine : false,
                    champion : maxScore != 0  && (conclusion[s3].score == maxScore),
                },
            ],
        };
        for (var key in bonusParams) {
            params[key] = bonusParams[key];
        }

        prefab.getComponent('GameResultConclusion').reload(params);

        var size = cc.director.getWinSize();
        prefab.setPosition(cc.v2(size.width / 2, size.height / 2));
    },

    showResultRound : function() {
        var prefab = cc.instantiate(fr.cache.prefabs['GameResultRound']);
        prefab.parent = cc.director.getScene();

        var s1 = fr.userinfo.mSeatId;
        var s2 = fr.tableinfo.getNextPlayer(s1);
        var s3 = fr.tableinfo.getNextPlayer(s2);

        var p1 = fr.tableinfo.getPlayerInfo(s1);
        var p2 = fr.tableinfo.getPlayerInfo(s2);
        var p3 = fr.tableinfo.getPlayerInfo(s3);

        var roundData = fr.tableinfo.mRoundHistory;
        var round = fr.tableinfo.getRound();
        roundData = roundData[round- 1];

        var params = {
            detail : [
                {
                    score : roundData[s1 - 1].delta,
                    name : p1.name,
                    left : roundData[s1 - 1].cards.length,
                    avatarUrl : p1.avatar,
                    boom : roundData[s1 - 1].boom,
                    showLine : true,
                },
                {
                    score : roundData[s2 - 1].delta,
                    name : p2.name,
                    left : roundData[s2 - 1].cards.length,
                    avatarUrl : p2.avatar,
                    boom : roundData[s2 - 1].boom,
                    showLine : true,
                },
                {
                    score : roundData[s3 - 1].delta,
                    name : p3.name,
                    left : roundData[s3 - 1].cards.length,
                    avatarUrl : p3.avatar,
                    boom : roundData[s3 - 1].boom,
                    showLine : false,
                },
            ],
            round : round,
        };

        prefab.getComponent('GameResultRound').reload(params);

        var size = cc.director.getWinSize();
        prefab.setPosition(cc.v2(size.width / 2, size.height / 2));
    },
};

module.exports = game;
