cc.Class({
    extends: cc.Component,

    properties: {
        wNodeStep : [cc.Node],
        wLabelHistoryCash : cc.Label,
        wLabelCurrentCash : cc.Label,

        wLabelCashLeft : cc.Label,
        wBtnExchange : cc.Node,
        wEditBox : cc.EditBox,
    },

    onLoad : function() {
        fr.display.on(this.node, fr.events.Msg_User_Info, this.onReceiveUserInfoMsg.bind(this));
    },

    start : function() {
        this.switchprev();
    },

    onReceiveUserInfoMsg : function() {
        this.wLabelHistoryCash.string = fr.display.formatCoupon(fr.userinfo.mCashExchangeTotal);
        this.wLabelCurrentCash.string = fr.display.formatCoupon(fr.userinfo.mCashCurrent);

        this.wLabelCashLeft.string = fr.display.formatCoupon(fr.userinfo.mCashCurrent) + ',';
    },

    switchprev : function() {
        this.wNodeStep[0].active = true;
        this.wNodeStep[1].active = false;

        this.wLabelHistoryCash.string = fr.display.formatCoupon(fr.userinfo.mCashExchangeTotal);
        this.wLabelCurrentCash.string = fr.display.formatCoupon(fr.userinfo.mCashCurrent);
    },

    swtichnext : function() {
        this.wNodeStep[0].active = false;
        this.wNodeStep[1].active = true;

        this.wLabelCashLeft.string = fr.display.formatCoupon(fr.userinfo.mCashCurrent) + ',';
        this.wBtnExchange.x = this.wLabelCashLeft.node.x + this.wLabelCashLeft.node.width + 55 + 3;
        this.wEditBox.string = parseInt(fr.userinfo.mCashCurrent);
        this.onEditBoxTextChanged();
    },

    onBtnOutside : function() {
        this.node.removeFromParent();
    },

    onBtnNextStep : function() {
        this.swtichnext();
    },

    onBtnExchangePart : function() {
        this.exchange(this.wEditBox.string);
    },

    onBtnExchangeAll : function() {
        this.exchange(fr.userinfo.mCashCurrent);
    },

    onEditBoxTextChanged : function() {
        var cash = parseFloat(this.wEditBox.string);
        if (cash + '' == 'NaN') {
            cash = 5;
        } else {
            cash = Math.max(5, cash);
            cash = Math.min(1000, cash);
        }
        this.wEditBox.string = fr.display.formatCoupon(cash.toFixed(2));
    },

    exchange : function(cash) {
        if (cash <= fr.userinfo.mCashCurrent) {
            fr.msg.exchange_cash({cash : cash})
        } else {
            fr.display.showTips('账户余额不足');
        }
    },
});