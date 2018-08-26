function Dialog(options) {
	container = options.container || document.body;
	width = options.width;
	height = options.height;
	topCss = options.top;
	autoClose = options.autoClose;
	var _this = this;
	var footerStr = '<div class="modal-footer">';
	$.each(options.buttons, function(idx, item) {
		footerStr += '<button type="button" class="btn-vb btn-success-vb btn-dialog-' + item
		.type + '">' + item.text + '</button>';
	});
	footerStr += '</div>';
	var divStr = '<div class="modal-album">'+
					  '<div class="modal-dialog" style="' + (width? 'width:' + width + ';' : '') + (height? 'height:' + height + ';' : '') + (topCss? 'top:' + topCss + ';' : '') + '">'+
					    '<div class="modal-content">'+
					    (options.title? '<div class="modal-header">'+
					        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
					        '<h4 class="modal-title">'+ options.title +'</h4>'+
					      '</div>': '')+
					      '<div class="modal-body">'+
					        options.content+
					      '</div>'+
					      (autoClose?'':(options.buttons? footerStr:'<div class="modal-footer">'+
					        '<button type="button" class="btn-vb btn-success-vb js-save">确定</button>'+
					      '</div>'))+
					    '</div>'+
					  '</div>'+
					'</div>';
	_this.dialogDiv = $(divStr);
	$.each(options.buttons, function(idx, item) {
		_this.dialogDiv.on('click', '.btn-dialog-' + item.type, function() {
			item.fn(_this.dialogDiv);
		});
	});
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
}
function removeDialogModalBottomCss(){
	if($('.modal-dialog').height() > $('.modal-album').height()){
		$('.modal-album').css('bottom','initial');
	}
}