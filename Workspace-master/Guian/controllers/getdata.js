exports.name ='gatdata'
var http =require("http")
var request =require("request")
var fs=require("fs")
var schedule = require("node-schedule");
var rule = new schedule.RecurrenceRule();

　　rule.minute = 1;

　　var j = schedule.scheduleJob(rule, function(){

	　　　　exports.GetToken()

　　});


exports.GetToken = function(){
	var obj={
		strUser:'hnapi',
		strPwd:'123456'
	}
	var  postion={
		body:JSON.stringify(obj),
		method:"post",
		url :"http://cdhn.nywlw.cn/api/GetToken",
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		}
	}
	request(postion,function(err, res, data){
		var data =JSON.parse(data)
		if(!err){
			if(data&& data.token&& data.token.length>0){
				var token =data.token;
				var count=50
				var  postion1={
					method:"get",
					url :"http://cdhn.nywlw.cn/api/GetData?count="+count,
					headers: {
						'Authorization': "Token  " + token
					}
				}
				request(postion1,function(erro,ress,data1){
					if (!erro){
						if (data1){
							del_data(JSON.parse(data1).data);
						}
					}else {
					}
				})
			}else{
			}
		}else{
		}
	})

}

var del_data =function(data1){
	var obj = {
		ts:[],
		tw:[],
		gq:[],
		co:[],
		ks:[],
		kw:[]
	}
	if (data1 instanceof Array){
		for (var i in data1){
			switch (data1[i].paramName){

				case '土壤湿度':
				obj.ts.push(data1[i])
				break;
				case '土壤温度':
				obj.tw.push(data1[i])
				break;
				case '光照强度':
				obj.gq.push(data1[i])
				break;
				case 'co2':
				obj.co.push(data1[i])
				break;
				case '空气温度':
				obj.kw.push(data1[i])
				break;
				case '空气湿度':
				obj.ks.push(data1[i])
				break;
			}
		}       
		var date =new Date()
		var folder_name =date.getFullYear() + "-" + (date.getMonth() < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1)) + "-" + (date.getDate());
		var file_name =(date.getMonth()+1)+"-"+ date.getDate() +"-"+ date.getHours()
		console.log(file_name)
		try{
			fs.mkdirSync(__dirname + '/datafile/del_data/'+folder_name); 
		}catch(e){
			if (e.code=='EEXIST'){
				console.log(e.code)
			}
		}
		fs.writeFile(__dirname + '/datafile/del_data/'+folder_name +"/" +file_name+".json"  , JSON.stringify(obj) );




	}
}