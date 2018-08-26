/**
 * Created by Administrator on 2016/9/24 0024.
 */

var firstUlStr = '';
for(var i = 0; i < bussness.length; i++) {
	//	firstUlStr+='<li class="item_li"><span>'+bussness[i].bussnessName+'</span><span> 追溯商品：<i>'+bussness[i].proNum+'</i>件</span></li>';
	var newstr = '<li class="item_li"><span>' + bussness[i].bussnessName + '</span><span> 追溯商品：<i>' + bussness[i].proNum + '</i>件</span></li>';
	$('#first_ul').append(newstr);
}
//$('#first_ul').html(firstUlStr);

var bh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
document.getElementsByTagName("html")[0].style.height = bh + "px";
//文字滚动
var speed = 30;
//第二轮播；
var slider_div = document.getElementById("slider_div");
var first_ul = document.getElementById("first_ul");
var second_ul = document.getElementById("second_ul");
second_ul.innerHTML = first_ul.innerHTML;
var timer = setInterval('Marquee(slider_div,first_ul)', speed);
slider_div.onmouseover = function() {
	clearInterval(timer)
};
slider_div.onmouseout = function() {
	timer = setInterval("Marquee(slider_div,first_ul)", speed)
};
//第三轮播
var slider_div2 = document.getElementById("slider_div2");
var ul_3 = document.getElementById("ul_3");
var copy_ul = document.getElementById("copy_ul");
copy_ul.innerHTML = ul_3.innerHTML;
var time2 = setInterval("Marquee(slider_div2,ul_3)", speed);
slider_div2.onmouseover = function() {
	clearInterval(time2);
};
slider_div2.onmouseout = function() {
	time2 = setInterval("Marquee(slider_div2,ul_3)", speed)
};
//地图大小固定
var w_h = $('.chinamap .mapouter').width() / $('.chinamap .mapouter').height();
var bili = 740 / 513;
if(w_h > bili) {
	$('.mapwrapper').width($('.chinamap .mapouter').height() * 1.44);
} else {
	$('.mapwrapper').height($('.chinamap .mapouter').width() * 0.7);
}
//点击弹出小框；
var position_div = document.getElementsByClassName("position_div");
for(var k = 0; k < position_div.length; k++) {
	position_div[k].index = k;
	position_div[k].onclick = function(ev) {
		console.log(this.nodeName);
		var nodes = this.childNodes;
		for(var x = 0; x < nodes.length; x++) {
			if(nodes[x].nodeType == 3 && /\s/.test(nodes[x].nodeValue)) {
				nodes[x].parentNode.removeChild(nodes[x]);
			}
		}
		var firstEl = nodes[0].innerHTML;
		var ev = ev || window.event;
		var top = ev.clientY;
		var left = ev.clientX;
		Showtouch_div(top, left, firstEl)
	};
}

function Showtouch_div(t, l, va) {
	var touch_div = document.getElementsByClassName("touch_div")[0];
	touch_div.style.display = "block";
	// touch_div.css({top:t+10,left:l+10});
	touch_div.style.left = l + 10 + "px";
	touch_div.style.top = t + 10 + "px";
	var nodes2 = touch_div.childNodes;
	for(var h = 0; h < nodes2.length; h++) {
		if(nodes2[h].nodeType == 3 && /\s/.test(nodes2[h].nodeValue)) {
			nodes2[h].parentNode.removeChild(nodes2[h])
		}
	}
	nodes2[0].innerHTML = va;
}

function StringBuffer() {
	this._strings_ = new Array();
	this._strings_.length = 0;
}
StringBuffer.prototype.append = function(str) {
	this._strings_.push(str);
};
StringBuffer.prototype.toString = function() {
	return this._strings_.join("");
};
var buffer = new StringBuffer();
for(var n = 0; n < data.length; n++) {
	var name = data[n].name;
	buffer.append("<li>");
	buffer.append("<span class='good'>" + name + "</span>");
	buffer.append("<span class='search' value='" + name + "'>追溯查询</span>");
	buffer.append("</li>");
}

document.getElementById("demo1").innerHTML = buffer.toString();
var demo = document.getElementById("demo");
var demo2 = document.getElementById("demo2");
var demo1 = document.getElementById("demo1");
var deH = demo1.offsetHeight;
demo2.innerHTML = demo1.innerHTML;

function Marquee(demo, demo1) {
	if(demo.scrollTop >= deH) {
		demo.scrollTop = 0;
	} else {
		demo.scrollTop++;
	}
}

var MyMar = setInterval("Marquee(demo,demo1)", speed);
var flag = true;
demo.onmouseover = function() {
	clearInterval(MyMar)
};
demo.onmouseout = function() {
	if(flag) {
		MyMar = setInterval("Marquee(demo,demo1)", speed);
	}
};
//    点击变色以及弹出框
var search = document.getElementsByClassName("search");
for(var i = 0; i < search.length; i++) {
	search[i].index = i;
	search[i].onclick = function() {
		flag = false;
		var ind = this.index;
		if(ind >= data.length) {
			ind = ind - data.length;
		}
		var str = "images/yumi_0" + (this.index % 8) + ".jpg"
		$("#images").attr("src", str)
		show(this.index);
		showMask();
		showPopup(ind);
		clearInterval(MyMar)
	}
}
//点击关闭弹出框
document.getElementById("close").onclick = function() {
	flag = true;
	MyMar = setInterval("Marquee(demo,demo1)", speed);
	hideMssk();
	showPopup();
	// hidePopup();
};
//   变色方法
function show(index) {
	for(var j = 0; j < search.length; j++) {
		search[j].style.color = "#fff";
		search[j].style.background = "";
	}
	search[index].style.color = "#333";
	search[index].style.background = '#eed924';
}
//弹出框方法；
function showMask() {
	document.getElementById("mask").style.display = "block";
}

function hideMssk() {
	document.getElementById("mask").style.display = "none";
}

function showPopup(_index) {
	var buffer2 = new StringBuffer();
	var buffer3 = new StringBuffer();
	var buffer4 = new StringBuffer();
	var buffer5 = new StringBuffer();
	var buffer6 = new StringBuffer();
	var popup = document.getElementById("popup");
	$(popup).stop().animate({
		height: "toggle",
		width: "toggle"
	});
	// popup.style.display = "block";
	var good = data[_index];
	buffer2.append("<li>商品名称：" + good.name + "</li><li>品牌：" + good.brand + "</li><li>批次号：" + good.code + "</li><li>生产日期：" + good.productionDate + "</li><li>保质期：" + good.Qualitydate + "</li><li>追溯机构认证代码</li><li>" + good.Authentication + "</li>");

	document.getElementsByClassName("infoItem")[0].innerHTML = buffer2.toString();

	//生产基地
	var productionAdd = good.productionAdd;

	buffer3.append("<li class='f_li'>生产基地</li><li>经营商：" + productionAdd.Distribution + "</li><li>经营户：" + productionAdd.households + "</li><li>蔬菜抽检合格户：" + productionAdd.code + "</li><li>检验日期：" + productionAdd.date + "</li><li>地块信息：" + productionAdd.addinfo + "</li><li>农场信息：" + productionAdd.forminfo + "</li>");

	console.log(buffer3._strings_.length);
	document.getElementById("productionAdd").innerHTML = buffer3.toString();
	console.log(buffer3._strings_);

	var logistics = good.logistics;
	buffer4.append("<li class='f_li'>配送中心</li><li>配送商：" + logistics.Distribution + "</li><li>联系人：" + logistics.person1 + "</li><li>联系电话：" + logistics.phone1 + "</li><li>配送车牌号：" + logistics.carcode + "</li><li>配送联系人：" + logistics.carperson + "</li><li>进场日期：" + logistics.cardate + "</li><li>摊位号：" + logistics.carnum + "</li>");

	document.getElementById("logistics").innerHTML = buffer4.toString();
	var sell = good.sell;
	buffer5.append("<li class='f_li'>零售中心</li><li>零销商:" + sell.Retailer + "</li><li>零销商:" + sell.households + "</li><li>零销商:" + sell.date + "</li><li>零销商:" + sell.code + "</li>");

	document.getElementById("sell").innerHTML = buffer5.toString();

	var store = good.store;
	buffer6.append("<li class='f_li'>注册商家信息</li><li>名称:" + store.name + "</li><li>联系人:" + store.person + "</li><li>联系电话:" + store.phone + "</li><li>联系地址:" + store.addr + "</li>");

	console.log(buffer6.toString());
	document.getElementById("store").innerHTML = buffer6.toString();
}

function hidePopup() {
	document.getElementById("popup").style.display = "none";
}