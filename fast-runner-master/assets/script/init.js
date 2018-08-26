window.fr = {};

fr.display = require("display");
fr.game = require("game");
fr.picker = require("picker");
fr.codec = require("codec");

if (CC_WECHATGAME) {
    fr.socket = new (require("wxsocket"));
} else {
    fr.socket = new (require("wbsocket"));
}
if (CC_WECHATGAME) {
    fr.sdk = new (require("wxsdk"));
} else {
    fr.sdk = new (require("wbsdk"));
}

fr.session = new (require("session"));
fr.events = require("events");
fr.msg = new (require("msg"));
fr.http = require("http");
fr.config = require("config");
fr.userinfo = new (require("UserInfo"));
fr.cache = new (require("cache"));

fr.matchinfo = new (require('MatchInfo'));
fr.roomsinfo = new (require("RoomInfo"));
fr.window = new (require("window"));
fr.audio = new (require("audio"));

fr.session.init();

if (CC_WECHATGAME) {
    fr.sdk.init();
}