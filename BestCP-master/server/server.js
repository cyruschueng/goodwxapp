var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    expressValidator = require('express-validator'),
    request = require('request'),
    process = require('child_process').exec,
    WXBizDataCrypt = require('./WXBizDataCrypt');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
app.use(bodyParser.json());
app.use(expressValidator());

var connection = require('express-myconnection'),
    mysql = require('mysql');

app.use(

    connection(mysql, {
        host: 'localhost',
        user: 'root',
        password: '83508089l',
        database: 'BestCp',
        debug: false //set true if you wanna see debug logger
    }, 'request')

);

app.use('/test', (request, response, next) => {
    console.log('test api ')
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end("test success", 'utf-8');
});


//RESTful route
var router = express.Router();

router.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

var test = router.route('/onTest');

test.get(function (req, res, next) {
    res.send('test route api');
});

var questions = router.route('/questions');

questions.get(function (req, res, next) {
    console.log('getQuestion');
    req.getConnection(function (err, conn) {

        if (err) return next("Cannot Connect");

        var query = conn.query('SELECT * FROM Question', function (err, rows) {

            if (err) {
                console.log(err);
                return next("Mysql error, check your query");
            }

            console.log(rows);
            res.send({ data: rows });
            // res.render('question',{data:rows});

        });

    });
});

var cpResult = router.route('/cpResult');

cpResult.get(function (req, res, next) {
    console.log('get CpResult');
    req.getConnection(function (err, conn) {

        if (err) return next("Cannot Connect");

        var query = conn.query('SELECT * FROM CpResult where id = ?', req.query.type, function (err, rows) {

            if (err) {
                console.log(err);
                return next("Mysql error, check your query");
            }

            console.log(rows);
            res.send({ result: rows });
            // res.render('question',{data:rows});

        });

    });
});


cpResult.post(function (req, res, next) {
    console.log('post CpResult');

    let array = new Array();
    array = req.body.array;
    console.log(array)
    let weight = new Array();
    weight = getWeight(array[0]);
    let result = new Array(5);

    let totalScore = 0;
    let max = -1;
    let index = -1;
    for (let i = 1; i < array.length; i++) {
        result[i] = score(array[i]) * weight[i];
        if (max < result[i]) {
            max = result[i];
            index = i;
        }
    }

    // var data = {
    //     wx_id : req.body.wx_id,
    //     group_id : req.body.group_id,
    //     cp_type:index
    // };

    // req.getConnection(function(err,conn){

    //     if (err) return next("Cannot Connect");

    //     var query = conn.query('insert into General set ? ',data,function(err,rows){

    //         if(err){
    //             console.log(err);
    //             return next("Mysql error, check your query");
    //         }

    //         res.send({type :data.cp_type});
    //      });

    // });

    request.get({
        uri: 'https://api.gentleleetommy.cn/bestcp/cpResult',
        json: true,
        qs: {
            type: index
        }
    }, (err, response, data) => {
        console.log(data.result);
        res.send(data.result);
    })
});

function getWeight(answer) {
    switch (answer) {
        case 'A':
            return [0.5, 0.4, 0.3, 0.2];
        case 'B':
            return [0.2, 0.3, 0.5, 0.4];
        case 'C':
            return [0.2, 0.4, 0.3, 0.5];
        case 'D':
            return [0.4, 0.5, 0.2, 0.3];
    };
}

var share = router.route('/onShare');

share.post(function (req, res, next) {
    console.log('onShare');

    console.log(req.body.cptype);
    var openGId = "personal"

    if (req.body.encryptedData != "" && req.body.encryptedData != null) {
        console.log("sessionKey = ")
        console.log(req.body.sessionKey);
        console.log("iv = ");
        console.log(req.body.iv);
        console.log("encryptedData = ");
        console.log(req.body.encryptedData);

        var appId = 'wxf259d9c8cc7766ed';
        var pc = new WXBizDataCrypt(appId, req.body.sessionKey);
        var mdata = pc.decryptData(req.body.encryptedData, req.body.iv);

        openGId = mdata.openGId;
        console.log(mdata.openGId);
    }




    var data = {
        wx_id: req.body.wx_id,
        group_id: openGId,
        cp_type: req.body.cptype,
    }

    req.getConnection(function (err, conn) {

        if (err) return next("Cannot Connect");

        var query = conn.query('select * from General where group_id = ? and wx_id = ?', [data.group_id,data.wx_id], function (err, rows) {

            if (err) {
                console.log(err);
                return next("Mysql error, check your query");
            }

            if(rows.length < 1){
                req.getConnection(function (err, conn) {

                    if (err) return next("Cannot Connect");
            
                    var query = conn.query('insert into General set ?', data, function (err, rows) {
            
                        if (err) {
                            console.log(err);
                            return next("Mysql error, check your query");
                        }
                    });
            
                });
            }
            res.send({
                group_id: data.group_id
            })
        });
    });
    
});

var groupClick = router.route('/groupClick');

groupClick.post(function (req, res, next) {
    console.log('post groupClick');
    console.log(req.body);
    console.log("req.body.wx_id = " + req.body.wx_id);
    // console.log(req.body);

    var appId = 'wxf259d9c8cc7766ed';
    var pc = new WXBizDataCrypt(appId, req.body.sessionKey);
    var mdata = pc.decryptData(req.body.encryptedData, req.body.iv);

    console.log(mdata.openGId);

    req.getConnection(function (err, conn) {
        console.log("get connection");

        if (err) return next("Cannot Connect");

        var query = conn.query('select * from General where wx_id = ?', [req.body.wx_id], function (err, rows) {
            if (err) {
                console.log(err);
                res.send({ status: 'failed' })
                return;
            }
            if (rows.length < 1) {
                res.send({ status: "failed" })
                return;
            }
            console.log(rows);
            var flag = false;
            var row;
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].group_id == mdata.openGId) {
                    console.log("duplicate group_id");
                    flag = true;
                    row = rows[i];
                    break;
                }
            }
            if (flag == true) {
                res.send({
                    status: 'success',
                    group_id: row.group_id
                });
                return;
            } else {
                req.getConnection(function (err, conn) {

                    if (err) return next("Cannot Connect");
                    
                    var data = {
                        wx_id: req.body.wx_id,
                        group_id: mdata.openGId,
                        cp_type: rows[0].cp_type
                    }

                    var query = conn.query('insert into General set ?', data, function (err, rows) {

                        if (err) {
                            console.log(err);
                            return next("groupClick post :Mysql error, check your query");
                        }

                        res.send({
                            status: "insert",
                            group_id: mdata.openGId,
                        })

                    });
                });
            }

        });
    })
});

var bestCp = router.route('/bestCouple');

bestCp.post(function (req, res, next) {
    console.log('post bestCp');

    var mdata = {
        wx_id: req.body.wx_id,
        group_id: req.body.group_id
    }
    console.log(mdata);
    var me;
    if (req.body.group_id == '') {
        console.log("could not find group id")
        res.send(null)
        return;
    }
    console.log("group_id = " + req.body.group_id)

    request.get({
        uri: 'https://api.gentleleetommy.cn/bestcp/basicinfo',
        qs: {
            wx_id: mdata.wx_id
        }
    }, (err, response, data) => {
        me = JSON.parse(data).info[0]
        if (me == null) {
            console.log("could not find me")
            res.send(null)
            return;
        }
        console.log(me)

        req.getConnection(function (err, conn) {
            console.log("get connection");

            if (err) return next("Cannot Connect");

            var query = conn.query('select * from BasicInfo where wx_id != ? and gender != ? and wx_id in (select wx_id from General where group_id = ? and cp_type = (select cp_type from General where wx_id = ? and group_id = ?))', [me.wx_id, me.gender, mdata.group_id, mdata.wx_id, mdata.group_id], function (err, rows) {

                if (err) {
                    console.log(err);
                    return next("best cp post : Mysql error, check your query");
                }
                var data = rows;
                // res.send(data);

                var constellationArray = getConstellationArray(me.constellation);
                var array = new Array(data.length);
                var max = -1;
                var result;
                for (var i = 0; i < data.length; i++) {
                    array[i] = constellationArray[getConstellationIndex(data[i].constellation)];
                    array[i] += 100 - 4 * Math.abs(data[i].age - me.age);
                    if (max < array[i]) {
                        max = array[i];
                        result = data[i];
                    }
                }
                if (result == null) {
                    res.send(result);
                    return;
                }
                console.log("result_id = " + result.wx_id);
                console.log("me.id = " + me.wx_id);
                req.getConnection(function (err, conn) {
                    console.log("get connection");

                    if (err) return next("Cannot Connect");

                    var query = conn.query('update General set couple_id = ? where wx_id = ? ', [result.wx_id, me.wx_id], function (err, rows) {
                        if (err) {
                            console.log(err);
                            return next("Mysql error, check your query");
                        }
                        res.send(result);
                    });
                })
            });
        })
    });
});

function getConstellationArray(constellation) {
    switch (constellation) {
        case '白羊座':
            return [74, 52, 66, 24, 99, 47, 8, 40, 90, 47, 61, 47];
        case '金牛座':
            return [59, 77, 51, 68, 26, 96, 45, 87, 42, 93, 31, 64];
        case '双子座':
            return [60, 56, 73, 51, 65, 28, 93, 47, 82, 41, 96, 34];
        case '巨蟹座':
            return [38, 61, 55, 79, 52, 67, 20, 90, 46, 89, 43, 99];
        case '狮子座':
            return [91, 36, 62, 56, 71, 50, 67, 23, 98, 49, 85, 44];
        case '处女座':
            return [42, 94, 30, 63, 57, 74, 52, 66, 29, 96, 48, 81];
        case '天秤座':
            return [81, 43, 97, 38, 64, 55, 40, 51, 69, 21, 92, 46];
        case '天蝎座':
            return [49, 84, 40, 96, 32, 61, 57, 72, 53, 68, 25, 94];
        case '射手座':
            return [97, 46, 88, 44, 92, 35, 60, 56, 77, 51, 69, 23];
        case '摩羯座':
            return [22, 94, 49, 83, 41, 95, 37, 63, 58, 71, 54, 66];
        case '水瓶座':
            return [67, 27, 92, 45, 86, 42, 98, 31, 64, 59, 78, 53];
        case '双鱼座':
            return [43, 69, 32, 92, 52, 84, 41, 98, 19, 69, 50, 73];
    }
}

function getConstellationIndex(constellation) {
    switch (constellation) {
        case '白羊座':
            return 0;
        case '金牛座':
            return 1;
        case '双子座':
            return 2;
        case '巨蟹座':
            return 3;
        case '狮子座':
            return 4;
        case '处女座':
            return 5;
        case '天秤座':
            return 6;
        case '天蝎座':
            return 7;
        case '射手座':
            return 8;
        case '摩羯座':
            return 9;
        case '水瓶座':
            return 10;
        case '双鱼座':
            return 11;
    }
}


var testResult = router.route('/testResult');

testResult.get(function (req, res, next) {
    console.log('get testResult');
    console.log("wx_id = " + req.query.wx_id);
    req.getConnection(function (err, conn) {

        if (err) return next("Cannot Connect");

        var query = conn.query('SELECT * FROM TestResult where type = (select rate from BasicInfo where wx_id = ?)', req.query.wx_id, function (err, rows) {

            if (err) {
                console.log(err);
                return next("Mysql error, check your query");
            }

            console.log(rows);
            res.send({
                rate: rows[0].type,
                description: rows[0].description
            });
            // res.render('question',{data:rows});

        });

    });
});

testResult.post(function (req, res, next) {
    console.log('post to get testResult');

    console.log(req.body);

    let array = new Array();
    array = req.body.array;
    let item;
    let totalScore = 0;
    for (let i = 1; i < array.length; i++) {
        console.log(array[i]);
        totalScore += score(array[i]);
    }

    let type = 0;
    if (totalScore >= 5 && totalScore <= 10) {
        type = 3;
    }
    else if (totalScore >= 10 && totalScore <= 15) {
        type = 4;
    }
    else if (totalScore >= 15 && totalScore <= 20) {
        type = 5;
    }

    req.getConnection(function (err, conn) {

        if (err) return next("Cannot Connect");

        var query = conn.query('update BasicInfo set rate = ? where wx_id = ?', [type, req.body.wx_id], function (err, rows) {

            if (err) {
                console.log(err);
                return next("Mysql error, check your query");
            }

            // res.render('question',{data:rows});

        });

    });

    req.getConnection(function (err, conn) {

        if (err) return next("Cannot Connect");

        var query = conn.query('SELECT id,type,description,style FROM TestResult where type = ?', type, function (err, rows) {

            if (err) {
                console.log(err);
                return next("Mysql error, check your query");
            }

            console.log(rows);
            res.send({ data: rows });
            // res.render('question',{data:rows});

        });

    });
});

function score(answer) {
    switch (answer) {
        case 'A':
            return 4;
        case 'B':
            return 3;
        case 'C':
            return 2;
        case 'D':
            return 1;
    }
}

var basicInfo = router.route('/basicInfo');

basicInfo.get(function (req, res, next) {

    console.log("get basicinfo")
    var wx_id = req.query.wx_id;
    console.log(wx_id);

    req.getConnection(function (err, conn) {

        if (err) return next("Cannot Connect");

        var query = conn.query("SELECT * FROM BasicInfo WHERE wx_id = ? ", [wx_id], function (err, rows) {

            if (err) {
                console.log(err);
                return next("Mysql error, check your query");
            }

            // //if user not found
            // if(rows.length < 1)
            //     return res.send("User Not found");

            res.send({ info: rows })
        });

    });

});

basicInfo.post(function (req, res, next) {
    console.log('post basicInfo');

    var data = {
        wx_id: req.body.wx_id,
        gender: req.body.gender,
        age: req.body.age,
        constellation: req.body.constellation,
        nickname: req.body.nickname,
        avatarUrl: req.body.avatarUrl
    };

    console.log(data);

    req.getConnection(function (err, conn) {

        if (err) return next("Cannot Connect");

        var query = conn.query('insert into BasicInfo set ?', data, function (err, rows) {

            if (err) {
                console.log(err);
                return next("Mysql error, check your query");
            }

            res.sendStatus(200);

        });

    });
});


var login = router.route('/onLogin');

login.post(function (req, res, next) {
    console.log('onLogin');
    let code = req.body.code;
    console.log(code);

    // process('head -n 80 /dev/urandom | tr -dc A-Za-z0-9 | head -c 168',
    //     function (error, stdout, stderr) {
    //         if (error !== null) {
    //             console.log('exec error: ' + error);
    //         } else {
    //             console.log('random num : ' + stdout);
    //         }
    //     });

    request.get({
        uri: 'https://api.weixin.qq.com/sns/jscode2session',
        json: true,
        qs: {
            appid: 'wxf259d9c8cc7766ed',
            secret: '68e1b774d317afe33f7229af311e4795',
            js_code: code,
            grant_type: 'authorization_code'
        }
    }, (err, response, data) => {
        if (response.statusCode === 200) {
            console.log(data);
            console.log("[openid]", data.openid)
            console.log("[session_key]", data.session_key)

            //TODO: 生成一个唯一字符串sessionid作为键，将openid和session_key作为值，存入redis，超时时间设置为2小时
            //伪代码: redisStore.set(sessionid, openid + session_key, 7200)
            // exec('head -n 80 /dev/urandom | tr -dc A-Za-z0-9 | head -c 168', function (err, stdout, stderr) {
            //     console.log("stdout" + stdout)
            // });


            res.json({
                openid: data.openid,
                session_key: data.session_key
            })
        } else {
            console.log("[error]", err)
            res.json(err)
        }
    })

});


//now we need to apply our router here
app.use('/bestcp', router);

//start Server
var server = app.listen(8765, function () {

    console.log("Listening to port %s", server.address().port);

});
