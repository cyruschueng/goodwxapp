"use strict";
/**
 * The file For err
 */
var errObj = {
	"success":{
		"status":0,
		"msg":"The resquest success"
	},
	"connFail":{
		"status":10001,
		"msg":"Get Connection fail"
	},
	"SQLFail":{
		"status":10002,
		"msg":"SQL failed to run"
	},
	"TransactionFail":{
		"status":10003,
		"msg":"SQL Transaction have err"
	},
	"dataLose":{
		"status":20001,
		"msg":"Can not find the param to this routes"
	},
	"TypeErr":{
		"status":20002,
		"msg":"Parameter type for incoming error"
	},
	"No_deal":{
		"status":90001,
		"msg":"Can not find The Object to The routes"
	}
};

exports.InitErr = function(){
	return errObj;
};
