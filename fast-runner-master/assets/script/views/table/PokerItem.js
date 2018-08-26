var styleMap = {
    0 : 2,
    1 : 3,
    2 : 2,
    3 : 3,
};

var styleZOrder = {
    0 : 2,
    1 : 1,
    2 : 0,
    3 : 3,
}

var posState = {
    idle : 0,
    moveDown : 1,
    moveUp : 2,
    show : 3,
};

cc.Class({
    extends: cc.Component,

    properties: {
        wDigit : cc.Sprite,
        wStyle1 : cc.Sprite,
        wStyle2 : cc.Sprite,

        wSelect : cc.Node,
        wHeadFirst : cc.Node,
        wForbid : cc.Node,
    },

    onLoad : function() {
        this.mForbidOperate = false;
        this.wSelect.active = false;
        this.mPosState = posState.idle;

        this.mDis = 30;
        this.mDuration = 0.2;
        this.mSpeed = this.mDis / this.mDuration;

        this.wForbid.active = this.mForbidOperate;
    },

    forbidOperate : function(forbid) {
        if (forbid) {
            this.hide();
        }
        this.mForbidOperate = forbid;

        this.wForbid.active = this.mForbidOperate;
    },

    select : function() {
        if (this.mForbidOperate) {
            return;
        }

        if (this.wSelect.active) {
            return;
        }

        this.wSelect.active = true;
    },

    unselect : function() {
        if (this.mForbidOperate) {
            return;
        }

        if (!this.wSelect.active) {
            return;
        }

        this.wSelect.active = false;
    },

    isSelected : function() {
        return this.wSelect.active;
    },

    isShowed : function() {
        return this.mPosState == posState.show || this.mPosState == posState.moveUp;
    },

    getIdentity : function() {
        return {digit : this.mDigit, style : this.mStyle};
    },

    show : function() {
        if (this.mForbidOperate) {
            return;
        }

        if (this.mPosState == posState.show) {
            return;
        }

        this.mPosState = posState.moveUp;
        var duration = (this.mDis - this.node.y) / this.mSpeed;
        var self = this;

        this.node.stopAllActions();
        this.node.runAction(cc.sequence(
            cc.moveTo(duration, cc.v2(0, this.mDis)),
            cc.callFunc(function() {
                self.mPosState = posState.show;
            })
        ));
    },

    hide : function() {
        if (this.mForbidOperate) {
            return;
        }

        if (this.mPosState == posState.idle) {
            return;
        }

        this.mPosState = posState.moveDown;
        var duration = this.node.y / this.mSpeed;
        var self = this;

        this.node.stopAllActions();
        this.node.runAction(cc.sequence(
            cc.moveTo(duration, cc.v2(0, 0)),
            cc.callFunc(function() {
                self.mPosState = posState.idle;
            })
        ));
    },

    init : function(params) {
        this.mDigit = params.digit;
        this.mStyle = params.style;

        var resMap = fr.cache.pokers;
        this.wDigit.spriteFrame = resMap[this.genDigitPath()];
        this.wStyle1.spriteFrame = resMap[this.genStylePath()];
        this.wStyle2.spriteFrame = resMap[this.genStylePath()];

        this.node.setLocalZOrder(-1 * (this.mDigit * 10 + styleZOrder[this.mStyle]));

        this.wHeadFirst.active = fr.game.mHeadFirstValid && (this.mDigit == 3 && this.mStyle == 2);
    },

    genDigitPath : function() {
        return 'poker_digit_' + styleMap[this.mStyle] + '_' + this.mDigit;
    },

    genStylePath : function() {
        return 'poker_style_' + this.mStyle;
    },

    onDestroy : function() {
    },
});
