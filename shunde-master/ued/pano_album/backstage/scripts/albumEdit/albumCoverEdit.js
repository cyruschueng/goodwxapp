//上传图片腾讯云图片地址前缀
function getMySignature(params,callback) {
    $.ajax({
      type: 'get',
      url: 'http://shunde.vizen.cn/shunde/inner/upload/sign?remotePath=' + params,
      success: function (res) {
        var my = JSON.parse(res)
        if(my.code == '0'){
          callback(my);
        }else {
          alert(my.msg)
        }
      }
    });
};
$('#openCover').click(function () {
  if ($(this).is(':checked')) {
    $('#setCoverPage').show();
  }
  else {
    $('#setCoverPage').hide();
  }
});
$('.btn-save-loading').off().on('click', function () {
  var top = event.pageY - 400 > 0 ? event.pageY - 400 : 0
  updateAlbumCover(function () {
    var d = new Dialog({top: top + 'px', title: '提示', content: '保存成功', autoClose: true})
    backfillCover(albumUpdateObject.albumContent.features)
  })
})
$('#uploadLogo').on('change', function (event) {
  var file = event.target.files[0]
  uploadToLuna(file, setLogo)
  // upload('/'+albumUpdateObject.albumId+'/cover-logo.png', file, uploadToQcloud, setLogo);
})
$('#uploadCover').on('change', function (event) {
  var file = event.target.files[0]
  uploadToLuna(file, setCover)
  // upload('/'+albumUpdateObject.albumId+'/h5-cover.png', file, uploadToQcloud, setCover);
})
$('#uploadMusic').on('change', function (event) {
  var file = event.target.files[0];
  getMySignature('/shunde/file/' + file.lastModified + '.mp3',function (data) {
    setMusicName(file.lastModified + '.mp3');
    var info = new Object();
    info.path = file.lastModified + '.mp3';
    info.signature = data.data.sign;
    $('.musicOn-upload').html("上传中..");
    uploadToQcloud(info,file,function (res) {
      albumUpdateObject.albumContent.features.music_url = res.data.source_url;
      $('.musicOn-upload').html("上传音乐");
      $('#uploadMusic').val(albumUpdateObject.albumContent.features.music_url);
    });
  });
})
$('#uploadPcCover').on('change', function (event) {
  var file = event.target.files[0]
  uploadToLuna(file, setPcCover)
  // upload('/'+albumUpdateObject.albumId+'/pc-cover.png', file, uploadToQcloud, setPcCover);
})
$('#logoUrl').change(function () {
  $(this).siblings('img').attr('src', $(this).val())
})
$('#coverUrl').change(function () {
  $(this).siblings('img').attr('src', $(this).val())
})
$('#pcCoverUrl').change(function () {
  $(this).siblings('img').attr('src', $(this).val())
})
function setMusicName (url) {
  $('#musicUrl').val(url);
}
function setLogo (url) {
  $('#showLogoImg').attr('src', url)
  $('#logoUrl').val(url)
}
function setCover (url) {
  $('#showCoverImg').attr('src', url)
  $('#coverUrl').val(url)
}
function setPcCover (url) {
  $('#showPcCoverImg').attr('src', url)
  $('#pcCoverUrl').val(url)
}
function upload (path, file, callbackFun, callbackCallback) {
  $.ajax({
    type: 'get',
    url: url_root + '/cos/signature?path=' + path,
    success: function (data) {
      if (data.result == 0) {
        callbackFun && callbackFun(data.data, file, callbackCallback)
      } else {
        alert(data.msg)
        // var d = new Dialog({title: '提示', content: data.msg});
      }
    }
  })
}
$('.btn-save-config').off().on('click', function () {
  var top = event.pageY - 400 > 0 ? event.pageY - 400 : 0
  albumUpdateObject.albumContent.status = 0;
  var a = JSON.stringify({
    albumId: albumUpdateObject.albumId,
    optVersion: albumUpdateObject.optVersion,
    albumContent: JSON.stringify(albumUpdateObject.albumContent)
  })
  $.ajax({
    type: 'post',
    url: url_root + '/album/update?updateMeta=true&lang=' + localStorage.langStr,
    contentType: 'application/json; charset=utf-8',
    data: a,
    success: function (a) {
      var d = new Dialog({top: top + 'px', title: '提示', content: '保存至草稿箱成功', autoClose: true})
    }
  })

})

function uploadToQcloud (info, file, callback) {
  var url = 'http://sh.file.myqcloud.com/files/v2/10002033/panopublictest/shunde/file/' + info.path + '?sign=' + encodeURIComponent(info.signature)
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
function uploadToLuna (file, callback, type) {
  var url = luna_root + '/luna-web/common/merchant/upload'
  var formData = null
  if (window.FormData) {
    var formData = new FormData()
    formData.append('type', type || 'pic')
    formData.append('file', file)
    formData.append('resource_type', 'app')
  }
  $.ajax({
    type: 'post',
    url: url,
    dataType: 'json',
    processData: false,
    contentType: false,
    data: formData,
    success: function (data) {
      console.log('data', data)
      if (data.code == 0) {
        callback(data.data.access_url)
      } else {
        alert(data.msg)
      }
    }
  })
}
function getData () {
  $.ajax({
    type: 'get',
    url: url_root + '/album/get',
    data: {albumId: albumUpdateObject.albumId, lang: localStorage.langStr},
    success: function (data) {
      if (data.result == 0) {
        albumUpdateObject = data.data
        var albumObject = data.data
        albumObject.albumContent = $.parseJSON(albumObject.albumContent)
        backfillCover(albumObject.albumContent.features)
      } else if (data.result == 2) {
        loginDialog()
      } else {
        var d = new Dialog({title: '提示', content: data.msg})
      }
    }
  })
}
function backfillCover (data) {
  if (data && Boolean(data.coverflag) == true) {
    $('#coverText').val(data.cover_text)
    $('#setCoverPage').show()
    $('#openCover').prop('checked', true)
    $('#logoUrl').val(data.cover_logo_url)
    $('#showLogoImg').attr('src', data.cover_logo_url)
    if (!data.cover_logo_url) {
      $('#showLogoImg').attr('src', '../images/logo-default.png')
    }
    $('#coverUrl').val(data.h5_cover_url)
    $('#musicUrl').val(data.music_url)
    $('#showCoverImg').attr('src', data.h5_cover_url)
    $('#pcCoverUrl').val(data.pc_cover_url)
    $('#showPcCoverImg').attr('src', data.pc_cover_url)
  }
  else {
    if (data) {
      $('#setCoverPage').hide()
      $('#openCover').prop('checked', false)
    }
    else {
      $('#setCoverPage').show()
      $('#openCover').prop('checked', true)
    }
    $('#coverText').val('')
    $('#logoUrl').val('')
    $('#showLogoImg').attr('src', '../images/logo-default.png')
    $('#coverUrl').val('')
    $('#showCoverImg').attr('src', '../images/cover-default.jpg')
    $('#pcCoverUrl').val('')
    $('#showPcCoverImg').attr('src', '../images/pc-cover-default.jpg')
  }
}
function updateAlbumCover (callback) {
  if (!albumUpdateObject.albumContent.features) {
    albumUpdateObject.albumContent.features = {}
  }
  albumUpdateObject.albumContent.features.coverflag = $('#openCover').is(':checked')
  albumUpdateObject.albumContent.features.cover_logo_url = $('#logoUrl').val()
  albumUpdateObject.albumContent.features.h5_cover_url = $('#coverUrl').val()
  albumUpdateObject.albumContent.features.pc_cover_url = $('#pcCoverUrl').val()
  albumUpdateObject.albumContent.features.cover_text = $('#coverText').val()
  albumUpdateObject.albumContent.activeStep = 5
  if (albumUpdateObject.albumContent.features.coverflag) {
    if (!albumUpdateObject.albumContent.features.h5_cover_url) {
      var d = new Dialog({title: '提示', content: '手机封面不能为空'})
      return
    }
    if (!albumUpdateObject.albumContent.features.pc_cover_url) {
      var d = new Dialog({title: '提示', content: 'PC封面不能为空'})
      return
    }
  }
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
        albumUpdateObject = data.data
        albumUpdateObject.albumContent = $.parseJSON(albumUpdateObject.albumContent)
        if (typeof callback === 'function') {
          callback(data)
        }
      } else if (data.result == 2) {
        loginDialog()
      } else {
        var d = new Dialog({title: '提示', content: data.msg})
      }
    }
  })
}

var vrDiv2 = document.getElementById('vrDiv2')
var vrDiv = document.getElementById('vrDiv')
var vrOn = "0"
vrDiv2.onclick = function () {
  if (vrDiv.className == 'close1') {
    vrDiv.className = 'open1'
    vrDiv2.className = 'open2'
    vrOn = "1"
  } else {
    vrDiv.className = 'close1'
    vrDiv2.className = 'close2'
    vrOn = "0"
  }
  albumUpdateObject.albumContent.features.vrflag = vrOn
}
var weightDiv2 = document.getElementById('weightDiv2')
var weightDiv = document.getElementById('weightDiv')
var weightOn = "0"
weightDiv2.onclick = function () {
  if (weightDiv.className == 'close1') {
    weightDiv.className = 'open1'
    weightDiv2.className = 'open2'
    weightOn = "1"
  } else {
    weightDiv.className = 'close1'
    weightDiv2.className = 'close2'
    weightOn = "0"
  }
  albumUpdateObject.albumContent.features.gravityflag = weightOn
}
var musicDiv2 = document.getElementById('musicDiv2')
var musicDiv = document.getElementById('musicDiv')
var musicOn = "0"
musicDiv2.onclick = function () {
  if (musicDiv.className == 'close1') {
    musicDiv.className = 'open1'
    musicDiv2.className = 'open2'
    musicOn = "1"
    $('.musicOn').css("display","");
  } else {
    musicDiv.className = 'close1'
    musicDiv2.className = 'close2'
    musicOn = "0"
    $('.musicOn').css("display","none");
  }
  albumUpdateObject.albumContent.features.musicflag = musicOn
}
var rotationDiv2 = document.getElementById('rotationDiv2')
var rotationDiv = document.getElementById('rotationDiv')
var rotationOn = "0"
rotationDiv2.onclick = function () {
  if (rotationDiv.className == 'close1') {
    rotationDiv.className = 'open1'
    rotationDiv2.className = 'open2'
    rotationOn = "1"
  } else {
    rotationDiv.className = 'close1'
    rotationDiv2.className = 'close2'
    rotationOn = "0"
  }
  albumUpdateObject.albumContent.features.autoplayflag = rotationOn
}
// //添加标签组件
var FancyForm = function () {
  return {
    inputs: '.FancyForm input, .FancyForm textarea',
    setup: function () {
      var a = this
      this.inputs = $(this.inputs)
      a.inputs.each(function () {
        var c = $(this)
        a.checkVal(c)
      })
      a.inputs.on('keyup blur', null, function () {
        var c = $(this)
        a.checkVal(c)
      })
    }, checkVal: function (a) {
      a.val().length > 0 ? a.parent('li').addClass('val') : a.parent('li').removeClass('val')
    }
  }
}()

$(document).ready(function () {
  FancyForm.setup()
})

var searchAjax = function () {}
var G_tocard_maxTips = 30

$(function () {
  (function () {
      var a = $('.plus-tag')
      $('a em', a).on('click', null, function () {
        var c = $(this).parents('a'), b = c.attr('title'), d = c.attr('value')
        delTips(b, d)
      })

      hasTips = function (b) {
        var d = $('a', a), c = false
        d.each(function () {
          if ($(this).attr('title') == b) {
            c = true
            return false
          }
        })
        return c
      }

      isMaxTips = function () {
        return
        $('a', a).length >= G_tocard_maxTips
      }
      setTips = function (c, d) {
        if (hasTips(c)) {
          return false
        }
        if (isMaxTips()) {
          alert('最多添加' + G_tocard_maxTips + '个标签！')
          return false
        }
        var b = d ? 'value="' + d + '"' : ''
        a.append($('<a ' + b + ' title="' + c + '" href="javascript:void(0);" ><span>' + c + '</span><em></em></a>'))
        searchAjax(c, d, true)
        $('a em', a).on('click', null, function () {
          var c = $(this).parents('a'), b = c.attr('title'), d = c.attr('value')
          delTips(b, d)
        })
        return true
      }

      delTips = function (b, c) {
        if (!hasTips(b)) {
          return false
        }
        $('a', a).each(function () {
          var d = $(this)
          if (d.attr('title') == b) {
            d.remove()
            return false
          }
        })
        searchAjax(b, c, false)
        return true
      }

      getTips = function () {
        var b = []
        $('a', a).each(function () {
          b.push($(this).attr('title'))
        })
        return b
      }

      getTipsId = function () {
        var b = []
        $('a', a).each(function () {
          b.push($(this).attr('value'))
        })
        return b
      }

      getTipsIdAndTag = function () {
        var b = []
        $('a', a).each(function () {
          b.push($(this).attr('value') + '##' + $(this).attr('title'))
        })
        return b
      }
    })()
})

$(function () {
  setSelectTips()
  $('.plus-tag').append($('.plus-tag a'))
})
var searchAjax = function (name, id, isAdd) {
  setSelectTips()
};
// 搜索
(function () {
  var $b = $('.plus-tag-add button'), $i = $('.plus-tag-add input')
  $i.keyup(function (e) {
    if (e.keyCode == 13) {
      $b.click()
    }
  })
  function getNetTags () {
    $.ajax({
      type: 'get',
      url: url_root + '/album/findAllTag',
      success: function (a) {
        var b = a;
        if (0 == b.result) {
          for(var i=0; i<b.data.tags.length;i++){
            defualtTags.append($('<a value="-1" title="' + b.data.tags[i].tagName + '" href="javascript:void(0);"><span>' + b.data.tags[i].tagName + '</span><em></em></a>'))
          }
        }else {
          new Dialog({title: '提示', content: b.msg})
        }
      }
    })
  };
  var defualtTags = $('.default-tag');
  getNetTags();
  function createNewTags (tags) {
    $.ajax({
      type: 'get',
      url: url_root + '/album/createTag',
      data: {"tag":tags},
      success: function (a) {
        if (0 == a.result) {
          defualtTags.append($('<a value="-1" title="' + tags + '" href="javascript:void(0);"><span>' + tags + '</span><em></em></a>'))
        }else {
          new Dialog({title: '提示', content: a.msg})
        }
      }
    })
  }
  $b.click(function () {
    var name = $i.val().toLowerCase()
    if (name != '') {
      if (hasTips(name)) {
        return false
      }
      createNewTags(name)
      setTips(name, -1)}
    $i.val('')
    $i.select()
  })
})();
// 推荐标签
(function () {
  var str = ['展开推荐标签', '收起推荐标签']

  $('.plus-tag-add a').click(function () {
    var $this = $(this),
      $con = $('#mycard-plus')

    if ($this.hasClass('plus')) {
      $this.removeClass('plus').text(str[0])
      $con.hide()
    } else {
      $this.addClass('plus').text(str[1])
      $con.show()
    }
  })
  $('.default-tag').on('click', 'a', function () {
    var $this = $(this),
      name = $this.attr('title'),
      id = $this.attr('value')
      setTips(name, id)
  })
  // 更新高亮显示
  setSelectTips = function () {
    var arrName = getTips()
    if (arrName.length) {
      $('#myTags').show()
    } else {
    }
    $('.default-tag a').removeClass('selected')
    $.each(arrName, function (index, name) {
      $('.default-tag a').each(function () {
        var $this = $(this)
        if ($this.attr('title') == name) {
          $this.addClass('selected')
          return false
        }
      })
    })
  }

})()
function getSwitchData () {
  $.ajax({
    type: 'get',
    url: url_root + '/album/get',
    data: {albumId: albumUpdateObject.albumId, lang: localStorage.langStr},
    success: function (a) {
      if (0 == a.result) {
        albumUpdateObject = a.data
        var e = a.data
        e.albumContent = $.parseJSON(e.albumContent), backfillCover(e.albumContent.features)
        setSwitch(e.albumContent.features)
      } else if (2 == a.result) {
        loginDialog()
      } else {
        new Dialog({title: '提示', content: a.msg})
      }
    }
  })
}

function setSwitch (data) {
  if (data.vrflag == null) {
    data.vrflag = "1"
  }
  if (data.gravityflag == null) {
    data.gravityflag = "1"
  }
  if (data.musicflag == null) {
    data.musicOn = "0"
  }
  if (data.musicflag == null) {
    data.autoplayflag = "0"
  }

  if (data.vrflag == "1") {
    vrDiv.className = 'open1'
    vrDiv2.className = 'open2'
    vrOn = "1"
  } else if (data.vrflag == "0") {
    vrDiv.className = 'close1'
    vrDiv2.className = 'close2'
    vrOn = "0"
  }
  albumUpdateObject.albumContent.features.vrflag = vrOn
  if (data.gravityflag == "1") {
    weightDiv.className = 'open1'
    weightDiv2.className = 'open2'
    weightOn = "1"
  } else if (data.gravityflag == "0") {
    weightDiv.className = 'close1'
    weightDiv2.className = 'close2'
    weightOn = "0"
  }
  albumUpdateObject.albumContent.features.gravityflag = weightOn
  if (data.autoplayflag == "1") {
    rotationDiv.className = 'open1'
    rotationDiv2.className = 'open2'
    rotationOn = "1"
  } else if (data.autoplayflag == "0") {
    rotationDiv.className = 'close1'
    rotationDiv2.className = 'close2'
    rotationOn = "0"
  }
  albumUpdateObject.albumContent.features.autoplayflag = rotationOn
  if (data.musicflag == "1") {
    musicDiv.className = 'open1'
    musicDiv2.className = 'open2'
    musicOn = "1"
    $('.musicOn').css("display","");
  } else if (data.musicflag == "0") {
    musicDiv.className = 'close1'
    musicDiv2.className = 'close2'
    musicOn = "0"
    $('.musicOn').css("display","none");
  }
  albumUpdateObject.albumContent.features.musicflag = musicOn
  if (albumUpdateObject.albumContent.tipsList == null) {
    albumUpdateObject.albumContent.tipsList = []
  }
  for (var p = 0; p < albumUpdateObject.albumContent.tipsList.length; p++) {
    setTips(albumUpdateObject.albumContent.tipsList[p], -1)
  }

}