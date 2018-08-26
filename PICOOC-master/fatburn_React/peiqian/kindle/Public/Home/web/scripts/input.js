
/**
 * elem: 目标节点
 * 验证功能：包括昵称，账号，密码，手机号；
 * config:{
 * 	type: "nickname"; ("account", "password", "phone")
 * }
 * fun: 输入验证成功后执行的函数(可不填写)
 * 验证成功后在该节点上添加“isRight”属性，值为“true”;在最后确认提交的时候可以通过该属性来确认
 *
 * 所需dom结构，class需要保留当前的值
 * 	<div class = "input_box">
		<label class = "input-label">昵称</label>
		<input type="text" />
		<em class="errorText"><span>&nbsp;</span>你输入的昵称有误</em>
	</div>
	使用方法：
	var elem = document.getElementsByClassName('input_box');
	var test = new initInput();
	test.init(elem, {
		type: "password"
	})
 */

function initInput() {}
window.initInput = initInput;
initInput.prototype = {
	init: function(elem, config, fun) {
		this.elem = elem;
		this.config = config;
		this.fun = fun || function(){};
		this.inputBox = elem.getElementsByTagName('input')[0];
		this.inputLabel = elem.getElementsByClassName('input-label')[0];
		this.errorText = elem.getElementsByClassName('errorText')[0];
		this.setConfirm();
	},
	setConfirm: function() {
		switch (this.config.type) {
			case "nickname":
				this.nickName();
				break;
			case "account":
				this.account();
				break;
			case "password":
				this.password();
				break;
			case "phone":
				this.phone();
				break;
		}
		this.general();
	},
	nickName: function() {
		var self = this;
		this.inputBox.onblur = function() {
			if (this.value.length > 12 || this.value.length == 0) {
				self.showError();
			} else {
				// Do something....
				self.fun();
			}
		}
	},
	account: function() {
		var self = this;
		var pattern = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		this.inputBox.onblur = function() {
			if ((/^[0-9]+$/.test(this.value)) && this.value.length == 11) { // 手机号
				// Do something....
				self.fun();
				self.elem.setAttribute("isRight", "true");
			} else if (pattern.test(this.value)) { // 邮箱
				// Do something....
				self.fun();
				self.elem.setAttribute("isRight", "true");
			} else {
				self.showError();
			}
		}
	},
	password: function() {
		var self = this;
		var pattern = /^[A-Za-z0-9]+$/;
		this.inputBox.onblur = function() {
			if (this.value.length >= 6 && pattern.test(this.value)) {
				// Do something...
				self.fun();
				self.elem.setAttribute("isRight", "true");
			} else {
				self.showError();
			}
		}
		// this.inputBox.onkeypress = function() {
		// 	if (!pattern.test(this.value)) {
		// 		self.showError();
		// 	} else {
		// 		self.hideError();
		// 	}
		// }
	},
	phone: function() {
		var self = this;
		var pattern = /^[0-9]+$/;
		this.inputBox.onblur = function() {
			if (this.value.length == 11 && pattern.test(this.value)) {
				// Do something....
				self.fun();
				self.elem.setAttribute("isRight", "true");
			} else {
				self.showError();
			}
		}
	},
	general: function() {
		var self = this;
		this.inputBox.onfocus = function() {
			self.hideError();
		}
	},
	hideError: function() {
		this.errorText.style.display = "none";
		this.removeClass(this.inputLabel, "errorLabel");
		this.removeClass(this.inputBox, "errorInput");
	},
	showError: function() {
		this.errorText.style.display = "block";
		this.addClass(this.inputLabel, "errorLabel");
		this.addClass(this.inputBox, "errorInput");
	},
	hasClass: function(ele,cls) {
        return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
    },
    addClass: function(ele,cls) {
        if (!this.hasClass(ele,cls)) ele.className += " "+cls;
    },
    removeClass: function(ele,cls) {
        if (this.hasClass(ele,cls)) {
            var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
            ele.className=ele.className.replace(reg,' ');
        }
    }
}