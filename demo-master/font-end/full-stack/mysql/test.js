/*
* @Author: zhangjiayuan
* @Date:   2017-09-22 08:44:13
* @Last Modified by:   zhangjiayuan
* @Last Modified time: 2017-09-22 08:45:40
*/

// 'use strict';


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'test'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});