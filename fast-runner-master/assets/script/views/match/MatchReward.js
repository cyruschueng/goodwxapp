cc.Class({
    extends: cc.Component,

    properties: {
        wContainer : cc.Node,
    },

    onLoad : function() {
        this.mHistory = [
            {
                desc : '任务奖励：600个金币，5大师分',
                timestamp : 1520582653,
            },
            {
                desc : '恭喜您获得1元微信红包',
                code : 'olisfas255ddfa',
                timestamp : 1520582653,
            },
            {
                desc : '恭喜您获得1元微信红包',
                code : 'olisfas255ddfa',
                timestamp : 1520582653,
            },
            {
                desc : '任务奖励：600个金币，5大师分',
                timestamp : 1520582653,
            },
            {
                desc : '恭喜您获得1元微信红包',
                code : 'olisfas255ddfa',
                timestamp : 1520582653,
            },
            {
                desc : '恭喜您获得1元微信红包',
                code : 'olisfas255ddfa',
                timestamp : 1520582653,
            },
            {
                desc : '任务奖励：600个金币，5大师分',
                timestamp : 1520582653,
            },
            {
                desc : '恭喜您获得1元微信红包',
                code : 'olisfas255ddfa',
                timestamp : 1520582653,
            },
        ];

        this.wContainer.removeAllChildren();
        this.mHistory.forEach(function(data) {
            var prefab = cc.instantiate(fr.cache.prefabs['MatchRewardCell']);
            prefab.parent = this.wContainer;
            prefab.getComponent('MatchRewardCell').reload(data);
        }.bind(this));
    },

    onBtnOutside : function() {
        this.node.removeFromParent();
    },

    onBtnClose : function() {
        fr.audio.playBtn();
        this.node.removeFromParent();
    },
});
