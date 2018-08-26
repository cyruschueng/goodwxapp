
var albumUpdateObject = {};
var addedPanoIds = [];
/* lightUpNavStep
 *   param stepNo  .nav-img [0,stepNo] to be actived
 */

function lightUpNavStep(stepNo) {
	var steps = $('.nav-img .step-item');
	steps.removeClass('active');
	for(var i = 0; i <= stepNo; i++) {
		$(steps[i]).addClass('active');
	}
	/*if(stepNo=='4') {
		$(steps[5]).addClass('active');
	}*/
	if(stepNo=='5') {
		$(steps[6]).addClass('active');
	}
}
function focusNavStep(stepNo) {
	var steps = $('.nav-img .step-item');
	steps.removeClass('focus');
	$(steps[stepNo]).addClass('focus');
}
/* navToStep
 * param stepNo  specify step to be complete
 */

function navToStep(stepNo, substepNo) {
	lightUpNavStep(albumUpdateObject&&albumUpdateObject.albumContent? albumUpdateObject.albumContent.completedSteps: 0);
	focusNavStep(stepNo);
	$('.step-wrap').hide();
	$('.step-wrap-' + stepNo + '.sub-step-' + substepNo).show();
}

function clearQuery() {
	refreshImagesDialog($('.js-search-wrapper'), [], true);
	$('.panoQuery').val('');
}

function addNavEvent() {
	$('.nav-img').on('click', '.step-item.active', function() {
		var $this = $(this);
		if(!$this.hasClass('focus')) {
			var stepNo = $this.attr('stepNo') - 1;

			switch(stepNo) {
				case 0: 
					albumUpdateObject = null;
					break;
				case 1: 
					setAlbum($('.album.tree'), albumUpdateObject.albumId);
					clearQuery();
					break;
				case 2:
					setAlbumPicture(albumUpdateObject.albumId, function() {
						addPictureSelEvt();
					});
					break;
				case 3:
					setAlbum($('.step-wrap-3.sub-step-0 .js-img-edit-contain'), albumUpdateObject.albumId, function(){
						var $firstActivePano = $($('.step-wrap-3.sub-step-0 .js-img-edit-contain .image:first-child')[0]);
						$firstActivePano.addClass('active');
						editPanoInfo($firstActivePano.data());
						setPanoAttr($firstActivePano.data());
						addEditPanoEvent();
					});
					break;
				case 4:
					setAlbum($('.step-wrap-4.sub-step-0 .img-marker-edit-contain'),albumUpdateObject.albumId, function(){
						//隐藏细节点无效的pano
						$('.img-marker-edit-contain [data-is-with-markers]').hide();
						var imgWithMarkers = $('.img-marker-edit-contain [data-is-with-markers="1"]');
						imgWithMarkers.show();
						var $firstActivePano = $(imgWithMarkers[0]);
						if(!imgWithMarkers.length) {
							$('.no-marker-error').show();
						} else {
							$('.no-marker-error').hide();
						}
						$firstActivePano.addClass('active');
						setMarkerAttrVisible();
						editPanoMarkerInfo($firstActivePano.data() || {});
						addEditMarkerEvent();

						//展示当前active全景的markers
						setMarkerTable($firstActivePano);
						setMarkers($firstActivePano);
						setMarkerActive($($('.js-markers-table tr.marker')[0]));
						$('.step-wrap-4.sub-step-0 #addMarkerDiv').empty();

					}, true);
					break;
				case 5:
					getData();
					break;
				case 6:
					//产品编辑相关操作
                    getSwitchData()
					break;
				case 7:
                    setAlbumTree($(".step-wrap-7.sub-step-0 .pano-topo"), albumUpdateObject.albumId, function () {})
					break;
			}
			navToStep(stepNo,0);
		}else{
			var stepNo = $this.attr('stepNo') - 1;
			switch(stepNo) {
				case 0: 
					albumUpdateObject = null;
					break;
			}
			navToStep(stepNo,0);
		}
	});
	$('.step-wrap-0.sub-step-0 .js-album-search').click(function() {
		search0();
	});
	$('.step-wrap-0.sub-step-0 #albumQuery0').keydown(function(e) {
		if(e.keyCode == 13)
		search0();
	});
	$('.step-wrap-0.sub-step-1 .btn-next').click(function() {
		addedPanoIds = [];
		localStorage.langStr = '';
		setAlbum($('.album.tree'), albumUpdateObject.albumId, function() {
			if(!albumUpdateObject.albumContent.completedSteps || albumUpdateObject.albumContent.completedSteps < 1){
				albumUpdateObject.albumContent.completedSteps = 1;
			}
			navToStep(1, 0);
			clearQuery();
		});
	});
	$('.step-wrap-0.sub-step-2 .btn-next').click(function() {
		var albumId = $('input[name="albums"]:checked').val();
		if( !albumId) {
			var d = new Dialog({title: '提示', content: '请选择要编辑的相册！'});
			return;
		}
		localStorage.langStr = '';
		setAlbum($('.album.tree'), albumId, function() {
			if(!albumUpdateObject.albumContent.completedSteps || albumUpdateObject.albumContent.completedSteps < 1){
				albumUpdateObject.albumContent.completedSteps = 1;
			}
			navToStep(1, 0);
			clearQuery();
		});
	});
	$('.step-wrap-1.sub-step-0 .btn-next').click(function() {
		//保存相册层级结构
		updateAlbum(albumUpdateObject.albumContent, '.tree>ul>li');
		if(albumUpdateObject.albumContent.completedSteps < 1){
			albumUpdateObject.albumContent.completedSteps = 1;
		}
		albumUpdateObject.albumContent.activeStep = 1;
		var data = JSON.stringify({albumId: albumUpdateObject.albumId, optVersion: albumUpdateObject.optVersion, 'albumContent': JSON.stringify(albumUpdateObject.albumContent)});
		$.ajax({
			type: 'post',
			url: url_root + '/album/update?lang=' + localStorage.langStr,
			contentType:"application/json; charset=utf-8",
			data: data,
			success: function(data) {
				if(data.result == 0 ) {
					setAlbumPicture(albumUpdateObject.albumId, function() {
						addPictureSelEvt();
					});
					navToStep(2, 0);
				} else if(data.result == 2) {
					loginDialog();
				} else {
					var d = new Dialog({title: '提示', content: data.msg});
				}
			}
		});
	});
	$('.step-wrap-2.sub-step-0 .btn-next').click(function() {
		//保存相册层级结构
		if(albumUpdateObject.albumContent.completedSteps < 2){
			albumUpdateObject.albumContent.completedSteps = 2;
		}
		albumUpdateObject.albumContent.activeStep = 2;
		updateAlbumPicture(albumUpdateObject.albumContent, '.js-picture-table>.ul>.li');
		var data = JSON.stringify({albumId: albumUpdateObject.albumId, optVersion: albumUpdateObject.optVersion, 'albumContent': JSON.stringify(albumUpdateObject.albumContent)});
		$.ajax({
			type: 'post',
			url: url_root + '/album/update?lang=' + localStorage.langStr,
			contentType:"application/json; charset=utf-8",
			data: data,
			success: function(data) {
				if(data.result == 0 ) {
					setAlbum($('.step-wrap-3.sub-step-0 .js-img-edit-contain'),data.data.albumId, function(){
						var $firstActivePano = $($('.step-wrap-3.sub-step-0 .js-img-edit-contain .image:first-child')[0]);
						$firstActivePano.addClass('active');
						editPanoInfo($firstActivePano.data());
						setPanoAttr($firstActivePano.data());
						addEditPanoEvent();
					});
					
					navToStep(3, 0);
				} else if(data.result == 2) {
					loginDialog();
				} else {
					var d = new Dialog({title: '提示', content: data.msg});
				}
			}
		});
	});
	// $('.step-wrap-3.sub-step-0 .btn-back').click(function() {
	// 	// setAlbum($('.album.tree'), albumUpdateObject.albumId);
	// 	navToStep(2, 0);
	// });
	$('.step-wrap-3.sub-step-0 .btn-complete').click(function() { 
		if(albumUpdateObject.albumContent.completedSteps < 3){
			albumUpdateObject.albumContent.completedSteps = 3;
		}
		albumUpdateObject.albumContent.activeStep = 3;
		savepanoInfo();
		updateAlbum(albumUpdateObject.albumContent, '.js-img-edit-contain>ul>li');
		var data = JSON.stringify({albumId: albumUpdateObject.albumId, optVersion: albumUpdateObject.optVersion, 'albumContent': JSON.stringify(albumUpdateObject.albumContent)});
		$.ajax({
			type: 'post',
			url: url_root + '/album/update?lang=' + localStorage.langStr,
			contentType:"application/json; charset=utf-8",
			data: data,
			success: function(data) {
				if(data.result == 0 ) {
					setAlbum($('.step-wrap-4.sub-step-0 .img-marker-edit-contain'),data.data.albumId, function(){
						$('.img-marker-edit-contain [data-is-with-markers]').hide();
						var imgWithMarkers = $('.img-marker-edit-contain [data-is-with-markers="1"]');
						imgWithMarkers.show();
						var $firstActivePano = $(imgWithMarkers[0]);
						if(!imgWithMarkers.length) {
							$('.no-marker-error').show();
						} else {
							$('.no-marker-error').hide();
						}
						$firstActivePano.addClass('active');
						setMarkerAttrVisible();
						editPanoMarkerInfo($firstActivePano.data() || {});
						addEditMarkerEvent();

						//展示当前active全景的markers
						setMarkerTable($firstActivePano);
						setMarkers($firstActivePano);
						setMarkerActive($($('.js-markers-table tr.marker')[0]));
						$('.step-wrap-4.sub-step-0 #addMarkerDiv').empty();

					}, true);
					
					navToStep(4,0);
				} else if(data.result == 2) {
					loginDialog();
				} else {
					var d = new Dialog({title: '提示', content: data.msg});
				}


			}
		});
	});
	$('.step-wrap-4.sub-step-0 .btn-complete').click(function() {
		if(albumUpdateObject.albumContent.completedSteps < 4){
			albumUpdateObject.albumContent.completedSteps = 4;
		}
		albumUpdateObject.albumContent.activeStep = 4;
		saveMarkerInfo();
		//保存上一个全景的markers
		saveMarkersToImage();
		updateAlbum(albumUpdateObject.albumContent, '.img-marker-edit-contain>ul>li', true);
		var data = JSON.stringify({albumId: albumUpdateObject.albumId, optVersion: albumUpdateObject.optVersion, 'albumContent': JSON.stringify(albumUpdateObject.albumContent)});
		$.ajax({
			type: 'post',
			url: url_root + '/album/update?updateMeta=true&lang=' + localStorage.langStr,
			contentType:"application/json; charset=utf-8",
			data: data,
			success: function(data) {
				if(data.result == 0 ) {
					// setAlbum($('.step-wrap-5.sub-step-0 .pano-topo'),data.data.albumId, function(){});
					getData();
					navToStep(5, 0);
				} else if(data.result == 2) {
					loginDialog();
				} else {
					var d = new Dialog({title: '提示', content: data.msg});
				}
			}
		});
	});
	$('.step-wrap-5.sub-step-0 .btn-complete').click(function() {
		if(albumUpdateObject.albumContent.completedSteps < 5){
			albumUpdateObject.albumContent.completedSteps = 5;
		}
		albumUpdateObject.albumContent.activeStep = 5;

		updateAlbumCover(function(data){
			// setAlbumTree($('.step-wrap-6.sub-step-0 .pano-topo'),data.data.albumId, function(){});
			navToStep(6, 0);
		})
	});
	$('.step-wrap-6.sub-step-0 .btn-complete').click(function() {
        albumUpdateObject.albumContent.tipsList=[];
        albumUpdateObject.albumContent.tipsList = getTips();
        console.log(albumUpdateObject.albumContent.tipsList);
        albumUpdateObject.albumContent.completedSteps < 7 && (albumUpdateObject.albumContent.completedSteps = 7), albumUpdateObject.albumContent.activeStep = 7, updateConfig(function (a) {
            setAlbumTree($(".step-wrap-7.sub-step-0 .pano-topo"), a.data.albumId);
        });
	});
    function updateConfig(callback) {
			  albumUpdateObject.albumContent.status = 1;
        var a = JSON.stringify({
            albumId: albumUpdateObject.albumId,
            optVersion: albumUpdateObject.optVersion,
            albumContent: JSON.stringify(albumUpdateObject.albumContent)
        });
        $.ajax({
            type: "post",
            url: url_root + "/album/update?updateMeta=true&lang=" + localStorage.langStr,
            contentType: "application/json; charset=utf-8",
            data: a,
            success: function (a) {
                navToStep(7, 0), $("#step-item-last").addClass("active")
                callback && callback(a)
            }
        });
      $.ajax({
        type: "get",
        url: "http://shunde.vizen.cn/shunde/stat/reportDeplyPanoAblum?panoAlbumId="+albumUpdateObject.albumId+"&userId="+window.uniqueID+"&panoAlbumName="+albumUpdateObject.albumContent.albumName,
        success: function (a) {
        }
      });

    }
}
$(function() {
	login();
	addNavEvent();
	addAlbumInitEvt();
	addLayersEditEvent();
	addAlbumsSearchEvent();
	$('.datepicker').datepicker('destroy').datepicker();
  var data2;
  if(getQueryString('albumId')!=null){
    data2 = {
      token: getQueryString('token'),
      uniqueId: getQueryString('unique_id'),
      albumId: getQueryString('albumId')
    };
    var albumId = data2.albumId;
    localStorage.langStr = '';
    setAlbum($('.album.tree'), albumId, function () {
      if (!albumUpdateObject.albumContent.completedSteps || albumUpdateObject.albumContent.completedSteps < 1) {
        albumUpdateObject.albumContent.completedSteps = 1;
      }
      navToStep(1, 0);
    });
  }else {
    data2 = {
      token: getQueryString('token'),
      uniqueId: getQueryString('unique_id')
    };
    navToStep(0, 0);
  }
  window.uniqueID = data2.uniqueId;
});


