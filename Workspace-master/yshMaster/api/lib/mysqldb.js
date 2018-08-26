var mysql=require('mysql');
var connection = mysql.createConnection({
  host     : '120.25.223.215',
  user     : 'root',
  password : 'ysh2015',
  database : 'ysh_shop'
});

exports.query=function(sql){
	connection.connect();

	connection.query(sql, function(err, rows, fields) {
	    if (err) throw err;
		for (var i in rows) {
                console.log(rows[i]);
        }
        console.log('db_query:'+ sql);
        return rows;
	});

	connection.end();	
}
