cc.Class({
    extends: cc.Component,

    properties: {
        duration : 0,

        longTapEvent: {
            default: null,
            type: cc.Component.EventHandler,
        },

        cancelEvent: {
            default: null,
            type: cc.Component.EventHandler,
        },
    },

    onLoad : function() {
        this.node.on('touchstart', this.onTouchBegan, this);
        this.node.on('touchmove', this.onTouchMoved, this);
        this.node.on('touchend', this.onTouchEnded, this);
        this.node.on('touchcancel', this.onTouchCancel, this);
    },

    onTouchBegan : function(event) {
        this.mValid = true;

        this.mScheduleEntry = function() {
            cc.Component.EventHandler.emitEvents([this.longTapEvent], event);
        };
        this.unschedule(this.mScheduleEntry);
        this.scheduleOnce(this.mScheduleEntry, this.duration);
    },

    onTouchMoved : function(event) {
        if (!fr.display.isTouchInside(this.node, event)) {
            this.dispatchCancelEvent(event);
        }
    },

    onTouchEnded : function(event) {
        this.dispatchCancelEvent(event);
    },

    onTouchCancel : function(event) {
        this.onTouchEnded();
    },

    dispatchCancelEvent : function(event) {
        if (this.mValid) {
            cc.Component.EventHandler.emitEvents([this.cancelEvent], event);
            this.mValid = false;
            this.unschedule(this.mScheduleEntry);
        }
    },
});
