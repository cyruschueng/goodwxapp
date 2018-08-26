window.onload = function() {
	/**
	 * 通过IP获得经纬度，再通过经纬度设置弹窗的位置
	 *
	 */


	function PMap() {}

	PMap.prototype = {
		init: function(elem) {

			this.userInfo = [];
			this.idx = 0;
			this.oldIp = null;
			this.markIp = false;    // 用于前后两个IP是否相同
			this.ipData = null;     // 通过IP获取的信息

			this.initHtml(elem);
			this.getUser();
			
		},
		initHtml: function(elem) { // 初始化页面结构
			var con =
				"<div id = 'mapView' class = 'map-view'><div id = 'map' class = 'map-main'></div></div>" +
				"<div class = 'map-info-list'><div id = 'infoList' class = 'info-list'></div></div>";

			elem.innerHTML = con;
		},
		getUser: function() {
			var self = this;
			$.ajax({
				type: "GET",
				url: "http://www.picooc.com/picooc/web_interface/?method=ditu&ver=1",
				success: function(data) {
					var data = JSON.parse(data);
					self.userInfo = data.result;
					self.map || self.initMap();
					self.mapAnime();
				}
			});
			setTimeout(function() {
				self.getUser();
			}, 20000);
			// this.userInfo = testData.result;
			// setInterval(function() {
			// 	this.userInfo = testData.result;
			// }, 10000);
		},
		initMap: function() {
			
			var map = new BMap.Map("map"); 	// 创建Map实例
			var point = new BMap.Point(116.404, 39.915); // 创建点坐标
			map.centerAndZoom(point, 6); 	// 初始化地图,设置中心点坐标和地图级别。
			map.enableScrollWheelZoom(); 	//启用滚轮放大缩小
			map.disableDoubleClickZoom();   // 禁用地图双击放大
			this.map = map;
			this.map.disableScrollWheelZoom();
			this.map.disableDoubleClickZoom();
			this.map.disableDragging();
			this.map.disableKeyboard();
			var self = this;
			this.map.addEventListener("moveend", function(){
				self.marker.setPosition(new BMap.Point(self.data.content.point.x, self.data.content.point.y));
				setTimeout(function(){
					$(".infoBox").slideDown(500);
				}, 500);

			}, false);
			this.map.addEventListener("movestart", function(){
				$(".infoBox").hide();
			}, false);
		},
		mapAnime: function() {   // 控制地图动画
			var self = this;
			self.refreshMap();
			if (this.msit) {
				clearInterval(this.msit);
			}
			this.msit = setInterval(function(){
				if (self.idx >= self.userInfo.length) {
					self.idx = 0;
				}
				self.refreshMap();
			}, 3000);
		},
		refreshMap: function() {

			var ip = this.userInfo[this.idx].ip;
			var self = this;
			$.ajax({
				type: "GET",
				url: "http://api.map.baidu.com/location/ip?ak=YmEShGIK0DjGPQZ3dFb2OvEb&ip="+ ip +"&coor=bd09ll",
				dataType: "jsonp",
				success: function(data){
					if (data.status == 0) {
						self.data = data;
						var p  = new BMap.Point(data.content.point.x, data.content.point.y)
						self.map.panTo(p);
						if (!self.infoBox) {
							self.initBox();
						}
						self.infoBox.setPosition(p);
						self.refreshList();
						self.refreshBox();
						self.idx++;
					} else {
						self.idx++;
						if (self.idx >= self.userInfo.length) {
							self.idx = 0;
						}
						self.refreshMap();
						console.log(data.status);
						return;
					}
				}
			});
		},
		initBox: function() {
			var con = 
				"<div class = 'user-head'>" +
					"<div class = 'user-sex'></div>" + 
				"</div>" +
				"<div class = 'user-name'>aaa</div>" +
				"<div class = 'user-time'></div>" +
				"<span class = 'user-texts'>身体得分</span><div class = 'user-score'></div>" +
				"<span class = 'user-textb'>BMI</span><div class = 'user-bmi'></div>" +
				"<div class = 'user-platform'></div>" +
				"<div class = 'user-new'></div>";
				
			var opts = {
				boxStyle:{
					background:"url('../images/bg.png') no-repeat center top"
					,"background-size": "100%"
					,width: "230px"
					,height: "145px"
				}
				,enableAutoPan: true
			}
			var infoBox = this.infoBox = new BMapLib.InfoBox(this.map, con, opts);
			
			var marker = this.marker = new BMap.Marker(new BMap.Point(116.307852,40.057031));
			this.map.addOverlay(marker);
			infoBox.open(marker);
			marker.enableDragging();

			$(".BMap_noprint").css({
				background: "url('../images/tar.png') no-repeat",
				"background-size": "100%",
				margin: "-1px",
				width: "29px"
			});

			// this.refreshBox();
		},
		refreshBox: function() {
			
			var data = this.userInfo[this.idx];
			var head = data.head_portrait_url,
				sex = data.sex,
				name = data.role_name || "匿名",
				newUser = data.is_new_user,
				platform = data.platform,
				bmi = data.BMI,
				time = data.time,
				score = data.score,
				bm = data.basic_metabolism;
			var parElem = $(".infoBox");
			if (head == "" || !head) {
				head = "../images/default_head.jpg";
			}
			parElem.find(".user-head").css({
				background: "url("+head+")",
				"background-size": "100%"
			});
			if (parseInt(sex)) {
				sex = "../images/m.png";
			} else {
				sex = "../images/w.png";
			}
			parElem.find(".user-sex").css({
				background: "url("+sex+")",
				"background-size": "100%"
			});
			if (platform == "iOS") {
				platform = "../images/ios.png";
			} else {
				platform = "../images/android.png";
			}
			parElem.find(".user-platform").css({
				background: "url("+platform+")",
				"background-size": "100%"
			});
			if (newUser-0) {
				newUser = "../images/new.png";
			} else {
				newUser = "";
			}
			parElem.find(".user-new").css({
				background: "url("+newUser+")",
				"background-size": "100%"
			});
			parElem.find(".user-name").html(name);
			parElem.find(".user-score").html(score);
			parElem.find(".user-bmi").html(bmi);
			time && parElem.find(".user-time").html(time.split(" ")[1]);
		},
		refreshList: function() {
			if ($(".userItem").length == 7) {
				$($(".userItem")[6]).remove();
			}
			var self = this;
			$("#infoList").animate({marginTop: "100px"}, 1000, "swing", function(){
				if (self.idx) {
					var data = self.userInfo[self.idx-1];
				} else {
					var data = self.userInfo[self.userInfo.length-1];
				}
				var head = data.head_portrait_url,
					name = data.role_name || "匿名",
					time = data.time.split(" ")[1];

				if (head == "" || !head) {
					head = "../images/default_head.jpg";
				}
				var con = 
					"<div class = 'userItem'>" +
						"<img class = 'user-head' src='"+head+"'>" +
						"<div class = 'user-name'>"+ name +"</div>" +
						"<div class = 'user-time'>"+ time +"</div>" +
						"<div class = 'user-position'>"+ self.data.content.address +"</div>" +
					"</div>";

				
				if ($(".userItem").length) {
					$("#infoList").css("margin-top", 0);
					$(con).insertBefore($($(".userItem")[0]));
				} else {
					$("#infoList").css("margin-top", 0);
					$("#infoList").append(con);
				}
			});
		}

	};
	window.PMap = PMap;

	$(document).ready(function(){
		//初始化map
		 var elem = document.getElementById('pMap');
		 console.log(elem)
		 var ss = new PMap();
		 ss.init(elem);
	})
};