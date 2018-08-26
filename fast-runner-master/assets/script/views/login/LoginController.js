var LoadingState = {
    Loaded_Hall_Scene : 0,
    Loaded_Prefab : 1,
    Loaded_Poker : 2,
    Loaded_Audio : 3,
    Loaded_Login_Success : 4,
}

cc.Class({
    extends: cc.Component,

    properties: {
        wNodeLoading : cc.Node,
        wLabelProgress : cc.Label,
        wLabelTips : cc.Label,
    },

    onLoad : function() {
        fr.display.on(this.node, fr.events.Login_Success, this.onReceiveLoginSucMsg.bind(this));
        fr.display.on(this.node, fr.events.Login_Authorize_Failed, this.onEventAuthorizeFailed.bind(this));

        this.mLoadedPercent = [
            {lock : true, percent : 30},
            {lock : true, percent : 45},
            {lock : true, percent : 60},
            {lock : true, percent : 75},
            {lock : true, percent : 99},
        ]

        this.mPercentage = -1;
        this.mLastPercentage = -1;
    },

    unlock : function(type) {
        var data = this.mLoadedPercent[type];
        if (data) {
            data.lock = false;
        }
    },

    start : function() {
        // load scene res
        cc.director.preloadScene('hall', function () {
            this.unlock(LoadingState.Loaded_Hall_Scene);
        }.bind(this));

        // load prefab res
        var prefabs = {};
        cc.loader.loadResDir('prefab', cc.Prefab, function (err, assets) {
            if (err) {
                cc.error(err.message || err);
                return;
            }

            for(var i = 0; i < assets.length; i++) {
                var res = assets[i];
                prefabs[res._name] = res;
            }

            this.unlock(LoadingState.Loaded_Prefab);
        }.bind(this));
        fr.cache.prefabs = prefabs;

        // load poker res
        var pokers = {};
        cc.loader.loadResDir('poker', cc.SpriteFrame, function (err, assets) {
            if (err) {
                cc.error(err.message || err);
                return;
            }

            for(var i = 0; i < assets.length; i++) {
                var res = assets[i];
                pokers[res._name] = res;
            }

            this.unlock(LoadingState.Loaded_Poker);
        }.bind(this));
        fr.cache.pokers = pokers;

        // load audio res
        var url = fr.config.cdnUrl;
        var assets = fr.config.remoteAssets;
        var curLoadedNum = 0;
        var totalLoadedNum = assets.length;
        assets.forEach(function(base) {
            cc.loader.load(url + base, function (err, remoteUrl) {
                if (err) {
                    cc.error(err.message || err);
                    return;
                }

                curLoadedNum++;

                if (curLoadedNum == totalLoadedNum) {
                    this.unlock(LoadingState.Loaded_Audio);
                }
            }.bind(this));
        }.bind(this));

        fr.sdk.login();
    },

    update : function(dt) {
        this.mPercentage++;

        for (var i = 0; i < this.mLoadedPercent.length; i++) {
            var data = this.mLoadedPercent[i];
            if (data.lock) {
                this.mPercentage = Math.min(this.mPercentage, data.percent);
                break;
            }
        }

        if (this.mLastPercentage != this.mPercentage) {
            this.mLastPercentage = this.mPercentage;
            this.wLabelProgress.string = '正在加载: ' + this.mPercentage + '%';

            if (this.mPercentage == 100) {
                cc.director.loadScene('hall');
            }
        }
    },

    onReceiveLoginSucMsg : function() {
        this.unlock(LoadingState.Loaded_Login_Success);

        fr.sdk.setDefaultAppShare();
    },

    onEventAuthorizeFailed : function() {
        fr.display.showDialog({
            desc : '我们需要获取您的用户信息，以区分于其他玩家',
            onlyConfirm : true,
            onConfirm : function() {
                fr.sdk.authorizeUserInfo();
            }.bind(this),
        });
    },
});