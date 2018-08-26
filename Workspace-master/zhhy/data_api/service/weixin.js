exports.name = 'WeiXin';
var fs = require('fs');
var errObj = JSON.parse(fs.readFileSync('./config/err.json'))
var https = require('https');
var request = require('request');
var path = require("path");
var config = [];
var crypto = require("crypto");

try {
    var weixin = JSON.parse(fs.readFileSync('./config/config.json'))
    config.AppId = weixin.wx_config.AppId
    config.AppSecret = weixin.wx_config.AppSecret
    config.token = weixin.wx_config.token
    config.tipsmax = weixin.wx_config.tipsmax;
    config.tipnum = weixin.wx_config.tipnum;
    config.access_token = weixin.wx_config.access_token;
    config.timestamp = weixin.wx_config.timestamp;
} catch (e) {
    console.log(errObj.wx_configErr)
}

exports.GetOpenID = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    var params = '/sns/oauth2/access_token?appid=' + config.AppId + '&secret=' + config.AppSecret + '&code=' + req.params.code + '&grant_type=authorization_code';
    https.get('https://api.weixin.qq.com' + params, function (ret) {
        var returnjson;
        var r = {};
        r.state = 567;
        r.msg = 'success';
        ret.on('data', function (chunk) {
            returnjson += chunk;
        });
        ret.on('end', function () {
            if (true) {
                var obj = JSON.parse(returnjson.substring(9));
                var model = {};
                model.openid = obj.openid;
                r.aaData = model;
                res.send(r);
            } else {
                r.satae = -1;
                r.msg = 'err:invalid code';
                res.send(r);
            }
            ;
        });
    });
}

//获取getAccess_token，创建自定义菜单 请求地址http://api2.yshfresh.com/api/getAccess_token
exports.getAccess_token = function (req, res, callback) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + config.AppId + "&secret=" + config.AppSecret
    var return_json = new Object();
    var r = new Object();
    var now = Date.parse(new Date())
    if ((now - 7200) < config.timestamp) {
        r.access_token = config.access_token
        callback && callback(r.access_token)
    } else {
        https.get(url, function (ret) {
            ret.on('data', function (chunk) {
                return_json += chunk;
            });
            ret.on('end', function () {
                if (return_json && return_json.errcode == 40013) {
                    r.state = -1
                    r.msg = 'error'
                    res.send(r)
                } else {
                    var obj = JSON.parse(return_json.substring(15));
                    config.access_token = obj.access_token
                    timestamp = Date.parse(new Date())
                    callback && callback(config.access_token)
                    var access_token_now = config.access_token;
                    var potions = {
                        "button": [{
                            "type": "view",
                            "name": "溯源扫码",
                            "url": "http://testv1.yshfresh.com/yshsc/index_sc.html#smsq"
                        }, {
                            "type": "view",
                            "name": "微商城",
                            "url": "http://testv1.yshfresh.com/yshsc/index_sc.html#shop_index"
                        }, {
                            "name": "中秋活动",
                            "sub_button": [{
                                "type": "view",
                                "name": "平台个人信息",
                                "url": "http://testv1.yshfresh.com/yshsc/index_sc.html#Shop_PersonalCenter",
                            }, {
                                "type": "view",
                                "name": "九洲专属头像",
                                "url": "http://g.eqxiu.com/s/ASP4Ahsw",
                            }, {
                                "type": "view",
                                "name": "中秋有奖游戏",
                                "url": "https://hd.faisco.cn/11003054/2/load.html?style=10"
                            }]
                        }]
                    };
                    // var options = {
                    //     url: "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=" + access_token_now,
                    //     method: 'POST',
                    //     body: JSON.stringify(potions)
                    // };
                    // request(options, function (err, res, data2) {
                    //     res.end();
                    // }); //请求创建菜单
                }
            });
        });
    }
}

//微信红包
exports.messageWeiXin = function (req, res, callback) {
    var queryObj = req.query;
    if(queryObj.signature ) {
        var token = config.token;
        var validate = exports.checkSignature(queryObj.signature,
            queryObj.timestamp,
            queryObj.nonce,
            token);
        //验证签名
        if (validate) {
            res.end(queryObj.echostr);
        } else {
            res.end('failed:' + queryObj.signature + ',' + homeService.getSignature(queryObj.timestamp, queryObj.nonce, token));
        }
                var xml = req.body; //获取推送的xml信息
                var jsonmsg;
                var parseString = require('xml2js').parseString;
                parseString(xml, function (err, result) {
            jsonmsg = result //xml转换成json
        });
                var FromUserNameopenId = jsonmsg.xml.FromUserName;
                var Content = jsonmsg.xml.Content;
                var CreateTime = jsonmsg.xml.CreateTime;
            } 
            console.log(jsonmsg)
            if (jsonmsg.xml.MsgType=='event' && jsonmsg.xml.Event=='subscribe')
            {
                exports.creatUser(FromUserNameopenId);//插入用户
            }
            
        // checkTheKeyWords(Content[0], FromUserNameopenId, function (ret, err, msg, amount_totals, keywords) {
        //     if (amount_totals) {
        //         var sign = ret[1][0].signs
        //         var mch_billno = ret[0][0].mch_billno
        //         var sql = "SELECT `key`,`value` FROM Sys_OtherApi WHERE type = 9"
        //         global.db.getAll(sql, function (data, err, msg) {
        //             var object1 = {
        //                 act_name: data[0].value,
        //                 client_ip: data[8].value,
        //                 mch_billno: mch_billno,
        //                 mch_id: data[1].value,
        //                 nonce_str: data[2].value,
        //                 re_openid: FromUserNameopenId,
        //                 remark: data[3].value,
        //                 send_name: data[4].value,
        //                 total_amount: amount_totals,
        //                 total_num: data[6].value,
        //                 wishing: data[7].value,
        //                 wxappid: config.AppId,
        //                 sign: sign
        //             };
        //             var xml = '<xml>' + "\n";
        //             for (var m in object1) {
        //                 xml += '<' + m + '><![CDATA[' + object1[m] + ']]></' + m + '>' + "\n";
        //             }
        //             xml += '</xml>';
        //             readPem('../logs/apiclient_cert.pem', '../logs/apiclient_key.pem', function (flag, data, data2) {

        //                 if (flag) {
        //                     //红包接口参数
        //                     var options = {
        //                         headers: {
        //                             "Connection": "close"
        //                         },
        //                         url: 'https://api.mch.weixin.qq.com/mmpaymkttransfers/sendredpack',
        //                         method: 'POST',
        //                         json: false,
        //                         body: xml,
        //                         key: data2, //将微信生成的证书放入 logs目录下
        //                         cert: data
        //                     };
        //                     request(options, function (err, ress, data) {
        //                         if (err) {
        //                             cb(err);
        //                         } else {
        //                             data = data.toString();
        //                             data.replace(/<!\[CDATA\[/g, '').replace(/]]>/g, '')
        //                             parseString(data, function (err, result) {
        //                                 console.log("红包发放信息:" + JSON.stringify(result.xml))
        //                                 if (err) {
        //                                     cb(err)
        //                                 } else {
        //                                     if (result.xml.result_code == 'SUCCESS') {
        //                                         var amount_totals1 = object1.total_amount / 100;
        //                                         var sql = "update `Sys_TipsRecord` set `TipsAmount`= '" +
        //                                             amount_totals1 + "',`MchId`= '" + object1.mch_id +
        //                                             "',`Staus` = 1 WHERE Id =(select ttt.Id from (SELECT Id FROM `Sys_TipsRecord`  WHERE DATE_FORMAT(`DateTime`,'%Y-%m-%d') =DATE_FORMAT(NOW(),'%Y-%m-%d') AND `WXopenId` ='" +
        //                                             object1.re_openid + "'AND `KeyWords` = '" + keywords + "' ORDER BY `DateTime` DESC LIMIT 0,1) as ttt)";
        //                                         global.db.getAll(sql, function (data, err) {

        //                                         })
        //                                         msg = "亲，中秋快乐！恭喜您获得红包！"
        //                                     } else {
        //                                         msg = "亲，中秋快乐！红包惊喜与您擦身而过!"

        //                                     }
        //                                     var returnmsg = {
        //                                         ToUserName: jsonmsg.xml.FromUserName,
        //                                         FromUserName: jsonmsg.xml.ToUserName,
        //                                         CreateTime: jsonmsg.xml.CreateTime,
        //                                         MsgType: "text",
        //                                         Content: msg
        //                                     }; //回复消息
        //                                     var rexml = '<xml>' + "\n";
        //                                     for (var m in returnmsg) {
        //                                         rexml += '<' + m + '><![CDATA[' + returnmsg[m] + ']]></' + m + '>' + "\n";
        //                                     }
        //                                     rexml += '</xml>'; //回复xml
        //                                     console.log("公众号回复消息:" + returnmsg.Content);
        //                                 }
        //                                 res.write(rexml + "\n");
        //                                 res.end();
        //                             })
        //                         }
        //                     });
        //                 }

        //             })
        //         })
        //     } else {
        //         var returnmsg = {
        //             ToUserName: jsonmsg.xml.FromUserName,
        //             FromUserName: jsonmsg.xml.ToUserName,
        //             CreateTime: jsonmsg.xml.CreateTime,
        //             MsgType: "text",
        //             Content: msg
        //         };
        //         //回复消息
        //         var rexml = '<xml>' + "\n";
        //         for (var m in returnmsg) {
        //             rexml += '<' + m + '><![CDATA[' + returnmsg[m] + ']]></' + m + '>' + "\n";
        //         }
        //         rexml += '</xml>'; //回复xml
        //         console.log("公众号回复消息:" + returnmsg.Content);
        //         res.write(rexml + "\n");
        //         res.end();
        //     }

        // })
    }

    var checkTheKeyWords = function (keywords, openid, callback) {
        var msg = ''
    if (keywords == "源生汇,中秋快乐") { //关键词判断
        var amount_totals = Math.ceil(Math.random() * 200 + 100); //随机红包金额
        var sql4 = "SELECT COUNT(*) as totals  FROM `Sys_TipsRecord`  WHERE  `WXopenId`='" +
        openid + "' AND `KeyWords` = '" + keywords + "'";
        global.db.getRow(sql4, function (data4, err1) {
            if (data4.totals == config.tipnum) { //当日尝试领取过红包
                var sql = "INSERT INTO `Sys_TipsRecord` (`TipsAmount`,`WXopenId`,`DateTime`,`KeyWords`, `Staus`) VALUES ('" +
                "0" +
                "','" +
                openid +
                "', now()" +
                ",'" + keywords +
                "'," + "0" + ")"
                //				console.log(sql)
                global.db.getRow(sql, function (data, erro) {

                }); //写入关键词发送记录表
                var maths = Math.ceil(Math.random() * 100)
                console.log("几率数:" + maths)
                if (maths > 25) //随机几率50%
                {
                    var sql1 = "SELECT ifnull(SUM(`TipsAmount`),0) AS totalAmount FROM `Sys_TipsRecord`  WHERE DATE_FORMAT(`DateTime`,'%Y-%m-%d') =DATE_FORMAT(NOW(),'%Y-%m-%d')"
                    global.db.getRow(sql1, function (data3, err) {
                        console.log("当日发放红包金额:" + data3.totalAmount)
                        var priceTemp = parseFloat(data3.totalAmount).toFixed(2); //当日红包发放总金额
                        if (priceTemp < config.tipsmax) { //当日红包发放总金额 小于限定值
                            var sql = "CALL P_API_SelectSignHongbao('" + openid + "'," + amount_totals + ")"
                            global.db.getAll(sql, function (data1, err1, msg) {
                                msg = "亲，中秋快乐！,恭喜您获得红包！"
                                callback && callback(data1, err1, msg, amount_totals, keywords)
                            });
                        } else {
                            msg = "亲，中秋快乐，今日红包已被抢光！"
                            callback && callback('', '', msg, null, keywords)
                        }
                        ;
                    });
                } else {
                    msg = '亲，中秋快乐，非常遗憾，这次运气不好，没领到红包！'
                    callback && callback('', '', msg, null, keywords)
                }
            } else {
                msg = "亲，中秋快乐，您今日领取红包次数已用光！"
                callback && callback('', '', msg, null, keywords)
            }
        })
    } else {
        msg = '亲，中秋快乐，感谢关注源生汇溯源电商平台！'
        callback && callback('', '', msg, null, keywords)
    }
}; //方法结束

var readPem = function (url, url1, callback) {
    fs.readFile(path.join(__dirname, url), function (err, data) {
        if (err) {
            callback && callback(false)
        } else {
            fs.readFile(path.join(__dirname, url1), function (err2, data2) {
                callback && callback(true, data, data2)
            })
        }
    })
}

var crypto = require('crypto');

/**
 * 验证签名是否有效
 * @param  {[type]} signature [description]
 * @param  {[type]} timestamp [description]
 * @param  {[type]} nonce     [description]
 * @param  {[type]} echostr   [description]
 * @return {[type]}           [description]
 */
 checkSignature = function (signature, timestamp, nonce, token) {
    //签名
    var shasum = crypto.createHash('sha1');
    var arr = [timestamp, nonce, token].sort();
    shasum.update(arr.join(''));
    tmpSignature = shasum.digest('hex');
    return tmpSignature == signature;
}

/**
 * 获取签名
 * @param  {[type]} timestamp [description]
 * @param  {[type]} nonce     [description]
 * @param  {[type]} token     [description]
 * @return {[type]}           [description]
 */
 getSignature = function (timestamp, nonce, token) {
    var shasum = crypto.createHash('sha1');
    var arr = [timestamp, nonce, token].sort();
    shasum.update(arr.join(''));

    return shasum.digest('hex');
}

exports.jsapiTicket = function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    var backData = new Object()
    var returnMsg = ''
    var string1 = ''
    var url = ""
    var href = req.params.href || null
    if (!href) {
        backData.state = -10027
        backData.msg = 'href is not defind'
        res.send(backData)
    } else {
        href = decodeURI(href)
        exports.getAccess_token(req, res, function (access_token) {
            if (!access_token) {
                backData.state = -1
                backData.msg = 'access_token not defind'
                res.send(backData)
            } else {
                url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + access_token + "&type=jsapi"
                https.get(url, function (ret) {
                    ret.on('data', function (chunk) {
                        returnMsg += chunk
                    })
                    ret.on('end', function () {
                        try {
                            returnMsg = JSON.parse(returnMsg)
                        } catch (e) {
                            backData.state = -10027
                            backData.msg = 'Conversion data failed'
                            res.send(backData)
                        }
                        var time = Date.parse(new Date()) / 1000
                        if (returnMsg.errmsg == 'ok') {
                            string1 = "jsapi_ticket=" + returnMsg.ticket + "&noncestr=YshWZYTPz0wzccnW&timestamp=" + time + "&url=" + href
                            backData.state = 0
                            backData.msg = 'success'
                            global.db.getRow("SELECT SHA1('" + string1 + "') as signature", function (rdata, err) {
                                if (rdata != null) {
                                    backData.aaData = [rdata, {
                                        ticket: returnMsg.ticket,
                                        noncestr: "YshWZYTPz0wzccnW",
                                        timestamp: time
                                    }]
                                    res.send(backData)
                                } else {
                                    backData.state = -1
                                    backData.msg = 'Encryption error'
                                    res.send(backData)
                                }
                            })
                        } else {
                            backData.state = -1
                            backData.msg = 'get ticket failed'
                            res.send(backData)
                        }
                    })
                })
            }
        })
    }
}

exports.checkSignature = function (signature, timestamp, nonce, token) {
    //签名
    var shasum = crypto.createHash('sha1');
    var arr = [timestamp, nonce, token].sort();
    shasum.update(arr.join(''));
    tmpSignature = shasum.digest('hex');
    return tmpSignature == signature;
}


exports.creatUser=function(openid){
    var sql="select count(*) as totals from DB_USER where WxOpenId ='"+openid+"'"
    global.db.getRow(sql,function(data,err){
        if (!err.status) {
            if (data.totals==0){
                var sql2="INSERT INTO `DB_USER` (`WxOpenId`,`ReginDate`) VALUES  (' "+openid+"', NOW());"
                global.db.getRow(sql2,function(data2,erro){
                    if (!erro.status){     
                    }
                    else{
                        console.log(erro)
                    }
                })
            }
        } else {
            console.log(err)
        }
    })
}