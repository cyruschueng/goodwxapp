var path = require('path')
var fs = require("fs");
var express = require('express')
var app = express()


// 数据库
// var mysql = require('mysql');
// //链接数据库
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '123456',
//     database: 'test'
// });

// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function(error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
// });




// 将请求响应解析到body的中间件
var bodyParser = require('body-parser')
// 解析 Content-Type:application/x-www-form-urlencoded 的请求到 req.body
app.use(bodyParser.urlencoded({ extended: false }))
// 解析 Content-Type:json 的请求到 req.body
app.use(bodyParser.json())

// 读写cookie的中间件
var cookieParser = require('cookie-parser')
app.use(cookieParser())


// 静态文件资源，做静态文件服务器，js、css、html资源等
var projPath = process.cwd() //工作目录
console.log(projPath)
console.log(__dirname) //_dirname文件所在目录
// js,css资源
console.log("123", path.join(projPath, '/public/js'))
app.use(express.static(path.join(projPath, '')))
app.use(express.static(path.join(projPath, '')))


app.get('/', function(req, res, next) {
    res.redirect('/page/login.html')
})

//读取文件
app.get("/page/login.html", function(request, response) {
    console.log("./" + request.path); // .//page/index.html
    console.log("./" + request.path.substr(1)); // ./page/index.html
    fs.readFile("./" + request.path.substr(1), function(err, data) {
        if (err) {
            console.log(err);
            //404：NOT FOUNDw
            response.writeHead(404, { "Content-Type": "text/html" });
        } else {
            //200：OK
            response.writeHead(200, { "Content-Type": "text/html" });
            response.write(data.toString());
        }
        response.end();
    });
});

// 修改侦听服务器端口
var port = 8080
app.listen(port)
console.info(`Listen on Port ${port}`)