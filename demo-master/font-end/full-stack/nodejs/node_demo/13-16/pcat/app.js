
/**
 * Module dependencies.
 */
/*引用模块*/
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , util=require('util')
  , path = require('path')
  ,engine=require('./system');
/*实例化express对象*/
var app = express();

/*配置app的参数和启用中间件*/
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  //告诉我们的页面模版目录
  app.set('views', __dirname + '/views');
  //告诉它我们使用那种模版引擎
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

//配置开发模式
app.configure('development', function(){
  app.use(express.errorHandler());
});
//指定路由控制
app.get('/', routes.index);
app.get('/pcat', routes.pcat);
app.get('/user/:username',function(req,res){
            res.send("user ："+req.params.username);
        });

app.get('/users', user.list);
app.all('/test/:username',function(req,res,next){
	console.log("all methods is call");
	//我们在这里验证用户名是否存在。
	//如果存在直接send或者调用next(new Error('用户已经存在'));
	//如果不存在我们调用next()把控制权交给下一个路由规则
	next();
	res.send('all的路由规则完毕。')
});
 app.get('/test/:username',function(req,res){
     res.send("user："+req.params.username)
})
app.get('/abc',routes.pcat)
//改造ejs引擎中的方法
app.engine('ejs', engine);
//将layout的模版布局模版设置为默认
app.locals._layoutFile='layout'
//片段视图
app.get('/list',function(req,res){
	res.render('list',{
		title:'片段视图',
		items:['marico',1991,'pcat']
	})
});
//视图助手
app.locals({
	inspect:function(obj){
		return util.inspect(obj,true)+"    解析成功";
	}
})
app.get('/view',function(req,res){
	res.locals({
		headers:function(req,res){
			return req.headers;
		}
	})
	res.render('view',{title:"PCAT"});
})
//创建服务并监听端口
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
