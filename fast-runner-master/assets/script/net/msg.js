var msg = cc.Class({
    extends : cc.Object,

    _send : function(json) {
        var params = json.params || {};
        params.userId   = params.userId     || fr.userinfo.mUserId;
        params.gameId   = params.gameId     || fr.config.gameId;
        params.clientId = params.clientId   || fr.config.clientId;
        json.params = params;

        fr.socket.send(json);
    },

    heartBeat : function() {
        var params = {
            'cmd': fr.events.Msg_Heart_Beat,
            'params': {
                'deviceId'  : fr.config.deviceId,
            }
        };
        this._send(params);
    },

    bindUser: function() {
        var params = {
            'cmd'   : fr.events.Msg_Bind_User,
            'params': {
                'authorCode' : fr.userinfo.mAuthorCode,
                'gameId'     : fr.config.hallId,
            }
        };
        this._send(params);
    },

    bindGame: function() {
        var params = {
            'cmd'   : fr.events.Msg_Bind_Game,
            'params': {
                'authorCode': fr.userinfo.mAuthcode,
            }
        };
        this._send(params);
    },

    create_custom_room : function(data) {
        var params = {
            "cmd"   : fr.events.Msg_Game,
            "params":{
                "action"    : fr.events.Action_Create_Custom_Table,
                "customConf": data || {},
            }
        };
        this._send(params);
    },

    enter_custom_room : function(data) {
        var data = data || {};

        var params = {
            "cmd"   : fr.events.Msg_Game,
            "params":{
                "action"    : fr.events.Action_Enter_Custom_Table,
                "roomId"    : data.roomId || fr.userinfo.mLastRoomId,
                'tableId'   : data.tableId || fr.userinfo.mLastTableId,
                "shadowRoomId"  : data.tableId || fr.userinfo.mLastTableId,
            }
        };
        this._send(params);
    },

    tableCall : function(data) {
        var data = data || {};

        var params = {
            'cmd': fr.events.Msg_Table_Call,
            'params': {
                'action'    : data.action,
                'roomId'    : fr.tableinfo.mRoomId,
                'tableId'   : fr.tableinfo.mTableId,
                'seatId'    : fr.userinfo.mSeatId,
                'ccrc'      : data.ccrc,
                'cards'     : data.cards,
                'vote'      : data.vote,
                'robot'     : data.robot,
            }
        };
        this._send(params);
    },

    table : function(data) {
        var data = data || {};

        var params = {
            'cmd': fr.events.Msg_Table,
            'params': {
                'action'    : data.action,
                'roomId'    : fr.tableinfo.mRoomId,
                'tableId'   : fr.tableinfo.mTableId,
                'seatId'    : fr.userinfo.mSeatId,
                'reason'    : 0,
            }
        };
        this._send(params);
    },

    room : function(data, userinfo) {
        var data = data || {};

        var params = {
            'cmd': fr.events.Msg_Room,
            'params': {
                'action'    : data.action,
                'roomId'    : fr.tableinfo.mRoomId,
                'tableId'   : fr.tableinfo.mTableId,
                'seatId'    : fr.userinfo.mSeatId,
                'reason'    : 0,
            }
        };
        this._send(params);
    },

    fetchHallInfo : function() {
        var params = {
            'cmd': fr.events.Msg_Hall_Info,
            'params': {
            }
        };
        this._send(params);
    },

    signinMatch : function() {
        var params = {
            'cmd': fr.events.Msg_Match_Sign_In,
            'params': {
                'roomId'    : fr.roominfo.mRoomId,
                'feeIndex'    : 0,
                'signinParams' : {'mixId' : fr.roominfo.mMixId}
            }
        };
        this._send(params);
    },

    signoutMatch : function() {
        var params = {
            'cmd': fr.events.Msg_Match_Sign_Out,
            'params': {
                'roomId'    : fr.roominfo.mRoomId,
            }
        };
        this._send(params);
    },

    enterMatch : function() {
        var params = {
            'cmd': fr.events.Msg_Match_Enter,
            'params': {
                'roomId'    : fr.roominfo.mRoomId,
            }
        };
        this._send(params);
    },

    leaveMatch : function() {
        var params = {
            'cmd': fr.events.Msg_Match_Leave,
            'params': {
                'roomId'    : fr.roominfo.mRoomId,
            }
        };
        this._send(params);
    },

    fetchMatchUpdate : function() {
        var params = {
            'cmd': fr.events.Msg_Match_Update,
            'params': {
                'roomId'    : fr.roominfo.mRoomId,
                'signinParams' : {'mixId' : fr.roominfo.mMixId},
            }
        };
        this._send(params);
    },

    fetchMatchDes : function() {
        var params = {
            'cmd': fr.events.Msg_Match_Des,
            'params': {
                'roomId'    : fr.roominfo.mRoomId,
                'signinParams' : {'mixId' : fr.roominfo.mMixId},
            }
        };
        this._send(params);
    },

    quick_start : function() {
        var params = {
            'cmd': fr.events.Msg_Game,
            'params': {
                'action' : fr.events.Action_Game_Quick_Start,
            }
        };
        this._send(params);
    },

    exchange_cash : function(data) {
        var data = data || {};

        var params = {
            'cmd': fr.events.Msg_Cash,
            "params": {
                "action"    : "get_cash",
                "value"     : data.cash,
                "wxappId"   : fr.config.wxAppId
            }
        };
        this._send(params);
    },

    fetchUserInfo : function() {
        var params = {
            'cmd': fr.events.Msg_User_Info,
            'params' : {
            }
        };
        this._sendCmd(params);
    },
});

module.exports = msg;