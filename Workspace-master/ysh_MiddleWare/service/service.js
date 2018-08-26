var err = require("../common/err.js");
var sql = require("../common/dbapi.js");
var dbapi  = sql.dbapi();
var errObj = err.InitErr();

exports.serviceApi = {
		select_service:function(data,callback){
			var pagenum = parseInt(data.num) || 0;
			var id = parseInt(data.Id) || null;
			var result = new Object();
			var sql = "SELECT * FROM service limit " + pagenum * 10 + ",10";
			if(id)
				var sql = "SELECT * FROM service where Id = "+ id +" limit " + pagenum * 10 + ",10";
			dbapi.sqlQuery(sql,function(data,err){
				result.aaData = data.aaData;
				sql = "select count(1) as count from service";
				if(id)
					sql = "select count(1) as count from service where Id = " + id;
					dbapi.sqlQuery(sql,function(data2,err){
						result.err = errObj.success;
						result.page = data2.aaData;
						callback && callback(result);
					});
				
			});
		},
		insert_service:function(data,callback){
			var serviceName = data.serviceName||null;
			var serviceDesc = data.serviceDesc||null;
			var serviceHost = data.serviceHost||null;
			var serviceport = data.serviceport||null;
			if(!serviceName ||!serviceDesc||!serviceHost||!serviceport){
				var result = errObj.dataLose;
				callback && callback(result);
			}else{
				var sql = 'INSERT INTO service  (serviceName,serviceDesc,serviceHost,serviceport) VALUES ("' + serviceName.trim() + '","' + serviceDesc.trim() + '","' + serviceHost.trim() + '","' + serviceport.trim() + '")';
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
		update_service:function(data,callback){
			var Id = data.Id || null;
			var serviceName = data.serviceName||null;
			var serviceDesc = data.serviceDesc||null;
			var serviceHost = data.serviceHost||null;
			var serviceport = data.serviceport||null;
			if(!serviceName ||!serviceDesc ||!serviceHost ||!serviceport||!Id){
				var result = errObj.dataLose;
				callback && callback(result);
			}else{
				var sql = 'UPDATE service SET serviceName = "' + serviceName.trim() + '",serviceDesc = "' + serviceDesc.trim() + '",serviceHost = "'+ serviceHost.trim() + '",serviceport = "'+ serviceport.trim() + '" where Id = ' + Id.trim();
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
		delete_service:function(data,callback){
			var Id = data.Id || null;
			if(!Id){
				var result = errObj.dataLose;
				callback && callback(result);
			}else{
				var sql = 'DELETE FROM service WHERE Id  = ' + Id;
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
