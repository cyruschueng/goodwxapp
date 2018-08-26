cc.Class({
    extends: cc.Component,

    properties: {
        wPreventTouch : cc.Node,

        wEditboxRoom : cc.EditBox,
        wNodeDebug : cc.Node,
    },

    onReceiveTableMsg : function(result) {
        switch(result.action) {
            case fr.events.Action_Table_Info :
            {
                var isMatch = false;
                for(var i = 1; i < 4; i++) {
                    if (result['seat' + i].uid === fr.userinfo.mUserId) {
                        isMatch = true;
                        break;
                    }
                }

                if (isMatch) {
                    cc.director.loadScene('table');
                }
                break;
            }
        }
    },

    onReceiveMatchSignedMsg : function(result) {
    },

    onReceiveMatchDesMsg : function(result) {
        cc.director.loadScene('table');
    },

    onReceiveQuickStartMsg : function(result) {
        // if (fr.userinfo.mLastRoomId && !result.isOK) {
        //     cc.director.loadScene('table');
        // }
    },

    onReceiveMatchWaitMsg : function(result) {
        if (fr.userinfo.mLastRoomId) {
            cc.director.loadScene('table');
        }
    },

    onLoad : function() {
        cc.director.preloadScene('table', function () {
        });

        fr.display.on(this.node, fr.events.Msg_Table, this.onReceiveTableMsg.bind(this));
        fr.display.on(this.node, fr.events.Msg_Match_Is_Signed, this.onReceiveMatchSignedMsg.bind(this));
        fr.display.on(this.node, fr.events.Msg_Match_Des, this.onReceiveMatchDesMsg.bind(this));
        fr.display.on(this.node, fr.events.Msg_Quick_Start, this.onReceiveQuickStartMsg.bind(this));
        fr.display.on(this.node, fr.events.Msg_Match_Wait, this.onReceiveMatchWaitMsg.bind(this));
        fr.display.on(this.node, fr.events.Game_Enter_Fore, this.onEventGameEnterFore.bind(this));

        this.wNodeDebug.active = CC_JSB? true : false;
    },

    onEventGameEnterFore : function() {
    },

    start : function() {
        this.wPreventTouch.active = true;

        this.scheduleOnce(function() {
            if (fr.userinfo.mLastRoomId) {
                fr.display.showTips("检测到您有正在进行的牌局，正在重新连接...");
                fr.msg.quick_start();
            } else if (fr.sdk.isInvite()) {
                fr.sdk.enterInviteRoom();
            } else {
                this.wPreventTouch.active = false;

                fr.audio.playBg('hall');
            }
        }.bind(this), 0);
    },

    onBtnEnterMatchGame : function() {
        fr.audio.playBtn();

        fr.msg.signinMatch();
    },

    onBtnEnterFriendGame : function() {
        fr.audio.playBtn();
        // TODO prevent touch until receive server msg
        var config = {
            'totalPlayNum'      : 6,
            'maxSeatN'          : 3,
            'cardNum'           : 16,
            'alarm'             : 0,
            'firstOutCard'      : 2,
            'showLeftCardNum'   : 0,
            'can4Dai3'          : 1,
            'splitZhaDan'       : 1,
            'extraPoint'        : 1,
            'playMode'          : "pdk"
        };
        fr.msg.create_custom_room(config);
    },

    onBtnRank : function() {
        fr.audio.playBtn();
    },

    onBtnReward : function() {
        fr.audio.playBtn();
        fr.display.showCashExchange();
    },

    onBtnMatchDetail : function() {
        fr.audio.playBtn();
        fr.display.showMatchIntro();
    },

    onBtnConfrimRoomId : function() {
        fr.audio.playBtn();
        var identity = this.wEditboxRoom.string;
        identity = identity == ''? '1500011001|15000110010032' : identity;

        var arr = identity.split("|");
        fr.msg.enter_custom_room({
            roomId : parseInt(arr[0]),
            tableId : parseInt(arr[1]),
        });
    },
});
