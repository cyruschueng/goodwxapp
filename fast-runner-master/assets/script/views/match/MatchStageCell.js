cc.Class({
    extends: cc.Component,

    properties: {
        wStageDesc : cc.Label,
        wProgLine : cc.ProgressBar,
        wProgStage : cc.ProgressBar,
    },

    onLoad : function() {
    },

    reload : function(params) {
        this.wStageDesc.string = params.desc;
        this.wProgLine.progress = params.reached? 1 : 0;
        this.wProgStage.progress = params.reached? 1 : 0;

        this.wProgLine.node.active = !params.cutline;
        this.node.width = params.ended? this.wProgStage.node.width : this.wProgStage.node.width + this.wProgLine.node.width - 3;
    },
});
