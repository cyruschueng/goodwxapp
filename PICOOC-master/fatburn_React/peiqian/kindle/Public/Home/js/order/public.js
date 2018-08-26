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
		$('.order_dialog_cancle').unbind('click').bind('click',function(){
			$('#order_dialogId'+randomId).remove();
		});
		$('.order_dialog_sure').unbind('click').bind('click',function(){
			config.callback();
			$('#order_dialogId'+randomId).remove();
		});
}
//省市地区联动
	cart.selectPlace = (function(){
		var _place =[{'province':'北京','city':['东城区','西城区','崇文区','宣武区','朝阳区','海淀区','丰台区','石景山区','门头沟区','房山区','通州区','顺义区','昌平区','大兴县','密云县','平谷县','怀柔县','延庆县']},
				{'province':'上海','city':['黄浦区','卢湾区','徐汇区','长宁区','静安区','普陀区','闸北区','虹口区','杨浦区','闵行区','宝山区','嘉定区','浦东新区','金山区','松江区','青浦区','南汇区','奉贤区','崇明县']},
				{'province':'天津','city':['和平区','河西区','河东区','红桥区','南开区','河北区','西青区','津南区','北辰区','东丽区','汉沽','宝坻','静海','宁河','武清']},
				{'province':'重庆','city':['江北区','渝中区','江北区','南岸区','九龙坡区','沙坪坝区','北碚区','巴南区','大渡口区']}
					,{'province':'河北','city':['石家庄','唐山','秦皇岛','邯郸','邢台','保定','张家口','承德','沧州','廊坊','衡水']}
					,{'province':'山西','city':['太原','大同','阳泉','长治','晋城','朔州','晋中','运城','忻州','临汾','吕梁']}
					,{'province':'内蒙古','city':['呼和浩特','包头','乌海','赤峰','通辽','鄂尔多斯','呼伦贝尔','巴彦淖尔','乌兰察布','兴安','锡林郭勒','阿拉善']}
					,{'province':'辽宁','city':['沈阳','大连','鞍山','抚顺','本溪','丹东','锦州','营口','阜新','辽阳','盘锦','铁岭','朝阳','葫芦岛']}
					,{'province':'吉林','city':['长春','吉林','四平','辽源','通化','白山','松原','白城','延边']}
					,{'province':'黑龙江','city':['哈尔滨','齐齐哈尔','鸡西','鹤岗','双鸭山','大庆','伊春','佳木斯','七台河','牡丹江','黑河','绥化','大兴安岭']}
					,{'province':'江苏','city':['南京','无锡','徐州','常州','苏州','南通','连云港','淮安','盐城','扬州','镇江','泰州','宿迁']}
					,{'province':'浙江','city':['杭州','宁波','温州','嘉兴','湖州','绍兴','金华','衢州','舟山','台州','丽水']}
					,{'province':'安徽','city':['合肥','芜湖','蚌埠','淮南','马鞍山','淮北','铜陵','安庆','黄山','滁州','阜阳','宿州','巢湖','六安','亳州','池州','宣城']}
					,{'province':'福建','city':['福州','厦门','莆田','三明','泉州','漳州','南平','龙岩','宁德']}
					,{'province':'江西','city':['南昌','景德镇','萍乡','九江','新余','鹰潭','赣州','吉安','宜春','抚州','上饶']}
					,{'province':'山东','city':['济南','青岛','淄博','枣庄','东营','烟台','潍坊','威海','济宁','泰安','日照','莱芜','临沂','德州','聊城','滨州','菏泽']}
					,{'province':'河南','city':['郑州','开封','洛阳','平顶山','焦作','鹤壁','新乡','安阳','濮阳','许昌','漯河','三门峡','南阳','商丘','信阳','周口','驻马店']}
					,{'province':'湖北','city':['武汉','黄石','襄樊','十堰','荆州','宜昌','荆门','鄂州','孝感','黄冈','咸宁','随州','恩施']}
					,{'province':'湖南','city':['长沙','株洲','湘潭','衡阳','邵阳','岳阳','常德','张家界','益阳','郴州','永州','怀化','娄底','湘西']}
					,{'province':'广东','city':['广州','深圳','珠海','汕头','韶关','佛山','江门','湛江','茂名','肇庆','惠州','梅州','汕尾','河源','阳江','清远','东莞','中山','潮州','揭阳','云浮']}
					,{'province':'广西','city':['南宁','柳州','桂林','梧州','北海','防城港','钦州','贵港','玉林','百色','贺州','河池','来宾','崇左']}
					,{'province':'海南','city':['海口','三亚']}
					,{'province':'四川','city':['成都','自贡','攀枝花','泸州','德阳','绵阳','广元','遂宁','内江','乐山','南充','宜宾','广安','达州','眉山','雅安','巴中','资阳','阿坝','甘孜','凉山']}
					,{'province':'贵州','city':['贵阳','六盘水','遵义','安顺','铜仁','毕节','黔西南','黔东南','黔南']}
					,{'province':'云南','city':['昆明','曲靖','玉溪','保山','昭通','丽江','普洱','临沧','文山','红河','西双版纳','楚雄','大理','德宏','怒江','迪庆']}
					,{'province':'西藏','city':['拉萨','昌都','山南','日喀则','那曲','阿里','林芝']}
					,{'province':'陕西','city':['西安','铜川','宝鸡','咸阳','渭南','延安','汉中','榆林','安康','商洛']}
					,{'province':'甘肃','city':['兰州','嘉峪关','金昌','白银','天水','武威','张掖','平凉','酒泉','庆阳','定西','陇南','临夏','甘南']}
					,{'province':'青海','city':['西宁','海东','海北','黄南','海南','果洛','玉树','海西']}
					,{'province':'宁夏','city':['银川','石嘴山','吴忠','固原','中卫']}
					,{'province':'新疆','city':['乌鲁木齐','克拉玛依','吐鲁番','哈密','和田','阿克苏','喀什','克孜勒苏柯尔克孜','巴音郭楞蒙古','昌吉','博尔塔拉蒙古','伊犁哈萨克','塔城','阿勒泰']}
					,{'province':'香港','city':['香港']}
					,{'province':'澳门','city':['澳门']}
					,{'province':'台湾','city':['台北','高雄','基隆','台中','台南','新竹','嘉义']}];
					var len = _place.length;
					function _fillplace(provinceEle,cityEle,reshow){
						//省填充
						var _provincestr ='';
						for (var i = 0; i < len; i++) {
							var _p = _place[i].province;
							_provincestr+='<option value="'+_p+'">'+_p+'</option>';							
						};
						$(provinceEle).html(_provincestr);
						//默认根据第一个省来填充市
						if(reshow  == undefined){
							fillcity(_place[0].city);
						}else {
							for (var i = 0; i < len; i++) {
								var _p = _place[i].province;
								if(_p == reshow.province){
									$(provinceEle).val(_p);
									fillcity(_place[i].city);
									break;
								}
							};
						}					
						$(provinceEle).bind('change',function(){
							var _val = $(this).val();
							for (var i = 0; i < len; i++) {
								if(_val == _place[i].province){
									fillcity(_place[i].city);
									break;
								}
							};
						})
						function fillcity(arr){
							var len = arr.length;
							//市填充
							var _citystr ='';
							for (var i = 0; i < len; i++) {
								var _p = arr[i];
								_citystr+='<option value="'+_p+'">'+_p+'</option>';
							};
							$(cityEle).html(_citystr);
						}
					}
					return {
						place:_place,
						fillPlace:_fillplace
					}
	})();