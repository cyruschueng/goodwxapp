exports.name = 'PayMent';
var https = require('https');
var request = require("request");
exports.payment = function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Content-Type', 'application/json');
	var param = req.params
	if(param.trade_success == "true" || param.trade_success) {
		param.trade_success = 1
	} else {
		param.trade_success = 0
	}
	if(!param.optional)
		param.optional = ""

	var sql = "call P_API_PayedOrder('" + param.sign + "'	," + param.timestamp + ",'" + param.channel_type + "'," + param.trade_success + ",'" + param.transaction_type + "','" + param.sub_channel_type + "','" + param.transaction_id + "'," + param.transaction_fee + ",'" + param.optional + "');"
	global.db.getAll(sql, function(d, err) {
		if(err) {
			res.send({
				aaData: [{
					msg: "Server Wrong"
				}, {
					state: -1
				}]
			})
		} else {
			if(d && d instanceof Array && d[0] && d[0] instanceof Array && d[0][0]) {
				if(!d[0][0].result) {
					res.send({
						aaData: [{
							msg: "Interface Wrong"
						}, {
							state: 998
						}]
					})
				} else {
					if(d[0][0].result == -1) {
						res.send({
							aaData: [{
								msg: "Abnormal order"
							}, {
								state: 0
							}, {
								result: -1
							}]
						})
					} else if(d[0][0].result == -2) {
						res.send({
							aaData: [{
								msg: "Interface call failed"
							}, {
								state: 0
							}, {
								result: -1
							}]
						})
					} else if(d[0][0].result == 0) {
						res.send({
							aaData: [{
								msg: "No find order"
							}, {
								state: 0
							}, {
								result: 0
							}]
						})
					} else if(d[0][0].result > 0) {
						res.send({
							aaData: [{
								msg: "success"
							}, {
								state: 0
							}, {
								result: 1
							}]
						})
                        //推送消息到店铺
                        GetMsgforStore(param.transaction_id);
						//记录分销金额
						save_ActDisDetial(param.transaction_id, function(ret) {
							if(ret) {
								res.send({
									aaData: [{
										msg: ret
									}, {
										state: 1
									}]
								})
							} else {
								res.send({
									aaData: [{
										msg: ret
									}, {
										state: -1
									}]
								})
							}
						})
					} else {
						res.send({
							aaData: [{
								msg: "unknown error"
							}, {
								state: -1
							}]
						})
					}
				}
			}
		}
	})
}

exports.ActDisDetial = function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Content-Type', 'application/json');
	var transaction_id = req.params.transaction_id
		//保存到分销表里
		save_ActDisDetial(transaction_id, function(ret) {
			if(ret) {
				res.send({
					aaData: [{
						msg: ret
					}, {
						state: 1
					}]
				})
			} else {
				res.send({
					aaData: [{
						msg: ret
					}, {
						state: -1
					}]
				})
			}

		})
	}

	function save_ActDisDetial(transaction_id, callback) {
		var sql = "SELECT * FROM Act_DistriEntry WHERE PayOrder = '" + transaction_id + "'"
		global.db.getAll(sql, function(result, error) {
			if(result.length > 0) {
				for(var num in result) {
				//最后一级分享者
				var ShareUserId = result[0].ShareUserId
				var BuyUserId = result[0].BuyUserId
				var SKUId = result[0].SKUId
				var ssId = result[0].SssId
				var temp2 = result[0].Amount
				sql = "SELECT * FROM Act_Distri_Product_Map WHERE ProductId = (SELECT ProductId FROM Pro_SKU WHERE Id = " + SKUId + ")"
				global.db.getAll(sql, function(result, error) {
					var distributionId = result[0].DistributionId
					var distribution = result[0].Id
					sql = "SELECT * FROM Act_Distribution WHERE Id = " + distributionId
					global.db.getAll(sql, function(result, error) {
						//规则
						var rule = result[0]
						sql = "SELECT Price FROM Pro_SKU WHERE Id = " + SKUId
						global.db.getAll(sql, function(res, error) {
							//钱
							var temp = res[0].Price
							var priceTemp = parseFloat(temp).toFixed(2)
							var AmountTemp = parseInt(temp2)
							var Price = priceTemp * AmountTemp
							setistributionData(ShareUserId, rule, SKUId, Price, transaction_id, BuyUserId, distribution, ssId, priceTemp, function(ret) {
								callback && callback(ret)
							})
						})
					})
				})
			}
		} else {
			callback && callback(null)
		}
	})
	}

	function setistributionData(ShareUserId, rule, SKUId, Price, transaction_id, BuyUserId, distributionId, ssId, parseAmount, callback) {
		var count = 0
		var sql = ""
		//分享金额初始化
		var shareTotalMoney = parseFloat(Price).toFixed(2)
		//平台钱
		var stroreMoney = parseAmount * (2 / 100).toFixed(2)
		//招商钱
		var chMoney = parseAmount * ((rule.InvestmentProfit) / 100).toFixed(2)
		shareTotalMoney = shareTotalMoney * ((rule.TotalProfit - 2 - rule.InvestmentProfit) / 100).toFixed(2)
		//一级分销返利
		var shareMoneyFirstDistributionProfit = shareTotalMoney * (rule.FirstDistributionProfit / 100).toFixed(2)
		//二级分销返利
		insertIntoDB_ShareMoney(ShareUserId, rule.Id, shareMoneyFirstDistributionProfit.toFixed(2), transaction_id, "一级分润", BuyUserId, function(ret) {
			count++
		})
		sql = "SELECT UserId FROM Act_DistriUser WHERE Id = (SELECT ParentId FROM Act_DistriUser WHERE DistriProductId = " + distributionId + " and UserId = " + ShareUserId + " and sssId=" + ssId + " LIMIT 0,1)"
		global.db.getAll(sql, function(result, error) {
			var shareMoneyDistributionProfitProfit = shareTotalMoney * (rule.DistributionProfit / 100).toFixed(2)
			if(!result[0]) {
				insertIntoDB_ShareMoney(ShareUserId, rule.Id, shareMoneyDistributionProfitProfit.toFixed(2), transaction_id, "二级分润", BuyUserId, function() {
					count++
				})
			} else {
				var userId = result[0].UserId
				insertIntoDB_ShareMoney(userId, rule.Id, shareMoneyDistributionProfitProfit.toFixed(2), transaction_id, "二级分润", BuyUserId, function() {
					count++
				})
			}
		})
		//店铺分润
		var storeShare = shareTotalMoney * (rule.StoreProfit / 100).toFixed(2)
		sql = "SELECT UserID FROM Pro_Product WHERE Id = (SELECT ProductId FROM Pro_SKU WHERE Id=" + SKUId + ");"
		global.db.getAll(sql, function(result, error) {
			var userId = result[0].UserID
			insertIntoDB_ShareMoney(userId, rule.Id, storeShare.toFixed(2), transaction_id, "店铺分润", BuyUserId, function(ret) {
				count++
			})
		})
		//平台分润
		var adminShare = stroreMoney
		sql = "SELECT UserId FROM`User_Role_Map` WHERE `RoleId`=999 AND `IsProfit` = 1"
		var admin = ""
		global.db.getAll(sql, function(result, error) {
			var userId = result[0].UserId
			admin = result[0].UserId
			insertIntoDB_ShareMoney(userId, rule.Id, adminShare, transaction_id, "平台分润", BuyUserId, function(ret) {
				count++
			})
		})
		//渠道分润
		sql = "SELECT ur.`UserId` FROM `User_Role_Map` ur LEFT JOIN User_Info ui ON ui.ID = ur.`UserId` WHERE ur.`RoleId`=1000  AND ui.ChannelId = (SELECT ChannelId FROM User_Info WHERE Deleted = 0 AND Id =(SELECT UserID FROM Pro_Product WHERE Id = (SELECT ProductId FROM Pro_SKU WHERE Id=" + SKUId + ")));"
		global.db.getAll(sql, function(result, error) {
			var userId = ""
			if(!result[0]) {
				userId = admin
			} else {
				userId = result[0].UserId
			}
			insertIntoDB_ShareMoney(userId, rule.Id, chMoney, transaction_id, "招商分润", BuyUserId, function(ret) {
				count++
			})
		})　
		var oneSecond = 1
		setInterval(function() {
			var time = 0
			time++
			if(time < 100000) {
				if(count == 5)
					callback && callback(true)
			} else {
				callback && callback(false)
			}
		}, oneSecond);
	}

	function insertIntoDB_ShareMoney(ShareUserId, ruleId, shareMoney, transaction_id, msg, buyUser, callback) {
		var sql = "INSERT INTO Act_OrderProfit (UserId,RuleId,TotalPrice,OrderId,Rmaker,DateTime,BuyUser) VALUES" +
		"(" +
		ShareUserId + "," + ruleId + "," + shareMoney + "," + transaction_id + ",'" + msg + "'," + "now()" + "," + buyUser +
		")"
		global.db.getAll(sql, function(result, error) {
			sql = "UPDATE User_Info SET Balance = (SELECT c.b FROM ((SELECT (IFNULL(a.Balance,0) + " + shareMoney + ") AS b FROM User_Info a WHERE a.Id = " + ShareUserId + ") AS c )) WHERE Id =" + ShareUserId
			global.db.getAll(sql, function(result, error) {
				sql = "INSERT INTO Sys_BalanceNotes (UserId,BalanceInorDe,Balance,ChangeTime,OrderId) VALUES" +
				"(" + ShareUserId + "," + "(SELECT dictionaryID FROM Com_DataDict WHERE dictionaryname like 'BalanceWay" + "' LIMIT 0,1)" + "," + shareMoney + "," + "NOW()" + "," + transaction_id + ")"
				global.db.getAll(sql, function(result, error) {
					callback && callback(sql)
				})
			})
		})
	}

	function GetMsgforStore(transaction_id) {
		var sql = "SELECT `OrderNumber` FROM Ord_Order WHERE OrdermainId =(SELECT Id FROM `Ord_OrderMain` WHERE `OrderNumber`='" + transaction_id + "')"
		global.db.getAll(sql, function(data, err) {
			for(var i=0 ; i < data.length ; i++){
				var ordernumber = data[i].OrderNumber
				var options = {
					url: "http://wx_service.yshfresh.com/api/storemsg?ordernumber=" + ordernumber,
					method: 'GET'
				}
				request(options, function(err, res, data) {
					res.end()
				})
			}
		})

	}