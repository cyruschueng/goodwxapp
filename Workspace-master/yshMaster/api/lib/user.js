
var bunyan=require('bunyan');
var log=bunyan.createLogger({
	name:'API',
	streams: [
    {
      level: 'info',
      path: './logs/info.log'
    },
    {
      level: 'error',
      path: './logs/error.log'
    }
  ]
})
exports.GetUser=function GetUserByID (req,res,next){
	log.info('通过用户ID获取用户信息');
<<<<<<< HEAD
  res.setHeader('Access-Control-Allow-Origin','*') //允许JS跨域访问

	res.send('hello ' + req.params.name );
=======
  res.setHeader('Access-Control-Allow-Origin','*');
  

	res.send('hello ' + req.params.name);
>>>>>>> 47f59e93859b8961f43d27b3bf81678fffc07f85
	next();
};
exports.Login=function login(req,res,next){
  
};