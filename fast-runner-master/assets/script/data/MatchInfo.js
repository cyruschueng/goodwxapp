var matchinfo = cc._Class.extend({
    ctor : function() {
        this.mCurRank = -1;
        this.mCurStage = -1;
        this.mOver = false;
        this.mWaitMatch = false;

        this.mRankDesc = [
            {rank : '第1名', desc : '5红包'},
            {rank : '第2名', desc : '3红包'},
            {rank : '第3名', desc : '1红包'},
            {rank : '4-10', desc : '0红包'},
            {rank : '11-20', desc : '0红包'},
            {rank : '21-50', desc : '0红包'},
        ]
    },

    parseDesMsg : function(result) {
        this.mMaxParticipateNum = result.info.maxPlayer;
        this.mConditionStr = '满' + this.mMaxParticipateNum + '人开赛';

        var stageArr = [];
        result.stages.forEach(function(stage) {
            stageArr.push(stage.n == -1? 3 : stage.n);
        });
        stageArr.push(0);

        var stageMap = {};
        for (var i = stageArr.length - 1; i >= 0; i--) {
            if (stageMap[stageArr[i]]) {
                stageArr.splice(i, 1);
            } else {
                stageMap[stageArr[i]] = true;
            }
        }
        this.mStageArr = stageArr;

        //================================================
        var arr = [];
        result.rankRewards.forEach(function(rewards) {
            var s = rewards.range['s'];
            var e = rewards.range['e'];

            var struct = {
                desc : [],
                avatar : null,
                range : [s, e],
            }
            rewards.rewardsList.forEach(function(reward) {
                struct.desc.push(reward.desc);
                struct.avatar = struct.avatar? struct.avatar : reward.img;
            }.bind(this));

            arr.push(struct);
        }.bind(this));
        this.mRankRewards = arr;
    },

    parseWaitMsg : function(result) {
        this.mWaitMatch = true;
    },

    parseOverMsg : function(result) {
        this.mCurRank = result.rank;
        this.mCurStage = 3;

        this.mOver = true;

        // reward
        var reward = [];
        result.reward.forEach(function(data) {
            reward.push({
                name : data.count + data.name,
                pic : data.url,
            })
        })
        this.mFinalResult = {
            playerName : fr.userinfo.mUserName,
            matchName : result.roomName || '跑得快金币赛',
            rank : result.rank,
            reward : reward,
        }
    },

    parseRankMsg : function(result) {
        this.mCurRank = result.mranks[0].rank;
    },

    //================================================
    // {
    //     desc : [
    //         '冠军奖励1',
    //         '冠军奖励2',
    //         '冠军奖励3',
    //     ],
    //     avatar : 'http://img.zcool.cn/community/018d4e554967920000019ae9df1533.jpg@900w_1l_2o_100sh.jpg',
    // },
    getRewardInfo : function() {
        var arr = [];
        this.mRankRewards.forEach(function(rewards) {
            var s = rewards.range[0];
            var e = rewards.range[1];

            for (var i = s; i <= e && 1 <= i && i <= 3; i++) {
                arr.push({
                    desc : rewards.desc,
                    avatar : rewards.avatar,
                });
            }

            if (i <= e) {
                arr.push({
                    desc : [
                        '第' + s +  '-' + e +  '名',
                        rewards.desc[0]
                    ],
                });
            }
        }.bind(this));
        return arr;
    },

    parseUpdateMsg : function(result) {
        this.mParticipateNum = result.curPlayer;

        this.mCurStage = result.curPlayer;
    },

    getCurRank : function() {
        if (this.mCurRank == -1) {
            return this.mStageArr[0];
        } else {
            return this.mCurRank;
        }
    },

    getCurStage : function() {
        if (this.mCurStage == -1) {
            return this.mStageArr[0];
        } else {
            return this.mCurStage;
        }
    },

    isOver : function() {
        return this.mOver;
    },
});

module.exports = matchinfo;
