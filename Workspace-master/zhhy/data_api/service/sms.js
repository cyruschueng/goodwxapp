var crypto = require('crypto');
var restify = require('restify');
exports.name = 'SMS';

exports.md5 = function (str) {
    var hasher = crypto.createHash("md5"); //重新初始化
    hasher.update(str);
    return hasher.digest('hex');
}
exports.sendSms = function (phone, content, ret) {
    client = restify.createClient({
        url: 'http://api.momingsms.com'
    });
    var name = '70206896';
    var pwd = '18980866607';
    var hasher = crypto.createHash("md5"); //重新初始化
    hasher.update(pwd);
    var pwdmd5 = hasher.digest('hex');

    var params = 'action=send&username=' + name + '&password=' + pwdmd5 + '&phone=' + phone + '&content=' + content + '&encode=utf8';
    params = encodeURI(params);
    console.log(params);


    client.get('/?' + params, function (err, req) {
        req.on('result', function (err, res) {
            res.body = '';
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                res.body += chunk;
            });
            res.on('end', function () {
                ret(res);
            });
        });
    });
}
