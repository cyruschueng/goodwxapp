var idTmr;
var count = 0
var obj = {
	ProductName: $("#proName").val() || "",
	UserName: $("#buyerName").val() || "",
	OrderNumber: $("#orderNumber").val() || "",
	CreatedOnUtcStart: $("#dealTimeStart").val() || "",
	CreatedOnUtcEnd: $("#dealTimeEnd").val() || "",
	OrderStatusId: $("#orderStatu").val() || 0,
	buyerName:$("#consignee").val() || "",
	ShippingStatusId:$("#logistics_Statu").val() || 0,
	Rate: 0,
	PaymentStatusId: $("#commetLv").val() || 0,
	PageIndex: 0,
	PageSize: 1000
}

function getExcle() {
	if (count == obj.PageIndex) {
		getDataList(yshurl + "GetOrderList", obj, function(d) {
			var flag = (d.aaData[0].length >= obj.PageSize)
			count += 1
			
			$.each(d.aaData[0],function(i,v){
				if(v.Person == null){
					v.Person = "暂无"
				}
			})
			laytpl($("#tplTable").html()).render(d.aaData[0], function(html) {
				$("#orderTableBody2").append(html);
			});
			if (flag) {
				obj.PageIndex += 1
				getExcle()
			} else {
				method1("orderTable1")
			}
		})
	} else {
		method1("orderTable1")
	}

}

function getExplorer() {
	var explorer = window.navigator.userAgent;
	//ie 
	if (explorer.indexOf("MSIE") >= 0) {
		return 'ie';
	}
	//firefox 
	else if (explorer.indexOf("Firefox") >= 0) {
		return 'Firefox';
	}
	//Chrome
	else if (explorer.indexOf("Chrome") >= 0) {
		return 'Chrome';
	}
	//Opera
	else if (explorer.indexOf("Opera") >= 0) {
		return 'Opera';
	}
	//Safari
	else if (explorer.indexOf("Safari") >= 0) {
		return 'Safari';
	}
}

function method1(tableid) {
	if (getExplorer() == 'ie') {
		var curTbl = document.getElementById(tableid);
		var oXL = new ActiveXObject("Excel.Application");

		
		var oWB = oXL.Workbooks.Add();
		
		var xlsheet = oWB.Worksheets(1);
		
		var sel = document.body.createTextRange();
		sel.moveToElementText(curTbl);
		
		sel.select();
	
		sel.execCommand("Copy");
		
		xlsheet.Paste();
	   
		oXL.Visible = true;
	

		try {
			var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
		} catch (e) {
			print("Nested catch caught " + e);
		} finally {
			oWB.SaveAs(fname);
			oWB.Close(savechanges = false);
			//xls.visible = false;
			oXL.Quit();
			oXL = null;
			//window.setInterval("Cleanup();",1);
			idTmr = window.setInterval("Cleanup();", 1);
		}
	} else {
		tableToExcel(tableid)
	}
}

function Cleanup() {
	window.clearInterval(idTmr);
	CollectGarbage();
}
var tableToExcel = (function() {
	var uri = 'data:application/vnd.ms-excel;base64,',
		template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
		base64 = function(s) {
			return window.btoa(unescape(encodeURIComponent(s)))
		},
		format = function(s, c) {
			return s.replace(/{(\w+)}/g,
				function(m, p) {
					return c[p];
				})
		}
	return function(table, name) {
		if (!table.nodeType) table = document.getElementById(table)
		var ctx = {
			worksheet: name || 'Worksheet',
			table: table.innerHTML
		}
		window.location.href = uri + base64(format(template, ctx))
	}
})()