// Javascript template
(function (factory) {
	// 自运行	
	// Factory run with jQuery.
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as anonymous module.
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node / CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals.
		factory(jQuery);
	}
})(function ($) {
	// 严格模式 
	'use strict';
	
	// 常用变量 常量 
	var $window = $(window),
		$document = $(document);

	var console = window.console || { log: function () {} };
	
	// 类
	function XXX(argument) {

		// body...

	}
	
	// 原型 业务逻辑 
	XXX.prototype = {

		// body...
		
		// 声明构造方法，new时会调用      
		constructor: XXX,

		// body...
	};

	// Save the other 
	XXX.other = $.fn.xxx;

	// Register as jQuery plugin
	$.fn.xxx = function (options) {
		// var args = toArray(arguments, 1),
		// 	result;

		// this.each(function () {
		// 	var $this = $(this),
		// 		data = $this.data('cropper'),
		// 		fn;

		// 	if (!data) {
		// 		$this.data('xxx', (data = new XXX(this, options)));
		// 	}

		// 	if (typeof options === 'string' && $.isFunction((fn = data[options]))) {
		// 		result = fn.apply(data, args);
		// 	}
		// });

		// return isUndefined(result) ? this : result;
	};

	// No conflict
	$.fn.xxx.noConflict = function () {
		// $.fn.xxx = XXX.other;
		// return this;
	};

	$(function () {
		return new XXX(argument);
	});

});