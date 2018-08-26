cc.Class({
    extends: cc.Component,

    properties: {
        wNodeState : [cc.Node],
        wLabelDesc : [cc.Label],
        wLabelDate : cc.Label,
        wBtnClip : cc.Node,
    },

    onLoad : function() {
    },

    reload : function(params) {
        if (params.code && params.code != '') {
            this.wNodeState[0].active = false;
            this.wNodeState[1].active = true;
            this.wBtnClip.active = true;

            this.wLabelDesc[1].string = params.desc;
            this.wLabelDesc[2].string = '领取口令: ' + params.code;
        } else {
            this.wNodeState[0].active = true;
            this.wNodeState[1].active = false;
            this.wBtnClip.active = false;

            this.wLabelDesc[0].string = params.desc;
        }

        this.mCode = params.code;
        this.wLabelDate.string = fr.display.timeFormat1(params.timestamp);
    },

    onBtnClip : function() {
        fr.audio.playBtn();
        fr.display.showTips('口令已复制到剪切板!');
    },
});
