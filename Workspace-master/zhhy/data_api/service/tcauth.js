exports.name = 'TcAuth'; //模块名称，必填
//生成红包编号
function getNum() {
    return (1000000000 + Math.random() * 100000000);

};
exports.tcauth = function (req, res, next) {
    global.models.Tcuser.findOne({
        where: {
            name: req.params.name,
            num: req.params.num
        }
    }).then(function (result) {
        var data = {};
        if (result == null) {
            data.state = -1;
            data.msg = '验证失败';
            console.log(req.params.userid + '验证失败！');
            res.send(data);
            next();
        } else {
            if (result.isok == 0) {
                var mytime = new Date();
                //更新认证信息
                global.models.Tcuser.update({
                    isok: 1,
                    rztime: mytime.toLocaleString()
                }, {
                    where: {
                        tid: result.tid
                    }
                });
                global.models.Tcbonus.create({
                        bonus_type_id: 6,
                        bonus_sn: getNum(),
                        user_id: req.params.userid,
                        used_time: 0,
                        order_id: 0,
                        emailed: 0,
                        goodsid: 39
                    }).then(function () {
                        data.state = 1;
                        data.msg = '验证成功';
                        console.log(req.params.userid + '已通过验证并发放了红包！');
                        res.send(data);
                        next();
                    });
                return;
            } else {
                data.state = -1;
                data.msg = '该会员已通过验证，无法再次验证';
                console.log(req.params.userid + '该会员已通过验证，验证失败！');
                res.send(data);
                next();
            };
        } ;
    })

};

