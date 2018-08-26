var err = require("../common/err.js");
var sql = require("../common/dbapi.js");
var dbapi = sql.dbapi();
var errObj = err.InitErr();

exports.project_serviceAPI = {
    // 查询
    select_proAndSer:function(data,callback){
        var pagenum = parseInt(data.num) || 0;
        var id = parseInt(data.Id) || null;
        var result = new Object();
        var sql = "SELECT service.serviceName,project.projectName,project_sercice.Id FROM project_sercice LEFT JOIN service ON service.Id = project_sercice.serviceId LEFT JOIN project ON project_sercice.projectId = project.Id LIMIT " + pagenum * 10 + ",10";
        
        if(id)
            sql = "SELECT * FROM project_sercice where Id = "+ id +" limit " + pagenum * 10 + ",10";
        
        dbapi.sqlQuery(sql,function(data,err){
            result.aaData = data.aaData;
            sql = "select count(1) as count from project_sercice";
            if(id)
                sql = "select count(1) as count from project_sercice where Id = " + id;
                dbapi.sqlQuery(sql,function(data2,err){
                    result.err = errObj.success;
                    result.page = data2.aaData;
                    callback && callback(result);
                });
        });
    },

    // 添加
    insert_proAndSer: function(data, callback) {
        var serviceId = data.serviceId || null;
        var projectId = data.projectId || null;

        if (!projectId || !serviceId) {
            var result = errObj.dataLose;
            callback && callback(result);
        } else {
            var sql = 'INSERT INTO project_sercice (serviceId,projectId) VALUES ("' + serviceId.trim() + '","' + projectId.trim() + '")';
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
    update_proAndSer:function(data,callback){
        var Id = data.Id || null;
        var serviceId = data.serviceId || null;
        var projectId = data.projectId || null;

        if(!serviceId || !projectId || !Id){
            var result = errObj.dataLose;
            callback && callback(result);
        }else{
            var sql = 'UPDATE project_sercice SET serviceId = "' + serviceId.trim() + '",projectId = "' + projectId.trim() + '" where Id = ' + Id.trim();
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
    delete_proAndSer:function(data,callback){
        var Id = data.Id || null;
        if(!Id){
            var result = errObj.dataLose;
            callback && callback(result);
        }else{
            var sql = 'DELETE FROM project_sercice WHERE Id  = ' + Id;
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
