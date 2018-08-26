exports.name = 'goods';  //模块名称，必填
var sms = require('../service/sms');


exports.get = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    var sql = "select * from cmds where cmd='" + req.params.cmd + "'";
    global.db.getRow(sql, function (cmd, err) {
        var pdata = {};
        if (cmd != null) {
            var fi = cmd.sel;
            var sql = cmd.sql;
            var check = cmd.check;
            if (sql == null)
                sql = "select " + fi + " from " + cmd.tab + " " + cmd.whe;
            pdata.sql = sql;
            pdata.check = check;
            console.log('in:' + sql);
            replace(req.params, pdata);
            var r = {};
            r.state = 0;
            r.msg = "success";

            //权限验证
            var cookies;
            var strCookie = req.params.cookie;
            strCookie += ";" + req.header('cookie');
            cookies = getCookie(strCookie);
            console.log("=-----------" + JSON.stringify(cookies));
            if (cookies.ECS_ID != null)
                cookies.ECS_ID = cookies.ECS_ID.substring(0, 32);

            replace(cookies, pdata);
            pdata.cookies = cookies;
            pdata.res = res;
            pdata.req = req;
            pdata.cmd = cmd;
            pdata.r = r;

            if (cmd.usetype == 1) {//管理员
                if (cookies.ECSCP_ID != null) {
                    global.db.getRow("select * from ysh_sessions_data where sesskey='" + cookies.ECSCP_ID.substring(0, 32) + "'", function (ret, err) {
                        console.log(ret);
                        if (ret == null) {
                            sendErr(cmd.ecode, res);

                        } else {
                            getData(pdata);
                        }

                    });
                } else {
                    sendErr(cmd.ecode, res);

                }
            } else if (cmd.usetype == 2) {//登录用户
                if (cookies.ECS_ID != null) {
                    global.db.getRow("select * from ysh_sessions where sesskey='" + cookies.ECS_ID.substring(0, 32) + "'", function (ret, err) {
                        if (ret == null || ret.userid == null || ret.userid == 0) {
                            sendErr(cmd.ecode, res);
                        } else {
                            sql = sql.replace("{'user_id'}", ret.userid);
                            getData(pdata);
                        }

                    });
                } else {
                    sendErr(cmd.ecode, res);
                }
            } else if (cmd.usetype == 0) {
                getData(pdata);
            } else {
                sendErr(cmd.ecode, res);
            }
        } else {
            r.state = 999;
            r.msg = "cmd wrong";
            res.send(r);
        }
    });
    next();
}

function sendErr(ecode, res) {
    global.db.getRow("select * from errcode where state= " + ecode, function (rdata, err) {
        if (rdata != null)
            res.send(rdata);
        else {
            var r = {};
            r.state = -1;
            r.msg = err;
            res.send(r);
        }
    });
}


function getData(pdata) {//身份验证完成后的操作
    if (pdata.check != null && pdata.check != "") {
        pdata.r.check = pdata.check;
        global.db.getAll(pdata.check, function checkreturn(rdata, err) {
            console.log('check:' + pdata.check);
            if (rdata != null && rdata.length != 0) {//验证通过
                pdata.check = null;
                replace_indb(rdata[0], pdata);
                getData(pdata);
            } else {
                sendErr(pdata.cmd.ecode, pdata.res);
            }

        });
    } else {
        console.log('sql:' + pdata.sql);
        proSpacialCmd(pdata, function () {
            pdata.r.sql = pdata.sql;
            global.db.getAll(pdata.sql, function runreturn(rdata, err) {
                pdata.r.aaData = rdata;
                pdata.res.send(pdata.r);
            });
        });
    }
}

function proSpacialCmd(pdata, func) {
    if (pdata.cmd.cmd == 'getsms') {
        var smsCode = MathRand();
        var content = "感谢您使用源生汇农产品溯源电商平台，验证码：" + smsCode;
        sms.sendSms(pdata.req.params.m, content, function (res) {
            console.log(res.body);
            if (res.body = '100') {
                pdata.sql = pdata.sql.replace('xxxx', smsCode);
                pdata.sql = pdata.sql.replace('xxxx', smsCode);
                global.db.getAll(pdata.sql, function (rdt, err) {
                    console.log('rdt' + rdt);
                    if (rdt != null) {
                        pdata.r.aaData = rdt;
                        pdata.res.send(pdata.r);
                    } else {
                        sendErr(pdata.cmd.ecode, pdata.res);
                    }
                });
            } else {
                sendErr(pdata.cmd.ecode, pdata.res);
            }
        });
    } else {
        func();
    }
}

function MathRand() {
    var Num = "";
    for (var i = 0; i < 4; i++) {
        Num += Math.floor(Math.random() * 10);
    }
    return Num;
}

function replace(cookies, pdata) {
    Object.keys(cookies).forEach(function (key) {
        console.log(key + "  is " + cookies[key])
        var v = cookies[key];  //.replace("'","\'");
        // v=v.replace('"','\"');
        var k = "['" + key + "']";
        pdata.sql = pdata.sql.replace(k, v);
        pdata.sql = pdata.sql.replace(k, v);
        if (pdata.check != null) {
            pdata.check = pdata.check.replace(k, v);
            pdata.check = pdata.check.replace(k, v);
        }
    })

}

function replace_indb(cookies, pdata) {
    Object.keys(cookies).forEach(function (key) {
        console.log(key + "  is " + cookies[key])
        var v = cookies[key];  //.replace("'","\'");
        // v=v.replace('"','\"');
        var k = "<" + key + ">";
        pdata.sql = pdata.sql.replace(k, v);
        pdata.sql = pdata.sql.replace(k, v);
        if (pdata.check != null) {
            pdata.check = pdata.check.replace(k, v);
            pdata.check = pdata.check.replace(k, v);

        }
    })

}

function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

// 将document.cookie的值以名/值对组成的一个对象返回
// 假设储存cookie的值的时候是采用encodeURIComponent()函数编码的
function getCookie(s) {
    var cookies = {};  // 初始化最后要返回的对象
    if (s == null) return cookies;
    var all = s;  // 在一个大写字符串中获取所有的cookie值
    if (all === "") {  // 如果该cookie属性值为空字符串
        return cookies;  // 返回一个空对象
    }
    var list = all.split("; ")  // 分离出名/值对
    for (var i = 0; i < list.length; i++) {  // 遍历每个cookie
        var cookie = list[i];
        var p = cookie.indexOf("=");  // 查找第一个“=”符号
        var name = cookie.substring(0, p);  // 获取cookie属性名
        var value = cookie.substring(p + 1);  // 获取cookie对应的值
        value = decodeURIComponent(value);  // 对其值进行解码
        cookies[name] = value;  // 将名/值对存储到对象中
    }
    return cookies;
}
