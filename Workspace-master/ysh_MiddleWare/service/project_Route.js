var err = require("../common/err.js");
var sql = require("../common/dbapi.js");
var dbapi = sql.dbapi();
var errObj = err.InitErr();

exports.project_RouteAPI = {
    // 查询
    select_proAndRoute:function(data,callback){
        var pagenum = parseInt(data.num) || 0;
        var id = parseInt(data.Id) || null;
        var result = new Object();
        var sql = "SELECT sys_route.route,sys_route.Interface,sys_route.cmd,project.projectName,route_project.Id FROM route_project LEFT JOIN sys_route ON sys_route.Id = route_project.routeId LEFT JOIN project ON route_project.projectId = project.Id LIMIT " + pagenum * 10 + ",10";
        
        if(id)
            sql = "SELECT * FROM route_project where Id = "+ id +" limit " + pagenum * 10 + ",10";
        
        dbapi.sqlQuery(sql,function(data,err){
            result.aaData = data.aaData;
            sql = "select count(1) as count from route_project";
            if(id)
                sql = "select count(1) as count from route_project where Id = " + id;
                dbapi.sqlQuery(sql,function(data2,err){
                    result.err = errObj.success;
                    result.page = data2.aaData;
                    callback && callback(result);
                });
        });
    },

    // 添加
    insert_proAndRoute: function(data, callback) {
        var routeId = data.routeId || null;
        var projectId = data.projectId || null;

        if (!projectId || !routeId) {
            var result = errObj.dataLose;
            callback && callback(result);
        } else {
            var sql = 'INSERT INTO route_project (routeId,projectId) VALUES ("' + routeId.trim() + '","' + projectId.trim() + '")';
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
    update_proAndRoute:function(data,callback){
        var Id = data.Id || null;
        var routeId = data.routeId || null;
        var projectId = data.projectId || null;

        if(!routeId || !projectId || !Id){
            var result = errObj.dataLose;
            callback && callback(result);
        }else{
            var sql = 'UPDATE route_project SET routeId = "' + routeId.trim() + '",projectId = "' + projectId.trim() + '" where Id = ' + Id.trim();
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
    delete_proAndRoute:function(data,callback){
        var Id = data.Id || null;
        if(!Id){
            var result = errObj.dataLose;
            callback && callback(result);
        }else{
            var sql = 'DELETE FROM route_project WHERE Id  = ' + Id;
            var result = new Object();
            dbapi.sqlQuery(sql,function(data,err){
                if(!err){
                    result.err = errObj.success;
                    result.aaData = data.aaData;
                }else{
                    result.err = errObj.success;route_project
                }
                callback && callback(result);
            });
        }
    }
}
