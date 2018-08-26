<!-- 课程详情 -->
<template>
	<div class="page">

		<div class="banner" @click="bannerData( $event )">
			<div class="banner-in" style="background-image:url( {{ jsonData.myBigBanner }} )">
				<i v-if="jsonData.myBigBanner"></i>
			</div>
		</div>


		<div class="pd-32 bd_b det-tit" v-if="jsonData.title">
			<h1>{{ jsonData.title }}</h1>
			<p class="mt20 col-999896" v-if="jsonData.profile">{{ jsonData.profile }}</p>
		</div><!--det-tit-->
		

		<div class="det-nav bd_b" v-if="jsonData.title">
			<div class="clearfix det-nav-1">
				<span class="fl mgl-32">共{{ jsonData.myAllLen }}个课程</span>
				<a class="fr mgr-32 int-btn bd_tlbr" v-link="{ path : '/introduce'}" v-if="jsonData.infos.length">介绍</a>
			</div><!--det-nav-->
			<div class="clearfix bd_b det-nav-2">
				<span class="fl mgl-32">共{{ jsonData.myAllLen }}个课程</span>
				<a class="fr mgr-32 int-btn bd_tlbr" v-link="{ path : '/introduce'}" v-if="jsonData.infos.length">介绍</a>
			</div><!--det-nav-->
		</div>


		<div class="det-con" v-if="jsonData.parts">
			<!-- 大题 -->
			<div class="topic" v-for="parts in jsonData.parts">
				<div class="bd_b dt">
					<span class="big-bt fl">{{ parts.module_type_name }}</span><div class="fr pz-btn up-down-btn"><i></i></div>
				</div>
				
				<div class="dd-wrap">
					
					<!-- 小题 -->
					<div class="bd_b dd clearfix" v-for="children in parts.children">
						<div class="topic-l fl" :class=" children.explain_videos && children.explain_videos.length != 0 && children.explain_videos[0].video_unique ? '' : 'no-video' " @click="topicSp($event)" data-json="{{ children | json }}" data-index="{{ children.sid }}">
							<!-- {{ children.explain_videos | json }} -->
							<!-- <i ></i> -->
						</div>
						<div class="topic-r pz-btn bd_l" @click="topicTm($event)" data-index="{{ children.sid }}">
							<div class="topic-ri pd-32">
								<div class="topic-tit">
									<div class="fl">{{ children.sid }} .</div>
									<div v-html="children.stem"></div>
								</div>
								<div class="topic-time clearfix">
									<i class="fl"></i><span class="fl">{{ children.explain_videos[0].duration }}</span>
								</div>
							</div>
						</div>
					</div>
					<!-- 小题 -->

				</div><!--dd-wrap-->
			</div><!--topic-->
			<!-- 大题 -->
		
		</div><!--det-con-->
		
	</div><!--page-->
</template>

<script>

	export default {
		data (){
			return {
				jsonData : {

				} //总json数据
			}
		} ,
		methods : { 
			//点击大banner触发的事件
			bannerData : function( event ) 
			{ 
				var data = this.jsonData ;

				if ( data.intro_videos && data.intro_videos.length != 0 ) 
				{
					var obj = { 
						"letv" : data.intro_videos[0].video_unique , 
						"queNum" : 0 , 
						"quesId" : data.id , 
						"videoTitle" : data.intro_videos[0].video_filename 
					}
					ciwongPlugin.createEvent('OpenVideo' , [{ source : 2 , childData : obj }] );
				}

			} ,
			//点击题目视频
			topicSp : function( event )
			{ 
				//获取移动端方法
				var data = JSON.parse( event.target.getAttribute('data-json') );

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
			} ,
			//点击题目标题
			topicTm : function( event )
			{ 
				sessionStorage.setItem('page' , JSON.parse( event.target.getAttribute('data-index') ) - 1 );
				this.$router.go({ path : '/topic' });
			}
		} ,
		created (){
			
			$('.loading').show();

			this.$nextTick(function(){

				//滚动条到顶部
				$('html, body').animate({scrollTop:0}, 1);

				var _that = this ;
				
				//悬浮置顶
				function stick(){
					if( $(window).scrollTop() >= $('.det-nav-1').offset().top ){
						$('.det-nav-2').css({ position : 'fixed', display  : 'block' });
					}else{
						$('.det-nav-2').css({ position : 'absolute', display  : 'none' });
					}
				}

				//浮层置顶
				$(window).on('scroll' , function(){
					stick();
				});

				//点击伸展收齐
				$('.page').on('click','.up-down-btn',function(){
					$(this).toggleClass('upAdd');
					$(this).parents('.topic').find('.dd-wrap').slideToggle( 300 );
					stick();
				});


				//设置标题名
				var setTitleTimer = setTimeout(function(){
					ciwongPlugin.createEvent('SetTitle', [{ source : 2 , title: '课程详情'}] );
					clearTimeout( setTitleTimer );
				},200);


				//通过请求移动端的方法，然后拿到 json 进行解析[这边先模拟请求方式]
				// $.ajax({
				// 	url : 'data.json' ,
				// 	success : function(data){

						
						//如果存在数据，就直接拿本地的
						if ( sessionStorage.getItem('jsonData') ) {
							
							$('.loading').hide();
							_that.jsonData = JSON.parse( sessionStorage.getItem('jsonData') );
						
						}else{
						
							var getJsonTimer = setTimeout(function(){
								$('.loading').hide();
								ciwongPlugin.createEvent('GetJsonData' , [{source:2}] ,function( data ){

									//判断是否是字符串
									if( typeof data == 'string' ){
										data = JSON.parse( data ) ;
									}
								
									//如果是旧数据，新数据是有 profile 字段
									if( data.profile === undefined )
									{
										var oldNum = 1 ;
										for( var i in data.parts ){
											for( var j in data.parts[i].children ){
												//设置旧数据的sid
												Vue.set( data.parts[i].children[j] , 'sid' , oldNum++ );
												Vue.set( data.parts[i].children[j] , 'stem' , data.parts[i].children[j].stem.replace(/{#.*?#\}([\d]*){#\/.*?#}/g , '&nbsp;<input class=\"anTxt\" value=\"$1\">') );

												//把attachments 进行改造
												if( data.parts[i].children[j].ref_info.attachments && data.parts[i].children[j].ref_info.attachments.length != 0 )
												{
													//有附件，但是还要进行判断是否有视频
													var attachments = data.parts[i].children[j].ref_info.attachments ,
														attachArr = [] ;
													//遍历附件是否存在有视频
													for( var z in attachments ){
														//如果是3那么表示有视频
														if( attachments[z].file_type == 3 ){
															attachArr.push( attachments[z] )
														}
													}

													//把有视频的数组拿出来进行处理
													if ( attachArr.length ) {
														var explain_videos = {
															video_unique : attachArr[0].file_url.replace('letv://','') , //letv
															video_filename : '' , //视频名称
															duration : '0' //时间、旧数据没有便设置为null
														}
														//进行字段设置
														Vue.set( data.parts[i].children[j] , 'explain_videos' , [ explain_videos ] );
													}else{
														Vue.set( data.parts[i].children[j] , 'explain_videos' , null );
													}
												}else{
													//没视频
													Vue.set( data.parts[i].children[j] , 'explain_videos' , null );
												}
											}
										}

									}


									var num = 0 ,
										hasVideoArr = [] ; //有视频的整套数组
									for( var i in data.parts ){
										for( var j in data.parts[i].children ){
											if( data.parts[i].children[j].explain_videos && data.parts[i].children[j].explain_videos.length != 0 ){

												var videoObj = { 
													"letv" : data.parts[i].children[j].explain_videos[0].video_unique , 
													"queNum" : data.parts[i].children[j].sid , 
													"quesId" : data.parts[i].children[j].id , 
													"videoTitle" : data.profile === undefined ?  '第'+ ( num + 1 ) +'道题' : data.parts[i].children[j].explain_videos[0].video_filename 
												} 

												hasVideoArr.push( videoObj );
												Vue.set( data.parts[i].children[j] , 'myBlues' , videoObj );
												
												//将秒数进行转换
												Vue.set( data.parts[i].children[j].explain_videos[0] , 'duration' , formatTime( data.parts[i].children[j].explain_videos[0].duration ) );

											}

											num ++;
										}
									}

									//设置总条目 
									Vue.set( data , 'myAllLen' , num );
									//设置大banner
									if ( data.intro_videos && data.intro_videos.length != 0 ) {
										Vue.set( data , 'myBigBanner' , data.intro_videos[0].cover_url );
									}else{
										Vue.set( data , 'myBigBanner' , 'dist/img/banner.png' );
									}
									//进行赋值
									_that.jsonData = data ;
									sessionStorage.setItem('jsonData', JSON.stringify( data ) ) ;

									//把有视频的小题拼成数组给到移动端
									ciwongPlugin.createEvent('GetVideoList' , [{ source:2 , videoArr : hasVideoArr }] );
									//获取 ‘我不会’ 所要的数据
									ciwongPlugin.createEvent('GetVideoRequestParams' , [{ source:2 }] , function(iData){
										sessionStorage.setItem('iWont' , iData );
										
										// ------------------------获取‘我不会’状态----------------------------
										var iWont = JSON.parse( sessionStorage.getItem('iWont') );
						        		var url ="http://123.56.154.119:9014/errorbook/get_list_by_examId?classId="+iWont.classId+"&examId=" + JSON.parse( sessionStorage.getItem('jsonData') ).version_id;
										var userIdBase64 = 'Basic ' + window.btoa(iWont.userId+":");
						        		// 测试数据
						        		// var url ="http://123.56.154.119:9014/errorbook/get_list_by_examId?classId=2994116&examId=5667296140582361483";
										// alert('userId='+iWont.userId)
										// alert('获取‘我不会’ajax参数：url='+url)
										$('.loading').show();
						    			$.ajax({
						    				type:'GET',
						    		        headers:{
						    		   			Authorization: userIdBase64
						    		        },
						    		        dataType: 'json',
						    		        url: url,
						    		        success: function(data){
										    	// alert('get ajax errorBook:'+JSON.stringify(data))
							        			var json = typeof data == 'string' ? JSON.parse(data) : data;
							        			if((json.errcode==undefined || json.errcode!=0) || !json.data){
							        				// alert(json || '错题载入失败'); 
							        				return ;
							        			}
							        			var errorBook = typeof(json.data) == 'string' ? json.data : JSON.stringify(json.data);
							        			sessionStorage.setItem('errorBook',errorBook)
									        },
									        complete:function(){
												$('.loading').hide();
									        }
						    			});
						    			
									});
										
								});
								clearTimeout( getJsonTimer );
							},200);

						}




				// 	}
				// });


			});
		} 
	}

</script>