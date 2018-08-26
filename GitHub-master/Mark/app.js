var express = require('express');
var swig    = require('swig');
var mysql   = require('mysql');
var bodyParser = require('body-parser')
var app     = express();

//配置应用模板
app.engine('html', swig.renderFile);
app.set('views', './views');
app.set('view engine', 'html');
//取消缓存
swig.setDefaults({cache: false});
//bodyparser设置
app.use( bodyParser.urlencoded({extended: true}) );
//路由管理
//静态文件托管
app.use( '/public', express.static( __dirname + '/public') );
//动态路由
//根据不同的功能划分模块
app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));

/*app.get('/',function (req,res,next) {
	//res.send('hello world')
	res.render('index')
});*/

app.listen(8888)