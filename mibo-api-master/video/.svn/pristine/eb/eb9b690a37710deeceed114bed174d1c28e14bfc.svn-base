/**
 * Created by dallon2 on 2016/11/25.
 */

window.mbArgs = "";

function javaCallJs() {
    alert("javaCallJs");
}

function javaCallJsWithArgs(args) {
    alert(args);
    window.mbArgs = args;
}

function writeObj(obj) {
    var description = "";
    for (var i in obj) {
        var property = obj[i];
        description += i + " = " + property + "\n";
    }
    alert(description);
}

/* 获取当前用户信息*/
function getCurrentUserInfo() {
    return window.User.getCurrentUserInfo();
}

/* 跳到用户主页 */
function jumpToUser(userId) {
    window.User.jumpToUser(userId);
}

/* 跳到直播间 */
function jumpToLive(liveId) {
    window.Live.jumpToLive(liveId);
}

/* 调用系统Toast */
function toast(msg) {
    window.User.toast(msg);
}

/* 关闭webview */
function closeWebview() {
    window.User.closeWebview();
}


function onShare(shareInfo) {
    window.User.onShare(shareInfo);
}


function obj2string(o) {
    var r = [];
    if (typeof o == "string") {
        return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
    }
    if (typeof o == "object") {
        if (!o.sort) {
            for (var i in o) {
                r.push(i + ":" + obj2string(o[i]));
            }
            if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
                r.push("toString:" + o.toString.toString());
            }
            r = "{" + r.join() + "}";
        } else {
            for (var i = 0; i < o.length; i++) {
                r.push(obj2string(o[i]))
            }
            r = "[" + r.join() + "]";
        }
        return r;
    }

    if(!isNaN(o)) {
        return o;
    }

    return o.toString();
}