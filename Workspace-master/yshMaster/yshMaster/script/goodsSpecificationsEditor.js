var skuId = null
var imgArray_Change = []
$(document).ready(function() {
	skuId = ysh_GetQueryString("id") || null
	if(!skuId) {
		history.back()
	} else {
		initSearch(skuId, function(res) {
			var url = yshurl + "getUnit"
			param = {}

			//获取单位
			getDataList(url, param, function(ret) {
				var str = ""
				for(var num in ret.aaData) {
					if(res == ret.aaData[num].Id) {
						str += "<option selected value='" + ret.aaData[num].Id + "'>" + ret.aaData[num].MeasureName + "</option>"
					} else {
						str += "<option value=" + ret.aaData[num].Id + ">" + ret.aaData[num].MeasureName + "</option>"
					}
				}
				$("#unit").append(str)
				changeUnit()
			}, true)
		})
	}
})

//初始化查询
function initSearch(skuId, callback) {
	var url = yshurl + "SelectProSKUInfo"
	var param = {
		Skuid: skuId
	}
	getDataList(url, param, function(ret) {
		if(ret && ret.aaData instanceof Array) {
			var view = $("#Specifications")
			var tpl = $("#goodsSpecificationsTpl").html()
			showData(view, tpl, ret.aaData)
			dynamicLoading.css("js/control/css/zyUpload.css")
			dynamicLoading.js("js/core/zyFile.js")
			dynamicLoading.js("js/control/js/zyUpload.js")
			var imgArray = ret.aaData[0].picture.split(',')
			var img = $("#img")
			var imgstr = ''
			for(var i in imgArray) {
				imgstr += "<div class='col-lg-2'><img style='width: 150px;height:150px;' src='" + seturl + imgArray[i] + "' /></div>"
			}
			img.append(imgstr)

			if(ret.aaData[0].IsUsePoint != 0) {
				$("#isusepoint").attr("checked", "checked")
			}
			callback && callback(ret.aaData[0].UnitId)
		} else {
			ysh_alert("数据异常", "error")
		}
	}, true)
}

//
function formCheck() {
	var flag = 0
	var check = 0
	var form = new Object();
	form.Specifications = $("#specificationsName").val()
	form.Price = $("#Price").val()
	form.StateMent = $("#StateMent").val()
	form.UnitId = $("#unit").val()
	form.StockQuantity = $("#StockQuantity").val()
	if(document.getElementById("isusepoint").checked == true) {
		form.isusepoint = 1
	} else {
		form.isusepoint = 0
	}

	//必填项验证
	$(".formData").each(function() {
		if(!($(this).val())) {
			flag++
		}
	})
	if(flag > 0) {
		ysh_alert("有必填项未完成或输入有误", "warning")
	} else {
		//自定义验证
		if(form.Specifications.length > 15) {
			ysh_alert("规格名称不能超过15位", "warning")
			check++
		}
		if(Number(form.StateMent) > Number(form.Price)) {
			ysh_alert("结算价格应小于等于规格价格哦", "warning")
			check++
		}
		if(form.Specifications < 0) {
			ysh_alert("规格名称不能为负数", "warning")
			check++
		} else {
			if(form.Specifications.indexOf('.') > 1) {
				ysh_alert("规格名称输入有误", "warning")
				check++
			}
		}

		try {
			if(form.Price.toString().split(".")[0].length > 8 || form.Price.toString().split(".")[1].length > 3) {
				ysh_alert("金额只保留为小数点前8位，小数点后3位", "warning")
				check++
			}
		} catch(e) {
			//TODO handle the exception
		}
		try {
			if(parseFloat(goods.StateMent) < 0) {
				ysh_alert("结算价格不能为负数", "warning");
				formCheck = false;
			}
			if(form.StateMent.toString().split(".")[0].length > 8 || form.StateMent.toString().split(".")[1].length > 3) {
				ysh_alert("金额只保留为小数点前8位，小数点后3位", "warning")
				check++
			}
		} catch(e) {
			//TODO handle the exception
		}

		if(form.StockQuantity < 0) {
			ysh_alert("库存不能为负数", "warning")
			check++
		} else {
			if(form.StockQuantity.indexOf('.') > 0) {
				ysh_alert("库存不能输入小数", "warning")
				check++
			}
		}

		if(check == 0) {
			specificationsSubmit(form)
		}
	}
}

function specificationsSubmit(form) {
	var url = yshurl + "UPdateProductSKUInfo";
	form.skuId = skuId
	var param = form
	param.UnitEnty = $("#UnitEnty").val() || 1
	if($("#UnitInit").attr("flag") == "1")
		param.UnitEnty = $("#UnitEnty").val()
		
	getDataList(url, param, function(ret) {
		if(ret && ret.state == 0 && ret.aaData) {
			if(ret.aaData.affectedRows == 1) {
				if(imgArray_Change.length > 0) {
					var img_url = imgArray_Change.join(",")
					url = yshurl + "changePic"
					param = {
						OwnId: form.skuId,
						PicType: 3,
						imgUrl: img_url,
						splitChar: ","
					}
					getDataList(url, param, function(ret) {
						if(ret.aaData[0]) {
							ysh_msg("修改成功！")
							history.back()
						} else {
							ysh_alert("图片修改失败！", "error")
						}
					}, true)
				} else {
					ysh_msg("修改成功！", "success")
					history.back()
				}
			} else {
				ysh_alert("修改失败！", "error")
			}
		}
	}, false)
}

//规格追加
function changeUnit(Id) {
	if(!Id)
		Id = $("#unit").val()
	var url = yshurl + "getUnitType"
	var param = {
		id: Id
	}

	//获取列表
	getDataList(url, param, function(ret) {
		if(ret.aaData[0].WeightType == "1") {
			//追加单位属性
			$("#UnitInit").show()
			$("#UnitInit").attr("flag", "1")
		} else {
			$("#UnitInit").hide()
			$("#UnitInit").attr("flag", "0")
		}
	}, true)
}

function changeImg() {
	var zyUpload = $("#zyUpload").html()
	$("#cButton").hide()
	$("#img").hide()
	$("#zyButton").show()
	dynamicLoading.js("js/zyUpload.js")
	setIframeHeight();
}

// 上传文件成功的回调方法
var onSuccess = function(file, response) {
	$(".upload_preview").css('overflow-y', 'scroll').css('max-height', '170px');
	$(".upload_preview").css('overflow-y', 'scroll').css('height', '170px');

	var obj = JSON.parse(response)
	imgArray_Change.push(obj.aaData[0].fileurl)
}
var onSelect = function() {
	setIframeHeight()
	$(".upload_preview").css('overflow-y', 'scroll').css('max-height', '170px');
	$(".upload_preview").css('overflow-y', 'scroll').css('height', '170px');
	setIframeHeight()
}

var onFailure = function(file) {
	$(".upload_preview").css('overflow-y', 'scroll').css('max-height', '170px');
	$(".upload_preview").css('overflow-y', 'scroll').css('height', '170px');
}

var onComplete = function(responseInfo) {
	ysh_alert("上传图片完成!")
}