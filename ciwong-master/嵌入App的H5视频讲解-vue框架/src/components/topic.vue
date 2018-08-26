<!-- 题目详情 -->
<template>
	<div class="page">
		<!-- 悬浮置顶标题 -->
		<div class="tip-bt fs-30"></div>
		<!-- 右下角小视屏 -->
		<div class="small-video" style="display: none;"></div>
		

		<!-- 如果还没购买状态 -->
		<!-- 
		<div class="not-buy" style="display: none;">
			<div class="nb-inner">
				<div class="nbi-con bd_b">
					<p>只需 <span>￥159</span> 就可以享有</p>
					<p>【优化指导(高中总复习第2轮)】</p>
					<p>的所有视频。</p>
				</div>
				<div class="nbi-btn clearfix">
					<a href="javascript:void(0)" class="bd_r">稍后再说</a>
					<a href="javascript:void(0)">立即购买</a>
				</div>
			</div>
		</div> 
		-->

		
		<!-- swiper 切换 -->
		<div id="tp">
			<div class="swiper-wrapper"></div>
		</div><!--tp-->


		<!-- 单选题 -->
		<script type="text/html" id="type_1">
			<div class="swiper-slide">
				<div class="item-in">
					<div class="banner" data-child="{{ lists | json }}">
						<div class="banner-in" style="background-image:url( {{ lists.myCover }} )">
							<i v-if="lists.explain_videos && lists.explain_videos.length != 0 && lists.explain_videos[0].video_unique"></i>
						</div>
					</div>
					<div class="tp-title">
						<div class="pd-32 tp-title-in bd_b">
							<div class="tp-num fs-30 col-999896 fl">第<span>{{ lists.sid }}</span>/{{ lists.myAllNum }}题</div>
							<div class="tp-btn fr"><a href="javascript:void(0);" class="i-wont" data-id="{{ lists.version_id }}"></a></div>
						</div>
					</div>
					<div class="bd_b tpdt">
						<div>{{ lists.myBigTitle }}</div>
					</div>
					<div class="bd_b fs-30 tp-bt">
						<div class="pd-32">
							<div class="tp-tit"><div class="fl">{{ lists.sid }} .</div><div v-html="lists.stem"></div></div>
							<div class="topic-time clearfix mt5">
								<i class="fl"></i><span class="fl">{{ lists.explain_videos[0].duration }}</span>
							</div>
						</div>
					</div>
					<ul class="bd_b fs-30 answer-list">
						<li v-for="options in lists.options">
							<i>{{ lists.myOptions[$index] | json}} .</i> <span v-html="options.stem"></span>
						</li>
					</ul>
					<div class="pd-32 tp-site" v-if="lists.ref_info.points.length">
						<div class="tps-tit">考点</div>
						<div class="tps-con mt5">
							<p v-for="points in lists.ref_info.points" v-html="points"></p>
						</div>
					</div>
				</div><!--item-in-->
			</div><!--swiper-slide-->	
		</script>




		
		<!-- 多选题 -->
		<script type="text/html" id="type_2">
			<div class="swiper-slide">
				<div class="item-in">
					<div class="banner" data-child="{{ lists | json }}">
						<div class="banner-in" style="background-image:url( {{ lists.myCover }} )">
							<i v-if="lists.explain_videos && lists.explain_videos.length != 0 && lists.explain_videos[0].video_unique"></i>
						</div>
					</div>
					<div class="tp-title">
						<div class="pd-32 tp-title-in bd_b">
							<div class="tp-num fs-30 col-999896 fl">第<span>{{ lists.sid }}</span>/{{ lists.myAllNum }}题</div>
							<div class="tp-btn fr"><a href="javascript:void(0);" class="i-wont" data-id="{{ lists.version_id }}"></a></div>
						</div>
					</div>
					<div class="bd_b tpdt">
						<div>{{ lists.myBigTitle }}</div>
					</div>
					<div class="bd_b fs-30 tp-bt">
						<div class="pd-32">
							<div class="tp-tit"><div class="fl">{{ lists.sid }} .</div><div v-html="lists.stem"></div></div>
							<div class="topic-time clearfix mt5">
								<i class="fl"></i><span class="fl">{{ lists.explain_videos[0].duration }}</span>
							</div>
						</div>
					</div>
					<ul class="bd_b fs-30 answer-list">
						<li v-for="options in lists.options">
							<i>{{ lists.myOptions[$index] | json}} .</i> <span v-html="options.stem"></span>
						</li>
					</ul>
					<div class="pd-32 tp-site" v-if="lists.ref_info.points.length">
						<div class="tps-tit">考点</div>
						<div class="tps-con mt5">
							<p v-for="points in lists.ref_info.points" v-html="points"></p>
						</div>
					</div>
				</div><!--item-in-->
			</div><!--swiper-slide-->
		</script>





		<!-- 填空题 -->
		<script type="text/html" id="type_3">
			<div class="swiper-slide">
				<div class="item-in">
					<div class="banner" data-child="{{ lists | json }}">
						<div class="banner-in" style="background-image:url( {{ lists.myCover }} )">
							<i v-if="lists.explain_videos && lists.explain_videos.length != 0  && lists.explain_videos[0].video_unique"></i>
						</div>
					</div>
					<div class="tp-title">
						<div class="pd-32 tp-title-in bd_b">
							<div class="tp-num fs-30 col-999896 fl">第<span>{{ lists.sid }}</span>/{{ lists.myAllNum }}题</div>
							<div class="tp-btn fr"><a href="javascript:void(0);" class="i-wont" data-id="{{ lists.version_id }}"></a></div>
						</div>
					</div>
					<div class="bd_b tpdt">
						<div>{{ lists.myBigTitle }}</div>
					</div>
					<div class="bd_b fs-30 tp-bt">
						<div class="pd-32">
							<div class="tp-tit"><div class="fl">{{ lists.sid }} .</div><div v-html="lists.stem"></div></div>
							<div class="topic-time clearfix mt5">
								<i class="fl"></i><span class="fl">{{ lists.explain_videos[0].duration }}</span>
							</div>
						</div>
					</div>
					<div class="pd-32 tp-site" v-if="lists.ref_info.points.length">
						<div class="tps-tit">考点</div>
						<div class="tps-con mt5">
							<p v-for="points in lists.ref_info.points" v-html="points"></p>
						</div>
					</div>
				</div><!--item-in-->
			</div><!--swiper-slide-->
		</script>




		<!-- 完形填空 -->
		<script type="text/html" id="type_4">
			<div class="swiper-slide">
				<div class="item-in">
					<div class="banner" data-child="{{ lists | json }}">
						<div class="banner-in" style="background-image:url( {{ lists.myCover }} )">
							<i v-if="lists.explain_videos && lists.explain_videos.length != 0 && lists.explain_videos[0].video_unique"></i>
						</div>
					</div>
					
					<div class="tp-title">
						<div class="pd-32 tp-title-in bd_b">
							<div class="tp-num fs-30 col-999896 fl">第<span>{{ lists.sid }}</span>/{{ lists.myAllNum }}题</div>
							<div class="tp-btn fr"><a href="javascript:void(0);" class="i-wont" data-id="{{ lists.version_id }}"></a></div>
						</div>
					</div>
					
					<div class="bd_b tpdt">
						<div>{{ lists.myBigTitle }}</div>
					</div>
					
					<div class="bd_b fs-30 tp-bt">
						<div class="pd-32">
							<div class="tp-tit wxTit">
								<div class="fl">{{ lists.sid }} .</div>
								<div v-html="lists.stem"></div>
							</div>
							<div class="topic-time clearfix mt5">
								<i class="fl"></i><span class="fl">{{ lists.explain_videos[0].duration }}</span>
							</div>
						</div>
					</div><!--tp-bt-->

					<div class="pd-32 tp-site" v-if="lists.ref_info.points.length">
						<div class="tps-tit">考点</div>
						<div class="tps-con mt5">
							<p v-for="points in lists.ref_info.points" v-html="points"></p>
						</div>
					</div>
					
					<!-- 占位高度 -->
					<div class="wxtk-height"></div>

				</div><!--item-in-->
				
				<!-- 答案切换 -->
				<div class="answer-wrap">
					<div class="ans-num bd_b"><i class="fr ans-toggle-btn"></i></div>
					<div class="answer-swiper swiper-container">
		                <div class="swiper-wrapper">
		 					<!-- 答案遍历显示 -->
		                    <div class="swiper-slide" v-for="children in lists.children">
		                    	<span class="ans-num-span">{{$index+1}}</span>
		                    	<ul class="ans-num-list">
		                    		<li v-for="options in children.options">
		                    			<div><i>{{ lists.myOptions[$index] | json}} .</i> <span v-html="options.stem" class="an-con"></span></div>
		                    		</li>
		                    	</ul>
		                    </div> 
		                   
		                </div>
		            </div>
		        </div><!--answer-wrap-->
			</div><!--swiper-slide-->
		</script>



		
		<!-- 阅读理解 = 复合题 -->
		<script type="text/html" id="type_5">
			<div class="swiper-slide">
				<div class="item-in">
					<div class="banner" data-child="{{ lists | json }}">
						<div class="banner-in" style="background-image:url( {{ lists.myCover }} )">
							<i v-if="lists.explain_videos && lists.explain_videos.length != 0 && lists.explain_videos[0].video_unique"></i>
						</div>
					</div>
					
					<div class="tp-title">
						<div class="pd-32 tp-title-in bd_b">
							<div class="tp-num fs-30 col-999896 fl">第<span>{{ lists.sid }}</span>/{{ lists.myAllNum }}题</div>
							<div class="tp-btn fr"><a href="javascript:void(0);" class="i-wont" data-id="{{ lists.version_id }}"></a></div>
						</div>
					</div>
					
					<div class="bd_b tpdt">
						<div>{{ lists.myBigTitle }}</div>
					</div>
					
					<div class="fs-30 tp-bt">
		
						<!-- 存放复合题的盒子 -->
						<div class="{{ 'fh-' + ( lists.sid - 1 ) }}"></div>	

						<div class="pd-32">
							<div class="topic-time clearfix mt5">
								<i class="fl"></i><span class="fl">{{ lists.explain_videos[0].duration }}</span>
							</div>
						</div>
					</div><!--tp-bt-->

					<div class="pd-32 tp-site" v-if="lists.ref_info.points.length">
						<div class="tps-tit">考点</div>
						<div class="tps-con mt5">
							<p v-for="points in lists.ref_info.points" v-html="points"></p>
						</div>
					</div>
				</div><!--item-in-->
			</div><!--swiper-slide-->
		</script>
		

		<!-- 复合题型下的小题模板 -->
		<!-- 单选题 -->
		<script type="text/html" id="fh_child_1">
			<div class="bd_b pd-32">
				<div class="tp-tit"><div class="fl">（{{ lists.sid }}）</div><div v-html="lists.stem"></div></div>
				<ul class="fs-30 answer-list">
					<li v-for="options in lists.options">
						<i>{{ lists.myOptions[$index] | json}} .</i> {{ options.stem }}
					</li>
				</ul>
			</div>
		</script>

		<!-- 多选题 -->
		<script type="text/html" id="fh_child_2">
			<div class="bd_b pd-32">
				<div class="tp-tit"><div class="fl">（{{ lists.sid }}）</div><div v-html="lists.stem"></div></div>
				<ul class="fs-30 answer-list">
					<li v-for="options in lists.options">
						<i>{{ lists.myOptions[$index] | json}} .</i> {{ options.stem }}
					</li>
				</ul>
			</div>
		</script>

		<!-- 判断题 -->
		<script type="text/html" id="fh_child_8">
			<div class="bd_b pd-32">
				<div class="tp-tit"><div class="fl">（{{ lists.sid }}）</div><div v-html="lists.stem"></div></div>
				<ul class="bd_b fs-30 answer-list">
					<li>A. √</li>
					<li>B. X</li>
				</ul>
			</div>
		</script>

		<!-- 填空题 -->
		<script type="text/html" id="fh_child_3">
			<div class="bd_b pd-32">
				<div class="tp-tit"><div class="fl">（{{ lists.sid }}）</div><div v-html="lists.stem"></div></div>
			</div>
		</script>

		<!-- 简答题 -->
		<script type="text/html" id="fh_child_6">
			<div class="bd_b pd-32">
				<div class="tp-tit"><div class="fl">（{{ lists.sid }}）</div><div v-html="lists.stem"></div></div>
			</div>
		</script>



		<!-- 解答题 -->
		<script type="text/html" id="type_6">
			<div class="swiper-slide">
				<div class="item-in">
					<div class="banner" data-child="{{ lists | json }}">
						<div class="banner-in" style="background-image:url( {{ lists.myCover }} )">
							<i v-if="lists.explain_videos && lists.explain_videos.length != 0 && lists.explain_videos[0].video_unique"></i>
						</div>
					</div>
					<div class="tp-title">
						<div class="pd-32 tp-title-in bd_b">
							<div class="tp-num fs-30 col-999896 fl">第<span>{{ lists.sid }}</span>/{{ lists.myAllNum }}题</div>
							<div class="tp-btn fr"><a href="javascript:void(0);" class="i-wont" data-id="{{ lists.version_id }}"></a></div>
						</div>
					</div>
					<div class="bd_b tpdt">
						<div>{{ lists.myBigTitle }}</div>
					</div>
					<div class="bd_b fs-30 tp-bt">
						<div class="pd-32">
							<div class="tp-tit"><div class="fl">{{ lists.sid }} .</div><div v-html="lists.stem"></div></div>
							<div class="topic-time clearfix mt5">
								<i class="fl"></i><span class="fl">{{ lists.explain_videos[0].duration }}</span>
							</div>
						</div>
					</div>
					<div class="pd-32 tp-site" v-if="lists.ref_info.points.length">
						<div class="tps-tit">考点</div>
						<div class="tps-con mt5">
							<p v-for="points in lists.ref_info.points" v-html="points"></p>
						</div>
					</div>
				</div><!--item-in-->
			</div><!--swiper-slide-->
		</script>



		
		<!-- 应用题->暂时没有 -->
		<script type="text/html" id="type_7">
			<div class="swiper-slide">
				<div class="item-in">
					<div class="banner" data-child="{{ lists | json }}">
						<div class="banner-in" style="background-image:url( {{ lists.myCover }} )">
							<i v-if="lists.explain_videos && lists.explain_videos.length != 0 && lists.explain_videos[0].video_unique"></i>
						</div>
					</div>
					<div class="tp-title">
						<div class="pd-32 tp-title-in bd_b">
							<div class="tp-num fs-30 col-999896 fl">第<span>{{ lists.sid }}</span>/{{ lists.myAllNum }}题</div>
							<div class="tp-btn fr"><a href="javascript:void(0);" class="i-wont" data-id="{{ lists.version_id }}"></a></div>
						</div>
					</div>
					<div class="bd_b tpdt">
						<div>{{ lists.myBigTitle }}</div>
					</div>
					<div class="bd_b fs-30 tp-bt">
						<div class="pd-32">
							<div class="tp-tit"><div class="fl">{{ lists.sid }} .</div><div v-html="lists.stem"></div></div>
							<div class="topic-time clearfix mt5">
								<i class="fl"></i><span class="fl">{{ lists.explain_videos[0].duration }}</span>
							</div>
						</div>
					</div>
					<dl class="pd-32 bd_b fs-30 tp-an-list">
						<dt>（1）下列说法正确的是（   ）</dt>
						<dd>A. 若一个函数的定义域关于坐标原点对称</dd>
						<dd>B. 若一个函数的定义域关于坐标原点对称</dd>
						<dd>C. 若一个函数的定义域关于坐标原点对称</dd>
					</dl>
					<dl class="pd-32 bd_b fs-30 tp-an-list">
						<dt>（2）下列说法正确的是（   ）</dt>
						<dd>A. 若一个函数的定义域关于坐标原点对称</dd>
						<dd>B. 若一个函数的定义域关于坐标原点对称</dd>
						<dd>C. 若一个函数的定义域关于坐标原点对称</dd>
					</dl>
					<div class="pd-32 tp-site" v-if="lists.ref_info.points.length">
						<div class="tps-tit">考点</div>
						<div class="tps-con mt5">
							<p v-for="points in lists.ref_info.points" v-html="points"></p>
						</div>
					</div>
				</div><!--item-in-->
			</div><!--swiper-slide-->
		</script>

		

		<!-- 判断题 -->
		<script type="text/html" id="type_8">
			<div class="swiper-slide">
				<div class="item-in">
					<div class="banner" data-child="{{ lists | json }}">
						<div class="banner-in" style="background-image:url( {{ lists.myCover }} )">
							<i v-if="lists.explain_videos && lists.explain_videos.length != 0 && lists.explain_videos[0].video_unique"></i>
						</div>
					</div>
					<div class="tp-title">
						<div class="pd-32 tp-title-in bd_b">
							<div class="tp-num fs-30 col-999896 fl">第<span>{{ lists.sid }}</span>/{{ lists.myAllNum }}题</div>
							<div class="tp-btn fr"><a href="javascript:void(0);" class="i-wont" data-id="{{ lists.version_id }}"></a></div>
						</div>
					</div>
					<div class="bd_b tpdt">
						<div>{{ lists.myBigTitle }}</div>
					</div>
					<div class="bd_b fs-30 tp-bt">
						<div class="pd-32">
							<div class="tp-tit"><div class="fl">{{ lists.sid }} .</div><div v-html="lists.stem"></div></div>
							<div class="topic-time clearfix mt5">
								<i class="fl"></i><span class="fl">{{ lists.explain_videos[0].duration }}</span>
							</div>
						</div>
					</div>
					<ul class="bd_b fs-30 answer-list">
						<li>A. √</li>
						<li>B. X</li>
					</ul>
					<div class="pd-32 tp-site" v-if="lists.ref_info.points.length">
						<div class="tps-tit">考点</div>
						<div class="tps-con mt5">
							<p v-for="points in lists.ref_info.points" v-html="points"></p>
						</div>
					</div>
				</div><!--item-in-->
			</div><!--swiper-slide-->
		</script>

	</div><!--page-->
</template>






<script>

	export default {
		data (){
			return {
				allChildData : [] //总 children 数据
			}
		} ,
		created (){
			this.$nextTick(function(){

				//滚动条到顶部
				$('html, body').animate({scrollTop:0}, 1);

				var _that = this ; 

				//设置标题名
				var setTitleTimer = setTimeout(function(){
					ciwongPlugin.createEvent('SetTitle', [{ source : 2 , title: '课程详情'}] );
					clearTimeout( setTitleTimer );
				},200);

				//如果没有存在jsonData那么就跳转到首页
				if ( sessionStorage.getItem('jsonData') ) 
				{


					/*********************************  拼合所有子级数据  *********************************/ 
					var data = JSON.parse( sessionStorage.getItem('jsonData') ) ;
					//合并全部children数据
					var allArr = [];
					for( var i in data.parts ){
						//进行大标题设置
						for( var j in data.parts[i].children ){
							Vue.set( data.parts[i].children[j] , 'myBigTitle' , data.parts[i].module_type_name );
						}
						var allArr = allArr.concat( data.parts[i].children );
					}
					_that.allChildData = allArr ;



					/******************************  根据子级数据渲染对应的模板  **********************************/ 
					//根据每个题型的不一样来进行处理
					var eleStr = '';
					for( var i in _that.allChildData ){
						eleStr += '<div class="type-'+i+'"></div>';
					}
					//把拼接的字符插入到指定的位置
					$('.swiper-wrapper').append( eleStr ) ;

					for( var i in _that.allChildData ){

						//对象新增 [ 页面总值 , ABCD选项 ]
						Vue.set( _that.allChildData[i] , 'myAllNum' , _that.allChildData.length );
						Vue.set( _that.allChildData[i] , 'myOptions' , ['A','B','C','D','E','F','G','H','I'] );

						//判断是否有封面，如果没有就添加默认的
						if (  _that.allChildData[i].explain_videos &&  _that.allChildData[i].explain_videos.length != 0  ) {
							if ( !  _that.allChildData[i].explain_videos[0].cover_url ) {
								Vue.set( _that.allChildData[i] , 'myCover' , 'dist/img/banner.png' );
							}else{
								Vue.set( _that.allChildData[i] , 'myCover' , '../packages/' + _that.allChildData[i].explain_videos[0].cover_url );
							}
						}else{
							Vue.set( _that.allChildData[i] , 'myCover' , 'dist/img/banner.png' );
						}

						switch( _that.allChildData[i].qtype ){	
							case 1 :
								// 单选题;
								new Vue({
									el : '.type-'+i ,
									template : $('#type_1').html() ,
									data : {
										lists : _that.allChildData[i]
									} 
								});
							break ;
							case 2 :
								// 多选题;
								new Vue({
									el : '.type-'+i ,
									template : $('#type_2').html() ,
									data : {
										lists : _that.allChildData[i]
									} 
								});
							break ;
							case 3 :
								// 填空题;
								new Vue({
									el : '.type-'+i ,
									template : $('#type_3').html() ,
									data : {
										lists : _that.allChildData[i]
									} 
								});
							break ;
							case 4 :
								// 完形填空 ;
								new Vue({
									el : '.type-'+i ,
									template : $('#type_4').html() ,
									data : {
										lists : _that.allChildData[i]
									} 
								});
							break ;
							case 5 :
								// 阅读理解=复合题 ;
								new Vue({
									el : '.type-'+i ,
									template : $('#type_5').html() ,
									data : {
										lists : _that.allChildData[i]
									} 
								});

								//复合题的 child
								var fhChild = _that.allChildData[i].children ;
								var childStr = '' ;
								for( var j in fhChild ){
									childStr += '<div class="fh-child-'+i+j+'"></div>';
								}
								//添加到指定的 html 中
								$( '.fh-'+i ).html( childStr );

								for( var j in fhChild )
								{
									Vue.set( fhChild[ j ] , 'myOptions' , ['A','B','C','D','E','F','G','H','I'] );

									switch( fhChild[ j ].qtype )
									{

										case 1 :
											// 单选题
											new Vue({
												el : '.fh-child-'+i+j ,
												template : $('#fh_child_1').html() ,
												data : {
													lists : fhChild[ j ]
												} 
											});
										break ; 
										case 2 :
											// 多选题
											new Vue({
												el : '.fh-child-'+i+j ,
												template : $('#fh_child_2').html() ,
												data : {
													lists : fhChild[ j ]
												} 
											});
										break ; 
										case 8 :
											// 判断题
											new Vue({
												el : '.fh-child-'+i+j ,
												template : $('#fh_child_8').html() ,
												data : {
													lists : fhChild[ j ]
												} 
											});
										break ; 
										case 3 :
											// 填空题
											new Vue({
												el : '.fh-child-'+i+j ,
												template : $('#fh_child_3').html() ,
												data : {
													lists : fhChild[ j ]
												} 
											});
										break ; 
										case 6 :
											// 简答题
											new Vue({
												el : '.fh-child-'+i+j ,
												template : $('#fh_child_6').html() ,
												data : {
													lists : fhChild[ j ]
												} 
											});
										break ; 
									}
								}	

							break ;
							case 6 :
								// 解答题;
								new Vue({
									el : '.type-'+i ,
									template : $('#type_6').html() ,
									data : {
										lists : _that.allChildData[i]
									} 
								});
							break ;
							case 7 :
								// 应用题;
								new Vue({
									el : '.type-'+i ,
									template : $('#type_7').html() ,
									data : {
										lists : _that.allChildData[i]
									} 
								});
							break ;
							case 8 :
								// 判断题;
								new Vue({
									el : '.type-'+i ,
									template : $('#type_8').html() ,
									data : {
										lists : _that.allChildData[i]
									} 
								});
							break ;
						}
					}


					/************************************* swiper 切换 及'我不会'悬浮顶层效果 **************************/ 
					function tipTitle( num ){
						var tipTheTitle = $('.tp-title').eq( num ).html();
						$('.tip-bt').html( tipTheTitle );
						//切换的时候是否要显示标题
						var beyoneHeight =  $('.tp-title').eq( num ).offset().top + $('.tp-title').eq( num ).height() * 3 ;
						if ( $('.item-in').eq( num ).scrollTop() >= beyoneHeight  ) 
						{
							$('.tip-bt').show();
						}else{
							$('.tip-bt').hide();
						}

						//右小角小视屏显示
						if ( $('.item-in').eq( num ).scrollTop() >= $('.banner').height()  ) 
						{
							$('.small-video').show();
						}else{
							$('.small-video').hide();
						}
					}

					//获取定位页面
					var getPage = sessionStorage.getItem('page') ;
					
					new Swiper('#tp' , {
						initialSlide : getPage ? getPage : 0 ,
						// initialSlide : 6 ,
						onInit : function( swiper ){
							tipTitle( getPage ? getPage : 0 );
							
							//删除page页
							sessionStorage.removeItem('page');

							//播放视频及‘我不会状态’
							videoAndNot();

							//设置video
							$('.small-video').attr('data-child' , JSON.stringify( _that.allChildData[ getPage ? getPage : 0 ] ) );
						} ,
						onTransitionEnd: function(swiper){
						 	tipTitle( swiper.activeIndex );

							//设置video
							$('.small-video').attr('data-child' , JSON.stringify( _that.allChildData[ swiper.activeIndex ] ) );
					    }
					});
					
					//撑开页面高度
					$('.item-in').height( $(window).height() );

					//当滚动条滚动的时候
					var bannerHeight = $('.banner').height() ;
					$('.item-in').on('scroll',function(){
						//‘我不会功能’悬浮
						var beyoneHeight = $(this).find('.tp-title').offset().top + $(this).find('.tp-title').height() * 3 ;
						if( $(this).scrollTop() >= beyoneHeight ){
							$('.tip-bt').show();
						}else{
							$('.tip-bt').hide();
						}

						//右小角小视屏显示
						if ( $(this).scrollTop() >= $('.banner').height()  ) 
						{
							$('.small-video').show();
						}else{
							$('.small-video').hide();
						}
					});


					/*************************** 点击banner 或者小按钮 判断是否有播放权限 *******************************/
					function videoAndNot( ){
						//获取小题数据
						var getDataChild = function( thisJson )
						{
							var data = JSON.parse( thisJson.attr('data-child') );
							if ( data.explain_videos && data.explain_videos.length != 0 && data.explain_videos[0].video_unique ) 
							{
								var obj = { 
									"letv" : data.explain_videos[0].video_unique , 
									"queNum" : data.sid , 
									"quesId" : data.id , 
									"videoTitle" : data.myBlues.videoTitle 
								 }
								ciwongPlugin.createEvent('IsCanOpenVideo' , [{ source : 2 , childData : obj  }] , function(data){
									//如果是yes
									if ( data ) {
										ciwongPlugin.createEvent('OpenVideos' , [{ source : 2 , childData : obj }] );
									}
								});
							}
						}

						$('.page').on('click' ,'.banner' , function(){
							getDataChild( $(this) );
						});
						$('.page').on('click' , '.small-video' , function(){
							getDataChild( $(this) );
						});

						
						//我不会
						$('.page').on('click' , '.i-wont' , function(){
							var _that = this
							var status;
							if ( $(_that).hasClass('current') ) {
								status = 0;
							}else{
								status = 1;
							}

							// ------------------------‘我不会’状态-按钮操作----------------------------
							var questionInfo = $('.swiper-slide.swiper-slide-active').find('.banner').attr('data-child')
							typeof questionInfo !='object' && (questionInfo = JSON.parse(questionInfo))
							// console.log(questionInfo)
							var videoVersion = questionInfo.explain_videos && questionInfo.explain_videos[0] && questionInfo.explain_videos[0].video_ver ? questionInfo.explain_videos[0].video_ver : 0;
							var iWont = JSON.parse( sessionStorage.getItem('iWont') );
							var userIdBase64 = 'Basic ' + window.btoa(iWont.userId+":");
	        				var iWontObject = $('.swiper-slide.swiper-slide-active').find('.i-wont')
	        				var versionId = iWontObject.attr('data-id');
							// iWont = {"cId":"1059684","brandId":524726977,"subjectId":2,"userId":"333975357","packageId":"5314","classId":2994116}	// 测试数据
					        var errorBook = sessionStorage.getItem('errorBook');

							if(status==1){
								// ------------------------添加‘我不会’----------------------------
								if(!iWont || !iWont.brandId || !iWont.packageId || !iWont.userId){
									alert('操作失败，“我不会”参数不全')
									console.error('sessionStorage “我不会”参数不全 iWont:',iWont)
								}else{
									// 提交‘我不会’状态操作
									var settingOptions = {
										userId	:iWont.userId || '',
										serviceId	:0,		// 服务ID (可选 默认：0)
										doWorkId	:0,		// 目前无用,暂填0
										typeId		:1,		// 目前无用,暂填0,错误来源（1.作业 2.自主练习）
										brandId		:parseInt( iWont.brandId ) || '',
										classId		:parseInt( iWont.classId ) || '',
										packageId	:parseInt( iWont.packageId ) || '',
										subjectId	:parseInt( iWont.subjectId ) || '',
										cId 		:iWont.cId || '',
										moduleId	:126,	// 固定的值
										versionId	:$(_that).attr('data-id') || '',
										examId		:JSON.parse( sessionStorage.getItem('jsonData') ).version_id || 0,
										videoVersion:videoVersion,
										qtypeId		:1,		// 固定的值
										resourceName:questionInfo.stem || ''
									}
									// alert('设置‘我不会’ajax参数：settingOptions='+JSON.stringify(settingOptions))
									var url ="http://123.56.154.119:9014/errorbook/set?\
									brandId="		+settingOptions.brandId+"\
									&serviceId="	+settingOptions.serviceId+"\
									&doWorkId="		+settingOptions.doWorkId+"\
									&typeId="		+settingOptions.typeId+"\
									&packageId="	+settingOptions.packageId+"\
									&cId="			+settingOptions.cId+"\
									&moduleId="		+settingOptions.moduleId+"\
									&versionId="	+settingOptions.versionId+"\
									&subjectId="	+settingOptions.subjectId+"\
									&qtypeId="		+settingOptions.qtypeId+"\
									&examId="		+settingOptions.examId+"\
									&classId="		+settingOptions.classId+"\
									&videoVersion="	+settingOptions.videoVersion+"\
									&resourceName="	+settingOptions.resourceName+"\
									";
									// alert('设置‘我不会’ajax参数：url='+url)
									// var userIdBase64 = window.btoa(iWont.userId);
									$('.loading').show();
					    			$.ajax({
					    				type:'GET',
					    		        headers:{
					    		   			Authorization: userIdBase64 //userIdBase64  // 'Basic Og=='
					    		        },
					    		        dataType: 'json',
					    		        url: url,
					    		        success: function(data){
											// alert('设置‘我不会’ajax返回数据：'+JSON.stringify(data))
		        							var json = typeof data != 'object' ? JSON.parse(data) : data;
						        			if((json.errcode==undefined || json.errcode!=0) || !json.data){ console.log(json || '错题载入失败'); return ;}
						        			var qtypeId = json.data.qtypeId;
					        				var iWont = JSON.parse(sessionStorage.getItem('iWont'));
					        				if(!iWont){
					        					alert('错题信息获取失败')
					        					return;
					        				}
					        				var userId = iWont && iWont.userId ? iWont.userId : '';
					        				if(!userId) alert('用户(ID)请求失败')
					        				// alert('userId:'+userId+'\n vid:'+versionId+'\n qtypeId:'+qtypeId+'\n errorBook:'+errorBook)
					    		        	// alert('errorBook:'+sessionStorage.getItem('errorBook'))
					        				if(errorBook && (typeof errorBook != 'object') ) errorBook = JSON.parse(errorBook);
    					        			if(errorBook && errorBook.length>0){
    					        				var isset = false;
    				        					for (var i = 0; i < errorBook.length; i++) {
    						        				if( errorBook[i].versionId == versionId ){
    						        					// errorBook[i].uIds = errorBook[i].uIds+','+userId;
    						        					var temp = errorBook[i].uIds.split(',')
    						        					temp.push(userId)
    						        					errorBook[i].uIds = temp.join(',');
    						        					isset = true;
    						        					break;
    						        				}
    						        			}
    						        			// 原纪录里没有该题纪录
    						        			if(!isset){
    						        				errorBook.push({
    						        					uIds:userId,
    						        					versionId:versionId
    						        				})
    						        			}
    					        			}else{	// 纪录为空
    					        				errorBook = [{
    					        					uIds:userId,
    					        					versionId:versionId
    					        				}];
    					        			}

						        			sessionStorage.setItem('errorBook',typeof errorBook =='string' ? errorBook : JSON.stringify(errorBook))
					    		        	// alert('errorBook本地设置后：'+sessionStorage.getItem('errorBook'))
					    		        	// 显示‘我不会’状态
					    		        	$('.i-wont[data-id="'+ $(_that).attr('data-id') +'"]').addClass('current');
								        },
								        error:function(){
								        	alert('操作失败')
								        },
								        complete:function(){
											$('.loading').hide();
								        }
					    			});
								}
							}else{
								// ------------------------删除本地'我不会'记录----------------------------
				        		var url ="http://123.56.154.119:9014/errorbook/delete_by_Id?brandId="+iWont.brandId+"&versionId=" + versionId;
				        		// alert('删除‘我不会’ajax参数：url='+url)
								$('.loading').show();
				    			$.ajax({
				    				type:'GET',
				    		        headers:{
				    		   			Authorization: userIdBase64
				    		        },
				    		        dataType: 'json',
				    		        url: url,
				    		        success: function(data){
										// alert('删除‘我不会’ajax返回数据：'+JSON.stringify(data))
					        			if(errorBook && (typeof errorBook != 'object') ) errorBook = JSON.parse(errorBook);
				    		        	if(errorBook && errorBook.length>0){
	        		        				for (var i = 0; i < errorBook.length; i++) {
	        					        		var uIds = errorBook[i].uIds.split(',');
	        					        		if( ( errorBook[i].versionId == versionId ) && ( uIds.indexOf(userId)>-1 ) ){
	        					        			uIds.splice(uIds.indexOf(userId),1)
	        					        			errorBook[i].uIds = uIds.join(',')

	        					        			sessionStorage.setItem('errorBook',typeof errorBook =='string' ? errorBook : JSON.stringify(errorBook))
					    		        			// alert('errorBook本地删除后：'+sessionStorage.getItem('errorBook'))
					    		        			$('.i-wont[data-id="'+ $(_that).attr('data-id') +'"]').removeClass('current');
	        					        			return;
	        					        		}
	        		        				}

				    		        	}
							        },
							        error:function(){
							        	alert('操作失败')
							        },
							        complete:function(){
										$('.loading').hide();
							        }
				    			});
							}
							

						});

						// ------------------------显示‘我不会’状态----------------------------
        				var iWont = sessionStorage.getItem('iWont');
						var list = sessionStorage.getItem('errorBook');
        				if(!!iWont && typeof iWont == 'string') iWont = JSON.parse(iWont);
						if(!!list && typeof list == 'string') list = JSON.parse(list);
						var userId = iWont && iWont.userId ? iWont.userId : '';
						$('.swiper-slide').each(function(index){
							var status = 0;	// 状态
							var iWontObject = $(this).find('.i-wont')
							// var iWontObject = $('.swiper-slide.swiper-slide-active').find('.i-wont')
							var versionId = iWontObject.attr('data-id');
							if(list && userId && versionId){
								for (var i = 0; i < list.length; i++) {
									if( ( list[i].versionId == versionId ) && ( list[i].uIds.split(',').indexOf(userId)>-1 ) ){
										status = 1;
									}
								};
							}
							if(status==1){
								iWontObject.addClass('current')
							}else{
								iWontObject.removeClass('current')
							}
						})
					}



					/************************************** 完形填空 swiper 答案切换 ; 点击伸展收齐 **************************************/
					//答案切换
					var anSwiper = new Swiper('.answer-swiper', {
						nested: true , //同步父级切换
						onSlideChangeEnd : function( swiper ){
							$('.swiper-slide-active').find('.wxTit .anTxt').removeClass('bgGreen');
							$('.swiper-slide-active').find('.wxTit .anTxt').eq( swiper.activeIndex ).addClass('bgGreen');
						}
					});
					
					//答案点击展示收起
					$('.ans-num').on('click',function(){
						$(this).parents('.answer-wrap').toggleClass('ans-add');
					});

					//答案选择的时候，把值填入input框中
					$('.ans-num-list li').on('click',function(){
						var anCon = $(this).find('.an-con').html() , //内容
							anConWidth = $(this).find('.an-con').width() , //宽度
							anIndex = parseInt( $(this).parent('ul').siblings('.ans-num-span').html() ) - 1 , //索引
							anIndex2 = parseInt( $(this).parent('ul').siblings('.ans-num-span').html() ) , //索引
							anTxt = $(this).parents('.swiper-slide').find('.anTxt').eq( anIndex ) ; //对应的值
						//填充至input框中
						$(this).addClass('current').siblings('li').removeClass();
						anTxt.val( anIndex2 +'. '+ anCon ).width( anConWidth + 30 ) ;
					});

					//所有'完形填空'的第一个input框默认为绿色
					for( var i = 0 , len = $('.wxTit').length ; i < len ; i++ ){
						$('.wxTit').eq(i).find('.anTxt').first().addClass('bgGreen');
					}


					//点击相应的input框，切换不同的答案显示
					$('.swiper-slide .wxTit').each(function(index){
			 			$(this).parents('.swiper-slide').find('.wxTit .anTxt').click(function(){
							$(this).parents('.wxTit').find('.anTxt').removeClass('bgGreen');
							$(this).addClass('bgGreen');

							//根据点击框来跳转到指定的答案位置
							if( anSwiper[0] ){
								anSwiper[ index ].slideTo( $(this).index() );
							}else{
								anSwiper.slideTo( $(this).index() );
							}

						});
					});

				}else
				{	
					//跳转到首页
					this.$router.go('/');
				}

			});
		} 
	}

</script>