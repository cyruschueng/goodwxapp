//var type = GetRequest().type || "common";
var type = "common";
var befurl = apiurl + 'api/' + type + "/";

$(function(){
	Query();
	showMuen();
	
	// 提交
	$(document).on('click','#addSubmint',function(){
		var submitType = $(this).attr('btntype')
		if(submitType == "add"){//新增提交
			var url = getBefurl() + "InsertCmd"
			var param = new Object;
			param.jkm = $("#popApiName").val()
			param.jkbz = $("#popExplan").val()
			param.jksql = $("#popSql").val()
			if(param.jkm == ""){
				api_msg("请输入接口名")
			} else if(param.jksql == ""){
				api_msg("请输入SQL")
			} else if(param.jkbz == ""){
				api_msg("请输入接口说明")
			} else {
				getDataList(url,param,function(d){
					if(d && d.aaData){
						$('#myModal').modal('hide');
						api_msg("添加成功");
						Query()
					}
				})
			}
		}
		if(submitType == "edit"){//编辑提交
			var url = getBefurl() + "UpdateCmd"
			var cmdid = localStorage.getItem("cmdid")
			var param = new Object;
			param.jkbz = $("#popExplan").val()
			param.jksql = $("#popSql").val()
			param.cmdid = cmdid
			getDataList(url,param,function(d){
				if(d && d.aaData){
					$('#myModal').modal('hide');
					api_msg("修改成功");
					Query()
				}
			})
		}
	})
	
	// 用户登录信息
	var userInfo = JSON.parse(localStorage.getItem("userInfo"))
	if(userInfo){
		$("#userWelcome").html( "你好," + JSON.parse(userInfo).username)
	} else {
		location.href = 'login.html'
	}
})

// 获取菜单列表
function getMuenList (){
	var muenListURL = apiurl + 'api/common/GetMeunList'
	getDataList(muenListURL,{},function(d){
    	var FJmuen = []
    	var data = d.aaData[0]
		//console.log(data)
    	for(var i=0;i<data.length;i++){
    		if(data[i].DJ == 1){
    			FJmuen.push(data[i])
    		}
    	}
    	
    	for (var i=0;i<FJmuen.length;++i){
    		var erArr = [];
    		for(var j=0;j<data.length;j++){
    			if(FJmuen[i].ID == data[j].FJ){
    				erArr.push(data[j])
    			}
	    	}
    		FJmuen[i].erMuen = erArr;
    	}
    	setLocal("muenList",FJmuen)
    	var view = $("#muenListView");
		var tpl = $("#muenListTpl").html();
		laytpl(tpl).render(FJmuen, function(html){
		  	view.html(html)
		});
	})
}
function showMuen(){
	var Muendata = JSON.parse(localStorage.getItem("muenList"))
	if(Muendata){
		var view = $("#muenListView");
		var tpl = $("#muenListTpl").html();
		laytpl(tpl).render(Muendata, function(html){
		  	view.html(html)
		});
	} else {
		getMuenList()
	}
}
function Query (){
	// 下拉加载
	layui.use('flow', function(){
		var flow = layui.flow;
	  	flow.load({
		    elem: '.content', //流加载容器
		    done: function(page, next){ //执行下一页的回调
		    	var pageindex = 0;
		    	if(page > 1){
		    		pageindex = (page-1) * 20 + 1
		    	}
	      		//模拟数据插入
				var param = {
					JKM:  $("#api_name").val() || '',
					JKSQL: $("#sql").val() || '',
					JKBZ: $("#explan").val() || '',
					pageindex: pageindex,
					pagesize: 20
				}
				var url = getBefurl() + 'SelectApiList'
				getDataList(url,param,function(d){
					var viewdata = [];
					for(var i = 0; i < d.aaData[0].length;++i){
						if(d.aaData[0][i].SFSC !== 1){
							viewdata.push(d.aaData[0][i])
						} 
					}
					if(d && d.aaData[0] && d.aaData[1]){
						var pageTotals = Math.ceil(d.aaData[1][0].totals / 20)
						var view = $("#mainTableView")
						var tpl = $('#mainTableTpl').html()
						view.empty();
						// next(showData(view,tpl,d.aaData[0]),page < pageTotals)
						next(showData(view,tpl,viewdata),page < pageTotals)
					}
				})
		    }
	  	});
	});
}

// 美化滚动条
function slimScroll (){
	$('.wrapper').slimScroll({
	    height: $(window).innerHeight()
	});
}

// 新增弹出窗口
function addPop (){
	$("#popExplan").val('')
	$("#popSql").val('')
	$("#popApiName").val('')
	$('#myModal').modal('show');
	$('#addSubmint').attr("btntype","add")
	$('#popApiName').attr("disabled",false)
}

// 编辑弹出窗口
function editPop (cmdid){
	var url = getBefurl() + "GetCmdInfo"
	setLocal("cmdid",cmdid);
	getDataList(url,{cmdid:cmdid},function(d){
		if(d && d.aaData && d.aaData.length > 0){
			var popApiName = d.aaData[0][0].JKM;
			var popSqlVal = d.aaData[0][0].JKSQL;
			var popExplanVal = d.aaData[0][0].JKBZ;
			$("#popExplan").val(popExplanVal)
			$("#popSql").val(popSqlVal)
			$("#popApiName").val(popApiName)
			$('#myModal').modal('show');
		}
	})
	$('#addSubmint').attr("btntype","edit")
	$('#popApiName').attr("disabled",true)
}

// 测试弹出窗口
function testPop (cmdid){
	var url = getBefurl() + "GetCmdInfo"
	var ret = new Object;
	$("#result").empty()
	getDataList(url,{cmdid:cmdid},function(d){
		ret = d.aaData[0][0];
		var popApiName = ret.JKM
		var popExplanVal = ret.JKBZ
		var popSqlVal = ret.JKSQL;
		$("#testpopSql").val(popSqlVal)
		$("#testPopAPIname").val(popApiName)
		$('#myTestModal').modal('show');
		
		// 正则匹配【】内参数
		var reg = /\[(.+?)\]/g;
		var paramArr = popSqlVal.match(reg);
		var newParamArr = [];
		for(var i = 0;i < paramArr.length;++i){
			newParamArr.push(paramArr[i].replace(/^\[|\]$/g, ''))//去掉参数两边的【】
		}
		// 显示数据
		var view = $('#testPopView');
		var tpl = $('#testPopTpl').html()
		view.empty();
		showData(view,tpl,newParamArr)
	})
}

// 执行sql
function implementSql (){
	var paramEle = $('#testPopView input');
	var sqlStr = $("#testpopSql").val();
	var obj = {};
	$.each(paramEle, function(i,v) {
		var param = $(v).attr('id');
		var val = $(v).val();
		var str = '\\[' + param + '\\]'  
		var rex = new RegExp(str);
		obj[param] = val;
		sqlStr = sqlStr.replace(rex,val)
	});
	
	var url = getBefurl() + $("#testPopAPIname").val()
	getDataList(url,obj,function(d){
		console.log(d)
		$("#result").html(JSON.stringify(d))
	})
}

// 获取接口类型
function getApiType (type,t){
	setLocal("ApiType",type)
	console.log(getBefurl())
	Query();
	$(".skin-blue .treeview-menu>li>a").css("color","#8aa4af")
	$(t).css("color","#fff")
//	location.href = 'index.html?type=' + type
}

// 退出登录
function logout(){
	api_confirm('确定要退出登录？','','',function(){
		localStorage.clear()
		location.href='login.html'
	})
}

// 删除
function deleteApi(id){
	var url = getBefurl() + "DeleteCmd";
	api_confirm('确定要删除？','','',function(){
		getDataList(url,{cmdid:id},function(d){
			if(d && d.status == 0){
				api_msg("删除成功");
				Query();
			} else {
				api_msg("删除失败");
			}
		})
	})
}

// 本地缓存获取url开头部分
function getBefurl (){
	var type;
	if(localStorage.getItem("ApiType")){
		type = localStorage.getItem("ApiType").replace(/^\"|\"$/g, '')
	} else {
		type = "common"
	}
	return apiurl + 'api/' + type + "/";
}



