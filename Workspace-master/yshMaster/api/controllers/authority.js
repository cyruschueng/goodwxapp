exports.name = 'authority';
var https = require('https');
var authorityMsg = {
		"successMsg": "权限验证成功",
		"noAuthorityMsg": "没有查询到相关权限",
		"errorMsg": "验证权限出错"
	}
	//获取getAccess_token
exports.authority = function(req, res, callback) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Content-Type', 'application/json');
	var cmd = req.params.cmd || 0;
	var sesskey = req.params.sesskey || null
	if(!sesskey) {
		res.send("权限验证失败，没有获取到sesskey");
	} else {
		switch(cmd) {
			case 0:
				autError()
				break;
			case 'SelectUserMeunlist':
				SelectUserMeunlist(sesskey, function(returnData) {
					res.send(returnData);
				})
				break;
		}
	}
}

//获取菜单
function SelectUserMeunlist(sesskey, callback) {
	var sql = "SELECT * FROM `Sys_Meun` WHERE `Id` IN (SELECT `MenuId` FROM  `Sys_Auth_Meun_Map` WHERE `AuthorityId` in ( SELECT `AuthorityId` FROM `Sys_Role_Auth_Map` WHERE `RoleId` in (SELECT `RoleId` FROM  `User_Role_Map` WHERE `UserId` in  ( SELECT `user_id` FROM `Sys_Sessions` WHERE `sesskey` = '" + sesskey + "'))))"
	var returnData = new Object()
	global.db.getAll(sql, function(result, error) {
		if(result.length > 0 && !error) {
			returnData.status = 0
			returnData.msg = authorityMsg.successMsg
			returnData.aaData = result
		} else if(result.length <= 0 && !error) {
			returnData.status = 0
			returnData.msg = authorityMsg.noAuthorityMsg
			returnData.aaData = new Array()
		} else {
			returnData.status = 1
			returnData.msg = authorityMsg.errorMsg
		}
		callback(returnData)
	})
}