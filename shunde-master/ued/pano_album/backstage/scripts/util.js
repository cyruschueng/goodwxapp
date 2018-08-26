function Dialog(options) {
	container = options.container || window.top.document.body;
	width = options.width;
	height = options.height;
	autoClose = options.autoClose;
	var _this = this;
	var divStr = '<div class="modal">'+
					  '<div class="modal-dialog" style="' + (width? 'width:' + width + ';' : '') + (height? 'height:' + height + ';' : '') + '">'+
					    '<div class="modal-content">'+
					    (options.title? '<div class="modal-header">'+
					        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
					        '<h4 class="modal-title">'+ options.title +'</h4>'+
					      '</div>': '')+
					      '<div class="modal-body">'+
					        options.content+
					      '</div>'+
					      (autoClose?'':'<div class="modal-footer">'+
					        '<button type="button" class="btn-vb btn-success-vb js-save">确定</button>'+
					      '</div>')+
					    '</div>'+
					  '</div>'+
					'</div>';
	_this.dialogDiv = $(divStr);

	$(container).append(this.dialogDiv);
	options.initEvt && options.initEvt(this.dialogDiv);
	options.autoSearch && options.autoSearch(this.dialogDiv);
	this.dialogDiv.find('.close').click(function() {
		_this.dialogDiv.remove();
	});
	this.dialogDiv.find('.js-save').click(function() {
		_this.fnSave(_this.dialogDiv,options.ok,options.isOpenOnSave);
	});

	if(autoClose) {
		setTimeout(function(){
			_this.dialogDiv&&_this.dialogDiv.remove();
		},1000);
	}
}
Dialog.prototype.fnSave = function(dialog, fn, isOpenOnSave) {

	fn && fn(dialog);
	if(!isOpenOnSave) {
		this.dialogDiv.remove();
	}
};

function getMySignature(params,callback) {
  $.ajax({
    type: 'get',
    url: 'http://cos.test.vizen.cn/file/generateSign?appid=1251448083&bucket=panopublictest&remotePath=%2Fshunde%2Ffile%2F' + params,
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
  });
}