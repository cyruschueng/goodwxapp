exports.name="ordernumber"
var qr = require('qr-image');
var fs =require("fs")
var err = JSON.parse(fs.readFileSync('./config/err.json'))


exports.createorder=function(req,res,next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Content-Type', 'application/json;charset=utf-8');
	console.log("订单请求")
	var program = req.params||req.context||req.query
	if (program){
		var sellerid=program.userid||''
		var productlist=program.prolist
		var Ordertotals =program.totlaprice||0
		if (!productlist){
			res.send({"status": 0,
				"state": 0,
				"msg": "productlist is null"})
		}
		else{
			var north= global.util.getRandomString(6)
			var time =new Date().getTime()
			//var datetime=global.util.timeFormat(time).time_
			var ordernumber= 9 + north +time +sellerid
			var sql="INSERT INTO `DB_ORDER` (  `OrderNumber`,  `FromMarket`,  `BeginDateTime`, `OrderTotals`) VALUES  ( '"+
			ordernumber+"','"+sellerid+"', NOW(),"+ Ordertotals+");"
			global.db.getAll(sql, function(data,err,filed){
				if (err.status){
					console.log(err)
				}else{
					console.log(data)
					var OrderId=data.insertId					
					//var img=qr.image(ordernumber,{size :10});
					//res.writeHead(200, {'Content-Type': 'image/png'});
					//img.pipe(res);
					res.send({
						"status": 0,
						"state": 0,
						"msg": "The resquest success",
						"aaData": {"ordernumber":ordernumber}
					})
					console.log(productlist)
					var count = 0
					var backResult = new Object()
					productlist.forEach(function(productRow){
						if (count<productlist.length){
							var productid = productRow.pid
							var Amount = productRow.num
							var Price =productRow.price
							var sql1="INSERT INTO `DB_ORDITEM` (`OrderId`,`ProductId`,`Price`,`Amount`,`Unit`) VALUES ('"+
							OrderId+"','"+productid+"','"+Price+"','"+Amount+"','kg');"
							global.db.getAll(sql1, function(data,err,filed){
								if (!errs.status) {
									backResult = errObj.success
									backResult.aaData = result
									res.send(backResult)
								} else {
									res.send(errs)
								}						
							})   
							count++
						}else{
							console.log("over:"+sql1)
						}
					})
					console.log(count)
				}
			})
		}
	}
	else{
		res.send({"state": 200,"code":400,"message":"program is null"})
	}
}