cc.Class({
    extends: cc.Component,

    properties: {
        wDesc : cc.Label,
        wConfirm : cc.Node,
        wCancel : cc.Node,
    },

    onLoad : function() {
        this.mConfirmHandler = null;
        this.mCancelHandler = null;
    },

    reload : function(params) {
        this.wDesc.string = params.desc;
        this.mConfirmHandler = params.onConfirm;
        this.mCancelHandler = params.onCancel;
        this.mOnlyConfirm = params.onlyConfirm;

        if (this.mOnlyConfirm) {
            this.wConfirm.active = true;
            this.wCancel.active = false;
            this.wConfirm.x = 0;
        } else {
            this.wConfirm.active = true;
            this.wCancel.active = true;
            this.wConfirm.x = -120;
            this.wCancel.x = 120;
        }
    },

    onBtnConfirm : function() {
        fr.audio.playBtn();
        var confirm = this.mConfirmHandler;

        this.node.removeFromParent();

        if (confirm) {
            confirm();
        }
    },

    onBtnCancel : function() {
        fr.audio.playBtn();
        var cancel = this.mCancelHandler;

        this.node.removeFromParent();

        if (cancel) {
            cancel();
        }
    },

    onBtnOutside : function() {
        // this.onBtnCancel();
    },
});
