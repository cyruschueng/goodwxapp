<!-- 课程介绍 -->
<template>
	<div style="height:1.5rem;background-color:#fff;"></div>
	
	<div class="page-int">
	    <ul class="int-list">
	    	<!-- 标题和详情渲染 -->
	    	<li class="pd-32 bd_b" v-for="list in lists">
	    		<div class="il-left fl"><i></i></div>
	    		<div class="il-right">
		    		<div class="il-tit">{{ list.title }}</div>
		    		<div class="il-p col-999896 fs-30"><p>{{ list.content }}</p></div>
	    		</div>
	    	</li>
	    </ul>
    </div>
</template>


<script>
	export default {
		data (){
			return {
				lists : []
			}
		} ,
		created (){ 
			this.$nextTick(function(){

				//滚动条到顶部
				$('html, body').animate({scrollTop:0}, 1);
				
				//设置标题名
				var setTitleTimer = setTimeout(function(){
					ciwongPlugin.createEvent('SetTitle', [{ source : 2 , title: '课程介绍' }] );
					clearTimeout( setTitleTimer );
				},200);

				//如果没有存在jsonData那么就跳转到首页
				if ( sessionStorage.getItem('jsonData') ) 
				{
					this.lists = JSON.parse( sessionStorage.getItem('jsonData') ).infos ;
				}else
				{
					this.$router.go('/');
				}
			});
		}
	}
</script>