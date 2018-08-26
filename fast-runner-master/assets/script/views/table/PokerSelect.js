cc.Class({
    extends: cc.Component,

    properties: {
    },

    onEventTableReady : function() {
        if (!this.mTouchListened) {
            this.mTouchListened = true;
            this.node.on('touchstart', this.onTouchBegan, this);
            this.node.on('touchmove', this.onTouchMoved, this);
            this.node.on('touchend', this.onTouchEnded, this);
            this.node.on('touchcancel', this.onTouchCancel, this);
        }
    },

    onEventTouchOutSide : function() {
        if (!fr.tableinfo.isTablePlaying()) {
            return;
        }

        if (!fr.tableinfo.isSelfRound()) {
            this.hide();
            return;
        }

        if (!fr.tableinfo.canTake()) {
            this.doPass();
        } else {
            this.hide();
        }
    },

    doPass : function() {
        fr.display.emit(fr.events.Table_Select_Cards, {cards : []});
        this.mSelected = [];
        this.mPromoteIndex = 0;
    },

    // TODO 出牌之后的间隔处理
    doAction : function() {
        var curCards = fr.tableinfo.getSelfPokers();
        var preCards = fr.tableinfo.getPreCards(fr.userinfo.mSeatId);
        var selCards = this.mSelected;

        if (selCards.length > 0) {
            if (fr.picker.check(selCards, preCards)) {
                fr.display.emit(fr.events.Table_Select_Cards, {cards : fr.game.parseClientPokerSymbolRule(selCards)});
                this.mSelected = [];
                this.mPromoteIndex = 0;
            } else {
                fr.display.showTips("选牌不符合规则");
            }
        }
    },

    hide : function() {
        var componentMap = {};
        this.node.children.forEach(function(child) {
            var com = child.getComponent('PokerItem');
            var identity = com.getIdentity();

            componentMap[identity.digit] = componentMap[identity.digit] || {};
            componentMap[identity.digit][identity.style] = com;
        }.bind(this));

        this.mSelected.forEach(function(identity) {
            componentMap[identity.digit][identity.style].hide();
        });

        this.mSelected = [];
    },

    onEventBtnPressPass : function() {
        this.doPass();
    },

    onEventBtnPressPromote : function() {
        var curCards = fr.tableinfo.getSelfPokers();
        var preCards = fr.tableinfo.getPreCards(fr.userinfo.mSeatId);
        var recCards = fr.picker.filter(curCards, preCards).matches;

        this.mPromoteIndex = this.mPromoteIndex || 0;
        recCards = recCards[this.mPromoteIndex++ % recCards.length];

        var componentMap = {};
        this.node.children.forEach(function(child) {
            var com = child.getComponent('PokerItem');
            var identity = com.getIdentity();

            componentMap[identity.digit] = componentMap[identity.digit] || {};
            componentMap[identity.digit][identity.style] = com;

            com.hide();
        }.bind(this));

        recCards.forEach(function(identity) {
            componentMap[identity.digit][identity.style].show();
        });

        this.mSelected = recCards;
    },

    onEventBtnPressAction : function() {
        this.doAction();
    },

    onEventSelectCardsQuery : function() {
        this.mSelected = this.mSelected;
    },

    onEventFilterPoker : function() {
        var src = fr.tableinfo.getSelfPokers();
        var dst = fr.tableinfo.getPreCards(fr.userinfo.mSeatId);

        if (dst.length == 0) {
            return;
        }

        var result = fr.picker.filter(src, dst);
        if (!result.withFollow) {
            var cards = result.matches;

            var slots = [];
            for (var i = 0; i < 13; i++) {
                slots[i] = false;
            }

            cards.forEach(function(arr) {
                arr.forEach(function(identity) {
                    slots[identity.digit - 3] = true;
                });
            });

            for(var i = this.node.childrenCount - 1; i >= 0; i--) {
                var child = this.node.children[i];
                var com = child.getComponent('PokerItem');
                var identity = com.getIdentity();
                com.forbidOperate(!slots[identity.digit - 3]);
            }
        }
    },

    onLoad : function() {
        fr.display.on(this.node, fr.events.Table_State_Ready_Done, this.onEventTableReady.bind(this));
        fr.display.on(this.node, fr.events.Table_Select_Poker_Touch_Outside, this.onEventTouchOutSide.bind(this));

        fr.display.on(this.node, fr.events.Table_Btn_Press_Pass, this.onEventBtnPressPass.bind(this));
        fr.display.on(this.node, fr.events.Table_Btn_Press_Promote, this.onEventBtnPressPromote.bind(this));
        fr.display.on(this.node, fr.events.Table_Btn_Press_Action, this.onEventBtnPressAction.bind(this));

        fr.display.on(this.node, fr.events.Table_Select_Cards_Preview_Query, this.onEventSelectCardsQuery.bind(this));
        fr.display.on(this.node, fr.events.Table_Filter_Poker, this.onEventFilterPoker.bind(this));

        this._selected = [];
        cc.defineGetterSetter(this, 'mSelected',
            function () {
                return this._selected;
            },
            function (val) {
                this._selected = val;
                if (this._selected) {
                    fr.display.emit(fr.events.Table_Select_Cards_Preview, {enable : this._selected.length > 0});
                }
            }
        );
    },

    select : function(com) {
        if (this.mIsShowAction === null) {
            this.mIsShowAction = !com.isShowed();
        }

        com.select();
    },

    unselect : function(com) {
        com.unselect();
    },

    onTouchBegan : function(event) {
        if (fr.tableinfo.isSelfRound() && !fr.tableinfo.canTake()) {
            this.mTouchValid = false;
            this.doPass();
            return;
        }
        this.mTouchValid = true;

        this.mIsShowAction = null;

        for(var i = this.node.childrenCount - 1; i >= 0; i--) {
            var child = this.node.children[i];
            var com = child.getComponent('PokerItem');
            if (fr.display.isTouchInside(com.node, event)) {
                this.select(com);
                break;
            }
        }
    },

    onTouchMoved : function(event) {
        if (!this.mTouchValid) {
            return;
        }

        var began = event.getStartLocation();
        var now = event.getLocation();

        var m, n;
        for(var i = this.node.childrenCount - 1; i >= 0; i--) {
            var child = this.node.children[i];
            var com = child.getComponent('PokerItem');

            var box = com.node.getBoundingBoxToWorld();
            if (box.contains(began)) {
                m = i;
                break;
            }
        }

        for(var i = this.node.childrenCount - 1; i >= 0; i--) {
            var child = this.node.children[i];
            var com = child.getComponent('PokerItem');

            var box = com.node.getBoundingBoxToWorld();
            if (box.contains(now)) {
                n = i;
                break;
            }
        }

        for(var i = this.node.childrenCount - 1; i >= 0; i--) {
            var child = this.node.children[i];
            var com = child.getComponent('PokerItem');

            if (fr.display.pContains(m, n, i)) {
                this.select(com);
            } else {
                this.unselect(com);
            }
        }
    },

    onTouchEnded : function(event) {
        if (!this.mTouchValid) {
            return;
        }

        var selected = [];
        var componentMap = {};

        this.node.children.forEach(function(child) {
            var com = child.getComponent('PokerItem');
            var identity = com.getIdentity();
            if (com.isSelected()) {
                selected.push(identity);
                com.unselect();
            }

            componentMap[identity.digit] = componentMap[identity.digit] || {};
            componentMap[identity.digit][identity.style] = com;
        }.bind(this));

        var action = this.mIsShowAction? 'show' : 'hide';
        if (this.mSelected.length == 0) {
            selected = fr.picker.pick(selected);
        }
        selected.forEach(function(identity) {
            componentMap[identity.digit][identity.style][action]();
        });

        // 统计当前选中
        var selected = [];
        this.node.children.forEach(function(child) {
            var com = child.getComponent('PokerItem');
            if (com.isShowed()) {
                selected.push(com.getIdentity());
            }
        }.bind(this));

        this.mSelected = selected;

        // add audio effect
        var key = this.mIsShowAction? 'card_show' : 'card_hide';
        if (this.mSelected.length > 0) {
            fr.audio.play(key);
        }
    },

    onTouchCancel : function(event) {
        this.onTouchEnded();
    },
});
