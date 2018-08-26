var SXiuGaiGeRenXinXi={
	SCategory_SXiuGaiGeRenXinXi:5060500,
	SXiuGaiGeRenXinXi_ShuRuKuangYi:5060501,//输入框一
	SXiuGaiGeRenXinXi_ShuRuKuangEr:5060502,//输入框二
	SXiuGaiGeRenXinXi_QingKongNeiRong:5060503,//清空内容
	SXiuGaiGeRenXinXi_FangQiBaoCun:5060504,//放弃保存
	SXiuGaiGeRenXinXi_QueRenBaoCun:5060505,//确认保存
	SXiuGaiGeRenXinXi_DianjiBaoCun:5060506//点击保存
};
var btnShow=false;
var textNumLegal=true;
var textError=true;
var itemName=decodeURIComponent(decodeURIComponent(getParamByUrl("itemName")));
var itemIndex=getParamByUrl("index");
var theDevice=getParamByUrl("os");
if(itemIndex == 0){
	itemName="燃脂营昵称";
}
var title="修改"+itemName;
var itemValue=decodeURIComponent(decodeURIComponent(getParamByUrl("itemValue")));
$(function(){
	console.info(title);
	appNoShare(title);
	
	$(".editValue").val(itemValue);
	$(".beforeValue").val(itemValue);
	console.info(itemValue);

	$(".editValue").focus();

	if(getByteLen($(".editValue").val()) > 16){
		textNumLegal=false;
	}
	
	if(itemName != "false"){
		$(".editValue").attr("placeholder","请输入你的"+itemName);
	}else{
		$(".editValue").attr("placeholder","请输入");
	}

	
	$("#msg1").css("margin-top",-($("#msg1").height()+parseInt($("html").css("font-size"))*1.875*2)/2);
	$("#msg2").text(itemName+"不能超过16个字符哦~");
	$("#msg2").css("margin-top",-($("#msg2").height()+parseInt($("html").css("font-size"))*1.875*2)/2);


	leftControl(true,false);
	var oldStrLen=getByteLen($(".editValue").val());
	/*console.info("oldStrLen"+oldStrLen);*/
	$('.editValue').unbind("focus").focus(function(){
		setMaiDian(SXiuGaiGeRenXinXi.SCategory_SXiuGaiGeRenXinXi,SXiuGaiGeRenXinXi.SXiuGaiGeRenXinXi_ShuRuKuangYi);
	});
	$(".editValue").bind("input propertychange",function(){
		var limit=16;
	    var str=$(this).val(); 
	    var charLen; 
	    var byteLen=0; 
	    var nowLen=str.length;
	    byteLen=getByteLen(str); 
	    console.info("oldStrLen"+oldStrLen+"byteLen"+byteLen);
	    
	    console.info(byteLen);
	    if(limit < byteLen){
	    	textNumLegal = false;
	    	console.info(textNumLegal);
	    		//当内容属于过长，并且不是删除
	    		if(oldStrLen < byteLen){
	    			$("#msg2").css("display","block");
					setTimeout(function(){
						$("#msg2").css("display","none");
					},2000);
	    		}
	    }else{
	    	textNumLegal = true;
	    }
	    if( str.indexOf(",")>=0 || str.indexOf("，")>=0 ){
	    	textError=false;
			$("#msg3").css("display","block");
			setTimeout(function(){
				$("#msg3").css("display","none");
			},1000);
	    }
	    else{
	    	textError=true;
	    }
	    console.info(textNumLegal);
		/*showBtn();*/
		oldStrLen=byteLen;
	});
	$('.editValue').unbind("focus").focus(function(){
		setMaiDian(SXiuGaiGeRenXinXi.SCategory_SXiuGaiGeRenXinXi,SXiuGaiGeRenXinXi.SXiuGaiGeRenXinXi_ShuRuKuangEr);
	});

	$(".deleteText").click(function(){
		setMaiDian(SXiuGaiGeRenXinXi.SCategory_SXiuGaiGeRenXinXi,SXiuGaiGeRenXinXi.SXiuGaiGeRenXinXi_QingKongNeiRong);
		$(".editValue").val("");
		textNumLegal=true;
		/*showBtn();*/
	});

	$(".editBtn").click(function(){
		setMaiDian(SXiuGaiGeRenXinXi.SCategory_SXiuGaiGeRenXinXi,SXiuGaiGeRenXinXi.SXiuGaiGeRenXinXi_DianjiBaoCun);
		var userInfo=$(".editValue").val();
		var isUpdate= userInfo == $(".beforeValue").val() ? false:true;

/*		//若用户清空昵称，并点击保存，则浮层提示“昵称不能为空哦~”，并停留在该页面，修改不生效；
		if(userInfo == null || userInfo == ""){
			$("#msg1").css("display","block");
			setTimeout(function(){
				$("#msg1").css("display","none");
			},2000);
		}
		//在输入内容不合法的情况下，用户点击保存会再次浮层提示，点击返回不会再提示是否保存，而是会默认修改不生效；
		if(!textNumLegal){
			$("#msg2").css("display","block");
			setTimeout(function(){
				$("#msg2").css("display","none");
			},2000);
		}*/
		//对原有内容有所修改（空或者修改内容）且合法（不超过限制字数）
		if(userInfo != $(".beforeValue").val() && textNumLegal && textError){
			//修改的内容是昵称
			if(itemIndex == 0){
				//若用户清空昵称，并点击保存，则浮层提示“昵称不能为空哦~”，并停留在该页面，修改不生效；
				if(userInfo == null || userInfo == ""){
					$("#msg1").css("display","block");
					setTimeout(function(){
						$("#msg1").css("display","none");
					},2000);
				}
				//如果用户昵称合法，提交修改
				else{
					setCookie("isRefresh",1,30);
					updateInfo(itemIndex,userInfo);
				}
			}
			//修改的是职业和所在地
			else{
				updateInfo(itemIndex,userInfo);
			}
			leftControl(false,false);
		}
		//对原有内容有所修改（空或者修改内容）且不合法
		else if(userInfo != $(".beforeValue").val() && !textNumLegal && textError){
			//在输入内容不合法的情况下，用户点击保存会再次浮层提示，点击返回不会再提示是否保存，而是会默认修改不生效；
			if(!textNumLegal){
				if(theDevice == "android"){
					$(".editValue").blur();
					$("#msg2").css("display","block");
				}else{
					$(".beforeValue").click(function(){
						$(".editValue").blur();
					});
					$(".beforeValue").click();
					$("#msg2").css("display","block");
				}
				setTimeout(function(){
					$("#msg2").css("display","none");
				},2000);
			}

			leftControl(false,false);
		}
		//如果内容没有改变
		else if(userInfo == $(".beforeValue").val()){
			leftControl(false,false);
			closePage();
		}
		else if(!textError){
			$("#msg3").css("display","block");
			setTimeout(function(){
				$("#msg3").css("display","none");
			},1000);
			leftControl(false,false);
		}


	})
})

function updateInfo(itemIndex,itenValue){
	var updateName="";
	if(itemIndex == 0){
        updateName="name";
    }else if(itemIndex == 1){
        updateName="career";
    }else if(itemIndex == 2){
        updateName="area";
    }
	var host=window.location.protocol+"//"+window.location.host;
	var finalUrl=host+"/v1/api/campStu/updateStudentInfo"+window.location.search+"&"+updateName+"="+itenValue;
	console.info(finalUrl);
	$.ajax({
		type:"get",
		url:finalUrl,
		dataType:"json",
		success:function(data){
			if(data.code == 200){
				closePage();
			}else{
					$(".error-main-t").html(data.message);
					$(".errorAlert").css("display","block");
					$(".error-main").css("margin-top",-$(".error-main").height()/2);
			}
		}
	});
}

function getByteLen(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null){
            len += 2;
        }else{
            len += 1;
        }
    }
    return len;
}



/*function showBtn(){
	var userInfo=$(".editValue").val();
	if(userInfo.length>0 && textNumLegal){
		btnShow=true;
		$(".editBtn").addClass("active");
	}else{
		btnShow=false;
		$(".editBtn").removeClass("active");
	}
}*/

function getMessage(){
	if(theDevice == "android"){
		$(".editValue").blur();
	}else{
		$(".beforeValue").click(function(){
			$(".editValue").blur();
		});
		$(".beforeValue").click();
	}
	
	
	var hasContent=$(".editValue").val().length>0 ? true:false;
	var isUpdate=$(".editValue").val() == $(".beforeValue").val() ? false:true;
	//有内容没保存(内容不为空，已经做修改，输入内容合法)
	if(hasContent && isUpdate && textNumLegal){
	/*if(hasContent){*/
		leftControl(false,true);
		$(".fixbg").css("display","block");
		$(".fixbg-main-btn1").click(function(){
			setMaiDian(SXiuGaiGeRenXinXi.SCategory_SXiuGaiGeRenXinXi,SXiuGaiGeRenXinXi.SXiuGaiGeRenXinXi_FangQiBaoCun);
			$(".fixbg").css("display","none");
			leftControl(false,false);
			closePage();
		});
		$(".fixbg-main-btn2").click(function(){
			setMaiDian(SXiuGaiGeRenXinXi.SCategory_SXiuGaiGeRenXinXi,SXiuGaiGeRenXinXi.SXiuGaiGeRenXinXi_QueRenBaoCun);
			$(".fixbg").css("display","none");
			$(".editBtn").click();
		});
	}else{
		leftControl(false,false);
		closePage();
	}
	
}

function closePage(){
	var getPageInfo = function (){
		var data = {
			backNum:1,//默认为1，
			closeWebview:0,//默认为0
		};
		return JSON.stringify(data);
	};
	var deviceType=isMobile();
		if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
		mobileApp.deleteHistory(getPageInfo());
	}
	document.documentElement.style.webkitTouchCallout='none';
}


//左上角关闭页面时控制返回按钮
function leftControl(isHandle,isHidden){
	var getPageInfo = function (){
		var data = {
			iconType:0,//0:默认箭头，1：叉，2：iconUrl传图片
			backNum:1,//1为正常后退，
			closeWebview:0,//默认为0
			hidden:isHidden,
			isHandle:isHandle,//是否控制左上角
			functionName: "getMessage",//控制左上角返回时候的方法名
			iconUrl:""
		};
		return JSON.stringify(data);
	}
	var deviceType=isMobile();
	if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
		mobileApp.showLeftBtn(getPageInfo());
	}
	document.documentElement.style.webkitTouchCallout='none';
}

function appNoShare(title){
	var getPageInfo = function (){
		var data = {
			title:title,
			isShare:false,
			backgroundColor:'#2c2f31'
		};
		return JSON.stringify(data);
	};
	var deviceType=isMobile();
		if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
		mobileApp.getShareInfo(getPageInfo());
	}
	document.documentElement.style.webkitTouchCallout='none';
}