
/* savepanoInfo
 * 保存active的pano信息
*/
function savepanoInfo() {
	var activeImage = $('.js-img-edit-contain .image.active');
	activePanoIndex = $('.js-img-edit-contain .image').index(activeImage);
	var panoDisplayDom = $('.js-detail-edit .pano-attr');
	$.each(panoDisplayDom, function(index, item) {
		if(item.tagName !='SPAN') {
			var val = $(item).val();
			//heading和pitch不能为空
			if((item.tagName !='TEXTAREA') &&(val == 'NaN' || val == '')) {
				val = 0;
			}
			activeImage.data($(item).attr('pano-attr'), val);
		}
	});
}
function setPanoAttr(data) {
	var panoDisplayDom = $('.js-detail-edit .pano-attr');
	$.each(panoDisplayDom, function(index, item) {
		if(item.tagName =='SPAN') {
			$(item).html(data[$(item).attr('pano-attr')]);
		} else 	{
			$(item).val(data[$(item).attr('pano-attr')]);
		}
	});
}
var activePanoIndex = -1;
function addEditPanoEvent(){
	$('.js-img-edit-contain').off('click', '.image').on('click', '.image', function() {
		var _this = this;
		//保存上一个active的pano信息
		savepanoInfo();
		$('.js-img-edit-contain .image').removeClass('active');
		$(_this).addClass('active');

		var data = $(_this).data();
		setPanoAttr(data);
		panoContainer.setHeading(data.panoHeading);
		panoContainer.setPitch(data.panoPitch);
		panoContainer.setPanoId(data.panoId);
	});
	$('.js-detail-edit [pano-attr="panoHeading"]').off().blur(function() {
		panoContainer.setHeading($(this).val());
	});
	$('.js-detail-edit [pano-attr="panoPitch"]').off().blur(function() {
		panoContainer.setPitch($(this).val());
	});
	// $('.js-detail-edit .pen').off().on('click', function() {
	// 	var $nameDiv = $(this).closest('div').find('.num-name');
	// 	var panoName = $nameDiv.html();
	// 	var Content = '<div style="margin:10px auto;width:auto;color:#434750;font-size:12px;">' + 
	// 						  	'<div class="name"><span>场景名称:</span><input type="text" id="panoName" value="'+ panoName +'" style="width:224px;height:24px;border:1px solid #e4e4e4;"></div>';
	// 	var d = new Dialog({
	// 		title: '修改场景名称', 
	// 		content: Content,
	// 		ok: function($dialog) {
	// 			panoName = $dialog.find('#panoName').val();
	// 			$nameDiv.html(panoName);

	// 			var activeImage = $('.js-img-edit-contain .image.active');
	// 			$('.js-img-edit-contain .image.active').data('panoName', panoName);
	// 			$('.js-img-edit-contain .image.active').find('.image-title').html(panoName);
	// 		}
	// 	});
	// });
	$('.btn-save-pano').off().on('click', function() {
		var top = event.pageY - 400 > 0? event.pageY - 400: 0;
		savepanoInfo();
		updateAlbum(albumUpdateObject.albumContent, '.js-img-edit-contain>ul>li');
		albumUpdateObject.albumContent.activeStep = 1;
		var data = JSON.stringify({albumId: albumUpdateObject.albumId, optVersion: albumUpdateObject.optVersion, 'albumContent': JSON.stringify(albumUpdateObject.albumContent)});
		$.ajax({
			type: 'post',
			url: url_root + '/album/update?lang=' + localStorage.langStr,
			contentType:"application/json; charset=utf-8",
			data: data,
			success: function(data) {
				if(data.result == 0 ) {
        			var d = new Dialog({top: top + 'px',title: '提示', content: '保存成功', autoClose:true});
					setAlbum($('.step-wrap-3.sub-step-0 .js-img-edit-contain'),data.data.albumId, function(){
						var $activePano = $($('.js-img-edit-contain .image')[activePanoIndex]);
						$activePano.addClass('active');
						editPanoInfo($activePano.data());
						setPanoAttr($activePano.data());
						addEditPanoEvent();
					});
				} else if(data.result == 2) {
					loginDialog();
				} else {
					var d = new Dialog({title: '提示', content: data.msg});
				}
			}
		});
	});
}
function setDefaultVal(val, defaultVal) {
	if(val===0) {
		return val;
	}
	return val || defaultVal;
}
var panoContainer;
// panoContainer.setPanoId(panoId); // 全景ID
// setHeading(h) 方向角度 setPitch(p) 俯视角度 setRoll(r) 翻滚角度  setAutoplayEnable(a) 自动播放 setGravityEnable(g) 重力感应
function editPanoInfo(options1) {
	var options=options1;
	setTimeout(function(){
		panoContainer = new com.vbpano.Panorama(document.getElementById("panoView"),{
			// panoId : options.panoId,  
			heading : setDefaultVal(options.panoHeading, 90),
			pitch : setDefaultVal(options.panoPitch, -10),
			roll : options.roll || 0,
			autoplayEnable : options.autoplayEnable || false,
			gravityEnable : options.gravityEnable || false
		});
		//For test
		if(!config.onlineFlag) { 
			panoContainer.panoView.pano.urlProvider = function(panoId,level,row,column) {            if(level < -1) {                return "http://tilestest.pano.visualbusiness.cn/"+panoId+"/sv.xml";            }            if(level == -1) {                return "http://tilestest.pano.visualbusiness.cn/"+panoId+"/cube/thumb.jpg";            }            return "http://tilestest.pano.visualbusiness.cn/"+panoId+"/cube/"+level+"_"+row+"_"+column+".jpg";        }
		}

		panoContainer.panoView.onHeadingChangeCallback=function(heading){
			heading = heading % 360;
			if(heading < 0) {
				heading += 360;
			}
			$('.js-detail-edit [pano-attr="panoHeading"]').val(heading);
		};
		panoContainer.panoView.onPitchChangeCallback=function(pitch){
			$('.js-detail-edit [pano-attr="panoPitch"]').val(pitch);
		};
		$('.set-zoom-default').off('click').on('click', function() {
			panoContainer.panoView.setZoom && panoContainer.panoView.setZoom(0);
		});
		panoContainer.setPanoId(options.panoId);
	},200);

}