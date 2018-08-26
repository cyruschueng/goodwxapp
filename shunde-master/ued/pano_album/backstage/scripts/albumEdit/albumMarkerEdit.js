var markersArray = []      //保存当前active全景的marker信息
var activeMarker = null    //保存当前activemarker handler
var markersArrayArray = []  //保存当前相册所有全景的marker信息
function addMarkerOK ($dialog) {
  var markerType = $dialog.find('#markerType').val()
  var markerUrl = $dialog.find('.markerUrl').val()
  var markerUrlName = $dialog.find('.markerUrlName').val()
  var labelStr = $dialog.find('.labelStr').val()
  var selectedImages = $dialog.find('.image.selected')
  var panoName = selectedImages.data('panoName')
  var panoId = selectedImages.data('panoId')
  var albumId = albumUpdateObject.albumId
  var markerInfo = {
    heading: 90,
    pitch: -10,
    // anchorX: 0,
    // anchorY: 0,
    // width: '50dp',
    // height: '28dp',
  }
  switch (markerType) {
    case 'url':
      markerInfo.mtype = 'url'
      markerInfo.url = markerUrl
      markerInfo.urlName = markerUrlName
      break
    case 'label':
      markerInfo.mtype = 'label'
      markerInfo['label'] = labelStr
      break
    case 'html':
      markerInfo.mtype = 'html'
      markerInfo.htmlName = markerHtmlTitle
      markerInfo.htmlStr = '<div>' + markerHtmlTitle + '</div>'
      break
    case 'pano':
      markerInfo.mtype = 'pano'
      markerInfo.panoId = panoId
      markerInfo.panoName = panoName
      markerInfo.albumId = albumId
      break
  }
  var $tr = addMarkerTr(markerInfo)
  addMarker(markerInfo)
  setMarkerActive($tr)
}
//上传图片腾讯云图片地址前缀
function getMySignature(params,callback) {
  $.ajax({
    type: 'get',
    url: 'http://shunde.vizen.cn/shunde/inner/upload/sign?remotePath=' + params,
    success: function (res) {
      var my = JSON.parse(res);
      if(my.code == '0'){
        callback(my);
      }else {
        alert(my.msg)
      }
    }
  });
};
function uploadToQcloud (info, file, callback) {
  var url = 'http://sh.file.myqcloud.com/files/v2/1251448083/panopublictest/shunde/file/' + info.path + '?sign=' + encodeURIComponent(info.signature)
  var formData = null
  if (window.FormData) {
    var formData = new FormData()
    formData.append('filecontent', file)
    formData.append('op', 'upload')
    formData.append('insertOnly', '0')
  }
  $.ajax({
    type: 'post',
    url: url,
    processData: false,
    contentType: false,
    data: formData,
    xhrFields: {
      withCredentials: false
    },
    success: function (data) {
      if (data.code == 0) {
        // callbackFun && callbackFun(data.data);
        callback(data)
      } else {
        alert(data.msg)
        // var d = new Dialog({title: '提示', content: data.msg});
      }
    }
  })
}

function addHtmlMarkerOK () {
  var albumId = albumUpdateObject.albumId
  var markerInfo = {
    heading: 90,
    pitch: -10,
    // anchorX: 0,
    // anchorY: 0,
    // width: '50dp',
    // height: '28dp',
  }
  markerInfo.mtype = 'html'
  $htmlData = $('#htmlData')
  markerInfo.htmlName = $htmlData.data('htmlName')
  markerInfo.htmlStr = $htmlData.data('htmlStr')
  markerInfo.video = $htmlData.data('video')
  markerInfo.radio = $htmlData.data('radio')
  var $tr = addMarkerTr(markerInfo)
  addMarker(markerInfo)
  setMarkerActive($tr)
}

function editHtmlMarker (options, isInit) {
  var code = decodeURI(options['htmlStr'] || '')
  if(options.video == undefined || options.video==""){
    options.video = ""
  }
  if(options.radio == undefined || options.radio==""){
    options.radio = ""
  }
  var editHtmlMarkerContent = '<div class="htmlmarkerDialog">' +
    '<div>标题<input type="text" id="htmlName" value="' + (options['htmlName'] || '') + '">' + '</div>' +
    '<div class="summernoteWrap">正文<div id="summernote">' +
    '</div></div>' +
    '<div><label for="video" class="btn-success-vb up-video" style="padding:3px 10px;float:left;">上传视频</label>' + '<input class="file-btn" style="position: absolute; width: 10px" type="file" id="video"><input value="' + options.video + '" type="text" name="" id="video-text-area" style="width: 200px; margin-left: 100px" ></div>' +
    '<div style="margin-top: 10px"><label for="radio" class="btn-success-vb up-music" style="padding:3px 10px;float:left;">上传音乐</label>' + '<input class="file-btn" style="position: absolute; width: 10px" type="file" id="radio"><input value="'+ options.radio +'" type="text" name="" id="radio-text-area" style="width: 200px; margin-left: 100px" ></div>' +
    '</div>'
  var d = new Dialog({
    title: '图文内容编辑',
    content: editHtmlMarkerContent,
    width: '800px',
    buttons: [{
      text: '保存',
      type: 'save',
      fn: function ($dialog) {
        var htmlStr = $('#summernote').summernote('code') && $('#summernote').summernote('code').length ? encodeURI($('#summernote').summernote('code')) : ''
        $('#htmlData').data('htmlName', $('#htmlName').val())
        $('#htmlData').data('htmlStr', htmlStr)
        $('#htmlData').data('video', $('#video-text-area').val())
        $('#htmlData').data('radio', $('#radio-text-area').val())
        $('.js-detail-marker-edit [marker-attr="htmlName"]').html($('#htmlName').val())
        if (isInit) {
          addHtmlMarkerOK()
        } else {
          activeMarker._domElement.innerHTML = '<div class="marker-name">' + $('#htmlName').val() + '</div>'
        }
        $dialog.remove()
      },
    }, {
      text: '预览',
      type: 'editable-false',
      fn: function ($dialog) {
        $('#summernote').summernote('destroy')
        $('.btn-dialog-editable-true').show()
        $('.btn-dialog-editable-false').hide()

      },
    }, {
      text: '编辑',
      type: 'editable-true',
      fn: function ($dialog) {
        setSummernote()
        $('.btn-dialog-editable-true').hide()
        $('.btn-dialog-editable-false').show()
      },
    }
    ],
    initEvt: function ($dialog) {
      $dialog.find('#summernote').html(code)
      setSummernote()
    }
  })
  addUploadEvent()
}
function addUploadEvent () {
  $('#video').off('change').on('change', function (event) {
    var file = event.target.files[0];
    getMySignature('/shunde/file/' +file.lastModified + '.mp4',function (data) {
      setVideoName(file.lastModified + '.mp4');
      var info = new Object();
      info.path = file.lastModified + '.mp4';
      info.signature = data.data.sign;
      $('.up-video').html("上传中...");
      uploadToQcloud(info,file,function (res) {
        $('.up-video').html("上传视频");
        $('#video-text-area').val(res.data.source_url);
      });
    });
  })
  $('#radio').off('change').on('change', function () {
    var file = event.target.files[0];
    getMySignature('/shunde/file/' +file.lastModified + '.mp3',function (data) {
      setRadioName(file.lastModified + '.mp3');
      var info = new Object();
      info.path = file.lastModified + '.mp3';
      info.signature = data.data.sign;
      $('.up-music').html("上传中...");
      uploadToQcloud(info,file,function (res) {
        $('.up-music').html("上传音乐");
        $('#radio-text-area').val(res.data.source_url);
      });
    });
  })
  function setVideoName (url) {
    $('#video-text-area').val(url);
  }
  function setRadioName (url) {
    $('#radio-text-area').val(url);
  }

}

function addEditMarkerEvent () {
  $('.step-wrap-4.sub-step-0 .spinner').spinner()
  $('#item1Marker #markerType').off('change').on('change', function () {
    $('#item1Marker input[type="text"]').val('')
    showAddMarkerWrap()
    var markerTypeVal = $('#item1Marker #markerType').val()
    if (markerTypeVal == 'pano') {
      if (!$('#addMarkerDiv').find('ul').length) {
        setAlbum($('#addMarkerDiv'), albumUpdateObject.albumId)
      }
    }
  })
  $('.fold-action.fold-show-action').off('click').on('click', function () {
    foldAddMarkerWrap()
  })
  $('.show-action.fold-show-action').off('click').on('click', function () {
    showAddMarkerWrap()
  })

  $('#addMarkerDiv').off('click', '.image').on('click', '.image', function () {
    $('#addMarkerDiv .image').removeClass('selected')
    $(this).addClass('selected')
  })
  $('#item1Marker .js-marker-add').off('click').on('click', function () {
    saveMarkerInfo()
    addMarkerOK($('#item1Marker'))
  })
  $('#item1Marker .js-marker-html-add').off('click').on('click', function () {
    // addMarkerOK($('#item1Marker'));
    editHtmlMarker({}, true)
  })
  $('.js-img-marker-edit-contain').off('click', '.image').on('click', '.image', function () {
    var _this = this
    saveMarkerInfo()
    //保存上一个全景的markers
    saveMarkersToImage()
    removeMarkers()
    markersArray = []
    $('.js-img-marker-edit-contain .image').removeClass('active')
    $(_this).addClass('active')
    //展示当前active全景的markers
    var data = $(_this).data()
    panoContainerMarker.setHeading(data.panoHeading)
    panoContainerMarker.setPitch(data.panoPitch)
    panoContainerMarker.setPanoId(data.panoId)

    setMarkerTable($(_this))
    setMarkers($(_this))
    setMarkerActive($($('.js-markers-table tr.marker')[0]))
  })
  $('.js-detail-marker-edit .marker-attr.regular-input').off().on('keyup', function () {
    var $this = $(this)
    // if($this.attr('marker-attr') == 'width') {
    // 	activeMarker.setWidth($this.val());
    // }
    // if($this.attr('marker-attr') == 'height') {
    // 	activeMarker.setHeight($this.val());
    // }
    if ($this.attr('marker-attr') == 'panoName') {
      // activeMarker._domElement.innerHTML= '<div class="marker-name">' + $this.val() + '</div>';
      activeMarker.subViews[1].setText($this.val())
    }
    if ($this.attr('marker-attr') == 'urlName') {
      // activeMarker._domElement.innerHTML= '<div class="marker-name">' + $this.val() + '</div>';
      activeMarker.subViews[1].setText($this.val())
    }
    if ($this.attr('marker-attr') == 'htmlName') {
      // activeMarker._domElement.innerHTML= '<div class="marker-name">' + $this.val() + '</div>';
      activeMarker.subViews[1].setText($this.val())
    }
    if ($this.attr('marker-attr') == 'label') {
      // activeMarker._domElement.innerHTML= '<div class="marker-name">' + $this.val() + '</div>';
      activeMarker.subViews[0].setText($this.val())
    }
  })
  $('.js-detail-marker-edit .marker-attr.spinner').off('spinchange').on('spinchange', function (event, ui) {
    var $this = $(this)

    if ($this.attr('marker-attr') == 'heading') {
      activeMarker.setPanoHeading($this.val())
    }
    if ($this.attr('marker-attr') == 'pitch') {
      activeMarker.setPanoPitch($this.val())
    }
    // if($this.attr('marker-attr') == 'anchorX') {
    // 	activeMarker.setAnchorX($this.val());
    // }
    // if($this.attr('marker-attr') == 'anchorY') {
    // 	activeMarker.setAnchorY($this.val());
    // }
  })
  $('.js-markers-table').off().on('click', 'tr.marker', function () {
    saveMarkerInfo()
    var $tr = $(this)
    setMarkerActive($tr)
  }).on('click', '.del-marker', function () {
    var $this = $(this)
    var $tr = $this.closest('tr')
    var index = $('.js-markers-table tr.marker').index($tr)
    deleteMarker(index)
    $tr.remove()
    if (!$('.js-markers-table tr.active').length) {
      setMarkerActive($($('.js-markers-table tr.marker')[0]))
    }
    return false
  })
  $('.js-marker-del').off().on('click', function () {
    if (!activeMarker) {
      return false
    }
    var index = $(markersArray).index(activeMarker)
    var $tr = $($('.js-markers-table tr.marker')[index])
    deleteMarker(index)
    $tr.remove()
    if (!$('.js-markers-table tr.active').length) {
      setMarkerAttrVisible()
      setMarkerActive($($('.js-markers-table tr.marker')[0]))
    }
    return false
  })
  $('.btn-save-marker').off().on('click', function () {
    var top = event.pageY - 400 > 0 ? event.pageY - 400 : 0
    saveMarkerInfo()
    //保存上一个全景的markers
    saveMarkersToImage()
    var activeImage = $('.js-img-marker-edit-contain .image.active')
    var activeIndex = $('.js-img-marker-edit-contain .image').index(activeImage)
    updateAlbum(albumUpdateObject.albumContent, '.js-img-marker-edit-contain>ul>li', true)
    albumUpdateObject.albumContent.activeStep = 1
    var data = JSON.stringify({
      albumId: albumUpdateObject.albumId,
      optVersion: albumUpdateObject.optVersion,
      'albumContent': JSON.stringify(albumUpdateObject.albumContent)
    })
    $.ajax({
      type: 'post',
      url: url_root + '/album/update?updateMeta=true&lang=' + localStorage.langStr,
      contentType: 'application/json; charset=utf-8',
      data: data,
      success: function (data) {
        if (data.result == 0) {
          var d = new Dialog({top: top + 'px', title: '提示', content: '保存成功', autoClose: true})
          setAlbum($('.step-wrap-4.sub-step-0 .img-marker-edit-contain'), data.data.albumId, function () {
            $('.img-marker-edit-contain [data-is-with-markers]').hide()
            $('.img-marker-edit-contain [data-is-with-markers="1"]').show()
            $($('.js-img-marker-edit-contain .image')[activeIndex]).addClass('active')
          }, true)
        } else if (data.result == 2) {
          loginDialog()
        } else {
          var d = new Dialog({title: '提示', content: data.msg})
        }
      }
    })

  })
  $('.goto2').off().on('click', function () {
    setAlbumPicture(albumUpdateObject.albumId, function () {
      addPictureSelEvt()
    })
    navToStep(2, 0)
  })
}

function deleteMarker (index) {
  panoContainerMarker.panoView.removeView(markersArray[index])
  markersArray.splice(index, 1)
}

function saveMarkerInfo () {
  var activeTr = $('.js-markers-table tr.active')
  if (!activeTr.length) {
    return
  }
  // var isSummernoteShow = !$("#summernote").is(":visible");
  var markerInfo = {
    mtype: $('.js-detail-marker-edit [marker-attr="heading"]').attr('mtype'),
    url: $('.js-detail-marker-edit [marker-attr="url"]').val(),
    urlName: $('.js-detail-marker-edit [marker-attr="urlName"]').val(),
    label: $('.js-detail-marker-edit [marker-attr="label"]').val(),
    htmlName: $('#htmlData').data('htmlName'),
    htmlStr: $('#htmlData').data('htmlStr'),	// || $('#summernote').attr('htmlStr')
    video: $('#htmlData').data('video'),
    radio: $('#htmlData').data('radio'),
    panoName: $('.js-detail-marker-edit [marker-attr="panoName"]').val(),
    panoNameEng: $('.js-detail-marker-edit [marker-attr="panoNameEng"]').val(),
    panoId: $('.js-detail-marker-edit [marker-attr="panoId"]').html(),
    albumId: $('.js-detail-marker-edit [marker-attr="albumId"]').html(),
    startTime: $('.js-detail-marker-edit [marker-attr="startTime"]').val(),
    endTime: $('.js-detail-marker-edit [marker-attr="endTime"]').val(),
    heading: $('.js-detail-marker-edit [marker-attr="heading"]').val(),
    pitch: $('.js-detail-marker-edit [marker-attr="pitch"]').val()
    // anchorX: $('.js-detail-marker-edit [marker-attr="anchorX"]').val(),
    // anchorY: $('.js-detail-marker-edit [marker-attr="anchorY"]').val(),
    // width: $('.js-detail-marker-edit [marker-attr="width"]').val(),
    // height: $('.js-detail-marker-edit [marker-attr="height"]').val()
  }
  var $tr = getTrStr(markerInfo, true)
  activeTr.replaceWith($tr)
}

function getTrStr (markerInfo, isActive) {
  var $tr = $('<tr class="marker ' + (isActive ? 'active' : '') + '" mtype="' + markerInfo.mtype + '">' +
    '<td style="word-break:break-all;">' + (markerInfo.url || '') + '</td>' +
    '<td>' + (markerInfo.urlName || '') + '</td>' +
    '<td>' + (markerInfo['label'] || '') + '</td>' +
    '<td class="js-htmlName" htmlStr="' + markerInfo.htmlStr + '" video="' + (markerInfo.video || '') + '" radio="' + (markerInfo.radio || '') + '">' + (markerInfo.htmlName || '') + '</td>' +
    '<td>' + (markerInfo.panoName || '') + '</td>' +
    '<td>' + (markerInfo.panoNameEng || '') + '</td>' +
    '<td style="word-break:break-all;">' + (markerInfo.panoId || '') + '</td>' +
    '<td style="word-break:break-all;">' + (markerInfo.albumId || '') + '</td>' +
    '<td>' + (markerInfo.startTime || '') + '</td>' +
    '<td>' + (markerInfo.endTime || '') + '</td>' +
    '<td>' + markerInfo.heading + '</td>' +
    '<td>' + markerInfo.pitch + '</td>' +
    // '<td style="display:none">'+ markerInfo.anchorX +'</td>'+
    // '<td style="display:none">'+ markerInfo.anchorY +'</td>'+
    // '<td style="display:none">'+ markerInfo["width"] +'</td>'+
    // '<td style="display:none">'+ markerInfo["height"] +'</td>'+
    '<td  class="v-middle"><span class="del-marker"></span></td>' +
    '</tr>')
  return $tr
}

function addMarkerTr (markerInfo) {
  var $tr = getTrStr(markerInfo)
  $('.js-markers-table').append($tr)
  return $tr
}

function addMarker (markerData) {
  var bgcolor = '#7f000000'
  var pano_img = '../images/pano.png'
  var url_img = '../images/url.png'
  var marker = new com.appengine.UPView()
  marker.setLayout('horizontal')
  marker.setContentGravity('centerVertical')
  marker.setWidth('wrap')
  marker.setHeight('wrap')
  marker.setBackground(bgcolor)
  marker.setPanoHeading(markerData.heading)
  marker.setPanoPitch(markerData.pitch)
  marker.setPanoAnchorX(0.5)
  marker.setPanoAnchorY(0.5)
  marker.setBorderCorner('40dp')
  marker.setBorderWidth('1px')
  var icon = new com.appengine.UPImageView()
  if (markerData.mtype == 'pano') {
    icon.setSrc(pano_img)
    icon.setMarginLeft('13dp')
    icon.setWidth('20dp')
    icon.setHeight('wrap')
    marker.addView(icon)
  } else if (markerData.mtype == 'url') {
    icon.setMarginLeft('13dp')
    icon.setSrc(url_img)
    icon.setWidth('20dp')
    icon.setHeight('wrap')
    marker.addView(icon)
  } else if (markerData.mtype == 'label' || markerData.mtype == 'html') {
    icon.setSrc(null)
  }

  var textMarker = new com.appengine.UPTextView()
  textMarker.setWidth('wrap')
  textMarker.setHeight('18dp')
  if (markerData.mtype == 'pano') {
    textMarker.setPaddingLeft('5dp')
    textMarker.setPaddingRight('10dp')
    textMarker.setText(markerData.panoName)
  } else if (markerData.mtype == 'url') {
    textMarker.setPaddingLeft('5dp')
    textMarker.setPaddingRight('10dp')
    textMarker.setText(markerData.urlName)
  } else if (markerData.mtype == 'label') {
    textMarker.setContentGravity('center')
    textMarker.setPaddingLeft('8dp')
    textMarker.setPaddingRight('8dp')
    textMarker.setText(markerData.label)
  } else if (markerData.mtype == 'html') {
    textMarker.setPaddingLeft('5dp')
    textMarker.setPaddingRight('10dp')
    textMarker.setText(markerData.htmlName)
  }
  textMarker.setFontColor('#FFFFFF')
  textMarker.setFontSize('13dp')

  textMarker.setMarginTop('5dp')
  textMarker.setMarginBottom('5dp')
  textMarker.setContentGravity('centerVertical')

  marker._domElement.style.cursor = 'pointer'
  marker.addView(textMarker)
  // var marker = new com.appengine.UPView();
  //    // marker.setWidth(markerInfo.width);
  //    // marker.setHeight(markerInfo.height);
  //    marker.setWidth('80px');
  //    marker.setPanoHeading(markerInfo.heading);
  //    marker.setPanoPitch(markerInfo.pitch);
  //    // marker.setPanoAnchorX(markerInfo.anchorX);
  //    // marker.setPanoAnchorY(markerInfo.anchorY);

  //    marker.setHeight('28px');
  //    marker.setBackground("#8F000000");
  //    marker.setBorderCorner('40px');
  // marker.setVisible(false);
  markersArray.push(marker)
  // var markerName = '';
  // switch(markerInfo.mtype) {
  // 	case 'url':
  // 		markerName = markerInfo.urlName;
  // 		break;
  // 	case 'label':
  // 		markerName = markerInfo["label"];
  // 		break;
  // 	case 'html':
  // 		markerName = markerInfo.htmlName;
  // 		break;
  // 	case 'pano':
  // 		markerName = markerInfo.panoName;
  // 		break;
  // 	default:
  // 		markerName = markerInfo.panoName;
  // }
  // marker._domElement.innerHTML = "<div class='marker-name'>" + markerName  +"</div>"
  panoContainerMarker.panoView.addView(marker)

  panoContainerMarker.setHeading('90')
  panoContainerMarker.setPitch('-10')

  marker.setOnClick(function () {
    console.log('marker clicked!')
    var activeIndex = $(markersArray).index(this)
    if (activeIndex == $(markersArray).index(activeMarker)) {
      return false
    }
    saveMarkerInfo()
    var $tr = $($('.js-markers-table .marker')[activeIndex])
    setMarkerActive($tr)
  })
}

function setMarkerAttr (data) {
  var panoDisplayDom = $('.js-detail-marker-edit .marker-attr')
  $.each(panoDisplayDom, function (index, item) {
    if (item.tagName == 'SPAN') {
      $(item).html(data[$(item).attr('marker-attr')])
      //解决值为undefined时，$().html(val)不生效的问题
      if (($(item).attr('marker-attr') == 'panoId' || $(item).attr('marker-attr') == 'albumId') && !data[$(item).attr('marker-attr')]) {
        $(item).html('')
      }
    } else {
      $(item).val(data[$(item).attr('marker-attr')])
    }
  })
  setMarkerAttrVisible(data.mtype)
  setAddMarkerWrapDefault()
  $('.datepicker').datepicker('destroy').datepicker()
}

//初始化添加Marker部分
function setAddMarkerWrapDefault () {
  $('#item1Marker input[type="text"]').val('')
  $('#item1Marker #markerType').val('url')
  foldAddMarkerWrap()
}

function showAddMarkerWrap () {
  var markerTypeVal = $('#item1Marker #markerType').val()
  $('.marker-type-wrap').hide()
  $('.js-marker-type-wrap-' + markerTypeVal).show()

  $('.js-marker-add').hide()
  $('.js-marker-html-add').hide()
  if (markerTypeVal == 'html') {
    $('.js-marker-html-add').show()
  }
  else {
    $('.js-marker-add').show()
  }

  $('.fold-show-action').hide()
  $('.fold-action.fold-show-action').show()
}

function foldAddMarkerWrap () {
  $('.marker-type-wrap').hide()
  $('.js-marker-add').hide()
  $('.js-marker-html-add').hide()
  $('.fold-show-action').hide()
  $('.show-action.fold-show-action').show()
}

function setMarkerAttrVisible (mtype) {
  $('.marker-type').hide()
  switch (mtype) {
    case 'url':
      $('.marker-type-url').show()
      break
    case 'label':
      $('.marker-type-label').show()
      break
    case 'html':
      $('.marker-type-html').show()
      break
    case 'pano':
      $('.marker-type-pano').show()
      break
    default:
      $('.marker-type-pano').show()
  }
}

function setMarkerActive ($tr) {
  $('.js-markers-table tr').removeClass('active')
  $tr.addClass('active')
  var index = $('.js-markers-table tr').index($tr) - 1

  activeMarker = markersArray[index]
  $.each(markersArray, function (index, marker) {
    marker._domElement.style.border = 'none'
  })
  if (activeMarker) {
    activeMarker._domElement.style.border = '2px solid #fff'
  }
  var data = getMarkerObj($tr)
  if (data.mtype == 'html') {
    var $htmlData = $('#htmlData')
    $htmlData.data('htmlName', data.htmlName)
    $htmlData.data('htmlStr', data.htmlStr)
    $htmlData.data('video', data.video)
    $htmlData.data('radio', data.radio)
  } else {
    var $htmlData = $('#htmlData')
    $htmlData.data('htmlName', '')
    $htmlData.data('htmlStr', '')
    $htmlData.data('video', '')
    $htmlData.data('radio', '')
  }
  setMarkerAttr(data)
  $('.js-detail-marker-edit [marker-attr="heading"]').attr('mtype', data.mtype)
  updateHtmlMarker(data)
}

//TODO
function updateHtmlMarker (data) {
  if (data.mtype == 'html') {
    $('.js-html-edit').show()
    $('.js-html-edit').off().on('click', function () {
      editHtmlMarker(data, false)
    })
  } else {
    $('.js-html-edit').hide()
  }
}

function setSummernote () {
  $('#summernote').summernote('destroy')
  $('#summernote').summernote({
    focus: true,
    height: 300,
    toolbar: [
      ['style', ['bold', 'underline', 'clear']],
      ['fontname', ['fontname']],
      ['fontsize', ['fontsize']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['height', ['height']],
      ['picture', ['picture']],
      ['tool', ['fullscreen', 'codeview', 'help']]
    ]
  })
}

function getMarkerObj ($tr) {
  var tds = $tr.find('td')
  var data = {
    'url': $(tds[0]).html(),
    'urlName': $(tds[1]).html(),
    'label': $(tds[2]).html(),
    'htmlName': $(tds[3]).html(),
    'htmlStr': $(tds[3]).attr('htmlStr'),
    'video': $(tds[3]).attr('video'),
    'radio': $(tds[3]).attr('radio'),
    'panoName': $(tds[4]).html(),
    'panoNameEng': $(tds[5]).html(),
    'panoId': $(tds[6]).html(),
    'albumId': $(tds[7]).html(),
    'startTime': $(tds[8]).html(),
    'endTime': $(tds[9]).html(),
    'heading': $(tds[10]).html(),
    'pitch': $(tds[11]).html(),
    // 'anchorX': $(tds[12]).html(),
    // 'anchorY': $(tds[13]).html(),
    // 'width': $(tds[14]).html(),
    // 'height': $(tds[15]).html()
  }
  data.mtype = $tr.attr('mtype')
  return data
}

function saveMarkersToImage () {
  var activeImage = $('.js-img-marker-edit-contain .image.active')
  var index = $('.js-img-marker-edit-contain .image').index(activeImage)
  var tempMarkerArray = []
  var markerTrs = $('.js-markers-table tr.marker')
  $.each(markerTrs, function (idx, markerTr) {
    var markerObj = getMarkerObj($(markerTr))
    tempMarkerArray.push(markerObj)
  })
  markersArrayArray[index] = tempMarkerArray
}

function setMarkerTable ($img) {
  var index = $('.js-img-marker-edit-contain .image').index($img)
  var tempMarkerArray = markersArrayArray[index]
  var markertable = $('.js-markers-table')
  markertable.find('tr.marker').remove()
  $.each(tempMarkerArray, function (idx, marker) {
    var $tr = getTrStr(marker)
    markertable.append($tr)
  })
}

function removeMarkers () {
  $.each(markersArray, function (idx, marker) {
    panoContainerMarker.panoView.removeView(marker)
  })
}

// 将当前active全景的markers(markersArrayArray的数据)展示到全景图中
function setMarkers ($img) {
  var index = $('.js-img-marker-edit-contain .image').index($img)
  var tempMarkerArray = markersArrayArray[index]
  markersArray = []
  $.each(tempMarkerArray, function (idx, marker) {
    addMarker(marker)
  })
}

// 将指定全景的marker信息放入数据结构中
function storeMarkers ($image, imagedata) {
  var index = $('.js-img-marker-edit-contain .image').index($image)
  imagedata.markers = markersArrayArray[index]
}

// 缓存所有全景的marker信息到页面
function setMarkerArrayArray (index, imagedata) {
  if (imagedata.markers) {
    markersArrayArray[index] = imagedata.markers
  }
}

var panoContainerMarker

function editPanoMarkerInfo (options1) {
  var options = options1
  setTimeout(function () {
    panoContainerMarker = new com.vbpano.Panorama(document.getElementById('panoViewMarker'), {
      // panoId : options.panoId,
      heading: setDefaultVal(options.panoHeading, 90),
      pitch: setDefaultVal(options.panoPitch, -10),
      roll: options.roll || 0,
      autoplayEnable: options.autoplayEnable || false,
      gravityEnable: options.gravityEnable || false
    })
    panoContainerMarker.setMarkerDragEnable(true)
    //与setMarkerDragCallback函数冲突
    // panoContainerMarker.setMarkerDragEndCallback(function() {
    // 	console.log('drag end!');
    // });
    panoContainerMarker.setMarkerDragCallback(function (marker, status) {
      if (status == '0') {
        var activeIndex = $(markersArray).index(marker)
        $.each(markersArray, function (index, marker) {
          marker._domElement.style.border = 'none'
        })
        marker._domElement.style.border = '2px solid #fff'
        if (activeIndex == $(markersArray).index(activeMarker)) {
          return false
        }
        saveMarkerInfo()
        var $tr = $($('.js-markers-table .marker')[activeIndex])
        setMarkerActive($tr)
      } else if ((status == '1') && markersArray.length) {
        var heading = marker.getPanoHeading()
        var pitch = marker.getPanoPitch()
        $('.js-detail-marker-edit [marker-attr="heading"]').val(heading)
        $('.js-detail-marker-edit [marker-attr="pitch"]').val(pitch)
      }
    })
    //For test
    if (!config.onlineFlag) {
      panoContainerMarker.panoView.pano.urlProvider = function (panoId, level, row, column) {
        if (level < -1) { return 'http://tilestest.pano.visualbusiness.cn/' + panoId + '/sv.xml' }
        if (level == -1) { return 'http://tilestest.pano.visualbusiness.cn/' + panoId + '/cube/thumb.jpg' }
        return 'http://tilestest.pano.visualbusiness.cn/' + panoId + '/cube/' + level + '_' + row + '_' + column + '.jpg'
      }
    }

    panoContainerMarker.panoView._domElement.style.overflow = 'hidden'

    panoContainerMarker.setPanoId(options.panoId)
  }, 200)

}