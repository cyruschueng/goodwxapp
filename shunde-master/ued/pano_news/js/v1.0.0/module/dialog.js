define('module/dialog', [], function(){

	function Dialog(options) {
		container = options.container || document.body;
		width = options.width;
		height = options.height;
		topCss = options.top;
		autoClose = options.autoClose;
		tagClass = options.tagClass;
		var _this = this;
		var footerStr = '<div class="modal-footer">';
		options.buttons && $.each(options.buttons, function(idx, item) {
			footerStr += '<a class="btn '+ (item.tagClass? item.tagClass : '' ) +' btn-dialog-' + item
			.type + '">' + item.text + '</a>';
		});
		footerStr += '</div>';
		var divStr = '<div class="modal '+ tagClass +'">'+
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
						        '<a class="btn btn-main js-save">确定</a>'+
						      '</div>'))+
						    '</div>'+
						  '</div>'+
						'</div>';
		_this.dialogDiv = $(divStr);
		$(container).append(this.dialogDiv);
		options.buttons && $.each(options.buttons, function(idx, item) {
			// _this.dialogDiv.on('click', '.btn-dialog-' + item.type, function() {
			// 	item.buttonf(_this.dialogDiv);
			// });
			_this.dialogDiv.find('.btn-dialog-' + item.type).click(function() {
				item.buttonf(_this.dialogDiv);
			});
		});
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
	return {
		init:Dialog
	};
});