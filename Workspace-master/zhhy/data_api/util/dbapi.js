exports.name = 'goods'; //模块名称，必填
var sms = require('../service/sms');
exports.proapi = function (pdata, func) {
    var json = {
        LogLevelId: 1,
        UserId: pdata.params.user_id,
        ip: pdata.params.ip,
        ShortMessage: pdata.cmdin,
        tag: pdata.params.sesskey
    }
    getcmd(pdata.cmdin, function (cmd, err) {
        if (err.status) {
            func(err)
            return;
        }
        if (!cmd) {
            var returnData = global.ERROR.cmdWrong
            returnData.errCmd = pdata.cmdin
            func(returnData);
        } else {
            pdata.cmd = cmd;
            var fi = cmd.sel;
            var sql = cmd.ssql;
            var check = cmd.chk;
            if (sql == null) sql = "select " + fi + " from " + cmd.tab + " " + cmd.whe;
            pdata.sql = sql;
            pdata.check = check;
            pdata.sqls = pdata.sql.split(';');
            replace_indb(pdata.params, pdata, function (pdata) {
                getData(pdata, function () {
                    var backObj = new Object()
                    if (pdata.r.state == 0) {
                        backObj = global.ERROR.success
                        backObj.aaData = pdata.r.aaData
                    } else {
                        backObj = pdata.r
                    }
                    func(backObj)
                })
            });
        }
    });
}

function getcmd(cmdin, cb) {
    if (global.cmds[cmdin]) {
        cb(global.cmds[cmdin], null);
    } else {
        var sql = "select * from DB_CMDS where api='" + cmdin + "'";
        global.db.getRow(sql, cb);
    }
}

function getData(pdata, func) { //身份验证完成后的操作
    var db;
    if (pdata.cmd.dbname != null) {
        db = global.dbs[pdata.cmd.dbname];
        if (db == null) {
            global.dbs[pdata.cmd.dbname] = new global.yshdb.db(pdata.cmd.dbname);
        }
        db = global.dbs[pdata.cmd.dbname];
    } else {
        db = global.db;
    }

    if (pdata.check != null && pdata.check != "") {
        pdata.r.check = pdata.check;
        db.getAll(pdata.check, function (rdata, err) {
            if (err) {
                pdata.r = global.ERROR.cmdCheckError
                pdata.r.errCmd = pdata.cdmin
                func();
            } else if (rdata != null && rdata.length > 0) {
                //验证通过
                pdata.check = "";
                replace_indb(rdata[0], pdata);
                getData(pdata, func);
            } else {
            }
        });
    } else {
        var li = "";
        if (pdata.params.page != null && pdata.params.pnum != null) {
            li = " limit " + pdata.params.page * pdata.params.pnum + "," + pdata.params.pnum;
            pdata.r.pnum = pdata.params.pnum;
            pdata.r.page = pdata.params.page;
        } else if (pdata.params.page != null) {
            li = " limit " + pdata.params.page * 20 + ",20";
            pdata.r.pnum = 20;
        }
        if (pdata.cmdin.substr(0, 3) == 'sys') li = "";
        //分解SQL
        pdata.cnt = 0;
        pdata.sql += li;
        getUseSqls(pdata, func);
        if (pdata.sqls.length > 1)
            pdata.r.many = new Array();
    }
}

function getUseSqls(pdata, func) {

    var sql = pdata.sqls[pdata.cnt];
    if (sql == null || sql.length < 5) {
        func();
        return;
    }

    sql = sql.trim();
    var x1 = sql.indexOf("{", 0);
    var x2 = sql.indexOf("}", x1);
    if (x1 != -1 && x1 < 5 && x2 > x1) {
        var jsonstr = sql.substr(x1, x2 - x1 + 1);
        var apis = JSON.parse(jsonstr);
        var klen = 0;
        var pds = {};
        pds.apis = new Array();
        pds.len = 0;
        for (k in apis) {
            var pd = {};
            pd.cmdin = apis[k];
            pd.params = pdata.params;
            pd.r = {};
            pd.k = k;
            pds.apis[pds.len] = pd;
            pds.len++;
        }
        useapis(pds, func, pdata);
        return;
    } else {
        db.getAll(sql, function (rdata, err) {
            if (err.status) {
                pdata.r = err
                pdata.r.sql = sql
                func();
            } else {
                replace_indb(rdata[0], pdata);
                pdata.r.aaData = rdata;
                if (pdata.r.many) {
                    pdata.r.many[pdata.cnt] = rdata;
                }
                pdata.cnt++;
                getUseSqls(pdata, func);
            }
        });
    }
}

function useapis(pds, func, pdata) {
    var pd = pds.apis[pds.len - 1];
    exports.proapi(pd, function () {
        pdata.r[pd.k] = {};
        pdata.r[pd.k].aaData = pd.r.aaData;

        if (--pds.len == 0) {
            pdata.r.aaData = [];
            func();
            return;
        } else {
            useapis(pds, func, pdata);
        }
    });
}

function proSpacialCmd(pdata, func) {
    if (pdata.cmd.api == 'getsms') {
        var smsCode = MathRand();
        var content = "感谢您使用源生汇农产品溯源电商平台，验证码：" + smsCode;
        sms.sendSms(pdata.req.params.m, content, function (res) {
            if (res.body = '100') {
                pdata.sql = pdata.sql.replace('xxxx', smsCode);
                pdata.sql = pdata.sql.replace('xxxx', smsCode);
                global.db.getAll(pdata.sql, function (rdt, err) {

                    if (rdt != null) {
                        pdata.r.aaData = rdt;
                        // pdata.res.send(pdata.r);
                    } else {
                    }
                });
            } else {
            }
        });
    } else {
        // func();
    }
}

function MathRand() {
    var Num = "";
    for (var i = 0; i < 4; i++) {
        Num += Math.floor(Math.random() * 10);
    }
    return Num;
}

exports.replace = function (obj, str) {
    var sql;
    if (obj == null) return str;
    sql = str;
    Object.keys(obj).forEach(function (key) {
        var v = obj[key];
        if (key != "") {
            // var	k_in=new RegExp("<"+key+">","gm");
            // var k_db=new RegExp("\\["+key+"]","gm");
            a = key.trim();
            var k_db = "<" + a + ">";
            var k_in = "[" + a + "]";
            sql = replace_string(sql, k_in, v);
            sql = replace_string(sql, k_db, v);
        }
    })
    return sql;
}

function replace_indb(obj, pdata, callback) {
    if (obj == null) return;
    Object.keys(obj).forEach(function (key) {
        var v = obj[key];
        if (key != "") {
            a = key.trim();
            var k_db = "<" + a + ">";
            var k_in = "[" + a + "]";

            for (i in pdata.sqls) {
                pdata.sqls[i] = replace_string(pdata.sqls[i], k_in, v);
                pdata.sqls[i] = replace_string(pdata.sqls[i], k_db, v);
            }
            pdata.sql = replace_string(pdata.sql, k_in, v);
            pdata.check = replace_string(pdata.check, k_in, v);
            pdata.cmd.json = replace_string(pdata.cmd.json, k_in, v);
            pdata.sql = replace_string(pdata.sql, k_db, v);
            pdata.check = replace_string(pdata.check, k_db, v);
            pdata.cmd.json = replace_string(pdata.cmd.json, k_db, v);
        }
    })
    callback && callback(pdata)
}

function replace_string(s0, key, val) {
    if (s0 == null || key == null)
        return s0;

    if ('string' == typeof val) {
        val = val.trim();
        if (val != null) val = val.replace(/'/g, "\\'");
    }
    while (s0.indexOf(key, 0) > 0) {
        s0 = s0.replace(key, val);
    }
    return s0;
}

function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

// 将document.cookie的值以名/值对组成的一个对象返回
// 假设储存cookie的值的时候是采用encodeURIComponent()函数编码的
function getCookie(s) {
    var cookies = {}; // 初始化最后要返回的对象
    if (s == null) return cookies;
    var all = s; // 在一个大写字符串中获取所有的cookie值
    if (all === "") { // 如果该cookie属性值为空字符串
        return cookies; // 返回一个空对象
    }
    var list = all.split("; ") // 分离出名/值对
    for (var i = 0; i < list.length; i++) { // 遍历每个cookie
        var cookie = list[i];
        var p = cookie.indexOf("="); // 查找第一个“=”符号
        var name = cookie.substring(0, p); // 获取cookie属性名
        var value = cookie.substring(p + 1); // 获取cookie对应的值
        value = decodeURIComponent(value); // 对其值进行解码
        cookies[name] = value; // 将名/值对存储到对象中
    }
    return cookies;
}