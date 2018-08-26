exports.name = 'business'; //模块名称，必填
var uuid = require('node-uuid');
var sms = require('../controllers/sms');
var laytpl = require('laytpl');
var log = global.log;
//getRoleInherit0();
var cmds = {
	write: "insert into log (title,dt,content,type) select '[title]',now(),'[content]',typeid from  logtype where fname='[fname]'",
	getall: "select * from log left join logtype on log.type=logtype.typeid",

}

exports.log = function(req, res, next) {
	var pd = init(req, res, next);

	if(cmds[pd.cmdin] == null) {
		pd.r.msg = "cmd wrong";
		res.send(pd.r);
		return;
	}
	var sql = global.logs.replace(pd.params, cmds[pd.cmdin]);
	global.logs.getAll(sql, function(ret, err) {
		if(err) {
			pd.r.msg = "sql wrong";
			pd.r.errinfo = err;
			pd.r.sql = sql;
		} else {
			pd.r.aaData = ret;
			pd.r.msg = "success";
		}
		res.w(pd.r);
	});
}

var update = "function xx(){	res.send('dd');};xx()";
exports.ysh = function(req, res, next) {
	console.log('start params:' + req.params.cmd);
	console.log('sesskey:' + req.params.sesskey);
	var pdata = init(req, res, next);
	if(pdata.cmdin == 'getRoleInherit') {
		getRoleInherit(pdata, res);
		return;
	}

	if(pdata.cmdin == 'getSesskey') {
		var sesskey = uuid.v1();
		var sql = "insert into Sys_Sessions set sesskey='" + sesskey + "',createdt=now(),ip='" + pdata.params.ip + "',data='{}'";
		global.db.getAll(sql, function(rd, err) {
			if(err) {
				pdata.r.err = err;
				pdata.r.state = 301;
				pdata.r.msg = '生成sesskey 失败,请联系管理员';
			} else {
				pdata.r.sesskey = sesskey;
			}
			out(res, pdata.r);
		})
		next();
		return;
	}

	//获取用户身份
	if(!pdata.params.sesskey) {
		pdata.params.sesskey = '';
	}

	var sql = "select * from Sys_Sessions where sesskey='" + pdata.params.sesskey + "'";
	global.db.getAll(sql, function(rd, err) {
		if(err) {
			pdata.r = {
				state: -1,
				msg: '系统错误'
			};
			out(res, pdata.r);
		} else {
			if(rd.length > 0) { //找到
				for(var k in rd[0]) {
					pdata.params[k] = rd[0][k];
				}
				getAutCmd(pdata, function(ret) {
					if(ret) {
						if(ret.AuthorityCmd) {
							pdata.cmdin = ret.AuthorityCmd
							pdata.params.cmd = ret.AuthorityCmd
							pdata.Authority = "yes"
						}
					}
					ysh1(pdata, res);
				});
			} else { //未找到
				pdata.ecode = 401;
				sendErr(pdata, res);
				return;
			}
		}
	})
	next();
}

var ysh1 = function(pdata, res) {
	if(pdata.cmdin == 'UpdateRecord' || pdata.cmdin == 'InsertRecord' || pdata.cmdin == 'BatchDeleteRecord' || pdata.cmdin == 'DeleteRecord') {
		if(pdata.params.api) {
			pdata.cmdin = pdata.params.api;
			pdata.params = toObj(pdata.params.sp);
			login(pdata, res);
			return;
		}
	}

	if(pdata.cmdin == 'getPID') {
		pdata.cmdin = 'GetActionInfo';
		getPID(pdata, res);

	} else if(pdata.cmdin == 'getList') {

		getList(pdata, res, 'getList');
	} else if(pdata.cmdin == 'getEditData') {
		var sql = "select * from Pag_ColInfo where TABLE_NAME='" + pdata.params.tbname + "' and ShowAdd=1";
		global.db.getAll(sql, function(rd, err) {
			if(!err) {
				var se = '';
				for(i in rd) {
					if(se) {
						se += ",";
					}
					se += rd[i].COLUMN_NAME;
				}
				pdata.params.se = se;
				login(pdata, res);
			}
		})
	} else if(pdata.cmdin == 'getDetailData') {
		getList(pdata, res, 'getDetail');

	} else if(pdata.cmdin == 'BatchDeleteRecord') {

		var ids = toObj(pdata.params.did);
		if(!ids) {
			pdata.r = {
				state: -1,
				msg: 'did错误'
			}
			out(res, pdata.r);
			return;
		}

		var wh = '';
		for(var i in ids) {
			if(wh) wh += ' or ';
			wh += 'Id=' + ids[i];
		}
		pdata.params.wh = wh;
		pdata.params.did = null;
		login(pdata, res);

	} else if(pdata.cmdin == 'updateMyCart') {
		updateMyCart(pdata, res);
	} else if(pdata.cmdin == 'getSms') {
		getSms(pdata, res);
	} else if(pdata.cmdin == 'writejs') {
		update = pdata.params.js;
		res.send(pdata.params.js);

	} else if(pdata.cmdin == 'UpdateRecord') {

		UpdateRecord(pdata, res);
	} else if(pdata.cmdin == 'updateDbdd') {

		dbdd(pdata, res);
	} else if(pdata.cmdin == 'test000') {

		test000(pdata, res);
	} else if(pdata.cmdin == 'InsertRecord') {

		InsertRecord(pdata, res);

	} else {
		login(pdata, res);
	}

}

// function getRoleInherit(pdata, res) {
// 	var sql = "select * from User_Role_Inherit";

// 	global.db.getAll(sql, function(d, err) {
// 		if(err) {
// 			pdata.ecode = 903;
// 			pdata.err = err;
// 			sendErr(pdata, res);
// 		} else {
// 			var roles = {};
// 			for(var i in d) {
// 				roles[d[i].Id] = d[i];
// 			}

// 			pdata.r.aaData = d;
// 			out(res, pdata.r);
// 		}
// 	})
// }

// function getRoleInherit0() {
// 	var sql = "select * from User_Role_Inherit";
// 	global.db.getAll(sql, function(d, err) {
// 		if(err) {
// 			console.log(err);
// 		} else {
// 			var roles = {};
// 			for(var i in d) {
// 				roles[d[i].Id] = d[i];
// 			}
// 			global.roles = roles;

// 		}
// 	})
// }

function test000(pdata, res) {
	pdata.r.msg = pdata.params;
	login(pdata, res);
}

function updateMyCart(pdata, res) {
	var d = toObj(pdata.params.goods);
	if(!d) {
		pdata.r.msg = 'goods 错误';
	} else {
		var s = '';
		for(var i in d) {
			if(s) s += ',';
			s += '(1041,' + d[i].goods_id + ',' + d[i].goods_price + ',' + d[i].goods_number + ')';
		}

		pdata.params = {
			vs: s,
			sesskey: pdata.params.sesskey
		};
		login(pdata, res);

	}
}

function toObj(s) {

	try {
		var obj = JSON.parse(s);
		if(obj) {
			for(k in obj) {
				if(typeof(obj[k]) == 'object') {
					for(k1 in obj[k]) {
						val = obj[k][k1];
						if('string' == typeof val) {
							val = val.trim();

							if(val != null) val = val.replace(/'/g, "\\'");
						}
						obj[k][k1] = val;
					}
				} else {
					val = obj[k];
					if('string' == typeof val) {
						val = val.trim();

						if(val != null) val = val.replace(/'/g, "\\'");
					}
					obj[k] = val;
				}

			}
			return obj;
		}

	} catch(e) {
		return null;
	}
}

function UpdateRecord(pdata, res) {

	var sp = toObj(pdata.params.sp);

	if(!sp) {
		pdata.r.state = -1;
		pdata.r.msg = 'not is json data';
		out(res, pdata.r);
		return;
	}
	var ssql = '';
	for(var tbname in sp) {
		var caluse = '';
		var key_value = '';
		for(var field in sp[tbname]) {
			if(field == "did") {
				caluse = "id = " + sp[tbname][field];
			} else {
				key_value += field + " = '" + sp[tbname][field] + "',";
			}
		}
		if(key_value.length) {
			key_value = key_value.substring(0, key_value.length - 1);
		}

		var sql = "update " + tbname + " set " + key_value + " where " + caluse;
		global.db.getAll(sql, function(rd, err) {
			if(err) {
				pdata.state = -1;
				pdata.msg = err;
			} else {
				pdata.aaData = rd;
			}

			out(res, pdata.r);
		});
	}
}

function getSms(pdata, res) {
	var smsCode = MathRand();
	var content = "感谢您使用源生汇农产品溯源电商平台，验证码：" + smsCode;
	sms.sendSms(pdata.params.m, content, function(smsr) {
		if(smsr.body = '100') {
			pdata.params.smsCode = smsCode;
			login(pdata, res);
		} else {
			pdata.r.state = -1;
			pdata.r.msg = '获取验证码失败，短信服务器异常';
			out(res, pdata.r);
		}
	});
}

function MathRand() {
	var Num = "";
	for(var i = 0; i < 4; i++) {
		Num += Math.floor(Math.random() * 10);
	}
	return Num;
}

function InsertRecord(pdata, res) {

	var sp = toObj(pdata.params.sp);
	if(!sp) {
		pdata.r.state = -1;
		pdata.r.msg = 'not is json data';
		out(res, pdata.r);
		return;
	}
	var ssql = '';
	for(var tbname in sp) {
		var fields = '(';
		var values = '('
		for(var field in sp[tbname]) {
			if(fields != '(') fields += ',';
			fields += field;
			if(values != '(') values += ',';
			values += "'" + sp[tbname][field] + "'";
		}
		values += ')';
		fields += ')';
		values = ' values' + values;
		var sql = "insert into " + tbname + " " + fields + values;
		global.db.getAll(sql, function(rd, err) {
			if(err) {
				pdata.state = -1;
				pdata.msg = err;
			} else {
				pdata.aaData = rd;
			}

			out(res, pdata.r);
		});

	}

}

function getList(pdata, res, api) {

	var wh = '';
	var sp = toObj(pdata.params.sp);
	var lk = toObj(pdata.params.lk);

	var s;
	for(var i in sp) {
		if(sp[i] == 0 || sp[i] == '') continue;

		var ty = typeof(sp[i]);
		var spi;
		if(lk && lk[i] == 1)
			spi = i + " like '%" + sp[i] + "%'";
		else
			spi = i + "='" + sp[i] + "'";

		if(ty == 'object') {
			if(sp[i].stime && sp[i].etime) {

				spi = "(" + i + ">='" + sp[i].stime + "' and " + i + "<'" + sp[i].etime + "')";
			}
		}
		if(wh) {
			wh += " and ";
		}
		wh += spi;
	}

	var ssql = "select " + pdata.params.se + " from " + pdata.params.tb;
	if(wh) {
		ssql += " where " + wh;
	}
	if(pdata.params.os && pdata.params.lm) ssql += " limit " + pdata.params.os + "," + pdata.params.lm;

	pdata.params = {
		ssql: ssql,
		cmdin: api
	};

	global.db.getAll(ssql, function(rd, err) {
		var start = pdata.params.os;
		pdata.r.aaData = rd;
		out(res, pdata.r);
	});

}

function login(pdata, res) {
	var cmdin = pdata.cmdin;
	var pd1 = {};
	pd1.next = pdata.next;
	pd1.r = pdata.r;
	pd1.params = pdata.params;
	global.db.ysh(pdata, function() {
		if(pdata.r.state != 0) { //出错，输出错误信息

			res.write(JSON.stringify(pdata.r));
			res.end();

		} else if(cmdin == 'regist') {
			if(pdata.r.aaData.length == 0) {
				pd1.cmdin = 'regist0';
				login(pd1, res);
			} else {
				pdata.ecode = 102;
				sendErr(pdata, res);
				return;
			}

		} else if(cmdin == 'regist0') {
			pd1.cmdin = 'regist1';
			login(pd1, res);

		} else {
			//完成，返回信息
			if(pdata.cmd) {
				pdata.r.json = pdata.cmd.json;
				if(pdata.cmd.json != null) {
					var json = JSON.parse(pdata.cmd.json);

					if(json.href != null) {
						res.redirect(json.href, pdata.next);
					}
				}

			}
			pdata.r.Authority = pdata.Authority
			res.write(JSON.stringify(pdata.r));
			res.end();
		}
	});
}

function getPID(pdata, res) {
	var cmdin = pdata.cmdin;
	var pd1 = {};
	pd1.next = pdata.next;
	pd1.r = pdata.r;

	pd1.params = pdata.params;
	var actionid = 0;
	var tbs = '';

	global.db.ysh(pdata, function() {
		if(pdata.r.state != 0) { //出错，输出错误信息
			out(res, pdata.r);
		} else if(cmdin == 'GetActionInfo') { //??????????????catch

			if(pdata.r.aaData.length == 0) {
				pdata.r.state = -1;
				pdata.r.msg = '没找到数据表:' + pdata.r.sql;
				pdata.r.aaData = null;
				out(res, pdata.r);
				return;
			}

			var maintb = '';
			actionid = pdata.r.aaData[0].Id;
			tbs = pdata.r.aaData[0].tbs;
			if(!tbs) {
				pdata.ecode = 901;
				sendErr(pdata, res);

			} else {
				maintb = tbs.split(' ')[0].trim();
			}

			var ad = null;
			try {
				ad = JSON.parse(pdata.r.aaData[0].ActionData);

			} catch(e) {
				pdata.r.state = 125;
				pdata.r.msg = 'json 数据包错:data' + pdata.r.aaData[0].ActionData;
				pdata.r.aaData = null;
				out(res, pdata.r);
				return;
			}

			var wh = "TABLE_NAME in (";
			for(var i in ad.tables) {

				wh += "'" + ad.tables[i] + "'"
				if(i != ad.tables.length - 1) {
					wh += ",";
				}
			}

			wh += ")";

			var sql = "select * from Pag_ColInfo where " + wh + " order by SortId";

			global.db.getAll(sql, function(rds, err) {

				if(err) {

					pdata.r.state = -1;
					pdata.r.msg = err;
					out(res, pdata.r);
				} else {

					var getcnt = 0;
					var cnts = 0;
					var selectsql = '';
					var detailse = '';
					for(var j in rds) {
						var ShowListField = 'ShowList2';
						var ShowDetailField = 'ShowDetail2';
						var tb = rds[j].TABLE_NAME.trim();

						if(tb == maintb) {
							ShowListField = 'ShowList';
							ShowDetailField = 'ShowDetail';
						}

						if(rds[j][ShowListField] == 1) {

							selectsql += tb + '.' + rds[j].COLUMN_NAME + ' as ' + tb + '$' + rds[j].COLUMN_NAME + ',';

						}

						if(rds[j][ShowDetailField] == 1) {

							detailse += tb + '.' + rds[j].COLUMN_NAME + ' as ' + tb + '$' + rds[j].COLUMN_NAME + ',';

						}

						if(rds[j].DataSql) {
							cnts++;
							var param = {
								index: j
							};
							global.db.getAll(rds[j].DataSql, function(rd1, err, p) {
								if(err) {
									pdata.r.columns[p.index].ds = err;
								} else {

									pdata.r.columns[p.index].ds = rd1;
								}
								if(++getcnt == cnts) {
									pd1.cmdin = 'GetButtonByAID';

									pd1.params.aid = actionid;

									getPID(pd1, res);

								}
							}, param);
						}
					}
					if(maintb) {
						selectsql = maintb + '.Id as did,' + selectsql;
						detailse = maintb + '.Id as did,' + detailse;
					}
					selectsql = selectsql.substring(0, selectsql.length - 1);
					detailse = detailse.substring(0, detailse.length - 1);

					pdata.r.select = selectsql;
					pdata.r.detailse = detailse;
					pdata.r.tbs = tbs;
					pdata.r.aaData = new Array();
					pdata.r.columns = rds;
					pdata.r.apis = ad.apis;

					if(cnts == 0) {
						pd1.cmdin = 'GetButtonByAID';
						pd1.params.aid = actionid;
						getPID(pd1, res);

					}

				}

			})

		} else if(cmdin == 'GetButtonByAID') {

			pdata.r.btns = pdata.r.aaData;
			pdata.r.aaData = [];
			out(res, pdata.r);
		} else {
			//完成，返回信息
			if(pdata.cmd) {
				pdata.r.json = pdata.cmd.json;
				if(pdata.cmd.json != null) {
					var json = JSON.parse(pdata.cmd.json);
					if(json.href != null) {
						res.redirect(json.href, pdata.next);
					}
				}

			}

			res.write(JSON.stringify(pdata.r));
			res.end();

		}

	});

}

function out(res, rdata) {
	res.writeHead(200);
	res.write(JSON.stringify(rdata));
	res.end();
}

function getCookie(s) {
	var cookies = {}; // 初始化最后要返回的对象
	if(s == null) return cookies;
	var all = s; // 在一个大写字符串中获取所有的cookie值
	if(all === "") { // 如果该cookie属性值为空字符串
		return cookies; // 返回一个空对象
	}
	var list = all.split("; ") // 分离出名/值对
	for(var i = 0; i < list.length; i++) { // 遍历每个cookie
		var cookie = list[i];
		var p = cookie.indexOf("="); // 查找第一个“=”符号
		var name = cookie.substring(0, p); // 获取cookie属性名
		var value = cookie.substring(p + 1); // 获取cookie对应的值
		value = decodeURIComponent(value); // 对其值进行解码
		cookies[name] = value; // 将名/值对存储到对象中
	}
	return cookies;
}

function init(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Content-Type', 'application/json; charset=utf-8');

	res.w = function(obj) {
		if('object' == typeof obj) {
			res.write(JSON.stringify(obj));
		} else {
			res.write(obj);
		}
		res.end();
	}
	var pdata = {};
	pdata.cmdin = req.params.cmd;
	var r = {
		state: 0,
		msg: 'unknow',
		aaData: []
	}

	pdata.r = r;

	pdata.params = {};
	for(name in req.params) {
		var nname = name.trim();
		var val = req.params[name].trim();
		pdata.params[nname] = val;
	}
	pdata.next = next;
	pdata.params.ip = getClientIp(req);

	return pdata;

}

function fromDb(sql, res) {
	global.db.getAll(sql, function(rd, err) {
		out(res, rd);
	});
}

function totable(dd) {

	if(!dd.aa[dd.cnt]) {
		out(dd.res, '完成了:建了' + dd.cnt + '张表');
		return;
	}

	var tbname = "d_" + dd.aa[dd.cnt].dictionaryname;
	var dname = dd.aa[dd.cnt].dictionaryname;
	// tbname='test';
	sql = "select `TABLE_NAME` from `INFORMATION_SCHEMA`.`TABLES` where  `TABLE_SCHEMA`='yshdb' and `TABLE_NAME`='" + tbname + "'";
	global.db.getAll(sql, function(table, err) {
		if(table.length > 0) {
			var name = 'n_' + dname;
			var id = 'id_' + dname;
			//添加数据

			var dsql = "REPLACE INTO " + tbname + " (" + name + "," + id + ",remark,sortid) SELECT datastatus AS " + name + ", dictionaryId AS " + id + ", notes AS remark, dictionaryId AS sortid FROM Com_DataDict WHERE dictionaryname='" + dname + "' ORDER BY dictionaryId";

			// out(dd.res,dsql);
			global.db.getAll(dsql, function(rd00, err) {
				if(err) {
					console.log(err);
				} else {
					dd.cnt++;
					totable(dd);
				}
			})

		} else {
			var ssql = '';
			ssql += 'CREATE TABLE `' + tbname + '` (';
			ssql += '`Id` int(11) NOT NULL AUTO_INCREMENT,';
			ssql += '`n_' + dname + '`  varchar(30) UNIQUE KEY,';
			ssql += '`remark`  varchar(50),';
			ssql += '`sortid` tinyint(4), ';
			ssql += '`id_' + dname + '` tinyint(4), ';
			ssql += 'PRIMARY KEY (`id`)';
			ssql += ') ENGINE=InnoDB  DEFAULT CHARSET=utf8;';
			global.db.getAll(ssql, function(c, err) {
				if(!err) {
					totable(dd);
				}
			});
		}
	})

}

function dbdd(pdata, res) {
	var sql = 'select * from Com_DataDict group by dictionaryname';
	global.db.getAll(sql, function(rows, err) {
		var dd = {
			aa: rows,
			cnt: 0,
			res: res
		}

		totable(dd);

	});

}

function sendErr(pdata, res, msg) {
	var ecode = pdata.ecode;
	if(!ecode) ecode = -1;
	if(msg) {

		pdata.r.state = -1;
		pdata.r.msg = msg;
		out(res, pdata.r);
	} else {
		global.db.getRow("select * from Sys_ErrCode where state= " + ecode, function(d, err) {

			if(err) {
				pdata.r.state = 902;
				pdata.r.msg = 'errcode 错误:'
				pdata.r.err = err;
			} else {
				if(d) {
					pdata.r.state = d.state;
					pdata.r.msg = d.msg;
				} else {
					pdata.r.state = ecode;
					pdata.r.msg = '未找到错误码';
				}

			}
			out(res, pdata.r);
		});
	}
}

function getClientIp(req) {
	return req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;
};

// function getAutCmd(pdata, callback) {
// 	var sesskey = pdata.params.sesskey || null
// 	var cmd = pdata.cmdin
// 	var sql = "SELECT`AuthorityCmd` FROM `Sys_Cmds_Authority_Map` WHERE `RoleAuthority` =(SELECT `AuthorityId` FROM `Sys_Role_Auth_Map` " +
// 		"WHERE `RoleId` =(SELECT `RoleId` FROM `User_Role_Map`" +
// 		"WHERE `UserId` = (SELECT `user_id` FROM `Sys_Sessions` WHERE `sesskey` = '" + sesskey + "') ORDER BY `RoleId` LIMIT 0,1)) AND `Cmds`= '" + cmd + "'"
// 	global.db.getRow(sql, function(ret, err) {
// 		callback && callback(ret)
// 	})
// }