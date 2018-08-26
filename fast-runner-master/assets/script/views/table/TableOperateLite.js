/*
    * Author : chentao
    * Date : 2017.2.22
    * Desc : 牌桌操作按钮-简化版
    * Example :
*/
cc.Class({
    extends: cc.Component,

    properties: {
        wCountDownLabel : {
            displayName : 'Clock Label',
            type : cc.Label,
            default : null,
        },

        wStateCard : cc.Node,
        wStatePass : cc.Node,
        wStateOperate : cc.Node,
        wStateReady : cc.Node,
        wStateNotReady : cc.Node,
    },

    onLoad : function() {
    },

    showCards : function(cards) {
        fr.picker._sort(cards);

        this.node.children.forEach(function(child) {
            child.active = false;
        }.bind(this));
        this.wStateCard.active = true;

        var begin = cards.length - 8;
        begin = begin < 0? 0 : begin;
        var arr = [
            cards.slice(begin, cards.length),
            cards.slice(0, begin),
        ];

        if (arr[1].length == 0) {
            arr.pop();
        }

        this.wStateCard.removeAllChildren();
        var maxWidth = 0;
        arr.forEach(function(_cards) {
            var prefab = cc.instantiate(fr.cache.prefabs['PokerContainer']);
            prefab.setAnchorPoint(this.wStateCard.getAnchorPoint());
            prefab.getComponent('PokerContainer').reload(_cards);
            prefab.parent = this.wStateCard;

            var width = prefab.getContentSize().width;
            if (width > maxWidth) {
                maxWidth = width;
            }
        }.bind(this));

        this.showCardsAnimation(cards, maxWidth);
    },

    showCardsAnimation : function(cards, maxWidth) {
        var node = this.wStateCard;
        if (this.wStateCard.anchorX == 0) {
            var pWorld = node.convertToWorldSpace(cc.v2(maxWidth, 50));
        } else {
            var pWorld = node.convertToWorldSpace(cc.v2(0, 50));
            var left = true;
        }
        var pos = this.node.convertToNodeSpace(pWorld);

        if (fr.picker._isLIANDUI(cards)) {
            fr.display.showAnimationLIANDUI({
                pos : pos,
                parent : this.node,
            });
        } else if (fr.picker._isSHUNZI(cards)) {
            fr.display.showAnimationSHUNZI({
                pos : pos,
                parent : this.node,
                left : left,
            });
        }
    },

    showPass : function(cards) {
        this.node.children.forEach(function(child) {
            child.active = false;
        }.bind(this));
        this.wStatePass.active = true;
    },

    showOperate : function(pass) {
        this.node.children.forEach(function(child) {
            child.active = false;
        }.bind(this));
        this.wStateOperate.active = true;

        this.mIsPassRound = pass;
        this.mTimeout = pass? 4 : 16;
        this.unschedule(this.countdownUpdate);
        this.schedule(this.countdownUpdate, 1);
        this.countdownUpdate();
    },

    showReady : function() {
        this.node.children.forEach(function(child) {
            child.active = false;
        }.bind(this));
        this.wStateReady.active = true;
    },

    showNotReady : function() {
        this.node.children.forEach(function(child) {
            child.active = false;
        }.bind(this));
        this.wStateNotReady.active = true;
    },

    showNothing : function() {
        this.node.children.forEach(function(child) {
            child.active = false;
        }.bind(this));
    },

    hideReadyStatus : function() {
        this.wStateNotReady.active = false;
        this.wStateReady.active = false;
    },

    countdownUpdate : function() {
        this.mTimeout -= 1;
        this.wCountDownLabel.string = this.mTimeout;

        if (this.mTimeout == 0) {
            if (!fr.tableinfo.isMatch() && !this.mIsPassRound) {
                this.mTimeout = 16;
            } else {
                this.unschedule(this.countdownUpdate);
            }
        }
    },
});
