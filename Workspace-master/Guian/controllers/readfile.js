exports.name="ReadFile"
var fs = require('fs');
var path = require("path");
var filepath="/datafile/";
var url=require("url");
var http =require("http");
var qs = require('querystring');
//http://localhost:4008/getInfo?folder=user&file=name
//请求路由
exports.getInfo =function(req,res){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Connection', 'application/json;charset=utf-8');
	var program = url.parse(req.url).query
	var foldername = qs.parse(program)['folder'];
	var filename = qs.parse(program)['file'];
	var filetype = qs.parse(program)['filetype']||''

	if(filetype&&filetype == 'del_data'){
		getDiarys(function(ret){
			var backArray = []
			for(var num in ret){
				if(ret[num]&&ret[num].length>0){
					ret[num].data = eval('(' + ret[num].data + ')')
					backArray.push(JSON.parse(ret[num]))
				}
			}
			var tempArray = []
			for(var k in backArray){
				var ooj = JSON.parse(backArray[k].data)
				ooj.time = backArray[k].key
				tempArray.push(ooj)
			}

			var resultArray = new Array()
			for(var hour in tempArray){
				var resultTemp = new Array()
            	//控制小时数
            	for(var skey in tempArray[hour]){
            		var obj = new Object()
            		obj.eve = Get_eve(tempArray[hour][skey])
            		obj.key = skey
            		obj.time = tempArray[hour].time
            		resultTemp.push(obj)
            	}
            	resultArray.push(resultTemp)
            }
            res.send(resultArray)
        })
	}
	else if (foldername) {
		if (filename) {
			var folderpath= filepath + foldername+"/"+filename + ".json"      
			readPem(folderpath,function(Conndent){
				if(Conndent){
					if(Conndent.split("}").length >0)
					{   

						try {
							res.send(JSON.parse(Conndent))
						}
						catch(e){
							console.log(e)
						}
					}
					else{
						Conndent = Conndent.split(",")
						console.log(Conndent);
						res.send(Conndent)
					}      
				}
				else{
					res.send("nodata");
				}
				
			})			
		} else {
			var folder= filepath + foldername+"/"
			readdir(folder,function(Conndent){
				for(var i=0 ;i<Conndent.length ; i++){
					Conndent[i] = Conndent[i].split(".")[0]
				}
				console.log(Conndent);
				res.send(Conndent)			
			});

		}
	} else {
		if (filename) {
			var folderpath= filepath +"/"+filename + ".json"        
			readPem(folderpath,function(Conndent){
				res.send(Conndent);
			});

		}
		else{
			res.send("no file")
		}
	}
}
//读文件
var readPem = function(filename,callback) {
	fs.readFile(path.join(__dirname, filename), 'utf-8', function(err, data) {
		if(err) {
			//console.log(err);
			callback(err)
		} else {
			//console.log(data);
			callback(data)
		}
	})
};
//读文件夹
var readdir = function(foldername,callback) {
	fs.readdir(__dirname + foldername , function (err, files) {		
		if(err) {
			console.error(err);
			callback(err);
		} else {
			console.log(files);
			callback(files);
		}
	});
}



//遍历文件夹
var getDiarys =function(callback){
	var obj = new Object();
	var diaryMap = new Array();
	var diaryMapTemp = "";
	var date =new Date()
	var folder_name =date.getFullYear() + "-" + (date.getMonth() < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1)) + "-" + (date.getDate());

	fs.readdir(__dirname +filepath+'/del_data/'+folder_name+"/", function(err, files){
		//err 为错误 , files 文件名列表包含文件夹与文件
		if(err){
			console.log('error:\n' + err);
			return;
		}
		files.forEach(function(file){
			fs.stat(__dirname+filepath+'/del_data/'+folder_name+"/" + file, function(err, stat){
				if(err){console.log(err); return;}
				if(stat.isDirectory()){					
					// 如果是文件夹遍历
					console.log(__dirname+filepath+'/del_data/'+folder_name+"/" + file);
				}else{
					// 读出所有的文件
					fs.readFile(__dirname+filepath + '/del_data/'+folder_name+"/" + file,"utf-8",function(err,data){
						if(err){  
							console.error(err);  
						}  
						else{ 
							obj.data = data;
							obj.key = file.replace(".json","");
							diaryMapTemp = diaryMapTemp  + JSON.stringify(obj) + "&*";
							diaryMap = diaryMapTemp.split("&*");
							if(diaryMap.length == (files.length + 1))
								callback && callback(diaryMap);
						}  
					});
				}				
			});
		});
	});
}

function Get_eve(Arr){
	var values = 0
	if(Arr instanceof Array){
		var sum = 0
		for(var num in Arr){
			sum += parseInt(Arr[num].values) 
		}
		values = (sum / Arr.length).toFixed(2)
	}else{
		values = false 
	}
	return values
}