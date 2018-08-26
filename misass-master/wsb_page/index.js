var app = require('koa')();//koa web应用
var serve = require('koa-static-server');
var routerApi = require("koa-router")();//路由中间件
var sendfile = require('koa-sendfile');
const path = require('path');


app.use(require(path.join(__dirname,'routers/index.js'))().routes());//登录路由
routerApi.get('/', function *() {//根路由
    this.redirect('/index.html');//重写向到首页
    this.status = 301;
});


app.use(serve({rootDir: '.'}));
app.use(routerApi.routes());

app.use(function *(next) {
    if (this.status == 404) {
        this.redirect('/404');
    } else if (this.status == 500){
        this.redirect('/500');
    } else {
        yield next;
    }
});
app.listen(3000, function () {
    console.log('已开启服务：localhost: '+3000);
});