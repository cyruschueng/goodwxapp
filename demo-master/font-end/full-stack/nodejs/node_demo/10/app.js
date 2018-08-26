//引入模块
var http=require('http')
//创建服务
var server=http.createServer(function(req,res){
	//相当于action都在这里定义
	//响应头
	res.writeHead(200,{'Content-Type':'text/html'});
	//相应内容
	res.write('<h1>Node.js</h1>');
	//结束响应
	res.end('<p>PCAT111111111</p>');
//监听端口
})
server.listen(3000);
server.on('close',function(){
	console.log('server is close');
})
console.log('HTTP server is listening at port 3000.');