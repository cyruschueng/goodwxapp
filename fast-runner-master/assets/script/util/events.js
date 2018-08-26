/*
    命名约定
    1.网络消息以Msg开头
    2.首字母必须大写
    3.词组用下划线隔离
    Example:
        普通事件:
            Socket_OnOpen : 'socket.onopen',
        网络消息:
            Msg_Bind_User : 'bind_user',
*/
var events = {
    // 普通事件，使用「一级内容.二级内容」名称
    Socket_OnOpen : 'socket.onopen',
    Socket_OnError : 'socket.onerror',
    Socket_OnClose : 'socket.onclose',
    Table_Show_Player_Poker : 'table.show.player.poker',
    Table_Hide_Player_Poker : 'table.hide.player.poker',
    Table_State_Ready_Done : 'table.statemachine.enter.ready.state',
    Table_Select_Poker_Touch_Outside : 'table.select.poker.touch.outside',
    Table_Query_Other_Player_Pokers : '查询他人手牌',
    Table_Btn_Press_Pass : 'table.btn.press.pass',
    Table_Btn_Press_Promote : 'table.btn.press.promote',
    Table_Btn_Press_Action : 'table.btn.press.action',
    Table_Select_Cards : '告知出牌',
    Table_Select_Cards_Preview : '出牌禁用',
    Table_Select_Cards_Preview_Query : '出牌禁用查询',
    Table_Select_Cards_Tips : '提示禁用',
    Table_Game_Restart : '好友桌-下一局开始',
    Table_Filter_Poker : '筛选手牌',
    Table_Quit_Confirm : 'table.quit.confirm',
    Login_Success : 'login.success',
    Login_Authorize_Failed : 'login.authorize.failed',

    Game_Enter_Fore : 'game.enter.fore',
    Game_Enter_Back : 'game.enter.back',

    // 网络消息，遵从服务器约定
    Msg_Bind_User : 'bind_user',
    Msg_User_Info : 'user_info',
    Msg_Bind_Game : 'bind_game',
    Msg_Game_Data : 'game_data',
    Msg_Heart_Beat : 'heart_beat',
    Msg_Game : 'game',
    Msg_Cash : 'cash',
    Msg_Table : 'table',
    Msg_Room : 'room',
    Msg_Room_Leave : 'room_leave',
    Msg_Table_Call : 'table_call',
    Msg_Quick_Start : 'quick_start',
    Msg_Hall_Info: 'hall_info',

    Msg_Match_Sign_In       : 'm_signin',
    Msg_Match_Is_Signed     : 'm_signs',
    Msg_Match_Sign_Out      : 'm_signout',
    Msg_Match_Enter         : 'm_enter',
    Msg_Match_Leave         : 'm_leave',
    Msg_Match_Update        : 'm_update',
    Msg_Match_Des           : 'm_des',
    Msg_Match_Wait          : 'm_wait',
    Msg_Match_Over          : 'm_over',
    Msg_Match_Start         : 'm_start',
    Msg_Match_Rank          : 'm_rank',

    // 网络消息，action
    Action_Create_Custom_Table : 'create_custom_table',
    Action_Enter_Custom_Table : 'enter_custom_table',
    Action_Table_Info : 'info',
    Action_Table_Online : 'online',
    Action_Table_Leave : 'leave',
    Action_Table_Call_Ready : 'ready',
    Action_Table_Call_Game_Ready : 'game_ready',
    Action_Table_Call_Card : 'card',
    Action_Table_Call_Robot : 'robot',
    Action_Table_Call_Robot_Response : 'rb',
    Action_Table_Call_Next : 'next',
    Action_Table_Call_Win : 'game_win',
    Action_Table_Call_Quit : 'voteDismiss',
    Action_Table_Call_Bomb : 'bomb',
    // Action_Table_Call_Conclusion : 'get_custom_table_result',
    Action_Game_Quick_Start : 'quick_start',
};

module.exports = events;
