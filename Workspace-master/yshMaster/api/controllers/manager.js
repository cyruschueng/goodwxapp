

var crypto = require('crypto');
exports.name='Manager';  //模块名称，必填

exports.getManagerById= function ( req, res, next  ) {
	global.models.Manager
	.findOne(
		{ where: {user_id: req.params.userid} }
		)
	.then( function(result) {
	  console.log(
	    'manager -->',
	    JSON.stringify(result, null, 2)

	  );
	  	res.send(JSON.stringify(result, null, 2));
	    next();
	});
};

exports.login= function ( req, res, next  ) { 
	global.models.Manager
	.findOne(
		{ where: {user_name: req.params.username} }
		)
	.then( function(result) {
	  console.log(
	    'manager -->',
	    JSON.stringify(result, null, 2)

	  );
	  	var model=JSON.stringify(result, null, 2);
	  	var hasher=crypto.createHash("md5");
		hasher.update(req.params.password);
		var hashmsg=hasher.digest('hex') + result.ec_salt;
		
		hasher=crypto.createHash("md5"); //重新初始化
		hasher.update(hashmsg);
		hashmsg=hasher.digest('hex');
		var data={};
		if (result.password==hashmsg) {
			data.state=1;
			data.msg='登录成功';
			console.log(req.params.username +'已登录');
		}else{
			data.state=0;
			data.msg='用户名或密码错误';
			console.log(req.params.username +'登录失败，用户名或密码错误');
		};
	  	res.send(data);
	    next();
	});
};



