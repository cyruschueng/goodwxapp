var err = require("../common/err.js");
var sql = require("../common/dbapi.js");
var dbapi  = sql.dbapi();
var errObj = err.InitErr();
var sqlObj = sql.dbapi();
exports.project = {
		select_project:function(data,callback){
			var pagenum = parseInt(data.num) || 0;			
			var id = data.Id || null;
			var result = new Object();
			var sql = "SELECT * FROM project limit " + pagenum * 10 + ",10";
			if(id)
				sql = "SELECT * FROM project where Id = " + id + " limit " + pagenum * 10 + ",10";
			dbapi.sqlQuery(sql,function(data,err){
				result.aaData = data.aaData;
				sql = "select count(1) as count from project";
				if(id)
					sql = "select count(1) as count from project where Id = " + id ;
					dbapi.sqlQuery(sql,function(data2,err){
						result.err = errObj.success;
						result.page = data2.aaData;
						callback && callback(result);
					});
			});
		},
		insert_project:function(data,callback){
			var projectName = data.projectName||null;
			var projectStatus = data.projectStatus||null;
			if(!projectName ||!projectStatus){
				var result = errObj.dataLose;
				callback && callback(result);
			}else{
				var sql = 'INSERT INTO project  (projectName,projectStatus) VALUES ("' + projectName.trim() + '","' + projectStatus.trim() + '")';
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
		update_project:function(data,callback){
			var Id = data.Id || null;
			var projectName = data.projectName||null;
			var projectStatus = data.projectStatus||null;
			if(!projectName ||!projectStatus ||!Id){
				var result = errObj.dataLose;
				callback && callback(result);
			}else{
				var sql = 'UPDATE project SET projectName = "' + projectName.trim() + '",projectStatus = "' + projectStatus.trim() + '" where Id = ' + Id.trim();
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
		delete_project:function(data,callback){
			var Id = data.Id || null;
			if(!Id){
				var result = errObj.dataLose;
				callback && callback(result);
			}else{
				var sql = 'DELETE FROM project WHERE Id  = ' + Id;
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
