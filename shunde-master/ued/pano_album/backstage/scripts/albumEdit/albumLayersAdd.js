/* updateAlbum
 * 保存、更新相册内容到数据库，将dom结构中的数据存储到json中
 */
function updateAlbum (layerObj, layerDom, isWithMarkers) {
  var $container = $(layerDom)
  var $layerBarInfo = $container.children('.layer').find('.name')
  layerObj.albumName = $layerBarInfo.data('albumname')
  layerObj.albumInfo = $layerBarInfo.data('albumdescrip')
  if ($layerBarInfo.data('albumdetail') !== undefined) {
    layerObj.albumDetail = $layerBarInfo.data('albumdetail')
  }
  var $Images = $container.children('.layer').find('.images .image')
  layerObj.panoList = []
  $.each($Images, function (index, image) {
    var data = $(image).data()
    delete data.sortableItem
    delete data.selectableItem
    if (isWithMarkers) {
      storeMarkers($(image), data)
    } else {
      if (data.markers) {
        if (!(data.markers[0] && data.markers[0].mtype)) {
          data.markers = $.parseJSON(data.markers)
        }
      }
    }
    layerObj.panoList.push(data)
  })
  layerObj.albumList = []
  if ($container.children('ul').length) {
    $.each($container.children('ul').children('li'), function (index, liItem) {
      var albumItem = {}
      updateAlbum(albumItem, liItem, isWithMarkers)
      layerObj.albumList.push(albumItem)
    })
  }
}

/* setAlbum
 * 初始化相册内容，根据json数据画出相册
 */
function setAlbum ($container, id, callback, isWithMarkers) {
  $container.empty()
  addedPanoIds = []
  addedAlbumIds = []
  var albumId = id
  $.ajax({
    type: 'get',
    url: url_root + '/album/get',
    async: false,
    data: {albumId: albumId, lang: localStorage.langStr},
    success: function (data) {
      if (data.result == 0) {
        albumUpdateObject = data.data
        var albumObject = data.data
        albumObject.albumContent = $.parseJSON(albumObject.albumContent)
        if (isWithMarkers) {
          markersArrayArray = []
        }
        setAlbumlayer($container, albumObject.albumContent, isWithMarkers)
        callback && callback()
      } else if (data.result == 2) {
        loginDialog()
      } else {
        var d = new Dialog({title: '提示', content: data.msg})
      }
    }
  })

}

function setAlbumlayer ($layerDom, layerObj, isWithMarkers) {
  var $li = addLayer($layerDom, layerObj)
  isNeedEmptyDiv($layerDom.children('.layer').find('.images'))
  if (layerObj.panoList && layerObj.panoList.length) {
    var $imagesDiv = $li.children('.layer').find('.images')
    $imagesDiv.find('.empty').remove()
    addImage($imagesDiv, layerObj.panoList, isWithMarkers)
  }
  if (layerObj.albumList && layerObj.albumList.length) {
    $.each(layerObj.albumList, function (index, albumItem) {
      setAlbumlayer($li, albumItem, isWithMarkers)
    })
  }
}

function addImage ($imageContainer, imagesData, isWithMarkers) {
  $.each(imagesData, function (index, panoItem) {
    if (panoItem.type == 'album') {
      addAlbumImage($imageContainer, panoItem)
    } else {
      addedPanoIds.push(panoItem.panoId)
      var img = '<div class="image" '
      var markertemp = null
      $.each(panoItem, function (key, val) {
        var Acode = ('A').charCodeAt()
        var Zcode = ('Z').charCodeAt()
        var minus = ('a').charCodeAt() - Acode
        var keyArr = key.split('')
        $.each(keyArr, function (k, v) {
          var vCode = v.charCodeAt()
          if (vCode <= Zcode && vCode >= Acode) {
            keyArr[k] = '-' + String.fromCharCode(vCode * 1 + minus)
          }
        })
        key = keyArr.join('')
        if (key == 'markers') {
          markertemp = val
          // img += 'data-' + key + '="' + JSON.stringify(val) +'" ';
        }
        img += 'data-' + key + '="' + val + '" '
      })
      img += '" style="background-image:url(' + panoItem.thumbnailUrl + ')">' +
        '<div class="image-title">' + panoItem.panoName + '</div>' +
        '<span class="del">&#10005</span>' +
        '</div>'
      var $img = $(img)
      if (panoItem.markers && panoItem.markers[0] && panoItem.markers[0].mtype) {
        $img.data('markers', JSON.stringify(markertemp))
      } else {
        $img.data('markers', JSON.stringify(null))
        $img.attr('data-markers', JSON.stringify(null))
      }
      $imageContainer.append($img)
      if (isWithMarkers) {
        var mindex = $('.js-img-marker-edit-contain .image').index($img)
        setMarkerArrayArray(mindex, panoItem)
      }
    }
  })
}

function addAlbumImage ($imageContainer, panoItem) {
  var showImage = true
  if (!$imageContainer.parents('.step-wrap').hasClass('step-wrap-1')) {
    showImage = false
  }
  addedAlbumIds.push(panoItem.albumIncludedId)
  var img = '<div class="image image-album" '

  if (panoItem.thumbnailUrl !== null) {
    img += 'style="background-image:url(' + panoItem.thumbnailUrl + ');'
  }
  else {
    img += 'style="'
  }
  img += (showImage ? '"' : 'display:none;"') + '>' +
    '<div class="image-title">' + panoItem.albumName +
    '<span class="album-type"></span>' +
    '</div>' +
    '<span class="del">&#10005</span>' +
    '</div>'
  var $img = $(img)
  $img.data('albumIncludedId', panoItem.albumIncludedId)
  $img.attr('data-album-included-id', panoItem.albumIncludedId)
  $img.data('albumName', panoItem.albumName)
  $img.attr('data-album-name', panoItem.albumName)
  $img.data('thumbnailUrl', panoItem.thumbnailUrl)
  $img.attr('data-thumbnail-url', panoItem.thumbnailUrl)
  $img.data('type', 'album')
  $img.attr('data-type', 'album')
  $imageContainer.append($img)
}

function addLayer ($parent, layerObj) {
  var liStr = '<li>' +
    '<div class="layer">' +
    '<div class="layer-bar">' +
    '<span class="name" data-albumName="' + layerObj.albumName + '" data-albumDescrip="' + layerObj.albumInfo + (layerObj.albumDetail ? '" data-albumDetail="' + layerObj.albumDetail : '') + '">' + layerObj.albumName + '</span>' +
    '<span class="pen"></span>' +
    '<span class="del-layer"></span>' +
    '<span class="add-layer">分层</span>' +
    '<span class="add-pic">添加照片</span>' +
    '<span class="add-album">添加相册</span>' +
    '</div>' +
    '<div class="img-contain">' +
    '<div class="images">' +
    // '<div class="empty"></div>'+
    '</div>' +
    '</div>' +
    '</div>' +
    '</li>'

  if (!$parent.children('ul').length) {   //当前层没有ul
    if ($parent.closest('.album.tree').length) {//为添加分层树
      if (!$('.album.tree').find('ul').length) {//是否首层
        $parent.append($('<ul></ul>'))
      } else {
        $parent.append($('<ul class="sortable-ul" title="拖动调整相册层顺序"></ul>'))
        $parent.find('.sortable-ul').sortable({cursor: 'pointer', connectWith: '.sortable-ul', dropOnEmpty: true})
      }
    } else {
      $parent.append($('<ul></ul>'))
    }
  }

  var $liStr = $(liStr)
  $parent.children('ul').append($liStr)
  $liStr.find('.images').sortable({cursor: 'pointer', connectWith: '.images', dropOnEmpty: true}) //placeholder: 'border-yellow'
  $liStr.find('.images').disableSelection()
  return $liStr
}

function isNeedEmptyDiv ($imagesDiv) {
  // var imgLen = $imagesDiv.find('.image').length;
  // var ulLen = $imagesDiv.closest('li').find('ul').length;
  // if(imgLen || ulLen) {
  // 	$imagesDiv.find('.empty').remove();
  // } else if(!$imagesDiv.find('.empty').length) {
  // 	$imagesDiv.append('<div class="empty"></div>');
  // }
}

var albumEdit = {}
albumEdit.totalPage = -1
var albumEditAlbum = {}
albumEditAlbum.totalPage = -1
var layerEditSearch = {}
var layerEditSearchAlbum = {}
var layerEditActiveTag = ''

function addDilaogEvent ($dialog) {
  $dialog.off('click').off('keydown').on('click', '.tags .filter', function () {
    $dialog.find('.tags .filter').removeClass('active')
    $(this).addClass('active')
    var filter = $(this).data('filter')
    var panoQuery = $dialog.find('.panoQuery').val()
    var data = {q: panoQuery, project: filter, size: 50}
    layerEditSearch = data
    setPanos($dialog, data, true)
  })
  $dialog.on('click', '.js-pano-search', function () {
    var panoQuery = $dialog.find('.panoQuery').val()
    var data = {q: panoQuery, size: 50}
    layerEditSearch = data
    setPanos($dialog, data, true)
  })
  $dialog.on('keydown', '.panoQuery', function (e) {
    if (e.keyCode == 13) {
      var panoQuery = $dialog.find('.panoQuery').val()
      var data = {q: panoQuery, size: 50}
      layerEditSearch = data
      setPanos($dialog, data, true)
    }
  })
  $dialog.on('click', '.addedimages .image', function () {
    $dialog.find('.item1New .image').removeClass('selected')
    $(this).addClass('selected')
  })
}

function addDialogScroll ($dialog) {
  $dialog.find('.addedimages').off('scroll').on('scroll', function () {
    lazyLoad($dialog)
  })
}

function lazyLoad ($dialog) {
  //元素顶部距离视窗上边界的距离
  $win = $dialog.find('.addedimages')
  var viewTop = $dialog.find('.addedimages .wrap').height() - $win.scrollTop()
  if ((viewTop < $win.height() + 100)) {
    var panoQuery = $dialog.find('.panoQuery').val()
    albumEdit.fromPage++
    var data = {q: panoQuery, size: 50, fromPage: albumEdit.fromPage}
    var $filter = $dialog.find('.tags .filter.active')
    if ($filter.length) {
      data.project = $filter.data('filter')
    }
    setPanos($dialog, data, false)
  }
}

function setPanos ($dialog, data, isInit) {
  var searchParam = data.q
  var searchProject = data.project
  if (!data.q) {
    return false
  }
  data.fromPage = data.fromPage || 1
  var currentPage = data.fromPage
  $.ajax({
    type: 'get',
    url: url_root + '/pano/search',
    data: data,
    success: function (data) {
      if (data.result == 0) {
        refreshImagesDialog($dialog, data.data.searchResult, isInit)
        if (searchProject) {
          $dialog.find('[data-filter="' + searchProject + '"]').addClass('active')
        }
        $dialog.find('.panoQuery').val(searchParam)
        albumEdit.totalPage = data.data.totalPage
        if (albumEdit.totalPage <= currentPage) {
          $dialog.find('.addedimages').off('scroll')
        }
        removeDialogModalBottomCss()
      } else if (data.result == 2) {
        loginDialog()
      } else {
        var d = new Dialog({title: '提示', content: data.msg})
      }
    }
  })
}

function refreshImagesDialog ($dialog, searchedPanoItems, isInit) {
  var searchPart3 = $('.js-search-wrapper .tab-content')
  if (isInit) {
    $dialog.find('.addedimages .wrap').empty()
    $dialog.find('.tags').empty()
    albumEdit.tags = []
    albumEdit.fromPage = 1
    addDialogScroll($dialog)
    searchPart3.hide()
    // albumEdit.searchedPanoItems = searchedPanoItems; // 用于排重
  }

  $.each(searchedPanoItems, function (index, panoItem) {

    var usedClass = ''

    var img = '<div class="image ' + usedClass + '" '
    var markertemp = null
    var isNewProject = true
    $.each(albumEdit.tags, function (idx, tag) {
      if (tag == panoItem.project) {
        isNewProject = false
      }
    })
    if (isNewProject) {
      albumEdit.tags.push(panoItem.project)

      var tagStr = '<span class="filter" data-filter="' + panoItem.project + '">' + panoItem.project + '</span>'
      $dialog.find('.tags').append($(tagStr))
      if ($dialog.find('.filter').length != 1) {
        searchPart3.hide()
      } else {
        searchPart3.show()
      }
    }
    var usedPanoIds = addedPanoIds
    $.each(usedPanoIds, function (idx, itm) {
      if (itm == panoItem.panoId) {
        usedClass = ' used '
      }
    })
    $.each(panoItem, function (key, val) {
      var Acode = ('A').charCodeAt()
      var Zcode = ('Z').charCodeAt()
      var minus = ('a').charCodeAt() - Acode
      var keyArr = key.split('')
      $.each(keyArr, function (k, v) {
        var vCode = v.charCodeAt()
        if (vCode <= Zcode && vCode >= Acode) {
          keyArr[k] = '-' + String.fromCharCode(vCode * 1 + minus)
        }
      })
      key = keyArr.join('')
      if (key == 'markers') {
        markertemp = val
      }
      img += 'data-' + key + '="' + val + '" '
    })
    img += '" style="background-image:url(' + panoItem.thumbnailUrl + ')">' +
      '<div class="image-title">' + panoItem.panoName +
      '<span class="used">&#9733</span>' +
      '</div>' +
      '<span class="add">&#10003</span>' +
      '<span class="del">&#10005</span>' +
      '</div>'
    var $img = $(img)
    if (panoItem.markers && panoItem.markers[0] && panoItem.markers[0].width) {
      $img.data('markers', JSON.stringify(markertemp))
      $img.attr('data-markers', JSON.stringify(markertemp))
    } else {
      $img.data('markers', JSON.stringify(null))
      $img.attr('data-markers', JSON.stringify(null))
    }
    $dialog.find('.addedimages .wrap').append($img)
  })

}

function addAlbumDilaogEvent ($dialog) {
  /*$dialog.off('click').off('keydown').on('click', '.tags .filter', function() {
    $dialog.find('.tags .filter').removeClass('active');
    $(this).addClass('active');
    var filter = $(this).data('filter');
    var panoQuery = $dialog.find('.panoQuery').val();
    var data = {q: panoQuery, project: filter, size: 50};
    layerEditSearch = data;
    setPanos($dialog, data, true);
  });*/
  $dialog.on('click', '.js-pano-search', function () {
    var panoQuery = $dialog.find('.panoQuery').val()
    var data = {q: panoQuery, size: 50}
    layerEditSearchAlbum = data
    searchAlbums($dialog, data, true)
  })
  $dialog.on('keydown', '.panoQuery', function (e) {
    if (e.keyCode == 13) {
      var panoQuery = $dialog.find('.panoQuery').val()
      var data = {q: panoQuery, size: 50}
      layerEditSearchAlbum = data
      searchAlbums($dialog, data, true)
    }
  })
  $dialog.on('click', '.addedimages .image', function () {
    $dialog.find('.item1New .image').removeClass('selected')
    $(this).addClass('selected')
  })
}

function addAlbumDialogScroll ($dialog) {
  $dialog.find('.addedimages').off('scroll').on('scroll', function () {
    lazyLoadAlbum($dialog)
  })
}

function lazyLoadAlbum ($dialog) {
  //元素顶部距离视窗上边界的距离
  $win = $dialog.find('.addedimages')
  var viewTop = $dialog.find('.addedimages .wrap').height() - $win.scrollTop()
  if ((viewTop < $win.height() + 100)) {
    var panoQuery = $dialog.find('.panoQuery').val()
    albumEditAlbum.fromPage++
    var data = {q: panoQuery, size: 50, fromPage: albumEditAlbum.fromPage}
    var $filter = $dialog.find('.tags .filter.active')
    if ($filter.length) {
      data.project = $filter.data('filter')
    }
    searchAlbums($dialog, data, false)
  }
}

function searchAlbums ($dialog, data, isInit) {
  var searchParam = data.q
  var searchProject = data.project
  if (!data.q) {
    return false
  }
  data.fromPage = data.fromPage || 1
  var currentPage = data.fromPage
  $.ajax({
    type: 'get',
    url: url_root + '/album/search',
    data: data,
    success: function (data) {
      if (data.result == 0) {
        refreshAlbumDialog($dialog, data.data.searchResult, isInit)
        if (searchProject) {
          $dialog.find('[data-filter="' + searchProject + '"]').addClass('active')
        }
        $dialog.find('.panoQuery').val(searchParam)
        albumEditAlbum.totalPage = data.data.totalPage
        if (albumEditAlbum.totalPage <= currentPage) {
          $dialog.find('.addedimages').off('scroll')
        }
        removeDialogModalBottomCss()
      } else if (data.result == 2) {
        loginDialog()
      } else {
        var d = new Dialog({title: '提示', content: data.msg})
      }
    }
  })
}

function refreshAlbumDialog ($dialog, searchedPanoItems, isInit) {
  var searchPart3 = $('.js-search-wrapper .tab-content')
  if (isInit) {
    $dialog.find('.addedimages .wrap').empty()
    $dialog.find('.tags').empty()
    albumEditAlbum.tags = []
    albumEditAlbum.fromPage = 1
    addAlbumDialogScroll($dialog)
    searchPart3.hide()
    // albumEdit.searchedPanoItems = searchedPanoItems; // 用于排重
  }
  $.each(searchedPanoItems, function (index, panoItem) {
    //不能选择本身的相册
    if (panoItem.albumId === albumUpdateObject.albumId) {
      return
    }
    var usedClass = ''

    var usedAlbumIds = addedAlbumIds
    $.each(usedAlbumIds, function (idx, itm) {
      if (itm == panoItem.albumId) {
        usedClass = ' used '
      }
    })
    var img = '<div class="image image-album ' + usedClass + '" '
    if (panoItem.thumbnailUrl !== null) {
      img += 'style="background-image:url(' + panoItem.thumbnailUrl + ')">'
    }
    else {
      img += '>'
    }
    img += '<div class="image-title">' + panoItem.albumName +
      '<span class="used">&#9733</span>' +
      '<span class="album-type"></span>' +
      '</div>' +
      '<span class="add">&#10003</span>' +
      '<span class="del">&#10005</span>' +
      '</div>'
    var $img = $(img)
    $img.data('albumIncludedId', panoItem.albumId)
    $img.attr('data-album-included-id', panoItem.albumId)
    $img.data('albumName', panoItem.albumName)
    $img.attr('data-album-name', panoItem.albumName)
    $img.data('thumbnailUrl', panoItem.thumbnailUrl)
    $img.attr('data-thumbnail-url', panoItem.thumbnailUrl)
    $img.data('type', 'album')
    $img.attr('data-type', 'album')
    $dialog.find('.addedimages .wrap').append($img)
  })

}

function changeAlbumInfos (elm) {
  var $layerBarName = $(elm).closest('.layer-bar').find('.name')
  var albumName = $layerBarName.data('albumname')
  var albumInfo = $layerBarName.data('albumdescrip')
  var albumDetail = $layerBarName.data('albumdetail') || ''
  var addLayerContent = '<div style="margin:10px auto;width:auto;color:#434750;font-size:12px;">' +
    '<div class="name"><span>相册名称:</span><input type="text" id="albumNameUpdate" value="' + albumName + '" style="width:728px;height:24px;border:1px solid #e4e4e4;"></div>' +
    '<div style="margin-top:10px;"><span style="vertical-align:top;">相册介绍:</span><textarea id="albumDescripUpdate" cols="30" row="5" style="border:1px solid #e4e4e4;width:728px;height:138px;">' + albumInfo + '</textarea></div>' +
    '<div style="margin-top:10px;"><span style="vertical-align:top;">相册详情:</span><textarea id="albumDetailUpdate" cols="30" row="5" style="border:1px solid #e4e4e4;width:728px;height:138px;">' + albumDetail + '</textarea></div>' +
    '</div>'
  var top = event.pageY - 200 > 0 ? event.pageY - 200 : 0
  var d = new Dialog({
    top: top + 'px',
    title: '修改相册信息',
    width: '818px',
    content: addLayerContent,
    ok: function ($dialog) {
      albumName = $dialog.find('#albumNameUpdate').val()
      albumInfo = $dialog.find('#albumDescripUpdate').val()
      albumDetail = $dialog.find('#albumDetailUpdate').val()
      $layerBarName.data('albumname', albumName)
      $layerBarName.data('albumdescrip', albumInfo)
      $layerBarName.data('albumdetail', albumDetail)
      $layerBarName.html(albumName)

    }
  })
}

function addLayersEditEvent () {
  $('.album').off('click', '.pen').on('click', '.pen', function () {
    if ($(this).closest('ul').parent().hasClass('album')) {
      changeAlbumInfos(this)
      return
    }
    var $layerBarName = $(this).closest('.layer-bar').find('.name')
    var albumName = $layerBarName.data('albumname')
    var albumInfo = $layerBarName.data('albumdescrip')
    var addLayerContent = '<div style="margin:10px auto;width:auto;color:#434750;font-size:12px;">' +
      '<div class="name"><span>相册层名称:</span><input type="text" id="albumNameUpdate" value="' + albumName + '" style="width:224px;height:24px;border:1px solid #e4e4e4;"></div>' +
      '<div style="margin-top:10px;"><span style="vertical-align:top;">相册层简介:</span><textarea id="albumDescripUpdate" cols="30" row="5" style="border:1px solid #e4e4e4;width:224px;height:60px;">' + albumInfo + '</textarea></div>' +
      '</div>'
    var top = event.pageY - 200 > 0 ? event.pageY - 200 : 0
    var d = new Dialog({
      top: top + 'px',
      title: '修改相册层信息',
      content: addLayerContent,
      ok: function ($dialog) {
        albumName = $dialog.find('#albumNameUpdate').val()
        albumInfo = $dialog.find('#albumDescripUpdate').val()
        $layerBarName.data('albumname', albumName)
        $layerBarName.data('albumdescrip', albumInfo)
        $layerBarName.html(albumName)

      }
    })
  })
  $('.album').off('click', '.add-layer').on('click', '.add-layer', function () {
    var _this = this
    var $parent = $(this).closest('li')
    var addLayerContent = '<div style="margin:10px auto;width:auto;color:#434750;font-size:12px;">' +
      '<div class="name"><span>相册层名称:</span><input type="text" id="albumNamenew" style="width:224px;height:24px;border:1px solid #e4e4e4;"></div>' +
      '<div style="margin-top:10px;"><span style="vertical-align:top;">相册层简介:</span><textarea id="albumDescripNew" cols="30" row="5" style="border:1px solid #e4e4e4;width:224px;height:60px;"></textarea></div>' +
      '</div>'
    var top = event.pageY - 200 > 0 ? event.pageY - 200 : 0
    var d = new Dialog({
      top: top + 'px',
      title: '相册分层',
      content: addLayerContent,
      ok: function ($dialog) {
        var layObj = {
          albumName: $dialog.find('#albumNamenew').val(),
          albumInfo: $dialog.find('#albumDescripNew').val()
        }
        addLayer($parent, layObj)
        isNeedEmptyDiv($(_this).closest('.layer').find('.images'))
      }
    })
  })
  var addPicContent = '<div>' +
    '<div class="search input-group">' +
    '<input type="text" class="form-control panoQuery" style="float: right; width: 200px;" placeholder="输入项目名称全文检索">' +
    '<span class="input-group-addon js-pano-search" style="height: 34px"></span>' +
    '</div>' +
    '<div class="tags"></div>' +
    '<div class="tab-content">' +
    '<div id="item1" class="tab-pane img-contain">' +
    '<div class="images add-image addedimages" id="addedimages">' +
    '<div class="wrap">' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>'
  $('.album').off('click', '.add-pic').on('click', '.add-pic', function () {
    var _this = this
    var $imgContain = $(this).closest('.layer').find('.img-contain .images')
    var top = event.pageY - 600 > 0 ? event.pageY - 600 : 0
    var d = new Dialog({
      top: top + 'px',
      title: '添加照片',
      content: addPicContent,
      width: '818px',
      ok: function ($dialog) {
        var selectedImages = $dialog.find('.image.ui-selected')
        $imgContain.append(selectedImages)
        $.each(selectedImages, function (index, panoItem) {
          addedPanoIds.push($(panoItem).data('panoId'))
        })
        isNeedEmptyDiv($(_this).closest('.layer').find('.images'))
      },
      autoSearch: function ($dialog) {
        setPanos($dialog, layerEditSearch, true)
      },
      initEvt: function ($dialog) {
        addDilaogEvent($dialog)
        $('.addedimages .wrap').selectable()
      }
    })
    removeDialogModalBottomCss()
  })
  $('.album').off('click', '.add-album').on('click', '.add-album', function () {
    var _this = this
    var $imgContain = $(this).closest('.layer').find('.img-contain .images')
    var top = event.pageY - 600 > 0 ? event.pageY - 600 : 0
    var d = new Dialog({
      top: top + 'px',
      title: '添加相册',
      content: addPicContent,
      width: '818px',
      ok: function ($dialog) {
        var selectedImages = $dialog.find('.image.ui-selected')
        $imgContain.append(selectedImages)
        $.each(selectedImages, function (index, panoItem) {
          addedPanoIds.push($(panoItem).data('albumId'))
        })
        isNeedEmptyDiv($(_this).closest('.layer').find('.images'))
      },
      autoSearch: function ($dialog) {
        searchAlbums($dialog, layerEditSearchAlbum, true)
      },
      initEvt: function ($dialog) {
        addAlbumDilaogEvent($dialog)
        $('.addedimages .wrap').selectable()
      }
    })
    removeDialogModalBottomCss()
  })

  $('.album').off('click', '.del-layer').on('click', '.del-layer', function () {
    var _this = this
    var top = event.pageY - 200 > 0 ? event.pageY - 200 : 0
    var d = new Dialog({
      top: top + 'px',
      title: '提示',
      content: '确定删除该层吗？',
      ok: function ($dialog) {
        var $liToDelete = $(_this).closest('li')
        var $lisToMove = $liToDelete.children('ul').html()
        var $ulContain = $liToDelete.closest('ul')
        if ($lisToMove && $lisToMove.length) {
          $liToDelete.after($lisToMove)
        }
        $liToDelete.remove()
        if (!$ulContain.find('li').length) {
          $ulContain.remove()
        }
        isNeedEmptyDiv($(_this).closest('.layer').find('.images'))
      }
    })
  })
  $('.album').off('click', '.image .del').on('click', '.image .del', function () {
    var _this = this
    var $imagesDiv = $(_this).closest('.images')
    // var d = new Dialog({
    // 	title: '提示',
    // 	content: '确定删除该照片吗？',
    // 	ok: function($dialog) {
    $(_this).closest('div.image').remove()
    isNeedEmptyDiv($imagesDiv)
    // 	}
    // });
  })
  $('.btn-save-layer').off().on('click', function () {
    var top = event.pageY - 400 > 0 ? event.pageY - 400 : 0
    updateAlbum(albumUpdateObject.albumContent, '.tree>ul>li')
    albumUpdateObject.albumContent.activeStep = 1
    var data = JSON.stringify({
      albumId: albumUpdateObject.albumId,
      optVersion: albumUpdateObject.optVersion,
      'albumContent': JSON.stringify(albumUpdateObject.albumContent)
    })
    $.ajax({
      type: 'post',
      url: url_root + '/album/update?lang=' + localStorage.langStr,
      contentType: 'application/json; charset=utf-8',
      data: data,
      success: function (data) {
        if (data.result == 0) {
          var d = new Dialog({top: top + 'px', title: '提示', content: '保存成功', autoClose: true})
          albumUpdateObject = data.data
          albumUpdateObject.albumContent = $.parseJSON(albumUpdateObject.albumContent)
        } else if (data.result == 2) {
          loginDialog()
        } else {
          var d = new Dialog({title: '提示', content: data.msg})
        }
      }
    })
  })
}