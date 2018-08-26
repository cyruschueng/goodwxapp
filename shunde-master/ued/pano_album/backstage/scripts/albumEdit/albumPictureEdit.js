/* updateAlbum
 * 保存、更新相册内容到数据库，将dom结构中的数据存储到json中
 */
 var isPanoNameNull = false;
function updateAlbumPicture(layerObj, layerDom) {
	var $container = $(layerDom);
	var $layerBarInfo = $container.children('.layer-picture').find('.name');
	layerObj.albumName = $layerBarInfo.data('albumname');
	layerObj.albumInfo = $layerBarInfo.data('albumdescrip');
	
	var $Images = $container.children('.layer-picture').find('.images .image');
	layerObj.panoList = [];
	$.each($Images, function(index, image) {
		var data = $(image).data();
		var imageTds = $(image).closest('.tr').find('.picture-attr');
		$.each(imageTds, function(index, item) {
			var val = $(item).val();
			data[$(item).attr('picture-attr')] = val;
		});
		if(!data['panoName']) {
			isPanoNameNull = true;		
		}
		delete data.sortableItem;
		if(data.markers) {
			if(!(data.markers[0] && data.markers[0].mtype)) {
				data.markers = $.parseJSON(data.markers);
			}
		}
		layerObj.panoList.push(data);
	});
	layerObj.albumList = [];
	if($container.children('.ul').length) {
		$.each($container.children('.ul').children('.li'), function(index, liItem) {
		 	var albumItem = {};
		 	updateAlbumPicture(albumItem, liItem);
		 	layerObj.albumList.push(albumItem);
		});
	}
}
function setPictureAlbumlayer($layerDom,layerObj) {
	var $li = addPictureAlbumlayer($layerDom, layerObj);
	if(layerObj.panoList && layerObj.panoList.length){
		var $imagesDiv = $li.children('.layer-picture').find('.images');
		addPictureImage($imagesDiv, layerObj.panoList);
	}
	if(layerObj.albumList && layerObj.albumList.length) {
		$.each(layerObj.albumList, function(index, albumItem) {
			setPictureAlbumlayer($li,albumItem);
		});
	}
}
function addPictureImage($imageContainer, imagesData) {
	$.each(imagesData, function(index, panoItem) {
		addedPanoIds.push(panoItem.panoId);
	});
	$.each(imagesData, function(index, panoItem) {
		if(panoItem.type == 'album'){
			addPictureAlbumImage($imageContainer, panoItem);
		} else {
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
				img += 'data-' + key + '="' + val +'" ';
			});
			img += '" style="background-image:url(' + panoItem.thumbnailUrl + ')">'+
			'</div>';
			var $img = $(img);
			if(panoItem.markers && panoItem.markers[0] && panoItem.markers[0].mtype) {
				$img.data('markers', JSON.stringify(markertemp));
			} else {
				$img.data('markers', JSON.stringify(null));
				$img.attr('data-markers', JSON.stringify(null));
			}
			var $pictureTr = getPitctureTr(panoItem);
			$pictureTr.find('.td:first-child').append($img);
			$imageContainer.append($pictureTr);
		}
	});
}
function addPictureAlbumImage($imageContainer, panoItem) {
	addedAlbumIds.push(panoItem.albumIncludedId);
	var img = '<div class="image" ';
	img += '" style="background-image:url(' + panoItem.thumbnailUrl + ');">'+
		'<div class="image-title">' + panoItem.albumName + '</div>'+
		'<span class="del">&#10005</span>'+
	'</div>';
	var $img = $(img);
	$img.data('albumIncludedId', panoItem.albumIncludedId);
	$img.attr('data-album-included-id', panoItem.albumIncludedId);
	$img.data('albumName', panoItem.albumName);
	$img.attr('data-album-name', panoItem.albumName);
    $img.data('thumbnailUrl', panoItem.thumbnailUrl);
    $img.attr('data-thumbnail-url', panoItem.thumbnailUrl);
	$img.data('type', 'album');
	$img.attr('data-type', 'album');
	var $pictureTr = getAlbumPitctureTr(panoItem);
	$pictureTr.find('.td:first-child').append($img);
	$imageContainer.append($pictureTr);
}
function getPitctureTr(panoItem){
	var $panoTr = $('<div class="tr">'+
						'<div class="td" style="width:20%"></div>'+
						'<div class="td"><input type="text" class="picture-attr panoName" picture-attr="panoName" value="'+ panoItem.panoName+ '"></div>'+
						// '<div class="td">'+
						// 	'<select name="" class="picture-attr dayNight" picture-attr="dayNight">'+
						// 		'<option value="">空</option>'+
						// 		'<option value="1">日景</option>'+
						// 		'<option value="2">夜景</option>'+
						// 	'</select>'+
						// '</div>'+
						// '<div class="td">'+
						// 	'<select name="" class="picture-attr season" picture-attr="season">'+
						// 		'<option value="">空</option>'+
						// 		'<option value="1">春</option>'+
						// 		'<option value="2">夏</option>'+
						// 		'<option value="3">秋</option>'+
						// 		'<option value="4">冬</option>'+
						// 	'</select>'+
						// '</div>'+
						// '<div class="td">'+
						// 	'<select name="" class="picture-attr viewAngle" picture-attr="viewAngle">'+
						// 		'<option value="">空</option>'+
						// 		'<option value="1">平视</option>'+
						// 		'<option value="2">俯视</option>'+
						// 		'<option value="3">仰视</option>'+
						// 		// '<option value="4">其他</option>'+
						// 		'<option value="4">视角一</option>'+
						// 		'<option value="5">视角二</option>'+
						// 		'<option value="6">视角三</option>'+
						// 	'</select>'+
						// '</div>'+
						'<div class="td" style="width:20%">'+
							'<textarea name="" class="picture-attr panoInfo" class="picture-attr" picture-attr="panoInfo" cols="20" rows="5">'+ (panoItem.panoInfo || '') +'</textarea>'+
						'</div>'+
						'<div class="td">'+
							'<select name="" class="picture-attr isWithMarkers" picture-attr="isWithMarkers">'+
								'<option value="0">否</option>'+
								'<option value="1">是</option>'+
							'</select>'+
						'</div>'+
					'</div>');
	// $panoTr.find('.dayNight').val(panoItem.dayNight);
	// $panoTr.find('.season').val(panoItem.season);
	// $panoTr.find('.viewAngle').val(panoItem.viewAngle);
	// $panoTr.find('.isWithMarkers').val(panoItem.isWithMarkers || '0');
	var isWithMarkers = panoItem.isWithMarkers;
		if(isWithMarkers !== 0 && isWithMarkers !== "0" ){
			isWithMarkers = "1";
		}
	$panoTr.find('.isWithMarkers').val(isWithMarkers);
	return $panoTr;
}
function getAlbumPitctureTr(panoItem){
	var $panoTr = $('<div class="tr" style="display:none">'+
						'<div class="td" style="width:20%"></div>'+
						'<div class="td"><input type="text" class="picture-attr panoName" picture-attr="panoName" value="'+ panoItem.albumName+ '"></div>'+
						// '<div class="td">'+
						// 	'<select name="" class="picture-attr dayNight" picture-attr="dayNight">'+
						// 		'<option value="">空</option>'+
						// 		'<option value="1">日景</option>'+
						// 		'<option value="2">夜景</option>'+
						// 	'</select>'+
						// '</div>'+
						// '<div class="td">'+
						// 	'<select name="" class="picture-attr season" picture-attr="season">'+
						// 		'<option value="">空</option>'+
						// 		'<option value="1">春</option>'+
						// 		'<option value="2">夏</option>'+
						// 		'<option value="3">秋</option>'+
						// 		'<option value="4">冬</option>'+
						// 	'</select>'+
						// '</div>'+
						// '<div class="td">'+
						// 	'<select name="" class="picture-attr viewAngle" picture-attr="viewAngle">'+
						// 		'<option value="">空</option>'+
						// 		'<option value="1">平视</option>'+
						// 		'<option value="2">俯视</option>'+
						// 		'<option value="3">仰视</option>'+
						// 		// '<option value="4">其他</option>'+
						// 		'<option value="4">视角一</option>'+
						// 		'<option value="5">视角二</option>'+
						// 		'<option value="6">视角三</option>'+
						// 	'</select>'+
						// '</div>'+
						'<div class="td" style="width:20%">'+
							'<textarea name="" class="picture-attr panoInfo" class="picture-attr" picture-attr="panoInfo" cols="20" rows="5"></textarea>'+
						'</div>'+
						'<div class="td">'+
							'<select name="" class="picture-attr isWithMarkers" picture-attr="isWithMarkers">'+
								'<option value="0">否</option>'+
								'<option value="1">是</option>'+
							'</select>'+
						'</div>'+
					'</div>');
	return $panoTr;
}
function addPictureAlbumlayer($parent,layerObj) {
	var liStr = 
	'<div class="li">'+
		'<div class="layer-picture">'+
			'<div class="layer-bar" style="display:none">'+
				'<span class="name" data-albumName="'+ layerObj.albumName +'" data-albumDescrip="'+ layerObj.albumInfo +'"></span>'+
			'</div>'+
			'<div class="img-contain">'+
				'<div class="images">'+
					// '<div class="empty"></div>'+
				'</div>'+
			'</div>'+
		'</div>'+
	'</div>';
	if(!$parent.children('.ul').length) {
		$parent.append($('<div class="ul"></div>'));
	}
	var $liStr = $(liStr);
	$parent.children('.ul').append($liStr);
	return $liStr;
}
function setAlbumPicture(id, callback) {
	// $container.empty();
	$('.js-picture-table .ul').remove();
	var albumId = id;
	$.ajax({
		type: 'get',
		url: url_root + '/album/get',
		data: {albumId: albumId, lang: localStorage.langStr},
		success: function(data) {
			if(data.result == 0) {
				albumUpdateObject = data.data;
				albumUpdateObject.albumContent = $.parseJSON(albumUpdateObject.albumContent);
				setPictureTable(albumUpdateObject.albumContent);
				setPictureAlbumlayer($('.js-picture-table'), albumUpdateObject.albumContent);
				callback && callback();
			} else if(data.result == 2) {
				loginDialog();
			} else {
				var d = new Dialog({title: '提示', content: data.msg});
			}
		}
	});
}
function setPictureTable(albumContent) {
	$('.selector-wrap .album-name-display').html(albumContent.albumName);

	var $layer1Sel = $('.selector-wrap #album-layer-1');
	setSel($layer1Sel, albumContent.albumList);	
	// setActivePanoList(albumContent.panoList);
}
function setSel($layerSel, albumList) {
	$layerSel.empty();
		$layerSel.append('<option value>-请选择-</option>');
	if(albumList && albumList.length) {
		$.each(albumList, function(index, albumItem) {
			$layerSel.append('<option value="'+ index +'">'+ albumItem.albumName +'</option>');
		});
	}
}
function setActivePanoList(panoList) {
	var $pictureTable = $('.js-picture-table tbody');
	$pictureTable.find('.tr').remove();
	if(panoList && panoList.length){
		$.each(panoList, function(index, panoItem) {
			var $panoTr = $('<tr class="tr">'+
						'<td></td>'+
						'<td><input type="text"  value="'+ panoItem.panoName+ '"></td>'+
						'<td>'+
							'<select name="" class="dayNight">'+
								'<option value="">空</option>'+
								'<option value="1">日景</option>'+
								'<option value="2">夜景</option>'+
							'</select>'+
						'</td>'+
						'<td>'+
							'<select name="" class="season">'+
								'<option value="">空</option>'+
								'<option value="1">春</option>'+
								'<option value="2">夏</option>'+
								'<option value="3">秋</option>'+
								'<option value="4">冬</option>'+
							'</select>'+
						'</td>'+
						'<td>'+
							'<select name="" class="viewAngle">'+
								'<option value="">空</option>'+
								'<option value="1">平视</option>'+
								'<option value="2">俯视</option>'+
								'<option value="3">仰视</option>'+
								'<option value="4">其他</option>'+
							'</select>'+
						'</td>'+
						'<td>'+
							'<textarea name="" class="albumInfo" cols="30" rows="5"></textarea value="' + panoItem.albumInfo + '">'+
						'</td>'+
					'</tr>');
			$panoTr.find('.dayNight').val(panoItem.dayNight);
			$panoTr.find('.season').val(panoItem.season);
			$panoTr.find('.viewAngle').val(panoItem.viewAngle);
			$pictureTable.append($panoTr);
		});
	}
}
function addPictureSelEvt() {
	var $layer1Sel = $('.selector-wrap #album-layer-1');
	var $layer2Sel = $('.selector-wrap #album-layer-2');
	var albums_Layer1 =  albumUpdateObject.albumContent.albumList;
	var selectedLayer1Index;
	var selectedLayer2Index;
	$layer1Sel.off().change(function(){
		selectedLayer1Index = $layer1Sel.val();
		if(!selectedLayer1Index) {
			//显示整个table
			showPictureTableTrs(-1);
		} else {
			var albums_Layer2 = albums_Layer1[selectedLayer1Index].albumList;
			setSel($layer2Sel, albums_Layer2);
			selectedLayer2Index= '';
			//显示选定layer1下所有tr
			showPictureTableTrs(0,selectedLayer1Index);

		}
	});
	$layer2Sel.off().change(function() {
		selectedLayer2Index = $layer2Sel.val();
		if(!selectedLayer2Index) {
			//显示选定layer1下所有tr
			showPictureTableTrs(0,selectedLayer1Index);
		} else {
			//显示选定layer2下所有tr
			showPictureTableTrs(0,selectedLayer1Index, selectedLayer2Index);
		}
	});
	$('.btn-save-picture').off().click(function() {
    	var top = event.pageY - 400 > 0? event.pageY - 400: 0;
				//保存相册层级结构
		isPanoNameNull = false;
		updateAlbumPicture(albumUpdateObject.albumContent, '.js-picture-table>.ul>.li');
		if(isPanoNameNull) {
			var d = new Dialog({title: '提示', content: '场景名不能为空'});
			return;
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
        			var d = new Dialog({top: top + 'px',title: '提示', content: '保存成功', autoClose:true});
					albumUpdateObject = data.data;
					albumUpdateObject.albumContent = $.parseJSON(albumUpdateObject.albumContent);
				} else if(data.result == 2) {
					loginDialog();
				} else {
					var d = new Dialog({title: '提示', content: data.msg});
				}
			}
		});
	});
}
function showPictureTableTrs(tableIndex, layer1Index, layer2Index) {
	$('.js-picture-table .li').show();
	if(tableIndex != -1) {
		var tableLis = $('.js-picture-table>.ul>.li');
		if(layer1Index || layer1Index === 0) {
			var layer1Lis = tableLis.children('.ul').children('.li');
			if(layer2Index || layer2Index === 0) {
				var layer2Lis = $(layer1Lis[layer1Index]).children('.ul').children('.li');
				$.each(layer2Lis, function(index, item) {
					if(index != layer2Index) {
						$(item).hide();
					}
				});
			}
			$.each(layer1Lis, function(index, item) {
				if(index != layer1Index) {
					$(item).hide();
				}
			}); 
		}
	} 
}



