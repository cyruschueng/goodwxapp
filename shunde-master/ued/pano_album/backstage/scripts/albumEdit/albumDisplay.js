function setAlbumDisplay(albumObject) {
	var $container = $('.step-wrap-7.sub-step-0 .album-content-3');
  while(document.getElementById('qr-code').hasChildNodes()) //当div下还存在子节点时 循环继续
  {
    document.getElementById('qr-code').removeChild(document.getElementById('qr-code').firstChild);
  }
	$container.find('.albumName').html(albumObject.albumContent.albumName);
	$container.find('.albumId').html(albumObject.albumId);
	$container.find('.albumInfo').html(albumObject.albumContent.albumInfo);
	$container.find('.albumUrl').html(url_root + '/album/view/' + albumObject.albumId+'?lang=' + localStorage.langStr);
	$container.find('.albumPreview').html(' <a href="'+ pano_url +'?albumId=' +albumObject.albumId +'&lang=' + localStorage.langStr+'&vrflag=on " target="_blank">'+ pano_url +'?albumId=' +albumObject.albumId +'&lang=' + localStorage.langStr+ '&vrflag=on</a>');
	new QRCode(document.getElementById('qr-code'),pano_url + "?albumId=" + albumObject.albumId+"&lang=" + localStorage.langStr+"&vrflag=on" );

}
/* setAlbumTree
 * 初始化相册内容，根据jason数据画出相册树
 */

function setAlbumTree($container, id, callback) {
	$container.empty();
	var albumId = id || '8B1EA23D936D44008A424EF0663311DD';
	$.ajax({
		type: 'get',
		url: url_root + '/album/get',
		data: {albumId: albumId, lang: localStorage.langStr},
		success: function(data) {
			if(data.result == 0) {
				var albumObject = data.data;
				albumObject.albumContent = $.parseJSON(albumObject.albumContent);
				setAlbumTreelayer($container, albumObject.albumContent);
				setAlbumDisplay(albumObject);
				callback && callback();
			}else if(data.result == 2) {
				loginDialog();
			} else {
				var d = new Dialog({title: '提示', content: data.msg});
			}
		}
	});

}
function setAlbumTreelayer($layerDom,layerObj) {
	var $li = addLayerTree($layerDom, layerObj);
	isNeedEmptyDiv($layerDom.children('.layer').find('.images'));
	if(layerObj.panoList.length){
		var $imagesDiv = $li.find('.images');
		$imagesDiv.find('.empty').remove();
		addImageTree($imagesDiv, layerObj.panoList);
	}
	if(layerObj.albumList.length) {
		$.each(layerObj.albumList, function(index, albumItem) {
			setAlbumTreelayer($li,albumItem);
		});
	}
}
function addLayerTree($parent,layerObj) {
	var liStr = '<li><span class="bold">' + layerObj.albumName + '</span><ul class="images"></ul></li>';
	if(!$parent.children('ul').length) {
		$parent.append($('<ul class="images"></ul>'));
	}
	var $liStr = $(liStr);
	$parent.children('ul').append($liStr);
	return $liStr; 
}
function addImageTree($imageContainer, imagesData) {
	$.each(imagesData, function(index, panoItem) {
		if(panoItem.type == 'album'){
			var img = '<li class="leaf"><span>' + panoItem.albumName + '<span class="album-type"></span></span></li>';
		} else {
			var img = '<li class="leaf"><span>' + panoItem.panoName + '</span></li>';
		}
		$imageContainer.append($(img));
	});
}