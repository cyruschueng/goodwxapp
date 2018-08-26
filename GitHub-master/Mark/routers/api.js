var express = require('express');
var router = express.Router();
var db = require('../models/db.js');
var md5 = require('md5')

//处理管理员登录
router.post('/admin/login',function (req,res,next) {
	//因为在APP.js中配置了body-parser,
	//它会把处理后的请求数据，放在req里
	//console.log(req.body);
	var userName = req.body.userName;
	var password = req.body.password;
	console.log(" 表单传输的结果");
	console.log(userName);
	var sql = 'SELECT * FROM  `admin` where account = '+userName;
	db.query(sql,function (err,result) {
		if(err){
			console.log(err)
			res.send('查询出错'+err.massage)
			return
		}
		if (result.length == 0) {
			res.send('查询没有查询到相关记录')
			return
		}
		var psw = md5(password);

		if (psw == result[0].psw) {
			console.log('密码正确')
			getAll(res,result[0].sname)
		}
	})
	
})
//处理用户登录
router.post('/user/login',function (req,res,next) {
	//因为在APP.js中配置了body-parser,
	//它会把处理后的请求数据，放在req里
	//console.log(req.body);
	var userName = req.body.userName;
	var password = req.body.password;
	var sql = 'SELECT * FROM  `user` where account = '+userName;
	db.query(sql,function (err,result) {
		if(err){
			console.log(err)
			res.send('查询出错'+err.massage)
			return
		}
		if (result.length == 0) {
			res.send('查询没有查询到相关记录')
			return
		}
		var psw = md5(password);

		if (psw == result[0].psw) {
			console.log('密码正确')
			getOne(res,result[0].sname,result[0].account)
		}
	})
	
})

//获取所有信息
function getAll(res,u){
	var allBySnum = null;//按学号排名
	var allBySocre = null //按成绩排名

	//var result = db.query('SELECT * FROM  `user` LIMIT 0 , 5');
	var sql = 'SELECT * FROM  `sum_rank`';
	db.query(sql,function (err,result) {
		if(err){
			console.log(err)
			res.send('查询出错'+err.massage)
			return
		}
		if (result.length == 0) {
			res.send('查询没有查询到相关记录')
			return
		}

		allBySnum = result;
		//把它放在这里，就确保了allBySnum已经查询了出来
		//查询allByScore
		var sql = 'SELECT * FROM  `sum_rank` order by sum desc';
		db.query(sql,function (err,result) {

			allBySocre = result;
			//返回数据
			//JavaScript异步的特性，必须把渲染的写进回调函数里。
			res.render('admin-main',{
				arrSnum:allBySnum,
				arrScore:allBySocre,
				user:u
			})
		})
	})
}
//获取一条学生的信息 u:用户名 s:学号
function getOne(res,u,s){
	var sql = 'SELECT sum_rank.account, sum_rank.name, sum_rank.intelligence, intelligence_rank.rank AS irank, sum_rank.sports , sports_rank.rank AS srank, sum_rank.morality, morality_rank.rank AS mrank, sum_rank.sum, sum_rank.rank FROM `sum_rank` JOIN `sports_rank` ON sum_rank.account = sports_rank.snum JOIN `morality_rank` ON sum_rank.account = morality_rank.snum JOIN `intelligence_rank` ON sum_rank.account = intelligence_rank.snum WHERE account ='+s;

	db.query(sql,function(err,result){
		if(err){
			console.log(err)
			res.send('查询出错'+err.massage)
			return
		}
		if (result.length == 0) {
			res.send('查询没有查询到相关记录')
			return
		}

		res.render('user-main',{
			user:u,
			arrOne:result

		})
	})
}

module.exports = router; 