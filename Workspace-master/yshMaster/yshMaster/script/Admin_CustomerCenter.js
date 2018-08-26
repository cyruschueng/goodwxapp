var $table = $("#CustomerInfo");
var checkList = new Array();
var condition = "condition";
var dataTotal = 0;
var attributes = {};
/***************** 模态框操作开始***********/
//批量更新按钮
function BatchChange(name, name2) {
	if(checkList.length == 0) {
		ysh_alert("请选择用户进行操作", "warning");
		return;
	}
	appendSelectList($("#modalSelectList"), attributes[name]);
	$("#modalSelectList option[value='0']").remove();
	$("#modalSelectList").attr("name", name);
	$("#modalLabel").text("用户" + name2 + "：");
	$("#modalTitle").text("更改" + name2 + ":");
	$("#myModal").modal();
}
//模态框隐藏时执行方法
$('#myModal').on('hide.bs.modal', function() {
	clearData();
});
$('#myModal1').on('hide.bs.modal', function() {
	clearData1();
});

function clearData1() {
	$("#SelectChannel").empty();
	$("#SelectGroup").empty();
	$("#SelectParty").empty();
}
/***************** 模态框操作结束***********/
//下拉列表没有初始值时的赋值为0
function setNotChildValue(jobj, obj) {
	$.each(jobj, function(i, v) {
		if($(v).has("option").length == 0)
			obj[v.name] = 0;
	});
	return obj;
}
//批量修改渠道
function BatchChangeChannel() {
	if(checkList.length == 0) {
		ysh_alert("请选择用户进行操作", "warning");
		return;
	}
	appendSelectList($("#SelectChannel"), attributes.Channel);
	getGroupByChannel($("#SelectChannel option:selected").val());
	getPartyByChannel($("#SelectChannel option:selected").val());
	$("#myModal1").modal();
}
//根据渠道获取分组
function getGroupByChannel(channel) {
	getDataList(yshurl + "Admin_CustomerCenter_getGroupByChannel", {
		SelectChannel: channel
	}, function(d) {
		if(d.state == 0)
			appendSelectList($("#SelectGroup"), d.aaData);
		else ysh_alert("系统出错，请刷新页面或者联系客服人员", "warning")
	});
}
//根据渠道获取团体
function getPartyByChannel(channel) {
	getDataList(yshurl + "Admin_CustomerCenter_getPartyByChannel", {
		SelectChannel: channel
	}, function(d) {
		if(d.state == 0)
			appendSelectList($("#SelectParty"), d.aaData);
		else ysh_alert("系统出错，请刷新页面或者联系客服人员", "warning")
	});
}
//团体，分组根据渠道改变而改变	
$("#SelectChannel").on("change", function() {
	$("#SelectGroup").empty();
	$("#SelectParty").empty();
	getGroupByChannel($("#SelectChannel option:selected").val());
	getPartyByChannel($("#SelectChannel option:selected").val());
});
//保存 渠道  团体  分组变更	
function saveData1() {
	var ids = checkList.join(",");
	var Group = ($("#SelectGroup option:selected").val() === undefined) ? 0 : $("#SelectGroup option:selected").val();
	var Channel = $("#SelectChannel option:selected").val();
	var Party = ($("#SelectParty option:selected").val() === undefined) ? 0 : $("#SelectParty option:selected").val();
	getDataList(yshurl + "Admin_CustomerCenter_BatchChangeChannel", {
		ids: ids,
		changeValue: Channel
	}, function(d) {
		if(d.state == 0) {
			getDataList(yshurl + "Admin_CustomerCenter_BatchChangeGroup", {
				ids: ids,
				changeValue: Group
			}, function(d) {
				if(d.state == 0) {
					getDataList(yshurl + "Admin_CustomerCenter_BatchChangeParty", {
						ids: ids,
						changeValue: Party
					}, function(d) {
						if(d.state == 0) {
							$("#myModal1").modal('hide');
							ysh_msg("更新成功");
							Query();
							$table.bootstrapTable('uncheckAll');
						} else ysh_alert("系统出错啦，请刷新或者联系客服", "error");
					});
				} else ysh_alert("系统出错啦，请刷新或者联系客服", "error");
			});
		} else ysh_alert("系统出错啦，请刷新或者联系客服", "error");
	});
}
//批量更改等级,角色,保存数据
function saveData() {
	var type = $("#modalSelectList").attr("name");
	if(checkList.length != 0) {
		var ids = checkList.join(",");
		var value = $("#modalSelectList option:selected").val();
		getDataList(yshurl + "Admin_CustomerCenter_BatchChange" + type, {
			ids: ids,
			changeValue: value
		}, function(d) {
			if(d.state == 0) {
				$("#myModal").modal('hide');
				ysh_msg("更新成功");
				Query();
				$table.bootstrapTable('uncheckAll');
			} else ysh_alert("系统出错啦，请刷新或者联系客服", "error");
		});
	} else {
		return false;
	}
}
//清空数据
function clearData() {
	$("#modalForm #modalLabel").text("");
	$("#modalForm #modalSelectList").empty();
	$("#modalTitle").text("");
}
/***************** 模态框操作结束 ***********/
//跳转到备案绑定页面
function RecordBind(Id) {
	location.href = "Admin_RecordBind.html?Id=" + Id;
}
//跳转到添加用户页面
function AddUser() {
	location.href = "Admin_Customer_Add.html";
}
//批量删除用户
function BatchDeleteUser() {
	if(checkList.length == 0) {
		ysh_alert("请选择用户进行操作", "warning");
		return;
	}
	ysh_confirm("是否确认删除所选用户？", "确认", "取消", function(res) {
		if(res) {
			var ids = checkList.join(',');
			var length = checkList.length;
			getDataList(yshurl + "Admin_CustomerCenter_BatchDelete", {
				ids: ids
			}, function(d) {
				if(d.state == 0)
					ysh_msg("删除用户成功！");
				else ysh_alert("系统出错啦，请刷新或者联系客服", "error");
			});
			Query();
			$table.bootstrapTable('uncheckAll');
		} else
			return;
	});
}
//批量审核用户
function BatchAuth() {
	if(checkList.length == 0) {
		ysh_alert("请选择用户进行操作", "warning");
		return;
	}
	var aids = checkList.join(',');
	var flag = true;
	getDataList(yshurl + "Admin_CustomerCenter_makeSureAuth", {
		aids: aids
	}, function(d) {
		if(d.state == 0 && $.isArray(d.aaData))
			$.each(d.aaData, function(i, v) {
				if(v.Authorization != 3) {
					flag = false;
					return false;
				}
			});
	});
	//判断是否都为已审核状态
	if(flag == true) {
		ysh_alert("选择用户状态全部为已审核，请重新选择", "warning");
		return;
	}
	ysh_confirm("是否确认审核所选用户？", "确认", "取消", function(res) {
		if(res) {
			var ids = checkList.join(',');
			getDataList(yshurl + "Admin_CustomerCenter_BatchAuth", {
				ids: ids
			}, function(d) {
				if(d.state == 0)
					ysh_msg("审核用户成功！");
				else ysh_alert("系统出错啦，请刷新或者联系客服", "error");
			});
			Query(1);
			$table.bootstrapTable('uncheckAll');
		} else
			return;
	});
}
//批量重置密码
function BatchResetPassword() {
	if(checkList.length == 0) {
		ysh_alert("请选择用户进行操作", "warning");
		return;
	}
	var encryptPass = md5("123456");
	ysh_confirm("是否重置所选用户的密码？", "确认", "取消", function(res) {
		if(res) {
			var ids = checkList.join(',');
			getDataList(yshurl + "Admin_CustomerCenter_BatchResetPassword", {
				ids: ids,
				encryptPass: encryptPass
			}, function(d) {
				if(d.state == 0)
					ysh_msg("重置用户密码成功！");
				else ysh_alert("系统出错啦，请刷新或者联系客服", "error");
			});
			Query(1);
			$table.bootstrapTable('uncheckAll');
		} else
			return;
	});
}
//构建select
function appendSelectList(f1, array) {
	if(f1.selector != "#Auth" && f1.selector != "#SelectGroup" && f1.selector != "#SelectChannel" && f1.selector != "#SelectParty")
		f1.append("<option value=0>全部</option>");
	if($.isArray(array)) {
		$.each(array, function(i, v) {
			f1.append("<option value=" + v.value + ">" + v.text + "</option>");
		});
	}
}
//查询调数据
function Query() {
	var search = convertParams(condition);
	if(search["UserId"] == "")
		search.UserId = 0;
	//进行下拉列表值检测
	var $notChild = $("select");
	if($notChild.length > 0) {
		setNotChildValue($notChild, search);
	}
	getDataList(yshurl + "Admin_CustomerCenter_GetUserTotal", search, function(d) {
		if(d.state == 0)
			dataTotal = d.aaData[0].TotalNum;
		else ysh_alert("系统出错啦，请刷新或者联系客服", "error");
	});
	search = initPageInfo(search);
	var options = $table.bootstrapTable('getOptions');
	options.pageNumber = 1;
	getDataList(yshurl + "Admin_CustomerCenter_GetUserInfo", search, function(d) {
		$table.bootstrapTable('refreshOptions', options);
		loadData($table, {
			total: dataTotal,
			rows: d.aaData
		});
		checkList.length = 0;
	});
	setIframeHeight();
}
//翻页时获取数据
function getData(params) {
	getDataList(yshurl + "Admin_CustomerCenter_GetUserInfo", params, function(d) {
		//获取总条数
		getDataList(yshurl + "Admin_CustomerCenter_GetUserTotal", params, function(d) {
			dataTotal = d.aaData[0].TotalNum;
		});
		var tableData = {
			total: dataTotal,
			rows: d.aaData
		};
		if(d.state == 0) {
			loadData($table, tableData);
		} else ysh_alert("系统出错啦，请刷新或者联系客服", "error");
	});
	setIframeHeight();
}
//转换查询条件
function convertToParams(array) {
	var obj = {};
	if($.isArray(array) && array.length > 0) {
		$.each(array, function(i, v) {
			obj[v.name] = v.value;
		});
	}
	return obj;
}
//初始化分页数据
function initPageInfo(res) {
	res.PageIndex = 0;
	res.PageSize = 10;
	return res;
}
//表格样式
function rowStyle(row, index) {
	var classes = ['active', 'success', 'info', 'warning', 'danger'];
	if(index % 2 === 0) {
		return {
			classes: 'warning'
		};
	} else
		return {
			classes: 'info'
		};
}
//选中行
function checkFormatter(value, row, index) {
	var pIndex = $.inArray(row.Id, checkList);
	if(pIndex >= 0) {
		return {
			checked: true
		}
	} else {
		return {
			checked: false
		}
	}
}
//数据格式 多余11个字符打点
function dataFormatter(value, row, index) {
	if(value) {
		if(value.length > 11)
			return value.substr(0, 11) + "...";
		else
			return value;
	} else return "-";
}
//跳转到编辑页面
function JumpToEdit(Id) {
	location.href = "Admin_Customer_Edit.html?UserId=" + Id;
}

function JumpToFenZu(Id) {
	$("#fenzuModal").modal()
	$("#fenzuModal").attr("uid", Id)
	var url = yshurl + "getGroup_MapByUid"
	var param = {
		uid: Id
	}
	var seurl = yshurl + "getGroup_msg"
	getDataList(seurl, param, function(res) {
		var sstr = ""
		for(var nump in res.aaData) {
			sstr += "<option value=" + res.aaData[nump].Id + ">" + res.aaData[nump].UserGroup + "</option>"
		}
		$("#SelectFenzu").empty()
		$("#SelectFenzu").append(sstr)
		getDataList(url, param, function(ret) {
			var tpl = $("#tplFenzu").html()
			var view = $("#Fenzu_View").empty()
			for(var num in ret.aaData) {
				ret.aaData[num].number = parseInt(num) + 1
			}
			showData(view, tpl, ret.aaData)
		}, true)
	}, true)
}

//操作字段格式
function operationFormatter(value, row, index) {
	var result = [
		'<button class="btn btn-warning" onclick="JumpToFenZu(', row.Id, ')">分组管理</button>&nbsp;', '<button class="btn btn-warning" onclick="JumpToEdit(', row.Id, ')">编辑</button>&nbsp;', '<button class="btn btn-warning" type="reset" onclick="RecordBind(', row.Id, ')">备案</button>'
	];
	return result.join('');
}
//表格加载数据
function loadData(f1, data) {
	f1.bootstrapTable('load', data);
	var hashTemp = window.location.hash || "1"

	hashTemp = hashTemp.replace("#", "")
	$(".pagination").find('a').each(function() {
		if($(this).text() == hashTemp)
			$(this).click()
	})
}
//初始化数据
$(function() {
	//初始化用户中心查询数据
	getDataList(yshurl + "Admin_CustomerCenter_GetSearchInfo", {}, function(d) {
		appendSelectList($("#Grade"), d.many[0]);
		appendSelectList($("#Role"), d.many[1]);
		appendSelectList($("#Source"), d.many[2]);
		appendSelectList($("#Group"), d.many[3]);
		appendSelectList($("#Auth"), d.many[4]);
		$("#dStartTime").attr("data-date", d.many[5][0].StartDate);
		$("#StartTime").val(d.many[5][0].StartDate);
		$("#dEndTime").attr("data-date", d.many[5][0].EndDate);
		$("#EndTime").val(d.many[5][0].EndDate);
		attributes.Group = d.many[3];
		attributes.Grade = d.many[0];
		attributes.Role = d.many[1];
		attributes.Channel = d.many[6];
		var res = convertParams(condition);
		if(res["UserId"] == "")
			res.UserId = 0;
		//进行下拉列表值检测
		var $notChild = $("select");
		if($notChild.length > 0) {
			setNotChildValue($notChild, res);
		}
		res1 = initPageInfo(res);
		getDataList(yshurl + "Admin_CustomerCenter_GetUserInfo", res1, function(d) {
			//获取总条数
			getDataList(yshurl + "Admin_CustomerCenter_GetUserTotal", res, function(d) {
				dataTotal = d.aaData[0].TotalNum;
			});
			var tableData = {
				total: dataTotal,
				rows: d.aaData
			};
			$table.bootstrapTable({
				data: tableData,
				onCheck: function(row) {
					checkList.push(row.Id);
					$.unique(checkList);
				},
				onUncheck: function(row) {
					$.unique(checkList);
					var pIndex = $.inArray(row.Id, checkList);
					checkList.splice(pIndex, 1);
				},
				onCheckAll: function(rows) {
					$.each(rows, function(index) {
						checkList.push(rows[index].Id);
					});
					$.unique(checkList);
				},
				onUncheckAll: function(rows) {
					$.unique(checkList);
					var filterarray = $.grep(checkList, function(value) {
						var isDel = false;
						for(var i = 0; i < rows.length; i++) {
							if(rows[i].Id == value) {
								isDel = true;
								break;
							}
						}
						return !isDel;
					});
					checkList = filterarray;
				},
				escape: true,
				sidePagination: 'server',
				pagination: true,
				pageSize: 10,
				pageNumber: 1,
				pageList: [10]
			});
			loadData($table, tableData);
			// 控制翻页事件
			$table.on('page-change.bs.table', function(e, number, size) {
				res1.PageIndex = (number - 1) * size;
				res1.PageSize = size;
				window.location.hash = number;
				attributes.PageIndex = res1.PageIndex;
				attributes.Size = res1.Size;
				getData(res1);
			});

			// onhashchange可以监控hash变化
			window.onhashchange = function() {
				var hash = window.location.hash;
				var id;
				if(hash != "") {
					id = parseInt(hash.substr(1));
				} else {
					id = 1
				}
				res1.PageIndex = (id - 1) * 10;
				res1.PageSize = 10;
				getData(res1);
				$("ul.pagination").children().eq(id).addClass("active").siblings().removeClass("active");
			};
		})
	});
	setIframeHeight();
});

function addFenzu() {
	var url = yshurl + "getGroup_MapCountByUid"
	var param = {
		uid: $("#fenzuModal").attr("uid"),
		rid: $("#SelectFenzu").val()
	}
	getDataList(url, param, function(ret) {
		if(ret.aaData[0].count != null && ret.aaData[0].count != "undefined" && ret.aaData[0].count < 5) {
			var inurl = yshurl + "inGroup_Map"
			getDataList(inurl, param, function(res) {
				if(res.aaData.affectedRows && res.aaData.affectedRows == 1) {
					ysh_msg("添加成功")
				} else {
					ysh_msg("添加失败")
				}
			}, false)
			JumpToFenZu(param.uid)
		} else {
			ysh_alert("一个用户所属分组不能超过5个")
		}
	}, true)
}

function delete_Group_Map(Id) {
	var urls = yshurl + "getGroup_MapCountByUid"
	var params = {
		uid: $("#fenzuModal").attr("uid")
	}
	getDataList(urls, params, function(ret) {
		if(ret.aaData[0].count != null && ret.aaData[0].count != "undefined" && ret.aaData[0].count == 1) {
			ysh_alert("用户至少存在一个分组", "waring")
		} else {
			var url = yshurl + "deleteGroup_Map"
			var param = {
				mid: Id
			}
			getDataList(url, param, function(rea) {
				if(rea.aaData.affectedRows && rea.aaData.affectedRows) {
					ysh_msg("删除成功")
				} else {
					ysh_msg("删除失败")
				}
				JumpToFenZu($("#fenzuModal").attr("uid"))
			}, false)
		}
	}, true)
}