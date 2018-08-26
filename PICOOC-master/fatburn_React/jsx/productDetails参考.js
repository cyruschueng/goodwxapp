var SShangPinXiangQing={
	SCategory_SShangPinXiangQing:5080100,
	SShangPinXiangQing_YuYueXiaQi:5080101,//预约下期
	SShangPinXiangQing_KaiShouTiXing:5080102,//开售提醒
	SShangPinXiangQing_LiJiGouMai:5080103,//立即购买
	SShangPinXiangQing_ShengJiBanBen:5080104,//升级版本
	SShangPinXiangQing_QuYouZanGouMai:5080105,//去有赞购买
	SShangPinXiangQing_QuXiaoShengJiBanBen:5080106,//取消升级版本
	SShangPinXiangQing_ShangPinXiangQing:5080107,//商品详情
	SShangPinXiangQing_ShangPinPingJia:5080108,//商品评价
	SShangPinXiangQing_KeFuXiTong:5080109,//客服系统
	SShangPinXiangQing_BuNengGouMaiDuoCi:5080110,//不能购买多次
	SShangPinXiangQing_ZhuZhangHaoGouMai:5080111//主账号购买
};
//alert(window.location.href);
//$('.sale .service img').hide().eq(0).show();//默认不显示客服小红点
$(function(){

	if(getParamByUrl('typeSize') == 2){ //100抵300优惠券售卖

	}else{ //燃脂营售卖
		showGoodsStatus();//展示商品信息
	}
});
//此处点击客服系统函数放在$(function(){})外面；
$(".service, .service2, .hdService, .hdService2").unbind("click").click(function () {
    /*setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing,SShangPinXiangQing.SShangPinXiangQing_KeFuXiTong);//客服系统埋点
    goToEaseModChat();*/
});
//去往客服
function goToEaseModChat(){
	/*var deviceType=isMobile();
	if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
        if(getParamByUrl('webver')>1){//正常版本
			if(getParamByUrl("os")=="android"){
				mobileApp.goToEaseModChat();
			}
			else{
				mobileApp.goToEaseModChat.postMessage("");
			}
            //mobileApp.goToEaseModChat();
            $('.sale .service img').hide().eq(0).show(); //客服：不展示小红点
            $('.sale .service2 img').hide().eq(0).show(); //客服：不展示小红点
            $('.huoDong .hdService img').hide().eq(0).show();
            $('.huoDong .hdService2 img').hide().eq(0).show();
        }else{//低版本
            if(getParamByUrl("os")=="iOS"){// 判断如果是ios

                //100抵300
                $('.alertBox2 .hdAlerts2').hide().eq(6).show();//遮罩显示升级
                $('.hdAlerts2 .isUpdate .zanBuGengXinNew').unbind('click').click(function(){
                    setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing,SShangPinXiangQing.SShangPinXiangQing_QuXiaoShengJiBanBen);//取消升级版本
                    $('.alertBox2 .hdAlerts2').hide();//遮罩隐藏
                });
                $('.hdAlerts2 .isUpdate .liJiGengXinNew').unbind('click').click(function(){
                    setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing,SShangPinXiangQing.SShangPinXiangQing_ShengJiBanBen);//版本升级埋点
                    window.location.href = 'https://itunes.apple.com/us/app/picooc/id729928969?mt=8'; //跳转到APP版本升级页面
                });

                //燃脂营售卖
                $('.alertBox .alerts2').hide().eq(4).show();//遮罩显示升级
                $('.alerts2 .isUpdate .cancelNew').unbind('click').click(function(){
                    setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing,SShangPinXiangQing.SShangPinXiangQing_QuXiaoShengJiBanBen);//取消升级版本
                    $('.alertBox .alerts2').hide();//遮罩隐藏
                });
                $('.alerts2 .isUpdate .updataNew').unbind('click').click(function(){
                    setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing,SShangPinXiangQing.SShangPinXiangQing_ShengJiBanBen);//版本升级埋点
                    window.location.href = 'https://itunes.apple.com/us/app/picooc/id729928969?mt=8'; //跳转到APP版本升级页面
                });

            }else if(getParamByUrl("os")=="android"){// 判断如果是android

                //100抵300
                $('.alertBox2 .hdAlerts2').hide().eq(7).show();//遮罩显示
                $('.hdAlerts2 .knowInnerNew').unbind('click').click(function(){
                    $('.alertBox2 .hdAlerts2').hide();//遮罩隐藏
                });

                //燃脂营售卖
                $('.alertBox .alerts2').hide().eq(5).show();//遮罩显示
                $('.alerts2 .forSelfInnerNew').unbind('click').click(function(){
                    $('.alertBox .alerts2').hide();//遮罩隐藏
                });
            }
        }
	}*/
}

//显示客服小红点
function showDot(){
	//alert("展示小红点成功");
	/*$('.sale .service img').hide().eq(1).show(); //客服：展示小红点
	$('.sale .service2 img').hide().eq(1).show(); //客服：展示小红点
	$('.huoDong .hdService img').hide().eq(1).show();
	$('.huoDong .hdService2 img').hide().eq(1).show();*/
}
/*后台获取数据*/
function showGoodsStatus(){
	var finalUrl=ajaxLink +"/v1/api/campGoods/getGoodsInfo"+window.location.search;//获取商品信息
	$.ajax({
		type: "get",
		url: finalUrl,
		dataType:"json",
		success : function (data) {

				if(data.result.code == 200){
					var goodsId = data.resp.id;//当前商品id
					var nextId = data.resp.nextId;//下一个商品的id
					console.log('本期商品id='+goodsId,'下期商品id='+nextId);
					//"2016-11-16 14:00:00"
					//var saleTimeArr1 = data.resp.saleTime.split(' ')[0].split('-');
					//var saleTimeArr2 = data.resp.saleTime.split(' ')[1].split(':');
					//var beginTimeArr = data.resp.beginTime.split('-'); //开营时间



					//$('.new-price').html(data.resp.curentPrice); //商品现价
					//$('.old-price2').html(data.resp.originPrice); //商品原价
					/*if(data.resp.isCamp && getParamByUrl("refer")=="false"){  //判断是续营人员
						$('.times .num').html(data.resp.stock); // 商品真实库存
					}else{ //不是续营人员
						$('.times .num').html(data.resp.origin_stock); // 商品原始库存
					}*/
					//$('.info .saleTime .month').html(saleTimeArr1[1]);//开抢：月
					//$('.info .saleTime .day').html(saleTimeArr1[2]);//开抢：日
					//$('.info .saleTime .hour').html(saleTimeArr2[0]);//开抢：时
					//$('.info .saleTime .minute').html(saleTimeArr2[1]);//开抢：分
					//$('.desc .desc1 .content .beginTime .year').html(beginTimeArr[0]);//开营时间:年
					//$('.desc .desc1 .content .beginTime .month').html(beginTimeArr[1]);//开营时间:月
					//$('.desc .desc1 .content .beginTime .day').html(beginTimeArr[2]);//开营时间:日
					//$('.desc .desc1 .content .notice').html(data.resp.good_reminder);//温馨提示
					//$('.desc .desc1 .content h3').html(data.resp.name);//商品名称






					//点击切换tab标签；商品详情--商品评价
					/*$('.tabToggle .aboutTab').eq(0).addClass('tabActive');
					$('.tabToggle .aboutTab').unbind('click').click(function(){
						var index = $(this).index();
						if(index == 0){
							setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing,SShangPinXiangQing.SShangPinXiangQing_ShangPinXiangQing);//商品详情
						}else if(index == 1){
							setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing,SShangPinXiangQing.SShangPinXiangQing_ShangPinPingJia);//商品评价
						}
						$('.tabToggle .aboutTab').removeClass('tabActive').eq(index).addClass('tabActive');
						$('.detailOrComment').hide().eq(index).show();
					});*/

					//判断燃脂营版本
					/*function fatBurnVersion(){
						if(getParamByUrl("os")=="iOS"){// 判断如果是ios
							$('.alertBox .alerts2').hide().eq(0).show();//遮罩显示升级
							$('.alerts2 .isUpdate .cancel').unbind('click').click(function(){
								setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing,SShangPinXiangQing.SShangPinXiangQing_QuYouZanGouMai);//去有赞购买

								window.location.href = data.resp.share.shareUrl;//此处需要修改，跳转到有赞购买；
							});
							$('.alerts2 .isUpdate .updata').unbind('click').click(function(){
								setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing,SShangPinXiangQing.SShangPinXiangQing_ShengJiBanBen);//版本升级埋点
								window.location.href = 'https://itunes.apple.com/us/app/picooc/id729928969?mt=8'; //跳转到APP版本升级页面
							});

						}else if(getParamByUrl("os")=="android"){// 判断如果是android
							$('.alertBox .alerts2').hide().eq(3).show();//遮罩显示升级
							$('.alerts2 .notGengXin').unbind('click').click(function(){
								setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing,SShangPinXiangQing.SShangPinXiangQing_QuYouZanGouMai);//去有赞购买
								window.location.href = data.resp.share.shareUrl;//跳转到有赞购买；
							});
						}
						$('.alerts2 .cancelBg').unbind('click').click(function(){
							setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing,SShangPinXiangQing.SShangPinXiangQing_QuXiaoShengJiBanBen);//取消升级版本
							$('.alertBox .alerts2').hide();//遮罩隐藏
						});
					}
*/
					//预约下期/设置提醒
					// type:0-预约  1-提醒
					/*function AppointmentOrReminder2(type,numA,numB,alerts,aboutId){
						if(getParamByUrl('urlSign') == 1){ //从订单详情跳转到商品详情
							$('.sale .state').hide();
							$('.sale .service').hide();
							$('.sale .service2').show().css('width','100%');
						}else{
							if(data.resp.isAppoinment){
								$('.sale .state').hide().eq(numB).show();
							}else{
								$('.sale .state').hide().eq(numA).show();
								$(".state .stateJs").unbind("click").click(function(){
                                    //判断版本；
                                    if(getParamByUrl('webver') > 1){
										if(type == 0){
											setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing,SShangPinXiangQing.SShangPinXiangQing_YuYueXiaQi);//预约下期埋点
										}else{
											setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing,SShangPinXiangQing.SShangPinXiangQing_KaiShouTiXing);//开售提醒埋点
										}
										$('.sale .state').hide().eq(numB).show();
										$('.alertBox .alerts').eq(alerts).fadeIn(200).delay(2000).fadeOut(200);
										var urlAddAppointment = ajaxLink + '/v1/api/campGoods/getAppointment'+ window.location.search+'&nextId='+aboutId+'&type='+type+'&url='+window.location.protocol+"//"+window.location.host+window.location.pathname;//将用户点击状态返回给后台
										$.ajax({ ////向后台提交数据
											type: "get",
											url: urlAddAppointment,
											dataType:"json",
											success: function(data){
												console.log(3,data);
											}
										});
                                    }else{
										fatBurnVersion();
                                    }
								});
							}
						}
					}*/

					//点击立即购买
					/*function immediatelyBuy(){
						$(".state .state5").unbind("click").click(function(){
							console.log(data.resp.origin_stock,data.resp.stock);
							setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing,SShangPinXiangQing.SShangPinXiangQing_LiJiGouMai);//立即购买埋点
							//if(getParamByUrl('webver') >= 1){   //用于测试
							if(getParamByUrl('webver') > 1){   //版本正常(正式)
								var urlStock = ajaxLink + '/v1/api/campGoods/getGoodsStock' + window.location.search + '&id='+goodsId;//获取商品库存状态
								$.ajax({
									type: "get",
									url: urlStock,
									dataType:"json",
									success: function(data){
										console.log(4,data);
										if(data.result.code == 200){
											console.log('库存data.resp='+data.resp);
											if(data.resp == 1){
												$('.info .infoRight .times').hide().eq(5).show(); //库存：0          有未支付的订单
												$('.alertBox .alerts').eq(2).stop(true).fadeIn(200).delay(2000).fadeOut(200);//已拍完，但还有人未付款
											}else if(data.resp == 2){
												$('.info .infoRight .times').hide().eq(4).show(); //库存：抢光了
												$('.alertBox .alerts').eq(3).stop(true).fadeIn(200).delay(2000).fadeOut(200);//手慢了，名额被抢光啦～
												AppointmentOrReminder2(0,0,1,0,nextId);//状态切换为：预约下期；
											}else if(data.resp == 3 || data.resp == 5){ //3：表示支付成功； 5：提交订单但未支付
												$('.alertBox .alerts2').hide().eq(1).show();//遮罩显示:同一账号只能购买一次哦!请核对参营人员信息～
												$('.alerts2 .knowInner').unbind('click').click(function(){
													setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing,SShangPinXiangQing.SShangPinXiangQing_BuNengGouMaiDuoCi);//不能购买多次燃脂营
													$('.alertBox .alerts2').eq(1).hide();//遮罩隐藏
												});
											}else if(data.resp == 6){//data.resp == 6  //只有主账号才能购买，使用者不能购买
												$('.alertBox .alerts2').hide().eq(2).show();//遮罩显示
												$('.alerts2 .forSelfInner').unbind('click').click(function(){
													setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing,SShangPinXiangQing.SShangPinXiangQing_ZhuZhangHaoGouMai);//主账号购买
													$('.alertBox .alerts2').eq(2).hide();//遮罩隐藏
												});
											}else if(data.resp == 4){//data.resp == 4 正常购买
												delCookie('chooseIndex');//删除选择优惠券时定义的cookie
												window.location.href = absoluteUrl+'confirmOrder.html'+window.location.search; //正常跳转
											}
										}else{
											$(".error-main-t").html(data.result.message);
											$(".errorAlert").css("display","block");
											$(".error-main").css("margin-top",-$(".error-main").height()/2);
										}
									},
									error : function (){
										$(".error-main-t").html("啊哦，您的网络不太给力~");
										$(".errorAlert").css("display","block");
										$(".error-main").css("margin-top",-$(".error-main").height()/2);
									}
								});
							}else{ //版本过低
								fatBurnVersion();
							}
						});
					}*/

					/*//status:商品状态
					var status = data.resp.status;

					if(data.resp.isCamp && getParamByUrl("refer")=="false"){ //如果是续营通道 （填写完调查问卷之后执行下文）
						console.log('续营通道');
						console.log('status',status);
						console.log('webver='+getParamByUrl('webver'));
						if(status !=4 && status !=5){
							$('.info .infoRight .times').hide().eq(3).show(); //库存：当前实际库存
							$('.desc .begin').hide().eq(1).show(); //开营时间：****年**月**日
							if(getParamByUrl('urlSign') == 1){ //从订单详情跳转到商品详情
								$('.sale .state').hide();
								$('.sale .service').hide();
								$('.sale .service2').show().css('width','100%');
							}else{
								$('.sale .state').hide().eq(4).show(); //开售提醒：立即购买
								immediatelyBuy();
							}
						}else if(status == 4){
							$('.info .infoRight .times').hide().eq(4).show(); //库存：抢光了(真正售罄)
							$('.desc .begin').hide().eq(1).show(); //开营时间：****年**月**日
							if(getParamByUrl('urlSign') == 1){ //从订单详情跳转到商品详情
								$('.sale .state').hide();
								$('.sale .service').hide();
								$('.sale .service2').show().css('width','100%');
							}else{
								$('.sale .state').hide().eq(4).show(); //开售提醒：立即购买
								$('.sale .state5').css('backgroundColor','#979797');//（立即购买按钮需要置灰，新增内容！！！！！）
							}
						}else if(status == 5){
							// 商品状态六：售罄(有未支付订单)  status=5;
							$('.info .infoRight .times').hide().eq(5).show(); //库存：0
							$('.desc .begin').hide().eq(1).show(); //开营时间：****年**月**日
							if(getParamByUrl('urlSign') == 1){ //从订单详情跳转到商品详情
								$('.sale .state').hide();
								$('.sale .service').hide();
								$('.sale .service2').show().css('width','100%');
							}else{
								$('.sale .state').hide().eq(4).show(); //开售提醒：立即购买
								$('.alertBox .alerts').eq(2).fadeIn(200).delay(2000).fadeOut(200);//已拍完，但还有人未付款
								$(".state .state5").unbind("click").click(function(){
                                    setMaiDian(SShangPinXiangQing.SCategory_SShangPinXiangQing,SShangPinXiangQing.SShangPinXiangQing_LiJiGouMai);//立即购买埋点
									$('.alertBox .alerts').eq(2).stop(true).fadeIn(200).delay(2000).fadeOut(200);//已拍完，但还有人未付款
								});
							}
						}
					}else{//不是续营通道
						console.log('非续营通道');
						console.log('status',status);
						console.log('webver='+getParamByUrl('webver'));
						if(status == 0){
							//商品状态一：未开售（相对常见的状态） status=0;
							$('.info .infoRight .times').hide().eq(0).show();//下期开售时间：待定
							$('.desc .begin').hide().eq(0).show(); //开营时间：待定
							//AppointmentOrReminder(goodsId,0,0,1,0); //预约下期/已预约（需要判断）
							AppointmentOrReminder2(0,0,1,0,'');
						}else if(status == 1){
							// 商品状态二：预热（开售前N天） status=1;
							$('.info .infoRight .times').hide().eq(1).show();//库存60席：09月22日10:00开抢
							$('.desc .begin').hide().eq(1).show(); //开营时间：****年**月**日
							//AppointmentOrReminder(goodsId,1,2,3,1);//设置开售提醒/已提醒（需要判断）
							AppointmentOrReminder2(1,2,3,1,'');
						}else if(status == 2){
							// 商品状态三：倒计时（开售前2小时） status=2;
							timeDiffer(data.resp.nowDate, data.resp.saleTime);
							$('.info .infoRight .times').hide().eq(2).show();//库存60席：“距开抢**：**：**”，倒计时2小时，实时刷新；
							$('.desc .begin').hide().eq(1).show(); //开营时间：****年**月**日
							//AppointmentOrReminder(goodsId,1,2,3,1);//设置开售提醒/已提醒（需要判断）
							AppointmentOrReminder2(1,2,3,1,'');
						}else if(status == 3){
							// 商品状态四：开售  status=3;
							$('.times .num').html(data.resp.stock); // 开售的时候显示商品真实库存
							$('.info .infoRight .times').hide().eq(3).show(); //库存：当前实际库存
							$('.desc .begin').hide().eq(1).show(); //开营时间：****年**月**日
							if(getParamByUrl('urlSign') == 1){//从订单详情跳转到商品详情
								$('.sale .state').hide();
								$('.sale .service').hide();
								$('.sale .service2').show().css('width','100%');
							}else{
								$('.sale .state').hide().eq(4).show(); //开售提醒：立即购买
								immediatelyBuy();
							}

						}else if(status == 4){
							// 商品状态五：售罄  status=4;
							$('.info .infoRight .times').hide().eq(4).show(); //库存：抢光了
							$('.desc .begin').hide().eq(1).show(); //开营时间：****年**月**日
							//AppointmentOrReminder(goodsId,0,0,1,0);  //预约下期/已预约（需要判断） //看运营配置的下一期商品，待定!!!!!!
							AppointmentOrReminder2(0,0,1,0,nextId);
						}else if(status == 5){
							// 商品状态六：售罄(有未支付订单)  status=5;
							$('.info .infoRight .times').hide().eq(5).show(); //库存：0
							$('.desc .begin').hide().eq(1).show(); //开营时间：****年**月**日
							if(getParamByUrl('urlSign') == 1){//从订单详情跳转到商品详情
								$('.sale .state').hide();
								$('.sale .service').hide();
								$('.sale .service2').show().css('width','100%');
							}else{
								$('.sale .state').hide().eq(4).show(); //开售提醒：立即购买
								$('.alertBox .alerts').eq(2).fadeIn(200).delay(2000).fadeOut(200);//已拍完，但还有人未付款
								$(".state .state5").unbind("click").click(function(){
									//$('.alertBox .alerts').eq(2).stop(true).fadeIn(200).delay(2000).fadeOut(200);//已拍完，但还有人未付款
									immediatelyBuy();//点击立即购买，此时需要重新判断库存；
								});
							}
						}
					}*/
				}else{
					/*$(".error-main-t").html(data.result.message);
					$(".errorAlert").css("display","block");
					$(".error-main").css("margin-top",-$(".error-main").height()/2);*/
				}
			/*}
			 else{
			 //if中的内容复制过来
			 }*/



            /*//右上角
			var iconUrl = "";
			var iconShare = ["https://cdn2.picooc.com/web/res/event/chrome/android_share.png", "https://cdn2.picooc.com/web/res/event/chrome/ios_share.png"];
			if (getParamByUrl("os") == "android") {
				iconUrl = iconShare[0];
			}
			else {
				iconUrl = iconShare[1];
			}
            var getPageInfo = function (){
                var data3 = {
                    iconType:0,//0走图片逻辑，1走文案逻辑
                    rightStr:{
                        str:"",
                        color:"",
                        opacity:"",
                        id:"0"
                    },
                    rightIcon:[
                        {
                            type:"1",//调用客户端方法
                            id:"1",
                            functionName:"",
                            iconUrl:iconUrl,
                            iconName:"分享",
                            redDotType:"1",
                            redDotShow:false,
                            redDotNum:"0",
                            nativeType:"0",//分享
                            content:{
                                shareTitle:data.resp.share.shareTitle,
                                shareUrl:data.resp.share.shareUrl,
                                shareIcon:data.resp.share.shareIcon,
                                shareDesc:data.resp.share.shareDesc,
                                shareTag:data.resp.share.shareTag,
                                shareType:"0",
                                shareBackgroundColor:'',
                                shareTypeDesc:"",
                                fatBurnName:''
                            }
                        }
                    ]
                };
                return JSON.stringify(data3);
            };

            var deviceType=isMobile();
            if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
                if(getParamByUrl("os")=="android"){
                    mobileApp.controlRight(getPageInfo());
                }
                else{
                    mobileApp.controlRight.postMessage(getPageInfo());
                }
            }*/

		},
		error : function (){
			/*$(".error-main-t").html(data.message);
			$(".errorAlert").css("display","block");
			$(".error-main").css("margin-top",-$(".error-main").height()/2);*/
		}
	});
}
//开售状态：预约或提醒
//goodsId：商品Id
// type:0-预约  1-提醒
//numA：0-预约下期  2-设置提醒
//numB: 1-已预约  2-已提醒
//alerts：弹出浮层 0-预约成功！ 1-设置提醒成功！
//这个函数暂时不用
/*function AppointmentOrReminder(goodsId,type,numA, numB,alerts){
	var urlStatus = ajaxLink + '/v1/api/campGoods/appointmentExist' + window.location.search+'&id='+goodsId+'&type='+type; //判断是否预约/提醒
	$.ajax({
		type: "get",
		url: urlStatus,
		dataType:"json",
		success: function(data){
			console.log(2,data);
			if(data.result.code == 200){
				if(data.resp == false){//未预约/未设置提醒
					console.log(11);
					$('.sale .state').hide().eq(numA).show(); ////开售提醒：预约下期//设置提醒
					$(".state .stateJs").unbind("click").click(function(){
						$('.sale .state').hide().eq(numB).show();
						$('.alertBox .alerts').eq(alerts).fadeIn(200).delay(2000).fadeOut(200);
						var urlAddAppointment = ajaxLink + '/v1/api/campGoods/getAppointment'+ window.location.search+'&nextId='+goodsId+'&type='+type+'&url=http://www.baidu.com';//将用户点击状态返回给后台
						$.ajax({ ////向后台提交数据
							type: "get",
							url: urlAddAppointment,
							dataType:"json",
							success: function(data){
								console.log(3,data);
							}
						});
					});
				}else if(data.resp == true){ //已预约/已设置提醒
					console.log(22);
					$('.sale .state').hide().eq(numB).show();
				}
			}else{
				$(".error-main-t").html(data.result.message);
				$(".errorAlert").css("display","block");
				$(".error-main").css("margin-top",-$(".error-main").height()/2);
			}

		},
		error : function (){
			$(".error-main-t").html("啊哦，您的网络不太给力~");
			$(".errorAlert").css("display","block");
			$(".error-main").css("margin-top",-$(".error-main").height()/2);
		}
	});
}*/

//获取时间差
//timeDiffer("2016-11-14 10:00:00", "2016-11-14 10:00:10");
function timeDiffer(nowTime, endTime) {
	/*if(getParamByUrl("os")=="iOS"){// 判断如果是ios，显示2016/11/14的格式；
		endTime = endTime.replace(/-/g,"/");
		nowTime = nowTime.replace(/-/g,"/");
	}else{}
	var intDiff = new Date(endTime) - new Date(nowTime);
	intDiff = parseInt(intDiff/1000);//倒计时总秒数量
	var aboutTimer = window.setInterval(function(){
		if (intDiff > 0) {
			var day = Math.floor(intDiff / (60 * 60 * 24));
			var hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
			var minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
			var second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
			hour = (hour<10?'0':'') + hour;
			minute = (minute<10?'0':'') + minute;
			second = (second<10?'0':'') + second;
			$('#hour').html(hour);
			$('#minute').html(minute);
			$('#second').html(second);
			intDiff--;
		}else if(intDiff == 0){
			$('.swiper-wrapper').empty(); //清空轮播图
			showGoodsStatus();//倒计时为0时，刷新整个页面
			clearInterval(aboutTimer);//清除定时器
		}
	}, 1000);*/
}