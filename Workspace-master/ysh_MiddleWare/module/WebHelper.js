var err = require("../common/err.js");
var sql = require("../common/dbapi.js");
var dbapi  = sql.dbapi();
var errObj = err.InitErr();

exports.WebHelper = {
	selectHelper:function(querys,callback){
		var result = new Object();
		var Data = new Array();
		var query = new Array();
		if(querys.query.indexOf(",") > 0){
			query = querys.query.split(",");
		}else{
			query.push(querys.query);
		}
		
		if(query instanceof Array){
			var temp = new Array();
			var count = 0;
			for(var num in query){
				(function(num){	
					searchSelect(query[num],function(backResult){
						count++;
						var flag = true;
						temp[num] = JSON.stringify(backResult);
						if(temp.length == count){
							for(var k in temp){
								if(!temp[k])
									flag = false;
							}
							if(flag&&(count==query.length))
							 callback && callback(temp);
						}
					});
				})(num);
			}
		}else{
			result = errObj.TypeErr;
			callback && callback(result);
		}
	}
};


function searchSelect(query,callback){
	var sql = "select * from selectHelp where querycode = " + query;
	dbapi.sqlQuery(sql,function(result,err){
		if(!result.aaData[0]){
			callback && callback({err:"no select to search The" + query});
		}else{
			sql = result.aaData[0].select;
			dbapi.sqlQuery(sql,function(resultSelect,errSelect){
				if(!errSelect && resultSelect){
					callback && callback(resultSelect);
				}else{
					callback && callback(false);
				}
			});
		}
	});
}