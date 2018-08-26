$(document).ready(function() {
	var UserId = ysh_GetQueryString("UserId") || null
	if(!UserId)
		$(fenzuzu).show()
})

var $form = null;
$table = $("#addr_tb");
condition = {};

//生成option元素字符串
function getCompleteHtml(data) {
	var html = "";
	for(var i = 0; i < data.length; i++) {
		html += '<option value=' + data[i].value + '>' + data[i].text + '</option>'
	}
	return html;
}

//重置密码
function ResetPassword() {
	var encryptPass = md5("123456");
	var UserId = $("#Password").data("tmp");
	getDataList(yshurl + "Admin_CustomerCenter_BatchResetPassword", {
		ids: UserId,
		encryptPass: encryptPass
	}, function(d) {
		ysh_msg("重置密码成功");
	});
}

//根据渠道加载分组
function getGroupByChannel(channel,callback) {
	getDataList(yshurl + "Admin_CustomerCenter_getGroupByChannel", {
		SelectChannel: channel
	}, function(d) {
		if($.isArray(d.aaData) && d.aaData.length > 0)
			appendSelectList($("#UserGroup"), d.aaData);
			callback && callback()
	});
}

//根据渠道加载团体
function getPartyByChannel(channel,callback) {
	getDataList(yshurl + "Admin_CustomerCenter_getPartyByChannel", {
		SelectChannel: channel
	}, function(d) {
		if($.isArray(d.aaData) && d.aaData.length > 0)
			appendSelectList($("#Party"), d.aaData);
			callback && callback()
	});
}

$("#Channel").on("change", function() {
	$("#UserGroup").empty();
	$("#Party").empty();
	getGroupByChannel($("#Channel option:selected").val());
	getPartyByChannel($("#Channel option:selected").val());
});

//构建下拉列表
function appendSelectList(f1, array) {
	if($.isArray(array)) {
		$.each(array, function(i, v) {
			f1.append("<option value=" + v.value + ">" + v.text + "</option>");
		});
	}
}

//下拉列表没有初始值时的赋值为0
function setNotChildValue(jobj, obj) {
	$.each(jobj, function(i, v) {
		if($(v).has("option").length == 0)
			obj[v.name] = 0;
	});
	return obj;
}

// 更新用户操作
function sub() {
	//获取数据
	var attrs = $form.serializeArray();
	var res = convertToParams(attrs); //进行下拉列表值检测
	var $notChild = $("select");
	if($notChild.length > 0) {
		setNotChildValue($notChild, res);
	}
	res.UserId = $("#Password").data("tmp");
	getDataList(yshurl + "Admin_CustomerCenter_Edit_UpdateUserInfo", res, function(d) {
		if(d.state == 0) {
			if(d.aaData[0][0].$IsNeedStore == 1) {
				ysh_confirm("还未备案，是否现在去备案？", "确定", "取消", function(ret) {
					if(ret) {
						window.location.href = 'Admin_AddOrEdit_Record.html?id=' + 0 + '&userid=' + d.aaData[0][0].$UserId;
					} else {
						ysh_msg("用户编辑成功");
						setTimeout(function() {
							window.location.href = "Admin_CustomerCenter.html"
						}, 1500);
					}
				})
			} else {
				ysh_msg("用户编辑成功");
				setTimeout(function() {
					window.location.href = "Admin_CustomerCenter.html"
				}, 1500);
			}
		}
	});
}

//数组转成对象
function convertToParams(array) {
	var obj = {};
	$.each(array, function(i, v) {

		obj[v.name] = v.value;
	})
	return obj;
}

//从url中提取参数
function parseUrl() {
	var url = location.href;
	var i = url.indexOf('?');
	if(i == -1) return;
	var querystr = url.substr(i + 1);
	var arr1 = querystr.split('&');
	var arr2 = new Object();
	for(i in arr1) {
		var ta = arr1[i].split('=');
		arr2[ta[0]] = ta[1];
	}
	return arr2;
}

//初始化用户数据
function initFormData(obj) {

	$.each(obj, function(i, v) {
		if(v != null) {
			if($("#" + i).is("p"))
				$("#" + i).text(v);
			else
				$("#" + i).val(v);
		}
	})
}

//点击取消跳转排行榜
function JumpToCustomerCenter() {
	window.history.back();
}

//用户地址编辑相关操作
//操作样式
function operationFormatter(value, row, index) {
	var result = [
		'<button class="btn-warning" id="editBtn" onclick="EditAddr(' + value + ',' + row.UserId + ')">编辑</button>', '<button class="btn-danger" id="deleteBtn" onclick="DeleteAddr(' + value + ')">删除</button>'
	];
	return result.join(' ');
}

// 是否为默认地址样式
function defaultAddFormatter(value, row, index) {
	if(value == '0')
		return '否';
	else
		return '是';
}

//获取省市区方法
function getPCD(a, b) {
	getDataList(yshurl + "GetAreaInfo", {
		pParentAreaNum: a,
		pPageIndex: 0,
		pPageSize: 100
	}, function(d) {
		if(d.state == 0 && d.aaData[0].length > 0) {
			var htmlstr = "";
			for(var i = 0; i < d.aaData[0].length; i++) {
				htmlstr += '<option value="' + d.aaData[0][i].AreaID + '">' + d.aaData[0][i].AreaName + '</option>';
			}
			$(b).html(htmlstr);
		} else {
			console.log("获取地区列表接口出错");
		}
	});
}

//删除用户地址
function DeleteAddr(id) {
	ysh_confirm("确定要删除此地址吗？", "确定", "取消", function(ret) {
		if(ret) {
			getDataList(yshurl + "UC_DelAddress", {
				IdList: id
			}, function(d) {
				ysh_msg("删除地址成功");
				getdata(0);
			});
		}
	});
}

//编辑用户地址
function EditAddr(id, userId) {
	getDataList(yshurl + "UC_GetAddressById", {
		AddressId: id
	}, function(d) {
		$("#Htitle").text("编辑地址");
		$("#AddressDiv").show();
		$("#md_dzbh").text(id);
		$("#md_yhbm").text(userId);
		$("#md_shr").val(d.aaData[0].FirstName);
		$("#md_lxdh").val(d.aaData[0].PhoneNumber);
		$("#txt_Address1").val(d.aaData[0].Address1);
		if(d.aaData[0].IsDefault == 1) {
			$("#ck_isDefault").attr("checked", true);
		} else {
			$("#ck_isDefault").attr("checked", false);
		}
		//赋值省市区
		$("#StateProvinceId").val(d.aaData[0].StateProvinceId);
		getPCD($("#StateProvinceId").find("option:selected").val(), "#Cityid");
		$("#Cityid").val(d.aaData[0].Cityid);
		getPCD($("#Cityid").find("option:selected").val(), "#DistrictCounty");
		$("#DistrictCounty").val(d.aaData[0].DistrictCounty);
		$("#btn_save").data("flag", "Edit");
		$('#myModal').modal('show');
	});
}

//添加用户地址
function AddrNew() {
	$("#md_yhbm").text($("#Password").data("tmp"));
	$("#Htitle").text("新增地址");
	$("#AddressDiv").hide();
	$("#btn_save").data("flag", "Add");
	$("#StateProvinceId").val("510000");
	getPCD($("#StateProvinceId").find("option:selected").val(), "#Cityid");
	$("#Cityid").val("510100");
	getPCD($("#Cityid").find("option:selected").val(), "#DistrictCounty");
	$('#myModal').modal('show');

}

function clearFormData() {
	$("#md_dzbh").text("");
	$("#md_yhbm").text("");
	$("#md_shr").val("");
	$("#md_lxdh").val("");
	$("#txt_Address1").val("");
	$("#ck_isDefault").attr("checked", false);
	$("#StateProvinceId").val("");
	$("#Cityid").val("");
	$("#DistrictCounty").val("");
}

//初始加载
$(function() {
	//排行榜进入该页面只能查看用户信息
	var pageType = ysh_GetQueryString("pageType");
	if(pageType == 1) {
		$(".btn-success").hide();
		$("#AddrNewBtn").hide();
		var arr = [$("#Password"),$("#Remark")];
		function eleArr (eleArr){
			$.each(eleArr,function(){
				arr.push($(this))
			})
		}
		eleArr($("input"));
		eleArr($("select"));
		$.each(arr,function(){
			$(this).attr("disabled",true)
		});
		$(".btn-danger").html("返回");
	}

	$form = $('#editUserInfo')
	var params = parseUrl();
	var UserId = 0;
	//储存UserId
	if(params.hasOwnProperty("UserId")) {
		$("#Password").data("tmp", params.UserId);
		UserId = params.UserId;
	}

	getDataList(yshurl + "Admin_Customer_Add_GetSearchInfo", {
		pUserId: UserId
	}, function(d) {

		//初始化下拉列表
		appendSelectList($("#Channel"), d.aaData[0]);
		appendSelectList($("#Role"), d.aaData[1]);
		appendSelectList($("#UserSource"), d.aaData[2]);
		appendSelectList($("#Grade"), d.aaData[3]);

		
		getDataList(yshurl + "Admin_CustomerCenter_Edit_GetUserInfo", {
			UserId: UserId
		}, function(d) {

			//初始化用户数据
			if($.isArray(d.aaData) && d.aaData.length > 0) {
				initFormData(d.aaData[0]);
				getGroupByChannel($("#Channel option:selected").val());
				getPartyByChannel($("#Channel option:selected").val());
				$("#UserGroup").val(d.aaData[0].UserGroup);
				$("#UserSource").val(d.aaData[0].Source);
				$("#Party").val(d.aaData[0].Party);

				changeRole($("#Role").val())
			}
			//编辑用户验证
			$form.bootstrapValidator({
				message: '输入数据格式不对请确认后重新输入',
				feedbackIcons: {
					valid: 'glyphicon glyphicon-ok',
					invalid: 'glyphicon glyphicon-remove',
					validating: 'glyphicon glyphicon-refresh'
				},
				fields: {
					UserName: {
						validators: {
							notEmpty: {
								message: '用户名不能为空'
							},
							stringLength: {
								min: 10,
								max: 15,
								message: '用户名长度必须在10-15之间'
							},
							callback: {
								message: '已存在相同的用户名',
								callback: function(value, validator) {
									var flag = false;
									var UserId1 = $("#Password").data("tmp");

									getDataList(yshurl + "Admin_CustomerCenter_ValiUser", {
										UserName: value,
										UserId: UserId1
									}, function(d) {
										if(d.aaData[0].result == 0)
											flag = true;
									});
									if(value == "")
										flag = true;

									return flag;
								}
							},
							regexp: {
								regexp: /^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|17[012356789][0-9]{8}|18[012356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/,
								message: '用户名必须为手机号'
							}
						}
					},
					Phone: {
						validators: {
							notEmpty: {
								message: '联系电话不能为空'
							},
							stringLength: {
								min: 10,
								max: 15,
								message: '联系电话长度必须在10-15之间 '
							},
							callback: {
								message: '请输入正确的联系电话',
								callback: function(value, validator) {
									var flag = true;
									flag = mobileCheck(value);
									if(value == "")
										flag = true;

									return flag;
								}
							}
						}
					},
					Email: {
						validators: {
							regexp: {
								regexp: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
								message: '请输入正确的电子邮箱'
							}
						}
					},
					QQNum: {
						validators: {
							stringLength: {
								min: 0,
								max: 15,
								message: 'QQ号长度不超过15位'
							},
							regexp: {
								regexp: /^[0-9]*$/,
								message: 'QQ号只能为数字'
							}
						}
					},
					WeiXinNum: {
						validators: {
							stringLength: {
								min: 0,
								max: 30,
								message: '微信号长度在0-30之间 '
							}
						}
					},
					WeiBoNum: {
						validators: {
							stringLength: {
								min: 0,
								max: 30,
								message: '微博号长度在0-30之间 '
							}
						}
					},
					CName: {
						validators: {
							stringLength: {
								min: 2,
								max: 30,
								message: '真实姓名长度必须在2-30之间 '
							},
							regexp: {
								regexp: /^[\u4E00-\u9FA5a-zA-Z]+$/,
								message: '真实姓名只能为字母或汉字'
							}
						}
					},
					Remark: {
						validators: {
							stringLength: {
								min: 0,
								max: 500,
								message: '备注长度不能超过500个字符'
							}
						}
					}
				}

			}).on('success.form.bv', function(e) {
				e.preventDefault();
				submit();
			});

		});

		// *************************************用户地址相关操作

		//对表进行操作
		$table.bootstrapTable({
			pagination: true, //分页
			escape: true,
			clickToSelect: true,
			pageList: [10]
		});

		//初始化表格
		getdata(0);

		//获取省市区县列表
		getPCD("", "#StateProvinceId");

		//表单验证
		$('#sub_form').bootstrapValidator({
			message: '错误',
			feedbackIcons: {
				valid: 'glyphicon glyphicon-ok',
				invalid: 'glyphicon glyphicon-remove',
				validating: 'glyphicon glyphicon-refresh'
			},
			fields: {
				md_shr: {
					validators: {
						notEmpty: {
							message: '收货人不能为空'
						}
					}
				},
				md_lxdh: {
					validators: {
						notEmpty: {
							message: '联系电话不能为空'
						},
						callback: {
							message: '请输入正确的联系电话',
							callback: function(value, validator) {
								var flag = true;
								flag = mobileCheck(value);
								if(value == "")
									flag = true;
								return flag;
							}
						}

					}
				},
				txt_Address1: {
					validators: {
						notEmpty: {
							message: '详细地址不能为空'
						}
					}
				}
			}
		});

		//保存
		$("#btn_save").click(function() {
			$('#sub_form').data('bootstrapValidator').validate();
			if($("#sub_form").data('bootstrapValidator').isValid()) {
				var flag = $("#btn_save").data("flag");

				var da = {
					addressId: $("#md_dzbh").text(),
					userID: $("#md_yhbm").text(),
					FirstName: $("#md_shr").val(),
					PhoneNumber: $("#md_lxdh").val(),
					StateProvinceId: $("#StateProvinceId").find("option:selected").val(),
					Cityid: $("#Cityid").find("option:selected").val(),
					DistrictCounty: $("#DistrictCounty").find("option:selected").val(),
					Address1: $("#txt_Address1").val(),
					Address2: $("#StateProvinceId").find("option:selected").text() + $("#Cityid").find("option:selected").text() + $("#DistrictCounty").find("option:selected").text(),
					IsDefault: $("#ck_isDefault").attr("checked") == "checked" ? 1 : 0
				}

				if(flag == "Edit") {
					getDataList(yshurl + "UC_UpdateAddress", da, function(d) {
						$('#myModal').modal('hide');
						getdata(0);
					});
				} else if(flag == "Add") {

					delete da.addressId;
					getDataList(yshurl + "UC_InsertAddress", da, function(d) {
						$('#myModal').modal('hide');
						getdata(0);
					});
				}
			}
		});

		$table.on('page-change.bs.table', function(e, number, size) {
			var os = (number - 1) * size;
			getdata(os);
		});

		//*************************************************用户地址相关操作结束			
	});

	setIframeHeight();
});

//获取用户地址数据
var getdata = function(offset) {

	var data = new Array();
	var totalcount = 0;
	condition = {
		userId: $("#Password").data("tmp"),
		FirstName: '',
		PhoneNumber: ''
	}
	condition.p_limit = $table.bootstrapTable('getOptions').pageSize;
	condition.p_offset = offset;
	getDataList(yshurl + "GetAddressList", condition, function(d) {
		data = d.many[0];
		totalcount = d.many[1][0].totalcount;
	});

	var pdata = {
		total: totalcount,
		rows: data
	};

	$table.bootstrapTable('load', pdata);
}

// 多级下拉列表
$(document).delegate("#StateProvinceId", "change", function() {
	getPCD($("#StateProvinceId").find("option:selected").val(), "#Cityid");
	getPCD($("#Cityid").find("option:selected").val(), "#DistrictCounty");

}).delegate("#Cityid", "change", function() {
	getPCD($("#Cityid").find("option:selected").val(), "#DistrictCounty");
});

//  清空模态框验证数据
$('#myModal').on('hide.bs.modal', function() {
	$('#sub_form').data('bootstrapValidator').resetForm();
	clearFormData();
});

function changeRole(rid) {
	var url = yshurl + "SETchannelAndGroupBYrole"
	var param = {
		rid: rid
	}
	getDataList(url, param, function(rea) {
		if(rea.aaData[0][0].return_value != 0 && rea.aaData[0][0].return_value != "undefined") {
			$("#Channel").val(rea.aaData[0][0].ChannelId)
			var Uidd = rea.aaData[0][0].Id
			$("#UserGroup").empty()
			getPartyByChannel($("#Channel option:selected").val(), function() {
				$("#Party").val(rea.aaData[0][0].partyId)
				$("#Party").prop('disabled', true)
			});
			getGroupByChannel($("#Channel option:selected").val(), function() {
				$("#UserGroup").val(Uidd)
				$("#Channel").prop('disabled', true)
				$("#UserGroup").prop('disabled', true)
			});
		} else {
			$("#Channel").prop('disabled', false)
			$("#Party").prop('disabled', false)
			$("#UserGroup").prop('disabled', false)
		}
	}, true)
}