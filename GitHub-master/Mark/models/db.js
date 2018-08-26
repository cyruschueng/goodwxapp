var mysql   = require('mysql');
//为了方便对查询结果的操作，
//这里加一个callback()
//不能用 return 的方式返回数据
//因为这是一个蛋疼的异步操作
function query(sql,callback){
	var re = null;
	//连接数据库
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : 'root',
	  database : 'student',
	});
	connection.connect();
	//查询执行 SQL语句
	connection.query(sql,function (err, result) {
			connection.end();
			//引入callback处理数据
			callback(err,result)

	        /*if(err){
	          console.log('[SELECT ERROR] - ',err.message);
	          return 0;
	        }*/


	        /*
		        return的方式 不能成功获取到结果值。
		        因为异步操作 存在时延
		        re = result
		        console.log('回调')
		        console.log(re);
		        return re;
		    */


       /*console.log('--------------------------SELECT----------------------------');
       console.log(result.length); 
       console.log(result); 
       console.log('-----------------------------------------------------------------\n\n');*/        
	});

	
/*console.log("db.js");	
return re;
setTimeout('console.log(re)',2000)*/

	//断开连接
	//connection.end(); 这样直接断开连接出错。https://cnodejs.org/topic/51307ed7df9e9fcc589cd18b
}

function querySimple(sql){
	var re = null;
	//连接数据库
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : 'root',
	  database : 'student',
	});
	connection.connect();
	//查询执行 SQL语句
	connection.query(sql,function (err, result) {
			connection.end();
			if(err){
				console.log(err);
			}
	});

}
//这样写出错
//module.exports = query;
exports.query = query;
exports.querySimple = querySimple;