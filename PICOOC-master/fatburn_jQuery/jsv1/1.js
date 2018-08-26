
$(function(){
	$(".add").unbind("click").click(function(){
		//getImg(["http://cdn2.picooc.com/web/res/event/bank/image/prize-7.png","http://cdn2.picooc.com/web/res/event/bank/image/prize-8.png"])
		var deviceType4=isMobile();
		console.log(1);
		alert(deviceType4);
		alert(window.location.href);
		if(deviceType4 == "isApp" && (typeof mobileApp != "undefined")){
			var data={
				maxNum:9//上传图片的最大个数
			}
			data=JSON.stringify(data);
			console.log(data);
			mobileApp.uploadImg(data);
		}
	});
	//getImg(["http://cdn2.picooc.com/web/res/event/bank/image/prize-7.png","http://cdn2.picooc.com/web/res/event/bank/image/prize-8.png"])

	
})
function getImg(url){
	/*alert(1);
	alert(url);*/
	$(".test1").prepend('<img src="'+url[0]+'" />');
	console.log(url);
	console.log(url.length)
}





