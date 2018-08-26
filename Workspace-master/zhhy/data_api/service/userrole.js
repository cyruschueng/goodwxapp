exports.name ="UserRole"
var creatuser =require("./weixin.js")
var backResult = new Object()
var backResult=global.ERROR.success
exports.userrole=function(req,res,next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Content-Type', 'application/json');	
	var param= req.params||req.context||req.query
	var openid=param.openid
	var sql ="SELECT COUNT(*) AS totals FROM `DB_USER` WHERE `WxOpenId` ='"+openid+"'";
	global.db.getRow(sql, function(data,err){
		if (!err.status){
			if (data.totals == 0){
				creatuser.creatUser(openid);
				backResult.aaData={"value":0}
				res.send(backResult)
			}else{
				var sql1="SELECT* FROM `DB_USER` WHERE `WxOpenId` ='"+openid+"' limit 0,1"
				global.db.getRow(sql1, function(data1,erro){
					if(!erro.status){
						var role=data1.RoleType
						var Status=data1.Status
						var userid=data1.Id
						if (role ==1 && Status==1){
							backResult.aaData={"value":1}
							res.send(backResult)//认证过的用户							
						}else if (role ==1 && Status !=1){
							backResult.aaData={"value":2}
							res.send(backResult)//未认证或认证未通过的
						}else if(role == 2){
							var sql2="SELECT COUNT(*) AS counts FROM `DB_PRODUCT` WHERE UserId ="+userid
							global.db.getRow(sql2, function(data2,errs){
								if(!errs.status){
									if (data2.counts ==0){
										backResult.aaData={"value":3}
										res.send(backResult)
									}
									else{
										backResult.aaData={"value":4}
										res.send(backResult)
									}
								}
								else{
									res.send(errs)
								}	
							})
						}
					}
						//resobj.aaData=data
						else{
							res.send(erro)
						}
					})
			}
		}else{
			res.send(err)
		}
	})

}