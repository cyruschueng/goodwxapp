
/**
 * 接口： http://www.picooc.com/index.php?s=/Home/Article/pages/psize/2/p/1 
 * 		psize 为每页的条数 p为页数
 *
 * 返回数据：[
			{
				title: "PICOOC励志达人减肥80斤前后的对比照",
				description: "千呼万唤始出来，今天PICOOC健康小管家为大家揭晓励志大神&quot;freedomcn牛&quot;童鞋减肥80斤前后对比照，和他使用PICOOC秤三个半月前后PICOOC软件截图对比， 小伙伴还等什么，走起吧，速速围观吧~ ",
				titlepic: "/site/Uploads/Picture/2014-10-09/54365878759eb.jpg",
				url: "/index.php?s=/Home/Article/detail/id/23.html",
				time: ""
			},
			{
				title: "几张图读懂，到底什么是科学减肥法",
				description: "今天为大家推荐一张图，让你立刻读懂什么是科学减肥法，包括：什么是最有效的减重方式；减重效果怎样维持；减重效果如何评估；测定身体成分的方法；如何识别减重广告的谎言；10个常见减肥误区；脂肪如何产生如何消除～满满干货，小伙伴们给力走起吧！",
				titlepic: "/site/Uploads/Picture/2014-10-09/5436588f793ff.jpg",
				url: "/index.php?s=/Home/Article/detail/id/22.html",
				time: ""
			}
			]
 * 
 * 新闻列表页 
 */

$(function () {
	
	function newsList() {}
	newsList.prototype = {

		init: function() {

			this.psize = 10;	// 每页多少个
			this.p = 1;			// 到了哪页
			this.loadData();
			this.reg();

			this.isTap = true;  // 判断是否可以点击
		},
		loadData: function() {
			var self = this;
			var url = "http://www.picooc.com/index.php?s=/Home/Article/pages/psize/"+this.psize+"/p/"+this.p;
			$.ajax({
				url: url,
				type: "GET",
				success: function(data){
					// var a = JSON.parse(data);
					self.refresh(data);
					self.p = self.p + 1;

					return false;
				}
			});
		},
		refresh: function(data) {

			var h = "";		// 获得数据后插入的结构
			var ismore = data.ismore;
			var data = data.data;

			for (var i = 0, len = data.length; i < len; i++) {
				var d = data[i],
					title = d.title,
					time = d.date,
					titlepic = d.titlepic,
					description = d.description,
					url = d.url;

				var c = 
					"<div class='news_list_con'>" +
						"<a class = 'news-title-title' href = '"+ url +"'>"+ title +"</a>" +
						"<p class='news_list_data'>"+ time +"</p>" +
						"<div class='news_list_pic'><img src='"+ titlepic +"' alt=''/></div>" +
						"<p class='news_list_p'>"+ description +"</p>" +
						"<a href='"+ url +"' class='more'>阅读更多</a>" +
					"</div>";
				h = h + c;
			}
			$(h).appendTo(".news_list");

			if (ismore) {
				$(".view_more").hide();
			} else {
				$(".view_more").show();
			}
		},
		reg: function() {
			var self = this;
			$(".view_more").tap(function () {
				self.loadData();
			});
		}
	}

	var news = new newsList();
	news.init();


});