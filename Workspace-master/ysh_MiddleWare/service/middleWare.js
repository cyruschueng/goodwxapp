var err = require("../common/err.js");
var developerte = require("../service/developer.js");
var developerObj = developerte.developers;
var project = require("../service/project.js");
var projectObj = project.project;
var routeManage = require("../service/routeManage.js");
var routeManageObj = routeManage.routeManageInit;
var serviceApi = require("../service/service.js");
var serviceApiObj = serviceApi.serviceApi;
var webHelper = require("../module/WebHelper.js");
var webHelperObj = webHelper.WebHelper; 
// 项目与开发者
var project_developAPI = require("../service/project_develop.js");
var project_developAPIObj = project_developAPI.project_developAPI
// 项目与服务
var project_serviceAPI = require("../service/project_service.js");
var project_serviceAPIObj = project_serviceAPI.project_serviceAPI
// 项目与路由
var project_RouteAPI = require("../service/project_Route.js");
var project_RouteAPIObj = project_RouteAPI.project_RouteAPI

var projectObj = project.project;
var errObj = err.InitErr();

var middleWare = {
		initMiddleWare:function(param,callback){
			var result = new Object();
			switch (param.Interface) {
			case "test":
				result = errObj.success;
				result.aaData = ["test"];
				callback && callback(result);
				break;
			case "select_developer":
				var data = param.body || param.query || null;
				if(!data){
					result = dataLose;
				}else{
					developerObj.selectDeveloper(data,function(result){
						callback && callback(result);
					});
				}
				break;
			case "insert_developer":
				var data = param.body || param.query || null;
				if(!data){
					result = dataLose;
				}else{
					developerObj.insert_developer(data,function(result){
						callback && callback(result);
					});
				}
				break;
			case "update_developer":
				var data = param.body || param.query || null;
				if(!data){
					result = dataLose;
				}else{
					developerObj.update_developer(data,function(result){
						callback && callback(result);
					});
				}
				break;
			case "delete_developer":
				var data = param.body || param.query || null;
				if(!data){
					result = dataLose;
				}else{
					developerObj.delete_developer(data,function(result){
						callback && callback(result);
					});
				}
				break;
			case "select_project":
				var data = param.body || param.query || null;
				if(!data){
					result = dataLose;
				}else{
					projectObj.select_project(data,function(result){
						callback && callback(result);
					});
				}
				break;
			case "insert_project":
				var data = param.body || param.query || null;
				if(!data){
					result = dataLose;
				}else{
					projectObj.insert_project(data,function(result){
						callback && callback(result);
					});
				}
				break;
			case "update_project":
				var data = param.body || param.query || null;
				if(!data){
					result = dataLose;
				}else{
					projectObj.update_project(data,function(result){
						callback && callback(result);
					});
				}
				break;
			case "delete_project":
				var data = param.body || param.query || null;
				if(!data){
					result = dataLose;
				}else{
					projectObj.delete_project(data,function(result){
						callback && callback(result);
					});
				}
				break;
			case "select_service":
				var data = param.body || param.query || null;
				if(!data){
					result = dataLose;
				}else{
					serviceApiObj.select_service(data,function(result){
						callback && callback(result);
					});
				}
				break;
			case "insert_service":
				var data = param.body || param.query || null;
				if(!data){
					result = dataLose;
				}else{
					console.log("fuck")
					serviceApiObj.insert_service(data,function(result){
						callback && callback(result);
					});
				}
				break;
			case "update_service":
				var data = param.body || param.query || null;
				if(!data){
					result = dataLose;
				}else{
					serviceApiObj.update_service(data,function(result){
						callback && callback(result);
					});
				}
				break;
			case "delete_service":
				var data = param.body || param.query || null;
				if(!data){
					result = dataLose;
				}else{
					serviceApiObj.delete_service(data,function(result){
						callback && callback(result);
					});
				}
				break;
			case "select_route":
				var data = param.body || param.query || null;
				if(!data){
					result = dataLose;
				}else{
					routeManageObj.selectRoute(data,function(result){
						callback && callback(result);
					});
				}
				break;

			case "get_projectNameSelect":
				var data = param.body || param.query || null;
				if(!data){
					result = dataLose;
				}else{
					routeManageObj.get_projectNameSelect(data,function(result){
						callback && callback(result);
					});
				}
				break;
				
			case "insert_route":
				var data = param.body || param.query || null;
				if(!data){
					result = dataLose;
				}else{
					routeManageObj.insert_Route(data,function(result){
						callback && callback(result);
					});
				}
				break;
			case "update_route":
				var data = param.body || param.query || null;
				if(!data){
					result = dataLose;
				}else{
					routeManageObj.update_Route(data,function(result){
						callback && callback(result);
					});
				}
				break;
			case "delete_route":
				var data = param.body || param.query || null;
				if(!data){
					result = dataLose;
				}else{
					routeManageObj.delete_Route(data,function(result){
						callback && callback(result);
					});
				}
				break;

			//project_developAPI
			case "select_proAndDev":
				var data = param.body || param.query || null;
				if(!data){
					result = dataLose;
				}else{
					project_developAPIObj.select_proAndDev(data,function(result){
						callback && callback(result);
					});
				}
				break;
			case "insert_proAndDev":
				var data = param.body || param.query || null;
				if(!data){
					result = dataLose;
				}else{
					project_developAPIObj.insert_proAndDev(data,function(result){
						callback && callback(result);
					});
				}
				break;
			case "update_proAndDev":
				var data = param.body || param.query || null;
				if(!data){
					result = dataLose;
				}else{
					project_developAPIObj.update_proAndDev(data,function(result){
						callback && callback(result);
					});
				}
				break;
			case "delete_proAndDev":
				var data = param.body || param.query || null;
				if(!data){
					result = dataLose;
				}else{
					project_developAPIObj.delete_proAndDev(data,function(result){
						callback && callback(result);
					});
				}
				break;

			// project_serviceAPI
			case "select_proAndSer":
				var data = param.body || param.query || null;
				if(!data){
					result = dataLose;
				}else{
					project_serviceAPIObj.select_proAndSer(data,function(result){
						callback && callback(result);
					});
				}
				break;
			case "insert_proAndSer":
				var data = param.body || param.query || null;
				if(!data){
					result = dataLose;
				}else{
					project_serviceAPIObj.insert_proAndSer(data,function(result){
						callback && callback(result);
					});
				}
				break;
			case "update_proAndSer":
				var data = param.body || param.query || null;
				if(!data){
					result = dataLose;
				}else{
					project_serviceAPIObj.update_proAndSer(data,function(result){
						callback && callback(result);
					});
				}
				break;
			case "delete_proAndSer":
				var data = param.body || param.query || null;
				if(!data){
					result = dataLose;
				}else{
					project_serviceAPIObj.delete_proAndSer(data,function(result){
						callback && callback(result);
					});
				}
				break;

			// 项目与路由 
				case "select_proAndRoute":
				var data = param.body || param.query || null;
				if(!data){
					result = dataLose;
				}else{
					project_RouteAPIObj.select_proAndRoute(data,function(result){
						callback && callback(result);
					});
				}
				break;
			case "insert_proAndRoute":
				var data = param.body || param.query || null;
				if(!data){
					result = dataLose;
				}else{
					project_RouteAPIObj.insert_proAndRoute(data,function(result){
						callback && callback(result);
					});
				}
				break;
			case "update_proAndRoute":
				var data = param.body || param.query || null;
				if(!data){
					result = dataLose;
				}else{
					project_RouteAPIObj.update_proAndRoute(data,function(result){
						callback && callback(result);
					});
				}
				break;
			case "delete_proAndRoute":
				var data = param.body || param.query || null;
				if(!data){
					result = dataLose;
				}else{
					project_RouteAPIObj.delete_proAndRoute(data,function(result){
						callback && callback(result);
					});
				}
				break;

				
			// webhelper_selectAPI
			case "webhelper_select":
				var data = param.body || param.query || null;
				if(!data){
					result = dataLose;
				}else{
					var backDatas = new Array()
					webHelperObj.selectHelper(data,function(result){
						for(var num in result){
							backDatas[num] =  JSON.parse(result[num])
						}
						var query = new Array()
						if(data.query.indexOf(",") > 0){
							query = data.query.split(",");
						}else{
							query.push(data.query);
						}
						if(backDatas.length == query.length)
						 callback && callback(backDatas);
					});
				}
				break;
			default:
				result = errObj.No_deal;
				callback && callback(result);
				break;
			}
		}
};

exports.middleWare = function(){
    return middleWare;
};
