cc.Class({
    extends: cc.Component,

    properties: {
        wNodePage : [cc.Node],

        wDescPlace1 : [cc.Label],
        wDescPlace2 : [cc.Label],
        wDescPlace3 : [cc.Label],
        wRewardAvatar : [cc.Sprite],
        wContainer : cc.Node,

        wLabelRule : [cc.Label],
    },

    onLoad : function() {
        this.mRewards = fr.matchinfo.getRewardInfo();
        this.swtich2detail();
    },

    onBtnOutside : function() {
        this.node.removeFromParent();
    },

    onBtnClose : function() {
        fr.audio.playBtn();
        this.node.removeFromParent();
    },

    onBtnTab : function(sender, params) {
        fr.audio.playBtn();
        if (params == 1) {
            this.swtich2detail();
        } else if (params == 2) {
            this.swtich2rule();
        } else {
            cc.warn('unexpected params on onBtnTab function | ' + params);
        }
    },

    swtich2rule : function(){
        this.wNodePage[0].active = false;
        this.wNodePage[1].active = true;
    },

    swtich2detail : function(){
        this.wNodePage[0].active = true;
        this.wNodePage[1].active = false;

        this.wContainer.removeAllChildren();
        for (var i = 0; i < this.mRewards.length; i++) {
            var reward = this.mRewards[i];
            if (reward.avatar) {
                var arr = this['wDescPlace' + (i + 1)];
                for (var j = 0; j < arr.length; j++) {
                    var desc = reward.desc[j]
                    if (desc) {
                        arr[j].node.active = true;
                        arr[j].string = desc;
                    } else {
                        arr[j].node.active = false;
                    }
                }
                fr.display.loadRemote(this.wRewardAvatar[i], reward.avatar);
            } else {
                var prefab = cc.instantiate(fr.cache.prefabs['MatchIntroCell']);
                prefab.parent = this.wContainer;
                prefab.getComponent('MatchIntroCell').reload(reward.desc);
            }
        }
    },
});
