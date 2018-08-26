var db=require('../lib/mysqldb');

exports.check=function(req,res,next){
	    var arr = [];
    req.on("data",function(data){
        arr.push(data);
    });
    req.on("end",function(){
        var data= Buffer.concat(arr).toString(),ret;
        try{
            var ret = JSON.parse(data);
        }catch(err){}
        req.body = ret;

    })
        var date=new Date();

    var sql="select goods_id from ysh_goods where promote_end_date>"+date.getTime()/1000+" and promote_start_date<" + date.getTime()/1000;
    var goods =db.query(sql);
    var data=[];

	for (var i in goods) {
        if (true) {
        	data.State=1;
        	data.Msg='本次支付无活动商品'；
        }
        else{
        	data.State=0;
        	data.Msg='本次支付订单中包含活动商品';
        };
    }
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('content-type','text/json');
    res.send(JSON.stringify(data));
        next();
};
