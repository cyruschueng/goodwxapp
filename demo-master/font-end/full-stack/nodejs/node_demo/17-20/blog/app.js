
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  ,engine=require('./expand_modules/ejs')
  , util=require('util')
  , path = require('path')
  , connect=require("connect")
  , MongoStore = require('connect-mongo')(connect)
  , settings = require('./settings');

var app = express();
//改造ejs引擎中的方法
app.engine('ejs', engine);
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set("view options", {
  layout: true
});
  //设置默认模版路径
  app.locals._layoutFile='layout'
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  //使用cookie中间件
  app.use(express.cookieParser());
  //会话中间件，存放在mongodb中
  app.use(express.session({
      secret:settings.cookieSecret,
      store:new MongoStore({
          db:settings.db
      })
  }));
 //使用中间件来返回成功和失败的信息
  app.use(function(req, res, next){
        //声明变量
        var err = req.session.error
            , msg = req.session.success;
        //删除会话中原有属性
        delete req.session.error;
        delete req.session.success;
        //将错误和正确信息存放到动态试图助手变量中。
        res.locals.message = '';
        if (err) res.locals.message = '<div class="alert alert-error">' + err + '</div>';
        if (msg) res.locals.message = '<div class="alert alert-success">' + msg + '</div>';
        next();
  });
    //使用中间件把user设置成动态视图助手
    app.use(function(req, res, next){
        res.locals({
            user:req.session.user
        })
        next();
    })
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});
app.configure('development', function(){
  app.use(express.errorHandler());
});
/*路由规划*/
app.get('/', routes.index);
app.get("/u/:user",routes.user); //用户的主页
app.post('/post',routes.post);   //发表信息
app.get('/reg',routes.reg); //用户注册
app.post('/reg',routes.doReg);
app.get('/login',routes.login);//用户登录
app.post('/login',routes.doLogin);
app.get('/logout',routes.logout);//用户退出
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
