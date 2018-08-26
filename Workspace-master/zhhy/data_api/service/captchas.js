exports.name = "captchas"
var captchapng = require("captchapng")
var url = require("url")

/**
 * 图片验证码
 * @param req
 * @param res
 * @param next
 */
    //http://localhost:3000/api/captchapng?sesskey=e683665c19614bfe8e8ea06e214711bc
exports.captchas = function (req, res, next) {
    var code = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    var length = 4;
    var randomcode = '';
    for (var i = 0; i < length; i++) {
        var k = parseInt((Math.random() * 10))
        randomcode += code[k]
    }
    try {
        //console.log(randomcode)
        // console.log(req.query.sesskey)
        var sesskey = req.query.sesskey
        if (req.query.sesskey) {
            var sql = " SELECT COUNT(*) as totals FROM DB_SESSION WHERE sesskey='" + sesskey + "'"
            global.db.getRow(sql, function (data, err) {
                //console.log(err.length >0)
                if (err.length > 0) {
                    console.log(err)
                    res.end(err)
                }
                else {
                    var count = data.totals
                    //console.log(count)
                    if (count > 0) {
                        var sql2 = " UPDATE DB_SESSION SET `Captchas`='" + randomcode + "' WHERE sesskey='" + sesskey + "'";
                        global.db.getRow(sql2, function (d, erro) {
                            if (err.length > 0) {
                                console.log(erro)
                                res.end(err)
                            } else {
                                var p = new captchapng(80, 30, randomcode); // width,height,numeric captcha
                                p.color(255, 255, 255, 0);  // First color: background (red, green, blue, alpha)
                                p.color(76, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
                                var img = p.getBase64();
                                var imgbase64 = new Buffer(img, 'base64');
                                res.writeHead(200, {
                                    'Content-Type': 'image/png'
                                });
                                res.end(imgbase64);
                            }
                        })
                    }
                    else {
                        res.end("sesskey undefined")
                    }
                }

            })
        }
    } catch (err) {
        console.log(err)
    }
}