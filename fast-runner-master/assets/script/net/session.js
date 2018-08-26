/*
    * 登录逻辑
        * [bind_user]->[user_info]
        * [bind_game]->[game_data]
    * 进入房间逻辑
        * [game] & [create_custom_table] -> [table] & [info]
*/
var session = cc.Class({
    extends : cc.Component,

    log : function(desc) {
        cc.log("==[session]==", desc);
    },

    init : function() {
        fr.display.on(-1, fr.events.Socket_OnOpen, this.onSocketOpened.bind(this));
        fr.display.on(-1, fr.events.Msg_User_Info, this.onReceiveUserInfoMsg.bind(this));
        fr.display.on(-1, fr.events.Msg_Game_Data, this.onReceiveGameDataMsg.bind(this));
        fr.display.on(-1, fr.events.Msg_Table, this.onReceiveTableMsg.bind(this));
        fr.display.on(-1, fr.events.Msg_Room_Leave, this.onReceiveRoomLeaveMsg.bind(this));
        fr.display.on(-1, fr.events.Msg_Table_Call, this.onReceiveTableCallMsg.bind(this));
        fr.display.on(-1, fr.events.Msg_Hall_Info, this.onReceiveHallInfoMsg.bind(this));
        fr.display.on(-1, fr.events.Msg_Match_Des, this.onReceiveMatchDesMsg.bind(this));
        fr.display.on(-1, fr.events.Msg_Match_Update, this.onReceiveMatchUpdateMsg.bind(this));
        fr.display.on(-1, fr.events.Msg_Quick_Start, this.onReceiveQuickStartMsg.bind(this));
        fr.display.on(-1, fr.events.Msg_Match_Is_Signed, this.onReceiveMatchSignedMsg.bind(this));
        fr.display.on(-1, fr.events.Msg_Match_Wait, this.onReceiveMatchWaitMsg.bind(this));
        fr.display.on(-1, fr.events.Msg_Match_Over, this.onReceiveMatchOverMsg.bind(this));
        fr.display.on(-1, fr.events.Msg_Match_Rank, this.onReceiveMatchRankMsg.bind(this));
        fr.display.on(-1, fr.events.Msg_Cash, this.onReceiveCashMsg.bind(this));

        this.mClientTimestamp = Date.parse(new Date()) / 1000;
        fr.display.schedule(this, this.update, 0);
    },

    update : function(dt) {
        this.mClientTimestamp += dt;
    },

    getClientTimestamp : function() {
        return this.mClientTimestamp;
    },

    onSocketOpened : function() {
        fr.msg.bindUser();
    },

    onReceiveUserInfoMsg : function(result) {
        fr.userinfo.parseUserInfoMsg(result);

        if (!fr.userinfo.mLogined) {
            fr.msg.bindGame();
        }
    },

    onReceiveGameDataMsg : function(result) {
        if (!fr.userinfo.mLogined) {
            fr.msg.fetchHallInfo();
        }
    },

    onReceiveTableMsg : function(result) {
        switch(result.action) {
            case fr.events.Action_Table_Info :
            {
                fr.tableinfo.parseInfoData(result);
                break;
            }
            case fr.events.Action_Table_Online :
            {
                fr.tableinfo.parseOnlineMsg(result);
                break;
            }
        }
    },

    onReceiveTableCallMsg : function(result) {
        switch(result.action) {
            case fr.events.Action_Table_Call_Ready :
            {
                fr.tableinfo.parseReadyMsg(result);
                break;
            }
            case fr.events.Action_Table_Call_Game_Ready :
            {
                fr.tableinfo.parseGameReady(result);
                break;
            }
            case fr.events.Action_Table_Call_Robot_Response :
            {
                fr.tableinfo.parseRobotMsg(result);
                break;
            }
            case fr.events.Action_Table_Call_Card :
            {
                fr.tableinfo.parseCardMsg(result);
                break;
            }
            case fr.events.Action_Table_Call_Next :
            {
                fr.tableinfo.parseNextMsg(result);
                break;
            }
            case fr.events.Action_Table_Call_Win:
            {
                fr.tableinfo.parseWinMsg(result);
                break;
            }
            case fr.events.Action_Table_Call_Quit :
            {
                if (result.res == 1) {
                    fr.tableinfo.destory();
                }
                break;
            }
            case fr.events.Action_Table_Call_Bomb :
            {
                fr.tableinfo.parseBombMsg(result);
                break;
            }
        }
    },

    onReceiveRoomLeaveMsg : function(result) {
        if (result.userId == fr.userinfo.mUserId) {
            if (!fr.tableinfo.isMatch()) {
                fr.tableinfo.destory();
            }
        }
    },

    onReceiveHallInfoMsg : function(result) {
        fr.roomsinfo.parseHallInfoMsg(result.sessions);
        fr.roominfo = fr.roomsinfo.topMatch();

        if (!fr.userinfo.mLogined) {
            fr.msg.fetchMatchDes();
        }
    },

    onReceiveMatchDesMsg : function(result) {
        fr.matchinfo.parseDesMsg(result);

        if (!fr.userinfo.mLogined) {
            fr.userinfo.mLogined = true;
            fr.display.emit(fr.events.Login_Success);
        }
    },

    onReceiveMatchUpdateMsg : function(result) {
        fr.matchinfo.parseUpdateMsg(result);
    },

    onReceiveQuickStartMsg : function(result) {
        if (!fr.tableinfo || fr.tableinfo.isDestoryed()) {
            fr.tableinfo = new (require("TableInfo"));
        }

        fr.tableinfo.parseQuickStartMsg(result);
    },

    onReceiveMatchSignedMsg : function(result) {
        if (!fr.tableinfo || fr.tableinfo.isDestoryed()) {
            fr.tableinfo = new (require("TableInfo"));
        }

        if (!fr.matchinfo || fr.matchinfo.isOver()) {
            fr.matchinfo = new (require("MatchInfo"));
        }

        fr.msg.fetchMatchDes();
    },

    onReceiveMatchWaitMsg : function(result) {
        fr.matchinfo.parseWaitMsg(result);
    },

    onReceiveMatchOverMsg : function(result) {
        fr.matchinfo.parseOverMsg(result);
    },

    onReceiveMatchRankMsg : function(result) {
        fr.matchinfo.parseRankMsg(result);
    },

    onReceiveCashMsg : function(result) {
        if(!result.code || result.code != -1){
            fr.msg.fetchUserInfo();
        }
    },
});

module.exports = session;