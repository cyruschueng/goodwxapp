var imgArray = new Array();

$(document).ready(function() {
		var goodsId = ysh_GetQueryString("goods_id") || null
		init(goodsId)
	})
	// 上传文件成功的回调方法
var onSuccess = function(file, response) {
		$(".upload_preview").css('overflow-y', 'scroll').css('max-height', '170px');
		$(".upload_preview").css('overflow-y', 'scroll').css('height', '170px');
		var obj = JSON.parse(response)
		imgArray.push({
			index: file.index,
			url: obj.aaData[0].fileurl
		})
	}
	//选中图片
var onSelect = function() {
		$(".upload_preview").css('overflow-y', 'scroll').css('max-height', '170px');
		$(".upload_preview").css('overflow-y', 'scroll').css('height', '170px');
		setIframeHeight()
		var h = $("body").height()
		var ph = $(window.parent.document).find("#main").attr("height")
	}
	//上传文件失败的回调方法
var onFailure = function(file) {
		$(".upload_preview").css('overflow-y', 'scroll').css('max-height', '170px');
		$(".upload_preview").css('overflow-y', 'scroll').css('height', '170px');
		setIframeHeight()
	}
	//上传文件完成的回调方法
var onComplete = function(responseInfo) {
	ysh_alert("上传图片完成!")
	setIframeHeight()
}
var onDelete = function(delFile, uploadFile) {
		if(!uploadFile.length)
			$(".upload_preview").css('overflow-y', 'scroll').css('height', '0px');
	}
	//初始化方法
function init(goodsId) {
	var url = ""
	var param = new Object()
	var view = ""
	var tpl = ""
	if(!goodsId) {
		ysh_alert("未获取到商品Id", "error")
		window.location.href = "goodsMange.html"
	} else {
		//获取商品信息
		url = url = yshurl + "GerProductSKUinfoByProductId"
		param = {
			goodsId: goodsId
		}
		getDataList(url, param, function(ret) {
				var str = ""
				var view2 = $("#Specifications")
				var Tpl2 = $("#goodsSpecificationsTpl").html()
				var tempArray = new Array()
				view = $("#goodMessage")
				tpl = $("#goodMessageTpl").html()
				showData(view, tpl, ret.aaData)
				var count = 0
				for(var num in ret.many[0]) {
					for(var k in tempArray) {
						if(tempArray[k].Id == ret.many[0][num].Id) {
							count++
						}
					}
					if(count == 0) {
						ret.many[0][num].img = new Array()
						tempArray.push(ret.many[0][num])
					} else {
						for(var k in tempArray) {
							if(tempArray[k].Id == ret.many[0][num].Id) {
								imgTemp = tempArray[k].img
								imgTemp.push(ret.many[0][num].Picurl)
								tempArray[k].img = imgTemp
								imgTemp = []
							}
						}
						count = 0
					}
				}
				showData(view2, Tpl2, tempArray)
			}, true)
			//获取单位
		url = yshurl + "getUnit"
		param = {}
			//获取单位
		getDataList(url, param, function(ret) {
			var str = ""
			for(var num in ret.aaData) {
				str += "<option value=" + ret.aaData[num].Id + ">" + ret.aaData[num].MeasureName + "</option>"
			}
			$("#unit").append(str)
		}, true)
	}
}

//
function formCheck() {
	var flag = 0
	var check = 0
	var form = new Object()
	form.Specifications = $("#specificationsName").val()
	form.Price = $("#Price").val()
	form.StateMent = $("#StateMent").val()
	form.UnitId = $("#unit").val()
	form.StockQuantity = $("#StockQuantity").val()
	form.ProductId = ysh_GetQueryString("goods_id")
	form.goodsId = ysh_GetQueryString("goods_id") || null
	form.isusepoint = $("#isusepoint").attr("checked")
	form.UnitEnty = $("#UnitEnty").val() || "1"

	if(!form.isusepoint) {
		form.isusepoint = 0
	} else {
		form.isusepoint = 1
	}
	//必填项验证
	$(".formData").each(function() {
		if(!($(this).val())) {
			flag++
		}
	})
	if(flag > 0) {
		ysh_alert("有必填项未完成", "warning")
	} else {
		//自定义验证
		if(form.Specifications.length > 15) {
			ysh_alert("规格名称不能超过15位", "warning")
			check++
		}
		if(Number(form.StateMent) > Number(form.Price)) {
			ysh_alert("结算价格应小于等于规格价哦", "warning")
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
			if(form.Price.toString().split(".")[0].length > 18 || form.Price.toString().split(".")[1].length > 2) {
				ysh_alert("金额只保留为小数点前18位，小数点后2位", "warning")
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
	var url = yshurl + "InsertintoProductSKUInfo";
	getDataList(url, form, function(ret) {
		url = yshurl + "BatchInsertPicture"
		imgArray = imgArray.sort(function(a, b) {
			return(a.index - b.index)
		});
		var imgArr = new Array();
		for(var i = 0; i < imgArray.length; i++) {
			imgArr.push(imgArray[i].url);
		}
		var imgParam = {
			imgUrl: imgArr.join(","),
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
						window.location.href = "goodsMange.html?pageid=17";
//						window.history.back();
					}
				})
			}
		})
	}, false)
}

function Delete(skuId) {
	ysh_confirm("确认删除？", "确认", "取消", function(ret) {
		if(ret) {
			var count = 0
			$(".deletebox").each(function() {
				count++
			})
			if(count != 1) {
				var url = yshurl + "DelSku"
				var param = {
					skuId: skuId
				}	
				getDataList(yshurl + "DelSkuChange",{skuId:skuId},function(msn){
					if(msn.state == 0 && msn.aaData[0].IsSpecial == 0){
						getDataList(url, param, function(ret) {
							if(ret.aaData.affectedRows == 1) {
								ysh_alert("删除成功", "success")
								window.location.reload()
							}
						}, false)
					} else {
						ysh_alert("该商品规格正在限时优惠，不能删除", "warning")
					}
				})
			} else {
				ysh_alert("规格至少要留存一个", "warning")
			}
		}
	})
}

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