function createAlbum (type, data) {
  var url = url_root + (type == 'manual' ? '/album/create' : '/album/createDefault?panoId=' + data.panoId + '&albumName=' + data.albumName)
  $.ajax({
    type: 'post',
    url: url,
    contentType: 'application/json; charset=utf-8',
    data: data,
    success: function (data) {
      if (data.result == 0) {
        albumUpdateObject = data.data
        albumUpdateObject.albumContent = $.parseJSON(albumUpdateObject.albumContent)
        albumUpdateObject.albumContent.completedSteps = 0
        $('.album-show .albumName').html(albumUpdateObject.albumContent.albumName)
        $('.album-show .albumInfo').html(albumUpdateObject.albumContent.albumInfo)
        $('.album-show .albumDetail').html(albumUpdateObject.albumContent.albumDetail)

        navToStep(0, 1)

      } else if (data.result == 2) {
        loginDialog()
      } else {
        var d = new Dialog({title: '提示', content: data.msg})
      }
    }
  })
}

function createManualAlbum () {
  var albumName = $('#albumName').val()
  var albumInfo = $('#albumInfo').val()
  var albumDetail = $('#albumDetail').val()

  if (!albumName || !albumInfo || !albumDetail) {
    var d = new Dialog({title: '提示', content: '相册名称、相册介绍、相册描述不能为空！'})
    return
  }
  var data = JSON.stringify({
    'albumContent': JSON.stringify({
      'albumName': albumName,
      'albumInfo': albumInfo,
      'albumDetail': albumDetail
    })
  })
  createAlbum('manual', data)
}

function createDefaultAlbum () {
  var panoId = $('#panoIdNew').val()
  var albumName = $('#albumNameNew').val()
  if (!panoId || !albumName) {
    var d = new Dialog({title: '提示', content: '反查panoID、相册名称不能为空！'})
    return
  }
  createAlbum('default', {panoId: panoId, 'albumName': albumName})
}

var albumSearchObj = {}

function rendAlbumsTable (query, fromPage, size) {
  var fPage = fromPage || 1
  var sz = size || 5
  var searchObj = {q: query, fromPage: fPage, size: sz}
  albumSearchObj = searchObj
  $.ajax({
    type: 'get',
    url: url_root + '/album/search',
    data: searchObj,
    success: function (data) {
      if (data.result == 0) {
        var albums = data.data.searchResult
        rendPagination(data.data.totalPage, fPage, sz)
        var albumsContainer = $('.step-wrap-0.sub-step-2 .js-albums tbody')
        albumsContainer.find('tr.tr').remove()
        $.each(albums, function (index, item) {
          var tdStr = '<tr class="tr" data-album-id="' + item.albumId + '">' +
            '<td></td>' +
            '<td class="link">' + item.albumName + '</td>' +
            '<td class="word-break">' + item.albumId + '</td>' +
            '<td><div class="text-overflow" title="' + item.albumInfo + '">' + item.albumInfo + '</div></td>' +
            '<td>' + item.createDate + '</td>' +
            '<td>' + item.updateDate + '</td>' +
            '<td class="v-middle"><span title="复制" class="copy-album"></td>' +
            // '</span><span class="del-album"></span>'+
            // '<td class="version-en v-middle"><span class="add-lang">创建</span></td>'
            '</tr>'
          var $tdStr = $(tdStr)
          // rendVersion(item.langs, $tdStr);
          albumsContainer.append($tdStr)
        })
      } else if (data.result == 2) {
        loginDialog()
      } else {
        var d = new Dialog({title: '提示', content: data.msg})
      }
    }
  })
}

function rendVersion (langs, $container) {
  $.each(langs, function (index, lang) {
    var $enCon = $container.find('.version-' + lang['lang'])
    $enCon.html('<span class="pen"></span><span class="del-lang"></span>')
  })
}

function rendPagination (totalPage, fromPage, size) {
  var pages = getPages(totalPage, fromPage, 2)//2为pagination半径
  var $pagination = $('.step-wrap-0.sub-step-2 ul.pagination')
  $pagination.empty()
  $.each(pages, function (idx, page) {
    var liStr = '<li class="' + page.status + '" data-page="' + page.number + '"><a><span>' + page.label + '</span></a></li>'
    $pagination.append($(liStr))
  })
  $pagination.off().on('click', 'li', function () {
    rendAlbumsTable($('#albumQuery1').val(), $(this).data('page'), size)
  })
}

function search0 () {
  if (data2.albumId != null) {
    var albumQuery = data2.albumId
  } else {
    var albumQuery = $('#albumQuery0').val()
  }
  if (!albumQuery) {
    var d = new Dialog({title: '提示', content: '请输入相册名称/ID！'})
    return
  }
  rendAlbumsTable(albumQuery)
  $('#albumQuery1').val(albumQuery)
  addAlbumsTableEvent()
  navToStep(0, 2)
}

function search1 () {
  var albumQuery = $('#albumQuery1').val()
  if (!albumQuery) {
    var d = new Dialog({title: '提示', content: '请输入相册名称/ID！'})
    return
  }
  rendAlbumsTable(albumQuery)
}

function addAlbumsTableEvent () {
  $('.step-wrap-0.sub-step-2 .js-album-search1').off().click(function () {
    search1()
  })
  $('.step-wrap-0.sub-step-2 #albumQuery1').off().keydown(function (e) {
    if (e.keyCode == 13)
      search1()
  })
}

function addAlbumsSearchEvent () {
  $('.js-albums').on('click', '.del-album', function () {
    var _this = this
    var IdToDelete = $(_this).closest('tr').data('albumId')
    var d = new Dialog({
      title: '删除相册',
      content: '确定删除该相册？',
      ok: function () {
        deleteAlbum(IdToDelete)
      }
    })

  })
  $('.js-albums').on('click', '.link', function () {
    var albumId = $(this).closest('tr').data('albumId')
    localStorage.langStr = ''
    window.open(pano_url + '?albumId=' + albumId +'&lang=' + localStorage.langStr + '&vrflag=on')
    $('.header .descrip').html('业务编辑')
  })
  $('.js-albums').on('click', '.copy-album', function () {
    var _this = this
    var IdToCopy = $(_this).closest('tr').data('albumId')
    copyAlbum(IdToCopy)
  })
  $('.js-albums').on('click', '.version-en .add-lang', function () {
    var _this = this
    var albumId = $(_this).closest('tr').data('albumId')
    $.ajax({
      type: 'post',
      url: url_root + '/album/createLang?albumId=' + albumId + '&lang=en',
      // data: {albumId: albumId, lang:'en'},
      success: function (data) {
        if (data.result == 0) {
          var d = new Dialog({title: '提示', content: '创建英文版本成功！'})
          var $enCon = $(_this).closest('.version-en')
          $enCon.html('<span class="pen"></span><span class="del-lang"></span>')
        } else if (data.result == 2) {
          loginDialog()
        } else {
          var d = new Dialog({title: '提示', content: data.msg})
        }
      }
    })
  })
  $('.js-albums').on('click', '.version-en .del-lang', function () {
    var _this = this
    var IdToDelete = $(_this).closest('tr').data('albumId')
    var d = new Dialog({
      title: '删除相册版本',
      content: '确定删除该相册版本？',
      ok: function () {
        $.ajax({
          type: 'get',
          url: url_root + '/album/delete',
          data: {albumId: IdToDelete, lang: 'en'},
          success: function (data) {
            if (data.result == 0) {
              var $enCon = $(_this).closest('.version-en')
              $enCon.html('<span class="add-lang">创建</span>')
            } else if (data.result == 2) {
              loginDialog()
            } else {
              var d = new Dialog({title: '提示', content: data.msg})
            }
          }
        })
      }
    })
  })
  $('.js-albums').on('click', '.version-en .pen', function () {
    var _this = this
    var IdToEidt = $(_this).closest('tr').data('albumId')
    localStorage.langStr = 'en'
    setAlbum($('.album.tree'), IdToEidt, function () {
      if (!albumUpdateObject.albumContent.completedSteps || albumUpdateObject.albumContent.completedSteps < 1) {
        albumUpdateObject.albumContent.completedSteps = 1
      }
      navToStep(1, 0)
    })
    $('.header .descrip').html('业务编辑<span class="language">(英语)</span>')
  })
}

function deleteAlbum (albumId) {
  $.ajax({
    type: 'get',
    url: url_root + '/album/delete',
    data: {albumId: albumId},
    success: function (data) {
      if (data.result == 0) {
        rendAlbumsTable(albumSearchObj.q, albumSearchObj.fromPage, albumSearchObj['size'])
      } else if (data.result == 2) {
        loginDialog()
      } else {
        var d = new Dialog({title: '提示', content: data.msg})
      }
    }
  })
}

function copyAlbum (albumId) {
  var dialogContent = '<div class="copyAlbumDialog">' +
    '<div class="input-item">' +
    '<span class="input-item-ico">相册名称' +
    '</span>' +
    '<input type="text" id="albumName" class="" placeholder="相册名称">' +
    '</div>' +
    '</div>'
  var d = new Dialog({
    title: '复制相册',
    content: dialogContent,
    ok: function ($dialog) {
      albumName = $dialog.find('#albumName').val()
      copyAlbumAjax(albumId, albumName)
    }
  })
}

function copyAlbumAjax (albumId, albumName) {
  $.ajax({
    type: 'post',
    url: url_root + '/album/copy',
    data: {albumId: albumId, albumName: albumName},
    success: function (data) {
      if (data.result == 0) {
        var d = new Dialog({title: '提示', content: '已复制该专题，可以在发布管理-草稿箱中查看编辑。'})
      } else if (data.result == 2) {
        loginDialog()
      } else {
        var d = new Dialog({title: '提示', content: data.msg})
      }
    }
  })
}

function addAlbumInitEvt () {
  $('.js-btn-album-new').click(function () {
    var albumType = $('.new-album-container #albumType').val()
    switch (albumType) {
      case 'default':
        createDefaultAlbum()
        break
      case 'manual':
        createManualAlbum()
        break
      default:
        break
    }
  })
  $('.new-album-container #albumType').on('change', function () {
    $('.album-type-wrap').hide()
    var albumType = $('.new-album-container #albumType').val()
    $('.album-type-wrap-' + albumType).show()
  })

  var addPicContent = '<div>' +
    '<div class="search input-group">' +
    '<input type="text" class="panoQuery form-control" placeholder="输入项目名称全文检索">' +
    '<span class="input-group-addon js-pano-search"></span>' +
    '</div>' +
    '<div class="tags"></div>' +
    '<div class="tab-content">' +
    '<div class="item1New tab-pane img-contain">' +
    '<div class="images add-image addedimages">' +
    '<div class="wrap"></div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>'

  $('.js-pano-id-search').on('click', function () {
    var _this = this
    var d = new Dialog({
      title: '添加照片',
      content: addPicContent,
      width: '818px',
      ok: function ($dialog) {
        var selectedImages = $dialog.find('.image.selected')
        var panoId = selectedImages.data('panoId')
        $('#panoIdNew').val(panoId)
      },
      initEvt: function ($dialog) {
        addDilaogEvent($dialog)
      }
    })
    removeDialogModalBottomCss()
  })
}

