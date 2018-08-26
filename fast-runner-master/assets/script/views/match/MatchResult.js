cc.Class({
    extends: cc.Component,

    properties: {
        wContainer : cc.Node,
        wDesc : cc.Label,
        wBtnExchange : cc.Node,
        wBtnOnceMore : cc.Node,

        wTitle : [cc.Node],
    },

    onLoad : function() {
        this.wContainer.removeAllChildren();

        fr.display.on(this.node, fr.events.Msg_Match_Des, this.onReceiveMatchDesMsg.bind(this));
    },

    onReceiveMatchDesMsg : function() {
        this.node.removeFromParent();
    },

    reload : function(params) {
        params = fr.matchinfo.mFinalResult;

        // title
        var isReachTop = params.rank <= 10;
        this.wTitle[0].active = isReachTop;
        this.wTitle[1].active = !isReachTop;

        // desc
        this.wDesc.string = `${params.playerName}在途游跑得快${params.matchName}中荣获${params.rank}名`;

        // reward
        params.reward.forEach(function(info) {
            var prefab = cc.instantiate(fr.cache.prefabs['ItemCell']);
            prefab.getComponent('ItemCell').init(info);
            prefab.parent = this.node;
        }.bind(this));

        // btn
        this.wBtnExchange.active = params.reward.length > 0;
        this.wBtnOnceMore.active = params.reward.length == 0;
    },

    onBtnOutside : function() {
        // this.node.removeFromParent();
    },

    onBtnClose : function() {
        fr.audio.playBtn();

        if (this.mActionDisable) {
            return;
        }

        cc.director.loadScene('hall');
    },

    onBtnOnceMore : function() {
        fr.audio.playBtn();

        fr.msg.signinMatch();

        this.mActionDisable = true;
    },

    onBtnExchange : function() {
        fr.audio.playBtn();

        fr.display.showCashExchange();
    },

    onBtnShare : function() {
        fr.audio.playBtn();

        fr.sdk.randomShare();
    },
});
