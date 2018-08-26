"use strict";
/**
 * The api for DataBase
 */
var config = require('../config/config.js');
var errobj = require('./err.js');
var errStatus = errobj.InitErr();
var mssql = require('mssql');
var mysql = require('mysql');
var pool  = mysql.createPool({
    host            : config.mysql.host,
    user            : config.mysql.user,
    password        : config.mysql.password,
    database        : config.mysql.database,
    multipleStatements: true
});

exports.dbPool = function(){
    return pool;
};

//The Object For Call Sql
var dbapi = {
	sqlQuery:function(sql,callback){
		poolQuery(sql,function(rows, err){
			callback && callback(rows,err);
		});
	},
	connection:function(){
		pool.getConnection(function(err,conn){
			return conn;
		});
	}
};

exports.dbapi = function(){
    return dbapi;
};


function poolQuery(selectSQL,callback){
	var status = null;
	pool.getConnection(function(err, conn) {
		if(!err){
			//Connection Success
			var sql = selectSQL;
			conn.query(sql,function(err,rows){
				if(!err){
					status = errStatus.success;
					status.aaData = rows;
				}else{
					status = errStatus.SQLFail;
				}
				conn.release();
				callback && callback(status);
			});
		}else{
			status = errStatus.connFail;
			callback && callback(status);
		}
	});
}