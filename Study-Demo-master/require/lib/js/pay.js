/**
 * @filename pay.js
 * @filedesc pay.js
 * @authors lq
 * @email 610970478@qq.com
 * @date 2017-08-14 09:45:37
 * @version v3.0
*/
//说明
/*buyId = '',//课程、测评、套餐id
buyName = '',//商品名称
buyImage = '',//商品图片
buyPrice = '',//商品价格
buyType = '',//商品类型 1课程 2测评 3套餐 4道具
payState = '';//购买状态 1已购买 2失败 3成功*/

var prepayId = '';
var interfaceState = 1;
var voucherSetId = getUrlMsg('sid') || '';
var fromMemberId = getUrlMsg('fid') || '';

//生成验证html
function setValidataHtml(buyType,buyId){
	var html = '<div id="validate" class="validate">\
					<div class="topBar"><a href="javascript:;" class="returnBtn returnBtnA"><i class="icon"></i></a>手机验证</div>\
					<div class="valcn">\
						<h1>为了正常使用斑鸠学院的教学服务，请填写手机号以激活你的账号</h1>\
						<p><input type="tel" id="userTel" maxlength="14" placeholder="请输入手机号码" value="" /></p>\
						<p class="p1">\
							<input type="tel" id="verCode" maxlength="4" placeholder="请输入4位动态密码" value="" />\
							<a href="javascript:;" id="getCodeBtn" class="getCodeBtn">获取动态密码</a>\
						</p>\
						<h2 class="hide">动态密码已发送到您的尾号<b></b>的手机号码上，请注意查收</h2>\
						<a href="javascript:;" id="complateBtn" class="complateBtn">完成</a>\
					</div>\
				</div>';
	$('body').append(html);

	//倒计时
	var time = '',
		timer = '',
		yzmAct = 1;
	function setTimeout(){
		time = 60;
		timer = setInterval(function(){
			time--;
			if(time <= 0){
				time = 0;
				yzmAct = 1;
				clearInterval(timer);
				$('#getCodeBtn').html('获取动态密码');	
			}else{
				yzmAct = 2;
				$('#getCodeBtn').html(time+'S');	
			}
		},1000);
	}
	
	//获取动态密码
	$('#getCodeBtn').click(function() {
		if(yzmAct == 1){
			userTel = $('#userTel').val();
			if(userTel === ''){
				showToast('请输入手机号码');
				return false;
			}
			if(!telReg.test(userTel)){
				showToast('手机号码格式不正确，请重新输入');
				return false;
			}
			var data = {phone:userTel, flag: 5};
			yzmAct = 2;
			$.ajax({
		        type : 'get',
		        url : url1+'v7/member/sendCode.shtml',
		        data : data,
		        dataType : 'jsonp',
		        jsonp : "callback",
		        success : function(json) {
		            //console.log(json);
					if(json.status === 200){
						setTimeout();
						$('.valcn h2').removeClass('hide');
						$('.valcn h2 b').html(userTel.slice(7,userTel.length));
					}else{
						clearInterval(timer);
						time = 60;
						$('#getCodeBtn').html('获取动态密码');
						showToast(json.message);
					}
					yzmAct = 1;
		        }
		    });
		}else{
			showToast('请勿重复获取');
		}
	});

	var subAct = 1,//提交状态
		userTel = '',//手机号码
		telReg = /^0?1[3|4|5|8][0-9]\d{8}$/;//号码正则
	$('#complateBtn').click(function() {
		if(subAct === 1){
			userTel = $('#userTel').val();
			var verCode = $('#verCode').val();
			if(userTel === ''){
				showToast('请输入手机号码');
				return false;
			}
			/*if(!telReg.test(userTel)){
				showToast('手机号码格式不正确');
				return false;
			}*/
			if(verCode === ''){
				showToast('请输入动态密码');
				return false;
			}
			var channelCode = getUrlMsg('channelCode') || '';

			var data = {phone:userTel,code:verCode,channelCode:channelCode};
			if(buyType == 1){
				data.courseId = buyId;
			}else if(buyType == 2){
				data.testPaperId = buyId;
			}else if(buyType == 3){
				data.packageId = buyId;
			}else if(buyType == 4){
				data.goodsId = buyId;
			}
			subAct = 2;
			$.post(url1+'v10/member/login.shtml',data,function(json){
				console.log(json);
				var buyName,buyImage,buyPrice,buyRemark,buyMemberId;
				if(json.status === 200){
					$('#validate').addClass('hide');
					buyName = json.result.name || '';
					buyImage = json.result.image || '';
					buyPrice = json.result.price || '';
					buyRemark = json.result.remark || '';
					buyMemberId = json.result.memberId || '';
					setConfirmHtml(buyImage,buyName,buyPrice,buyRemark,buyType,buyId,buyMemberId);
					if(json.result.isNew == 1 && voucherSetId != '' && fromMemberId != ''){
						console.log('zhixing');
						fissionInviteCount(voucherSetId,fromMemberId,buyMemberId,1);
					}
				}else if(json.status === 100){
					setBuyTipHtml(1,buyType);
				}else{
					showToast(json.message);
				}
				clearInterval(timer);
				time = 60;
				$('#getCodeBtn').html('获取动态密码');
				$('#userTel,#verCode').val('');
				yzmAct = 1;
				subAct = 1;
			},'json');
		}else{
			showToast('请勿重复提交');
		}
	});

	$('.returnBtnA').click(function(event) {
        $('#buyBtn,.container').removeClass('hide');
        $('#validate').remove();
        clearInterval(timer);
        time = 60;
        $('#getCodeBtn').html('获取动态密码');
        $('#userTel,#verCode').val('');
        yzmAct = 1;
        subAct = 1;
    });
};

//生成确认html
function setConfirmHtml(buyImage,buyName,buyPrice,buyRemark,buyType,buyId,buyMemberId){
	$('#confirm').remove();
	var remark = ''
	buyRemark != '' ? remark = '备注：'+buyRemark : '';
	//<li id="zfbPayBtn"><i class="zfb icon"></i><b>使用支付宝支付</b><u class="icon"></u></li>
	var html = '<div id="confirm" class="confirm">\
			<div class="topBar"><a href="javascript:;" class="returnBtn returnBtnB"><i class="icon"></i></a>确认购买</div>\
			<div class="concn">\
				<div class="conImg"><img data-src="" src="'+buyImage+'" /></div>\
				<div class="conMsg"><h1>'+buyName+'</h1><h2>实付金额：<b id="buyPrice">'+buyPrice+'</b></h2><p>'+remark+'</p></div>\
			</div>\
			<div class="conBtn">\
				<ul>\
					<li id="wxPayBtn"><i class="wx icon"></i><b>使用微信支付</b><u class="icon"></u></li>\
				</ul>\
			</div>\
		</div>';
	$('body').append(html);
	payEvent(buyType,buyId,buyMemberId,buyName,buyPrice);

	$('.returnBtnB').click(function(event) {
	    $('#confirm').remove();
	    $('#validate').removeClass('hide');
	});
};

//生成购买提示Html(payState:1已购买 2失败 3成功 buyType 1课程 2测评 3套餐 4商品)
function setBuyTipHtml(payState,buyType,buyId,buyMemberId,buyName,buyPrice){
	$('#buyTip').remove();
	var buyTipTit = '',
		buyTipTxt = '',
		buyBtnName = '',
		buyBtnClass = '',
		buyBtnClassA = '';
	if(buyName != ''){
		var name = '《'+buyName+'》';
	}else{
		var name = '';
	}
	if(payState == 1){
		buyTipTit = '温馨提示';
		buyBtnClass = 'popDownBtn';
		buyBtnClassA = 'openOrDownBtn';
		buyBtnName = '下载APP开始学习';
		if(buyType == 1){
			buyTipTxt = '系统检测到你已购买过该课程，请打开斑鸠APP并登录，在【我的】»【我的课程】中查看您已购买的课程。';
		}
		if(buyType == 2){
			buyTipTxt = '系统检测到你已购买过该测试题，请打开斑鸠APP并登录，在【我的】»【我的职测】中查看您已购买的测评。';
		}
		if(buyType == 3){
			buyTipTxt = '系统检测到你已购买过该套餐，请打开斑鸠APP并登录，在【我的】中查看您已购买的课程或测评。';
		}
	}
	if(payState == 2){
		buyTipTit = '支付失败';
		buyTipTxt = '未支付成功，请尝试重新支付';
		buyBtnName = '确定';
		buyBtnClass = 'popSureBtn';
		buyBtnClassA = '';
	}
	if(payState == 3){
		buyTipTit = '支付成功';
		buyBtnClass = 'popDownBtn';
		buyBtnClassA = 'openOrDownBtn';
		buyBtnName = '下载APP开始学习';
		if(buyType == 1){
			buyTipTxt = '您已成功支付'+buyPrice+'元购买课程'+name+'，为了有更好的观看体验，请下载斑鸠APP并登录，在【我的】»【我的课程】中查看您已购买的课程。';
		}
		if(buyType == 2){
			buyTipTxt = '您已成功支付'+buyPrice+'元购买测试题'+name+'，为了有更好的测评效果与便于查看报告，请下载斑鸠APP并登录，在【我的】»【我的职测】中查看您已购买的测评。';
		}
		if(buyType == 3){
			buyTipTxt = '您已成功支付'+buyPrice+'元购买套餐'+name+'，为了有更好的观看体验，请下载斑鸠APP并登录，在【我的】中查看您已购买的课程或测评。';
		}
		if(buyType == 4){
			buyTipTxt = '您已成功支付'+buyPrice+'元购买商品'+name+'，为了有更好的体验，请下载斑鸠APP并登录，在【我的】»【我的背包】中查看您已购买的商品。';

		}
	}

	var html = '<div id="buyTip" class="buyTip">\
					<div class="buyTipcn">\
						<div class="buyTipTit">'+buyTipTit+'</div>\
						<div class="buyTipTxt">'+buyTipTxt+'</div>\
						<a href="javascript:;" id="'+buyBtnClass+'" class="'+buyBtnClass+ ' '+buyBtnClassA+'">'+buyBtnName+'</a>\
					</div>\
				</div>';
	$('body').append(html);

	//重新支付
	$('#popSureBtn').click(function(event) {
		if(isWechat()){
			if(interfaceState == 1){
				publicPay(interfaceState,buyType,buyId,buyMemberId,buyName,buyPrice);
			}else{
				showToast('请勿重复支付');
			}
		}else{
			if(interfaceState == 1){
				if(device == 'h5'){
					scanCodePay(interfaceState,buyType,buyId,buyMemberId,buyName,buyPrice);
				}else{
					$('#buyTip').remove();
					h5Pay(interfaceState,buyType,buyId,buyMemberId,buyName,buyPrice);
				}
			}else{
				showToast('请勿重复支付');
			}
		}
	});

	/*var data =  OpenInstall.parseUrlParams();
    new OpenInstall({
        appKey : "dqohdc",    
        preferWakeup:true,
        onready : function() {
            var m1 = this; 
	        $('.popDownBtn').click(function(event) {
	            m1.wakeupOrInstall({timeout:500});
	        });
        }
    }, data);*/

	//wakeupOrInstall('.popDownBtn');

	//下载app
	$('#popDownBtn').click(function(event) {
		if(device == 'h5'){
			scanCodeDown();
		}
	});
};

//生成扫描支付Html
function setPayQrCodeHtml(buyType,buyId,buyMemberId,buyName,buyPrice){
	$('#payQrCode').remove();
	var html = '<div id="payQrCode" class="payQrCode">\
					<div class="payQrcn">\
						<h1>微信支付</h1>\
						<div id="payQrImg" class="payQrImg">\
							<div class="payLogo"></div>\
						</div>\
						<p>请使用<b>【微信->扫一扫】</b>完成支付</p>\
						<h2>\
							<a href="javascript:;" id="againPayBtn" class="againPayBtn">重新支付</a>\
							<a href="javascript:;" id="complatePayBtn" class="complatePayBtn">完成支付</a>\
						</h2>\
					</div>\
				</div>';
	$('body').append(html);
	payEvent(buyType,buyId,buyMemberId,buyName,buyPrice);
};

//公众号支付(buyType 1课程 2测评 3套餐 4商品)
function publicPay(interfaceState,buyType,buyId,buyMemberId,buyName,buyPrice){
	var code = getUrlMsg('code') || '';
	var data = {code: code, memberId: buyMemberId};
	if(buyType == 1){
		data.courseId = buyId;
	}else if(buyType == 2){
		data.testPaperId = buyId;
	}else if(buyType == 3){
		data.packageId = buyId;
	}else if(buyType == 4){
		data.goodsId = buyId;
	}
	interfaceState = 2;
	$.post(url1+'v13/weixinOA/prepayOrder.shtml',data,function(json) {
		console.log(json);
		if(json.status == 200){
			var payData = {
				"appId":json.result.appId,//公众号名称，由商户传入     
				"timeStamp":json.result.timeStamp,//时间戳，自1970年以来的秒数     
				"nonceStr":json.result.nonceStr, //随机串     
				"package": "prepay_id="+json.result.package,     
				"signType":"MD5",  //微信签名方式：     
				"paySign":json.result.paySign //微信签名 
			};
			prepayId = json.result.package;
			WeixinJSBridge.invoke('getBrandWCPayRequest',payData,function(res){
				if(res.err_msg == "get_brand_wcpay_request:ok") {
					valPublicPay(3,buyType,buyId,buyMemberId,buyName,buyPrice,prepayId);
                }else if(res.err_msg == "get_brand_wcpay_request:cancel") {
                    showToast("用户取消支付!");
                }else if(res.err_msg == "get_brand_wcpay_request:fail"){
                	setBuyTipHtml(2,buyType,buyId,buyMemberId,buyName,buyPrice,prepayId);
                }else{
                	showToast(res.err_msg || res.errMsg);
                }
                interfaceState = 1;
		    }); 
		}else{
			showToast(json.message || '支付失败');
			interfaceState = 1;
		}
	},'json');
}

//验证公众号支付是否成功(buyType 1课程 2测评 3套餐 4商品)
function valPublicPay(payState,buyType,buyId,buyMemberId,buyName,buyPrice,prepayId){
	var data = { prepayId: prepayId, memberId: buyMemberId};
	if(buyType == 1){
		data.courseId = buyId;
	}else if(buyType == 2){
		data.testPaperId = buyId;
	}else if(buyType == 3){
		data.packageId = buyId;
	}else if(buyType == 4){
		data.goodsId = buyId;
	}
	$.post(url1+'v13/weixinOA/reportApp.shtml',data,function(json) {
		console.log(json);
		if(json.status == 200){
			setBuyTipHtml(3,buyType,buyId,buyMemberId,buyName,buyPrice);
			if(voucherSetId != '' && fromMemberId != ''){
				fissionInviteCount(voucherSetId,fromMemberId,buyMemberId,2);
			}
			/*if(buyType == 2){
				validataTestBuySuc(buyId,buyMemberId);
			}*/
		}else{
			setBuyTipHtml(2,buyType,buyId,buyMemberId,buyName,buyPrice);
		}
	},'json');
}

//扫码支付(1课程 2测评 3套餐 4商品)
function scanCodePay(interfaceState,buyType,buyId,buyMemberId,buyName,buyPrice){
	var scanPayData = { memberId: buyMemberId};
	if(buyType == 1){
		scanPayData.courseId = buyId;
	}else if(buyType == 2){
		scanPayData.testPaperId = buyId;
	}else if(buyType == 3){
		scanPayData.packageId = buyId;
	}else if(buyType == 4){
		scanPayData.goodsId = buyId;
	}
	interfaceState = 2;
	$.post(url1+'v13/weixinScan/prepayOrder.shtml',scanPayData,function(json) {
		console.log(json);
		if(json.status == 200){
			if(json.result.code_url != undefined){
				prepayId = json.result.package;
				makeQrCode(json.result.code_url);
				$('#scanCodePay').remove();
				setPayQrCodeHtml(buyType,buyId,buyMemberId,buyName,buyPrice);
				interfaceState = 1;
			}
		}else{
			showToast(json.message);
			interfaceState = 1;
		}
	},'json');
}

//验证扫码支付是否成功(1课程 2测评 3套餐 4商品)
function valScanCodePay(buyType,buyId,buyMemberId,buyName,buyPrice,prepayId){
	var data = { prepayId: prepayId, memberId: buyMemberId};
	if(buyType == 1){
		data.courseId = buyId;
	}else if(buyType == 2){
		data.testPaperId = buyId;
	}else if(buyType == 3){
		data.packageId = buyId;
	}else if(buyType == 4){
		data.goodsId = buyId;
	}
	$.post(url1+'v13/weixinScan/reportApp.shtml',data,function(json) {
		console.log(json);
		if(json.status == 200){
			$('#payQrCode').remove();
			setBuyTipHtml(3,buyType,buyId,buyMemberId,buyName,buyPrice);
			if(voucherSetId != '' && fromMemberId != ''){
				fissionInviteCount(voucherSetId,fromMemberId,buyMemberId,2);
			}
			/*if(buyType == 2){
				validataTestBuySuc(buyId,buyMemberId);
			}*/
		}else{	
			showToast('支付失败，请重新支付');
            $('#payQrImg canvas').remove();
			scanCodePay(interfaceState,buyType,buyId,buyMemberId,buyName,buyPrice);
		}
	},'json');
}

//H5(buyType 1课程 2测评 3套餐)
function h5Pay(interfaceState,buyType,buyId,buyMemberId,buyName,buyPrice){
	var h5PayData = {memberId: buyMemberId};
	if(buyType == 1){
		h5PayData.courseId = buyId;
	}else if(buyType == 2){
		h5PayData.testPaperId = buyId;
	}else if(buyType == 3){
		h5PayData.packageId = buyId;
	}else if(buyType == 4){
		h5PayData.goodsId = buyId;
	}
	interfaceState = 2;
	$.post(url1+'v13/weixinH5/prepayOrder.shtml',h5PayData,function(json) {
		console.log(json);
		if(json.status == 200){
			prepayId = json.result.prepay_id;
			setValH5PayHtml(buyType,buyId,buyMemberId,buyName,buyPrice,prepayId);
			window.location.href = json.result.mweb_url;
		}else{
			showToast(json.message);
		}
		interfaceState = 1;
	},'json');
};

//设置验证H5支付是否成功
function setValH5PayHtml(buyType,buyId,buyMemberId,buyName,buyPrice,prepayId){
	$('#payQrCode1').remove();
	var html = '<div id="payQrCode1" class="payQrCode">\
					<div class="payQrcn">\
						<h1>微信支付</h1>\
						<h3>是否完成支付？</h3>\
						<h2>\
							<a href="javascript:;" id="againPayBtn1" class="againPayBtn">重新支付</a>\
							<a href="javascript:;" id="complatePayBtn1" class="complatePayBtn">完成支付</a>\
						</h2>\
					</div>\
				</div>';
	$('body').append(html);	
	payEvent(buyType,buyId,buyMemberId,buyName,buyPrice);
};

//验证H5支付是否成功(1课程 2测评 3套餐)
function valH5Pay(buyType,buyId,buyMemberId,buyName,buyPrice, prepayId){
	var data = { prepayId: prepayId, memberId: buyMemberId};
	if(buyType == 1){
		data.courseId = buyId;
	}else if(buyType == 2){
		data.testPaperId = buyId;
	}else if(buyType == 3){
		data.packageId = buyId;
	}else if(buyType == 4){
		data.goodsId = buyId;
	}
	$.post(url1+'v13/weixinH5/reportApp.shtml',data,function(json) {
		console.log(json);
		if(json.status == 200){
			setBuyTipHtml(3,buyType,buyId,buyMemberId,buyName,buyPrice);
			if(voucherSetId != '' && fromMemberId != ''){
				fissionInviteCount(voucherSetId,fromMemberId,buyMemberId,2);
			}
			/*if(buyType == 2){
				validataTestBuySuc(buyId,buyMemberId);
			}*/
		}else{	
			$('#buyTip').remove();
			setBuyTipHtml(2,buyType,buyId,buyMemberId,buyName,buyPrice);
		}
	},'json');
}

//支付操作
function payEvent(buyType,buyId,buyMemberId,buyName,buyPrice){
	//微信支付
	$('#wxPayBtn').click(function(event) {
		if(isWechat()){
			if(interfaceState == 1){
				publicPay(interfaceState,buyType,buyId,buyMemberId,buyName,buyPrice);
			}else{
				showToast('请勿重复支付');
			}
		}else{
			if(interfaceState == 1){
				if(device == 'h5'){
					scanCodePay(interfaceState,buyType,buyId,buyMemberId,buyName,buyPrice);
				}else{
					h5Pay(interfaceState,buyType,buyId,buyMemberId,buyName,buyPrice);
				}
			}else{
				showToast('请勿重复支付');
			}
		}
	});

	//重新支付
	$('#againPayBtn').click(function(event) {
		$('#payQrImg canvas').remove();
		scanCodePay(interfaceState,buyType,buyId,buyMemberId,buyName,buyPrice);
	});

	//完成支付
	$('#complatePayBtn').click(function(event) {
		valScanCodePay(buyType,buyId,buyMemberId,buyName,buyPrice,prepayId);
	});

	//重新支付
	$('#againPayBtn1').click(function(event) {
		$('#payQrCode1,#buyTip').remove();
		h5Pay(interfaceState,buyType,buyId,buyMemberId,buyName,buyPrice);
	});

	//完成支付
	$('#complatePayBtn1').click(function(event) {
		$('#payQrCode1,#buyTip').remove();
		valH5Pay(buyType,buyId,buyMemberId,buyName,buyPrice,prepayId);
	});
}

//生成二维码
function makeQrCode(link){
	require(['lib/js/qrCode.js'], function(qrCode){
		$("#payQrImg").qrcode({ 
			render : "canvas", //table/canvas
			width : 400, //宽度 
			height : 400, //高度
			text : link //任意内容 
		});
	});
}

//邀请统计
function fissionInviteCount(voucherSetId,fromMemberId,buyMemberId,voucherConditions){
    var url = url1+'v1/events/fission/inviteStatistic';
    var data = {voucherSetId:voucherSetId,memberId:buyMemberId,fromMemberId:fromMemberId,voucherConditions:voucherConditions};
    if(buyMemberId != fromMemberId){
    	ajaxRequest(url,data,function(json){});
    }
};

//验证测评购买是否成功
function validataTestBuySuc(buyId,buyMemberId){
	var url = url1 + 'v7/diggme/test/getCode.shtml';
	var data = {testPaperId:buyId,memberId:buyMemberId};
    jsonpRequest(url,data,function(json){});
}