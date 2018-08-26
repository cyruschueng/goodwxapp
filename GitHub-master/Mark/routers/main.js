var express = require('express');
var router = express.Router();
var db = require('../models/db.js')

router.get('/',function (req,res,next) {
	//res.send('首页')
	//渲染登录模板
	res.render('user-login')
})

module.exports = router; 