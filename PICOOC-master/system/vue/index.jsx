
import Vue from 'vue';//引入vue
import VueRouter from 'vue-router';//引入vue-router,路由跳转
import VueResource from 'vue-resource';//引入vue-resource,类似ajax
// import $ from "jquery";//引入别的vue
import "./public1.less";//引入别的vue
import headerHtml from "./components/header.vue";//引入头部
import totelMain from "./components/totelMain.vue";//引入总的主要内容
import appMain from "./components/appMain.vue";//引入app下的主要内容
import left from "./components/app/appLeft.vue";//引入app下的左部分
import appRight from "./components/app/appRight.vue";//引入app下的右部分
//栏目管理
import appContentColumnIndex from "./components/app/content/column/index.vue";//引入内容管理的栏目管理首页
import appContentColumnAdd from "./components/app/content/column/add.vue";//引入内容管理的栏目管理添加页
//文章管理
import appContentArticleIndex from "./components/app/content/article/index.vue";//引入内容管理的文章管理首页
import appContentArticleAdd from "./components/app/content/article/add.vue";//引入内容管理的文章管理首页
//评论管理中的文章评论
import appCommentArticleCommentIndex from "./components/app/comment/articleComment/index.vue";//引入内容管理的文章管理首页
//评论管理中的禁言用户
import appCommentForbidUserIndex from "./components/app/comment/forbidUser/index.vue";//引入内容管理的文章管理首页
//敏感词管理
import appCommentSensitiveWordIndex from "./components/app/comment/sensitiveWord/index.vue";//引入内容管理的文章管理首页

//闪屏
import appAdvertiseSplashScreenIndex from "./components/app/advertise/splashScreen/index.vue";//引入广告的闪屏首页
import appAdvertiseSplashScreenAdd from "./components/app/advertise/splashScreen/add.vue";//引入广告的闪屏添加也
import appAdvertiseArticleIndex from "./components/app/advertise/article/index.vue";//引入广告的闪屏首页
import appAdvertiseArticleAdd from "./components/app/advertise/article/add.vue";//引入广告的闪屏首页

//广告管理-电商的发现轮播图管理
import appAdvertiseFindIndex from "./components/app/advertise/find/index.vue";
import appAdvertiseFindAdd from "./components/app/advertise/find/add.vue";

//推荐位管理，轮播图
import appRecommendBannerIndex from "./components/app/recommend/banner/index.vue";//引入广告的闪屏首页
import appRecommendBannerDraft from "./components/app/recommend/banner/draft.vue";//引入广告的闪屏首页
import appRecommendBannerAdd from "./components/app/recommend/banner/add.vue";//引入广告的闪屏首页
//推荐位管理，阅读列表
import appRecommendReadListIndex from "./components/app/recommend/readList/index.vue";//引入广告的闪屏首页
import appRecommendReadListAdd from "./components/app/recommend/readList/add.vue";//引入广告的闪屏首页

//推荐位管理，热评
import appRecommendHotReviewIndex from "./components/app/recommend/hotReview/index.vue";//引入广告的闪屏首页
import appRecommendHotReviewAdd from "./components/app/recommend/hotReview/add.vue";//引入广告的闪屏首页

import appRecommendGuessLikeIndex from "./components/app/recommend/guessLike/index.vue";//引入广告的闪屏首页
import appRecommendGuessLikeAdd from "./components/app/recommend/guessLike/add.vue";//引入广告的闪屏首页

//var Ckeditor = require('./components/ckeditor.vue');

let publicData={
	pageSize:20,
}
window.publicData=publicData;

if(getCookie("token")=="false"){
	window.location.href="load.html";
}
else{
	window.token='&token='+getCookie("token")+'&';
}
var client = new OSS.Wrapper({
	region: "oss-cn-beijing.aliyuncs.com:",
	accessKeyId: "8eEYUX3uxui7eYDa",
	accessKeySecret: "DDySydwF0Htk51SlA40jEHUQuBJkCf",
	bucket: "picoocheadportrait",
	secure:true
});
window.client=client;

/*let ajaxLink;
if(window.location.host == "pm.picooc.com:9989"){
	ajaxLink="http://pm.picooc.com:8079/";
}
else if(window.location.host == "a.picooc.com:10000"){
	ajaxLink="https://api2.picooc.com:10000/";
}

window.ajaxLink=ajaxLink;*/



Vue.use(VueRouter);//使用路由
Vue.use(VueResource);//使用请求，类似ajax


let router=new VueRouter({//路由设置
	routes:[//数组，跳转路径
		{path:'/',component:appMain},
		{
			path:'/appMain',component:appMain,
			children:[
				{
					path:'appRight',name:'appRight',components:{appRight:appRight},children:[
						{path:'appContentColumnIndex',name:'appContentColumnIndex',component:appContentColumnIndex},
						{path:'appContentColumnAdd',name:'appContentColumnAdd',component:appContentColumnAdd},
						{path:'appContentArticleIndex',name:'appContentArticleIndex',component:appContentArticleIndex},
						{path:'appContentArticleAdd',name:'appContentArticleAdd',component:appContentArticleAdd},
						{path:'appCommentArticleCommentIndex',name:'appCommentArticleCommentIndex',component:appCommentArticleCommentIndex},
						{path:'appCommentForbidUserIndex',name:'appCommentForbidUserIndex',component:appCommentForbidUserIndex},
						{path:'appAdvertiseArticleIndex',name:'appAdvertiseArticleIndex',component:appAdvertiseArticleIndex},
						{path:'appAdvertiseArticleAdd',name:'appAdvertiseArticleAdd',component:appAdvertiseArticleAdd},
						{path:'appAdvertiseSplashScreenIndex',name:'appAdvertiseSplashScreenIndex',component:appAdvertiseSplashScreenIndex},
						{path:'appAdvertiseSplashScreenAdd',name:'appAdvertiseSplashScreenAdd',component:appAdvertiseSplashScreenAdd},
						{path:'appAdvertiseFindIndex',name:'appAdvertiseFindIndex',component:appAdvertiseFindIndex},
						{path:'appAdvertiseFindAdd',name:'appAdvertiseFindAdd',component:appAdvertiseFindAdd},
						{path:'appRecommendBannerIndex',name:'appRecommendBannerIndex',component:appRecommendBannerIndex},
						{path:'appRecommendBannerDraft',name:'appRecommendBannerDraft',component:appRecommendBannerDraft},
						{path:'appRecommendBannerAdd',name:'appRecommendBannerAdd',component:appRecommendBannerAdd},
						{path:'appRecommendReadListIndex',name:'appRecommendReadListIndex',component:appRecommendReadListIndex},
						{path:'appRecommendReadListAdd',name:'appRecommendReadListAdd',component:appRecommendReadListAdd},
						{path:'appRecommendHotReviewIndex',name:'appRecommendHotReviewIndex',component:appRecommendHotReviewIndex},
						{path:'appRecommendHotReviewAdd',name:'appRecommendHotReviewAdd',component:appRecommendHotReviewAdd},
						{path:'appRecommendGuessLikeIndex',name:'appRecommendGuessLikeIndex',component:appRecommendGuessLikeIndex},
						{path:'appRecommendGuessLikeAdd',name:'appRecommendGuessLikeAdd',component:appRecommendGuessLikeAdd},


						{path:'appCommentSensitiveWordIndex',name:'appCommentSensitiveWordIndex',component:appCommentSensitiveWordIndex},


					]
				}
			]
		},//path，#后的路径，component跳转的模板

	]
});
window.router=router;
getWindowSearch();
function getWindowSearch(){
	let windowSearch=window.location.href.split("?")[1];
	if(typeof windowSearch=="undefined"){
		windowSearch="";
	}
	window.windowSearch=windowSearch;
}
window.getWindowSearch=getWindowSearch;

var vm =new Vue({
	el:"#index",//挂载在页面的具体元素下
	router:router,
	data: function (){//初始数据
		return {
		}
	},
	template:'<div><headerHtml /><totelMain /></div>',//使用模板
	created:function (){//创建时调用，注意：使用this不能用es方法简写
    	/*let windowSearch=window.location.href.split("?")[1];
		alert('1'+windowSearch);
		if(typeof windowSearch=="undefined"){
			windowSearch="";
		}
		window.windowSearch=windowSearch;*/
	},
	methods:{},//方法集，放置需要的方法
	components:{//引入的模板
		"headerHtml":headerHtml,
		"totelMain":totelMain
	}
})
