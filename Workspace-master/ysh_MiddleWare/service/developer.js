var err = require("../common/err.js");
var sql = require("../common/dbapi.js");
var dbapi  = sql.dbapi();
var errObj = err.InitErr();
var sqlObj = sql.dbapi();
exports.developers = {
		selectDeveloper:function(data,callback){
			var pagenum = parseInt(data.num) || 0;
			var Id = data.Id || null;
			var result = new Object();
			var sql = "SELECT * FROM developer limit " + pagenum * 10 + ",10";
			if(Id)
				sql = "SELECT * FROM developer where Id = " + Id + " limit " + pagenum * 10 + ",10";
			
			dbapi.sqlQuery(sql,function(data,err){
				result.aaData = data.aaData;
				sql = "select count(1) as count from developer";
					if(Id)
						sql = "select count(1) as count from developer where Id = " + Id;
					dbapi.sqlQuery(sql,function(data2,err){
						result.err = errObj.success;
						result.page = data2.aaData;
						callback && callback(result);
					});
			});
		},
		insert_developer:function(data,callback){
			var developerName = data.developerName||null;
			var developerHost = data.developerHost||null;
			var debugSwitch = data.debugSwitch||null;
			
			if(!developerName ||!developerHost ||!debugSwitch){
				var result = errObj.dataLose;
				callback && callback(result);
			}else{
				var sql = 'INSERT INTO developer  (developerName,developerHost,debugSwitch) VALUES ("'+developerName.trim()+'","'+developerHost.trim()+'","'+debugSwitch.trim()+'")';
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
		update_developer:function(data,callback){
			var Id = data.Id || null;
			var developerName = data.developerName||null;
			var developerHost = data.developerHost||null;
			var debugSwitch = data.debugSwitch||null;
			
			if(!developerName ||!developerHost ||!debugSwitch||!Id){
				var result = errObj.dataLose;
				callback && callback(result);
			}else{
				var sql = 'UPDATE developer SET developerName ="' + developerName.trim() + '",developerHost = "' + developerHost.trim() + '",debugSwitch="' + debugSwitch.trim() + '" where Id = ' + Id.trim();
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
		delete_developer:function(data,callback){
			var Id = data.Id || null;
			if(!Id){
				var result = errObj.dataLose;
				callback && callback(result);
			}else{
				var sql = 'DELETE FROM developer WHERE Id  = ' + Id;
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
