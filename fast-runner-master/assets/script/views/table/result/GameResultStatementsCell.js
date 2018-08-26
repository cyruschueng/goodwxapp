cc.Class({
    extends: cc.Component,

    properties: {
        wRound : cc.Label,
        wScore1 : cc.Label,
        wScore2 : cc.Label,
        wScore3 : cc.Label,
    },

    onLoad : function() {
    },

    reload : function(params) {
        this.wRound.string = '第' + params.round + '局';
        this.wScore1.string = params.score[0];
        this.wScore2.string = params.score[1];
        this.wScore3.string = params.score[2];

        var arr = [1, 2, 3];
        arr.forEach(function(index) {
            var score = params.score[index - 1];
            var label = this['wScore' + index];

            label.string = score;

            if (score > 0) {
                label.node.color = new cc.Color(0xde, 0x64, 0x21);
            } else {
                label.node.color = new cc.Color(0x7e, 0x4c, 0x28);
            }
        }.bind(this));
    },
});
