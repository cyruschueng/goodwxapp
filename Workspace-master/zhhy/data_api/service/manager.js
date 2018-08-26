var fs = require('fs');
var err = JSON.parse(fs.readFileSync('./config/err.json'))
var crypto = require('crypto');
exports.name = 'Manager';  //模块名称，必填
exports.getManagerById = function (req, res, next) {
    global.models.Manager.findOne(
        {
            where: {
                user_id: req.params.userid
            }
        }
    ).then(function (result) {
            res.send(JSON.stringify(result, null, 2));
            next();
        });
};

exports.login = function (req, res, next) {
    global.models.Manager
        .findOne(
        {
            where: {
                user_name: req.params.username
            }
        }
    ).then(function (result) {
            var model = JSON.stringify(result, null, 2);
            var hasher = crypto.createHash("md5");
            hasher.update(req.params.password);
            var hashmsg = hasher.digest('hex') + result.ec_salt;
            hasher = crypto.createHash("md5"); //重新初始化
            hasher.update(hashmsg);
            hashmsg = hasher.digest('hex');
            var data = {};
            if (result.password == hashmsg) {
                data = err.loginSuccess
            } else {
                data = err.loginErr
            }
            res.send(data);
            next();
        });
};



