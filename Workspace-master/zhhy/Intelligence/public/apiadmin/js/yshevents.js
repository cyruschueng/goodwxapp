
/**
 * 查询事件
 * @param {Object} p
 */
function searchEvent(p){
debugger;
//	layer.msg(JSON.stringify(convertParams()));

	qData=[];
	pageIndex = 0;
	getQueryData('getList');

	if(!dropload){
			doScroll();
		}else{
			if(!dropload.isData){
				//解锁
				dropload.unlock();
	            dropload.noData(false);
           }
            //重置
			dropload.resetload();
		}

}

/**
 * 创建
 * @param {Object} area
 */
function cbutton(area){
	var html='';
		for(var i=0; i<btns.length;i++){
			var btnItem = btns[i];
			if(btnItem.display_area == area){
				html += createButton(btnItem);
			}
		}
		return html;
}

/**
 * 添加数据
 * @param {Object} p
 */
function addEvent(p){
	debugger;
	var html=createAddForm('form_add')+cbutton(4);
	var lyrindex = showweb(html);
	vali("form_add",null,lyrindex);
}

/**
 * 插入数据
 */
function insertEvent(ele,lyrindex){
	var api = gloabelApis['insert'] || 'InsertRecord';
	var postobj = getAddParams(ele);
	getDataList(yshurl+api,postobj, function(d){
		if(d && d.state == 0){
			ysh_msg('添加成功');
			layer.close(lyrindex);
			$("#search").click();
		}else{
			ysh_msg('添加失败');
			$("#"+ele).data('bootstrapValidator').resetForm();
		}
	});
}

/**
 * 更新数据
 * @param {Object} ele
 * @param {Object} ordata
 * @param {Object} lyrindex
 */
function updateEvent(ele,ordata,lyrindex){
	debugger;
	var api = gloabelApis['update'] || 'UpdateRecord';
	var postobj = getAddParams(ele);
	var data = JSON.parse(postobj.sp);
	debugger;
	if(ordata){
		for (var i in ordata) {
			for(var j in ordata[i]){
				if(ordata[i][j] == $.trim(data[i][j]) || (ordata[i][j] == null && $.trim(data[i][j]) == "")){
					delete data[i][j];
				}
			}
		}
		postobj.sp = JSON.stringify(data);
	}
	getDataList(yshurl+api,postobj, function(d){
		if(d && d.state == 0){
			ysh_msg("修改成功");
			layer.close(lyrindex);
			$("#search").click();
		}else{
			ysh_msg("保存失败");
			$("#"+ele).data('bootstrapValidator').resetForm();
		}
	});
}



/**
 * 编辑数据事件
 * @param {Object} p
 */
function editEvent(p){
	var did=$(p).attr('did');
	var params={
		tbname:setb.maintb,
		did:did
	}
	
	getDataList(yshurl+'getEditData',params,function(d){
		debugger;
		if(d && d.aaData && d.aaData.length > 0){
			var data = d.aaData[0];
			var html=createAddForm('form_edit',did)+cbutton(4);
			var lyrindex = showweb(html);
			var ordata = {};
			ordata[setb.maintb] = data;
			vali("form_edit",ordata, lyrindex);
			for(var i in data){
				$('#form_edit #'+i).val(data[i]);
			}
		}
	});
}

/**
 * 删除事件
 * @param {Object} p
 */
function deleteEvent(p){
	var api = gloabelApis['delete'] || 'DeleteRecord';
	ysh_confirm("确定删除","是","否",function(ret){
		if(ret){
			var did=$(p).attr('did');
			var params={
				tbname:setb.maintb,
				did:did
			}
			getDataList(yshurl+api,params, function(d){
				if(d && d.state == 0){
					ysh_msg("删除成功");
					$("#search").click();
				}else{
					ysh_msg("删除失败");
				}
			});
		}
	});
}

/**
 * 显示详情
 * @param {Object} p
 */
function showDetail(p){
	debugger;
	var did=$(p).attr('did');
	var clause={};
	clause[setb.maintb+'.Id']=did;
	
	var params = {sp: JSON.stringify(clause),se:setb.detail,tb:setb.tb}
	
	getDataList(yshurl+'getList',params,function(d){
		debugger;
		if(d && d.aaData && d.aaData.length > 0){
			var data = d.aaData[0];
			var html=createDetailForm(data);
			var lyrindex = showweb(html);
			$("#detail_form #closeBtn").attr("lyrindex",lyrindex);
		}
	});
}

/**
 * 关闭弹出框
 * @param {Object} p
 */
function closeEvent(p){
	var lyrindex=$(p).attr('lyrindex');
	layer.close(lyrindex);
}

/**
 * 批量删除
 */
function batchDeleteEvent(){
	var api = gloabelApis['batchDelete'] || 'BatchDeleteRecord';
	if(!checkList || checkList.length == 0){
		ysh_alert("请选择要删除的数据");
	}else{
		ysh_confirm("确认要删除选中的数据？","是","否",function(ret){
			if(ret){
				var params={
					tbname: setb.maintb,
					did: JSON.stringify(checkList)
				}
				debugger;
				getDataList(yshurl+api,params, function(d){
					if(d && d.state == 0){
						showmsg("删除成功");
						$("#search").click();
					}else{
						showmsg("删除失败");
					}
				});
			}
		});
	}
}

	
/**
 * 显示弹窗
 * @param {Object} html
 */
function showweb(html){
	
	var lyr = layer.open({
	  type: 1,
	  skin: 'layui-layer-rim', //加上边框
	  area: ['800px', '600px'], //宽高
	  content: html
	});
	return lyr;
}

//验证数据
function vali(ele,ordata,lyrindex){
	debugger;
    $('#' + ele).bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
         submitHandler: function(validator, form, submitButton) {
                // Do nothing
               
         },
        fields: datas.addFields
       
    }).on('success.form.bv', function(e) {
    	debugger;
    	var id = $(e.delegateTarget).attr('id');
    	if(id=="form_add"){
    		insertEvent(id,lyrindex);
    	}else{
    		updateEvent(id,ordata,lyrindex);
    	}
    });
}


	//创建Add表单
	function createAddForm(ele,did){
		did = did || "";
		datas.addFields={}; //表单验证字段
		var html = '<form id="'+ ele +'" action="javactript:void()" class="form-horizontal" role="form">';
		for (var i=0;i<columsdata.length;i++) {
			var item = columsdata[i];
			if(item.LableVaildata){
				var obj=toobj(item.LableVaildata);
				if(obj)
					datas.addFields[item.COLUMN_NAME]=obj;
			}
			if(item.ShowAdd && item.TABLE_NAME == setb.maintb){
				html += createHtml(item,12) ;
			}
		}
		if(did > 0){
			html += '<input id="did" name="did" type="hidden" value="'+ did +'">';
		}
		html+='<div class="col-xs-12"><div class="text-center"><button type="submit" class="btn btn-primary" >提交</button></div></div>';
		html += '</form>';
		return html;
	}
	
/**
 * 创建详情
 * @param {Object} ele
 * @param {Object} data
 */
	function createDetailForm(data){
		var html = '<form id="detail_form" action="javascript:void();" class="form-horizontal" role="form">';
		for(var i in data){
			if(i.indexOf('$')>-1){
				var tb_col = i.split('$');
				var cname = i;
				for(var j in columsdata){
					if(columsdata[j].TABLE_NAME == tb_col[0] && columsdata[j].COLUMN_NAME==tb_col[1] && (columsdata[j].ShowDetail == 1 ||columsdata[j].ShowDetail2 == 1)){
						cname = columsdata[j].COLUMN_COMMENT;
						break;
					}
				}
				html+= '<div class="row"><div class="col-lg-1"></div><div class="col-lg-3"><p class="text-right">'+ cname +'：<p></div><div class="col-lg-7">';
				if((data[i]+'') && (data[i]+'').indexOf("http") == 0){//图片
					html+='<img src="'+ data[i] +'" style="width:80px; height:80px;">'
				}else{
					html += '<p>'+ data[i] +'</p>'
				}
				html += '</div><div class="col-lg-1"></div></div>';
			}
		}
		html+='<div class="col-xs-12"><div class="text-center"><button id="closeBtn" type="button" onclick="closeEvent(this);" class="btn btn-primary" >关闭</button></div>';
		html += '</form>';
		return html;
	}
	

	function toobj(s){
		var obj=null;
		try{

			obj=JSON.parse(s);
		}catch(e){
			alert('toobj false');
		}		
		return obj;
	}