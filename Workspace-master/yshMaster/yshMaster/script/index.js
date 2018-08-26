$(document).ready(function() {
	//判断用户是否登录
	if(typeof(getuserInfo()[0]) == "undefined"){
		location.href = "Admin_Login.html";
	}
	
	init();
	
	/** 判断登录管理员 */
	var url = yshurl + "CheckRoleAut";
	getDataList(url,"",function(msn){
		console.log(msn)
		if(msn.aaData.length !=0 && msn.aaData[0].RoleId == 1){
			$("#main").attr("src","Admin_Home.html");
		} else {
			var ele = $("#sidebar").children().eq(0).children().eq(1).children().eq(0).children().eq(0)[0];
			if(ele){
				var firstUrl = ele.getAttribute("href").split("?")[0];
				$("#main").attr("src",firstUrl);
			} else {
				location.href = "Admin_Login.html";
			}
		}
	});
	
	//显示登录用户名
	var username = $("#show-username");
	var logout = $("#logout-btn");
	if(typeof(getuserInfo()[0]) != "undefined"){
		username.html(getuserInfo()[0].phonenumb)
	} 
	//注销登录
	logout.on("click",function(){
		localStorage.removeItem("userInfo");
		location.href = "Admin_Login.html";
	})
})

//首页初始化方法
function init() {
	var url = authurl + "SelectUserMeunlist"
	var meunList = new Array()
	getDataList(url, null, function(ret) {
		if(ret && ret.status == 1) {
			ysh_alert(returnData.msg)
		} else {
			for(var num in ret.aaData) {
				if(ret.aaData[num].LevelId && ret.aaData[num].LevelId == 1) {
					meunList.push(ret.aaData[num])
				}
			}
			for(var k in meunList) {
				var meunListTemp = new Array()
				for(var j in ret.aaData) {
					if(meunList[k].Id == ret.aaData[j].ParentId) {
						meunListTemp.push(ret.aaData[j])
					}
				}
				meunList[k].child = meunListTemp
			}
			//渲染主页菜单
			showMeun(meunList)
			dynamicLoading.js('js/scripts.js')
		}
	}, false)
}

//渲染主页
function showMeun(meunList) {
	var view = $("#sidebar")
	var tpl = $("#sidebar_Tpl").html()
	showData(view, tpl, meunList)
}

