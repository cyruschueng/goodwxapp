
var React = require("react");
var ReactDOM = require("react-dom");
//数据错误提示
var Public_error=require("./Public_error.jsx");

var publicData={
	textNumLegal:true,
	textError:true,
	itemName:decodeURIComponent(decodeURIComponent(getParamByUrl("itemName"))),
	itemIndex:getParamByUrl("index"),
	itemValue:decodeURIComponent(getParamByUrl("itemValue")),
	theDevice:getParamByUrl("os"),
	errorText:"",
	hasUpdate:false
}

var SXiuGaiGeRenXinXi={
	SCategory_SXiuGaiGeRenXinXi:5060500,
	SXiuGaiGeRenXinXi_ShuRuKuangYi:5060501,//输入框一
	SXiuGaiGeRenXinXi_ShuRuKuangEr:5060502,//输入框二
	SXiuGaiGeRenXinXi_QingKongNeiRong:5060503,//清空内容
	SXiuGaiGeRenXinXi_FangQiBaoCun:5060504,//放弃保存
	SXiuGaiGeRenXinXi_QueRenBaoCun:5060505,//确认保存
	SXiuGaiGeRenXinXi_DianjiBaoCun:5060506//点击保存
};
var EditInfo = React.createClass({
	getInitialState:function(){
		var me = this;
		window.getMessage = me.getMessage;
		me.leftControl(true,false);
		var title="修改"+publicData.itemName;
        var titleData = {
            title:title,
            color:"",
            opacity:"",
            backgroundColor:"",
            backgroundOpacity:""
        };
        titleData=JSON.stringify(titleData);
        appFc.controlTitle(titleData);
		return {}
	},
	componentDidMount:function(){
		var me = this;
		$(".editValue").bind("input propertychange",function(){
			var limit=16;
		    var str=$(this).val(); 
		    var charLen; 
		    var byteLen=0; 
		    var nowLen=str.length;
		    var oldStrLen=me.getByteLen(publicData.itemValue);
		    byteLen=me.getByteLen(str); 
		    
		    console.info(byteLen);
		    if(limit < byteLen){
		    	publicData.textNumLegal = false;
		    	console.info(publicData.textNumLegal);
		    		//当内容属于过长，并且不是删除
		    		if(oldStrLen < byteLen){
		    			publicData.errorText = "不能超过16个字符哦~";
		    			$(".fixbg1").text(publicData.errorText);
		    			$(".fixbg1").css("display","block");
						setTimeout(function(){
							$(".fixbg1").css("display","none");
						},2000);
		    		}
		    }else{
		    	publicData.textNumLegal = true;
		    }
		    if( str.indexOf(",")>=0 || str.indexOf("，")>=0 ){
		    	publicData.textError=false;
		    	publicData.errorText = "昵称不能有逗号哦~";
		    	$(".fixbg1").text(publicData.errorText);
				$(".fixbg1").css("display","block");
				setTimeout(function(){
					$(".fixbg1").css("display","none");
				},1000);
		    }
		    else{
		    	publicData.textError=true;
		    }
		    console.info(publicData.textNumLegal);
			oldStrLen=byteLen;
			publicData.hasUpdate = false;
		});
	},
	getByteLen:function(val) {
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
	},
	deleteContent:function(){
		setMaiDian(SXiuGaiGeRenXinXi.SCategory_SXiuGaiGeRenXinXi,SXiuGaiGeRenXinXi.SXiuGaiGeRenXinXi_QingKongNeiRong);
		$(".editValue").val("");
		publicData.textNumLegal=true;
	},
	changeInfo:function(){
		var me = this;
		setMaiDian(SXiuGaiGeRenXinXi.SCategory_SXiuGaiGeRenXinXi,SXiuGaiGeRenXinXi.SXiuGaiGeRenXinXi_DianjiBaoCun);
		var userInfo=$(".editValue").val();
		var isUpdate= userInfo == publicData.itemValue ? false:true;
		//对原有内容有所修改（空或者修改内容）且合法（不超过限制字数）
		if(isUpdate && publicData.textNumLegal && publicData.textError){
			//修改的内容是昵称
			if(publicData.itemIndex == 0){
				userInfo=userInfo.replace(/ /g, "");
				//若用户清空昵称，并点击保存，则浮层提示“昵称不能为空哦~”，并停留在该页面，修改不生效；
				if(userInfo == null || userInfo == ""){
					publicData.errorText = "昵称不能为空哦~";
					$(".fixbg1").text(publicData.errorText);
					$(".fixbg1").css("display","block");
					setTimeout(function(){
						$(".fixbg1").css("display","none");
					},2000);
				}
				//如果用户昵称合法，提交修改
				else{
					me.updateInfo(publicData.itemIndex,userInfo);
				}
			}
			//修改的是职业和所在地
			else{
				me.updateInfo(publicData.itemIndex,userInfo);
			}
			/*leftControl(false,false);*/
		}
	},
	updateInfo:function(itemIndex,itemValue){
		var me = this;
		var updateName="";
		if(itemIndex == 0){
	        updateName="name";
	    }else if(itemIndex == 1){
	        updateName="career";
	    }else if(itemIndex == 2){
	        updateName="area";
	    }
		var host=window.location.protocol+"//"+window.location.host;
		var finalUrl=host+"/v1/api/campStu/updateStudentInfo"+window.location.search+"&"+updateName+"="+itemValue;
		console.info(finalUrl);
		$.ajax({
			type:"get",
			url:finalUrl,
			dataType:"json",
			success:function(data){
				if(data.code == 200){
					//getMessage();
					publicData.hasUpdate = true;
					me.leftControl(false,false);
					me.closePage();
				}else{
					$(".error-main-t").html(data.message);
					$(".errorAlert").css("display","block");
					$(".error-main").css("margin-top",-$(".error-main").height()/2);
				}
			}
		});
	},
	closePage:function(){
		var getPageInfo = function (){
			var data = {
				backNum:1,//默认为1，
				closeWebview:0,//默认为0
			};
			return JSON.stringify(data);
		};
		appFc.deleteHistory(getPageInfo());
		document.documentElement.style.webkitTouchCallout='none';
	},
	//左上角关闭页面时控制返回按钮
	leftControl:function(isHandle,isHidden){
		
		var me = this;
		var getPageInfo = function (){
			var data = {
				iconType:0,
				iconColor:"",
				backNum:1,
				closeWebview:0,
				hidden:isHidden,
				isHandle:isHandle,
				functionName:"getMessage"
			};
			return JSON.stringify(data);
		}
		appFc.controlLeft(getPageInfo());
	},
	getMessage:function(){
		var me = this;
		
		if(publicData.theDevice == "android"){
			$(".editValue").blur();
		}else{
			me.inputBlur();
		}

		var hasContent=$(".editValue").val().length>0 ? true:false;
		var isUpdate=$(".editValue").val() == publicData.itemValue ? false:true;
		//有内容没保存(内容不为空，已经做修改，输入内容合法)
		if(hasContent && isUpdate && publicData.textNumLegal){
			me.leftControl(false,true);
			$(".fixbg").css("display","block");
			$(".fixbg-main-btn1").click(function(){
				setMaiDian(SXiuGaiGeRenXinXi.SCategory_SXiuGaiGeRenXinXi,SXiuGaiGeRenXinXi.SXiuGaiGeRenXinXi_FangQiBaoCun);
				$(".fixbg").css("display","none");
				me.leftControl(false,false);
				me.closePage();
			});
			$(".fixbg-main-btn2").click(function(){
				setMaiDian(SXiuGaiGeRenXinXi.SCategory_SXiuGaiGeRenXinXi,SXiuGaiGeRenXinXi.SXiuGaiGeRenXinXi_QueRenBaoCun);
				$(".fixbg").css("display","none");
				$(".editBtn").click();
			});
		}else{
			me.leftControl(false,false);
			me.closePage();
		}
		
		


		/*if(theDevice == "android"){
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
		}*/
		
	},
	inputBlur:function(){
		$(".editValue").blur();
	},
	render:function (){
		return (
			<div className="container">
				<div className="row content">
					<div className="col-xs-11 col-sm-11">
						<input type="text" className="editValue" defaultValue={publicData.itemValue}/>
						<input type="text" onClick={this.inputBlur} style={{display:"none"}}/>
					</div>
					<div className="col-xs-1 col-sm-1" onClick={this.deleteContent}>
						<img src="image/studentInfo/delete.png" />
					</div>
				</div>
				<div className="editBtn" onClick={this.changeInfo}>
					保存
				</div>
			</div>
		);
	}
})

var SaveInfo = React.createClass({
	render:function (){
		return (
			<aside className="row fixbg">
				<div className="col-xs-12 col-sm-12 fixbg-main">
					<div className="row">
						<div className="col-xs-12 col-sm-12 fixbg-main-t">您输入的信息还没有保存，现在要保存吗？</div>
						<div className="col-xs-12 col-sm-12 fixbg-main-btn">
							<div className="row">
								<div className="col-xs-6 col-sm-6 fixbg-main-btn1">放弃</div>
								<div className="col-xs-6 col-sm-6 fixbg-main-btn2">保存</div>
							</div>
						</div>
					</div>
				</div>
			</aside>
		);
	}
})

var ErrorInfo = React.createClass({
	render:function (){
		return (
			<aside className="fixbg1"></aside>
		);
	}
})


var Component = React.createClass({
	render:function (){
		return (
			<div>
				<EditInfo />
				<ErrorInfo />
				<SaveInfo />
				<Public_error />
			</div>
		);
	}
})
ReactDOM.render(
	<Component />,document.getElementById('editInfoMain')
);