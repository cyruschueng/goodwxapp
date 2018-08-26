/**
 *  主要用于验证各个输入框
 */

$(function () {
	
	$.fn.setCursorPosition = function(position){
	    if(this.lengh == 0) return this;
	    return $(this).setSelection(position, position);
	}

	$.fn.setSelection = function(selectionStart, selectionEnd) {
	    if(this.lengh == 0) return this;
	    input = this[0];

	    if (input.createTextRange) {
	        var range = input.createTextRange();
	        range.collapse(true);
	        range.moveEnd('character', selectionEnd);
	        range.moveStart('character', selectionStart);
	        range.select();
	    } else if (input.setSelectionRange) {
	        input.focus();
	        input.setSelectionRange(selectionStart, selectionEnd);
	    }

	    return this;
	}

	$.fn.focusEnd = function(){  // 聚焦输入框
	    this.setCursorPosition(this.val().length);
	}

	// 注册页
	var isSend = false; 		// 判断手机号是否正确		
	
	var registeElem = $(".regist");
	// registeElem.find(".user_name").blur(function() {  // 昵称
	// 	if (this.value.toString().length <12 && this.value.toString().length != 0) {
	// 		$(this).parent().attr("isRight", "true");
	// 	} else {
	// 		$(this).parent().find(".errorText").fadeIn(500);
	// 		// $(this).foncusEnd();
	// 	}
	// }).focus(function() {
	// 	$(this).parent().find(".errorText").css("display", "none");
	// });
	var inputN = registeElem.find(".user_name").parent()[0],
		ipt1 = new initInput();
	ipt1.init(inputN, {type: "nickname"});

	var inputP = registeElem.find(".user_mobile").parent()[0],
		ipt2 = new initInput();
	ipt2.init(inputP, {type: "phone"}, function() {
		isSend = true;
	});

	registeElem.find(".user_mobile").keydown(function (event) {
		var eventObj = event || e;
        var keyCode = eventObj.keyCode || eventObj.which;
        if (!((keyCode >= 48 && keyCode <= 57) || keyCode == 8)) {
        	$(this).parent().find(".errorText").fadeIn(500);	
        } else {
        	$(this).parent().find(".errorText").css("display", "none");
        	if (this.value.toString().length == 10) {
	        	$(this).parent().find(".verify_code_btn").addClass("verify_code_btn_act");
	        } else {
	        	$(this).parent().find(".verify_code_btn").removeClass("verify_code_btn_act");
	        }
        }
	});

	// registeElem.find(".user_mobile").blur(function () {  // 手机号
	// 	if (this.value.toString().length == 11 && (/^(\d|[0-9])+$/.test(this.value))) {
	// 		$(this).parent().find(".errorText").css("display", "none");
	// 		$(this).parent().attr("isRight", "true");
	// 	} else {
	// 		$(this).parent().find(".errorText").fadeIn(500);
	// 		// $(this).focusEnd();
	// 		isSend = false;
	// 	}
	// }).keypress(function (event) {
	// 	var eventObj = event || e;
 //        var keyCode = eventObj.keyCode || eventObj.which;
 //        if (!(keyCode >= 48 && keyCode <= 57)) {
 //        	$(this).parent().find(".errorText").fadeIn(500);	
 //        } else {
 //        	$(this).parent().find(".errorText").css("display", "none");
 //        	if (this.value.toString().length == 10) {
	//         	$(this).parent.find(".verify_code_btn").addClass("verify_code_btn_act");
	//         }
 //        }
        
	// }).focus(function () {
	// 	$(this).parent().find(".errorText").css("display", "none");
	// });

	registeElem.find(".verify_code_btn").click(function () {  // 发送验证码
		if (!isSend) {
			$(this).parent().find(".errorText").fadeIn(500);
			$(this).focusEnd();
		}
	});

	// registeElem.find(".user_password").keypress(function (event) {  // 密码输入框
 //        var eventObj = event || e;
 //        var keyCode = eventObj.keyCode || eventObj.which;
 //        if (!((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122))) {
 //        	$(this).parent().find(".errorText").fadeIn(500);	
 //        } else {
 //        	$(this).parent().find(".errorText").css("display", "none");
 //        }
 //    }).bind("paste", function () {
 //        var clipboard = window.clipboardData.getData("Text");
 //        if (!(/^(\d|[a-zA-Z])+$/.test(clipboard))){
 //        	$(this).parent().find(".errorText").fadeIn(500);
 //        }        	
 //    }).blur(function () {
 //    	if (/^(\d|[a-zA-Z])+$/.test(this.value)) {
 //    		$(this).parent().attr("isRight" , "true");
 //    		$(this).parent().find(".errorText").css("display", "none");
 //    	} else {
 //    		$(this).parent().find(".errorText").fadeIn(500);
 //    		// $(this).focusEnd();
 //    	}
 //    });

	var inputPW = registeElem.find(".user_password").parent()[0],
		ipt3 = new initInput();
	ipt3.init(inputPW, {type: "password"});

	var inputPW1 = registeElem.find(".user_password2").parent()[0],
		ipt4 = new initInput();
	ipt4.init(inputPW1, {type: "password"});

	registeElem.find(".user_password2").blur(function () {
    	var pw = registeElem.find(".user_password").val();
    	if (this.value == pw) {
    		$(this).parent().attr("isRight" , "true");
    		$(this).parent().find(".errorText").css("display", "none");
    	} else {
    		$(this).parent().find("label").addClass("errorLabel");
    		$(this).parent().find("input").addClass("errorInput");
    		$(this).parent().find(".errorText").css("display", "block");
    	}
    });

    // registeElem.find(".user_password2").keypress(function (event) {  // 密码确认输入框
    //     var eventObj = event || e;
    //     var keyCode = eventObj.keyCode || eventObj.which;
    //     if (!((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122))) {
    //     	$(this).parent().find(".errorText").fadeIn(500);	
    //     } else {
    //     	$(this).parent().find(".errorText").css("display", "none");
    //     }
    // }).bind("paste", function () {
    //     var clipboard = window.clipboardData.getData("Text");
    //     if (!(/^(\d|[a-zA-Z])+$/.test(clipboard))){
    //     	$(this).parent().find(".errorText").fadeIn(500);
    //     }        	
    // }).blur(function () {
    // 	var pw = registeElem.find(".user_password").value;
    // 	if ((/^(\d|[a-zA-Z])+$/.test(this.value)) && this.value == pw) {
    // 		$(this).parent().attr("isRight" , "true");
    // 		$(this).parent().find(".errorText").css("display", "none");
    // 	} else {
    // 		$(this).parent().find(".errorText").fadeIn(500);
    // 		// $(this).focusEnd();
    // 	}
    // });

    registeElem.find(".register_btn").click(function (e) {
    	var elem = registeElem.find(".items");
    	for (var i = 0; i < 5; i++) {
    		if ($(elem[i]).attr("isRight") != "true") {
    			e.preventDefault();
    			$(elem[i]).find(".errorText").fadeIn(500);
    		}
    	}
    });

    // 登陆页
    var isLogin = false;
    var loginElem = $(".login");
    loginElem.find(".user_name").blur(function () {
    	if (this.value.toString().length == 0) {
    		$(this).parent().find(".errorText").fadeIn(500);
    	} else {
    		$(this).parent().find(".errorText").css("display", "block");
    		$(this).parent().attr("isLogin", "true");
    	}
    });
    loginElem.find(".user_password").keypress(function (event) {  // 密码输入框
        var eventObj = event || e;
        var keyCode = eventObj.keyCode || eventObj.which;
        if (!((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122))) {
        	$(this).parent().find(".errorText").fadeIn(500);	
        } else {
        	$(this).parent().find(".errorText").css("display", "none");
        }
    }).bind("paste", function () {
        var clipboard = window.clipboardData.getData("Text");
        if (!(/^(\d|[a-zA-Z])+$/.test(clipboard))){
        	$(this).parent().find(".errorText").fadeIn(500);
        }        	
    }).blur(function () {
    	if (/^(\d|[a-zA-Z])+$/.test(this.value)) {
    		$(this).parent().attr("isRight" , "true");
    		$(this).parent().find(".errorText").css("display", "none");
    	} else {
    		$(this).parent().find(".errorText").fadeIn(500);
    	}
    });
	loginElem.find(".register_btn").click(function () {
		var elem = loginElem.find(".items");
    	for (var i = 0; i < 2; i++) {
    		if ($(elem[i]).attr("isLogin") != "true") {
    			e.preventDefault();
    			$(elem[i]).find(".errorText").fadeIn(500);
    		}
    	}
	});

})