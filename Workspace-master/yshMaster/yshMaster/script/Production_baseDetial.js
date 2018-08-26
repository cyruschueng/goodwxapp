var imgArray = new Array()
var imgArrayTemp = []
var flag = true
$(document).ready(function() {
	var key = ysh_GetQueryString("key") || history.back()
	var Pid = ysh_GetQueryString("Pid") || null
	$(".show_map").height("0")
	init(key, Pid)
	setIframeHeight();
})

function init(key, Pid) {
	switch(key) {
		case "search":
			//初始化查询
			$('input').each(function() {
				$(this).attr("disabled", "disabled")
			})
			$('select').each(function() {
				$(this).attr("disabled", "disabled")
			})
			$('textarea').each(function() {
				$(this).attr("disabled", "disabled")
			})
			$(".remooa").each(function() {
				$(this).remove()
			})
			$('#saveButton').remove()
			getSelect(function() {
				initSearch(Pid)
			})
			$("#pic1").show()
			break;
		case "insert":
			$(".formData").each(function() {
				$(this).val("")
			})
			$(".Climate").each(function() {
				$(this).val("")
			})
			$("#pic2").show()
			getSelect()
			$("#saveButton").click(function() {
				saveData("insert")
			})

			break;
		case "update":
			getSelect(function() {
				initSearch(Pid)
				setIframeHeight()
			})
			$("#pic1").show()
			$("#changePic").show()
			$("#saveButton").click(function() {
				saveData("update", Pid)
			})
			break;
	}
}

function changePic() {
	$("#pic1").hide()
	$("#pic2").show()
	$("#changePic").hide()
	imgArray = []
	flag = false
}

function pic(imgArray) {
	var view = $("#pic1")
	var str = ""
	imgArrayTemp = []
	for(var num in imgArray) {
		var temp = imgurl + imgArray[num].Picurl
		imgArrayTemp.push(imgArray[num].Picurl)
		str += "<img src='" + temp + "' style='width: 100px;height: auto;margin-left: 25px;'/>"
	}
	view.append(str)
}

function initSearch(Pid) {
	var url = yshurl + "GETProbaseInfobyId"
	var param = {
		"probaseid": Pid
	}
	getDataList(url, param, function(ret) {
		pic(ret.aaData)
		if(ret.many[0].length <= 0) {
			ysh_alert("没有查询到相关数据", "error")
		} else {
			//基础信息
			$("#pName").val(ret.many[0][0].BaseName || "匿名基地")
			$("#pArea").val(ret.many[0][0].BaseAdd || "未知地址")
			$("#pType").val(ret.many[0][0].BaseType)
			$("#Puser").val(ret.many[0][0].MerchantId || "黑户")
			$("#Pmsg").val(ret.many[0][0].BaseContent || "未知地址")
			$("#Ppic").val()
				//生长环境
			$("#BaseTab").val(ret.many[0][0].BaseTab || "未录入")
			$("#BaseFram").val(ret.many[0][0].BaseFram || "未知")
			$("#Provenance").val(ret.many[0][0].Provenance || "未录入")
			$("#Sunshine").val(ret.many[0][0].Sunshine || "未录入")
			$("#Humidity").val(ret.many[0][0].Humidity || "未录入")
			$("#Atmosphere").val(ret.many[0][0].Atmosphere || "未录入")
			$("#Climate").val(ret.many[0][0].Climate || "未知")
			$("#Area").val(ret.many[0][0].Area || "未知")
			$("#Contractor").val(ret.many[0][0].Contractor || "未知")
			$("#Coordinates").val(ret.many[0][0].Coordinates || "未知");
			setIframeHeight()
		}
	}, true)

}

function getSelect(callback) {
	var url = yshurl + "GetProSupplier"
	var param = {
		"pId": 0
	}
	var url2 = yshurl + "Admin_GetInMarketMerchart"
	var params = {
		"Names": " "
	}
	getDataList(url2, params, function(ret) {
		var str = ""
		for(var num in ret.aaData) {
			str += '<option value="' + ret.aaData[num].Id + '">' + ret.aaData[num].text + '</option>'
		}
		$("#Puser").append(str)
	}, true)
	getDataList(url, param, function(ret) {
		if(ret.aaData.length <= 0) {
			ysh_alert("没有查询到相关数据", "error")
		} else {
			var str = ""
			for(var num in ret.aaData) {
				str += "<option value = " + ret.aaData[num].BaseTypeId + ">" + ret.aaData[num].datastatus + "</option>"
			}
			$("#pType").append(str)
			callback && callback()
		}
	}, true)
}

//保存数据
function saveData(way, pid) {
	var url = ""
	var param = {
		"MerchantId": $("#Puser").val(),
		"BaseName": $("#pName").val(),
		"BaseAdd": $("#pArea").val(),
		"BaseType": $("#pType").val(),
		"BaseContent": $("#Pmsg").val(),
		"WebUrl": "",
		"BaseFram": $("#BaseFram").val(),
		"BaseTab": $("#BaseTab").val(),
		"Sunshine": $("#Sunshine").val(),
		"Humidity": $("#Humidity").val(),
		"Atmosphere": $("#Atmosphere").val(),
		"Climate": $("#Climate").val(),
		"use_id": 0,
		"Area": $("#Area").val(),
		"Coordinates": $("#Coordinates").val(),
		"Contractor": $("#Contractor").val(),
		"Provenance": $("#Provenance").val(),
		"probaseid": pid
	}
	switch(way) {
		case "insert":
			if(!formCheck()) {
				ysh_alert("有必填项未填写", "error")
				window.parent.goTop()
			} else {
				url = yshurl + "InsertintoProductBaseInfo"
				getDataList(url, param, function(ret) {
					if(ret && ret.aaData && ret.aaData.insertId) {
						url = yshurl + "BatchInsertPicture"
						var imgParam = {
							imgUrl: imgArray.join(","),
							splitChar: ",",
							ownId: ret.aaData.insertId,
							picType: 5
						}
						getDataList(url, imgParam, function(ret) {
							if(ret && ret.aaData && ret.aaData.length > 0) {
								ysh_confirm("添加基地成功，是否继续添加？", "再来一个", "不了", function(ret) {
									if(ret) {
										imgArray = new Array()
										formCheck = true
										proId = null
										window.location.reload()
									} else {
										history.back()
									}
								})
							}
						})
					} else {
						ysh_msg("数据异常")
					}
				}, false)
			}
			break;
		case "update":
			if(!formCheck()) {
				ysh_alert("有必填项未填写", "error")
				window.parent.goTop()
			} else {
				if(flag) {
					param.imgUrl = imgArrayTemp.join(",")
				} else {
					param.imgUrl = imgArray.join(",")
				}

				param.splitChar = ","
				url = yshurl + "UpdateProbaseinfo"
				getDataList(url, param, function(ret) {
					if(ret.many[0].affectedRows == 1) {
						ysh_msg("更新成功！")
						history.back()
					} else {
						ysh_alert("更新出错！", "error")
					}
				}, false)
			}
			break;
	}
}

//表单check
function formCheck() {
	var count = 0
	$(".formData").each(function() {
		var temp = $(this).val() || null
		if(!temp)
			count++
	})
	if(count == 0) {
		return true
	} else {
		return false
	}
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