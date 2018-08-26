var dbapi=require('../lib/dbapi.js');
var log=function(s){
	console.log(s);
}
exports.db=function (database){

this.ysh=dbapi.proapi;
this.api=dbapi.proapi;
this.replace=dbapi.replace;

	var mysql = require('mysql');


var mysql = require('mysql');
// var pool = mysql.createPool({
//    host: '125.69.76.104',
// 	    user: 'root',
// 	    password: 'ysh2015',
// 	    database:database,
// 	    port: 3306
// });

var pool = mysql.createPool({
   host: '112.74.72.127',
	    user: 'ysh_www',
	    password: '369***///',
	    database:database,
	    allowMultiQueries:true,
	    port: 3306
});

    //获取一行数据
	this.getRow=function (sql,ret){
	
		poolQuery(sql,function(rows,err){
			if(rows){
				ret(rows[0],err);

			}else{
				ret(null,err);
			}
		});

	}  


		//获取表
	this.getAll=function (sql,ret,param){
		

		poolQuery(sql,ret,param);
	}


	this.exec=function(sql){
		conn.query(sql,function(err,rows,fields){
			
		});
	}




	


	function poolQuery(selectSQL,ret,param){
	
		pool.getConnection(function (err, conn) {
		    if (err) log("POOL ==> " + err);
		    var x=selectSQL.indexOf(":",0);
		    var sql=selectSQL;
		    var key=null;
		    if(x>0 && x<15){
		    	key=selectSQL.substring(0,x);
		    	key=key.trim();
		    	sql=selectSQL.substring(x+1,sql.length).trim();

		    }
		    // log('+++++++++'+sql);
		    conn.query(sql,function(err,rows){
		        if (err){
		        	err.sql=sql;
		        	console.log(err);	

		        } else{
		        	// log(rows);
		        }


		        if(key){
		        	var r={};
		        	r[key]=rows;
		        	ret(r,err,param);	
		        }else
		       		 ret(rows,err,param);
		        conn.release();
		    });
		});

	}
}

exports.mssql=function (database){



var sql = require('mssql');

var config0 = {
    user: 'imayi',
    password: '85546977!',
    server: '125.64.14.125', // You can use 'localhost\\instance' to connect to named instance
    database: 'imayi',
    port:13311,
    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
}
var config = {
    user: 'sa',
    password: '123',
    server: '10.2.10.220', // You can use 'localhost\\instance' to connect to named instance
    database: 'test_jiuzhoucommmerce',
    port:1433,
    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
}
var request;

sql.connect(config, function(err) {
   log(err);


     request = new sql.Request();
    request.query('select top 3 * from AreaInfo', function(err, recordset) {
       	log(recordset);
    });

    

});

this.ysh=dbapi.proapi;
this.api=dbapi.proapi;
this.replace=dbapi.replace;

	var mysql = require('mysql');


var mysql = require('mysql');
var pool = mysql.createPool({
   host: '10.2.10.100',
	    user: 'root',
	    password: 'ysh2015',
	    database:database,
	    port: 3306
});





    //获取一行数据
	this.getRow=function (sql,ret){
	
		poolQuery(sql,function(rows,err){
			ret(rows[0],err);
		});

	}  


		//获取表
	this.getAll=function (sql,ret){
		

		poolQuery(sql,ret);
	}
	this.exec=function(sql){
		conn.query(sql,function(err,rows,fields){
			
		});
	}




	
	function poolQuery(selectSQL,ret){
		log(selectSQL);
	request.query(selectSQL, function(err, rows) {
       log(rows);

		        if (err){
		        	err.sql=selectSQL;
		        	log(err);	

		        } 
		        
		        ret(rows,err);
		        
		    });
	

	}


	function poolQueryMysql(selectSQL,ret){
	
		pool.getConnection(function (err, conn) {
		    if (err) log("POOL ==> " + err);

		    conn.query(selectSQL,function(err,rows){
		        if (err){
		        	err.sql=selectSQL;
		        	log(err);	

		        } 
		        
		        ret(rows,err);
		        conn.release();
		    });
		});

	}
}

