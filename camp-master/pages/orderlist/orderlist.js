var List = require('../../common/utils/list');
var utils = require('../../common/utils/utils');
var config = require('../../common/config');
var host = config.api;



var listWeiget//列表组建


Page({
	onShow:function(){
		var self = this;
		listWeiget = null;
        _fn.init(self);
	},
	getNext:function(e){
		console.log(333);
		listWeiget.next();
	},
	toDetail:function(e){
		var id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url:'../orderdetail/orderdetail?id='+id
		});
	}
})

var _fn = {
    init:function(page){
		var self = page;
        wx.getSystemInfo({
			success:function(res){
				self.setData({
					height:(utils.toRpx(res.windowHeight))+'rpx'
				});
			}
		});
		listWeiget = listWeiget || new List({
            url:host+'/groupon/product/list',
			// url:host+'/app/address/list',
			// isSingle:true,
			param:{
				withKey:false
			},
			render:function(data){
				self.setData({
					orderlist:data.totalData
				});
			},
			getList:function(res){
				res = mockData;
				var list = [];
				if(res.ret/1===1){
					res.data.posts = res.data.posts.map(function(v,k){
						v.brief = "到户外郊游，带领孩子们认识动植物，以及提供孩子们的交流能力..."
						v.vacancy = 1000;//
						v.showAgeRange="5-8周岁";
						v.showPeriod="2-3周";
						v.showPostsState="正在报名";
						v.showCategory="早鸟价"

						return v;
					});
					list = res.data.posts;
				}
				return list
			},
			getHasMore:function(res){
				return true
				return res.data.hasMore;
			}
		});
		listWeiget.next();
	},

}

var mockData = {
　　"ret":1,
　　"msg":"",
　　"data":{
　　　　"posts":[
　　　　　　{
　　　　　　　　"title":"撸啊撸",

　　　　　　　　"key":"571_1509374392_HXv",

　　　　　　　　"thumbnail":"https://camp.theforward.xyz/img/thumbnail_demo.jpeg",

　　　　　　　　"avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEKEdmgOA5VOGt8jmA1ZpGCxAnQTicsMb9GhKrnGEEIjMVPbbj6KUCsZpGslzwNcu1m8vo43qo1icIcw/0",
　　　　               
				"vacancy":"0",//剩余名额

				"brief":"0",//活动简介（内容取活动详情中的活动简介部分）

				"age_range":"0",//年龄段

				"period":"0",//活动周期

　　　　　　　　"posts_state":"0",//活动状态（正在报名；剩余名额少于5人：正在报名+名额紧张；满员或到期：报名结束）
　　　　　　　
				"category":"0",//活动类别（普通活动：无；拼团活动：拼团；早鸟活动：早鸟价）
				

				

　　　　　　},
{
	　　　　　　　　"title":"撸啊撸",
	
	　　　　　　　　"key":"571_1509374392_HXv",
	
	　　　　　　　　"thumbnail":"https://camp.theforward.xyz/img/thumbnail_demo.jpeg",
	
	　　　　　　　　"avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEKEdmgOA5VOGt8jmA1ZpGCxAnQTicsMb9GhKrnGEEIjMVPbbj6KUCsZpGslzwNcu1m8vo43qo1icIcw/0",
	　　　　               
					"vacancy":"0",//剩余名额
	
					"brief":"0",//活动简介（内容取活动详情中的活动简介部分）
	
					"age_range":"0",//年龄段
	
					"period":"0",//活动周期
	
	　　　　　　　　"posts_state":"0",//活动状态（正在报名；剩余名额少于5人：正在报名+名额紧张；满员或到期：报名结束）
	　　　　　　　
					"category":"0",//活动类别（普通活动：无；拼团活动：拼团；早鸟活动：早鸟价）
					
	
					
	
	　　　　　　},
	{
		　　　　　　　　"title":"撸啊撸",
		
		　　　　　　　　"key":"571_1509374392_HXv",
		
		　　　　　　　　"thumbnail":"https://camp.theforward.xyz/img/thumbnail_demo.jpeg",
		
		　　　　　　　　"avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEKEdmgOA5VOGt8jmA1ZpGCxAnQTicsMb9GhKrnGEEIjMVPbbj6KUCsZpGslzwNcu1m8vo43qo1icIcw/0",
		　　　　               
						"vacancy":"0",//剩余名额
		
						"brief":"0",//活动简介（内容取活动详情中的活动简介部分）
		
						"age_range":"0",//年龄段
		
						"period":"0",//活动周期
		
		　　　　　　　　"posts_state":"0",//活动状态（正在报名；剩余名额少于5人：正在报名+名额紧张；满员或到期：报名结束）
		　　　　　　　
						"category":"0",//活动类别（普通活动：无；拼团活动：拼团；早鸟活动：早鸟价）
						
		
						
		
		　　　　　　},
		{
			　　　　　　　　"title":"撸啊撸",
			
			　　　　　　　　"key":"571_1509374392_HXv",
			
			　　　　　　　　"thumbnail":"https://camp.theforward.xyz/img/thumbnail_demo.jpeg",
			
			　　　　　　　　"avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEKEdmgOA5VOGt8jmA1ZpGCxAnQTicsMb9GhKrnGEEIjMVPbbj6KUCsZpGslzwNcu1m8vo43qo1icIcw/0",
			　　　　               
							"vacancy":"0",//剩余名额
			
							"brief":"0",//活动简介（内容取活动详情中的活动简介部分）
			
							"age_range":"0",//年龄段
			
							"period":"0",//活动周期
			
			　　　　　　　　"posts_state":"0",//活动状态（正在报名；剩余名额少于5人：正在报名+名额紧张；满员或到期：报名结束）
			　　　　　　　
							"category":"0",//活动类别（普通活动：无；拼团活动：拼团；早鸟活动：早鸟价）
							
			
							
			
			　　　　　　},
			{
				　　　　　　　　"title":"撸啊撸",
				
				　　　　　　　　"key":"571_1509374392_HXv",
				
				　　　　　　　　"thumbnail":"https://camp.theforward.xyz/img/thumbnail_demo.jpeg",
				
				　　　　　　　　"avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEKEdmgOA5VOGt8jmA1ZpGCxAnQTicsMb9GhKrnGEEIjMVPbbj6KUCsZpGslzwNcu1m8vo43qo1icIcw/0",
				　　　　               
								"vacancy":"0",//剩余名额
				
								"brief":"0",//活动简介（内容取活动详情中的活动简介部分）
				
								"age_range":"0",//年龄段
				
								"period":"0",//活动周期
				
				　　　　　　　　"posts_state":"0",//活动状态（正在报名；剩余名额少于5人：正在报名+名额紧张；满员或到期：报名结束）
				　　　　　　　
								"category":"0",//活动类别（普通活动：无；拼团活动：拼团；早鸟活动：早鸟价）
								
				
								
				
				　　　　　　},
				{
					　　　　　　　　"title":"撸啊撸",
					
					　　　　　　　　"key":"571_1509374392_HXv",
					
					　　　　　　　　"thumbnail":"https://camp.theforward.xyz/img/thumbnail_demo.jpeg",
					
					　　　　　　　　"avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEKEdmgOA5VOGt8jmA1ZpGCxAnQTicsMb9GhKrnGEEIjMVPbbj6KUCsZpGslzwNcu1m8vo43qo1icIcw/0",
					　　　　               
									"vacancy":"0",//剩余名额
					
									"brief":"0",//活动简介（内容取活动详情中的活动简介部分）
					
									"age_range":"0",//年龄段
					
									"period":"0",//活动周期
					
					　　　　　　　　"posts_state":"0",//活动状态（正在报名；剩余名额少于5人：正在报名+名额紧张；满员或到期：报名结束）
					　　　　　　　
									"category":"0",//活动类别（普通活动：无；拼团活动：拼团；早鸟活动：早鸟价）
									
					
									
					
					　　　　　　},
					{
						　　　　　　　　"title":"撸啊撸",
						
						　　　　　　　　"key":"571_1509374392_HXv",
						
						　　　　　　　　"thumbnail":"https://camp.theforward.xyz/img/thumbnail_demo.jpeg",
						
						　　　　　　　　"avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEKEdmgOA5VOGt8jmA1ZpGCxAnQTicsMb9GhKrnGEEIjMVPbbj6KUCsZpGslzwNcu1m8vo43qo1icIcw/0",
						　　　　               
										"vacancy":"0",//剩余名额
						
										"brief":"0",//活动简介（内容取活动详情中的活动简介部分）
						
										"age_range":"0",//年龄段
						
										"period":"0",//活动周期
						
						　　　　　　　　"posts_state":"0",//活动状态（正在报名；剩余名额少于5人：正在报名+名额紧张；满员或到期：报名结束）
						　　　　　　　
										"category":"0",//活动类别（普通活动：无；拼团活动：拼团；早鸟活动：早鸟价）
										
						
										
						
						　　　　　　},
						{
							　　　　　　　　"title":"撸啊撸",
							
							　　　　　　　　"key":"571_1509374392_HXv",
							
							　　　　　　　　"thumbnail":"https://camp.theforward.xyz/img/thumbnail_demo.jpeg",
							
							　　　　　　　　"avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEKEdmgOA5VOGt8jmA1ZpGCxAnQTicsMb9GhKrnGEEIjMVPbbj6KUCsZpGslzwNcu1m8vo43qo1icIcw/0",
							　　　　               
											"vacancy":"0",//剩余名额
							
											"brief":"0",//活动简介（内容取活动详情中的活动简介部分）
							
											"age_range":"0",//年龄段
							
											"period":"0",//活动周期
							
							　　　　　　　　"posts_state":"0",//活动状态（正在报名；剩余名额少于5人：正在报名+名额紧张；满员或到期：报名结束）
							　　　　　　　
											"category":"0",//活动类别（普通活动：无；拼团活动：拼团；早鸟活动：早鸟价）
											
							
											
							
							　　　　　　},
							{
								　　　　　　　　"title":"撸啊撸",
								
								　　　　　　　　"key":"571_1509374392_HXv",
								
								　　　　　　　　"thumbnail":"https://camp.theforward.xyz/img/thumbnail_demo.jpeg",
								
								　　　　　　　　"avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEKEdmgOA5VOGt8jmA1ZpGCxAnQTicsMb9GhKrnGEEIjMVPbbj6KUCsZpGslzwNcu1m8vo43qo1icIcw/0",
								　　　　               
												"vacancy":"0",//剩余名额
								
												"brief":"0",//活动简介（内容取活动详情中的活动简介部分）
								
												"age_range":"0",//年龄段
								
												"period":"0",//活动周期
								
								　　　　　　　　"posts_state":"0",//活动状态（正在报名；剩余名额少于5人：正在报名+名额紧张；满员或到期：报名结束）
								　　　　　　　
												"category":"0",//活动类别（普通活动：无；拼团活动：拼团；早鸟活动：早鸟价）
												
								
												
								
								　　　　　　},
								{
									　　　　　　　　"title":"撸啊撸",
									
									　　　　　　　　"key":"571_1509374392_HXv",
									
									　　　　　　　　"thumbnail":"https://camp.theforward.xyz/img/thumbnail_demo.jpeg",
									
									　　　　　　　　"avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEKEdmgOA5VOGt8jmA1ZpGCxAnQTicsMb9GhKrnGEEIjMVPbbj6KUCsZpGslzwNcu1m8vo43qo1icIcw/0",
									　　　　               
													"vacancy":"0",//剩余名额
									
													"brief":"0",//活动简介（内容取活动详情中的活动简介部分）
									
													"age_range":"0",//年龄段
									
													"period":"0",//活动周期
									
									　　　　　　　　"posts_state":"0",//活动状态（正在报名；剩余名额少于5人：正在报名+名额紧张；满员或到期：报名结束）
									　　　　　　　
													"category":"0",//活动类别（普通活动：无；拼团活动：拼团；早鸟活动：早鸟价）
													
									
													
									
									　　　　　　},
									{
										　　　　　　　　"title":"撸啊撸",
										
										　　　　　　　　"key":"571_1509374392_HXv",
										
										　　　　　　　　"thumbnail":"https://camp.theforward.xyz/img/thumbnail_demo.jpeg",
										
										　　　　　　　　"avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEKEdmgOA5VOGt8jmA1ZpGCxAnQTicsMb9GhKrnGEEIjMVPbbj6KUCsZpGslzwNcu1m8vo43qo1icIcw/0",
										　　　　               
														"vacancy":"0",//剩余名额
										
														"brief":"0",//活动简介（内容取活动详情中的活动简介部分）
										
														"age_range":"0",//年龄段
										
														"period":"0",//活动周期
										
										　　　　　　　　"posts_state":"0",//活动状态（正在报名；剩余名额少于5人：正在报名+名额紧张；满员或到期：报名结束）
										　　　　　　　
														"category":"0",//活动类别（普通活动：无；拼团活动：拼团；早鸟活动：早鸟价）
														
										
														
										
										　　　　　　},
　　　　],
　　　　"filter_new":{
　　　　　　"created_at":"2018-03-26 20:36:10",
　　　　　　"posts_key":"1421_1522067770_rzK"
　　　　},
　　　　"filter_old":{
　　　　　　"created_at":"2017-10-24 15:06:25",
　　　　　　"posts_key":"2_1508828785_CCXeLS"
　　　　}
　　}
}

