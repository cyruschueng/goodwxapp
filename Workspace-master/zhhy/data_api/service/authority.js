var fs = require('fs');
var errObj = JSON.parse(fs.readFileSync('./config/err.json'))
var md5 = require('../util/md5.js');
exports.name = 'authority';
var https = require('https');
//获取Sesskey
exports.getSesskey = function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    var ip = global.util.getIp(req)
    sql = "SELECT sesskey FROM DB_SESSION WHERE ip = '" + ip + "'"
    var backResult = new Object()
    global.db.getAll(sql, function (result, err) {
        if (err.status) {
            res.send(err)
        } else {
            if (result.length > 0) {
                backResult = errObj.success
                backResult.aaData = result
                res.send(backResult)
            } else {
                formationSesskey(ip, false, function (obj) {
                    sql = "INSERT INTO DB_SESSION (sesskey,ip,data,createdt,user_id,openid,RoleId,PartId) VALUES ('" + obj.sesskey + "','" + obj.ip + "'," + obj.data + ",'" + obj.createdt + "'," + obj.user_id + "," + obj.openid + "," + obj.RoleId + "," + obj.PartId + ")"
                    global.db.getRow(sql, function (result, errs) {
                        if (!errs.status) {
                            backResult = errObj.success
                            backResult.aaData = result
                            res.send(backResult)
                        } else {
                            res.send(errs)
                        }
                    })
                })
            }
        }
    })
}


//Sesskey生成
function formationSesskey(ip, loginStatus, callback) {
    var obj = new Object()
    var seperator1 = "-";
    var seperator2 = ":";
    var date = new Date()
    obj.data = date.getTime()
    obj.ip = ip
    var sesskey = md5.md5(ip + obj.data)
    obj.sesskey = sesskey
    obj.createdt = date.getFullYear() + seperator1 + (date.getMonth() + 1) + seperator1 + (date.getDate())
    + " " + date.getHours() + seperator2 + date.getMinutes()
    + seperator2 + date.getSeconds();
    if (!loginStatus) {
        obj.user_id = 0
        obj.openid = 0
        obj.PartId = 0
        obj.RoleId = 0
        callback(obj)
    } else {
        //查询登录
    }
}