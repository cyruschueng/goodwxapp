var imgArray = new Array()
var formCheck = true
var codeCheck = false
var proId = null
var goods = new Object()
$(document).ready(function() {
	window.localStorage.removeItem("msgdata")
	sendMsgz()
	proId = ysh_GetQueryString("goodsid") || null
	action = ysh_GetQueryString("action") || null
	$("#title").text("商品")
	init(proId)
	if(action == "search") {
		$(".saveButton").each(function() {
			$(this).hide()
		})
		$("input").each(function() {
			$(this).attr("readonly", "readonly")
		})
		$("select").each(function() {
			$(this).attr("readonly", "readonly")
			$(this).attr("disabled", "disabled")
		})
		$("textarea").each(function() {
			$(this).attr("readonly", "readonly")
		})
		$("#status").attr("disabled", "disabled")
		$("#title").text("商品查看")
	} else if(action == "detail") {
		$("#store").attr("disabled", "disabled")
	}
})

function init(proId) {
	if(!proId)
		proId = ysh_GetQueryString("goodsid")
	var url = yshurl + "CateGoryListInC"

	var param = {}
	var option = ""
	var view = ""
	var tpl = ""
	if(proId) {
		url = yshurl + "productIncById"
		param = {
			id: proId
		}
		getDataList(url, param, function(ret) {
			yfId = ret.aaData[0].Logisticaltemp;
			view = $("#bodyview")
			tpl = $("#tpl").html()
			view.empty()
			window.localStorage.setItem("msgdata", encodeURI(ret.aaData[0].FullDescription))
			window.localStorage.setItem("FullDescriptionInit", encodeURI(ret.aaData[0].FullDescription))
			showData(view, tpl, ret.aaData)
			$("img").each(function() {
				var srctemp = $(this).attr("src")
				if(srctemp.indexOf("http") == -1) {
					srctemp = imgurl + srctemp
					$(this).attr("src", srctemp)
					srctemp = ""
				}
			})
			setTimeout("setIframeHeight()", 1000);
			url = yshurl + "CateGoryListInC"
			param = {}
			catID = ret.aaData[0].CategoryId || 0
			storID = ret.aaData[0].StoreId || 0
			udframe = ret.aaData[0].Logisticaltemp || 0
			getDataList(url, param, function(ret) {
				view = $("#catSelect")
				for(var num in ret.aaData) {
					if(catID == ret.aaData[num].ID) {
						option = "<option selected value='" + ret.aaData[num].ID + "'>" + ret.aaData[num].CateName + "</option>"
					} else {
						option = "<option value='" + ret.aaData[num].ID + "'>" + ret.aaData[num].CateName + "</option>"
					}
					view.append(option)
				}
			}, true)
			url = yshurl + "getstore"
				//获取店铺
			getDataList(url, param, function(ret) {
				view = $("#store")
				for(var num in ret.aaData) {
					if(storID == ret.aaData[num].Id) {
						option = "<option selected value='" + ret.aaData[num].Id + "'>" + ret.aaData[num].StoreName + "</option>"
					} else {
						option = "<option value='" + ret.aaData[num].Id + "'>" + ret.aaData[num].StoreName + "</option>"
					}
					view.append(option)
				}
				url = yshurl + "Add_LogisticalTempByProduct"
					//获取运费模板
				getYunFei(yfId);
			}, true)

		}, true)
	} else {
		//获取分类
		getDataList(url, param, function(ret) {
			view = $("#catSelect")
			for(var num in ret.aaData) {
				option = "<option value='" + ret.aaData[num].ID + "'>" + ret.aaData[num].CateName + "</option>"
				view.append(option)
			}
		}, true)
		url = yshurl + "getstore"
			//获取店铺
		getDataList(url, param, function(ret) {
				view = $("#store")
				for(var num in ret.aaData) {
					option = "<option value='" + ret.aaData[num].Id + "'>" + ret.aaData[num].StoreName + "</option>"
					view.append(option)
						//获取运费模板
				}
				getYunFei()
			}, true)
			//获取单位
		url = yshurl + "getUnit"
		param = {}
		getDataList(url, param, function(ret) {
			var str = ""
			for(var num in ret.aaData) {
				str += "<option value=" + ret.aaData[num].Id + ">" + ret.aaData[num].MeasureName + "</option>"
			}
			$("#unit").append(str)
		}, true)

	}
}

function getYunFei(yfId, sid) {
	url = yshurl + "Add_LogisticalTempByProduct"
	if(!sid)
		sid = $("#store").val()
	var params = {
		"StoreId": sid
	}
	getDataList(url, params, function(ret) {
		view = $("#udframe")
		view.empty()
		var option = ""
		for(var num in ret.aaData) {
			if(!ret.aaData[num].sid) {
				ret.aaData[num].sid = sid
			}
		}
		for(var num in ret.aaData) {
			if(yfId == ret.aaData[num].Id && (ret.aaData[num].sid == sid || ret.aaData[num].sid)) {
				option += "<option selected value='" + ret.aaData[num].Id + "'>" + ret.aaData[num].TempletName + "</option>"
			} else if(yfId != ret.aaData[num].Id && ret.aaData[num].sid == sid) {
				option += "<option value='" + ret.aaData[num].Id + "'>" + ret.aaData[num].TempletName + "</option>"
			}
		}
		view.append(option)
	}, true)
}

//验证商品编号
var checkProCode = function() {
	var flag = 0
	formCheck = true
	//必填项验证
	$(".formData").each(function() {
		if(!($.trim($(this).val()))) {
			flag++;
			var $text = $(this).parent().prev().children();
			ysh_alert($text.text() + '不能为空');
			return false;
		}
	})

	if(flag == 0) {
		goods.ProductId = proId
		goods.Code = $("#goodCode").val() || null;
		goods.ProductName = $("#goodName").val() || null;
		goods.StoreId = $("#store").val() || null;
		goods.CategoryId = $("#catSelect").val() || null;
		goods.ShortDescription = $("#goodDetial").val() || null;
		goods.Price = $("#price").val() || null; //原价
		goods.UnitId = $("#unit").val() ||null;
		goods.StateMent = $("#StateMent").val() || null;//结算价
		goods.StockQuantity = $("#goodNum").val() || null
		goods.Specifications = $("#specificationsName").val() || null;
		goods.Productbrand = $("#Productbrand").val() || null;
		goods.LogisticaltempId = $("#udframe").val() || null;
		goods.FullDescription = decodeURI(window.localStorage.getItem("msgdata")) || null;
			//自定义check
		if(goods.Code && goods.Code.length > 10) {
			ysh_alert("商品编号长度不能超过10位", "warning")
			formCheck = false
		}
		if(parseFloat(goods.Specifications) < 0) {
			ysh_alert("商品规格不能为负数", "warning");
			formCheck = false;
		}
		if(goods.Specifications && goods.Specifications.length > 10) {
			ysh_alert("规格长度不能超过10位", "warning")
			formCheck = false
		}
		if(goods.ProductName && goods.ProductName.length > 15) {
			ysh_alert("商品名字长度不能超过15位", "warning")
			formCheck = false
		}
		if(goods.Productbrand && goods.Productbrand.length > 15) {
			ysh_alert("商品品牌长度不能超过15位", "warning")
			formCheck = false
		}
		if(Number(goods.StateMent) > Number(goods.Price)) {
			ysh_alert("结算价格应小于等于商品价格", "warning")
			formCheck = false
		}
		try {
			if(parseFloat(goods.Price) < 0) {
				ysh_alert("商品价格不能为负数", "warning");
				formCheck = false;
			}
			if(goods.Price && goods.Price.toString().split(".")[0].length > 8 || goods.Price && goods.Price.toString().split(".")[1].length > 3) {
				ysh_alert("金额只保留为小数点前8位，小数点后3位", "warning")
				formCheck = false
			}
		} catch(e) {
			//TODO handle the exception
		}
		try {
			if(parseFloat(goods.StateMent) < 0) {
				ysh_alert("结算价格不能为负数", "warning");
				formCheck = false;
			}
			if(goods.StateMent && goods.StateMent.toString().split(".")[0].length > 8 || goods.StateMent && goods.StateMent.toString().split(".")[1].length > 3) {
				ysh_alert("金额只保留为小数点前8位，小数点后3位", "warning")
				formCheck = false
			}
		} catch(e) {
			//TODO handle the exception
		}
		try {
			if(parseFloat(goods.StockQuantity) < 0) {
				ysh_alert("商品库存不能为负数", "warning")
				formCheck = false
			}
			if(goods.StockQuantity && goods.StockQuantity.length > 11) {
				ysh_alert("库存不能超过11位", "warning")
				formCheck = false
			}
			if(formCheck)
				GoodSubmit(goods)
		} catch(e) {

		}
	} else {
		//		ysh_alert("有必填项未填写，请完善表单！", "warning")
		formCheck = false
	}
}

//提交商品信息
function GoodSubmit(goods) {
	goods.udframe = 2
	goods.IsUsePoint = 1
	if(!$("#status").attr('checked'))
		goods.udframe = 1
	if(!$("#integral").attr('checked'))
		goods.IsUsePoint = 0
	var url = yshurl + "InsertintoProductInfo"
	var param = goods
	param.UnitEnty = 1
	if($("#UnitInit").attr("flag") == "1")
		param.UnitEnty = $("#UnitEnty").val()

	if(proId) {
		url = yshurl + "UpdateProductInfo"
		getDataList(url, param, function(ret) {
			ysh_msg("修改成功")
			history.back()
		}, false)
	} else {
		if(!codeCheck) {
			ysh_msg("商品编号已存在")
		} else {
			console.info(param)
			getDataList(url, param, function(ret) {
				if(ret && ret.aaData && ret.aaData.insertId) {
					url = yshurl + "InsertintoProductSKUInfo"
						//插入规格
					param.ProductId = ret.aaData.insertId
					getDataList(url, param, function(ret) {
						url = yshurl + "BatchInsertPicture"
						var imgParam = {
							imgUrl: imgArray.join(","),
							splitChar: ",",
							ownId: ret.aaData.insertId,
							picType: 3
						}

						getDataList(url, imgParam, function(ret) {
							if(ret && ret.aaData && ret.aaData.length > 0) {
								ysh_confirm("添加商品成功，是否继续添加？", "再来一个", "不了", function(ret) {
									if(ret) {
										imgArray = new Array()
										formCheck = true
										proId = null
										window.location.reload()
									} else {
										window.location.href = "goodsMange.html?pageid=17"
									}
								})
							}
						})
					}, false)
				}
			}, false)
		}
	}
}

function goodCodeCheck() {
	var goodCode = $("#goodCode").val()
	var checkUrl = yshurl + "checkGoodCode"
	var param = {
		goodCode: goodCode
	}
	getDataList(checkUrl, param, function(ret) {
		if(ret.aaData[0].count != 0) {
			ysh_msg("商品编号已存在")
			codeCheck = false
		} else {
			codeCheck = true
		}
	}, true)
}

// 上传文件成功的回调方法
var onSuccess = function(file, response) {
	$(".upload_preview").css('overflow-y', 'scroll').css('max-height', '170px');
	$(".upload_preview").css('overflow-y', 'scroll').css('height', '170px');

	var obj = JSON.parse(response)
	imgArray.push(obj.aaData[0].fileurl)
}

var onDelete = function(delFile, uploadFile) {
		if(!uploadFile.length)
			$(".upload_preview").css('overflow-y', 'scroll').css('height', '0px');
	}
	//选中图片
var onSelect = function() {
		setIframeHeight()
		$(".upload_preview").css('overflow-y', 'scroll').css('max-height', '170px');
		$(".upload_preview").css('overflow-y', 'scroll').css('height', '170px');
		setIframeHeight()
	}
	//上传文件失败的回调方法
var onFailure = function(file) {
		$(".upload_preview").css('overflow-y', 'scroll').css('max-height', '170px');
		$(".upload_preview").css('overflow-y', 'scroll').css('height', '170px');
	}
	//上传文件完成的回调方法
var onComplete = function(responseInfo) {
	ysh_alert("上传图片完成!")
}

//规格追加
function changeUnit(Id) {
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