//admin.js
var express = require('express');
var router = express.Router();
var db = require('../models/db.js');
var async = require('async');


router.post('/query',function (req,res,next) {
	var name = req.body.name
	console.log(name)
	//字符串匹配查询
	var sql = 'SELECT sum_rank.sum ,sum_rank.account, sum_rank.name, sum_rank.intelligence, intelligence_rank.rank AS irank, sum_rank.sports , sports_rank.rank AS srank, sum_rank.morality, morality_rank.rank AS mrank, sum_rank.rank FROM `sum_rank` JOIN `sports_rank` ON sum_rank.account = sports_rank.snum JOIN `morality_rank` ON sum_rank.account = morality_rank.snum JOIN `intelligence_rank` ON sum_rank.account = intelligence_rank.snum WHERE sum_rank.name like '+"\'%"+name+"%\'";
	//看好上述语句的转义字符，不加的话 SQL语句报错，因为name 需要用''括起来.这是个坑。
	db.query(sql,function (err,result) {
		console.log(err)
		console.log(result)
		res.json(result)
	})

})
router.post('/add',function (req,res,next) {
	console.log(req.body)
	var name = req.body.name
	var snum = req.body.snum
	var intelligence = req.body.intelligence
	var morality = req.body.morality
	var sports = req.body.sports
	//增加用户
	var sql = 'INSERT INTO `student`.`user` (`account`, `psw`, `sname`) VALUES ('+"\'"+snum+"\', MD5('123456'), "+"\'"+name+"\')"
	var sqlI='INSERT INTO `student`.`intelligence` (`snum`, `score`) VALUES ('+"\'"+snum+"\',\'"+intelligence+"\')" 
	var sqlM='INSERT INTO `student`.`morality` (`snum`, `score`) VALUES ('+"\'"+snum+"\',\'"+morality+"\')" 
	var sqlS='INSERT INTO `student`.`sports` (`snum`, `score`) VALUES ('+"\'"+snum+"\',\'"+sports+"\')" 

	console.log(" SQL语句");
	console.log(sqlI);
	db.query(sql,function(err,result){
		console.log(" 增加操作结果");
		console.log(result);
		if(err){
			res.send(err.error)
		}
		db.querySimple(sqlI)
		db.querySimple(sqlM)
		db.querySimple(sqlS)

		res.json(result)
	})

})
//修改数据
router.post('/update',function (req,res,next) {
	console.log(req.body)
	var snum = req.body.snum
	var intelligence = req.body.intelligence
	var morality = req.body.morality
	var sports = req.body.sports
	//增加用户
	//UPDATE  `student`.`intelligence` SET  `score` =  '89' WHERE  `intelligence`.`snum` =  '1108404062';
	var sqlI='UPDATE `student`.`intelligence` SET `score` ='+"\'"+intelligence+"\' WHERE  `intelligence`.`snum` ="+"\'"+snum+"\'"
	var sqlM='UPDATE `student`.`morality` SET `score` ='+"\'"+morality+"\' WHERE  `morality`.`snum` ="+"\'"+snum+"\'"
	var sqlS='UPDATE `student`.`sports` SET `score` ='+"\'"+sports+"\' WHERE  `sports`.`snum` ="+"\'"+snum+"\'"

	console.log(" SQL语句");
	console.log(sqlI);
	db.query(sqlI,function(err,result){
		console.log(" 增加操作结果");
		console.log(result);
		if(err){
			res.send(err.error)
		}
		db.querySimple(sqlM)
		db.querySimple(sqlS)

		res.json(result)
	})

})
//删除数据
router.post('/delete',function (req,res,next) {
	console.log(req.body)
	var snum = req.body.snum
	//DELETE FROM `student`.`user` WHERE `user`.`account` = '1108404064';
	var sql='DELETE FROM `student`.`user` WHERE `user`.`account`='+"\'"+snum+"\'"

	console.log(" SQL语句");
	console.log(sql);
	db.query(sql,function(err,result){
		console.log(" 增加操作结果");
		console.log(result);
		if(err){
			console.log(err);
			res.send(err.error)
		}
		res.json(result)
	})

})

router.get('/',function (req,res,next) {
	res.render('admin-login')
})



module.exports = router; 