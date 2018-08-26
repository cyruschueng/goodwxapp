var err = require("../common/err.js");
var sql = require("../common/dbapi.js");
var dbapi  = sql.dbapi();
var errObj = err.InitErr();
var sqlObj = sql.dbapi();
exports.routeManageInit = {
		selectRoute:function(data,callback){
			var pagenum = parseInt(data.num) || 0;
			var Id = data.Id || null;
			var result = new Object();
			var sql = "SELECT sys_route.*,project.projectName FROM sys_route LEFT JOIN project ON sys_route.projectId = project.Id limit " + pagenum * 10 + ",10";
			if(Id)
				sql = "SELECT * FROM sys_route where Id = " + Id + " limit " + pagenum * 10 + ",10";
			
			dbapi.sqlQuery(sql,function(data,err){
				result.aaData = data.aaData;
				sql = "select count(1) as count from sys_route";
					if(Id)
						sql = "select count(1) as count from sys_route where Id = " + Id;
					dbapi.sqlQuery(sql,function(data2,err){
						result.err = errObj.success;
						result.page = data2.aaData;
						callback && callback(result);
					});
			});
		},
		get_projectNameSelect:function(data,callback){
			var sql = "SELECT Id,projectName FROM project";
			var result = new Object();
			dbapi.sqlQuery(sql,function(data,err){
				result.aaData = data.aaData;
				callback && callback(result);
			});
		},
		insert_Route:function(data,callback){
			var route = data.ysh_route||null;
			var cmd = data.ysh_cmd||null;
			var Interface = data.ysh_Interface||null;
			var projectId = data.projectId||null;
			
			if(!route ||!cmd ||!Interface||!projectId){
				var result = errObj.dataLose;
				callback && callback(result);
			}else{
				var sql = 'INSERT INTO sys_route  (route,cmd,Interface,projectId) VALUES ("' + route.trim() + '","' + cmd.trim() + '","' + Interface.trim() + '","' + projectId.trim() + '")';
				var result = new Object();
				dbapi.sqlQuery(sql,function(data,err){
					if(!err){
						result.err = errObj.success;
						result.aaData = data.aaData;
					}else{
						result.err = errObj.success;
					}
					callback && callback(result);
				});
			}
		},
		update_Route:function(data,callback){
			var Id = data.Id || null;
			var route = data.ysh_route||null;
			var cmd = data.ysh_cmd||null;
			var Interface = data.ysh_Interface||null;
			var projectId = data.projectId||null;
			
			if(!Id||!route ||!cmd ||!Interface||!projectId){
				var result = errObj.dataLose;
				callback && callback(result);
			}else{
				var sql = 'UPDATE sys_route SET route ="' + route.trim() + '",cmd = "' + cmd.trim() + '",Interface="' + Interface.trim() + '",projectId="'+ projectId.trim() + '" where Id = ' + Id.trim();
				var result = new Object();
				dbapi.sqlQuery(sql,function(data,err){
					if(!err){
						result.err = errObj.success;
						result.aaData = data.aaData;
					}else{
						result.err = errObj.success;
					}
					callback && callback(result);
				});
			}
		},
		delete_Route:function(data,callback){
			var Id = data.Id || null;
			if(!Id){
				var result = errObj.dataLose;
				callback && callback(result);
			}else{
				var sql = 'DELETE FROM sys_route WHERE Id  = ' + Id;
				var result = new Object();
				dbapi.sqlQuery(sql,function(data,err){
					if(!err){
						result.err = errObj.success;
						result.aaData = data.aaData;
					}else{
						result.err = errObj.success;
					}
					callback && callback(result);
				});
			}
		}
};
