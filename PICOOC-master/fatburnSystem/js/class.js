
// var userId = localStorage.getItem("userId");
// console.log("测试---------------------------------"+roleId);
// console.log("token:"+token);
var imgIndex1 = 0;
var imgIndex2 = 0;
var imgIndex3 = 0;
var imgIndex4 = 0;
var imgIndex5 = 0;
var imgIndex6 = 0;
var imgIndex7 = 0;
var imgIndex8 = 0;
var videoIndex1 = 0;
var imgIndex9 = 0;
var imgIndex10 = 0;
var imgIndex11 = 0;
//获取教练列表
$(function () {
	// getCoachList();1
	//日历控件
	TimePicker(".timepicker");
	TimePicker("#yuReTime");
	TimePicker("#saleTime");
	TimePicker("#kaiYing");
	TimePicker("#yuReTime2");
	TimePicker("#saleTime2");
	TimePicker("#kaiYing2");
	TimePicker("#yuReShijian");
	TimePicker("#kaishouShijian");
	TimePicker('#startCampTime');
	TimePicker('#editStartDate');
	// //上传图片删除
	// funBindHoverEvent();	


	//全选js操作
	checkAll();
	//是否推广 创建优惠券
	isPromote()
	//上传图片到阿里云
	// uploadImgToOSS();
	// var cityData = ["Java","javaScript","beijing"];
	//     $("#coachName").autocomplete({
	//       source: cityData
	//     });
	getCoachList();
	getClassList();
	getStudentList();
	// 查询运动计划
	$('#sendSport').click(function () {
		var studentName = $('#studentName3').val();
		var roleId = $('#studentName3').attr('data-id');
		var className = $('#className3').val();
		var targetCampId = $('#className3').attr('data-id');
		var weekIndex = $('#weekIndex3').val();
		var bodyType = $("#bodyType2 input:checked").val();
		if ($.trim(studentName) == '') {
			swal('请填写学员昵称');
			return false;
		}
		if ($.trim(className) == '') {
			swal('请填写班级名称');
			return false;
		}
		if ($.trim(weekIndex) == '') {
			swal('请填写第几周');
			return false;
		}
		$.ajax({
			type: "GET",
			url: location.origin + "/v1/api/campScheme/querySportPlan?token=" + token,
			data: {
				roleId: roleId,
				targetCampId: targetCampId,
				weekIndex: weekIndex,
				bodyType: bodyType
			},
			dataType: "json",
			success: function (data) {
				if (data.resp == true) {
					$('#studentName3').val('');
					$('#className3').val('');
					$('#weekIndex3').val('');
					swal("该用户的此周运动计划已经存在!");
				} else {
					swal("该用户的此周运动计划不存在~");
				}

			}
		});
	});
	// 生成运动计划
	$('#generateSport').click(function () {
		var studentName = $('#studentName2').val();
		var roleId = $('#studentName2').attr('data-id');
		var className = $('#className2').val();
		var campId = $('#className2').attr('data-id');
		var planDuration = Number($('#planDuration input:checked').val());
		// var weekIndex = $('#weekIndex2').val();
		var bodyType = Number($("#bodyType1 input:checked").val());
		var level = Number($("#level1 input:checked").val());
		var fatOrShaping = Number($('#fatOrShaping input:checked').val());
		var arr1 = [];
		for(var i = 0; i < $('#taboos input').length;i++){
			if($('#taboos input').eq(i).attr('checked')){
				arr1.push($('#taboos input').eq(i).val());
			}
		}
		arr1 = arr1.join(',');
		var arr2 = [];
		for(var j = 0; j < $('#weekIndex2 input').length;j++){
			if($('#weekIndex2 input').eq(j).attr('checked')){
				arr2.push($('#weekIndex2 input').eq(j).val());
			}
		}
		arr2 = arr2.join(',');
		// var data = {
		// 		roleId: roleId,
		// 		campId: campId,
		// 		taboos:arr1,
		// 		weekIndexs: arr2,
		// 		bodyType: bodyType,
		// 		level: level,
		// 		fatOrShaping:fatOrShaping,
		// 		planDuration:planDuration
		// 	};
		// 	console.log(data);
		// var periodId= $("#periodId1 input:checked").val();
		if ($.trim(studentName) == '') {
			swal('请填写学员昵称');
			return false;
		}
		if ($.trim(className) == '') {
			swal('请填写班级名称');
			return false;
		}
		// ?token=" + token
		$.ajax({
			type: "GET",
			url: location.origin + "/v1/api/campScheme/rebuildSportPlan",
			data: {
				roleId: roleId,
				campId: campId,
				taboos:arr1,
				weekIndexs: arr2,
				bodyType: bodyType,
				level: level,
				fatOrShaping:fatOrShaping,
				planDuration:planDuration
			},
			dataType: "json",
			success: function (data) {
				if (data.resp == 'true') {
					swal("运动计划已生成!");
				}
				else {
					swal("运动计划生成失败，请查询运动计划是否已存在");
				}
			},
			error: function () {

			}
		});
	});
	// 删除运动计划
	$('#delSport').click(function () {
		var studentName = $('#studentName4').val();
		var roleId = $('#studentName4').attr('data-id');
		var className = $('#className4').val();
		var campId = $('#className4').attr('data-id');		
		var weekIndex = $('#weekIndex4').val();
		var bodyType= $("#bodyType2 input:checked").val()
		if ($.trim(studentName) == '') {
			swal('请填写学员昵称');
			return false;
		}
		if ($.trim(className) == '') {
			swal('请填写班级名称');
			return false;
		}
		if ($.trim(weekIndex) == '') {
			swal('请填写第几周');
			return false;
		}
		$.ajax({
			url: location.origin + '/v1/api/campScheme/deleteSportPlan?token=' + token,
			type: 'get',
			data: {
				roleId: roleId,
				campId: campId,
				weekIndex: weekIndex,
				bodyType: bodyType
			},
			success: function (data) {
				if (data.code == 200) {
					swal("该运动计划删除成功");
				}
				else {
					swal("该运动计划删除失败");
				}
			},
			error: function () {
				swal("啊哦，网络错误~");
			}


		})
	});
	// 分配运动计划-查看
	$('#search_plan').click(function () {
		var studentName = $('#studentName1').val();
		var roleId = $('#studentName1').attr('data-id');
		var className = $('#className1').val();
		var campId = $('#className1').attr('data-id');		
		var weekIndex = $('#weekIndex1').val();
		console.log(weekIndex);
		if ($.trim(studentName) == '') {
			swal('请填写学员昵称');
			return false;
		}
		if ($.trim(className) == '') {
			swal('请填写班级名称');
			return false;
		}
		if ($.trim(weekIndex) == '') {
			swal('请填写第几周');
			return false;
		}
		$.ajax({
			url:location.origin+'/v1/api/campAdmin/selectStuKeep?roleId='+roleId+'&campId='+campId+'&weekIndex='+weekIndex+'&token='+token,
			type:'get',
			success:function(data){
				if(data.code == 200){
					var data = data.resp;
					$('#plan').val(data.url);
				}
				else{
					swal(data.message)
				}
			}
		})


	});
	// 分配运动计划-修改
	$('#change_plan').click(function () {
		var studentName = $('#studentName1').val();
		var roleId = $('#studentName1').attr('data-id');
		var className = $('#className1').val();
		var campId = $('#className1').attr('data-id');
		var weekIndex = $('#weekIndex1').val();
		var url = $('#plan').val();
		if ($.trim(studentName) == '') {
			swal('请填写学员昵称');
			return false;
		}
		if ($.trim(className) == '') {
			swal('请填写班级名称');
			return false;
		}
		if ($.trim(weekIndex) == '') {
			swal('请填写第几周');
			return false;
		}
		// var data = {
		// 	'roleId':roleId,
		// 	'campId':campId,
		// 	'weekIndex':weekIndex,
		// 	'url':url
		// }
		$.ajax({
			url:location.origin+'/v1/api/campAdmin/updateStuKeep?roleId='+roleId+'&campId='+campId+'&weekIndex='+weekIndex+'&url='+url+'&token='+token,
			type:'POST', 
			success:function(data){
				if(data.code == 200){
					$('.one :text').val('').attr('data-id','');
				}
				else{
					swal(data.message)
				}
			},
			error:function(){
			swal('啊哦，网络错误~');
			}
		})

	})
	fuzzyQuery('#studentName1','.studentList1',location.origin + '/v1/api/campAdmin/selectStuName?token='+token+'&roleId='+roleId+'&studentName=','roleId');
	fuzzyQuery('#className1','.classList1',location.origin + '/v1/api/campAdmin/selectCampName?token='+token+'&roleId='+roleId+'&campName=','id');
	fuzzyQuery('#studentName2','.studentList2',location.origin + '/v1/api/campAdmin/selectStuName?token='+token+'&roleId='+roleId+'&studentName=','roleId');
	fuzzyQuery('#className2','.classList2',location.origin + '/v1/api/campAdmin/selectCampName?token='+token+'&roleId='+roleId+'&campName=','id');
	fuzzyQuery('#studentName3','.studentList3',location.origin + '/v1/api/campAdmin/selectStuName?token='+token+'&roleId='+roleId+'&studentName=','roleId');
	fuzzyQuery('#className3','.classList3',location.origin + '/v1/api/campAdmin/selectCampName?token='+token+'&roleId='+roleId+'&campName=','id');
	fuzzyQuery('#studentName4','.studentList4',location.origin + '/v1/api/campAdmin/selectStuName?token='+token+'&roleId='+roleId+'&studentName=','roleId');
	fuzzyQuery('#className4','.classList4',location.origin + '/v1/api/campAdmin/selectCampName?token='+token+'&roleId='+roleId+'&campName=','id');



});
// 班级昵称、学员昵称模糊查询
function fuzzyQuery(ele, box,url,id) {
	$(ele).on('input', function () {
		var value = $(this).val();
		if ($.trim(value) != '') {
			$.ajax({
				url: url + value,
				type: 'get',
				success: function (data) {
					if (data.code == 200) {
						var data = data.resp;
						var str = '';
						$(box).empty();
						for (var i = 0; i < data.length; i++) {
							str += '<li class="listli" data-id="' + data[i][id] + '">' + data[i].name + '</li>';
						};
						$(box).append(str);
						$('.listli').click(function () {
							$(ele).val($(this).text()).attr('data-id', $(this).attr('data-id'));
							$(box).empty();
						});
					}
					else{
						swal(data.message)
					}
				},
				error: function () {
					swal('啊哦，网络错误~');
				}
			});
		}
		else {
			$(box).empty();
		}
	})
}
// 拖拽图片
function dragImg(ele) {
	var imgElement = document.querySelectorAll(ele);
	for (var i = 0; i < imgElement.length; i++) {
		imgElement[i].draggable = true;
		imgElement[i].ondragstart = function (n) {
			return function (event) {
				event.dataTransfer.setData("Text", event.target.id)
				event.dataTransfer.setData("image", event.target.src);
			}
		}(i)
		imgElement[i].ondragover = function (event) {
			event.preventDefault()
		};
		imgElement[i].ondrop = function (n) {
			return function (event) {
				var dataStr = event.dataTransfer.getData("Text");
				var dataImg = event.dataTransfer.getData("image");
				var fromimg = document.querySelector('#' + dataStr);
				fromimg.src = this.src;
				this.src = dataImg;
				event.preventDefault();
				event.stopPropagation();
			}
		}(i)
	}
}
//创建班级时，获取教练列表
function getCoachList() {
	$("#coachName").bind('input propertychange', function () {
		var value = $.trim($("#coachName").val());
		if (value != "") {
			var ajaxLink = baseUrl + "v1/api/campAdmin/findCoachs";
			$.ajax({
				type: "get",
				url: ajaxLink + "?token=" + token + "&roleId=" + roleId + "&name=" + value,
				dataType: "json",
				// jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
				// jsonpCallback:"flightHandler",
				success: function (data) {
					if (data.result.code == 200) {
						var html = "";
						// console.log("success");
						// console.log(data);
						for (i = 0, len = data.resp.length; i < len; i++) {
							html += '<div class="div_item" roleId=' + data.resp[i].roleId + ' data-id=' + data.resp[i].id + '>' + data.resp[i].name + '</div>';
						}
						$("#div_itemsforcoach").html("");
						$("#div_itemsforcoach").append(html);
						$("#div_itemsforcoach").show();
						$(".div_item").hover(function () {
							$(this).css("background-color", "#66afe9");
						}, function () {
							$(this).css("background-color", "#fff");
						});

						$("#div_itemsforcoach .div_item").unbind("click").click(function (event) {
							event.stopPropagation();
							// console.log($(this).html());
							$("#coachName").val($(this).html());
							$("#coachName").attr("data-roleId", $(this).attr("roleId"));
							$("#coachName").attr("data-id", $(this).attr("data-id"));
						});
						$("body").click(function () {
							$("#div_itemsforcoach").hide();
						});
					} else if (data.result.code == 30000) {
						window.location.href = 'index.html';//超时，跳转到登录页面；
					} else {
						// console.log(data);
						swal(data.message);
					}
				}
			});
		}
	});
	$("#coachName").focus(function () {
		var focus1 = setTimeout(function () {
			var value = $.trim($("#coachName").val());
			if (value != "") {
				var ajaxLink = baseUrl + "v1/api/campAdmin/findCoachs";
				$.ajax({
					type: "get",
					url: ajaxLink + "?token=" + token + "&roleId=" + roleId + "&name=" + value,
					dataType: "json",
					// jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
					// jsonpCallback:"flightHandler",
					success: function (data) {
						if (data.result.code == 200) {
							var html = "";
							// console.log("success");
							// console.log(data);
							for (i = 0, len = data.resp.length; i < len; i++) {
								html += '<div class="div_item" roleId=' + data.resp[i].roleId + ' data-id=' + data.resp[i].id + '>' + data.resp[i].name + '</div>';
							}
							$("#div_itemsforcoach").html("");
							$("#div_itemsforcoach").append(html);
							$("#div_itemsforcoach").show();
							$(".div_item").hover(function () {
								$(this).css("background-color", "#66afe9");
							}, function () {
								$(this).css("background-color", "#fff");
							});

							$("#div_itemsforcoach .div_item").unbind("click").click(function (event) {
								event.stopPropagation();
								// console.log($(this).html());
								$("#coachName").val($(this).html());
								$("#coachName").attr("data-roleId", $(this).attr("roleId"));
								$("#coachName").attr("data-id", $(this).attr("data-id"));
							});
							$("body").click(function () {
								$("#div_itemsforcoach").hide();
							});
						} else if (data.result.code == 30000) {
							window.location.href = 'index.html';//超时，跳转到登录页面；
						} else {
							// console.log(data);
							swal(data.message);
						}
					}
				});
			}

		}, 500);
	});

}
//新增学员时的班级列表
function getClassList() {
	$("#classNameL").bind('input propertychange', function () {
		var value = $.trim($("#classNameL").val());
		if (value != "") {
			var ajaxLink = baseUrl + "v1/api/campAdmin/getAllCampInfo";
			$.ajax({
				type: "get",
				url: ajaxLink + "?token=" + token + "&roleId=" + roleId + "&name=" + value,
				dataType: "json",
				// jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
				// jsonpCallback:"flightHandler",
				success: function (data) {
					if (data.result.code == 200) {
						var html = "";
						// console.log("success");
						// console.log(data);
						for (i = 0, len = data.resp.length; i < len; i++) {
							html += '<div class="div_item" data-id=' + data.resp[i].id + '>' + data.resp[i].name + '</div>';
						}
						$("#div_itemsforAddStu").html("");
						$("#div_itemsforAddStu").append(html);
						$("#div_itemsforAddStu").show();
						$(".div_item").hover(function () {
							$(this).css("background-color", "#66afe9");
						}, function () {
							$(this).css("background-color", "#fff");
						});

						$("#div_itemsforAddStu .div_item").unbind("click").click(function (event) {
							event.stopPropagation();
							// console.log($(this).html());
							$("#classNameL").val($(this).html());
							$("#classNameL").attr("data-id", $(this).attr("data-id"));
						});
						$("body").click(function () {
							$("#div_itemsforAddStu").hide();
						});
					} else if (data.result.code == 30000) {
						window.location.href = 'index.html';//超时，跳转到登录页面；
					}
					else {
						// console.log(data);
						swal(data.message);
					}
				}
			});
		}
	});
	$("#classNameL").focus(function () {
		var focus1 = setTimeout(function () {
			var value = $.trim($("#classNameL").val());
			if (value != "") {
				var ajaxLink = baseUrl + "v1/api/campAdmin/getAllCampInfo";
				$.ajax({
					type: "get",
					url: ajaxLink + "?token=" + token + "&roleId=" + roleId + "&name=" + value,
					dataType: "json",
					// jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
					// jsonpCallback:"flightHandler",
					success: function (data) {
						if (data.result.code == 200) {
							var html = "";
							// console.log("success");
							// console.log(data);
							for (i = 0, len = data.resp.length; i < len; i++) {
								html += '<div class="div_item" data-id=' + data.resp[i].id + '>' + data.resp[i].name + '</div>';
							}
							$("#div_itemsforAddStu").html("");
							$("#div_itemsforAddStu").append(html);
							$("#div_itemsforAddStu").show();
							$(".div_item").hover(function () {
								$(this).css("background-color", "#66afe9");
							}, function () {
								$(this).css("background-color", "#fff");
							});

							$("#div_itemsforAddStu .div_item").unbind("click").click(function (event) {
								event.stopPropagation();
								// console.log($(this).html());
								$("#classNameL").val($(this).html());
								$("#classNameL").attr("data-id", $(this).attr("data-id"));
							});
							$("body").click(function () {
								$("#div_itemsforAddStu").hide();
							});
						} else if (data.result.code == 30000) {
							window.location.href = 'index.html';//超时，跳转到登录页面；
						}
						else {
							// console.log(data);
							swal(data.message);
						}
					}
				});
			}

		}, 500);
	});

}

//创建班级
function creatClass() {
	// alert(11); 
	var ajaxLink = baseUrl + "v1/api/campAdmin/insertCampInfo";
	var className = $.trim($("#className").val());
	var beginTime = $.trim($("#beginTime").val());
	var remark = $.trim($("#remark").val());
	var coachName = $("#coachName").val();
	var weeks = $.trim($("#weeks").val());
	var coachId = $("#coachName").attr("data-id");
	var coachRoleId = $("#coachName").attr("data-roleId");
	// console.log(className);
	// console.log(beginTime);
	// console.log(remark);
	if (className == "" || className == null || weeks == "" || weeks == null || beginTime == "" || beginTime == null || coachName == "" || coachName == null) {
		swal("有必填项为空，请填写必填项。");
	} else if (weeks > 8 || weeks < 1) {
		swal("周数范围限定在1-8周，请仔细核对");
	} else {
		var finalurl = ajaxLink + "?name=" + className + "&weeks=" + weeks + "&remark=" + remark + "&beginTime=" + beginTime + "&coachId=" + coachId + "&coachRoleId=" + coachRoleId + "&token=" + token + "&roleId=" + roleId;
		// console.log(finalurl);
		$.ajax({
			type: "get",
			url: finalurl,
			dataType: "json",
			jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
			jsonpCallback: "flightHandler",
			success: function (data) {
				// console.log(data);
				if (data.result.code == 200) {
					swal(data.message, "", "success");
					$("#className").val("");
					$("#beginTime").val("");
					$("#remark").val("");
					$("#coachName").val("");
					$("#weeks").val("");
				} else if (data.result.code == 30000) {
					window.location.href = 'index.html';//超时，跳转到登录页面；
				}
				else {
					// console.log(data);
					swal(data.message);
				}
			}
		});
	}

}
//添加教练
function addCoach() {
	var ajaxLink = baseUrl + "v1/api/campAdmin/insertCoach";
	var phone = "";
	var email = "";
	var userID = "";
	var selectType = $("#selectForAddCoach option:selected").val();
	if (selectType == "0") {
		phone = $.trim($("#CoachInfoForAdd").val());
	} else if (selectType == "1") {
		email = $.trim($("#CoachInfoForAdd").val());
	} else if (selectType == "2") {
		userID = $.trim($("#CoachInfoForAdd").val());
	}
	var coachNickName = $.trim($("#coachNickName").val());
	var coachRemark = $.trim($("#coachRemark").val());
	if ($.trim($("#CoachInfoForAdd").val()) == "" || $.trim($("#CoachInfoForAdd").val()) == null) {
		swal("有必填项为空，请仔细核对填写!");
	} else {
		$.ajax({
			type: "get",
			url: ajaxLink + "?phoneNo=" + phone + "&email=" + email + "&userId=" + userID + "&name=" + coachNickName + "&remark=" + coachRemark + "&token=" + token + "&roleId=" + roleId,
			dataType: "json",
			success: function (data) {
				// console.log(data);
				if (data.result.code == 200) {
					swal(data.result.message, "", "success");
					$("#CoachInfoForAdd").val("");
					$("#coachNickName").val("");
					$("#coachRemark").val("");
				} else if (data.result.code == 30000) {
					window.location.href = 'index.html';//超时，跳转到登录页面；
				}
				else {
					// console.log(data);
					swal(data.message);
				}
			}
		});
	}
}
//新增学员
function addStudent() {

	if ($.trim($("#youpinId").val()) == "" || $.trim($("#youpinId").val()) == null || $.trim($("#classNameL").val()) == "" || $.trim($("#orderhao").val()) == '') {
		swal("有必填项为空，请仔细核对填写!");
	} else {
		var phoneNo = "";
		var email = "";
		var userId = "";
		var selectType = $("#selectForAddStu option:selected").val();
		if (selectType == "0") {
			phoneNo = $.trim($("#youpinId").val());
		} else if (selectType == "1") {
			email = $.trim($("#youpinId").val());
		} else if (selectType == "2") {
			userId = $.trim($("#youpinId").val());
		}
		var campId = $("#classNameL").attr("data-id");
		var orderId = $.trim($("#orderhao").val());
		var ajaxLink = baseUrl + "v1/api/campAdmin/insertCampStudent";
		$.ajax({
			type: "get",
			url: ajaxLink + "?token=" + token + "&roleId=" + roleId +'&orderId='+orderId + "&phoneNo=" + phoneNo + "&email=" + email + "&userId=" + userId + "&campId=" + campId,
			dataType: "json",
			success: function (data) {
				if (data.result.code == 200) {
					swal(data.message, "", "success");
					$("#youpinId").val("");
					$("#classNameL").val("");
					$("#orderhao").val('');
				} else if (data.result.code == 30000) {
					window.location.href = 'index.html';//超时，跳转到登录页面；
				} else {
					// console.log(data);
					swal(data.message);
				}
			}
		});
	}

}
//获取学员列表

function getStudentList() {
	$("#studentNameL").bind('input propertychange', function () {
		var value = $.trim($("#studentNameL").val());
		if (value != "") {
			var ajaxLink = baseUrl + "v1/api/campAdmin/findNotDistribute";
			$.ajax({
				type: "get",
				url: ajaxLink + "?token=" + token + "&roleId=" + roleId + "&name=" + value,
				dataType: "json",
				// jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
				// jsonpCallback:"flightHandler",
				success: function (data) {
					if (data.result.code == 200) {
						var html = "";
						// console.log("success");
						// console.log(data);
						for (i = 0, len = data.resp.length; i < len; i++) {
							html += '<div class="div_item" data-id=' + data.resp[i].roleId + '>' + data.resp[i].name + '</div>';
						}
						$("#div_itemsforSport").html("");
						$("#div_itemsforSport").append(html);
						$("#div_itemsforSport").show();
						$(".div_item").hover(function () {
							$(this).css("background-color", "#66afe9");
						}, function () {
							$(this).css("background-color", "#fff");
						});

						$("#div_itemsforSport .div_item").unbind("click").click(function (event) {
							event.stopPropagation();
							// console.log($(this).html());
							$("#studentNameL").val($(this).html());
							$("#studentNameL").attr("data-id", $(this).attr("data-id"));
						});
						$("body").click(function () {
							$("#div_itemsforSport").hide();
						});
					} else if (data.result.code == 30000) {
						window.location.href = 'index.html';//超时，跳转到登录页面；
					}
					else {
						// console.log(data);
						swal(data.message);
					}
				}
			});
		}
	});
	$("#studentNameL").focus(function () {
		var focus1 = setTimeout(function () {
			var value = $.trim($("#studentNameL").val());
			if (value != "") {
				var ajaxLink = baseUrl + "v1/api/campAdmin/findNotDistribute";
				$.ajax({
					type: "get",
					url: ajaxLink + "?token=" + token + "&roleId=" + roleId + "&name=" + value,
					dataType: "json",
					// jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
					// jsonpCallback:"flightHandler",
					success: function (data) {
						if (data.result.code == 200) {
							var html = "";
							// console.log("success");
							// console.log(data);
							for (i = 0, len = data.resp.length; i < len; i++) {
								html += '<div class="div_item" data-id=' + data.resp[i].roleId + '>' + data.resp[i].name + '</div>';
							}
							$("#div_itemsforSport").html("");
							$("#div_itemsforSport").append(html);
							$("#div_itemsforSport").show();
							$(".div_item").hover(function () {
								$(this).css("background-color", "#66afe9");
							}, function () {
								$(this).css("background-color", "#fff");
							});

							$("#div_itemsforSport .div_item").unbind("click").click(function (event) {
								event.stopPropagation();
								// console.log($(this).html());
								$("#studentNameL").val($(this).html());
								$("#studentNameL").attr("data-id", $(this).attr("data-id"));
							});
							$("body").click(function () {
								$("#div_itemsforSport").hide();
							});
						} else if (data.result.code == 30000) {
							window.location.href = 'index.html';//超时，跳转到登录页面；
						}
						else {
							// console.log(data);
							swal(data.message);
						}
					}
				});
			}

		}, 500);
	});

}
//查询所有运动计划列表
function getAllSportList() {
	$("#weeksForSport").bind('input propertychange', function () {
		var value = $.trim($("#weeksForSport").val());
		if (value != "") {
			var ajaxLink = baseUrl + "v1/api/campAdmin/findArtical";
			$.ajax({
				type: "get",
				url: ajaxLink + "?token=" + token + "&roleId=" + roleId + "&name=" + value,
				dataType: "json",
				// jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
				// jsonpCallback:"flightHandler",
				success: function (data) {
					if (data.result.code == 200) {
						var html = "";
						// console.log("success");
						// console.log(data);
						for (i = 0, len = data.resp.length; i < len; i++) {
							html += '<div class="div_item" data-id=' + data.resp[i].link + '>' + data.resp[i].title + '</div>';
						}
						$("#div_itemsforWeeks").html("");
						$("#div_itemsforWeeks").append(html);
						$("#div_itemsforWeeks").show();
						$(".div_item").hover(function () {
							$(this).css("background-color", "#66afe9");
						}, function () {
							$(this).css("background-color", "#fff");
						});

						$("#div_itemsforWeeks .div_item").unbind("click").click(function (event) {
							event.stopPropagation();
							// console.log($(this).html());
							$("#weeksForSport").val($(this).html());
							$("#weeksForSport").attr("data-id", $(this).attr("data-id"));
						});
						$("body").click(function () {
							$("#div_itemsforWeeks").hide();
						});
					} else if (data.result.code == 30000) {
						window.location.href = 'index.html';//超时，跳转到登录页面；
					}
					else {
						// console.log(data);
						swal(data.message);
					}
				}
			});
		}
	});
	$("#weeksForSport").focus(function () {
		var focus1 = setTimeout(function () {
			var value = $.trim($("#weeksForSport").val());
			if (value != "") {
				var ajaxLink = baseUrl + "v1/api/campAdmin/findArtical";
				$.ajax({
					type: "get",
					url: ajaxLink + "?token=" + token + "&roleId=" + roleId + "&name=" + value,
					dataType: "json",
					// jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
					// jsonpCallback:"flightHandler",
					success: function (data) {
						if (data.result.code == 200) {
							var html = "";
							// console.log("success");
							// console.log(data);
							for (i = 0, len = data.resp.length; i < len; i++) {
								html += '<div class="div_item" data-id=' + data.resp[i].link + '>' + data.resp[i].title + '</div>';
							}
							$("#div_itemsforWeeks").html("");
							$("#div_itemsforWeeks").append(html);
							$("#div_itemsforWeeks").show();
							$(".div_item").hover(function () {
								$(this).css("background-color", "#66afe9");
							}, function () {
								$(this).css("background-color", "#fff");
							});

							$("#div_itemsforWeeks .div_item").unbind("click").click(function (event) {
								event.stopPropagation();
								// console.log($(this).html());
								$("#weeksForSport").val($(this).html());
								$("#weeksForSport").attr("data-id", $(this).attr("data-id"));
							});
							$("body").click(function () {
								$("#div_itemsforWeeks").hide();
							});
						} else if (data.result.code == 30000) {
							window.location.href = 'index.html';//超时，跳转到登录页面；
						}
						else {
							// console.log(data);
							swal(data.message);
						}
					}
				});
			}

		}, 500);
	});

}
//分配运动
function submitSport() {
	var ajaxLink = baseUrl + "v1/api/campAdmin/insertCampSchemes";
	var roleIdL = $("#studentNameL").attr("data-id");
	var sportValueWeek = $("#selectForweeks option:checked").val();
	var studentNameL = $.trim($("#studentNameL").val());
	var weeksForSport = $.trim($("#weeksForSport").val());
	var schemeUrl = $("#weeksForSport").attr("data-id");
	if (studentNameL == "" || studentNameL == null || weeksForSport == "" || weeksForSport == null) {
		swal("有必填项为空，请填写必填项。");
	} else {
		var finalurl = ajaxLink + "?token=" + token + "&schemeRoleId=" + roleIdL + "&schemeUrl=" + schemeUrl + "&weeks=" + sportValueWeek;
		// console.log(finalurl);
		$.ajax({
			type: "get",
			url: finalurl,
			dataType: "json",
			// jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
			// jsonpCallback:"flightHandler",
			success: function (data) {
				// console.log(data);
				if (data.result.code == 200) {
					// console.log("success");
					// console.log(data);
					swal(data.message, "", "success");
					$("#studentNameL").val("");
					$("#weeksForSport").val("");
				} else if (data.result.code == 30000) {
					window.location.href = 'index.html';//超时，跳转到登录页面；
				} else {
					// console.log(data);
					swal(data.message);
				}
			}
		});
	}
}
//批量导入学员
function addStuMany() {

	if ($("#addStuFormfile").val() == "") {
		swal("您还未上传文件，请上传文件后再来导入吧~", "", "warning");
	} else {
		var formData = new FormData($("#addStuForm")[0]);
		$.ajax({
			url: baseUrl + "v1/api/campAdmin/batchImportCampStudent" + "?token=" + token + "&roleId=" + roleId,
			type: 'POST',
			data: formData,
			async: false,
			cache: false,
			contentType: false,
			processData: false,
			success: function (data) {
				if (data.result.code == 200) {
					swal(data.result.message, "", "success");
				} else if (data.result.code == 30000) {
					window.location.href = 'index.html';//超时，跳转到登录页面；
				} else {
					swal(data.result.message);
				}
			},
			error: function (data) {
				swal(data.message);
			}
		});
	}

}
//批量导入运动计划
function addSportMany() {
	if ($("#addSportFormfile").val() == "") {
		swal("您还未上传文件，请上传文件后再来导入吧~", "", "warning");
	} else {
		var formData = new FormData($("#addSportForm")[0]);
		$.ajax({
			url: baseUrl + "v1/api/campAdmin/importScheme" + "?token=" + token + "&roleId=" + roleId,
			type: 'POST',
			data: formData,
			async: false,
			cache: false,
			contentType: false,
			processData: false,
			success: function (data) {
				if (data.result.code == 200) {
					swal(data.result.message, "", "success");
				} else if (data.result.code == 30000) {
					window.location.href = 'index.html';//超时，跳转到登录页面；
				} else {
					swal(data.result.message);
				}

			},
			error: function (data) {
				swal(data.message);
			}
		});
	}
}


//批量导入订单信息
function addOrderInfo() {
	if ($("#addOrderInfoFormfile").val() == "") {
		swal("您还未上传文件，请上传文件后再来导入吧~", "", "warning");
	} else {
		var formData = new FormData($("#addOrderInfoForm")[0]);
		$.ajax({
			url: baseUrl + "v1/api/campOrder/batchImportCampOrder" + "?token=" + token + "&roleId=" + roleId,
			type: 'POST',
			data: formData,
			async: false,
			cache: false,
			contentType: false,
			processData: false,
			success: function (data) {
				if (data.result.code == 200) {
					swal(data.result.message, "", "success");
				} else if (data.result.code == 30000) {
					window.location.href = 'index.html';//超时，跳转到登录页面；
				} else {
					swal(data.result.message);
				}

			},
			error: function (data) {
				swal(data.message);
			}
		});
	}
}
function delImg(param) {
	
	$(".upload_append_list").hover(
		function (e) {
			$(this).find(".file_bar").addClass("file_hover");
		}, function (e) {
			$(this).find(".file_bar").removeClass("file_hover");
		}
	);
	if ($(".file_del").length > 0) {
		// console.log(1);
		// 删除方法
		$(".file_del").click(function () {
			$(this).parents('.upload_append_list').remove();
			// console.log($(this));
			// var index = $(this).attr("data-index" + param);
			// console.log(param)
			// console.log(index)
			// $(".upload_append_list[index" + param + "='" + index + "']").css("display", "none");
		});
	}
};
//促销工具下拉选
// function findType(){
// 		var ajaxLink = baseUrl+"v1/api/campCoupon/findType"+"?token="+token+"&roleId="+roleId;
// 		$.ajax({
// 				type: "get",
// 				url: ajaxLink,
// 				dataType: "json",
// 				jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
// 				jsonpCallback:"flightHandler",
// 				success : function (data) {
// 					console.log(data);
// 					if(data.result.code==200){
// 						var html="";
// 						console.log("success");
// 						console.log(data);
// 						for(i=0,len=data.resp.length;i<len;i++){
// 							html+="<option value="+data.resp[i].id+">"+data.resp[i].name+"</option>"
// 						}
// 						$("#cuXiao").append(html);
// 						$("#cuXiao2").append(html);
// 						console.log($("#cuXiao option:selected").val());
// 					}else if(data.result.code==30000){
//                    				 window.location.href = 'index.html';//超时，跳转到登录页面；
//                 	}else{
// 						console.log(data);
// 						swal(data.message);
// 					}
// 				}
// 		});
// }
//新建/编辑/删除商品
function operateGoods(param) {
	var id = "";
	var goodName = ""; //商品名称
	var goodId = ""; //商品代号
	var goodTip = "";
	var originPrice = ""; //商品原价
	var nowPrice = ""; //商品现价
	var oldstorage = ""; //原始库存
	var newstorage = ""; //实际库存
	var giftsType = ""; //促销类型
	var yuReTime = ""; //预热时间
	var saleTime = ""; //开售时间
	var campBeginTime = ""; //开营时间
	var isDel = 0;
	var data = {};
	if (param) {
		if (param == "edit") {
			var imglist3 = [];
			var uploadImgList3 = $("#imglist3 .upload_append_list");
			if (uploadImgList3.length > 0) {
				uploadImgList3.each(function () {
					//判断每一个div，其css中display是否为block
					if ($(this).css("display") == "block") {
						var url4 = $(this).find('.imgBox .uploadImg img').attr("src");
						var dataUrl = {
							"url": url4
						}
						imglist3.push(dataUrl);
					}
				});
			}
			var imglist4 = [];
			var uploadImgList4 = $("#imglist4 .upload_append_list");
			if (uploadImgList4.length > 0) {
				uploadImgList4.each(function () {
					//判断每一个div，其css中display是否为block
					if ($(this).css("display") == "block") {
						var url5 = $(this).find('.imgBox .uploadImg img').attr("src");
						var dataUrl = {
							"url": url5
						}
						imglist4.push(dataUrl);
					}
				});
			}
			var imglist6 = [];
			var uploadImgList6 = $("#imglist6 .upload_append_list");
			if (uploadImgList6.length > 0) {
				uploadImgList6.each(function () {
					//判断每一个div，其css中display是否为block
					if ($(this).css("display") == "block") {
						var url5 = $(this).find('.imgBox .uploadImg img').attr("src");
						var dataUrl = {
							"url": url5
						}
						imglist6.push(dataUrl);
					}
				});
			}
			// swal("编辑商品");
			id = $.trim($("#hiddenGoodsId").val());
			if ($("#goodtype2 option:selected").val() == "" || $.trim($("#goodName2").val()) == "" || $.trim($("#goodId2").val()) == "" || $.trim($("#originPrice2").val()) == "" || $.trim($("#nowPrice2").val()) == "" || $.trim($("#oldstorage2").val()) == ""
				|| $.trim($("#campWeeks2").val()) == "" || $.trim($("#newstorage2").val()) == "" || $.trim($("#yuReTime2").val()) == "" || $.trim($("#saleTime2").val()) == "" || $.trim($("#kaiYing2").val()) == "" || $.trim($("#goodTip2").val()) == "") {
				swal("有必填项为空，请认真填写!");
			} else {
				data = {
					"id": id,
					"name": $.trim($("#goodName2").val()),
					"code": $.trim($("#goodId2").val()),
					"good_reminder": $.trim($("#goodTip2").val()),
					"originPrice": $.trim($("#originPrice2").val()),
					"curentPrice": $.trim($("#nowPrice2").val()),
					"origin_stock": $.trim($("#oldstorage2").val()),
					"stock": $.trim($("#newstorage2").val()),
					"giftsType": $("#cuXiao2 option:selected").val(),
					"preheatingTime": $.trim($("#yuReTime2").val()),
					"saleTime": $.trim($("#saleTime2").val()),
					"beginTime": $.trim($("#kaiYing2").val()),
					"week": $.trim($("#campWeeks2").val()),
					"nextId": $.trim($("#nextCampSale2").val()),
					"picture": JSON.stringify(imglist3),
					"good_desc": JSON.stringify(imglist4),
					"replys": JSON.stringify(imglist6),
					"isDel": isDel,
					"goodsType": $("#goodtype2 option:selected").val()
				}

				var goodsData = JSON.stringify(data);
				// console.info(goodsData);
				var finalUrl = baseUrl + "v1/api/campGoods/operateGoods" + "?token=" + token + "&roleId=" + roleId;

				// console.info(finalUrl);
				$.ajax({
					type: "POST",
					data: goodsData,
					url: finalUrl,
					dataType: "json",
					contentType: 'application/json',
					success: function (data) {
						if (data.code == 200) {
							swal("保存成功!", "", "success");
							$('.goodsList').show();
							$('#editGoods').hide();
							// var yulanUrl = baseUrl+"web/fatburnSystem/productDetails.html"+"?id="+id+"&typeSize="+$("#goodtype2 option:selected").val()+"&refer=1";
							// swal(data.message, "", "success");	
							// swal({
							//   title: "商品编辑成功，已生成预览链接",
							//   // text: "Write something interesting:",
							//   type: "input",
							//   showCancelButton: true,
							//   closeOnConfirm: false,
							//   confirmButtonText: "复制",
							//   cancelButtonText: "取消",
							//   animation: "slide-from-top",
							//   inputPlaceholder: "",
							//   inputValue:''//   inputValue:yulanUrl

							// },
							// function(inputValue){
							//   if (inputValue === false) return false;

							//   if (inputValue === "") {
							//     swal.showInputError("没有可复制的内容哦~");
							//     return false
							//   }
							//     var Url2=$("fieldset input");
							//     Url2.select(); // 选择对象
							//     document.execCommand("Copy"); // 执行浏览器复制命令
							//   	swal("复制成功!", "", "success");
							// });
						} else if (data.result.code == 30000) {
							window.location.href = 'index.html';//超时，跳转到登录页面；
						} else {
							swal(data.message);
						}
					}
				});
			}

		} else {
			// swal("删除商品");
			id = param;
			isDel = 1;
			data = {
				"id": id,
				"isDel": isDel
			}
			var goodsData = JSON.stringify(data);
			// console.info(goodsData);
			var finalUrl = baseUrl + "v1/api/campGoods/operateGoods" + "?token=" + token + "&roleId=" + roleId;

			// console.info(finalUrl);
			$.ajax({
				type: "POST",
				data: goodsData,
				url: finalUrl,
				dataType: "json",
				contentType: 'application/json',
				success: function (data) {
					if (data.code == 200) {
						swal(data.message, "", "success");
						if (param) {
							findGoods(1, 10);
						}
					} else if (data.result.code == 30000) {
						window.location.href = 'index.html';//超时，跳转到登录页面；
					} else {
						swal(data.message);
					}
				}
			});
		}
	} else {
		var imglist1 = [];
		var uploadImgList1 = $("#imglist .upload_append_list");
		if (uploadImgList1.length > 0) {
			uploadImgList1.each(function () {
				//判断每一个div，其css中display是否为block
				if ($(this).css("display") == "block") {
					var url2 = $(this).find('.imgBox .uploadImg img').attr("src");
					var dataUrl = {
						"url": url2
					}
					imglist1.push(dataUrl);
				}
			});
		}
		var imglist2 = [];
		var uploadImgList2 = $("#imglist2 .upload_append_list");
		if (uploadImgList2.length > 0) {
			uploadImgList2.each(function () {
				//判断每一个div，其css中display是否为block
				if ($(this).css("display") == "block") {
					var url3 = $(this).find('.imgBox .uploadImg img').attr("src");
					var dataUrl = {
						"url": url3
					}
					imglist2.push(dataUrl);
				}
			});
		}

		var imglist5 = [];
		var uploadImgList5 = $("#imglist5 .upload_append_list");
		if (uploadImgList5.length > 0) {
			uploadImgList5.each(function () {
				//判断每一个div，其css中display是否为block
				if ($(this).css("display") == "block") {
					var url3 = $(this).find('.imgBox .uploadImg img').attr("src");
					var dataUrl = {
						"url": url3
					}
					imglist5.push(dataUrl);
				}
			});
		}
		// swal("创建商品");

		if ($("#goodtype1 option:selected").val() == "" || $.trim($("#goodName1").val()) == "" || $.trim($("#goodId").val()) == "" || $.trim($("#originPrice").val()) == "" || $.trim($("#nowPrice").val()) == "" || $.trim($("#oldstorage").val()) == ""
			|| $.trim($("#campWeeks").val()) == "" || $.trim($("#newstorage").val()) == "" || $.trim($("#yuReTime").val()) == "" || $.trim($("#saleTime").val()) == "" || $.trim($("#kaiYing").val()) == "" || $.trim($("#goodTip").val()) == "") {
			swal("有必填项为空，请认真填写!");
		} else {
			data = {
				"name": $.trim($("#goodName1").val()),
				"code": $.trim($("#goodId").val()),
				"good_reminder": $.trim($("#goodTip").val()),
				"originPrice": $.trim($("#originPrice").val()),
				"curentPrice": $.trim($("#nowPrice").val()),
				"origin_stock": $.trim($("#oldstorage").val()),
				"stock": $.trim($("#newstorage").val()),
				"giftsType": $("#cuXiao option:selected").val(),
				"preheatingTime": $.trim($("#yuReTime").val()),
				"saleTime": $.trim($("#saleTime").val()),
				"beginTime": $.trim($("#kaiYing").val()),
				"week": $.trim($("#campWeeks").val()),
				"nextId": $.trim($("#nextCampSale").val()),
				"picture": JSON.stringify(imglist1),
				"good_desc": JSON.stringify(imglist2),
				"replys": JSON.stringify(imglist5),
				"isDel": isDel,
				"goodsType": $("#goodtype1 option:selected").val()
			}
			var goodsData = JSON.stringify(data);
			// console.info(goodsData);
			var finalUrl = baseUrl + "v1/api/campGoods/operateGoods" + "?token=" + token + "&roleId=" + roleId;

			// console.info(finalUrl);
			$.ajax({
				type: "POST",
				data: goodsData,
				url: finalUrl,
				dataType: "json",
				contentType: 'application/json',
				success: function (data) {
					if (data.code == 200) {
						var yulanUrl = baseUrl + "web/fatburnSystem/productDetails.html" + "?id=" + data.resp + "&typeSize=" + $("#goodtype1 option:selected").val() + "&refer=1";
						// swal(data.message, "", "success");	
						swal({
							title: "商品创建成功，已生成预览链接",
							// text: "Write something interesting:",
							type: "input",
							showCancelButton: true,
							closeOnConfirm: false,
							confirmButtonText: "复制",
							cancelButtonText: "取消",
							animation: "slide-from-top",
							inputPlaceholder: "",
							inputValue: yulanUrl
						},
							function (inputValue) {
								if (inputValue === false) return false;

								if (inputValue === "") {
									swal.showInputError("没有可复制的内容哦~");
									return false
								}
								var Url2 = $("fieldset input");
								Url2.select(); // 选择对象
								document.execCommand("Copy"); // 执行浏览器复制命令
								swal("复制成功!", "", "success");
							});

					} else if (data.result.code == 30000) {
						window.location.href = 'index.html';//超时，跳转到登录页面；
					} else {
						swal(data.message);
					}
				}
			});
		}

	}

}
//获取商品列表
function findGoods(pageNow, pageSize) {
	var ajaxLink = baseUrl + "v1/api/campGoods/findGoods" + "?pageNow=" + pageNow + "&pageSize=" + pageSize + "&token=" + token + "&roleId=" + roleId;
	$.ajax({
		type: "get",
		url: ajaxLink,
		dataType: "json",
		jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
		jsonpCallback: "flightHandler",
		success: function (data) {
			// console.log(data);
			if (data.result.code == 200) {
				if (data.resp.records.length > 0) {
					var str = "";
					var str2 = '<td></td>';
					for (i = 0; i < data.resp.records.length; i++) {
						if (data.resp.records[i].status == 1) {
							str2 = '<td>售罄</td>';
						} else if (data.resp.records[i].status == 2) {
							str2 = '<td>已开售</td>';
						} else if (data.resp.records[i].status == 3) {
							str2 = '<td>未开售</td>';
						}


						var str = str + '<tr>' +
							// '<td><input type="checkbox" checked></td>'+
							'<td>' + data.resp.records[i].goodName + '</td>' +
							'<td>' + data.resp.records[i].goodsId + '</td>' +
							'<td>' + data.resp.records[i].originPrice + '</td>' +
							'<td>' + data.resp.records[i].stock + '</td>' +
							'<td>' + data.resp.records[i].substock + '</td>' +
							'<td>' + data.resp.records[i].createTime + '</td>' +
							str2 +
							'<td><span class="goodEdit blue" goodsId=' + data.resp.records[i].goodsId + ' onclick="editgoods(' + data.resp.records[i].goodsId + ')">编辑</span>&emsp;<span class="goodCopy blue" goodsId=' + data.resp.records[i].goodsId + ' onclick="copyGoodInfo(' + data.resp.records[i].goodsId + ')">复制</span>&emsp;<span class="goodDel blue" goodsId=' + data.resp.records[i].goodsId + ' onclick="delGoods(' + data.resp.records[i].goodsId + ')">删除</span>' +
							'&emsp;<span class="blue bannerUrl" url=' + data.resp.records[i].banner + '>生成链接</span></td>' +
							'</tr>';
					}
					$("#goodsList").html("");
					$("#goodsList").append(str);

					$(".bannerUrl").unbind("click").click(function () {
						var bannerUrl = $(this).attr("url");
						swal({
							title: "已生成链接",
							// text: "Write something interesting:",
							type: "input",
							showCancelButton: true,
							closeOnConfirm: false,
							confirmButtonText: "复制",
							cancelButtonText: "取消",
							animation: "slide-from-top",
							inputPlaceholder: "",
							inputValue: bannerUrl
						},
							function (inputValue) {
								if (inputValue === false) return false;

								if (inputValue === "") {
									swal.showInputError("没有可复制的内容哦~");
									return false
								}
								var Url2 = $("fieldset input");
								Url2.select(); // 选择对象
								document.execCommand("Copy"); // 执行浏览器复制命令
								swal("复制成功!", "", "success");
							});
					});
				}

				if (data.resp.pageCount > data.resp.pageNow) {
					$("#goodsListAfter").css("background-color", "green");
					$("#goodsListAfter").unbind("click").click(function () {
						findGoods(data.resp.pageNow + 1, 10);
					});
				} else {
					$("#goodsListAfter").css("background-color", "#ccc");
					$("#goodsListAfter").unbind("click");
				}
				if (data.resp.pageNow > 1) {
					$("#goodsListBefore").css("background-color", "green");
					$("#goodsListBefore").unbind("click").click(function () {
						findGoods(data.resp.pageNow - 1, 10);
					});
				} else {
					$("#goodsListBefore").css("background-color", "#ccc");
					$("#goodsListBefore").unbind("click");
				}
			} else if (data.result.code == 30000) {
				window.location.href = 'index.html';//超时，跳转到登录页面；
			} else {
				// console.log(data);
				swal(data.message);
			}
		}
	});
}
//删除商品
function delGoods(param) {
	swal({
		title: "你确定要删除这条商品信息吗?",
		// text: "You will not be able to recover this imaginary file!",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "删除",
		cancelButtonText: "取消",
		closeOnConfirm: false
	},
		function () {
			operateGoods(param);
		});
}
//时间日历插件引用
function TimePicker(param) {
	$(param).datetimepicker({
		//showOn: "button",
		//buttonImage: "./css/images/icon_calendar.gif",
		//buttonImageOnly: true,
		showSecond: true,
		timeFormat: 'hh:mm:ss',
		stepHour: 1,
		stepMinute: 1,
		stepSecond: 1
	});
}

//全选按钮js操作
function checkAll() {
	$("#goodsCheckAll").change(function () {
		if ($("#goodsCheckAll").prop("checked")) {
			$("#goodsList input[type=checkbox]").attr("checked", true);
		} else {
			$("#goodsList input[type=checkbox]").attr("checked", false);
		}
	});
}
//商品列表点击编辑
function editgoods(param) {

	$(".goodsList").css("display", "none");
	$("#editGoods").css("display", "block");
	var goodsId = $(this).attr("goodsid");
	var ajaxLink = baseUrl + "v1/api/campAdmin/getGoodsInfo" + "?id=" + param + "&token=" + token + "&roleId=" + roleId;
	$.ajax({
		type: "get",
		url: ajaxLink,
		dataType: "json",
		jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
		jsonpCallback: "flightHandler",
		success: function (data) {
			$("#imglist3").html("");
			$("#imglist4").html("");
			$("#imglist6").html("");
			// console.log(data);
			if (data.result.code == 200) {
				if (data.resp.name != null) {
					$("#editGoods #goodName2").val(data.resp.name);
				} else {
					$("#editGoods #goodName2").val("");
				}
				if (data.resp.code != null) {
					$("#editGoods #goodId2").val(data.resp.code);
				} else {
					$("#editGoods #goodId2").val("");
				}
				if (data.resp.originPrice != null) {
					$("#editGoods #originPrice2").val(data.resp.originPrice);
				} else {
					$("#editGoods #originPrice2").val("");
				}
				if (data.resp.curentPrice != null) {
					$("#editGoods #nowPrice2").val(data.resp.curentPrice);
				} else {
					$("#editGoods #nowPrice2").val("");
				}
				if (data.resp.origin_stock != null) {
					$("#editGoods #oldstorage2").val(data.resp.origin_stock);
				} else {
					$("#editGoods #oldstorage2").val("");
				}
				if (data.resp.stock != null) {
					$("#editGoods #newstorage2").val(data.resp.stock);
				} else {
					$("#editGoods #newstorage2").val("");
				}
				if (data.resp.preheatingTime != null) {
					$("#editGoods #yuReTime2").val(data.resp.preheatingTime);
				} else {
					$("#editGoods #yuReTime2").val("");
				}
				if (data.resp.saleTime != null) {
					$("#editGoods #saleTime2").val(data.resp.saleTime);
				} else {
					$("#editGoods #saleTime2").val("");
				}
				if (data.resp.beginTime != null) {
					$("#editGoods #kaiYing2").val(data.resp.beginTime);
				} else {
					$("#editGoods #kaiYing2").val("");
				}
				if (data.resp.good_reminder != null) {
					$("#editGoods #goodTip2").val(data.resp.good_reminder);
				} else {
					$("#editGoods #goodTip2").val("");
				}
				if (data.resp.week != null) {
					$("#editGoods #campWeeks2").val(data.resp.week);
				} else {
					$("#editGoods #campWeeks2").val("");
				}
				if (data.resp.nextId != null) {
					$("#editGoods #nextCampSale2").val(data.resp.nextId);
				} else {
					$("#editGoods #nextCampSale2").val("");
				}
				$("#editGoods #hiddenGoodsId").val(data.resp.id);

				if (data.resp.giftsType != null) {
					$("#editGoods #cuXiao2").attr("value", data.resp.giftsType);
				} else {
					$("#editGoods #cuXiao2").attr("value", "");
				}
				if (data.resp.goodsType != null) {
					$("#editGoods #goodtype2").attr("value", data.resp.goodsType);
				} else {
					$("#editGoods #goodtype2").attr("value", "");
				}
				if (data.resp.picture && data.resp.picture != null) {
					var editImgHeadList = JSON.parse(data.resp.picture);
					if (editImgHeadList.length > 0) {
						for (i = 0; i < editImgHeadList.length; i++) {
							var str = '<div class="upload_append_list" index3=' + imgIndex3 + '>' +
								'<div class="file_bar">' +
								'<div style="padding:5px;">' +
								'<p class="file_name"></p>' +
								'<span class="file_del" data-index3=' + imgIndex3 + ' title="删除"></span>' +
								'</div>' +
								'</div>' +
								'<a style="height:100px;width:120px;" href="#" class="imgBox">' +
								'<div class="uploadImg" style="width:105px;">' +
								'<img id="" class="upload_image" src=' + editImgHeadList[i].url + ' style="width:expression(this.width > 105 ? 105px :this.width)">' +
								'</div>' +
								'</a>' +
								'</div>';
							$("#imglist3").append(str);
							imgIndex3++;
							delImg(3);
						}
					}
				} else { }
				if (data.resp.good_desc && data.resp.good_desc != null) {
					var editImgGoodsList = JSON.parse(data.resp.good_desc);
					if (editImgGoodsList.length > 0) {
						for (i = 0; i < editImgGoodsList.length; i++) {
							var str = '<div class="upload_append_list" index4=' + imgIndex4 + '>' +
								'<div class="file_bar">' +
								'<div style="padding:5px;">' +
								'<p class="file_name"></p>' +
								'<span class="file_del" data-index4=' + imgIndex4 + ' title="删除"></span>' +
								'</div>' +
								'</div>' +
								'<a style="height:100px;width:120px;" href="#" class="imgBox">' +
								'<div class="uploadImg" style="width:105px;">' +
								'<img id="" class="upload_image" src=' + editImgGoodsList[i].url + ' style="width:expression(this.width > 105 ? 105px :this.width)">' +
								'</div>' +
								'</a>' +
								'</div>';
							$("#imglist4").append(str);
							imgIndex4++;
							delImg(4);
						}
					}
				} else { }
				if (data.resp.replys && data.resp.replys != null) {
					var replys2 = JSON.parse(data.resp.replys);
					if (replys2.length > 0) {
						for (i = 0; i < replys2.length; i++) {
							var str = '<div class="upload_append_list" index6=' + imgIndex6 + '>' +
								'<div class="file_bar">' +
								'<div style="padding:5px;">' +
								'<p class="file_name"></p>' +
								'<span class="file_del" data-index6=' + imgIndex6 + ' title="删除"></span>' +
								'</div>' +
								'</div>' +
								'<a style="height:100px;width:120px;" href="#" class="imgBox">' +
								'<div class="uploadImg" style="width:105px;">' +
								'<img id="" class="upload_image" src=' + replys2[i].url + ' style="width:expression(this.width > 105 ? 105px :this.width)">' +
								'</div>' +
								'</a>' +
								'</div>';
							$("#imglist6").append(str);
							imgIndex6++;
							delImg(6);
						}
					}
				} else { }
			} else if (data.result.code == 30000) {
				window.location.href = 'index.html';//超时，跳转到登录页面；
			}
			else {
				// console.log(data);
				swal(data.message);
			}
		}
	});
}
//创建优惠券是否推广复选框
function isPromote() {
	$("#tuiGuang").change(function () {
		if ($("#tuiGuang").prop("checked")) {
			$("#tuiGuang").attr("value", "0");
		} else {
			$("#tuiGuang").attr("value", "1");
		}
	});
	$("#tuiGuang2").change(function () {
		if ($("#tuiGuang2").prop("checked")) {
			$("#tuiGuang2").attr("value", "0");
		} else {
			$("#tuiGuang2").attr("value", "1");
		}
	});
}
//创建优惠券
function createCoupon(id, couponType2) {
	// alert("测试roleId-----------------------"+roleId);
	if (id) {
		var name = $.trim($("#aboutNames2").val());
		var value = $.trim($("#aboutPrice2").val());
		var days = $.trim($("#expire2").val());
		var type = couponType2;
		var lim = $.trim($("#xianLing2").val());
		var link = $.trim($("#outLink2").val());
		var isPromote = $("#tuiGuang2").attr("value");
		var rule = $.trim($("#couponRule2").val());
		if (couponType2 == 1) {
			if (name == "" || value == "" || days == "" || lim == "" || link== '') {
				swal("有必填项为空，请仔细核对填写！");
			} else {
				var data2 = {
					"id": id,
					"name": name,
					"value": value,
					"days": days,
					"type": type,
					"limit": lim,
					"link": link,
					"isPromote": isPromote,
					"rule": rule
				}
				var finalData = JSON.stringify(data2);
				var finalUrl = baseUrl + "v1/api/campAdmin/operateCouponType" + "?token=" + token + "&roleId=" + roleId;
				// console.info(finalUrl);
				// console.info(finalData);
				$.ajax({
					type: "POST",
					data: finalData,
					url: finalUrl,
					dataType: "json",
					contentType: 'application/json',
					success: function (data) {
						if (data.code == 200) {
							swal(data.message, "", "success");
						} else if (data.result.code == 30000) {
							window.location.href = 'index.html';//超时，跳转到登录页面；
						} else {
							swal(data.message);
						}
					}
				});
			}
		} else {
			if ($("#uploadYHM2").val() == "") {
				if (name == "" || value == "" || days == "" || lim == "" || link == '') {
					swal("有必填项为空，请仔细核对填写！");
				} else {
					var data2 = {
						"id": id,
						"name": name,
						"value": value,
						"days": days,
						"type": type,
						"limit": lim,
						"link": link,
						"isPromote": isPromote,
						"rule": rule
					}
					var finalData = JSON.stringify(data2);
					var finalUrl = baseUrl + "v1/api/campAdmin/operateCouponType" + "?token=" + token + "&roleId=" + roleId;
					// console.info(finalUrl);
					// console.info(finalData);
					$.ajax({
						type: "POST",
						data: finalData,
						url: finalUrl,
						dataType: "json",
						contentType: 'application/json',
						success: function (data) {
							if (data.code == 200) {
								swal(data.message, "", "success");
							} else if (data.result.code == 30000) {
								window.location.href = 'index.html';//超时，跳转到登录页面；
							} else {
								swal(data.message);
							}
						}
					});
				}
			} else {
				if (name == "" || value == "" || days == "" || type == "" || lim == "" || link == '') {
					swal("有必填项为空，请仔细核对填写！");
				} else {
					var formData = new FormData($("#couponform2")[0]);
					$.ajax({
						url: baseUrl + "v1/api/campAdmin/operateCouponCode" + "?token=" + token + "&roleId=" + roleId,
						type: 'POST',
						data: formData,
						async: false,
						cache: false,
						contentType: false,
						processData: false,
						success: function (data) {
							swal(data.message, "", "success");
						},
						error: function (data) {
							swal(data.message);
						}
					});
				}
			}

		}


	} else {
		var couponType = $('#couponform input[name="type"]:checked').val();
		// console.log(couponType);
		if (couponType == 1) {
			var name = $.trim($("#aboutNames").val());
			var value = $.trim($("#aboutPrice").val());
			var days = $.trim($("#expire").val());
			var type = couponType;
			var lim = $.trim($("#xianLing").val());
			var link = $.trim($("#outLink").val());
			var isPromote = $("#tuiGuang").attr("value");
			var rule = $.trim($("#couponRule").val());
			if (name == "" || value == "" || days == "" || type == "" || lim == "" || link == "") {
				swal("有必填项为空，请仔细核对填写！");
			} else {
				var data2 = {
					// token:token,
					// roleId:roleId,
					"name": name,
					"value": value,
					"days": days,
					"type": type,
					"limit": lim,
					"link": link,
					"isPromote": isPromote,
					"rule": rule
				}
				var finalData = JSON.stringify(data2);
				//var finalData2='{'+'"name":'+name+',"value":'+value+',"days":'+days+',"type":'+type+',"limit":'+lim+',"link":'+link+',"isPromote":'+isPromote+',"rule":'+rule+'}';
				// var finalData2 = "{"+'"name":'+'"'+name+'"'+',"value":'+'"'+value+'"'+',"days":'+'"'+days+'"'+',"type":'+'"'+type+'"'+',"limit":'+'"'+lim+'"'+',"link":'+'"'+link+'"'+',"isPromote":'+'"'+isPromote+'"'+',"rule":'+'"'+rule+'"'+"}";
				var finalUrl = baseUrl + "v1/api/campAdmin/operateCouponType" + "?token=" + token + "&roleId=" + roleId;
				// console.info(finalUrl);
				// console.info(finalData);
				console.log(typeof finalData2);
				//finalData2=JSON.parse(finalData2);
				console.log(typeof finalData2);
				$.ajax({
					type: "POST",
					// data:finalData,
					data: finalData,
					url: finalUrl,
					dataType: "json",
					contentType: 'application/json',
					success: function (data) {
						if (data.code == 200) {
							swal(data.message, "", "success");
						} else if (data.result.code == 30000) {
							window.location.href = 'index.html';//超时，跳转到登录页面；
						} else {
							swal(data.message);
							// $(".error-main-t").html(data.message);
							// $(".errorAlert").css("display","block");
							// $(".error-main").css("margin-top",-$(".error-main").height()/2);
						}
					}
				});
			}
		} else if (couponType == 2) {
			if (name == "" || value == "" || days == "" || type == "" || lim == "" || link == "") {
				swal("有必填项为空，请仔细核对填写！");
			} else {
				var formData = new FormData($("#couponform")[0]);
				$.ajax({
					url: baseUrl + "v1/api/campAdmin/operateCouponCode" + "?token=" + token + "&roleId=" + roleId,
					type: 'POST',
					data: formData,
					async: false,
					cache: false,
					contentType: false,
					processData: false,
					success: function (data) {
						swal(data.message, "", "success");
					},
					error: function (data) {
						swal(data.message);
					}
				});
			}
		}
	}


}
//复制商品
function copyGoodInfo(param) {
	var goodsId = $(this).attr("goodsid");
	var ajaxLink = baseUrl + "v1/api/campGoods/copyGoodInfo" + "?goodsId=" + param + "&token=" + token + "&roleId=" + roleId;
	$.ajax({
		type: "get",
		url: ajaxLink,
		dataType: "json",
		jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
		jsonpCallback: "flightHandler",
		success: function (data) {
			// console.log(data);
			if (data.result.code == 200) {
				swal(data.message, "", "success");
				findGoods(1, 10);
			} else if (data.result.code == 30000) {
				window.location.href = 'index.html';//超时，跳转到登录页面；
			} else {
				// console.log(data);
				swal(data.message);
			}
		}
	});
}
//上传图片到阿里云
function uploadImgToOSS() {
	//获取阿里云key
	var bucket = "picoocheadportrait";
	var keyId = "";
	var region = "oss-cn-beijing";
	var keySecret = "";
	var ajaxLink = baseUrl + "v1/api/campAdmin/getUploadKey" + "?token=" + token + "&roleId=" + roleId;
	$.ajax({
		type: "get",
		url: ajaxLink,
		dataType: "json",
		jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
		jsonpCallback: "flightHandler",
		success: function (data) {
			// console.log(data);
			if (data.result.code == 200) {
				keyId = data.resp.keyId;
				keySecret = data.resp.keySecret;
				var client = new OSS.Wrapper({
					region: region,
					accessKeyId: keyId,
					accessKeySecret: keySecret,
					bucket: bucket
				});
				// console.log(JSON.stringify(client));
				client.list({
					'max-keys': 10
				}).then(function (result) {
					// console.log(result);
				}).catch(function (err) {
					// swal("请重新登录账号，确认该账号权限，再来上传图片吧");
					// console.log(err);
				});

				$('#imgfileHead').on('change', function (e) {
					var file = e.target.files[0];
					var storeAs = 'web/res/fatburnSystem/1/';
					// console.log(file.name + ' => ' + storeAs);
					client.multipartUpload(storeAs + file.name, file).then(function (result) {
						// console.log(result);
						var url = "http://cdn2.picooc.com/" + result.name;
						var str = '<div class="upload_append_list" index1=' + imgIndex1 + '>' +
							'<div class="file_bar">' +
							'<div style="padding:5px;">' +
							'<p class="file_name"></p>' +
							'<span class="file_del" data-index1=' + imgIndex1 + ' title="删除"></span>' +
							'</div>' +
							'</div>' +
							'<a style="height:100px;width:120px;" href="#" class="imgBox">' +
							'<div class="uploadImg" style="width:105px;">' +
							'<img class="upload_image" src=' + url + ' style="width:expression(this.width > 105 ? 105px :this.width)">' +
							'</div>' +
							'</a>' +
							'</div>';

						$("#imglist").append(str);
						imgIndex1++;
						delImg(1);
					}).catch(function (err) {
						// console.log(err);
					});
				});
				$('#imgfileHead2').on('change', function (e) {
					var file = e.target.files[0];
					var storeAs = 'web/res/fatburnSystem/1/';
					// console.log(file.name + ' => ' + storeAs);
					client.multipartUpload(storeAs + file.name, file).then(function (result) {
						// console.log(result);
						var url = "http://cdn2.picooc.com/" + result.name;
						var str = '<div class="upload_append_list" index2=' + imgIndex2 + '>' +
							'<div class="file_bar">' +
							'<div style="padding:5px;">' +
							'<p class="file_name"></p>' +
							'<span class="file_del" data-index2=' + imgIndex2 + ' title="删除"></span>' +
							'</div>' +
							'</div>' +
							'<a style="height:100px;width:120px;" href="#" class="imgBox">' +
							'<div class="uploadImg" style="width:105px;">' +
							'<img class="upload_image" src=' + url + ' style="width:expression(this.width > 105 ? 105px :this.width)">' +
							'</div>' +
							'</a>' +
							'</div>';

						$("#imglist2").append(str);
						imgIndex2++;
						delImg(2);
					}).catch(function (err) {
						// console.log(err);
					});
				});
				$('#imgfileHead3').on('change', function (e) {
					var file = e.target.files[0];
					var storeAs = 'web/res/fatburnSystem/1/';
					// console.log(file.name + ' => ' + storeAs);
					client.multipartUpload(storeAs + file.name, file).then(function (result) {
						// console.log(result);
						var url = "http://cdn2.picooc.com/" + result.name;
						var str = '<div class="upload_append_list" index3=' + imgIndex3 + '>' +
							'<div class="file_bar">' +
							'<div style="padding:5px;">' +
							'<p class="file_name"></p>' +
							'<span class="file_del" data-index3=' + imgIndex3 + ' title="删除"></span>' +
							'</div>' +
							'</div>' +
							'<a style="height:100px;width:120px;" href="#" class="imgBox">' +
							'<div class="uploadImg" style="width:105px;">' +
							'<img class="upload_image" src=' + url + ' style="width:expression(this.width > 105 ? 105px :this.width)">' +
							'</div>' +
							'</a>' +
							'</div>';

						$("#imglist3").append(str);
						imgIndex3++;
						delImg(3);
					}).catch(function (err) {
						// console.log(err);
					});
				});
				$('#imgfileHead4').on('change', function (e) {
					var file = e.target.files[0];
					var storeAs = 'web/res/fatburnSystem/1/';
					// console.log(file.name + ' => ' + storeAs);
					client.multipartUpload(storeAs + file.name, file).then(function (result) {
						// console.log(result);
						var url = "http://cdn2.picooc.com/" + result.name;
						var str = '<div class="upload_append_list" index4=' + imgIndex4 + '>' +
							'<div class="file_bar">' +
							'<div style="padding:5px;">' +
							'<p class="file_name"></p>' +
							'<span class="file_del" data-index4=' + imgIndex4 + ' title="删除"></span>' +
							'</div>' +
							'</div>' +
							'<a style="height:100px;width:120px;" href="#" class="imgBox">' +
							'<div class="uploadImg" style="width:105px;">' +
							'<img class="upload_image" src=' + url + ' style="width:expression(this.width > 105 ? 105px :this.width)">' +
							'</div>' +
							'</a>' +
							'</div>';

						$("#imglist4").append(str);
						imgIndex4++;
						delImg(4);
					}).catch(function (err) {
						// console.log(err);
					});
				});
				$('replys1').on('change', function (e) {
					var file = e.target.files[0];
					var storeAs = 'web/res/fatburnSystem/1/';
					// console.log(file.name + ' => ' + storeAs);
					client.multipartUpload(storeAs + file.name, file).then(function (result) {
						// console.log(result);
						var url = "http://cdn2.picooc.com/" + result.name;
						var str = '<div class="upload_append_list" index5=' + imgIndex5 + '>' +
							'<div class="file_bar">' +
							'<div style="padding:5px;">' +
							'<p class="file_name"></p>' +
							'<span class="file_del" data-index5=' + imgIndex5 + ' title="删除"></span>' +
							'</div>' +
							'</div>' +
							'<a style="height:100px;width:120px;" href="#" class="imgBox">' +
							'<div class="uploadImg" style="width:105px;">' +
							'<img class="upload_image" src=' + url + ' style="width:expression(this.width > 105 ? 105px :this.width)">' +
							'</div>' +
							'</a>' +
							'</div>';

						$("#imglist5").append(str);
						imgIndex5++;
						delImg(5);
					}).catch(function (err) {
						// console.log(err);
					});
				});
				$('replys2').on('change', function (e) {
					var file = e.target.files[0];
					var storeAs = 'web/res/fatburnSystem/1/';
					// console.log(file.name + ' => ' + storeAs);
					client.multipartUpload(storeAs + file.name, file).then(function (result) {
						// console.log(result);
						var url = "http://cdn2.picooc.com/" + result.name;
						var str = '<div class="upload_append_list" index6=' + imgIndex6 + '>' +
							'<div class="file_bar">' +
							'<div style="padding:5px;">' +
							'<p class="file_name"></p>' +
							'<span class="file_del" data-index6=' + imgIndex6 + ' title="删除"></span>' +
							'</div>' +
							'</div>' +
							'<a style="height:100px;width:120px;" href="#" class="imgBox">' +
							'<div class="uploadImg" style="width:105px;">' +
							'<img class="upload_image" src=' + url + ' style="width:expression(this.width > 105 ? 105px :this.width)">' +
							'</div>' +
							'</a>' +
							'</div>';

						$("#imglist6").append(str);
						imgIndex6++;
						delImg(6);
					}).catch(function (err) {
						// console.log(err);
					});
				});
				$('#imgFile').on('change', function (e) {
					var _this = this;
					var file = e.target.files[0];
					var storeAs = 'web/res/fatburnSystem/images/v1/';
					var imgNameArr = file.name.split('.');
					var imgName = imgNameArr.splice(0, imgNameArr.length - 1).join();
					var houz = imgNameArr.splice(imgNameArr.length - 1, 1).join();
					// console.log(file.name + ' => ' + storeAs);
					if (houz != 'jpg' && houz != 'bmp' && houz != 'png' && houz != 'tiff' && houz != 'gig' && houz != 'gif' && houz != 'svg' && houz != 'jpeg' && houz != 'psd') {
						swal('请上传图片')
					} else {
						client.multipartUpload(storeAs + md5(imgName) + '.' + houz, file).then(function (result) {
							var url = "http://cdn2.picooc.com/" + result.name;
							var str = '<div class="upload_append_list" index7=' + imgIndex7 + '>' +
								'<a style="height:100px;width:120px;" href="#" class="imgBox" id="imgcon">' +
								'<div id="del_img" style="text-align:center;background:#000;color:#fff;width:80%;position:absolute;top:0;left:0"></div>' +
								'<div class="uploadImg" style="width:105px;">' +
								'<img class="upload_image" src=' + url + ' style="width:expression(this.width > 105 ? 105px :this.width)">' +
								'</div>' +
								'</a>' +
								'</div>';
							$("#addimgList").html('').append(str);
							$(_this).val('');
							imgIndex7++;
							$('#imgcon').hover(function () {
								$('#del_img').css('height', "30px").text('删除').click(function () {
									$('#addimgList').html('');
								});
							}, function () {
								$('#del_img').css('height', '0');
							});
						}).catch(function (err) {
							// console.log(err);
						});
					}
				});
				$('#sellimg').on('change', function (e) {
					// console.log(2);
					var file = e.target.files[0];
					var storeAs = 'web/res/fatburn/image/sellImage/';
					// console.log(file.name + ' => ' + storeAs);
					client.multipartUpload(storeAs + '1.jpg', file).then(function (result) {
						console.log(result);
						var url = "http://cdn2.picooc.com/" + result.name;
						// console.log(url)
						var str = '<div class="upload_append_list" index8=' + imgIndex8 + '>' +
							'<a style="height:100px;width:120px;" href="#" class="imgBox">' +
							'<div class="uploadImg" style="width:105px;">' +
							'<img class="upload_image" src=' + url + '?' + Math.random() + ' style="width:expression(this.width > 105 ? 105px :this.width)">' +
							'</div></a></div>';

						// console.log(str);
						$("#imglist8").html('');
						$("#imglist8").append(str);
						imgIndex8++;
					}).catch(function (err) {
						// console.log(err);
					});
				});
				//   新增视频
				$('#videoFile').on('change', function (e) {
					var _this = this;
					var file = e.target.files[0];
					// console.log(file.name);
					var videoNameArr = file.name.split('.');
					// console.log(videoNameArr);
					var videoName = videoNameArr.splice(0, videoNameArr.length - 1).join();
					// console.log(videoName);
					var houz = videoNameArr.splice(videoNameArr.length - 1, 1).join();
					//   var result =/\.[^\.]+/.exec(file.name);
					var storeAs = 'web/res/fatburnSystem/video/v1/';
					if (houz != 'mp4') {
						swal('请选择正确的mp4文件');
					} else {
						$('#videoname').val(videoName);
						// console.log(file.name + ' => ' + storeAs);
						//   storeAs+md5(file.name)
						client.multipartUpload(storeAs + md5(videoName) + '.mp4', file).then(function (result) {
							console.log(result);
							var url = "http://cdn2.picooc.com/" + result.name;
							var str = '<div>' + url + '</div>'
							$("#addvideoList").html('').append(str);
							$(_this).val('');
						}).catch(function (err) {
							// console.log(err);
						});
					}
				});
				//   新增音频
				$('#audiofile').on('change', function (e) {
					var _this = this;
					var file = e.target.files[0];
					var audioNameArr = file.name.split('.');
					var audioName = audioNameArr.splice(0, audioNameArr.length - 1).join();
					var houz = audioNameArr.splice(audioNameArr.length - 1, 1).join();
					var storeAs = 'web/res/fatburnSystem/audio/v1/';
					if (houz != 'mp3') {
						swal('请选择正确的音频文件');
					}
					else {
						$('#audioName').val(audioName);
						// console.log(file.name + ' => ' + storeAs);
						client.multipartUpload(storeAs + md5(audioName) + '.mp3', file).then(function (result) {
							var url = "http://cdn2.picooc.com/" + result.name;
							var str = '<div>' + url + '</div>';
							$("#addAudioList").html('').append(str);

							$(_this).val('');
							// $('#audiofile').replaceWith('<input type="file" name="file" id="audiofile"/>');
						}).catch(function (err) {
							// console.log(err);
						});
					}
				});
				$('#goodsheadImginner').on('change', function (e) {
					var file = e.target.files[0];
					var storeAs = 'web/res/fatburnSystem/img_ceshi/';
					// console.log(file.name + ' => ' + storeAs);
					var imgNameArr = file.name.split('.');
					var imgName = imgNameArr.splice(0, imgNameArr.length - 1).join();
					var houz = imgNameArr.splice(imgNameArr.length - 1, 1).join();
					if (houz != 'jpg' && houz != 'bmp' && houz != 'png' && houz != 'tiff' && houz != 'gig' && houz != 'gif' && houz != 'svg' && houz != 'jpeg' && houz != 'psd') {
						swal('请上传图片')
					} else {
						client.multipartUpload(storeAs + file.name, file).then(function (result) {
							var url = "http://cdn2.picooc.com/" + result.name;
							var str = '<div class="upload_append_list" index9=' + imgIndex9 + '>' +
								'<div class="file_bar">' +
								'<div style="padding:5px;">' +
								'<p class="file_name"></p>' +
								'<span class="file_del" data-index9=' + imgIndex9 + ' title="删除"></span>' +
								'</div>' +
								'</div>' +
								'<a style="height:100px;width:120px;" href="#" class="imgBox" >' +
								'<div class="uploadImg" style="width:105px;">' +
								'<img class="upload_image innerimg" id="dragimginner' + imgIndex9 + '" src=' + url + ' style="width:expression(this.width > 105 ? 105px :this.width)">' +
								'</div>' +
								'</a>' +
								'</div>';
							// $("#imgListContentinner").html('');
							$("#imgListContentinner").append(str);
							imgIndex9++;
							delImg(9);
							console.log(dragImg);
							dragImg('.innerimg');
						});
					}
				});
				$('#goodsheadImgout').on('change', function (e) {
					var file = e.target.files[0];
					var storeAs = 'web/res/fatburnSystem/img_ceshi/';
					// console.log(file.name + ' => ' + storeAs);
					var imgNameArr = file.name.split('.');
					var imgName = imgNameArr.splice(0, imgNameArr.length - 1).join();
					var houz = imgNameArr.splice(imgNameArr.length - 1, 1).join();
					if (houz != 'jpg' && houz != 'bmp' && houz != 'png' && houz != 'tiff' && houz != 'gig' && houz != 'gif' && houz != 'svg' && houz != 'jpeg' && houz != 'psd') {
						swal('请上传图片')
					} else {
						client.multipartUpload(storeAs + file.name, file).then(function (result) {
							var url = "http://cdn2.picooc.com/" + result.name;
							var str = '<div class="upload_append_list" index10=' + imgIndex10 + '>' +
								'<div class="file_bar">' +
								'<div style="padding:5px;">' +
								'<p class="file_name"></p>' +
								'<span class="file_del" data-index10=' + imgIndex10 + ' title="删除"></span>' +
								'</div>' +
								'</div>' +
								'<a style="height:100px;width:120px;" href="#" class="imgBox" >' +
								'<div class="uploadImg" style="width:105px;">' +
								'<img class="upload_image outimg" id="dragimgout' + imgIndex10 + '" src=' + url + ' style="width:expression(this.width > 105 ? 105px :this.width)">' +
								'</div>' +
								'</a>' +
								'</div>';
							// $("#imgListContentinner").html('');
							$("#imgListContentout").append(str);
							imgIndex10++;
							delImg(10);
							dragImg('.outimg');
						}).catch(function (err) {
							// console.log(err);
						});
					}
				});
				$('#userpjia').on('change', function (e) {
					var file = e.target.files[0];
					var storeAs = 'web/res/fatburnSystem/img_ceshi/';
					// console.log(file.name + ' => ' + storeAs);
					var imgNameArr = file.name.split('.');
					var imgName = imgNameArr.splice(0, imgNameArr.length - 1).join();
					var houz = imgNameArr.splice(imgNameArr.length - 1, 1).join();
					if (houz != 'jpg' && houz != 'bmp' && houz != 'png' && houz != 'tiff' && houz != 'gig' && houz != 'gif' && houz != 'svg' && houz != 'jpeg' && houz != 'psd') {
						swal('请上传图片')
					} else {
						client.multipartUpload(storeAs + file.name, file).then(function (result) {
							var url = "http://cdn2.picooc.com/" + result.name;
							var str = '<div class="upload_append_list" index11=' + imgIndex11 + '>' +
								'<div class="file_bar">' +
								'<div style="padding:5px;">' +
								'<p class="file_name"></p>' +
								'<span class="file_del" data-index11=' + imgIndex11 + ' title="删除"></span>' +
								'</div>' +
								'</div>' +
								'<a style="height:100px;width:120px;" href="#" class="imgBox" >' +
								'<div class="uploadImg" style="width:105px;">' +
								'<img class="upload_image userpjimg" id="dragimgPj' + imgIndex11 + '" src=' + url + ' style="width:expression(this.width > 105 ? 105px :this.width)">' +
								'</div>' +
								'</a>' +
								'</div>';
							// $("#imgListContentinner").html('');
							$("#userpjiaimg").append(str);
							imgIndex11++;
							delImg(11);
							dragImg('.userpjimg');
						}).catch(function (err) {
							// console.log(err);
						});
					}
				});
			} else if (data.result.code == 30000) {
				window.location.href = 'index.html';//超时，跳转到登录页面；
			} else {
				// console.log(data);
				swal(data.message);
			}
		}
	});


}
//点击预览按钮

//优惠券列表
function getCouponList(pageNow, pageSize) {
	//+"?pageNow="+pageNow+"&pageSize="+pageSize+
	var ajaxLink = baseUrl + "v1/api/campAdmin/listCoupon" + "?token=" + token + "&pageNow=" + pageNow + "&pageSize=" + pageSize + "&roleId=" + roleId;
	$.ajax({
		type: "get",
		url: ajaxLink,
		dataType: "json",
		jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
		jsonpCallback: "flightHandler",
		success: function (data) {
			// console.log(data);
			if (data.result.code == 200) {
				if (data.resp.records.length > 0) {
					var str = "";
					var str2 = '';
					for (i = 0; i < data.resp.records.length; i++) {
						if (data.resp.records[i].type == 2) {
							str2 = '<span class="maku" id="storehouse" couponId=' + data.resp.records[i].id + '>码库</span>&emsp;';
						} else {
							str2 = "";
						}

						if (data.resp.records[i].name == null) {
							data.resp.records[i].name = "";
						}
						if (data.resp.records[i].value == null) {
							data.resp.records[i].value = "";
						}
						if (data.resp.records[i].kucun == null) {
							data.resp.records[i].kucun = '';
						}
						if (data.resp.records[i].days == null) {
							data.resp.records[i].days = '';
						}
						if (data.resp.records[i].get == null) {
							data.resp.records[i].get = "";
						}
						if (data.resp.records[i].used == null) {
							data.resp.records[i].used = "";
						}

						str = str + '<tr>' +
							'<td>' + data.resp.records[i].name + '</td>' +
							'<td>' + data.resp.records[i].value + '</td>' +
							'<td>' + data.resp.records[i].stork + '</td>' +
							'<td>' + data.resp.records[i].days + '</td>' +
							'<td>' + data.resp.records[i].getUserCount + '</td>' +
							'<td>' + data.resp.records[i].isUesCount + '</td>' +
							'<td class="blue">' + str2 + '<span onclick="editCoupon(' + data.resp.records[i].id + ')">编辑</span>&emsp;<span onclick="delCoupon(' + data.resp.records[i].id + ')">删除</span></td>' +
							'</tr>';
					}
					$("#couponList").html("");
					$("#couponList").append(str);

					$(".maku").unbind("click").click(function () {
						var cid = $(this).attr("couponId");
						getCodeList(cid, 1, 10);
					});
				}
				if (data.resp.pageCount > data.resp.pageNow) {
					$("#couponListAfter").css("background-color", "green");
					$("#couponListAfter").unbind("click").click(function () {
						getCouponList(data.resp.pageNow + 1, 10);
					});
				} else {
					$("#couponListAfter").css("background-color", "#ccc");
					$("#couponListAfter").unbind("click");
				}
				if (data.resp.pageNow > 1) {
					$("#couponListBefore").css("background-color", "green");
					$("#couponListBefore").unbind("click").click(function () {
						getCouponList(data.resp.pageNow - 1, 10);
					});
				} else {
					$("#couponListBefore").css("background-color", "#ccc");
					$("#couponListBefore").unbind("click");
				}
			} else if (data.result.code == 30000) {
				window.location.href = 'index.html';//超时，跳转到登录页面；
			} else {
				// console.log(data);
				swal(data.message);
			}
		}
	});
}
//优惠券列表点击编辑
function editCoupon(param) {
	$(".couponsList").css("display", "none");
	$("#editCoupons").css("display", "block");
	var ajaxLink = baseUrl + "v1/api/campAdmin/findDesc" + "?id=" + param + "&token=" + token + "&roleId=" + roleId;
	$.ajax({
		type: "get",
		url: ajaxLink,
		dataType: "json",
		success: function (data) {
			// console.log(data);
			if (data.result.code == 200) {
				if (data.resp.name && data.resp.name != null) {
					$("#aboutNames2").val(data.resp.name);
				} else {
					$("#aboutNames2").val("");
				}
				if (data.resp.value && data.resp.value != null) {
					$("#aboutPrice2").val(data.resp.value);
				} else {
					$("#aboutPrice2").val("");
				}
				if (data.resp.days && data.resp.days != null) {
					$("#expire2").val(data.resp.days);
				} else {
					$("#expire2").val("");
				}
				if (data.resp.limit && data.resp.limit != null) {
					$("#xianLing2").val(data.resp.limit);
				} else {
					$("#xianLing2").val("");
				}
				if (data.resp.ispush && data.resp.ispush != null && data.resp.ispush == 0) {
					$("#tuiGuang2").attr("checked", "checked");
					$("#tuiGuang2").attr("value", "0");
				} else {
				}
				if (data.resp.link && data.resp.link != null) {
					$("#outLink2").val(data.resp.link);
				} else {
					$("#outLink2").val("");
				}
				if (data.resp.rule && data.resp.rule != null) {
					$("#couponRule2").val(data.resp.rule);
				} else {
					$("#couponRule2").val("");
				}
				if (data.resp.type == 1) {
					$(".yhmFile").css("display", "none");
				} else if (data.resp.type == 2) {
					$(".yhmFile").css("display", "block");
					$("#uploadYHM2").val("");
				}
				$("#couponid").val(data.resp.id);
				$("#CouponSubmit2").unbind("click").click(function () {
					createCoupon(data.resp.id, data.resp.type);
				});
			} else if (data.result.code == 30000) {
				window.location.href = 'index.html';//超时，跳转到登录页面；
			} else {
				swal(data.message);
			}
		}
	});

}
//删除优惠券
function delCoupon(param) {
	swal({
		title: "你确定要删除这条优惠信息吗?",
		// text: "You will not be able to recover this imaginary file!",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "删除",
		cancelButtonText: "取消",
		closeOnConfirm: false
	},
		function () {
			// var ajaxLink = baseUrl+"v1/api/campCoupon/deleteCoupon"+"?ids="+param+"&token="+token+"&roleId="+roleId;
			// $.ajax({
			// 		type: "get",
			// 		url: ajaxLink,
			// 		dataType: "json",
			// 		jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
			// 		jsonpCallback:"flightHandler",
			// 		success : function (data) {
			// 			console.log(data);
			// 			if(data.result.code==200){
			// 				swal(data.message, "", "success");
			// 				getCouponList(1,10);
			// 			}else if(data.result.code==30000){
			//                 				 window.location.href = 'index.html';//超时，跳转到登录页面；
			//              		}else{

			// 				swal(data.message);
			// 			}
			// 		}
			// });
			var data2 = {
				"id": param,
				"status": "1"
			}
			var finalData = JSON.stringify(data2);
			var finalUrl = baseUrl + "v1/api/campAdmin/operateCouponType" + "?token=" + token + "&roleId=" + roleId;
			// console.info(finalUrl);
			// console.info(finalData);
			$.ajax({
				type: "POST",
				data: finalData,
				url: finalUrl,
				dataType: "json",
				contentType: 'application/json',
				success: function (data) {
					if (data.code == 200) {
						swal(data.message, "", "success");
						getCouponList(1, 10);
					} else if (data.result.code == 30000) {
						window.location.href = 'index.html';//超时，跳转到登录页面；
					} else {
						swal(data.message);
					}
				}
			});
		});

}
	//发放优惠券列表
function getSendCouponsList(){
	var ajaxLink = baseUrl + "v1/api/campAdmin/discountCoupon" + "?token=" + token;
	$.ajax({
		type: "get",
		url: ajaxLink,
		dataType: "json",
		success: function (data) {
			// console.log(data);
			if (data.result.code == 200) {
				var arr=data.resp;
				var str="";
				for(var i=0;i<arr.length;i++){
					str+='<option value='+arr[i].id+'>'+arr[i].name+'</option>'
				}
				$("#sendCoupons").html(str);
			}
		}
	})
}
//码库列表
function getCodeList(id, pageNow, pageSize, code) {
	$('.couponsList').hide();
	$('.storehouse').show();
	var ajaxLink = "";
	if (code) {
		ajaxLink = baseUrl + "v1/api/campAdmin/codeList" + "?token=" + token + "&roleId=" + roleId + "&cid=" + id + "&pageNow=" + pageNow + "&pageSize=" + pageSize + "&code=" + code;
	} else {
		ajaxLink = baseUrl + "v1/api/campAdmin/codeList" + "?token=" + token + "&roleId=" + roleId + "&cid=" + id + "&pageNow=" + pageNow + "&pageSize=" + pageSize;
	}
	$.ajax({
		type: "get",
		url: ajaxLink,
		dataType: "json",
		success: function (data) {
			// console.log(data);
			if (data.result.code == 200) {
				$("#codeList").html("");
				if (data.resp.records.length > 0) {
					var str = "";
					var str2 = '';
					for (i = 0; i < data.resp.records.length; i++) {
						if (data.resp.records[i].coupon_code == null) {
							data.resp.records[i].coupon_code = "";
						}
						if (data.resp.records[i].create_time == null) {
							data.resp.records[i].create_time = "";
						}
						if (data.resp.records[i].begin_time == null) {
							data.resp.records[i].begin_time = '';
						}
						if (data.resp.records[i].wechat == null) {
							data.resp.records[i].wechat = '';
						}

						if (data.resp.records[i].expire) {
							str2 = '<td>已过期</td>';
						} else {
							str2 = '<td>未过期</td>';
						}
						str = str + '<tr>' +
							'<td>' + data.resp.records[i].coupon_code + '</td>' +
							'<td>' + data.resp.records[i].create_time + '</td>' +
							'<td>' + data.resp.records[i].begin_time + '</td>' +
							'<td>' + data.resp.records[i].wechat + '</td>' +
							str2 + '</tr>';
					}
					$("#codeList").append(str);
				}
				if (data.resp.pageCount > data.resp.pageNow) {
					$("#codeListAfter").css("background-color", "green");
					$("#codeListAfter").unbind("click").click(function () {
						getCodeList(id, data.resp.pageNow + 1, 10);
					});
				} else {
					$("#codeListAfter").css("background-color", "#ccc");
					$("#codeListAfter").unbind("click");
				}
				if (data.resp.pageNow > 1) {
					$("#codeListBefore").css("background-color", "green");
					$("#codeListBefore").unbind("click").click(function () {
						getCodeList(id, data.resp.pageNow - 1, 10);
					});
				} else {
					$("#codeListBefore").css("background-color", "#ccc");
					$("#codeListBefore").unbind("click");
				}

				// $("#codeSearch").bind('input propertychange', function() {
				//     console.log($("#codeSearch").val());
				// 	
				// });
				$("#codeSearch").unbind("click").click(function () {
					var codeSearchCode = $.trim($("#codeSearchCode").val());
					// if(codeSearchCode=="" || codeSearchCode==null){
					// 	swal("请先填写码号，再来搜索吧");
					// }else{
					getCodeList(id, 1, 10, codeSearchCode);
					// }
				});

			} else if (data.result.code == 30000) {
				window.location.href = 'index.html';//超时，跳转到登录页面；
			} else {
				// console.log(data);
				swal(data.message);
			}
		}
	});
}

//清空创建商品时输入的信息
function clearGood() {

}