Picooc.news = {};

Picooc.news.datu = (function(){

	//数据
	function model(data){
		//模拟数据
		//var srcs = ['../images/news-datu.jpg','../images/news-datu.jpg','../images/news-datu.jpg'];
		return data;
	}
	//创建视图
	function createView(data){
		var str ='',
			leftBtn='<span class="news-datu-btn news-datu-btnlef" style="left:200px;" onselectstart="return false"></span>',
			rigBtn ='<span class="news-datu-btn news-datu-btnrig" style="right:200px;" onselectstart="return false"></span>',
			navBtn ="<ul class='news-datu-nav'>";

		var i,len = data.length;
		for(i=0;i<len;i++){
			str+="<div class='news-datu-item' "
				+"	style='background:#fff url("+data[i]+") center 0 no-repeat;left:"+(i*100)+"%'>"
				+"<div class='con-item'></div>"
				+"</div>";
			if(i == 0){
				navBtn+="<li class='news-datu-btnSel'></li>";
			}else{
				navBtn+="<li></li>";	
			}	
		}
		navBtn+='</ul>';

		return leftBtn+str+navBtn+rigBtn;
	}
	//添加逻辑
	function init(con,data){

		var data = model(data),
			view = createView(data);
		con.html(view);

		var btns = $('.news-datu-btn'),
			left = btns.eq(0),
			right = btns.eq(1),
			items = $('.news-datu-item'),
			len = items.length,
			lis = $('.news-datu-nav li');

		//当前第几个大图
		function getIndex(){
			var ind = $('.news-datu-btnSel').index();
			return ind;
		};

		//设置第几个li被选中
		function li(index){
			lis.removeClass();
			lis.eq(index).addClass('news-datu-btnSel');
		}

		//绑定事件
		left.unbind('click').bind('click',_left);
		right.unbind('click').bind('click',_rig);

		function _left(){

			left.unbind('click');
			right.unbind('click');

			var ind = getIndex();

			items.eq(ind).animate({
				left:'100%'
			})

			ind -=1;
			if(ind<0){
				ind = len-1;
			}

			items.eq(ind).css({
				'left':'-100%'
			});
			items.eq(ind).animate({
				left:'0'
			},'1000',function(){
				left.unbind('click').bind('click',_left);
				right.unbind('click').bind('click',_rig);
			})

			li(ind);
		}

		function _rig(){

			left.unbind('click');
			right.unbind('click');

			var ind = getIndex();

			items.eq(ind).animate({
				left:'-100%'
			})

			ind +=1;
			if(ind>=len){
				ind = 0;
			}
			items.eq(ind).css({
				'left':'100%'
			});

			items.eq(ind).animate({
				left:'0'
			},'',function(){
				left.unbind('click').bind('click',_left);
				right.unbind('click').bind('click',_rig);
			})

			li(ind);
		}

	}

	return {
		init:init
	}

})();