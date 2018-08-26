function navBar(data){
	var ulHtml = '<ul class="layui-nav left-nav layui-nav-tree">';
	for(var i=0;i<data.length;i++){
		if(data[i].Spread){
			ulHtml += '<li class="layui-nav-item left-nav-item layui-nav-itemed">';
		}else{
		    ulHtml += '<li class="layui-nav-item left-nav-item">';
		}
		if(data[i].Children != undefined && data[i].Children.length > 0){
			ulHtml += '<a href="javascript:;">';
			if(data[i].Icon != undefined && data[i].Icon != ''){
				if(data[i].Icon.indexOf("icon-") != -1){
					ulHtml += '<i class="iconfont '+data[i].Icon+'" data-icon="'+data[i].Icon+'"></i>';
				}else{
					ulHtml += '<i class="layui-icon" data-icon="'+data[i].Icon+'">'+data[i].Icon+'</i>';
				}
			}
			ulHtml += '<cite>'+data[i].Title+'</cite>';
			ulHtml += '<span class="layui-nav-more"></span>';
			ulHtml += '</a>'
			ulHtml += '<dl class="layui-nav-child">';
			for(var j=0;j<data[i].Children.length;j++){
				ulHtml += '<dd><a href="javascript:;" data-url="'+data[i].Children[j].Href+'">';
				if(data[i].Children[j].Icon != undefined && data[i].Children[j].Icon != ''){
					if(data[i].Children[j].Icon.indexOf("icon-") != -1){
						ulHtml += '<i class="iconfont '+data[i].Children[j].Icon+'" data-icon="'+data[i].Children[j].Icon+'"></i>';
					}else{
						ulHtml += '<i class="layui-icon" data-icon="'+data[i].Children[j].Icon+'">'+data[i].Children[j].Icon+'</i>';
					}
				}
				ulHtml += '<cite>'+data[i].Children[j].Title+'</cite></a></dd>';
			}
		    ulHtml += "</dl>";
		}else{
			ulHtml += '<a href="javascript:;" data-url="'+data[i].Href+'">';
			if(data[i].Icon != undefined && data[i].Icon != ''){
				if(data[i].Icon.indexOf("icon-") != -1){
					ulHtml += '<i class="iconfont '+data[i].Icon+'" data-icon="'+data[i].Icon+'"></i>';
				}else{
					ulHtml += '<i class="layui-icon" data-icon="'+data[i].Icon+'">'+data[i].Icon+'</i>';
				}
			}
			ulHtml += '<cite>'+data[i].Title+'</cite></a>';
		}
	    ulHtml += '</li>';
	}
	ulHtml += '</ul>';
	return ulHtml;
}
