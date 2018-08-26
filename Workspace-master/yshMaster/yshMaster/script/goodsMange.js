function authorityCheck() {
	$('button').each(function() {
		$(this).hide()
	})
	var MenuId = ysh_GetQueryString("pageid") || 0
	var url = yshurl + "SelectMEunOptionForUser"
	var param = {
		MenuId: MenuId
	}
	var authority = ""
	getDataList(url, param, function(ret) {
		var authorityTemp = ret.aaData[0].Optional.split(",")
		for(var num in authorityTemp) {
			authority = ".authority"
			authority += authorityTemp[num]
			$(authority).each(function() {
				$(this).show()
			})
		}
		if(ret.aaData[0].RoleId == 3) {
			$("#storeName").attr("readonly", "readonly")
		} else {
			$("#storeName").val("")
		}
	}, true)
}

function init() {
	var url = yshurl + "CateGoryListInC"
	var param = {}
	var option = ""
	var view = ""
		//获取分类ProductCount
	getDataList(url, param, function(ret) {
			view = $("#catSelect")
			for(var num in ret.aaData) {
				option = "<option value='" + ret.aaData[num].ID + "'>" + ret.aaData[num].CateName + "</option>"
				view.append(option)
			}
		}, true)
		//获取上架状态
	url = yshurl + "getudframe"
	getDataList(url, param, function(ret) {
		view = $("#udframe")
		for(var num = 0; num < ret.aaData.length; num++) {
			option = "<option value='" + ret.aaData[num].dictionaryID + "'>" + ret.aaData[num].datastatus + "</option>"
			view.append(option)
		}
	}, true)
	searchList(true)
}

//表格加载数据
function loadData(f1, data) {
	console.log(data.rows)
	f1.bootstrapTable('load', data);
	var hashTemp = window.location.hash || "1"

	hashTemp = hashTemp.replace("#", "")
	$(".pagination").find('a').each(function() {
		if($(this).text() == hashTemp)
			$(this).click()
	})
};

//搜索列表
function searchList(is_init, startpage, pageLength) {
	if(!startpage || is_init == true)
		startpage = 1
	if(!pageLength || is_init == true)
		pageLength = 10
	startpage = parseInt(startpage)
	pageLength = parseInt(pageLength)
	
	var CategoryId = $("#catSelect").val() || null
	var udframe = $("#udframe").val() || null
	var storeName = $("#storeName").val() || null
	var ProductName = $("#goodsName").val() || ""
	
	var url = yshurl + "ProductListInc"
	var view = $("#ProductList")
	var tpl = $("#tpl").html()
	var param = new Object()
	var statrNum = (startpage - 1) * pageLength
	var endNum = statrNum + pageLength

	param.udframe = ""
	param.CategoryId = ""
	param.storeNameKey = ""
	param.storeNameValue = ""
	param.storedian = ""
	param.statrNum = statrNum
	param.endNum = endNum
	param.ProductName = ProductName

	if(udframe != 0)
		param.udframe = "AND a.udframe=" + udframe
	if(CategoryId != 0)
		param.CategoryId = "AND a.CategoryId=" + CategoryId
	if(storeName) {
		param.storeNameKey = "AND e.storeName like "
		param.storeNameValue = storeName
	}
	if(is_init == true) {
		var options = $table.bootstrapTable('getOptions');
		options.pageNumber = 1;
		$table.bootstrapTable('refreshOptions', options);
		var url_Count = yshurl + "ProductCount"
		getDataList(url_Count, param, function(ret) {
			if(ret && ret.aaData && ret.aaData[0] && ret.aaData[0].COUNT > 0) {
				showPageList(ret.aaData[0].COUNT, 10)
				totalCount = ret.aaData[0].COUNT;
			} else {
				$("#pagination").empty()
				totalCount = 0;
			}
		}, true)

		$("#searchButton").removeAttr("onclick")
		$("#searchButton").attr("onclick", "searchList(false)")
	}
	getDataList(url, param, function(ret) {
		for(var num in ret.aaData) {
			if(!ret.aaData[num].picurl) {
				ret.aaData[num].picurl = 'noimg.jpg'
			}
		}
		var data = {
			rows: ret.aaData
		};
		var url_Count = yshurl + "ProductCount"
		getDataList(url_Count, param, function(ret) {
			data.total = totalCount
			if(ret && ret.aaData && ret.aaData[0] && ret.aaData[0].COUNT >= 0) {
				showPageList(ret.aaData[0].COUNT, 10)
				totalCount = ret.aaData[0].COUNT;
				data.totalCount = totalCount
				data.total = totalCount
				loadData($table, data);
			} else {
				$("#pagination").empty()
				totalCount = 0;
			}
		}, true)
		setIframeHeight();
		authorityCheck()
		$("#storeName").val(storeName)
	}, true)
}

//删除商品
function deleteGood(goodId) {
	ysh_confirm("确认删除？", "确认", "取消", function(ret) {
		var hdGoodUrl = yshurl + "checkgoods";
		var param = {
					goodId: goodId
				}
		getDataList(hdGoodUrl,param,function(msn){
			if(ret) {
				if(msn.aaData[0].totals == 0){
					var url = yshurl + "deletGoods"
					getDataList(url, param, function(ret) {
						var page = $(".active").eq(0).attr("varr")
						if(ret && ret.aaData && ret.aaData.changedRows != 0) {
							ysh_alert("删除成功", "success")
							searchList('', page, 10)
						} else {
							ysh_alert("删除失败", "error")
							searchList('', page, 10)
							searchList()
						}
					})
				} else {
					ysh_alert("该商品为限时优惠商品不能删除", "error")
				}
			}
		})
	})
}

function showPageList(length, pageLength) {
	var count = Math.floor(length / pageLength)
	var temp = length % pageLength
	var str = ""
	var view = $("#pagination")
	if(temp > 0) {
		count += 1
	}
	for(var num = 0; num < count; num++) {
		str += "<li varr = " + (num + 1) + " onclick='searchList(null," + (num + 1) + ",10)'><a>" + (num + 1) + "</a></li>"
	}
	view.empty()
	view.append(str)

}

//操作按钮
function operationFormatter(value, row, index) {
	var result = [
		'<button class="btn btn-info authority1" onclick="editOrshowGoods(' + row.Id + ',\'search\')" type="button">查看</button>',
		'<button class="btn btn-warning authority4" onclick="editOrshowGoods(' + row.Id + ',\'detail\')" type="button">修改</button>',
		'<button class="btn btn-success authority5" onclick="editgoodsSpecifications(' + row.Id + ')" type="button">编辑规格</button>',
		'<button class="btn btn-danger authority2" onclick="deleteGood(' + row.Id + ')" type="button">删除</button>'
	];
	return result.join(' ');
}
//审核字段
function verifyFormatter(value, row, index) {
	return '通过';
}

function pictureFormatter(value, row, index) {
	return '<img style="width: 100px;height: 100px;" src="' + seturl + row.picurl + '">';
}

//编辑、详情
function editOrshowGoods(id, action) {
	window.location.href = 'goodsDetial.html?goodsid=' + id + '&action=' + action;
}

function editgoodsSpecifications(id) {
	window.location.href = 'goodsSpecifications.html?goods_id=' + id;
}

var $table = $("#goodstable");
var totalCount = 0;
var checkList = [];
$(function() {
	$table.bootstrapTable({
		pagination: true, //分页
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
		clickToSelect: false,
		sidePagination: 'server',
		pageList: [10]
	});

	//点击分页查询
	var size;
	$table.on('page-change.bs.table', function(e, number, size) {
		size = size;
		window.location.hash = number;
		searchList(null, number, size);
	});
	window.onhashchange = function() {
		var hash = window.location.hash;
		var id;
		if(hash != "") {
			id = parseInt(hash.substr(1));
		} else {
			id = 1
		}
		searchList(null, id, size);
		$("ul.pagination").children().eq(id).addClass("active").siblings().removeClass("active");
	};
});