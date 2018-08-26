var err = require("../common/err.js");
var sql = require("../common/dbapi.js");
var dbapi = sql.dbapi();
var errObj = err.InitErr();

exports.project_developAPI = {
    // 查询
    select_proAndDev:function(data,callback){
        var pagenum = parseInt(data.num) || 0;
        var id = parseInt(data.Id) || null;
        var result = new Object();
        var sql = "SELECT developer.developerName,project.projectName,develop_project.Id,develop_project.is_deBug,develop_project.debug_port FROM develop_project LEFT JOIN developer ON developer.Id = develop_project.developerId LEFT JOIN project ON develop_project.projectId = project.Id LIMIT " + pagenum * 10 + ",10";
        
        if(id)
            sql = "SELECT * FROM develop_project where Id = "+ id +" limit " + pagenum * 10 + ",10";
        
        dbapi.sqlQuery(sql,function(data,err){
            result.aaData = data.aaData;
            sql = "select count(1) as count from develop_project";
            if(id)
                sql = "select count(1) as count from develop_project where Id = " + id;
                dbapi.sqlQuery(sql,function(data2,err){
                    result.err = errObj.success;
                    result.page = data2.aaData;
                    callback && callback(result);
                });
        });
    },

    // 添加
    insert_proAndDev: function(data, callback) {
        var developerId = data.developerId || null;
        var projectId = data.projectId || null;
        var is_deBug = data.is_deBug || null;
        var debug_port = data.debug_port || null;

        if (!developerId || !projectId || !is_deBug || !debug_port) {
            var result = errObj.dataLose;
            callback && callback(result);
        } else {
            var sql = 'INSERT INTO develop_project (developerId,projectId,is_deBug,debug_port) VALUES ("' + developerId.trim() + '","' + projectId.trim() + '","' + is_deBug.trim() + '","' + debug_port.trim() + '")';
            var result = new Object();

            dbapi.sqlQuery(sql, function(data, err) {
                if (!err) {
                    result.err = errObj.success;
                    result.aaData = data.aaData;
                } else {
                    result.err = errObj.success;
                }
                callback && callback(result);
            });
        }
    },

    // 编辑
    update_proAndDev:function(data,callback){
        var Id = data.Id || null;
        var developerId = data.developerId || null;
        var projectId = data.projectId || null;
        var is_deBug = data.is_deBug || null;
        var debug_port = data.debug_port || null;

        if(!developerId || !projectId || !Id || !is_deBug || !debug_port){
            var result = errObj.dataLose;
            callback && callback(result);
        }else{
            var sql = 'UPDATE develop_project SET developerId = "' + developerId.trim() + '",projectId = "' + projectId.trim() + '",is_deBug = "' + is_deBug.trim() + '",debug_port = "' + debug_port.trim() + '" where Id = ' + Id.trim();
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

    // 删除
    delete_proAndDev:function(data,callback){
        var Id = data.Id || null;
        if(!Id){
            var result = errObj.dataLose;
            callback && callback(result);
        }else{
            var sql = 'DELETE FROM develop_project WHERE Id  = ' + Id;
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
}
