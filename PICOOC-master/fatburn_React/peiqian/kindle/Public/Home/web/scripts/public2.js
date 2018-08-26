if(cart == undefined){
	var cart = {};
}
//错误提示弹出框
cart.showTips = function(config){// tips left top delaytime target
	var ele = $('<div>'+config.tips+'</div>');
		ele.addClass('errorTip');
		ele.appendTo($('body'));
		ele.css({
			left:config.left,
			top:config.top
		});
		if(config.delaytime!=undefined){
			setTimeout(function(){
				ele.remove();
			},config.delaytime*1000);
		}
		if(config.target){
			var wid = config.target.width(),
				hei = config.target.height()+4;
			ele.css({
				'width':wid,
				'height':hei,
				'line-height':hei+'px'
			});
		}
}
//模拟confirm 
cart.winfirm = function(config){//title tips callback left top 
	if($('.order_dialog_delete').length>0){
			$('.order_dialog_delete').remove();
		}
		var randomId = Math.random()*1000000000*100000000;
		var ele = $("<div class='order_dialog_delete' id='order_dialogId"+randomId+"'></div>");
		ele.appendTo($('body'));
		var str="<div class='order_dialog_title'>"+config.title+"</div>"
			    +"<div class='order_dialog_con'>"
			    +    "<div class='order_dialog_mesg'>"+config.tips+"</div>"
			    +   "<div class='order_dialog_btn'>"
			    +        "<a href='javascript:void(0)' class='order_dialog_sure'>确定</a>"
			    +        "<a href='javascript:void(0)' class='order_dialog_cancle'>取消</a>"
			    +    "</div>"
			    +"</div>";
		ele.html(str);
		ele.css({
			left:config.left,
			top:config.top
		});
		$('.order_dialog_cancle').die('click').live('click',function(){
			$('#order_dialogId'+randomId).remove();
		});
		$('.order_dialog_sure').die('click').live('click',function(){
			config.callback();
			$('#order_dialogId'+randomId).remove();
		});
}