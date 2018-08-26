/**
 * @description: 发布稿件-添加全景
 * @author: Jolie
 * @update:
 */
 
require([
    'common/interface',
    'common/util',
    'common/errCode',
    'module/dialog'
    // 'module/common'
    // 'widget/jquery-ui.min.js'
], function (inter, util, errCode, dialog) {
	var albumUpdateObject = {};
	var deviceModels = [];
	initAlum();
	addAlbumInitEvt();
	//TODO:hide device selector temporary.
	// getDeviceModels();
	function getDeviceModels() {
		$.ajax({
			   xhrFields: {
		       withCredentials: true
		    },
			type: 'get',
			url:  inter.getApiUrl().getDeviceModelsUrl,
			contentType:"application/json; charset=utf-8",
			success: function(data) {
				if(data.result == 0 ) {
					deviceModels = data.data;
				} else {
					var d = new dialog.init({title: '提示', content: data.msg});
				}
			}
		});
	}
	function initAlum() {
		var albumId = util.getQueryString('albumId');
		if(albumId) {
			albumUpdateObject.albumId = albumId;
			setAlbum($('.js-img-edit-contain'), albumUpdateObject.albumId, function(albumName){
				// initButtons();
				// setAlumName(albumName);
				addEditPanoEvent();
			});
		} else {
			addedPanoIds = [];
			albumUpdateObject.albumContent = {'albumName': '', 'albumInfo': ''};
			setAlbumlayer($('.js-img-edit-contain'), albumUpdateObject.albumContent);
			addEditPanoEvent();
		}
	}
	function addEditPanoEvent(){
		// $('.js-detail-edit [pano-attr="panoHeading"]').off().blur(function() {
		// 	panoContainer.setHeading($(this).val());
		// });
		// $('.js-detail-edit [pano-attr="panoPitch"]').off().blur(function() {
		// 	panoContainer.setPitch($(this).val());
		// });
		$('.js-save, .js-save-next').off().on('click', function() {
			var _this = this;

			if(!saveAlbumInfo()) {
				return;
			}
			isPanoNameNull = false;
			updateAlbum(albumUpdateObject.albumContent, '.js-img-edit-contain>ul>li');
			// if(isPanoNameNull) {
			// 	var d = new dialog.init({title: '提示', content: '图片标题不能为空'});
			// 	return;
			// }

			var isAlbumNew = !util.getQueryString('albumId');
			var data, url;
			if(isAlbumNew) {
				data = JSON.stringify({'albumContent': JSON.stringify(albumUpdateObject.albumContent)});
				url = inter.getApiUrl().createAlbumUrl;
			} else {
				data = JSON.stringify({albumId: albumUpdateObject.albumId, optVersion: albumUpdateObject.optVersion, 'albumContent': JSON.stringify(albumUpdateObject.albumContent)});
				url = inter.getApiUrl().setAlbumUrl;
			}
			$.ajax({
				   xhrFields: {
			       withCredentials: true
			    },
				type: 'post',
				url: url,
				contentType:"application/json; charset=utf-8",
				data: data,
				success: function(data) {
					if(data.result == 0 ) {
						if($(_this).hasClass('js-save-next')) {
							window.location.href = "mediaRelease_featureSet.html?albumId="+ data.data.albumId;
						}else {
							window.location.href = "mediaRelease_panoSet.html?albumId="+ data.data.albumId;
						}
						// setAlbum($('.js-img-edit-contain'), albumUpdateObject.albumId, function(albumName){
							// addEditPanoEvent();
						// });
						// window.location.href = "albumEdit_featureSet.html";
					} else if(data.result == 2) {
					} else {
						var d = new dialog.init({title: '提示', content: data.msg});
					}
				}
			});
		});
		$('.js-img-edit-contain').on('mouseenter', '.img-contain', function() {
			$(this).find('.icon-delete').show();
		});
		$('.js-img-edit-contain').on('mouseleave', '.img-contain', function() {
			$(this).find('.icon-delete').hide();
		});
		$('.js-img-edit-contain').on('click', '.icon-delete', function() {
			$(this).closest('.img-wrap').remove();
		});
	}
	function addAlbumInitEvt() {
		var addPicContent = 
		'<div class="search-all-wrap">'+
			'<div class="search-param-wrap">'+
				'<div class="search input-group">'+
				    '<input type="text" class="panoQuery form-control" placeholder="输入项目名称全文检索">'+
				    '<span class="input-group-addon iconfont icon-search js-pano-search"></span>'+
				'</div>'+
				'<div class="date-wrap">'+
		            '<h4>选择时间范围：</h4>'+
		            '<input type="text" id="statisData" class="form-control" value="">'+
		            '<i class="glyphicon glyphicon-calendar fa fa-calendar"></i>'+
		        '</div>'+

				// '<div class="select-box search-device-wrap">'+ //active
		  //           '<div class="select-btn">'+
		  //               '选择设备'+
		  //               '<span class="caret"></span>'+
		  //           '</div>'+
		  //           '<ul class="select-item">'+
		  //               '<li select-val="VBPANO1.0"><a>VBPANO1.0</a></li>'+
		  //               '<li select-val="CCTV01"><a>CCTV01</a></li>'+
		  //           '</ul>'+
		  //       '</div>'+

				// '<div class="tags"></div>'+
			'</div>'+
			'<div class="tab-content search-all-content-wrap">'+
				'<div class="item1New tab-pane img-contain-wrap">'+
					'<div class="images add-image addedimages">'+
						'<div class="panos-wrap wrap"></div>'+
						'</div>'+
				'</div>'+
			'</div>'+
		'</div>'+
		'<div class="search-added-wrap">'+
			'<div class="search-head">已选择<span class="selected-num"></span>'+
			'</div>'+
			'<div class="search-added-content-wrap">'+
				'<div class="search-added-content panos-wrap">'+
				'</div>'+
			'</div>'+
		'</div>';

		$('.js-add-pic, .js-add-more').on('click', function() {
			var _this = this;
			var d = new dialog.init({
				title: '选择全景图', 
				tagClass: 'add-image-dialog',
				content: addPicContent, 
				buttons:[{
					text:'确定',
					type: 'save',
					tagClass: 'btn-main',
					buttonf: function($dialog) {
						var _this = this;
						var $imgContain = $('.js-img-edit-contain>ul>li>.layer').find('.img-contain-wrap .images');
						var selectedImages = $dialog.find('.search-added-content .img-wrap.selected');
						$imgContain.append(selectedImages);
						$dialog.remove();
						// $.each(selectedImages, function(index, panoItem) {
						// 	addedPanoIds.push(decodeURIComponent($(panoItem).data('panoId')));
						// });
					}
				},{
					text:'取消',
					type: 'cancel',
					tagClass: 'btn-common',
					buttonf: function($dialog) {
						$dialog.remove();
						// $.each(selectedImages, function(index, panoItem) {
						// 	addedPanoIds.push(decodeURIComponent($(panoItem).data('panoId')));
						// });
					}
				}],
				initEvt: function($dialog) {
					// TODO:hide device selector temporary.
					// setSelectItems($dialog.find('.search-device-wrap'), deviceModels);
					setSelectedImageNums();
					addDilaogEvent($dialog);
				}
			});
			// $(".select-box").blur(function() {
			//     $(this).parents(".select-box").removeClass("active");
			// });
			removeDialogModalBottomCss();
		});
		$('#upload-album-thumb').on('change', function(event){
		 	var file = event.target.files[0];
		 	var fileName = '/' + new Date().getTime() + '.png';
		 	util.uploadToLuna(file, setAlbumThumb);

		});
	}
	function setSelectItems($selectBox, itemData) {
		var $selectItem = $selectBox.find('.select-item');
		$selectItem.empty();
		$.each(itemData, function(idx, item) {
			$selectItem.append('<li select-val="' + item + '"><a>'+ item +'</a></li>');
		});
	}
	function setSelectedImageNums() {
		// var num = $('.js-img-edit-contain .images .img-wrap').length;
		var toAddNum = $('.search-added-content .img-wrap').length;
		$('.search-added-wrap .search-head .selected-num').html(toAddNum);
	}
	function setAlbumThumb(url) {
		url && $('.album-wrap .album-thumb').css({'font-size': '0','background-image': 'url('+ url +')'});
	}
	function saveAlbumInfo() {
		var albumName = $('#albumName').val().trim();
		var albumInfo = $('#albumInfo').val();
		// if( !albumName || !albumInfo) {
		// 	// var d = new Dialog({title: '提示', content: '相册名称、相册介绍不能为空！'});
		// 	new dialog.init({title: '提示', content: '全景新闻标题、全景新闻摘要不能为空！'});
		// 	return false;
		// }
		$('.js-img-edit-contain>ul>li').children('.layer').find('.name').data('albumname', albumName);
		$('.js-img-edit-contain>ul>li').children('.layer').find('.name').data('albuminfo', albumInfo);
		var thumbUrl = $('.album-wrap .album-thumb').css('background-image');
		if(thumbUrl.indexOf('vbpanomediapro') == -1) {
			albumUpdateObject.albumContent.albumThumb = util.splitUrl(thumbUrl);
		}
		return true;
	}
	/* updateAlbum
	 * 保存、更新相册内容到数据库，将dom结构中的数据存储到json中
	 */
	function updateAlbum(layerObj, layerDom, isWithMarkers) {
		var $container = $(layerDom);
		var $layerBarInfo = $container.children('.layer').find('.name');
		layerObj.albumName = decodeURIComponent($layerBarInfo.data('albumname'));
		layerObj.albumInfo = decodeURIComponent($layerBarInfo.data('albuminfo'));
		
		var $Images = $container.children('.layer').find('.images .image');
		layerObj.panoList = [];
		$.each($Images, function(index, image) {
			var data = $(image).data();
			var imageTds = $(image).closest('.img-wrap').find('.picture-attr');
			$.each(imageTds, function(index, item) {
				var val = $(item).val();
				data[$(item).attr('picture-attr')] = val;
			});
			if(!data['panoName']) {
				isPanoNameNull = true;		
			}
			// delete data.sortableItem;
			// delete data.selectableItem;
			if(isWithMarkers) {
				// storeMarkers($(image), data);
			} else {
				if(data.markers) {
					if(!(data.markers[0] && data.markers[0].width)) {
						data.markers = $.parseJSON(data.markers);
					}
				}
			}
			for (var i in data) {
				if(i != 'markers') {
					data[i] = decodeURIComponent(data[i]);
				}
			}
			layerObj.panoList.push(data);
		});
		layerObj.albumList = [];
		if($container.children('ul').length) {
			$.each($container.children('ul').children('li'), function(index, liItem) {
			 	var albumItem = {};
			 	updateAlbum(albumItem, liItem, isWithMarkers);
			 	layerObj.albumList.push(albumItem);
			});
		}
	}
    /* setAlbum
	 * 初始化相册内容，根据json数据画出相册
	 */
	function setAlbum($container, id, callback, isWithMarkers) {
		$container.find('ul').remove();
		addedPanoIds = [];
		var albumId = id;
		$.ajax({
			xhrFields: {
		       withCredentials: true
		    },
			type: 'get',
			url: inter.getApiUrl().getAlbumUrl,
			data: {albumId: albumId, lang: localStorage.langStr},
			success: function(data) {
				if(data.result == 0) {
					albumUpdateObject = data.data;
					var	albumObject = data.data;
					albumObject.albumContent = $.parseJSON(albumObject.albumContent);
					$('#albumName').val(albumObject.albumContent.albumName);
					$('#albumInfo').val(albumObject.albumContent.albumInfo);
					setAlbumThumb(albumUpdateObject.albumContent.albumThumb || '');
					if(isWithMarkers) {
						markersArrayArray = [];
					}
					setAlbumlayer($container, albumObject.albumContent, isWithMarkers);
					callback && callback(albumObject.albumContent.albumName);
				// } else if(data.result == 2) {
				// 	loginDialog();
				} else {
					// var d = new Dialog({title: '提示', content: data.msg});
					alert(data.msg);
				}
			}
		});

	}
	function setAlbumlayer($layerDom,layerObj, isWithMarkers) {
		var $li = addLayer($layerDom, layerObj);
		isNeedEmptyDiv($layerDom.children('.layer').find('.images'));
		if(layerObj.panoList && layerObj.panoList.length){
			var $imagesDiv = $li.children('.layer').find('.images');
			$imagesDiv.find('.empty').remove();
			addImage($imagesDiv, layerObj.panoList, isWithMarkers);
		}
		if(layerObj.albumList && layerObj.albumList.length) {
			$.each(layerObj.albumList, function(index, albumItem) {
				setAlbumlayer($li,albumItem, isWithMarkers);
			});
		}
	}
	function addImage($imageContainer, imagesData, isWithMarkers) {
		$.each(imagesData, function(index, panoItem) {
			addedPanoIds.push(panoItem.panoId);
		});
		$.each(imagesData, function(index, panoItem) {
			var img = '<div class="image" ';
			var markertemp = null;
			$.each(panoItem, function(key,val) {
				var Acode = ('A').charCodeAt();
				var Zcode = ('Z').charCodeAt();
				var minus = ('a').charCodeAt() - Acode;
				var keyArr = key.split('');
				$.each(keyArr, function(k,v) {
					var vCode = v.charCodeAt();
					if(vCode<=Zcode && vCode>=Acode){
						keyArr[k] = '-' + String.fromCharCode(vCode * 1 + minus);
					}
				});
				key = keyArr.join('');
				if(key == 'markers') {
					markertemp = val;
				}
				// img += 'data-' + key + '="' + val +'" ';
				img += 'data-' + key + '="' + encodeURIComponent(val) +'" ';
			});
			var thumbImageUrl = panoItem.customThumbnailUrl || (server_tiles_host + '/' + panoItem.panoId + '/flat/thumb12.jpg');

			img += '" style="background-image:url(' + thumbImageUrl + ')">'+
				// '<div class="image-title">' + panoItem.panoName + 
				// '<span class="del"></span>'+  //&#10005
				'<img class="default-img-shim" src="../images/img-default.jpg"></img>'+
			'</div>';
			var $img = $(img);
			$img.data('customThumbnailUrl', encodeURIComponent(thumbImageUrl));
			$img.attr('data-custom-thumbnail-url', encodeURIComponent(thumbImageUrl));
			
			if(panoItem.markers && panoItem.markers[0] && panoItem.markers[0].width) {
				$img.data('markers', JSON.stringify(markertemp));
				$img.attr('data-markers', JSON.stringify(markertemp));
			} else {
				$img.data('markers', JSON.stringify(null));
				$img.attr('data-markers', JSON.stringify(null));
			}
			var $pictureTr = getPitctureTr(panoItem);
			$pictureTr.find('.img-contain').append($img);
			$imageContainer.append($pictureTr);

			// $imageContainer.append($img);
			if(isWithMarkers) {
				var mindex = $('.js-img-marker-edit-contain .image').index($img);
				// setMarkerArrayArray(mindex, panoItem);
			} 
		});
	}
	function getPitctureTr(panoItem){
		// var $panoTr = $('<div class="info-item-wrap">'+
		// 					'<div class="info-image"></div>'+
		// 					'<div class="info-item info-name"><span>场景名称:</span><input type="text" class="picture-attr panoName" picture-attr="panoName" value="'+ panoItem.panoName+ '"></div>'+
		// 					'<div class="info-item info-desc"><span>场景介绍:</span>'+
		// 						'<textarea name="" class="picture-attr panoInfo" class="picture-attr" picture-attr="panoInfo" cols="20" rows="5">'+ (panoItem.panoInfo || '') +'</textarea>'+
		// 					'</div>'+
		// 				'</div>');
		var $panoTr = $('<div class="img-wrap">'+
                        '<div class="img-contain">'+
                            // '<img src="../images/album_thumb.png" class="img" alt="">'+
                            '<i class="iconfont icon-edit"></i>'+
                            '<i class="iconfont icon-add"></i>'+
                            '<i class="iconfont icon-sub"></i>'+
                            '<i class="iconfont icon-yes"></i>'+
                            '<i class="iconfont icon-delete"></i>'+
                            '<i class="icon-zoomIn"></i>'+
                        '</div>'+
                        '<div class="album-name-wrap">' + panoItem.panoName + '</div>'+
                        '<input class="img-title ipt-title picture-attr" type="text" placeholder="请输入图片标题" picture-attr="panoName" value="'+ panoItem.panoName+ '">'+
                        '<textarea class="img-info ipt-title picture-attr" type="text" placeholder="从这里开始输入图片说明" picture-attr="panoInfo">'+ (panoItem.panoInfo || '') +'</textarea>'+
                    '</div>');
		return $panoTr;
	}
	function addLayer($parent,layerObj) {
		var liStr = '<li>'+
			'<div class="layer">'+
				'<div class="layer-bar">'+
					'<span class="name" data-albumName="'+ encodeURIComponent(layerObj.albumName) +'" data-albumInfo="'+ encodeURIComponent(layerObj.albumInfo) +'">' + layerObj.albumName + '</span>'+
					'<span class="pen"></span>'+
					'<span class="del-layer"></span>'+
					'<span class="add-layer">分层</span>'+
				'</div>'+
				'<div class="img-contain-wrap">'+
					'<div class="images">'+
						// '<div class="empty"></div>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</li>';
		


		if(!$parent.children('ul').length) {   //当前层没有ul
			if($parent.closest('.album.tree').length) {//为添加分层树
				if(!$('.album.tree').find('ul').length){//是否首层
					$parent.prepend($('<ul></ul>'));
				} else {
					$parent.prepend($('<ul class="sortable-ul" title="拖动调整相册层顺序"></ul>'));
					// $parent.find('.sortable-ul').sortable({cursor: "pointer", connectWith: ".sortable-ul", dropOnEmpty: true});
				}
			} else {
				$parent.prepend($('<ul></ul>'));
			}
		}
		
		var $liStr = $(liStr);
		$parent.children('ul').append($liStr);
		$liStr.find('.images').sortable({cursor: "pointer", connectWith: ".images", dropOnEmpty: true}); //placeholder: 'border-yellow'
		// $liStr.find('.images').disableSelection();
		return $liStr;
	}
	function isNeedEmptyDiv($imagesDiv) {
		// var imgLen = $imagesDiv.find('.image').length;
		// var ulLen = $imagesDiv.closest('li').find('ul').length;
		// if(imgLen || ulLen) {
		// 	$imagesDiv.find('.empty').remove();
		// } else if(!$imagesDiv.find('.empty').length) {
		// 	$imagesDiv.append('<div class="empty"></div>');
		// }
	}
	var albumEdit = {};
	albumEdit.totalPage = -1;
	var layerEditSearch = {};
	var layerEditActiveTag = '';
	function addDilaogEvent($dialog) {
		$dialog.off('click').off('keydown').on('click', '.tags .filter', function() {
			$dialog.find('.tags .filter').removeClass('active');
			$(this).addClass('active');
			var filter = $(this).data('filter');
			var panoQuery = $dialog.find('.panoQuery').val();
			var data = {q: panoQuery, project: filter, size: 50};
			layerEditSearch = data;
			setPanos($dialog, data, true);
		});
		$dialog.on('click', '.js-pano-search', function() {
			var panoQuery = $dialog.find('.panoQuery').val();
			var data = {q: panoQuery, size: 50};
			layerEditSearch = data;
			$('button.cancelBtn').trigger("click.daterangepicker");
			setPanos($dialog, data, true);
		});
		$dialog.on('keydown', '.panoQuery', function(e) {
			if(e.keyCode == 13){
				var panoQuery = $dialog.find('.panoQuery').val();
				var data = {q: panoQuery, size: 50};
				layerEditSearch = data;
				setPanos($dialog, data, true);
			}
		});
		$dialog.on('click', '.search-all-wrap .img-wrap:not(.selected)', function() {
			var $imgWrap = $(this);
			$imgWrap.addClass('selected');
			$('.search-added-content').append($imgWrap.clone());
			setSelectedImageNums();

		});
		$dialog.on('click', '.search-added-content .img-wrap .icon-sub', function() {
			var panoIdToDel = $(this).closest('.img-wrap').find('.image').data("panoId");
			$(this).closest('.img-wrap').remove();
			$('.search-all-wrap').find('[data-pano-id="'+ panoIdToDel +'"]').closest('.img-wrap').toggleClass('selected');
			if($('.preview-dialog .pano-wrap').data("panoId") == panoIdToDel ) {
				$('.preview-dialog .pano-wrap').removeClass("selected");
			}
			setSelectedImageNums();
		});
		$dialog.on('click', '.search-all-wrap .img-wrap .icon-zoomIn', function() {
			showPreviewDialog($(this).closest('.img-wrap').find('.image'), $dialog);
			return false;
		});
		// $dialog.on("click", ".select-box li", function(){
		// 	var $this = $(this);
		// 	$this.closest('.select-box').find('li').removeClass('active');
		// 	$this.addClass('active');

		// 	var panoQuery = $dialog.find('.panoQuery').val();
		// 	var deviceModel = $this.attr("select-val");
		// 	layerEditSearch.q = panoQuery;
		// 	layerEditSearch.deviceModel = deviceModel;
		// 	setPanos($dialog, layerEditSearch, true);
		// });
		$dialog.on('mouseenter', '.search-all-wrap .img-wrap', function() {
			$(this).addClass('focus');
		});
		$dialog.on('mouseleave', '.search-all-wrap .img-wrap', function() { 
			$(this).removeClass('focus');
		});
		$dialog.on('mouseenter', '.search-added-content .img-wrap', function() {
			$(this).addClass('focusAdded');
		});
		$dialog.on('mouseleave', '.search-added-content .img-wrap', function() { 
			$(this).removeClass('focusAdded');
		});
		$('.date-wrap i').click(function() {
	    	$(this).parent().find('input').click();
	    });
		$("#statisData").daterangepicker({ 
			autoUpdateInput: false,
	        // startDate: util.getPickerDateStr(new Date()),
	        opens : 'left', //日期选择框的弹出位置
	        locale:{
	            format: 'YYYY/MM/DD',
	            applyLabel: '确认',
	            cancelLabel: '取消',
	            fromLabel: '从',
	            toLabel: '到',
	            weekLabel: 'W',
	            customRangeLabel: 'Custom Range',
	            daysOfWeek:["日","一","二","三","四","五","六"],
	            monthNames: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
	        }
	    }).on('apply.daterangepicker', function(ev, picker) {
	    	$(this).val(picker.startDate.format('YYYY/MM/DD') + ' - ' + picker.endDate.format('YYYY/MM/DD'));
			var startDate = util.getDateStr(new Date($('#statisData').data('daterangepicker')['startDate']));
		 	var endDate = util.getDateStr(new Date($('#statisData').data('daterangepicker')['endDate']));
		 	// rendDetailTable(null, startDate, endDate);
		 	layerEditSearch.fromTime = startDate;
		 	layerEditSearch.toTime = endDate;
			setPanos($dialog, layerEditSearch, true);
		}).on('cancel.daterangepicker', function() {
			$(this).val('');
	        layerEditSearch.fromTime = '';
		 	layerEditSearch.toTime = '';
			setPanos($dialog, layerEditSearch, true);
	    })

	}
	function showPreviewDialog($image, $addImageDialog) {
		var imgIdx = $('.search-all-content-wrap .wrap .img-wrap').index($image.closest('.img-wrap'));
		var previewContent = '<div class="content-wrap">' + 
				'<span class="js-close-preview fullscreen-exit"></span>' +
				'<div class="pano-wrap" data-pano-id="'+ $image.data("panoId") +'" data-img-idx="'+ imgIdx +'">' +
					'<i class="iconfont icon-add"></i>' +
					'<i class="iconfont icon-yes"></i>' +
					'<img class="default-img-shim" src="../images/img-default.jpg">' +
					'<iframe id="panoFrame" class="pano-frame" frameborder="0"></iframe>' +
				'</div>' +
				'<div class="nav">' +
					// '<span class="nav-prev"></span>' +
					// '<span class="nav-next"></span>' +
					'<i class="iconfont icon-arrow-left nav-prev"></i>'+
					'<i class="iconfont icon-arrow-right nav-next"></i>'+
				'</div>' +
			'</div>';
		var d = new dialog.init({
			title: ' ', 
			tagClass: 'preview-dialog',
			content: previewContent, 
			container: $addImageDialog[0],
			buttons: [],
			initEvt: function($dialog) {
				$('.pano-frame').attr('src', 'panoPreview.html?panoId=' + $dialog.find('.pano-wrap').data("panoId"));
				if($image.closest('.img-wrap').hasClass('selected')) {
					$dialog.find('.pano-wrap').addClass('selected');
				}
				setNavVisible($addImageDialog, $dialog, imgIdx);
				//TODO:优化
				window.setInterval(function() {
			        try {
			        	$(document.getElementById("panoFrame")).height($('.pano-wrap').height());
			        	$(document.getElementById("panoFrame")).width($('.pano-wrap').width());
			        } catch (ex){}
    			}, 200);
    			$dialog.on('click', '.icon-add', function() {
    				var panoId = $(this).closest('.pano-wrap').data('panoId');
    				var $imgWrap = $addImageDialog.find('.search-all-wrap [data-pano-id="'+ panoId +'"]').closest('.img-wrap');
					$imgWrap.addClass('selected');
					$(this).closest('.pano-wrap').addClass('selected');
					$('.search-added-content').append($imgWrap.clone());
					setSelectedImageNums();
    			});
    			$dialog.on('click', '.nav-prev', function() {
    				var imgIdxGo = $dialog.find('.pano-wrap').data('imgIdx') - 1;
    				setPreviewPano($addImageDialog, $dialog, imgIdxGo);
    				setNavVisible($addImageDialog, $dialog, imgIdxGo);
    			});
    			$dialog.on('click', '.nav-next', function() {
    				var imgIdxGo = $dialog.find('.pano-wrap').data('imgIdx') + 1;
    				setPreviewPano($addImageDialog, $dialog, imgIdxGo);
    				setNavVisible($addImageDialog, $dialog, imgIdxGo)
    			});
    			$dialog.on('click', '.js-close-preview', function() {
    				$dialog.remove();
    			});
			}
		});
	}
	function setPreviewPano($addImageDialog, $dialog, imgIdxGo) {
		var $imgWrap = $addImageDialog.find('.search-all-content-wrap .wrap').children().eq(imgIdxGo);
		var panoId = $imgWrap.find('.image').data("panoId");
		if($imgWrap.hasClass('selected')) {
			$dialog.find('.pano-wrap').addClass('selected');
		} else {
			$dialog.find('.pano-wrap').removeClass('selected');
		}
		$dialog.find('.pano-wrap').data({'imgIdx': imgIdxGo, 'panoId': panoId});
		document.getElementById("panoFrame").contentWindow.setPanoId(panoId);
	}
	function setNavVisible($addImageDialog, $dialog, imgIdx) {
		var imgLen = $addImageDialog.find('.img-wrap').length;
		if(imgIdx <= 0) {
			$dialog.find(".nav-prev").hide();
		} else {
			$dialog.find(".nav-prev").show();
		}
		if(imgIdx >= imgLen) {
			$dialog.find(".nav-next").hide();
		} else {
			$dialog.find(".nav-next").show();
		}
	}
	function addDialogScroll($dialog) {
		$dialog.find('.addedimages').off('scroll').on('scroll', function() {
			lazyLoad($dialog);
		});
	}
	function lazyLoad($dialog) {
		//元素顶部距离视窗上边界的距离
		$win = $dialog.find('.addedimages');
	    var viewTop = $dialog.find('.addedimages .wrap').height() - $win.scrollTop();
	    if ((viewTop < $win.height()+100)){
			var panoQuery = $dialog.find('.panoQuery').val();
			albumEdit.fromPage++;
			var data = {q: panoQuery, size: 50, fromPage: albumEdit.fromPage};
			var $filter = $dialog.find('.tags .filter.active');
			if($filter.length) {
				data.project = $filter.data('filter');
			}
			setPanos($dialog, data, false);
	    }
	}
	function setPanos($dialog, data, isInit) {
		var searchParam = data.q;
		var searchProject = data.project;
		// if(!data.q) {
		// 	return false;
		// }
		data.fromPage = data.fromPage || 1;
		var currentPage = data.fromPage;
		$.ajax({
			xhrFields: {
			       withCredentials: true
			    },
			type: 'get',
			url: inter.getApiUrl().getPanoInfoUrl,
			data: data,
			success: function(data) {
				if(data.result == 0 ){
					refreshImagesDialog($dialog, data.data.searchResult, isInit);
					if(data.project){
						$dialog.find('[data-filter="' + searchProject + '"]').addClass('active');
					}
					$dialog.find('.panoQuery').val(searchParam);
					albumEdit.totalPage = data.data.totalPage;
					if(albumEdit.totalPage <= currentPage) {
						$dialog.find('.addedimages').off('scroll');
					}
					removeDialogModalBottomCss();
				} else if(data.result == 2) {
					loginDialog();
				} else {
					var d = new dialog.init({title: '提示', content: data.msg});
				}
			}
		});
	}
	function refreshImagesDialog($dialog, searchedPanoItems, isInit) {
		var searchPart3 = $('.js-search-wrapper .tab-content');
		if(isInit) {
			$dialog.find('.addedimages .wrap').empty();
			$dialog.find('.tags').empty();
			albumEdit.tags = [];
			albumEdit.fromPage = 1;
			addDialogScroll($dialog);
			searchPart3.hide();
			// albumEdit.searchedPanoItems = searchedPanoItems; // 用于排重
		}

		$.each(searchedPanoItems, function(index, panoItem) {
			var isNewProject = true;
			$.each(albumEdit.tags , function(idx, tag) {
				if( tag == panoItem.project) {
					isNewProject = false;
				}
			});
			if(isNewProject) {
				albumEdit.tags.push(panoItem.project);

				var tagStr = '<span class="filter" data-filter="' + panoItem.project + '">' + panoItem.project + '</span>';
				$dialog.find('.tags').append($(tagStr));
				if($dialog.find('.filter').length!=1) {
					searchPart3.hide();
				} else {
					searchPart3.show();
				}
			}

			var usedClass = '';
			var usedPanoIds = addedPanoIds;
			$.each(usedPanoIds, function(idx, itm) {
				if(itm == panoItem.panoId) {
					usedClass = ' used ';
				}
			});
			
			var img = '<div class="image ' + usedClass + '" ';
			var markertemp = null;
			$.each(panoItem, function(key,val) {
				var Acode = ('A').charCodeAt();
				var Zcode = ('Z').charCodeAt();
				var minus = ('a').charCodeAt() - Acode;
				var keyArr = key.split('');
				$.each(keyArr, function(k,v) {
					var vCode = v.charCodeAt();
					if(vCode<=Zcode && vCode>=Acode){
						keyArr[k] = '-' + String.fromCharCode(vCode * 1 + minus);
					}
				});
				key = keyArr.join('');
				if(key == 'markers') {
					markertemp = val;
				}
				// img += 'data-' + key + '="' + val +'" ';
				img += 'data-' + key + '="' + encodeURIComponent(val) +'" ';
			});
			var thumbImageUrl = panoItem.customThumbnailUrl || (server_tiles_host + '/' + panoItem.panoId + '/flat/thumb12.jpg');

			img += '" style="background-image:url(' + thumbImageUrl + ')">'+
				// '<div class="image-title">' + panoItem.panoName + 
				// 	'<span class="used">&#9733</span>'+
				// '</div>'+
				// '<span class="add">&#10003</span>'+
				// '<span class="del"></span>'+  //&#10005
				'<img class="default-img-shim" src="../images/img-default.jpg"></img>'+
			'</div>';
			var $img = $(img);
			$img.data('customThumbnailUrl', encodeURIComponent(thumbImageUrl));
			$img.attr('data-custom-thumbnail-url', encodeURIComponent(thumbImageUrl));

			if(panoItem.markers && panoItem.markers[0] && panoItem.markers[0].width) {
				$img.data('markers', JSON.stringify(markertemp));
				$img.attr('data-markers', JSON.stringify(markertemp));
			} else {
				$img.data('markers', JSON.stringify(null));
				$img.attr('data-markers', JSON.stringify(null));
			}
			var $pictureTr = getPitctureTr(panoItem);
			$pictureTr.find('.img-contain').append($img);
			$dialog.find('.addedimages .wrap').append($pictureTr);
		});

	}
	function removeDialogModalBottomCss(){
		if($('.modal-dialog').height() > $('.modal-album').height()){
			$('.modal-album').css('bottom','initial');
		}
	}
    

	var page;
	var panoView;
	var panoWrap = document.getElementById("appContainer-thumbnail");
	new com.appengine.App(panoWrap,function(){
	    page = new com.appengine.view.Page();
	    panoView = new com.appengine.view.PanoView();
	    var panoId = "E331683722F84548BE93F1509BA6D8F7"
	    if(base_mode !== "online"){
	        panoId = '[TT]' + panoId;
	    }
	    panoView.setPanoId(panoId);

	    page.addView(panoView);
	    panoView.onHeadingChangeCallback=function(){
	        $(".pano-heading input").val(panoView.getHeading());
	        $(".set-thumbnail-btn").fadeIn();
	    };
	    panoView.onPitchChangeCallback=function(){
	        $(".pano-pitch input").val(panoView.getPitch());
	        $(".set-thumbnail-btn").fadeIn();
	    };
	    return page;
	});  
    //点击图片初始化缩略图全景
    $(".contentWrap").on('click', '.image', function(event) {
    	if (!$(this).hasClass('add-image')) {
	    	var $this = $(this);
	    	var panoId = decodeURIComponent($this.attr("data-pano-id"));
	    	if(base_mode !== "online"){
	    	    panoId = '[TT]' + panoId;
	    	}
	    	panoView.setPanoId(panoId);
	    	
	    	$(".thumbnail-tip").attr('pano-li-index',$this.parents(".img-wrap").index());
	    	if (parseInt($(".thumbnail-tip").attr('pano-li-index')) == 0) {
	    		$(".thumbnail-prev").hide();
	    	};
	    	if (parseInt($(".thumbnail-tip").attr('pano-li-index')) == ($this.parents(".images").children().length-1)) {
	    		$(".thumbnail-next").hide();
	    	};
	    	$(".pano-name").html(decodeURIComponent($this.attr("data-pano-name")));
	    	$(".pano-id").html(decodeURIComponent($this.attr("data-pano-id")));
	    	$(".pano-heading input").val(decodeURIComponent($this.attr("data-pano-heading")));
	    	$(".pano-pitch input").val(decodeURIComponent($this.attr("data-pano-pitch")));
		    $(".thumbnail-tip").css('z-index', 999);
    	};
    	
    });
	

	// base64转Blob
    function convertImgDataToBlob(base64Data,callback) {
        var format = "image/jpeg";
        var base64 = base64Data;
        var code = window.atob(base64.split(",")[1]);
        var aBuffer = new window.ArrayBuffer(code.length);
        var uBuffer = new window.Uint8Array(aBuffer);
        for(var i = 0; i < code.length; i++){
            uBuffer[i] = code.charCodeAt(i) & 0xff ;
        }

        try{
            blob = new Blob([uBuffer], {type : format});
        }
        catch(e){
            window.BlobBuilder = window.BlobBuilder ||
            window.WebKitBlobBuilder ||
            window.MozBlobBuilder ||
            window.MSBlobBuilder;
            if(e.name == 'TypeError' && window.BlobBuilder){
                var bb = new window.BlobBuilder();
                bb.append(uBuffer.buffer);
                blob = bb.getBlob("image/jpeg");

            }
            else if(e.name == "InvalidStateError"){
                blob = new Blob([aBuffer], {type : format});
            }
            else{

            }
        }

        callback(blob);
    };

   
	// 确定缩略图
	$(".set-thumbnail-btn").click(function() {
		/* Act on the event */
		if (!$(this).hasClass('disable')) {
			var oCanvas = $("#appContainer-thumbnail canvas")[0];
			var thumbnail = Canvas2Image.saveAsJPEG(oCanvas, true, 400, 225);  //生成base64的jpg文件
		    convertImgDataToBlob(thumbnail["src"],function(blob) {
		    	console.log(blob);
		    	var fileName =  new Date().getTime() + '.jpg';
		    	util.uploadToLuna(blob, function(url){
		    	    $(".images").find('.img-wrap').eq(parseInt($(".thumbnail-tip").attr("pano-li-index"))).find(".image").data({
		    	    	'panoHeading': encodeURIComponent($(".pano-heading input").val()),
		    	    	'panoPitch': encodeURIComponent($(".pano-pitch input").val()),
		    	    	'customThumbnailUrl': encodeURIComponent(url)
		    	    });
		    	    $(".images").find('.img-wrap').eq(parseInt($(".thumbnail-tip").attr("pano-li-index"))).find(".image").css('background-image', 'url('+url+')');
		    		$(".set-thumbnail-suc").fadeIn(function() {
		    			setTimeout(function() {
		    				$(".set-thumbnail-suc,.set-thumbnail-btn").fadeOut(function() {
		    					$(".set-thumbnail-btn").removeClass('disable');
		    				});
		    			}, 1500);
		    		});
		    	}, true);
		    });
		};
	});

	//点击下一个缩略图（thumbnail-next）
	$(".thumbnail-next").click(function() {
		$(".thumbnail-tip").attr('pano-li-index',parseInt($(".thumbnail-tip").attr("pano-li-index"))+1);
		thumbnailPrevOrNext();
	});

	//点击上一个缩略图（thumbnail-prev）
	$(".thumbnail-prev").click(function() {
		$(".thumbnail-tip").attr('pano-li-index',parseInt($(".thumbnail-tip").attr("pano-li-index"))-1);
		thumbnailPrevOrNext();
	});

	function thumbnailPrevOrNext () {
		var $this = $(".images").find('.img-wrap').eq(parseInt($(".thumbnail-tip").attr("pano-li-index"))).find(".image");
		$(".set-thumbnail-btn").removeClass('disable');
		$(".set-thumbnail-btn").hide();
		$(".thumbnail-prev").show();
		$(".thumbnail-next").show();
		if (parseInt($(".thumbnail-tip").attr('pano-li-index')) == 0) {
			$(".thumbnail-prev").hide();
		};
		if (parseInt($(".thumbnail-tip").attr('pano-li-index')) == ($this.parents(".images").children().length-1)) {
			$(".thumbnail-next").hide();
		};
		var panoId = decodeURIComponent($this.attr("data-pano-id"));
		if(base_mode !== "online"){
		    panoId = '[TT]' + panoId;
		}
		panoView.setPanoId(panoId);
		$(".pano-name").html(decodeURIComponent($this.attr("data-pano-name")));
		$(".pano-id").html(decodeURIComponent($this.attr("data-pano-id")));
		$(".pano-heading input").val(decodeURIComponent($this.attr("data-pano-heading")));
		$(".pano-pitch input").val(decodeURIComponent($this.attr("data-pano-pitch")));
	}
	
	//关闭缩略图弹出层
    $(".thumbnail-close").click(function() {
    	$(".thumbnail-tip").css('z-index', -1);
    	$(".set-thumbnail-btn").removeClass('disable');
    	$(".set-thumbnail-btn").hide();
    	$(".thumbnail-prev").show();
    	$(".thumbnail-next").show();
    });

});